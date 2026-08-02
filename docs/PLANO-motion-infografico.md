# tools/motion + ESTILO-infografico (incremento 2) - Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. **A Task 2 é do CONTROLLER (gate do usuário) - nunca despachar a subagente.**

**Goal:** Linha de produção com zero créditos: workspace Remotion (`tools/motion/`) com kit de 6 cenas na direção visual escolhida pelo usuário + `ESTILO-infografico.md` em rascunho + integração nos docs do workbench.

**Architecture:** Cena = take (spec `docs/PROPOSTA-motion-infografico.md`, mergeado em b0f40a0): cada cena Remotion renderiza como clipe separado e o ffmpeg monta; árvore/bíblia/QC/gates do workflow ficam idênticos. `theme.ts` é a única fonte de tokens visuais; a direção (Task 2, gate do usuário) define os valores antes de qualquer cena ser construída.

**Tech Stack:** Remotion 4 + React 18 + TypeScript + zod (props) + `@xyflow/react` (diagramas) + ffmpeg (montagem/overlay) + `tools/qc/` existente.

## Global Constraints

- NUNCA no git: `tools/motion/node_modules/`, `tools/motion/public/`, `tools/motion/out/`, qualquer render. Só fonte TS/JSON/sh.
- `src/theme.ts` é a ÚNICA fonte de cor/tipo/espaçamento/ritmo; cena que hardcodar valor visual é defeito.
- Formato padrão: 1080×1920, 24 fps (padrão do workbench). Transições ENTRE cenas: ffmpeg, nunca no Remotion.
- Props sempre validados por schema zod; duração dirigida por props via `calculateMetadata`.
- Conteúdo de demonstração é SINTÉTICO e genérico (nada de notícia real inventada com nomes de empresas reais fazendo coisas que não fizeram).
- Ordem dura: Tasks 3-5 (cenas) SÓ começam depois da Task 2 (direção) commitada - cenas nascem no mundo escolhido, nunca num tema neutro re-skinado.
- Fluxo de git: branch `feat/motion-incremento-2`; commits pequenos; UMA PR ao final; merge só após revisão do usuário. Sem Co-Authored-By. Docs em português; identificadores de código em português quando naturais (as cenas do spec: `Abertura`, `StatCard`...).
- Este plano já estará na main quando a execução começar (PR própria de plano) - a Task 1 NÃO o commita.

---

### Task 1: Scaffold do workspace `tools/motion/`

**Files:**
- Create: `tools/motion/package.json`, `tools/motion/tsconfig.json`, `tools/motion/remotion.config.ts`, `tools/motion/copiar-fontes.mjs`, `tools/motion/check.sh`, `tools/motion/src/index.ts`, `tools/motion/src/Root.tsx`, `tools/motion/src/theme.ts`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `tema` (objeto de tokens tipado, `src/theme.ts` - valores TEMPORÁRIOS neutros que a Task 2 substitui; a FORMA é definitiva: `tema.cor.{fundo,texto,destaque,apoio,alerta}`, `tema.tipo.{display,corpo,numeros}`, `tema.ritmo.{entradaFrames,saidaFrames}`, `tema.espaco.{margem,gap}`); composição `Sanity` registrada; `bash tools/motion/check.sh` como gate permanente.

- [ ] **Step 1: Branch**

```bash
git checkout main && git pull --ff-only && git checkout -b feat/motion-incremento-2
```

- [ ] **Step 2: `.gitignore`** - acrescentar ao bloco de ferramentas:

```
tools/motion/node_modules/
tools/motion/public/
tools/motion/out/
```

- [ ] **Step 3: `tools/motion/package.json`**

```json
{
  "name": "higgs-motion",
  "private": true,
  "scripts": {
    "prepare": "node copiar-fontes.mjs",
    "studio": "remotion studio",
    "check": "bash check.sh"
  },
  "dependencies": {
    "@remotion/cli": "^4.0.0",
    "@remotion/fonts": "^4.0.0",
    "@xyflow/react": "^12.3.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "remotion": "^4.0.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "typescript": "^5.5.4"
  }
}
```

