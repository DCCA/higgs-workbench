# ALÉM - bíblia de produção

**STATUS: ENCERRADO 2026-07-25.** Entrega: `ALEM_FINAL_MASTER_v3.mp4` (24,6s,
1080×1920, oner costurado, trilha Jóhannsson, cartela La Grazia). Custo: 333 cr.
Lições promovidas a PRATICAS.md/FERRAMENTAS.md; workflow v2 derivado deste projeto.
Publicação pendente: export limpo para biblioteca do app (trilha é comercial).

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

## DECUPAGEM v6 ATIVA - ONER COSTURADO (Rota A, escolha do usuário 2026-07-24)

Filme sem cortes visíveis: 2 takes follow-cam emendados DENTRO do clarão branco.
Identidade v2 (USUÁRIO, F-B-EU como mãe). Câmera: contínua atrás dele (VOO racional:
ele é o conteúdo compartilhado constante; quem viaja é o mundo). ~21s.

| Take | t (filme) | Coreografia com timing | Frames | Custo |
|---|---|---|---|---|
| **ONER-1** (15s, follow-cam) | 0-15s | 0-2s coxia escura, câmera atrás dele, ele COMEÇA a andar; 2-5s entra no palco, o holofote o encontra, poeira no facho; 5-9s PAUSA no centro - quietude diante da plateia vazia (legenda 1: 5,5-9s); 9-12s retoma, atravessa para o bastidor, a porta de serviço entra no quadro com luz vazando; 12-14s empurra a barra, folhas abrem; 14-15s o CLARÃO engole o quadro (end frame quase branco com silhueta no vão) | G1 (start: atrás dele na coxia, EU) → G2 (end: portal estourado, silhueta no vão, EU) | 52,5 |
| **ONER-2** (6s, follow-cam) | 15-21s | 0-1s o branco RESOLVE em praia de amanhecer, silhueta dele emergindo de costas; 1-6s câmera segue atrás dele caminhando à linha d'água - pegadas, ondas, gaivotas, bruma dourada (legenda 2: 16-20,5s); fade final BRANCO | G3 (start: branco dissolvendo em praia, silhueta EU) | 21,0 |

**A EMENDA INVISÍVEL**: fim do ONER-1 ≈ branco puro; início do ONER-2 ≈ branco
resolvendo - corte seco branco→branco + 2-3 frames de branco puro inseridos se
preciso (grátis no ffmpeg). Nenhum corte perceptível no filme inteiro.
**LEGENDAS: REMOVIDAS do corte a pedido do usuário (2026-07-24, "por agora")** -
a espec dos dois tempos segue documentada acima, desativada; reativável na montagem.
Frames novos: G1, G2, G3 derivados da F-B-EU + fotos-ref (~6 cr + margem).

| Frame | Job ID | Custo | Status |
|---|---|---|---|
| G1 coxia (EU, mid-step, start ONER-1) | `f014f11d-4781-4167-999b-175034988654` | 2,00 | OK - identidade + smartwatch + rim light |
| G2 portal (EU no vão, end ONER-1) | `cfe268c0-a076-44b5-afc2-80af3134b2f1` | 2,00 | OK - suéter sem capuz na silhueta; equipamento de palco à esq. (aceito como tralha de bastidor) |
| G3 praia (EU, véu branco resolvendo, start ONER-2) | `7b3dd677-5a3c-4e3e-8e92-1d6a77731331` | 2,00 | OK - pegadas, figurino idêntico |

| Take | Job ID | Custo | Status |
|---|---|---|---|
| ONER-1 (15s, G1→G2, coxia→holofote→pausa→porta→clarão) | `cdfc850c-b3a9-4901-9cf4-fb8a054ec7ab` | 52,50 | strip 6 beats OK DE PRIMEIRA - pausa no tempo, follow-cam contínua; nota: porta muda de 1→2 folhas entre beats 4-5 (invisível em movimento) |
| ONER-2 (6s, G3 start-only, branco→praia→água) | `c8220cb2-4438-4724-834d-cec6acd36a82` | 21,00 | strip OK - véu resolve, passos com peso, pegadas, gaivotas |

## FILME SEM CORTES: `ALEM_oner_v1.mp4` (20,7s, 2026-07-24)

