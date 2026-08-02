# ESTILO: Infográfico animado (infografico)

Status: rascunho. Origem: direção própria (seed 4f753cb2, escolha do usuário 2026-08-02); gradua no 1º filme concluído.

Estilo **100% programático**: o filme inteiro sai do kit Remotion do workbench
(`tools/motion/`), sem nenhuma chamada de geração. Cada cena renderiza um clipe
fechado e entra na montagem como take normal - **cena = take**. Contrato completo
do kit: `docs/PROPOSTA-motion-infografico.md`; comandos e tempos medidos:
`tools/motion/README.md`.

## Quando usar

O job deste estilo: explicar um fato recente de IA como quem assiste um bom
professor riscar o quadro - o diagrama se constrói, o número aparece grande, a
timeline encadeia, e o payoff é o quadro completo.

Sinais de que o brief pede este estilo:

- O conteúdo é INFORMAÇÃO que precisa ser LIDA: nomes, datas, números, relação
  entre atores. É isso que empurra o filme inteiro para a camada determinística.
- A produção precisa rodar com saldo ZERO de créditos (motivação central do tipo:
  o workbench não pode parar quando o saldo trava).
- O formato se repete (notícia semanal, recorrente): mesmas cenas, props novos.
  Trocar o JSON é o filme seguinte.
- Ninguém aparece, ninguém atua, não há mundo fotográfico a defender.

Pré-requisito de entrada, igual ao do vídeo-notícia: os fatos chegam CHECADOS em
2 fontes cada. O estilo garante forma; a apuração é do brief.

Quando NÃO usar: história com personagem, tom emotivo/onírico, fotorrealismo, ou
brief cujo momento impressionante é a IMAGEM gerada - aqui o wow é a construção
do quadro, não a textura.

## Identidade visual

Este estilo **não tem blocos de prompt**: não há geração por IA no pipeline. A
identidade não é descrita para um modelo, ela é EXECUTADA em código. Os tokens
exatos (cor, tipografia, escala tipográfica, ritmo, espaço) vivem em
`tools/motion/src/theme.ts`, dono único - as cenas consomem e nunca hardcodam
valor. Este documento descreve a gramática; duplicar hex ou px aqui garantiria
divergência entre doc e código.

Procedência: a direção é AUTORAL, não destilada de filme. Nasceu do fluxo de
sorteio com challengers (seed 4f753cb2, mode read); o usuário escolheu a direção
6 na página de decisão em 2026-08-02, o challenger zine foi recusado. O contrato
integral está no cabeçalho de `tools/motion/src/theme.ts`.

**A tese:** a semana de IA explicada A GIZ numa aula. A direção recusa
explicitamente as duas saídas óbvias da categoria - o flat vector corporativo e o
dashboard dark neon.

**O mundo:** ardósia verde-escura; giz branco-quente, amarelo e vermelho com
traço vivo (draw-on, jitter leve, poeira de giz); quantidades como tally marks;
correção de borracha (esfumaçado) como estado; disciplina suíça de layout - grid,
margens generosas - que é o antídoto contra "whiteboard animation" de banco de
imagem. Tally marks e correção de borracha são DIREÇÃO disponível na gramática,
ainda sem componente no kit v1: quem precisar delas constrói a cena, não caça o
que não existe.

**Regra-mãe do tipo: giz DESENHA, etiqueta LÊ.** Todo corpo de texto legível vive
numa ETIQUETA de papel fixada no quadro (material real de aula); o giz fica com
título, número-herói, traço, diagrama e data. Texto pequeno em giz é ilegível em
tela de celular - a etiqueta existe exatamente para isso.

Tipografia: três famílias OFL de `assets/fonts` - display de giz (Fredericka the
Great), corpo em etiqueta (Inter), números tabulares em etiqueta (Space Mono). O
`prepare` do `package.json` copia as fontes para `tools/motion/public/fonts`; a
fonte de verdade continua sendo `assets/fonts`. Tamanho nunca é px solto: a cena
escolhe um degrau da escala do tema (`gigante` a `micro`).

Regras de motion (a gramática que faz o mundo se mover):

- **Entrada é desenho.** Traço de giz entra por draw-on (`strokeDasharray` /
  `strokeDashoffset`); texto de giz entra por fade + scale leve; etiqueta entra
  por pino (spring) com inclinação mínima. Nenhum elemento "aparece" cortado.
