# Plano de adoção: itens da análise vox-motion-graphics

Data: 2026-07-25 · Status: **PROPOSTA - nada aplicado** · Regra de ouro: toda
mudança entra PRÉ-REGISTRADA (métrica + critério de aceite definidos ANTES de
medir) e REVERSÍVEL (cláusula própria, PR próprio - reverter = 1 PR).

## Framework de validação (como saber se melhorou DE VERDADE)

1. **Baseline = ALÉM** (tudo já medido na bíblia): 333 cr totais · 0 retakes de
   vídeo pós-v2 · achados do validador por gate · jerk/enquadramento/LUFS do
   master. Complemento a coletar (1 chamada, custo a preflight): rodar o
   `virality_predictor` do Higgsfield no `ALEM_MASTER.mp4` → baseline objetivo
   de hook/retenção.
2. **Scorecard por produção** (nova seção padrão na bíblia, preenchida na fase 10):
   cr por segundo entregue · retakes por causa · achados BLOQUEIA/AJUSTE por
   gate · % de gates aprovados de 1ª · escapes · score do virality_predictor.
   Produção N compara com N-1.
3. **Julgamento de gosto = A/B CEGO** com o usuário (dois arquivos sem rótulo,
   ele escolhe; nunca "qual você prefere, o novo ou o velho?").
4. **Honestidade estatística**: N=1 por produção, gêneros diferentes confundem.
   Mitigação: métricas POR TAKE (mais amostras), decisão por "sinal + custo de
   manter ≈ 0", nunca claim causal forte.
5. **Review point obrigatório**: ao fim da próxima produção, sessão de veredito
   item a item: MANTER / AJUSTAR / REVERTER (registrado em DECISOES.md).

## As mudanças propostas

| # | Mudança | Onde | Por quê (evidência) | Ganho esperado | Validação (método → critério de aceite) | Custo validação |
|---|---|---|---|---|---|---|
| 1 | **Story engine** (objeto-fio que escala, pergunta-gancho respondida no fim, 1 reveal memorável) como itens do gate de conceito | skill fase 1.5 | nossa 1.5 testa significado, não retenção; é a engenharia que separa "bonito" de "assistido até o fim" | retenção; vídeos lembráveis | `virality_predictor` no baseline ALÉM vs próximo filme feito com a lente → hook/retenção ≥ baseline; + retenção real do Reels se publicar | ~0 (preflight da tool) |
| 2 | **Fake-oner** (clipes começam/terminam em motion blur; cortes duros leem como oner) como 2ª técnica de plano-sequência | PRATICAS | mecanismo plausível, mas é claim DELES - não verificado por nós | oners paralelos sem par start/end nem travessia; -1 dependência | A/B pago SOB DEMANDA quando um projeto pedir: mesma emenda 2× (fake-oner vs corte seco) → scene-detect ≤0,25 na emenda E usuário cego prefere/empata | ~35 cr, só quando houver projeto |
| 3 | **Mapa de moderação** (políticos nomeados morrem no render seedance; likeness em close → gemini; mushroom cloud → nsfw; interceptação tem N presets) | PRATICAS/armadilhas | falhas pagas por eles; nosso IN THE DARK confirma o padrão da plataforma | zero créditos queimados nessas categorias | marcar como "herdado, não verificado"; critério: 1º encontro real em produção confirma ou remove a cláusula; contador de falhas de moderação esperado = 0 | 0 |
| 4 | **Regras de TTS** (medir durationSec real; frase fluida vs picada varia 4s+; números por extenso; alvo 9-10,5s/bloco) | PRATICAS + fase 8 | claim deles TESTÁVEL DE GRAÇA no nosso edge-tts local | VO do MÁSCARAS sem rounds de desync | **validar ANTES de adotar**: gerar no edge-tts a mesma linha em versão fluida vs picada, medir com ffprobe → se Δ≥2s, claim confirmado, cláusula entra | 0 (local) |
| 5 | **Brief musical quantificado** (BPM, swells, clímax a X% do runtime, decay) | FERRAMENTAS + fase 8 | nosso brief é qualitativo; o deles é partitura | trilhas locais mais dirigidas | A/B cego: mesma cena, trilha com brief qualitativo vs quantificado no Stable Audio local → usuário escolhe às cegas | 0 (GPU local) |
| 6 | **Style key formal** (still de estilo anexado a TODA geração, além das refs de cena/identidade) | PRATICAS (recomendação, não obrigação) | nós derivamos da mãe, mas não anexamos chave de ESTILO sistematicamente | menos drift de paleta entre takes | métrica nova no QC: Δ de matiz/saturação médias entre takes do mesmo filme (ffmpeg signalstats/hue) → próximo filme ≤ drift do ALÉM | 0 (medição) |
| 7 | **Props 1:1 reutilizáveis** (objeto recorrente gerado isolado em fundo neutro, anexado como ref extra) | PRATICAS | sistematiza nossa lição "design de objeto trava por referência" (MÁSCARAS) | menos morfose de objeto | quando houver projeto com objeto recorrente: retakes por morfose = 0 (baseline MÁSCARAS teve retakes disso) | 2-4 cr/prop, sob demanda |
| 8 | **Catálogo** (gemini_omni 3,0 cr/s p/ estilos flat; `genre` p/ grade consistente; áudio nativo seedance sob VO) | FERRAMENTAS | conhecimento de catálogo que não tínhamos | -14% custo/s em gênero flat; grade coerente | na adoção: `models_explore` + `get_cost` na NOSSA conta confirmam existência/preço; uso real só quando o gênero pedir | 0 |

**Fora do plano (rejeitados na análise):** modo hands-off, montagem server-side,
job IDs deles. **P2** (fases de pesquisa/fórmula de blocos p/ explainers) fica
arquivado na análise até existir demanda.

## Sequência de execução (se aprovado)

1. **Rodada de validação grátis (antes de qualquer cláusula):** teste TTS (#4),
   A/B de trilha (#5), preflight do virality_predictor + baseline no ALÉM (#1),
   models_explore/get_cost do gemini_omni (#8). Resultado decide o texto final
   das cláusulas - ou derruba o item.
2. **PR único de adoção** com o que sobreviver: cláusulas em PRATICAS/FERRAMENTAS,
   lente de retenção na fase 1.5, scorecard na skill (fase 10) e checklist do
   validador ganhando os itens novos (com re-calibração obrigatória).
3. **Próxima produção roda com tudo** e preenche o scorecard.
4. **Review point**: veredito item a item em DECISOES.md (manter/ajustar/reverter).

## Custo total do plano

Validação: **0 créditos** (tudo local/preflight), exceto #2 (~35 cr, opcional e
só quando um projeto pedir a técnica). Adoção: 0 créditos (docs). Risco máximo:
reverter 1 PR.
