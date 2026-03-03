# CLAUDE.md — Aulas Magnas · Cirrose

> Contexto para Claude Code (terminal). Atualizado 27/fev/2026.
> Para Claude.ai (web): colar `aulas/cirrose/HANDOFF-CLAUDE-AI.md` no Project Knowledge.
> Este arquivo SUBSTITUI o CLAUDE.md anterior e absorve regras do AGENTS.md.

**Hierarquia:** AGENTS.md (geral) → CLAUDE.md (Cursor/Claude Code) → aulas/cirrose/CLAUDE.md (Cirrose). Regras extensíveis: docs/RULES.md, docs/SKILLS.md, docs/SUBAGENTS.md.

---

## Projeto

Masterclass "Cirrose Hepática: Classificar, Intervir, Reverter" — 70 min.
Reveal.js 5.x · GSAP 3.12 · Vite 6.x · Vanilla HTML/CSS/JS · OKLCH · Zero CDN · Offline-first.
Público: hepatologistas seniores (Brasil). Conteúdo PT-BR, termos técnicos EN.
Caso clínico: Seu Antônio, 54a, caminhoneiro, etilista, cACLD → descompensação.
Plan C = default (light, 1280×720, GSAP ativo).

---

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions).
- If something goes sideways, STOP and re-plan immediately — don't keep pushing.
- Write detailed specs upfront to reduce ambiguity.
- Use plan mode for verification steps, not just building.

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean.
- Offload research, exploration, and parallel analysis to subagents.
- For complex problems, throw more compute at it via subagents.
- One tack per subagent for focused execution.

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern.
- Write rules for yourself that prevent the same mistake.
- Ruthlessly iterate on these lessons until mistake rate drops.
- Review lessons at session start for this project.

### 4. Verification Before Done
- Never mark a task complete without proving it works.
- Diff behavior between main and your changes when relevant.
- Ask yourself: "Would a staff engineer approve this?"
- Run `npm run lint:slides` after any HTML change. Check logs, demonstrate correctness.

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: implement the elegant solution.
- Skip this for simple, obvious fixes — don't over-engineer.
- Challenge your own work before presenting it.

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding.
- Point at logs, errors, failing tests — then resolve them.
- Zero context switching required from the user.
- Go fix failing CI tests without being told how.

### 7. Task Management
1. **Plan First:** Write plan to `tasks/todo.md` with checkable items.
2. **Verify Plan:** Check in before starting implementation.
3. **Track Progress:** Mark items complete as you go.
4. **Explain Changes:** High-level summary at each step.
5. **Document Results:** Add review section to `tasks/todo.md`.
6. **Capture Lessons:** Update `tasks/lessons.md` after corrections.

---

## Core Principles

- **Simplicity First:** Make every change as simple as possible. Impact minimal code.
- **No Laziness:** Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact:** Changes should only touch what's necessary. Avoid introducing bugs.
- **Clinical Sanctity:** NEVER invent, hallucinate, modify, or round clinical data (NNT, HR, p-values, dosages). If data is missing → `[TBD]`.

---

## 🔄 HANDOFF LOOP (INVIOLÁVEL)

**Ao final de toda sessão, atualizar `aulas/cirrose/HANDOFF.md` com pendências.**
Detalhes verbosos → CHANGELOG.md. Claude.ai usa HANDOFF-CLAUDE-AI.md (paths + pendências).

---

## Step 0 (início de toda sessão)

```bash
git log --oneline -5
git status
cat aulas/cirrose/HANDOFF.md
grep -c '<section' aulas/cirrose/index.html
cat tasks/lessons.md 2>/dev/null || echo "No lessons yet"
```

Se algo não bater com o prompt recebido → **PARAR e perguntar.**

---

## Hard Constraints (Invioláveis)

| # | Regra | Razão |
|---|-------|-------|
| 1 | **Assertion-Evidence.** `<h2>` = afirmação clínica verificável. Corpo = evidência visual. NUNCA rótulo genérico. | Alley model |
| 2 | **ZERO `<ul>`/`<ol>` em slides.** Listas só em `<aside class="notes">` e apêndice. | Cognitive Load Theory |
| 3 | **Todo `<section>` TEM `<aside class="notes">`** com timing, pausas e fontes. NUNCA deletar notes — apenas append. | Speaker support |
| 4 | **var() obrigatório.** NUNCA cor literal em CSS. Exceções: `data-background-color` (HEX para Reveal) e data palette (`--cmp-*`, `--data-*`). | Token system |
| 5 | **Cor clínica ≠ UI.** `--safe/--warning/--danger` = clínico. `--ui-accent` = chrome/decoração. | Semantic safety |
| 6 | **Daltonismo:** ícone obrigatório junto a cor semântica (✓/⚠/✕). | WCAG |
| 7 | **`data-animate` declarativo.** Tipos: `countUp\|stagger\|drawPath\|fadeUp\|highlight`. NUNCA gsap inline. | engine.js contract |
| 8 | **Zero CDN. Offline-first.** `npm run preview` para servir. NUNCA `file://`. | Congress reliability |
| 9 | **NUNCA reescrever `shared/` ou `index.html` inteiro** sem aprovação explícita. | Non-destructive |
| 10 | **Corpo do slide ≤ 30 palavras.** Densidade informacional via visual, não texto. | Signal-to-noise |
| 11 | **Speaker notes em português.** Sempre. | Audience locale |
| 12 | **GSAP failsafe:** todo `[data-animate]` tem `opacity:0` em CSS. `.no-js` e `.stage-bad` forçam `opacity:1`. | Graceful degradation |
| 13 | **Tabelas Tufte:** sem bordas verticais, números à direita, classe `.tufte`. | Visual literacy |

