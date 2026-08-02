// Primitivas visuais do mundo "papel impresso" (ver tema.ts). Papel LÊ (mesa
// de trabalho, esquerda-alinhada); nada desenha como o giz do outro mundo -
// blocos entram por assentamento (fade + leve deslocamento vertical, easing
// do reel), nunca por draw-on. Reusado pelas 3 cenas do ESTILO-ground-station
// - nenhuma cor/fonte/ritmo aqui é hardcoded fora de `tema`.
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { tema } from "./tema";

// Grão exato do reel de origem (não inventado - ver
// social-drafts/2026-08-01-anthropic-egress-reel/src/style.css linha 7).
const GRAO_SVG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")";

const Grao: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      opacity: 0.18,
      mixBlendMode: "multiply",
      backgroundImage: GRAO_SVG,
    }}
  />
);

/** Entrada de bloco no mundo do papel: fade + assentamento vertical (o papel
 * pousa, não desenha) usando o easing do reel. Ao contrário do giz (scale-in
 * com spring), aqui é translateY simples - "carimbo" descendo ao lugar. */
export const useEntradaPapel = (delayFrames = 0) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delayFrames);
  const t = interpolate(local, [0, tema.ritmo.entradaFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return { opacity: t, translateY: interpolate(t, [0, 1], [18, 0]) };
};

/** Casco padrão de cena: chão de papel + grão + área com margem do kit.
 * Regra de composição vertical do mundo (9:16 - antídoto contra a cena
 * "encostada no topo com o resto do quadro vazio"): o primeiro filho é o
 * cabeçalho (`Relogio`), ancorado no topo; `rodape` é o slot fixo no rodapé
 * do frame; TODO o resto dos filhos formam o bloco de conteúdo, que fica
 * CENTRALIZADO verticalmente no espaço restante entre os dois (peso visual
 * na faixa central 9:16 - onde a UI do Shorts/Reels não cobre). `ancora:
 * "topo"` sai desse padrão para o raro caso em que o topo é intencional. */
export const Papel: React.FC<{
  children: React.ReactNode;
  rodape?: React.ReactNode;
  ancora?: "centro" | "topo";
  style?: React.CSSProperties;
}> = ({ children, rodape, ancora = "centro", style }) => {
  const [cabecalho, ...resto] = React.Children.toArray(children);
  return (
    <AbsoluteFill style={{ backgroundColor: tema.cor.chao }}>
      <AbsoluteFill
        style={{
          padding: tema.espaco.margem,
          // conteúdo que encosta no rodapé (ex.: linhas do Placar) precisa
          // de reserva extra aqui - senão o bloco de conteúdo e o slot
          // `rodape` (ambos ancorados no mesmo bottom:margem) colidem no
          // mesmo pixel.
          paddingBottom: rodape ? tema.espaco.margem * 2 : tema.espaco.margem,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: tema.espaco.gap,
          ...style,
        }}
      >
        {cabecalho}
        {resto.length > 0 ? (
          <div
            style={{
              flex: 1,
              minHeight: 0,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: ancora === "topo" ? "flex-start" : "center",
              gap: tema.espaco.gap,
            }}
          >
            {resto}
          </div>
        ) : null}
      </AbsoluteFill>
      {rodape ? (
        <div style={{ position: "absolute", left: tema.espaco.margem, right: tema.espaco.margem, bottom: tema.espaco.margem }}>
          {rodape}
        </div>
      ) : null}
      <Grao />
    </AbsoluteFill>
  );
};

/** Cartão bordado com sombra dura deslocada (assinatura do mundo). `variant
 * "acento"` preenche em vermelho - ver regra de cor em tema.ts antes de
 * colorir texto pequeno em cima. */
export const Cartao: React.FC<{
  children: React.ReactNode;
  variant?: "padrao" | "acento";
  style?: React.CSSProperties;
}> = ({ children, variant = "padrao", style }) => (
  <div
    style={{
      backgroundColor: variant === "acento" ? tema.cor.acento : tema.cor.painel,
      border: `${tema.sombraDura.borda}px solid ${tema.cor.tinta}`,
      borderRadius: tema.sombraDura.raio,
      boxShadow: `${tema.sombraDura.offset}px ${tema.sombraDura.offset}px 0 ${tema.cor.tinta}`,
      padding: "28px 32px",
      ...style,
    }}
  >
    {children}
  </div>
);

/** Rodapé de atribuição: mono maiúsculo espaçado. Só o texto - o
 * posicionamento fixo no rodapé é responsabilidade do slot `rodape` de
 * `Papel`, para o componente continuar reutilizável fora dele. */
export const Rodape: React.FC<{ fonte: string; delayFrames?: number }> = ({ fonte, delayFrames = 0 }) => {
  const entrada = useEntradaPapel(delayFrames);
  return (
    <div
      style={{
        opacity: entrada.opacity,
        transform: `translateY(${entrada.translateY}px)`,
        fontFamily: tema.tipo.mono,
        fontWeight: 500,
        fontSize: tema.escala.legenda,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: tema.cor.suave,
      }}
    >
      FONTE: {fonte}
    </div>
  );
};

// Acima deste limiar de progresso o relógio vira tinta->acento (pressão do
// prazo subindo); em progresso===1 volta a tinta - o prazo bateu, o resultado
// está carimbado (regra do jogo do filme: "resultado depois do prazo não
// existe"), não é mais urgência, é fato encerrado.
const LIMIAR_ALERTA = 0.7;

/** Relógio mono HH:MM + barra de progresso - objeto-fio do filme. */
export const Relogio: React.FC<{
  hora: string;
  progresso: number;
  delayFrames?: number;
}> = ({ hora, progresso, delayFrames = 0 }) => {
  const entrada = useEntradaPapel(delayFrames);
  const emAlerta = progresso >= LIMIAR_ALERTA && progresso < 1;
  const cor = emAlerta ? tema.cor.acento : tema.cor.tinta;
  return (
    <div style={{ opacity: entrada.opacity, transform: `translateY(${entrada.translateY}px)`, width: "100%" }}>
      <div
        style={{
          fontFamily: tema.tipo.mono,
          fontWeight: 500,
          fontSize: tema.escala.gigante,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: cor,
        }}
      >
        {hora}
      </div>
      <div style={{ marginTop: 14, height: 6, width: "100%", backgroundColor: tema.cor.linha }}>
        <div style={{ height: "100%", width: `${Math.max(1, progresso * 100)}%`, backgroundColor: cor }} />
      </div>
    </div>
  );
};

/** Divide `titulo` no primeiro trecho igual a `destaque` e pinta esse trecho
 * de acento - lógica compartilhada por GsBeat e GsCartaoValor (o schema de
 * cada cena garante via zod que `destaque`, quando presente, é substring de
 * `titulo`). Uso em display (>=24px) - seguro sobre o chão pela regra de cor. */
export const destacar = (titulo: string, destaque?: string): React.ReactNode => {
  if (!destaque) return titulo;
  const i = titulo.indexOf(destaque);
  if (i === -1) return titulo;
  return (
    <>
      {titulo.slice(0, i)}
      <span style={{ color: tema.cor.acento }}>{destaque}</span>
      {titulo.slice(i + destaque.length)}
    </>
  );
};
