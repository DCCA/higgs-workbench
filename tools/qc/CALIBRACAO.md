# Calibração do validador-gate

O validador é a garantia de qualidade dos gates - isto aqui é a garantia de
qualidade DO VALIDADOR. Suite de regressão com material dourado: artefatos reais
do acervo com defeitos CONHECIDOS e documentados. O validador é rodado contra
eles ÀS CEGAS (briefing padrão, sem mencionar os defeitos); passa se reencontra
o que sabemos que está lá, sem inventar bloqueio falso.

**Quando rodar:** sempre que `.claude/agents/validador-gate.md`, os checklists da
skill ou `PRATICAS.md` mudarem de forma relevante. Custa só tokens (0 créditos).

**Critério de aprovação da calibração:**
- Recall: TODOS os defeitos esperados do caso reencontrados (severidade ≥ AJUSTE)
- Precisão: nenhum BLOQUEIA falso (achado BLOQUEIA que o histórico não sustenta)
- Cobertura: eco do CHECKLIST completo (sem item pulado sem justificativa)

## Casos dourados (defeito conhecido → o validador DEVE achar)

| # | Artefato | Gate | Defeitos esperados |
|---|---|---|---|
| 1 | `alem/05_cortes/ALEM_FINAL_MASTER.mp4` | MASTER | fade do texto incompleto no último frame (fantasma, YMIN ~202 vs fundo 219); hold de leitura ~1,25s p/ 6 palavras; áudio 96 kHz (padrão 48) |
| 2 | `alem/03_takes/_descartados/ONER1.mp4` | TAKE | câmera de cinema/tripé em quadro (borda esquerda, ~10-15s, cresce com parallax) |
| 3 | `alem/05_cortes/ALEM_oner_v1.mp4` | CORTE | travessia por branco curta (0,4s - lê como flash de corte; régua: ≥1s) |
| 4 | `alem/02_ancoras/_descartados/F2_cordilheira.png` | ÂNCORAS | logo The North Face na jaqueta/mochila; identidade fora do bloco (leu feminina) |
| 5 | `alem/05_cortes/ALEM_corte1_v5.mp4`* | CORTE | pop de luminância nas emendas (Δ21 e Δ27 YAVG) + salto de escala reverso T2→T3 |
| 6 | `alem/02_ancoras/_descartados/F3_lateral.png` | ÂNCORAS | rosto visível em perfil num filme de linguagem Rückenfigur (checar contra bíblia) |

*o corte1_v5 tem as legendas de borda fina sobre clarão - achado bônus válido.

| 7 | `chave/06_master/CHAVE_MASTER.mp4` | MASTER | acentos PT nos supers (à/ã); risco de pronúncia se VO tivesse inglês (escape resolvido: VO ficou PT puro); cauda de áudio |

Resultado de cada rodada: registrar data, caso(s), recall/precisão e escapes na
seção abaixo. **Escape em produção** (defeito que o USUÁRIO achou depois do
validador aprovar) é o KPI número 1: cada escape vira item novo de checklist -
mesmo loop das lições do PRATICAS.

**Regra de cegueira:** o briefing de toda rodada de calibração DEVE incluir
"não leia tools/qc/CALIBRACAO.md" - este arquivo contém os gabaritos. (Descoberto
na rodada do caso 2: o validador o encontrou sozinho no diretório de ferramentas
e declarou, com evidência própria independente; a regra fecha o vetor.)

## Histórico de calibração

- **2026-07-25 - rodada inaugural, caso 1 (às cegas):** PASS - reencontrou os 3
  defeitos (fantasma no end-freeze via curva YMIN, hold 1,25s, 96 kHz) + 2
  observações diegéticas legítimas; zero BLOQUEIA falso. (Rodada feita ANTES da
  correção do master; o caso 1 usa o arquivo superado preservado em 05_cortes.)
- **2026-07-25 - caso 2 às cegas (agente pós-endurecimento, eco de checklist):**
  PASS com distinção - reencontrou a câmera fantasma como BLOQUEIA e mediu o
  parallax (0→11%→29% da largura, 9,6-14,3s); eco completo do checklist; zero
  BLOQUEIA falso; e revelou 2 achados INÉDITOS no take descartado (travessia
  palco→bastidor era morph com mundos sobrepostos; figura final fora de spec de
  silhueta) - promovidos a gabarito do caso 2. Caveat: leu CALIBRACAO.md e
  declarou; evidência foi independente; regra de cegueira criada em resposta.
