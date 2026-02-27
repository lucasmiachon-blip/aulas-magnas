# HANDOFF — Cirrose (atualizado 2026-02-26)

## Último batch executado
- **Batch:** QA fix — Expose `window.Reveal` for QA scripts + QA screenshots (branch `refactor/floating-panel`)
- **Commit:** TBD (this session)
- **Data:** 2026-02-26
- **Agente:** Claude Code (Opus 4.6)
- **Alterações:**
  1. **index.stage-c.html**: Added `window.Reveal = Reveal;` after `initAula()` call
     - Root cause: `initAula()` returns `deck` (the `Reveal.initialize()` 'ready' event object with `{isTrusted, indexh, indexv, currentSlide}`), NOT the Reveal API
     - ESM module scope doesn't expose `Reveal` to `window` — QA script `qa-screenshots-stage-c.js` needs `window.Reveal.isReady()`, `.getTotalSlides()`, `.slide()`
     - Fix: `window.Reveal = Reveal` (the imported ESM module, NOT `deck`)
- **QA:** 28 screenshots captured successfully (qa-screenshots/stage-c/). All slides render, zero console errors.

## Batch anterior (P3)
- **Batch:** P3 — Migrate CasePanel/ClickReveal/registerCustom to slide IDs (branch `refactor/floating-panel`)
- **Commit:** c441540
- **Data:** 2026-02-26
- **Agente:** Claude Code (Opus 4.6)
- **Fonte:** Plano aprovado `valiant-twirling-sunrise.md`
- **Alterações:**
  1. **case-panel.js** (P3.1):
     - `connect(slidesContainer)` — recebe container `.slides`, resolve slide IDs internamente
     - `registerState(slideId, state)` — keyed por string ID em vez de index numérico
     - `onSlideChanged(slideEl)` — recebe DOM element, extrai `.id` internamente
     - Threshold: `slideEl.id === 's-title'` em vez de comparação numérica
  2. **engine.js** (P3.3):
     - `registerCustom(slideId, fn)` — aceita string slide ID em vez de slideIndex
     - `customAnimations` Map keyed por string ID
     - Lookup no `slidetransitionend`: `event.currentSlide.id`
  3. **index.stage-c.html** (P3.2 + P3.4):
     - registerCustom: `anim.registerCustom(1, ...)` → `anim.registerCustom('s-hook', ...)`
     - 5× registerState: índices numéricos → IDs string (`'s-hook'`, `'s-cp1'`, `'s-cp2'`, `'s-cp3'`, `'s-close'`)
     - CasePanel wiring: `panel.connect(document.querySelector('.slides'))` + `panel.onSlideChanged(event.currentSlide)`
     - ClickReveal Map: `revealers.set(index, ...)` → `revealers.set(section.id, ...)`
     - Revealer lookup: `Reveal.getState().indexh` → `Reveal.getCurrentSlide()?.id`
     - slidechanged reset: `event.indexh` → `event.currentSlide?.id`
- **Impacto:** 3 arquivos, 60 inserções, 40 deleções. Zero silent failures (antes: index mismatch = no-op).
- **QA:** 28 slides carregam, zero erros console, CasePanel floating panel visível e funcional.

## Batch anterior (Floating panel)
- **Batch:** Refactor — Floating panel + HOOK card fix (branch `refactor/floating-panel`)
- **Commit:** 982dd01
- **Data:** 2026-02-26

## Batch anterior (P2)
- **Batch:** P2 — Hero typography + Graceful degradation (branch `main`)
- **Commit:** 822cf38
- **Data:** 2026-02-26
- **Agente:** Claude Code (Opus 4.6)
- **Agente:** Claude Code (Opus 4.6)
- **Fonte:** Roadmap P2 do HANDOFF
- **Alterações:**
  1. **Hero typography** (`archetypes.css` + `cirrose.css`):
     - `.metric-value`: `font-mono` → `font-display` (Instrument Serif) — autoridade visual
     - `.metric-value`: weight 600/700 → 400 (serif não precisa bold)
     - `.metric-value`: cor `ui-accent` → `text-primary` (navy escuro, sem cor semântica clínica)
     - Adicionado `letter-spacing: -0.02em` + `font-variant-numeric: tabular-nums lining-nums`
     - Size mantido `--text-h2` (32px @1280px) — suficiente para cards de 300px max-width
  2. **Graceful degradation** (`engine.js`):
     - `initNoJs()` movido de ANTES para DEPOIS de `await initReveal()`
     - Se imports falharem → `initAula()` nunca executa → `.no-js` permanece → CSS fallback mostra conteúdo em `opacity: 1 !important`
     - Se Reveal falhar no init → mesma proteção
     - Conteúdo só fica em estado de animação (`opacity: 0`) APÓS confirmar que engine está funcional