ONER-1 + xfade `fadewhite` 0,4s (offset 14,642) + ONER-2; fade-in preto 0,4s;
fade-out BRANCO 0,8s. SEM legendas (decisão do usuário). Junção medida: YAVG
222 → branco → 189, verificada frame a frame (`JUNCAO_check.png`) - invisível,
lê como atravessar a luz. A maior geração do projeto (15s, 52,5 cr) passou de
primeira; ZERO retakes de vídeo em todo o v6. Total do projeto: **278,5 cr**.

**v2 da junção (feedback do usuário: "dá para ver que corta")**: fadewhite 0,4s
era rápido demais - em movimento lia como flash de corte (detector de cena: zero
cortes reais; o problema era percepção de ritmo). Fix custo zero em
`ALEM_oner_v2.mp4` (21,4s): saída lenta p/ branco 0,5s + 0,3s de BRANCO PURO +
entrada lenta 0,6s = ~1,4s dentro da luz, sem sobreposição de mundos.
LIÇÃO (candidata a PRATICAS): travessia por branco precisa DURAR (~1s+) para ler
como lugar/passagem; branco curto lê como corte, mesmo sem corte existir.
Conta do delta: ~80-86 cr. declined_preset_id preventivo nos 2 takes.
Corte v5 (4 takes, herói genérico) fica de backup no acervo.

## [SUPERADA pela v6] DECUPAGEM v5 - OPÇÃO 4: O PALCO → O AMANHECER (escolha do usuário, 2026-07-23)

Arco: **VER** (da coxia, o palco iluminado - o lugar sonhado) → **ALCANÇADO** (ele no
centro do palco vazio, holofote, teatro imenso - chegou e nada nele se move; legenda 1)
→ **ALÉM** (a porta dos fundos abre para o AMANHECER real - luz elétrica → luz do sol;
legenda 2; fecho: ponto vermelho na praia infinita).

**IDENTIDADE v2 (2026-07-24, pedido do usuário): O PERSONAGEM É O USUÁRIO**, base VOO:
> the man from the reference photos: thick dark hair, full dark beard, smartwatch
> on left wrist - wearing a plain vivid RED KNIT SWEATER (crewneck, no logos),
> black trousers, dark leather boots

Fotos-ref (media_ids do VOO, SEMPRE passar): rosto `34d9ef97-766f-4870-a1cc-9c8dd33c3271`,
corpo `ed613a78-fa40-4e8f-a8f6-2fde3b7df506`, perfil `f6044281-2a19-4d39-92c5-e4ce2fe60980`.
Figurino trocado (jaqueta alpina destoava do teatro/praia): suéter de malha vermelho -
funciona no palco (ensaio íntimo) e na praia fria de amanhecer; vermelho segue como
farol no wide. Linguagem de costas (Rückenfigur) mantida, mas rosto deixou de ser
proibido: se um perfil vazar, é ELE. Preview do figurino (herói genérico):
`ecc7020c-f5fd-4b77-bba5-3c88264bc128` (2 cr, superado pelo pivô de identidade).
[Identidade v1 - herói genérico de jaqueta signal-red - superada; takes v5 idem]
Paleta: preto de teatro + holofote dourado (atos 1-2); dawn azul-rosa estourado (ato 3).

**Direção "dreamy" (pedido 2026-07-23)** - dreamy por FÍSICA DE ATMOSFERA, nunca por
adjetivo de movimento (lição VOO: "dreamlike" em direção de corpo é anti-realismo):
haze teatral no ar, feixes volumétricos visíveis, bloom suave nas altas, pretos
levantados (charcoal, não preto puro), banho âmbar-dourado empoeirado, poeira
cintilando nos fachos. Coreografia de corpo permanece física e pesada. Colar o bloco:

> Fine theatrical HAZE in the air, soft VOLUMETRIC light beams, gentle BLOOM on
> highlights, lifted blacks (deep charcoal, not pure black), a warm dusty amber-gold
> cast like a memory, shimmering dust motes - photographic and realistic, not fantasy.
Anti-rotação: interiores de arquitetura E praia exigem a cláusula agressiva (poltronas
para BAIXO, balcões empilham para CIMA; na praia, horizonte HORIZONTAL).

