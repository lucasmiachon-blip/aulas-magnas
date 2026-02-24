# HANDOFF — Projeto Aulas Magnas (atualizado 2026-02-25)

## Estado geral

| Aula | Slides HTML | QA Visual | Status |
|------|-------------|-----------|--------|
| **Cirrose** | 28/28 (20 core + 8 APP) | ✅ 24/fev — 28/28 OK | HTML completo, speaker notes PT pendente |
| **Meta-análise** | 0/16 | — | Blueprint v2 no Notion, sem HTML |
| **GRADE** | Framework parcial | — | Reestruturação pendente |

## Cirrose — Último estado

- **Arquivo:** `aulas/cirrose/index.stage-c.html` (Plan C — default)
- **Sections:** 28 (20 core + 8 APP)
- **Ordem:** TITLE → A1-01 → A1-02 → HOOK → A1-03 → A1-04 → A1-05 → CP1 → A2-01 → A2-02 → A2-03 → A2-04 → A2-05 → A2-06 → CP2 → A3-01 → A3-02 → A3-03 → CP3 → CLOSE → APP-01..08
- **QA Visual:** 28/28 OK (24/fev). Único issue: ghost text em transições Reveal.
- **CSS:** `cirrose.css` com todos componentes (evidence-panel, bar-chart, timeline, etc.)
- **registerCustom:** HOOK(3), CP1(7), A2-06(13), CP2(14), A3-03(17), CP3(18)

## Pendências globais

1. Speaker notes: converter EN → PT em todos os 28 slides
2. References DB: 15 refs pendentes de popular no Notion
3. Slides DB: sincronizar pipeline status (muitos ainda em `draft` ou `html-ready` — deveriam ser `qa-passed`)
4. Ghost text em transições: avaliar `transition: none` ou workaround
5. Meta-análise: iniciar implementação HTML

## IDs Notion

| Database | Data Source ID |
|----------|---------------|
| Aulas Magnas | def36683-985e-4a33-bd8c-ae0f2141ebbd |
| Slides | c6713964-0b31-454f-83f5-4b287911a01b |
| References | 2b24bb6c-91be-42c0-ae28-908a794e5cf5 |

---
*Atualizado 25/02/2026 após auditoria completa dos project files.*
