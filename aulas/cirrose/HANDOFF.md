# HANDOFF — Cirrose (projeto)

> Só pendências ativas. Histórico → CHANGELOG.md. Erros → ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Estado atual — 2026-03-09 (final de sessão)

**Slides atuais:** 33 buildados (Act 2 com 7 slides ANTIGOS) · **Build:** ✅ · **Lint:** ✅
**Arquitetura aprovada:** Act 2 com 16 slides + CP2 (cascata clínica). 5 interações (BB/NSBB toggle restaurado). HTMLs pendentes.
**P0 audit:** ZERO bloqueadores. Todos PMIDs Tier-1 verificados. Data consistency OK.
**PMID audit 09/mar:** 5 CANDIDATE PMIDs verificados — TODOS estavam errados. Corrigidos em evidence-db.md.
**Act 3:** `RAW_ACT3_V1.md` produzido — 7 slides, 7/9 PMIDs verificados, 2 unverified (41580090, 39220088).
**Orphan deletado:** 03c-a1-elasto.html removido. CASE.md branch atualizado para main.

---

## CAMINHO CRÍTICO

### ✅ DONE: Produzir RAW_ACT2_V2

RAW_ACT2_V2.md produzido e commitado. narrative.md atualizado com arquitetura de 16 slides.

### ✅ DONE: Alinhar source of truth documental (P0)

- narrative.md — 16 slides + CP2, 4 interações, cascata clínica, NSBB como secundária, HRS-AKI lidera headline, CP2 abre "e se" hipotético
- CASE.md — 3 checkpoints canônicos. MELDs intermediários NÃO entram aqui (são narrativos)
- RAW_ACT2_V2.md — Detalhamento por slide com magic numbers auditados

### ✅ DONE: PMIDs e referências P0

- medical-data.md: ANSWER 29793859→29861076, CONFIRM 34882432→33657294
- evidence-db.md: Tonon 2025 PMID 40228583 (era NOT INDEXED), Ioannou clarificado (pós-HCC vs incidência)
- Todos PMIDs Tier-1 cross-verified entre medical-data.md e evidence-db.md
- ERROR-LOG: ERRO-025/026/027 registrados e corrigidos

### P1 ATUAL: Implementar Act 2 no código

1. Criar HTMLs para slides NOVOS: Gatilhos (A2-01), Ascite dx (A2-02), Ascite manejo (A2-03), Nutrição (A2-09), MELD>15 (A2-10), Ascite refratária (A2-12)
2. Mover CCM (s-app-05) → A2-13 e SHP/PPH (s-app-06) → A2-14
3. Reestruturar s-a2-02 (TIPS → A2-15), s-a2-01 (carvedilol → A2-07 profilaxia secundária)
4. Reestruturar s-a2-03 (albumina standalone → distribuída + apêndice consolidado)
5. Reestruturar s-a2-05 (HRS → A2-11 com HRS-AKI liderando, ACLF como contexto)
6. Atualizar `_manifest.js` com novos IDs, ordem, panelStates narrativos
7. ~~Verificar 5 PMIDs CANDIDATE~~ — DONE 09/mar (todos 5 estavam errados, corrigidos)
8. Resolver [TBD SOURCE]: sarcopenia, covert HE, centros TIPS, ESPEN 2019, QTc threshold
9. Resolver [TBD] HR PPI em s-a1-infeccao.html (único [TBD] em conteúdo visível de slide)

### ✅ DONE: RAW_ACT3_V1

- `RAW_ACT3_V1.md` produzido 09/mar — 7 slides detalhados com headlines, anchor numbers, speaker notes rascunho
- 7/9 PMIDs âncora verificados via WebSearch. 2 unverified: 41580090 (álcool), 39220088 (TIPS ≠ recomp)
- Baveno VII estrito = canônico. Expandido = nuance rotulada.
- Tabela "melhora / persiste / vigilância" incluída
- Próximo: Lucas revisa → HTMLs quando Act 2 estiver implementado

### PRÓXIMA SESSÃO — P0: Resolver colisão de IDs

**⚠ BLOQUEADOR:** _manifest.js usa s-a2-01→s-a2-06 para slides ANTIGOS. narrative.md define s-a2-01→s-a2-15 para 16 slides NOVOS. Criar HTMLs sem resolver isso = colisão.

**Fix planejado (manifest rewrite):**
1. Reescrever _manifest.js Act 2 (16 slides) + Act 3 (7 slides) com IDs definitivos
2. Atualizar IDs nos HTMLs existentes (section id= nos 9 files afetados)
3. Criar skeleton HTMLs para slides novos (build não quebra)
4. Mover s-app-05→s-a2-13 (CCM) e s-app-06→s-a2-14 (SHP/PPH)
5. Mover s-a2-03 (albumina)→s-app-alb (apêndice)
6. Adicionar panelStates novos para 12+ slides Act 2
7. Build + lint

