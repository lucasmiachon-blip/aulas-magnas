# Changelog — aulas-magnas

## [Unreleased]

### Added (2026-03-14 — Classe C guard)
- `scripts/pre-commit.sh`: hook versionado que bloqueia commits de conteúdo (slides, CSS, JS, references) em `main`. Bypass: `ALLOW_MAIN_CONTENT=1`.
- `scripts/install-hooks.sh`: atualizado para delegar pre-commit a `scripts/pre-commit.sh` (mesmo padrão do pre-push).
- `docs/SETUP.md`: seção 1b documentando instalação de hooks.

### Fixed (2026-03-05 — Bloco 1 HTML fixes)
- `aulas/cirrose/slides/06-a1-etiologias.html` (I4): redesign completo — tabela 3→10 etiologias em grid 2×5 compacto com `etio-grid`; Álcool/MASLD/HCV destacados; `archetype-metrics` adicionado
- `aulas/cirrose/slides/05-a1-infeccao.html` (I3+S3): `archetype-metrics` adicionado para fill ratio; stagger delay 0.3→0.2
- `aulas/cirrose/cirrose.css` (I4): adicionado `.etio-grid` + `.etio-item` + `.etio-item--major` + `.etio-name` + `.etio-tx` (grid 2×5 compacto)
- `.gitignore`: adicionado `.playwright-mcp/`

