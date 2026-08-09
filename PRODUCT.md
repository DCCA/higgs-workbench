# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **O diretor (o dono do workbench)**: opera rodadas do `/novo-video` no Claude Code
  e acompanha o board numa aba do browser. Cena de uso confirmada: **varia entre
  meia-tela ao lado do terminal e fullscreen** - o layout precisa servir os dois
  regimes de verdade.
- **Visitantes do repo público** (`DCCA/higgs-workbench`): avaliam a metodologia;
  o board é também **vitrine do método** (confirmado pelo usuário em 01/08/2026) -
  "sala de controle de produção", com identidade própria e memorável.

## Product Purpose

Board ao vivo de uma rodada de produção de vídeo com IA: em que fase o filme está,
o que cada shot está fazendo, o que o validador bloqueou e quanto crédito já foi
gasto - legível de relance, sem reler o terminal. Sucesso = o olho acha o estado em
~1s e um erro é impossível de não ver.

## Positioning

A única vista do estado SEMÂNTICO da rodada (fases, gates, vereditos, retakes,
custos) - coisas que só o diretor sabe e registra por contrato em
`<slug>/estado.json`. Não é um dashboard genérico de arquivos: é o fluxograma do
workflow v2 do workbench, vivo.

## Operating Context

- Bancada WSL/Linux; terminal do Claude Code ao lado do browser.
- `bash tools/viz/serve.sh <slug>` (python http.server, loopback, porta 8123);
  viewer em `tools/viz/index.html` faz poll 1s de `/<slug>/estado.json`.
- Demo sem créditos: fixture golden (`tools/viz/demo/`) e `simular.sh`.
- Docs do workbench em português; contrato do estado em
  `docs/PROPOSTA-visualizador-workflow.md`.

## Capabilities and Constraints

- **Arquivo único, sem build** (decisão de arquitetura, DECISOES.md 2026-08-01):
  React + `@xyflow/react` via esm.sh (importmap); internet na 1ª carga.
- Contrato fixo de statuses: fases `pendente|em_andamento|validando|gate_usuario|
  bloqueada|concluida|pulada`; shots `planejado|gerando|em_qc|aprovado|descartado`;
  eventos `info|alerta|erro` (último evento `erro` de um ref pinta o nó).
- Tema escuro único (decisão de spec); localhost-only; sem backend.
- Terminologia do workbench é vocabulário de UI: fase, gate, wow-shot, âncora,
  take, BLOQUEIA, retake, créditos (cr), validador.

## Brand Commitments

- Nome do repo: **higgs-workbench**; sem logo.
- Voz dos docs: português direto, "medir, não olhar", "olhos frios".
- **Fontes OFL já versionadas em `assets/fonts/`** (Inter, Space Mono, Cormorant
  Light it., EB Garamond it., Playfair it., Fredericka the Great, Manrope, DM Mono
  - a lista canônica vive em `assets/fonts/README.md`) - servíveis pela mesma
  origem do viewer, sem CDN. São a paleta tipográfica canônica do workbench (cartelas dos
  filmes).

## Evidence on Hand

- Fixture golden com todos os estados: `tools/viz/demo/estado.json`.
- Rodada simulada: `tools/viz/demo/simular.sh` (BLOQUEIA → retake → aprovado).
- Não existem: logo, tela de marketing, métricas de uso. Não fabricar.

## Product Principles

1. **Estado de relance**: a fase atual e qualquer erro se acham em ~1s, nos dois
   regimes (meia-tela e fullscreen).
2. **Erro é o sinal mais alto da página**: BLOQUEIA/erro vence qualquer outro
   estado visual (regra já codificada no cascade).
3. **Medir, não enfeitar**: todo elemento mostra um fato do estado.json; nada
   decorativo que minta sobre o estado.
4. **Custo sempre à vista**: créditos gastos × teto são informação de primeira
   classe, não rodapé.
5. **Zero créditos e zero build**: o board nunca gasta crédito e nunca ganha
   toolchain.
