# Estrutura do workbench

Como o sistema funciona hoje. Documento vivo: atualizar quando a arquitetura mudar
(decisões novas entram em `DECISOES.md`; lições de geração em `PRATICAS.md`).

## As peças

| Peça | Papel |
|---|---|
| `CLAUDE.md` | guia do repo + fluxo de git obrigatório (branch→PR→review→merge) |
| `PRATICAS.md` | a RÉGUA: toda lição paga vira cláusula; o validador lê antes de validar |
| `FERRAMENTAS.md` | stack gratuito (VO/trilha/foley/upscale) + tooling de review |
| `.claude/skills/novo-video/` | o workflow v3 (fases, gates, princípios 1-8) |
| `.claude/agents/validador-gate.md` | olhos frios: valida TODO material antes de chegar ao usuário |
| `tools/qc/` | medições determinísticas: `qc_video.sh`, `camera_review.py`, `lint_veredito.sh`, `CALIBRACAO.md` |
| `tools/stable-audio/` | trilha local (RTX 3070) + a venv que serve numpy/PIL ao QC (fora do git) |
| `<slug>/BIBLIA.md` | fonte de verdade de cada filme: identidade, decupagem, job IDs, custos, lições |
| `PROJECT_STATUS.md` | logbook por sessão (mais recente primeiro) |
| `docs/` | esta pasta: arquitetura viva + log de decisões |
| `tools/viz/` | board ao vivo do workflow (xyflow sem build): serve.sh + viewer que lê `<slug>/estado.json` escrito pelo diretor a cada transição |
| `tools/motion/` | kit Remotion de infográficos animados (11 cenas com props JSON: 6 do mundo quadro-negro em `src/scenes/` + 5 do ground-station em `src/gs/cenas/`, mais a composição `Sanity` do check; tokens em `src/theme.ts` e `src/gs/tema.ts`): cena = take, zero créditos; gate `bash tools/motion/check.sh` |
| `estilos/` | receitas reutilizáveis por tipo de vídeo (`ESTILO-<slug>.md`; contrato em `docs/PROPOSTA-estilos-de-video.md`) - o brief pergunta o estilo, o validador confere aderência, a fase 10 devolve lições |

## Árvore padrão por filme

