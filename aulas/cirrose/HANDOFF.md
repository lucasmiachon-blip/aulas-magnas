# HANDOFF — Cirrose (projeto)

> Só pendências ativas. Histórico → CHANGELOG.md. Erros → ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Estado atual — 2026-03-14 (QA Loop 1 baseline aplicado)

**Slides:** 44 buildados (2 pre + 8 Act 1 + 16 Act 2 + 7 Act 3 + 3 CP + 1 close + 8 app) · **Build:** ✅ · **Lint:** ✅ (slides + case-sync + narrative-sync)
**Source of truth:** ✅ Validado — CASE→evidence-db→narrative→manifest→HTML (44/44 consistente, 0 drift de dados).
**Act 2 skeletons:** ✅ 7/7 preenchidos com conteúdo HTML real (fontes, números, notes com timing).
**Act 3 skeletons:** ✅ 4/4 preenchidos com conteúdo HTML real (hero-stat, comparison, etiology-compare, flow).
**AUDIT-VISUAL.md:** ✅ Rubrica expandida 8→13 dimensões (merge qa-engineer). Scoring 1-10, min 9 para PASS.
**QA Act 1:** ✅ Loop 1 baseline aplicado (14/mar/2026) — 11 slides × 14 dimensões, scores reais em AUDIT-VISUAL.md. Nenhum slide PASS (>= 9 em todas dim). Gargalo: E (fill ratio), M (word count), L (carga cognitiva).
**QA Act 2:** ⏳ Bloqueado por Act 1 — não avançar até Act 1 = PASS.
**Gemini MCP:** Somente após Loop 1 PASS.
**Drifts cosméticos:** ✅ Corrigidos (3/3) — CLAUDE.md hash/data, HANDOFF decomposição + data.
**ERROR-LOG:** 33/33 corrigidos, 0 pendentes.
**Prep skills 12/mar:** ✅ DONE — repo-janitor (limpo), docs-audit (-234 linhas), evolve (7 patches), WTs absorvidas.

---

## CAMINHO CRÍTICO

### P0 ATUAL: Conteúdo + interações + CSS graves (slide a slide)

Foco em produto: corrigir erros de interação, CSS e conteúdo nos slides existentes antes de qualquer QA formal.

**s-hook (DONE — /review QA pendente):**
- Pergunta: "Qual sua conduta?" (narrativeCritical aprovado)
- GGT removido → 6 labs grid 3×2 (simétrico)
- Case panel: hidden (ERRO-008 fechado)
- ~85 linhas de CSS morto removidas (v1-v4 + sistema .hook-beat órfão)
- Inline style removido (INR text-transform → classe CSS)
- Build ✅ · 3 lints ✅ · `/review` QA pendente

### Backlog

- QA visual Gemini (estático por state + dinâmico): screenshots state-by-state, vídeo de reveals, monotonia visual Act 2
- h2 assertivos: Lucas decide no browser (fib4, meld, classify)
- 2 HEX hardcoded em cirrose.css (linhas ~1034, ~1905)
- PDF export quebrado (DeckTape)
- Nomes de arquivo semanticamente enganosos (05-a1-infeccao → s-a2-04, 24-app-ccc → s-a2-13, etc.)
- [TBD SOURCE]: sarcopenia prevalência, covert HE, centros TIPS Brasil, ESPEN 2019 PMID, QTc threshold

---

## FORA DE ESCOPO AGORA

Headings explicitamente adiados para batch posterior ao QA baseline do Act 1:

1. Renomear D'Amico para "Child, MELD e D'Amico: os modelos prognóstico"
2. Sequência "Testes não invasivos — mudança de paradigma"
3. Sequência "Scores e nuances"
4. Slide explicativo de elastografia
5. The Rule of 5 (redesign/expansão)
6. MELD / MELD-Na / MELD 3.0 (redesign/expansão)
7. Checkpoint "qual o próximo passo?"
8. Slide final do Ato 1: "Trajetórias — Cirrose e suas descompensações"

