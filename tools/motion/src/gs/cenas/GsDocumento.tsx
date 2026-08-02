// Cena: GsDocumento. Mesmo cabeçalho das outras (Relogio) + kicker mono +
// Cartao raised-paper (NÃO acento - o documento é neutro, quem carrega peso é
// o texto dentro) com a citação do artefato-fonte, destaques em acento, apoio
// mono opcional traduzindo o que o documento significa (nunca o lê de novo -
// ver seção Áudio em ../../../../estilos/ESTILO-ground-station.md) + rodapé
// de atribuição. Ver contrato de direção em ../tema.ts e primitivas em
// ../papel.tsx.
import React from "react";
import { z } from "zod";
import { tema } from "../tema";
import { Cartao, Papel, Relogio, Rodape, useEntradaPapel } from "../papel";

export const gsDocumentoSchema = z
  .object({
    hora: z.string().min(1),
    progresso: z.number().min(0).max(1),
    kicker: z.string().min(1),
    texto: z.string().min(1),
    destaques: z.array(z.string().min(1)).optional(),
    apoio: z.string().optional(),
    fonte: z.string().optional(),
    duracaoSeg: z.number().min(2).max(10).default(5),
  })
  .refine((p) => !p.destaques || p.destaques.every((d) => p.texto.includes(d)), {
    message: "cada destaque precisa ser substring de texto",
    path: ["destaques"],
  });

type GsDocumentoProps = z.infer<typeof gsDocumentoSchema>;

/** Igual a `destacar` de ../papel.tsx, mas para várias substrings - o kit só
 * tinha a versão de 1 destaque (GsBeat/GsCartaoValor nunca precisaram de
 * mais). Pinta só a 1ª ocorrência de cada trecho; ignora trecho ausente ou
 * que colide com um corte já feito. */
const destacarTodos = (texto: string, destaques?: string[]): React.ReactNode => {
  if (!destaques || destaques.length === 0) return texto;
  const cortes = destaques
    .map((trecho) => ({ inicio: texto.indexOf(trecho), fim: texto.indexOf(trecho) + trecho.length }))
    .filter((c) => c.inicio !== -1)
    .sort((a, b) => a.inicio - b.inicio);
  const partes: React.ReactNode[] = [];
  let cursor = 0;
  cortes.forEach((c, i) => {
    if (c.inicio < cursor) return;
    partes.push(texto.slice(cursor, c.inicio));
    partes.push(
      <span key={i} style={{ color: tema.cor.acento }}>
        {texto.slice(c.inicio, c.fim)}
      </span>,
    );
    cursor = c.fim;
  });
  partes.push(texto.slice(cursor));
  return partes;
};

const ATRASO_KICKER = 4;
const ATRASO_CARTAO = ATRASO_KICKER + tema.ritmo.entradaFrames;
const ATRASO_APOIO = ATRASO_CARTAO + tema.ritmo.entradaFrames;
const ATRASO_RODAPE = ATRASO_APOIO + Math.round(tema.ritmo.entradaFrames * 0.6);

export const GsDocumento: React.FC<GsDocumentoProps> = ({
  hora,
  progresso,
  kicker,
  texto,
  destaques,
  apoio,
  fonte,
}) => {
  const kicker_ = useEntradaPapel(ATRASO_KICKER);
  const cartao_ = useEntradaPapel(ATRASO_CARTAO);
  const apoio_ = useEntradaPapel(ATRASO_APOIO);

  return (
    <Papel rodape={fonte ? <Rodape fonte={fonte} delayFrames={ATRASO_RODAPE} /> : undefined}>
      <Relogio hora={hora} progresso={progresso} />

      <div
        style={{
          opacity: kicker_.opacity,
          transform: `translateY(${kicker_.translateY}px)`,
          fontFamily: tema.tipo.mono,
          fontWeight: tema.peso.dado,
          fontSize: tema.escala.rotuloHero,
          letterSpacing: tema.rastreio.largo,
          textTransform: "uppercase",
          color: tema.cor.acentoTexto,
        }}
      >
        {kicker}
      </div>

      <Cartao
        style={{
          opacity: cartao_.opacity,
          transform: `translateY(${cartao_.translateY}px)`,
          alignSelf: "flex-start",
        }}
      >
        <div
          style={{
            fontFamily: tema.tipo.mono,
            fontWeight: tema.peso.dado,
            fontSize: tema.escala.citacao,
            lineHeight: 1.3,
            letterSpacing: tema.rastreio.apertado,
            color: tema.cor.tinta,
            maxWidth: 780,
          }}
        >
          {destacarTodos(texto, destaques)}
        </div>
      </Cartao>

      {apoio ? (
        <div
          style={{
            opacity: apoio_.opacity,
            transform: `translateY(${apoio_.translateY}px)`,
            fontFamily: tema.tipo.mono,
            fontWeight: tema.peso.dado,
            fontSize: tema.escala.corpo,
            lineHeight: 1.4,
            letterSpacing: tema.rastreio.apertado,
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
