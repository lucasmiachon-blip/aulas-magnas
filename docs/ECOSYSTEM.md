# Ecossistema — Aulas Magnas

> Modelos não competem — cada um tem um papel específico no pipeline.
> Handoff certo = sem retrabalho. Ver pipeline resumido no CLAUDE.md (Step 0).
> Última atualização: 2026-03-07 (benchmarks verificados via WebSearch)

---

## Benchmarks — Março 2026

> Fontes: [WebDev Arena](https://web.lmarena.ai/leaderboard) · [NxCode](https://www.nxcode.io) · [VentureBeat](https://venturebeat.com) · [Vellum](https://www.vellum.ai/blog/claude-opus-4-6-benchmarks)
> ⚠️ **Gemini 3 Pro preview encerra 9 mar 2026** → usar Gemini 3.1 Pro ($2/M, mesmo preço)

| Modelo | WebDev Arena (Elo) | SWE-bench Verified | GPQA Diamond | OSWorld | Destaque |
|--------|-------------------|--------------------|--------------|---------|---------|
| **Gemini 3.1 Pro** | APEX Agents #1 | 80.6% | **94.3%** | — | ARC-AGI-2 77.1% (2× 3 Pro) · LiveCode Elo 2887 · SVG animado |
| ~~**Gemini 3 Pro**~~ | ~~1487 #1~~ | ~~76.2%~~ | — | — | ⚠️ **Encerra 9 mar 2026** → migrar para 3.1 Pro |
| **Gemini 3 Flash** | 1416 (#8, ↑↑↑) | **78%** (> 3 Pro) | 90.4% | — | 3× mais rápido · $0.50/M · SWE > Pro |
| **Gemini 3.1 Flash-Lite** | — | — | 86.9% | — | 382 tok/s · $0.25/M input · 2.5× faster TTFA vs 2.5 Flash · lançado 3 mar 2026 |
| **Claude Opus 4.6** | — | 80.8% | 91.3% | 72.7% | τ²-bench Telecom 99.3% · MRCR 76% · 1M ctx |
| **Claude Sonnet 4.6** | — | 79.6% | 74.1% | 72.5% | 5× mais barato que Opus · ARC-AGI-2 +4.3× |
| **GPT-5.4** | — | — | — | **75%** (> humano 72.4%) | Native computer use · lançado 5 mar 2026 |
| **GPT-5.2** | — | 80.0% | — | 47.3% | Predecessor GPT-5.4 |
| **Claude Opus 4.5 (Thinking)** | **1510 #1** (arena geral) | — | — | — | Topo WebDev geral · com extended thinking |
| **ChatGPT Agent** | — | — | — | — | BrowseComp 68.9% · browser automation · MCP 100+ apps |

---

## Pipeline Multimodal — Papel de Cada Modelo

> Roteamento calibrado por benchmark. Ver `docs/KPIs.md` para decisão rápida por tarefa.

| Modelo / Ferramenta | Papel neste projeto | Por quê |
|--------------------|--------------------|---------|
| **Claude Opus 4.6** (claude.ai chat) | Arquitetura · spec clínica · decisões CLAUDE.md · diagnóstico UI/UX | GPQA 91.3% · METR horizon 14.5h · τ²-bench 99.3% |
| **Claude Code** (Sonnet 4.6) | **Geração de HTML de slides** · build · git · lint | SWE 79.6% · melhor em seguir constraints estritas (assertion-evidence, archetypes, token system) |
| **Gemini 3.1 Pro** | Debug CSS/GSAP orientado por spec · SVG animado · **video QA (motion tier 5)** | SWE 80.6% · APEX Agents #1 · VideoMME 84.8% · $2/M |
| **Gemini 3.1 Flash-Lite** | Lint rápido · small fixes · batch protótipos | 382 tok/s · $0.25/M · GPQA 86.9% · 2.5× faster TTFA vs 2.5 Flash |
| **Perplexity Computer** | Pesquisa clínica longa (overnight) · verificação 28 slides vs EASL/BAVENO | 19 modelos · roda horas · GitHub/Notion — não é para edição real-time |
| **ChatGPT Agent (GPT-5.4)** | QA browser · navegar localhost:3000 · screenshots de layout | 75% OSWorld (> humano 72.4%) · BrowseComp 82.7% |
| **Perplexity Ultra** (MCP) | Pesquisa em tempo real | Acesso web em tempo real |
| **Scite** (MCP) | Supporting/contradicting por artigo | Verificação de citações |
| **Zotero** (MCP) | Biblioteca de referências · DOIs | Gestão bibliográfica |

---

## Ferramentas Completas

| Ferramenta | Uso no pipeline | MCP | Status |
|------------|----------------|-----|--------|
| **Claude Opus 4.6** (claude.ai) | Design decisions · spec · clinical | — | ✅ Ativo |
| **Claude Code** (Sonnet 4.6) | Implementação · build | — | ✅ Esta sessão |
| **Gemini 3.1 Pro** | CSS/GSAP debug · SVG · video QA | → MCP planejado | ⏳ Setup pendente |
| **Gemini 3.1 Flash-Lite** | Lint · quick fix · batch | → MCP planejado | ⏳ Setup pendente |
| **Perplexity Computer** | Orquestração multi-agente | — | ⏳ $200/mês Max |
| **ChatGPT Agent** (GPT-5.4) | Browser automation · computer use | — | ✅ Disponível |
| **Perplexity Ultra** | Pesquisa em tempo real | Sim | ✅ Ativo |
| **Scite** | Citações | Sim | ✅ MCP streamableHttp |
| **Consensus** | Meta-análises | — | Manual |
| **Elicit** | Extração de papers | — | Manual |
| **Notion** | Specs · Bíblia · References | Sim | ✅ MCP |
| **Zotero** | Referências | Sim | ✅ MCP |
| **Canva Pro** | Assets visuais | — | Manual |
| **Excalidraw** | Diagramas · storyboards | — | Notion embed |

---

## GitHub (lucasmiachon-blip)

> Paths são exemplos — ajustar ao seu ambiente.

| Repo | Path local | Conteúdo |
|------|-----------|----------|
| aulas_core | C:\Dev\Projetos\Aulas_core | Origem migração |
| aulas_core | C:\Dev\Projetos\Aulas2 | GRADE, Osteoporose |
| aulas-magnas | C:\Dev\Projetos\aulas-magnas | **Hub atual** — Cirrose, GRADE, Osteoporose |

---

## MCPs (Inventário)

| MCP | Uso no pipeline | Status |
|-----|----------------|--------|
| pubmed / pubmed-simple | Verificar PMIDs, buscar evidência | OK |
| crossref | Validar DOIs | OK |
| notion | Specs, Bíblia Narrativa, References DB | OK |
| playwright | Screenshots, QA visual | OK |
| a11y | Contraste, acessibilidade | OK |
| eslint | Lint slides | OK |
| memory | Contexto entre sessões | Fix path |
| biomcp | Dados biológicos | OK |
| zotero | Referências | OK |
| perplexity / arxiv | Pesquisa ampliada | OK |
| scite | Citações, supporting/contradicting | OK |
| **gemini** | CSS debug · video QA | **⏳ Pendente config** |

**Variáveis de ambiente:** `docs/MCP-ENV-VARS.md` (NOTION_TOKEN, NCBI_API_KEY, ZOTERO_API_KEY)

---

## Como Atualizar

1. **Nova ferramenta:** Adicionar nesta tabela com uso + se tem MCP
2. **MCP novo:** Configurar em `.cursor/mcp.json`, testar `claude mcp list`
3. **Skill novo:** Criar em `.cursor/skills/[nome]/SKILL.md` (ver [docs/SKILLS.md](SKILLS.md))
4. **Rule novo:** Criar em `.cursor/rules/[nome].mdc` (ver [docs/RULES.md](RULES.md))
5. **Busca semanal:** Rodar prompt em `docs/prompts/weekly-updates.md`
6. **Benchmarks:** Verificar [arena.ai/leaderboard](https://arena.ai/leaderboard/code) mensalmente
