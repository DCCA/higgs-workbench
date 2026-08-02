// Cena: Timeline. Espinha vertical em giz (TracoGiz orientacao="v") com
// pontos riscados a giz; a data também é giz (ao lado do ponto, não dentro do
// cartão); só o texto do evento vive numa etiqueta de papel enxuta (idioma da
// Abertura: cartão hugging o próprio conteúdo, não uma barra larga). Ver
// contrato de direção em ../theme.ts e primitivas em ../chalk.tsx.
import React from "react";
import { random, useVideoConfig } from "remotion";
import { z } from "zod";
import { tema } from "../theme";
import { Etiqueta, Quadro, TRACO_CROSS, TracoGiz, estiloGiz, useEntradaGiz } from "../chalk";

export const timelineSchema = z.object({
  eventos: z.array(z.object({ data: z.string(), texto: z.string() })).min(2).max(6),
  duracaoSeg: z.number().min(3).max(12).default(6),
});

type TimelineProps = z.infer<typeof timelineSchema>;

// Geometria de layout (não é "valor visual" do tema): altura de cada linha
// do evento. A coluna do ponto/espinha usa a largura do próprio TracoGiz
// (TRACO_CROSS) - ponto e espinha ficam centrados no mesmo eixo por
// construção, sem offset manual.
const ALTURA_LINHA = 220;
const COL_ESPINHA = TRACO_CROSS;
const RAIO_PONTO = 11;

/** Círculo riscado a giz: aproximação por 4 arcos de bezier com jitter por
 * ponto (mesmo idioma de TracoGiz) - marcador riscado, não bolinha cheia. */
const construirCirculoGiz = (seed: string, r: number) => {
  const k = r * 0.5523;
  const j = (n: number) => (random(`${seed}-${n}`) - 0.5) * 4;
  const ang = (a: number, n: number) => {
    const rr = r + j(n);
    return { x: Math.cos(a) * rr, y: Math.sin(a) * rr };
  };
  const top = ang(-Math.PI / 2, 0);
  const right = ang(0, 1);
  const bottom = ang(Math.PI / 2, 2);
  const left = ang(Math.PI, 3);
  return (
    `M ${top.x} ${top.y} ` +
    `C ${top.x + k} ${top.y} ${right.x} ${right.y - k} ${right.x} ${right.y} ` +
    `C ${right.x} ${right.y + k} ${bottom.x + k} ${bottom.y} ${bottom.x} ${bottom.y} ` +
    `C ${bottom.x - k} ${bottom.y} ${left.x} ${left.y + k} ${left.x} ${left.y} ` +
    `C ${left.x} ${left.y - k} ${top.x - k} ${top.y} ${top.x} ${top.y} Z`
  );
};

const PontoGiz: React.FC<{ seed: string; delayFrames: number }> = ({ seed, delayFrames }) => {
  const entrada = useEntradaGiz(delayFrames);
  const box = RAIO_PONTO * 2 + 8;
  return (
    <svg
      width={box}
      height={box}
      style={{ overflow: "visible", opacity: entrada.opacity, transform: `scale(${entrada.scale})` }}
    >
      <path
        d={construirCirculoGiz(seed, RAIO_PONTO)}
        transform={`translate(${box / 2},${box / 2})`}
        fill="none"
        stroke={tema.cor.destaque}
        strokeWidth={tema.traco.fino}
        strokeLinecap="round"
      />
    </svg>
  );
};

const EventoLinha: React.FC<{
  evento: { data: string; texto: string };
  indice: number;
  delayFrames: number;
}> = ({ evento, indice, delayFrames }) => {
  const entradaData = useEntradaGiz(delayFrames);
  return (
    <div
      style={{
        position: "absolute",
        top: indice * ALTURA_LINHA,
        left: 0,
        width: "100%",
        height: ALTURA_LINHA,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ width: COL_ESPINHA, display: "flex", justifyContent: "center", flexShrink: 0 }}>
        <PontoGiz seed={`timeline-ponto-${indice}`} delayFrames={delayFrames} />
      </div>
      {/* data em giz ao lado do ponto - não é conteúdo de etiqueta */}
      <div
        style={{
          marginLeft: tema.espaco.gap,
          flexShrink: 0,
          opacity: entradaData.opacity,
          transform: `scale(${entradaData.scale})`,
          ...estiloGiz(tema.cor.apoio),
          fontSize: tema.escala.legenda,
        }}
      >
        {evento.data}
      </div>
      <div style={{ marginLeft: tema.espaco.gap }}>
        <Etiqueta
          seed={`timeline-etiqueta-${indice}`}
          delayFrames={delayFrames}
          style={{ width: "fit-content", maxWidth: 640 }}
        >
          <div style={{ fontFamily: tema.tipo.corpo, fontWeight: 700, fontSize: tema.escala.corpo, lineHeight: 1.25 }}>
            {evento.texto}
          </div>
        </Etiqueta>
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ eventos }) => {
  const { durationInFrames } = useVideoConfig();
  const contentHeight = eventos.length * ALTURA_LINHA;

  // Espinha desenha primeiro; eventos escalonam depois, com passo que
  // encolhe se a duração for curta demais para o ritmo ideal do kit.
  const passoIdeal = tema.ritmo.entradaFrames + tema.ritmo.assentamentoFrames;
  const inicioCascata = tema.ritmo.entradaFrames;
  const janela = Math.max(0, durationInFrames - 2 * tema.ritmo.entradaFrames);
  const passo = eventos.length > 1 ? Math.min(passoIdeal, janela / (eventos.length - 1)) : 0;
  const delayEvento = (indice: number) => Math.round(inicioCascata + indice * passo);

  const espinhaAltura = (eventos.length - 1) * ALTURA_LINHA;
  const espinhaTopo = ALTURA_LINHA / 2;

  return (
    <Quadro poeiraSeed="timeline-poeira" poeiraCount={6}>
      <div style={{ position: "relative", width: "100%", height: contentHeight }}>
        <div style={{ position: "absolute", left: 0, top: espinhaTopo }}>
          <TracoGiz width={espinhaAltura} seed="timeline-espinha" color={tema.cor.texto} orientacao="v" />
        </div>
        {eventos.map((evento, indice) => (
          <EventoLinha key={indice} evento={evento} indice={indice} delayFrames={delayEvento(indice)} />
        ))}
      </div>
    </Quadro>
  );
};
