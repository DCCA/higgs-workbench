# MARÉ ALTA - bíblia de produção

Vídeo curto ~15s, 4 shots, 9:16, só trilha (sem VO). Estreia do workflow `/novo-video`.

**Conceito:** fusão das duas referências de inspiração - a escala monumental (arco
planetário × pessoa minúscula) com a textura analógica (blue hour, grão 35mm, o
impossível visto de um campo comum). Atrás das árvores sobe, não a lua, uma
**parede de oceano vertical** com espuma fosforescente.

## Linguagem visual (colar em TODO prompt)

> analog 35mm photo look, heavy film grain, slightly faded colors, deep blue dusk,
> dark pine treeline silhouette, cold pale phosphorescent light

Testemunha: menino ~10 anos, sempre DE COSTAS ou minúsculo (sem rosto = sem problema
de identidade), jaqueta escura, cabelo escuro.

Cláusula anti-rotação obrigatória (cena externa): "vertical portrait-orientation,
UPRIGHT framing, the HORIZON/TREELINE runs PERFECTLY HORIZONTAL".

## Decupagem (~15s)

| Shot | Conteúdo | Movimento | Dur | Frames |
|---|---|---|---|---|
| S1 | menino de costas, campo, brilho frio atrás das árvores | ação no quadro (vento) | 4s→3s | CAMPO |
| S2 | **WOW: tilt-up revela a parede de oceano no céu** | movimento de câmera | 5s | CAMPO → OCEANO |
| S3 | macro no alto: onda quebra em câmera lentíssima | ação no quadro | 4s | ONDA (derivado de OCEANO) |
| S4 | wide final: menino minúsculo sob o oceano-céu | ambiente, estático | 4s→3s | POSTER |

S1/S4 gerados em 4s (mínimo do modelo) e aparados na montagem.

## Frames-âncora (APROVADOS pelo usuário)

| Frame | ID | Uso |
|---|---|---|
| CAMPO | `d2703a5e-2380-4144-888d-72b81451f95a` | start S1 e S2 |
| OCEANO | `fd145361-cff0-4478-9420-923f5028d1d0` (v2) | end S2, mãe do S3 |
| POSTER | `f38d65b9-eb35-4309-ae7b-60abbe7c84df` | S4 (o quadro-pôster) |
| ONDA | a derivar de OCEANO | start S3 |

Descartado: OCEANO v1 `2dcab8ce` - gerado SOLTO em vez de derivado do CAMPO (violação
da regra do frame irmão) e veio com pinheiros nevados/chão de neve, quebrando a
continuidade do tilt-up. O v2, derivado com CAMPO+v1 como refs duplas, casou paleta e
locação. A geada residual nas copas lê como a luz do brilho: aceita no gate.

## Custos (preflight)

- vídeo 4s fast 720p: 14 cr | 5s: 17,5 cr (medidos via get_cost)
- Conta do projeto: ~68 limpo, teto ~103 com retakes
- Gasto até os âncoras: 8 cr (4 stills, incluindo o retake do OCEANO)

## Produção

| Shot | Vídeo | Status |
|---|---|---|
| S2 (wow) v1 tilt | `f8fb4bef` | REPROVADO pelo usuário |
| S2 (wow) v2 maré-sobe | `d8941f5f` | end frame MARÉ_CHEIA `e10b42dd` |

**Lição nova (candidata a PRATICAS): tilt/pan com start e end sem NENHUM elemento
compartilhado vira "cortina".** No tilt v1, o start (menino+campo) e o end (céu-oceano)
não compartilhavam um único pixel de conteúdo; o modelo interpolou deslizando a cena
final por cima da inicial como um wipe, com dois horizontes simultâneos no meio.
Regra: movimento de câmera interpolado exige que uma fração do quadro sobreviva do
start ao end (o mesmo prédio, a mesma linha de árvores). Quando nada sobrevive,
converter para TRANSFORMAÇÃO DE ESTADO com câmera travada - o mundo muda dentro do
mesmo enquadramento (aqui: o oceano SOBE atrás das árvores, menino no quadro o tempo
todo - dramaticamente até melhor, a testemunha assiste junto).

## PAUSADO (2026-07-18)

Wow-shot v2 (maré-sobe, `d8941f5f`) também REPROVADO pelo usuário; pedido explícito de
parar de gerar. 45 cr gastos. Estado: âncoras aprovados seguem válidos.
Retomada exige conversa sobre o que falhou no movimento antes de qualquer geração nova.
