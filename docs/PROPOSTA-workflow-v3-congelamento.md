# PROPOSTA: Workflow v3 - congelamento de ativos e a disciplina do still

Data: 2026-08-08. Origem: pedido do usuário ("otimizar o workflow; acho que nosso
maior gap é não congelar ativos, personagens e views") + deep research em 4 frentes
(consistência de personagem, consistência de mundo, realismo, pipelines
profissionais; relatórios com fontes datadas de 2025-2026) + auditoria interna dos
filmes SINAL e CORRENTEZA.

## O diagnóstico (hipótese do usuário, confirmada duas vezes)

**Pela auditoria interna:** na CORRENTEZA, a pessoa A foi congelada POR ACIDENTE
(toda âncora derivada por i2i da anterior) e ficou consistente em 6 âncoras e 4
takes. A pessoa B nunca foi congelada: o beat 6 foi um t2i independente descrito de
memória - outra sala, outro monitor, mulher "parecida". O monitor (em cena em 6 de
7 beats) teve 3 designs. Nenhuma geração levou style key. Nenhum setup de câmera
foi travado.

**Pela pesquisa:** o modo de falha tem nome na literatura - *"most drift comes
from people rewriting character descriptions from memory"* (magichour 2026) - e o
padrão transversal dos 4 relatórios é: **consistência é propriedade do WORKFLOW,
não do modelo. Uma referência canônica por entidade, roteada para todo passo
seguinte; todo problema resolvido no still antes de virar vídeo.**

O pipeline canônico best-in-class (síntese das 4 pesquisas) e seus pontos de
congelamento: script ▮ → look dev ▮ (identidade+mundo) → probe do shot arriscado →
shot plan ▮ → keyframes aprovados ▮ → vídeo (com limites de regen) → selects ▮ →
picture lock ▮ → áudio/grade → master. A economia medida: keyframe-first sai a
~1,25-2 gerações de vídeo por clipe aprovado contra 20-27:1 do prompt-only (caso
Kalshi: 300-400 gerações para 15 clipes).

## As mudanças (mapeadas nas fases da skill /novo-video)

### M1. Fase 3 vira "LOOK DEV + LOCK" - o coração da proposta

Antes de qualquer take, produzir e APROVAR os artefatos de congelamento, que
passam a morar em `02_ancoras/LOCK/` (versionados, com o job ID na bíblia):

| Artefato | Receita (da pesquisa) | Quando é obrigatório |
|---|---|---|
| **Character sheet** por personagem | turnaround corpo inteiro (frente/lado/costas) + 6 ângulos de cabeça + closes de detalhe, fundo branco liso, luz neutra (receita pIXELsHAM abr/2026) | 2+ shots com o personagem |
| **Soul ID** (treino nativo Higgsfield) | ~20 fotos variadas, 1 de corpo inteiro, 3-5 min de treino | personagem recorrente ENTRE filmes |
| **Location master** por locação | wide do set VAZIO; ângulos novos derivados por i2i "same room, new angle" com prompt SÓ de câmera; nunca t2i fresco da mesma sala | 2+ shots na locação |
| **Prop sheet** | objeto recorrente isolado em fundo neutro, multi-ângulo; anexado como ref + passo de *detail restoration* sobre o frame gerado | objeto em 3+ shots (ex.: o monitor da CORRENTEZA) |
| **Style key** | 1 still de estilo + bloco de estilo VERBATIM (lente, grão, paleta, luz) colado em toda geração | todo filme |
| **Bloco de identidade congelado** | texto fixo na bíblia, colado íntegro - NUNCA reescrito de memória | todo personagem |

**Regra de derivação (a que teria salvado o beat 6 da B):** entidade que JÁ existe
no LOCK nunca nasce de t2i - toda imagem nova dela deriva por i2i/referência de um
artefato do LOCK. t2i só para entidade ou câmera inéditas - e o resultado aprovado
ENTRA no LOCK na hora.

**Anchor Frame Method (formalizado; hoje fazemos por instinto):** um still âncora
aprovado e VERSIONADO por personagem-por-locação; todo take deriva DELE, nunca do
take anterior (encadeamento clip→clip degrada). Âncora nova por mudança de cena ou
escala.

O gate desta fase congela CASTING + MUNDO + PROPS + ESTILO (hoje congela só
casting).

### M2. Fase 4 (storyboard) ganha SETUPS de câmera travados

Cobertura como live-action (VP Land ago/2025): **até 5-7 setups fixos por cena,
escritos ANTES de gerar**, variando só enquadramento/ângulo entre eles; cada shot
do storyboard referencia um setup nomeado (`SETUP-A wide`, `SETUP-B médio`...).
Enquadramento que "saiu diferente" deixa de ser racionalizável: ou é um setup do
plano, ou é drift e reprova no still. Nota de calibração: closes e wides são mais
estáveis que low/high angles.

### M3. Fase 6 (produção) - três regras novas

1. **N stills por shot, escolher 1** (2-4 candidatos; SHOT.IS) - a seleção
   acontece no still de 2 cr, não no take de 17,5+.
2. **Aparar cabeça/cauda é PLANEJADO**: gerar 5-10s contando render de ~10s para
   ~6s úteis; coerência degrada >15s. Preflight já orça o descarte.
3. **Batch por personagem/locação, não por ordem de história** + preflight com
   **multiplicador de retake 1,3-1,5x** (números de mercado; hoje orçamos 2x só no
   wow).

Mantidas e agora com respaldo externo: start+end SÓ para mudança pequena de
composição (salto grande = "smeared morphing mess"); física por consequência;
wow-shot EM MOVIMENTO antes de produzir o resto - com a precisão da pesquisa: o
shot de risco é o risco DE MODELO (diálogo, reverse angle, mãos), não o
espetáculo.

### M4. Fase 7 (montagem) - edição concorrente

Montar o corte ENQUANTO produz (achado do *Catacombs*, 3.229 gerações): cada take
aprovado entra imediatamente na timeline e a folha de cortes cresce junto. O QC de
take ganha o scrub 0,25x em **mãos, bordas e texto em tela** (estatisticamente
onde os erros moram) - entra no checklist do validador.

### M5. Fase 8 (áudio) - som deixa de ser opcional

*"Sound design é metade do realismo percebido"* - ambiência + foley NOMEADO
(passos, tecido, água) é o multiplicador de realismo mais barato que existe.
Filme "sem trilha" ainda leva camada de som: ambiência 15-25 dB abaixo do
principal, gerada mais longa que o corte. Mudo só por decisão explícita do
usuário no brief.

### M6. Fase 9 (finalização) - ordem fixa do pós

**Upscale → grade unificando pelo hero clip → grão 24fps compartilhado** (grão por
cima de tudo esconde variação de textura entre gerações). Speed-up sutil
(~105-115%) como antídoto de movimento flutuante. E a cláusula-guarda: **pós
conserta textura, nunca movimento ou anatomia - shot deformado se regenera.**

## O que NÃO muda

Os princípios 1-8 da skill sobrevivem intactos - a pesquisa os confirmou um a um
(still antes do vídeo, preflight, storyboard, wow primeiro, validador). O gate de
IMPACTO segue sendo o usuário vendo movimento (lição do SINAL, agora com respaldo:
todo pipeline pesquisado mantém o "fresh-eyes human gate"). Board, bíblia e QC
medido ficam como estão.

## Custo da proposta (conta honesta)

O LOCK adiciona ~10-20 cr por filme (character sheets + location masters + prop
sheets são stills de 2-4 cr). **O que ele compra não é redução de retake pago -
é qualidade que hoje escapa de graça**: na CORRENTEZA, os 3 retakes pagos (52,5
cr) foram erros de DIREÇÃO, cobertos pela M3 (coreografia de olhar, sujeito-
estátua); o que o LOCK teria evitado são os defeitos que ficaram NO FILME sem
custar crédito - a sala e o monitor trocados da pessoa B e os 3 designs de
monitor no mesmo filme. M1 compra consistência; M3 compra retakes; a economia
de créditos mensurável vem de M3 + N-stills-por-shot, e o scorecard do próximo
filme mede as duas separadamente.

## Aplicação

1. Aprovada a proposta → as mudanças entram em `.claude/skills/novo-video/SKILL.md`
   (fases 3, 4, 6, 7, 8, 9), no checklist do `validador-gate` (scrub 0,25x,
   verificação de derivação-do-LOCK) e como cláusulas novas no `PRATICAS.md`.
2. Próximo filme roda o v3 inteiro; o scorecard da bíblia compara retakes/cr-por-
   segundo contra CORRENTEZA (baseline: 3 retakes, 207,5 cr para ~24s).
3. Os 4 relatórios de pesquisa completos (com todas as fontes) ficam em
   `docs/pesquisa-2026-08/` para consulta.
