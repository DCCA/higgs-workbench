# Boas práticas - produção de vídeo com IA (Higgsfield MCP)

Destilado do curta MÁSCARAS (26 shots, 2:24, ~695 créditos, 10 retakes no total).
Genérico e reutilizável; o específico de cada filme (job IDs, decupagem) vive na `BIBLIA.md` do projeto.

## Custo e orçamento

- **Preflight sempre, estimativa nunca.** `get_cost: true` responde sem gastar. A estimativa
  de imagem estava errada 40x (chute ~8 cr, real 0,12-2 cr). Os PREÇOS MUDAM NOS DOIS
  SENTIDOS: seedance fast 720p era 3,5 cr/s no A CHAVE, subiu a 4,5 em jul/2026 e
  **voltou a 3,5 cr/s em ago/2026** (medido na CORRENTEZA) - repreflightar por projeto,
  não confiar no número da bíblia antiga nem desta cláusula.
- **Saldo pode cair por OUTRA sessão na mesma conta HF.** Se os créditos somem mais rápido
  que o seu gasto, cheque `transactions` (não só `balance`): pode haver jobs de outro
  projeto/agente na mesma conta. (evals: 4x "Cinematic Studio 3.5" a 80 cr = 320 cr
  alheios drenaram o orçamento no meio da sessão.)
- **Pivô de direção tardio é caro.** Trocar o ângulo/linguagem depois do wow-shot custou
  ~2x o wow (re-derivar âncoras + refazer takes). Fechar câmera/ângulo no gate de
  conceito/storyboard, não depois de já ter take aprovado.
- **Imagem é ~100x mais barata que vídeo.** Errar num still custa 2 cr; errar num vídeo, 17-52.
  Todo problema que puder ser resolvido no still (composição, identidade, continuidade)
  deve ser resolvido ANTES de gerar vídeo.
- **Pipeline fast → upscale.** Prototipar tudo em fast/720p (17,5 cr/5s), aprovar o corte,
  e só então dar upscale no corte final. Regerar 26 shots em 1080p (45 cr/5s) não cabe;
  descartar um take ruim de 17 dói menos que um de 45.
- **Prototipar os shots críticos fora de ordem.** Os dois shots mais arriscados do roteiro
  falharam no primeiro take. Descobrir isso cedo por ~35 cr comprou a informação antes de
  comprometer o resto; descobrir no fim teria custado o replanejamento do final inteiro.
  Precisão da pesquisa 2026: o shot de risco é o risco DE MODELO (diálogo, reverse
  angle, mãos), não o espetáculo.
- **2-4 stills candidatos por shot, escolher 1 (v3).** A seleção acontece no still de
  2 cr, nunca no take - keyframe-first mede ~1,25-2 gerações de vídeo por clipe
  aprovado contra 20-27:1 do prompt-only (dados em `docs/pesquisa-2026-08/04`).
- **Apara de cabeça/cauda é PLANEJADA (v3):** gerar 5-10s contando ~10s → ~6s úteis
  (coerência degrada >15s); o preflight orça o descarte. *Pago por:* a cachoeira v1
  da CORRENTEZA desinflava - o corte aparado era melhor que o take inteiro.
- **Multiplicador de retake 1,3-1,5x em TODOS os shots no preflight (v3)** - não só
  o 2x do wow. Batch por personagem/locação com as mesmas refs do LOCK, não por
  ordem de história.

## Identidade e consistência

- **Todo personagem/objeto recorrente nasce de um frame âncora** e é referenciado via
  `medias` em toda geração seguinte. Descrição textual sozinha não segura identidade.
- **Travar a identidade por escrito** e colar o mesmo bloco em todo prompt
  ("man aged 35, lean angular face, short dark brown hair..."). Referência de imagem +
  descrição repetida, não um ou outro.
- **Variações de idade** (criança/adolescente) saem do rosto adulto como referência +
  "clearly a younger version of the same face". Funciona bem.
