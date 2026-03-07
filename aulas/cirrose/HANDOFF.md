# HANDOFF — Cirrose (projeto)

> Só pendências ativas. Detalhes históricos → CHANGELOG.md, ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Estado atual — 2026-03-06

**Branch:** `restructure/act1` — **PUSHED** (`42d6e9c`)
**Slides:** 33/33 buildados e commitados
**Build:** `npm run build:cirrose` ✅ zero erros

---

## Sessão 2026-03-06 — Concluído

### Skills — unificação de redundâncias (`d2b6d16`)

| Skill | Antes | Depois |
|-------|-------|--------|
| `medical-slide` | 84 linhas, duplicava assertion-evidence + tokens + checklist | 44 linhas: só workflow Notion MCP, delega para `slide-frontend-ux` |
| `visual-qa` | 7 checks básicos antigos | Redirect para `qa-engineer` agent (13 critérios) |
| `assertion-evidence` | Mantido | Validator focado (não cria, só valida) |
| `medical-data` | Mantido | Verifier de dados clínicos autônomo |

### MCPs instalados — stack QA completo (`0d75469`, `d3abf4d`, `42d6e9c`)

**Funcionando agora (GRÁTIS, zero config):**

| MCP | O que faz | Critérios QA |
|-----|-----------|-------------|
| `ui-ux-pro-mcp` | 170 UX guidelines, typography, colors, patterns | 2, 4, 6 |
| `clinicaltrials` | ClinicalTrials.gov v2 — NCT ID, outcomes, patient match | 9 (resolve [TBD]s) |
| `design-comparison` | Pixel diff before/after CSS — valida se fix funcionou | 4, 6 |
| `page-design-guide` | Typography, layout F/Z/Bento, animation principles | 2, 6 |
| `attention-insight` (sharp) | Clarity + focus score proxy, ~60% accuracy | 6, 11 |

**Requer signup (free credits):**

