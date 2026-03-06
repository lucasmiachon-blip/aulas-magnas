# HANDOFF — Cirrose (projeto)

> So pendencias ativas. Detalhes historicos → CHANGELOG.md, ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Estado atual — 2026-03-05

**Branch:** `restructure/act1` — **PUSHED** (`79f465d`)
**Slides:** 33/33 buildados e commitados
**Build:** `npm run build:cirrose` ✅ zero erros

### Restructure Act 1 — CONCLUIDO (esta sessao)

Todos os 9 slides do Bloco 1 reestruturados + dados canônicos aplicados:

| Commit | Slide | O que mudou |
|--------|-------|-------------|
| `8058052` | canonical data | Labs Antônio: ALT 31, AST 67, PLQ 112k, FIB-4 5,91 |
| `2c116b1` | s-hook | 8-card lab grid, FIB-4 armadilha, punchline hero |
| `0102bf0` | s-a1-01 | Iceberg invertido, trend badge +18% MASH |
| `563af33` | s-a1-vote | Slide votação interativa (NOVO), reveal FIB-4 5,91 |
| `07db52a` | s-a1-damico | 3 eras (CTP→MELD-Na→D'Amico), PREDESCI removido |
| `6804609` | s-a1-baveno | Fundido com elasto, pathway 3-step pós-dissolve |
| `581106e` | s-a1-fib4 | Hero number 5,91 countUp, ALT trap, hero-stat archetype |
| `2c4893b` | s-a1-rule5 | Gray zone 10-25 kPa, pin Antônio, nuances CSPH |
| `d243fb2` | s-a1-meld | Threshold MELD≥18 animado, emojis urgência, bandas stagger |
| `55b10c7` | s-a1-classify | Assertion cards, PREDESCI HR 0,51 hero countUp |
| `04d358b` | build | index.html regenerado (33 slides) |

JS funciona (confirmado no browser). Redundâncias visuais e CSS ainda presentes.

---

## Prioridades — PROXIMA SESSAO

### 🔴 QA LOOP — PRIORIDADE MAXIMA

**Objetivo:** QA total slide por slide — conteúdo, CSS, interações — até atingir perfeição.
**Estratégia:** subagente dedicado só para QA (visual-qa skill + Playwright screenshots).
**Escopo:** todos os slides do Bloco 1 (s-hook → s-a1-classify), um por um.

Problemas conhecidos antes do QA:
- Redundâncias de conteúdo entre slides (ex: ALT trap aparece 3x — hook, vote, fib4 — checar se intencional)
- CSS failsafe não testado em todos os novos elementos (`.classify-card`, `.fib4-inputs`, `.rule-gray-zone`)
- `s-a1-vote`: botão de reveal nunca foi testado com click real
- `s-a1-damico` Era 2 D'Amico pathway: valores `1%/5%/20%/57%` — confirmar fonte (ver [LUCAS DECIDE] abaixo)

### 🟡 DECISOES CLINICAS PENDENTES [LUCAS DECIDE]

1. **Burden headline:** usa `1,43M` (GBD 2021) — confirmar ou trocar por `1,32M` (GBD 2017)
2. **D'Amico pathway %:** `Comp(1%) → 1ºDescomp(5%) → 2ºDescomp(20%) → Óbito(57%)` — confirmar paper e IC95%
3. **PREDESCI HR 0,51:** Villanueva 2019? Confirmar se IC95% vai no slide ou só nas notes

### 🟡 MEDIA

- PMIDs TBD (14 restantes) — ver `docs/insights-html-cirrose-2026.md`
- CTP interobserver variability — PMID 6546609 ou PMID 16305721
- burden-iceberg prevalencia — GBD 2017 (manter com anotacao)

### 🟢 BAIXA

- Atos 2 e 3: fill ratio + hero typography
- Appendix: archetype-appendix sem case panel

---

## Pendencias abertas

- **ERRO-008** — Case panel redundante em s-hook
- **AUDIT** — Fixes I2-I10 (ver AUDIT-VISUAL.md)
- **21 referencias [TBD]** catalogadas em NOTES.md
- **D'Amico estadio 5** — label errado
- **Mahmud ACG 2025 PMID** — nao encontrado, manter [TBD]

## Dados do caso — inconsistencias menores

- PLQ 112k (hook) vs 118k (CP1) — duas visitas, sem nota de contexto
- Stage no CP1: `07-cp1.html` vs `_manifest.js` — cosmetico

---

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.