```
<slug>/
  BIBLIA.md          fonte de verdade
  storyboard/        tiras (papel do filme)
  01_refs/           o que veio de fora: fotos-ref, fontes OFL, áudio-fonte
  02_ancoras/        stills APROVADOS em uso    (_descartados/ = reprovados, com lição)
  03_takes/          vídeos APROVADOS em uso    (_descartados/)
  04_qc/             strips, folhas, checks, grids
  05_cortes/         montagens intermediárias e masters superados
  06_master/         SÓ a entrega vigente: <SLUG>_MASTER.mp4 (sem versão no nome)
```
Status é PASTA. Mídia fica fora do git (regenerável pelos job IDs da bíblia);
só docs e fontes são versionados. `Downloads\<slug>\` espelha o gate atual + entrega.

## Board ao vivo

`diretor → <slug>/estado.json → tools/viz/serve.sh (http.server) → browser (poll 1s)`.
Contrato do JSON e decisões: `docs/PROPOSTA-visualizador-workflow.md`. Demo sem
créditos: `bash tools/viz/serve.sh tools/viz/demo` (estática) ou, com o serve.sh
rodando, `bash tools/viz/demo/simular.sh` (rodada simulada em
`?filme=tools/viz/demo/sim`).

## Motion programático

`props JSON → npx remotion render <Cena> → <slug>/03_takes/take_<CENA>_v1.mp4 →
ffmpeg (xfade/concat) → master`. **Cena = take**: a composição renderizada É o
clipe da montagem, então árvore de pastas, QC, folha de cortes, gates e bíblia
funcionam sem mudança - só a origem do take muda (props JSON no lugar do ID de
geração). Transição entre cenas é sempre ffmpeg, nunca Remotion. Receita completa:
`estilos/ESTILO-infografico.md` e `tools/motion/README.md`.

## Fluxograma do workflow v3

```
                            /novo-video
                                 │
                     ┌───────────▼───────────┐
                     │ 1. BRIEF              │  formato, duração, áudio,
                     │    (1 rodada)         │  CASTING, momento-wow
                     └───────────┬───────────┘
                brief abstrato/reflexivo?
                     sim │                             │ não
              ┌──────────▼────────────────────────┐    │
              │ 1.5 CONCEITO                      │    │   ◄─ o além é OUTRA categoria;
              │ 3-5 mundos (2-3 arcos com ESTILO) │    │      arco termina ≠ começa
              │ ══ GATE usuário ══                │    │
              └──────────┬────────────────────────┘    │
                         └──────┬──────────────────────┘
                     ┌──────────▼───────────┐
                     │ 2. SETUP             │  árvore padrão + bíblia +
                     │    preflight get_cost│  conta ANTES do 1º crédito
                     └──────────┬───────────┘
                     ┌──────────▼───────────┐
                     │ 3. LOOK DEV + LOCK   │  sheets, masters de sala e
                     │ ══ GATE: casting +   │  props; checklist por still
                     │    mundo + props     │  ◄─ pivô depois = re-shoot
                     │    TRAVAM aqui ══    │
                     └──────────┬───────────┘
                     ┌──────────▼───────────┐
                     │ 4. STORYBOARD (0 cr) │  beats com frames pagos;
                     │ ══ GATE: linguagem   │  ◄─ cortes × oner decidido
                     │    de montagem ══    │     aqui, com custos
                     └──────────┬───────────┘
                     ┌──────────▼───────────┐
                     │ 5. WOW-SHOT primeiro │  o take mais arriscado,
                     │ ══ GATE: impressiona?│  fora de ordem; falhou →
                     └──────────┬───────────┘  replaneja DECUPAGEM
                     ┌──────────▼───────────┐
                     │ 6. PRODUÇÃO em lote  │  strip por take = produção
                     └──────────┬───────────┘
                     ┌──────────▼───────────┐
                     │ 7. MONTAGEM          │  folha de cortes MEDIDA;
                     │ 7b. REVIEW anti-slop │  fixes de edição antes
                     │     + câmera (MEDIDO)│  de qualquer regen
                     │ ══ GATE: corte ══    │
                     └──────────┬───────────┘
                     ┌──────────▼───────────┐
                     │ 8. ÁUDIO (0 cr 1º)   │  música: janela por RMS
                     │ 8b. REVIEW soundtrack│  cobertura/LUFS/sincronia
                     └──────────┬───────────┘
                     ┌──────────▼───────────┐
                     │ 9. FINALIZAÇÃO       │  cartela (fonte+marfim,
                     │    master 1080+grão  │  nativa), 7b+8b re-rodados
                     │ ══ GATE: entrega ══  │
                     └──────────┬───────────┘
                     ┌──────────▼───────────┐
                     │ 10. REGISTRO         │  lições→PRATICAS/ESTILO, faxina,
                     │     bíblia, PR       │  escapes→CALIBRACAO
                     └──────────────────────┘

  ╔═══════════ TODO "══ GATE ══" passa antes por este loop ═══════════╗
  ║                                                                    ║
  ║  produzir ──► validador-gate ──► lint_veredito.sh ──FALHOU──┐      ║
  ║     ▲         (olhos frios,      (rodada válida?)           │      ║
  ║     │          checklist do              │ OK               │      ║
  ║     │          gate, evidência)          ▼                  │      ║
  ║     │              │            spot-check 1 evidência      │      ║
  ║     └──BLOQUEIA────┘                     │                  │      ║
  ║        (corrigir e                       ▼                  │      ║
  ║         revalidar)          GATE DO USUÁRIO: só decisão     │      ║
  ║                             criativa (AJUSTES anotados,     │      ║
  ║                             OBSERVAÇÕES = gosto dele)  re-rodar    ║
  ╚═══════════════════════════════════════════════════════════════════╝

  Quem garante o quê: material ← validador-gate ← lint (rodada) ←
  CALIBRACAO.md (competência, casos dourados) ← escapes do usuário (realidade)
```
