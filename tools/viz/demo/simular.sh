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
    e["fase_atual"] = next((f for f, s in e["fases"].items()
                            if s in ("em_andamento", "validando", "gate_usuario")), e["fase_atual"])
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