Acts 2 e 3: bloqueados até Act 1 atingir PASS (todas 13 dimensões >= 9).

---

## Decisões TRAVADAS — Ato 2

### Estrutura (NÃO reabrir)
- Cascata clínica do MESMO paciente (não lista de tópicos)
- 16 slides + CP2 na ordem definida em narrative.md
- 5 interações: PBE (A2-05), HDA/TIPS (A2-06), BB/NSBB toggle (A2-07), TX (A2-10), ICA checklist (A2-12)
- Albumina distribuída (LVP + PBE + ACLF challenge), consolidada no apêndice
- NSBB pós-HDA = profilaxia SECUNDÁRIA (PREDESCI NNT 9 = callback Act 1, não hero)
- HRS-AKI lidera headline (CONFIRM NNT 7, NNH 12). ACLF = contexto de severidade
- Nutrição = slide próprio (INCONTESTÁVEL)

### MELDs intermediários
Canônicos (CASE.md): ~10, 28, 12. Os valores 12/14/17/18/24 são CONSTRUÇÕES NARRATIVAS.
Moram em: narrative.md + _manifest.js panelStates. NÃO em CASE.md.

### Ato 3
Cenário HIPOTÉTICO, não continuação direta. CP2 fecha o caso real.

---

## Migração de IDs (referência)

| Arquivo | ID antigo | ID novo |
|---------|-----------|---------|
| 08-a2-carvedilol.html | s-a2-01 | s-a2-07 |
| 09-a2-tips.html | s-a2-02 | s-a2-15 |
| 10-a2-albumina.html | s-a2-03 | s-app-alb |
| 05-a1-infeccao.html | s-a2-infec | s-a2-04 |
| 11-a2-pbe.html | s-a2-04 | s-a2-05 |
| 12-a2-hrs.html | s-a2-05 | s-a2-11 |
| 13-a2-he.html | s-a2-06 | s-a2-08 |
| 24-app-ccc.html | s-app-05 | s-a2-13 |
| 25-app-pulm.html | s-app-06 | s-a2-14 |
| 15-a3-recompensacao.html | s-a3-01 | s-a3-02 |
| 16-a3-svr.html | s-a3-02 | s-a3-05 |
| 17-a3-vigilancia.html | s-a3-03 | s-a3-06 |

---

## Referências cruzadas (para próximo agente)

| O quê | Onde |
|-------|------|
| Dados do paciente | `references/CASE.md` (#1 autoridade) |
| Trials e PMIDs | `references/evidence-db.md` (#2 autoridade) |
| Arco narrativo + pacing | `references/narrative.md` (#3 autoridade) |
| Ordem dos slides | `slides/_manifest.js` (#4 autoridade) |
| Blueprint Act 2 detalhado | `RAW_ACT2_V2.md` |
| Blueprint Act 3 detalhado | `RAW_ACT3_V1.md` |
| Contrato Act 3 | `ACT3-CONTRACT-V1.md` |
| Regras operacionais | `CLAUDE.md` (cirrose) |
| Design tokens | `.claude/rules/design-system.md` |
| Erros e prevenção | `ERROR-LOG.md` |
| Lições aprendidas | `tasks/lessons.md` |
| PMIDs Tier-1 verificados | `.claude/rules/medical-data.md` |

---

## MCPs — não usar a princípio

- **attention-insight** (sharp fallback ou API paga)
- **frontend-review** (Hyperbolic) — before/after visual diff

Stack QA ativo: playwright, lighthouse, a11y, ui-ux-pro, design-comparison, floto, clinicaltrials, perplexity.

---

## Enforcement (implementado)

- lint:case-sync, lint:narrative-sync, lint:slides — todos passam
- Decision Record protocol para slides narrativeCritical
- 5 slides narrative-critical: s-hook, s-cp1, s-cp2, s-cp3, s-close

---

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.
