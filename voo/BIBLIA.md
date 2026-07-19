# VOO - bíblia de produção

~15s, 4 shots, 9:16, só trilha. Drone-follow contemplativo: o usuário (fotos reais,
one-off) decola de um penhasco e plana sobre o mar ao entardecer.

## Identidade travada (colar em TODO prompt com ele)

> the man from the reference photos: thick dark hair, full dark beard, navy blue
> t-shirt, light beige pants, smartwatch on left wrist

Fotos-ref (media_ids, SEMPRE passar rosto + corpo):

| Ref | media_id |
|---|---|
| rosto frontal | `34d9ef97-766f-4870-a1cc-9c8dd33c3271` |
| corpo inteiro | `ed613a78-fa40-4e8f-a8f6-2fde3b7df506` |
| perfil | `f6044281-2a19-4d39-92c5-e4ce2fe60980` |

## Linguagem visual

> golden-blue dusk over open sea, soft warm light, gentle wind, cinematic,
> shallow grain

Cláusula anti-rotação obrigatória em todo wide (mar = paisagem).

## Decupagem (~15s) - movimento aprovado pelo usuário no papel

| Shot | Conteúdo | Movimento | Dur |
|---|---|---|---|
| S1 | ele na beira do penhasco; pés descolam, sobe ~1m | câmera travada, transformação de estado | 4s |
| S2 WOW | planando sobre o mar, corpo inclinado à frente | drone lateral acompanha: ELE constante no quadro, fundo em parallax | 5s |
| S3 | close rosto calmo, vento, nuvens passando | câmera junto; só fundo se move | 4s |
| S4 | wide: ele pequeno indo pro horizonte dourado | câmera para e deixa ir; fade | 4s |

Racional anti-cortina (lição MARÉ ALTA): em todo shot ele é o conteúdo compartilhado
entre start e end; quem viaja é o fundo.

## Frames-âncora (APROVADOS)

| Frame | ID | Uso |
|---|---|---|
| PENHASCO | `35d8b9b6` | start S1 |
| VOO v2 (horizontal) | `07e94853` | start S2 - quadro-mãe |
| S1_END (levita 1,2m) | `d2d1c5a5` (v2) | end S1 |
| CLOSE | `4802cb4a` | start S3 |
| WIDE | `6692031c` | start S4 |

Descartados: VOO v1 `ca6ba548` (corpo diagonal; usuário pediu horizontal - regen derivado
manteve cena e trocou só a atitude do corpo); S1_END v1 `aac13cee` (pés no chão - o modelo
IGNOROU a levitação e regrediu pra ref. Antídoto: detalhe físico explícito no prompt -
"visible GAP of empty air under the soles, horizon visible THROUGH the gap, shadow on
the grass below". Lição: estado impossível/anti-gravidade exige a EVIDÊNCIA FÍSICA
descrita, não o conceito).

## Produção - COMPLETA

| Shot | Vídeo | Status |
|---|---|---|
| S1 (decolagem) | `60beef50` | ok (start PENHASCO → end levitação) |
| S2 (wow, drone-follow) | `894e21e0` | **aprovado pelo usuário em movimento** |
| S3 (close) | `95c43a0b` | ok |
| S4 v3 (adeus, de costas) | `d2cb9b08` | ok (still `a581f866`) |

S4 v1 (`1e4c00af`, wide com figura microscópica) REPROVADO pelo usuário no corte completo.
**Lição nova (candidata a PRATICAS): figura pequena demais não tem orçamento de pixels** -
um humano com ~20px vira mancha que o modelo não anima com coerência, e o corte
close→micro é um zoom-out violento na montagem. Fix de decupagem: plano final de costas
em tamanho legível (~1/4 do quadro), recuando DENTRO do shot sem nunca virar ponto.
S4 v2 still (`fef2709e`) tinha pés descalços de sola pra câmera (continuidade + estética);
v3 corrigiu com o tênis explícito no prompt.

## Trilha (Stable Audio Open 1.0, GPU local, custo zero)

