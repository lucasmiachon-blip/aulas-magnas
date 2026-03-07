# HANDOFF — Cirrose (projeto)

> Só pendências ativas. Histórico → CHANGELOG.md. Erros → ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Estado atual — 2026-03-07

**Slides:** 28/28 buildados · **Build:** ✅ · **Lint:** ✅

### ⚡ AÇÃO NECESSÁRIA — executar localmente

```bash
git checkout main
git pull origin main
git push origin main  # agente só pushea em branches claude/*
```

---

## Prioridades

### 🔴 IMEDIATO

1. **`[LUCAS DECIDE]`** — validar 6 h2 com propostas abaixo (sem isso o QA não avança)
2. Fixes técnicos rápidos: OKLCH literals em `cirrose.css`, rename `screening→classify`, failsafe `.classify-card`
3. Altura inconsistente: `min-height` archetypes + viewport deck 720px fixo
4. **Re-rodar qa-engineer** com rubrica 13 critérios + nova stack MCP
5. Iterar até ≥ 9/10 em todos os critérios

### 🟡 DECISÕES CLÍNICAS [LUCAS DECIDE]

| Slide | Problema | Proposta |
|-------|---------|----------|
| `s-hook` | Sem `<h2>` | Adicionar `<h2 aria-hidden>` ou exceção formal |
| `s-a1-damico` | `<h2>` é rótulo, não afirmação | "MELD-Na supera CTP na predição de mortalidade a 90d" |
| `s-a1-vote` | `<h2>` é pergunta | "FIB-4 5,91 classifica cirrose mesmo sem sintomas" |
| `s-a1-fib4` | `<h2>` é slogan | "FIB-4 > 2,67 indica elastografia obrigatória" |
| `s-a1-rule5` | `<h2>` é pergunta | "LSM 21 kPa confirma cACLD e não descarta CSPH" |
| `s-a1-meld` | `<h2>` é metáfora | "MELD-Na ≥18 — ponto de inflexão para referenciar TX" |
| `s-a1-meld` | MELD≥18 sem PMID | Buscar PMID Mahmud ou citar UNOS/OPTN |

Outras decisões pendentes:
- D'Amico pathway % — `Comp(1%)→1ºDescomp(5%)→2ºDescomp(20%)→Óbito(57%)` — confirmar paper
- PREDESCI HR 0,51 — IC95% vai no slide ou só nas notes?

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

### Fixes técnicos pendentes (do QA Bloco 1)

| Item | Fix |
|------|-----|
| `cirrose.css` `@keyframes zone-highlight` | OKLCH literal → `oklch(from var(--warning) l c h / 0.4)` |
| `cirrose.css` `.vote-option--correct` | OKLCH literal → `oklch(from var(--safe) l c h / 0.08)` |
| `02c-a1-screening.html` filename | Renomear para bater com section ID `s-a1-classify` + atualizar `_manifest.js` |
| `s-a1-classify` `.classify-card` | Adicionar CSS failsafe `.no-js .classify-card { opacity:1 }` |

---

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.
