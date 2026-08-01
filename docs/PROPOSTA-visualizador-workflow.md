# Proposta: visualizador de workflow (board ao vivo do /novo-video)

Data: 2026-08-01. Status: spec aprovado em conversa (granularidade, veículo e
arquitetura decididos com o usuário); aguardando revisão final deste texto via PR.

## Problema

Durante uma rodada do `/novo-video` o estado vive no terminal e na cabeça do diretor.
O usuário quer feedback visual contínuo: em que fase estamos, o que está gerando,
o que o validador bloqueou, quanto já foi gasto - sem precisar reler o transcript.

## Decisões já tomadas (com o usuário)

| Decisão | Escolha | Alternativas descartadas |
|---|---|---|
| Granularidade | **Board por shot**: fases do fluxograma v2 + um nó por âncora/take com status e custo | só fases macro; fases + feed sem nós de shot |
| Veículo | **HTML único + CDN, sem build** (`tools/viz/`), servido por `python3 -m http.server` | app vite/React com node_modules; Artifact do Claude |
| Fonte do estado | **Abordagem A**: `estado.json` escrito pelo diretor a cada transição, conferido pelo validador-gate | hooks + derivação do disco (sem semântica de fase/gate); híbrido com hook (upgrade futuro) |

## Arquitetura

```
diretor (rodando /novo-video)
  └─ escreve <slug>/estado.json a cada transição
       └─ tools/viz/serve.sh <slug>  (http.server na raiz do repo, porta 8123)
            └─ browser: http://localhost:8123/tools/viz/?filme=<slug>
                 (poll do JSON a cada 1s com cache-buster ?t=)
```

Uma direção só, sem backend, sem websocket. A página e o JSON saem do mesmo server
(mesma origem, sem CORS). O arquivo fica ao lado da `BIBLIA.md`, gitignorado com a
pasta do filme, e permanece após a rodada como histórico (artefato da fase 10).

## `estado.json` (contrato)

```json
{
  "filme": "evals",
  "atualizado_em": "2026-08-01T14:32:10Z",
  "fase_atual": "6",
  "fases": { "1": "concluida", "1.5": "pulada", "2": "concluida",
             "5": "gate_usuario", "6": "em_andamento", "7": "pendente" },
  "shots": [
    { "id": "S2_wow", "tipo": "take", "fase": "5", "versao": 2,
      "status": "aprovado", "custo_cr": 45.0, "job_id": "abc123",
      "arquivo": "03_takes/take_S2_wow_v2.mp4" }
  ],
  "eventos": [
    { "t": "2026-08-01T14:31:55Z", "tipo": "veredito", "ref": "S4",
      "msg": "BLOQUEIA: faux-texto na borda do mostrador", "nivel": "erro" }
  ],
  "custos": { "gasto_cr": 123.5, "teto_cr": 300 }
}
```

- **fases**: status por nó do fluxograma v2 -
  `pendente | em_andamento | validando | gate_usuario | bloqueada | concluida | pulada`.
- **shots**: âncoras (surgem na fase 3) e takes (surgem na decupagem da fase 4);
  `status` é um de `planejado | gerando | em_qc | aprovado | descartado`. Retake NÃO
  é status: é um evento que incrementa `versao` e devolve o shot a `gerando` (a causa
  fica no evento). Espelha a convenção de pastas (aprovado = pasta principal,
  descartado = `_descartados/`). No viewer, shots usam o mesmo mapa de cores das
  fases (planejado=pendente, gerando=em_andamento, em_qc=validando).
- **eventos**: append-only; alimenta o feed lateral. `tipo`:
  `fase | gate | job | veredito | retake | qc | audio | erro`; `nivel`:
  `info | alerta | erro` (erro pinta o nó referido de vermelho). Áudio (candidatas
  de VO, trilha) NÃO vira shot - entra só como evento.
- **custos**: gasto acumulado × teto do preflight (barra no header).
- Escrita: sobrescrever o arquivo inteiro (é pequeno). Não é atômico: o viewer
  tolera parse error mantendo o último estado bom e tenta no próximo poll.

## Viewer (`tools/viz/index.html`)

