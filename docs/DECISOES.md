# Log de decisões do workbench

Registro append-only, mais recente primeiro. Cada entrada: decisão + o PORQUÊ
(o porquê é o que evapora primeiro). Decisões de GERAÇÃO viram cláusula em
`PRATICAS.md`; aqui ficam as decisões de ARQUITETURA e PROCESSO.

Template:
```
## AAAA-MM-DD - <decisão em uma linha>
**Contexto:** <o que forçou a decisão>  **Porquê:** <a razão que vence>
**Alternativa rejeitada:** <o que não fizemos e por quê>
```

## 2026-07-25 - Sem LLM-juiz por cima do validador; lint determinístico + calibração + escapes
**Contexto:** "quem valida o validador?" **Porquê:** sem ground truth, outro LLM é só
mais uma opinião falível (regressão infinita); formato/cobertura são verificáveis por
script (`lint_veredito.sh`), mérito por casos dourados (`CALIBRACAO.md`), e realidade
pelos escapes do usuário - cada camada com o juiz certo.
**Alternativa rejeitada:** agente juiz-do-juiz (custo sem gabarito).

## 2026-07-25 - validador-gate (subagente de olhos frios) antes de TODO gate do usuário
**Contexto:** pedido do usuário ("cada etapa validada antes de chegar a mim") + a
câmera-fantasma provou que quem produz normaliza o próprio erro (regen de 52,5 cr).
**Porquê:** maker-checker real; o gate do usuário vira só decisão criativa.
**Alternativa rejeitada:** migrar o workflow inteiro para subagents - as fases são
corrente sequencial com gates criativos, e o contexto/gosto mora na thread principal.

## 2026-07-25 - Árvore padrão de arquivos por filme; status é PASTA; master sem versão
**Contexto:** alem/ terminou com ~40 arquivos achatados, teste e final indistinguíveis.
**Porquê:** quem abre a pasta decide em segundos; supersedido desce na hora;
`06_master/<SLUG>_MASTER.mp4` é sempre a entrega vigente.

## 2026-07-25 - Reviews medidos obrigatórios (7b anti-slop/câmera, 8b soundtrack)
**Contexto:** slop passou batido (câmera em quadro), música morreu antes do fim,
branco de 0,4s leu como corte. **Porquê:** "medir, não olhar" estendido a câmera
(correlação de fase, tracking por cor) e som (cobertura, ebur128, sincronia por RMS).

## 2026-07-25 - Workflow v2: fase 1.5 Conceito; casting trava nos âncoras; linguagem de montagem trava no storyboard
**Contexto:** ALÉM queimou ~100 cr num mundo conceitualmente errado e refez takes por
2 pivôs tardios (casting, cortes→oner). **Porquê:** conceito abstrato exige 3-5 opções
com teste de categoria/arco ANTES do primeiro still; pivô tardio tem preço explícito.
Validado por backtest de papel: v2 capturaria ~16 de ~20 falhas históricas (~30-35% dos
1.289 cr gastos nos 4 projetos).

## 2026-07-24 - Trilha comercial: preview privado ok; publicar = biblioteca do app ou export limpo
**Contexto:** usuário escolheu faixa Jóhannsson (DG) via YouTube. **Porquê:** queimar
faixa comercial no arquivo publicado = risco de mute/strike; janela musical escolhida
por curva RMS (clímax no beat certo), nunca "do início".

## 2026-07-24 - Filme sem cortes: oner costurado (rota A), emenda dentro do branco
**Contexto:** usuário pediu "shot único"; Seedance limita takes a 15s. **Porquê:**
2 takes emendados DENTRO do clarão branco (técnica 1917/Birdman) dão a experiência de
oner sem apostar tudo numa geração; ele é o conteúdo compartilhado constante.
**Alternativa rejeitada:** oner literal de 15s (filme encolhia e risco de retake de
52,5 por tentativa).

## 2026-07-24 - O usuário é o personagem (identidade VOO); figurino por ambiente
**Contexto:** pivô "usa eu" + "a roupa não condiz com o ambiente". **Porquê:** refs
reais (3 fotos, media_ids na bíblia do VOO) seguram identidade; figurino é decisão de
produção por mundo (suéter vermelho = teatro + praia fria), vermelho segue como farol.

## 2026-07-23 - Conceito por opções: "o além é OUTRA categoria, não mais do mesmo"
**Contexto:** mundo montanha reprovado ("não representa expectativa vs além"); insight
do usuário: montanha maior ainda é montanha. **Porquê:** clímax precisa quebrar de
categoria (terra→ar, palco→amanhecer) e o arco precisa terminar diferente de onde
começou - virou teste formal da fase 1.5.

## 2026-07-23 - Remote + fluxo de git obrigatório: branch → PR → review → merge
**Contexto:** repo era local-only, commits diretos na main. **Porquê:** pedido
explícito do usuário; todo agente futuro herda a regra pelo CLAUDE.md.

## 2026-07-19 - Storyboard é fase obrigatória com gate (custo zero)
**Contexto:** VOO v1 reprovado por estrutura; 4 iterações de papel pegaram 2 problemas
antes de um take de 52,5 cr. **Porquê:** papel é grátis, take não é (princípio 5).

## 2026-07-18 - Repo é workbench permanente; mídia fora do git; voz de VO por vídeo
**Contexto:** fundação. **Porquê:** conhecimento (bíblias, práticas) é o ativo
versionável; mídia é regenerável por job ID; voz travada como padrão empobrece.
