// Carrega as 3 famílias do mundo (giz + etiqueta) via @remotion/fonts.
// Import por efeito colateral em Root.tsx - loadFont() já gerencia
// delayRender/continueRender internamente, não precisa de await aqui.
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { tema } from "./theme";

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
