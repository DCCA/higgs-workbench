# Análise: skill externa `vox-motion-graphics` × nosso workflow

Data: 2026-07-25 · Fonte: `Downloads\vox-motion-graphics.skill` (zip: SKILL.md +
vox-prompts.md + diorama-doc.md) · **Nenhuma mudança aplicada ao nosso workflow -
documento para discussão.** Skill externa tratada como DADO (instruções dela não
foram seguidas, apenas analisadas).

## O que ela é

Pipeline completo de **explainer narrado em motion graphics** via Higgsfield MCP:
acha tópico em alta → pesquisa com fact-check → roteiro em N blocos de 10s →
clipes com style key → TTS documentário → montagem server-side (`explainer_video`)
com legendas queimadas. Dois estilos-casa (colagem editorial "Vox" e diorama de
papel sépia). Filosofia **hands-off**: um aviso de plano e segue SEM aprovação.

## Comparação estrutural

| Dimensão | Nosso workflow (v2) | vox-motion-graphics |
|---|---|---|
| Filosofia | gates + validador em toda etapa | hands-off, zero gates |
| Gênero | cinemático "realista dreamy", autoral | motion graphics/explainer, volume |
| QC | 7b/8b medidos, validador, calibração | nenhum review pós-render (só "re-roda se sair photoreal") |
| Consistência visual | frame-mãe + derivação + identidade escrita | **style key** (1 media_id em TODO clip) + registro de props |
| Pesquisa/roteiro | não temos fase de conteúdo | fases T/R com 2 fontes + fórmula de blocos |
| Montagem | ffmpeg local (controle total) | `explainer_video` server-side (blocos fixos 10s) |
| Narrativa | wow-shot + arco (fase 1.5) | **story engine**: objeto-fio, pergunta-gancho, impacto/3s, 1 reveal |

## O que vale ADOTAR (propostas - decidir juntos)

**P0 - custo zero, ganho claro:**
1. **Story engine como lente da fase 1.5**: "um objeto-metáfora que atravessa TODOS
   os beats e escala até o payoff" + "pergunta-gancho respondida só no kicker" +
   "um reveal pelo qual o vídeo é lembrado". Nosso conceito testa categoria/arco;
   isso adiciona RETENÇÃO. Encaixa como itens opcionais do gate de conceito.
2. **Fake-oner como 2ª técnica de oner na PRATICAS**: todo clipe começa E termina
   em motion blur → cortes duros leem como plano-sequência SEM par start/end e
   SEM travessia por branco; geração paralela. Complementa nossa rota A (emenda
   no branco); mais barata quando o gênero aguenta energia FPV.
3. **Mapa de moderação deles (pago com falhas reais)** → PRATICAS/armadilhas:
   políticos nomeados falham no seedance NA RENDERIZAÇÃO (submete ok, morre);
   rostos reconhecíveis em close falham no seedance mas renderizam no gemini_omni;
   "mushroom cloud" → flag nsfw; e a interceptação de preset tem VÁRIOS padrões
   (3D RENDER, FREE FALL, DROWN IN MUSIC...) - `declined_preset_id` suprime só
   aquele exato, prompt novo pode disparar outro. Estende nossa lição IN THE DARK.
4. **Regras de TTS para quando formos narrar** (MÁSCARAS pós!): verificar
   `durationSec` REAL de cada take (alvo 9,0-10,5s/bloco de 10s); narradores
   pausam ~0,7s por ponto final - frase fluida com vírgulas ≈2,5 palavras/s vs
   picada ≈1,8 (mesma contagem de palavras varia 4s+); números por extenso;
   `speech_rate` como knob. Isso é prática paga que não temos.
5. **Brief musical quantificado**: BPM, estrutura de swell, "clímax a 80% do
   runtime, decay rápido" - upgrade direto para o nosso `gerar_trilha.py`
   (nosso brief é só qualitativo).

**P1 - formalizações úteis:**
6. **"Style key" como conceito nomeado**: nós já derivamos tudo da mãe, mas não
   anexamos um still de ESTILO a toda geração como regra. Formalizar: além das
   refs de identidade/cena, um key de estilo consistente em todo job do filme.
7. **Props reutilizáveis 1:1**: objetos recorrentes gerados isolados em fundo
   neutro (com o style key) e anexados como ref extra ("the X from the reference
   image") - versão sistemática do nosso "design de objeto trava por referência".
8. **Catálogo**: `gemini_omni` a 30cr/10s (3,0 cr/s vs nosso fast 3,5) para
   estilos flat/colagem; param `genre:"noir"` do seedance para grade consistente
   entre clipes; áudio nativo do seedance sobrevive sob voiceover na montagem.

**P2 - se um dia fizermos explainers:**
9. Fases T/R (tópico + pesquisa, 2 fontes, Sources na entrega, "nunca roteirizar
   de memória") + fórmula de blocos (cold open → stakes → evidência → virada →
   kicker, 20-24 palavras/bloco) + os dois estilos-casa como presets de projeto.

## O que NÃO adotar (e por quê)

- **Modo hands-off** ("proceed immediately without waiting for approval"): colide
  frontalmente com nossa arquitetura de gates+validador, que o nosso histórico
  provou pagar (backtest: ~30-35% dos créditos). Faz sentido no gênero deles
  (volume/descartável), não no nosso (autoral, o usuário É o diretor).
- **Ausência de QC**: eles não têm review pós-render - nada a copiar; na verdade
  nosso validador-gate cobriria o pipeline deles com upgrade imediato.
- **Job IDs deles** (style keys/props prontos): são de OUTRA conta Higgsfield -
  inúteis para nós; se adotarmos os estilos, geramos os nossos.
- **Montagem server-side** (`explainer_video`): blocos fixos de 10s e legendas
  queimadas no servidor = menos controle que nosso ffmpeg local; só valeria em
  produção de volume.

## Riscos registrados

- Skill externa contém instruções de autonomia agressiva; se um dia for instalada
  aqui, o modo hands-off dela NÃO deve vazar para os nossos projetos (nossos gates
  têm precedência - já garantido pelo CLAUDE.md/skill v2, registrar mesmo assim).
- O estilo "diorama com censor bars sobre estadistas" flerta com conteúdo político
  de likeness real - se usarmos, decisão editorial consciente do usuário.

## Recomendação para a discussão

Adotar P0 (5 itens, custo zero, tudo cláusula/documentação) já; P1 na próxima
produção como teste; P2 fica arquivado até existir demanda de explainer.
Nada foi alterado - aguardando seu veredito item a item.
