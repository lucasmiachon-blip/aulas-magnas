# Changelog — aulas-magnas

## [Unreleased]

### Added
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

### Fixed
- lint:slides — 6 erros (NOTES preview, COLOR base.css) resolvidos
