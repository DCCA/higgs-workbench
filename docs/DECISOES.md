# Log de decisões do workbench

Registro append-only, mais recente primeiro. Cada entrada: decisão + o PORQUÊ
(o porquê é o que evapora primeiro). Decisões de GERAÇÃO viram cláusula em
`PRATICAS.md`; aqui ficam as decisões de ARQUITETURA e PROCESSO.

Template:
```
## AAAA-MM-DD - <decisão em uma linha>
**Contexto:** <o que forçou a decisão>  **Porquê:** <a razão que vence>
**Alternativa rejeitada:** <o que não fizemos e por quê>
```

## 2026-08-09 - Reprovação de ritmo se responde com régua, não com gosto
**Contexto:** o usuário reprovou o corte da CORRENTEZA v3 com "os cortes estão péssimos,
quebrando todo ritmo do video". A resposta foi medir movimento interno por plano e a razão
pico-da-emenda ÷ ambiente-do-plano-que-entra, que apontou a causa real: os planos do lado B
estavam congelados (0,25 contra 2,6 do resto) e a razão dava 386× na virada - o corte era o
único evento em cena. **Porquê:** "o ritmo está ruim" é um sintoma sem endereço; a régua dá
endereço, e o conserto passou a ser 0 cr (movimento no plano, gramática de corte-para-dentro)
em vez de regen. Virou cláusula na seção Revisão e montagem do PRATICAS.

## 2026-08-09 - Três variantes de montagem em vez de uma, quando o eixo da decisão é gosto
**Contexto:** com a causa medida, havia dois consertos possíveis (encurtar o plano parado ou
dar movimento a ele) e eles quebravam cláusulas diferentes que o usuário mesmo havia travado.
Foram entregues três variantes completas (0 cr) com o que cada uma quebra declarado, e a
terceira - a que o validador sugeriu e nenhuma das duas primeiras testava - foi a escolhida.
**Porquê:** quando o eixo é impacto, o gate é o usuário assistindo; entregar o par de extremos
mais a síntese custa nada em créditos e evita a rodada de "não era isso".

## 2026-08-09 - Ferramenta de medição declara a própria cegueira
**Contexto:** `camera_review.py` devolveu 0,00 px/f para uma deriva real de 0,73 px/f porque
mede em 180×320 com precisão inteira; e a primeira máscara de site por cor do validador
travava no céu do amanhecer, dando borda falsa. **Porquê:** um PASS de régua cega é pior que
nenhum PASS - passou a ser obrigatório declarar a resolução/limite da régua junto com o
número, e descartar por escrito a régua que falhou no controle.

