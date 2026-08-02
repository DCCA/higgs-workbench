import { cpSync, mkdirSync } from "node:fs";
mkdirSync("public/fonts", { recursive: true });
cpSync("../../assets/fonts", "public/fonts", { recursive: true });
console.log("fontes OFL copiadas para public/fonts");
