// Tokens do mundo visual do ESTILO-infografico.
// A DIREÇÃO (contrato no topo deste arquivo após a Task 2) é a ÚNICA dona
// destes valores; cenas consomem tokens e NUNCA hardcodam cor/tipo/ritmo.
export const tema = {
  cor: {
    fundo: "#101114",
    texto: "#f2f3f5",
    destaque: "#9aa0aa",
    apoio: "#3c414b",
    alerta: "#c7ccd6",
  },
  tipo: {
    display: "Inter",
    corpo: "Inter",
    numeros: "Space Mono",
  },
  ritmo: {
    entradaFrames: 12,
    saidaFrames: 8,
  },
  espaco: {
    margem: 96,
    gap: 32,
  },
} as const;
export type Tema = typeof tema;
