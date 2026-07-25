# Status do workbench

Logbook por sessão, mais recente primeiro. Detalhe por projeto nas bíblias
(`mascaras/BIBLIA.md`, `mare-alta/BIBLIA.md`, `voo/BIBLIA.md`, `alem/BIBLIA.md`).

## 2026-07-25 (continuação) - Processo endurecido pós-entrega: organização, validador, calibração, docs

**Where we were:** ALÉM entregue e workflow v2 na main (PR #2); pastas de projeto
caóticas; nenhuma validação automática antes dos gates.

**What we did:**
- **Árvore padrão de arquivos** por filme (status é pasta; master sem versão no nome),
  piloto executado na `alem/` (~60 arquivos), `tools/qc/` versionado (#3)
- **`validador-gate`**: subagente de olhos frios OBRIGATÓRIO antes de todo gate do
  usuário; smoke test no master achou 3 ajustes que o produtor normalizou (fantasma de
  texto no end-freeze, hold 1,25s, áudio 96kHz) - corrigidos; master final 25,75s (#4)
- **Calibração do validador**: 6 casos dourados do acervo + 2 rodadas PASS às cegas
  (caso 2 mediu a câmera-fantasma e achou 2 defeitos inéditos no take morto) (#5)
- **`lint_veredito.sh`**: juiz determinístico da RODADA do validador + gatilhos de
  re-rodada; decisão registrada: sem LLM-juiz (regressão infinita sem gabarito) (#6)
- Observações do validador **adjudicadas pelo usuário: aceitas** (pegadas, píer);
  `ALEM_MASTER.mp4` FINAL sem itens criativos abertos (#7)
- **`docs/`**: `ESTRUTURA.md` (peças + fluxograma ASCII do v2 com loop de validação)
  e `DECISOES.md` (12 decisões com porquês; regra: decisão nova sempre entra) (#8)

**Decisions:** cadeia de garantia por camadas, cada uma com o juiz certo (validador ←
lint ← calibração ← escapes do usuário); sem juiz-LLM; docs/ é a arquitetura viva.

**Pending / next:**
- [ ] Usuário: rotacionar o token HF (aberto desde 19/07)
- [ ] ALÉM publicação: export limpo p/ biblioteca do app (trilha comercial) + upscale A/B opcional
- [ ] MÁSCARAS pós e MARÉ ALTA (via fase 1.5) - agora com validador/organização de série
- [ ] Sessão em ~76% de contexto ao encerrar; cold start barato: CLAUDE.md → docs/ESTRUTURA.md → este arquivo
- Créditos: ~1.084 (nada gasto nesta continuação - todo o processo custou 0 cr)

## 2026-07-23→25 - ALÉM completo (filme sem cortes com o usuário) + workflow v2 + backtest

**Where we were:** workbench com práticas v1; usuário queria vídeo de reflexão pessoal.

**What we did:**
- **ALÉM entregue**: `ALEM_FINAL_MASTER_v3.mp4` (24,6s, 1080×1920) - oner costurado
  (teatro→porta→clarão→praia), usuário como personagem (refs do VOO), trilha Jóhannsson
  alinhada por RMS, cartela Cormorant/marfim com a pergunta de La Grazia. **333 cr.**
- Caminho: transbordo (0 cr, papel) → montanha (~100 cr, conceito reprovado) →
  5 conceitos → PALCO→AMANHECER → cortes v5 → pivô oner + pivô casting → reviews.
- **Repo ganhou remote + fluxo obrigatório branch/PR** (CLAUDE.md novo, PR #1).
- **Workflow v2** (reforma estrutural pós-4-projetos): fase 1.5 Conceito (3-5 opções,
  gate para brief abstrato), casting trava nos âncoras, linguagem de montagem trava no
  storyboard, checklist de bordas por still, fase 7b (anti-slop + câmera MEDIDA),
  fase 8b (soundtrack: cobertura/ebur128/sincronia), padrões de cartela e master.
  +11 cláusulas novas em PRATICAS.md; seção de tooling de review em FERRAMENTAS.md.
- **Backtest de papel (0 cr)** do v2 contra os 4 projetos: das ~20 falhas pagas,
  v2 captura ~16 em gates de papel/still; economia estimada ~390-450 cr de 1.289
  gastos históricos (~30-35%); ALÉM teria custado ~150-180 em vez de 333.
  Risco residual honesto: gosto em MOVIMENTO, variância do modelo em semântica nova.

**Decisions:** review medido (7b/8b) é inegociável antes de entrega; conceito abstrato
nunca começa com 1 aposta; pivô tardio tem preço explícito nos gates.

**Pending / next:**
- [ ] Usuário: rotacionar o token HF (aberto desde 19/07)
- [ ] ALÉM publicação: export limpo p/ biblioteca do app (a versão com música é preview
      privado - Jóhannsson/DG é comercial) + upscale A/B opcional
- [ ] MÁSCARAS pós (voz/trilha/cor/cartela/upscale) - agora com os padrões novos
- [ ] MARÉ ALTA pausado - recandidatar via fase 1.5 (5 conceitos)
- Créditos: ~1.084 restantes

## 2026-07-19 (continuação) - VOO v2 corpo vivo; storyboard vira fase padrão

**Where we were:** VOO_final entregue, mas usuário reprovou a rigidez do corpo no take.

**What we did:**
- Investigado `motion_control` (Kling 3.0): 3 falhas GRATUITAS que mapearam a ferramenta -
  não detecta personagem de costas, exige doador limpo, e não suporta pose de bruços
  (`d1288e8`, `60fc281`). Acervo livre de voo solo esgotado sem doador viável.
- Caminho vencedor: prompt como COREOGRAFIA DE EVENTOS FÍSICOS (não adjetivos) - teste
  no deslize (17,5 cr) provou; take único v2 (52,5 cr) aprovado pelo usuário.
- **VOO_final_v2.mp4 entregue** (15s, corpo vivo, trilha C) em Downloads\voo\ (`13c0d96`)
- Lição promovida a PRATICAS.md: coreografia de eventos físicos > adjetivos de movimento
- A pedido do usuário: **storyboard virou fase 4 obrigatória com gate no /novo-video**
  + 5º princípio: "nenhum vídeo é gerado sem storyboard aprovado" (`3d71cd4`)

**Decisions:** rigidez de corpo se resolve por coreografia nomeada com timing, não por
motion transfer (limite de pose da ferramenta) nem adjetivos; storyboard é etapa padrão.

**Pending / next:**
- [ ] Usuário: rotacionar o token HF (ainda aberto)
- [ ] MÁSCARAS pós: voz, trilha, cor, cartela, upscale A/B
- [ ] MARÉ ALTA pausado (conversa de conceito antes de retomar)
- [ ] Opcional: upscale VOO_final_v2 para 2K; remote do repo
- Custo VOO total: ~216 cr. Créditos: ~1.418 restantes

## 2026-07-19 - VOO completo (1º vídeo do usuário voando) + Stable Audio local

**Where we were:** MARÉ ALTA pausado; workbench com práticas/skill; usuário queria
vídeo de si mesmo voando.

**What we did:**
- VOO v1 (4 shots): produzido e REPROVADO por realismo - diagnóstico estrutural
  (físicas independentes, ângulo impossível, cortes secos)
- Pivô: storyboard local custo zero (4 iterações, PIL + frames pagos) → take único
  15s câmera fixa, mundo povoado (farol/barcos/gaivotas) → APROVADO
- Trilha: Stable Audio Open 1.0 local na RTX 3070 (setup em tools/stable-audio,
  gerador reutilizável gerar_trilha.py) - 3 variações, custo zero
- Fotos do usuário como identidade one-off (3 refs via media_upload)
- Entregas: VOO_final.mp4 (trilha C) + 2 alternativas de trilha em Downloads\voo\
- Lições novas promovidas a PRATICAS.md: tilt sem conteúdo compartilhado, orçamento
  de pixels, plano-sequência estrutural, realismo por câmera real, evidência física
  p/ anti-física, continuidade de figurino, storyboard-antes-do-take

**Decisions:** realismo passa por câmera plausível + corpo solto + mentira mínima;
storyboard local vira etapa padrão antes de takes >30 cr; trilha local no workbench
(HF token do usuário deve ser ROTACIONADO - passou pela conversa).

**Pending / next:**
- [ ] Usuário: rotacionar o token HF (read-only, exposto no chat)
- [ ] MÁSCARAS pós: voz (3 mp3), trilha, cor, cartela, upscale A/B
- [ ] MARÉ ALTA pausado (rever conceito do wow-shot antes de retomar)
- [ ] Opcional: upscale do VOO_final para 2K; remote do repo
- Créditos: ~1.435 restantes

## 2026-07-18 - Fundação do workbench, MÁSCARAS completo, MARÉ ALTA iniciado

**Where we were:** diretório vazio, Higgsfield MCP sem configurar, nenhum processo.

**What we did:**
- Higgsfield MCP configurado (escopo user, OAuth) e validado ponta a ponta.
- **MÁSCARAS** (curta 2:24, 26 shots): corte 2 de imagem FINAL - produção completa,
  revisão por folha de cortes e os 7 ajustes aplicados (`MASCARAS_corte2.mp4` no
  projeto e em `Downloads\mascaras\`). ~695 créditos. Detalhe: `mascaras/BIBLIA.md`.
- Workbench fundado como repo git: `PRATICAS.md` (`641006b`), `FERRAMENTAS.md`
  (`fbf25da`), skill `/novo-video` (`324eacf`), regra voz-por-vídeo (`adac787`).
- VO do MÁSCARAS: 3 candidatas edge-tts geradas (custo zero) em `Downloads\mascaras\vo\`.
- **MARÉ ALTA** (~15s, 4 shots, estreia do `/novo-video`): âncoras aprovados no gate,
  wow-shot v1 (tilt) reprovado pelo usuário, v2 (maré-sobe) renderizado aguardando
  veredito (`Downloads\mare-alta\S2_wow_v2.mp4`). 45 de ~103 cr do teto. (`07bd792`)

**Decisions:**
- Repo é o workbench permanente de vídeo; mídia fora do git (regenerável por job ID),
  só docs versionados.
- Voz de VO escolhida POR VÍDEO, nunca padrão do workbench.
- MÁSCARAS: protagonista do Ato 1 mantido sobre a REF-A da decupagem (aproveitou 23s prontos).
- Wow-shot do MARÉ ALTA convertido de tilt para transformação de estado - lição nova:
  movimento de câmera interpolado exige conteúdo compartilhado entre start e end frame,
  senão vira "cortina" (registrada em `mare-alta/BIBLIA.md`).

**Pending / next:**
- [ ] MARÉ ALTA **PAUSADO pelo usuário (2026-07-18)**: wow-shot v1 (tilt) E v2
      (maré-sobe) reprovados; usuário pediu para parar de gerar. Antes de retomar,
      rever o conceito do wow-shot com ele - não gerar de novo sem direção nova.
- [ ] Promover a lição do tilt para `PRATICAS.md` na fase de registro do MARÉ ALTA
- [ ] MÁSCARAS pós: usuário escolhe a voz (3 mp3 em `Downloads\mascaras\vo\`) → mix,
      trilha, foley, passe de cor, cartela melhor, A/B de upscale (Video2X × Higgsfield)
- [ ] Opcional: criar remote (`gh repo create`) para o fluxo branch+PR valer
- Créditos Higgsfield: ~1.634 restantes (de 2.374 iniciais)
