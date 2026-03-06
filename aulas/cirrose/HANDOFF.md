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

## QA REPORT — Bloco 1 (rodado 2026-03-05, qa-engineer subagent)

**Resultado geral: NENHUM SLIDE PASSOU** — todos têm issues a corrigir.

### FAIL — merge bloqueado (1)

| Slide | Problema | Fix |
|-------|---------|-----|
| `s-a1-damico` | `<h2>Três gerações de escores</h2>` é rótulo/categoria, não afirmação clínica (viola Hard Constraint #1) | Trocar por ex: "MELD-Na supera CTP na predição de mortalidade a 90d" |

### WARN — deve corrigir antes de usar em congresso (10)

| Slide | Problema | Fix |
|-------|---------|-----|
| `s-hook` | Sem `<h2>` — viola Hard Constraint #1 | Adicionar `<h2 aria-hidden>` invisível ou registrar exceção formal |
| `s-a1-vote` | `<h2>` é pergunta, não afirmação | Reformular: "FIB-4 5,91 classifica cirrose mesmo sem sintomas" |
| `s-a1-fib4` | `<h2>` é slogan motivacional | Reformular: "FIB-4 > 2,67 indica elastografia obrigatória" |
| `s-a1-rule5` | `<h2>` é pergunta | Reformular: "LSM 21 kPa confirma cACLD e não descarta CSPH" |
| `s-a1-meld` | `<h2>` é metáfora/label | Reformular: "MELD-Na ≥18 — ponto de inflexão para referenciar TX" |
| `s-a1-meld` | `[LUCAS DECIDE]` MELD≥18 sem PMID verificado nas notes | Resolver: buscar PMID Mahmud ou citar UNOS/OPTN |
| `cirrose.css` | `@keyframes zone-highlight` usa OKLCH literal, não token | Usar `oklch(from var(--warning) l c h / 0.4)` |
| `cirrose.css` | `.vote-option--correct` usa OKLCH literal | Usar `oklch(from var(--safe) l c h / 0.08)` |
| `02c-a1-screening.html` | Filename não bate com section ID `s-a1-classify` | Renomear para `02c-a1-classify.html` + atualizar `_manifest.js` |
| `s-a1-classify` | `.classify-card` animado só via `gsap.set()`, sem `opacity:0` em CSS | Adicionar CSS failsafe: `.no-js .classify-card, .stage-bad .classify-card { opacity:1 }` |

### OK — passou

- `npm run lint:slides` ✅ clean
- `npm run build:cirrose` ✅ 33 slides, zero erros
- `<aside class="notes">` presente em todos os 9 slides ✅
- Nenhum `<ul>`/`<ol>` no corpo dos slides ✅
- Nenhum HEX inline (exceto `data-background-color`) ✅
- Labs Antônio batem com CASE.md ✅
- ERRO-021 (seletor CSS s-a1-damico): **não existe** no código atual ✅

---

## Prioridades — PROXIMA SESSAO

### 🔴 IMEDIATO — Fixes QA Bloco 1

**Objetivo:** corrigir todos os 11 issues (1 FAIL + 10 WARN) do relatório QA acima.
**Estratégia:** slide-builder subagent para os fixes de assertion, main agent para CSS tokens.
**Ordem de execução sugerida (impacto máximo primeiro):**

1. **Assertions h2 (5 slides):** s-a1-damico (FAIL), s-hook, s-a1-vote, s-a1-fib4, s-a1-rule5, s-a1-meld
2. **Rename arquivo:** `02c-a1-screening.html` → `02c-a1-classify.html`
3. **CSS tokens:** 2 literals em cirrose.css
4. **Failsafe `.classify-card`:** 2 linhas CSS

Depois dos fixes: re-rodar qa-engineer para confirmar zero FAIL/WARN.

### 🟡 DECISOES CLINICAS PENDENTES [LUCAS DECIDE]

1. **Assertions h2 novas:** sugestões acima são provisórias — Lucas valida o enunciado clínico final de cada slide
2. **MELD≥18 fonte:** PMID Mahmud ACG 2025 ainda não encontrado — confirmar fonte alternativa
3. **D'Amico pathway %:** `Comp(1%) → 1ºDescomp(5%) → 2ºDescomp(20%) → Óbito(57%)` — confirmar paper
4. **PREDESCI HR 0,51:** Villanueva 2019? IC95% vai no slide ou só nas notes?

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
