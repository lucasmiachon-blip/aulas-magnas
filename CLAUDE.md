# CLAUDE.md — Aulas Magnas

> Regras compartilhadas com Cursor: ver @AGENTS.md

## Missão

Slides para médicos especialistas seniores em congressos.
Clareza de decisão clínica > estética. Hierarquia visual rigorosa.
Cada aula: modo **congress** e modo **residência** (+apêndice didático).

## Stack

Reveal.js 5.x · GSAP 3.12 · Vite · HTML/CSS/JS puro · OKLCH
**Tudo via npm/ESM. Zero CDN. Fontes self-hosted WOFF2.**

## Estrutura

```
shared/
  css/base.css         → design system completo (~516 linhas, inclui .stage-c)
  js/engine.js         → init + data-animate + modes (~289 linhas)
  assets/fonts/        → WOFF2 (npm run fonts:install)
aulas/[nome]/
  index.html           → Plan A (dark, animated, 1920×1080)
  index.stage-b.html   → Plan B (light, static, 1280×720)
  index.stage-c.html   → Plan C (light, animated, 1280×720) ← DEFAULT
aulas/calibracao.html  → Slide de calibração standalone
docs/                  → scope, handoff, referências (CSL-JSON)
scripts/               → lint, export, QA, transcribe
.claude/rules/         → regras modulares (auto-carregadas)
.claude/skills/        → domain skills (on-demand)
```

## Tri-Mode Display (IMPORTANTE)

| Mode | Theme | Resolution | Animation | Use |
|------|-------|-----------|-----------|-----|
| **Plan A** | Dark (navy) | 1920×1080 | GSAP | Projetor calibrado |
| **Plan B** | Light | 1280×720 | Nenhuma | Projetor ruim, fallback |
| **Plan C** ← DEFAULT | Light | 1280×720 | GSAP | Situação desconhecida |

**Ao criar slides: sempre target Plan C** salvo instrução contrária. Testar: `npm run preview` → `calibracao.html` → decidir Plan.

## Projetos

| Pasta | Tema | Duração | Slides Reais | Status |
|-------|------|---------|-------------|--------|
| aulas/cirrose/ | Cirrose: manejo global | **70 min** | 4 sections (title+hook+A1-01+A1-02) | Blueprint v2 ✅, 26 specs no Notion |
| aulas/grade/ | Sistema GRADE | 45-60 min | 2 sections (placeholder) | Reestruturação pendente |
| aulas/metanalise/ | Meta-análise | 45-60 min | 1 section (placeholder) | Pesquisa ✅, blueprint rascunho |

## Tool Priority Order

IMPORTANTE — ao buscar informação, seguir esta ordem:

1. **Notion** (Slides DB, References DB) — source of truth para specs e refs
2. **Arquivos locais** (docs/, .claude/rules/, .claude/skills/) — convenções
3. **PubMed / BioMCP / Semantic Scholar** — evidência médica Tier-1
4. **CrossRef** — verificação DOI e metadados
5. **Filesystem MCP** — leitura/escrita no projeto
6. **Playwright** — screenshots, visual QA
7. **Web** — último recurso, só info externa não-médica

## Notion IDs

| Recurso | Data Source ID |
|---------|---------------|
| Aulas Magnas DB | `def36683-985e-4a33-bd8c-ae0f2141ebbd` |
| Slides DB | `c6713964-0b31-454f-83f5-4b287911a01b` |
| References DB | `2b24bb6c-91be-42c0-ae28-908a794e5cf5` |
| Cirrose (page) | `30adfe68-59a8-815a-abf5-c817cd705b29` |
| Meta-análise (page) | `30adfe68-59a8-81d2-b1f6-c81c59e3e12d` |
| GRADE (page) | `30adfe68-59a8-81c5-8be6-fb4aead46c94` |

## Slide Spec Format (handoffs do Claude.ai)

Ao receber spec de slide, esperar estes campos:

```
SLIDE: [ID do Notion Slides DB]
HEADLINE: [assertion em PT]
EVIDENCE: [tipo visual + dados]
CITATION: [Author et al. Journal Year. PMID: XXXXX]
SPEAKER NOTES: [o que falar, em português, com timing]
TEMPO: [XX seg]
ANIMAÇÃO: [tipo + justificativa, ou "none"]
```

