// Cena: Cartela. Card de encerramento: texto em giz display (fade+scale) com
// traço de giz por baixo, créditos em etiqueta - mesma disciplina da
// Abertura (cascata título -> traço -> etiqueta), mas centrada: é o quadro
// final, não a apresentação. Ver contrato de direção em ../theme.ts e
// primitivas em ../chalk.tsx.
import React from "react";
import { z } from "zod";
import { tema } from "../theme";
import { Etiqueta, Quadro, TracoGiz, estiloGiz, useEntradaGiz } from "../chalk";

export const cartelaSchema = z.object({
  texto: z.string().min(1),
  creditos: z.string().min(1),
  duracaoSeg: z.number().min(2).max(8).default(4),
});

const ATRASO_TEXTO = 6;
const ATRASO_TRACO = ATRASO_TEXTO + tema.ritmo.entradaFrames;
const ATRASO_CREDITOS = ATRASO_TRACO + Math.round(tema.ritmo.entradaFrames * 0.5);

export const Cartela: React.FC<z.infer<typeof cartelaSchema>> = ({ texto, creditos }) => {
  const texto_ = useEntradaGiz(ATRASO_TEXTO);

  return (
    <Quadro poeiraSeed="cartela-poeira" style={{ alignItems: "center", textAlign: "center" }}>
      <div style={{ opacity: texto_.opacity, transform: `scale(${texto_.scale})` }}>
        <h1
          style={{
            ...estiloGiz(tema.cor.texto),
            fontSize: tema.escala.display,
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {texto}
        </h1>
        <TracoGiz width={480} seed="cartela-traco" delayFrames={ATRASO_TRACO} color={tema.cor.destaque} align="center" />
      </div>

      <Etiqueta seed="cartela-creditos" delayFrames={ATRASO_CREDITOS}>
        <span style={{ fontFamily: tema.tipo.corpo, fontSize: tema.escala.legenda }}>{creditos}</span>
      </Etiqueta>
    </Quadro>
  );
};
