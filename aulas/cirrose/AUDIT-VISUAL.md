# AUDIT-VISUAL — Cirrose (por Atos)

> Auditoria visual organizada por Atos narrativos.
> Deck: 44 slides (2 pre + 8 Act 1 + 15 Act 2 + 7 Act 3 + 3 CP + 1 close + 8 app)
> Rubrica: **13 dimensoes**, scoring 1-10 (min 9 para PASS).
> Metodo: Playwright screenshot 1280x720 por estado (S0..SN) + constraint check + checklist.
> Referencia: AASLD/EASL Postgraduate Course slides + Duarte Sparkline + Sweller CLT + Knowles.
> Atualizado: 2026-03-14 — rubrica expandida de 8 (H/T/E/C/V/K/S/M) para 13 dimensoes (+ I/D/A/L/P/N).

---

## Rubrica de Scoring (13 dimensoes, 1-10)

> PASS = todas 13 dimensoes >= 9. WARN = qualquer entre 7-8. FAIL = qualquer < 7.
> Conversao da escala anterior: 1→2, 2→4, 3→6, 4→8, 5→10.

### Dimensoes visuais (originais, escala atualizada)

| Dim | Nome | 1-3 (Critico) | 4-6 (Aceitavel) | 7-8 (Bom) | 9-10 (Referencia AASLD) |
|-----|------|---------------|-----------------|-----------|------------------------|
| **H** | Hierarquia Visual | Headline compete com corpo; nada domina | Headline > corpo, mas hero fraco | Hero 1,5-2x, F-pattern reconhecivel | Hero 2-3x, Von Restorff claro, F/Z-pattern |
| **T** | Tipografia | Font generica, tamanhos uniformes | Scale correto, sem refinamento | Instrument Serif + DM Sans, escala OK | Escala clamp fluida, kerning, tabular-nums hero |
| **E** | Espaco & Layout | Cramped ou >40% vazio; desalinhado | Preenchimento 50-65%, alinhamento OK | Fill 65-80%, grid consistente | Fill ratio ideal por archetype, whitespace intencional |
| **C** | Cor & Contraste | Cores decorativas; <4.5:1; HEX hardcoded | Semantica OK, >=4.5:1, maioria var() | OKLCH tokens, safe/warning/danger, >=4.5:1, zero HEX | OKLCH completo, >=7:1 body, icones daltonismo |
| **V** | Visuais & Figuras | So texto; tabela Excel | Alguma evidencia visual | Dados = visual (bar, card, timeline) | Tufte; visual dominante; hero metric integrado |
| **K** | Consistencia | Cada slide = layout diferente | Mesmo tipo ~ mesmo layout | Archetypes reutilizados, spacing similar | Archetypes identicos, spacing pixel-perfect |
| **S** | Sofisticacao | Parece Word; bordas pesadas | Clean mas generico | Source-tag presente, OKLCH, transitions | Micro-interacoes, GSAP polish, stage-bad failsafe |
| **M** | Comunicacao | Headline = rotulo; bullets; >50 palavras | Assertion OK mas corpo confuso ou >30 palavras | Assertion-evidence; corpo <=30 palavras | Assertion-evidence perfeito; visual prova o claim |

### Dimensoes tecnico-pedagogicas (novas — merge qa-engineer)