---

## Repo Structure

```
shared/css/base.css              → Design system: OKLCH tokens, tipografia, stages, print
shared/js/engine.js              → Reveal init + data-animate dispatcher + stage modes
aulas/cirrose/archetypes.css     → 12 archetypes (layout por slide)
aulas/cirrose/cirrose.css       → Estilos específicos Cirrose
aulas/grade/archetypes.css       → Archetypes GRADE
aulas/osteoporose/archetypes.css → Archetypes Osteoporose
shared/js/case-panel.js          → Panel Seu Antônio (floating overlay, severity states)
shared/js/click-reveal.js        → [data-reveal] progressive disclosure controller
shared/js/interactions/meld-calc.js → MELD-Na calculator
shared/assets/fonts/             → WOFF2 self-hosted (Instrument Serif, DM Sans, JetBrains Mono)
aulas/cirrose/slides/            → 1 HTML per slide (source of truth: _manifest.js)
aulas/cirrose/slide-registry.js  → Custom anims per slide + wiring
aulas/cirrose/scripts/           → build-html.ps1, split-slides.js, qa-screenshots
aulas/cirrose/HANDOFF.md         → Pendências projeto
aulas/cirrose/HANDOFF-CLAUDE-AI.md → Claude.ai (paths + pendências)
aulas/grade/slides/              → 58 slides (migrados de Aulas_core)
aulas/grade/scripts/             → build-html.ps1
aulas/grade/HANDOFF.md           → Estado migração GRADE
aulas/osteoporose/slides/        → 70 slides (migrados de Aulas_core)
aulas/osteoporose/scripts/       → build-html.ps1
aulas/osteoporose/HANDOFF.md     → Estado migração Osteoporose
docs/SYNC-NOTION-REPO.md         → Notion IDs + sync protocol (única referência)
tasks/todo.md                    → Current task plan
tasks/lessons.md                 → Self-improvement patterns
```

---

## Source of Truth: `slides/_manifest.js`

| Pos | Section ID | Arquivo |
|-----|-----------|---------|
| 1 | s-title | `00-title.html` |
| 2 | s-hook | `01-hook.html` |
| 3 | s-a1-01 | `02-a1-continuum.html` |
| 4 | s-a1-02 | `03-a1-fib4.html` |
| 5 | s-a1-03 | `04-a1-meld.html` |
| 6 | s-a1-04 | `05-a1-infeccao.html` |
| 7 | s-a1-05 | `06-a1-etiologias.html` |
| 8 | s-cp1 | `07-cp1.html` |
| 9–14 | s-a2-01..06 | `08-..13-.html` |
| 15 | s-cp2 | `14-cp2.html` |
| 16–18 | s-a3-01..03 | `15-..17-.html` |
| 19 | s-cp3 | `18-cp3.html` |
| 20 | s-close | `19-close.html` |
| 21–28 | s-app-01..08 | `20-..27-.html` |

**28/28 implementados** (20 core + 8 APP). **NÃO reordenar sem instrução do Claude.ai.**

---

## Archetypes (archetypes.css)

### Existentes (Batch 0)
| Class | Uso | Grid |
|-------|-----|------|
| `archetype-figure` | Assertion + figure split | `auto auto 1fr auto` |
| `archetype-metrics` | KPI cards/bars | `auto auto 1fr auto` |
| `archetype-interactive` | MELD calculator | `auto auto 1fr auto auto` |
| `archetype-checkpoint` | CP1/CP2/CP3 | 55/45 two-column |

