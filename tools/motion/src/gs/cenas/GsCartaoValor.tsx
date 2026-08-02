// Cena: GsCartaoValor. Mesmo cabeçalho da GsBeat (Relogio + título com
// destaque) mais um Cartao em acento pontuando o dado que mais importa do
// beat. Rótulo pequeno sobre o preenchimento de acento usa TINTA, não branco
// (regra de cor de ../tema.ts: texto pequeno sobre acento só é seguro em
// tinta; branco só é seguro em display >=24px, tamanho do valor). Ver
// contrato de direção em ../tema.ts e primitivas em ../papel.tsx.
import React from "react";
import { z } from "zod";
import { tema } from "../tema";
import { Cartao, Papel, Relogio, Rodape, destacar, useEntradaPapel } from "../papel";

export const gsCartaoValorSchema = z
  .object({
    hora: z.string().min(1),
    progresso: z.number().min(0).max(1),
    titulo: z.string().min(1),
    destaque: z.string().optional(),
    rotulo: z.string().min(1),
    valor: z.string().min(1),
    fonte: z.string().optional(),
    duracaoSeg: z.number().min(2).max(10).default(4),
  })
  .refine((p) => !p.destaque || p.titulo.includes(p.destaque), {
    message: "destaque precisa ser substring de titulo",
    path: ["destaque"],
  });

type GsCartaoValorProps = z.infer<typeof gsCartaoValorSchema>;

const ATRASO_TITULO = 4;
const ATRASO_CARTAO = ATRASO_TITULO + tema.ritmo.entradaFrames;
const ATRASO_RODAPE = ATRASO_CARTAO + Math.round(tema.ritmo.entradaFrames * 0.6);

export const GsCartaoValor: React.FC<GsCartaoValorProps> = ({
  hora,
  progresso,
  titulo,
  destaque,
  rotulo,
  valor,
  fonte,
}) => {
  const titulo_ = useEntradaPapel(ATRASO_TITULO);
  const cartao_ = useEntradaPapel(ATRASO_CARTAO);

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

      <Cartao
        variant="acento"
        style={{
          opacity: cartao_.opacity,
          transform: `translateY(${cartao_.translateY}px)`,
          alignSelf: "flex-start",
        }}
      >
        <div
          style={{
            fontFamily: tema.tipo.mono,
            fontWeight: 700,
            fontSize: tema.escala.micro,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: tema.cor.tinta,
            marginBottom: 10,
          }}
        >
          {rotulo}
        </div>
        <div
          style={{
            fontFamily: tema.tipo.mono,
            fontWeight: 700,
            fontSize: tema.escala.display,
            lineHeight: 1,
            color: tema.invertido.texto,
          }}
        >
          {valor}
        </div>
      </Cartao>
    </Papel>
  );
};
