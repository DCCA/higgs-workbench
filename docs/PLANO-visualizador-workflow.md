# Visualizador de Workflow - Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Board ao vivo do `/novo-video`: página xyflow sem build que mostra fases, shots, erros e custo lendo `<slug>/estado.json`.

**Architecture:** O diretor escreve `<slug>/estado.json` a cada transição; `tools/viz/serve.sh` sobe `python3 -m http.server` na raiz do repo; `tools/viz/index.html` (arquivo único, React + @xyflow/react via esm.sh, sem JSX/build) faz poll do JSON a cada 1s e renderiza espinha de fases + nós de shot + feed de eventos. Spec: `docs/PROPOSTA-visualizador-workflow.md`.

**Tech Stack:** HTML único + importmap esm.sh (react@18.3.1, @xyflow/react@12.3.2), bash, python3 (stdlib), Playwright MCP para verificação visual.

## Global Constraints

- Repo SEM toolchain node: nenhum `package.json`, `node_modules` ou passo de build.
- Fluxo de git do repo: branch `feat/visualizador-workflow` → commits pequenos → UMA PR no final → merge só após revisão. NUNCA commitar na main.
- Docs e comentários em português; código/identificadores curtos em pt (padrão do repo).
- Mídia continua fora do git; os únicos arquivos novos versionados são `tools/viz/*` e edits em docs. `tools/viz/demo/sim/` entra no `.gitignore`.
- O contrato do `estado.json` é o do spec (seção "estado.json (contrato)") - não inventar campos novos sem atualizar o spec.
- Tema escuro único; atribuição padrão do xyflow mantida (não usar proOptions para escondê-la).

---

### Task 1: Branch, fixture golden e serve.sh

**Files:**
- Create: `tools/viz/demo/estado.json` (fixture golden, normativa do contrato)
- Create: `tools/viz/serve.sh`
- Modify: `.gitignore` (linha `tools/viz/demo/sim/`)
- Commit também: `docs/PLANO-visualizador-workflow.md` (este plano)

**Interfaces:**
- Produces: URL `http://localhost:8123/tools/viz/?filme=<slug>`; o viewer (Task 2) fará `fetch("/" + filme + "/estado.json")`, então `?filme=tools/viz/demo` serve a fixture. `atualizado_em` da fixture é FIXO NO PASSADO de propósito: o banner de frescor (Task 3) deve aparecer na demo golden - é o teste do critério de aceite 3, não um bug.

- [ ] **Step 1: Criar a branch (com o plano dentro)**

```bash
cd /home/dcca/projects/higgs && git checkout main && git pull --ff-only && git checkout -b feat/visualizador-workflow
```

- [ ] **Step 2: Escrever a fixture golden** - cobre TODOS os statuses de fase (`pendente, em_andamento, validando, gate_usuario, bloqueada, concluida, pulada`), todos os de shot (`planejado, gerando, em_qc, aprovado, descartado`), retake via `versao: 2`, e eventos de todo tipo/nível. O último evento do S4 é `nivel: "erro"` → S4 deve pintar de vermelho (regra do "último evento do ref").

Criar `tools/viz/demo/estado.json`:

