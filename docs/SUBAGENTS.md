# Subagents — Melhores Práticas

> Baseado em: Cursor Docs, Anthropic Claude Code, mcp_task.
> Ver também: [RULES.md](RULES.md) · [SKILLS.md](SKILLS.md) · [XREF.md](XREF.md)

---

## O que são Subagents

Subagents são agentes especializados com contexto próprio. Cursor: `.cursor/agents/*.md`. Claude Code: `.claude/agents/*.md`. mcp_task: tipos explore, generalPurpose, shell, etc.

**docs/pipeline/** = pipeline humano, handoffs — não são subagents. Ver `docs/pipeline/README.md`.

---

## Tipos (mcp_task) + Custom

| Tipo | Local | Uso |
|------|-------|-----|
| **explore** | Built-in | Codebase, arquivos, padrões |
| **generalPurpose** | Built-in | Pesquisa, multi-step |
| **shell** | Built-in | Git, comandos |
| **qa-engineer** | .claude/agents/ | Lint, a11y, screenshots |
| **slide-builder** | .claude/agents/ | Criar slides HTML |
| **reference-manager** | .claude/agents/ | Validar PMIDs/DOIs |
| **reference-checker** | .cursor/agents/ | Extrair PMIDs/DOIs de slides (scan-only). Verificação → reference-manager |
| **verifier** | .claude/agents/ | Validar trabalho "pronto" (model: sonnet) |

---

## Melhores Práticas (Plano v6)

1. **One tack:** 1 subagent = 1 tarefa focada
2. **Paralelo:** Lançar 2–4 subagents quando tarefas independentes
3. **Explore:** Codebase, arquivos, padrões
4. **generalPurpose:** Pesquisa, multi-step
5. **shell:** Git, comandos
6. **Não:** Delegar tarefa que depende de contexto da conversa principal

---

## Quando Usar

- **Explorar:** "Onde está X?", "Como funciona Y?" → explore
- **Pesquisar:** "Buscar atualizações MCP/Cursor" → generalPurpose
- **Executar:** Git, npm, scripts → shell
- **QA:** Lint, screenshots, a11y → qa-engineer
- **Verificar:** "Confirme que está pronto" → verifier (Opus: não aceitar claim sem testar)
- **Auditar docs:** "audite os docs" → skill docs-audit + generalPurpose/qa-engineer
- **Criar:** Slide especificado → slide-builder

Proposta completa: `docs/SUBAGENTS-PROPOSAL.md`

---

## Quando NÃO Usar

- Tarefa que depende de decisões da conversa principal
- Pergunta simples (1–2 passos)
- Arquivo já conhecido (usar Read/Grep diretamente)

---

## Context Window

| Momento | Ação |
|---------|------|
| Em cada output | Informar "Contexto ~X%." (quando a plataforma expuser) |
| ≥70% | Manter aviso em todo output |
| ≥85% | Recomendar subagent ou novo chat |
| ≥95% | Parar e recomendar novo chat |

### Sinais de perda de eficácia (sem métrica)

Quando notar: respostas genéricas, "esquecimento" de contexto, repetição, confusão entre arquivos, pedidos de clarificação já respondidos, lentidão ou truncamento → **recomendar novo chat**.

Regra em `.cursor/rules/core-constraints.mdc`.
