# HANDOFF — Cirrose (projeto)

> Só pendências ativas. Histórico → CHANGELOG.md. Erros → ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Prep Skills — 2026-03-12

### Terminal 1: repo-janitor (DONE)
**Result:** Repo limpo. 0 FAIL, 0 WARN git-tracked.
- Manifest sync: PASS (cirrose 44/44, grade 58/58, osteo 70/70)
- Broken MD links: 0 real (5 false positives em template text de skills)
- Temp files: 0
- DEPRECATED markers: 0
- Duplicate assets: 0
- Stale qa-screenshots: 73 PNGs deletados (gitignored, local-only). Restam 80 PNGs em 3 dirs canônicos (act1-reaudit, act1-surgical-pass, browser-qa).
- `exports/`: dir vazio (gitignored, staging area intencional)
- Nenhum commit necessário (mudanças apenas em arquivos gitignored).

### Terminal 2: docs-audit (DONE — commit 685a8f9)
**Result:** 0 FAIL, 5 WARN. 4 fixes aplicados (-234 linhas):
- SETUP.md: row duplicada consolidada
- archive/README.md: entry research-2026-03-11 adicionada
- NOTES.md: 145 linhas de machine logs purgadas (audit-trail as captura)
- blueprint-cirrose.md: status stale removido (→ HANDOFF ref) + narrativa duplicada removida (→ biblia-narrativa ref)
- **Backlog LOW (não corrigido):** ECOSYSTEM.md routing overlap com KPIs.md; biblia-narrativa.md stubs de evidência (40 linhas)

### Terminal 3: evolve (DONE — commit af70be9)
**Result:** 9 patches propostos, 7 aprovados (4/4 votos), 2 rejeitados.
- P01: 4 hooks migrados `python -c` → `node -e` (3-agent convergence)
- P02: guard-shared duplicado removido do settings.json
- P03: context7 SKILL.md versões atualizadas (Reveal 5.2, Vite 6.x)
- P04: post-compact-reinject detecta HANDOFF mais recente (não hardcoded)
- P05: `npm audit fix` — 0 vulnerabilidades
- P06: Lição registrada: hooks = `node -e`, nunca `python -c`
- P07: reveal.js pinado `~5.2.1` (bloqueia 6.0 acidental)
- **Rejeitados:** P08 (SDK update sem uso), P09 (Vite 8, risco alto pré-congresso)

### Pós-skills: absorver em WTs (DONE — 2026-03-12)
- wt-cirrose: merged (conflito HANDOFF.md resolvido — main wins)
- wt-metanalise: merged
- wt-osteo: merged

---

## Estado atual — 2026-03-12 (pós-prep skills + WT absorption)

**Slides:** 44 buildados (10 Act 1 + 16 Act 2 + 7 Act 3 + 3 CP + 2 pre/close + 8 appendix) · **Build:** ✅ · **Lint:** ✅ (slides + case-sync + narrative-sync)
**Manifest rewrite:** ✅ DONE (commit c302ef1). Colisão de IDs resolvida. 12 renames + 11 skeletons criados.
**Act 2 skeletons:** ✅ 7/7 preenchidos com conteúdo HTML real (fontes, números, notes com timing).
**narrative.md:** ✅ Act 3 expandido de 3→7 slides, alinhado com manifest e RAW_ACT3_V1.
**Act 3 skeletons:** 4 existem como skeleton (s-a3-01, s-a3-03, s-a3-04, s-a3-07). Preenchimento é P1.
**Hardening Act 1:** ✅ DONE — 4 blockers fixed (headline drift, countUp fallbacks, stale QA). 27 fresh screenshots. 0 P0.
**CSS/Viewport Hard Gate:** ✅ DONE — ERRO-030 (emoji→CSS dots), ERRO-031 (var()→HEX), orphaned padding removed.
**D'Amico chromatic + vote elevation:** ✅ DONE (cfb7d26 + fe5a1d8) — ERRO-022/032/033 fechados.
**Audit visual Act 1:** ✅ DONE (d20deec) — 5 headlines/a11y/data fixes. Gate visual passou. Audit humano pendente.
**Prep skills 12/mar:** ✅ DONE — repo-janitor (limpo), docs-audit (-234 linhas), evolve (7 patches), WTs absorvidas.

---

## CAMINHO CRÍTICO

### ✅ DONE: Colisão de IDs (P0 bloqueador)

