// Carrega as famílias dos dois mundos (quadro-negro + ground-station) via
// @remotion/fonts. Import por efeito colateral em Root.tsx - loadFont() já
// gerencia delayRender/continueRender internamente, não precisa de await aqui.
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { tema } from "./theme";
import { tema as temaGs } from "./gs/tema";

loadFont({
  family: tema.tipo.display,
  url: staticFile("fonts/FrederickatheGreat-Regular.ttf"),
});
loadFont({
  family: tema.tipo.corpo,
  url: staticFile("fonts/Inter-Regular.ttf"),
  weight: "400",
});
loadFont({
  family: tema.tipo.corpo,
  url: staticFile("fonts/Inter-Bold.ttf"),
  weight: "700",
});
loadFont({
  family: tema.tipo.numeros,
  url: staticFile("fonts/SpaceMono-Regular.ttf"),
});

// mundo ground-station: fonte variável (200-800) cobre título e valores.
loadFont({
  family: temaGs.tipo.display,
  url: staticFile("fonts/Manrope-Variable.ttf"),
  weight: "200 800",
});
loadFont({
  family: temaGs.tipo.mono,
  url: staticFile("fonts/DMMono-Regular.ttf"),
  weight: "400",
});
loadFont({
  family: temaGs.tipo.mono,
  url: staticFile("fonts/DMMono-Medium.ttf"),
  weight: "500",
});
