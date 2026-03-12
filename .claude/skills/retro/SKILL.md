---
name: retro
description: Extract lessons from current session into tasks/lessons.md. Use after corrections or at session end.
disable-model-invocation: true
allowed-tools: Read, Edit, Write, Grep, Glob
---

# Retro — Extract Lessons

Review the current session for learnable moments:

## What to look for

1. **Mistakes made** — what went wrong and the correction applied
2. **Anti-patterns discovered** — patterns that should be avoided
3. **New rules needed** — corrections that should become permanent rules in `.claude/rules/`
4. **Rules that failed** — existing rules that were ignored, wrong, or insufficient
5. **User corrections** — anything the user explicitly corrected (highest signal)

## Process

1. Read `tasks/lessons.md` to avoid duplicates
2. Read `.claude/rules/` index to check if lesson maps to existing rule
3. Append NEW lessons to `tasks/lessons.md` with format:

```markdown
## Session [YYYY-MM-DD] — [topic summary]

### [lesson title]
- **Context:** what happened
- **Fix:** what was done
- **Rule:** generalized principle
- **Maps to:** [.claude/rules/file.md] or [NEW RULE NEEDED]
- **Status:** capture | apply | dismiss
```

4. If lesson maps to existing rule that needs update → propose specific edit
5. If lesson needs NEW rule → draft it with file name and content

## Status meanings
- **capture**: recorded, needs review before becoming rule
- **apply**: validated, should be applied to rules
- **dismiss**: investigated, not worth making permanent

## Gate
- NEVER modify `.claude/rules/` directly — only propose changes
- User must approve rule changes (contraponto obrigatorio)
