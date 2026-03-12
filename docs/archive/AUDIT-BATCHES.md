# Auditoria em Batches — Relatório

> Executado conforme [tasks/todo.md](../../tasks/todo.md). Documentação de achados e resoluções.

---

## Batch 1: Rules — .cursor vs .claude

### Mapeamento

| Rule | .cursor | .claude | Status |
|------|---------|---------|--------|
| medical-data | 17 linhas, conciso | 103 linhas, checklist E21, versionamento, fontes Tier 1 | Consolidado: .cursor canônico; conteúdo útil de .claude incorporado |
| slide-editing | 54 linhas, tri-mode, globs | 51 linhas, AI markers, batch workflow | Consolidado: .cursor canônico; AI markers adicionados |
| design-principles | 77 linhas, Miller/Gestalt/Tufte | 145 linhas, andragogia, mais princípios | .cursor canônico; .claude tem extensão |
| css-errors | 31 linhas, clusters | 87 linhas, E-codes completos | .cursor canônico; referência a E-codes |
| cirrose-design | 54 linhas, tokens resumidos | — | .cursor only |
| design-system | — | 256 linhas, OKLCH completo | Migrado para .cursor/rules/design-system.mdc |
| motion-qa | — | 138 linhas, heurísticas GSAP | Migrado para .cursor/rules/motion-qa.mdc |
| reveal-patterns | — | 131 linhas, data-animate, speaker notes | Migrado para .cursor/rules/reveal-patterns.mdc |
| plan-mode, core-constraints, notion-mcp | .cursor only | — | Mantidos |

### Ações executadas

- [x] .cursor definido como fonte canônica → **Revisado 04/mar:** complementares, não redundantes (ver `.claude/rules/README.md`)
- [x] motion-qa, reveal-patterns, design-system migrados para .cursor
- [x] .claude/rules/README.md criado com aviso de depreciação
- [x] medical-data.mdc: adicionado versionamento e formato NNT
- [x] slide-editing.mdc: adicionados AI markers
- [x] css-errors.mdc: referência a E-codes

---

## Batch 2: Skills — .cursor vs .claude

### Mapeamento

| Skill | .cursor | .claude | Status |
|-------|---------|---------|--------|
| medical-slide | Workflow Notion→HTML, tri-mode | — | Mantido |
| visual-qa | Playwright, a11y, screenshots | — | Mantido |
| assertion-evidence | (em medical-slide) | Formato obrigatório, checklist | Complementar; medical-slide cobre |
| medical-data | (em medical-slide Step 2) | Verificação dados | Consolidado em medical-slide |

### Ações executadas

- [x] Frontmatter verificado: todos têm name e description
- [x] docs/SKILLS.md tabela atualizada
- [x] .claude/skills/README.md criado — manter assertion-evidence e medical-data como especializados

---

## Batch 3: Slides — Inconsistências

### Batches

- 3a: 00-title … 06-a1-etiologias (7 slides)
- 3b: 07-cp1 … 13-a2-he (7 slides)
- 3c: 14-cp2 … 19-close (6 slides)
- 3d: 20-app-aclf … 27-app-cirrox (8 slides)

### Status

- [x] npm run lint:slides — Clean (após correções base.css, preview.html)
- [x] Correções: base.css tokens shadow; preview.html notes; meld-calc HEX removidos
- [x] Auditoria amostral: zero ul/ol; data-background-color HEX permitido; assertion-evidence OK

### Violações P1 (dados clínicos — NNT sem IC 95%)

| Slide | NNT | Ação | Status |
|-------|-----|------|--------|
| 08-a2-carvedilol | NNT 9 | IC 95% não reportado no paper (PREDESCI) | [TBD] — ver tasks/NNT-IC95-REPORT.md |
| 09-a2-tips | NNT 4 | IC 95% 2,1–50 (García-Pagán 2010) | ✅ Aplicado |
| 10-a2-albumina | NNT 5 | Sort 1999 não reporta IC NNT | [TBD] |
| 11-a2-pbe | NNT 5 | Sort 1999 | [TBD] |
| 12-a2-hrs | NNT 7 | CONFIRM não reporta IC NNT | [TBD] |
| 21-app-tips | NNT 4 | IC 95% 2,1–50 (García-Pagán 2010) | ✅ Aplicado |

Regra: medical-data.mdc — "NNT deve incluir IC 95% e time frame obrigatoriamente". Relatório: tasks/NNT-IC95-REPORT.md.

---

## Batch 4: CSS shared — Tokens e convenções

### Inconsistências encontradas

| Doc | Afirma | Realidade |
|-----|-------|-----------|
| CLAUDE.md | shared/css/archetypes.css | Não existe — em aulas/cirrose/, grade/, osteoporose/ |
| CLAUDE.md | shared/css/cirrose.css | Não existe — em aulas/cirrose/ |

### Ações executadas

- [x] CLAUDE.md: Repo Structure corrigido (archetypes/cirrose em aulas/*/)
- [x] AGENTS.md: já estava correto (só base.css)
- [x] meld-calc.js: removidos fallbacks HEX, uso puro var(--safe), var(--warning), var(--danger)
- [x] case-panel.js: já usa data-severity + CSS (sem HEX inline)

---

## Batch 5: Docs — Sobreposição e estrutura

### Status

- [x] docs/README.md criado — índice por propósito
- [x] HANDOFFs mapeados (docs/HANDOFF + aulas/*/HANDOFF)
- [x] archive/ já contém REPO-DIAGNOSTIC, DIAGNOSTIC-27fev
- [x] archive/README.md atualizado

---

## Batch 6: AGENTS.md, CLAUDE.md

### Inconsistências

- CLAUDE.md linhas 120–122: paths CSS incorretos
- Verbosidade: CLAUDE.md ~275 linhas

### Ações executadas

- [x] Repo Structure corrigido em CLAUDE.md (Batch 4)
- [x] Hierarquia documentada: AGENTS → CLAUDE → aulas/cirrose/CLAUDE
- [x] Referência a docs/ para regras extensíveis

---

*Atualizado conforme execução dos batches.*
