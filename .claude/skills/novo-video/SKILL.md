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

## Fases (com gates de aprovação do usuário)

### 1. Brief (1 rodada de perguntas, no máximo)
Formato/plataforma, duração alvo, tem áudio/VO?, **casting** (o usuário? personagem
genérico? sem personagem? - refs de identidade existem no acervo dos projetos), e
**qual é o momento impressionante**. Se o usuário trouxe roteiro, extrair isso dele.
AVISO explícito no brief: casting e linguagem de montagem TRAVAM nos gates - pivô
depois da produção = re-shoot integral (ALÉM: 2 pivôs tardios ≈ 133 cr refeitos).

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
- **Regras de organização (não negociáveis):** status é PASTA - aprovado mora na pasta
  principal, supersedido DESCE para `_descartados/`/`05_cortes/` no instante em que
  perde o posto; `06_master/` contém SÓ a entrega vigente como `<SLUG>_MASTER.mp4`
  (sem versão no nome; a anterior desce versionada); nomes carregam papel+versão
  (`ancora_F2_lago_v2.png`, `take_ONER1_v2.mp4`); QC (strips/folhas/checks) vive em
  `04_qc/`; refs externas (fotos, fontes, áudio-fonte) em `01_refs/`.
  `Downloads\<slug>\` espelha SÓ o gate atual + a entrega, e é limpo no encerramento.
- Preflight de custos com `get_cost: true` - nunca estimar. Mostrar a conta ao usuário
  antes do primeiro crédito gasto.

### 3. Frames-âncora
Gerar com `nano_banana_pro` 2k: identidade do personagem (se houver) + locação-mãe.
Travar identidade POR ESCRITO na bíblia e colar o bloco em todo prompt subsequente.
Todo frame derivado nasce de um âncora via `medias` ("EXACT same scene... ONLY change:").
**Checklist de aceitação POR STILL (antes de mostrar ao usuário):**
- Zoom nas BORDAS: objeto estranho = REJEITAR no still (contamina o take com parallax)
- Logos de marca (a jaqueta TNF volta sozinha), figurino idêntico ao bloco de identidade
- Escala do sujeito legível; cláusula anti-rotação aplicada se paisagem/arquitetura
**GATE: usuário aprova os âncoras antes de qualquer vídeo - e o CASTING trava aqui.**

### 4. Storyboard (custo ZERO, obrigatório antes de qualquer vídeo)
Todo movimento e trajetória validados NO PAPEL antes do primeiro crédito de vídeo:
- Painéis fotográficos reusando os âncoras JÁ PAGOS como beats; beat sem frame ganha
  silhueta/fantasma desenhado (PIL) sobre o frame real
- Cada painel: timecode + legenda com o EVENTO FÍSICO do beat (coreografia, não adjetivo)
- Setas de trajetória NIVELADAS com o movimento real - anotação errada cria o
  mal-entendido que deveria evitar
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
destinos), start só para ação no quadro, anti-rotação em paisagem, objeto-rígido
em máscara/adereço, `declined_preset_id` preventivo em cena escura.
Revisar cada shot por strip de 4 frames ANTES de aprovar (produção, não revisão).

### 7. Montagem e revisão de verdade
- Concat ffmpeg (`-c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -r 24`)
- **Folha de cortes**: último frame × primeiro frame de cada emenda, par a par.
  É onde moram os erros (repetição de quadro, jump cut, pop de luminância).
- Fixes de edição (trim, dissolve 0,25-0,35s, fade) antes de qualquer regen.
- **GATE: usuário assiste o corte** (copiar para a pasta de entrega; ex.: `~/Downloads/<slug>/` - ver SETUP.md).

### 7b. Review anti-slop + linguagem de câmera (OBRIGATÓRIO antes de entregar corte)

Nenhum corte vai ao usuário sem este passe, todo medido (custo zero, ffmpeg + numpy):
- **Anti-slop visual**: folhas de contato 2fps do filme INTEIRO + zoom nas bordas
  (objetos fantasmas têm parallax - crescem; câmera/equipamento em quadro é o pior tell)
- **QC técnico**: YAVG por frame (flicker), `freezedetect` (frames congelados),
  `astats` (clipping de áudio)
- **Câmera se MEDE, não se olha**: correlação de fase frame a frame (wobble/jerk -
  zero picos é o padrão), rastreio do sujeito por cor (disciplina de enquadramento -
  desvio de cx ≲0,02 é nível pro), grade de terços em keyframes (headroom, horizonte)
- **Gramática**: a câmera assenta quando o sujeito para; movimento só motivado
- Achados viram fix de montagem primeiro; regen só se irreparável (e a causa raiz
  vira lição na bíblia)

### 8. Áudio (custo zero primeiro)
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
Passe de cor unificado se preciso (colorbalance nas altas, nunca nos médios em pele),
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
- Commit dos docs (mídia fica fora do git; regenerável pelos job IDs)

## Princípios que não se negociam

1. Todo problema resolvível no still (2 cr) não chega ao vídeo (17-45 cr)
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