- **Uma janela de entrada só.** Toda entrada usa `ritmo.entradaFrames` e assenta
  em `ritmo.assentamentoFrames` (a poeira do giz baixando depois que o traço
  fecha). Ritmo é token, não decisão por cena.
- **Cascata determinística.** Os elementos entram em ordem (título → traço →
  etiqueta; nó → aresta; espinha → eventos). O passo encolhe sozinho quando a
  duração das props é curta para a contagem de itens - a cena nunca corta a
  cascata pela metade.
- **Sem animação de saída na cena.** A saída é a transição do ffmpeg. Exceção
  única e documentada: `Legendas` faz fade-out do segmento - isso é animação
  INTRA-cena de um elemento, não transição de cena (hard-cut de legenda seria
  pior prática de legendagem). Não copiar a exceção para exits de cena.
- **Aleatoriedade é semeada.** Jitter, inclinação e poeira vêm de `random(seed)`
  do Remotion: o mesmo props renderiza o mesmo frame sempre. Requisito duro, não
  estética - re-render tem que reproduzir o take aprovado.
- **Todo frame nasce certo de primeira.** Nada que dependa de medir o DOM e
  reagir no frame seguinte entra numa cena (ver Armadilhas: o `fitView`).
- **Um acento por cena.** `cor.destaque` marca o elemento que importa (o nó, o
  valor); `cor.alerta` fica reservado a queda/risco. Dois destaques na mesma cena
  não destacam nada.
- **A câmera não existe.** O quadro é fixo em todas as cenas do kit v1: quem se
  move é o conteúdo se desenhando. Movimento de quadro não faz parte do
  repertório deste estilo.

## Decupagem padrão

Formato: 9:16, 1080×1920, 24 fps (fixado nas composições em
`tools/motion/src/Root.tsx`). A duração de cada cena é PROP
(`duracaoSeg` → `calculateMetadata`), dentro dos limites do schema.

HIPÓTESE: os beats abaixo são a decupagem proposta para o piloto (notícia de IA
da semana) - nenhum filme os pagou ainda. O 1º filme substitui esta tabela por
durações medidas.

| # | Beat | Cena | Alvo |
|---|---|---|---|
| 1 | Hook: o que aconteceu, em uma linha | `Abertura` | 0-4s |
| 2 | O número que sustenta a notícia | `StatCard` | 4-8s |
| 3 | Quem fez o quê | `FluxoDiagrama` | 8-14s |
| 4 | Como chegou aqui | `Timeline` | 14-20s |
| 5 | Fechamento e fontes | `Cartela` | 20-24s |
| - | Legendas do VO | `Legendas` (overlay alpha) | filme inteiro |

HIPÓTESE: wow-shot típico = o `FluxoDiagrama` - é a cena com mais elementos
entrando em cascata e o maior risco de estourar o quadro. É ela que se renderiza
primeiro, fora de ordem (princípio 4 do workflow). O custo zerado NÃO dispensa a
regra: o risco aqui é de layout e de leitura, e ele aparece igual.

HIPÓTESE: uma frase de VO por cena; a legenda do segmento acompanha a mesma
janela. Cenas de diagrama pedem mais tempo de leitura que cenas de número.

## Linguagem de montagem

- **Cena = take.** Cada composição renderiza um clipe fechado; a montagem é
  ffmpeg, como em qualquer filme do workbench. Transição NUNCA dentro do
  Remotion - é o que mantém árvore de pastas, strips, folha de cortes, QC, gates
  e bíblia funcionando sem bifurcar o workflow.
- **Emendas por `xfade`, 0,25-0,35s.** Vale a mesma aritmética do workbench: o
  `offset` é a duração do corte JÁ MONTADO menos a duração da transição, e cada
  emenda ENCURTA o corte nesse mesmo valor. Medido (2026-08-02): `Abertura` de 4s
  + `FluxoDiagrama` de 6s com `xfade duration=0.3 offset=3.7` deram `9.708333s`
  no `ffprobe` - os 9,7s de 4 + 6 - 0,3 quantizados ao frame (233 frames @ 24 fps).
- **`concat` para o que não tem emenda visível** (a cartela depois do último
  plano, como sempre).
- **A cena não tem corte interno.** Medido no QC da Task 6: o detector de cena
  não acusou corte dentro do take renderizado. Corte duro dentro de uma cena é
  bug de props (duas informações disputando o mesmo clipe), não escolha de
  montagem.