```json
{
  "filme": "demo",
  "atualizado_em": "2026-08-01T12:00:00Z",
  "fase_atual": "6",
  "fases": {
    "1": "concluida", "1.5": "pulada", "2": "concluida", "3": "concluida",
    "4": "gate_usuario", "5": "concluida", "6": "em_andamento",
    "7": "validando", "8": "bloqueada", "9": "pendente", "10": "pendente"
  },
  "shots": [
    { "id": "A1_heroi", "tipo": "ancora", "fase": "3", "versao": 1,
      "status": "aprovado", "custo_cr": 2.0, "job_id": "j-a1",
      "arquivo": "02_ancoras/ancora_A1_heroi_v1.png" },
    { "id": "A2_locacao", "tipo": "ancora", "fase": "3", "versao": 2,
      "status": "descartado", "custo_cr": 4.0, "job_id": "j-a2",
      "arquivo": "02_ancoras/_descartados/ancora_A2_locacao_v2.png" },
    { "id": "S2_wow", "tipo": "take", "fase": "5", "versao": 2,
      "status": "aprovado", "custo_cr": 45.0, "job_id": "j-s2",
      "arquivo": "03_takes/take_S2_wow_v2.mp4" },
    { "id": "S1", "tipo": "take", "fase": "6", "versao": 1,
      "status": "gerando", "custo_cr": 17.5, "job_id": "j-s1", "arquivo": null },
    { "id": "S3", "tipo": "take", "fase": "6", "versao": 1,
      "status": "em_qc", "custo_cr": 17.5, "job_id": "j-s3",
      "arquivo": "03_takes/take_S3_v1.mp4" },
    { "id": "S4", "tipo": "take", "fase": "6", "versao": 2,
      "status": "em_qc", "custo_cr": 35.0, "job_id": "j-s4",
      "arquivo": "03_takes/take_S4_v2.mp4" },
    { "id": "S5_reveal", "tipo": "take", "fase": "6", "versao": 1,
      "status": "planejado", "custo_cr": null, "job_id": null, "arquivo": null }
  ],
  "eventos": [
    { "t": "2026-08-01T11:40:00Z", "tipo": "fase", "ref": "6", "msg": "Produção iniciada", "nivel": "info" },
    { "t": "2026-08-01T11:41:00Z", "tipo": "job", "ref": "S1", "msg": "seedance fast 5s lançado", "custo_cr": 17.5, "nivel": "info" },
    { "t": "2026-08-01T11:44:00Z", "tipo": "qc", "ref": "S3", "msg": "qc_video.sh: sem flicker, sem freeze", "nivel": "info" },
    { "t": "2026-08-01T11:47:00Z", "tipo": "retake", "ref": "S4", "msg": "v1 → v2: beat 99,9% não entrega; bracket persiste", "nivel": "alerta" },
    { "t": "2026-08-01T11:50:00Z", "tipo": "audio", "ref": null, "msg": "2 candidatas de VO edge-tts geradas", "nivel": "info" },
    { "t": "2026-08-01T11:52:00Z", "tipo": "gate", "ref": "4", "msg": "Storyboard aguardando decisão do usuário", "nivel": "alerta" },
    { "t": "2026-08-01T11:55:00Z", "tipo": "veredito", "ref": "8", "msg": "BLOQUEIA: trilha sem cobertura na cauda", "nivel": "erro" },
    { "t": "2026-08-01T11:58:00Z", "tipo": "veredito", "ref": "S4", "msg": "BLOQUEIA: faux-texto na borda do mostrador", "nivel": "erro" }
  ],
  "custos": { "gasto_cr": 123.5, "teto_cr": 300 }
}
```

- [ ] **Step 3: Validar o JSON e a cobertura de statuses**

```bash
python3 - <<'PY'
import json
e = json.load(open("tools/viz/demo/estado.json"))
assert set(e["fases"].values()) == {"pendente","em_andamento","validando","gate_usuario","bloqueada","concluida","pulada"}
assert {s["status"] for s in e["shots"]} == {"planejado","gerando","em_qc","aprovado","descartado"}
assert {ev["nivel"] for ev in e["eventos"]} == {"info","alerta","erro"}
print("fixture OK")
PY
```
Expected: `fixture OK`

- [ ] **Step 4: Escrever `tools/viz/serve.sh`**

```bash
#!/bin/bash
# Sobe o board do workflow. Uso: bash tools/viz/serve.sh <slug> [porta]
# O slug vira a URL ?filme=<slug>; a página busca /<slug>/estado.json.
set -euo pipefail
SLUG="${1:?uso: serve.sh <slug> [porta]}"
PORTA="${2:-8123}"
RAIZ="$(cd "$(dirname "$0")/../.." && pwd)"
echo "Board: http://localhost:${PORTA}/tools/viz/?filme=${SLUG}"
exec python3 -m http.server "$PORTA" -d "$RAIZ" --bind 127.0.0.1
```

- [ ] **Step 5: Testar o serve.sh contra a fixture**

```bash
bash tools/viz/serve.sh tools/viz/demo &
sleep 1
curl -sf "http://localhost:8123/tools/viz/demo/estado.json?t=1" | python3 -c "import json,sys; print(json.load(sys.stdin)['filme'])"
kill %1
```
Expected: imprime a URL do board e depois `demo`.

