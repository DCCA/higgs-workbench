---
name: novo-video
description: Workflow completo para criar um vídeo curto de IA neste workbench - do brief ao corte final com áudio. Use quando o usuário quiser criar um vídeo novo, disser "novo vídeo", "criar um vídeo", "fazer um reel/short", ou trouxer um roteiro/ideia de vídeo. Cada projeto vira uma pasta própria com bíblia de produção.
---

# Novo vídeo - workflow do workbench

Pipeline provado no curta MÁSCARAS (2:24, 26 shots, ~695 créditos, 10 retakes).
Antes de começar, leia `PRATICAS.md` (regras de geração) e tenha `FERRAMENTAS.md` à mão
(áudio/pós grátis). Referência de execução real: `mascaras/BIBLIA.md`.

## Escala padrão: vídeo pequeno e impressionante

- **15-60s, 3-8 shots**, um único "wow-shot" como âncora do vídeo
- Orçamento alvo: **100-300 créditos** (protótipo + produção + margem de 2x retake no wow-shot)
- 9:16 fast 720p sempre; upscale só no corte aprovado

## Fases (com gates de aprovação do usuário)

### 1. Brief (1 rodada de perguntas, no máximo)
Formato/plataforma, duração alvo, tem áudio/VO?, e **qual é o momento impressionante** -
o shot que justifica o vídeo existir. Se o usuário trouxe roteiro, extrair isso dele.
Escrever decupagem curta: shot × movimento × duração × frames necessários.

### 2. Setup do projeto
- `mkdir <slug>/` na raiz; criar `<slug>/BIBLIA.md` com as seções: identidade travada,
  linguagem visual, frames-âncora (tabela de job IDs), decupagem, custos medidos, lições.
- Preflight de custos com `get_cost: true` - nunca estimar. Mostrar a conta ao usuário
  antes do primeiro crédito gasto.

### 3. Frames-âncora
Gerar com `nano_banana_pro` 2k: identidade do personagem (se houver) + locação-mãe.
Travar identidade POR ESCRITO na bíblia e colar o bloco em todo prompt subsequente.
Todo frame derivado nasce de um âncora via `medias` ("EXACT same scene... ONLY change:").
**GATE: usuário aprova os âncoras antes de qualquer vídeo.**

### 4. Protótipo do wow-shot PRIMEIRO
O shot mais arriscado/impressionante é gerado antes dos demais, fora de ordem.
Se falhar, a correção é na decupagem (ângulo, destino), não em adjetivos - ver
PRATICAS.md "Movimento de câmera" e "Armadilhas". Só seguir com o resto depois
que o wow-shot existir.

### 5. Produção em lote
`seedance_2_0` fast 720p, mudo (`generate_audio: false`). Aplicar as cláusulas de
PRATICAS.md: end frame para movimento de câmera/transformação (outpaint fabrica
destinos), start só para ação no quadro, anti-rotação em paisagem, objeto-rígido
em máscara/adereço, `declined_preset_id` preventivo em cena escura.
Revisar cada shot por strip de 4 frames ANTES de aprovar (produção, não revisão).

### 6. Montagem e revisão de verdade
- Concat ffmpeg (`-c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -r 24`)
- **Folha de cortes**: último frame × primeiro frame de cada emenda, par a par.
  É onde moram os erros (repetição de quadro, jump cut, pop de luminância).
- Fixes de edição (trim, dissolve 0,25-0,35s, fade) antes de qualquer regen.
- **GATE: usuário assiste o corte** (copiar para `/mnt/c/Users/dcca1/Downloads/<slug>/`).

### 7. Áudio (custo zero primeiro)
- **VO: a voz é escolhida POR VÍDEO** - gerar 2-3 candidatas edge-tts com o texto real,
  usuário escolhe ouvindo contra o corte. Nunca reaproveitar a escolha de outro vídeo.
- Trilha: Stable Audio Open (GPU) ou lib CC0; **nunca MusicGen para uso comercial**.
- Foley: Freesound filtrado CC0.
- Mix simples no ffmpeg (`amix`/`sidechaincompress`); casos complexos vão pro DaVinci.

### 8. Finalização
Passe de cor unificado se preciso (colorbalance nas altas, nunca nos médios em pele),
cartela/tipografia, upscale A/B (Video2X local × `upscale_video`) num shot antes de
rodar tudo, export final para a plataforma.

### 9. Registro (obrigatório antes de encerrar)
- Bíblia atualizada: job IDs, custos reais × preflight, retakes com causa e antídoto
- **Cada lição nova vira cláusula em PRATICAS.md** - retake é o custo de ainda não ter a regra
- Commit dos docs (mídia fica fora do git; regenerável pelos job IDs)

## Princípios que não se negociam

1. Todo problema resolvível no still (2 cr) não chega ao vídeo (17-45 cr)
2. Preflight sempre; mostrar a conta antes de gastar
3. Julgar shot por strip é produção; revisão é folha de cortes
4. Wow-shot primeiro - se o vídeo não impressiona no protótipo, replaneja antes de produzir