- [ ] **Step 4: `tools/motion/copiar-fontes.mjs`** (fonte de verdade das fontes continua `assets/fonts`)

```js
import { cpSync, mkdirSync } from "node:fs";
mkdirSync("public/fonts", { recursive: true });
cpSync("../../assets/fonts", "public/fonts", { recursive: true });
console.log("fontes OFL copiadas para public/fonts");
```

- [ ] **Step 5: `tools/motion/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

- [ ] **Step 6: `tools/motion/remotion.config.ts`**

```ts
import { Config } from "@remotion/cli/config";
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
```

- [ ] **Step 7: `tools/motion/src/theme.ts`** (valores neutros TEMPORÁRIOS por sequenciamento - a Task 2 é a dona deles; a forma não muda)

```ts
// Tokens do mundo visual do ESTILO-infografico.
// A DIREÇÃO (contrato no topo deste arquivo após a Task 2) é a ÚNICA dona
// destes valores; cenas consomem tokens e NUNCA hardcodam cor/tipo/ritmo.
export const tema = {
  cor: {
    fundo: "#101114",
    texto: "#f2f3f5",
    destaque: "#9aa0aa",
    apoio: "#3c414b",
    alerta: "#c7ccd6",
  },
  tipo: {
    display: "Inter",
    corpo: "Inter",
    numeros: "Space Mono",
  },
  ritmo: {
    entradaFrames: 12,
    saidaFrames: 8,
  },
  espaco: {
    margem: 96,
    gap: 32,
  },
} as const;
export type Tema = typeof tema;
```

- [ ] **Step 8: `tools/motion/src/index.ts` e `src/Root.tsx`**

```ts
// src/index.ts
import { registerRoot } from "remotion";
import { Root } from "./Root";
registerRoot(Root);
```

```tsx
// src/Root.tsx
import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { z } from "zod";
import { tema } from "./theme";

const sanitySchema = z.object({ texto: z.string() });

const Sanity: React.FC<z.infer<typeof sanitySchema>> = ({ texto }) => (
  <AbsoluteFill
    style={{
      backgroundColor: tema.cor.fundo,
      color: tema.cor.texto,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 80,
    }}
  >
    {texto}
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <>
    <Composition
      id="Sanity"
      component={Sanity}
      schema={sanitySchema}
      defaultProps={{ texto: "higgs motion ok" }}
      width={1080}
      height={1920}
      fps={24}
      durationInFrames={24}
    />
  </>
);
```

- [ ] **Step 9: `tools/motion/check.sh`**

```bash
#!/bin/bash
# Gate do workspace motion: tipos + render-smoke de 1s.
# Uso: bash tools/motion/check.sh
set -euo pipefail
cd "$(dirname "$0")"
npx tsc --noEmit
npx remotion render Sanity --frames=0-23 /tmp/motion-smoke.mp4 --log=error
ffprobe -v error -show_entries format=duration -of csv=p=0 /tmp/motion-smoke.mp4
echo "motion check OK"
```

- [ ] **Step 10: Instalar e verificar**

```bash
cd tools/motion && npm install && bash check.sh
```
Expected: fontes copiadas no `prepare`, tsc limpo, smoke renderiza ~1.0s, `motion check OK`.

- [ ] **Step 11: Conferir que nada gerado entra no git e commitar**

```bash
cd ../.. && git status --porcelain   # NÃO pode listar node_modules/public/out
git add .gitignore tools/motion/package.json tools/motion/package-lock.json \
  tools/motion/tsconfig.json tools/motion/remotion.config.ts tools/motion/copiar-fontes.mjs \
  tools/motion/check.sh tools/motion/src
