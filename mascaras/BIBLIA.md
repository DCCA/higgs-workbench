# MÁSCARAS - bíblia de produção

9:16 vertical, mudo (VO numa segunda etapa). Seedance 2.0 `fast` 720p para prototipagem;
upscale do corte final aprovado em vez de regerar em 1080p.

## Identidade travada (colar em TODO prompt com o personagem)

> man aged 35, lean angular face, short dark brown hair, light stubble, dark brown eyes,
> straight nose, thin lips, tired neutral expression, no smile, plain grey long-sleeve shirt

Criança e adolescente devem ser descritos como versões mais novas DESSE rosto, sempre
passando o frame `ROSTO` como referência.

## Linguagem visual

- Paleta dessaturada: azul-cinza frio da água contra sol baixo âmbar.
- 35mm film grain em tudo, muito espaço negativo.
- Horizonte SEMPRE horizontal e alto no quadro (ver armadilha abaixo).
- **Regra de ouro descoberta no Ato 1:** o reflexo do lago/pôr do sol aparece dentro da íris.
  Repetir esse eco lago↔olho↔reflexo nos Atos 2 e 5.
- Máscaras (a definir no Ato 3): branca lisa/trabalho, colorida exagerada/festa,
  opaca neutra/família.

## Armadilha do 9:16

O modelo compõe a paisagem na horizontal e entrega a imagem **girada 90°**. Custou 2 créditos
aprender. Antídoto, no prompt: `vertical portrait-orientation, upright framing,
the HORIZON LINE RUNS PERFECTLY HORIZONTAL across the frame` + descrever metade superior
e inferior separadamente.

## Método: start_image + end_image

Movimento de câmera dirigido sai muito mais barato fixando os dois extremos do movimento
do que descrevendo o movimento e torcendo. Usar em todo shot que tenha um destino claro.

## Frames-âncora (job IDs, reutilizáveis como medias)

| Frame | ID | Uso |
|---|---|---|
| LAGO (mãe) | `ce07fa24-9fc5-4b72-ae80-0db39c9f1f86` | abertura, S2, e o retorno no Ato 5 |
| ROSTO (âncora de identidade) | `a8504ee2-577d-49eb-8b5c-dd324a4c05df` | todo shot com o protagonista |
| OLHO (macro íris) | `28e258a0-184d-4d42-b8e7-f122e9622ac5` | transição, e o piscar do Ato 4 |
| ÁGUA (mãe do Ato 2) | `d11ace1e-cc37-4f1c-ab7d-4391ddf26684` | todo o subconsciente |

Descartados: `4a161adc` (girado 90°), `9deeee2e` (horizonte no meio), `b0903eca` (plano médio,
serve de reserva).

## Ato 1 - PRONTO (23,2s) → `ATO1_v2.mp4`

Shots 1 e 2 do roteiro fundidos: é um movimento contínuo de recuo, não pede corte.

| Shot | Movimento | Start → End | Dur | Job |
|---|---|---|---|---|
| S1 | dolly out lento | LAGO → LAGO_WIDE | 8s | `82aff6d6` |
| S2 | push-in frontal (corte de eixo) | ROSTO_WIDE → ROSTO | 5s | `35fd3004` |
| S3 | close → macro da íris | ROSTO → OLHO | 5s | `11ffbfaa` |
| S4 | pupila abre, mergulho | OLHO → ÁGUA | 5s | `0e84eaa5` |

Frames extras criados por `outpaint` (2 cr cada, consistência perfeita com o original):
LAGO_WIDE `9c17989c`, ROSTO_WIDE `c24bc37f`.

### Duas lições que valem para os Atos 2-5

**1. Um movimento de câmera sem destino não acontece.** O primeiro S1 pediu "a câmera recua"
e o modelo entregou 8s praticamente estáticos (com um leve push-in, o oposto). A correção
não foi insistir no prompt: foi dar um `end_image` mais afastado, feito por outpaint do
próprio start. Regra: todo shot com movimento ganha end frame.

