---
name: novo-video
description: Workflow completo para criar um vídeo curto de IA neste workbench - do brief ao corte final com áudio. Use quando o usuário quiser criar um vídeo novo, disser "novo vídeo", "criar um vídeo", "fazer um reel/short", ou trouxer um roteiro/ideia de vídeo. Cada projeto vira uma pasta própria com bíblia de produção.
---

# Novo vídeo - workflow do workbench

Pipeline provado em vários curtas (o primeiro, MÁSCARAS: 2:24, 26 shots, ~695 créditos,
10 retakes). Antes de começar, leia `PRATICAS.md` (regras de geração) e tenha
`FERRAMENTAS.md` à mão (áudio/pós grátis). Cada projeto cria sua própria `BIBLIA.md`
no padrão da fase 2 (bíblias de exemplo ficam no portfólio local, fora do repo).

## Escala padrão: vídeo pequeno e impressionante

- **15-60s, 3-8 shots**, um único "wow-shot" como âncora do vídeo
- Orçamento alvo: **100-300 créditos** (protótipo + produção + margem de 2x retake no wow-shot)
- 9:16 fast 720p sempre; upscale só no corte aprovado

## Validação de gate (transversal, OBRIGATÓRIA)

**Nada chega a um gate do usuário sem passar antes pelo subagente `validador-gate`**
(definido em `.claude/agents/validador-gate.md` - olhos frios, read-only, checklists
por tipo de gate). Fluxo: produzir → validar → corrigir até APROVADO (achados
BLOQUEIA nunca chegam ao usuário) → apresentar ao usuário COM o resumo da validação
(checks rodados + observações de gosto que sobraram para ele decidir). O briefing do
validador leva: caminhos dos arquivos, tipo de gate, e o trecho relevante da bíblia.
O gate do usuário passa a ser só decisão criativa - a régua objetiva já foi aplicada.

**Aceitação do veredito (quem valida a rodada do validador):** o diretor NÃO julga o
mérito de novo - roda `bash tools/qc/lint_veredito.sh <veredito.txt>` (formato,
cobertura do eco, evidência em todo achado, ferramentas citadas) + 1 spot-check de
uma evidência aleatória (abrir o arquivo/medida citada e conferir que existe).
**Gatilhos de re-rodada obrigatória:** lint falhou; APROVADO com zero achados em
gate de mídia (limpo demais é smell - todo material real rende observações);
spot-check não confere; ou escape descoberto depois (aí também re-calibra via
`tools/qc/CALIBRACAO.md`). O mérito do validador é garantido pelos juízes com
gabarito: calibração (casos dourados) e loop de escapes - NÃO por outro LLM juiz
(regressão infinita sem ground truth).

## Board ao vivo (transversal)

O diretor mantém `<slug>/estado.json` (viewer em `tools/viz/`): TODA transição é
registrada NA HORA - fase iniciada/concluída, gate aberto/passado, job lançado (com
o custo do preflight), veredito do validador, retake (causa no evento),
aprovado/descartado. Nunca atualizar em lote no fim da fase: board congelado é bug
de processo, e o validador confere frescor/coerência em todo gate.

**Trabalho longo DENTRO de uma fase também reporta.** Transição não é só troca de
fase: construir mundo/kit, esperar subagente, rodar fix - qualquer estirão acima de
~3 min emite um evento de progresso (`tipo: fase`, ref da fase corrente) dizendo o que
está acontecendo. Sem isso o board congela no meio de uma fase e o alarme de frescor
dispara com razão - foi o que aconteceu no SOL (40 min construindo o mundo
ground-station sem um único reporte).

**Contrato de escrita (o viewer depende disto):** `ref` de evento é o id EXATO do
shot ou o número da fase - é o que pinta o nó de vermelho; ref errado falha
silencioso. `atualizado_em` SEMPRE em UTC com `Z` (`date -u +%FT%TZ`; hora local
liga o alarme de frescor para sempre). Escrever o arquivo INTEIRO em
`estado.json.tmp` e mover por cima (`mv`) - nunca patch parcial. Estados de gate:
a fase vira `validando` enquanto o validador roda e `gate_usuario` quando o
material chega ao usuário (é o que o checklist transversal do validador confere).

## Filme programático (transversal - estilos 100% motion)