git commit -m "feat(motion): scaffold do workspace Remotion (Sanity + theme + check)"
```
(`package-lock.json` É versionado - reprodutibilidade do npm install.)

---

### Task 2: Direção visual do estilo - CONTROLLER + GATE DO USUÁRIO

**NÃO despachar a subagente.** O controller conduz; o usuário decide. Usuário REMOTO: a apresentação é pela pergunta estruturada do chat (a página de decisão local só se ele disser que tem rota até a máquina).

**Files:**
- Modify: `tools/motion/src/theme.ts` (valores reais + contrato de direção no comentário do topo)
- Create: surface brief via `node /home/dcca/.agents/skills/impeccable/scripts/surface-brief.mjs write tools/motion/src/Root.tsx <corpo.md>` (cai em `.impeccable/surfaces/`)

**Interfaces:**
- Produces: contrato de direção (THESIS/OWN-WORLD/STORY/FORM, ≤150 palavras, no topo do `theme.ts`) + valores finais dos tokens. As Tasks 3-5 constroem NESTE mundo; a Task 7 transcreve a gramática para a seção "Identidade visual" do ESTILO.

- [ ] **Step 1**: Derivar 7 candidatos do mundo cultural do público de infográfico de notícia (famílias exemplo do spec: tradição ISOTYPE/Neurath, gráficos de imprensa de dados, transparência de retroprojetor, manual técnico/patente, telão de cotações - a lista real nasce aqui, ≥3 famílias de material, sem o rut "dashboard dark neon" nem o oposto "flat corporativo genérico").
- [ ] **Step 2**: `node /home/dcca/.agents/skills/impeccable/scripts/concept-seed.mjs --scope direction --mode read` (caminho REAL, não o symlink `~/.claude/skills` - o main-guard do script falha via symlink). Pesar challengers nos dois eixos (identificação do público × clareza do produto).
- [ ] **Step 3**: Apresentar ao usuário: direção sorteada comprometida + 1-2 challengers sobreviventes + re-roll + "canon" (padrão da categoria executado no capricho). Remoto → `AskUserQuestion`; local → página `serve-question.mjs`.
- [ ] **Step 4**: Materializar a escolha: reescrever `theme.ts` (valores reais; contraste texto/fundo ≥4.5:1 verificado por cálculo), contrato de direção no comentário do topo, surface brief gravado. Rodar `bash tools/motion/check.sh` (Sanity renderiza no mundo novo).
- [ ] **Step 5**: Commit

```bash
git add tools/motion/src/theme.ts .impeccable/surfaces/
git commit -m "design(motion): direção visual do ESTILO-infografico (tokens + contrato)"
```

---

### Task 3: Cenas `Abertura` e `StatCard`

**Files:**
- Create: `tools/motion/src/scenes/Abertura.tsx`, `tools/motion/src/scenes/StatCard.tsx`, `tools/motion/demo/abertura.json`, `tools/motion/demo/statcard.json`
- Modify: `tools/motion/src/Root.tsx` (registrar as duas)

**Interfaces:**
- Consumes: `tema` (Task 2 - valores finais).
- Produces: schemas exportados `aberturaSchema`, `statCardSchema`; ids de composição `Abertura`, `StatCard`. Padrão de registro que as Tasks 4-5 repetem.

- [ ] **Step 1: Schemas e componentes.** Contratos EXATOS (a camada visual - layout interno, pesos, easing - segue o contrato de direção do theme; animação com `spring()`/`interpolate()` do Remotion, entrada/saída em `tema.ritmo`):

```tsx
// scenes/Abertura.tsx - exports: aberturaSchema, Abertura
export const aberturaSchema = z.object({
  titulo: z.string().min(1),
  kicker: z.string().min(1),
  data: z.string().min(1),
  duracaoSeg: z.number().min(2).max(10).default(4),
});

// scenes/StatCard.tsx - exports: statCardSchema, StatCard
export const statCardSchema = z.object({
  valor: z.string().min(1),
  label: z.string().min(1),
  contexto: z.string().optional(),
  duracaoSeg: z.number().min(2).max(10).default(4),
});
```

Registro em `Root.tsx` (padrão para TODAS as cenas com `duracaoSeg`):

```tsx
<Composition
  id="Abertura"
  component={Abertura}
  schema={aberturaSchema}
  defaultProps={JSON.parse(readFileSync(...)) /* não: usar import do demo/abertura.json */}
  width={1080} height={1920} fps={24} durationInFrames={96}
  calculateMetadata={({ props }) => ({ durationInFrames: Math.round(props.duracaoSeg * 24) })}