**2. O push-in tem que ser geometricamente possível.** O primeiro S2 ia de "homem de costas
no wide" para "rosto de frente em close" - trajetória impossível a partir daquela câmera.
O modelo preencheu o buraco **inventando um barco com um remador** no meio do lago e depois
cortando pro rosto. Não foi falha do modelo, foi decupagem errada. O corte seco do roteiro
é uma virada de eixo de 180°: S1 fica atrás dele, S2 vem do lado do lago.

## Cena 2 - PRONTA (30,2s) → `CENA2_v1.mp4`

Numeração da decupagem oficial (shots 05-09). **5 de 5 aprovados de primeira**, contra
2 retakes em 4 no Ato 1 - as lições acima se pagaram já na primeira cena em que foram aplicadas.

| Shot | Conteúdo | Start → End | Dur | Job |
|---|---|---|---|---|
| 05 | submersão, drift lento | ÁGUA → livre | 6s | `72bb23d8` |
| 06 | criança corre no quintal | CRIANÇA → livre | 7s | `5fca6b7a` |
| 07 | close do riso | CRIANÇA_CLOSE → livre | 5s | `376d8886` |
| 08 | adolescente ensaia sorriso | TEEN → livre | 7s | `6da42841` |
| 09 | a água escurece | ÁGUA → ÁGUA_ESCURA | 5s | `5f394090` |

Frames novos: CRIANÇA `1bc11c44`, CRIANÇA_CLOSE `9530c8d0`, TEEN `2f1166b6`,
ÁGUA_ESCURA `fe651c7c`.

O shot 05 começa na mesma imagem ÁGUA em que o S4 do Ato 1 termina, então a emenda
entre os atos é exata sem nenhum trabalho de pós.

**Terceira lição - quando NÃO usar end frame.** Os shots 05/06/07/08 são ação de
personagem ou ambiente com câmera parada (correr, rir, ensaiar sorriso, partículas
flutuando). Esses não precisam de destino e saíram certos sem end frame. A regra é:
end frame para **movimento de câmera ou transformação de estado**, não para ação dentro
do quadro. Só o 09 (escurecimento) é transformação, e só ele levou end frame.

## Protótipos dos shots críticos (13 e 21)

Prototipados fora de ordem, antes do lote do Ato 2 - os dois falharam no primeiro take,
comprando a informação cedo e barato (~10 cr em stills):

**Shot 13 (máscara sobre máscara).** 1º take pôs as máscaras ERGUIDAS NA TESTA com o rosto
exposto - a imagem oposta ao significado. Antídoto: posição explícita no prompt
("covers his face COMPLETELY, absolutely NO skin visible"). O retake trouxe de bônus uma
terceira máscara subindo nas mãos - incorporada ao vídeo como o beat de acumulação.
Frames: start `063ca6aa` (branca no rosto + carnavalesca nas mãos), end `a7de1973`
(carnavalesca sobre a branca, terceira máscara subindo).

**Shot 21 (reflexo mascarado).** No over-the-shoulder diagonal do doc, o modelo materializou
um DUPLO FÍSICO ajoelhado dentro do lago em vez de um reflexo - nem espelhava a pose.
Reflexo divergente em ângulo é geometria que o modelo não sustenta; insistir no prompt não
resolve. Antídoto: **mudar a decupagem** - enquadramento de Narciso, câmera a pino olhando
direto pra baixo; o reflexo vira o sujeito e a geometria fica trivial. Escolhida a variante
com máscara SEM olhos (só superfície lisa): `665e7179`. A variante com olhos visíveis
(`0ae6a57f`) fica de reserva.

Regra geral que os dois casos confirmam: quando o take erra por geometria impossível ou
semântica invertida, a correção é na DECUPAGEM (outro ângulo, outro destino), não em
adjetivos no prompt.

