// Cena: GsBeat. Cabeçalho de objeto-fio (Relogio) + título Manrope grande
// (destaque em acento) + linha de apoio mono + rodapé de atribuição. Cena-base
// do ESTILO-ground-station - ver contrato de direção em ../tema.ts e
// primitivas em ../papel.tsx.
import React from "react";
import { z } from "zod";
import { tema } from "../tema";
import { Papel, Relogio, Rodape, destacar, useEntradaPapel } from "../papel";

export const gsBeatSchema = z
  .object({
    hora: z.string().min(1),
    progresso: z.number().min(0).max(1),
    titulo: z.string().min(1),
    destaque: z.string().optional(),
    apoio: z.string().optional(),
    fonte: z.string().optional(),
    duracaoSeg: z.number().min(2).max(10).default(4),
  })
  .refine((p) => !p.destaque || p.titulo.includes(p.destaque), {
    message: "destaque precisa ser substring de titulo",
    path: ["destaque"],
  });

type GsBeatProps = z.infer<typeof gsBeatSchema>;

const ATRASO_TITULO = 4;
const ATRASO_APOIO = ATRASO_TITULO + tema.ritmo.entradaFrames;
const ATRASO_RODAPE = ATRASO_APOIO + Math.round(tema.ritmo.entradaFrames * 0.6);

export const GsBeat: React.FC<GsBeatProps> = ({ hora, progresso, titulo, destaque, apoio, fonte }) => {
  const titulo_ = useEntradaPapel(ATRASO_TITULO);
  const apoio_ = useEntradaPapel(ATRASO_APOIO);

  return (
    <Papel rodape={fonte ? <Rodape fonte={fonte} delayFrames={ATRASO_RODAPE} /> : undefined}>
      <Relogio hora={hora} progresso={progresso} />

      <div style={{ opacity: titulo_.opacity, transform: `translateY(${titulo_.translateY}px)` }}>
        <h1
          style={{
            fontFamily: tema.tipo.display,
            fontWeight: 800,
            fontSize: tema.escala.display,
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            color: tema.cor.tinta,
            margin: 0,
          }}
        >
          {destacar(titulo, destaque)}
        </h1>
      </div>

      {apoio ? (
        <div
          style={{
            opacity: apoio_.opacity,
            transform: `translateY(${apoio_.translateY}px)`,
            fontFamily: tema.tipo.mono,
            fontWeight: 500,
            fontSize: tema.escala.corpo,
            lineHeight: 1.4,
            letterSpacing: "-0.02em",
            color: tema.cor.suave,
            maxWidth: 820,
          }}
        >
          {apoio}
        </div>
      ) : null}
    </Papel>
  );
};
