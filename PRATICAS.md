# Boas práticas - produção de vídeo com IA (Higgsfield MCP)

Destilado do curta MÁSCARAS (26 shots, 2:24, ~695 créditos, 10 retakes no total).
Genérico e reutilizável; o específico do filme (job IDs, decupagem) está em `mascaras/BIBLIA.md`.

## Custo e orçamento

- **Preflight sempre, estimativa nunca.** `get_cost: true` responde sem gastar. A estimativa
  de imagem estava errada 40x (chute ~8 cr, real 0,12-2 cr).
- **Imagem é ~100x mais barata que vídeo.** Errar num still custa 2 cr; errar num vídeo, 17-45.
  Todo problema que puder ser resolvido no still (composição, identidade, continuidade)
  deve ser resolvido ANTES de gerar vídeo.
- **Pipeline fast → upscale.** Prototipar tudo em fast/720p (17,5 cr/5s), aprovar o corte,
  e só então dar upscale no corte final. Regerar 26 shots em 1080p (45 cr/5s) não cabe;
  descartar um take ruim de 17 dói menos que um de 45.
- **Prototipar os shots críticos fora de ordem.** Os dois shots mais arriscados do roteiro
  falharam no primeiro take. Descobrir isso cedo por ~35 cr comprou a informação antes de
  comprometer o resto; descobrir no fim teria custado o replanejamento do final inteiro.

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
- **Figura pequena demais não tem orçamento de pixels.** Humano com ~20px vira mancha que
  o modelo não anima com coerência. Plano de despedida: sujeito legível (~1/4 do quadro)
  recuando DENTRO do shot, nunca começando microscópico. E cortar de close para figura
  micro é zoom-out violento na montagem (VOO).
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
- **Interceptação por preset.** O servidor intercepta prompts de cena escura/fria e
  devolve recomendação de preset SEM submeter o job (parece sucesso, não é). Antídoto:
  reenviar com `declined_preset_id`. Em bloco de cenas escuras, incluir preventivamente.
- **Estado impossível exige a EVIDÊNCIA FÍSICA, não o conceito.** "Ele levita" gera pés
  no chão (o modelo regride pra referência). O que funciona é descrever a prova visual:
  "visible GAP of empty air under the soles, horizon visible THROUGH the gap, soft
  shadow on the grass below" (VOO). Vale para qualquer anti-física.
- **Continuidade de figurino nos derivados.** Frames derivados trocam detalhes silenciosos
  (tênis viraram pés descalços). Conferir roupa/adereços em TODO derivado; corrigir com
  o item explícito no prompt + foto-ref.

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

## Processo

- **Bíblia de produção viva desde o primeiro shot:** job IDs (viram `medias` reutilizáveis),
  identidade travada, lições com causa e antídoto, custos medidos. Qualquer sessão futura
  retoma sem re-derivar nada.
- **Cada lição vira cláusula.** As falhas do Ato 1 (2 retakes em 4 shots) viraram regras;
  Cena 2 e o Final saíram 5/5 e 6/6 de primeira. O custo de retake é o custo de ainda
  não ter a regra.
- **Reusar âncoras entre atos.** O macro do olho do Ato 1 é o start do piscar do Ato 3;
  o close do 13-end é o start do zoom-out do 15. Reuso = continuidade grátis.