- **Validação:**
  - ✓ Metric cards (s-a2-01): Instrument Serif 32px, peso 400, tabular-nums
  - ✓ Reload completo: `no-js` removido após init, HOOK anima corretamente
  - ✓ Build OK (478ms)
- **Impacto:** 3 arquivos, 15 inserções, 8 deleções. Zero HTML modificado.

## Batch anterior
- **Batch:** JS bugfix — hash navigation fallback (branch `main`)
- **Commit:** 59c10e7
- **Data:** 2026-02-26
- **Agente:** Claude Code (Opus 4.6)
- **Fonte:** Diagnóstico JS solicitado pelo usuário ("muitos problemas no JS")
- **Alterações:**
  1. **Bug: hash/refresh navigation não dispara animações** (`shared/js/engine.js`):
     - **Causa:** `createAnimationDispatcher.connect()` usava apenas `slidetransitionend` como trigger de animação. Esse evento NÃO dispara em hash jumps (`#/N`), page refresh, ou navegação instantânea — deixando conteúdo `data-animate` invisível (opacity: 0).
     - **Fix:** Fallback timer de 800ms no `slidechanged`. Se `slidetransitionend` dispara (navegação sequencial normal ~600ms), ele cancela o timer e anima. Se não dispara (hash jump), o timer garante a animação.
     - **Guard:** Variável `animatedSlide` previne dupla execução quando ambos triggers tentam animar o mesmo slide.
     - **`ready` handler:** Agora seta `animatedSlide = Reveal.getCurrentSlide()` para prevenir dupla animação no slide inicial.
     - **QA mode:** Inalterado (já usava `slidechanged` + rAF).
- **Validação:**
  - ✓ Hash jump direto (`#/6`, `#/11`, `#/14`, `#/19`): animações disparam após ~800ms
  - ✓ Navegação sequencial (→): `slidetransitionend` continua como trigger primário
  - ✓ HOOK countUp (slide 3): "2,7" com opacity 1 (navegação sequencial)
  - ✓ Stagger em `<table>` (slide 6): THEAD + TBODY opacity 1 (hash jump)
  - ✓ Case panel transitions: caution (7) → danger (14) → resolved/timeline (19)
  - ✓ Click-reveal: funciona com teclado (capture phase), by design não intercepta botão
- **Diagnóstico completo:**
  - HOOK `visibility: hidden` — NÃO é bug (CSS estado inicial, GSAP revela no stagger)
  - Click-reveal: keyboard-only by design (document capture phase listener)
  - `getComputedStyle` em slides ocultos retorna `transform: none` (misleading, não é bug)
- **Impacto:** Apenas `engine.js` modificado. Zero CSS, zero HTML. Build OK.