| MCP | Custo | Como ativar |
|-----|-------|-------------|
| `attention-insight` API real | 14 dias grátis → €119/mo | [app.attentioninsight.com/auth/signup](https://app.attentioninsight.com/auth/signup) → Settings → API Key → `.env`: `ATTENTION_INSIGHT_API_KEY=` |
| `floto` | 1.000 créditos grátis | [test-app.floto.ai](https://test-app.floto.ai) → API Key → `.env`: `FLOTO_API_KEY=` |
| `frontend-review-mcp` | Créditos grátis | [app.hyperbolic.xyz](https://app.hyperbolic.xyz) → `.env`: `HYPERBOLIC_API_KEY=` |

**Mapeamento ferramentas → critérios qa-engineer:**

| Critério | Ferramentas |
|---------|-------------|
| 1. Assertion-Evidence | `npm run lint:slides`, `playwright` DOM |
| 2. Tipografia | `ui-ux-pro`, `page-design-guide` |
| 3. Contraste WCAG | `a11y-mcp`, `playwright` axe-core, `lighthouse` |
| 4. Fill ratio | `playwright` screenshot 1280×720 |
| 5. Densidade | `playwright` word count DOM |
| 6. Impacto visual | `attention-insight`, `floto` |
| 7. Interações | `playwright` Space/Arrow + hook check |
| 8. CSS tokens | `grep` HEX/px literals |
| 9. Dados clínicos | `scite`, `biomcp`, `clinicaltrials` |
| 10. a11y Lighthouse | `lighthouse`, `a11y-mcp` |
| 11-13. Pedagogia | `perplexity_reason` (CLT+Mayer+Knowles+Duarte) |

---

## Sessão 2026-03-05 — Restructure Act 1

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
| `d243fb2` | s-a1-meld | Threshold MELD≥18 animado, emojis urgência |
| `55b10c7` | s-a1-classify | Assertion cards, PREDESCI HR 0,51 hero countUp |

JS funciona (confirmado no browser). QA rodado — nenhum slide passou ainda.

---

## QA REPORT — Bloco 1 (2026-03-05)

**Resultado: NENHUM SLIDE PASSOU** — todos têm issues a corrigir.

### FAIL — merge bloqueado (1)

| Slide | Problema | Fix |
|-------|---------|-----|
| `s-a1-damico` | `<h2>` é rótulo, não afirmação clínica | Proposta: "MELD-Na supera CTP na predição de mortalidade a 90d" |

### WARN — corrigir antes de congresso (10)

| Slide | Problema | Fix |
|-------|---------|-----|
| `s-hook` | Sem `<h2>` | Adicionar `<h2 aria-hidden>` ou exceção formal |
| `s-a1-vote` | `<h2>` é pergunta | Proposta: "FIB-4 5,91 classifica cirrose mesmo sem sintomas" |
| `s-a1-fib4` | `<h2>` é slogan | Proposta: "FIB-4 > 2,67 indica elastografia obrigatória" |
| `s-a1-rule5` | `<h2>` é pergunta | Proposta: "LSM 21 kPa confirma cACLD e não descarta CSPH" |
| `s-a1-meld` | `<h2>` é metáfora | Proposta: "MELD-Na ≥18 — ponto de inflexão para referenciar TX" |
| `s-a1-meld` | MELD≥18 sem PMID | `[LUCAS DECIDE]` — buscar PMID Mahmud ou citar UNOS/OPTN |
| `cirrose.css` | `@keyframes zone-highlight` usa OKLCH literal | `oklch(from var(--warning) l c h / 0.4)` |
| `cirrose.css` | `.vote-option--correct` usa OKLCH literal | `oklch(from var(--safe) l c h / 0.08)` |
| `02c-a1-screening.html` | Filename não bate com section ID `s-a1-classify` | Renomear + atualizar `_manifest.js` |
| `s-a1-classify` | `.classify-card` sem CSS failsafe | `.no-js .classify-card, .stage-bad .classify-card { opacity:1 }` |

### Observações visuais de Lucas

- Títulos ruins — confirma os WARNs acima
- Alturas inconsistentes — verificar `min-height: 100%` nos archetypes
- CSS ruins em alguns casos — s-a1-vote, s-a1-classify, s-a1-damico (eras com altura variável)
- Melhor que antes ✅

---

## Prioridades — PRÓXIMA SESSÃO

### 🔴 IMEDIATO

1. **`[LUCAS DECIDE]`** — validar 6 h2 com propostas acima (sem isso o QA não avança)
2. Fixes técnicos rápidos: OKLCH literals em `cirrose.css`, rename `screening→classify`, failsafe `.classify-card`
3. Altura inconsistente: `min-height` archetypes + viewport deck 720px fixo
4. **Re-rodar qa-engineer** com rubrica 13 critérios + nova stack MCP
5. Iterar até ≥ 9/10 em todos os critérios

### 🟡 DECISÕES CLÍNICAS [LUCAS DECIDE]

1. h2 assertions dos 6 slides — propostas na tabela WARN acima
2. MELD≥18 fonte — PMID Mahmud ACG 2025 não encontrado, confirmar alternativa
3. D'Amico pathway % — `Comp(1%)→1ºDescomp(5%)→2ºDescomp(20%)→Óbito(57%)` — confirmar paper
4. PREDESCI HR 0,51 — IC95% vai no slide ou só nas notes?

### 🟡 MÉDIA

- 21 referências [TBD] — usar `clinicaltrials` MCP para PREDESCI/CANONIC/ANSWER
- CTP interobserver variability — PMID 6546609 ou 16305721
- burden-iceberg prevalência — GBD 2017 (manter com anotação)

### 🟢 BAIXA

- Atos 2 e 3: fill ratio + hero typography
- Appendix: archetype-appendix sem case panel

---

## Pendências abertas

- **ERRO-008** — Case panel redundante em s-hook
- **D'Amico estádio 5** — label errado
- **PLQ inconsistência** — 112k (hook) vs 118k (CP1) — duas visitas, sem nota de contexto

---

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.