/>
```
(Demo props: `import demoAbertura from "../demo/abertura.json"` com `"resolveJsonModule": true` adicionado ao tsconfig neste passo.)

- [ ] **Step 2: Props de demonstração** (sintéticos, genéricos):

```json
// demo/abertura.json
{ "titulo": "Modelo aberto bate benchmark", "kicker": "NOTÍCIA DA SEMANA EM IA", "data": "2026-08-02", "duracaoSeg": 4 }
// demo/statcard.json
{ "valor": "72%", "label": "dos avaliadores preferiram a resposta do modelo aberto", "contexto": "estudo sintético de demonstração", "duracaoSeg": 4 }
```

- [ ] **Step 3: Verificar** - `bash tools/motion/check.sh` (tipos) e stills das duas cenas:

```bash
cd tools/motion
npx remotion still Abertura --props=demo/abertura.json /tmp/abertura.png
npx remotion still StatCard --props=demo/statcard.json /tmp/statcard.png
```
Ver as duas imagens (Read) contra o contrato de direção: mundo aplicado (não neutro), texto legível em tela pequena, tokens do tema (nenhuma cor fora dele).

- [ ] **Step 4: Commit**

```bash
git add tools/motion/src tools/motion/demo tools/motion/tsconfig.json
git commit -m "feat(motion): cenas Abertura e StatCard na direção escolhida"
```

---

### Task 4: Cenas `FluxoDiagrama` e `Timeline`

**Files:**
- Create: `tools/motion/src/scenes/FluxoDiagrama.tsx`, `tools/motion/src/scenes/Timeline.tsx`, `tools/motion/demo/fluxo.json`, `tools/motion/demo/timeline.json`
- Modify: `tools/motion/src/Root.tsx`

**Interfaces:**
- Consumes: `tema`; padrão de registro da Task 3.
- Produces: `fluxoSchema`, `timelineSchema`; ids `FluxoDiagrama`, `Timeline`.

- [ ] **Step 1: Schemas exatos**

```tsx
// scenes/FluxoDiagrama.tsx
export const fluxoSchema = z.object({
  nos: z.array(z.object({
    id: z.string(),
    rotulo: z.string(),
    destaque: z.boolean().default(false),
  })).min(2).max(8),
  arestas: z.array(z.object({
    de: z.string(),
    para: z.string(),
    rotulo: z.string().optional(),
  })).min(1),
  duracaoSeg: z.number().min(3).max(12).default(6),
});

// scenes/Timeline.tsx
export const timelineSchema = z.object({
  eventos: z.array(z.object({ data: z.string(), texto: z.string() })).min(2).max(6),
  duracaoSeg: z.number().min(3).max(12).default(6),
});
```

`FluxoDiagrama` usa `@xyflow/react` com layout POR PROPS (posições calculadas por índice, sem dagre), `fitView`, sem interação (`nodesDraggable={false}` etc.); nós/arestas estilizados pelos tokens; entrada animada nó a nó (stagger por `tema.ritmo.entradaFrames`), `destaque` puxa a cor `tema.cor.destaque`. Técnica provada no projeto Stripe Minions do portfólio.

- [ ] **Step 2: Demos**

```json
// demo/fluxo.json
{ "nos": [ { "id": "lab", "rotulo": "Laboratório", "destaque": false },
           { "id": "modelo", "rotulo": "Modelo aberto", "destaque": true },
           { "id": "bench", "rotulo": "Benchmark", "destaque": false } ],
  "arestas": [ { "de": "lab", "para": "modelo", "rotulo": "publica" },
               { "de": "modelo", "para": "bench", "rotulo": "supera" } ],
  "duracaoSeg": 6 }
// demo/timeline.json
{ "eventos": [ { "data": "seg", "texto": "Paper publicado" },
               { "data": "qua", "texto": "Pesos liberados" },
               { "data": "sex", "texto": "Benchmark reproduzido" } ],
  "duracaoSeg": 6 }
