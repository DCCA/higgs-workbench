// Cena: Abertura. Kicker em etiqueta (pinada), título em giz (fade+scale) com
// traço de giz desenhando-se por baixo, data em etiqueta. Ver contrato de
// direção em ../theme.ts e primitivas em ../chalk.tsx.
import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { tema } from "../theme";
import { Etiqueta, Poeira, TracoGiz, estiloGiz, useEntradaGiz } from "../chalk";

export const aberturaSchema = z.object({
  titulo: z.string().min(1),
  kicker: z.string().min(1),
  data: z.string().min(1),
  duracaoSeg: z.number().min(2).max(10).default(4),
});

const ATRASO_TITULO = 6;
const ATRASO_TRACO = ATRASO_TITULO + tema.ritmo.entradaFrames;
const ATRASO_DATA = ATRASO_TRACO + Math.round(tema.ritmo.entradaFrames * 0.5);

export const Abertura: React.FC<z.infer<typeof aberturaSchema>> = ({ titulo, kicker, data }) => {
  const titulo_ = useEntradaGiz(ATRASO_TITULO);

  return (
    <AbsoluteFill style={{ backgroundColor: tema.cor.fundo }}>
      <Poeira seed="abertura-poeira" />
      <AbsoluteFill
        style={{
          padding: tema.espaco.margem,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: tema.espaco.gap,
        }}
      >
        <Etiqueta seed="abertura-kicker" style={{ alignSelf: "flex-start" }}>
          <span
            style={{
              fontFamily: tema.tipo.corpo,
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </span>
        </Etiqueta>

        <div style={{ opacity: titulo_.opacity, transform: `scale(${titulo_.scale})` }}>
          <h1
            style={{
              ...estiloGiz(tema.cor.texto),
              fontSize: 88,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {titulo}
          </h1>
          <TracoGiz width={480} seed="abertura-traco" delayFrames={ATRASO_TRACO} color={tema.cor.destaque} />
        </div>

        <Etiqueta seed="abertura-data" delayFrames={ATRASO_DATA} style={{ alignSelf: "flex-start" }}>
          <span style={{ fontFamily: tema.tipo.numeros, fontSize: 24 }}>{data}</span>
        </Etiqueta>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
