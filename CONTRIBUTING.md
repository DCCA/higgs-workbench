# Contribuindo

O valor deste repo é a **metodologia acumulada**, não código de app. Contribuir =
melhorar o método com base em produção real, mantendo a disciplina que faz ele funcionar.

## Fluxo de git (obrigatório)

Nunca commite direto na `main` - nem docs. Sempre:

1. `git checkout -b <tipo>/<slug>` antes de qualquer edição
2. commit + push
3. abra PR, revise o diff
4. merge só depois da revisão; delete a branch

## Como o método aprende (o loop)

- **Cada retake vira cláusula.** Se um take falhou por uma armadilha do modelo, a lição
  (causa + antídoto, com o custo em créditos) entra em `PRATICAS.md`. O custo de um erro
  é não ter tido a regra ainda.
- **Ferramentas de áudio/pós** e pegadinhas de licença entram em `FERRAMENTAS.md`.
- **Decisões de arquitetura/processo** entram em `docs/DECISOES.md` (append-only, com o
  porquê - o porquê é o que evapora primeiro).
- **Escapes do validador** (defeito que o usuário achou depois de um gate aprovado) viram
  item de checklist no `validador-gate` + caso dourado em `tools/qc/CALIBRACAO.md`.

## Regras que não se negociam

- Nada chega a um gate do usuário sem passar pelo `validador-gate` (olhos frios, medido).
- "Medir, não olhar" quando dá: o QC é objetivo (ffmpeg/numpy), não impressão.
- Sem segredos no repo; mídia gerada é gitignorada (regenerável pelos job IDs).
- Portfólio pessoal (filmes, fotos, identidade) fica LOCAL, fora do repo.

## O que é bem-vindo

- Novas lições de produção (com evidência: o que falhou, o custo, o antídoto).
- Melhorias no QC medido (`tools/qc/`) e novos casos de calibração.
- Suporte a outros MCPs/modelos de vídeo - **claramente marcado como não-verificado**
  até ter rodado de verdade (a régua atual é específica do Higgsfield).
- Tradução/clareza dos docs.

Abra uma issue antes de mudanças grandes de processo, para alinhar o "porquê".
