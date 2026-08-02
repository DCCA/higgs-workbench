# Estilos de Vídeo (incremento 1) - Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sistema de estilos reutilizáveis no higgs: `estilos/` + piloto `ESTILO-noticia-nanquim.md` destilado do A CHAVE + integração no `/novo-video` e no validador. SÓ DOCS, zero créditos.

**Architecture:** Receitas versionadas por tipo de vídeo (contrato de 11 seções em `docs/PROPOSTA-estilos-de-video.md`, mergeado em e4ee1cd); a skill pergunta o estilo no brief, encurta a fase 1.5 quando há estilo, e a fase 10 devolve lições ao changelog do estilo. O piloto é destilação de material local existente (bíblia do A CHAVE) - nenhuma geração.

**Tech Stack:** Markdown; python3 apenas para checks mecânicos de aceite.

## Global Constraints

- SÓ arquivos de documentação: nenhum código de aplicação, nenhum toolchain.
- Docs em português; blocos de prompt DENTRO dos estilos em inglês (convenção do repo).
- `estilos/` é PÚBLICA: proibido identidade pessoal, `job_id`/media_ids, caminhos de pastas locais de filmes (`chave/...`) no corpo do estilo - lições citam o filme por nome e PR, não por arquivo local.
- Custos no estilo SEMPRE com origem medida ("~180 cr no A CHAVE", "17,5 cr/5s fast 720p"); estilo `rascunho` nunca é fonte de preflight (regra do spec).
- Fluxo de git: branch `feat/estilos-incremento-1` ANTES de editar; commits pequenos; UMA PR ao final; merge só após revisão. NUNCA na main. Sem Co-Authored-By.
- Fonte do piloto: `chave/BIBLIA.md` (arquivo LOCAL gitignorado - existe no disco; se não existir, o implementador reporta BLOCKED em vez de inventar), `PRATICAS.md`, `docs/DECISOES.md` (entrada 2026-07-26), `PROJECT_STATUS.md` (entrada 2026-07-26).

---

### Task 1: Branch, `estilos/README.md` e este plano

**Files:**
- Create: `estilos/README.md`
- Commit também: `docs/PLANO-estilos-de-video.md` (este plano)

**Interfaces:**
- Produces: a pasta `estilos/` e o índice que a Task 2 atualiza (linha da tabela já aponta para `ESTILO-noticia-nanquim.md`, criado na Task 2 - o link fica quebrado até lá, e é esperado dentro da mesma PR).

- [ ] **Step 1: Criar a branch**

```bash
cd /home/dcca/projects/higgs && git checkout main && git pull --ff-only && git checkout -b feat/estilos-incremento-1
```

- [ ] **Step 2: Escrever `estilos/README.md`** (índice + ponteiro, SEM duplicar o contrato):

```markdown
# Estilos do workbench

Receitas reutilizáveis por tipo de vídeo. O contrato do formato (11 seções) e as
regras de criação e graduação (`rascunho` → `ativo`) estão em
`docs/PROPOSTA-estilos-de-video.md`. O `/novo-video` pergunta o estilo no brief;
com estilo declarado a fase 1.5 encurta, o validador confere aderência e a
fase 10 devolve lições ao changelog do estilo.

| Estilo | Status | Origem |
|---|---|---|
| [Vídeo-notícia nanquim](ESTILO-noticia-nanquim.md) | ativo | A CHAVE (PR #14, 2026-07-26) |
```

- [ ] **Step 3: Verificar e commitar**

```bash
test -f estilos/README.md && grep -q "PROPOSTA-estilos-de-video" estilos/README.md && echo OK
git add estilos/README.md docs/PLANO-estilos-de-video.md
git commit -m "feat(estilos): pasta de estilos com indice + plano do incremento 1"
```

---

### Task 2: Destilar o piloto `ESTILO-noticia-nanquim.md`

**Files:**
- Create: `estilos/ESTILO-noticia-nanquim.md`
- Read (fontes, NUNCA editadas): `chave/BIBLIA.md` (local), `PRATICAS.md`, `docs/DECISOES.md` (entrada "2026-07-26 - A CHAVE"), `PROJECT_STATUS.md` (entrada 2026-07-26)

**Interfaces:**
- Consumes: pasta `estilos/` da Task 1.
- Produces: o documento normativo que a Task 3 referencia pelo caminho `estilos/ESTILO-noticia-nanquim.md`.

- [ ] **Step 1: Ler as quatro fontes** e listar num rascunho local (não commitado): blocos de identidade EM INGLÊS da bíblia; decupagem/beats do filme; linguagem de montagem (flyover costurado com dissolves); regras de áudio (VO pt puro, nomes só na tela); custos MEDIDOS (total ~180 cr; preços por take citados na bíblia/PRATICAS); TODAS as cláusulas de PRATICAS pagas pelo A CHAVE (grep por "CHAVE", "nanquim", "faux-texto", "esboço", "edge-tts", "reveal", "overlay").

- [ ] **Step 2: Escrever o estilo no contrato de 11 seções.** Esqueleto obrigatório (títulos exatos; preencher cada seção com o material destilado do Step 1 - as instruções entre parênteses dizem o que entra e saem do arquivo final):