```

- [ ] **Step 3: Verificar** - `check.sh` + stills das duas (mesmo método da Task 3, mesmo critério visual).
- [ ] **Step 4: Commit** - `git commit -m "feat(motion): cenas FluxoDiagrama e Timeline"`

---

### Task 5: Cenas `Cartela` e `Legendas` (alpha) + prova do overlay

**Files:**
- Create: `tools/motion/src/scenes/Cartela.tsx`, `tools/motion/src/scenes/Legendas.tsx`, `tools/motion/demo/cartela.json`, `tools/motion/demo/legendas.json`
- Modify: `tools/motion/src/Root.tsx`

**Interfaces:**
- Consumes: `tema`; padrão de registro da Task 3.
- Produces: `cartelaSchema`, `legendasSchema`; ids `Cartela`, `Legendas`. Receita de overlay alpha comprovada (vai para FERRAMENTAS na Task 7).

- [ ] **Step 1: Schemas exatos**

```tsx
// scenes/Cartela.tsx
export const cartelaSchema = z.object({
  texto: z.string().min(1),
  creditos: z.string().min(1),
  duracaoSeg: z.number().min(2).max(8).default(4),
});

// scenes/Legendas.tsx - fundo TRANSPARENTE (nenhum AbsoluteFill com backgroundColor)
export const legendasSchema = z.object({
  segmentos: z.array(z.object({
    t0: z.number().min(0),
    t1: z.number().positive(),
    texto: z.string().min(1),
  })).min(1),
});
```
Registro de `Legendas`: `calculateMetadata` = `Math.round(Math.max(...props.segmentos.map(s => s.t1)) * 24)`. Cada segmento visível quando `t0 <= t < t1` (frame/24), com fade de `tema.ritmo.entradaFrames`.

- [ ] **Step 2: Demos**

```json
// demo/cartela.json
{ "texto": "montado no higgs-workbench", "creditos": "fontes: demonstração sintética", "duracaoSeg": 4 }
// demo/legendas.json
{ "segmentos": [ { "t0": 0.5, "t1": 3.0, "texto": "Legenda de demonstração um" },
                 { "t0": 3.5, "t1": 6.0, "texto": "Legenda de demonstração dois" } ] }
```

- [ ] **Step 3: Prova do overlay alpha** (o mesmo rigor da receita do nanquim - sonda de pixel):

```bash
cd tools/motion
npx remotion render Legendas --props=demo/legendas.json --codec=vp9 --pixel-format=yuva420p /tmp/legendas.webm
ffmpeg -y -f lavfi -i "color=c=0x808080:s=1080x1920:d=7:r=24" -c:v libx264 /tmp/base.mp4
ffmpeg -y -i /tmp/base.mp4 -c:v libvpx-vp9 -i /tmp/legendas.webm -filter_complex "overlay" -c:v libx264 -crf 16 /tmp/com-legendas.mp4
# sondas: dentro do segmento 1 (t=1.5) o pixel da área da legenda difere do cinza;
# fora dos segmentos (t=3.2) é cinza puro 0x808080; o fundo NUNCA é coberto.
```
(`-c:v libvpx-vp9` ANTES do `-i` do webm força o decoder que preserva alpha.)

- [ ] **Step 4: Verificar** - `check.sh` + still da Cartela + as sondas acima.
- [ ] **Step 5: Commit** - `git commit -m "feat(motion): cenas Cartela e Legendas (alpha) com overlay provado"`

---

### Task 6: Prova de integração - cena=take, QC e tempos medidos

**Files:**
- Create: `tools/motion/README.md` (comandos + tempos medidos por cena)

**Interfaces:**
- Consumes: as 6 cenas.
- Produces: tempos de render MEDIDOS (a Task 7 os copia para "Custos típicos" do ESTILO); prova do critério de aceite 3 do spec.

- [ ] **Step 1: Renderizar 2 cenas como takes e medir**

```bash
cd tools/motion
time npx remotion render Abertura --props=demo/abertura.json /tmp/take_ABERTURA_v1.mp4
time npx remotion render FluxoDiagrama --props=demo/fluxo.json /tmp/take_FLUXO_v1.mp4
```
Anotar os tempos reais (real time) por cena.

- [ ] **Step 2: QC sem adaptação** (aceite 3)

```bash
cd ../.. && bash tools/qc/qc_video.sh /tmp/take_FLUXO_v1.mp4 /tmp/qc_motion
```
Expected: folhas de contato geradas, medições rodam, sem erro (o "(sem audio)" esperado - cenas não têm áudio).

- [ ] **Step 3: Montagem cena=take** - xfade dos dois takes com os params do workbench:

```bash
ffmpeg -y -i /tmp/take_ABERTURA_v1.mp4 -i /tmp/take_FLUXO_v1.mp4 \
  -filter_complex "xfade=transition=fade:duration=0.3:offset=3.7" \
  -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -r 24 /tmp/corte_demo.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 /tmp/corte_demo.mp4
