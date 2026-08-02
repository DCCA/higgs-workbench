// Cena: Timeline. Espinha vertical em giz (TracoGizVertical) com pontos que
// acendem e etiquetas de papel (data em Space Mono, texto em corpo),
// escalonados de cima pra baixo. Ver contrato de direção em ../theme.ts e
// primitivas em ../chalk.tsx.
import React from "react";
import { useVideoConfig } from "remotion";
import { z } from "zod";
import { tema } from "../theme";
import { Etiqueta, Quadro, TracoGizVertical, useEntradaGiz } from "../chalk";

export const timelineSchema = z.object({
  eventos: z.array(z.object({ data: z.string(), texto: z.string() })).min(2).max(6),
  duracaoSeg: z.number().min(3).max(12).default(6),
});

type TimelineProps = z.infer<typeof timelineSchema>;

// Geometria de layout (não é "valor visual" do tema): altura de cada linha
// do evento e colunas do ponto/espinha.
const ALTURA_LINHA = 220;
const COL_ESPINHA = 40;
const ATRASO_ESPINHA = 0;

const EventoLinha: React.FC<{
  evento: { data: string; texto: string };
  indice: number;
  delayFrames: number;
}> = ({ evento, indice, delayFrames }) => {
  const entrada = useEntradaGiz(delayFrames);
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
      <div
        style={{
          width: COL_ESPINHA,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            backgroundColor: tema.cor.destaque,
            boxShadow: `0 0 12px ${tema.cor.destaque}66`,
            opacity: entrada.opacity,
            transform: `scale(${entrada.scale})`,
          }}
        />
      </div>
      <div style={{ marginLeft: tema.espaco.gap, flex: 1 }}>
        <Etiqueta seed={`timeline-etiqueta-${indice}`} delayFrames={delayFrames} style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: tema.tipo.numeros, fontSize: tema.escala.legenda, opacity: 0.7 }}>
            {evento.data}
          </div>
          <div style={{ fontFamily: tema.tipo.corpo, fontWeight: 700, fontSize: tema.escala.corpo, lineHeight: 1.25, marginTop: 6 }}>
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
  const janela = Math.max(0, durationInFrames - inicioCascata - tema.ritmo.entradaFrames);
  const passo = eventos.length > 1 ? Math.min(passoIdeal, janela / (eventos.length - 1)) : 0;
  const delayEvento = (indice: number) => Math.round(inicioCascata + indice * passo);

  const espinhaAltura = (eventos.length - 1) * ALTURA_LINHA;
  const espinhaTopo = ALTURA_LINHA / 2;
  const espinhaEsquerda = (COL_ESPINHA - 28) / 2;

  return (
    <Quadro poeiraSeed="timeline-poeira" poeiraCount={6}>
      <div style={{ position: "relative", width: "100%", height: contentHeight }}>
        <div style={{ position: "absolute", left: espinhaEsquerda, top: espinhaTopo }}>
          <TracoGizVertical
            height={espinhaAltura}
            seed="timeline-espinha"
            color={tema.cor.texto}
            delayFrames={ATRASO_ESPINHA}
          />
        </div>
        {eventos.map((evento, indice) => (
          <EventoLinha key={indice} evento={evento} indice={indice} delayFrames={delayEvento(indice)} />
        ))}
      </div>
    </Quadro>
  );
};
