# CLAUDE.md — Aulas Magnas

> Regras compartilhadas com Cursor: ver @AGENTS.md

## Missão

Slides para médicos especialistas seniores em congressos.
Clareza de decisão clínica > estética. Hierarquia visual rigorosa.
Cada aula: modo **congress** (45min) e modo **residência** (+apêndice didático).

## Stack

Reveal.js 5.x · GSAP 3.12 · Vite · HTML/CSS/JS puro · OKLCH
**Tudo via npm/ESM. Zero CDN. Fontes self-hosted WOFF2.**

## Estrutura

```
shared/
  css/base.css         → design system completo
  js/engine.js         → init + data-animate + modes
  assets/fonts/        → WOFF2 (ver shared/assets/fonts/README.md)
aulas/[nome]/
  index.html           → Plano A (dark, 1920×1080)
  index.stage-b.html   → Plano B (light, 1280×720, sem animação)
aulas/calibracao.html  → Slide de calibração standalone
docs/                  → narrativa, storyboard, referências
scripts/               → lint, serve
.claude/rules/         → regras modulares (auto-carregadas)
```

## Projetos

| Pasta | Tema | Duração | Status |
|-------|------|---------|--------|
| aulas/grade/ | Sistema GRADE | 45-60 min | Framework pronto, conteúdo parcial |
| aulas/cirrose/ | Cirrose: manejo global | 60 min | Pesquisa completa, slides a criar |
| aulas/metanalise/ | Meta-análise: conceitos e metodologia | 60 min | Escopo definido, pesquisa a iniciar |

## Comandos

```bash
npm run dev             # Vite dev
npm run dev:grade       # Só GRADE
npm run build           # Produção (base:'./')
npm run preview         # Servir build localmente (palco)
npm run lint:slides     # Gates automatizados
```

## Worktree

```bash
git branch grade main && git worktree add ../aulas-grade grade
git branch cirrose main && git worktree add ../aulas-cirrose cirrose
git branch metanalise main && git worktree add ../aulas-metanalise metanalise
```

Commits: `[AULA] batch N — descrição`

## Procedimento de palco (OBRIGATÓRIO)

```bash
npm run build
npm run preview          # http://localhost:4173
# NÃO abrir via file:// (CORS bloqueia ESM modules)
```

1. Abrir `http://localhost:4173/aulas/calibracao.html`
2. Se navy lavado ou texto fraco → Plano B (`index.stage-b.html`)
3. Se ok → Plano A (`index.html`)
4. Requisito: **Chrome ≥111** (OKLCH). Fallback HEX existe mas preferir browser atual.

## Hard Constraints

### Conteúdo e Estrutura
1. **Assertion-Evidence (LEI).** `<h2>` = asserção clínica verificável. Corpo = evidência visual.
2. **PROIBIDO `<ul>` e `<ol>` em slides projetados.** Listas só em `<aside class="notes">` e apêndice.
3. **Todo `<section>` DEVE ter `<aside class="notes">`** com timing, pausas e fontes. Linter bloqueia build.
4. **Expertise-Reversal.** Congress = zero revisão básica. Teoria → apêndice residência.
5. **Tabelas Tufte.** Sem bordas verticais. Números à direita, texto à esquerda.

### Dados Médicos
6. **NUNCA inventar dados.** Sem fonte Tier 1 → `[TBD]`.

### CSS e Tokens
7. **var() obrigatório.** NUNCA cor literal em CSS. Linter bloqueia hex/oklch/rgb/hsl (exceção: `@supports not` fallback block).
8. **Exceção:** `data-background-color` aceita HEX literal (Reveal parseia JS-side).
9. **Zero !important** novos (exceção: print, reduced-motion, no-js).
10. **Daltonismo:** semânticas com ícone/label obrigatório (✓/⚠/✕).
11. **Cor clínica ≠ cor de UI.** `--safe/--warning/--danger` = significado clínico. Progress bar, section-tag, chrome → usar `--ui-accent`.

### Animação
12. **data-animate declarativo.** Tipos: `countUp|stagger|drawPath|fadeUp|highlight`. NUNCA gsap inline em slide.
13. **Cleanup obrigatório.** gsap.context() + revert() no slidechanged.

