# HANDOFF — Cirrose (projeto)

> Só pendências ativas. Histórico → CHANGELOG.md. Erros → ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Estado atual — 2026-03-08

**Slides:** 28/28 buildados · **Build:** ✅ · **Lint:** ✅

### 🎯 META DA SEMANA (08-14 mar)

**Terminar o monólito Cirrose.** KPIs em ação:
1. h2 assertivos decididos e aplicados (Lucas vê no browser → decide)
2. Fixes técnicos (ERRO-021, OKLCH, rename, failsafe)
3. 7 PMIDs CANDIDATE verificados via MCP
4. QA 13 critérios ≥ 9/10 em todos
5. GPT-5.4 audita tom/narrativa (primeiro teste do protocolo de aliança)

### ⚡ AÇÃO NECESSÁRIA — executar localmente

```bash
git checkout main
git pull origin main
git push origin main  # agente só pushea em branches claude/*
```

---

## Prioridades

### 🔴 IMEDIATO

1. **`[LUCAS DECIDE]`** — ver slides no browser → decidir 6 h2 (tom: factual, par-a-par, sem manchete)
2. ERRO-021 — fix 1 char CSS (5 dias parado)
3. Fixes técnicos: OKLCH literals em `cirrose.css`, rename `screening→classify`, failsafe `.classify-card`
4. Verificar 7 PMIDs CANDIDATE via PubMed MCP
5. **Re-rodar qa-engineer** com rubrica 13 critérios + nova stack MCP
6. Iterar até ≥ 9/10 em todos os critérios

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

- 21 referências [TBD] — 7 CANDIDATE, 12 NOT INDEXED (2025-2026). Ver NOTES.md §Reference Manager
- CTP interobserver variability — PMID 6546609 ou 16305721
- burden-iceberg prevalência — GBD 2017 (manter com anotação)

### 🟡 ENFORCEMENT — Hierarquia de autoridade (implementado)

**Implementado 2026-03-08:**
1. ✅ **Lint rule** — `npm run lint:case-sync` compara panelStates vs CASE.md, falha se divergir
2. ✅ **Comentário-contrato** — header em _manifest.js: `DERIVADO DE: references/CASE.md`

**Pendente:**
- Wiring no pre-commit hook (rodar junto com lint:slides)

**Regras operacionais (em vigor):**
- Quem corrige dado clínico em CASE.md → atualiza _manifest.js + slide HTML na mesma sessão
- Quem corrige bug → limpa TODAS as notas de warning associadas (HANDOFF, CASE.md, NOTES.md)

### 🟢 BAIXA

- Atos 2 e 3: fill ratio + hero typography
- Appendix: archetype-appendix sem case panel

---

## Pendências abertas

- **ERRO-008** — Case panel redundante em s-hook
- **D'Amico estádio 5** — label errado

### Fixes técnicos pendentes (do QA Bloco 1)

Todos resolvidos nesta sessão:
- ~~OKLCH literals~~ → `oklch(from var(...))` aplicado
- ~~Rename `02c-a1-screening.html`~~ → `02c-a1-classify.html` + `_manifest.js` atualizado
- ~~`.no-js` failsafes~~ → `.classify-card`, `.antonio-pin` adicionados
- ~~ERRO-021~~ → já estava corrigido (nota stale limpa)

---

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.
