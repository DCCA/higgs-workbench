# ESTILO: Ground Station (ground-station)

Status: ATIVO (graduado pelo filme SOL em 2026-08-02). Origem: mundo herdado do AI Signal Desk (projeto do próprio autor) -
tokens de `styles.css` e o reel `social-drafts/2026-08-01-anthropic-egress-reel/`;
pinado pelo usuário em 2026-08-02. Gradua no 1º filme concluído (SOL, em produção).

## Quando usar

Notícia ou análise de tecnologia contada por DADO e DOCUMENTO: quando a história tem
atores, números auditáveis, uma linha do tempo e um placar. É o oposto do mundo
`noticia-nanquim` (que dramatiza por paisagem): aqui a tela é uma mesa de trabalho -
papel, tabela, recibo, cláusula. Produção 100% programática (`tools/motion/`), 0 cr.

Não usar quando: a história é sensorial/atmosférica, ou quando não há número nem
documento para mostrar - sem dado, este mundo fica vazio.

## Identidade visual

Papel bone com tinta quase-preta, UM vermelho, e blocos que parecem impressos e
colados na página. Nada de gradiente, sombra difusa, glow ou ícone genérico: a
profundidade vem de **sombra dura deslocada**, como carimbo ou serigrafia mal
registrada. O grão é sutil e constante - é papel, não filtro.

| Papel | Elemento | Valor |
|---|---|---|
| chão | papel bone | `#e7e2d5` |
| painel/cartão | papel elevado | `#efeadd` |
| tinta | texto e bordas | `#17150e` (14,1:1 no chão) |
| acento | um só, vermelho | `#e0402a` |
| acento p/ texto pequeno | vermelho AA-safe | `#b22d13` (4,95:1) |
| texto suave | secundário | `#4b463d` (7,2:1) |
| linha | régua/divisória | `#c3bca8` |
| painel invertido | virada dentro da identidade | fundo `#17150e`, texto `#e7e2d5` |

**Regra de cor, em três linhas** (medida, não estimada):
1. `#e0402a` sobre o chão: só em display ≥24px (3,3:1 - reprova em corpo pequeno);
2. rótulo mono pequeno sobre o chão usa `#b22d13`;
3. texto SOBRE preenchimento acento (medido no pixel renderizado): tinta 4,24:1 ·
   branco 4,25:1 · papel bone 3,27:1 · rosa-claro do reel 3,50:1 - nenhum passa AA de
   corpo pequeno, então texto sobre vermelho só em display (≥34px em peso forte, que
   é o limiar de texto grande). Nunca rótulo mono pequeno em cima de vermelho.
   Valor canônico do par tinta-sobre-acento: **4,18:1, medido no master entregue**
   (o PNG-âncora dá 4,28:1 - a subamostragem de croma do yuv420p custa 0,1).

**Tipografia:** Manrope (display e corpo, pesos 700-800 nos títulos) + DM Mono (todo
dado, hora, valor, rótulo de eixo e rodapé de fonte). Ambas OFL em `assets/fonts/`.
Divergência assumida: o SITE do AI Signal Desk usa Bricolage Grotesque + IBM Plex Mono;
manda aqui o precedente em MOVIMENTO (o reel), que usa Manrope + DM Mono.

**Assinatura do mundo** (o que o torna reconhecível com o conteúdo todo removido):
cartão com borda 2px de tinta, raio ~14px e **sombra dura `7px 7px 0`** na cor da
tinta; grão `feTurbulence` a 0,18 em `multiply`; rodapé de atribuição em mono
maiúsculo espaçado.

## Decupagem padrão

MEDIDO no SOL: **10 beats de 4-6s, 49s de linha do tempo** (48,7s entregues por causa do
xfade final), 9:16. Abertura estabelece o objeto-fio; 2 beats de contexto; 1 beat de
regra/documento; 1 de virada (o acento toma a tela); 3 de consequência; placar; cartela.
O clímax cai em ~40% do filme e é o único frame com preenchimento de acento.

## Linguagem de montagem

CONFIRMADO no SOL: cortes secos entre todos os beats e **um único xfade de 0,3s na
emenda em que o objeto-fio SOME do quadro** (a cartela). A regra correta não é "onde o
fio persiste" e sim o contrário: o fio persistindo já costura sozinho, e a transição
marca a saída dele. Medido: 8 emendas secas com salto de luminância de +3,10 a +10,95
YAVG (limiar 12), nenhuma repetição de frame.

## Áudio

