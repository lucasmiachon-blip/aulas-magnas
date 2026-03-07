# HANDOFF — Projeto Aulas Magnas (atualizado 2026-03-04)

## Estado geral

| Aula | Slides HTML | QA Visual | Status |
|------|-------------|-----------|--------|
| **Cirrose** | 28/28 (20 core + 8 APP) + D'Amico em progresso | ✅ 24/fev base; D'Amico QA 04/mar | HTML completo, D'Amico slide WIP, speaker notes PT pendente |
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
- **QA Visual:** 28/28 screenshots OK (24/fev). D'Amico slide QA 4 estados (04/mar). Média 2.7/5.0 — redesign slide-a-slide pendente.
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

## Próxima sessão — Prioridades (ordem)

**Regra:** HTML só depois de todo o resto perfeito e funcionando.

| # | Prioridade | Escopo |
|---|------------|--------|
| 1 | **Loops seguros** | Viabilidade de loops rodando enquanto Lucas estuda: QA slides, mudanças, Perplexity/pesquisa em bg, melhora narrativa, sync Notion, etc. |
| 2 | **Verbosity** | AUDIT-VISUAL.md (404 linhas) — split ou index |
| 3 | **Biblia narrativa** | docs/biblia-narrativa.md (302 linhas) — index ou split |
| 4 | ~~**Alinhamento Notion**~~ | ✅ DONE (03/mar) — References DB schema + must-read trials |
| 5 | ~~**Conflitos**~~ | ✅ DONE (04/mar) — Auditoria .cursor vs .claude, README atualizado, handoff format definido |
| 6 | **HTML** | Só após 1–5: ERRO-008, AUDIT fixes, speaker notes PT |

## Pendências globais

1. Speaker notes: converter EN → PT em todos os 28 slides
2. References DB: 15 refs pendentes de popular no Notion
3. Slides DB: 24 slides pendentes update Pipeline Status → qa-passed no Notion
4. Ghost text em transições: avaliar `transition: none` ou workaround
5. Meta-análise: iniciar implementação HTML
6. D'Amico slide: 7 pendências — ver `aulas/cirrose/HANDOFF.md`
7. 21 referências [TBD] — PMIDs a buscar (catalogadas em `aulas/cirrose/NOTES.md`)

## Notion

`docs/SYNC-NOTION-REPO.md`

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.

---
*Atualizado 04/03/2026 — Prioridades 4-5 concluídas. Próximo: loops seguros, verbosity, biblia, HTML.*