## Bloco das máscaras (shots 10-14) - em produção

Frames de cena, todos com ROSTO + o frame da máscara correspondente como refs duplas
(design das máscaras travado por referência, não por descrição):

| Shot | Cena | Frames | Vídeo |
|---|---|---|---|
| 10 | entrevista / branca | start `306350da`, end `838756e3` (v2, regen do start) | `91590798` (7s) |
| 11 | festa / carnavalesca | `783f2fdf` | `3e8f6207` (6s) |
| 12 | jantar / cinza | `68e7e6da` | `3f5c318b` (7s) |
| 13 | máscara sobre máscara | protótipo JÁ É o shot | `e33815fb` (5s) |
| 14 | sufocamento, tilt up | ÁGUA_ESCURA | `1acc9630` (5s) |
| 21 | reflexo (adiantado do final) | protótipo JÁ É o shot | `9380fc87` (5s) |

s10-end v1 (`ba08373e`) descartado: mesa e parede mudaram entre start e end - ambiente
morfando em shot estático lê como erro. Regen a partir do start segurou a continuidade
(mesma lição do 13-end: derivar do frame irmão, nunca gerar solto).

**Lição do S11 - vazamento de rosto.** No take 1 (`3e8f6207`) o modelo animou a boca REAL
através da máscara: o objeto rígido virou pintura facial e o sorriso verdadeiro apareceu,
contando a história oposta ao beat. Retake `3fe0d201` com rigidez explícita no prompt
("RIGID painted object, the grin is FROZEN and never moves, his real mouth is NEVER
visible") congelou o sorriso. Em TODO shot futuro com máscara + performance corporal,
incluir essa cláusula.

## Ato 2 - PRONTO (60,4s) → `ATO2_v1.mp4`

05-09 (Cena 2) + 10 `91590798` + 11v2 `3fe0d201` + 12 `3f5c318b` + 13 `e33815fb` +
14 `1acc9630`. Parcial do filme: `PARCIAL_ato1_ato2.mp4` (83,6s de ~2:40).
Shot 21 do final já está pronto e no banco (`9380fc87`).

## Ato 3 - PRONTO (24,2s) → `ATO3_v1.mp4`

| Shot | Conteúdo | Start → End | Dur | Job |
|---|---|---|---|---|
| 15 | zoom out violento, vida orbitando | 13-END → VOID_ORBITA `c4e7911f` | 6s | `666bcac0` |
| 16 | hyperlapse escritório | `bca2a129` | 5s | `f7fe5d8a` |
| 17 | hyperlapse rua/estações | `f31ed8f8` (v2) | 5s | `ab180f5a` |
| 18 | borrão de luz → branco | text-to-video puro | 4s | `df55b30c` |
| 19 | o piscar → preto | OLHO (reuso Ato 1) | 4s | `a6f516b9` |

Zero retakes de vídeo. 1 retake de still: s17 v1 (`3dad5572`) veio GIRADO 90° - cena
urbana complexa venceu a instrução de orientação (mesma armadilha da 1ª imagem do lago;
a cláusula anti-rotação precisa ser agressiva em cena externa com arquitetura).
Reuso pagou: start do 15 é o 13-end, start do 19 é o OLHO do Ato 1.
S19 tem 4s (mínimo do modelo); aparar para ~2s no corte final, o rabo preto emenda no Final.

Parcial: `PARCIAL_atos123.mp4` (107,8s).

## Final (20-25) - em produção

Todos os frames aprovados de primeira (o receituário completo em ação):

| Shot | Conteúdo | Frames | Vídeo | Dur |
|---|---|---|---|---|
| 20 | retorno ao lago, blue hour | LAGO_BLUE `026de9db` (regen do LAGO_WIDE) | `9bdcf262` | 5s |
| 21 | reflexo mascarado | pronto desde o protótipo | `9380fc87` | 5s |
| 22 | a remoção (clímax) | start `750c928f`, end `d2f17d70` (regen do start) | `407bcf35` | 7s |
| 23 | máscara afunda | `401a90ee` | `86975708` | 5s |
| 24 | reflexo sem máscara | `6e85f5f0` (regen do reflexo 21) | `f7961a03` | 5s |
| 25 | dolly-out final, estrelas | LAGO_BLUE → outpaint `82fa99f9` | `4569a2d1` | 8s |

Cartela "MÁSCARAS" e VO ficam para a pós (ffmpeg/DaVinci + geração de voz).

## CORTE 1 COMPLETO → `MASCARAS_corte1.mp4` (2:27)

Ato1 (23,2s) + Ato2 (60,4s) + Ato3 (24,2s) + Final (35,2s) + cartela ffmpeg (4s).
Todos os 20 shots do roteiro gerados e montados. Final: 6 de 6 vídeos aprovados de primeira.

Gasto total de geração: ~635 créditos (2374 → 1739). Saldo: 1.739.

## CORTE 2 → `MASCARAS_corte2.mp4` (2:24)

Revisão de cortes (folhas last×first dos 24 pontos de emenda) encontrou 7 problemas;
todos corrigidos:

**Edição (grátis):**
1. S15 aparado -1s da cabeça - abria no mesmo frame do fim do S13 (lia como glitch)
2. S2→S3 micro-dissolve 0,33s - quase jump cut + salto de cor (`S2S3.mp4` fundido)
3. S4→S05 dissolve 0,25s - pop de luminância (`S4S05.mp4` fundido)
4. S19 aparado para 2,5s + fade pro preto (YAVG 16,5 no último frame)

**Regen (~60 cr):**
5. S13v2 `fd7f7f43` (end `baf15118`): a 3ª máscara que sobe agora é a CINZA -
   a acumulação branca→carnavalesca→cinza fecha, e a cinza vira a máscara externa
   que o Final remove. Continuidade que era furo virou setup.
6. S16v2 `6e8fe035`: homem-estátua em tamanho constante, só o mundo acelera
   (v1 tinha um push-in não pedido).
7. S11v3 (still `5969be66`, vídeo `05117e7d`): máscara como OBJETO rígido com alça
   e espessura, sorriso congelado - não lê mais como pintura facial.

Estado: corte 2 é o corte de imagem final. Pendências restantes = só pós:
VO, trilha, foley, passe de cor global, cartela melhor, upscale 2K.

## Armadilha: o preset "IN THE DARK"

O servidor intercepta prompts com luz fria/escura e devolve uma recomendação de preset
em vez de gerar - **o job não é submetido**. Aconteceu no S1 do Ato 1 e no shot 08.
Antídoto: reenviar com `declined_preset_id: "24bae836-2c4a-48e0-89b6-49fcc0b21612"`.
Esperar isso de novo nos Atos 3-5, que são quase todos escuros.

### Correção de cor

O outpaint do rosto puxou o céu para **rosa**, enquanto o resto do ato é azul-dourado.
Resolvido no ffmpeg em vez de regerar, atacando só as altas luzes para preservar a pele:

    colorbalance=rh=-.22:gh=.06:bh=.15

Testado contra um frame do S1 como alvo. Corrigir médios junto (`rm`) esfria demais a pele.
**Conferir esse desvio sempre que um frame vier de outpaint.**

## Custos medidos (não estimados)

| Item | Créditos |
|---|---|
| imagem nano_banana_pro 2k | 2,00 |
| imagem soul_2 2k | 0,12 |
| vídeo fast 720p 5s | 17,50 |
| vídeo fast 720p 8s | 28,00 |
| vídeo std 1080p 5s | 45,00 |

Ato 1, 1ª passada: ~10 em imagem + 80,5 em vídeo. Filme completo (26 shots, fast 720p,
com retry 2x): **~1.200**. Em std 1080p direto: ~2.780, não cabe no saldo.