- **Design de objeto (máscaras) trava por referência de imagem**, não por descrição.
  Passar o frame onde o objeto aparece bem como segunda ref.
- **Derivar frames irmãos, nunca gerar solto.** End frame de um shot estático = regen do
  start com "EXACT same scene... The ONLY change: X". Gerar o end de forma independente
  muda mesa, parede, luz - e ambiente morfando em shot estático lê como erro.
- **LOCK (workflow v3): congelamento é artefato, não intenção.** Antes de qualquer
  take, `02_ancoras/LOCK/` recebe: character sheet (turnaround + cabeças + closes,
  fundo branco) por personagem em 2+ shots; location master (set VAZIO; ângulos novos
  por i2i "same room, new angle" com prompt só de câmera) por locação em 2+ shots;
  prop sheet (fundo neutro, multi-ângulo) por objeto em 3+ shots; style key + bloco
  de identidade congelado. Fontes: `docs/pesquisa-2026-08/`. *Pago por:* a pessoa B
  da CORRENTEZA - beat 6 re-descrito de memória virou outra sala, outro monitor.
- **Regra de derivação: entidade que existe no LOCK nunca nasce de t2i.** Toda
  imagem nova dela deriva por i2i/`medias` de um artefato do LOCK; t2i só para
  entidade/câmera inéditas, e o aprovado entra no LOCK na hora. É a generalização
  do "derivar frames irmãos" para o filme inteiro.
- **Anchor Frame Method: um still âncora VERSIONADO por personagem-por-locação;
  todo take deriva dele, nunca do take anterior** (encadeamento clip→clip degrada).
  Âncora nova por mudança de cena ou escala. Nome e receita da literatura 2026;
  a CORRENTEZA fez por instinto na pessoa A e funcionou (6 âncoras, 4 takes).
- **Soul ID para personagem recorrente entre filmes**: treino nativo Higgsfield
  (~20 fotos variadas, 1 de corpo inteiro, 3-5 min) - identidade persiste em toda
  geração futura sem re-upload. Nunca usado no workbench até ago/2026; testar no
  próximo filme com personagem.
- **Setups de câmera travados como live-action**: até 5-7 setups fixos por cena,
  nomeados e escritos ANTES de gerar; todo shot referencia um setup. Enquadramento
  fora do plano é drift, não achado feliz. Closes/wides mais estáveis que low/high.

## Movimento de câmera

- **Movimento sem destino não acontece.** "A câmera recua" gera 8s parados (ou o oposto).
  A regra: **start_image + end_image para movimento de câmera ou transformação de estado;
  start só para ação dentro do quadro** (correr, rir, acenar - câmera parada).
- **Outpaint é a fábrica de destinos de dolly.** "Mesmo quadro, mais afastado" com
  consistência perfeita por 2 cr. Serve para dolly-out (end frame) e para plano
  frontal wide (start de push-in).
- **O movimento precisa ser geometricamente possível.** Push-in de "homem de costas" para
  "rosto de frente" é impossível daquela câmera - o modelo preenche o buraco INVENTANDO
  (no caso, um remador num barco). Corte seco no roteiro frequentemente significa
  virada de eixo de 180°: decupar como dois setups, não um movimento.
- **Quando o take erra por geometria impossível ou semântica invertida, a correção é na
  DECUPAGEM, não em adjetivos no prompt.** Exemplo: reflexo divergente em ângulo
  over-the-shoulder vira duplo físico dentro d'água; a solução foi o enquadramento de
  Narciso (câmera a pino), onde a geometria do reflexo é trivial.
- **Tilt/pan interpolado exige conteúdo compartilhado entre start e end.** Quando os dois
  frames não têm um único elemento em comum, o modelo desliza a cena final por cima da
  inicial como cortina/wipe (dois horizontes simultâneos no meio). Antídoto: garantir que
  uma fração do quadro sobreviva ao movimento, ou converter para transformação de estado
  com câmera travada - o mundo muda dentro do mesmo enquadramento (MARÉ ALTA).