### Novos (Batch 1)
| Class | Uso | Padrão visual |
|-------|-----|---------------|
| `archetype-pathway` | s-a1-01 (D'Amico) | 5 blocos horizontais, gradiente safe→danger |
| `archetype-flow` | s-a1-02 (diagnóstico) | Vertical cascade com cut-offs |
| `archetype-hero-stat` | s-a2-01, s-a2-06, s-a3-03 | Número gigante central + contexto |
| `archetype-timeline` | s-a2-02 | Steps horizontais, urgency gradient |
| `archetype-urgency` | s-a2-04 | Dark bg, pulsing clock, emergency |
| `archetype-decision-tree` | s-a2-05 | If/then bifurcações Yes/No |
| `archetype-comparison` | s-a1-05, s-a3-02 | Side-by-side matrix |
| `archetype-checklist` | s-a3-01 | Progressive ✓ com case bridge |

### Global archetype base rule
All 12 archetypes share: `display:grid; gap:1rem; padding:1.5rem 2rem; height:100%; max-width:min(1120px, calc(100% - var(--panel-width) - 1rem)); margin:0 auto; align-content:start;`

---

## Design Tokens (base.css :root)

```
── Surfaces ──
--bg-surface:  oklch(97% 0.005 258)    --bg-card:     oklch(99% 0.003 258)
--bg-elevated: oklch(100% 0 0)          --bg-deep:     oklch(18% 0 0)
--bg-navy:     oklch(22% 0.042 258)     --bg-navy-mid: oklch(28% 0.035 258)

── Text ──
--text-primary:       oklch(13% 0.02 258)    --text-on-dark:       oklch(95% 0.005 258)
--text-secondary:     oklch(35% 0.01 258)    --text-on-dark-muted: oklch(70% 0.01 258)
--text-muted:         oklch(48% 0.008 258)

── Clinical Semantics (NEVER use for chrome) ──
--safe:            oklch(40% 0.12 170)   + -light, -on-dark variants
--warning:         oklch(60% 0.13 85)    + -light, -on-dark, -on-light variants
--danger:          oklch(50% 0.18 25)    + -light, -on-dark variants
--downgrade:       oklch(30% 0.08 55)    + -light, -on-dark variants

── UI Chrome (NEVER use for clinical) ──
--ui-accent:         oklch(35% 0.12 258)   + -light, -on-dark variants

── Data Palette (HEX OK — Tol colorblind-safe) ──
--cmp-1: #004488  --cmp-2: #DDAA33  --cmp-3: #BB5566        (2-3 series)
--data-1..7: Tol Bright                                       (4-7 series)

── Severity Tokens (Batch 1 — maps clinical → panel/checkpoint) ──
--severity-neutral:  var(--border)          --severity-neutral-dot:  var(--text-muted)
--severity-caution:  var(--warning)         --severity-caution-dot:  var(--warning-on-light)
--severity-danger:   var(--danger)          --severity-danger-dot:   oklch(42% 0.16 25)
--severity-hope:     var(--safe)            --severity-hope-dot:     oklch(34% 0.10 170)
--severity-resolved: var(--text-muted)      --severity-resolved-dot: var(--text-secondary)

── Typography ──
--font-display: 'Instrument Serif'  --font-body: 'DM Sans'  --font-mono: 'JetBrains Mono'
--text-hero: clamp(56px,4.5vw,86px) → --text-h1 → --text-h2 → --text-h3 → --text-body → --text-small → --text-caption

── Spacing ──
--space-xs:8  --space-sm:16  --space-md:24  --space-lg:40  --space-xl:64  --space-2xl:96

── Radius ──
--radius-sm:8  --radius-md:12  --radius-lg:20

── Motion ──
--ease-out-expo: cubic-bezier(0.16,1,0.3,1)
--duration-fast:200ms  --duration-normal:400ms  --duration-slow:800ms  --duration-dramatic:1200ms
```

## Stage Modes

| Mode | Class | Bg | Text | Use |
|------|-------|----|------|-----|
| Plan A | `.stage-a` | Dark navy | Light | 1920×1080, GSAP, teatro |
| Plan B | `.stage-bad` | White | Black | 1280×720, no GSAP, backup |
| Plan C | `.stage-c` | Light gray | Dark | 1280×720, GSAP, **default** |
| High-contrast | `.high-contrast` | White/Black | Max contrast | Accessibility |

## Engine.js Animations

`countUp` · `stagger` · `drawPath` · `fadeUp` · `highlight`

All driven by `data-animate="type"` on elements. Engine dispatches on `slidechanged`.

## Commands

```bash
npm run dev              # Vite hot reload (port 3000)
npm run build            # Produção
npm run preview          # Servir localmente (palco)
npm run lint:slides      # Assertion-evidence linter
npm run build:cirrose    # Concatena slides → index.html via _manifest.js
```

## Known Issues (as of 28/fev/2026)

1. **case-panel.js:** `renderTimeline()` has hardcoded HEX colors — migrate to `var(--severity-*)` tokens.
2. **meld-calc.js:** Literal `#1a1a2e` for bg — migrate to `var(--bg-navy)`. Missing null checks on inputs.
3. **.gitignore:** `*.png` pattern ignores QA screenshots in `qa-screenshots/` dir.
4. **index.stage-c.html:** Deprecated; index.html (modular) é fonte. qa-screenshots usa index.html + PORT 3000.
