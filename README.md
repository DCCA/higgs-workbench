# higgs-workbench

Um **workbench de produção de vídeo com IA** para o Claude Code - não um app, e sim
uma **metodologia versionada**: um workflow com gates de aprovação, um catálogo de
lições pagas com créditos reais, um subagente validador de "olhos frios" e ferramentas
de QC medido. O objetivo é fazer vídeos curtos impressionantes gastando o mínimo de
créditos, aprendendo com cada retake para não repeti-lo.

Construído sobre o **Higgsfield MCP** (geração de imagem/vídeo) + ferramentas locais
gratuitas (edge-tts, Stable Audio Open, ffmpeg). Docs em português.

## O que tem aqui

| Peça | O que é |
|---|---|
| `.claude/skills/novo-video/` | O workflow oficial: do brief ao master, 10 fases com gates |
| `.claude/agents/validador-gate.md` | Subagente read-only que valida todo material antes de chegar ao usuário |
| `PRATICAS.md` | A régua: cada lição paga (armadilha do modelo + antídoto) virou cláusula |
| `FERRAMENTAS.md` | Stack gratuito de áudio/pós + tooling de QC |
| `tools/qc/` | QC medido: `qc_video.sh`, `camera_review.py`, `lint_veredito.sh`, calibração |
| `docs/ESTRUTURA.md` | Como o sistema funciona + fluxograma do workflow |
| `docs/DECISOES.md` | Log append-only das decisões de arquitetura, com o porquê |
| `assets/fonts/` | Fontes OFL para cartelas/overlays |

## A ideia central

1. **Todo problema resolvível num still (~2 cr) não chega ao vídeo (17-52 cr).**
2. **Preflight sempre** (`get_cost`), nunca estimar; mostrar a conta antes de gastar.
3. **Nada chega a um gate do usuário sem o validador** (olhos frios, medido).
4. **Wow-shot primeiro** - se o protótipo não impressiona, replaneja antes de produzir.
5. **Storyboard no papel** (custo zero) antes de qualquer crédito de vídeo.
6. Cada retake vira cláusula em `PRATICAS.md` - o custo de um erro é não ter a regra ainda.

## Como usar

Pré-requisitos e configuração em **[SETUP.md](SETUP.md)** (Higgsfield MCP, edge-tts,
Stable Audio, ffmpeg, fontes). Com tudo pronto, dentro do Claude Code:

```
/novo-video   # e traga um brief ou uma ideia de vídeo
```

O workflow conduz brief → conceito → âncoras → storyboard → wow-shot → produção →
montagem → review medido → finalização → registro, parando nos gates para sua aprovação.
Como funciona em detalhe: **[docs/ESTRUTURA.md](docs/ESTRUTURA.md)**.

## Dependências

- **[Claude Code](https://claude.com/claude-code)** (skills, subagentes, MCP)
- **Higgsfield MCP** + uma conta Higgsfield (geração custa créditos pagos)
- **ffmpeg**, **Python 3** (+ `numpy`/`Pillow` para o QC), **uv/uvx** (para edge-tts)
- Opcional: **GPU** para trilha local com Stable Audio Open

## Escopo e honestidade

Isto foi testado com o Higgsfield MCP especificamente - os modelos, custos e armadilhas
em `PRATICAS.md` são dessa plataforma. A metodologia (gates, validador, QC medido,
storyboard-antes-do-take) é transferível, mas os números não são universais. O portfólio
de filmes do autor não está no repo (fica local); o que se compartilha é o método.

## Licença

Código e docs: **MIT** (ver [LICENSE](LICENSE)). Fontes em `assets/fonts/`: OFL 1.1.

Contribuições: veja **[CONTRIBUTING.md](CONTRIBUTING.md)**.