| Dim | Nome | 1-3 (Critico) | 4-6 (Aceitavel) | 7-8 (Bom) | 9-10 (Referencia) |
|-----|------|---------------|-----------------|-----------|-------------------|
| **I** | Interacoes | JS quebrado; click avanca slide; sem retreat | advance funciona; retreat parcial; sem Plan B | advance+retreat OK; Plan B (.stage-bad) funciona | Todos estados testados; stopPropagation; leave/return reseta; Plan B perfeito |
| **D** | Dados clinicos | Dado inventado; PMID errado; [TBD] em source-tag | Dados corretos mas sem PMID; IC95% ausente | PMID verificado; NNT com IC95%; [TBD] so em notes | Tier-1 fonte; NNT+IC95%+timeframe; [DATA] tag em notes; zero [TBD] projetado |
| **A** | Acessibilidade | <3:1 contraste; sem navegacao teclado | >=4.5:1 body; teclado parcial | >=4.5:1 body, >=3:1 hero; foco visivel | >=7:1 body; icones ✓/⚠/✕ com cor; tab order correto; aria-labels |
| **L** | Carga cognitiva (Sweller) | >3 conceitos/slide; extraneous load alto; info irrelevante | 2-3 conceitos; algum ruido | 1-2 conceitos; germane load dominante | 1 conceito central; extraneous eliminado; chunking visual claro |
| **P** | Aprendiz adulto (Knowles+Miller) | Conteudo desconectado da pratica; >9 chunks | Relevancia clinica implicita; 7-9 chunks | Relevancia explicita; <=7 chunks; schema activation | "E dai?" obvio; <=5 chunks; decisao clinica acionavel; caso ancora |
| **N** | Arco narrativo (Duarte+Alley) | Headline = rotulo generico; sem tensao | Assertion presente mas tensao plana | Assertion clinica; tensao coerente com narrative.md | Sparkline visivel; callbacks ao hook; tensao precisa; narrativeCritical respeitado |

---

## Issues Sistemicos (referencia global)

- **SYS-1: Case panel clipping** — Conteudo clipado/truncado pelo case panel. Fix: panel responsivo. (dim: E, H)
- **SYS-2: Fill ratio <60%** — Espaco vazio >40%. Fix: padding/max-width archetypes. (dim: E)
- **SYS-3: Hero typography undersized** — Numero/dado hero em `--text-h1` em vez de `--text-hero`. (dim: H, T)

## Protocolo de auditoria (13 dimensoes)

### Loop 1 — Opus (sem Gemini)

1. `npm run lint:slides` — confirmar PASS
2. Para cada slide: constraint check automatizado
   - `<h2>` = assercao clinica? (dim M, N)
   - Zero `<ul>/<ol>` no corpo? (dim M, L)
   - `<aside class="notes">` com timing? (dim N)
   - `<section>` sem `style` com `display`? (dim S, E07)
   - Cores via `var()` — zero HEX hardcoded? (dim C)
   - Dados com PMID verificado ou `[TBD]`? (dim D)
3. Playwright screenshot 1280x720 de cada estado (S0...SN)
4. Scorecard: 13 dimensoes x nota 1-10
5. Issues com nota < 9 → fix cirurgico
6. Re-audit ate PASS (todas >= 9)

### Loop 2 — Gemini MCP (apos Loop 1 PASS)

Screenshots/video → Gemini avalia hierarquia, flow, legibilidade, daltonismo, densidade.
Gemini so sugere (JSON spec) — Opus executa fix.

### Scorecard template (copiar por slide)

```
| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   |      |           |
| T   |      |           |
| E   |      |           |
| C   |      |           |
| V   |      |           |
| K   |      |           |
| S   |      |           |
| M   |      |           |
| I   |      |           |
| D   |      |           |
| A   |      |           |
| L   |      |           |
| P   |      |           |
| N   |      |           |
```

---

## Pre-Act + Act 1 + CP1 — RODADA 3 CONSOLIDADA (10/mar/2026)

**Status: PASS COM RISCOS**
Agente: Claude Code (Opus 4.6) · Sessao: 10/mar/2026 (rodada 3 — hardening + re-QA consolidado)
Metodo: Playwright Chromium headless 1280x720 · navegacao real ArrowRight · 27 screenshots · `scripts/act1-reaudit.mjs`
Screenshots: `aulas/cirrose/qa-screenshots/act1-reaudit/` (27 PNGs, gitignored)

### Resultado consolidado por slide (11)

