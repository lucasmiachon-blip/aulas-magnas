---
name: docs-audit
description: Audits docs/*.md and rules/skills for links, redundancy, verbosity, and token economy. Use when user says "audite os docs", "verifique os MDs", "audit markdown", or before long sessions to reduce context. Executes via subagent generalPurpose or qa-engineer.
---

# Auditing Docs

Audits markdown files using criteria from dev, designer, prompt engineer, systems engineer, and token-economy perspectives. See [reference.md](reference.md) for detailed checklist.

## When to Use

- User: "audite os docs", "verifique os MDs", "audit markdown", "revisar documentação"
- Before long sessions (reduce context load)
- After batch doc changes
- When context saturates (token economy)

## Execution

Delegate to subagent `generalPurpose` or `qa-engineer` with prompt:

```
Siga .claude/skills/docs-audit/SKILL.md. Audite docs/*.md em batches de 5-7. Reporte no formato do skill.
```

## Quick Checklist

| Domain | Focus |
|--------|-------|
| Systems | Links valid, paths relative, cross-refs consistent |
| Dev | Single source per concept, no duplication |
| Prompt eng | Reference over duplicate, tables for comparison |
| Tokens | Docs >200 lines → index or reference.md, no time-sensitive data |
| Design | Header hierarchy, lists for discrete items |

## Output Format

```
## Docs Audit — [date]

| Domain | Status | Items |
|--------|--------|-------|
| Links | PASS/WARN/FAIL | ... |
| Redundancy | PASS/WARN/FAIL | ... |
| Verbosity | PASS/WARN/FAIL | ... |
| Tokens | PASS/WARN/FAIL | ... |
| Structure | PASS/WARN/FAIL | ... |

### Recommended actions
1. ...
```

## Tools

- Grep: `\[.*\]\(.*\)` for links
- Read: sample 5-7 docs per batch
- Optional: `npx markdownlint-cli docs/**/*.md` (if installed)

## References

- [reference.md](reference.md) — detailed criteria per domain
- docs/README.md — doc index