| # | t | Evento físico | Câmera | Frames | Método |
|---|---|---|---|---|---|
| T-A VER | 0-4s | Da coxia, no escuro: ele em silhueta olha o palco banhado de luz; poeira dança no facho; cortina respira uma vez; ele imóvel | travada | F-A (deriv.) | start only |
| T-B ALCANÇADO | 4-10s | Centro do palco, holofote, de costas para a câmera... plateia colossal e VAZIA diante; poeira no facho; ele não se move. Legenda 1 (5-9s) | travada, atrás dele no palco | **F-B (imagem-dinheiro)** | start only |
| T-C ALÉM (wow) | 10-17s | Bastidor escuro: ele diante da porta de serviço fechada (0-2s); empurra a barra (2-3s); a porta ABRE e a luz do amanhecer INUNDA - silhueta dele recortada no clarão (3-5s); ele atravessa e o quadro fica no portal QUEIMADO de luz (5-7s). Legenda 2 no clarão | travada no bastidor | F-C1 (fechada) → F-C2 (aberta, estourada) | start+end (transformação de estado) |
| T-D FECHO | 17-23s | Praia ao nascer do sol: ele CAMINHANDO (vivo, em movimento) rumo à linha d'água, ponto vermelho na vastidão; ondas entram, gaivotas longe (âncoras de mundo, lição VOO) | travada, wide | F-D | start only |

Emenda T-C→T-D atravessa o BRANCO estourado da porta = corte invisível de graça
(transição por superexposição). Emendas T-A→T-B→T-C: mesmo mundo escuro/dourado.
Frames: F-B primeiro (dinheiro, 2 cr) → gate → F-A, F-C1, F-C2, F-D derivados.

| Frame | Job ID | Custo | Status |
|---|---|---|---|
| F-B v1 (logo TNF, contraste duro) | `de0ff690-e405-4190-b1a0-3443a75aa8f3` | 2,00 | superada |
| **F-B v2 dreamy - MÃE (APROVADA)** | `ccf0ee31-ccf5-48bd-a1b8-4bf5084ceb02` | 2,00 | start T-B; resíduo mínimo de logo no colarinho (invisível em 720p) |
| F-A coxia | `495ccbde-4b4e-4571-9c7d-b20ccffa3bb7` | 2,00 | start T-A; rosto em sombra profunda (aceitável, grau silhueta) |
| F-C1 porta fechada (luz vazando pelas frestas) | `6e01cf16-dd8a-453b-9576-a32187d33ffb` | 2,00 | start T-C |
| F-C2 porta ABERTA, clarão, ele no vão mid-stride | `716c60b9-c8fd-49d5-93f1-2bc7946f3735` | 2,00 | end T-C (par gêmeo da C1 ✓) |
| F-D praia dawn (herói ~1/8, pegadas, gaivotas, horizonte reto) | `7852d60a-c04a-4cda-813d-975ac10e34f7` | 2,00 | start T-D (identidade v1) |
| Preview figurino suéter (herói genérico) | `ecc7020c-f5fd-4b77-bba5-3c88264bc128` | 2,00 | superado pelo pivô de identidade |
| **F-B-EU v1 - candidata a MÃE (identidade v2: USUÁRIO)** | `78818165-b360-4647-9d8e-229abc2a26d8` | 2,00 | identidade VOO + suéter vermelho OK; teatro re-renderizou (irmão, não idêntico) - se aprovada, derivar TUDO dela; conferir pés/sombra no take |

`STORYBOARD_v5.png`: 5 painéis, TODOS frames reais pagos. Ordem de produção após
gate: **T-C primeiro (wow)**, depois T-A/T-B/T-D em lote. Vídeos: T-A 4s (14) +
T-B 6s (21) + T-C 7s (24,5) + T-D 6s (21) = 80,5 cr; margem retake wow 24,5.

| Take | Job ID | Custo | Status |
|---|---|---|---|
| **T-C wow v1** (7s, C1→C2, porta/clarão) | `d3795453-669b-4bdc-822a-62b149754e02` | 24,50 | APROVADO pelo usuário; strip OK de primeira |
| T-A (4s, coxia) | `13884a20-796d-40ef-9d17-0346eb0ffca2` | 14,00 | strip OK: ele imóvel na sombra, poeira no facho |
| T-B (6s, palco/quietude) | `dafc431d-f35f-44f7-9c0d-296e5fab9a33` | 21,00 | strip OK: imóvel, haze respira, feixes vivos |
| T-D (6s, praia/caminhada) | `5109fd7b-645c-497c-8cfb-3daf8e7fe42f` | 21,00 | strip OK: passos com peso, pegadas crescem, gaivotas |