Quando o estilo declara produção programática (`tools/motion/`), o workflow NÃO
muda - muda a origem do take: âncoras = stills renderizados
(`npx remotion still <Cena> --props=<json> --frame=60`, sempre com frame tardio
- pós-entrada + assentamento; frame 0 é o quadro vazio), wow-shot = a cena de maior risco
renderizada primeiro, takes = cenas renderizadas (`npx remotion render`), montagem
= ffmpeg como sempre (cena é take; transição NUNCA dentro do Remotion). Preflight
continua obrigatório: a conta mostra 0 cr + o tempo de render por cena (referência
no ESTILO e em tools/motion/README.md). Gates, validador, QC e bíblia idênticos -
a bíblia registra os props JSON de cada take no lugar de job IDs.

## Fases (com gates de aprovação do usuário)

### 1. Brief (1 rodada de perguntas, no máximo)
Formato/plataforma, duração alvo, tem áudio/VO?, **casting** (o usuário? personagem
genérico? sem personagem? - refs de identidade existem no acervo dos projetos), e
**qual é o momento impressionante**. Se o usuário trouxe roteiro, extrair isso dele.
AVISO explícito no brief: casting e linguagem de montagem TRAVAM nos gates - pivô
depois da produção = re-shoot integral (ALÉM: 2 pivôs tardios ≈ 133 cr refeitos).

**Estilo**: perguntar se o vídeo usa um estilo existente (`estilos/`), declara um
ESTILO NOVO (nasce `rascunho` - regras em `docs/PROPOSTA-estilos-de-video.md`) ou
é autoral sem estilo. Estilo declarado entra na bíblia como referência e as fases
seguintes herdam a receita.

### 1.5 Conceito (OBRIGATÓRIO para brief abstrato/reflexivo; gate próprio)
Quando o vídeo traduz uma ideia (reflexão, sentimento, frase) em vez de uma cena
literal, o conceito tem gate ANTES de qualquer âncora:
- Apresentar **3-5 mundos/arcos DIFERENTES** (uma linha cada), nunca 1 aposta
- Teste de categoria: o "além/clímax" é de OUTRA NATUREZA que o setup (terra→ar,
  palco→amanhecer)? "Maior do mesmo" não é clímax (montanha maior ainda é montanha)
- Teste de arco: o personagem/estado TERMINA diferente de como começou (pedra→pássaro)?
- Os dois polos da ideia aparecem EM CENA (evidência física > conceito, vale p/ significado)
- **Lente de retenção** (opcional por gênero, da análise vox): existe um OBJETO-FIO
  que atravessa os beats e escala até o payoff? Uma pergunta-gancho respondida só no
  fim? UM reveal pelo qual o vídeo será lembrado?
**GATE: usuário escolhe o mundo antes do primeiro still.** (Origem: ALÉM queimou
~100 cr num mundo conceitualmente errado antes desta fase existir.)

**Com estilo declarado, esta fase ENCURTA**: o mundo já está travado pelo ESTILO -
em vez de 3-5 mundos, apresentar 2-3 ARCOS dentro do mundo do estilo e o gate vira
confirmação de aderência. Escape explícito: se o usuário quiser fugir do estilo,
rodar a fase completa (e considerar declarar estilo novo em rascunho).

### 2. Setup do projeto
- Criar a ÁRVORE PADRÃO completa na raiz:
  `<slug>/{storyboard,01_refs,02_ancoras/_descartados,03_takes/_descartados,04_qc,05_cortes,06_master}`
  + `<slug>/BIBLIA.md` com as seções: identidade travada, linguagem visual,
  frames-âncora (tabela de job IDs **com coluna de arquivo**), decupagem, custos, lições.
- Adicionar `/<slug>/` ao `.gitignore` na criação (o repo é público e ignora projetos
  por entrada explícita - sem isso a bíblia e o storyboard entram no próximo commit).
- Criar `<slug>/estado.json` inicial (contrato em `docs/PROPOSTA-visualizador-workflow.md`)
  e subir o board em background: `bash tools/viz/serve.sh <slug>` - mostrar a URL ao
  usuário para ele deixar aberta ao lado do terminal.
- **Estilo novo declarado no brief**: criar `estilos/ESTILO-<slug>.md` já aqui, no
  contrato de 11 seções (`docs/PROPOSTA-estilos-de-video.md`), com `Status: rascunho`
  e as seções sem lição paga marcadas como HIPÓTESE; adicionar a linha na tabela de
  `estilos/README.md`; registrar o estilo (existente ou novo) na bíblia do filme.
