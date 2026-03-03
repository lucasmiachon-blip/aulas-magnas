# Ecossistema — Aulas Magnas

> Registro de ferramentas, MCPs e versões. Atualizar conforme o ecossistema muda.
> Fonte: [.cursor/plans/aulas-magnas-system-v6.plan.md](../.cursor/plans/aulas-magnas-system-v6.plan.md)

---

## Ferramentas do Lucas

| Ferramenta                   | Uso no pipeline                        | MCP | Atualização        |
| ---------------------------- | -------------------------------------- | --- | ------------------ |
| **Claude Opus** (Composer)   | Hub pesquisa, narrativa, raciocínio    | —   | Cursor auto-update |
| **Cursor MCP**               | Código, execução, MCPs, scripts        | —   | Cursor auto-update |
| **Claude Ultra** (claude.ai) | Conflitos, decisões narrativas         | —   | —                  |
| **Perplexity Ultra**         | Pesquisa em tempo real                 | Sim | MCP ou manual      |
| **Gemini Ultra**             | Alternativa pesquisa/raciocínio        | —   | —                  |
| **ChatGPT Pro Max**          | Alternativa tarefas específicas        | —   | —                  |
| **Scite**                    | Supporting/contradicting                 | Sim | MCP streamableHttp |
| **Consensus**                | Meta-análises, síntese                 | —   | Manual             |
| **Elicit**                   | Extração de papers                     | —   | Manual             |
| **Notion**                   | Specs, Bíblia, References              | Sim | MCP                |
| **Canva Pro**                | Assets visuais, diagramas              | —   | —                  |
| **Excalidraw**               | Diagramas, storyboards (ex: D'Amico)   | —   | Notion embed       |
| **Obsidian**                 | (sem uso) — graph conhecimento futuro  | —   | —                  |
| **Microsoft Copilot Pro**    | Alternativa pesquisa, Edge, Office 365 | —   | —                  |
| **Zotero**                   | Referências, biblioteca, citações      | Sim | MCP                |

---

## GitHub (lucasmiachon-blip)

| Repo         | Path local                   | Conteúdo                                    |
| ------------ | ---------------------------- | ------------------------------------------- |
| aulas_core   | C:\Dev\Projetos\Aulas_core   | Origem migração                             |
| aulas_core   | C:\Dev\Projetos\Aulas2       | GRADE, Osteoporose                          |
| aulas-magnas | C:\Dev\Projetos\aulas-magnas | **Hub atual** — Cirrose, GRADE, Osteoporose |

---

## MCPs (Inventário)

| MCP                     | Uso no pipeline                        | Status  |
| ----------------------- | -------------------------------------- | ------- |
| pubmed / pubmed-simple  | Verificar PMIDs, buscar evidência      | OK      |
| crossref                | Validar DOIs                           | OK      |
| notion                  | Specs, Bíblia Narrativa, References DB | OK      |
| playwright              | Screenshots, QA visual                 | OK      |
| a11y                    | Contraste, acessibilidade              | OK      |
| eslint                  | Lint slides                            | OK      |
| memory                  | Contexto entre sessões                 | Fix path|
| biomcp                  | Dados biológicos                       | OK      |
| zotero                  | Referências                            | OK      |
| perplexity / arxiv      | Pesquisa ampliada                      | OK      |
| scite                   | Citações, supporting/contradicting     | OK      |

**Fixes conhecidos:** `docs/MCP-FIXES.md` (filesystem, memory paths absolutos)

---

## Como Atualizar

1. **Nova ferramenta:** Adicionar nesta tabela com uso + se tem MCP
2. **MCP novo:** Configurar em `.cursor/mcp.json`, testar `claude mcp list`
3. **Skill novo:** Criar em `.cursor/skills/[nome]/SKILL.md` (ver [docs/SKILLS.md](SKILLS.md))
4. **Rule novo:** Criar em `.cursor/rules/[nome].mdc` (ver [docs/RULES.md](RULES.md))
5. **Busca semanal:** Rodar prompt em `docs/prompts/weekly-updates.md`
