# .claude/skills — Papel

**Superfície:** Claude Code (terminal), Claude.ai (web). Não conflita com .cursor — superfícies diferentes.

| Skill | Papel | Conflito? |
|-------|-------|-----------|
| docs-audit | Auditoria MD (Claude Code sem Cursor) | Não — .cursor executa subagent; .claude executa direto |
| assertion-evidence | Validação formato (não implementa) | Não — medical-slide implementa |
| medical-data | Verificação dados (complementar) | Não — medical-slide Step 2 cobre básico |

**Regra:** Cada skill tem um papel. Nenhum duplica função de outro.