## Batch anterior
- **Batch:** P1 — Fill Ratio + Source Tags (branch `p1/fill-ratio`)
- **Commit:** 92328c7
- **Data:** 2026-02-25
- **Agente:** Claude Code (Opus 4.6)
- **Fonte:** P0 validation findings + AUDIT-VISUAL backlog
- **Alterações:**
  1. **Fill ratio fix — `min()` em 9 containers** (`cirrose.css`):
     - `.meld-semaphore` 600px → `min(600px, 100%)`
     - `.predict-bars` 700px → `min(700px, 100%)`
     - `.trial-result` 600px → `min(600px, 100%)`
     - `.bleed-timeline` 700px → `min(700px, 100%)`
     - `.decision-tree` 650px → `min(650px, 100%)`
     - `.recomp-criteria` 600px → `min(600px, 100%)`
     - `.surveillance-rule` 550px → `min(550px, 100%)`
     - `.close-recap` 650px → `min(650px, 100%)`
     - `.app-aclf-table` + 3 similares 650px → `min(650px, 100%)`
  2. **Albumin-cards responsive grid** (`cirrose.css`):
     - `repeat(4, 1fr)` → `repeat(auto-fit, minmax(min(180px, 100%), 1fr))`
     - Card 4 (Normalizar) agora visível com panel ativo
  3. **Panel-aware slide-inner constraint** (`archetypes.css`):
     - Root cause: Reveal.js força `width: 1280px` inline no `.slides`, ignorando grid column
     - Fix: `.reveal.panel-active .slides section > .slide-inner { max-width: calc(1280px - var(--panel-width, 190px)) }`
     - Afeta TODOS os slides (archetype e não-archetype) quando panel ativo
     - Resultado: conteúdo respeita a largura visível (1090px), sem clip
  4. **Source-tags adicionadas** (2 slides):
     - `s-a1-05`: "EASL CPG Cirrhosis, J Hepatol 2024 · AASLD Practice Guidance 2024"
     - `s-a3-02`: "Baveno VII, J Hepatol 2022 · Lens et al. · EASL CPG 2024"
  5. **Motion QA heurísticas** (`.claude/rules/motion-qa.md`):
     - Checklist de heurísticas de animação (duration, easing, stagger, propósito)
     - Workflow de validação em 5 tiers (state assertion → GIF → Gemini video)
     - Limitações documentadas (agente vs humano)
- **Impacto:** Zero `!important` adicionados. Build OK (595ms). Zero JS modificado.
- **Validação visual 1280×720 (12 slides testados — todos PASS):**
  - s-title (0), s-a1-04 (5), s-a1-05 (6), s-cp1 (7), s-a2-01 (8)
  - s-a2-02 (9), s-a2-03 (10) ← **era FAIL, agora PASS**, s-a2-04 (12)
  - s-a3-01 (15), s-a3-02 (16), s-close (19), s-app-01 (20)

## Batch anterior
- **Batch:** P0 — Stage-C Stability (branch `p0/stage-c-stability`)
- **Commit:** ba474f8 (merge)
- **Data:** 2026-02-25
- **Agente:** Claude Code (Opus 4.6)
- **Fonte:** 3 auditorias externas triadas criticamente (AUDIT-CONSOLIDADA, ERRATA-FIX-SENIOR, Gemini Gem)
- **Alterações (commit inicial 52b9cb7):**
  1. **QA script determinístico** (`scripts/qa-screenshots-stage-c.js`):
     - `ArrowRight` → `Reveal.slide(i)` API (bypasses ClickReveal interceptor)
     - `waitForTimeout(400)` → `waitForFunction(Reveal.getState)` (deterministic)
     - Appends `?qa=1` para modo QA automático
  2. **QA mode** (`shared/js/engine.js`):
     - `?qa=1` → `transition: 'none'`, no controls/progress/hash
     - `forceAnimFinalState()` aplicado a TODOS os slides
     - Todos `[data-reveal]` forçados visíveis (`.revealed` + inline styles)
     - Reutiliza infraestrutura existente de print-pdf (zero duplicação)
  3. **Panel safe area** (`aulas/cirrose/cirrose.css`):
     - `padding: 40px 64px` → `padding: 40px var(--slide-pad-h, 64px)`
     - Com panel ativo: `--slide-pad-h: 48px` (ganha 32px de conteúdo útil)
  4. **Panel width como variável** (`aulas/cirrose/archetypes.css`):
     - `:root { --panel-width: 190px }` — variável extraída
     - `grid-template-columns: 1fr var(--panel-width)` — dinâmico
     - `--slide-pad-h: 48px` propagado pelo `.reveal.panel-active`
     - `.slides { min-width: 0 }` — previne overflow em grid child
     - `max-width: min(1120px, 100%)` nos archetypes — respeita espaço disponível
