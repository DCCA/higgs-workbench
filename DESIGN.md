# Design

<!-- impeccable:design 1 -->

Mundo visual do board de workflow (`tools/viz/`): **diagrama de linha de metrô** -
gramática de Beck (diagrama de 1933) + sinalização Vignelli (NYC 1972), aplicada como
sistema de trabalho, não como tema. Escolhido em 01/08/2026 (seed 6cb3d033, direção 6
da lista fundamentada; usuário confirmou na página de decisão). Substitui o mundo
anterior (dashboard dark genérico), que fica como anti-referência.

## A metáfora é o mecanismo

O filme é UMA linha de metrô. Toda decisão visual deriva da gramática real de
sinalização/diagrama de metrô; nada decorativo que não exista nesse mundo:

| Fato do produto | Gramática de metrô |
|---|---|
| Fase | Estação (círculo na linha + bullet numerado colorido) |
| Gate de aprovação | Baldeação (círculo duplo, anel branco) |
| Fase atual (em_andamento) | Posição do trem: halo pulsando + "VOCÊ ESTÁ AQUI" |
| Fase concluída | Trecho percorrido: linha sólida na cor da linha |
| Fase pendente | Trecho em construção: linha em casing vazado (borda clara, miolo escuro) |
| Fase pulada | Estação fechada (X sobre o círculo, label esmaecido) |
| validando / gate_usuario / bloqueada | Chip de status de serviço na estação (roxo / âmbar / vermelho ⚠) |
| Shot (âncora/take) | Ramal ortogonal com canto de diagrama (smoothstep) saindo da estação; cada shot é uma parada do ramal |
| Erro (último evento erro do ref) | Gramática de disrupção: chip vermelho ⚠ + parada vermelha |
| Feed de eventos | Quadro "ATUALIZAÇÕES DE SERVIÇO" (hora tabular + chip + texto) |
| Custo gasto × teto | Régua linear com ticks, na mesma linguagem do diagrama |

## Regras duráveis

- **Chão**: preto de placa de sinalização (near-black, nunca #000 puro); texto branco.
  Tema escuro único (cena física: sala de edição à meia-luz, terminal ao lado).
- **Cor**: 3-4 papéis nomeados. (1) Cor da linha = identidade (azul de linha,
  brilhante o bastante p/ 4.5:1 em texto pequeno sobre preto); (2) vermelho de
  disrupção - o sinal mais alto da página, SEMPRE vence (regra de produto);
  (3) âmbar de aviso (gate do usuário, board congelado); (4) roxo de validação e
  verde de aprovado como cores de chip e de ponto de parada, nunca de campo/fundo.
- **Tipo**: stack Helvetica (`"Helvetica Neue", Helvetica, Arial`) - a voz autêntica
  da sinalização Vignelli; caps com tracking positivo leve para labels de placa;
  numerais tabulares em horas/custos. Sem fonte externa, sem mono como fantasia.
- **Linha**: traço grosso contínuo (a linha é o elemento nº 1 da página); cantos em
  curva de diagrama (smoothstep); segmento ativo com dashes animados (o trem andando).
- **Responsivo (regra de assinatura)**: meia-tela/estreito = linha VERTICAL (mapa de
  bolso); fullscreen/largo = linha HORIZONTAL (strip map de vagão). Mesma gramática,
  eixo trocado - não é reflow acidental, é o mundo se comportando como na vida real.
- **Motion**: um momento autoral - o pulso do trem + os dashes do trecho ativo,
  travados juntos. Sem hover-efeitos espalhados; feed entra com deslize curto.
- **Copy**: linguagem do workbench (fase, gate, BLOQUEIA, retake, cr) sobre a
  gramática de serviço ("VOCÊ ESTÁ AQUI", "ATUALIZAÇÕES DE SERVIÇO"). Erros nomeiam
  o problema e a recuperação.
- **Proibições do mundo**: nada de glow neon, gradiente, glass, card-grid; sombras
  só quando um objeto do mundo as teria (placas são planas). O casing vazado é a
  única "borda grossa" permitida - é gramática de mapa, não decoração.

Tokens exatos (hex, px) são estabelecidos pelo primeiro build em
`tools/viz/index.html` e devem ser lidos de lá; este arquivo guarda as regras.
