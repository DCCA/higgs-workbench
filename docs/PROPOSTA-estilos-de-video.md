# Proposta: estilos de vídeo reutilizáveis (tipos como receita + motion determinístico)

Data: 2026-08-02. Status: spec aprovado em conversa; aguardando revisão final via PR.

## Problema

Cada filme do workbench reinventa decisões que já foram pagas: o A CHAVE fixou uma
linguagem completa (GoT-nanquim, flyover, overlay nítido, VO pt) que hoje só existe
espalhada na bíblia dele e em cláusulas do PRATICAS. Um segundo vídeo-notícia
recomeçaria a destilação do zero. O usuário quer **tipos e estilos de vídeo
reutilizáveis** - e uma camada de motion determinístico (estilo Remotion) para
cartelas/overlays/infográficos que hoje são PIL + ffmpeg artesanais.

## Decisões já tomadas (com o usuário)

| Decisão | Escolha | Alternativas descartadas |
|---|---|---|
| Camadas de reuso | TODAS as quatro: receitas como doc, gráficos determinísticos, tipos 100% programáticos, preset híbrido por tipo | limitar a uma camada |
| Onde vive | **Tudo dentro do higgs.** OpenMontage é INSPIRAÇÃO de arquitetura (composições parametrizadas por JSON, estilos como playbooks), nunca dependência | consumir OpenMontage como motor externo (rejeitado pelo usuário: independência do workbench); reconstruir fora do higgs |
| Piloto | **Vídeo-notícia nanquim** - destilar o A CHAVE, o tipo com maior chance de reuso | explainer evals (inacabado); infográfico 100% Remotion (vira roadmap); filme de personagem (menos templateável) |
| Sequência | Incremento 1 = `estilos/` + piloto + skill (SÓ DOCS); incremento 2 = `tools/motion/`; depois tipo 100% programático e preset híbrido automatizado | fazer tudo de uma vez |

Consequência assumida: a filosofia do repo evolui de "não há código de aplicação"
para "**o produto são vídeos; versiona-se conhecimento - docs E ferramentas
cristalizadas** (`tools/qc/`, `tools/viz/`, futuramente `tools/motion/`)".
`CLAUDE.md` e `ESTRUTURA.md` registram isso no incremento que introduzir o motion.

## Arquitetura (visão completa)

```
estilos/ESTILO-<slug>.md      receita versionada por tipo de vídeo (camada 1)
        │ declara
        ▼
/novo-video                   brief pergunta o estilo; fases herdam a receita;
        │                     fase 10 devolve lições ao ESTILO
        ▼
tools/motion/                 workspace Remotion do higgs (camadas 2-3, incremento 2):
                              composições parametrizadas por props JSON, fontes OFL
                              de assets/fonts; node_modules e renders fora do git
```

- `estilos/` é versionada e pública: estilo é metodologia destilada - blocos de
  prompt, decupagem, réguas - SEM identidade pessoal (refs de personagem ficam nas
  bíblias locais dos filmes).
- O campo **Pipeline** do estilo é a camada 4: declara a mistura (quais beats são
  Higgsfield, quais camadas são `tools/motion`, como o ffmpeg monta). No incremento
  1 é declarativo (o diretor segue); automação no `/novo-video` fica para depois.

## Contrato: formato do `ESTILO-<slug>.md`

Todo estilo segue este esqueleto (o piloto é o exemplo normativo):

```markdown
# ESTILO: <nome legível> (<slug>)

Status: ativo | rascunho. Origem: <filmes que pagaram as lições, com PRs/bíblias>.

## Quando usar
<o job deste tipo de vídeo; sinais de que o brief pede este estilo>

## Identidade visual
<blocos de prompt EM INGLÊS prontos para colar: mundo, materiais, paleta, câmera,
cláusulas anti-armadilha específicas (ex.: anti-texto por superfície)>

## Decupagem padrão
<beats típicos com duração alvo, wow-shot típico, formato (9:16 etc.), total alvo>

## Linguagem de montagem
<cortes × oner × flyover costurado; transições; regra de emenda>

## Áudio
<VO: idioma e critérios de escolha de voz (a voz continua POR VÍDEO); trilha:
prompt-base do gerador + régua (RMS, cobertura de cauda)>

## Camada determinística
<composições de tools/motion usadas (cartela, overlay, legendas) + props típicos;
enquanto tools/motion não existe: a receita PIL/ffmpeg equivalente>

## Pipeline
<a mistura, beat a beat: Higgsfield (modelo/modo) × motion × ffmpeg (montagem)>

## Custos típicos
<MEDIDOS, por bloco: âncoras, takes, retakes esperados; total de referência do
último filme do estilo. Nunca estimativa sem origem>

## Armadilhas e antídotos
<as cláusulas específicas do estilo, cada uma com o filme/custo que a pagou>

## Régua de QC
<o que o validador-gate confere ALÉM do checklist padrão quando este estilo está
declarado>

## Lições (changelog)
<datado, append-only - a fase 10 escreve aqui quando a lição é do estilo,
e em PRATICAS quando é genérica>
```