- **Start/end em pontos de vista MUITO distantes = "viagem" com meio morto.** Um voo
  rasante com start(sujeito perto) → end(outro sujeito, o 1º ao longe) faz a câmera
  ULTRAPASSAR o sujeito e cruzar segundos de terreno vazio antes do destino aparecer -
  chato, e o payoff só no fim. Antídoto para o beat de REVELAÇÃO: ancorar o end na MESMA
  posição do start e deixar o SUJEITO transformar/erupir no lugar (câmera contida) - o
  payoff fica no quadro o tempo todo. O movimento de câmera de verdade fica nos shots de
  LIGAÇÃO e no PULL-BACK do reveal (que é seguro: recuar revela mais, não deixa buraco).
  (evals: wow rasante v1 ultrapassou → v2 ancorado erupcionou no lugar.)
- **Figura pequena demais não tem orçamento de pixels.** Humano com ~20px vira mancha que
  o modelo não anima com coerência. Plano de despedida: sujeito legível (~1/4 do quadro)
  recuando DENTRO do shot, nunca começando microscópico. E cortar de close para figura
  micro é zoom-out violento na montagem (VOO).
- **Fake-oner (2ª técnica de plano-sequência) [herdada da skill vox - A/B cego
  obrigatório (~35 cr) antes do 1º uso em filme]:** todo clipe começa E termina em
  motion blur pleno (mergulho/whip/queda) - cortes duros entre blocos leem como um
  take contínuo, SEM par start/end e SEM travessia por branco; permite gerar blocos
  em paralelo. Critério do A/B: scene-detect ≤0,25 na emenda + preferência cega.
- **"Não parece um filme" tem resposta estrutural: o plano-sequência.** N gerações
  independentes = N físicas coladas; um take único = um mundo, uma física, zero
  transições ruins. Seedance vai a 15s - um oner de 15s custa o mesmo que 3 shots de 5s
  e elimina a montagem inteira. Câmera onde uma câmera REAL estaria (chão, altura de
  gente), primeiro plano fixo (grama, parapeito) como âncora de mundo único (VOO).
- **Corpo natural se dirige por COREOGRAFIA DE EVENTOS FÍSICOS, não adjetivos.**
  "Loose, natural, instabilities" não muda nada; o que anima é nomear o evento com
  timing: "tronco boiando (sobe, mergulha, sobe), joelhos destravados, um pé cede e
  recupera, cabeça olha a água e volta, peso troca de pé". É a lição da levitação
  (evidência física > conceito) aplicada a movimento (VOO v2).
- **Realismo de evento impossível = linguagem de câmera real + mentira mínima.** Direção
  "dreamlike/serene" é anti-realismo; o que vende é câmera plausível, corpo SOLTO
  (pernas pendendo, instabilidades), vento com força na roupa, e mundo povoado - barcos,
  farol, pássaros são âncoras de escala que provam que o lugar existe (VOO).

## Armadilhas do modelo (e antídotos)

- **Rotação 90° em 9:16.** Cena de paisagem/arquitetura sai deitada na moldura vertical.
  Antídoto: "vertical portrait-orientation, UPRIGHT framing, the HORIZON LINE RUNS
  PERFECTLY HORIZONTAL, buildings stand VERTICAL" + descrever metade superior/inferior.
  Reincide em toda cena externa complexa - a cláusula precisa ser agressiva.
- **Vazamento de rosto através de máscara.** O modelo anima a boca real "através" do
  objeto; máscara rígida vira pintura facial. Antídoto em todo shot máscara+performance:
  "RIGID painted object, the grin is FROZEN and never moves, his real mouth/skin is
  NEVER visible". No still base, pedir "visible thickness, strap visible, shadow gap
  between mask rim and jaw" para o objeto ler como objeto.
