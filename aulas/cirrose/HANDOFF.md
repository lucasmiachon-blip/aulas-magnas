# HANDOFF — Cirrose (projeto)

> So pendencias ativas. Detalhes historicos → CHANGELOG.md, ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Estado atual — 2026-03-05

**Branch:** `restructure/act1` (uncommitted)
**Slides:** 33/33 buildados
**Build:** `npm run build:cirrose` ✅ | `npm run lint:slides` ✅ | `npm run build` (Vite) ✅

### Calc redesign (sessao atual)

FIB-4 e MELD-Na redesenhadas: layout split 2 colunas (inputs 2x2 | hero score panel).
- CSS consolidado: `.meld-*` + `.fib4s-*` (235 linhas) → `.calc-*` shared (100 linhas) em archetypes.css
- Score em `--text-hero` (56-86px), panel muda cor por zona (safe/warning/danger/urgent)
- Zone chips de referencia no bottom
- Testado: FIB-4 Antonio=4,89 danger ✅ | MELD Antonio=14 safe ✅ | MELD Cr 3.1→23 danger ✅
- Removido: `.meld-context` badges (info agora nos input labels)

### Restructure Act 1 (sessao anterior)

Mega-slide `s-a1-02` eliminado — conteudo distribuido em 4 novos slides.
Ordem Act 1: title → hook → burden → damico → baveno → fib4 → elasto → rule5 → meld → classify → CP1

---

## Prioridades — PROXIMA SESSAO

### 🔴 IMEDIATO

1. **Calc como painel lateral** — Lucas sugere: calculadoras como widget lateral (tipo case-panel), slide mantem conteudo clinico A-E. Redesign arquitetural: calc-panel.js persistente, slide tem evidencia.
2. **Revisao slide por slide Act 1** — titulos PRE-EXISTENTES (burden, damico, hook) + conteudo expert-level + tamanho tipografia
3. **Commit + merge** da restructure depois da revisao

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