3 variações de 17,2s em `voo/trilha/`: a (synth etéreo, seed 11), b (piano esparso,
seed 22), c (cordas cinematográficas, seed 33). Gerador do workbench:
`tools/stable-audio/gerar_trilha.py`. Setup teve 2 pedras: numpy 2.x quebra pywt
(pin `numpy<2`) e o downgrade derruba pytorch_lightning (reinstalar).

## Corte

`VOO_corte2.mp4` (17,2s, mudo) + 3 previews com trilha em Downloads\voo\.
Aguardando o usuário escolher a trilha → vira VOO_final.mp4.

## Custos medidos

Stills: 18 (9 gerações, 3 retakes: voo-horizontal, levitação, tênis).
Vídeo: 17,5 + 14×3 + 14 (S4 v3) = 73,5. **Total: ~91,5** (teto era 105).

## Pivô: reshoot como plano-sequência (feedback de realismo)

Corte 2 REPROVADO pelo usuário: "not realistic at all" + física/ângulo denunciam,
fundo colado no S4, cortes secos sem filme ponta a ponta. Diagnóstico: problemas
ESTRUTURAIS do conceito (4 gerações independentes = 4 físicas; drone lateral =
câmera impossível; direção "dreamlike" = anti-realismo).

**Resposta estrutural: take único de 15s, câmera cravada no penhasco** (onde uma
câmera real estaria), grama em 1º plano como âncora de mundo único, corpo SOLTO
(decola vertical com pernas pendendo → tronco inclina → desliza rasante), trajetória
NIVELADA rumo ao horizonte (nunca sobe - "o teto dele é o horizonte").

**Prática nova - storyboard local a custo zero:** antes do take caro, rascunho
desenhado (PIL) e depois fotográfico (reusando frames JÁ PAGOS como beats) para o
usuário validar arco, trajetória e física no papel. 3 iterações de storyboard por
0 créditos: v1 silhuetas → v2 fotos (bug das pernas na grama colada) → v3 corrigido
→ v4 com mundo povoado. Pegou 2 mal-entendidos ANTES da geração (impressão de
"subida ao universo" nas setas; fundo vazio sem graça).

Mundo povoado a pedido do usuário (2 cr): PENHASCO v2 `26ef0a78` - farol aceso,
3 barcos de pesca, gaivotas, nuvens douradas. O take herda tudo.

Take único: `7902c1cf` (15s, 52,5 cr). Storyboards em Downloads\voo\.
Custo do projeto após pivô: ~146.

## FINAL (2026-07-19)

Take único `7902c1cf` APROVADO pelo usuário. Trilha C (cordas) escolhida pela direção
com alternativas entregues (a=synth, b=piano) - trocar é renomear.
Entregas em Downloads\voo\: VOO_final.mp4 (15s, trilha C), VOO_final_ALT_synth.mp4,
VOO_final_ALT_piano.mp4, storyboards v1-v4.

Custo final do projeto: ~146 cr (73,5 corte 1 + 16 fix S4 + 2 mundo povoado + 52,5 oner
+ 2 penhasco v2). Trilha: custo zero (Stable Audio local). Lições promovidas a PRATICAS.

## Iteração: corpo duro no take → motion transfer (em curso)

Usuário: "a pessoa está muito dura". Ferramenta certa: `motion_control` (Kling 3.0) -
transfere movimento de vídeo REAL pro personagem. Aprendizados pagos com falhas GRATUITAS
(job failed não cobra; saldo conferido intacto):

1. Falha 1 (instantânea): still DE COSTAS `a581f866` - o tracker não detecta personagem
   sem rosto/silhueta clara. Usar still com corpo legível (perfil `07e94853` passou da
   detecção).
2. Falha 2 (meio do processo): doador ruim - GoPro fisheye, flyer colado na câmera e
   saindo do quadro (Pexels 7997309). Doador precisa: UMA pessoa, corpo inteiro SEMPRE
   no quadro, câmera estável, sem fisheye.
3. Acervo livre de voo solo esgotado sem resultado (Pexels/Pixabay/Videvo/Vecteezy/
   Mixkit/Commons): só tandem, duplas acrobáticas ou fotos.

Conclusão: o doador ideal é CLIPE CASEIRO ATUADO pelo usuário (deitado de bruços num
banco, 15s, celular de lado, estável). Aguardando o clipe.
