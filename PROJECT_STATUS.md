# Status do workbench

Logbook por sessão, mais recente primeiro. Detalhe por projeto na `BIBLIA.md` da
pasta de cada filme (local, fora do repo público). MARÉ ALTA (pausado em 2026-07-18)
foi removido do disco local; o histórico dele segue nas entradas antigas abaixo.

## 2026-08-09 - CORRENTEZA v3: reprovação de ritmo consertada por medição, master 1080 mudo

**Where we were:** o remake da CORRENTEZA rodando o workflow v3 completo tinha chegado ao
gate do corte com `corte_v2.mp4` (23,08s, 260,5 cr de teto 275) aprovado pelo validador.

**What we did:** o usuário reprovou o corte - "os cortes estão péssimos, quebrando todo
ritmo do video" - e o resto da sessão foi responder isso com régua, a 0 crédito.

- **Diagnóstico medido** (`tblend=all_mode=difference` + `signalstats`): o lado B estava
  congelado (movimento interno 0,25/0,27 contra 2,6-3,3 do resto) e a razão pico-da-emenda ÷
  ambiente dava **386× na virada** e 52× em b5→b6 - o corte era o único evento em cena. Mais:
  o "estouro" não existia dentro de nenhuma fonte (é fabricado pela emenda), WOW→luta era jump
  cut e b5/b6 violam a regra dos 30° (mesmo fundo, só a pessoa muda).
- **Três variantes completas** entregues ao usuário, com o que cada uma quebra das cláusulas
  que ele mesmo travou. Ele escolheu a `tese` (22,625s): deriva vertical no lado B com TODOS
  os cortes secos, inclusive a virada. Movimento interno do lado B subiu para 1,76/2,49 e
  todas as emendas ficaram ≤ 56×, sendo esse valor o corte deliberado da tese.
- **4 rodadas de validador no corte.** Duas pegaram defeito real de mídia (site fatiado na
  borda no frame que revela o produto; `xfade transition=dissolve` que **não é crossfade, é
  dither por pixel**, entregando 1,0s de sal-e-pimenta) e duas gastaram em números que eu
  havia escrito errado na bíblia. Palavras redesenhadas sobre o plano já reenquadrado, uma
  faixa por palavra: CLICKBAIT saiu de 0,08s legível para 2,04s.
- **Fase 8 (som) feita e depois CANCELADA pelo usuário** ("lets cancel audio for now"), no
  meio da segunda rodada de validação. Antes de cancelar, o gate de som pegou o achado mais
  instrutivo da sessão: o leito de "água" gerado era **drone de sub-bass** (100% da energia
  abaixo de 200 Hz) e, no filtro de alto-falante de celular, o contraste entre os dois lados
  do filme **invertia** - a tese morria no dispositivo-alvo do 9:16. Consertado com hiss largo
  (+10,00 dB de contraste) e foley de teclado (+25,6 dB na abertura) antes do cancelamento.
  Material preservado e regenerável em `05_cortes/som/`.
- **Master 1080 mudo** (`master_tese_1080.mp4`, 31 MB): cartela e palavras renderizadas
  NATIVAS em 1080 (2,76× de nitidez no texto contra ampliar), `-bf 0` matando a modulação de
  nitidez de 9,95% → 0,58% no plano com deriva, sem grão sintético (o teste inflou 31 MB para
  189 MB) e sem grade (o look foi aprovado sem ela).

**Decisions:** reprovação de ritmo se responde com régua e não com gosto; três variantes
quando o eixo da decisão é impacto; toda régua declara a própria cegueira. As três estão em
`docs/DECISOES.md`. Gasto do filme segue **260,5 cr de teto 275** - todo o retrabalho desta
sessão custou 0 crédito.

- **Master 1080 APROVADO no gate** (`04_qc/veredito_master_v1.txt`, 0 BLOQUEIA). Equivalência
  com o corte aprovado provada por PSNR (média 44,36; 34,12 com 1 frame de deslocamento, o que
  prova alinhamento exato) e todas as garantias do gate de imagem sobrevivem. Ele falsificou uma
  justificativa minha: os planos NÃO levam o mesmo fator de ampliação (1,500× / 1,831× / 1,651×
  / 2,177×), então a cláusula do grão que eu já tinha mergeado estava com a premissa errada -
  corrigida antes de virar regra. **Entrega vigente: `06_master/CORRENTEZA2_MASTER.mp4`** (com
  faststart), espelhada em Downloads.
