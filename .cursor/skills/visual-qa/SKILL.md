---
name: visual-qa
description: Use when testing, reviewing, or doing QA on slides. Runs visual checks with Playwright screenshots, accessibility verification with a11y, contrast checks, and reports issues found.
---

# Visual QA for Slides

## When to use
- User says "QA", "revise", "teste o slide", "verifique", "screenshot"
- After implementing a batch of slides
- Before marking any slide as "ready" or updating Notion status

## Workflow

### Step 1: Open slide in browser
Use Playwright MCP to:
1. Navigate to the slide URL (local dev server or file://)
2. Wait for full render (fonts, images, CSS loaded)

### Step 2: Screenshot
Take screenshot at relevant resolutions:
- 1920×1080 (Plan A: dark/OLED)
- 1280×720 (Plan C: light/animated — default)
- Show screenshot to user for visual review

### Step 3: Accessibility check
Use a11y MCP to verify:
- [ ] Color contrast ratios ≥ 4.5:1 for body text (WCAG AA)
- [ ] All text is readable (no text-on-similar-background)
- [ ] Focus indicators visible for interactive elements
- [ ] Keyboard navigation works (arrows, Enter, Esc)

### Step 4: Specific checks per slide type
**For all slides:**
- [ ] Title is readable from 5m distance (Tier A ≥ 0.97vw)
- [ ] Body text meets Tier B minimum (≥ 0.78vw)
- [ ] References/footnotes meet Tier C minimum (≥ 0.65vw)
- [ ] No overflow/clipping of content
- [ ] Fill ratio matches expected type (data-heavy 75-90%, concept 65-80%)

**For interactive slides (GRADE):**
- [ ] Forward navigation: each click reveals next step
- [ ] Backward navigation: each click hides last step
- [ ] Reset on slide change: all steps cleared
- [ ] Screen-boost (C key): still legible with high-contrast
- [ ] dim-group: previous items fade, restore on backward

**For Cirrose (tri-mode):**
- [ ] Plan A (dark): contrast OK on true black?
- [ ] Plan B (light, no animation): content fully visible?
- [ ] Plan C (light, animated): animations work on light background?

### Step 5: Report
Format findings as:
```
## QA Report — Slide [ID]

### ✅ PASS
- [list what's OK]

### ⚠️ WARN
- [issues that should be fixed but aren't blockers]

### ❌ FAIL
- [must-fix before marking ready]

### Screenshot
[attach or reference screenshot]
```

### Step 6: Update Notion (if MCP available)
If issues found: update Pipeline Status to "needs-fix" with comment
If all pass: update Pipeline Status to "qa-passed"

## What NOT to do
- Don't change code during QA — only report issues
- Don't skip Plan B check for Cirrose (projection conditions vary)
- Don't mark as passed if any ❌ FAIL items remain
