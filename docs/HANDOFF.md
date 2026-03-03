# HANDOFF — Projeto Aulas Magnas (atualizado 2026-02-27)

## Estado geral

| Aula | Slides HTML | QA Visual | Status |
|------|-------------|-----------|--------|
| **Cirrose** | 28/28 (20 core + 8 APP) | ✅ 24/fev — 28/28 OK | HTML completo, speaker notes PT pendente |
| **Meta-análise** | 0/16 | — | Blueprint v2 no Notion, sem HTML |
| **GRADE** | 58/58 | — | Migração completa (Aulas_core → aulas-magnas) |
| **Osteoporose** | 70/70 | — | Migração completa (Aulas_core → aulas-magnas) |

## GRADE — Último estado (2026-02-27)

- **Arquivos:** `aulas/grade/slides/*.html` (58 arquivos modulares)
- **Build:** `npm run build:grade` → gera `index.html` a partir de `_manifest.js` + template
- **Manifest:** `slides/_manifest.js` (source of truth, ordem _list.txt Aulas_core)
- **CSS:** `grade.css` + `archetypes.css`
- **Script migração:** `scripts/migrate-grade-slides.js`
- **Ver:** `aulas/grade/HANDOFF.md`

## Osteoporose — Último estado (2026-02-27)

- **Arquivos:** `aulas/osteoporose/slides/*.html` (70 arquivos modulares)
- **Build:** `npm run build:osteoporose` → gera `index.html` a partir de `_manifest.js` + template
- **Manifest:** `slides/_manifest.js` (46 main + 25 appendix)
- **CSS:** `osteoporose.css` + `archetypes.css`
- **Script migração:** `scripts/migrate-osteoporose-slides.js`
- **Ver:** `aulas/osteoporose/HANDOFF.md`

## Cirrose — Último estado

- **Arquivos:** `aulas/cirrose/slides/*.html` (28 arquivos modulares)
- **Build:** `npm run build:cirrose` → gera `index.html` a partir de `_manifest.js` + template
- **Manifest:** `slides/_manifest.js` (source of truth para ordem e panel states)
- **Wiring:** `slide-registry.js` (custom anims, panel, click-reveal, meld)
- **Sections:** 28 (20 core + 8 APP)
- **QA Visual:** 28/28 screenshots OK (24/fev). Média 2.7/5.0 — redesign slide-a-slide pendente.
- **CSS:** `cirrose.css` + `archetypes.css` (consolidado FASE 2)
- **Cirrose:** Pendências → `aulas/cirrose/HANDOFF.md` · Claude.ai → `aulas/cirrose/HANDOFF-CLAUDE-AI.md`

## MCPs acadêmicos (2026-02-26)

| MCP | Custo | Variável .env |
|-----|-------|---------------|
| semantic-scholar | Grátis (opcional key) | `SEMANTIC_SCHOLAR_API_KEY` |
| arxiv | Grátis | — |
| google-scholar | Grátis (experimental) | — |
| perplexity | Pago | `PERPLEXITY_API_KEY` |
| Scite | Pago (Premium) | OAuth na 1ª conexão |

Ver `docs/MCP-ENV-VARS.md` para variáveis necessárias.

## ZIP Limpo (protocolo IA)

- **Script:** `scripts/build-zip-limpo-ia.ps1` — alinhado a Aulas_core
- **Uso:** `npm run zip:ia` ou `.\scripts\build-zip-limpo-ia.ps1 [cirrose|grade|metanalise|all]`
- **Output:** `exports/aulas-magnas-ia-YYYYMMDD.zip`
- **Inclui:** código + screenshots PNG. **Exclui:** node_modules, dist, fontes, imagens pesadas

## Próxima sessão

**Auditoria batches concluída.** Ver `docs/AUDIT-BATCHES.md`. Próximo:
- NNT com IC 95%: 6 slides (08, 09, 10, 11, 12, 21)
- Conteúdo/criação de slides somente após resolver pendências

## Pendências globais

1. Speaker notes: converter EN → PT em todos os 28 slides
2. References DB: 15 refs pendentes de popular no Notion
3. Slides DB: sincronizar pipeline status (muitos ainda em `draft` ou `html-ready` — deveriam ser `qa-passed`)
4. Ghost text em transições: avaliar `transition: none` ou workaround
5. Meta-análise: iniciar implementação HTML

## Notion

`docs/SYNC-NOTION-REPO.md`

---
*Atualizado 03/03/2026 — Auditoria batches concluída. docs/AUDIT-BATCHES.md, tasks/lessons.md. Próximo: NNT IC 95%.*
