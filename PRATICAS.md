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

## Processo

- **Bíblia de produção viva desde o primeiro shot:** job IDs (viram `medias` reutilizáveis),
  identidade travada, lições com causa e antídoto, custos medidos. Qualquer sessão futura
  retoma sem re-derivar nada.
- **Cada lição vira cláusula.** As falhas do Ato 1 (2 retakes em 4 shots) viraram regras;
  Cena 2 e o Final saíram 5/5 e 6/6 de primeira. O custo de retake é o custo de ainda
  não ter a regra.
- **Reusar âncoras entre atos.** O macro do olho do Ato 1 é o start do piscar do Ato 3;
  o close do 13-end é o start do zoom-out do 15. Reuso = continuidade grátis.
