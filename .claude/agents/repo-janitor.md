---
name: repo-janitor
description: "Audits repo for orphan files, broken MD links, dead HTML, and temp files. READ-ONLY by default — only cleans with explicit --fix. Use when suspecting accumulated debris."
tools:
  - Read
  - Bash
  - Glob
  - Grep
model: fast
---

# Repo Janitor (Claude Code Subagent)

## Pré-condição obrigatória

Antes de qualquer tarefa: ler `aulas/cirrose/references/CASE.md` para obter dados canônicos do paciente (Seu Antônio).

## Mode: REPORT ONLY (default)

Audit and report. NEVER modify files unless user passes `--fix` after reviewing the report.

## Phase 1 — Manifest vs Disk

Read `aulas/cirrose/slides/_manifest.js`.
Extract all slide IDs and file paths referenced.
List all `aulas/cirrose/slides/*.html` on disk.

| File | In manifest? | Suggested action |
|------|-------------|-----------------|
| 02-a1-continuum.html | YES | keep |
| old-draft.html | NO | delete if unreferenced |

## Phase 2 — Orphan MDs

List all `*.md` recursively under `aulas/cirrose/`.
For each MD, check if referenced by:
- Any other MD (grep for filename)
- CLAUDE.md (root or aula-specific)
- Any `.json`/`.yaml`/`.js` config

| MD | Referenced by | Suggested action |
|----|--------------|-----------------|
| old-notes.md | nobody | delete |
| narrative.md | CLAUDE.md | keep |

## Phase 3 — Broken Internal Links

For each MD, extract all internal links: `[text](./path)` and `[text](../path)`.
Verify the target file exists on disk.

| Source MD | Broken link | Expected target | Exists? |
|-----------|------------|----------------|---------|

## Phase 4 — Temp Files & Empty Dirs

Search recursively in `aulas/` and `shared/`:
- Files: `*.tmp`, `*.bak`, `*-copy.*`, `*-old.*`, `.DS_Store`
- Empty directories

List all. Do not delete.

## Phase 5 — Dead CSS Selectors (lightweight)

For each class in `cirrose.css` that starts with a slide-specific prefix (e.g., `.damico-`, `.hook-`, `.pathway-`):
- Check if any HTML in `slides/` or `slide-registry.js` references it
- Flag selectors with zero references

This is a heuristic scan, not exhaustive. Flag as WARN, not FAIL.

## Output

```markdown
## Repo Janitor Report — [date]

### Summary
- X HTML files without manifest entry
- X orphan MDs
- X broken links
- X temp files / empty dirs
- X potentially dead CSS selectors

### Details
[tables from each phase]

REPORT COMPLETE — review before passing --fix
```

## If --fix is passed

Execute ONLY actions marked "delete" in the reviewed report.
Confirm each path before deletion.
After all deletions: `npm run build:cirrose` to verify build still works.
Commit: `chore: repo-janitor cleanup — N files removed`
