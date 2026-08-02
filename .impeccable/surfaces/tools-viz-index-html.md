---
version: 1
slug: "tools-viz-index-html"
primary_target: "tools/viz/index.html"
related_targets: []
---

# Board de workflow (tools/viz/) - brief de superfície

Modo: Operate. Superfície única (viewer do board ao vivo).

- Público/tarefa: o diretor acompanha a rodada de relance (meia-tela ao lado do
  terminal OU fullscreen - os dois regimes são reais); visitantes do repo público
  veem o board como vitrine do método.
- Job: achar em ~1s a fase atual, qualquer erro/BLOQUEIA e o custo gasto × teto.
- Conteúdo: estado.json (contrato em docs/PROPOSTA-visualizador-workflow.md);
  demo golden e simulador em tools/viz/demo/.
- Direção escolhida (seed 6cb3d033, direção 6, confirmada pelo usuário 01/08/2026):
  diagrama de linha de metrô (Beck/Vignelli) - ver DESIGN.md. Momento memorável:
  a linha do filme com o trem pulsando na fase atual, virando strip map horizontal
  em fullscreen.
- Restrições: arquivo único sem build; React+xyflow via esm.sh; poll 1s; tema
  escuro único; erro sempre vence visualmente; zero créditos.
- Não resolvido: nenhum.