- **Auditoria de docs (#39).** O `CLAUDE.md` omitia Manrope e DM Mono da lista de fontes (as
  duas que as cartelas usam), listava 6 princípios onde a skill tem 8 e apontava o fluxograma
  como v2; o `docs/ESTRUTURA.md` descrevia o workflow v2 inteiro e o kit motion com 6 cenas
  quando tem 11; o `LICENSE` redistribuía 3 famílias OFL sem citá-las; o `SKILL.md` era a única
  fonte dizendo 17-45 cr contra os 17-52 dos outros três. Consertado tudo, com os comandos
  documentados rodados como prova. E o `lint_veredito.sh` ganhou guarda: com caminho errado ele
  concluía "RE-RODAR o validador", ou seja um typo meu lia como veredito sobre o validador.

**Scorecard v3 × baseline** (na bíblia, com leitura honesta): 11,5 cr/s contra 8,6 - **33,7% mais
caro**, porque 154 dos 260,5 cr foram 5 iterações do wow-shot em movimento -, e **47% dos vereditos
saindo APROVADO** (9 de 19). Os dois números estavam errados na primeira redação: eu havia escrito
"26% mais caro", que é quanto a baseline era mais BARATA (1 − 8,61/11,51), e rotulado a fração de
vereditos como "gates aprovados de 1ª". Pegos por revisão adversarial. Em troca: 7 BLOQUEIA reais pegos antes do usuário, o defeito nº 1 da baseline
(monitor/sala mudando entre beats 5 e 6) morto com régua falsificável, e **0 cr** em todo o
retrabalho de montagem, som e master.

**O escape que importa:** o RITMO. Cinco rodadas de validador aprovaram o corte_v2 e o usuário
reprovou em uma frase, porque régua nenhuma perguntava se o filme tinha ritmo - o mesmo buraco
do SINAL na sessão anterior, em outra roupa. O processo mede fato e forma; impacto só o usuário
assistindo mede.

**Pending / next:**
- [ ] Faixa de áudio do usuário - pendência mais antiga do projeto, agora sem prazo (fase 8
      cancelada por brief explícito). Se ela entrar: re-medir espectro, loudness e true peak, e
      o master precisa ser refeito com áudio.
- [ ] Opcional, custa créditos e reabre a conta: A/B do `upscale_video` contra o lanczos local
      (ringing medido em 0,24% de overshoot - não justifica por si só). Video2X não está
      instalado e instalar exigiria sudo.
- [ ] Decisões da auditoria que ficaram com o usuário: PNGs de logo largados em `qc_out/`, os 4
      `docs/PLANO-*.md` com checkboxes vazias apesar de implementados, nota de que o LOCK não
      retroage a projetos antigos, e o segundo mundo do `tools/motion/src/gs/` sem surface brief.

## 2026-08-08 - Promo do AI Signal Desk: SINAL abortado no corte, CORRENTEZA de pé com corte v2

**Where we were:** SOL entregue; saldo Higgsfield de volta (3000 cr, plano ultra);
usuário pediu um promo para o AI Signal Desk.

**What we did:** duas produções na mesma sessão - uma morreu, a outra está de pé.

- **SINAL (abortado no gate de corte, 0 cr).** Promo 100% programático no
  ground-station, 6 beats/30s. O processo funcionou demais no que ele mede e não
  mede o que importa: 5 rodadas de validador barraram **7 BLOQUEIA reais** (4
  premissas minhas da mesma família - *campo de dado lido como feature sem abrir o
  código do produto*: `tier` como funil, escopo de semanas, score 0-100 aposentado
  e guardado por CI, "todo dia" com 2 dias vazios) - e o usuário assistiu e
  reprovou: "slideshow com fade-in", chato, sem vender. **Nenhuma rodada perguntou
  se o filme era bom.** Eu tinha pulado a fase 5 alegando que o comp (frame parado)
  provava o wow. Pasta `sinal/` local com bíblia e 3 vereditos; lições de faixa de
  cor (219/255), freezedetect e concat-timebase promovidas ao PRATICAS.
- **CORRENTEZA (vivo, corte v2 entregue).** O usuário escreveu a história ele
  mesmo (7 beats: enxurrada sai da tela → luta → amanhecer da pessoa B → site
  filtrando a maré). Cena real cinematográfica, gates por STILL (2 cr) antes de
  cada take, wow em MOVIMENTO antes de produzir o resto. 4 takes gerados + 2
  composições de site real (captura chromium + warp + máscara de oclusão por
  frame) + palavras derivando na correnteza (drawtext) + cartela nativa.
  `corte_v2.mp4`: 24,1s, QC de emendas limpo. **207,5 cr** (25 stills + 7 takes,
  3 retakes com causa; extrato bate com preflight ao centavo).
