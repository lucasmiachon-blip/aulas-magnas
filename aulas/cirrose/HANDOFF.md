# HANDOFF — Cirrose (atualizado 2026-02-25)

## Último batch executado
- **Batch:** Título + Evidence Enrichment Sync
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
- **registerCustom:** index 3 → HOOK (framework + case stagger). Demais via data-animate (fadeUp/stagger) nos 24 slides antigos.
- **Click-reveal:** Slides com data-reveal: s-a1-01 (2 reveals), s-a2-01 (3 reveals), s-cp1 (3 reveals)
- **Case panel:** 5 estados registrados (indexes 3/7/14/18/19). Visível slides 3-27.
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
- **QA visual:** 28 slides avaliados foto a foto. Relatório em QA-VISUAL-24fev.md. Screenshots em qa-screenshots/

## Tri-mode sync
- ✅ Plan A (index.html): body class="stage-a", dark 1920×1080, GSAP — **NÃO atualizado neste batch**
- ✅ Plan C (stage-c): light 1280×720, GSAP — **ATUALIZADO (4 PoC + panel + click-reveal)**
- ✅ Plan B (stage-b): light 1280×720, sem animação — **NÃO atualizado neste batch**

## Sync Notion ↔ Repo (24/fev/2026)

**IDs para Claude.ai (MCP Notion):**
- Slides DB: `c6713964-0b31-454f-83f5-4b287911a01b`
- Blueprint Cirrose: `30adfe68-59a8-815a-abf5-c817cd705b29`
- References DB: `2b24bb6c-91be-42c0-ae28-908a794e5cf5`

**Notion → Repo:** Query Slides DB, ler specs (Headline PT, Evidence, Citation, Speaker Notes, Animação), atualizar HTML ou gerar handoff. Pedir: "sincroniza Notion → repo para slide X".

**Repo → Notion:** Após implementar slide no HTML, atualizar Slides DB: Pipeline Status → html-ready, Visual QA → approved. Pedir: "sincroniza repo → Notion para os slides que implementei".

**Limitação:** Células de table_row não são editáveis via API. Tabelas na Blueprint = edição manual.

- **Slides DB:** 28 registros ativos (20 core + 8 APP) • 3 DEPRECATED (A1-02-OLD, CIRR-04-01, A2-04-OLD)
- **Blueprint page:** Ordem definitiva v3 documentada (TITLE→A1-01→A1-02→HOOK→A1-03...→CLOSE→APP-01...APP-08)

## Próximo batch esperado
- [Claude.ai] Revisão headline-by-headline (20 core slides) → gerar handoff com headlines atualizadas
- [Code] Batch 1-3: Refatorar 24 slides para archetypes (usar Bíblia Narrativa como referência)
- [Code] Sincronizar Plans A e B com as mudanças do stage-c
