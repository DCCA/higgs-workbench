# Status do workbench

Logbook por sessão, mais recente primeiro. Detalhe por projeto nas bíblias
(`mascaras/BIBLIA.md`, `mare-alta/BIBLIA.md`).

## 2026-07-19 (continuação) - VOO v2 corpo vivo; storyboard vira fase padrão

**Where we were:** VOO_final entregue, mas usuário reprovou a rigidez do corpo no take.

**What we did:**
- Investigado `motion_control` (Kling 3.0): 3 falhas GRATUITAS que mapearam a ferramenta -
  não detecta personagem de costas, exige doador limpo, e não suporta pose de bruços
  (`d1288e8`, `60fc281`). Acervo livre de voo solo esgotado sem doador viável.
- Caminho vencedor: prompt como COREOGRAFIA DE EVENTOS FÍSICOS (não adjetivos) - teste
  no deslize (17,5 cr) provou; take único v2 (52,5 cr) aprovado pelo usuário.
- **VOO_final_v2.mp4 entregue** (15s, corpo vivo, trilha C) em Downloads\voo\ (`13c0d96`)
- Lição promovida a PRATICAS.md: coreografia de eventos físicos > adjetivos de movimento
- A pedido do usuário: **storyboard virou fase 4 obrigatória com gate no /novo-video**
  + 5º princípio: "nenhum vídeo é gerado sem storyboard aprovado" (`3d71cd4`)

**Decisions:** rigidez de corpo se resolve por coreografia nomeada com timing, não por
motion transfer (limite de pose da ferramenta) nem adjetivos; storyboard é etapa padrão.

**Pending / next:**
- [ ] Usuário: rotacionar o token HF (ainda aberto)
- [ ] MÁSCARAS pós: voz, trilha, cor, cartela, upscale A/B
- [ ] MARÉ ALTA pausado (conversa de conceito antes de retomar)
- [ ] Opcional: upscale VOO_final_v2 para 2K; remote do repo
- Custo VOO total: ~216 cr. Créditos: ~1.418 restantes

## 2026-07-19 - VOO completo (1º vídeo do usuário voando) + Stable Audio local

**Where we were:** MARÉ ALTA pausado; workbench com práticas/skill; usuário queria
vídeo de si mesmo voando.

**What we did:**
- VOO v1 (4 shots): produzido e REPROVADO por realismo - diagnóstico estrutural
  (físicas independentes, ângulo impossível, cortes secos)
- Pivô: storyboard local custo zero (4 iterações, PIL + frames pagos) → take único
  15s câmera fixa, mundo povoado (farol/barcos/gaivotas) → APROVADO
- Trilha: Stable Audio Open 1.0 local na RTX 3070 (setup em tools/stable-audio,
  gerador reutilizável gerar_trilha.py) - 3 variações, custo zero
- Fotos do usuário como identidade one-off (3 refs via media_upload)
- Entregas: VOO_final.mp4 (trilha C) + 2 alternativas de trilha em Downloads\voo\
- Lições novas promovidas a PRATICAS.md: tilt sem conteúdo compartilhado, orçamento
  de pixels, plano-sequência estrutural, realismo por câmera real, evidência física
  p/ anti-física, continuidade de figurino, storyboard-antes-do-take

**Decisions:** realismo passa por câmera plausível + corpo solto + mentira mínima;
storyboard local vira etapa padrão antes de takes >30 cr; trilha local no workbench
(HF token do usuário deve ser ROTACIONADO - passou pela conversa).

**Pending / next:**
- [ ] Usuário: rotacionar o token HF (read-only, exposto no chat)
- [ ] MÁSCARAS pós: voz (3 mp3), trilha, cor, cartela, upscale A/B
- [ ] MARÉ ALTA pausado (rever conceito do wow-shot antes de retomar)
- [ ] Opcional: upscale do VOO_final para 2K; remote do repo
- Créditos: ~1.435 restantes

## 2026-07-18 - Fundação do workbench, MÁSCARAS completo, MARÉ ALTA iniciado

**Where we were:** diretório vazio, Higgsfield MCP sem configurar, nenhum processo.

**What we did:**
- Higgsfield MCP configurado (escopo user, OAuth) e validado ponta a ponta.
- **MÁSCARAS** (curta 2:24, 26 shots): corte 2 de imagem FINAL - produção completa,
  revisão por folha de cortes e os 7 ajustes aplicados (`MASCARAS_corte2.mp4` no
  projeto e em `Downloads\mascaras\`). ~695 créditos. Detalhe: `mascaras/BIBLIA.md`.
- Workbench fundado como repo git: `PRATICAS.md` (`641006b`), `FERRAMENTAS.md`
  (`fbf25da`), skill `/novo-video` (`324eacf`), regra voz-por-vídeo (`adac787`).
- VO do MÁSCARAS: 3 candidatas edge-tts geradas (custo zero) em `Downloads\mascaras\vo\`.
- **MARÉ ALTA** (~15s, 4 shots, estreia do `/novo-video`): âncoras aprovados no gate,
  wow-shot v1 (tilt) reprovado pelo usuário, v2 (maré-sobe) renderizado aguardando
  veredito (`Downloads\mare-alta\S2_wow_v2.mp4`). 45 de ~103 cr do teto. (`07bd792`)

**Decisions:**
- Repo é o workbench permanente de vídeo; mídia fora do git (regenerável por job ID),
  só docs versionados.
- Voz de VO escolhida POR VÍDEO, nunca padrão do workbench.
- MÁSCARAS: protagonista do Ato 1 mantido sobre a REF-A da decupagem (aproveitou 23s prontos).
- Wow-shot do MARÉ ALTA convertido de tilt para transformação de estado - lição nova:
  movimento de câmera interpolado exige conteúdo compartilhado entre start e end frame,
  senão vira "cortina" (registrada em `mare-alta/BIBLIA.md`).

**Pending / next:**
- [ ] MARÉ ALTA **PAUSADO pelo usuário (2026-07-18)**: wow-shot v1 (tilt) E v2
      (maré-sobe) reprovados; usuário pediu para parar de gerar. Antes de retomar,
      rever o conceito do wow-shot com ele - não gerar de novo sem direção nova.
- [ ] Promover a lição do tilt para `PRATICAS.md` na fase de registro do MARÉ ALTA
- [ ] MÁSCARAS pós: usuário escolhe a voz (3 mp3 em `Downloads\mascaras\vo\`) → mix,
      trilha, foley, passe de cor, cartela melhor, A/B de upscale (Video2X × Higgsfield)
- [ ] Opcional: criar remote (`gh repo create`) para o fluxo branch+PR valer
- Créditos Higgsfield: ~1.634 restantes (de 2.374 iniciais)
