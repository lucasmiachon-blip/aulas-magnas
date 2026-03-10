# AUDIT-VISUAL — Cirrose (por Atos)

> Auditoria visual organizada por Atos narrativos.
> Deck: 44 slides (Pre-Act 2 + Act 1 8 + CP1 1 + Act 2 15 + CP2 1 + Act 3 7 + CP3 1 + Close 1 + Appendix 8)
> Rubrica: 8 dimensoes (H/T/E/C/V/K/S/M), scoring 1-5.
> Metodo: preview_screenshot 1280x720 + force-reveal + checklist estatico.
> Referencia: AASLD/EASL Postgraduate Course slides.

---

## Rubrica de Scoring

| Dim | Nome | 1 (Critico) | 3 (Aceitavel) | 5 (Referencia AASLD) |
|-----|------|-------------|---------------|----------------------|
| **H** | Hierarquia Visual | Headline compete com corpo; nada domina | Headline > corpo, mas hero fraco | Hero 2-3x, Von Restorff claro, F/Z-pattern |
| **T** | Tipografia | Font generica, tamanhos uniformes | Scale correto, sem refinamento | Instrument Serif + DM Sans, escala clamp fluida |
| **E** | Espaco & Layout | Cramped ou >40% vazio; desalinhado | Preenchimento 60-80%, alinhamento OK | Fill ratio ideal por tipo, grid consistente |
| **C** | Cor & Contraste | Cores decorativas sem semantica; <4.5:1 | Semantica OK, contraste >=4.5:1 | OKLCH tokens, safe/warning/danger, >=7:1 |
| **V** | Visuais & Figuras | So texto; tabela Excel | Alguma evidencia visual | Dados = visual (bar, card, timeline); Tufte |
| **K** | Consistencia | Cada slide = layout diferente | Mesmo tipo ~ mesmo layout | Archetypes reutilizados, spacing identico |
| **S** | Sofisticacao | Parece Word; bordas pesadas | Clean mas generico | Source-tag, OKLCH, micro-interacoes |
| **M** | Comunicacao | Headline = rotulo; bullets | Assertion OK mas corpo confuso | Assertion-evidence perfeito; corpo <=30 palavras |

---

## Issues Sistemicos (referencia global)

- **SYS-1: Case panel clipping** — Conteudo clipado/truncado pelo case panel. Fix: panel responsivo.
- **SYS-2: Fill ratio <60%** — Espaco vazio >40%. Fix: padding/max-width archetypes.
- **SYS-3: Hero typography undersized** — Numero/dado hero em `--text-h1` em vez de `--text-hero`.

---

## Pre-Act + Act 1 + CP1 — QA COMPLETO (09/mar/2026)

**Status: DONE**
Agente: Claude Code (Opus 4.6) · Sessao: 09/mar/2026
Checklist: estatico (HTML structure, assertions, notes, data) + fixes aplicados.

### Slides cobertos (11)

| # | ID | Arquivo | h2 (manifest) | Status QA |
|---|-----|---------|---------------|-----------|
| 1 | s-title | 00-title.html | Cirrose Hepatica | PASS |
| 2 | s-hook | 01-hook.html | Caso Antonio | PASS (FIB-4 removido) |
| 3 | s-a1-01 | 02-a1-continuum.html | 1,43 milhao morre por ano | PASS |
| 4 | s-a1-vote | 02d-a1-vote.html | Esse paciente tem cirrose? | PASS |
| 5 | s-a1-damico | 02b-a1-damico.html | Tres geracoes de escores | PASS (h2 pendente Lucas) |
| 6 | s-a1-baveno | 03-a1-baveno.html | Baveno VII redefiniu classificacao | PASS |
| 7 | s-a1-fib4 | 03b-a1-fib4calc.html | 4 dados. 1 numero. 1 decisao. | PASS (h2 pendente Lucas) |
| 8 | s-a1-rule5 | 03d-a1-rule5.html | Onde esta o Antonio? | PASS |
| 9 | s-a1-meld | 04-a1-meld.html | MELD-Na: o GPS da fila | PASS (h2 pendente Lucas) |
| 10 | s-a1-classify | 02c-a1-classify.html | Classificar muda conduta | PASS |
| 11 | s-cp1 | 07-cp1.html | LSM 21 kPa, plaquetas 112k | PASS (FIB-4 corrigido 5,10->5,91) |

### Fixes aplicados nesta sessao

1. **s-hook**: Removido card FIB-4 (decisao do Lucas — FIB-4 so aparece no slide calculadora)
2. **s-cp1**: Corrigido FIB-4 de 5,10 para 5,91 (calculo correto: (55x67)/(112xsqrt(31)))
3. **_manifest.js**: Removido `fib4` de `visibleFields` em s-hook e s-a1-baveno; valor = '—'

