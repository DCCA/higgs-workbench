import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { z } from "zod";
import { tema } from "./theme";
import "./fontes";
import { Abertura, aberturaSchema } from "./scenes/Abertura";
import { StatCard, statCardSchema } from "./scenes/StatCard";
import { FluxoDiagrama, fluxoSchema } from "./scenes/FluxoDiagrama";
import { Timeline, timelineSchema } from "./scenes/Timeline";
import { Cartela, cartelaSchema } from "./scenes/Cartela";
import { Legendas, legendasSchema } from "./scenes/Legendas";
import demoAbertura from "../demo/abertura.json";
import demoStatCard from "../demo/statcard.json";
import demoFluxo from "../demo/fluxo.json";
import demoTimeline from "../demo/timeline.json";
import demoCartela from "../demo/cartela.json";
import demoLegendas from "../demo/legendas.json";

const sanitySchema = z.object({ texto: z.string() });

const Sanity: React.FC<z.infer<typeof sanitySchema>> = ({ texto }) => (
  <AbsoluteFill
    style={{
      backgroundColor: tema.cor.fundo,
      color: tema.cor.texto,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 80,
    }}
  >
    {texto}
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <>
    <Composition
      id="Sanity"
      component={Sanity}
      schema={sanitySchema}
      defaultProps={{ texto: "higgs motion ok" }}
      width={1080}
      height={1920}
      fps={24}
      durationInFrames={24}
    />
    <Composition
      id="Abertura"
      component={Abertura}
      schema={aberturaSchema}
      defaultProps={demoAbertura}
      width={1080}
      height={1920}
      fps={24}
      durationInFrames={96}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.round(props.duracaoSeg * 24),
      })}
    />
    <Composition
      id="StatCard"
      component={StatCard}
      schema={statCardSchema}
      defaultProps={demoStatCard}
      width={1080}
      height={1920}
      fps={24}
      durationInFrames={96}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.round(props.duracaoSeg * 24),
      })}
    />
    <Composition
      id="FluxoDiagrama"
      component={FluxoDiagrama}
      schema={fluxoSchema}
      defaultProps={demoFluxo}
      width={1080}
      height={1920}
      fps={24}
      durationInFrames={144}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.round(props.duracaoSeg * 24),
      })}
    />
    <Composition
      id="Timeline"
      component={Timeline}
      schema={timelineSchema}
      defaultProps={demoTimeline}
      width={1080}
      height={1920}
      fps={24}
      durationInFrames={144}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.round(props.duracaoSeg * 24),
      })}
    />
    <Composition
      id="Cartela"
      component={Cartela}
      schema={cartelaSchema}
      defaultProps={demoCartela}
      width={1080}
      height={1920}
      fps={24}
      durationInFrames={96}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.round(props.duracaoSeg * 24),
      })}
    />
    <Composition
      id="Legendas"
      component={Legendas}
      schema={legendasSchema}
      defaultProps={demoLegendas}
      width={1080}
      height={1920}
      fps={24}
      durationInFrames={144}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.round(Math.max(...props.segmentos.map((s) => s.t1)) * 24),
      })}
    />
  </>
);