- **Regras de organização (não negociáveis):** status é PASTA - aprovado mora na pasta
  principal, supersedido DESCE para `_descartados/`/`05_cortes/` no instante em que
  perde o posto; `06_master/` contém SÓ a entrega vigente como `<SLUG>_MASTER.mp4`
  (sem versão no nome; a anterior desce versionada); nomes carregam papel+versão
  (`ancora_F2_lago_v2.png`, `take_ONER1_v2.mp4`); QC (strips/folhas/checks) vive em
  `04_qc/`; refs externas (fotos, fontes, áudio-fonte) em `01_refs/`.
  `Downloads\<slug>\` espelha SÓ o gate atual + a entrega, e é limpo no encerramento.
- Preflight de custos com `get_cost: true` - nunca estimar. Mostrar a conta ao usuário
  antes do primeiro crédito gasto.

### 3. Look dev + LOCK (era "frames-âncora"; ampliada no workflow v3)
Gerar com `nano_banana_pro` 2k e APROVAR os artefatos de congelamento, que moram em
`02_ancoras/LOCK/` (versionados, job IDs na bíblia). Origem e fontes:
`docs/PROPOSTA-workflow-v3-congelamento.md` + `docs/pesquisa-2026-08/`.

**Artefatos do LOCK (o que é obrigatório quando):**
- **Character sheet** (personagem em 2+ shots): turnaround corpo inteiro
  frente/lado/costas + ângulos de cabeça + closes de detalhe, fundo branco, luz
  neutra - vira referência anexada em toda geração do personagem
- **Soul ID** (personagem recorrente ENTRE filmes): treino nativo Higgsfield,
  ~20 fotos variadas com 1 de corpo inteiro
- **Location master** (locação em 2+ shots): wide do set VAZIO; ângulos novos
  derivados por i2i "same room, new angle" com prompt SÓ de câmera - nunca t2i
  fresco da mesma sala
- **Prop sheet** (objeto em 3+ shots): isolado em fundo neutro, multi-ângulo;
  ref em toda cena + *detail restoration* sobre o frame gerado se o detalhe borrar
- **Style key** (todo filme): 1 still de estilo + bloco de estilo VERBATIM
  (lente, grão, paleta, luz) em toda geração
- **Bloco de identidade congelado** (todo personagem): texto fixo na bíblia,
  colado ÍNTEGRO - nunca reescrito de memória (é o modo de falha nº 1 de drift)

**Regra de derivação:** entidade que JÁ existe no LOCK nunca nasce de t2i - toda
imagem nova dela deriva por i2i/`medias` de um artefato do LOCK ("EXACT same
scene... ONLY change:"). t2i só para entidade/câmera inéditas, e o resultado
aprovado ENTRA no LOCK na hora.

**Anchor Frame Method:** um still âncora aprovado e VERSIONADO por
personagem-por-locação; todo take deriva DELE, nunca do take anterior
(encadeamento clip→clip degrada). Âncora nova por mudança de cena ou escala.

**Checklist de aceitação POR STILL (antes de mostrar ao usuário):**
- Zoom nas BORDAS: objeto estranho = REJEITAR no still (contamina o take com parallax)
- Logos de marca (a jaqueta TNF volta sozinha), figurino idêntico ao bloco de identidade
  (travar figurino explícito no casting - o default de "pessoa no computador" é capuz)
- Escala do sujeito legível; cláusula anti-rotação aplicada se paisagem/arquitetura
- Derivação conferível: still de entidade existente aponta o artefato-mãe do LOCK
**GATE: usuário aprova o LOCK antes de qualquer vídeo - CASTING + MUNDO + PROPS +
ESTILO travam aqui.** Pivô depois = re-shoot, e o usuário decide sabendo o preço.

### 4. Storyboard (custo ZERO, obrigatório antes de qualquer vídeo)
Todo movimento e trajetória validados NO PAPEL antes do primeiro crédito de vídeo:
- Painéis fotográficos reusando os âncoras JÁ PAGOS como beats; beat sem frame ganha
  silhueta/fantasma desenhado (PIL) sobre o frame real
- Cada painel: timecode + legenda com o EVENTO FÍSICO do beat (coreografia, não adjetivo)
- Setas de trajetória NIVELADAS com o movimento real - anotação errada cria o
  mal-entendido que deveria evitar
- **SETUPS de câmera travados (v3)**: até 5-7 setups fixos por cena, nomeados
  (`SETUP-A wide`, `SETUP-B médio`...), escritos ANTES de gerar; todo shot do
  storyboard referencia um setup. Enquadramento fora de setup não é "ficou até
  bom" - é drift, e reprova no still. Closes e wides são mais estáveis que
  low/high angles run-to-run.
- Copiar para Downloads e iterar de graça até o usuário visualizar o filme inteiro
- **A LINGUAGEM DE MONTAGEM é decisão explícita deste gate**: cortes tradicionais ×
  oner costurado (emendas escondidas em branco/preto/whip) × oner literal (≤15s).
  Mostrar custo e risco de cada; travar aqui - trocar depois da produção = refazer takes
**GATE: usuário aprova storyboard + linguagem de montagem antes de qualquer vídeo.**
(Origem: no VOO, 4 iterações grátis pegaram 2 problemas antes de um take de 52,5 cr;
no ALÉM, o pivô cortes→oner depois da produção refez 73,5 cr de takes.)

### 5. Protótipo do wow-shot PRIMEIRO
O shot mais arriscado/impressionante é gerado antes dos demais, fora de ordem.
Se falhar, a correção é na decupagem (ângulo, destino), não em adjetivos - ver
PRATICAS.md "Movimento de câmera" e "Armadilhas". Só seguir com o resto depois
que o wow-shot existir.

### 6. Produção em lote
`seedance_2_0` fast 720p, mudo (`generate_audio: false`). Aplicar as cláusulas de
PRATICAS.md: end frame para movimento de câmera/transformação (outpaint fabrica
destinos; o end mostra a CAUSA do evento, não só a consequência), start só para
ação no quadro, start+end SÓ com mudança pequena de composição, anti-rotação em
paisagem, objeto-rígido em máscara/adereço, `declined_preset_id` preventivo em
QUALQUER bloco (a interceptação dispara também em cena clara).
Revisar cada shot por strip de 4 frames ANTES de aprovar (produção, não revisão).

**Regras v3 de produção:**
- **2-4 stills candidatos por shot, escolher 1** - a seleção acontece no still de
  2 cr, nunca no take; o still escolhido é a âncora do take
- **Apara planejada**: gerar 5-10s contando ~10s de render para ~6s úteis
  (coerência degrada >15s); o preflight já orça o descarte de cabeça/cauda
- **Batch por personagem/locação**, não por ordem de história - mesmas refs do
  LOCK anexadas ao lote inteiro
- **Preflight com multiplicador de retake 1,3-1,5x** em TODOS os shots
  (2x continua no wow)

### 7. Montagem e revisão de verdade
- **Edição CONCORRENTE (v3)**: o corte começa no primeiro take aprovado e cresce
  junto com a produção - a timeline é o instrumento de continuidade, e a espera
  de render vira revisão do corte
- Concat ffmpeg (`-c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -r 24`);
  emendar com `settb=AVTB,fps=24` também DEPOIS do concat (senão o xfade recusa)
- **Folha de cortes**: último frame × primeiro frame de cada emenda, par a par.
  É onde moram os erros (repetição de quadro, jump cut, pop de luminância).
- Fixes de edição (trim, dissolve 0,25-0,35s, fade) antes de qualquer regen.
- **GATE: usuário assiste o corte** (copiar para a pasta de entrega; ex.: `~/Downloads/<slug>/` - ver SETUP.md).

### 7b. Review anti-slop + linguagem de câmera (OBRIGATÓRIO antes de entregar corte)

Nenhum corte vai ao usuário sem este passe, todo medido (custo zero, ffmpeg + numpy):
- **Anti-slop visual**: folhas de contato 2fps do filme INTEIRO + zoom nas bordas
  (objetos fantasmas têm parallax - crescem; câmera/equipamento em quadro é o pior tell)
- **Scrub 0,25x em mãos, bordas e texto em tela (v3)** - estatisticamente onde os
  erros de geração moram; frame a frame nos segundos de contato físico
- **QC técnico**: YAVG por frame (flicker), `freezedetect` (frames congelados),
  `astats` (clipping de áudio)
- **Câmera se MEDE, não se olha**: correlação de fase frame a frame (wobble/jerk -
  zero picos é o padrão), rastreio do sujeito por cor (disciplina de enquadramento -
  desvio de cx ≲0,02 é nível pro), grade de terços em keyframes (headroom, horizonte)
- **Gramática**: a câmera assenta quando o sujeito para; movimento só motivado
- Achados viram fix de montagem primeiro; regen só se irreparável (e a causa raiz
  vira lição na bíblia)

### 8. Áudio (custo zero primeiro)
- **Som NÃO é opcional (v3)**: sound design é metade do realismo percebido. Todo
  filme leva no mínimo ambiência + foley NOMEADO (passos, tecido, água), ambiência
  15-25 dB abaixo do principal e gerada mais LONGA que o corte. Mudo só por decisão
  explícita do usuário no brief.
- **VO: a voz é escolhida POR VÍDEO** - gerar 2-3 candidatas edge-tts com o texto real,
  usuário escolhe ouvindo contra o corte. Nunca reaproveitar a escolha de outro vídeo.
- Trilha: Stable Audio Open (GPU) ou lib CC0; **nunca MusicGen para uso comercial**.
- Foley: Freesound filtrado CC0.
- Mix simples no ffmpeg (`amix`/`sidechaincompress`); casos complexos vão pro DaVinci.
- Música pronta (inclusive do usuário): janela escolhida por CURVA RMS × timeline
  (clímax no beat certo), nunca "do início". Comercial = preview privado; publicar
  pela biblioteca do app ou export limpo.

### 8b. Review de soundtrack (OBRIGATÓRIO antes de entregar corte sonorizado)
- **Cobertura**: `volumedetect` por trecho - áudio vive até o ÚLTIMO frame (cartela
  adicionada depois come a cauda em silêncio)
- **Broadcast**: `ebur128` - Integrated ≈ -14 LUFS (social), true peak ≤ -1 dB
- **Sincronia**: conferir o mapa música×imagem no corte FINAL (os beats mudam de
  timestamp quando a montagem muda)

### 9. Finalização
**Ordem fixa do pós (v3): upscale → grade unificando pelo HERO clip → grão 24fps
compartilhado por cima de tudo** (o grão único esconde variação de textura entre
gerações). Speed-up sutil (~105-115%) como antídoto de movimento flutuante.
Cláusula-guarda: pós conserta TEXTURA, nunca movimento/anatomia - shot deformado
se regenera. Passe de cor (colorbalance nas altas, nunca nos médios em pele),
upscale A/B (Video2X local × `upscale_video`) num shot antes de rodar tudo, export
final para a plataforma. Padrões de master: 1080×1920 + grão fino unificador.
**Cartela**: nunca fonte de sistema nem branco 255 - prova de fontes (OFL/fontsource),
off-white quente, texto renderizado NATIVO na resolução final (PIL), fade do filme
terminando no tom do fundo da cartela. Re-rodar 7b + 8b no produto final.

### 10. Registro (obrigatório antes de encerrar)
- Bíblia atualizada: job IDs, custos reais × preflight, retakes com causa e antídoto
- **Cada lição nova vira cláusula em PRATICAS.md** - retake é o custo de ainda não ter a regra
- **Faxina de arquivos**: supersedidos em `_descartados/`/`05_cortes/`, `06_master/`
  só com entregas vigentes, bíblia apontando caminhos certos, `Downloads\<slug>\`
  reduzido à entrega
- **Escapes do validador**: defeito que o USUÁRIO achou depois de gate APROVADO =
  escape; cada escape vira item de checklist no `validador-gate` + caso dourado em
  `tools/qc/CALIBRACAO.md` (e re-rodar a calibração)
- **Scorecard da produção** (seção obrigatória na bíblia): cr por segundo entregue ·
  retakes por causa · achados BLOQUEIA/AJUSTE por gate · % de gates aprovados de 1ª ·
  escapes · score de retenção (quando medido). Comparar com a produção anterior no
  review point (manter/ajustar/reverter mudanças de processo em DECISOES.md)
- **Promoção ao ESTILO (obrigatória quando há estilo declarado)**: lição
  específica do estilo → changelog do `ESTILO-<slug>.md` (genérica continua indo
  a PRATICAS); custos medidos do filme atualizam os "Custos típicos"; estilo
  `rascunho` gradua para `ativo` no primeiro filme concluído, atualizando o Status
  também em `estilos/README.md`.
- Commit dos docs (mídia fica fora do git; regenerável pelos job IDs)

## Princípios que não se negociam

1. Todo problema resolvível no still (2 cr) não chega ao vídeo (17-52 cr)
2. Preflight sempre; mostrar a conta antes de gastar
3. Julgar shot por strip é produção; revisão é folha de cortes
4. Wow-shot primeiro - se o vídeo não impressiona no protótipo, replaneja antes de produzir
5. Nenhum vídeo é gerado sem storyboard aprovado - papel é grátis, take não é
6. Nenhum material chega a gate do usuário sem o `validador-gate` (olhos frios) -
   e nenhum corte sem os reviews medidos (7b anti-slop/câmera, 8b soundtrack)
7. Brief abstrato tem gate de CONCEITO com 3-5 opções antes do primeiro still -
   o além é outra categoria, o arco termina diferente de onde começou
8. Casting trava no gate de âncoras; linguagem de montagem trava no storyboard -
   pivô tardio = re-shoot, e o usuário decide sabendo o preço