- **Semântica invertida em composição de objetos.** "Máscara sobre máscara" virou
  "máscaras erguidas na testa, rosto exposto" - a imagem oposta. Antídoto: posição
  explícita ("covers his face COMPLETELY, absolutely NO skin visible").
- **Interceptação por preset.** O servidor intercepta prompts e devolve recomendação
  de preset SEM submeter o job (parece sucesso, não é). Antídoto: reenviar com
  `declined_preset_id`. **Dispara também em cena CLARA** - um prompt de leitura
  tranquila ao NASCER DO SOL recebeu "IN THE DARK" (CORRENTEZA): a heurística é do
  servidor, não da sua cena; incluir o declined preventivo em qualquer bloco do
  filme, não só nos escuros. A interceptação tem VÁRIOS padrões (IN THE DARK, 3D
  RENDER, FREE FALL...); o id declinado suprime só aquele preset exato.
- **Figurino default de "pessoa no computador à noite" é capuz de hacker.** Sem
  figurino explícito no prompt de casting, 2 de 3 variantes vieram encapuzadas (e
  uma com logo de marca na tela). Travar roupa + "no hood" já no primeiro still
  (CORRENTEZA).
- **End frame de transformação mostra a CAUSA no quadro, não a consequência.**
  "Sala inundada" como destino interpola uma sala parada molhando; "água JORRANDO
  da tela" dá o evento que o take precisa encenar. Variante da lição da evidência
  física, aplicada ao PAR start/end (CORRENTEZA).