- **Não se corta cena no ffmpeg para caber.** Duração é prop: muda-se
  `duracaoSeg` e re-renderiza (custo: segundos). Trim de take é sintoma de props
  erradas.

HIPÓTESE: alternar densidade - cena de diagrama (densa) seguida de cena de número
(respiro). Ritmo uniforme de cenas densas cansa antes dos 30s.

## Áudio

**VO**

- Valem as cláusulas do workbench sem exceção: 100% pt-BR, `edge-tts`, 2-3
  candidatas geradas com o TEXTO REAL do vídeo (custo zero), voz escolhida POR
  vídeo, pontuação medida com `ffprobe` contra a janela do beat.
- Nomes próprios em inglês saem da FALA e entram como TEXTO. Neste estilo isso é
  barato por construção: a etiqueta de papel já é o material que LÊ, e o texto
  nasce nativo na resolução de entrega.

**Trilha**

- Leito contínuo gerado local (custo zero), mais longo que o corte final; controle
  de clímax por escolha de janela na curva RMS (brief musical quantificado está
  reprovado no workbench).
- Régua herdada: cobertura até o último frame, I ≈ -14 LUFS, TP ≤ -1 dBFS, 48 kHz
  estéreo.

HIPÓTESE: prompt-base do estilo - leito de aula, textura seca e rítmica sem
melodia que dispute com a locução. Ainda não gerado nem medido; o 1º filme
registra o prompt literal aqui.

**Nota medida (2026-08-02, Task 6):** o `npx remotion render` muxa uma faixa AAC
estéreo SILENCIOSA no MP4 mesmo quando a composição não tem nenhum áudio. Efeito
prático: o take de cena nunca chega ao ffmpeg "sem faixa"; o `qc_video.sh` mede
silêncio real (pico `-inf` dBFS, ~-70 LUFS) em vez de cair no ramo `(sem audio)`.
Ler o bloco de áudio do QC sabendo disso - não é trilha ausente por engano, e não
justifica adaptar o script.

## Camada determinística

Neste estilo a camada determinística não é UMA camada: é o filme inteiro. O kit
v1 são 6 cenas, todas com props validados por schema `zod` e duração
dirigida por props.

| Cena | Props (schema) | Duração | Quando usar |
|---|---|---|---|
| `Abertura` | `titulo`, `kicker`, `data` | `duracaoSeg` 2-10s (padrão 4) | hook do vídeo |
| `StatCard` | `valor`, `label`, `contexto?` | `duracaoSeg` 2-10s (padrão 4) | o número que sustenta a notícia |
| `FluxoDiagrama` | `nos[2-8]{id,rotulo,destaque}`, `arestas[≥1]{de,para,rotulo?}` | `duracaoSeg` 3-12s (padrão 6) | quem-fez-o-quê |
| `Timeline` | `eventos[2-6]{data,texto}` | `duracaoSeg` 3-12s (padrão 6) | encadeamento temporal |
| `Cartela` | `texto`, `creditos` | `duracaoSeg` 2-8s (padrão 4) | fechamento, fontes |
| `Legendas` | `segmentos[≥1]{t0,t1,texto}` | do maior `t1` | captions sobre QUALQUER clipe |

Regras da camada:

- **Os limites do schema são a decupagem.** 9 nós num fluxo ou 7 eventos numa
  timeline não são "apertado", são inválidos: o render falha na validação em vez
  de entregar quadro estourado. Passou do limite, quebra em duas cenas.
- **Props JSON são o registro do take.** A bíblia do filme guarda o JSON de cada
  cena no lugar do ID de geração - é o que torna o take reproduzível.
  `tools/motion/demo/<cena>.json` são os props de referência do kit.
- **Texto nasce nativo em 1080×1920.** Não existe aqui a armadilha do overlay
  escalado do vídeo-notícia: nada é renderizado pequeno e ampliado depois.
- **Acento pt-BR mora no JSON UTF-8**, nunca digitado direto no comando.
- **`Legendas` é overlay alpha**, não uma cena de fundo: renderiza `.webm` com as
  TRÊS flags juntas (`--codec=vp9 --pixel-format=yuva420p --image-format=png`) e
  o ffmpeg sobrepõe com `-c:v libvpx-vp9` ANTES do `-i` do webm. O clipe base fica
  intacto e cena = take se mantém. Receita completa em `tools/motion/README.md`.
