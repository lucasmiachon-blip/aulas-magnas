# CLAUDE.md — Aulas Magnas

> Fonte de verdade operacional (root). Cada projeto tem seu proprio CLAUDE.md.
> Regras detalhadas: @.claude/rules/*.md · Docs: @docs/README.md

## Commands

```bash
npm run dev              # Vite hot reload (port 3000)
npm run build            # Producao
npm run build:cirrose    # Concatena slides → index.html via _manifest.js
npm run build:grade      # Idem para GRADE
npm run build:osteoporose # Idem para Osteoporose
npm run preview          # Servir localmente (palco)
npm run lint:slides      # Assertion-evidence linter
```

## Stack

Reveal.js 5.x · GSAP 3.12 · Vite 6.x · Vanilla HTML/CSS/JS · OKLCH · Zero CDN · Offline-first.

## Projects

| Pasta | Status | CLAUDE.md |
|-------|--------|-----------|
| `aulas/cirrose/` | 33/33 slides, QA pendente (foco atual) | `aulas/cirrose/CLAUDE.md` |
| `aulas/grade/` | 58/58 migrados | `aulas/grade/CLAUDE.md` |
| `aulas/osteoporose/` | 70/70 migrados | `aulas/osteoporose/CLAUDE.md` |
| `aulas/metanalise/` | Em planejamento | `aulas/metanalise/CLAUDE.md` |

Publico: hepatologistas seniores (Brasil). PT-BR, termos tecnicos EN.

## Shared Infrastructure

```
shared/css/base.css    → Tokens OKLCH, tipografia, stages
shared/js/engine.js    → data-animate dispatcher + modes
shared/js/deck.js      → Navegacao vanilla
shared/js/case-panel.js → Panel lateral (cirrose)
```

**`shared/` is READ-ONLY in worktrees.** Edits to shared/ must happen on `main` and be absorbed by WTs via `git merge main`. Never edit shared/ inside a feature branch.

## Worktree Protocol

- **Create:** `git worktree add ../aulas-magnas-wt-<slug> -b feat/<slug>-mvp`
- **Merge back:** `git merge --no-ff feat/<slug>-mvp` (on main). Preserva historico.
- **Absorb main updates:** Inside WT, `git merge main`. NUNCA `git rebase` em branch publicada.
- **Cleanup:** `git worktree remove ../aulas-magnas-wt-<slug>` apos merge.
- **shared/ guard:** WT agents MUST NOT edit files under `shared/`. If a shared change is needed, flag it and defer to a main-branch session.
- **Aula CLAUDE.md:** cada `aulas/*/CLAUDE.md` DEVE ter secao `## Worktree` declarando branch esperada e restricoes locais. Sem essa secao, WT agent deve recusar trabalho.

## Source of Truth por Camada

| Camada | Dono | Onde vive | Quem pode editar |
|--------|------|-----------|-------------------|
| Infra (hooks, scripts, settings) | main | .claude/, scripts/ | Apenas main |
| Governanca (rules, skills, docs) | main | .claude/rules/, .claude/skills/, docs/ | Apenas main |
| Design system (tokens, base.css) | main | shared/ | Apenas main |
| Conteudo cirrose | feat/cirrose-mvp | aulas/cirrose/ | Apenas WT cirrose |
| Conteudo metanalise | feat/metanalise-mvp | aulas/metanalise/ | Apenas WT metanalise |
| Docs de aula | WT respectiva | docs/{aula}-*.md | WT da aula + main apos merge |

## Merge Safety / Quarentena Semântica

### Classes de mudança

