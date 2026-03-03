# HANDOFF — Cirrose (projeto)

> Só pendências. Detalhes → CHANGELOG.md, ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Prioridades (ordem — HTML só no final)

**Regra:** Mexer HTML só depois de todo o resto perfeito e funcionando.

1. **Loops seguros** — Ver viabilidade de loops rodando enquanto Lucas estuda:
   - QA de slides (screenshots, lint, a11y)
   - Mudanças incrementais (build, deploy)
   - Perplexity / pesquisa para outros agentes em segundo plano
   - Melhora da narrativa (biblia, storyboard)
   - Outros: sync Notion, reference-checker, etc.
2. **Verbosity** — AUDIT-VISUAL.md (404 linhas): split ou index; docs-audit reference.md critério
3. **Biblia narrativa** — docs/biblia-narrativa.md (302 linhas): index ou split por bloco
4. **Alinhamento Notion** — docs/SYNC-NOTION-REPO.md; References DB; Slides DB status
5. **Conflitos** — verificar redundâncias restantes (.cursor vs .claude, paths)
6. **HTML** — só após 1–5 ok: ERRO-008, AUDIT-VISUAL fixes, speaker notes PT

---

## Pendências (detalhe)

- ERRO-008 — Case panel redundante em s-hook
- AUDIT — Fixes I2–I10 (AUDIT-VISUAL.md)
- Speaker notes EN → PT
- NNT IC 95%: 4 slides [TBD] (08, 10, 11, 12) — ver tasks/NNT-IC95-REPORT.md

---

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.

---

*03/mar*

---

## Batches de otimização arquitetural — 03/03/2026 (orquestrador Claude.ai)

### Executados

| Batch | Commit | Mudança |
|-------|--------|---------|
| 1 | 7cbe353 | qa-engineer model opus→fast. verifier reescrito. reference-checker escopo honesto. |
| 3 | 527f588 | slide-builder escalação → Lucas (não agents fantasma). |
| 4 | b5c3f8b | Removidas refs fantasma a docs/pipeline/. reference-checker item 4 corrigido. |
| 5 | 9b27c51 | SUBAGENTS docs atualizados. Limpeza untracked. |
| 6 | 71cb825 | Pipeline otimizado: verifier→spot-check, ref-manager+scite+zotero, qa-engineer position. |

### Estado dos agents

| Agent | Model | MCPs | Escopo |
|-------|-------|------|--------|
| slide-builder | opus | playwright | Cria HTML por spec. Escala pra Lucas. |
| qa-engineer | fast | playwright | Lint,a11y,screenshots. Relatório formal. |
| reference-manager | opus | pubmed,crossref,notion,scite,zotero | Valida refs, formata AMA, cadastra Notion. |
| verifier | fast | nenhum | Checa se qa-engineer rodou, build passa, spot-check. |
| reference-checker (Cursor) | fast | nenhum (scan-only) | Extrai PMIDs/DOIs de HTML. |

### Pipeline linear

reference-checker → reference-manager → slide-builder → qa-engineer → verifier

### Conflitos pendentes (resolver quando iniciar conteúdo)
- BAVENO VII: PMID 35431106 vs 35120736
- Case Antônio: repo=40g/dia, Notion=60g/dia