```markdown
# ESTILO: Vídeo-notícia nanquim (noticia-nanquim)

Status: ativo. Origem: A CHAVE (PR #14, 2026-07-26; 35,6s, 1080×1920, ~180 cr).

## Quando usar
(notícia/incidente tech contado como mapa-mundo que se constrói; brief traz um
FATO com atores e um desfecho; prazo curto e reuso frequente)

## Identidade visual
(os blocos EM INGLÊS da bíblia do A CHAVE: mundo GoT-nanquim - ink-drawn mechanical
map, parchment, sepia+red accents; a cláusula anti-texto POR SUPERFÍCIE que o
validador pagou 2 BLOQUEIA para aprender; arte IA SEM texto + overlay nítido)

## Decupagem padrão
(beats genéricos do tipo: abertura no mapa vazio → construção → atores entram →
conflito/reveal → desfecho + cartela; 5-8 beats, 30-45s, 9:16; wow típico =
reveal amplo do mapa completo COM end-frame fechado)

## Linguagem de montagem
(flyover contínuo costurado com dissolves; câmera sempre em movimento baixo;
sem cortes secos entre mundos)

## Áudio
(VO 100% pt-BR, termos em inglês SÓ na tela - edge-tts não pronuncia inglês em
texto PT; 2-3 candidatas por vídeo, voz POR VÍDEO; trilha: prompt-base do
gerador local usado no A CHAVE + régua RMS/cauda)

## Camada determinística
(hoje: overlay/cartela via PIL + fontes OFL de assets/fonts - receita ffmpeg/PIL
do A CHAVE resumida; quando tools/motion existir, este bloco aponta para as
composições Cartela/OverlayContexto/Legendas)

## Pipeline
(beat a beat: stills nano_banana_pro 2k → i2v seedance fast 720p; overlays PIL
pós-montagem; concat ffmpeg CRF16; upscale só no corte aprovado)

## Custos típicos
(MEDIDOS no A CHAVE: total ~180 cr; still ~2 cr; take fast 17,5 cr/5s;
margem de retake do wow 2x; citar a origem em cada número)

## Armadilhas e antídotos
(cada uma com o custo que a pagou: faux-texto migra de superfície → mudar a
natureza do objeto; seedance esboço→cheio = "se construindo"; reveal amplo sem
end-frame alucina mapa-múndi; iteração de direção é o caro do tipo - travar tom
no conceito)

## Régua de QC
(além do padrão: zoom em TODO texto de overlay - acentos pt-BR corretos, o
master do A CHAVE foi REPROVADO por 2 acentos; cobertura de trilha na cauda;
legibilidade do overlay sobre parchment)

## Lições (changelog)
- 2026-08-02: estilo criado por destilação retroativa do A CHAVE.
```

- [ ] **Step 3: Rodar o check mecânico de aceite**

```bash
python3 - <<'PY'
import re, sys
t = open("estilos/ESTILO-noticia-nanquim.md").read()
secoes = ["Quando usar","Identidade visual","Decupagem padrão","Linguagem de montagem",
  "Áudio","Camada determinística","Pipeline","Custos típicos",
  "Armadilhas e antídotos","Régua de QC","Lições (changelog)"]
faltam = [s for s in secoes if "## "+s not in t]
assert not faltam, "faltam seções: %s" % faltam
proibido = re.findall(r"job_id|media_id|chave/|/home/|dcca", t, re.I)
assert not proibido, "vazamento: %s" % proibido
assert "(" not in t.split("## Identidade visual")[1].split("##")[0][:40] or True
assert not re.search(r"\((os blocos|notícia/incidente|beats genéricos|flyover contínuo|VO 100|hoje:|beat a beat|MEDIDOS no|cada uma|além do)", t), "instruções do esqueleto sobraram no arquivo"
assert "cr" in t.split("## Custos típicos")[1].split("##")[0], "custos sem números"
print("estilo OK")
PY
```
Expected: `estilo OK` (as instruções entre parênteses do esqueleto NÃO podem sobrar no arquivo final - são guia de destilação, não conteúdo).

- [ ] **Step 4: Commit**

```bash
git add estilos/ESTILO-noticia-nanquim.md
git commit -m "feat(estilos): piloto ESTILO-noticia-nanquim destilado do A CHAVE"
```

---

### Task 3: Integração - skill, validador e ESTRUTURA

**Files:**
- Modify: `.claude/skills/novo-video/SKILL.md` (fases 1, 1.5 e 10)
- Modify: `.claude/agents/validador-gate.md` (item ESTILO no fim de "Checklists por tipo de gate")
- Modify: `docs/ESTRUTURA.md` (linha na tabela "As peças")

**Interfaces:**
- Consumes: `estilos/ESTILO-noticia-nanquim.md` (Task 2) e `estilos/README.md` (Task 1) - os caminhos citados nos textos abaixo devem existir.

- [ ] **Step 1: SKILL.md, fase "### 1. Brief"** - acrescentar ao fim do parágrafo da fase 1:

