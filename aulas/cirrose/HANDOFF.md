# HANDOFF — Cirrose (atualizado 2026-02-23)

## Último batch executado
- **Batch:** Fix degrau — imagem aparece antes do efeito (Plan A/C)
- **Commit:** b46afb7
- **Data:** 2026-02-23
- **Agente:** Cursor / Claude Code
- **Alterações:** shared/css/base.css + shared/js/engine.js — `visibility: hidden` em [data-animate] até GSAP rodar; animFadeUp/animStagger setam `visibility: visible`

## Estado do HTML (index.stage-c.html)
- **Total sections:** 19
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
- **registerCustom:** index 3 → HOOK (framework + case stagger). Demais via data-animate (fadeUp/stagger).
- **Assets referenciados:** villanueva-2025-fig1.png, villanueva-2025-fig2a.png

## Pendências
- ☐ s-close (pos 20) — spec não incluída neste batch
- ☐ APP-01 a APP-08 (pos 21-28) — próximo batch
- ☐ QA narrativo após todas sections implementadas

## Tri-mode sync
- ✅ Plan C (stage-c): 19 sections implementadas
- ✅ Plan A (index.html): 19 sections replicadas (dark, 1920×1080, GSAP)
- ✅ Plan B (stage-b): 19 sections replicadas (light, 1280×720, sem animação)

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
- Spec CLOSE (pos 20) + implementar
- QA pass: narrativa, visual, animações
- Apêndice APP-01 a APP-08
