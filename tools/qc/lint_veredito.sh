#!/bin/bash
# Lint determinístico do veredito do validador-gate. Decide se a RODADA é aceitável
# (formato, cobertura, evidência) - NÃO julga o mérito (isso é calibração + escapes).
# Uso: bash tools/qc/lint_veredito.sh <arquivo_com_o_veredito.txt>
# Exit 0 = rodada válida; exit 1 = re-rodar com feedback; exit 2 = erro de uso.
set -u

# Guarda de uso ANTES de qualquer grep: sem ela, um caminho com typo cospe uma parede de
# erros de grep e termina em "RE-RODAR o validador", ou seja um erro MEU lê como veredito
# de que o validador precisa re-rodar. Exit 2 separa "não consegui ler" de "rodada ruim".
if [ $# -lt 1 ]; then
  echo "uso: bash tools/qc/lint_veredito.sh <arquivo_com_o_veredito.txt>" >&2
  exit 2
fi
V="$1"
if [ ! -f "$V" ]; then
  echo "ERRO: arquivo de veredito não existe: $V" >&2
  exit 2
fi
if [ ! -s "$V" ]; then
  echo "ERRO: arquivo de veredito está vazio: $V" >&2
  exit 2
fi

FAIL=0
say() { echo "  $1"; }
bad() { echo "  ✗ $1"; FAIL=1; }

echo "== lint do veredito: $V =="

# 1. Seções obrigatórias
for sec in "VEREDITO:" "GATE:" "CHECKLIST" "ACHADOS" "CHECKS EXECUTADOS"; do
  grep -q "$sec" "$V" && say "✓ seção '$sec'" || bad "seção ausente: $sec"
done

# 2. Veredito é um dos dois valores
grep -qE 'VEREDITO: *(APROVADO|RETRABALHO)' "$V" || bad "VEREDITO não é APROVADO/RETRABALHO"

# 3. Eco do checklist: existe e cada item tem estado
ECO=$(grep -cE '(PASS|FAIL|N/A)' "$V" || true)
if [ "$ECO" -ge 3 ]; then say "✓ eco do checklist com $ECO itens marcados"; else bad "eco do checklist fraco ($ECO itens com PASS/FAIL/N-A; mínimo 3)"; fi

# 4. Achados: linhas de tabela têm coluna de evidência preenchida
#    (linha de achado = | n | SEVERIDADE | item | evidência |)
ACH=$(grep -cE '^\| *[0-9]+ *\| *(BLOQUEIA|AJUSTE|OBSERVAÇÃO|OBSERVACAO)' "$V" || true)
SEM_EVID=$(grep -E '^\| *[0-9]+ *\|' "$V" | awk -F'|' 'NF>=5 { ev=$5; gsub(/ /,"",ev); if (length(ev)<15) c++ } END {print c+0}')
say "achados: $ACH (sem evidência substancial: $SEM_EVID)"
[ "$SEM_EVID" -gt 0 ] && bad "achado(s) com coluna de evidência vazia/rasa (<15 chars)"

# 5. Smell de 'limpo demais': material audiovisual novo com ZERO achados é suspeito
GATE=$(grep -m1 'GATE:' "$V")
if [ "$ACH" -eq 0 ] && echo "$GATE" | grep -qiE 'TAKE|CORTE|MASTER|ÂNCORAS|ANCORAS'; then
  bad "APROVADO com ZERO achados num gate de mídia - historicamente todo material real rende ao menos OBSERVAÇÕES; re-rodar ou aprofundar spot-check"
fi

# 6. Checks executados citam ferramenta/medida (não só prosa)
grep -qE 'qc_video|camera_review|ffprobe|ffmpeg|signalstats|ebur128|volumedetect' "$V" \
  && say "✓ checks citam ferramentas de medição" \
  || bad "CHECKS EXECUTADOS não cita nenhuma ferramenta de medição"

echo
if [ "$FAIL" -eq 0 ]; then echo "LINT: RODADA VÁLIDA (diretor ainda faz 1 spot-check de evidência)"; exit 0
else echo "LINT: RE-RODAR o validador com este feedback"; exit 1; fi
