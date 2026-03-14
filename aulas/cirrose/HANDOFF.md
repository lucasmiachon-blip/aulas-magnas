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
Quarentena verificada: 0 commits Classe C em main. Apenas A/B (docs, hooks, skills).
- wt-cirrose: merged (conflito HANDOFF.md resolvido — main wins + WT status lines preservadas)
- wt-metanalise: merged (conflito NOTES.md resolvido — main wins)
- wt-osteo: merged (fast-forward, sem conflito)

---

## Sessão 2026-03-15: Stack drift cleanup (main)

- Docs corrigidos: stack = `deck.js` (cirrose/metanalise), `Reveal.js legacy` (grade/osteo frozen)
- Dead code removido: `preview.html`, `export-screenshots.js`, script npm `export:screenshots`
- Grade/Osteo marcados 🧊 FROZEN em CLAUDE.md e HANDOFF.md
- `package.json` description atualizada
- **Commits em main:** `99631c3` (docs), `76004c7` (dead code)
- **Impacto cirrose:** zero (apenas docs de governança). Build OK (44 slides).

---

## Estado atual — 2026-03-14 (pós-Act 3 fill + rubrica expandida)

**Slides:** 44 buildados (2 pre + 8 Act 1 + 16 Act 2 + 7 Act 3 + 3 CP + 1 close + 8 app) · **Build:** ✅ · **Lint:** ✅ (slides + case-sync + narrative-sync)
**Source of truth:** ✅ Validado — CASE→evidence-db→narrative→manifest→HTML (44/44 consistente, 0 drift de dados).
**Act 2 skeletons:** ✅ 7/7 preenchidos com conteúdo HTML real (fontes, números, notes com timing).
**Act 3 skeletons:** ✅ 4/4 preenchidos com conteúdo HTML real (hero-stat, comparison, etiology-compare, flow).
**AUDIT-VISUAL.md:** ✅ Rubrica expandida 8→13 dimensões (merge qa-engineer). Scoring 1-10, min 9 para PASS.
**QA Act 1:** ⏳ Loop 1 (Opus, 13 dim) NÃO INICIADO — Playwright técnico feito mas rubrica completa nunca aplicada.
**QA Act 2:** ⏳ Bloqueado por Act 1 — não avançar até Act 1 = PASS.
**Gemini MCP:** Somente após Loop 1 PASS.
**Drifts cosméticos:** ✅ Corrigidos (3/3) — CLAUDE.md hash/data, HANDOFF decomposição + data.
**ERROR-LOG:** 33/33 corrigidos, 0 pendentes.
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

### P0 ATUAL: Conteúdo + interações + CSS graves (slide a slide)

Foco em produto: corrigir erros de interação, CSS e conteúdo nos slides existentes antes de qualquer QA formal.

**s-hook (DONE — /review QA pendente):**
- Pergunta: "Qual sua conduta?" (narrativeCritical aprovado)
- GGT removido → 6 labs grid 3×2 (simétrico)
- Case panel: hidden (ERRO-008 fechado)
- ~85 linhas de CSS morto removidas (v1-v4 + sistema .hook-beat órfão)
- Inline style removido (INR text-transform → classe CSS)
- Build ✅ · 3 lints ✅ · `/review` QA pendente

### ✅ DONE: Preencher 4 skeletons Act 3

| Slide | Arquivo | Archetype | Status |
|-------|---------|-----------|--------|
| s-a3-01 | 37-a3-bridge.html | hero-stat | ✅ HR 0,35/0,46 (Tonon 2023) |
| s-a3-03 | 38-a3-expandido.html | comparison | ✅ Estrito 7% vs Expandido 37,6% (Tonon 2025) |
| s-a3-04 | 39-a3-etiologia.html | etiology-compare | ✅ HBV/HCV/Álcool (3 PMIDs) |
| s-a3-07 | 40-a3-fechamento.html | flow | ✅ Melhora → Persiste → Vigiar sempre |

Zero CSS novo. RAW_ACT3_V1.md como fonte. Build + 3 lints PASS.

### Backlog

- QA visual Gemini (estático por state + dinâmico): screenshots state-by-state, vídeo de reveals, monotonia visual Act 2
- h2 assertivos: Lucas decide no browser (fib4, meld, classify)
- 2 HEX hardcoded em cirrose.css (linhas ~1034, ~1905)
- PDF export quebrado (DeckTape)
- Nomes de arquivo semanticamente enganosos (05-a1-infeccao → s-a2-04, 24-app-ccc → s-a2-13, etc.)
- ~~Pre-commit hook wiring pendente~~ ✅ Pre-push hook instalado (done-gate --strict)
- [TBD SOURCE]: sarcopenia prevalência, covert HE, centros TIPS Brasil, ESPEN 2019 PMID, QTc threshold
- ~~ERRO-008: case panel redundante em s-hook~~ ✅ (panelState: hidden)
- ~~ERRO-030:~~ ✅ emoji → CSS dots (rodada 4)
- ~~ERRO-031:~~ ✅ var() → HEX literal (rodada 4)

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