```markdown
**Estilo**: perguntar se o vídeo usa um estilo existente (`estilos/`), declara um
ESTILO NOVO (nasce `rascunho` - regras em `docs/PROPOSTA-estilos-de-video.md`) ou
é autoral sem estilo. Estilo declarado entra na bíblia como referência e as fases
seguintes herdam a receita.
```

- [ ] **Step 2: SKILL.md, fase "### 1.5 Conceito"** - acrescentar ao fim da fase, antes do próximo heading:

```markdown
**Com estilo declarado, esta fase ENCURTA**: o mundo já está travado pelo ESTILO -
em vez de 3-5 mundos, apresentar 2-3 ARCOS dentro do mundo do estilo e o gate vira
confirmação de aderência. Escape explícito: se o usuário quiser fugir do estilo,
rodar a fase completa (e considerar declarar estilo novo em rascunho).
```

- [ ] **Step 3: SKILL.md, fase "### 10"** (registro) - acrescentar à lista de obrigações do registro:

```markdown
- **Promoção ao ESTILO (obrigatória quando há estilo declarado)**: lição
  específica do estilo → changelog do `ESTILO-<slug>.md` (genérica continua indo
  a PRATICAS); custos medidos do filme atualizam os "Custos típicos"; estilo
  `rascunho` gradua para `ativo` no primeiro filme concluído.
```

- [ ] **Step 4: validador-gate.md** - acrescentar após o bloco TRANSVERSAL existente:

```markdown
**ESTILO (quando o briefing declara um):** o material adere à identidade visual e
à linguagem de montagem do `estilos/ESTILO-<slug>.md`? Desvios são intencionais e
anotados na bíblia? A régua de QC própria do estilo foi aplicada? Números citados
como "custos típicos" têm origem medida (estilo `rascunho` não vale como fonte)?
```

- [ ] **Step 5: ESTRUTURA.md** - nova linha na tabela "As peças", logo após a linha de `tools/viz/`:

```markdown
| `estilos/` | receitas reutilizáveis por tipo de vídeo (`ESTILO-<slug>.md`; contrato em `docs/PROPOSTA-estilos-de-video.md`) - o brief pergunta o estilo, o validador confere aderência, a fase 10 devolve lições |
```

- [ ] **Step 6: Verificar e commitar**

```bash
grep -q "Estilo" .claude/skills/novo-video/SKILL.md && \
grep -q "ESTILO (quando o briefing declara um)" .claude/agents/validador-gate.md && \
grep -q "estilos/" docs/ESTRUTURA.md && \
ls estilos/ESTILO-noticia-nanquim.md estilos/README.md && echo OK
git add .claude/skills/novo-video/SKILL.md .claude/agents/validador-gate.md docs/ESTRUTURA.md
git commit -m "docs: /novo-video, validador e ESTRUTURA integrados ao sistema de estilos"
```

---

### Task 4: Revisão final + PR

**Files:** nenhum novo; push e PR.

- [ ] **Step 1: Conferir os critérios de aceite do spec** (seção "Critérios de aceite"): (1) estilo completo sem placeholder e sem instruções de esqueleto sobrando (o check da Task 2 prova); (2) teste de partida - leia SÓ o ESTILO e responda: dá para abrir o brief de um vídeo-notícia novo sem tocar na bíblia do A CHAVE? Se algo faltar (um bloco de prompt, um preço), voltar à Task 2 e completar da fonte; (3) skill/validador atualizados (greps da Task 3); (4) `git log --stat` mostra SÓ arquivos .md.

- [ ] **Step 2: Push + PR (sem merge - gate do usuário)**

```bash
git push -u origin feat/estilos-incremento-1
gh pr create --title "feat(estilos): sistema de estilos + piloto vídeo-notícia nanquim" \
  --body "Incremento 1 de docs/PROPOSTA-estilos-de-video.md (spec aprovado, PR #25): estilos/ com contrato indexado, piloto ESTILO-noticia-nanquim destilado do A CHAVE (0 créditos), e /novo-video + validador-gate + ESTRUTURA integrados. Só docs. 🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

- [ ] **Step 3: Revisar o diff (`gh pr diff`)** com foco em vazamento: nenhum job_id/media_id/caminho local/identidade pessoal em `estilos/`. Merge SÓ após revisão do usuário; deletar a branch após o merge.

---

## Self-review (feito na escrita do plano)

- **Cobertura do spec:** contrato/README → Task 1; piloto + critério 1 e 4 de aceite → Task 2 (check mecânico cobre seções, vazamento e custos); integração pontos 1-5 do spec → Task 3 (brief, 1.5, fase 10, validador; ponto 3 "fases 3-9 herdam" é comportamento em runtime coberto pelos textos do brief/1.5, não exige edit próprio); critérios 2-3 → Task 4. Roadmap/tools-motion: fora deste plano, como o spec manda. ✓
- **Placeholders:** os parênteses no esqueleto da Task 2 são instruções de destilação explícitas com fonte apontada, e o check mecânico REJEITA o arquivo se elas sobrarem - não são TBD. ✓
- **Consistência:** caminhos e títulos de seção idênticos entre Tasks 1-3 e o contrato do spec; slug `noticia-nanquim` consistente. ✓