## Folha de cortes v5 (medida, 2026-07-24)

| Emenda | YAVG | Veredito |
|---|---|---|
| fim T-A × início T-B | 89,2 → 89,2 (Δ0,02) | PERFEITA - mesmo mundo âmbar |
| fim T-B × início T-C | 91,3 → 63,7 (Δ28 escurecendo) | aceitável - mergulho narrativo no escuro antes da luz; opção de dissolve 0,25s se incomodar |
| fim T-C × início T-D | 134,5 → 166,3 (ambos ALTOS) | corte pelo BRANCO funciona - o olho atravessa a luz |

## Corte 1 v5: `ALEM_corte1_v5.mp4` (23,2s)

T-A + T-B + T-C + T-D concat (crf 16, 24fps), fade-in preto 0,4s, fade-out BRANCO
0,8s (tema da luz). Legendas: cap1 5,0-9,5s (palco); cap2 14,0-19,0s (clarão →
praia). Tipografia: borda 2px preta@0,55 + sombra (v1 com borda 1px falhou
legibilidade sobre o clarão - checado frame a frame).

## REVIEW ANTI-SLOP (2026-07-25) - pedido do usuário

QC medido: zero flicker (YAVG/frame), zero frames congelados (fora da cartela),
áudio pico -1,1 dB sem clipping. Varredura visual (3 folhas de contato 2fps +
zooms de borda): marcha OK, mundo OK, praia OK, cartela OK.
**ACHADO CRÍTICO: câmera de cinema com tripé em quadro** (borda esquerda,
10,2-15,1s do ONER-1) - contaminação vinda do frame G2 ("tralha de bastidor" aceita
errado). É objeto de PRIMEIRO PLANO com parallax (cresce até ~35% da borda) -
irreparável por crop (2 tentativas medidas: z=1,14 e z=1,26 falharam); só regen.
`ALEM_v4_MASTER.mp4` = 1080×1920 lanczos + grão fino unificador (ganhos reais do
review), câmera fantasma AINDA PRESENTE - decisão de regen pendente.
LIÇÃO: objeto estranho aceito num frame-âncora CONTAMINA o take inteiro com
parallax; rejeitar no still (2 cr) o que custaria regen de take (52,5).

## REGEN v2 + FILME FINAL (2026-07-25)

| Item | Job ID | Custo | Status |
|---|---|---|---|
| G2 v2 (portal limpo - sem equipamento) | `9f95e530-8497-4594-883e-ede6eeb4be58` | 2,00 | inspeção de bordas OK (regra 7b aplicada no still) |
| ONER-1 v2 (set limpo + disciplina de centro) | `b3fb7640-2cf6-4ba2-92fd-fd585b4476d5` | 52,50 | strip + bordas 11/12,5/14s LIMPAS; centrado no palco; WHIP-PAN na virada 9,5s (abaixo do threshold de corte 0,25 - gramática de oner, não defeito) |

**`ALEM_FINAL_MASTER.mp4`** (24,6s, 1080×1920, grão fino): ONER-1 v2 + travessia
branca longa + ONER-2 + música (janela 95,8s) + cartela La Grazia. Review final
(fase 7b) rodado no produto: folhas limpas, zero cortes duros, áudio -1,1 dB.
**Custo total do projeto: 333 cr.** Saldo: ~1.084.

**Review de SOUNDTRACK (2026-07-25, feedback do usuário: música acabava antes)**:
medido - cauda do filme em -45,9 dB (3,2s de silêncio na cartela; a janela de música
cobria só os 21,4s pré-cartela). Fix em `ALEM_FINAL_MASTER_v2.mp4`: janela estendida
95,8→120,5s da faixa (rescaldo pós-clímax sob a frase), fade-out 22,0-24,5s
dissolvendo JUNTO com a cartela; troca só de trilha (vídeo sem re-encode).
Verificado: cauda agora -19,2 dB médio (presença), Integrated -14,5 LUFS, TP -1,3.
LIÇÃO (candidata): review de soundtrack mede COBERTURA (volumedetect por trecho -
áudio deve viver até o último frame), loudness broadcast (ebur128: I≈-14 social,
TP≤-1) e sincronia de eventos musicais × beats da imagem (mapa RMS × timeline).