- **O filtro `overlay` precisa de `eof_action=pass` explícito.** O padrão
  (`repeat`) reexibe o último frame do webm por cima do resto do clipe base -
  legenda "fantasma" congelada em ~7% de opacidade depois que o segmento acaba.
- **Nenhum valor visual fora do tema.** Cor, fonte, degrau de tipo, ritmo e margem
  vêm de `theme.ts`. Geometria de layout (largura de caixa, altura de linha) é da
  cena e vive nela - a fronteira está comentada no código.

## Pipeline

Pré-requisito uma vez por máquina: `cd tools/motion && npm install` (ver
`SETUP.md`). Antes de produzir, o gate do kit: `bash tools/motion/check.sh`
(`tsc --noEmit` + render-smoke de 1s).

| # | Etapa | Ferramenta | Custo |
|---|---|---|---|
| 0 | Fatos checados, roteiro de VO | papel | 0 cr |
| 1 | Props JSON por cena (o roteiro vira dado) | editor | 0 cr |
| 2 | Âncoras = stills renderizados | `npx remotion still <Cena> --props=<props.json> --frame=60 saida.png` (frame tardio - pós-entrada+assentamento; frame 0 é o quadro vazio) | 0 cr |
| 3 | Storyboard = os stills na ordem dos beats | ffmpeg / PIL | 0 cr |
| 4 | Wow-shot = a cena de maior risco, renderizada primeiro | `npx remotion render` | 0 cr + tempo |
| 5 | Takes = cenas renderizadas | `npx remotion render <Cena> --props=<props.json> take_<CENA>_v1.mp4` | 0 cr + tempo |
| 6 | Montagem | ffmpeg `xfade`/`concat`, CRF 16, preset slow, yuv420p, 24 fps | 0 cr |
| 7 | Legendas | render alpha vp9 + overlay ffmpeg | 0 cr + tempo |
| 8 | Áudio | `edge-tts` (VO) + gerador local (leito) + mix | 0 cr |
| 9 | QC medido e gate | `tools/qc/qc_video.sh`, validador-gate | 0 cr |
| 10 | Iteração ao vivo | `npx remotion studio` | 0 cr |

O preflight continua obrigatório e não vira formalidade: a conta mostrada ao
usuário é `0 cr` MAIS o tempo de render por cena. O custo existe, só não é em
crédito.

## Custos típicos

**0 cr em toda etapa, sempre** - por construção: nenhuma etapa do pipeline chama
a API de geração. O custo real é tempo de render local, e ele depende da máquina.

| Item | Valor | Origem |
|---|---|---|
| Qualquer cena, créditos Higgsfield | 0 cr | por construção: sem chamada de geração no pipeline |
| Render `Abertura` (4s, 96 frames) | 5,5s de relógio | medido 2026-08-02, WSL2 + RTX 3070, 12 cores (`tools/motion/README.md`) |
| Render `FluxoDiagrama` (6s, 144 frames) | 7,0s de relógio | medido 2026-08-02, mesma máquina (`tools/motion/README.md`) |
| Still de âncora (1 frame) | não medido | a medir no 1º filme - não estimar |
| VO, trilha, montagem, overlays, QC | 0 cr | `edge-tts`, gerador local, ffmpeg |

Os dois pontos medidos dão 1,4x e 1,2x a duração da cena em tempo de relógio -
dois pontos numa máquina só, não uma régua. Máquina diferente = medir de novo
antes de citar no preflight.

**Filme de referência: nenhum ainda.** O estilo é `rascunho`: o 1º filme
concluído preenche esta seção com o total medido (tempo de render acumulado,
retakes por causa) e gradua o estilo para `ativo`. Enquanto isso, estilo rascunho
nunca é fonte de custo para preflight de outro filme - a única linha que ele
garante é a de créditos, e ela é zero.

## Armadilhas e antídotos

Pagas no build do kit (2026-08-02, incremento 2):

- **`fitView` do xyflow não reenquadra no render headless.** Ele roda UMA vez no
  mount e nunca re-executa; a medição do DOM funciona, mas chega depois - e no
  `still`/`render` do Remotion não existe um "segundo frame" para o fitView
  reagir. Antídoto: layout determinístico (posição por índice, já dimensionada
  para o quadro). *Pago por:* depuração do `FluxoDiagrama` durante o build.
  Generalização que vale para toda cena nova: **nada que dependa de "settle"**.
