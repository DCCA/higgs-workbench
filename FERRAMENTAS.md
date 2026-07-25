# Ferramentas gratuitas - complemento ao Higgsfield

Mapeadas pelas lacunas reais do pipeline (pesquisa: jul/2026). O Higgsfield cobre
imagem/vídeo/upscale por créditos; tudo abaixo cobre o resto de graça.

## 1. Voz / VO em pt-BR

| Ferramenta | Tipo | Nota |
|---|---|---|
| **edge-tts** (CLI) | nuvem, grátis | 15 vozes neurais pt-BR (as "Edge Online"), qualidade alta, roda direto do WSL via `pip install edge-tts`. Melhor custo-zero/qualidade. |
| **Piper** | local, open | Vozes brasileiras (cadu, edresson, faber, jeff), qualidade média, leve, offline total. |
| **Kokoro-82M** | local, Apache 2.0 | 82M params, qualidade acima do tamanho; voz pt `pf_dora` é a melhor feminina offline. |

**Regra do workbench: a voz é escolhida POR VÍDEO, nunca travada como padrão.**
Fluxo: gerar 2-3 candidatas com o texto real do vídeo (`edge-tts` custa zero, então
candidatas são grátis), ouvir contra o corte e escolher caso a caso. Fallback se
nenhuma servir ao tom do projeto: `create_voice` do Higgsfield.

## 2. Trilha musical

**Atenção a licença - é campo minado:**

| Ferramenta | Licença do output | Nota |
|---|---|---|
| **Stable Audio Open 1.5** | Community License (comercial até teto de receita) | Local, treinado em Freesound CC0/CC-BY. Melhor opção open pra ambient. Precisa GPU. |
| **MusicGen / AudioCraft** | ⚠️ pesos CC-BY-NC 4.0 - **sem uso comercial** | Código MIT engana; o output não é livre. Só para uso pessoal. |
| **ACE-Step 3.5B / YuE 7B** | verificar model card | Gerações 2026, qualidade alta, local com GPU. |
| Web freemium (OpenMusic, AIMusicGen) | por plataforma | Sem watermark no free tier; conferir termos antes de publicar. |

Brief do MÁSCARAS: "paz → tensão → resolução, ambient/neoclássico, 2min40".

## 3. Foley / SFX (água, vento, ambiência)

- **Freesound.org** - filtrar por CC0; o acervo de água/vento/lago é exatamente o que o filme pede
- **BBC Sound Effects Archive** - milhares de ambiências profissionais (licença RemArc, checar uso comercial)
- **Pixabay Sounds** - comercial sem atribuição
- **Zapsplat** - forte em foley cotidiano

## 4. Edição, cor e cartela

- **DaVinci Resolve (free)** - corte fino, color grading de verdade (substitui os
  `colorbalance` no olho), Fairlight pra mix de VO+trilha+foley, e a cartela com
  tipografia decente. A decupagem original já assumia DaVinci.
- **ffmpeg** - já é o motor do pipeline (concat, xfade, trims, strips de revisão).
  Continua sendo a via mais rápida pra operação em lote.
- **Audacity** - limpeza de VO (ruído, EQ) se não quiser abrir o Fairlight.

## 5. Upscale e interpolação local (economiza créditos)

- **Video2X 6.x** - Real-ESRGAN (upscale live-action) + RIFE (interpolação 24→48/60fps),
  aceleração Vulkan (NVIDIA/AMD/Intel), C/C++ rápido, roda local. 20k+ stars.
- **REAL-Video-Enhancer** - GUI multi-backend (upscale/interp/denoise) Linux/Windows/Mac.

Trade-off honesto: o `upscale_video` do Higgsfield tende a tratar melhor os artefatos
típicos de vídeo gerado por IA; o local é grátis mas genérico. Vale o teste A/B num
shot antes de decidir o filme inteiro - o local custando zero, o teste é barato.

## 6. Ferramentas de review e finalização (aprendidas no ALÉM)

- **Shell interativo é zsh**: `$VAR:t` em comando inline dispara o modificador `:t`
  (basename) e quebra filtros do ffmpeg silenciosamente. Filtros complexos SEMPRE via
  script bash em arquivo (`bash script.sh`), variáveis com `${chaves}`.
- **A venv do stable-audio é a caixa de ferramentas python** (`tools/stable-audio/.venv`):
  numpy (análise de câmera por correlação de fase, rastreio por cor) e PIL 12
  (cartelas nativas em 1080, storyboards, provas de tipografia).
- **yt-dlp**: o do sistema apodrece rápido contra o YouTube; baixar o binário atual do
  GitHub para o scratchpad e usar direto (custo zero, sem sudo).
- **Fontes OFL por CDN**: `cdn.jsdelivr.net/fontsource/fonts/<família>@latest/latin-
  <peso>-<estilo>.ttf` - Cormorant, EB Garamond, Playfair, Inter etc., livres inclusive
  para uso comercial; guardar no projeto (`<slug>/fonts/`).
- **Kit de QC ffmpeg**: folhas de contato `fps=2 + tile`, `signalstats` YAVG/frame
  (flicker), `freezedetect`, `astats`/`volumedetect`/`ebur128` (áudio), detector de
  cena `select='gt(scene,N)'`, `drawgrid` (terços/enquadramento).

## Pipeline completo proposto (custo marginal zero após Higgsfield)

    Higgsfield (imagem+vídeo fast) → ffmpeg (montagem/revisão)
      → edge-tts (VO) → Stable Audio Open ou lib CC0 (trilha) → Freesound (foley)
      → DaVinci (cor final, mix, cartela) → Video2X (upscale/interp) → export

Higgsfield fica só onde é insubstituível: geração e, se o A/B disser, upscale.