| Classe | Escopo | Exemplos | Absorção em WT |
|--------|--------|----------|----------------|
| **A — Governança** | Doc graph, paths, docs operacionais | CLAUDE.md, XREF.md, rules/, MEMORY.md | Absorver cedo (`git merge main`) |
| **B — Infra QA** | Scripts, hooks, agentes, observabilidade | agents/, hooks/, skills/, KPIs.md | Absorver cedo |
| **C — Semântico** | Conteúdo da aula: slides, `_manifest.js`, CSS da aula, refs narrativas | slides/*.html, _manifest.js, cirrose.css, narrative.md | **Quarentena:** NÃO absorver sem triagem humana |

### Regras

1. **Classe C não entra cegamente** em worktree ativa. Antes de `git merge main` numa WT de aula, verificar se main tem commits Classe C. Se sim, triagem obrigatória: ler diff de cada arquivo semântico antes de absorver.
2. **Nunca misturar** hardening sistêmico (A/B) e mudança semântica do deck (C) na mesma rodada/branch. Branches separadas, commits separados.
3. **Docs-only hardening** deve ocorrer fora da worktree ativa da aula (branch dedicada em main ou branch `claude/system-*`).

## Conventions

- Slides: `NN-slug.html` (ex: `00-title.html`)
- Commits: `[AULA] batch N — desc`
- Plan C = default (light, 1280x720, GSAP ativo)

## Hard Constraints

1. **Assertion-Evidence.** `<h2>` = afirmacao clinica verificavel. NUNCA rotulo generico.
2. **ZERO `<ul>`/`<ol>` em slides.** Listas so em notes e apendice.
3. **Todo `<section>` TEM `<aside class="notes">`** com timing e fontes. NUNCA deletar notes.
4. **var() obrigatorio.** NUNCA cor literal em CSS. Excecao: `data-background-color` (HEX).
5. **Cor clinica ≠ UI.** `--safe/--warning/--danger` = clinico. `--ui-accent` = chrome.
6. **Daltonismo:** icone obrigatorio junto a cor semantica.
7. **`data-animate` declarativo.** NUNCA gsap inline.
8. **Zero CDN. Offline-first.**
9. **NUNCA reescrever `shared/` ou `index.html` inteiro** sem aprovacao.
10. **Corpo do slide <= 30 palavras.**
11. **Speaker notes em portugues.**
12. **GSAP failsafe:** `[data-animate]` → `opacity:0` em CSS. `.no-js` forca `opacity:1`.
13. **Tabelas Tufte:** sem bordas verticais, numeros a direita, classe `.tufte`.
14. **OKLCH padrao.** HSL proibido. Fallback HEX para WCAG.
15. **NUNCA inventar dados clinicos.** Sem fonte Tier 1 → `[TBD]`.

## Workflow

1. **Anti-drift:** Ler HANDOFF do projeto → caminho critico → propor ao usuario.
2. Plan mode para tarefas >=3 steps.
3. Subagents para pesquisa — manter contexto principal limpo.
4. Verificar antes de declarar done: `npm run lint:slides`.
5. Handoff: codigo → visual = Gemini. Visual → clinico = Opus.
6. Apos correcao do usuario → atualizar `tasks/lessons.md`.
7. Sessao termina → atualizar HANDOFF.md do projeto ativo.

## Operational Records

Cada projeto tem seus proprios registros (HANDOFF, CHANGELOG, ERROR-LOG, NOTES).
Cross-project: `tasks/lessons.md` (padroes de auto-correcao).

## Session Start

```bash
git log --oneline -5 && git status
cat aulas/{PROJETO_ATIVO}/HANDOFF.md
cat tasks/lessons.md 2>/dev/null || echo "No lessons yet"
```

## Context Management

- /clear entre tasks. /compact em ~70%.
- Ate 3 tasks por sessao. Commitar entre tasks.

## Detailed Rules (loaded on demand)

- Anti-drift: @.claude/rules/anti-drift.md
- CSS errors: @.claude/rules/css-errors.md
- Design tokens: @.claude/rules/design-system.md
- Design principles: @.claude/rules/design-principles.md
- Medical data: @.claude/rules/medical-data.md
- Reveal.js patterns: @.claude/rules/reveal-patterns.md
- Slide editing: @.claude/rules/slide-editing.md
- Motion QA: @.claude/rules/motion-qa.md
- Doc graph: @docs/XREF.md