Arquivo único. React + `@xyflow/react` + CSS do xyflow via CDN (esm.sh) com
importmap; sem JSX/build (h() ou htm via CDN). Precisa de internet na primeira
carga - limitação aceita na decisão de veículo.

- **Layout**: espinha vertical fixa com os nós das fases (constante em JS,
  espelhando o fluxograma v2 de `docs/ESTRUTURA.md`; 7b/8b são badge dentro do nó
  da fase, não nós próprios). Shots empilham em coluna à direita da sua fase, com
  aresta fase→shot. Layout por constantes (sem dagre); pan/zoom padrão do xyflow.
- **Estados visuais**: pendente cinza; em_andamento azul pulsando (CSS); validando
  roxo; gate_usuario âmbar; bloqueada/erro vermelho; concluida/aprovado verde;
  pulada cinza tracejado; descartado riscado. Arestas do caminho ativo com
  `animated: true`. Nó de shot mostra id, versão (vN) e custo.
- **Painel direito**: feed de eventos (mais recente primeiro, badge por tipo,
  custo quando houver).
- **Header**: filme, fase atual, barra gasto/teto, e frescor ("atualizado há Xs");
  se `atualizado_em` > 3 min, banner âmbar de board possivelmente congelado - é o
  alarme contra o risco da abordagem A (diretor esquecer de atualizar).
- **Tema**: escuro fixo (ferramenta local de bancada; um tema só, de propósito).
- URL exige `?filme=<slug>` (o serve.sh imprime a URL completa).

## Integração no processo (mudanças em docs existentes)

1. **`.claude/skills/novo-video/SKILL.md`**
   - Fase 2 (setup): criar `estado.json` inicial, subir `tools/viz/serve.sh <slug>`
     em background e mostrar a URL ao usuário.
   - Cláusula transversal (junto da validação de gate): toda transição atualiza
     `estado.json` NA HORA - fase, gate, job lançado (com custo do preflight),
     veredito, retake/descartado/aprovado. Nunca em lote no fim da fase.
2. **`.claude/agents/validador-gate.md`**: item transversal de checklist -
   `estado.json` fresco (`atualizado_em` recente) e coerente com o disco
   (spot-check: shots `aprovado` existem na pasta principal correspondente).
3. **`docs/ESTRUTURA.md`**: linha de `tools/viz/` na tabela de peças + o fluxo de
   dados acima. **`docs/DECISOES.md`**: entrada com esta decisão (vai neste PR).
4. `lint_veredito.sh` não muda (lint é do veredito, não do estado).

## Erros e degradação

| Falha | Comportamento |
|---|---|
| JSON parcial/corrompido no poll | mantém último estado bom; tenta no próximo poll |
| server morto / fetch falha | banner de desconectado; continua tentando |
| diretor esqueceu de atualizar | banner de frescor (>3 min) + check do validador no gate |
| CDN fora do ar na 1ª carga | página não abre; limitação aceita do veículo sem build |

## Verificação (Definition of Done adaptado: repo sem suite de testes)

- `tools/viz/demo/estado_demo.json`: fixture que exercita TODOS os estados do
  contrato (cada status de fase e de shot, evento de cada nível) - dobra como
  exemplo normativo do schema.
- `tools/viz/demo/simular.sh`: loop que muta a fixture a cada ~2s (avança fases,
  lança jobs, dispara um BLOQUEIA) para ver a animação de ponta a ponta sem
  gastar créditos.
- Verificação visual obrigatória (screenshot do board com a fixture) antes do PR;
  depois, primeiro uso real na retomada do `evals`.

## Fora de escopo (upgrade paths anotados)

- Hook `PostToolUse` como rede de segurança para jobs (abordagem C) - só se a
  disciplina falhar na prática; o schema de eventos já aceita.
- Tema claro, multi-filme simultâneo, replay histórico da rodada.

## Critérios de aceite

1. Rodando `serve.sh evals` e abrindo a URL, o board reflete o `estado.json` em
   até 2s após qualquer escrita.
2. Um evento `nivel: erro` pinta o nó referido de vermelho e aparece no feed.
3. Board congelado (>3 min sem escrita) exibe o banner de frescor.
4. A fixture de demo renderiza todos os estados visuais sem erro no console.
