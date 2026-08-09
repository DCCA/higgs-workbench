# ANÁLISE: o que dá para trazer do OpenMontage (2026-08-09)

**Pergunta do usuário:** "our workflow is too slow, and the quality of the final video are not
good. can we learn something from OpenMontage?"

**Resposta curta:** quase nada do que eu propus de início sobreviveu à revisão. O que dá para
trazer é **uma ideia** (oito perguntas de variação no gate de storyboard) e **nada de código** -
e o diagnóstico que motivou a pergunta estava errado nos dois lados.

`OpenMontage` (github.com/calesthio/OpenMontage, **AGPLv3**, projeto do próprio autor) é produção
de vídeo agêntica: `research → proposal → script → scene_plan → assets → edit → compose`, 100+
ferramentas Python, muitos provedores de vídeo/imagem/TTS, fontes de stock, Remotion + HyperFrames,
manifestos YAML, estado com checkpoint. Este workbench é o oposto: um filme por vez, um provedor,
gates humanos, e um corpus de lições pagas.

## Método

Quatro propostas foram escritas e submetidas a **três revisões adversariais independentes**
(Codex, mais dois revisores Opus com lentes diferentes: viabilidade de implementação e ataque ao
diagnóstico), com instrução explícita de refutar. Os revisores rodaram o código e mediram o
repo. O que segue é o resultado, não a proposta.

## O que morreu, e a prova

### P1 - portar `lib/slideshow_risk.py` para o gate de storyboard: MORTO

O revisor **rodou o scorer no nosso filme**:

| entrada | média | veredito |
|---|---|---|
| derivada mecanicamente da bíblia | 2,75 | ACEITÁVEL |
| anotada à mão, honestamente, filme como entregue | **0,83** | **FORTE** |

O filme que o usuário reprovou numa frase pontua **FORTE**, e só a reescrita da prosa move
2,75 → 0,83 sem mudar um frame. Três defeitos estruturais:

- o parâmetro `edit_decisions` é aceito e **nunca lido** - o scorer é incapaz de ver transição,
  que é exatamente sobre o que foi a reprovação;
- o veredito `fail` é **matematicamente inalcançável** para live-action (três dimensões têm piso
  em 0,0, então a média máxima é 3,33 = "revise"); o bloqueio que ele alimenta nunca dispara;
- 9 dos 11 campos que ele lê **não existem** em nenhuma forma no nosso workflow.

### P2 - comprar tier melhor para o shot herói: MORTO

Nove reprovações do usuário em oito filmes (MARÉ ALTA, VOO v1, VOO v2, ALÉM, A CHAVE, evals,
SINAL, CORRENTEZA), classificadas pelas palavras dele: **zero sobre resolução, fidelidade ou
artefato. Nove sobre DIREÇÃO.** Dois desses filmes não tinham tier de geração nenhum (SOL e
SINAL, 100% programáticos) - e um deles foi aprovado. Mais: as 5 iterações do wow-shot falharam
por **competição de cláusulas no prompt**, resolvida estruturalmente por 14 cr no mesmo tier; e o
plano mais mole do filme entregue perdeu **46% do detalhe na minha própria cadeia de crop**, não
no tier.

### P3 - stock como fonte: MORTO

O OpenMontage **não tem código de composição de tela rastreada** (grep por
`perspective|warpPerspective|corner_pin|quad` só devolve exemplo de manim) - nós já temos isso
funcionando, com quads reais. Stock exige `PEXELS_API_KEY`/`PIXABAY_API_KEY` que não existem aqui.
E o provedor Higgsfield deles é um cliente REST com `API_KEY:API_SECRET` num plano pago, cobrando
em **USD**, cujo `_MODEL_COSTS` não inclui `seedance_2_0`. Trocaríamos capacidade que funciona por
capacidade a construir.

### P4 - cristalizar as réguas e adiar o validador: SOBREVIVE A 1/6

Só a **razão pico/ambiente por emenda** é agnóstica de filme. As outras cinco dependem dos quads e
do overlay de texto deste filme. Precedente do que elas viram: `tools/qc/camera_review.py:51`
tem máscara de **suéter vermelho** de um filme antigo e segue reportando centroide de "sujeito"
para filmes sem peça vermelha - um plano leria como "estabilidade nível pro" e o vizinho como
falha de enquadramento, quando o que se moveu foi o site composto escalando 1,45×.

E **adiar o validador para o gate final é pior**, não melhor: os defeitos que ele pega são
semânticos. Adiar teria embarcado o site fatiado no frame do reveal e 1,0s de dither em tela cheia.

## O que sobrevive, e é de graça

**As perguntas do `lib/variation_checker.py`, como PROSA no checklist da fase 4.** Rodado por mim
sobre o corte reprovado, descrito honestamente a partir dos setups travados na bíblia:
**score 4,2, veredito FAIL** (o outro revisor obteve 3,6/revise com campos um pouco diferentes).
Ele nomeia os defeitos pelo nome, ANTES de gastar crédito:

```
Shot size 'medium' used in 5/6 scenes (83%)
5 consecutive same-size shots
6/6 scenes are static or unspecified movement
Hero scene 'beat2' has same shot size as neighbor
```

