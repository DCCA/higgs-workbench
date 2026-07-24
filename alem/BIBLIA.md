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

## VOLTA À FASE 4 (2026-07-23) - conceito reprovado no corte

Feedback do usuário sobre os cortes A/B: "não está representando bem a expectativa
vs o além". Diagnóstico proposto: o filme só mostra UM polo da frase - o ALCANÇADO
nunca aparece em cena (o marco se perdeu no pivô da F5), então a revelação lê como
paisagem, não como "o além da expectativa"; e falta o gesto físico do "não me
movimenta" (quietude lê como contemplação). Evidência física > conceito, aplicado
a significado.

Storyboard v2 (marco + gesto de virar as costas): REJEITADO pelo usuário -
"repense totalmente a estratégia".

Diagnóstico CORRETO (palavras do usuário, 2026-07-23): (1) a história não tem ARCO;
(2) "o além é algo NOVO, além da expectativa" - o além é de OUTRA CATEGORIA, não a
mesma coisa maior. Paredão maior atrás do cume ainda é montanha = ainda é a mesma
expectativa. Erro de conceito: quantitativo (maior) ≠ qualitativo (novo).
NENHUM crédito gasto até estratégia nova aprovada (disciplina MARÉ ALTA).

## Decupagem v4 (direção do usuário: "ver a montanha, mostrar no cume, e do cume voar")

Arco em 3 atos: **VER** (a expectativa nasce - montanha revelada pela névoa, T1 reuso)
→ **CUME** (a expectativa alcançada - ele no topo DAQUELA montanha, mundo lá embaixo;
legenda 1 mora aqui agora) → **VOAR** (o além - salto do cume, oner).

| # | t (filme) | Evento físico | Câmera | Frames | Custo |
|---|---|---|---|---|---|
| ATO 1 VER (T1 reuso, trim ~8s) | 0-8s | Névoa fechada → abre e REVELA a montanha diante dele; ele parado, olhando o objetivo | travada | C1→C2 (pagos) | 0 |
| ATO 2 CUME (novo, 5s) | 8-13s | Ele no TOPO daquela montanha (agulhas nevadas do maciço F5), mundo/nuvens LÁ EMBAIXO - geografia invertida do Ato 1. Imóvel; só vento na jaqueta. Legenda 1 | travada | F7 novo (still do cume) | still 2-4 + take 17,5 |
| ATO 3 VOAR (oner novo, 12s) | 13-25s | 0-3s: dois passos até a borda do cume, pontas dos pés no limite, braços abrem; 3-4s: carga e SALTO explosivo (legenda 2); 4-12s: queda vira planeio, corpo arqueia, jaqueta chicoteia, ele afasta-se em arco POR SOBRE o mundo lá embaixo até virar ponto vermelho em movimento; névoa fina cruza o quadro | TRAVADA no cume | F8 novo (start: ele ~1/3 no cume, borda visível à frente, vazio abaixo) | still 2-4 + take 42 |

Delta: ~64-68 cr sem retake (teto c/ 1 retake do oner: ~110). Projeto total ~165-215
(alvo 100-300 ✓). Legendas: cap1 = 9-13s (cume); cap2 = ~17-22s (salto).
Sem equipamento (mentira mínima VOO). declined_preset_id preventivo nos 2 takes.

## [SUPERADO pela v4] CONCEITO B APROVADO (2026-07-23): O SALTO - decupagem v3

**A terra é a expectativa; o ar é o além.** Subir montanha tem expectativa conhecida
(chegar, olhar, descer). O que ninguém espera: sair VOANDO do cume. O além é outra
CATEGORIA (terra → ar) e o arco é físico: começa pedra parada, termina pássaro.
Equipamento: NENHUM - mentira mínima do VOO (jaqueta voa; realismo vem da linguagem
de câmera real, vento e âncoras de mundo, não de wingsuit/paraquedas). Sem mochila ✓
(a identidade F5 já é sem mochila - vira acerto).

| # | t (filme) | Evento físico (coreografia com timing) | Câmera | Frames | Método |
|---|---|---|---|---|---|
| T1 (REUSO, trim ~9s) | 0-9s | Névoa fechada, ele imóvel (legenda 1) → névoa abre e revela o mundo da conquista; ele NÃO reage | travada | C1→C2 (pagos) | já renderizado |
| T-ONER (NOVO, 15s, ~52,5 cr) | 9-24s | 0-4s: três passos pesados da posição inicial até a BORDA da crista, vento crescendo; 4-6s: pontas dos pés no limite, cabeça inclina para o vazio, braços abrem devagar; 6-7s: carga - joelhos flexionam, tronco à frente; 7-7,5s: O SALTO - impulso explosivo, corpo lançado no vazio (legenda 2); 7,5-15s: queda que vira planeio - corpo arqueia, jaqueta chicoteia, ele afasta-se em arco descendo diante do paredão até virar PONTO VERMELHO EM MOVIMENTO; névoa fina cruza entre câmera e ele | TRAVADA no cume o take inteiro (tripé onde câmera real estaria) | F6 novo (start): ele ~1/3 de costas, crista correndo à frente até borda visível, abismo + paredão + vale lá embaixo | start only (ação no quadro); declined_preset_id preventivo |