- **PRATICAS.md**: +13 cláusulas pagas nesta sessão (interceptação em cena clara,
  figurino-default hacker, causa no end frame, olhar coreografado, sujeito-estátua,
  ~70% do volume do still, faixa de cor, freezedetect, concat, site-em-tela,
  pegadinha zsh, preço nos dois sentidos).
- Também: CLAUDE.md do repo ganhou os comandos que faltavam (PR #33, merged).

**Decisions:** o usuário assume o gate de impacto vendo MOVIMENTO (validador não
julga "é bom"); pedir direção mínima ANTES de construir (3 artefatos completos
morreram por eu não perguntar); casting v5/v2 e end frames escolhidos pelo usuário
still a still; virada noite→dia em corte seco; site só na tela da pessoa B.

**Pending / next:**
- [ ] Veredito do usuário no `corte_v2.mp4` (em `Downloads\correnteza\`)
- [ ] Áudio: usuário tem uma faixa em mente e ainda não disse qual
- [ ] Master 1080 (upscale A/B) + QC no entregue; validador técnico antes do master
- [x] Workflow otimizado → **v3 (congelamento de ativos)**: deep research em 4
      frentes + proposta aprovada pelo usuário (PR #35) e aplicada em SKILL,
      validador-gate e PRATICAS (PR #36)
- [ ] Escuta do beat aos 26s do SOL (pendência antiga, segue aberta)

## 2026-08-02 (parte 3) - SOL: primeiro filme com ZERO créditos, e o estilo Ground Station graduado

**Where we were:** kit motion recém-shipado com o mundo quadro-negro; nenhum filme feito
nele; `evals` ainda parado por crédito.

**What we did:** produzimos o filme **SOL** (48,7s, 9:16) sobre o experimento do
Bottleneck Labs - um agente que recebeu um negócio real e 24 horas - do brief à entrega,
**custo 0 créditos** (~2 min de render local). O usuário pediu um estilo NOVO pinando a
referência: paleta do próprio AI Signal Desk. Descobrimos que o mundo já existia lá
(o reel `social-drafts/2026-08-01-anthropic-egress-reel/`), então o estilo foi HERDADO
com evidência (13/13 hexes conferidos), não inventado: papel bone, tinta, um vermelho,
Manrope + DM Mono, sombra dura deslocada, grão.

- **`ESTILO-ground-station.md` nasceu rascunho e GRADUOU no mesmo dia** (PR #31), com
  hipóteses substituídas por medições do filme: decupagem real (10 beats/49s), regra de
  montagem corrigida (o xfade marca a SAÍDA do objeto-fio, não a permanência), tempos de
  render (~9,1s por cena de 4s, 65% acima da hipótese herdada), loudness e contraste.
- **Segundo mundo no kit** (`tools/motion/src/gs/`, 5 cenas), aditivo.
- **3 blocos novos no PRATICAS** + cláusula de heartbeat na SKILL.

**Decisions:** arco "as 24 horas" escolhido pelo usuário vendo comps; só números
auditáveis em tela (o "$447" do título do artigo não fecha com o corpo e ficou fora);
VO em português com nomes próprios só na tela; voz Thalita escolhida ouvindo contra o corte.

**O que o processo pegou** (50 achados do validador em 4 gates, 2 BLOQUEIA - os dois meus
e do mesmo tipo, *afirmar sem medir*): a v1 do conceito descrevia como abuso um ato que o
artigo registra como consentido; o faux-bold engordava 27% todo número-herói (peso que a
família não tem); e o validador **falsificou por medição** minha justificativa de loudness,
que estava a um passo de virar cláusula errada no PRATICAS. Um escape: o usuário viu o
alarme de board congelado antes de mim.

**Pending / next:**
- [ ] **Escuta do beat aos 26s** ("e-mails" - estrangeirismo é onde o edge-tts tropeça)
      antes de publicar o SOL em qualquer lugar.
- [ ] Publicar o SOL, se for o caso (o master está em `sol/06_master/`, local).
- [ ] Herdadas: estreia do board/nanquim quando o crédito renovar (evals); 1º filme do
      ESTILO-infografico (quadro-negro) ainda em rascunho; purga dos `refs/pull` antigos
      do GitHub; rotação do token HF.

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
