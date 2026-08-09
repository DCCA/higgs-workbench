# Consistência de locação, set, props e estilo em produção de vídeo com IA — estado da arte (pesquisado em ago/2026)

Fontes verificadas por busca web em 08/08/2026. Datas indicadas por artigo quando disponíveis.

---

## 1. Location locking: master view → cobertura do MESMO set

**Prática dominante em 2026: híbrida em três camadas, escolhida pelo tamanho do projeto.**

### 1a. Master still + modelo de edição de imagem ("same room, new angle") — o caminho padrão para curtas/ads
- Gerar a vista-mestre do set (wide estabelecedor, VAZIO ou com mínimo de personagens), depois derivar ângulos com modelo de edição: **Nano Banana Pro/2 (Gemini image)** é o líder citado — "foundation image + prompt curto só de câmera" ("low-angle wide shot, same room"), sem reescrever o prompt inteiro, que é o que quebra a consistência. Google/DeepMind documenta oficialmente controles de câmera/lente/luz mantendo identidade da cena. Fontes: [TechyHeaven — Nano Banana Pro Camera Control: infinite angles from one image](https://techyheaven.com/nano-banana-pro-camera-control/), [Google blog oficial Nano Banana Pro](https://blog.google/innovation-and-ai/products/nano-banana-pro/) (nov/2025), [guia VidAU](https://www.vidau.ai/how-to-make-stunning-camera-angle-with-nano-banana-pro-gemini-ai-image-generator-now/).
- **Flux Kontext**: mesma função, com regra de prompt explícita — dizer o que deve MUDAR e listar o que deve FICAR ("maintain identical camera angle, framing, and perspective"). Fontes: [BFL oficial](https://bfl.ai/announcements/flux-1-kontext) (mai/2025), [Kontext prompt guide](https://kontext-dev.com/posts/flux-kontext-prompt-guide-flux1-dev-image-editing).
- **Truque do grid**: gerar TODOS os beats de uma cena num único grid 3x3 no Nano Banana 2 (uma geração = luz/paleta/set idênticos em 9 frames), depois recortar e animar cada célula. É a receita dos guias de ad de 2026. Fonte: [AI Fire — Nano Banana 2 & Kling 3.0 cinematic ad workflow](https://www.aifire.co/p/nano-banana-2-kling-3-0-cinematic-ai-ad-workflow-2026) (05/mar/2026).

### 1b. "Panorama-first" — o guia mais concreto de 2026
Guia dedicado a persistência de ambientes ([nat.io — AI Environment Consistency: Guide to Persistent Worlds](https://nat.io/blog/consistent-environment-generation-guide), 11/fev/2026):
1. Gerar a locação vazia como panorama equiretangular/"360 view" — âncoras espaciais (portas, janelas, móveis, direção da luz) ficam definidas de uma vez.
2. Travar geometria com **depth map / canny (ControlNet)** — "geometry control é a ÚNICA forma de travar espaço físico"; depth respeita paredes/chão/móveis, canny trava silhuetas arquitetônicas.
3. Colocar personagens DENTRO da geometria preservada, nunca regenerar o fundo.
4. Gerar um master "B-side" (contra-plano) para reverses.
5. Sequência de estabelecimento padrão: wide → reverse wide → medium de trabalho → inserts de detalhe.

### 1c. Proxy 3D / world models — a prática "profissional" que cresceu em 2025-26
- **World Labs Marble** virou o caso de referência: tratar o mundo 3D gerado como SET VIRTUAL explorável — mover-se pelo espaço para ACHAR os enquadramentos (em vez de prompt por shot), exportar stills como plates de vários ângulos do MESMO ambiente, compor personagens (Midjourney) e animar com Veo-3/Runway/Sora. Usuários nomeados: **Tim Simmons (Theoretically Media)**, curta "Alarm"; **Henrik Vasquez** (ex-Baldur's Gate), série "Cryptid Worlds". Citação-chave de Simmons: o set travado libera para "experimentar movimento e emoção" sem reconstruir cenário. Fonte: [World Labs case study](https://www.worldlabs.ai/case-studies/creative-film) (12/nov/2025).
- Variante clássica: blockout em **Unreal/Blender → panorama 360 → style transfer**, câmera match-moved. Documentado no panorama de workflows da [VP Land — State of AI Filmmaking Workflows](https://www.vp-land.com/p/step-by-step-the-state-of-ai-filmmaking-workflows) (14/ago/2025) e no [guia Blender for AI Filmmaking 2026](https://flick.art/blog/blender-ai-filmmaking).
- No institucional: **Asteria fechou parceria com estúdio de virtual production (ZeroSpace)** — sinal de que o high-end converge IA + set 3D real. Fonte: [Variety](https://variety.com/2026/biz/news/ai-studio-asteria-strikes-strategic-partnership-zerospace-1236825083/) (2026).

**Veredito**: para escala indie/ad, o dominante é master still + Nano Banana/Kontext para novos ângulos, com depth/canny quando há pipeline ComfyUI. World models (Marble) são a fronteira que os practitioners mais visíveis já adotaram para curtas; blockout 3D completo é minoria (custo de skill), usado quando há muitos shots na mesma locação.

---

## 2. Style keys / referências de estilo

- **Midjourney `--sref`** continua o anchor de estilo mais citado: URL ou código sref aplicado a TODA geração do filme copia paleta, grão, luz e textura; algoritmo `--sv 6` (16/jun/2025) reduziu "subject leakage". Combinar com `--style raw` para look menos "Midjourney". Fontes: [Medium — SREF code, clone any aesthetic](https://medium.com/@ashley-insights/the-secret-number-how-to-find-the-midjourney-sref-code-and-clone-any-aesthetic-d4fb043357c8), [ImaginePro 80s film look](https://www.imaginepro.ai/blog/2025/7/midjourney-80s-film-look-parameters) (jul/2025).
- **Bloco de estilo re-declarado em cada prompt** — a prática do practitioner com maior evidência pública, **PJ Accetturo (PJ Ace)**, autor do ad da Kalshi no NBA Finals (Veo 3, ~US$2k, no ar em TV): "cada prompt descreve a cena como se o Veo não tivesse contexto nenhum — re-descreva setting, personagem e tom TODA vez". Fontes: [thread do PJ Ace com prompts](https://twitter.com/PJaccetturo/status/1932893260399456513) (jun/2025), [Yahoo/BI breakdown](https://www.yahoo.com/entertainment/articles/chaotic-kalshi-ad-during-nba-173937071.html).
- **LoRA de estilo** treinada num set curado de imagens do look-alvo, para pipelines locais (VP Land, ago/2025), e **Runway References / Flux Kontext** como style-transfer por imagem.
- **Grade em pós, não no prompt**: consenso prático — travar o look "80%" na geração e unificar o resto com grade: grade do hero frame → match dos demais clipes; norma 2025 é LUT adaptativa + secundárias pontuais (pele, céu, cor de marca); grão de filme uniforme aplicado por cima na timeline (esconde variação de textura entre modelos). Fontes: [aaapresets — AI + LUTs 2025](https://aaapresets.com/blogs/davinci-resolve-color-grading-gradient-tutorials/ai-luts-how-neural-tools-are-leveling-up-your-color-grading-game-in-2025), [ReelMind AI LUTs](https://reelmind.ai/blog/ai-powered-video-luts-for-cinematic-looks).

---

## 3. Prop/asset sheets (produto EXATO em ads)

- **Foto real do produto como referência em toda geração** é regra absoluta nos workflows de ad 2026: subir fotos reais em múltiplos ângulos + close de embalagem (escala real com mão segurando). Fontes: [BrandGene commercial product workflow](https://brandgene.io/blog/ecommerce/product-photography/commercial-product-photography-ai-workflow), [Film Threat — 7 tools for product consistency 2026](https://filmthreat.com/features/7-best-ai-tools-for-product-consistency-in-ad-creatives-2026/).
- **Passo de "detail restoration"** (o achado mais acionável): depois de gerar o storyboard, voltar ao Nano Banana 2 com (a) o frame gerado com produto borrado + (b) a foto real, e pedir reconstrução de textura/logo/branding sobre o frame. Duas etapas: gerar cena, depois RE-travar o produto. Fonte: [AI Fire ad workflow](https://www.aifire.co/p/nano-banana-2-kling-3-0-cinematic-ai-ad-workflow-2026) (05/mar/2026).
- Suporte nativo dos modelos: **Nano Banana Pro** mistura até 14 imagens de referência com consistência declarada de até ~5 pessoas/10 objetos; **Veo 3.1 "ingredients"** aceita 3 imagens de referência por geração; **Kling 3.0 Omni Reference** combina personagem + produto no vídeo. Fontes: [DataCamp NB Pro](https://www.datacamp.com/tutorial/nano-banana-pro), [CrePal Veo 3.1](https://crepal.ai/blog/agent/meet-google-veo-3-1-the-ai-video-generator-thats-challenging-sora-2/), [Atlas Cloud Kling 3.0](https://www.atlascloud.ai/blog/guides/kling-3.0-review-features-pricing-ai-alternatives).
- Isolamento em fundo neutro: os pipelines de e-commerce ([Photta](https://www.photta.app/blog/best-ai-product-photography-tools-styles-2026), [MyUP](https://myup.ai/blog/consistent-ai-product-photography-ecommerce)) padronizam cutout em branco (>2000px, silhueta nítida) como asset-mestre, e variam só o CONTEXTO ao redor do produto travado.

---

## 4. Sistemas de continuidade / "freezing a view"

- **World bible leve** (o formato recomendado pelo guia nat.io, fev/2026): mapa de layout com objetos-âncora, paleta de materiais, lógica de luz (hora/direção/temperatura) e **lista de "forbidden drift"** (o que NUNCA pode mudar). É exatamente o análogo de uma bíblia de produção.
- **Frame map em vez de doc separado** (abordagem alternativa, pipeline público [ai-film-pipeline/cinema-worldbuilder](https://github.com/Gregory-Esman/ai-film-pipeline/blob/main/cinema-worldbuilder/SKILL.md)): cada sujeito nomeado tem imagem canônica anexada SEMPRE ("plate carries the world; canonical reference carries identity — no exceptions"), posição de tela/terço/camada de profundidade pinada por shot, e regras cross-frame ("no swap, no center crossing, no depth change").
- **Camera setups travados como no live-action: sim, é prática real.** O padrão de cobertura recomendado é 5-7 ângulos fixos por cena (wide estabelecedor, medium, close, over-shoulder, 1 ângulo dinâmico), com variações de prompt escritas ANTECIPADAMENTE mudando SÓ enquadramento/ângulo (VP Land, ago/2025; [Morphic — Coverage](https://morphic.com/ai-glossary/Coverage)). Nota de calibração da comunidade: closes e wides são os mais estáveis run-to-run; low/high angles variam mais. Com Marble, "freezing a view" é literal — salvar posições de câmera dentro do mundo 3D.
- Institucional: **Asteria Continuum Suite** (lançado mar/2026) é um "OS de produção" cobrindo desenvolvimento→coordenação→entrega, com continuidade como valor central; Pressman Film entre os clientes. Fonte: [Deadline](https://deadline.com/2026/03/asteria-launches-continuum-suite-ai-operating-system-film-tv-production-1236749265/). Estúdios (Secret Level, Promise) publicam pouco do sistema interno; a evidência pública de tracking é dos indies (prompts numerados, 5 por lote — PJ Ace).

---

## 5. Ferramentas multi-shot nativas (2026) e o quanto os pros confiam

- **Kling 3.0 Multi-Shot Storyboard**: até 6 cortes numa geração, modos Smart (IA decupa) e Custom (você define duração/câmera/layout por shot), 15s por geração encadeáveis, 4K. É a feature mais elogiada da categoria. Fontes: [92learns comparativo 2026](https://blog.92learns.com/best-ai-video-generators/), [kingy.ai review](https://kingy.ai/news/kling-3-0-review-a-serious-step-toward-ai-video-as-a-production-system/) (28/jul/2026).
- **Sora 2 Storyboard** (Pro): frames múltiplos com prompt por frame, edição frame-a-frame, até 60s. Fonte: [SoraVideo guia 2026](https://soravideo.art/blog/sora-2-storyboard).
- **Veo 3.1**: scene extension (estender vídeo existente) + ingredients (3 refs); ganha em fidelidade de prompt para shots curtos. Fonte: [CrePal](https://crepal.ai/blog/agent/meet-google-veo-3-1-the-ai-video-generator-thats-challenging-sora-2/).
- **Confiança**: a review mais séria (kingy.ai, jul/2026) é explícita — Kling "não promete que todo prompt vira cena multi-câmera"; orçar RETRIES e testar uma cena representativa antes de estimar custo. O consenso 2026 segue **image-first**: desenhar keyframes como stills (baratos, iteráveis), animar por i2v com first/last frame — "o setor caminha para CONTROLE, não surpresa" ([Kittl workflow 2026](https://www.kittl.com/blogs/ai-video-character-consistency-workflow/), [Flowith guia 2026](https://flowith.io/blog/ai-video-workflow-pricing-models-2026/)). Dado duro de iteração: PJ Ace queimou 300-400 gerações para 15 clipes usáveis num ad de 30s. Multi-shot nativo é usado para dentro-de-cena (diálogo shot-reverse-shot); a montagem do filme continua sendo feita de takes independentes ancorados em stills.

---

## TOP 10 práticas por força de evidência

1. **Image-first: stills-mestre aprovados antes de qualquer vídeo, i2v com first/last frame** — consenso universal em toda fonte 2025-26 (Kittl, Flowith, Kling oficial, AI Fire).
2. **Foto real do produto como referência anexada a TODA geração + passo de detail-restoration por cima do frame gerado** — workflows de ad documentados passo a passo (AI Fire mar/2026, BrandGene, Film Threat 2026).
3. **Master view do set vazio → novos ângulos via modelo de edição (Nano Banana Pro camera control / Flux Kontext), prompt só de câmera** — documentação oficial Google + múltiplos guias independentes.
4. **Re-descrever setting/personagem/tom integralmente em cada prompt (nada de "same as before")** — practitioner nomeado com resultado em TV nacional (PJ Ace/Kalshi, prompts publicados).
5. **Grid único (3x3) para todos os beats de uma cena — uma geração = luz e paleta idênticas** — receita padrão dos guias de ad 2026.
6. **Style key fixo por projeto: `--sref`/código de estilo + bloco de estilo idêntico em todo prompt; unificação final por grade + grão em pós** — Midjourney docs + prática de coloristas (norma LUT 2025).
7. **Cobertura planejada como live-action: 5-7 setups fixos por cena, variando SÓ ângulo/enquadramento no prompt, escritos antes de gerar** — VP Land ago/2025 + glossários profissionais; closes/wides mais estáveis que low/high.
8. **World bible leve por locação: mapa de âncoras, paleta de materiais, lógica de luz, lista de forbidden-drift** — guia dedicado (nat.io fev/2026) + pipeline público no GitHub; espelha o que estúdios formalizam (Asteria Continuum).
9. **World model 3D como set virtual (Marble): explorar para achar shots, exportar plates de vários ângulos do mesmo mundo** — case study com practitioners nomeados (Tim Simmons/Theoretically Media, nov/2025); fronteira em adoção, não ainda maioria.
10. **Multi-shot nativo (Kling 3.0 storyboard, Sora 2 storyboard) para diálogo/cena única — mas orçando retries e sem confiar para o filme inteiro** — reviews jul/2026 explícitas sobre os limites; proxy 3D completo (Unreal/Blender + depth) fica para projetos com muitas cenas na mesma locação.

**Padrão transversal**: consistência é propriedade do WORKFLOW, não do modelo — uma referência canônica por entidade (set, produto, personagem, estilo), roteada para todo nó downstream; e todo problema de consistência é resolvido no still (barato/iterável) antes de virar vídeo. Ambos os princípios já são exatamente o que o PRATICAS.md deste workbench prescreve para identidade de personagem — a novidade 2026 é estendê-los a locação (master view + edição de ângulo), produto (restauração de detalhe) e estilo (style key + grade unificadora em pós).
