# Docs Audit — Reference

Detailed criteria per domain. Loaded when agent needs specifics.

---

## 1. Links (Systems Engineer)

- Path exists and is relative to doc
- No broken links (file/404)
- Cross-refs: docs/README → other docs consistent
- Format: `[text](path)` — path without leading slash for project-relative

## 2. Redundancy (Dev Professional)

- One doc per concept; others reference
- .cursor vs .claude: canonical source defined, deprecation noted
- Rules/skills: no content duplication
- IDs, tokens: single source (e.g. SYNC-NOTION-REPO for Notion IDs)

## 3. Verbosity (Prompt Engineer)

- Prefer reference over duplicate
- Paragraphs >4 lines → consider split or summary
- Tables for comparative data; prose for narrative
- Remove filler ("it is important to note that...")

## 4. Token Economy

- Docs >200 lines: add index or move detail to reference.md
- Time-sensitive (fixed dates): remove or generalize
- Inline code: essential only; rest in referenced file
- Assume model knows basics; add only project-specific context

## 5. Structure (Designer)

- Header hierarchy: h1 → h2 → h3 (no skips)
- Lists for discrete items; prose for flow
- Tables: aligned, clear headers
- Consistent formatting across docs

---

## Batch Strategy

- 5-7 docs per batch
- Prioritize: docs/README, HANDOFFs, RULES, SKILLS, SUBAGENTS
- Then: scope docs, MCP docs, aula-specific