- [ ] **Step 6: Ignorar a pasta de simulação e commitar**

```bash
echo "tools/viz/demo/sim/" >> .gitignore
git add docs/PLANO-visualizador-workflow.md tools/viz/demo/estado.json tools/viz/serve.sh .gitignore
git commit -m "feat(viz): fixture golden do contrato estado.json + serve.sh"
```

---

### Task 2: Viewer - grafo estático (fases + shots)

**Files:**
- Create: `tools/viz/index.html`

**Interfaces:**
- Consumes: fixture e server da Task 1 (`?filme=tools/viz/demo`).
- Produces: `buildGraph(estado) -> {nodes, edges}` e a constante `FASES` (Task 3 adiciona `Header`/`Feed` NO MESMO arquivo; Task 4 troca o carregamento único por poll). Regra do vermelho: nó fica com classe extra `erro` quando o ÚLTIMO evento cujo `ref` é o id dele tem `nivel: "erro"`.

- [ ] **Step 1: Escrever `tools/viz/index.html`** (versão 1: carrega o estado UMA vez; poll entra na Task 4)

```html
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>higgs - board do workflow</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://esm.sh/@xyflow/react@12.3.2/dist/style.css">
<style>
  html,body,#root{margin:0;height:100%;background:#0d1117;color:#e6edf3;
    font:14px/1.4 system-ui,sans-serif}
  .app{display:flex;flex-direction:column;height:100%}
  .corpo{display:flex;flex:1;min-height:0}
  .grafo{flex:1}
  .aviso{padding:2rem;color:#8b949e}
  /* nós */
  .react-flow__node{border-radius:8px;border:1.5px solid #30363d;
    background:#161b22;color:#e6edf3;font-size:12px;padding:8px 12px}
  .react-flow__node.fase{width:230px}
  .react-flow__node.shot{width:190px;font-family:ui-monospace,monospace}
  .react-flow__node.pendente{opacity:.55}
  .react-flow__node.pulada{opacity:.45;border-style:dashed}
  .react-flow__node.em_andamento,.react-flow__node.gerando{border-color:#2f81f7;
    animation:pulso 1.2s ease-in-out infinite}
  .react-flow__node.validando,.react-flow__node.em_qc{border-color:#a371f7}
  .react-flow__node.gate_usuario{border-color:#d29922;background:#211a08}
  .react-flow__node.bloqueada,.react-flow__node.erro{border-color:#f85149;
    background:#2d1214}
  .react-flow__node.concluida,.react-flow__node.aprovado{border-color:#3fb950}
  .react-flow__node.descartado{opacity:.4;text-decoration:line-through}
  @keyframes pulso{0%,100%{box-shadow:0 0 0 0 rgba(47,129,247,.55)}
    50%{box-shadow:0 0 0 7px rgba(47,129,247,0)}}
</style>
<script type="importmap">
{ "imports": {
  "react": "https://esm.sh/react@18.3.1",
  "react-dom/client": "https://esm.sh/react-dom@18.3.1/client",
  "@xyflow/react": "https://esm.sh/@xyflow/react@12.3.2?deps=react@18.3.1,react-dom@18.3.1"
}}
</script>
</head>
<body>
<div id="root"></div>
<script type="module">
import React from "react";
import { createRoot } from "react-dom/client";
import { ReactFlow, Background } from "@xyflow/react";
const h = React.createElement;

// Espinha do fluxograma v2 (docs/ESTRUTURA.md). Mudou o workflow? Atualizar AQUI.
const FASES = [
  { id: "1",   titulo: "Brief" },
  { id: "1.5", titulo: "Conceito", gate: true },
  { id: "2",   titulo: "Setup + preflight" },
  { id: "3",   titulo: "Âncoras", gate: true },
  { id: "4",   titulo: "Storyboard", gate: true },
  { id: "5",   titulo: "Wow-shot", gate: true },
  { id: "6",   titulo: "Produção" },
  { id: "7",   titulo: "Montagem + review 7b", gate: true },
  { id: "8",   titulo: "Áudio + review 8b" },
  { id: "9",   titulo: "Finalização", gate: true },
  { id: "10",  titulo: "Registro" },
];

// último nível de evento por ref: pinta o nó de vermelho se for "erro"
function nivelPorRef(eventos) {
  const m = {};
  for (const ev of eventos || []) if (ev.ref) m[ev.ref] = ev.nivel;
  return m;
}

function buildGraph(estado) {
  const nodes = [], edges = [];
  const ultimoNivel = nivelPorRef(estado.eventos);
  const porFase = {};
  for (const s of estado.shots || []) (porFase[s.fase] ||= []).push(s);
  let y = 0;
  FASES.forEach((f, i) => {
    const st = (estado.fases || {})[f.id] || "pendente";
    const erro = ultimoNivel[f.id] === "erro" ? " erro" : "";
    nodes.push({ id: "f" + f.id, position: { x: 0, y },
      data: { label: (f.gate ? "⛩ " : "") + f.id + ". " + f.titulo },
      className: "fase " + st + erro });
    if (i > 0) edges.push({ id: "e" + i, source: "f" + FASES[i - 1].id,
      target: "f" + f.id,
      animated: st === "em_andamento" || st === "validando" });
    const shots = porFase[f.id] || [];
    shots.forEach((s, j) => {
      const sErro = ultimoNivel[s.id] === "erro" ? " erro" : "";
      const custo = s.custo_cr ? " · " + s.custo_cr + " cr" : "";
      nodes.push({ id: "s" + s.id, position: { x: 340, y: y + j * 64 },
        data: { label: s.id + " v" + (s.versao || 1) + custo },
        className: "shot " + s.status + sErro });
      edges.push({ id: "es" + s.id, source: "f" + f.id, target: "s" + s.id,
        animated: s.status === "gerando" });
    });
    y += Math.max(96, shots.length * 64 + 16);
  });
  return { nodes, edges };
}

function App() {
  const [estado, setEstado] = React.useState(null);
  const filme = new URLSearchParams(location.search).get("filme");
  React.useEffect(() => {
    if (!filme) return;
    fetch("/" + filme + "/estado.json?t=" + Date.now())
      .then(r => r.json()).then(setEstado).catch(() => {});
  }, [filme]);
  if (!filme) return h("div", { className: "aviso" },
    "Faltou ?filme=<slug> na URL - use tools/viz/serve.sh <slug>.");
  if (!estado) return h("div", { className: "aviso" }, "Carregando estado.json…");
  const { nodes, edges } = buildGraph(estado);
  return h("div", { className: "app" },
    h("div", { className: "corpo" },
      h("div", { className: "grafo" },
        h(ReactFlow, { nodes, edges, fitView: true,
          nodesDraggable: false, nodesConnectable: false },
          h(Background, { gap: 24 })))));
}

createRoot(document.getElementById("root")).render(h(App));
</script>
</body>
</html>
```

