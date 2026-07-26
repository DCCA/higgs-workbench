# Setup

Passo a passo para rodar o workbench. Tudo testado em WSL/Linux; adapte os caminhos.

## 1. Claude Code

O workbench É um conjunto de skill + subagente + config do [Claude Code](https://claude.com/claude-code).
Clone o repo e abra o Claude Code na raiz - ele carrega o `CLAUDE.md`, a skill
`/novo-video` e o agente `validador-gate` automaticamente.

Config local (permissões da sua máquina) fica em `.claude/settings.local.json` - esse
arquivo é gitignorado; crie o seu conforme for aprovando ferramentas.

## 2. Higgsfield MCP

A geração de imagem/vídeo usa o **Higgsfield MCP**. Configure-o como servidor MCP no
Claude Code (escopo de usuário, OAuth) e valide com uma chamada barata:
`mcp__higgsfield__balance`. Você precisa de uma **conta Higgsfield** - geração consome
créditos pagos. Sempre use `get_cost: true` para precificar antes de gerar.

## 3. ffmpeg

Motor de montagem, QC e overlays. Instale pelo gerenciador do seu sistema
(`apt install ffmpeg` / `brew install ffmpeg`). Confirme com `ffprobe -version`.

## 4. Python + QC

O QC (`tools/qc/`) usa `numpy` e `Pillow`. Um venv simples resolve:

```bash
python3 -m venv .venv && . .venv/bin/activate
pip install numpy pillow
```

Aponte os scripts de análise para esse Python. `qc_video.sh` só precisa de ffmpeg;
`camera_review.py` e a geração de overlays usam numpy/Pillow.

## 5. Áudio (VO e trilha)

- **VO**: `edge-tts` (grátis, nuvem), rodado via `uvx --from edge-tts edge-tts ...`
  (instale [uv](https://docs.astral.sh/uv/)). A voz é escolhida POR VÍDEO - ver
  `FERRAMENTAS.md`. Atenção: edge-tts não pronuncia inglês em texto PT (deixe nomes
  próprios só na tela).
- **Trilha local** (opcional, precisa de GPU): Stable Audio Open. O gerador reutilizável
  fica em `tools/stable-audio/gerar_trilha.py` (a pasta `tools/stable-audio/` é
  gitignorada - crie o venv e instale `stable-audio-tools` conforme a doc do modelo).

## 6. Fontes

As fontes OFL em `assets/fonts/` (Inter, Space Mono, Cormorant, EB Garamond, Playfair)
já vêm no repo. Para outras, use o CDN da fontsource (ver `FERRAMENTAS.md`).

## 7. Pasta de entrega

Os cortes para você assistir são copiados para uma pasta de entrega da sua escolha
(ex.: `~/Downloads/<slug>/`). Não há caminho fixo - use o que fizer sentido no seu
sistema; o master canônico sempre vive em `<slug>/06_master/`.

## Fluxo de git

O repo usa branch → PR → review → merge (nunca commit direto na main). Ver `CLAUDE.md`.
