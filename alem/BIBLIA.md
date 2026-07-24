# ALÉM - bíblia de produção

Reflexão do usuário (texto-fonte; não vira VO nem cartela - vira forma):
> "Eu sinto que a expectativa é algo já alcançado, então não sinto que tem o mais...
> e isso não me movimenta. O que me movimenta é o além da expectativa."

Direção do usuário (2026-07-23): realista com impacto; herói vs. escala grande -
choque de tamanho do herói contra o todo.

Tradução formal: **o cume é a expectativa - alcançada, parada, morta. A névoa abre e
revela a cordilheira colossal: o além. O único movimento humano do filme é o primeiro
passo em direção a ela.** Câmera travada; quem se move é o mundo (névoa) e, no fim, ele.

Brief: 9:16, ~20s, 2 takes, sem VO, sem rosto (herói de costas, Rückenfigur), só trilha.
Orçamento alvo: ~100-150 cr. Saldo no início: 1.417,71 cr.

## Identidade travada (colar em TODO prompt)

Herói sem rosto - identidade é silhueta + figurino (legibilidade contra montanha azul-cinza):

> A lone MALE hiker seen FROM BEHIND (face never visible), short dark hair,
> slim athletic build, vivid SIGNAL-RED alpine jacket with hood down, black pants,
> NO backpack. All clothing plain, matte and unbranded - absolutely NO visible
> brand logos or lettering anywhere.

Escala (fechada 2026-07-23): **F5 aprovada como está - herói ~1/8 no wide.**
O 1/50 literal foi abandonado por formato (9:16 em celular: 1/50 = 1,4mm) e porque
o modelo recusa figuras sub-1/10 (3 tentativas, ver Lições). A imensidão extra vem
do MOVIMENTO (pull-back T3). Planos próximos derivam da mãe por CROP (grátis,
continuidade perfeita) + upscale quando virar start frame de vídeo.

Paleta de contraste (pedido 2026-07-23): colar em todo prompt:

> HIGH-CONTRAST dramatic palette: deep teal-blue shadowed granite, brilliant white
> snow catching the light, dark brooding storm-grey sky. Crushed deep shadows,
> luminous highlights. The hiker's jacket is vivid SIGNAL-RED, glowing against the
> cold blue landscape - the single strongest color in the frame.

Cláusula anti-rotação (paisagem em 9:16 - colar SEMPRE, agressiva):

> Vertical portrait-orientation 9:16, UPRIGHT framing, the HORIZON LINE RUNS
> PERFECTLY HORIZONTAL, mountain peaks point UP toward the sky, the hiker stands
> VERTICAL. Upper half of frame: sky and distant peaks. Lower half: the summit
> ridge where the hiker stands.

## Linguagem visual

- Fotografia real de montanha: luz de fim de tarde fria, névoa física, granulação sutil
- Herói SEMPRE legível (~1/4 do quadro) - escala vem do MUNDO crescer, nunca de
  encolher o herói (orçamento de pixels, PRATICAS)
- Acento único de cor: jaqueta rust-red contra azul-cinza-branco
- Câmera onde uma câmera real estaria (tripé no cume); zero movimento de câmera

## Decupagem (~20s, 2 takes) - aguardando aprovação

Mãe = **F5** (herói ~1/8). C2 = crop 9:16 da F5 com herói ~1/4 (deterministico, ffmpeg).
C1 = mesmo crop aplicado à F1_full (versão névoa-fechada da F5, i2i).

| # | t | Evento físico (coreografia com timing) | Câmera | Frames | Método |
|---|---|---|---|---|---|
| T1 | 0-10s | Herói imóvel de costas, parede de névoa fechada escondendo TUDO além da crista (0-4s; só a aba da jaqueta tremula uma vez). A névoa ABRE em silêncio (4-9s) e revela o paredão COLOSSAL. Ele permanece imóvel (9-10s) | travada, herói ~1/4 | C1 (névoa fechada) → C2 (névoa aberta) | start+end (transformação de estado; primeiro plano idêntico por crop) |
| T2 | 10-15s | O primeiro passo: peso troca, o pé direito desce um degrau de pedra abaixo da linha da crista, o corpo avança em direção ao paredão; vento forte na jaqueta | travada, POR TRÁS no nível da crista, herói ~1/3 (decupagem corrigida: lateral sempre vaza rosto; por trás o rosto é impossível) | F3 v3 (de costas, mid-step, paredão ao fundo) | start only (ação no quadro) |
| T3 **WOW** | 15-23s | Pull-back reto e contínuo: o herói retoma a caminhada pela crista em direção ao paredão enquanto a câmera recua; ele encolhe de ~1/4 até ~1/8 e o paredão INTEIRO entra e engole o quadro | recuo em eixo reto (drone-like) | C2 (start) → F5 inteira (end) | start+end (movimento COM destino; end é a própria mãe) |

Emendas: T1→T2 mesma luz e névoa aberta; T2→T3 o T3 abre em C2, o último estado do
mundo em T1 - conferir folha de cortes (risco: quase-jump T1→T3 se T2 for muito curto;
antídoto na montagem: trim/dissolve).