VO em português; **nomes próprios em inglês SÓ na tela** - o edge-tts não pronuncia
inglês em texto PT (regra herdada de `PRATICAS.md`). Documento em inglês (ex.: citação
de prompt) entra como ARTEFATO visual e o VO diz o que ele significa, nunca o lê.
MEDIDO no SOL: trilha seca sem melodia funciona - a voz fica 3,3 a 5,2 dB acima dela e
a leitura de tabela não sofre. Master entregue a **-14,7 LUFS integrado, true peak
-2,0 dBFS** (o alvo social de -14 só fecha com TP-alvo -3,0 no loudnorm: alvos de -1,0
a -2,0 furam o teto depois do AAC. Medir SEMPRE no arquivo entregue, nunca no PCM).

## Camada determinística

Todo o filme é `tools/motion/`. HIPÓTESE do kit mínimo deste mundo (a validar no SOL):
uma cena-base com cabeçalho de objeto-fio + título + apoio; uma de cartão-valor
(acento); uma de placar (linhas rótulo/valor); uma de tabela/extrato; cartela.
Requisito de kit já conhecido: o `tools/motion/` precisa de **camada de tema** (hoje é
monotema do mundo quadro-negro) + carregamento de fonte por tema + primitivas próprias
(cartão com sombra dura, grão, easing bezier `cubic-bezier(.16,1,.3,1)` do reel).

## Pipeline

Cena = take (regra do workbench): cada beat renderiza como clipe
(`npx remotion render <Cena> --props=<json>`), âncora é still com `--frame` tardio,
montagem no ffmpeg (concat/xfade CRF16), legendas por overlay alpha quando houver.
Normalizar timebase (`settb=AVTB,fps=24`) ao emendar take cru com take re-encodado.

## Custos típicos

**0 créditos Higgsfield, sempre** - o custo é tempo de render local.
MEDIDO no SOL (WSL2 + RTX 3070, 2026-08-02): **~9,1s por cena de 4s e ~9,6s por cena de
6s** - 37% a 65% acima da hipótese herdada do mundo quadro-negro, que fica invalidada
para este mundo. Filme inteiro: 98,5s de render para 10 takes + 13,5s de montagem.
Um filme de 49s custa **~2 minutos de máquina e 0 crédito**.

## Armadilhas e antídotos

- **Texto pequeno sobre o acento** reprova em contraste (4,25:1 no branco, 3,50:1 no
  rosa do reel). Antídoto: a regra de cor em três linhas acima. *Pago por:* medição do
  validador no gate de conceito do SOL (2026-08-02), antes de virar defeito em tela.
- **Duas paletas semânticas** convivem nas fontes (site × reel). Antídoto: as do REEL
  são canônicas neste estilo. *Pago por:* o mesmo gate.
- **Faux-bold silencioso** (ver changelog): peso que a família não tem vira negrito
  sintético. Antídoto: peso vem de `tema.peso`, só com os pesos realmente carregados.
- **O detector de corte duro do QC é cego neste mundo.** `scene>0.25` devolve ZERO
  cortes num filme com 8 cortes secos reais - papel chapado não move o score. Antídoto:
  neste estilo, emenda se confere por salto de YAVG e por identidade de frame, nunca
  pelo scene-detect. *Pago por:* review 7b do SOL (2026-08-02), confirmado duas vezes.
- **Loudness: medir no entregue.** Ver Áudio. *Pago por:* o master v1 saiu a -15,0 LUFS
  com uma justificativa técnica que o validador falsificou medindo.

## Régua de QC

Além do padrão do workbench: (1) nenhum texto abaixo das razões de contraste da regra
de cor - conferir por medição, não a olho; (2) rodapé de atribuição da fonte presente
em toda cartela que afirma dado; (3) todo número em tela rastreável a uma linha da
matéria; (4) sombra dura consistente em direção e distância entre cenas (MEDIDO no SOL: borda
2px + 7px 7px 0, idêntica nos dois cartões); (5) emenda NÃO se confere por scene-detect
neste mundo - usar salto de YAVG e identidade de frame; (6) loudness e true peak se
medem no arquivo ENTREGUE, depois do AAC.

## Lições (changelog)

- 2026-08-02 (SOL, gate de âncoras): **faux-bold silencioso**. As cenas pediam DM Mono
  700, peso que a família não tem (só 300/400/500) - o Chromium sintetizou negrito e
  engordou o traço 27% em TODO número-herói. Ninguém vê a olho; o validador mediu
  traço/corpo (0,1458 × 0,1161 do relógio, que usa peso real). Antídoto que virou
  regra do mundo: peso vem de `tema.peso`, e só existem os pesos realmente carregados
  em `fontes.ts`.

- 2026-08-02: estilo criado como rascunho no setup do filme SOL. Mundo herdado com
  evidência (13/13 hexes conferidos contra os arquivos-fonte pelo validador), não
  inventado. Manrope e DM Mono baixados como OFL para `assets/fonts/` com licença.