- [ ] **Step 2: Verificar no browser real (Playwright MCP)**

Com o server da Task 1 rodando (`bash tools/viz/serve.sh tools/viz/demo &`):
1. `browser_navigate` → `http://localhost:8123/tools/viz/?filme=tools/viz/demo`
2. `browser_console_messages` → Expected: nenhum erro (warnings do React ok).
3. `browser_take_screenshot` → conferir CONTRA A FIXTURE: 11 fases na espinha; 1.5 tracejada; 4 âmbar com ⛩; 6 azul pulsando; 8 vermelha; S4 vermelho (último evento erro); A2 riscado; S5_reveal apagado; arestas animadas chegando na fase 6.

- [ ] **Step 3: Corrigir o que a screenshot mostrar de errado** (iterar Steps 1-2 até bater com a lista acima; regra do repo: verificação visual é medir, não achar).

- [ ] **Step 4: Commit**

```bash
git add tools/viz/index.html
git commit -m "feat(viz): grafo estático de fases + shots com estados visuais"
```

---

### Task 3: Viewer - header (custo, frescor) e feed de eventos

**Files:**
- Modify: `tools/viz/index.html` (mesmo arquivo; adicionar `Header` e `Feed`, usar no `App`)

**Interfaces:**
- Consumes: `estado` e `buildGraph` da Task 2.
- Produces: `Header({estado, ultimoOk})` e `Feed({eventos})`; a Task 4 alimenta `ultimoOk` (timestamp do último fetch bom; nesta task passe `Date.now()` fixo). Limiar de frescor: `FRESCOR_MS = 3*60*1000` sobre `estado.atualizado_em`. Com a fixture golden (timestamp no passado) o banner DEVE aparecer - é o critério de aceite 3.

