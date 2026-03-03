# Prompt — Pesquisa Melhores Práticas (Claude Code + Opus 4.6)

> Rodar no terminal: `claude --model opus` e colar o prompt abaixo.
> Ou: `claude --model opus -p "..."` (one-shot, pode demorar).

---

## Prompt

```
Pesquise as melhores práticas mais recentes (2024-2025) para:

1) **Arquivos MD de documentação** em projetos de código
   - Estrutura, convenções, README, CHANGELOG
   - Fontes: GitHub docs, Write the Docs, Divio

2) **Cursor/Claude Agent Skills** (SKILL.md)
   - Cursor Docs, agentskills.io, Anthropic
   - Estrutura, frontmatter, description, triggers

3) **Subagents** (mcp_task, agentes especializados)
   - Cursor mcp_task, tipos de subagent
   - Quando usar, paralelismo, one-tack

Depois atualize os arquivos deste repositório:
- docs/SKILLS.md
- docs/RULES.md
- docs/SUBAGENTS.md

Mantenha o formato existente. Adicione referências às fontes (URLs, datas).
```

---

## Como rodar

```powershell
cd c:\Dev\Projetos\aulas-magnas
claude --model opus
```

Na sessão interativa, digite `/model opus` se quiser garantir Opus e cole o prompt acima.
