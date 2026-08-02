// Cena: Legendas. Fundo TRANSPARENTE (overlay sobre o corte já montado) -
// nenhum Quadro, nenhum AbsoluteFill com backgroundColor, nenhuma Poeira
// (aquilo é textura de CENA, isto é overlay). Cada segmento é uma etiqueta de
// papel (legenda = material que LÊ; giz é reservado às cenas-diagrama) presa
// no terço inferior, dentro da margem de segurança do kit. Entrada usa o
// próprio pino+fade da Etiqueta (delayFrames=t0 em frames); saída é um fade
// autoral desta cena com a mesma janela (tema.ritmo.entradaFrames), já que
// Etiqueta não tem saída embutida.
// NOTA: "sem exit, transição é do ffmpeg" (plano/regra do kit) vale para a
// CENA/take inteiro - o fade de saída AQUI é animação INTRA-cena de um
// elemento (o segmento), não uma transição de cena; hard-cut de legenda seria
// pior prática de legendagem. Não copiar essa exceção para exits de cena.
// Ver contrato de direção em ../theme.ts e primitivas em ../chalk.tsx.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { tema } from "../theme";
import { Etiqueta } from "../chalk";

export const legendasSchema = z.object({
  segmentos: z
    .array(
      z.object({
        t0: z.number().min(0),
        t1: z.number().positive(),
        texto: z.string().min(1),
      }),
    )
    .min(1),
});

export const Legendas: React.FC<z.infer<typeof legendasSchema>> = ({ segmentos }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      {segmentos.map((segmento, indice) => {
        const t0Frame = segmento.t0 * fps;
        const t1Frame = segmento.t1 * fps;
        const fadeSaida = interpolate(frame, [t1Frame - tema.ritmo.entradaFrames, t1Frame], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={indice}
            style={{
              position: "absolute",
              left: tema.espaco.margem,
              right: tema.espaco.margem,
              bottom: tema.espaco.margem,
              display: "flex",
              justifyContent: "center",
              opacity: fadeSaida,
            }}
          >
            <Etiqueta seed={`legenda-${indice}`} delayFrames={t0Frame} style={{ maxWidth: 880 }}>
              <span
                style={{
                  fontFamily: tema.tipo.corpo,
                  fontWeight: 700,
                  fontSize: tema.escala.corpo,
                  lineHeight: 1.3,
                }}
              >
                {segmento.texto}
              </span>
            </Etiqueta>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
