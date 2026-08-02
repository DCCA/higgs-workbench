import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { z } from "zod";
import { tema } from "./theme";

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
  </>
);
