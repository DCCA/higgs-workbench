// Cena: GsCartela. Cartão de encerramento do filme: sem Relogio (o objeto-fio
// já cumpriu seu arco - ver ../tema.ts), texto de tinta centralizado + linha
// de créditos mono, rodapé de atribuição quando a cartela afirma dado (régua
// de QC do estilo). O primeiro filho de `Papel` é sempre o "cabeçalho"
// pinado no topo (normalmente Relogio) - aqui é um spacer vazio para o texto
// cair no bloco centralizado, não colado no topo. Ver contrato de direção em
// ../tema.ts e primitivas em ../papel.tsx.
import React from "react";
import { z } from "zod";
import { tema } from "../tema";
import { Papel, Rodape, useEntradaPapel } from "../papel";

export const gsCartelaSchema = z.object({
  texto: z.string().min(1),
  creditos: z.string().min(1),
  fonte: z.string().optional(),
  duracaoSeg: z.number().min(2).max(8).default(4),
});

type GsCartelaProps = z.infer<typeof gsCartelaSchema>;

const ATRASO_TEXTO = 6;
const ATRASO_CREDITOS = ATRASO_TEXTO + tema.ritmo.entradaFrames;
const ATRASO_RODAPE = ATRASO_CREDITOS + Math.round(tema.ritmo.entradaFrames * 0.6);

export const GsCartela: React.FC<GsCartelaProps> = ({ texto, creditos, fonte }) => {
  const texto_ = useEntradaPapel(ATRASO_TEXTO);
  const creditos_ = useEntradaPapel(ATRASO_CREDITOS);

  return (
    <Papel rodape={fonte ? <Rodape fonte={fonte} delayFrames={ATRASO_RODAPE} /> : undefined}>
      <div />

      <div
        style={{
          opacity: texto_.opacity,
          transform: `translateY(${texto_.translateY}px)`,
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: tema.tipo.display,
            fontWeight: tema.peso.display,
            fontSize: tema.escala.display,
            lineHeight: 1.15,
            letterSpacing: tema.rastreio.apertado,
            color: tema.cor.tinta,
            margin: 0,
          }}
        >
          {texto}
        </h1>
      </div>

      <div
        style={{
          opacity: creditos_.opacity,
          transform: `translateY(${creditos_.translateY}px)`,
          width: "100%",
          textAlign: "center",
          fontFamily: tema.tipo.mono,
          fontWeight: tema.peso.dado,
          fontSize: tema.escala.corpo,
          letterSpacing: tema.rastreio.apertado,
          color: tema.cor.suave,
        }}
      >
        {creditos}
      </div>
    </Papel>
  );
};
