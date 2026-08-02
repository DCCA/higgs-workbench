# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é este repo

Workbench permanente de produção de vídeo com IA (Higgsfield MCP + ferramentas locais gratuitas). Não há código de aplicação, build nem testes - o produto são vídeos; o que se versiona é conhecimento: práticas de geração, bíblias de produção e a skill do workflow. Toda mídia gerada fica FORA do git (regenerável pelos job IDs registrados nas bíblias).

## Ordem de leitura obrigatória

1. `PRATICAS.md` - regras de geração destiladas dos projetos (custo/preflight, identidade, movimento de câmera, armadilhas do modelo e antídotos, storyboard, revisão). Ler antes de qualquer geração.
2. `FERRAMENTAS.md` - stack gratuito de áudio/pós (VO, trilha, foley, edição, upscale local) e as pegadinhas de licença (MusicGen é CC-BY-NC: nunca para uso comercial).
3. `<projeto>/BIBLIA.md` - fonte de verdade do projeto específico: identidade travada, frames-âncora com job IDs (reutilizáveis como `medias`), decupagem, custos medidos, lições.

`PROJECT_STATUS.md` é o logbook por sessão (mais recente primeiro): onde as coisas pararam, decisões e pendências. Consultar no início da sessão, atualizar ao encerrar.

`docs/` é a arquitetura viva: `ESTRUTURA.md` (as peças do sistema + fluxograma do
workflow v2 com o loop de validação) e `DECISOES.md` (log append-only de decisões de
arquitetura/processo, com o porquê - decisões novas SEMPRE entram lá).

## Estrutura

- Cada vídeo = uma pasta na raiz (`<slug>/`, **gitignorada por entrada explícita**:
  adicionar `/<slug>/` ao `.gitignore` na criação do projeto, não há padrão que pegue
  pasta nova - o portfólio fica local)
  com sua `BIBLIA.md` e a árvore padrão `storyboard/ 01_refs/ 02_ancoras/ 03_takes/
  04_qc/ 05_cortes/ 06_master/` (status é pasta: aprovado na principal, supersedido em
  `_descartados/`; `06_master/` só com a entrega vigente - detalhes na fase 2 da skill)
- `assets/fonts/` - fontes OFL compartilhadas (Inter, Space Mono, Cormorant, EB Garamond, Playfair) para cartelas/overlays
- `.claude/skills/novo-video/SKILL.md` - workflow oficial de criação (10 fases com gates de aprovação do usuário)
- `.claude/agents/validador-gate.md` - subagente validador de olhos frios, exigido em todo gate (princípio 6 do workflow)
- `tools/` - ferramentas de QC versionadas (`tools/qc/`); `tools/viz/` - board ao vivo do workflow (`bash tools/viz/serve.sh <slug>`, ver ESTRUTURA.md); `tools/stable-audio/` (gitignorado) roda o gerador de trilha na GPU local (ver SETUP.md)
- `estilos/` - receitas reutilizáveis por tipo de vídeo (`ESTILO-<slug>.md`; contrato em `docs/PROPOSTA-estilos-de-video.md`)
- Entregas para o usuário assistir: copiar para a sua pasta de entrega (ex.: `~/Downloads/<slug>/` ou onde preferir; ver SETUP.md)

## Workflow

Vídeo novo = invocar a skill `/novo-video` (escala padrão: 15-60s, 3-8 shots, 100-300 créditos, 9:16 fast 720p). Princípios inegociáveis, detalhados na skill:

1. Todo problema resolvível no still (~2 cr) não chega ao vídeo (17-52 cr)
2. Preflight com `get_cost: true` sempre; nunca estimar; mostrar a conta antes de gastar
3. Strip de 4 frames é controle de produção; revisão de verdade é a folha de cortes (última × primeira imagem de cada emenda)
4. Wow-shot prototipado primeiro, fora de ordem - se não impressiona, replaneja antes de produzir
5. Nenhum vídeo é gerado sem storyboard aprovado (custo zero: PIL + frames já pagos como beats)
6. Nenhum material de gate chega ao usuário sem passar pelo subagente `validador-gate` (`.claude/agents/validador-gate.md` - olhos frios, read-only); aceite do veredito via `bash tools/qc/lint_veredito.sh` + 1 spot-check de evidência

## Comandos

- ffmpeg é o motor de montagem: concat com `-c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -r 24`; `ffprobe` para durações. Medir, não olhar, quando dá.
- QC medido (não re-inventar em ffmpeg cru): `bash tools/qc/qc_video.sh <video> <pasta_qc>` cobre folhas de contato 2fps, flicker (YAVG), freeze, cortes duros e loudness; câmera (wobble/jerk): `tools/qc/camera_review.py` (uso no cabeçalho do script); lint do veredito do validador: `bash tools/qc/lint_veredito.sh <veredito.txt>`; calibração dos checklists em `tools/qc/CALIBRACAO.md`
- VO: `edge-tts` via `uvx --from edge-tts edge-tts ...` - gerar 2-3 candidatas com o texto real do vídeo; a voz é escolhida POR VÍDEO, nunca fixada como padrão do workbench
- Trilha: `tools/stable-audio/.venv/bin/python tools/stable-audio/gerar_trilha.py "prompt" <segundos> <saida.wav> [seed]`

## Fluxo de git (obrigatório para qualquer agente)

Nunca commitar direto na `main` - nem docs, nem "só uma linha".

1. Abrir branch ANTES de qualquer edição (`git checkout -b <tipo>/<slug>`, ex.: `docs/registro-voo`)
2. Commitar na branch e fazer push (`git push -u origin <branch>`)
3. Abrir PR (`gh pr create`) e revisar o diff da PR antes de seguir
4. Merge só depois da revisão; deletar a branch após o merge

Vale para toda mudança neste repo, inclusive bíblias, `PRATICAS.md` e `PROJECT_STATUS.md`.

## Convenções

- Docs em português; prompts de geração em inglês (blocos de identidade, cláusulas anti-armadilha)
- Registro ao encerrar (fase obrigatória): bíblia atualizada (job IDs, custos reais × preflight, retakes com causa e antídoto), cada lição nova promovida a cláusula em `PRATICAS.md`, sessão logada em `PROJECT_STATUS.md`, commit só de docs