Ordem de geração dos stills: **F2 primeiro** (é a imagem-dinheiro: herói + cordilheira);
F1 derivado de F2 ("EXACT same scene... ONLY change: dense white fog wall hides the
mountain range"); F3 derivado (novo ângulo, identidade + cordilheira herdadas via medias).

## Frames-âncora (job IDs)

| ID | Descrição | Job ID | Custo |
|---|---|---|---|
| F2 v1 (RETAKE - identidade leu feminina, escala 1/4 grande demais p/ imensidão, logos TNF) | herói de costas no cume, cordilheira revelada | `b65c915b-083a-4a36-a8c2-3b2943f825c1` | 2,00 |
| F2 v2 (base de composição; superada pela v3 em paleta) | homem, sem logos, ~1/6 do quadro, paredão preenche o frame | `33ffbcf4-5cd8-4d60-8447-07c7d5c51b48` | 2,00 |
| F2 v3 (superada) | i2i da v2: paleta high-contrast teal/neve/céu tempestade, jaqueta signal-red | `1f027068-e002-42b5-a0c3-fe5b30d5366b` | 2,00 |
| F2 v4 | i2i da v3: contraste extremo OK; escala NÃO obedeceu (pediu 1/12, veio 1/6) | `7aa04b8d-7022-48d4-ab38-9a91021f016e` | 2,00 |
| F4a (FALHA - outpaint clampado, mesma moldura) | tentativa de zoom-out 2x | `f5863f31-0d34-47e5-8882-206308d7ba0e` | 2,00 |
| **F5 - MÃE (APROVADA pelo usuário 2026-07-23)** | t2i wide: herói ~1/8, realismo e contraste excelentes; identidade final: jaqueta signal-red, calça preta, tênis vermelhos, SEM mochila | `18b75911-99f0-4cd8-8368-88ac5935f138` | 2,00 |
| F1_full | i2i da F5: névoa fechada esconde o maciço; glitch no topo do frame FORA da caixa de crop (inofensivo - só o crop C1 é usado) | `5a7a410a-41c6-4eec-94b4-b0f8e771fd2c` | 2,00 |
| F3 v1 | lateral do passo: pose e fundo bons, MAS rosto visível de perfil (quebra o anonimato Rückenfigur) | `f6f5f0ad-ae92-4d10-af0e-6f19e45e15d2` | 2,00 |
| F3 v2 (FALHA - "vire a cabeça" via i2i ainda vazou perfil; lição: lateral sempre pode ter rosto) | idem v1, cabeça virada | `3efb34a7-2416-4a10-9f77-94e2bb6cbb63` | 2,00 |
| **F3 v3 - START DO T2** | decupagem corrigida: câmera POR TRÁS, mid-step, rosto impossível; herói ~2/5 | `3aa2491d-90b3-496a-ac05-15e005f931fd` | 2,00 |
| C2 (grátis) | crop ffmpeg da F5 `crop=806:1432:367:1320` - herói ~1/4; start do T3, end do T1 | derivado local | 0 |
| C1 (grátis) | mesmo crop da F1_full - start do T1; drift leve de posição/escala do herói vs C2 (aceitável p/ interpolação de 10s, padrão MÁSCARAS) | derivado local | 0 |
| F1 | derivado F2: mesma cena, névoa fechada esconde a cordilheira | - | - |
| F3 | derivado: lateral 3/4, herói junto ao marco, cordilheira ao fundo | - | - |

## Storyboard (fase 4 - custo zero)

`STORYBOARD_v1.png` (5 painéis, frames reais já pagos, ffmpeg): C1 → C2 → F3v3 → C2 → F5.
Nota de montagem embutida: T1-end e T3-start usam o MESMO quadro (C2) com o T2 de
cutaway entre eles (gramática master → insert → master); risco de quase-jump se o
T2 ficar curto - antídoto: trim/dissolve na montagem.
Script gerador: scratchpad/storyboard.sh (sessão 2026-07-23).
**GATE: aguardando aprovação do usuário antes de qualquer geração de vídeo.**

## Trilha (fase 8)

Brief: silêncio tenso e estático → abertura (a revelação, ~8s) → primeiro pulso de
movimento no passo (~16s). ~22s, Stable Audio Open local (custo zero).

## Custos (preflight get_cost, medido em 2026-07-23)

| Item | Preflight |
|---|---|
| still nano_banana_pro 2k 9:16 | 2,00 |
| vídeo seedance_2_0 fast 720p 5s (`mode:"fast"` - param `quality` é ignorado e cai no std!) | 17,50 |
| vídeo fast 720p 10s | 35,00 |
| vídeo fast 720p 15s | (preflight exato antes de gerar) |

Conta do filme (v2 da decupagem, com T3 pull-back): stills já gastos (4) + F2 v3
paleta (2) + F1, F3, F4-outpaint (~6) + margem stills (4) + T1 10s (35) + T2 5s (17,5)
+ T3 8s (28) + margem 1 retake do wow (28) = **teto ~165 cr** (era 135; o filme
ganhou um take a pedido do usuário - imensidão 1/50 como pull-back final).

## Lições

- **i2i ancora a composição da referência**: pedir "herói 1/12" numa edição i2i da cena
  1/6 devolve 1/6 de novo (2x seguidas). i2i serve para paleta/detalhe; mudança de
  escala/enquadramento não passa. Antídoto: gerar o enquadramento certo direto (t2i)
  ou derivar por crop do frame mais aberto.
- **Outpaint com o MESMO aspect_ratio é no-op**: width/height maiores são clampados
  para o tamanho da fonte e volta um re-render da mesma moldura (2 cr perdidos,
  job `f5863f31`). Outpaint só expande MUDANDO o ratio (9:16→1:1 etc.). Para "mesmo
  quadro, mais afastado" em ratio igual: gerar o wide como mãe e derivar o resto
  por crop + upscale.

- `get_cost` precifica silenciosamente o tier ERRADO se o nome do parâmetro estiver
  errado (`quality: "fast"` ignorado → preço std 22,5, esperado fast 17,5). Conferir
  nomes via `models_explore(action:'get')` antes do preflight. (candidata a PRATICAS.md)
