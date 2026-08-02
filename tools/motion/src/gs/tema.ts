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
  // pesos REAIS carregados por fontes.ts - nunca 700 em DM Mono: a família só
  // ship 300/400/500 upstream, Chromium sintetiza (faux-bold) um 700 que não
  // existe, engordando o traço ~27-36% sobre o peso real medido (ver nota em
  // GsCartaoValor/GsPlacar). `dado` é o peso mais pesado de verdade da mono -
  // usar em todo número/rótulo mono do kit, mesmo onde antes lia "700".
  peso: {
    normal: 400, // DM Mono Regular - reservado, nenhuma cena usa hoje
    dado: 500, // DM Mono Medium - todo texto mono do kit (relógio, apoio, rótulo, valor, rodapé)
    display: 800, // Manrope Variable cobre 200-800 de verdade - sem faux-bold aqui
  },
  // tracking: "apertado" pra leitura corrida (display e mono de leitura
  // contínua), "largo" pra rótulo mono maiúsculo (rodapé, cabeçalho de cartão)
  rastreio: {
    apertado: "-0.02em",
    largo: "0.08em",
  },
  // escala tipográfica única do kit - cenas escolhem o degrau, nunca um px
  // solto. Calibrada pra leitura em celular 1080x1920 (não thumbnail):
  // menor tamanho legível ~32-36px, números-herói 120-200px.
  escala: {
    gigante: 112, // hora do Relogio (cabeçalho hero)
    display: 92, // título de GsBeat/GsCartaoValor - referência do kit, não mexer
    corpo: 28, // linha de apoio mono de GsBeat - referência do kit, não mexer
    legenda: 20, // Rodape (fonte)
    // texto mono dentro do Cartao raised-paper de GsDocumento (citação-
    // artefato): maior que corpo (28, texto corrido) e menor que rotuloDado
    // (40, rótulo curto) - calibrado para ~2 linhas de uma frase de citação
    // em inglês na largura do Cartao (860px úteis a 1080 de largura).
    citacao: 48,
    // linha do Placar: rótulo mono junto ao valor. As linhas do Placar são
    // o payoff do filme (o resultado da aposta) - precisam dominar o
    // quadro, não ler como legenda de rodapé.
    rotuloDado: 40,
    // linha do Placar: valor mono - dominante mas dividido entre até 4
    // linhas (por isso menor que valorHero, que tem uma cena inteira só
    // pra si). >=24px: seguro em acento quando `zero` pinta a linha
    // (regra de cor).
    valorDado: 96,
    // Cartao acento: rótulo mono sobre o preenchimento. Substitui o antigo
    // degrau `micro` (19px, calibrado no limiar mínimo WCAG bold de
    // "texto grande", 18,66px) por um tamanho pensado pra tela de celular
    // (faixa "smallest legible" 32-36px) - com folga bem maior sobre o
    // limiar, o mesmo contraste medido (tinta sobre acento, 4,29:1) segue
    // seguro (só não passaria o normal-text 4,5:1, o que não se aplica:
    // 34px bold é "texto grande" pela régua WCAG).
    rotuloHero: 34,
    // Cartao acento: valor mono - número-herói de cartão único (mais
    // espaço vertical disponível que uma linha do Placar, por isso maior
    // que valorDado). >=24px: seguro em invertido.texto sobre acento
    // (regra de cor).
    valorHero: 120,
  },
  ritmo: {
    entradaFrames: 12, // entrada de um bloco (~0,5s a 24fps) - papel assenta, não desenha
    assentamentoFrames: 6, // janela de assentamento pós-entrada
    // sem animação de saída em cena - transições entre cenas são do ffmpeg (decisão do plano)
  },
  espaco: {
    margem: 68, // mesmo valor do reel de origem (`style.css` .topline/.headline)
    gap: 32,
    // pausa deliberada entre título e apoio do GsBeat (a "batida" do beat) -
    // cena com só 2 blocos de texto (sem cartão/linhas) media 70% de vazio
    // contíguo acima+abaixo do conteúdo contra ~55-65% das outras 2 cenas;
    // `gap` (32, calibrado pra dado denso: cabeçalho/placar/cartão) deixava o
    // par título+apoio colado demais pro pouco que ocupa - maior que `gap`
    // mas < escala.display (92) pra não desconectar o apoio do título.
    gapBeat: 120,
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