Manifest rewrite resolveu colisão s-a2-01→s-a2-06. 12 HTMLs renomeados, 11 skeletons criados, _manifest.js reescrito com 44 slides. Build + 3 lints pass.

### ✅ DONE: Act 2 skeletons preenchidos (7/7)

| Slide | Arquivo | Conteúdo |
|-------|---------|----------|
| s-a2-01 | 30-a2-gatilhos.html | Gatilhos: PREDICT + D'Amico 2024 |
| s-a2-02 | 31-a2-ascite-dx.html | Ascite dx: GASA, PMN, EASL CPG |
| s-a2-03 | 32-a2-ascite-manejo.html | Ascite manejo: espiro/furo escalation, LVP |
| s-a2-06 | 33-a2-hda.html | HDA: Garcia-Pagán 86%/61%, Larrue IPD |
| s-a2-09 | 34-a2-nutricao.html | Nutrição: ESPEN 1.2-1.5g/kg, late-evening snack |
| s-a2-10 | 35-a2-tx.html | TX: MELD≥15, Mathurin 77%/23% |
| s-a2-12 | 36-a2-refrataria.html | Refratária: ICA 1996 critérios |

Todos usam archetype-flow (.flow-cascade > .flow-step). Speaker notes com timing, [DATA], e [NARRATIVO] para MELDs construídos.

### ✅ DONE: Browser QA Act 1 + Act 2 (Playwright)

27 slides navegados via Playwright Chromium headless 1280x720. 46 screenshots em `qa-screenshots/browser-qa/`.
- **Act 1 (11 slides):** PASS. 0 P0. P1: damico formula truncada, baveno clipping.
- **Act 2 (16 slides):** PASS. 0 P0. P1: s-a2-01 h2 3 linhas, monotonia flow-cascade.
- **Lints:** slides + case-sync + narrative-sync = all PASS. Zero console errors.

### ✅ DONE: Hardening pré-Gemini Act 1 (rodada 10/mar/2026)

4 blockers identificados e corrigidos:
1. **Headline drift** — _manifest.js e narrative.md desatualizados para s-a1-damico e s-a1-rule5 (corrigido)
2. **countUp "0" fallback** — 11 elementos em 5 slides mostravam "0" sem GSAP (corrigido para valores reais)
3. **CSS failsafe gap** — `.pathway-stage--collapsed` orphan; analisado, failsafe pai já cobre (sem fix necessário)
4. **Screenshots stale** — re-QA com 27 screenshots frescos via act1-reaudit.mjs. 0 P0, 0 console errors.

Arquivos tocados: _manifest.js, narrative.md, 02-a1-continuum.html, 02b-a1-damico.html, 02c-a1-classify.html, 02d-a1-vote.html, 03b-a1-fib4calc.html

### P0 ATUAL: QA visual Gemini (estático por state + dinâmico)

1. Enviar screenshots state-by-state para Gemini (27 PNGs em `qa-screenshots/act1-reaudit/`)
2. QA dinâmico: testar reveals e interações com vídeo
3. h2 assertivos decididos (Lucas vê no browser → decide)
4. Monotonia visual Act 2: Gemini avalia se 6x flow-cascade precisa de variação

### P1: Preencher 4 skeletons Act 3

| Slide | Arquivo | Status |
|-------|---------|--------|
| s-a3-01 | 37-a3-bridge.html | skeleton (headline + notes ok) |
| s-a3-03 | 38-a3-expandido.html | skeleton (headline + notes ok) |
| s-a3-04 | 39-a3-etiologia.html | skeleton (headline + notes ok) |
| s-a3-07 | 40-a3-fechamento.html | skeleton (headline + notes ok, pode ser suprimido) |

RAW_ACT3_V1.md tem todo o conteúdo necessário.

### P2: Dívida técnica

- 2 HEX hardcoded em cirrose.css (linhas ~1034, ~1905)
- PDF export quebrado (DeckTape)
- Nomes de arquivo semanticamente enganosos (05-a1-infeccao → s-a2-04, 24-app-ccc → s-a2-13, etc.)
- Pre-commit hook wiring pendente
- [TBD SOURCE]: sarcopenia prevalência, covert HE, centros TIPS Brasil, ESPEN 2019 PMID, QTc threshold
- ERRO-008: case panel redundante em s-hook
- ~~ERRO-030:~~ ✅ emoji → CSS dots (rodada 4)
- ~~ERRO-031:~~ ✅ var() → HEX literal (rodada 4)
- 3 h2 do Act 1 pendentes de decisão do Lucas (fib4, meld, classify)

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