```
Expected: duração ≈ 9,7s (4+6-0,3).

- [ ] **Step 4: `tools/motion/README.md`** - escrever com: o que é (cena=take, ponteiro pro spec), comandos (install/check/still/render/legendas-alpha/studio) e a TABELA DE TEMPOS medidos no Step 1 (com data e máquina). Commit:

```bash
git add tools/motion/README.md && git commit -m "docs(motion): README com comandos e tempos de render medidos"
```

---

### Task 7: `ESTILO-infografico.md` (rascunho) + integração nos docs

**Files:**
- Create: `estilos/ESTILO-infografico.md`
- Modify: `estilos/README.md`, `.claude/skills/novo-video/SKILL.md`, `FERRAMENTAS.md`, `SETUP.md`, `CLAUDE.md`, `docs/ESTRUTURA.md`

**Interfaces:**
- Consumes: contrato de direção (theme.ts, Task 2), schemas/ids das cenas (Tasks 3-5), tempos medidos (Task 6).

- [ ] **Step 1: `estilos/ESTILO-infografico.md`** no contrato de 11 seções (mesmos títulos do piloto nanquim), com:
  - Cabeçalho: `Status: rascunho. Origem: direção própria (seed + escolha do usuário, 2026-08); gradua no 1º filme concluído.`
  - "Identidade visual": transcrever a gramática do contrato de direção (prosa + regras de motion; tokens exatos vivem em `tools/motion/src/theme.ts` - citar o caminho, não duplicar valores).
  - "Camada determinística": o kit (tabela cena → schema → quando usar).
  - "Pipeline": beat → cena; cena=take; transições ffmpeg; Legendas por overlay alpha.
  - "Custos típicos": `0 cr` + tempos de render MEDIDOS da Task 6 (com origem).
  - Seções sem lição paga (Decupagem padrão, Armadilhas, Régua de QC além do padrão): marcar cada bloco especulativo com `HIPÓTESE:` no início da linha - substituídas por medições no 1º filme.
  - Rodar o check mecânico do contrato (mesmo python do incremento 1, trocando o nome do arquivo).
- [ ] **Step 2: `estilos/README.md`** - nova linha na tabela: `| [Infográfico animado](ESTILO-infografico.md) | rascunho | direção própria (2026-08; gradua no 1º filme) |`
- [ ] **Step 3: SKILL.md** - nova seção transversal, logo após "## Board ao vivo (transversal)":

```markdown
## Filme programático (transversal - estilos 100% motion)

Quando o estilo declara produção programática (`tools/motion/`), o workflow NÃO
muda - muda a origem do take: âncoras = stills renderizados
(`npx remotion still <Cena> --props=<json>`), wow-shot = a cena de maior risco
renderizada primeiro, takes = cenas renderizadas (`npx remotion render`), montagem
= ffmpeg como sempre (cena é take; transição NUNCA dentro do Remotion). Preflight
continua obrigatório: a conta mostra 0 cr + o tempo de render por cena (referência
no ESTILO e em tools/motion/README.md). Gates, validador, QC e bíblia idênticos -
a bíblia registra os props JSON de cada take no lugar de job IDs.
```

- [ ] **Step 4: FERRAMENTAS.md** - nova seção (ao lado das ferramentas de áudio/pós):

```markdown
## Motion programático (tools/motion)