### Infra
14. **Zero CDN.** npm/ESM. Fontes WOFF2 locais.
15. **Offline = servidor local** (npm run preview ou npx serve dist). NÃO file://.
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
| Slide | `S{NNN}_{kebab}.html` | `S012_estatinas-evidencia.html` |
| Asset | `{aula}_{desc}.{ext}` | `grade_forest-plot.svg` |
| Commit | `[AULA] batch N — desc` | `[GRADE] batch 3 — slides 12-16` |

## Rules (canônicas — em .claude/rules/)

| Arquivo | Escopo |
|---------|--------|
| `design-system.md` | Tokens, cores, tipografia, WCAG, modos, paleta de dados |

> Adicionar novas regras conforme erros recorrentes.
> Cursor: regras espelhadas em `.cursor/rules/*.mdc`

## MCP Servers

| Arquivo | Ferramenta | Nota |
|---------|-----------|------|
| `.mcp.json` | Claude Code | Lido automaticamente |
| `.cursor/mcp.json` | Cursor | Mesmo conteúdo, path separado |
| `claude_desktop_config.json` | Claude Desktop | Configuração global no OS (ver docs/SETUP.md) |

Servers configurados:

| Server | Categoria | Uso |
|--------|-----------|-----|
| BioMCP | Pesquisa | PubMed + ClinicalTrials.gov + Europe PMC + bioRxiv (sem API key) |
| PubMed (@cyanheads) | Pesquisa | Busca PubMed focada (NCBI_API_KEY opcional) |
| CrossRef | Pesquisa | Verificação de DOIs e metadados de citações |
| Semantic Scholar | Pesquisa | Citation networks, busca acadêmica ampla |
| Playwright | Dev/QA | Screenshots, browser testing, PDF verification |
| Filesystem | Produtividade | Leitura/escrita de arquivos do projeto |
| Memory | Produtividade | Contexto persistente entre sessões (JSONL local) |
| ESLint | Dev/QA | Linting do código via chat |
| Lighthouse | Dev/QA | Performance e acessibilidade dos slides |
| a11y (axe-core) | Dev/QA | WCAG 2.x testing |
| Sharp | Dev/QA | Otimização de imagens médicas |
| Notion | Produtividade | Storyboards, tracking, blocos narrativos |
API key: `export NCBI_API_KEY=your_key` (ncbi.nlm.nih.gov, grátis)

## Custom Commands (/.claude/commands/)

| Comando | Uso |
|---------|-----|
| `/new-slide [aula] [assertion]` | Cria slide assertion-evidence com template |
| `/export [aula]` | PDF + screenshots via DeckTape |
| `/review [aula]` | Audita compliance, acessibilidade, dados |
| `/evidence [query]` | Busca PubMed/Semantic Scholar para evidência |

## Skills (/.claude/skills/)

| Skill | Auto-trigger |
|-------|-------------|
| `assertion-evidence.md` | Ao criar/editar slides HTML |
| `medical-data.md` | Ao adicionar dados clínicos a slides |

## Roadmap

### Transcribe Pipeline (scripts/transcribe-lecture.js)

Pipeline isolado de transcrição de palestras médicas:
```bash
node scripts/transcribe-lecture.js --file video.mp4           # JSON local
node scripts/transcribe-lecture.js --file video.mp4 --notion  # + publica no Notion
node scripts/transcribe-lecture.js --file video.mp4 --lang en --model large-v3
```

Requer: Whisper no PATH, ANTHROPIC_API_KEY no .env.
Notion opcional (NOTION_API_KEY + NOTION_DATABASE_ID).
Output: `docs/transcripts/{nome}.whisper.json` + `{nome}.analysis.json`
**NÃO toca no core do projeto** (shared/, aulas/, vite.config.js).

### Futuro
- APCA contraste (quando spec estabilizar)
- DTCG tokens / Style Dictionary (quando >3 aulas)
- Lint CI no GitHub Actions
- DeckTape + GitHub Actions export automatizado
- CanvasXpress para Kaplan-Meier nativos
- Glyphhanger font subsetting no build pipeline
