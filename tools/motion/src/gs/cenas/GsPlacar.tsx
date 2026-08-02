// Cena: GsPlacar. Cabeçalho de objeto-fio (Relogio) + linhas rótulo/valor,
// centralizadas verticalmente no espaço restante pela regra de composição de
// `Papel` (ver ../papel.tsx), cada uma com régua embaixo e stagger na entrada
// (mesmo idioma da Timeline do quadro-negro: cascata por índice). `zero:
// true` pinta o valor em acento - o valor já é escala.valorDado (>=24px),
// seguro em acento sobre o chão pela regra de cor de ../tema.ts. Linhas são o
// payoff do filme: rótulo em escala.rotuloDado, valor em escala.valorDado,
// padding generoso (tema.espaco.gap) - o bloco domina o quadro, não lê como
// legenda de rodapé. Ver contrato de direção em ../tema.ts.
import React from "react";
import { z } from "zod";
import { tema } from "../tema";
import { Papel, Relogio, Rodape, useEntradaPapel } from "../papel";

export const gsPlacarSchema = z.object({
  hora: z.string().min(1),
  progresso: z.number().min(0).max(1),
  linhas: z
    .array(
      z.object({
        rotulo: z.string().min(1),
        valor: z.string().min(1),
        zero: z.boolean().optional(),
      }),
    )
    .min(1)
    .max(4),
  fonte: z.string().optional(),
  duracaoSeg: z.number().min(2).max(10).default(4),
});

type GsPlacarProps = z.infer<typeof gsPlacarSchema>;

const INICIO_LINHAS = tema.ritmo.entradaFrames;
const PASSO_LINHA = Math.round(tema.ritmo.entradaFrames * 0.5);

const Linha: React.FC<{ rotulo: string; valor: string; zero?: boolean; delayFrames: number }> = ({
  rotulo,
  valor,
  zero,
  delayFrames,
}) => {
  const entrada = useEntradaPapel(delayFrames);
  return (
    <div style={{ opacity: entrada.opacity, transform: `translateY(${entrada.translateY}px)`, width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingBottom: tema.espaco.gap,
        }}
      >
        <span style={{ fontFamily: tema.tipo.mono, fontWeight: tema.peso.dado, fontSize: tema.escala.rotuloDado, color: tema.cor.suave }}>
          {rotulo}
        </span>
        <span
          style={{
            fontFamily: tema.tipo.mono,
            fontWeight: tema.peso.dado,
            fontSize: tema.escala.valorDado,
            lineHeight: 1,
            color: zero ? tema.cor.acento : tema.cor.tinta,
          }}
        >
          {valor}
        </span>
      </div>
      <div style={{ height: 1, width: "100%", backgroundColor: tema.cor.linha }} />
    </div>
  );
};

export const GsPlacar: React.FC<GsPlacarProps> = ({ hora, progresso, linhas, fonte }) => {
  const delayRodape = INICIO_LINHAS + linhas.length * PASSO_LINHA;

  return (
    <Papel rodape={fonte ? <Rodape fonte={fonte} delayFrames={delayRodape} /> : undefined}>
      <Relogio hora={hora} progresso={progresso} />

      <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 6 }}>
        {linhas.map((linha, indice) => (
          <Linha key={indice} {...linha} delayFrames={INICIO_LINHAS + indice * PASSO_LINHA} />
        ))}
      </div>
    </Papel>
  );
};