### Fixed (2026-03-05 — Docs cleanup + D'Amico CSS bug)
- `aulas/cirrose/cirrose.css`: 1-char CSS bug `#s-a1-damico.archetype-flow` → `#s-a1-damico .archetype-flow` (descendant selector was broken — grid-template-rows never applied to D'Amico slide)
- `aulas/cirrose/AUDIT-VISUAL.md`: trimmed 574→479 lines — added SYS-1/2/3 systemic issues block; condensed 28 per-slide sections to use SYS-N references and backlog IDs instead of verbose repetitions
- `docs/biblia-narrativa.md`: added Índice TOC (9 sections); replaced duplicated NNT/NNH table with link to canonical `evidence-db.md`
- `aulas/cirrose/HANDOFF.md`: marked priority #5 (conflicts) as DONE — 7 pairs verified, no conflicts found

### Added (2026-03-05 — Análise HTML externo)
- `docs/insights-html-cirrose-2026.md`: Análise de HTML Gemini (18 slides), 14 trials 2025 a verificar, insights de interação priorizados, QA visual via Playwright (21 screenshots)

### Removed (2026-03-05 — Codebase health cleanup)
- `aulas/cirrose/index.stage-b.html` — deprecated Plan B entry point (46 KB)
- `aulas/cirrose/index.stage-c.html` — deprecated entry point, replaced by modular `index.html` (52 KB)
- `aulas/cirrose/scripts/split-slides.js` — one-off migration script, dependent on deleted stage-c
- `scripts/transcribe-lecture.js` — one-off transcript tool, not in build pipeline (14 KB)
- `scripts/qa-pdf-stage-b.js` — QA for deprecated Stage B (1.6 KB)
- `scripts/migrate-grade-slides.js` — one-off migration, complete (4.5 KB)
- `scripts/migrate-osteoporose-slides.js` — one-off migration, complete (5.5 KB)
- `package.json`: removed `"transcribe"` script entry

### Fixed (2026-03-05 — Data conflict + dedup)
- `docs/biblia-narrativa.md`: Cr 3,1 → Cr 2,8 for CP2 (lines 24, 154) — aligned with `_manifest.js` and `14-cp2.html`
- `aulas/cirrose/references/narrative.md`: same Cr fix (lines 82, 119)
- `docs/biblia-narrativa.md`: replaced duplicated "TABELA DE EVIDENCIAS" and "TBDs RESOLVIDOS" sections with links to canonical `evidence-db.md`
- `scripts/export-pdf.js`: removed Plan B (`index.stage-b.html`) from PDF export loop
- `CLAUDE.md`, `AGENTS.md`, `aulas/cirrose/CLAUDE.md`: removed references to deleted files

### Added (2026-03-04 — Flip patch + QA fixes)
- `slide-registry.js`: importou `Flip` from 'gsap/Flip'; `advance()` captura `Flip.getState(formulaBlock)` antes de `showEra(5)`; `runEra5Anims(preFlipState)` usa `Flip.from → fireCountUps` com fallback `gsap.from`
- `index.template.html`: import `Flip` + `gsap.registerPlugin(SplitText, Flip)`

### Fixed (2026-03-04 — QA visual — panel overlap + Era 5 layout)
- `archetypes.css`: `--panel-width` de 140px → 200px; `.reveal.has-panel .slide-inner` agora left-aligned (`margin: 0 0 0 2rem`) com `max-width: calc(100% - var(--panel-width) - 3rem)` — elimina sobreposição de headline com case-panel em todos os slides
- `archetypes.css`: `.case-panel .panel-field-value` font-size 15px → 13px + `text-align: right` — evita transbordamento de valores longos
- `cirrose.css`: `.damico-dataset .pathway-track { display:flex }` + `.damico-dataset .pathway-stage { flex:1; flex-direction:column }` — Era 5 layout horizontal corrigido (antes herdava `display:block` do `archetype-flow`)
- `cirrose.css`: `.scores-era { overflow-y: hidden }` (era `auto`) — elimina scrollbar em Era 1 (CTP limitações) e Era 5
- `cirrose.css`: `.scores-limitations { gap:4px; margin-top: var(--space-xs) }` + `.limitation { padding:4px var(--space-sm) }` — compacta limitações CTP para caber na track de 720px
- `cirrose.css`: `.scores-era[data-era="5"] { gap:4px }` + `.damico-dataset .pathway-value { font-size: var(--text-small) }` — compacta Era 5 para acomodar dois datasets
- `slides/_manifest.js`: `stage: 'cACLD → CSPH'` → `'cACLD/CSPH'` — corrige truncamento no panel-field

### BUG CONHECIDO (não corrigido — ver HANDOFF)
- `cirrose.css` linha 1823: `#s-a1-damico.archetype-flow` (sem espaço) nunca casa → `grid-template-rows: auto auto 1fr auto` não aplica → scores-era-track fica em `height: auto` (~267px) → Era 5 dataset 2014 clippado. Fix: adicionar espaço → `#s-a1-damico .archetype-flow`

### Added (2026-03-04 — Screening + Escores Prognósticos)
- `aulas/cirrose/slides/02c-a1-screening.html` — Novo slide "Rastreamento cACLD" (5 estados, archetype-flow); PMID 38934697; âncora narrativa Antônio
- `aulas/cirrose/slides/02b-a1-damico.html` — Reescrito como "Escores Prognósticos": 6 eras Child→CTP→MELD→MELDNa→MELD3.0→D'Amico; 4 limitações CTP em stagger; PMIDs 4541913, 11172350, 16697729, 34481845
- `_manifest.js`: slot `s-a1-screening` inserido entre damico e fib4; 30 slides total
- `slide-registry.js`: `s-a1-screening` adicionado (CountUp 83%, stagger critérios, flipIn cards); `s-a1-damico` reescrito (6 eras, era-swap state machine, reset na re-entrada)
- `cirrose.css`: CSS `screening-*`, `scores-era-*`, `limitation-*`, `scores-formula`, `ctp-class`, failsafes Plan B
- `evidence-db.md`: PMID 38934697 + nota TBD CTP interobserver

### Fixed
- `s-a1-screening`: justify-content:center → flex-start (overflow não empurrava headline acima do viewport)
- `slide-registry.js`: reset de display/opacity no init das funções para evitar persistência de estado em re-entrada de slide

### Added (previous)
- `tasks/PLAN-AUDIT-PENDING.md` — Plano execução paralela (4 tracks)
- `tasks/NNT-IC95-REPORT.md` — Relatório IC 95% NNT (6 slides)
- `docs/AUDIT-BATCHES.md` — Relatório auditoria em batches
- `docs/README.md` — Índice docs por propósito
- `tasks/lessons.md` — Padrões aprendidos
- `.cursor/rules/motion-qa.mdc`, `reveal-patterns.mdc`, `design-system.mdc` (migrados de .claude)
- `.claude/rules/README.md`, `.claude/skills/README.md` — Avisos depreciação
- base.css: tokens `--shadow-subtle`, `--shadow-soft`, `--overlay-border`
- `docs/ECOSYSTEM.md` — Registro de ferramentas, MCPs, GitHub
- `tasks/todo.md` — Checklist auditoria batches
- `docs/prompts/weekly-updates.md` — Prompt para busca semanal de atualizações
- `docs/SKILLS.md` — Melhores práticas para Cursor skills
- `docs/RULES.md` — Melhores práticas para Cursor rules
- `docs/SUBAGENTS.md` — Melhores práticas para subagents (mcp_task)
- core-constraints.mdc: regra Context Window (≥70% informar, ≥85% recomendar, ≥95% parar)
- docs/README.md: MD Auditoria via skill/subagent (não manual)
- .cursor/skills/docs-audit/, .claude/skills/docs-audit/: reescrito conforme best practices mar/2026 (Anthropic, Cursor, OpenAI). SKILL.md conciso + reference.md progressive disclosure. Espelho para Claude Code.
- docs/SUBAGENTS-PROPOSAL.md: proposta consolidada (Cursor, Opus, Anthropic). Verifier adicionado. agents/README.md: pipeline humano ≠ subagents.
- .claude/commands/audit-docs.md: comando /audit-docs

### Changed
- CLAUDE.md: Repo Structure (archetypes/cirrose em aulas/*/), hierarquia docs
- meld-calc.js: removidos fallbacks HEX
- base.css: card-metric, slide-figure — oklch → var(--shadow-*)
- preview.html: section erro com notes
- medical-data.mdc, slide-editing.mdc, css-errors.mdc: conteúdo ampliado
- docs/SKILLS.md: tabela skills
- docs/archive/README.md: descrição
- docs/RULES.md, docs/SUBAGENTS.md: referência Context Window
- docs/SYNC-NOTION-REPO.md: autoridade em conflito — Composer/Opus prevalece
- notion-mcp.mdc: IDs referenciam SYNC-NOTION-REPO; regra de conflito
- `aulas/cirrose/HANDOFF.md` — Próxima sessão: auditoria batches
- `aulas/cirrose/HANDOFF-CLAUDE-AI.md` — Próxima sessão
- `docs/HANDOFF.md` — Próxima sessão, data 03/mar
- `.cursor/rules/cirrose-design.mdc` — Tokens alinhados com base.css (--bg-surface, --safe, --warning, --danger)
- `.cursor/rules/core-constraints.mdc` — Description preenchida
- `.cursor/rules/medical-data.mdc` — Description preenchida
- `.cursor/rules/css-errors.mdc` — Description refinada
- `.cursor/rules/design-principles.mdc` — Description com referência docs
- `.cursor/skills/medical-slide/SKILL.md` — Referência docs/SKILLS.md
- `.cursor/skills/visual-qa/SKILL.md` — Referência docs/SKILLS.md
- docs/SKILLS.md, RULES.md: links ~/.cursor/ substituídos por nota (paths externos)
- docs/README.md: archive/ → archive/README.md
- .claude/skills/docs-audit/: stub, fonte canônica em .cursor
- CLAUDE.md, docs/SETUP.md, docs/ECOSYSTEM.md: datas/paths generalizados
- 09-a2-tips, 21-app-tips: NNT 4 com IC 95% 2,1–50 (García-Pagán 2010)

### Fixed
- lint:slides — 6 erros (NOTES preview, COLOR base.css) resolvidos
