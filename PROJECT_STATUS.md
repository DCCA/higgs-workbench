# Status do workbench

Logbook por sessão, mais recente primeiro. Detalhe por projeto na `BIBLIA.md` da
pasta de cada filme (local, fora do repo público). MARÉ ALTA (pausado em 2026-07-18)
foi removido do disco local; o histórico dele segue nas entradas antigas abaixo.

## 2026-08-02 (parte 2) - Estilos reutilizáveis + linha de produção com saldo ZERO (tools/motion)

**Where we were:** board ao vivo recém-shipado; `evals` parado esperando renovação de
crédito; nenhuma forma de produzir vídeo sem Higgsfield.

**What we did:**
- **Sistema de ESTILOS** (#25 spec, #26 implementação): `estilos/` com contrato de 11
  seções; piloto `ESTILO-noticia-nanquim.md` destilado do A CHAVE (0 cr; blocos EN são
  RECONSTRUÇÃO declarada - validar no próximo filme do tipo); `/novo-video` pergunta o
  estilo no brief, fase 1.5 encurta, fase 2 cria rascunho, fase 10 promove lições e
  gradua; validador confere aderência. A review EXECUTOU a receita de overlay do doc e
  provou que ela renderizava supers invisíveis - corrigida e provada por sonda de pixel.
- **`tools/motion/` - produção com ZERO créditos** (#27 spec, #28 plano, #29
  implementação): workspace Remotion versionado (fonte no git, deps/renders fora),
  `check.sh` como gate, kit de **6 cenas** com props JSON (Abertura, StatCard,
  FluxoDiagrama, Timeline, Cartela, Legendas com alpha). **Cena = take**: árvore,
  bíblia, `qc_video.sh`, gates e validador funcionam sem bifurcar o workflow.
- **Direção visual própria** (gate do usuário, seed 4f753cb2): mundo **"quadro-negro de
  aula"** - ardósia, giz Fredericka the Great (OFL, com atribuição nova em
  `assets/fonts/README.md`), etiquetas de papel para texto pequeno, tokens únicos em
  `tools/motion/src/theme.ts`. `ESTILO-infografico.md` nasce **rascunho** com 12
  HIPÓTESES marcadas.
- **Demo reel de aceite** (22,8s, 5 takes + legendas, 0 cr) montado pelo pipeline real e
  aprovado pelo usuário; publicado como artifact para revisão remota.
- Filosofia do repo atualizada em `CLAUDE.md`: versiona-se conhecimento - docs **e
  ferramentas cristalizadas** (`tools/`). node/npm entra como dependência local.

**Decisions:** em DECISOES.md (02/08) - tudo dentro do higgs, OpenMontage é inspiração e
nunca dependência; cena=take; 1º filme FORA do incremento (é ele que gradua o estilo).

**Pending / next:**
- [ ] **1º vídeo-notícia em quadro-negro** (rodada normal do `/novo-video`, 0 cr): grava
      os tempos medidos, substitui as 12 HIPÓTESES e gradua o estilo para `ativo`.
      Candidato nº1 de re-craft na graduação: `FluxoDiagrama` (outlier vetorial - bordas
      retas e setas sólidas, sem o bow/jitter do resto do kit).
- [ ] Estreia do **board ao vivo** e do estilo nanquim quando o crédito renovar (evals).
- [ ] Herdadas: purga dos `refs/pull` antigos do GitHub (decisão do usuário); rotação do
      token HF (aberto desde 19/07).

## 2026-08-02 - Board ao vivo do workflow (spec → ship → re-skin "linha de metrô") + higiene do repo