| # | ID | Status | Problema principal | Sev |
|---|-----|--------|-------------------|-----|
| 1 | s-title | OK | ~~var() fixado rodada 4~~ → HEX literal | — |
| 2 | s-hook | PASS COM RISCO | Fill 0% beat 0 (GSAP-dependente); beat 1 pode clipar INR+punchline a 720p | P1 |
| 3 | s-a1-01 | OK | countUp fallbacks corrigidos; iceberg ok | — |
| 4 | s-a1-vote | OK | Reveal funciona; FIB-4 fallback corrigido para 5,91 | — |
| 5 | s-a1-damico | PASS COM RISCO | h2 2 linhas; era 2 pathway bars quase invisiveis; fill 205% | P1 |
| 6 | s-a1-baveno | OK | card 3 toca borda inferior state 1 (aceitavel) | P1 |
| 7 | s-a1-fib4 | OK | Layout limpo; h2 pendente Lucas | P1 |
| 8 | s-a1-rule5 | OK | Melhor slide do ato; 5 zones + Antonio plot excelente | — |
| 9 | s-a1-meld | OK | ~~Emoji fixado rodada 4~~ → CSS dots; h2 pendente Lucas | P1 |
| 10 | s-a1-classify | OK | 3 cards + PREDESCI; h2 pendente Lucas | P1 |
| 11 | s-cp1 | OK | Checkpoint completo; interacao poll funciona | — |

### Fixes acumulados (rodadas 2 + 3)

**Rodada 2 (09/mar):**
1. cirrose.css — stage-c hook contraste, baveno gap, meld threshold opacity, rule5 compactness
2. damico h2 + rule5 h2 reescritos
3. rule5 conteudo movido para notes

**Rodada 3 (10/mar — hardening):**
4. _manifest.js — 2 headlines sync (drift pos-ca76b56)
5. narrative.md — 2 headlines sync (idem)
6. 5 HTML slides — 11 countUp fallbacks corrigidos (0 → valores reais)

### Problemas remanescentes

| # | Problema | Slide(s) | Sev | Quem resolve |
|---|---------|----------|-----|-------------|
| ~~R1~~ | ~~Emoji unicode (ERRO-030)~~ | ~~s-a1-meld~~ | ~~P1~~ | ✅ Rodada 4 |
| R2 | h2 2 linhas | s-a1-damico | P1 | Lucas (decisao clinica) — fórmula MELD removida, alivia density |
| ~~R3~~ | ~~Era 2 pathway bars quase invisiveis~~ | ~~s-a1-damico~~ | ~~P1~~ | ✅ cfb7d26 (chromatic encoding) |
| R4 | Fill 0% beat 0 | s-hook | P1 | Design decision |
| ~~R5~~ | ~~3 h2 pendentes Lucas~~ | ~~fib4, meld, classify~~ | ~~P1~~ | ✅ d20deec: classify + meld reescritos; fib4 mantido (mnemônico) |
| R6 | beat 1 pode clipar a 720p | s-hook | P1 | CSS audit |
| ~~R7~~ | ~~var() em data-background-color~~ | ~~s-title~~ | ~~P2~~ | ✅ Rodada 4 |
| ~~R8~~ | ~~MELD >=18 PMID pendente~~ | ~~s-a1-meld notes~~ | ~~P2~~ | ✅ d20deec: threshold genérico, [LUCAS DECIDE] purgado |

### Rodada 4 — CSS/Viewport Hard Gate (10/mar/2026)

**3 fixes aplicados:**
1. **ERRO-030 fix:** s-a1-meld emoji 🟢🟡🟠🔴 → `.meld-band-dot` (14px CSS circles, cor por band)
2. **ERRO-031 fix:** s-title `data-background-color` var() → HEX literal `#162032`
3. **D'Amico orphaned padding:** `#s-a1-damico .pathway-track { padding-top: 28px }` removido (label inexistente)

**Re-QA:** 27 screenshots, 0 console errors, build + 3 lints PASS.
**R1 e R7 fechados.** 5 problemas remanescentes (4 P1 dependem de Lucas, 1 P2 pesquisa).