Kit Remotion do workbench - produção com ZERO créditos (cena = take; spec em
`docs/PROPOSTA-motion-infografico.md`).
- Setup: `cd tools/motion && npm install` (node ≥18; ver SETUP.md)
- Gate: `bash tools/motion/check.sh` (tipos + render-smoke)
- Still (âncora): `npx remotion still <Cena> --props=demo/<cena>.json saida.png`
- Take: `npx remotion render <Cena> --props=<props.json> take_<CENA>_v1.mp4`
- Legendas com alpha: `npx remotion render Legendas --codec=vp9 --pixel-format=yuva420p saida.webm`,
  depois `ffmpeg -i base.mp4 -c:v libvpx-vp9 -i saida.webm -filter_complex overlay ...`
- Iterar ao vivo: `npx remotion studio`
```

- [ ] **Step 5: SETUP.md** - novo passo numerado (depois do Python/QC): node ≥18 pelo gerenciador do sistema, `cd tools/motion && npm install`, nota da licença Remotion (gratuita para indivíduo/empresa ≤3 pessoas; conferir termos ao mudar de contexto).
- [ ] **Step 6: CLAUDE.md** - (a) no parágrafo "O que é este repo", trocar "Não há código de aplicação, build nem testes - o produto são vídeos; o que se versiona é conhecimento:" por "O produto são vídeos; o que se versiona é conhecimento - práticas, bíblias e **ferramentas cristalizadas** (`tools/`, incluindo o kit motion com seu próprio `check.sh`):" (manter o resto da frase); (b) bullet do `tools/` ganha `tools/motion/` com o comando do check; (c) bullet `estilos/` menciona o tipo programático.
- [ ] **Step 7: ESTRUTURA.md** - linha de `tools/motion/` na tabela "As peças" + uma frase na seção "Board ao vivo"? NÃO - seção própria curta "## Motion programático" com o fluxo cena=take (3 linhas).
- [ ] **Step 8: Verificar e commitar** - greps de cada âncora + `ls` dos caminhos citados; commit `docs: ESTILO-infografico (rascunho) + filme programático integrado ao workbench`.

---

### Task 8: Aceite final + PR (sem merge)

- [ ] **Step 1: Critérios do spec, em sequência**:
  1. `rm -rf tools/motion/node_modules tools/motion/public && cd tools/motion && npm install && bash check.sh` - verde do zero.
  2. 6 stills (um por cena, props demo) verificados contra o contrato de direção - nada de tema neutro. Salvar os PNGs no workspace SDD para a PR.
  3. Evidência da Task 6 (qc_video.sh no clipe) citada no report.
  4. Check mecânico do ESTILO (rascunho) verde; greps da integração (SKILL/FERRAMENTAS/SETUP/CLAUDE/ESTRUTURA/README).
  5. `git log --stat` da branch: nenhum render/node_modules/public; só fonte e docs.
- [ ] **Step 2: Push + PR** com título `feat(motion): tools/motion + ESTILO-infografico (produção com saldo zero)`, corpo resumindo direção escolhida (com o nome do mundo), kit, provas (overlay alpha por sonda, QC sem adaptação, tempos medidos) e a transparência de que o estilo nasce `rascunho`. Trailing 🤖. NÃO mergear - gate do usuário.

---

## Self-review (feito na escrita do plano)

- **Cobertura do spec:** workspace/contrato → Task 1; direção (3 materializações: theme, ESTILO §Identidade, surface brief) → Tasks 2 e 7; kit 6 cenas com schemas/props/alpha → Tasks 3-5; cena=take + QC + tempos (aceites 1-3) → Tasks 1, 6 e 8; ESTILO rascunho + 6 integrações de docs (aceite 4) → Task 7; aceite 5 → Task 8. Fora de escopo do spec respeitado (nenhuma task de 1º filme/multi-formato/nanquim-motion). ✓
- **Placeholders:** os valores neutros do theme na Task 1 são sequenciamento explícito (Task 2 é dona; ordem dura nas Global Constraints), não TBD. Camada visual das cenas é vinculada ao contrato de direção por definição - o que é contratual (schemas, ids, registro, durações) está exato. ✓
- **Consistência:** ids `Sanity/Abertura/StatCard/FluxoDiagrama/Timeline/Cartela/Legendas` e schemas `*Schema` idênticos entre Tasks 3-8; `tema.*` shape da Task 1 usado nas 3-5; comandos de FERRAMENTAS (Task 7) batem com os provados nas Tasks 5-6. ✓
