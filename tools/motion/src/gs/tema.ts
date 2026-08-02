// CONTRATO DE DIREÇÃO (ESTILO-ground-station) - dono destes tokens.
// THESIS: a notícia contada como quem confere um extrato - recusa o calor
// ilustrativo de "explicador" (o quadro-negro) e o dashboard dark-neon; o
// objeto é o DOCUMENTO (recibo, cláusula, placar), não o narrador.
// OWN-WORLD: papel bone com tinta quase-preta; UM vermelho só; profundidade só
// por SOMBRA DURA deslocada (carimbo/serigrafia mal registrada) - nunca
// gradiente, glow ou blur; grão de papel constante (feTurbulence, não filtro).
// STORY: o espectador lê como confere uma mesa de trabalho - relógio das 24h é
// o objeto-fio que persiste em todo beat (cabeçalho mono + barra que vira
// tinta->acento sob pressão), cartão de valor pontua o dado que mais importa,
// placar fecha a conta em linhas rótulo/valor.
// FIRST VIEWPORT (cena típica): relógio no topo + título Manrope grande (peso
// 800) + linha de apoio mono; disciplina de mesa (esquerda-alinhada, sem
// centralizar) é o antídoto contra "infográfico de banco de imagem".
// FORM: mundo herdado do AI Signal Desk (reel `social-drafts/
// 2026-08-01-anthropic-egress-reel/`), pinado pelo usuário em 2026-08-02
// (`estilos/ESTILO-ground-station.md`); gradua no filme SOL.
//
// Cenas consomem tokens e NUNCA hardcodam cor/tipo/ritmo. Regra de cor (3
// linhas, ver ESTILO-ground-station.md): acento sobre o chão só em texto
// grande (>=24px); texto pequeno sobre PREENCHIMENTO de acento usa tinta, não
// branco (branco só é seguro em texto grande); rótulo mono pequeno que
// precisar de vermelho sobre o chão usa `acentoTexto`, nunca `acento`.
export const tema = {
  cor: {
    chao: "#e7e2d5", // papel bone (fundo de cena)
    painel: "#efeadd", // papel elevado (cartão padrão)
    tinta: "#17150e", // texto e borda (14,1:1 sobre o chão)
    acento: "#e0402a", // vermelho único do mundo
    acentoTexto: "#b22d13", // vermelho AA-safe p/ texto pequeno sobre o chão (4,95:1)
    suave: "#4b463d", // texto secundário (7,2:1 sobre o chão, seguro em qualquer tamanho)
    linha: "#c3bca8", // régua/divisória
  },
  // painel invertido: virada dentro da identidade (não usado pelas 3 cenas
  // base, mas parte do contrato do mundo - ver ESTILO-ground-station.md)
  invertido: {
    fundo: "#17150e",
    texto: "#e7e2d5",
  },
  tipo: {
    display: "Manrope", // título (peso 700-800)
    corpo: "Manrope", // mesma família do display - ground-station não tem um "corpo" separado
    mono: "DM Mono", // todo dado: hora, valor, rótulo, rodapé de fonte
  },
  // escala tipográfica única do kit - cenas escolhem o degrau, nunca um px solto
  escala: {
    gigante: 112, // hora do Relogio (cabeçalho hero)
    display: 92, // título; valor em Cartao acento (texto grande = seguro sobre acento)
    corpo: 28, // linha de apoio mono; valor de linha do Placar (>=24: seguro com acento)
    legenda: 20, // Rodape; rótulo de linha do Placar
    // rótulo mono dentro do Cartao acento. 19px porque é o menor tamanho em
    // negrito que conta como "texto grande" (limiar WCAG bold: 18,66px) -
    // medido: tinta sobre acento dá 4,29:1 (só passa AA no limiar de texto
    // grande, 3:1; não passa o normal-text 4,5:1 em nenhum tamanho pequeno -
    // branco também não, 4,25:1). Reprovaria a régua de cor de ../../
    // estilos/ESTILO-ground-station.md se ficasse nos 15px do resto do kit.
    micro: 19,
  },
  ritmo: {
    entradaFrames: 12, // entrada de um bloco (~0,5s a 24fps) - papel assenta, não desenha
    assentamentoFrames: 6, // janela de assentamento pós-entrada
    // sem animação de saída em cena - transições entre cenas são do ffmpeg (decisão do plano)
  },
  espaco: {
    margem: 68, // mesmo valor do reel de origem (`style.css` .topline/.headline)
    gap: 32,
  },
  // assinatura do mundo: cartão com borda + sombra dura deslocada (não blur) -
  // valores do reel de origem (`.stage-node` em style.css), únicos p/ o kit
  sombraDura: {
    offset: 7,
    raio: 14,
    borda: 2,
  },
} as const;
export type TemaGs = typeof tema;