## Comandos

```bash
npm run dev             # Vite dev (port 3000)
npm run dev:grade       # Só GRADE
npm run build           # Produção (base:'./')
npm run preview         # Servir build localmente (palco)
npm run lint:slides     # Gates assertion-evidence
npm run fonts:install   # Baixar WOFF2 do Google Fonts
```

## Hard Constraints

### Conteúdo e Estrutura
1. **Assertion-Evidence.** `<h2>` = asserção clínica verificável. Corpo = evidência visual.
2. **PROIBIDO `<ul>` e `<ol>` em slides projetados.** Listas só em `<aside class="notes">` e apêndice.
3. **Todo `<section>` DEVE ter `<aside class="notes">`** com timing, pausas e fontes. Linter bloqueia build.
4. **Speaker notes DEVEM ser em português.** Formato: `[0:00-0:30] O que falar. PAUSA 3s.`
5. **Expertise-Reversal.** Congress = zero revisão básica. Teoria → apêndice residência.
6. **Tabelas Tufte.** Sem bordas verticais. Números à direita, texto à esquerda.

### Dados Médicos
7. **NUNCA inventar dados.** Sem fonte Tier 1 → `[TBD]`.

### CSS e Tokens
8. **var() obrigatório.** NUNCA cor literal em CSS. Exceção: `data-background-color` (HEX para Reveal).
9. **Zero !important** novos (exceção: print, reduced-motion, no-js).
10. **Daltonismo:** semânticas com ícone/label obrigatório (✓/⚠/✕).
11. **Cor clínica ≠ cor de UI.** `--safe/--warning/--danger` = significado clínico. `--ui-accent` = chrome.

### Animação
12. **data-animate declarativo.** Tipos: `countUp|stagger|drawPath|fadeUp|highlight`. NUNCA gsap inline.
13. **Cleanup obrigatório.** gsap.context() + revert() no slidechanged.

### Infra
14. **Zero CDN.** npm/ESM. Fontes WOFF2 locais.
15. **Offline = servidor local** (npm run preview). NÃO file://.
16. **NUNCA reescrever shared/ ou index.html inteiro** sem aprovação.
17. **Erro recorrente → propor regra** para rules/.

## Plan Mode

| Complexidade | Protocolo |
|-------------|-----------|
| Typo, padding | Declarar depois |
| 1 slide | 1 frase antes |
| Batch ≤5 slides | Plano + aprovação + commit |
| CSS global | Plano detalhado + aprovação |
| Dados médicos | Plano + fontes Tier 1 + aprovação |

## Naming

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Slide file | seguir estrutura existente em aulas/[nome]/ | `index.html`, `index.stage-b.html` |
| Asset | `{aula}_{desc}.{ext}` | `cirrose_forest-plot.svg` |
| Commit | `[AULA] batch N — desc` | `[CIRROSE] batch 2 — A1-03 a A1-06` |

## Worktree (trabalho paralelo)

```bash
git worktree add ../am-cirrose cirrose
git worktree add ../am-grade grade
```

## MCP Servers

Configurados em `.mcp.json` (Claude Code) e `.cursor/mcp.json` (Cursor): BioMCP, PubMed, CrossRef, Semantic Scholar, Playwright, Filesystem, Memory, ESLint, Lighthouse, a11y, Sharp, Notion.

`export NCBI_API_KEY=your_key` (ncbi.nlm.nih.gov, grátis).

## Commands & Skills

| Comando | Uso |
|---------|-----|
| `/new-slide [aula] [assertion]` | Criar slide assertion-evidence |
| `/export [aula]` | PDF + screenshots |
| `/review [aula]` | Auditar compliance + a11y |
| `/evidence [query]` | Buscar PubMed/Semantic Scholar |

Skills auto-triggered: `assertion-evidence` (ao editar HTML), `medical-data` (ao inserir dados clínicos).

## Roadmap

Ver @docs/HANDOFF.md para prioridades e pendências.
