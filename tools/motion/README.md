# tools/motion

Kit de infográficos animados via Remotion: **cena = take**. Cada composição
já é o clipe final da cena - renderiza direto em vídeo e entra no corte por
`ffmpeg concat`/`xfade` como qualquer outro take do workflow, sem passo
intermediário. Zero créditos Higgsfield: o custo é tempo de render local
(CPU/GPU), não conta de API.

Contrato completo (schemas, cenas, decupagem): `docs/PROPOSTA-motion-infografico.md`.
Guia de estilo/tema (paleta, tipografia, ritmo): `estilos/ESTILO-infografico.md`
(chega na Task 7).

## Comandos

```bash
cd tools/motion && npm install          # install (roda `prepare`: copia fontes)
bash check.sh                            # gate: tsc --noEmit + render-smoke de 1s

# still/âncora (custo zero, 1 frame)
npx remotion still <Cena> --props=demo/<cena>.json saida.png

# take (a cena inteira, vira o clipe da montagem)
npx remotion render <Cena> --props=<props.json> take_<CENA>_v1.mp4

# Legendas: fundo transparente, PRECISA das 3 flags juntas + saída .webm
npx remotion render Legendas --props=demo/legendas.json \
  --codec=vp9 --pixel-format=yuva420p --image-format=png saida.webm
# overlay sobre o clipe base (-c:v libvpx-vp9 vem ANTES do -i do webm):
ffmpeg -i base.mp4 -c:v libvpx-vp9 -i saida.webm -filter_complex "overlay" \
  -c:v libx264 -crf 16 saida.mp4

npx remotion studio                      # preview interativo
```

## Tempos de render medidos

Prova de integração (Step 1): `time npx remotion render <Cena> --props=... out.mp4`.
Máquina: WSL2, RTX 3070, 12 cores. Medido em 2026-08-02.

| Cena | Duração da cena | Frames | Tempo real (wall) |
|---|---|---|---|
| Abertura | 4s | 96 | 5,5s |
| FluxoDiagrama | 6s | 144 | 7,0s |

Números de referência para o preflight do ESTILO: tempo é o custo, créditos = 0.
