# Proposta: preparar o higgs para GitHub público

Data: 2026-07-26 · Status: **PROPOSTA - nada executado, para sua revisão** ·
Baseada em auditoria do repo (git ls-files, grep de caminhos/segredos/refs pessoais).

## Diagnóstico rápido (o que a auditoria achou)

- ✅ **Zero segredos** no repo (nenhum token/API key vazado; mídia gitignorada).
- ✅ Fontes commitadas são OFL (Inter, Space Mono) - redistribuição livre.
- ❌ **Sem README, sem LICENSE** (bloqueios #1 e #2).
- ⚠️ **Privacidade**: `voo/BIBLIA.md` te descreve fisicamente ("thick dark hair, full
  dark beard") e lista media_ids das SUAS fotos; `alem/` e `chave/` reusam essas fotos
  (você como personagem). Job IDs de todas as bíblias são da SUA conta Higgsfield
  (inúteis para terceiros).
- ⚠️ Caminhos pessoais (`/home/dcca`, `/mnt/c/Users/dcca1/Downloads`) em 3 arquivos:
  `CLAUDE.md`, `.claude/skills/novo-video/SKILL.md`, `.claude/agents/validador-gate.md`.
- ⚠️ Repo é **privado** e chama-se `higgs` (nome interno, pouco descritivo).
- ℹ️ O "produto" é uma METODOLOGIA + skill + prompts + ferramentas de QC, não um app.
  Depende de Claude Code + Higgsfield MCP (conta paga) + ffmpeg + Python + (GPU opcional).

## O que é o repo, do ponto de vista de quem chega

Duas camadas MUITO diferentes convivem hoje:
1. **Framework reutilizável** (o valor para terceiros): `/novo-video` (workflow v2),
   `PRATICAS.md`, `FERRAMENTAS.md`, `validador-gate`, `tools/qc/`, `docs/`.
2. **Portfólio pessoal seu**: `mascaras/ mare-alta/ voo/ alem/ chave/` - seus filmes,
   suas fotos, seus job IDs. Isso é seu trabalho, não o produto compartilhável.

A decisão central da proposta é **como separar as duas**.

## MUST-DO (bloqueios reais para compartilhar)

| # | Item | Por quê |
|---|---|---|
| 1 | **LICENSE** | Sem licença explícita, ninguém pode legalmente usar. Recomendo **MIT** (reuso máximo, simples) para código/scripts; opcional **CC-BY-4.0** para os docs/metodologia (é majoritariamente prosa). Ou MIT para tudo, mais simples. |
| 2 | **README.md** | A porta de entrada. O que é, o que resolve, o que precisa (Claude Code + Higgsfield MCP pago + ffmpeg + Python + GPU opcional), quickstart, como o workflow funciona (link `docs/ESTRUTURA.md`). |
| 3 | **Privacidade** | Decidir o destino das bíblias pessoais. `voo/` é o caso crítico (descrição física + media_ids das suas fotos). Opções em DECISÕES abaixo. |
| 4 | **Generalizar caminhos** | Trocar `/home/dcca` e `/mnt/c/Users/dcca1/Downloads` por convenção documentada (ex.: variável `$HIGGS_DELIVERY_DIR` ou placeholder `<seu-Downloads>`). 3 arquivos só. |

## SHOULD-DO (qualidade para reuso de verdade)

| # | Item | Por quê |
|---|---|---|
| 5 | **Separar framework de portfólio** | Mover os filmes pessoais para `examples/` (como exemplos da metodologia, se scrubados) OU removê-los do repo público. Manter 1-2 bíblias como "worked example" scrubado é ouro didático. |
| 6 | **SETUP.md** | Passo a passo de dependências: configurar o Higgsfield MCP, `edge-tts` (via uvx), Stable Audio Open (GPU), ffmpeg, fontes (fontsource). O venv já é gitignorado - documentar como recriar. |
| 7 | **CONTRIBUTING.md** | Como adicionar lições, a disciplina branch→PR (já no CLAUDE.md), o loop do validador/calibração. |
| 8 | **`.claude/settings.local.json`** | É config pessoal (permissões). Convenção usual: gitignorar o `.local` e prover um `settings.json` template. Hoje está commitado (inofensivo, mas mistura config sua). |
| 9 | **Descrição + topics no GitHub** | "AI video production workbench + methodology (Claude Code + Higgsfield MCP)". Topics: `claude-code`, `ai-video`, `mcp`, `motion-graphics`, `ffmpeg`. |

## NICE-TO-HAVE

- **Galeria de exemplos**: a mídia é gitignorada; hospedar 2-3 stills/storyboards ou
  linkar os vídeos (YouTube/Vimeo) num `examples/README.md` ajuda muito a "vender".
- **`PROJECT_STATUS.md`**: é um devlog pessoal. Decidir se fica público (transparência)
  ou vira privado/gitignore (é a sua rotina, não do produto).
- **Badge/CI leve**: um lint dos scripts `tools/qc/*.sh` (shellcheck) - opcional.

## DECISÕES que preciso de você (não dá pra eu escolher)

1. **Licença**: MIT (tudo) · MIT + CC-BY nos docs · outra?
2. **Filmes pessoais**: (a) remover do repo público; (b) mover para `examples/` com
   scrub de identidade (tira descrição física e media_ids, vira "personagem genérico");
   (c) manter só 1-2 como exemplo da metodologia, scrubados. **Recomendo (c)** - MÁSCARAS
   ou ALÉM scrubados são a melhor demonstração; VOO sai (privacidade).
3. **Nome do repo**: manter `higgs` ou renomear (ex.: `video-workbench`, `higgsfield-video-lab`)?
4. **PROJECT_STATUS.md** público ou privado?
5. **Escopo**: assumir Higgsfield como dependência (documentar) ou generalizar a
   linguagem para "qualquer MCP de vídeo"? (Recomendo assumir Higgsfield - é o que foi
   testado; generalizar seria ficção não verificada.)

## Sequência de execução (se aprovado)

1. Você decide os 5 pontos acima.
2. PR 1 - "descontaminação": scrub/mover filmes pessoais, generalizar caminhos,
   gitignorar settings.local, remover PROJECT_STATUS se privado.
3. PR 2 - "onboarding": LICENSE + README + SETUP + CONTRIBUTING.
4. PR 3 (opcional) - examples/ com bíblia-exemplo scrubada + galeria.
5. Você torna o repo público (ação sua no GitHub) e adiciona descrição/topics.

Custo: **zero créditos** (tudo docs/organização). Risco: baixo, tudo reversível por PR.
Nada foi alterado - aguardando sua revisão item a item.
