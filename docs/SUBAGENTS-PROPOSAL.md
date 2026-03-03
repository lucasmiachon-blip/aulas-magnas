# Subagents — Proposta Consolidada

> Pesquisa: Cursor Docs, Anthropic Claude Code, Opus best practices (mar/2026). Objetivo: sem conflito, cada um com seu papel, reduzir trabalho.

---

## Estado atual

| Local | Conteúdo | Papel |
|-------|----------|-------|
| `.cursor/agents/` | reference-checker | Cursor: verificação PMIDs/DOIs |
| `.claude/agents/` | qa-engineer, slide-builder, reference-manager | Claude Code: specs por agente |
| `docs/pipeline/` | 01-planner … 10-qa-engineer | Pipeline humano: handoffs, não subagents Cursor |
| `docs/SUBAGENTS.md` | mcp_task types | Documentação tipos (explore, generalPurpose, etc.) |

**Conflito:** agents/ tem nomes sobrepostos (qa-engineer, reference-manager, slide-builder) com .claude/agents/. Formato diferente: agents/ = pipeline; .claude/agents/ = subagents Claude Code.

---

## O que Opus/Cursor/Anthropic propõem (mar/2026)

### Cursor Docs
- Built-in: explore, bash, browser (automáticos)
- Custom: `.cursor/agents/*.md` — 2-3 focados, descrição específica
- Anti-pattern: 50+ subagents genéricos
- Padrão verifier: valida trabalho marcado "pronto"

### Anthropic Claude Code
- Built-in: Explore, Plan, general-purpose, Bash
- Custom: `.claude/agents/*.md` — tool restrictions, model (Haiku para barato)
- Quando usar: output verboso, tarefa autocontida, restrições de ferramenta
- Quando não: latência importa, mudança rápida, contexto compartilhado

### Opus best practices (PubNub, etc.)
- Orchestrator-worker: Opus coordena, Sonnet/Haiku executam
- Verifier: subagent cético que testa trabalho "completo"
- Tool restrictions: doc-reviewer só Read/Grep
- 2-3 subagents para começar

---

## Proposta — Sem conflito, papéis claros

### Manter (já alinhados)

| Subagent | Local | Papel | Conflito? |
|----------|-------|-------|-----------|
| reference-checker | .cursor/agents/ | Verifica PMIDs/DOIs em slides | Não |
| qa-engineer | .claude/agents/ | Lint, a11y, screenshots | Não — agents/ é pipeline humano |
| slide-builder | .claude/agents/ | Cria slides HTML por spec | Não |
| reference-manager | .claude/agents/ | Valida refs, formata citações | Não |

### Adicionar (Opus best practice)

| Subagent | Local | Papel |
|----------|-------|-------|
| **verifier** | .cursor/agents/, .claude/agents/ | Valida trabalho "pronto" — testa, não aceita claim. model: fast. |

### Clarificar

| Item | Ação |
|------|------|
| docs/pipeline/ | Pipeline humano (Planner, etc.). Não são subagents Cursor. README em docs/pipeline/. |
| docs/SUBAGENTS.md | Atualizar: mcp_task types + referência a .cursor/agents/ e .claude/agents/ |
| mcp_task types | explore, generalPurpose, shell = built-in. qa-engineer, slide-builder, reference-manager = custom (mapear para .claude/agents/) |

### Não fazer

- Não criar dezenas de subagents
- Não duplicar agents/ em .cursor/agents/ (formato e propósito diferentes)
- Não misturar pipeline humano (agents/) com subagents Cursor/Claude

---

## Resumo executivo

| Ação | Esforço |
|------|---------|
| Adicionar verifier | 1 arquivo .cursor + 1 .claude |
| README em agents/ | 1 arquivo |
| Atualizar docs/SUBAGENTS.md | 1 edição |
| **Total** | ~30 min |

**Regra:** Cada subagent = 1 papel. Verifier complementa (valida); não duplica qa-engineer (qa executa, verifier confirma).
