# HANDOFF — Cirrose (projeto)

> Só pendências ativas. Histórico → CHANGELOG.md. Erros → ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Estado atual — 2026-03-08

**Slides atuais:** 28 buildados (Act 2 com 7 slides ANTIGOS) · **Build:** ✅ · **Lint:** ✅
**Arquitetura aprovada:** Act 2 com 16 slides + CP2 (cascata clínica). Docs alinhados. HTMLs pendentes.

---

## CAMINHO CRÍTICO

### ✅ DONE: Produzir RAW_ACT2_V2

RAW_ACT2_V2.md produzido e commitado. narrative.md atualizado com arquitetura de 16 slides.

### ✅ DONE: Alinhar source of truth documental (P0)

- narrative.md — 16 slides + CP2, 4 interações, cascata clínica, NSBB como secundária, HRS-AKI lidera headline, CP2 abre "e se" hipotético
- CASE.md — 3 checkpoints canônicos. MELDs intermediários NÃO entram aqui (são narrativos)
- RAW_ACT2_V2.md — Detalhamento por slide com magic numbers auditados

### P1 ATUAL: Implementar Act 2 no código

1. Criar HTMLs para slides NOVOS: Gatilhos, Ascite dx, Ascite manejo, Nutrição, MELD>15, Ascite refratária
2. Mover CCM (s-app-05) e SHP/PPH (s-app-06) para Act 2
3. Reestruturar s-a2-02 (TIPS → A2-15), s-a2-01 (carvedilol → A2-07 profilaxia secundária)
4. Reestruturar s-a2-03 (albumina standalone → distribuída + apêndice consolidado)
5. Reestruturar s-a2-05 (HRS → A2-11 com HRS-AKI liderando, ACLF como contexto)
6. Atualizar `_manifest.js` com novos IDs, ordem, panelStates narrativos
7. Verificar 5 PMIDs CANDIDATE via PubMed MCP
8. Resolver [TBD SOURCE]: sarcopenia, covert HE, centros TIPS, ESPEN 2019, QTc threshold

### P2: QA

1. Re-rodar qa-engineer 13 critérios
2. h2 assertivos decididos (Lucas vê no browser → decide)
3. OKLCH, rename, failsafe fixes
4. Rehearsal cronometrado (meta: Act 2 em 45 min)

---

## Decisões TRAVADAS — Ato 2

### Estrutura (NÃO reabrir)
- Cascata clínica do MESMO paciente (não lista de tópicos)
- 16 slides + CP2 na ordem definida em narrative.md
- 4 interações: PBE (A2-05), HDA/TIPS (A2-06), TX (A2-10), ICA checklist (A2-12)
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
- 20 referências [TBD] — 5 CANDIDATE, 11 NOT INDEXED (2025-2026), 3 resolvidos (Tonon PMID 40228583), 1 fonte não identificada, 1 não encontrado
- CTP interobserver variability — PMID 6546609 ou 16305721
- Pre-commit hook wiring pendente
- 6 h2 do Act 1 pendentes de decisão do Lucas
- CASE.md Chekhov's Guns: IDs de slides serão atualizados quando novos HTMLs forem criados
- evidence-db.md "Dados por Slide": mapeamento para IDs antigos, atualizar junto com HTMLs
- Verificar ANVISA para rifaximina 550mg (Xifaxan)
- ~~Corrigir medical-data.md: ANSWER PMID 29793859→29861076~~ — RESOLVIDO (+ CONFIRM 34882432→33657294)

---

## Enforcement (implementado)

- lint:case-sync, lint:narrative-sync, lint:slides
- Decision Record protocol para slides narrativeCritical
- 5 slides narrative-critical: s-hook, s-cp1, s-cp2, s-cp3, s-close

---

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.
