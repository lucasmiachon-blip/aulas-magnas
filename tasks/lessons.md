# Lessons — Padrões Aprendidos

> Atualizado após correções e auditorias. Revisar no início de sessão.

---

## Auditoria Batches (2026-03)

### Rules: .cursor vs .claude

- **Fonte canônica:** .cursor/rules/ — Cursor usa .mdc com frontmatter
- **.claude rules:** Deprecados para overlap; conteúdo único migrado para .cursor
- **design-system:** Mais verboso que cirrose-design; design-system = referência completa, cirrose-design = quick ref

### Paths CSS

- **NUNCA** documentar shared/css/archetypes.css ou shared/css/cirrose.css — não existem
- Realidade: base.css em shared/; archetypes.css e cirrose.css em aulas/cirrose/ (e grade, osteoporose)

### Notion ↔ Repo

- IDs canônicos: docs/SYNC-NOTION-REPO.md
- Conflito de versão: Composer/Claude Opus determina o mais atual → prevalece

### MD Audit

- Não manual. Skill docs-audit + subagent generalPurpose/qa-engineer
- Critérios: dev, designer, prompt eng, engenheiro de sistema, economia de tokens

### Skills .cursor vs .claude

- Sem conflito: cada superfície usa seu diretório (Cursor vs Claude Code vs Claude.ai)
- docs-audit espelhado: mesmo conteúdo, path no prompt adaptado
- assertion-evidence, medical-data: Claude only, complementam medical-slide (não duplicam)

### Skills

- medical-slide (Cursor) cobre assertion-evidence + verificação de dados
- assertion-evidence e medical-data (Claude) são subconjuntos — avaliar depreciação

### Context Window

- ≥70%: informar ao usuário
- ≥85%: recomendar subagent ou novo chat
- ≥95%: parar e recomendar novo chat
- **Sinais sem métrica:** respostas genéricas, esquecimento, repetição, confusão, pedidos já respondidos, lentidão → novo chat
- Regra em core-constraints.mdc; referência em docs/RULES.md, docs/SUBAGENTS.md

---

## Anti-patterns

- Documentar paths sem verificar existência no filesystem
- Duplicar regras entre .cursor e .claude sem decisão de fonte canônica
- Verbosidade em CLAUDE.md duplicando docs/

---

*Append-only. Não remover lições antigas.*
