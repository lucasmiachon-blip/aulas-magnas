# Search Evidence

Search PubMed and Semantic Scholar for clinical evidence on a specific topic.
Uses MCP servers when available, falls back to web search.

## Usage
`/evidence [query]`

Example: `/evidence "terlipressin HRS-AKI RCT 2023-2026"`

## Steps:

1. Search PubMed MCP for relevant articles (if available)
2. Search Semantic Scholar MCP for citation networks (if available)
3. Filter for tier-1 evidence:
   - RCTs (filter: randomized controlled trial[pt])
   - Meta-analyses (filter: meta-analysis[pt])
   - Guidelines (filter: practice guideline[pt])
   - Systematic reviews (filter: systematic review[pt])
4. Sort by date (newest first)
5. For each relevant result, extract:
   - Full citation (AMA format)
   - PMID / DOI
   - Key numbers (primary endpoint, effect size, CI, p-value, n)
   - What changed vs. prior evidence

## Output format:
```
## [Topic] — Evidence Summary (searched [date])

### Tier-1 Sources Found:

1. **[Trial Name]** (Year)
   Citation: Author et al. Journal Year;Vol:Pages. PMID: XXXXX
   Design: [RCT/Meta-analysis/Guideline]
   n = XXX | Primary endpoint: [description]
   Result: [effect size] (95% CI: X-Y), p = Z
   Impact: [what this changed in practice]

### Slide-ready assertion:
"[Complete sentence suitable for slide title]"

### Data to verify:
- [any uncertain numbers flagged]
```