## Integração no `/novo-video` (mudanças na skill)

1. **Brief (fase 1)**: pergunta nova - "estilo existente (`estilos/`) ou vídeo
   autoral?". Com estilo declarado, ele entra na bíblia do filme como referência.
2. **Conceito (fase 1.5)**: com estilo, encurta - o mundo já está travado; o gate
   vira confirmação de aderência + escolha do arco (não 3-5 mundos). Escape
   explícito: o usuário pode mandar fugir do estilo (aí fase 1.5 completa).
3. **Fases 3-9**: âncoras herdam os blocos de identidade do estilo; storyboard
   herda a linguagem de montagem; áudio herda a régua; a camada determinística
   segue o campo do estilo.
4. **Validador-gate**: item novo de checklist quando há estilo declarado -
   "material adere à identidade/linguagem do ESTILO? Desvios são intencionais e
   anotados?".
5. **Registro (fase 10)**: passo novo obrigatório - promover lições ao ESTILO
   (changelog) além de PRATICAS; custos medidos do filme atualizam "Custos
   típicos".

## Escopo do incremento 1 (esta proposta vira PR de implementação)

- Criar `estilos/` com `estilos/README.md` curto (índice dos estilos + ponteiro
  para o contrato desta proposta, sem duplicá-lo) e o piloto
  **`estilos/ESTILO-noticia-nanquim.md`** destilado do A CHAVE (fonte:
  `chave/BIBLIA.md` local + cláusulas do PRATICAS + DECISOES de 2026-07-26).
  Zero créditos - é destilação de docs.
- Atualizar `.claude/skills/novo-video/SKILL.md` (pontos 1-5 acima),
  `.claude/agents/validador-gate.md` (item de aderência) e `docs/ESTRUTURA.md`
  (peça nova `estilos/`).
- Entrada em `DECISOES.md` (vai nesta PR de spec).

## Roadmap (cada item com proposta própria antes de implementar)

1. **`tools/motion/`** (incremento 2): workspace Remotion versionado no higgs -
   composições `Cartela`, `OverlayContexto`, `Legendas` parametrizadas por props
   JSON, fontes OFL locais; `node_modules/` e renders gitignorados; verificação =
   `tsc --noEmit` + render-smoke. Atualiza a filosofia em CLAUDE.md/ESTRUTURA.
2. **Tipo 100% programático**: infográfico animado (revive a linguagem do projeto
   Stripe Minions) como `ESTILO-infografico.md` + composições próprias - produção
   a custo zero de créditos.
3. **Preset híbrido automatizado**: o `/novo-video` lê o campo Pipeline e monta o
   plano de produção sozinho.

## Critérios de aceite (incremento 1)

1. `ESTILO-noticia-nanquim.md` completo no contrato acima, sem placeholder - todo
   bloco de prompt utilizável como está, custos com origem citada.
2. Um vídeo-notícia novo consegue partir do estilo sem reler a bíblia do A CHAVE
   (teste: o brief do próximo vídeo do tipo referencia só o ESTILO).
3. Skill e validador atualizados; fase 10 exige o passo de promoção ao estilo.
4. Nada de identidade pessoal em `estilos/` (repo público).

## Fora de escopo

- Qualquer dependência do OpenMontage (inspiração de arquitetura apenas).
- `tools/motion/` e tipos programáticos (roadmap, propostas próprias).
- Migrar estilos de outros filmes (VOO/ALÉM/evals) - só depois do piloto validar o
  formato.
