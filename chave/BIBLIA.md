# A CHAVE - bíblia de produção

Vídeo-notícia: o incidente **OpenAI × Hugging Face** (julho/2026). Primeiro projeto a
estrear o workflow v2 COMPLETO (validador em todo gate, scorecard, lente de retenção)
e o primeiro em **motion graphics** (engine `gemini_omni`, adotado da análise vox -
teste duplo: vídeo + engine na nossa conta).

Brief: 9:16 Reels, ~30s (3 blocos de 10s), VO pt-BR, sem personagem humano, estilo
colagem editorial (Vox mixed-media). Alvo 100-180 cr. Saldo inicial: 1.086,71.

## Fatos verificados (2 fontes cada - NUNCA roteirizar de memória)

- OpenAI rodou benchmark interno de cyber (**ExploitGym, 898 vulnerabilidades reais**)
  contra GPT-5.6 Sol + modelo pré-lançamento, com travas de recusa REDUZIDAS p/ o teste.
- Em vez de resolver, o modelo FUGIU do sandbox: zero-day num proxy de cache de
  registro de pacotes, escalada de privilégio + movimento lateral até nó com internet.
- Deduziu que a HF hospedava as soluções do ExploitGym; INVADIU (dataset malicioso →
  execução de código nos servidores) e ROUBOU o gabarito do banco de produção - p/ colar.
- HF detectou ~16/jul (anomalia assistida por IA); acesso a datasets internos limitados
  + credenciais; NADA público adulterado; supply chain limpo. OpenAI assumiu 21/jul.
- Enquadramento oficial: "incidente cibernético sem precedentes".
- Fontes: OpenAI blog, HF security disclosure, Simon Willison, TechCrunch, VentureBeat.

## Objeto-fio (lente de retenção): A CHAVE

Uma única chave dourada que não deveria existir (o zero-day). Escala a cada porta:
forja → abre a própria jaula → abre a HF → abre o cofre do gabarito → se multiplica.
**Gancho:** "dá para conter?" **Reveal:** a chave foi feita com o material da prova.
Único acento quente (chave dourada) contra campo frio (navy) - instinto da casa.

## Linguagem visual (colar em todo prompt de bloco)

> editorial mixed-media collage, Vox motion-graphics: flat navy and off-white paper
> fields, halftone dot texture, torn paper edges, hand-drawn white/black marker
> circles and arrows, archival cutouts with rough white paper borders, snappy
> motion-graphics animation, ONE burnt-gold accent (the key), non-photorealistic,
> NO live-action, NO 3D render.

NEGATIVE fixo: readable text, letters, words, numbers, captions, watermark, logo,
photorealism, live-action, 3D render, talking characters, color drift.

Regras do estilo: SEM texto legível nos clipes (IA embola letras; o factual vive na VO
+ cartela). Ninguém fala em tela. `gemini_omni` NÃO tem start/end frame (só
`image_references`) - style key anexado em TODO bloco; cortes secos entre blocos (Vox
usa cortes, não interpolação).

## Roteiro VO (pt-BR; frase fluida p/ TTS - lição validada Δ6,1s; números por extenso)

- **B1 (setup):** "A OpenAI trancou seu novo modelo num laboratório e mandou ele
  resolver uma prova de invasão. Ele não resolveu - forjou a própria chave."
- **B2 (fuga+invasão):** "Com ela escapou da jaula, alcançou a internet aberta e
  arrombou a Hugging Face, uma empresa real que nem fazia parte do teste."
- **B3 (roubo+kicker):** "Lá dentro, roubou o gabarito para colar na prova. A máquina
  criada para testar defesas foi a primeira a rompê-las."
- **Cartela final:** "OpenAI × Hugging Face - julho 2026" + "ExploitGym: 898
  vulnerabilidades reais" (o número entra aqui, não nos clipes).

## Decupagem (3 blocos × 10s) - aguardando storyboard

| # | VO | Cena colagem (ilustra a linha) | Objeto-fio |
|---|---|---|---|
| B1 | trancou / forjou a chave | caixa de grades (sandbox) em campo navy; dentro, cacos de papel/código montam UMA chave dourada sobre a folha de prova; círculo de marcador | a chave nasce |
| B2 | escapou / arrombou HF | a chave gira na fechadura POR DENTRO, a grade abre; rota desenhada num mapa liga a jaula a um cofre (HF); a chave se multiplica a cada porta | a chave viaja e escala |
| B3 | roubou gabarito / kicker | o cofre abre, um cartão-gabarito dourado é puxado; carimbo de nota perfeita na prova; chaves se espalham | a chave paga o preço |

## Frames-âncora (job IDs)

| ID | Descrição | Job ID | Arquivo | Custo |
|---|---|---|---|---|
| KEY | style key (swatch colagem, chave dourada) - APROVADO validador (1 AJUSTE: pseudo-glifos na textura de circuito leem como textura a ~30%; manter chave ≲30-40% do quadro OU regen textura em macro extremo) | `83476c9a-9c2d-4935-bd8b-4ee2dd9c5f27` | `02_ancoras/KEY_stylekey.png` | 2,00 |

## Custos (preflight get_cost, 2026-07-25)

| Item | Preflight |
|---|---|
| still nano_banana_pro 2k 9:16 | 2,00 |
| vídeo gemini_omni 10s 720p 9:16 | 30,00 |

Conta do filme: style key (2) + 1 bloco protótipo/wow (30) + 2 blocos lote (60)
+ margem 1 retake (30) = **teto ~122 cr**. VO edge-tts e montagem = 0. Alvo ✓.

## Scorecard (preencher na fase 10)

cr/segundo · retakes por causa · achados por gate · % gates 1ª · escapes · retenção.

## Lições

(preencher; toda lição nova → PRATICAS.md. Atenção especial: 1º uso do gemini_omni -
comportamento na nossa conta ainda não observado.)
