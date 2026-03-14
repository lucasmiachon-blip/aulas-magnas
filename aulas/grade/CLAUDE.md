# CLAUDE.md — GRADE Masterclass

> Contexto GRADE. Hierarquia: CLAUDE.md (root) → **este arquivo** (grade-specific).

## Projeto

- **Titulo:** Sistema GRADE — Avaliando Certeza da Evidencia
- **Slides:** 58/58 (migrados)
- **Stack:** Reveal.js 5.x (legacy) · GSAP 3.12 · Vanilla HTML/CSS/JS · OKLCH design tokens
- **Status:** 🧊 FROZEN — fallback em Aulas_core. Sem desenvolvimento ativo.
- **Resolucao:** 1280 x 720 (Plan C) · 1920 x 1080 (Plan A)
- **Offline-first:** Zero CDN. Todos assets locais.

## Arquivos de trabalho

| Arquivo | Papel |
|---------|-------|
| `slides/*.html` | **DEFAULT — editar estes** (58 arquivos, 1 por slide) |
| `slides/_manifest.js` | Source of truth: ordem, archetypes |
| `index.template.html` | Template com `%%SLIDES%%` placeholder |
| `index.html` | **Gerado** — `npm run build:grade` |
| `grade.css` | Estilos especificos desta aula |
| `archetypes.css` | Layout archetypes |

### Shared (nao alterar sem autorizacao)

| Arquivo | Papel |
|---------|-------|
| `../../shared/css/base.css` | Design system tokens |
| `../../shared/js/engine.js` | GSAP dispatcher + Reveal init |

### Fluxo de edicao

1. Editar `slides/NN.html`
2. `npm run build:grade` (gera `index.html`)
3. `npm run dev:grade` → abrir `/aulas/grade/index.html`

## Worktree

- **Branch pattern:** `feat/grade-{feature}-mvp`
- **WT location:** `../aulas-magnas-wt-grade-{feature}`
- **shared/ restrictions:** READ-ONLY. Deferir mudancas para sessao em main.
- **Pre-merge checklist:**
  - [ ] `git diff --name-only main...HEAD | grep shared/` retorna vazio
  - [ ] `npm run build:grade` passa sem erros
  - [ ] `npm run lint:slides` passa
  - [ ] `git status` limpo
- **Merge protocol:** No main: `git merge --no-ff feat/grade-{feature}-mvp`
- **Cleanup:** `bash .claude/scripts/worktree-cleanup.sh grade-{feature}`

## Variantes de palco

| Arquivo | Uso |
|---------|-----|
| `index.html` | Plan C (padrao) |
| `index.stage-b.html` | Plan B (sala clara, projetor fraco) |
| `index.stage-c.html` | Plan C alternativo |

## Documentacao

1. **CLAUDE.md** ← voce esta aqui
2. **HANDOFF.md** — Pendencias e slide map
3. **CHANGELOG.md** — Historico (append-only)
