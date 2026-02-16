# Review Slide

Audit a specific slide or entire lecture for assertion-evidence compliance,
accessibility, and clinical accuracy.

## Usage
`/review [lecture]` — review all slides
`/review [lecture] [slide-number]` — review specific slide

## Checklist per slide:

### Assertion-Evidence Format
- [ ] Title is complete sentence (not topic label)
- [ ] Body has ≤30 words text
- [ ] No bullet points
- [ ] Visual evidence present (chart/table/diagram/number)
- [ ] Citation with PMID in footer

### Accessibility
- [ ] Color contrast ≥ 4.5:1 (text on background)
- [ ] No meaning conveyed by color alone
- [ ] Alt text on images/SVGs
- [ ] Font size ≥ 18px effective
- [ ] Works without animation (data-animate graceful degradation)

### Clinical Accuracy
- [ ] Numbers have source attribution
- [ ] Effect sizes include confidence intervals
- [ ] Guideline cited is most current version
- [ ] No unsupported claims
- [ ] Data marked VERIFY if uncertain

### Design System Compliance
- [ ] All colors use OKLCH tokens (no hardcoded)
- [ ] Typography uses design scale (--text-h1, --text-body, etc.)
- [ ] Spacing uses tokens (--space-sm, --space-md, etc.)
- [ ] .slide-inner wrapper present
- [ ] Dark slides use .slide-navy class

### Speaker Notes
- [ ] Notes present with timing estimate
- [ ] Key emphasis points marked
- [ ] Transition to next slide described

## Output format:
For each slide, report: PASS / WARN (with fix) / FAIL (with fix)
Summary: total slides, pass rate, top 3 issues to fix
