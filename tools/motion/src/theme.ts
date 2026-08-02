// CONTRATO DE DIREÇÃO (ESTILO-infografico) - dono destes tokens.
// THESIS: a semana de IA explicada A GIZ numa aula - recusa o flat vector
// corporativo que a categoria sempre entrega e o dashboard dark neon.
// OWN-WORLD: ardósia verde-escura; giz branco-quente/amarelo/vermelho com traço
// vivo (draw-on, jitter leve, poeira); quantidades como TALLY MARKS; correção de
// borracha (esfumaçado) como estado; corpo de texto legível vive em ETIQUETAS de
// papel fixadas no quadro (material real de aula) - giz desenha, etiqueta lê.
// STORY: o espectador entende a notícia como quem assiste um bom professor
// riscar o quadro - diagrama, tally, timeline; o payoff é o quadro completo.
// FIRST VIEWPORT (cena típica): título em giz display grande + kicker em
// etiqueta; disciplina suíça no layout (grid, margens generosas) é o antídoto
// contra "whiteboard animation" de banco de imagem.
// FORM: direção 6 da lista fundamentada (seed 4f753cb2, mode read), escolhida
// pelo usuário em 2026-08-02; challenger zine recusado; stagings n/a (motion).
//
// Cenas consomem tokens e NUNCA hardcodam cor/tipo/ritmo.
export const tema = {
  cor: {
    fundo: "#232f2a",      // ardósia verde-escura
    texto: "#f2eee3",      // giz branco-quente (11.9:1)
    destaque: "#e8c86a",   // giz amarelo (8.5:1)
    apoio: "#9aa79e",      // giz esmaecido/meio-apagado (5.6:1)
    alerta: "#e58a80",     // giz vermelho (5.5:1)
  },
  // material secundário do mundo: etiqueta de papel fixada no quadro
  etiqueta: {
    papel: "#efe9da",
    tinta: "#2b2b28",      // 11.7:1 sobre o papel
    padding: "16px 24px",
    raio: 3,
  },
  tipo: {
    display: "Fredericka the Great", // giz (assets/fonts, OFL)
    corpo: "Inter",                  // só em etiquetas de papel, nunca "giz"
    numeros: "Space Mono",           // dados tabulares em etiquetas
  },
  // escala tipográfica única do kit - cenas escolhem o degrau, nunca um px solto
  escala: {
    gigante: 220,   // numeral-herói (StatCard valor)
    display: 88,    // título em giz
    corpo: 34,      // texto de etiqueta
    legenda: 24,    // contexto/data/mono
    micro: 20,      // rótulos mínimos
  },
  ritmo: {
    entradaFrames: 14,        // draw-on de um traço de giz (~0,58s)
    assentamentoFrames: 8,    // janela de assentamento pós-entrada (spring da etiqueta, settle do traço)
    // sem animação de saída em cena - transições entre cenas são do ffmpeg (decisão do plano)
  },
  espaco: {
    margem: 96,
    gap: 36,
  },
} as const;
export type Tema = typeof tema;