- **Sombra tingida com a cor do mundo vaza em overlay.** A sombra da etiqueta era
  a ardósia com alpha: imperceptível sobre a própria ardósia, mas em `Legendas`
  (alpha sobre footage arbitrário) pintava um halo verde-escuro no fundo do
  usuário. Antídoto: sombra preta neutra - sombra é física de luz, não cor do
  mundo, e por isso não sai de `tema.cor.*`. *Pago por:* fix na cena `Legendas`.
- **Alpha se perde em silêncio se faltar uma flag.** As três flags do render de
  `Legendas` andam juntas, e no overlay o `-c:v libvpx-vp9` vem ANTES do `-i` do
  webm. Errado, o ffmpeg não reclama: entrega fundo preto sólido por cima do
  filme. Antídoto: conferir o frame overlaid, não o log. *Pago por:* build da
  cena `Legendas`.
- **Take de cena chega com faixa AAC silenciosa.** O `render` muxa áudio vazio
  mesmo sem áudio na composição; quem lê o QC de olho no ramo `(sem audio)`
  conclui errado. Antídoto: ler os números (`-inf` dBFS / ~-70 LUFS = silêncio
  digital), não o texto do ramo. *Pago por:* prova de integração do QC (Task 6).

HIPÓTESE: densidade por cena. Texto demais numa cena de 4s deve ser o erro nº 1
deste estilo - o limite prático (quantas palavras por etiqueta, quantos nós num
fluxo de 6s) só sai medindo em movimento no 1º filme.

HIPÓTESE: cascata contra duração. O passo de entrada encolhe sozinho quando a
duração é curta para a contagem de itens (isso é código, não hipótese), mas o
resultado LEGÍVEL não foi medido: a suspeita é que acima de 5 nós abaixo de 6s a
cascata vire enxurrada.

HIPÓTESE: giz em tela pequena. A regra "giz desenha, etiqueta lê" existe por
causa disso, mas o tamanho mínimo real de giz legível num Short não foi medido.

## Régua de QC

O checklist padrão do workflow e o QC medido do workbench valem inteiros - e
valem SEM adaptação: `qc_video.sh` rodou sobre um take de cena renderizada em
2026-08-02 (folhas de contato, flicker, freeze, cortes, loudness) sem nenhuma
mudança no script. Duas leituras específicas do tipo:

1. **Áudio do take de cena:** faixa AAC silenciosa é o esperado (ver Áudio). O
   que reprova é silêncio no MASTER, não no take.
2. **Aderência ao tema (checável por leitura do diff):** nenhuma cor, fonte ou
   degrau tipográfico fora de `tools/motion/src/theme.ts`. Valor visual solto numa
   cena é BLOQUEIA - é assim que a direção se dissolve em três filmes.

HIPÓTESE: zoom 1:1 em todo texto de etiqueta na resolução final (acentos pt-BR,
quebra de linha, descendentes cortadas). Herdado do vídeo-notícia, onde acento
caído reprovou um master; aqui o texto nasce nativo em 1080×1920, então a hipótese
é que o achado desapareça. Confirmar - ou derrubar - no 1º filme.

HIPÓTESE: legibilidade em tela pequena - assistir o take reduzido a ~25% e
confirmar que número-herói, rótulo de nó e legenda ainda leem.

HIPÓTESE: densidade de informação por cena - uma ideia por cena; duas competindo
é retake de props (custo: segundos).

HIPÓTESE: contraste no frame RENDERIZADO. As razões de contraste dos pares do
tema estão calculadas no contrato de direção, mas sobre cor chapada; o giz tem
textura e opacidade próprias. Medir no frame, não no token.

## Lições (changelog)

- 2026-08-02: estilo criado em `rascunho` junto com o kit `tools/motion` -
  direção autoral (quadro-negro de aula) escolhida pelo usuário na página de
  decisão do seed 4f753cb2. Sem filme concluído: todo bloco marcado `HIPÓTESE:`
  é substituído por medição na fase 10 do 1º filme, que gradua o estilo a `ativo`.
- 2026-08-02: **`FluxoDiagrama` v1 é o outlier vetorial do kit** - bordas retas,
  setas sólidas, sem bow/jitter nos edges (todas as outras cenas desenham à mão
  via `TracoGiz`). Candidato nº1 de re-craft na graduação do estilo: arestas com
  o mesmo draw-on/jitter do resto do mundo giz, não linhas de diagrama de fluxo
  corporativo.
