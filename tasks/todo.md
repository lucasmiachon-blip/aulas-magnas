# Todo

> Pendências de infraestrutura e metadados. Conteúdo Cirrose → `aulas/cirrose/HANDOFF.md`

---

## 🔴 ALTA

*(vazio)*

---

## 🟡 MÉDIA — Próxima sessão

- [ ] **Setup MCP Gemini + ativar pipeline multimodelo (ver `docs/ECOSYSTEM.md` + `docs/KPIs.md`)**

  **Modelos confirmados (benchmarks mar 2026):**
  - **Opus 4.6** (chat): design · spec clínica · diagnóstico UI/UX — GPQA 91.3%
  - **Gemini 3.1 Pro**: CSS/GSAP debug · SVG animado · video QA — SWE 80.6% · APEX Agents #1
  - **Gemini 3 Flash**: lint · quick fix · protótipo — 3× rápido · $0.50/M · SWE 78%
  - **ChatGPT Agent (GPT-5.4)**: browser automation · QA — OSWorld 75%
  - **Perplexity Computer**: pesquisa clínica longa · orquestra 19 modelos ($200/mês Max)

  **Setup necessário:**
  - Configurar MCP Gemini em `.cursor/mcp.json` (google-gemini ou vertex-ai)
  - Criar template handoff: `docs/pipeline/opus-gemini-handoff.md`
  - Testar: `claude mcp list` → confirmar gemini disponível
  - Baseline KPIs antes de ativar: ver `docs/KPIs.md`

---

## 🟢 BAIXA — Backlog infra

- [ ] Batch 1: `.cursor/rules/*.mdc` vs `.claude/rules/*.md` — redundâncias remanescentes
- [ ] Batch 2: `.cursor/skills/*` vs `.claude/skills/*` — verificar alinhamento pós-update mar 2026
- [ ] Batch 3: `docs/*.md` — sobreposição, links quebrados (rodar `/docs-audit`)

---

## ✅ Concluído nesta sessão (2026-03-07)

- [x] Skills `.claude` atualizadas para padrões mar 2026 (version, allowed-tools, argument-hint, context:fork)
- [x] `docs/SKILLS.md` atualizado: tabela completa + frontmatter + bug Issue #17283
- [x] `docs/ECOSYSTEM.md`: link `MCP-FIXES.md` (não existia) → `MCP-ENV-VARS.md`
- [x] `slide-builder.md`: workflow atualizado para arquitetura modular (slides/*.html + build:cirrose)
- [x] `tasks/lessons.md`: append campos mar 2026 + bug context:fork