- [ ] **Step 1: Adicionar CSS** (dentro do `<style>` existente)

```css
  .header{display:flex;gap:16px;align-items:center;padding:10px 16px;
    border-bottom:1px solid #30363d;background:#161b22}
  .header .filme{font-weight:700}
  .custo{flex:1;max-width:340px}
  .custo .barra{height:8px;background:#30363d;border-radius:4px;overflow:hidden}
  .custo .cheio{height:100%;background:#3fb950}
  .custo .cheio.estourando{background:#d29922}
  .banner{padding:6px 16px;font-size:13px}
  .banner.congelado{background:#3a2d08;color:#d29922}
  .banner.desconectado{background:#2d1214;color:#f85149}
  .feed{width:330px;overflow-y:auto;border-left:1px solid #30363d;
    padding:10px;background:#0d1117}
  .evento{padding:6px 8px;border-left:3px solid #30363d;margin-bottom:6px;
    font-size:12.5px}
  .evento.alerta{border-color:#d29922}
  .evento.erro{border-color:#f85149;background:#2d1214}
  .evento .meta{color:#8b949e;font-family:ui-monospace,monospace;font-size:11px}
```

- [ ] **Step 2: Adicionar os componentes** (antes de `App`)

```js
const FRESCOR_MS = 3 * 60 * 1000;   // board sem escrita há 3 min = congelado
const CONEXAO_MS = 5 * 1000;        // sem fetch ok há 5 s = server fora

function Header({ estado, ultimoOk }) {
  const { gasto_cr = 0, teto_cr = 0 } = estado.custos || {};
  const pct = teto_cr ? Math.min(100, 100 * gasto_cr / teto_cr) : 0;
  const idadeEstado = Date.now() - Date.parse(estado.atualizado_em || 0);
  const semConexao = Date.now() - ultimoOk > CONEXAO_MS;
  return h(React.Fragment, null,
    h("div", { className: "header" },
      h("span", { className: "filme" }, estado.filme),
      h("span", null, "fase atual: " + (estado.fase_atual || "?")),
      h("div", { className: "custo" },
        h("div", null, gasto_cr + " / " + teto_cr + " cr"),
        h("div", { className: "barra" },
          h("div", { className: "cheio" + (pct >= 85 ? " estourando" : ""),
            style: { width: pct + "%" } }))),
      h("span", null, "atualizado há " + Math.round(idadeEstado / 1000) + "s")),
    semConexao && h("div", { className: "banner desconectado" },
      "Sem conexão com o server - o serve.sh caiu? Continuo tentando."),
    !semConexao && idadeEstado > FRESCOR_MS &&
      h("div", { className: "banner congelado" },
        "estado.json sem escrita há mais de 3 min - board possivelmente congelado."));
}

function Feed({ eventos }) {
  const itens = [...(eventos || [])].reverse().slice(0, 50);
  return h("div", { className: "feed" }, itens.map((ev, i) =>
    h("div", { className: "evento " + (ev.nivel || "info"), key: i },
      h("div", { className: "meta" },
        (ev.t || "").slice(11, 19) + "  " + ev.tipo +
        (ev.ref ? " · " + ev.ref : "") +
        (ev.custo_cr ? " · " + ev.custo_cr + " cr" : "")),
      h("div", null, ev.msg))));
}
```

- [ ] **Step 3: Usar no `App`** - trocar o `return` final por:

```js
  return h("div", { className: "app" },
    h(Header, { estado, ultimoOk: Date.now() }),   // Task 4 troca por estado real
    h("div", { className: "corpo" },
      h("div", { className: "grafo" },
        h(ReactFlow, { nodes, edges, fitView: true,
          nodesDraggable: false, nodesConnectable: false },
          h(Background, { gap: 24 }))),
      h(Feed, { eventos: estado.eventos })));
```