- **Olhar é coreografia com proibição explícita.** "Cabeça inclinada para cima E
  encarando a tela" é contraditório - o modelo escolhe um (escolheu o teto). Dirigir
  o olhar como evento ("os olhos seguem a água; NUNCA sobem acima da borda do
  monitor") e proibir o erro por extenso (CORRENTEZA, retake de 35 cr).
- **Sujeito que oclui o herói do plano é ESTÁTUA.** "Ela se inclina uns centímetros
  para ler" virou avanço que cobriu 1/3 da tela - num plano cujo herói é a tela,
  todo movimento do sujeito é ruído. Pedir imobilidade por extenso ("nunca cresce
  no quadro, nunca cobre mais da tela que no primeiro frame") e MEDIR: área visível
  do herói por frame (CORRENTEZA, retake de 17,5 cr).
- **Take entrega ~70% do volume do end frame.** O still é o teto do evento, não a
  média do take - dimensionar o end frame ACIMA do que se quer ver em movimento
  (CORRENTEZA, medido na cachoeira).
- **Mapa de moderação [herdado da skill vox - NÃO verificado por nós; confirmar ou
  remover no 1º encontro real]:** político NOMEADO no prompt de vídeo → job submete
  ok e MORRE na renderização (seedance); rosto reconhecível em close falha no
  seedance mas renderiza no gemini_omni (rotear o bloco); "mushroom cloud" → flag
  nsfw (trocar a imagem, manter a ideia). Nomes são ok no texto de VO.
- **Estado impossível exige a EVIDÊNCIA FÍSICA, não o conceito.** "Ele levita" gera pés
  no chão (o modelo regride pra referência). O que funciona é descrever a prova visual:
  "visible GAP of empty air under the soles, horizon visible THROUGH the gap, soft
  shadow on the grass below" (VOO). Vale para qualquer anti-física.
- **Continuidade de figurino nos derivados.** Frames derivados trocam detalhes silenciosos
  (tênis viraram pés descalços). Conferir roupa/adereços em TODO derivado; corrigir com
  o item explícito no prompt + foto-ref.
- **i2i ANCORA a composição da referência.** Serve para paleta, figurino, remover
  logo/objeto; NÃO obedece mudança de escala ou enquadramento ("herói 1/12" numa cena
  1/6 devolve 1/6). Enquadramento novo = t2i ou crop do frame mais aberto (ALÉM).
- **t2i resiste a figura sub-1/10** (compõe "como fotógrafo"); pedir 1/50 entrega ~1/8.
  Imensidão extra vem de movimento (pull-back) ou crop-mãe, não de adjetivo (ALÉM).
- **Outpaint com o MESMO aspect ratio é no-op** (clampa ao tamanho da fonte). Só expande
  mudando o ratio; "mesmo quadro mais afastado" em ratio igual = wide como mãe + crops.
- **`get_cost` precifica o tier ERRADO se o nome do parâmetro estiver errado** (`quality:
  "fast"` ignorado → preço std). Conferir nomes via `models_explore(action:'get')` antes
  do preflight (ALÉM: 22,5 vs 17,5).
- **Objeto estranho aceito num âncora CONTAMINA o take com parallax** (câmera fantasma
  cresceu a ~35% da borda - irreparável por crop; regen de 52,5). Zoom de bordas em TODO
  âncora ANTES do gate; rejeitar no still de 2 cr.
- **Faux-texto gravado ("mania de assinar") migra de superfície.** IA grava letras/
  cursivas/nameplates em qualquer superfície que "peça" texto - aro de mostrador, FACE de
  engrenagem, placa, caixa, cano - e some de um lugar pra reaparecer em outro no próximo
  gate. Dois antídotos combinados: (1) mude a NATUREZA do objeto text-prone (relógio
  antigo → medidor técnico de aro liso; engrenagem → roda dentada de hub liso em branco);
  (2) cláusula anti-texto ABRANGENTE que LISTA as superfícies, não só o objeto ("no
  letters/numbers/nameplates/cursive on any dial face, bezel, gear, hub, plate, panel,
  pipe or metal surface"). Corrigir por i2i do próprio still preserva a composição (crítico
  quando o still é âncora de um take já aprovado). Zoom por superfície no gate; letra
  legível = BLOQUEIA. (evals: nameplate no aro → na face da engrenagem → 3 regens.)
- **i2i trava o ÂNGULO/altitude de câmera, não só a escala.** Tentar mudar a câmera
  (isométrico alto → voo rasante) referenciando o still-mãe devolve o mesmo ângulo quase
  idêntico. Para mudar a CÂMERA: gerar por t2i (sem `medias`), descrevendo só o estilo +
  o novo ângulo - o modelo re-encena. Para mudar CONTEÚDO mantendo o mundo: o oposto,
  referenciar a mãe. (evals: 4 tentativas i2i falharam antes do t2i acertar.)

## Storyboard antes do take caro (custo zero)

Antes de qualquer geração acima de ~30 cr ou conceito de movimento arriscado:
**storyboard local** para o usuário validar arco, trajetória e física NO PAPEL.

- v1 rápido: PIL/desenho (silhuetas + setas + timecodes) - 5 min, zero créditos
- v2 fotográfico: reusar frames JÁ PAGOS como beats (eles são o storyboard real);
  faltando um beat, silhueta/fantasma desenhado sobre o frame real
- Setas importam: seta inclinada leu como "sobe pro universo" quando a trajetória era
  nivelada - a anotação errada cria o mal-entendido que ela deveria evitar

No VOO, 4 iterações de storyboard por 0 créditos pegaram 2 problemas antes de um take
de 52,5 cr (trajetória mal-entendida; fundo vazio sem graça → mundo povoado por 2 cr).

## Áudio e loudness (medido no entregue)

- **Som não é opcional (v3): sound design é metade do realismo percebido.** Todo
  filme leva no mínimo ambiência + foley NOMEADO (passos, tecido, água); ambiência
  15-25 dB abaixo do principal e mais LONGA que o corte (loop curto tem emenda
  audível). Mudo só por decisão explícita do usuário no brief.

- **Loudness e true peak se medem no ARQUIVO ENTREGUE, nunca no PCM antes do encode.**
  O AAC estoura o true peak em ~1,5 dB sobre o que o `loudnorm` promete. Para fechar
  o alvo social (-14 LUFS, TP ≤ -1 dB), o TP-alvo do loudnorm precisa ser **-3,0**;
  alvos de -1,0 a -2,0 furam o teto depois do encode. Varrer o alvo e medir o entregue
  a cada passo é barato - desistir com uma teoria não medida é caro. *Pago no SOL: o
  master v1 saiu a -15,0 LUFS com uma justificativa que o validador falsificou medindo.*
- **VO se mede antes de gravar.** Texto que não cabe no beat se REESCREVE, nunca se
  acelera. Contraintuitivo e caro de descobrir tarde: `IA` sai soletrado ("i-á") no
  edge-tts e consome MAIS tempo que "inteligência artificial" por extenso.
- **Uma fala nunca atropela a seguinte**: a linha `i` entra em
  `max(início do beat i, fim da linha i-1 + 0,25s)`.
- **O ID da voz muda por baixo.** Vozes saem do catálogo do edge-tts (a
  `pt-BR-ThalitaNeural` sumiu); registrar na bíblia o ID EFETIVAMENTE usado, senão a
  regeneração falha.

## Filme programático (kit de motion)

- **Peso de fonte que a família não tem vira negrito sintético** e engorda o traço ~27%
  em todo número-herói - invisível a olho, medível por traço/corpo. Carregar só os
  pesos que existem e travá-los no tema. *Pago no SOL, gate de âncoras.*
- **Escala de tipo se calibra na resolução final**, não em miniatura: o que parece
  legenda num comp de 300px é ilegível num frame de 1080×1920 - e vice-versa.
- **`scene>0.25` não detecta corte em mundo de fundo chapado.** Num filme de papel, 8
  cortes secos reais devolvem ZERO detecções. Conferir emenda por salto de YAVG e por
  identidade de frame.
- **Salto de YAVG se mede no arquivo ENTREGUE, nunca nos takes.** Takes do Remotion
  saem em faixa CHEIA (`yuvj420p`, `color_range=pc`); o corte H.264 é faixa LIMITADA
  (`yuv420p`, `tv`). Fator exato 219/255 = 0,8588 - um salto de 12,53 nos takes vale
  10,73 no entregue. Mesma regra do loudness, agora para luminância. *Pago no SINAL:
  quase gastei o único xfade do estilo consertando uma emenda que não estourava.*
- **`freezedetect` é cego em mundo de cauda estática** - dispara na tipografia parada
  pós-entrada de cada beat e as janelas fecham exatamente nas fronteiras. NÃO é frame
  repetido: falsificar com `framemd5` (no SINAL, 23 idênticos em 713 = 3,2%). Vale o
  par com o scene-detect: os dois detectores mentem neste tipo de mundo, cada um para
  um lado.
- **`concat` RESETA o timebase da saída** (1/1000000) - normalizar as entradas com
  `settb=AVTB,fps=24` não basta: precisa repetir DEPOIS do concat, senão o xfade
  seguinte recusa a emenda (SINAL/CORRENTEZA).

## Revisão e montagem

- **Strips de frames são controle de produção, não revisão.** 4 frames por shot pegam
  composição e identidade; não pegam ritmo, warping nem os erros de emenda.
- **A revisão de verdade é a folha de cortes:** último frame do shot N × primeiro do N+1,
  par a par. É onde moram os erros reais: repetição de quadro (abre no mesmo frame em que
  outro shot fechou), quase-jump-cut, pop de luminância/cor entre shots derivados do
  mesmo frame.
- **Fixes de edição antes de regen.** Trim, micro-dissolve (0,25-0,35s) e fade resolvem
  metade dos achados de graça. Regen só quando o conteúdo está errado.
- **Emendas exatas entre blocos:** terminar o shot N no mesmo frame âncora que abre o
  N+1 (ex.: mergulho termina na imagem ÁGUA, submersão começa nela) - a emenda entre
  atos sai perfeita sem pós.
- **Correção de cor em vez de regen** quando só a paleta desvia (ex.: outpaint puxou o
  céu pro rosa): `colorbalance` nas altas luzes preserva pele; mexer nos médios esfria
  o rosto. Validar contra um frame-alvo do shot vizinho.
- **Duração mínima do modelo ≠ duração do beat.** Seedance não gera menos de 4s; beats
  de 2s (um piscar) geram em 4 e aparam na montagem, com fade se o estado final importa.
- **Medir, não olhar, quando dá:** `signalstats YAVG` para confirmar preto de vídeo,
  `ffprobe` para durações.
- **Scrub 0,25x em mãos, bordas e texto em tela (v3)** - estatisticamente onde os
  erros de geração moram; frame a frame nos segundos de contato físico.
- **Edição concorrente (v3): o corte começa no primeiro take aprovado** e cresce com
  a produção - a timeline é o instrumento de continuidade e a espera de render vira
  revisão (achado do *Catacombs*, 3.229 gerações).
- **Ordem fixa do pós (v3): upscale → grade pelo HERO clip → grão 24fps
  compartilhado** por cima de tudo (grão único esconde variação de textura entre
  gerações); speed-up sutil ~105-115% contra movimento flutuante. Cláusula-guarda:
  pós conserta TEXTURA, nunca movimento/anatomia - shot deformado se regenera.
- **Review anti-slop obrigatório antes de entregar corte** (ALÉM): folhas de contato
  2fps do filme inteiro + zoom nas bordas. Objeto fantasma em âncora tem PARALLAX -
  cresce até ~35% da borda no take e fica irreparável por crop; rejeitar no still
  (2 cr) o que custaria regen (52,5). QC junto: YAVG/frame (flicker), freezedetect,
  astats (clipping).
- **Linguagem de câmera se MEDE**: correlação de fase frame a frame (jerk/wobble -
  zero picos é o padrão pro), rastreio do sujeito por cor (desvio de cx ≲0,02 =
  enquadramento disciplinado), grade de terços (headroom/horizonte). A câmera deve
  ASSENTAR quando o sujeito para - movimento só motivado (ALÉM).
- **Travessia por branco precisa DURAR (~1s+)**: saída lenta + branco puro + entrada
  lenta. Branco de 0,4s lê como flash de corte mesmo sem corte existir (ALÉM).
- **Detector de cena é a régua de corte**: `select='gt(scene,0.25)'` = corte duro;
  whip-pan legítimo dispara só no threshold sensível (0,12) - é gramática de oner,
  não defeito (ALÉM).
- **Ilustração que "se constrói" (efeito GoT-title)**: seedance start(esboço/blueprint
  fraco)→end(arte cheia) faz a gravura se desenhar sozinha na tela. Sensação de "voar
  por cima": câmera aérea forte no prompt (fly-over/crane), NÃO push-in - push lê como
  estático. Filme-viagem = flyover contínuo, assenta só no reveal final (A CHAVE).
- **Reveal/pull-back amplo alucina conteúdo nas bordas novas**: seedance inventou um
  mapa-múndi com place-names ao abrir. Controlar com END FRAME desenhado (wide limpo)
  + negativo anti-mapa/continente/place-name. Reveal precisa de destino, não de
  "câmera abre e a IA preenche" (A CHAVE).
- **Motion-graphics/notícia = arte IA + texto OVERLAY**: geração por IA embola texto;
  gerar a arte SEM texto e cravar todo super/timeline/cartela como overlay PIL nítido.
  Vale para explainer, colagem editorial, mapa gravado.
- **Site/UI real em tela gerada: captura + warp de perspectiva + máscara POR FRAME.**
  Gerar o plano com a tela EM BRANCO (câmera travada, conferida por
  `camera_review.py` a 0,00 px/f), capturar o site de verdade (chromium headless 2x)
  e compor com warp fixo. Se existe oclusor móvel (cabeça, mão), overlay estático
  pinta POR CIMA dele - a máscara nasce dos pixels claros da tela em CADA frame
  (lum/sat threshold dentro do quad). E o teste de estabilidade tem que poder
  FALHAR: medir a área coberta contra o oclusor, não um recorte fixo contra si
  mesmo (CORRENTEZA, beat 6 refeito por isso).
- **zsh come `$F:t...` em heredoc**: `fontfile=$F:textfile=` expande como `${F:t}`
  (modificador basename do zsh) e o caminho da fonte some em silêncio - o drawtext
  falha com erro que aponta para o textfile. Sempre `${F}` com chaves em filtros
  ffmpeg gerados por heredoc (CORRENTEZA, 3 rodadas de debug).
- **`nano_banana` insere texto sozinho** quando o conceito sugere rótulo ("gabarito",
  "answer key", mapa) - o NEGATIVE não basta; limpar por i2i explícito "BLANK/textless".
- **Interceptação de preset no gemini_omni tb** ("3D RENDER" em colagem); mesmo
  antídoto `declined_preset_id`. Job de imagem pode TRAVAR ~5min - re-submeter.
- **Review de SOUNDTRACK é obrigatório**: cobertura (`volumedetect` por trecho - áudio
  vive até o último frame; cartela muda a duração e come a cauda), loudness broadcast
  (`ebur128`: I≈-14 LUFS social, TP≤-1), e sincronia música×imagem MAPEADA (RMS/s da
  faixa × timeline: clímax no beat certo, recuo na quietude) - alinhar por medição,
  não por ouvido (ALÉM: clímax da faixa cravado na travessia do branco).
- **Cartela final nunca em fonte de sistema nem branco 255**: prova de fontes com
  intenção (OFL via fontsource), off-white quente (#F7F2E8 papel), texto renderizado
  NATIVO na resolução final (PIL), fade do filme terminando no MESMO tom do fundo (ALÉM).
- **Trilha comercial**: extrair para preview é ok; publicar exige faixa via biblioteca
  do app OU export limpo. Janela da música escolhida por curva RMS, nunca do início.
- **TTS: pontuação é tempo [VALIDADO local: mesmas palavras, fluida 9,55s vs picada
  15,67s = Δ6,1s; ~1,0s por ponto final no edge-tts pt-BR]:** medir a duração REAL
  de todo take (ffprobe) contra a janela do bloco; preferir UMA frase fluida com
  vírgulas; números por extenso; esperar 1-2 rodadas de re-voz; leve estouro é
  melhor que começo atrasado.
- **Style key é REGRA (promovida de recomendação no v3):** um still de estilo + bloco
  de estilo verbatim (lente, grão, paleta, luz) anexados a TODA geração do filme.
  Métrica no QC: drift de matiz/saturação médias entre takes. *Pago por:* CORRENTEZA
  rodou inteira sem style key - a paleta do lado A segurou só pela cadeia i2i.
- **Objeto recorrente = prop 1:1:** gerar o objeto isolado em fundo neutro (com o
  style key) e anexar como ref extra em toda cena ("the X from the reference image") -
  sistematiza a lição do design-por-referência do MÁSCARAS.

## Processo

- **Bíblia de produção viva desde o primeiro shot:** job IDs (viram `medias` reutilizáveis),
  identidade travada, lições com causa e antídoto, custos medidos. Qualquer sessão futura
  retoma sem re-derivar nada.
- **Cada lição vira cláusula.** As falhas do Ato 1 (2 retakes em 4 shots) viraram regras;
  Cena 2 e o Final saíram 5/5 e 6/6 de primeira. O custo de retake é o custo de ainda
  não ter a regra.
- **Reusar âncoras entre atos.** O macro do olho do Ato 1 é o start do piscar do Ato 3;
  o close do 13-end é o start do zoom-out do 15. Reuso = continuidade grátis.