### Rodada 5 — D'Amico chromatic + vote elevation (10/mar/2026)

**2 fixes adicionais pos-hardening:**
1. **ERRO-032 fix (cfb7d26):** D'Amico pathway stages sem cor semantica → regras explicitas em cirrose.css. Source-tag failsafe .no-js/.stage-bad. White-space wrapping. QA: 7 PASS, 1 pre-existing (8px overflow).
2. **ERRO-033 fix (fe5a1d8):** s-a1-vote 3 interaction bugs (stopPropagation, retreat DOM, leave+return reset) + visual upgrade (serif headline, elevated cards, spacing 720px). QA: 7/7 PASS via vote-final-qa.mjs.

**R3 fechado.** ERRO-022 (vote nunca testado) agora resolvido.

### Checklist estrutural (todos 11 slides)

- [x] `<h2>` e assercao clinica (nao rotulo generico)
- [x] Sem `<ul>` ou `<ol>` no slide
- [x] `<aside class="notes">` presente com timing
- [x] `<section>` sem `style` com `display` (E07)
- [x] Dados numericos verificados contra evidence-db.md
- [x] Background via `data-background-color` com HEX literal ~~(s-title usa var())~~ ✅ ERRO-031 corrigido
- [x] Sem CDN links
- [x] Build + lint:slides + lint:case-sync + lint:narrative-sync PASS
- [x] Navegacao ArrowRight funciona em todos 11 slides
- [x] Case panel progride corretamente
- [x] Zero erros de console
- [x] Zero emojis em slides projetados ~~(s-a1-meld tem 🟢🟡🟠🔴)~~ ✅ ERRO-030 corrigido

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

**Status: NAO INICIADO** (QA apos preenchimento dos skeletons)
9 slides (7 Act 3 + CP3 + Close). 4/7 slides do Act 3 sao skeletons (headline + notes preenchidos, evidence body vazio com `<!-- [SKELETON] -->`).

### Slides a auditar

| # | ID | Arquivo | Origem | Status conteudo |
|---|-----|---------|--------|----------------|
| 28 | s-a3-01 | 37-a3-bridge.html | NOVO | Skeleton (headline + notes ok, evidence TBD) |
| 29 | s-a3-02 | 15-a3-recompensacao.html | EXISTENTE | Score anterior: 3.1 |
| 30 | s-a3-03 | 38-a3-expandido.html | NOVO | Skeleton (headline + notes ok, evidence TBD) |
| 31 | s-a3-04 | 39-a3-etiologia.html | NOVO | Skeleton (headline + notes ok, evidence TBD) |
| 32 | s-a3-05 | 16-a3-svr.html | EXISTENTE | Score anterior: 2.9 |
| 33 | s-a3-06 | 17-a3-vigilancia.html | EXISTENTE | Score anterior: 3.4 |
| 34 | s-a3-07 | 40-a3-fechamento.html | NOVO | Skeleton (headline + notes ok, evidence TBD) |
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
| 09/mar/2026 | Act 1 RODADA 2 — correcao 5 slides + re-QA browser | 8 fixes, 27 screenshots, 0 P0, **PASS** |
| 10/mar/2026 | Act 1 RODADA 3 — hardening countUp + headline sync + re-QA consolidado | 13 fixes totais, 27 screenshots, 0 P0, **PASS COM RISCOS** |
| 10/mar/2026 | Act 1 RODADA 5 — D'Amico chromatic + vote elevation | R3+ERRO-022 fechados, 2 novos ERROs (032,033) registrados e corrigidos |

---

## Referencias

- `shared/css/base.css` — Design system tokens OKLCH
- `.claude/rules/design-system.md` — Tokens canonicos
- `.claude/rules/design-principles.md` — Rubrica Duarte/Tufte/Mayer
- `.claude/rules/css-errors.md` — Anti-patterns CSS
- AASLD Postgraduate Course 2024 — Referencia visual externa