### Checklist estatico (todos 11 slides)

- [x] `<h2>` e assercao clinica (nao rotulo generico)
- [x] Sem `<ul>` ou `<ol>` no slide
- [x] `<aside class="notes">` presente com timing
- [x] `<section>` sem `style` com `display` (E07)
- [x] Dados numericos verificados contra evidence-db.md
- [x] Background via `data-background-color` com HEX literal
- [x] Sem CDN links
- [x] Build + lint:slides + lint:case-sync + lint:narrative-sync PASS

### Pendencias Act 1 (nao-bloqueantes)

- **6 h2 assertivos**: damico, fib4, meld, baveno, rule5, classify — Lucas quer ver slides no browser antes de decidir
- **s-a1-vote FIB-4 reveal**: Slide ainda menciona FIB-4 como "twist" — Lucas decidira se mantem ou remove
- **Visual scoring (H/T/E/C/V/K/S/M)**: Nao re-executado com screenshots nesta sessao. Scores antigos (fev/2026) sao referencia mas desatualizados apos restructure.

---

## Act 2 + CP2 — QA BROWSER COMPLETO (09/mar/2026)

**Status: PASS (condicional)**
Agente: Claude Code (Opus 4.6) · Sessao: 09/mar/2026
Metodo: Playwright Chromium headless 1280x720 · navegacao real ArrowRight · 46 screenshots

### Slides cobertos (16)

| # | ID | Arquivo | Origem | Status QA |
|---|-----|---------|--------|-----------|
| 12 | s-a2-01 | 30-a2-gatilhos.html | NOVO | PASS (h2 3 linhas — P1) |
| 13 | s-a2-02 | 31-a2-ascite-dx.html | NOVO | PASS |
| 14 | s-a2-03 | 32-a2-ascite-manejo.html | NOVO | PASS |
| 15 | s-a2-04 | 05-a1-infeccao.html | RELOCADO | PASS (bar chart — bom) |
| 16 | s-a2-05 | 11-a2-pbe.html | EXISTENTE | PASS |
| 17 | s-a2-06 | 33-a2-hda.html | NOVO | PASS (h2 denso mas 2 linhas) |
| 18 | s-a2-07 | 08-a2-carvedilol.html | EXISTENTE | PASS (4 states, excelente) |
| 19 | s-a2-08 | 13-a2-he.html | EXISTENTE | PASS |
| 20 | s-a2-09 | 34-a2-nutricao.html | NOVO | PASS (source-tag limpo) |
| 21 | s-a2-10 | 35-a2-tx.html | NOVO | PASS |
| 22 | s-a2-11 | 12-a2-hrs.html | EXISTENTE | PASS (3 perguntas, forte) |
| 23 | s-a2-12 | 36-a2-refrataria.html | NOVO | PASS (h2 denso mas 2 linhas) |
| 24 | s-a2-13 | 24-app-ccc.html | RELOCADO | PASS |
| 25 | s-a2-14 | 25-app-pulm.html | RELOCADO | PASS (comparacao SHP/HPP) |
| 26 | s-a2-15 | 09-a2-tips.html | EXISTENTE | PASS |
| 27 | s-cp2 | 14-cp2.html | EXISTENTE | PASS (checkpoint forte) |

### Fixes aplicados nesta sessao

1. **slides 31, 32**: Bare `<` em speaker notes escapados para `&lt;` (fix Vite parse5 error)
2. **P0s ja corrigidos**: PMID s-a2-01 (ERRO-028), [TBD SOURCE] s-a2-09 (ERRO-029)

### Checklist estrutural (todos 16 slides)

- [x] `<h2>` com assercao clinica
- [x] Sem `<ul>` ou `<ol>` no slide
- [x] `<aside class="notes">` presente
- [x] `<section>` sem `style` com `display` (E07)
- [x] Background e cores corretos
- [x] Sem CDN links
- [x] Build + lint:slides + lint:case-sync + lint:narrative-sync PASS
- [x] Navegacao ArrowRight funciona em todos 27 slides (Act 1 + Act 2)
- [x] Case panel progride corretamente (verde → amarelo → vermelho)
- [x] Zero erros de console

### P1 pendencias (nao-bloqueantes)

- **h2 longo**: s-a2-01 (3 linhas) — Lucas decide se encurta
- **Monotonia visual**: 6/7 novos slides usam flow-cascade. s-a2-04 (bar chart) unico que varia. Gemini avaliara.
- **[TBD] em notes**: s-a2-04 e s-a2-09 tem [TBD SOURCE] em speaker notes (nao visivel na projecao)

### Destaques positivos

