---
name: docs-audit
description: Audits docs/*.md and rules/skills for links, redundancy, verbosity, and token economy. Use when user says "audite os docs", "verifique os MDs", "audit markdown", or before long sessions to reduce context. Executes via subagent generalPurpose or qa-engineer.
version: 0.2.0
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob
---

**Fonte canônica:** `.cursor/skills/docs-audit/` — este arquivo é redirect.

## Workflow (Claude Code)

Delegar para subagent `generalPurpose` ou `qa-engineer` com prompt:

```
Siga .cursor/skills/docs-audit/SKILL.md. Audite docs/*.md em batches de 5-7. Reporte no formato do skill.
```

Ver `.cursor/skills/docs-audit/SKILL.md` para checklist completo e `reference.md` para critérios detalhados.
