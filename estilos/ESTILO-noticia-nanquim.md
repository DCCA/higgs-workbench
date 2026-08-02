# ESTILO: Vídeo-notícia nanquim (noticia-nanquim)

Status: ativo. Origem: A CHAVE (PR #14, 2026-07-26; 35,6s, 1080×1920, ~180 cr).

## Quando usar

O job deste estilo: contar um FATO recente como um mapa que se constrói - a câmera
voa por um diagrama gravado a nanquim enquanto a locução explica o que aconteceu,
até onde foi e por que importa.

Sinais de que o brief pede este estilo:

- Há um fato verificável com ATORES nomeados (empresas, órgãos, produtos) e um
  DESFECHO. Sem atores e sem desfecho, não há mapa nem rota - é outro tipo de vídeo.
- O factual precisa aparecer LEGÍVEL na tela: nomes próprios, datas, números,
  citação entre aspas. É isso que empurra o texto para a camada determinística em
  vez de tentar gerar texto com IA.
- Ninguém aparece e ninguém fala em quadro. O protagonista é o sistema, a rota, o nó.
- Prazo curto e reuso frequente: a mesma gramática serve para o próximo incidente
  sem re-derivar mundo, câmera nem tipografia.

Pré-requisito de entrada: os fatos chegam CHECADOS em 2 fontes cada, nunca
roteirizados de memória. O estilo garante forma; a apuração é do brief.

Quando NÃO usar: história com personagem e atuação, tom emotivo/onírico, ou brief
que peça fotorrealismo.

## Identidade visual

Regra-mãe do tipo: **a IA gera a ARTE, nunca o TEXTO.** Geração por IA embola
letras; todo super, timeline, número e cartela vive na camada determinística.

Blocos prontos para colar (inglês). O primeiro gera a arte-mãe do filme; ela vira
o style key e é anexada como referência em toda geração seguinte.

**WORLD - arte-mãe (t2i):**

> ink-drawn isometric mechanical map on aged parchment, engraving and etching
> linework, fine crosshatching and stippled shading, warm cream paper with visible
> fiber grain, MODERN-TECH subject matter (server stacks, gears, circuit traces,
> conduits, heat sinks) - NOT medieval, structures rise as engraved volumes on a
> contour-line plain, dashed survey lines and gear-toothed compass roses as chart
> furniture, ONE ink accent: deep oxblood red on the routes connecting the nodes,
> everything else sepia-black ink on cream, vertical portrait-orientation, UPRIGHT
> framing, the HORIZON LINE RUNS PERFECTLY HORIZONTAL, non-photorealistic, NO 3D
> render, NO live-action.

**NEGATIVE fixo - anti-texto POR SUPERFÍCIE e anti-atlas:**

> readable text, letters, words, numbers, captions, nameplates, cursive, labels or
> engraved lettering on any plate, panel, dial face, bezel, gear, hub, pipe,
> cartouche, banner, compass rose or paper margin; world map, continents,
> coastlines, place-names, atlas; medieval fantasy, castle, dragon; watermark,
> logo; photorealism, live-action, 3D render, color drift.

A cláusula anti-texto LISTA as superfícies porque o faux-texto migra: proibir o
objeto não basta, ele reaparece na próxima superfície que "pede" rótulo. Num mapa
gravado, as superfícies text-prone são a rosa dos ventos, o cartucho, a placa, o
painel e a margem do papel.

**SKETCH - esboço, start frame do build-up (i2i sobre a arte-mãe):**

> EXACT same composition, framing and camera as the reference image, but rendered
> as a faint unfinished under-drawing: pale construction lines and blueprint
> guides only, no ink weight, no red accent, most structures still ghosted; only
> one or two elements already inked at full weight.

**WIDE - destino desenhado do reveal (t2i, descrevendo só estilo + nova altitude):**

> ink-drawn isometric mechanical map on aged parchment, engraving linework, seen
> from HIGH ALTITUDE: the whole node grid and the oxblood red routes read as ONE
> clean diagram, generous empty parchment margins around it, contour lines fading
> to blank paper at the edges, NO new landmasses, NO continents, NO place-names.

Acento: UM só, escolhido no gate de look e mantido no filme inteiro. A CHAVE
decidiu entre âmbar e vermelho e fechou em vermelho-óxido nas rotas. O acento marca
a rota e o nó atingido, e reaparece uma única vez na tipografia, na linha de
statement.

## Decupagem padrão

Formato: 9:16, 1080×1920, 24 fps, 30-45s. Cinco beats sobre 3-4 planos gerados de
8-10s mais a cartela.

| # | Beat | O que a imagem faz | Alvo |
|---|---|---|---|
| 1 | O mundo vazio | mapa ainda em esboço, quase branco; kicker de contexto entra no 1º segundo | 0-4s |
| 2 | Construção | a gravura se desenha sozinha: nós, engrenagens e traços ganham tinta | 4-10s |
| 3 | A rota | voo baixo seguindo a rota de acento até o horizonte - o "até onde foi" | 10-20s |
| 4 | O nó atingido | chegada ao nó do conflito: o acento satura, a estrutura reage | 20-25s |
| 5 | Reveal e desfecho | pull-back amplo com o mapa inteiro legível, timeline e linha de statement | 25-31s |
| - | Cartela | atores, data, o número que sustenta a matéria, fontes | 31-35s |

Beats 1+2 cabem num plano só (é o mesmo take: esboço vira arte cheia). Beats 3 e 4
podem ser um plano de ligação único quando o orçamento aperta.

**Wow-shot típico: o reveal do beat 5** - o mapa completo aparecendo de uma vez.
É ele que se prototipa primeiro e fora de ordem, e é ele que exige end-frame
desenhado. Se o reveal não impressiona, o filme não tem terceiro ato.

VO: uma frase fluida por beat de fala (três blocos dão ~30s). Um super por beat,
nunca dois na tela ao mesmo tempo.

## Linguagem de montagem

- **Flyover contínuo.** A câmera nunca para: o filme é uma viagem só, não uma
  sequência de planos. Push-in lê como imagem parada - o pedido de câmera é sempre
  fly-over / crane / voo rasante, explícito no prompt.
- **Sem corte seco entre planos.** As emendas são dissolves curtos, 0,25-0,35s: os
  planos são o mesmo mundo em altitudes diferentes, e corte duro quebra a ilusão de
  take único. O detector de cena deve passar limpo nas emendas.
- **A câmera só assenta duas vezes:** no reveal final e na cartela. Movimento sem
  motivação some do repertório deste estilo.
- **Três modos de geração, um por função** (o motor do tipo):
  1. construção: start = esboço, end = arte cheia (a gravura se desenha sozinha);
  2. ligação/voo: start-only, com o voo forte no prompt (o modelo inventa o
     caminho à frente, que é o que se quer num trecho de viagem);
  3. reveal: start = plano anterior, end = wide limpo DESENHADO. Reveal sem
     destino alucina.
- **Emenda exata:** quando o beat exige continuidade geométrica, o end frame do
  plano N é o start do N+1 - a emenda sai perfeita sem pós.

## Áudio

**VO**

- 100% pt-BR, sempre. O edge-tts não pronuncia inglês dentro de texto em
  português - nem a voz multilíngue, nem respelling fonético (ambos testados e
  reprovados). Os nomes próprios em inglês saem da FALA e entram como TEXTO na
  tela; a camada determinística já existe, use-a.
- Escrever o roteiro de VO já sem termos em inglês, marcando quais nomes vão para
  o overlay. Fazer isso no roteiro custa zero; descobrir na mixagem custa re-voz.
- 2-3 candidatas com o TEXTO REAL do vídeo (custo zero) e escolha por vídeo. A voz
  nunca é travada como padrão do workbench.
- Pontuação é tempo: ~1,0s por ponto final no edge-tts pt-BR. Preferir uma frase
  fluida com vírgulas a frases picadas, medir a duração real com ffprobe contra a
  janela do beat e esperar 1-2 rodadas de re-voz.
- Números por extenso na fala; o número exato, em algarismo, vive na cartela.

**Trilha**

- Leito sonoro contínuo, sem melodia que dispute com a locução, gerado local
  (custo zero) com duração maior que o corte final mais a cartela.
- Prompt-base do estilo (o A CHAVE não registrou o prompt literal; este é o brief
  qualitativo equivalente ao leito entregue - registrar o prompt exato no próximo
  filme):

  > dark ambient drone bed, low sustained strings and soft sub pulse, slow rising
  > tension, no melody, no percussion, documentary underscore

- Brief musical QUANTIFICADO está reprovado no workbench (o gerador ignora
  instrução temporal). Controle de clímax é por escolha de janela na curva RMS,
  gerando mais longo que o necessário se preciso.
- Régua medida: cobertura até o último frame, I ≈ -14 LUFS, TP ≤ -1 dBFS, saída
  48 kHz estéreo. Referência do master do A CHAVE: I = -14,6 LUFS, TP = -4,3 dBFS,
  LRA 2,5 LU.

## Camada determinística

Hoje: PIL para renderizar e ffmpeg para compor, com as fontes OFL de
`assets/fonts` (Inter para sans, Space Mono para mono). Quando `tools/motion/`
existir, este bloco passa a apontar para as composições Cartela, OverlayContexto e
Legendas, e os itens abaixo viram props.

Cinco peças, que são a tipografia inteira do estilo:

1. **Kicker de contexto** - pílula no topo, mono caixa-alta com tracking largo
   sobre cartão escuro translúcido. Template: `<CATEGORIA> · <TEMA> · <MÊS ANO>`.
   Entra no 1º segundo e ancora o vídeo no tempo.
2. **Super (lower-third)** - cartão escuro translúcido com título em sans bold e
   uma linha de contexto menor em peso leve. Um por beat.
3. **Timeline** - bloco mono de 2-3 linhas, `DATA   fato`, alinhado à esquerda,
   entra junto com o reveal.
4. **Statement** - linha única em sans bold caixa-alta, o filme resumido em 3-5
   palavras. É o único lugar onde a cor de acento aparece na tipografia, e só uma
   vez no filme.
5. **Cartela final** - fundo escuro sobre o último frame esmaecido: atores em sans
   bold, data em peso leve, número e fontes em mono pequeno.

Regras da camada:

- Texto renderizado NATIVO em 1080×1920 e nunca escalado depois. Os takes saem em
  720×1280 (fast); o corte é escalado para 1080×1920 ANTES do overlay, para o texto
  nascer na resolução de entrega. Escalar depois é o que embola letra fina.
- Nunca fonte de sistema, nunca branco 255: off-white quente, que conversa com o
  papel.
- Cartão translúcido atrás de TODO texto. Parchment claro é o pior fundo do filme
  para texto claro; sem o cartão o super desaparece na tinta.
- Escrever o texto num arquivo UTF-8 e ler dele, nunca digitar a string direto no
  comando: acento caído é o erro nº 1 desta camada.
- Uma peça = um PNG RGBA de tela cheia; entrada e saída por tempo no ffmpeg:

```bash
ffmpeg -i corte.mp4 -i super1.png -i cartela.png -filter_complex \
  "[1]format=rgba,fade=in:st=0:d=0.3:alpha=1[s1]; \
   [0][s1]overlay=0:0:enable='between(t,1.2,6.0)'[a]; \
   [a][2]overlay=0:0:enable='gte(t,31.0)'" \
  -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -r 24 saida.mp4
```

## Pipeline

| # | Etapa | Ferramenta | Custo |
|---|---|---|---|
| 0 | Fatos checados, roteiro de VO, storyboard local | PIL / papel | 0 |
| 1 | Arte-mãe do mundo (style key do filme) | still t2i `nano_banana_pro` 2k 9:16 | 2 cr |
| 2 | Esboço (start do build-up) | still i2i sobre a arte-mãe | 2 cr |
| 3 | Wide limpo (destino do reveal) | still t2i - altitude nova pede t2i, não i2i | 2 cr |
| 4 | Takes | `seedance` fast 720p 9:16, 8-10s, nos três modos da montagem | ver custos |
| 5 | Montagem | concat ffmpeg com dissolves, escala para 1080×1920 (`scale=1080:1920:flags=lanczos`), CRF 16, preset slow, yuv420p, 24 fps | 0 |
| 6 | Polish de imagem | colorbalance (aquecer, tirar azul), grão, vinheta | 0 |
| 7 | Overlays e cartela | PIL + ffmpeg, DEPOIS do polish para o texto não pegar grão | 0 |
| 8 | Áudio | edge-tts (VO) + gerador local (leito) + mix | 0 |
| 9 | QC medido e gate | `tools/qc/qc_video.sh`, `tools/qc/camera_review.py`, validador-gate | 0 |
| 10 | Upscale | só no corte APROVADO, se a entrega pedir | por preflight |

Anexar a arte-mãe como referência de estilo em toda geração do filme; ela é o que
segura a tinta consistente entre planos.

## Custos típicos

Todo número abaixo tem origem. **Repreflightar sempre** com `get_cost: true`: os
preços do catálogo mudam entre projetos.

| Item | Valor | Origem |
|---|---|---|
| still `nano_banana_pro` 2k 9:16 | 2,00 cr | preflight `get_cost` 2026-07-25, A CHAVE |
| take `seedance` fast 720p 9:16, 10s | 35 cr | jobs medidos no A CHAVE (2026-07-26) |
| take `seedance` fast 720p, 10s (preço atual) | 45 cr = 4,5 cr/s | PRATICAS: o preço mudou em jul/2026 - o 35 acima é histórico |
| take `seedance` fast 720p, 5s | 17,5 cr | baseline do workbench em PRATICAS |
| `gemini_omni` 10s 720p | 30 cr | preflight 2026-07-25; engine testado no A CHAVE e arquivado para este estilo (sem start/end frame, logo não faz build-up nem reveal controlado) |
| VO, trilha, overlays, montagem, QC | 0 | edge-tts, gerador local, PIL, ffmpeg |

**Filme de referência:** A CHAVE, 35,6s entregues por ~180 cr = **5,1 cr/s**
(scorecard da bíblia). Esse total já inclui 2 takes descartados - o reveal
alucinado e o push substituído por flyover - e o teste do engine arquivado.

**Orçamento de um vídeo novo do estilo**, aos preços de jul/2026: 3 stills (6) +
3 takes de 10s (135) + margem de 1 retake do wow (45) = **~190 cr**. A margem do
wow é 2x por regra: no A CHAVE, tanto o reveal quanto a abertura fecharam na
segunda tentativa.

## Armadilhas e antídotos

- **Faux-texto migra de superfície.** O modelo grava letras em qualquer superfície
  que peça rótulo, e a cada regen ele muda de lugar. Antídoto duplo: mudar a
  NATUREZA do objeto text-prone e usar a cláusula anti-texto que LISTA superfícies.
  *Pago por:* 3 regens em evals (aro do mostrador → face da engrenagem) e um still
  descartado de 2 cr no A CHAVE, onde o gerador escreveu texto sozinho num cartão
  porque o conceito sugeria "gabarito". O NEGATIVE sozinho não basta; limpar por
  i2i explícito pedindo a superfície BLANK preserva a composição.
- **Reveal amplo sem end-frame alucina um atlas.** Ao abrir, o modelo preenche as
  bordas novas com continentes e nomes de lugar inventados - texto legível e desvio
  de mundo no mesmo take. Antídoto: end-frame wide DESENHADO mais o negativo
  anti-mapa. *Pago por:* 1 take de 35 cr descartado (A CHAVE, PR #14).
- **Push-in lê como imagem estática.** Num filme-viagem, o push mata a sensação de
  voo. Antídoto: fly-over explícito no prompt, do primeiro ao penúltimo plano.
  *Pago por:* 1 take de 35 cr substituído (A CHAVE, PR #14).
- **Crop de PNG estático não vira este estilo.** Pan-zoom de PIL/ffmpeg sobre uma
  arte parada foi reprovado como "imagem estática, não se constrói". A construção e
  o movimento vêm do modelo; a camada determinística só carrega texto. *Pago por:*
  um corte inteiro descartado no A CHAVE, PR #14 - custo em tempo, não em créditos.
- **i2i trava o ângulo e a altitude, não só a escala.** Referenciar a arte-mãe para
  mudar a câmera devolve a mesma câmera. Antídoto: câmera nova = t2i descrevendo só
  estilo mais o novo ângulo; conteúdo novo no mesmo mundo = i2i. *Pago por:*
  4 tentativas de i2i em evals antes do t2i acertar.
- **Iteração de direção é o item mais caro deste tipo.** A CHAVE trocou tom,
  metáfora e movimento em sequência - 4 pivôs de conceito - e o retrabalho custou
  mais que qualquer take. Antídoto: travar SENSAÇÃO-ALVO por referência nomeada no
  gate de conceito, antes do primeiro still, e apresentar look-frame e esboço
  JUNTOS no gate de look (o par prova o build-up; o look sozinho não prova nada
  sobre o movimento).
- **VO em inglês só se descobre tarde.** Nenhum gate pega pronúncia; o usuário
  pegou depois da aprovação. Antídoto está em Áudio: nomes em inglês nascem como
  texto de tela, não como fala.
- **Operacionais do catálogo.** Cena escura/tech dispara interceptação por preset -
  o servidor devolve recomendação e o job NÃO é submetido, o que parece sucesso;
  reenviar com `declined_preset_id` preventivo. Job de imagem pode travar em
  progresso por 5min ou mais: re-submeter por 2 cr em vez de esperar.

## Régua de QC

Além do checklist padrão do workflow e do QC medido do workbench (folhas de
contato 2fps, flicker, freeze, cortes, loudness, wobble/jerk de câmera), o
validador-gate confere neste estilo:

1. **Zoom 1:1 em TODO texto de overlay,** na resolução final: acentos pt-BR
   (à ã ç é í õ ú), quebra de linha e descendentes cortadas. O master do A CHAVE
   foi REPROVADO por 2 acentos caídos - é o achado mais provável desta camada.
2. **Zoom por superfície na arte:** aro, face de engrenagem, cartucho, placa,
   painel, rosa dos ventos e margem do papel. Letra legível = BLOQUEIA.
   Pseudo-glifo de circuito é aceitável enquanto ILEGÍVEL - vira BLOQUEIA quando um
   macro o faz ler como letra, e o defeito está assado no âncora, então ele propaga
   para todos os takes derivados.
3. **Bordas do reveal:** no plano de pull-back, varrer o terço externo do quadro
   atrás de continente, costa ou nome de lugar inventado.
4. **Continuidade da tinta entre planos:** matiz e saturação do papel não podem
   driftar entre takes, e o acento tem que aparecer nos mesmos elementos.
5. **Legibilidade do overlay sobre parchment:** medir o contraste do cartão no
   frame MAIS CLARO do trecho em que o super vive, não num frame qualquer.
6. **Emendas como dissolve, não corte:** o detector de cena não pode acusar corte
   duro entre planos.
7. **Áudio:** cobertura até o último frame (a cartela alonga o filme e come a
   cauda), I ≈ -14 LUFS, TP ≤ -1 dBFS, 48 kHz estéreo.

## Lições (changelog)

- 2026-08-02: estilo criado por destilação retroativa do A CHAVE (PR #14).
