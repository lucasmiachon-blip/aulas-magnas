# HANDOFF — Cirrose (atualizado 2026-02-24)

## Último batch executado
- **Batch:** Plan A/C balance + stage-a + qa-screenshots script
- **Commit:** 2b82280
- **Data:** 2026-02-24
- **Agente:** Cursor / Claude Code
- **Alterações:** Plan A: body class="stage-a", dark theme (base.css). Plan C: já stage-c. cirrose.css: stage-a overrides (slide-figure mix-blend, HOOK visibility). scripts/qa-screenshots-cirrose.js: PORT configurável.

## Estado do HTML (index.stage-c.html)
- **Total sections:** 28
- **Ordem:**
  1. s-title (CIRR-TITLE)
  2. s-a1-01 (CIRR-A1-01)
  3. s-a1-02 (CIRR-A1-02)
  4. s-hook (CIRR-HOOK)
  5. s-a1-03 (CIRR-A1-03)
  6. s-a1-04 (CIRR-A1-04)
  7. s-a1-05 (CIRR-A1-05)
  8. s-cp1 (CIRR-CP1)
  9. s-a2-01 (CIRR-A2-01)
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
- **registerCustom:** index 3 → HOOK (framework + case stagger). gsap.set(visibility) + gsap.fromTo(opacity, y). Demais via data-animate (fadeUp/stagger).
- **Assets referenciados:** villanueva-2025-fig1.png, villanueva-2025-fig2a.png

## Pendências
- ☐ QA narrativo após todas sections implementadas

## QA 24/fev (before/after)
- **CSS:** Removido data-grid, card-metric, hook-context, hook-question, text-accent, stage overrides para card-navy/card-metric
- **CLAUDE.md:** Slim — ordem/status em HANDOFF apenas
- **Assertion-evidence:** Headlines OK, source-tag OK, zero bullets
- **QA visual:** 28 slides avaliados foto a foto. Relatório em QA-VISUAL-24fev.md. Screenshots em qa-screenshots/

## Tri-mode sync
- ✅ Plan A (index.html): body class="stage-a", dark 1920×1080, GSAP
- ✅ Plan C (stage-c): light 1280×720, GSAP
- ✅ Plan B (stage-b): light 1280×720, sem animação

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
- **Ação manual pendente:** Na tabela de status da Blueprint, atualizar linha "Popular Slides DB" de "2 DEPRECATED" para "3 DEPRECATED (A1-02-OLD, 04-01, A2-04-OLD)"

## Próximo batch esperado
- QA pass: narrativa, visual, animações