- [ ] **Step 4: Verificar no browser (Playwright)** - recarregar a página da demo:
`browser_console_messages` limpo; screenshot mostra: header com `demo`, `123.5 / 300 cr` na barra (~41%, verde), **banner âmbar de congelado** (fixture tem timestamp velho - comportamento esperado), feed com 8 eventos (mais recente primeiro: os dois BLOQUEIA no topo, com fundo vermelho).

- [ ] **Step 5: Commit**

```bash
git add tools/viz/index.html
git commit -m "feat(viz): header com custo/frescor + feed de eventos"
```

---

### Task 4: Viewer - poll ao vivo + simulador

**Files:**
- Modify: `tools/viz/index.html` (poll no `App`)
- Create: `tools/viz/demo/simular.sh`

**Interfaces:**
- Consumes: `Header`/`Feed`/`buildGraph` das Tasks 2-3.
- Produces: poll de 1s com `ultimoOk` real; `simular.sh` escreve `tools/viz/demo/sim/estado.json` (pasta gitignorada na Task 1) e o board acompanha em `?filme=tools/viz/demo/sim`.

- [ ] **Step 1: Trocar o efeito de carga única por poll** - substituir o `React.useEffect` e o `Header` fixo no `App` por:

```js
  const [ultimoOk, setUltimoOk] = React.useState(0);
  React.useEffect(() => {
    if (!filme) return;
    let vivo = true;
    const tick = () =>
      fetch("/" + filme + "/estado.json?t=" + Date.now())
        .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(j => { if (vivo) { setEstado(j); setUltimoOk(Date.now()); } })
        .catch(() => {});   // JSON parcial/server fora: mantém último estado bom
    tick();
    const id = setInterval(tick, 1000);
    return () => { vivo = false; clearInterval(id); };
  }, [filme]);
```
E no `return`: `h(Header, { estado, ultimoOk })`.

- [ ] **Step 2: Escrever `tools/viz/demo/simular.sh`**

```bash
#!/bin/bash
# Simula uma rodada ao vivo p/ testar o board sem gastar créditos.
# Uso: bash tools/viz/demo/simular.sh   (com serve.sh rodando)
# Abra: http://localhost:8123/tools/viz/?filme=tools/viz/demo/sim
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p sim
python3 - <<'PY'
import json, time, datetime, pathlib
def agora(): return datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds").replace("+00:00","Z")
e = {"filme":"sim","atualizado_em":agora(),"fase_atual":"1",
     "fases":{f:"pendente" for f in ["1","1.5","2","3","4","5","6","7","8","9","10"]},
     "shots":[],"eventos":[],"custos":{"gasto_cr":0,"teto_cr":300}}
def grava():
    e["atualizado_em"]=agora()
    pathlib.Path("sim/estado.json").write_text(json.dumps(e,ensure_ascii=False,indent=1))
def ev(tipo,ref,msg,nivel="info",custo=None):
    d={"t":agora(),"tipo":tipo,"ref":ref,"msg":msg,"nivel":nivel}
    if custo: d["custo_cr"]=custo
    e["eventos"].append(d)
passos = [
  lambda: (e["fases"].update({"1":"em_andamento"}), ev("fase","1","Brief iniciado")),
  lambda: (e["fases"].update({"1":"concluida","1.5":"pulada","2":"em_andamento"}), ev("fase","2","Setup + preflight")),
  lambda: (e["fases"].update({"2":"concluida","3":"em_andamento"}),
           e["shots"].append({"id":"A1","tipo":"ancora","fase":"3","versao":1,"status":"gerando","custo_cr":2.0,"job_id":"j1","arquivo":None}),
           ev("job","A1","nano_banana_pro 2k",custo=2.0)),
  lambda: (e["shots"][0].update({"status":"aprovado"}), e["custos"].update({"gasto_cr":2.0}), ev("qc","A1","bordas limpas, aprovado")),
  lambda: (e["fases"].update({"3":"gate_usuario"}), ev("gate","3","Âncoras aguardando o usuário","alerta")),
  lambda: (e["fases"].update({"3":"concluida","4":"concluida","5":"em_andamento"}),
           e["shots"].append({"id":"S2_wow","tipo":"take","fase":"5","versao":1,"status":"gerando","custo_cr":17.5,"job_id":"j2","arquivo":None}),
           ev("job","S2_wow","seedance fast 5s",custo=17.5)),
  lambda: (e["shots"][1].update({"status":"em_qc"}), e["fases"].update({"5":"validando"}), ev("veredito","S2_wow","validador rodando")),
  lambda: (ev("veredito","S2_wow","BLOQUEIA: objeto não-diegético na borda","erro"),),
  lambda: (e["shots"][1].update({"status":"gerando","versao":2}), ev("retake","S2_wow","v1 → v2: still corrigido na raiz","alerta")),
  lambda: (e["shots"][1].update({"status":"aprovado"}), e["custos"].update({"gasto_cr":37.0}), ev("veredito","S2_wow","APROVADO")),
  lambda: (e["fases"].update({"5":"concluida","6":"em_andamento"}), ev("fase","6","Produção em lote")),
]
grava(); time.sleep(2)
for p in passos: p(); grava(); print("passo:", e["eventos"][-1]["msg"]); time.sleep(2)
print("simulação encerrada - board deve congelar em 3 min (banner âmbar)")
PY
```