## 2026-08-08 - Workflow v3: congelamento de ativos (LOCK) + disciplina do still
**Contexto:** o usuário diagnosticou ("não congelamos ativos, personagens e views")
depois de a pessoa B da CORRENTEZA trocar de sala e de monitor entre beats; deep
research em 4 frentes (docs/pesquisa-2026-08/) confirmou e trouxe as receitas.
**Decisão:** fase 3 vira LOOK DEV + LOCK (character sheet, location master, prop
sheet, style key, bloco de identidade; regra "entidade existente nunca nasce de
t2i"; Anchor Frame Method); setups de câmera travados no storyboard; 2-4 stills por
shot; apara planejada; multiplicador 1,3-1,5x; edição concorrente; som obrigatório;
ordem fixa do pós. **Porquê:** consistência é propriedade do workflow, não do
modelo - o que congelamos (pessoa A, por cadeia i2i) ficou consistente; o que não
congelamos derivou. M1 compra consistência, M3 compra retakes; o scorecard do
próximo filme mede as duas contra o baseline CORRENTEZA (3 retakes, 207,5 cr/24s).
**Alternativa rejeitada:** confiar em multi-shot nativo dos modelos (a própria
pesquisa recomenda orçar retries e não confiar para o filme inteiro).
Proposta: docs/PROPOSTA-workflow-v3-congelamento.md (PR #35, aprovada pelo usuário).

## 2026-08-02 - Motion programático (incremento 2): cena = take; direção nova antes do 1º vídeo; node entra como ferramenta
**Contexto:** o usuário quer produzir com saldo ZERO de créditos (evals parado por
crédito de novo); o tipo 100% programático via `tools/motion/` (Remotion) é essa
linha. **Porquê das escolhas:** piloto = notícia AI em infográfico (mesmo job do
tipo notícia, reuso semanal); identidade por DIREÇÃO NOVA com sorteio + página de
decisão (estilo nasce assinado - escolha explícita do usuário sobre reviver a
linguagem Stripe Minions); **cena = take** (cada cena renderiza como clipe e o
ffmpeg monta) para árvore/bíblia/QC/gates funcionarem sem bifurcar o workflow;
1º filme FORA do incremento (é a rodada que gradua o estilo `rascunho`→`ativo`).
Consequência: node/npm entra como dependência local de ferramenta (como a venv do
stable-audio) e a filosofia do CLAUDE.md atualiza para "versiona-se conhecimento -
docs E ferramentas cristalizadas". Spec: `docs/PROPOSTA-motion-infografico.md`.
**Alternativa rejeitada:** timeline única no Remotion (quebraria o método);
infra neutra + re-skin (constrói 2x); kit sob demanda no 1º filme (filme viraria
projeto de infra).

## 2026-08-02 - Estilos de vídeo reutilizáveis DENTRO do higgs; OpenMontage é inspiração, não dependência
**Contexto:** o usuário quer tipos/estilos reutilizáveis nas 4 camadas (receita-doc,
motion determinístico, tipos 100% programáticos, preset híbrido); o OpenMontage já
tem um motor Remotion parametrizado maduro. **Porquê:** decisão explícita do usuário -
o workbench público fica independente e autocontido; a arquitetura do OpenMontage
(composições por props JSON, estilos como playbooks) entra como referência de design.
Consequência: a filosofia "sem código de aplicação" evolui para "versiona-se
conhecimento: docs E ferramentas cristalizadas" quando `tools/motion/` chegar.
Piloto: destilar o A CHAVE em `estilos/ESTILO-noticia-nanquim.md` (só docs, 0 cr).
Spec: `docs/PROPOSTA-estilos-de-video.md`.
**Alternativa rejeitada:** consumir o composer do OpenMontage como motor externo
(padrão edge-tts/stable-audio) - mais DRY, porém acopla o método público a um
projeto pessoal em evolução; e reconstruir fora do higgs (fragmenta o método).

## 2026-08-01 - Visualizador de workflow: board por shot via estado.json do diretor + viewer xyflow sem build
**Contexto:** o usuário quer feedback visual ao vivo da rodada do `/novo-video`
(fase atual, shots, erros, custo) sem reler o terminal. **Porquê:** estado semântico
(fase, gate, BLOQUEIA, retake) só o diretor conhece - logo a fonte é um
`<slug>/estado.json` escrito a cada transição e conferido pelo validador-gate no
gate (mesmo músculo de disciplina+conferência da bíblia); viewer é HTML único em
`tools/viz/` com React+xyflow via CDN e `python3 -m http.server`, porque o repo não
tem (e não quer) toolchain node/build. Spec: `docs/PROPOSTA-visualizador-workflow.md`.
**Alternativa rejeitada:** hooks + derivação do disco (captura jobs mas não fases/
vereditos, e hooks são config de máquina não versionada); app vite (toolchain
permanente por uma página); Artifact (não é tempo-real nem enxerga o disco).

## 2026-07-26 - A CHAVE (vídeo-notícia OpenAI×HF): motion-graphics + o custo da iteração de direção
**Contexto:** 1º vídeo de notícia/motion-graphics do workbench. **Porquê das viradas:**
o usuário reprovou tom (colagem fofa), metáfora (chave abstrata) e movimento (imagem
estática) em sequência - convergiu em GoT-nanquim com flyover contínuo. **Lições que
ficam:** seedance esboço→cheio = ilustração se construindo; flyover > push p/ sensação
de voo; reveal amplo precisa de end-frame (senão alucina mapa-múndi); edge-tts não fala
inglês (nomes só na tela, VO em PT puro); arte IA sem texto + overlay PIL nítido.
**Alternativa rejeitada:** gemini_omni/colagem (testado, arquivado) e PIL-crop de PNG
estático (não vira GoT). **Honesto:** projeto caro em iteração; o valor foi o motor e
as ~8 lições novas em PRATICAS/FERRAMENTAS para o próximo motion-graphics.

## 2026-07-25 - Adoção vox fechada: 7 itens entram (com selos de validação), 1 REPROVADO pelo próprio framework
**Contexto:** plano pré-registrado (PLANO-adocao-vox.md) executado: TTS validado
local (Δ6,1s), catálogo verificado na conta (gemini_omni 30cr/10s, sem start/end),
moderação herdada marcada, fake-oner com trava de A/B, lente de retenção, scorecard.
**Porquê do destaque:** o item #5 (brief musical quantificado) caiu EXATAMENTE como
o framework desenha - empate no A/B cego + promessa estrutural quebrada na medição
RMS (clímax a 24% em vez de 75%). Pré-registro impediu adotar por fé.
**Alternativa rejeitada:** adotar #5 "porque não custa nada" - custaria a ilusão de
controle; o método real de clímax segue sendo janela por curva RMS. Predictor
baseline segurado (tool sem get_cost; rodar só com custo medido e autorizado).

## 2026-07-25 - Sem LLM-juiz por cima do validador; lint determinístico + calibração + escapes
**Contexto:** "quem valida o validador?" **Porquê:** sem ground truth, outro LLM é só
mais uma opinião falível (regressão infinita); formato/cobertura são verificáveis por
script (`lint_veredito.sh`), mérito por casos dourados (`CALIBRACAO.md`), e realidade
pelos escapes do usuário - cada camada com o juiz certo.
**Alternativa rejeitada:** agente juiz-do-juiz (custo sem gabarito).

## 2026-07-25 - validador-gate (subagente de olhos frios) antes de TODO gate do usuário
**Contexto:** pedido do usuário ("cada etapa validada antes de chegar a mim") + a
câmera-fantasma provou que quem produz normaliza o próprio erro (regen de 52,5 cr).
**Porquê:** maker-checker real; o gate do usuário vira só decisão criativa.
**Alternativa rejeitada:** migrar o workflow inteiro para subagents - as fases são
corrente sequencial com gates criativos, e o contexto/gosto mora na thread principal.

## 2026-07-25 - Árvore padrão de arquivos por filme; status é PASTA; master sem versão
**Contexto:** alem/ terminou com ~40 arquivos achatados, teste e final indistinguíveis.
**Porquê:** quem abre a pasta decide em segundos; supersedido desce na hora;
`06_master/<SLUG>_MASTER.mp4` é sempre a entrega vigente.

## 2026-07-25 - Reviews medidos obrigatórios (7b anti-slop/câmera, 8b soundtrack)
**Contexto:** slop passou batido (câmera em quadro), música morreu antes do fim,
branco de 0,4s leu como corte. **Porquê:** "medir, não olhar" estendido a câmera
(correlação de fase, tracking por cor) e som (cobertura, ebur128, sincronia por RMS).

## 2026-07-25 - Workflow v2: fase 1.5 Conceito; casting trava nos âncoras; linguagem de montagem trava no storyboard
**Contexto:** ALÉM queimou ~100 cr num mundo conceitualmente errado e refez takes por
2 pivôs tardios (casting, cortes→oner). **Porquê:** conceito abstrato exige 3-5 opções
com teste de categoria/arco ANTES do primeiro still; pivô tardio tem preço explícito.
Validado por backtest de papel: v2 capturaria ~16 de ~20 falhas históricas (~30-35% dos
1.289 cr gastos nos 4 projetos).

## 2026-07-24 - Trilha comercial: preview privado ok; publicar = biblioteca do app ou export limpo
**Contexto:** usuário escolheu faixa Jóhannsson (DG) via YouTube. **Porquê:** queimar
faixa comercial no arquivo publicado = risco de mute/strike; janela musical escolhida
por curva RMS (clímax no beat certo), nunca "do início".

## 2026-07-24 - Filme sem cortes: oner costurado (rota A), emenda dentro do branco
**Contexto:** usuário pediu "shot único"; Seedance limita takes a 15s. **Porquê:**
2 takes emendados DENTRO do clarão branco (técnica 1917/Birdman) dão a experiência de
oner sem apostar tudo numa geração; ele é o conteúdo compartilhado constante.
**Alternativa rejeitada:** oner literal de 15s (filme encolhia e risco de retake de
52,5 por tentativa).

## 2026-07-24 - O usuário é o personagem (identidade VOO); figurino por ambiente
**Contexto:** pivô "usa eu" + "a roupa não condiz com o ambiente". **Porquê:** refs
reais (3 fotos, media_ids na bíblia do VOO) seguram identidade; figurino é decisão de
produção por mundo (suéter vermelho = teatro + praia fria), vermelho segue como farol.

## 2026-07-23 - Conceito por opções: "o além é OUTRA categoria, não mais do mesmo"
**Contexto:** mundo montanha reprovado ("não representa expectativa vs além"); insight
do usuário: montanha maior ainda é montanha. **Porquê:** clímax precisa quebrar de
categoria (terra→ar, palco→amanhecer) e o arco precisa terminar diferente de onde
começou - virou teste formal da fase 1.5.

## 2026-07-23 - Remote + fluxo de git obrigatório: branch → PR → review → merge
**Contexto:** repo era local-only, commits diretos na main. **Porquê:** pedido
explícito do usuário; todo agente futuro herda a regra pelo CLAUDE.md.

## 2026-07-19 - Storyboard é fase obrigatória com gate (custo zero)
**Contexto:** VOO v1 reprovado por estrutura; 4 iterações de papel pegaram 2 problemas
antes de um take de 52,5 cr. **Porquê:** papel é grátis, take não é (princípio 5).

## 2026-07-18 - Repo é workbench permanente; mídia fora do git; voz de VO por vídeo
**Contexto:** fundação. **Porquê:** conhecimento (bíblias, práticas) é o ativo
versionável; mídia é regenerável por job ID; voz travada como padrão empobrece.
