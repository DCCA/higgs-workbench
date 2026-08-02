// Cena: FluxoDiagrama. Grafo estático (sem interação) via @xyflow/react: nós
// são caixas de giz (traço + rótulo, destaque puxa tema.cor.destaque), arestas
// são traços de giz com seta. Layout vertical por índice do array (sem
// dagre), posições calculadas para já caber no quadro. Ver contrato de
// direção em ../theme.ts e primitivas em ../chalk.tsx.
//
// GOTCHA: `fitView` do xyflow roda UMA VEZ no mount inicial e nunca re-executa
// depois - não é um auto-fit contínuo. A medição do DOM em si funciona (o
// ResizeObserver mede certo), mas roda DEPOIS desse fitView inicial; no
// still/render headless do Remotion não existe um "segundo frame" para o
// fitView reagir à medição e reenquadrar. Layout determinístico (posição por
// índice já dimensionada para o quadro) é mais correto aqui: todo frame do
// Remotion precisa nascer certo de primeira, sem "settle".
import React from "react";
import "@xyflow/react/dist/style.css";
import {
  BaseEdge,
  getStraightPath,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { tema } from "../theme";
import { Etiqueta, Quadro, estiloGiz, useEntradaGiz } from "../chalk";

export const fluxoSchema = z.object({
  nos: z
    .array(
      z.object({
        id: z.string(),
        rotulo: z.string(),
        destaque: z.boolean().default(false),
      }),
    )
    .min(2)
    .max(8),
  arestas: z
    .array(
      z.object({
        de: z.string(),
        para: z.string(),
        rotulo: z.string().optional(),
      }),
    )
    .min(1),
  duracaoSeg: z.number().min(3).max(12).default(6),
});

type FluxoProps = z.infer<typeof fluxoSchema>;

// Geometria da caixa (não é "valor visual" do tema - é layout, como os
// widths passados a TracoGiz em Abertura/StatCard).
const LARGURA_NO = 720;
const ALTURA_NO = 150;

type NoData = { rotulo: string; destaque: boolean; delayFrames: number };

const handleInvisivel: React.CSSProperties = { opacity: 0, width: 1, height: 1 };

const NoQuadro: React.FC<NodeProps<Node<NoData>>> = ({ data }) => {
  const cor = data.destaque ? tema.cor.destaque : tema.cor.texto;
  const entrada = useEntradaGiz(data.delayFrames);
  return (
    <div
      style={{
        width: LARGURA_NO,
        height: ALTURA_NO,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 32px",
        border: `3px solid ${cor}`,
        borderRadius: 10,
        backgroundColor: `${tema.cor.texto}0d`,
        opacity: entrada.opacity,
        transform: `scale(${entrada.scale})`,
      }}
    >
      <Handle type="target" position={Position.Top} style={handleInvisivel} isConnectable={false} />
      <span style={{ ...estiloGiz(cor), fontSize: tema.escala.corpo, lineHeight: 1.15 }}>{data.rotulo}</span>
      <Handle type="source" position={Position.Bottom} style={handleInvisivel} isConnectable={false} />
    </div>
  );
};

type ArestaData = { rotulo?: string; delayFrames: number };

const ArestaGiz: React.FC<EdgeProps<Edge<ArestaData>>> = ({ sourceX, sourceY, targetX, targetY, data, markerEnd }) => {
  const frame = useCurrentFrame();
  const delay = data?.delayFrames ?? 0;
  const local = Math.max(0, frame - delay);
  const drawn = interpolate(local, [0, tema.ritmo.entradaFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const [path] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  const length = Math.hypot(targetX - sourceX, targetY - sourceY) + 40;
  // a seta só aparece quando a linha já chegou perto do destino - senão ela
  // "flutua" pronta no ponto final antes do traço tê-lo alcançado.
  const setaPronta = drawn > 0.95;

  return (
    <>
      <BaseEdge
        path={path}
        markerEnd={setaPronta ? markerEnd : undefined}
        style={{
          stroke: tema.cor.texto,
          strokeWidth: 4,
          opacity: drawn,
          strokeDasharray: length,
          strokeDashoffset: length * (1 - drawn),
        }}
      />
      {data?.rotulo ? (
        <foreignObject
          x={(sourceX + targetX) / 2 - 100}
          y={(sourceY + targetY) / 2 - 24}
          width={200}
          height={48}
          style={{ overflow: "visible", opacity: drawn }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Etiqueta seed={`fluxo-rotulo-${data.rotulo}`} delayFrames={delay} style={{ padding: tema.etiqueta.paddingCompacto }}>
              <span style={{ fontFamily: tema.tipo.corpo, fontWeight: 700, fontSize: tema.escala.micro }}>
                {data.rotulo}
              </span>
            </Etiqueta>
          </div>
        </foreignObject>
      ) : null}
    </>
  );
};

const nodeTypes = { no: NoQuadro };
const edgeTypes = { aresta: ArestaGiz };

export const FluxoDiagrama: React.FC<FluxoProps> = ({ nos, arestas }) => {
  const { width, height, durationInFrames } = useVideoConfig();
  const largura = width - tema.espaco.margem * 2;
  const altura = height - tema.espaco.margem * 2;

  // Passo entre entradas escalona por índice, mas encolhe se a duração for
  // curta demais para acomodar até 8 nós no ritmo ideal do kit (mín. 3s).
  // -2*entradaFrames (não -1x): a última ARESTA só começa a desenhar depois
  // que seu nó de origem termina de entrar (+entradaFrames) e ainda precisa
  // de mais entradaFrames pra se desenhar - duas janelas de entrada, não uma.
  const passoIdeal = tema.ritmo.entradaFrames + tema.ritmo.assentamentoFrames;
  const janela = Math.max(0, durationInFrames - 2 * tema.ritmo.entradaFrames);
  const passo = nos.length > 1 ? Math.min(passoIdeal, janela / (nos.length - 1)) : 0;
  const delayNo = (indice: number) => Math.round(indice * passo);

  const indicePorId = new Map(nos.map((no, indice) => [no.id, indice]));
  // Espaçamento entre nós nunca passa de 1.6x a altura da caixa (senão 2 nós
  // viram uma seta vazia gigante); o bloco resultante fica centralizado no
  // quadro em vez de esticado ponta a ponta.
  const step = Math.min(altura / nos.length, ALTURA_NO * 1.6);
  const blocoAltura = step * nos.length;
  const topoBloco = (altura - blocoAltura) / 2;

  const nodes: Array<Node<NoData>> = nos.map((no, indice) => ({
    id: no.id,
    type: "no",
    position: { x: largura / 2, y: topoBloco + step * indice + step / 2 },
    width: LARGURA_NO,
    height: ALTURA_NO,
    data: { rotulo: no.rotulo, destaque: no.destaque, delayFrames: delayNo(indice) },
    draggable: false,
    selectable: false,
  }));

  const edges: Array<Edge<ArestaData>> = arestas.map((aresta, indice) => {
    const origemIndice = indicePorId.get(aresta.de) ?? 0;
    return {
      id: `${aresta.de}-${aresta.para}-${indice}`,
      source: aresta.de,
      target: aresta.para,
      type: "aresta",
      data: { rotulo: aresta.rotulo, delayFrames: delayNo(origemIndice) + tema.ritmo.entradaFrames },
      markerEnd: { type: MarkerType.ArrowClosed, color: tema.cor.texto, width: 20, height: 20 },
    };
  });

  return (
    <Quadro poeiraSeed="fluxo-poeira" poeiraCount={6}>
      <div style={{ position: "relative", width: largura, height: altura }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodeOrigin={[0.5, 0.5]}
          width={largura}
          height={altura}
          fitView={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          proOptions={{ hideAttribution: true }}
          style={{ background: "transparent" }}
        />
      </div>
    </Quadro>
  );
};