- [ ] **Step 3: Testar ao vivo (Playwright)** - com o serve.sh rodando:
1. `browser_navigate` → `.../tools/viz/?filme=tools/viz/demo/sim` (antes de rodar o simulador: banner vermelho de sem conexão com o arquivo? Não - fetch 404 mantém "Carregando"; ok).
2. Rodar `bash tools/viz/demo/simular.sh` em background.
3. `browser_wait_for` texto `S2_wow` (aparece no meio da simulação).
4. Screenshot durante o BLOQUEIA: S2_wow vermelho + evento vermelho no topo do feed; depois do fim: S2_wow verde v2, custo `37 / 300 cr`.
5. Matar o serve.sh e conferir que o banner vermelho "Sem conexão" aparece em ~5s; religar e conferir que some.

- [ ] **Step 4: Conferir critério de aceite 1 (latência ≤ 2s)** - com poll de 1s a atualização aparece no tick seguinte à escrita; confirmado visualmente no passo anterior (eventos surgem a cada ~2s do simulador).

- [ ] **Step 5: Commit**

```bash
git add tools/viz/index.html tools/viz/demo/simular.sh
git commit -m "feat(viz): poll ao vivo + simulador de rodada sem créditos"
```

---

### Task 5: Integração no processo (skill, validador, ESTRUTURA)

**Files:**
- Modify: `.claude/skills/novo-video/SKILL.md` (fase 2 + seção transversal nova)
- Modify: `.claude/agents/validador-gate.md` (item transversal de checklist)
- Modify: `docs/ESTRUTURA.md` (linha na tabela de peças + fluxo de dados)

**Interfaces:**
- Consumes: contrato do estado.json (spec) e URLs da Task 1.
- Produces: processo documentado; nenhum código depende desta task.

- [ ] **Step 1: SKILL.md - bullet na fase 2** (Setup do projeto), após o bullet do `.gitignore`:

```markdown
- Criar `<slug>/estado.json` inicial (contrato em `docs/PROPOSTA-visualizador-workflow.md`)
  e subir o board em background: `bash tools/viz/serve.sh <slug>` - mostrar a URL ao
  usuário para ele deixar aberta ao lado do terminal.
```

- [ ] **Step 2: SKILL.md - seção transversal** logo após a seção "Validação de gate (transversal, OBRIGATÓRIA)":

```markdown
## Board ao vivo (transversal)

O diretor mantém `<slug>/estado.json` (viewer em `tools/viz/`): TODA transição é
registrada NA HORA - fase iniciada/concluída, gate aberto/passado, job lançado (com
o custo do preflight), veredito do validador, retake (causa no evento),
aprovado/descartado. Nunca atualizar em lote no fim da fase: board congelado é bug
de processo, e o validador confere frescor/coerência em todo gate.
```