**Where we were:** evals pausado por crédito; CLAUDE.md defasado do workflow v2;
ninguém sabia que a descontaminação (#17) tinha levado as bíblias das pastas locais.

**What we did:**
- **CLAUDE.md alinhado ao v2** (#19): validador-gate virou princípio 6, comandos do
  QC empacotado, passo do `.gitignore` por slug (aqui e na fase 2 da skill),
  edge-tts via uvx, custo de vídeo 17-52 cr nos três docs.
- **Higiene mare-alta** (#20) que puxou o fio: bíblias de mascaras/voo/alem/chave
  estavam FORA das pastas locais → restauradas da ref git pré-rewrite; branch
  remota `docs/proposta-open-source` (pré-rewrite, com as 5 bíblias) DELETADA do
  GitHub; sobrou exposição residual via `refs/pull/1-16` (fetch por qualquer um;
  forks: 0).
- **Board ao vivo do workflow**: spec decidido em conversa (#21 - board por shot,
  HTML único + xyflow via CDN sem build, estado.json escrito pelo diretor e
  conferido pelo validador); implementado via plano SDD de 6 tasks com review por
  task (#22 - viewer + serve.sh + fixture golden + simulador sem créditos +
  integração skill/validador/ESTRUTURA; bateria de aceite 4/4, reviews pegaram 4
  bugs herdados do próprio plano); re-skin **impeccable** (#23 - mundo "linha de
  metrô" Beck/Vignelli: fases=estações, gates=baldeações, erro=disrupção; direção
  sorteada seed 6cb3d033 e confirmada pelo usuário; PRODUCT.md + DESIGN.md +
  `.impeccable/` agora são a régua de UI do viewer).
- **Contrato de escrita do estado.json** na SKILL (ref exato, `atualizado_em` UTC,
  tmp+mv atômico, estados validando/gate_usuario) + spec coerente com ele.

**Decisions:** em DECISOES.md (2026-08-01, board por shot + abordagem A + sem
build); erro SEMPRE vence visualmente (produto e cascade); demo/simulador é o
harness de teste do board a custo zero.

**Pending / next:**
- [ ] **Estreia real do board na retomada do evals** (pós-renovação de crédito) -
      o teste de verdade do alarme de frescor ("LINHA SEM REPORTE").
- [ ] evals (herdado de 27/07): refazer S5 reveal, retake S4, montagem final + VO +
      trilha + reviews 7b/8b + registro fase 10; conferir dreno de 320 cr
      "Cinematic Studio 3.5" na conta HF.
- [ ] **Usuário: decidir purga dos `refs/pull` antigos do GitHub** (história
      pré-rewrite com bíblias segue baixável; GitHub Support Sensitive Data
      Removal ou repo privado temporário).
- [ ] Usuário: rotacionar o token HF (aberto desde 19/07).

## 2026-07-27 - evals ("evals são os novos PRDs"): pivô p/ voo rasante, pausado por crédito

**Where we were:** vídeo novo na linguagem do A CHAVE (nanquim/mapa GoT), conteúdo de
podcast público (Lenny × Anthropic). Conceito/storyboard/wow-shot aprovados no isométrico.

**What we did:**
- Fluxo completo até produção no isométrico: conceito → âncoras → storyboard (validador
  em cada gate) → wow-shot (mergulho no `{[ ]}` de JSON, ancorado por end-frame fechado).
  Validador pegou 2 BLOQUEIA de faux-texto (aro do mostrador, depois FACE de engrenagem)
  - corrigidos na raiz (mudar a natureza do objeto + cláusula anti-texto por superfície).
- **Pivô de câmera** a pedido do usuário: isométrico alto → **voo rasante baixo/oblíquo**.
  Re-derivou os 6 beats no ângulo novo (t2i p/ mudar câmera; i2i p/ manter mundo), refez o
  wow (bracket erupciona no lugar), bateu shots S1/S2/S4 e montou rough cut de 4 shots (37s).
- **~5 lições novas em PRATICAS** (faux-texto migra de superfície; i2i trava ângulo → t2i;
  fly-through com meio morto → ancorar reveal; preço seedance 4,5 cr/s; saldo cai por outra
  sessão na conta).

**Decisions:** wow rasante = câmera contida + sujeito erupciona no lugar (o voo vive nos
shots de ligação/reveal, o pull-back é seguro); VO 100% PT (termos só na tela); montagem =
flyover costurado c/ dissolves. Pivô tardio custou ~2x o wow → fechar ângulo antes do take.

**Pending / next:**
- [ ] Refazer **S5 (reveal do campo)** - o mais importante que falta.
- [ ] **Retake do S4** (o beat "passa / 99,9%" não entrega; bracket persiste).
- [ ] Montagem final + VO pt-BR + trilha + cartela + reviews 7b/8b + registro fase 10.
- [ ] **Bloqueio: crédito** (saldo ~6 cr; usuário optou por esperar renovação Ultra).
      Conferir o dreno de **320 cr de "Cinematic Studio 3.5" alheio** na conta HF.

## 2026-07-26 - A CHAVE (vídeo-notícia motion-graphics) + adoção da skill vox validada

**Where we were:** processo endurecido (validador/calibração/lint/docs) na main; usuário
trouxe uma skill externa (vox-motion-graphics) e pediu um vídeo do incidente OpenAI×HF.

**What we did:**
- **Análise + adoção da skill vox** (PRs #10-#13): análise registrada; plano com validação
  pré-registrada por item; rodada executada (0 cr) - 7 de 8 itens adotados com selos,
  **#5 brief musical quantificado REPROVADO** pelo A/B cego + medição RMS (framework
  funcionando: pré-registro impediu adoção por fé). TTS validado (Δ6,1s), catálogo
  gemini_omni verificado, mapa de moderação herdado, fake-oner com trava de A/B.
- **A CHAVE entregue** (PR #14): 1º vídeo-notícia/motion-graphics do workbench, 35,6s
  1080×1920, incidente OpenAI×HF em estilo GoT-nanquim - flyover contínuo sobre mapa
  mecânico de tinta que se constrói, reveal, VO pt-BR. `chave/06_master/CHAVE_MASTER.mp4`.
  ~180 cr. Estreou o workflow v2 inteiro (conceito, validador em cada gate, lint,
  calibração, árvore de arquivos). Master reprovado pelo validador (2 acentos + áudio)
  → corrigido. ~8 lições novas em PRATICAS/FERRAMENTAS.

**Decisions:** motion-graphics/notícia = arte IA sem texto + overlay PIL nítido; edge-tts
não fala inglês (nomes só na tela, VO PT puro); seedance esboço→cheio = "se construindo";
reveal amplo precisa de end-frame; pré-registro mata adoção-por-fé. A CHAVE foi caro em
iteração (muitos pivôs de direção) - o valor foi o motor + as lições.

**Pending / next:**
- [ ] Usuário: rotacionar o token HF (aberto desde 19/07)
- [ ] A CHAVE: publicar (export plataforma) se quiser; motion-graphics agora pavimentado
- [ ] ALÉM: export limpo p/ biblioteca do app (trilha comercial)
- [ ] MÁSCARAS pós e MARÉ ALTA (via fase 1.5)
- Créditos: ~905 restantes

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
