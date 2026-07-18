# Ferramentas gratuitas - complemento ao Higgsfield

Mapeadas pelas lacunas reais do pipeline (pesquisa: jul/2026). O Higgsfield cobre
imagem/vídeo/upscale por créditos; tudo abaixo cobre o resto de graça.

## 1. Voz / VO em pt-BR

| Ferramenta | Tipo | Nota |
|---|---|---|
| **edge-tts** (CLI) | nuvem, grátis | 15 vozes neurais pt-BR (as "Edge Online"), qualidade alta, roda direto do WSL via `pip install edge-tts`. Melhor custo-zero/qualidade. |
| **Piper** | local, open | Vozes brasileiras (cadu, edresson, faber, jeff), qualidade média, leve, offline total. |
| **Kokoro-82M** | local, Apache 2.0 | 82M params, qualidade acima do tamanho; voz pt `pf_dora` é a melhor feminina offline. |

Recomendação pro VO do MÁSCARAS: testar `edge-tts` primeiro (2 linhas de texto,
voz calma masculina ou feminina), cair pro `create_voice` do Higgsfield só se nenhuma servir.

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

## Pipeline completo proposto (custo marginal zero após Higgsfield)

    Higgsfield (imagem+vídeo fast) → ffmpeg (montagem/revisão)
      → edge-tts (VO) → Stable Audio Open ou lib CC0 (trilha) → Freesound (foley)
      → DaVinci (cor final, mix, cartela) → Video2X (upscale/interp) → export

Higgsfield fica só onde é insubstituível: geração e, se o A/B disser, upscale.