- **Bugfixes (commits pós-validação visual — 861741a, ver abaixo):**
  1. **Bug #1 — QA `ready` event timing** (`engine.js`):
     - Causa: `Reveal.on('ready')` registrado em `connect()` DEPOIS de `ready` já ter disparado (durante `await initReveal()`)
     - Fix: QA setup movido de `dispatcher.ready` → `initAula()` (executa APÓS `await initReveal()`)
  2. **Bug #2 — ClickReveal.reset() race** (`engine.js`):
     - Causa: `slidechanged` → `ClickReveal.reset()` re-oculta `[data-reveal]` DEPOIS do QA global setup
     - Fix: `animate()` re-revela `[data-reveal]` per-slide no `slidetransitionend` (AFTER reset)
  3. **Bug #3 — Reveal scale overflow** (`archetypes.css`):
     - Causa: Reveal escala conteúdo para largura total do `.reveal`, não da coluna `.slides`
     - Fix: `overflow: hidden` em `.reveal.panel-active .slides` clip limpo na boundary do panel
     - Nota: Em 1280×720 (produção) conteúdo cabe sem clip. Fix é safety net para viewports menores.
  4. **Bug #4 — `slidetransitionend` não dispara em QA** (`engine.js`):
     - Causa: `transition: 'none'` faz Reveal pular CSS transition → `slidetransitionend` nunca emitido
     - Fix: QA mode usa `slidechanged` + `requestAnimationFrame()` (garante execução APÓS `ClickReveal.reset()`)
     - Sem este fix, `[data-reveal]` ficava oculto em TODOS os slides navegados (só o slide inicial do page load funcionava)
- **Impacto:** Zero `!important` adicionados. Build OK (480ms). Nenhum HTML modificado.
- **Matemática do fix:**
  - Antes: 1280 - 190 - (64×2) = 962px úteis, max-width 1120px > 1090px disponível (overflow)
  - Depois: 1280 - 190 - (48×2) = 994px úteis, max-width min(1120px, 100%) = 1090px (sem overflow)
