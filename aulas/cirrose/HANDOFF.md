# HANDOFF — Cirrose (atualizado 2026-02-24)

## Último batch executado
- **Batch:** Initial implementation (4 sections)
- **Commit:** (ver git log — 3 commits no main)
- **Data:** 2026-02-21 (aprox)
- **Agente:** Cursor

## Estado do HTML (index.stage-c.html)
- **Total sections:** 4
- **Ordem:**
  1. s-title (CIRR-TITLE)
  2. s-a1-01 (CIRR-A1-01)
  3. s-a1-02 (CIRR-A1-02)
  4. s-hook (CIRR-HOOK)
- **registerCustom map:**
  - index 0 → countUp (TITLE)
  - index 1 → fadeUp (A1-01 — Villanueva fig1)
  - index 2 → stagger (A1-02 — Baveno pipeline)
  - index 3 → stagger (HOOK — case cards)

## Assets referenciados
- assets/villanueva-2025-fig1.png
- assets/villanueva-2025-fig2a.png

## O que foi feito
- 4 sections implementadas em stage-c (Plan C)
- Tri-mode system funcional (A/B/C)
- CSS específico em cirrose.css

## O que NÃO foi feito (pendências)
- ⚠️ TITLE speaker notes ainda em inglês (v3 tem em PT)
- ⚠️ HOOK mostra só cards clínicos (v3 quer advance organizer "5+3" + caso)
- ⚠️ A1-01 e A1-02 precisam revalidar headlines/notes contra v3
- ☐ 16 sections core pendentes (pos 5-20)
- ☐ 8 sections apêndice pendentes (pos 21-28)

## Sync Notion ↔ Repo (24/fev/2026)

- **Slides DB:** 28 registros ativos (20 core + 8 APP) • 3 DEPRECATED (A1-02-OLD, CIRR-04-01, A2-04-OLD)
- **Blueprint page:** Ordem definitiva v3 documentada (TITLE→A1-01→A1-02→HOOK→A1-03...→CLOSE→APP-01...APP-08)
- **Ação manual pendente:** Na tabela de status da Blueprint, atualizar linha "Popular Slides DB" de "2 DEPRECATED" para "3 DEPRECATED (A1-02-OLD, 04-01, A2-04-OLD)" — API Notion não permite editar células de table_row

## Próximo batch esperado
- **Batch 1:** Revalidar 4 sections existentes contra specs v3 do Notion
  - TITLE: notes EN→PT
  - A1-01, A1-02: confirmar headlines/notes v3
  - HOOK: reescrever para advance organizer + caso