A terceira linha é o lado B congelado; a quarta é o jump cut WOW→luta. Ressalva honesta: 2 das 7
violações (`lighting_key`, `texture_keywords`) dispararam só porque deixei os campos vazios - 5 de
7 são de verdade. A diferença contra o `slideshow_risk` é que essas 5 saem de **fatos estruturais
que a nossa tabela de SETUP já declara honestamente** (tamanho de plano e movimento de câmera),
não de adjetivos que eu poderia reescrever. E foi **invariante à reescrita** que enganou o outro
scorer, porque pontua violações (padrão = reclamar) em vez de pisar dimensões em zero
(padrão = absolver).

**Licença: `higgs` é MIT, `OpenMontage` é AGPLv3.** Copiar código de lá para cá relicenciaria este
repo. Ideia atravessa; arquivo não. Portanto: prosa no checklist, nunca import.

## O diagnóstico estava errado

Reconstrução do último filme: **20h45m** de elapsed.

| bucket | share |
|---|---|
| espera do gate humano | **~55%** (dominado por UMA espera de 9h42m no gate do LOCK) |
| validador (19 rodadas) | ~34% |
| **geração de mídia** | **~5%, cerca de 1h** |

- "Lento por causa do validador mal escopado" **sobrevive só invertido**: ele consome mais do que
  eu media, mas está **corretamente apontado** - 7 dos 7 BLOQUEIA que ele pegou eram do produtor
  (bookkeeping e geometria de ffmpeg), **zero eram defeito do modelo**. O mal escopado é a MINHA
  saída: 23-26 de 40 achados acionáveis eram prosa minha, e nas duas últimas rodadas 15 de 19,
  com zero BLOQUEIA de mídia.
- "Qualidade ruim por causa do tier barato" está **morto** (ver P2).
- **A causa real é disciplina não imposta.** Seis regras escritas ANTES desta sessão foram
  violadas DENTRO dela, incluindo o contrato de escrita do `estado.json` (violado em 6 rodadas,
  uma com carimbo no futuro) e "blocos de identidade nascem de pixel, nunca de memória" (violado
  39 minutos depois do início, 12 cr, com a bíblia registrando "mesmo com a regra já escrita").

## Teste próprio: a régua de ritmo não é universal

Seis filmes, mesma régua, movimento interno mediano e fração de frames parados:

| filme | veredito do usuário | mediana | parados |
|---|---|---|---|
| SOL (programático) | **aprovado, entregue** | 0,0002 | 76% |
| SINAL (programático) | **reprovado: "slideshow com fade-in"** | 0,0001 | 74% |
| CORRENTEZA corte_v2 (live-action) | **reprovado: "ritmo"** | 0,49 | 11% |
| CORRENTEZA tese (live-action) | **aprovado** | 1,89 | 11% |
| ALÉM (live-action) | aprovado, entregue | 1,70 | 0% |
| A CHAVE | aprovado, entregue | 9,65 | 0% |

**SOL e SINAL são indistinguíveis** - um foi entregue, o outro reprovado como slideshow. Régua de
pixel não separa os dois: o que separa é se o movimento SIGNIFICA algo. Dentro do live-action ela
separa bem. Conclusão: a razão pico/ambiente vale **condicionada ao ESTILO declarado**; como gate
universal ela reprovaria um filme aprovado. E o detector de cortes achou **zero cortes** em dois
masters entregues (grão e transição suave derrotam `scene>0.25`), então a segmentação tem de vir
da lista de edição, não da detecção.

## Plano revisado (não implementado; ~100 linhas de shell e duas edições de doc)

1. `tools/qc/check_registro.sh` rodado ANTES de briefar o validador: frescor do `estado.json`
   contra mtime dos entregues, todo caminho declarado existe, durações conferem com `ffprobe`,
   nenhum número aparecendo duas vezes com valores diferentes.
2. Razão pico/ambiente dentro do `qc_video.sh`, medida no render, com limiar POR ESTILO.
3. **Escrever o gate de IMPACTO na fase 5 do `SKILL.md`.** Ele não está lá: `grep -i impacto` na
   skill e no PRATICAS não devolve nada. Existe como uma frase no `PROJECT_STATUS.md`, decidida
   depois do SINAL, e rodou nesta sessão só porque eu lembrei.
4. Parar de gitignorar os scripts de build por filme.
5. As oito perguntas do `variation_checker` como prosa no checklist da fase 4.

## A terceira revisão (Codex)

Convergiu com as outras duas e acrescentou o lado do que NÃO se troca: não remover o protótipo de
wow-shot nem o gate do corte em movimento, porque **o manifesto cinematográfico do OpenMontage
default-a `edit` e `compose` para sem aprovação humana** - adotar isso repetiria a falha que matou
o SINAL; e não adotar as premissas de licença de stock deles, que servem de proveniência para
B-roll documental e não de liberação para publicidade de produto. Fecha nomeando o que este
workbench tem e o outro não: o LOCK, preflight exato em crédito, redução de risco pelo wow-shot,
folha de cortes, calibração de escapes e o hábito de declarar a cegueira do detector. Veredito
dele sobre a comparação: **o OpenMontage é mais amplo, e não é mais confiável.**