- **Validação visual 1280×720:**
  - s-title (0): PASS — centrado, sem panel
  - s-hook (3): PASS — panel ativo, caso clínico visível
  - s-a1-01 (1): PASS — figure + evidence card revelado
  - s-a1-03 (4): PASS — MELD calc, 4 inputs, bar zones, botões
  - s-cp1 (7): PASS — checkpoint caution bg, 3 decisions revelados
  - s-a2-01 (8): PASS — 3 metric cards revelados (Bug #4 fixou)
  - s-a2-03 (10): **P1** — card 4 clipado pelo `overflow:hidden` (slide não-archetype, precisa max-width)
  - s-close (19): PASS — 3 takeaways, timeline no panel
  - s-app-01 (20): PASS — ACLF graus, Grau 3 highlighted

## Batch anterior
- **Batch:** QA scripts + cleanup + review package
- **Commit:** 1d8c280
- **Data:** 2026-02-25
- **Agente:** Claude Code (Opus 4.6)
- **Alterações:**
  - QA scripts separados por stage: `qa-screenshots-stage-a.js`, `qa-screenshots-stage-c.js`, `qa-pdf-stage-b.js`
  - Script genérico `qa-screenshots-cirrose.js` removido
  - Screenshots reorganizados: `qa-screenshots/stage-c/` (28 PNGs estado atual)
  - Limpeza: 33 PNGs temporários removidos da raiz + 4 arquivos soltos
  - Notion sync: 28 slides com Visual QA atualizado (10 fail + 18 needs-revision)
  - Review package externo: `C:\Dev\Projetos\aulas-magnas-review-20260224.zip` (2.2 MB, 57 arquivos)

## Batch anterior: Auditoria Visual Completa
- **Commit:** d40c015
- **Data:** 2026-02-25
- **Agente:** Claude Code (Opus 4.6)
- **Método:** preview_screenshot 1280×720 + force-reveal de data-reveal/GSAP/fragments
- **Alterações:**
  - `AUDIT-VISUAL.md` criado: scoring 8 dimensões × 28 slides
  - Média global: **2.7/5.0** — FAIL (0 PASS, 18 WARN, 10 FAIL)
  - Issue #1: Case panel 190px clipando conteúdo em 22/28 slides
  - Issue #2: >40% espaço vazio na maioria dos slides
  - Issue #3: Conteúdo concentrado no quadrante superior-esquerdo
  - Fix backlog: 5 sistêmicos + 10 individuais + 3 redesigns
  - **Nenhum CSS/HTML modificado** — auditoria = somente diagnóstico

## Batch anterior: Título + Evidence Enrichment Sync
- **Commit:** 4904ecd
- **Data:** 2026-02-25
- **Agente:** Claude Code (Opus 4.6)
- **Fonte:** Handoff Claude.ai sessão 25/fev (Evidence Enrichment)
- **Alterações:**
  - Título atualizado nos 3 HTMLs: "Cirrose Hepática" / "Classificar · Intervir · Reverter"
  - Antes: "Cirrose: Manejo Global — 5 Números, 3 Decisões" / "Da classificação à recompensação"
  - Speaker notes do s-title NÃO alteradas (micro-hook mantido)

## Evidence Enrichment (25/fev — Claude.ai)

Sessão do Claude.ai criou **Bíblia Narrativa** no Notion + verificou 15 trials via PubMed.

### Bíblia Narrativa
- **Notion page:** `311dfe68-59a8-816b-b9c0-ec10eccfb235`
- Conteúdo: Arco do Seu Antônio, pérolas por ato, compilações temáticas, micro-narrativas Duarte

### 7 Trials Tier-1 Verificados (NNT + GRADE)
| Trial | PMID | NNT | GRADE |
|-------|------|-----|-------|
| PREDESCI (Villanueva, Lancet 2019) | 30910320 | 9 (descompensação 3a) | ⊕⊕⊕◯ |
| Sort (NEJM 1999) | 10432325 | 5 (morte) / 4 (renal) | ⊕⊕⊕⊕ |
| CONFIRM (Wong, NEJM 2021) | 33657294 | 7 (reverter HRS) / NNH 11 | ⊕⊕⊕◯ |
| ANSWER (Caraceni, Lancet 2018) | 29861076 | 9 (morte 18m) | ⊕⊕⊕◯ |
| ATTIRE (China, NEJM 2021) | 33657293 | ∞ (NÃO funciona) | ⊕⊕⊕⊕ |
| Bass (NEJM 2010) | 20335583 | 4 (HE 6m) | ⊕⊕⊕⊕ |
| Baveno VII (de Franchis, J Hepatol 2022) | 35431106 | consensus | ⊕⊕⊕◯ |

### 8 TBDs Resolvidos
| TBD | Trial | PMID | Resultado-chave |
|-----|-------|------|-----------------|
| Early TIPS | García-Pagán, NEJM 2010 | 20573925 | Sobrevida 86% vs 61%, NNT ~4 |
| DAA-SVR + HCC | Singal/Ioannou, Gastro 2019 | 31374215 | HR 0,29 (morte) com SVR |
| STOPAH | Thursz, NEJM 2015 | 25901427 | Prednisolona OR 0,72 (NS!) |
| Rifaximin pré-TIPS | Bureau, Ann Intern Med 2021 | 33524293 | 34% vs 53% HE, NNT ~5 |
| PEG-3350 (HELP) | Rahimi, JAMA Int Med 2014 | 25243839 | 91% vs 52% melhora 24h |
| D'Amico staging | D'Amico, J Hepatol 2006 | 16298014 | 4 estágios: 1%→57% mortalidade |
| Early transplant ALD | Mathurin, NEJM 2011 | 22070476 | 77% vs 23% sobrevida 6m |
| Recompensação | Baveno VII, J Hepatol 2022 | 35431106 | ≥12m sem descomp + labs melhorados |

---

## Batch anterior: Batch 0 — Redesign v4 Foundation PoC
- **Commit:** d068a4b
- **Data:** 2026-02-24
- **Agente:** Claude Code (Opus 4.6)
- **Fonte:** prompt-batch0-redesign-v4.md + ADDENDUM-batch0-narrativa.md
- **Alterações:**
  - 4 slides refatorados para archetypes: s-a1-01 (figure), s-a2-01 (metrics), s-a1-03 (interactive), s-cp1 (checkpoint)
  - Click-reveal system: data-reveal elements substituem auto-play fadeUp nos 4 PoC
  - Case panel sidebar (190px): estado do paciente evolui por 5 checkpoints
  - MELD-Na calculator interativo no s-a1-03
  - Speaker notes enriquecidas (ADDENDUM) nos 4 PoC

## Novos arquivos (Batch 0)
| Arquivo | Propósito |
|---------|-----------|
| `aulas/cirrose/archetypes.css` | 4 layouts archetype + case panel + click-reveal CSS |
| `shared/js/click-reveal.js` | Classe ClickReveal: fragmentos manuais por click/→ |
| `shared/js/case-panel.js` | Classe CasePanel: sidebar com 5 estados paciente |
| `shared/js/interactions/meld-calc.js` | Classe MeldCalc: calculadora MELD-Na interativa |

## Estado do HTML (index.stage-c.html)
- **Total sections:** 28
- **Ordem:**
  1. s-title (CIRR-TITLE)
  2. s-a1-01 (CIRR-A1-01) ← **archetype-figure** + click-reveal
  3. s-a1-02 (CIRR-A1-02)
  4. s-hook (CIRR-HOOK)
  5. s-a1-03 (CIRR-A1-03) ← **archetype-interactive** + MELD calculator
  6. s-a1-04 (CIRR-A1-04)
  7. s-a1-05 (CIRR-A1-05)
  8. s-cp1 (CIRR-CP1) ← **archetype-checkpoint** + click-reveal
  9. s-a2-01 (CIRR-A2-01) ← **archetype-metrics** + click-reveal
  10. s-a2-02 (CIRR-A2-02)
  11. s-a2-03 (CIRR-A2-03)
  12. s-a2-04 (CIRR-A2-04)
  13. s-a2-05 (CIRR-A2-05)
  14. s-a2-06 (CIRR-A2-06)
  15. s-cp2 (CIRR-CP2)
  16. s-a3-01 (CIRR-A3-01)
  17. s-a3-02 (CIRR-A3-02)
  18. s-a3-03 (CIRR-A3-03)
  19. s-cp3 (CIRR-CP3)
  20. s-close (CIRR-CLOSE)
  21. s-app-01 (ACLF)
  22. s-app-02 (Early TIPS)
  23. s-app-03 (Etiologias raras)
  24. s-app-04 (NSBB vs EVL)
  25. s-app-05 (Cardiomiopatia)
  26. s-app-06 (SHP/HPP)
  27. s-app-07 (Estatina)
  28. s-app-08 (Anticoagulação)
- **registerCustom:** `'s-hook'` → HOOK (framework + case stagger). Demais via data-animate (fadeUp/stagger) nos 24 slides antigos.
- **Click-reveal:** Slides com data-reveal: s-a1-01 (2 reveals), s-a2-01 (3 reveals), s-cp1 (3 reveals). Map keyed por `section.id` (string).
- **Case panel:** 5 estados registrados por slide ID (`'s-hook'`/`'s-cp1'`/`'s-cp2'`/`'s-cp3'`/`'s-close'`). Visível após s-title.
- **Assets referenciados:** villanueva-2025-fig1.png, villanueva-2025-fig2a.png

## QA Batch 0 (24/fev — pós-implementação)
- **Agente:** Claude Code (Opus 4.6)
- **Bugfixes aplicados:**
  1. Script block: `deck.on()` → `Reveal.on()` (TypeError — initAula retorna objeto sem .on)
  2. Script block: `Reveal.on('ready', ...)` → sync init (evento já disparou após await)
  3. Script block: `Reveal.addKeyBinding` → `document.addEventListener('keydown', ..., true)` (capture phase)
  4. CSS: metric-value font-size `clamp(1.8rem,3.5vw,2.6rem)` → `clamp(1.5rem,2.5vw,2.2rem)` (card 3 overflow)
  5. CSS: metric-card padding/min-width/max-width ajustados + overflow:hidden
  6. CSS: nova classe `.metric-unit` para separar unidade do valor
  7. HTML s-a2-01: Card 3 split "6,25 → 12,5 mg" → value "6,25 → 12,5" + unit "mg"
- **QA visual PASS:**
  - s-a1-01: headline + figure + evidence-card reveal ✓
  - s-a2-01: 3 metric cards reveal sequencial ✓ (card 3 overflow fixed)
  - s-a1-03: MELD calc render + "Seu Antônio" load + live calc + reset ✓
  - s-cp1: checkpoint layout + caution bg + 3 decision reveals ✓
  - Case panel transitions: hidden→neutral→caution→danger→hope→resolved ✓
  - ArrowRight: reveals consume before navigation ✓
  - Build: `npm run build` success ✓

## Pendências
- ☑ [Code] Auditoria Visual completa — AUDIT-VISUAL.md (25/fev)
- ☑ [Code] **URGENTE** Fix S1+S2: panel responsivo → **RESOLVIDO** (floating panel, branch `refactor/floating-panel`)
- ☑ [Code] Fix S3: fill ratio → **RESOLVIDO** (P1, commit 92328c7)
- ☑ [Code] **QA visual dos 28 slides** pós-floating-panel — 28 PNGs capturados via Playwright (26/fev)
- ☐ [Code] **Merge `refactor/floating-panel` → `main`** após QA
- ☑ [Code] **P3: Panel wrapper** — deferido (wrapper não necessário após overlay refactor)
- ☑ [Code] **P3: Panel por ID** — CasePanel/ClickReveal/registerCustom → slide IDs (c441540)
- ☐ [Code] Fixes individuais I1-I10 (ver AUDIT-VISUAL.md)
- ☐ [Code] Slides críticos (usuário vai indicar após P3)
- ☐ [Code] Audit export (Gemini + Claude.ai + ChatGPT zip com PNG transições)
- ☐ [Code] Batches 1-3: Refatorar 24 slides restantes para archetypes
- ☐ [Code] Módulos: decision-tree.js, timeline.js
- ☐ [Code] Sincronizar alterações nos Plans A e B (apenas stage-c foi modificado)
- ☐ [Claude.ai] Revisão headline-by-headline dos 20 slides core
- ☐ [Claude.ai] Speaker notes EN→PT para slides que ainda não têm
- ☐ [Claude.ai] Popular References DB com os 15 PMIDs verificados
- ☐ [Code] QA narrativo completo pós-atualização de headlines

## Notion sync pendente (Claude.ai deve executar):
- A1-01: Pipeline → redesign-poc, Visual QA → pending, Animação → click-reveal
- A2-01: Pipeline → redesign-poc, Visual QA → pending, Animação → click-reveal
- A1-03: Pipeline → redesign-poc, Visual QA → pending, Animação → interactive-meld
- CP1: Pipeline → redesign-poc, Visual QA → pending, Animação → click-reveal

## QA 24/fev (before batch 0)
- **CSS:** Removido data-grid, card-metric, hook-context, hook-question, text-accent, stage overrides para card-navy/card-metric
- **CLAUDE.md:** Slim — ordem/status em HANDOFF apenas
- **Assertion-evidence:** Headlines OK, source-tag OK, zero bullets
- **QA visual:** 28 slides avaliados foto a foto. Relatório em QA-VISUAL-24fev.md. Screenshots em qa-screenshots/stage-c/

## Tri-mode sync
- ✅ Plan A (index.html): body class="stage-a", dark 1920×1080, GSAP — **NÃO atualizado neste batch**
- ✅ Plan C (stage-c): light 1280×720, GSAP — **ATUALIZADO (4 PoC + panel + click-reveal)**
- ✅ Plan B (stage-b): light 1280×720, sem animação — **NÃO atualizado neste batch**

## Sync Notion ↔ Repo (24/fev/2026)

**IDs para Claude.ai (MCP Notion):**
- Slides DB: `620431d1-8955-42b7-8b04-8f7cc616a8ab`
- Blueprint Cirrose: `30adfe68-59a8-815a-abf5-c817cd705b29`
- References DB: `2b24bb6c-91be-42c0-ae28-908a794e5cf5`

**Notion → Repo:** Query Slides DB, ler specs (Headline PT, Evidence, Citation, Speaker Notes, Animação), atualizar HTML ou gerar handoff. Pedir: "sincroniza Notion → repo para slide X".

**Repo → Notion:** Após implementar slide no HTML, atualizar Slides DB: Pipeline Status → html-ready, Visual QA → approved. Pedir: "sincroniza repo → Notion para os slides que implementei".

**Limitação:** Células de table_row não são editáveis via API. Tabelas na Blueprint = edição manual.

- **Slides DB:** 28 registros ativos (20 core + 8 APP) • 3 DEPRECATED (A1-02-OLD, CIRR-04-01, A2-04-OLD)
- **Blueprint page:** Ordem definitiva v3 documentada (TITLE→A1-01→A1-02→HOOK→A1-03...→CLOSE→APP-01...APP-08)

## Regras de Export (review packages / audit-export)
- **SEMPRE incluir** a Blueprint do projeto em Markdown (Notion page `30adfe68-59a8-815a-abf5-c817cd705b29`)
- **SEMPRE incluir** a Bíblia Narrativa + Pérolas Clínicas (Notion page `311dfe68-59a8-816b-b9c0-ec10eccfb235`)
- Exportar ambas via `notion-fetch` → salvar como `.md` na pasta `docs/` do pacote
- Nomes: `docs/blueprint-cirrose.md` e `docs/biblia-narrativa.md`

## Roadmap (atualizado 2026-02-26)

### Concluído
- ☑ **P0: Stage-C Stability** — QA script, QA mode, panel safe area (ba474f8)
- ☑ **P1: Fill ratio** — min() em 9 containers + source-tags (92328c7)
- ☑ **P2: Hero typography** — Instrument Serif + graceful degradation (822cf38)
- ☑ **JS bugfix: hash navigation** — fallback timer 800ms (7a49c9f)
- ☑ **Floating panel refactor** — grid→overlay + HOOK card light (982dd01)
- ☑ **P3: Panel por ID** — CasePanel/ClickReveal/registerCustom → slide IDs (c441540)

### Imediato (próxima sessão)
- ☐ [Code] **s-a1-01 título** — encurtar para continuum sem repetir 1%/57%
- ☐ [Code] **s-hook refactoring** — título verbo, layout ≠ split-50-50, texto revisado, manter case card
- ☑ [Code] **QA visual 28 slides** pós-floating-panel — 28 PNGs OK (26/fev)
- ☐ [Code] **Merge `refactor/floating-panel` → `main`** após QA

### Curto prazo
- ☐ [Code] **Fixes individuais I1-I10** (ver AUDIT-VISUAL.md backlog)
- ☐ [Code] **Slides críticos** — usuário indicará quais
- ☐ [Code] **Audit export** — Gemini, Claude.ai, ChatGPT (zip + PNG transições)

### Médio prazo
- ☐ [Code] Batches 1-3: Refatorar 24 slides restantes para archetypes
- ☐ [Code] Módulos: decision-tree.js, timeline.js
- ☐ [Code] Sincronizar Plans A e B com mudanças do stage-c
- ☐ [Claude.ai] Revisão headline-by-headline dos 20 slides core
- ☐ [Claude.ai] Speaker notes EN→PT para slides pendentes
- ☐ [Claude.ai] Popular References DB com os 15 PMIDs verificados

## Triagem de auditorias externas (25/fev)
3 fontes analisadas criticamente:
- **AUDIT-CONSOLIDADA** (Claude.ai Opus): 28 slides × 8 dimensões. Ghost text + stagger = ARTEFATOS de screenshot (confirmado por análise de cascata). Panel clip = real.
- **ERRATA-FIX-SENIOR**: Diagnóstico correto. Propõe custom properties sem `!important`. Aceito integralmente.
- **Gemini Custom Gem**: Rejeitados: `!important` spray (10+ desnecessários), glassmorphism, --panel-width 260px (piora clip), emojis em HTML, `animation: failsafe-gsap` (luta com GSAP). Aceito parcialmente: fill ratio via `min()`.
- **Resultado:** 4 `!important` no codebase (todos pré-existentes e justificados). Zero adicionados.