Emenda única T1→oner: mesmo mundo, mesma paleta, ele de costas nos dois lados.
Frames a gerar: F6 (t2i com F5 de ref, 2 cr + margem). Conta do delta: ~57 cr sem
retake; teto com 1 retake do oner: ~110. Projeto total: 158-210 (alvo 100-300 ✓).
Legendas: cap1 = 1,5-6,5s (quietude T1); cap2 = ~16-21s (no salto).

## Storyboard v1 (fase 4 - custo zero) [SUPERADO]

`STORYBOARD_v1.png` (5 painéis, frames reais já pagos, ffmpeg): C1 → C2 → F3v3 → C2 → F5.
Nota de montagem embutida: T1-end e T3-start usam o MESMO quadro (C2) com o T2 de
cutaway entre eles (gramática master → insert → master); risco de quase-jump se o
T2 ficar curto - antídoto: trim/dissolve na montagem.
Script gerador: scratchpad/storyboard.sh (sessão 2026-07-23).
**GATE: aguardando aprovação do usuário antes de qualquer geração de vídeo.**

## Produção (fase 5+)

C2 subida como media reutilizável: `dac93c62-82dc-4733-bd49-7b4eb33ea76c`.
Interceptação do preset "IN THE DARK" confirmada neste projeto (id
`24bae836-2c4a-48e0-89b6-49fcc0b21612`) - incluir `declined_preset_id` preventivo
em TODO take deste filme (cena escura, céu de tempestade).

C1 subida como media: `83adedde-c701-4e00-9239-5f778efcf563`.

| Take | Job ID | Custo | Status |
|---|---|---|---|
| T3 wow v1 (8s, C2→F5, pull-back) | `2fcecb73-2ef5-45b5-823f-16dcd8888687` | 28,00 | APROVADO pelo usuário (2026-07-23); abriu mais fechado que C2 e recuou ~8x - desvio a favor; remove o risco de quase-jump T1→T3 |
| T1 (10s, C1→C2, revelação da névoa) | `754489ec-8f88-4c38-99bc-a3807ce5b138` | 35,00 | strip OK: revelação gradual, herói imóvel, câmera pregada |
| T2 (5s, F3v3 start-only, primeiro passo) | `6d60722b-9b00-41bd-9fd0-f4fbff8239f3` | 17,50 | strip OK: passos com peso, de costas; fundo mais claro que T1/T3 (vira questão na folha) |

## Folha de cortes (2026-07-23) - medido com signalstats YAVG

| Emenda | YAVG | Veredito |
|---|---|---|
| fim T1 × início T2 | 50 → 71 (Δ21) | pop de luminância + fundo muda (paredão → picos nevados) |
| fim T2 × início T3 | 72 → 45 (Δ27) | pior emenda: pop forte + salto de escala REVERSO (encolhendo → gigante) |
| fim T1 × início T3 (medida exploratória) | 50 → 45 (Δ5) | quase invisível, mesmo paredão - viabiliza corte sem T2 |

Fixes de edição aplicados (custo zero), dois candidatos:
- **Corte A** `ALEM_corteA_dissolve.mp4` (22,5s): 3 takes, xfade 0,3s nas duas emendas
- **Corte B** `ALEM_corteB_semT2.mp4` (18,1s): sem T2 (emenda seca T1→T3, Δ5); o "passo"
  narrativo sobrevive dentro do T3 (ele caminha durante o pull-back)
Ambos com as legendas em dois tempos (checadas visualmente: acentos, posição, fades).
T2 fica no acervo (pago, job ID acima) - reutilizável se o corte A vencer.

## Texto em tela (decisão do usuário 2026-07-23: opção "dois tempos", condensação OK)

Sem VO; Reels roda no mudo - o texto é o canal verbal. Duas legendas, custo zero (montagem):

| Beat | Momento no corte | Texto |
|---|---|---|
| 1 | T1, durante a quietude (~1,5s-6,5s) | "A expectativa é algo já alcançado. Ela não me movimenta." |
| 2 | T3, início do mergulho (~16s-21s) | "O que me movimenta é o além." |

Estilo: branco, pequeno (~4% da altura), centralizado, terço inferior MAS acima da
zona de UI do Reels (y ≈ 62-68% da altura); fade in/out 0,4s. Tipografia do corte de
aprovação: DejaVu Sans (ffmpeg); refinamento tipográfico final no DaVinci se preciso.

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
