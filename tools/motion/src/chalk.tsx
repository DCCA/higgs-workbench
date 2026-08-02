// Primitivas visuais do mundo "quadro-negro de aula" (ver theme.ts).
// Giz DESENHA (traço SVG animado, texto grande com leve textura); etiqueta de
// papel LÊ (corpo de texto pequeno, nunca giz). Reusado por todas as cenas do
// ESTILO-infografico - nenhuma cor/fonte/ritmo aqui é hardcoded fora de `tema`.
import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./theme";

/** Casco padrão de cena: fundo ardósia + poeira + área com margem do kit. Toda
 * cena do ESTILO-infografico monta seu conteúdo aqui em vez de repetir o shell. */
export const Quadro: React.FC<{
  children: React.ReactNode;
  poeiraSeed: string;
  poeiraCount?: number;
  style?: React.CSSProperties;
}> = ({ children, poeiraSeed, poeiraCount, style }) => (
  <AbsoluteFill style={{ backgroundColor: tema.cor.fundo }}>
    <Poeira seed={poeiraSeed} count={poeiraCount} />
    <AbsoluteFill
      style={{
        padding: tema.espaco.margem,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: tema.espaco.gap,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
);

/** Estilo de texto em giz: fonte display + leve textura (camadas de sombra, não "sketch filter"). */
export const estiloGiz = (color: string): React.CSSProperties => ({
  fontFamily: tema.tipo.display,
  fontWeight: 400,
  color,
  textShadow: `0 0 1px ${color}99, 0 0 14px ${color}33`,
});

/** Entrada de texto em giz: fade + leve scale-in ao longo de tema.ritmo.entradaFrames. */
export const useEntradaGiz = (delayFrames = 0) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delayFrames);
  const t = interpolate(local, [0, tema.ritmo.entradaFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity: t, scale: interpolate(t, [0, 1], [0.92, 1]) };
};

/** Espessura do "corredor" perpendicular ao traço (svg cross-axis) - o path
 * fica centrado nesse eixo (TRACO_CROSS / 2), então um caller vertical só
 * precisa alinhar seu marcador ao mesmo centro para bater com o traço. */
export const TRACO_CROSS = 28;

/** Traço de giz que se desenha (draw-on via strokeDasharray/strokeDashoffset),
 * com jitter determinístico. `width` é o comprimento ao longo do eixo do
 * traço (nome mantido por compat - também vale para orientacao="v", onde é
 * uma altura). `orientacao="v"` gira o traço 90° (espinha de timeline etc.);
 * o path fica centrado no eixo cruzado nas duas orientações. */
export const TracoGiz: React.FC<{
  width: number;
  seed: string;
  color?: string;
  strokeWidth?: number;
  delayFrames?: number;
  align?: "left" | "center";
  orientacao?: "h" | "v";
}> = ({
  width,
  seed,
  color = tema.cor.destaque,
  strokeWidth = 6,
  delayFrames = 0,
  align = "left",
  orientacao = "h",
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delayFrames);
  const j = (n: number) => (random(`${seed}-${n}`) - 0.5) * 10;
  const mid = width / 2;
  const c = TRACO_CROSS / 2;
  const path =
    orientacao === "v"
      ? `M${c + j(0)},0 C ${c + j(1)},${mid * 0.5} ${c + j(2)},${mid * 1.5} ${c + j(3)},${width}`
      : `M0,${c + j(0)} C ${mid * 0.5},${c + j(1)} ${mid * 1.5},${c + j(2)} ${width},${c + j(3)}`;
  const drawn = interpolate(local, [0, tema.ritmo.entradaFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // poeira do giz assentando depois que o traço fecha
  const assentado = interpolate(
    local,
    [tema.ritmo.entradaFrames, tema.ritmo.entradaFrames + tema.ritmo.assentamentoFrames],
    [1, 0.88],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const length = width * 1.15;
  return (
    <svg
      width={orientacao === "v" ? TRACO_CROSS : width}
      height={orientacao === "v" ? width : TRACO_CROSS}
      style={{
        overflow: "visible",
        opacity: assentado,
        display: "block",
        marginLeft: align === "center" ? "auto" : 0,
        marginRight: align === "center" ? "auto" : 0,
      }}
    >
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={length * (1 - drawn)}
      />
    </svg>
  );
};

/** Etiqueta de papel fixada no quadro: pino (spring) + leve inclinação, texto legível. */
export const Etiqueta: React.FC<{
  children: React.ReactNode;
  seed: string;
  delayFrames?: number;
  style?: React.CSSProperties;
}> = ({ children, seed, delayFrames = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delayFrames);
  const tilt = (random(seed) - 0.5) * 3;
  const pin = spring({
    frame: local,
    fps,
    durationInFrames: tema.ritmo.entradaFrames + tema.ritmo.assentamentoFrames,
    config: { damping: 14, mass: 0.6 },
  });
  const translateY = interpolate(pin, [0, 1], [24, 0]);
  const opacity = interpolate(local, [0, tema.ritmo.entradaFrames * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        backgroundColor: tema.etiqueta.papel,
        color: tema.etiqueta.tinta,
        transform: `translateY(${translateY}px) rotate(${tilt}deg)`,
        opacity,
        boxShadow: `0 8px 20px ${tema.cor.fundo}b3`,
        padding: tema.etiqueta.padding,
        borderRadius: tema.etiqueta.raio,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Poucas partículas de poeira de giz flutuando baixinho - textura, não confete. */
export const Poeira: React.FC<{ seed: string; count?: number }> = ({ seed, count = 5 }) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const x = random(`${seed}-x-${i}`) * 100;
        const y = random(`${seed}-y-${i}`) * 100;
        const size = 2 + random(`${seed}-s-${i}`) * 3;
        const opacity = 0.08 + random(`${seed}-o-${i}`) * 0.1;
        const drift = Math.sin((frame + i * 40) / 50) * 6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: tema.cor.texto,
              opacity,
              transform: `translateY(${drift}px)`,
            }}
          />
        );
      })}
    </>
  );
};
