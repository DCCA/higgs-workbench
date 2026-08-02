// Cena: StatCard. Número grande em giz (chalk desenha números grandes) com
// traço de giz por baixo, label + contexto opcional em etiqueta única. Ver
// contrato de direção em ../theme.ts e primitivas em ../chalk.tsx.
import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { tema } from "../theme";
import { Etiqueta, Poeira, TracoGiz, estiloGiz, useEntradaGiz } from "../chalk";

export const statCardSchema = z.object({
  valor: z.string().min(1),
  label: z.string().min(1),
  contexto: z.string().optional(),
  duracaoSeg: z.number().min(2).max(10).default(4),
});

const ATRASO_VALOR = 4;
const ATRASO_TRACO = ATRASO_VALOR + tema.ritmo.entradaFrames;
const ATRASO_LABEL = ATRASO_TRACO + Math.round(tema.ritmo.entradaFrames * 0.6);

export const StatCard: React.FC<z.infer<typeof statCardSchema>> = ({ valor, label, contexto }) => {
  const valor_ = useEntradaGiz(ATRASO_VALOR);

  return (
    <AbsoluteFill style={{ backgroundColor: tema.cor.fundo }}>
      <Poeira seed="statcard-poeira" count={6} />
      <AbsoluteFill
        style={{
          padding: tema.espaco.margem,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: tema.espaco.gap,
          textAlign: "center",
        }}
      >
        <div style={{ opacity: valor_.opacity, transform: `scale(${valor_.scale})` }}>
          <div style={{ ...estiloGiz(tema.cor.destaque), fontSize: tema.escala.gigante, lineHeight: 1 }}>{valor}</div>
          <TracoGiz
            width={360}
            seed="statcard-traco"
            delayFrames={ATRASO_TRACO}
            color={tema.cor.destaque}
            align="center"
          />
        </div>

        <Etiqueta seed="statcard-label" delayFrames={ATRASO_LABEL} style={{ maxWidth: 760 }}>
          <div style={{ fontFamily: tema.tipo.corpo, fontWeight: 700, fontSize: tema.escala.corpo, lineHeight: 1.3 }}>
            {label}
          </div>
          {contexto ? (
            <div style={{ fontFamily: tema.tipo.numeros, fontSize: tema.escala.micro, marginTop: 12, opacity: 0.7 }}>
              {contexto}
            </div>
          ) : null}
        </Etiqueta>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