**Cartela v2 (2026-07-25)**: usuário reprovou tipografia básica + branco clínico.
Prova de 5 fontes (`TYPE_PROOF.png`) → escolhida **Cormorant Light Itálico 80px**
(OFL, fontsource CDN, `alem/fonts/`). Fundo calibrado para MARFIM #F7F2E8 (papel
quente, harmoniza com o dawn); fade final do filme termina no MESMO tom (sem degrau);
clarão do meio permanece branco puro (é luz, não papel). Cartela renderizada NATIVA
1080 via PIL (texto cravado, sem passar pelo upscale). `ALEM_FINAL_MASTER_v3.mp4`.
LIÇÃO (candidata): cartela nunca em fonte de sistema nem branco 255 - tipografia
com intenção (prova de fontes) + off-white quente + render nativo na resolução final.

**Review de LINGUAGEM DE CÂMERA (2026-07-25)** - correlação de fase frame a frame
+ rastreio do sujeito por cor (numpy da venv stable-audio) + grade de terços:
- Suavidade: ZERO picos de jerk, zero wobble lateral nos 2 takes (nível gimbal)
- Assentamento: câmera imóvel durante a pausa 5-9s (gramática correta)
- ONER-2: enquadramento IMPECÁVEL (cx 0,509±0,008; distância de follow constante)
- ONER-1: deriva lenta do sujeito p/ esquerda (cx 0,46→0,28 entre 3-12s) - contra
  teatro simétrico, rigor pediria linha central; só regen corrige
- Headroom consistente (cabeça na linha do terço superior), horizonte da praia no terço
- Estética: movimento perfeito DEMAIS (zero micro-vida de operador) - aceitável como
  gimbal intencional em filme dreamy; micro-sway orgânico em pós é opção custo zero

## Lições novas (candidatas a PRATICAS.md no registro)

- Shell interativo é zsh: `$FONT:textfile` dispara o modificador `:t` (basename) e
  quebra o filtro do ffmpeg silenciosamente. Sempre `${FONT}` com chaves, ou rodar
  via script bash. (Explica as falhas de drawtext da sessão.)
- Legenda branca sobre take estourado de luz: borda 1px não segura; usar borda 2px
  + sombra, e CHECAR frame a frame nos momentos mais claros.
Conta do delta: stills ~10-14 + takes 4-5s×2 (35) + 7s (24,5) + 6s (21) ≈ **~92 cr**
sem retake (um pouco acima da estimativa de 75-85 da proposta; teto c/ retake do wow
~116). Projeto total ~193-217 (alvo 100-300 ✓). declined_preset_id preventivo em
TODOS os takes escuros (teatro inteiro + bastidor).

## [SUPERADO - mundo montanha arquivado; assets e lições permanecem válidos]
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

## Trilha - DEFINIDA PELO USUÁRIO (2026-07-25)

Faixa: **Jóhann Jóhannsson - "A Sparrow Alighted Upon Our Shoulder"** (Orphée, 2:27),
fonte YouTube `TYjME2xuMck` via yt-dlp (binário atualizado no scratchpad; o do sistema,
2024.04, está quebrado p/ o YT atual). **LICENÇA: COMERCIAL (Deutsche Grammophon)** -
preview privado ok; para publicar: faixa pela biblioteca do app OU export limpo.
Alinhamento MEDIDO (RMS/s): janela da faixa **95,8s-117,2s** → clímax da peça (111s,
RMS -13,2) cai na travessia do branco (15,2s do filme); o recuo quieto (102-105s)
cobre a pausa imóvel; o silêncio pós-clímax (114s) cobre a revelação da praia.
Mix: fade-in 0,8s, fade-out 1,8s @19,6s, loudnorm -14 LUFS. Arquivo:
`ALEM_oner_v2_MUSICA.mp4` (preview). Áudio local: `trilha_sparrow.wav` (fora do git).

## Cartela final (2026-07-25): "Di chi sono i nostri giorni?"

Citação verificada (web): a pergunta recorrente de **La Grazia** (Sorrentino, 2025).
Colocada DENTRO do branco final: +3,2s de cartela branca contínua ao fade-out do
filme, DejaVu Serif 40px cinza 0x2A2A2A, fade-in 0,7s / respiro / fade-out 0,6s.
Citação curta de obra = uso de citação, sem o problema de licença da trilha.
Arquivo: `ALEM_oner_v3_GRAZIA.mp4` (24,6s) - candidato a corte final.

## Trilha (fase 8) [plano antigo - Stable Audio local, superado pela escolha do usuário]

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