**Mapping old→new (Act 2):**
| Old ID | File | New ID | Ação |
|--------|------|--------|------|
| s-a2-01 | 08-a2-carvedilol | s-a2-07 | Rename ID |
| s-a2-02 | 09-a2-tips | s-a2-15 | Rename ID |
| s-a2-03 | 10-a2-albumina | s-app-alb | Move to appendix |
| s-a2-infec | 05-a1-infeccao | s-a2-04 | Rename ID |
| s-a2-04 | 11-a2-pbe | s-a2-05 | Rename ID |
| s-a2-05 | 12-a2-hrs | s-a2-11 | Rename ID |
| s-a2-06 | 13-a2-he | s-a2-08 | Rename ID |
| s-app-05 | 24-app-ccc | s-a2-13 | Move to Act 2 |
| s-app-06 | 25-app-pulm | s-a2-14 | Move to Act 2 |

**New HTMLs needed (skeletons):** s-a2-01, s-a2-02, s-a2-03, s-a2-06, s-a2-09, s-a2-10, s-a2-12 (7 Act 2) + s-a3-01, s-a3-03, s-a3-04, s-a3-07 (4 Act 3)

### Depois do manifest rewrite

1. **Notion sync** — criar CIRR-A1-VOTE, limpar 5 deprecated, renomear v3 suffixes
2. **QA Act 1** — Lucas no browser, decide h2s
3. **Act 2 + Act 3 HTML content** — preencher skeletons com conteúdo de RAW_ACT2_V2 e RAW_ACT3_V1

### P2: QA

1. Re-rodar qa-engineer 13 critérios
2. h2 assertivos decididos (Lucas vê no browser → decide)
3. OKLCH, rename, failsafe fixes
4. Rehearsal cronometrado (meta: Act 2 em 45 min)
5. ERRO-022 (s-a1-vote interação não testada) e ERRO-023 (failsafes .no-js)

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

## Pendências abertas (herdadas)

- **ERRO-008** — Case panel redundante em s-hook
- ~~**D'Amico estádio 5**~~ — RESOLVIDO
- ~~**Orphan:** `03c-a1-elasto.html`~~ — DELETADO 09/mar
- 20 referências [TBD] — 0 CANDIDATE (5 verificados 09/mar, todos estavam errados e corrigidos), 11 NOT INDEXED (2025-2026), 3 resolvidos (Tonon PMID 40228583), 1 fonte não identificada (#2 PPI HR), 1 não encontrado (#14 Skouloudi)
- CTP interobserver variability — PMID 6546609 ou 16305721
- Pre-commit hook wiring pendente
- 6 h2 do Act 1 pendentes de decisão do Lucas
- CASE.md Chekhov's Guns: IDs de slides serão atualizados quando novos HTMLs forem criados
- ~~evidence-db.md "Dados por Slide": mapeamento para IDs antigos~~ — RESOLVIDO 08/mar (Act 1 IDs atualizados: s-a1-fib4, s-a1-meld, s-a2-infec, s-app-etio)
- Verificar ANVISA para rifaximina 550mg (Xifaxan)
- ~~medical-data.md PMIDs~~ — RESOLVIDO (ANSWER + CONFIRM corrigidos)
- **⚠ COLISÃO DE IDs Act 2:** narrative.md define s-a2-01→s-a2-15 (16 slides novos). _manifest.js usa s-a2-01→s-a2-06 para slides ANTIGOS. Ao criar HTMLs novos, IDs antigos serão reassignados. Qualquer grep/script que referencia IDs atuais do Act 2 vai quebrar. Planejar migração antes de criar HTMLs.

---

## Referências cruzadas (para próximo agente)

| O quê | Onde |
|-------|------|
| Dados do paciente | `references/CASE.md` (#1 autoridade) |
| Trials e PMIDs | `references/evidence-db.md` (#2 autoridade) |
| Arco narrativo + pacing | `references/narrative.md` (#3 autoridade) |
| Ordem dos slides | `slides/_manifest.js` (#4 autoridade) |
| Blueprint Act 2 detalhado | `RAW_ACT2_V2.md` |
| Contrato Act 3 | `ACT3-CONTRACT-V1.md` (9 PMIDs, prompt Opus) |
| Regras operacionais | `CLAUDE.md` (cirrose) |
| Design tokens | `.claude/rules/design-system.md` |
| Erros e prevenção | `ERROR-LOG.md` (27 erros, 24 corrigidos) |
| Lições aprendidas | `tasks/lessons.md` |
| Histórico de batches | `CHANGELOG.md` |
| PMIDs Tier-1 verificados | `.claude/rules/medical-data.md` |
| Cross-references docs | `docs/XREF.md` |

---

## MCPs — não usar a princípio

- **attention-insight** (sharp fallback ou API paga)
- **frontend-review** (Hyperbolic) — before/after visual diff

Stack QA ativo: playwright, lighthouse, a11y, ui-ux-pro, design-comparison, floto, clinicaltrials, perplexity.

---

## Enforcement (implementado)

- lint:case-sync, lint:narrative-sync, lint:slides
- Decision Record protocol para slides narrativeCritical
- 5 slides narrative-critical: s-hook, s-cp1, s-cp2, s-cp3, s-close

---

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.