- [ ] **Step 3: validador-gate.md - item transversal**, no fim da seção "Checklists por tipo de gate":

```markdown
**TRANSVERSAL (todo gate):** `<slug>/estado.json` está fresco (`atualizado_em`
condizente com o material deste gate) e coerente com o disco? Spot-check: 1 shot
`aprovado` do JSON existe na pasta principal correspondente (`02_ancoras/` ou
`03_takes/`); a fase deste gate está `validando` no JSON.
```

- [ ] **Step 4: ESTRUTURA.md** - (a) linha na tabela "As peças":

```markdown
| `tools/viz/` | board ao vivo do workflow (xyflow sem build): serve.sh + viewer que lê `<slug>/estado.json` escrito pelo diretor a cada transição |
```

(b) subseção nova antes do "Fluxograma do workflow v2":

```markdown
## Board ao vivo

`diretor → <slug>/estado.json → tools/viz/serve.sh (http.server) → browser (poll 1s)`.
Contrato do JSON e decisões: `docs/PROPOSTA-visualizador-workflow.md`. Demo sem
créditos: `bash tools/viz/serve.sh tools/viz/demo` (estática) ou
`bash tools/viz/demo/simular.sh` (rodada simulada em `?filme=tools/viz/demo/sim`).
```

- [ ] **Step 5: Conferir consistência e commitar** - grep para garantir que os caminhos citados existem:

```bash
ls tools/viz/serve.sh tools/viz/demo/estado.json tools/viz/demo/simular.sh
git add .claude/skills/novo-video/SKILL.md .claude/agents/validador-gate.md docs/ESTRUTURA.md
git commit -m "docs: board ao vivo integrado ao processo (skill fase 2 + transversal, validador, ESTRUTURA)"
```

---

### Task 6: Verificação final + PR

**Files:**
- Nenhum novo; push da branch e PR.

- [ ] **Step 1: Rodar a bateria de aceite completa** (as 4 do spec, em sequência):
1. serve.sh + demo golden: board renderiza, console limpo, **banner âmbar presente** (timestamp velho da fixture).
2. Evento `nivel: erro` pinta S4 e fase 8 de vermelho e aparece no feed.
3. Banner de frescor comprovado no item 1; banner de desconexão comprovado matando o server.
4. simular.sh: rodada inteira animando com latência visível ≤ 2s por escrita.
Guardar 2 screenshots (golden + simulação no BLOQUEIA) para o corpo da PR.

- [ ] **Step 2: Push e PR**

```bash
git push -u origin feat/visualizador-workflow
gh pr create --title "feat: board ao vivo do workflow (tools/viz, xyflow sem build)" \
  --body "Implementa docs/PROPOSTA-visualizador-workflow.md (spec aprovado, PR #21): viewer xyflow de arquivo único + serve.sh + fixture golden + simulador + integração no processo (skill/validador/ESTRUTURA). Screenshots da verificação visual no comentário. 🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

- [ ] **Step 3: Revisar o diff da PR** (`gh pr diff`) e anexar as screenshots num comentário; merge SÓ após revisão do usuário; deletar a branch após o merge.

---

## Self-review (feito na escrita do plano)

- **Cobertura do spec:** contrato → Task 1 (fixture normativa); viewer/layout/estados → Task 2; header/frescor/feed → Task 3; poll/degradação/simulador → Task 4; integração processo → Task 5; critérios de aceite → Task 6. Fora de escopo do spec (hook, tema claro, replay) fora do plano. ✓
- **Placeholders:** nenhum TBD/TODO; todo step de código tem o código. ✓
- **Consistência de tipos/nomes:** `buildGraph`, `Header({estado, ultimoOk})`, `Feed({eventos})`, `FRESCOR_MS`, caminho `tools/viz/demo/sim/estado.json` e URLs `?filme=` batem entre as tasks; statuses idênticos aos do spec (fixture validada por assert na Task 1). ✓
- **Desvio consciente do spec:** a fixture chama `estado.json` dentro de `demo/` (não `estado_demo.json`) para o viewer tratar a demo como um filme comum, sem case especial de caminho. Registrado aqui para o revisor.