- Case panel mostra progressao de doenca (dot verde → borda amarela → borda vermelha)
- s-a2-07 (carvedilol): 4 states progressivos (headline → HR → NNT → dose) — excelente
- s-a2-04 (infeccao): Unico slide novo com archetype diferente (bar chart)
- s-a2-11 (HRS): 3 perguntas numeradas — forte decisao clinica
- s-cp2: Checkpoint realista com caso + 3 opcoes

---

## Act 3 + CP3 + Close — QA PENDENTE

**Status: NAO INICIADO** (slides sao skeletons — QA apos Act 2 completo)
9 slides (7 Act 3 + CP3 + Close). 4/7 slides do Act 3 sao skeletons ainda nao preenchidos.

### Slides a auditar

| # | ID | Arquivo | Origem | Status conteudo |
|---|-----|---------|--------|----------------|
| 28 | s-a3-01 | 37-a3-bridge.html | NOVO | Conteudo preenchido |
| 29 | s-a3-02 | 15-a3-recompensacao.html | EXISTENTE | Score anterior: 3.1 |
| 30 | s-a3-03 | 38-a3-expandido.html | NOVO | Conteudo preenchido |
| 31 | s-a3-04 | 39-a3-etiologia.html | NOVO | Conteudo preenchido |
| 32 | s-a3-05 | 16-a3-svr.html | EXISTENTE | Score anterior: 2.9 |
| 33 | s-a3-06 | 17-a3-vigilancia.html | EXISTENTE | Score anterior: 3.4 |
| 34 | s-a3-07 | 40-a3-fechamento.html | NOVO | Conteudo preenchido |
| 35 | s-cp3 | 18-cp3.html | EXISTENTE | Score anterior: 3.4 |
| 36 | s-close | 19-close.html | EXISTENTE | Score anterior: 3.3 |

---

## Appendix — QA PENDENTE

**Status: NAO INICIADO** (baixa prioridade — appendix nao projetado em congresso)
8 slides.

### Slides a auditar

| # | ID | Arquivo | Score anterior |
|---|-----|---------|---------------|
| 37 | s-app-01 | 20-app-aclf.html | 3.3 |
| 38 | s-app-02 | 21-app-tips.html | 2.5 |
| 39 | s-app-03 | 22-app-abcw.html | 2.5 |
| 40 | s-app-04 | 23-app-nsbb.html | 2.6 |
| 41 | s-app-alb | 10-a2-albumina.html | 2.9 |
| 42 | s-app-07 | 26-app-estatina.html | 2.5 |
| 43 | s-app-08 | 27-app-cirrox.html | 3.0 |
| 44 | s-app-etio | 06-a1-etiologias.html | 2.5 |

---

## Fix Backlog Sistemico (referencia global)

### Tier 1: Sistemico CSS (1 fix -> N slides)

| # | Fix | Slides afetados | Esforco | Impacto |
|---|-----|-----------------|---------|---------|
| S1 | Case panel responsivo: reduzir ou overlay | ~22 | Medio | Critico |
| S2 | Content max-width: ajustar para panel ativo | ~20 | Baixo | Critico |
| S3 | Fill ratio: reduzir padding, expandir headline | ~25 | Baixo | Alto |
| S4 | Hero elements: classe `.hero-metric` com `--text-hero` | ~15 | Medio | Alto |
| S5 | Horizontal overflow: max-width responsivo ao panel | ~10 | Medio | Alto |

### Tier 2: Redesign (novo layout/componente)

| # | Fix | Slides | Esforco |
|---|-----|--------|---------|
| R1 | Appendix archetype compacto sem case panel | 8 | Alto |
| R2 | Hero number component: countUp + metric + CI + source-tag | Multiplos | Alto |
| R3 | Comparison layout 2-panel responsivo | 4 | Medio |

---

## Historico de sessoes QA

| Data | Escopo | Resultado |
|------|--------|-----------|
| 25/fev/2026 | 28 slides (deck antigo) — scoring visual completo | Media 2.7/5.0, 0 PASS |
| 09/mar/2026 | Pre-Act + Act 1 + CP1 (11 slides) — checklist estatico + fixes | 3 fixes aplicados, PASS |
| 09/mar/2026 | Act 1 + Act 2 + CP2 (27 slides) — browser QA Playwright 1280x720 | 46 screenshots, 0 P0, PASS |

---

## Referencias

- `shared/css/base.css` — Design system tokens OKLCH
- `.claude/rules/design-system.md` — Tokens canonicos
- `.claude/rules/design-principles.md` — Rubrica Duarte/Tufte/Mayer
- `.claude/rules/css-errors.md` — Anti-patterns CSS
- AASLD Postgraduate Course 2024 — Referencia visual externa
