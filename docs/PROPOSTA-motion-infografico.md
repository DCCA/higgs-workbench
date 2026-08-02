# Proposta: tools/motion + ESTILO-infografico (incremento 2 dos estilos)

Data: 2026-08-02. Status: spec aprovado em conversa; aguardando revisão final via PR.
Continuação de `docs/PROPOSTA-estilos-de-video.md` (roadmap itens 1-2, PR #25/#26).

## Problema e motivação

O workbench só produz com créditos Higgsfield - e o saldo está bloqueado com
frequência (evals parado esperando renovação). **Motivação central, do usuário: uma
linha de produção que funcione com saldo ZERO.** O caminho é o tipo 100%
programático: motion graphics determinístico via Remotion, dentro do higgs
(decisão de PR #25: OpenMontage é inspiração, nunca dependência).

## Decisões já tomadas (com o usuário)

| Decisão | Escolha | Alternativas descartadas |
|---|---|---|
| Piloto do tipo | **Notícia AI em infográfico** (semanal, mesmo job do tipo notícia, motor diferente) | explainer de conceito; vídeo de dados; só infra sem tipo |
| Identidade | **Direção NOVA** via fluxo de sorteio + página de decisão (como o board) - o estilo nasce assinado | reviver a linguagem Stripe Minions; neutro funcional |
| Escopo | Incremento único: infra + direção + kit + estilo em `rascunho`; **o primeiro filme fica FORA** (rodada normal do `/novo-video`, e é ela que gradua o estilo) | infra neutra + re-skin depois (constrói 2x); composições sob demanda no 1º filme (filme vira projeto de infra) |
| Montagem | **Cena = take**: cada cena renderiza como clipe separado; ffmpeg monta como sempre | timeline única monolítica no Remotion (quebraria árvore/QC/bíblia do workbench) |

Consequência (prometida no spec 1, entra AQUI): a filosofia do repo em
`CLAUDE.md`/`ESTRUTURA.md` passa a "o produto são vídeos; **versiona-se
conhecimento - docs E ferramentas cristalizadas** (`tools/qc/`, `tools/viz/`,
`tools/motion/`)". O higgs ganha node/npm como dependência LOCAL de ferramenta
(como a venv do stable-audio) - `node_modules/` nunca entra no git.

## Arquitetura

```
estilos/ESTILO-infografico.md (rascunho)   declara identidade + kit + pipeline
        │
tools/motion/                              workspace Remotion versionado
  src/theme.ts                             tokens da direção escolhida
  src/scenes/*.tsx                         kit v1: 6 composições com props JSON
        │  npx remotion render <Cena> --props=<cena.json>
        ▼
<slug>/03_takes/take_<CENA>_v1.mp4         cena renderizada = TAKE normal
        │  ffmpeg (concat/xfade CRF16)     mesma montagem, mesmo QC, mesma bíblia
        ▼
<slug>/06_master/<SLUG>_MASTER.mp4
```

- **Cena = take** é a decisão estrutural: árvore de pastas, bíblia (props JSON no
  lugar de job IDs), strips, `qc_video.sh`, folha de cortes, gates e validador
  funcionam SEM mudança. O workflow não bifurca; só a origem do take muda.
- Zero créditos: preflight mostra a conta zerada (e o custo real: tempo de render).

## `tools/motion/` (contrato do workspace)

- Stack: Remotion 4.x + React 18 + TypeScript + `@xyflow/react` (técnica provada no
  projeto Stripe Minions do portfólio) + `zod` (validação de props, padrão Remotion).
- Estrutura: `package.json`, `tsconfig.json`, `remotion.config.ts`,
  `src/Root.tsx` (registro), `src/theme.ts` (tokens da direção - única fonte de
  cor/tipo/espaçamento; cenas NUNCA hardcodam valores), `src/scenes/*.tsx`,
  `check.sh` (`tsc --noEmit` + render-smoke de 1s), `public/` (gitignorado).
- Fontes: OFL de `assets/fonts` copiadas para `tools/motion/public/fonts` por
  script `prepare` do package.json (cópia gitignorada; fonte de verdade única).
- Gitignore: `tools/motion/node_modules/`, `tools/motion/public/`, `out/`, renders.
- Formato padrão: 1080×1920 (9:16), 24 fps - padrão do workbench.
- Licença Remotion: gratuita para indivíduo (registrar nota no SETUP.md).

## Kit v1 (6 cenas; todas: props JSON com schema zod, duração dirigida por props)

| Cena | Props essenciais | Papel |
|---|---|---|
| `Abertura` | titulo, kicker, data | hook do vídeo |
| `StatCard` | valor, label, delta/contexto | número que sustenta a notícia |
| `FluxoDiagrama` | nós, arestas, destaque (xyflow, layout por props) | quem-fez-o-quê da notícia |
| `Timeline` | eventos [{data, texto}] | encadeamento temporal |
| `Cartela` | texto, créditos | fechamento (reutilizável pelos outros estilos) |
| `Legendas` | segmentos [{t0, t1, texto}] | captions sobre qualquer clipe: renderiza com FUNDO TRANSPARENTE (alpha) e o ffmpeg sobrepõe - o clipe original fica intacto e cena=take se mantém |

Transições ENTRE cenas: ffmpeg (xfade/concat), nunca dentro do Remotion - cena é
take. Animação DENTRO da cena: Remotion (spring/interpolate), na gramática da
direção escolhida.

## Direção visual (o estilo nasce assinado)

Fluxo do board adaptado a um mundo de MOTION (não de UI): derivar 7 candidatos do
universo cultural do público de infográfico de notícia (a lista real nasce na
sessão de direção - ex. de famílias: tradição ISOTYPE/Neurath, gráficos de
imprensa de dados, transparências de retroprojetor, manual técnico/patente,
telão de cotações), rodar o seed com challengers, **usuário escolhe na página de
decisão**. O mundo escolhido materializa em TRÊS lugares, com donos claros:

1. `estilos/ESTILO-infografico.md` → seção "Identidade visual" (a gramática, em
   prosa + regras de motion);
2. `tools/motion/src/theme.ts` → os tokens exatos (cor, tipo, espaçamento, ritmo);
3. surface brief próprio (`.impeccable/surfaces/`) para `tools/motion`.

O `DESIGN.md` da raiz segue sendo do BOARD (mundo metrô) - não é tocado. Comps de
imagem seguem pulados enquanto custarem créditos (regra do incremento 1 do board).

## `estilos/ESTILO-infografico.md`

Nasce `Status: rascunho` no contrato de 11 seções (regra do spec 1): seções sem
lição paga marcadas como HIPÓTESE; custos = "0 cr + tempo de render MEDIDO por
cena"; régua de QC herda o padrão + checks do tipo (legibilidade de texto em
tela pequena, contraste do theme, densidade de informação por cena). Gradua para
`ativo` no primeiro filme concluído - que também substitui as HIPÓTESES por
medições e valida a direção em movimento real.

## Integração (mudanças em docs existentes)

1. `.claude/skills/novo-video/SKILL.md` - cláusula "filme programático" (junto das
   transversais): âncoras = stills renderizados (`npx remotion still`), wow-shot =
   a cena de maior risco renderizada, preflight = conta zerada MOSTRADA (com tempo
   de render), takes = cenas renderizadas, gates/validador/QC idênticos.
2. `FERRAMENTAS.md` - seção do motion (comandos render/still/check, cena=take).
3. `SETUP.md` - passo node/npm + `cd tools/motion && npm install` + licença.
4. `CLAUDE.md`/`docs/ESTRUTURA.md` - filosofia atualizada + peça `tools/motion/`.
5. `estilos/README.md` - linha do novo estilo (`rascunho`).
6. `docs/DECISOES.md` - entrada desta decisão (vai nesta PR de spec).

## Critérios de aceite

1. `bash tools/motion/check.sh` verde do zero (`npm install` documentado + tsc +
   render-smoke) numa máquina só com node.
2. As 6 cenas renderizam com props de demonstração e passam verificação visual
   (screenshot por cena) na direção escolhida - nada de tema neutro.
3. Um clipe de cena renderizado passa por `qc_video.sh` sem adaptação.
4. `ESTILO-infografico.md` completo no contrato, `rascunho`, com HIPÓTESES
   marcadas; skill/FERRAMENTAS/SETUP/CLAUDE/ESTRUTURA/README atualizados.
5. Nenhum render, `node_modules/` ou `public/` no git.

## Fora de escopo

- O primeiro filme (rodada do `/novo-video` pós-merge; gradua o estilo).
- Perfis multi-formato (16:9, quadrado), catálogo de cenas além das 6, avatar/TTS
  dentro do Remotion, e a camada determinística do nanquim usar o motion (item
  "Camada determinística" do ESTILO-noticia-nanquim aponta para cá num follow-up
  de 1 linha quando o kit estiver na main).
- Qualquer dependência do OpenMontage.
