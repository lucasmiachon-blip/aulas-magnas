# Docs — Índice

> Onboarding, referência e estado do projeto.

---

## Por propósito

### Onboarding
| Doc | Uso |
|-----|-----|
| [SETUP.md](SETUP.md) | Configuração inicial do projeto |
| [AGENTS.md](../AGENTS.md) (root) | Regras gerais, stack, comandos |
| [CLAUDE.md](../CLAUDE.md) (root) | Contexto Cursor/Claude Code, workflow |

### Boas práticas (referência)
| Doc | Uso |
|-----|-----|
| [RULES.md](RULES.md) | Rules .mdc — quando usar, estrutura |
| [SKILLS.md](SKILLS.md) | Skills — estrutura, anti-patterns |
| [SUBAGENTS.md](SUBAGENTS.md) | Subagents — tipos, quando usar |
| [SUBAGENTS-PROPOSAL.md](SUBAGENTS-PROPOSAL.md) | Proposta consolidada (Cursor, Opus, Anthropic) |

### Estado e handoff
| Doc | Uso |
|-----|-----|
| [HANDOFF.md](HANDOFF.md) | Estado geral (Cirrose, GRADE, Osteoporose) |
| [aulas/cirrose/HANDOFF.md](../aulas/cirrose/HANDOFF.md) | Pendências Cirrose |
| [aulas/cirrose/HANDOFF-CLAUDE-AI.md](../aulas/cirrose/HANDOFF-CLAUDE-AI.md) | Claude.ai (paths, pendências) |

### MCPs e integrações
| Doc | Uso |
|-----|-----|
| [ECOSYSTEM.md](ECOSYSTEM.md) | Ferramentas, MCPs, como atualizar |
| [MCP-ENV-VARS.md](MCP-ENV-VARS.md) | Variáveis de ambiente |
| [MCP-ACADEMICOS.md](MCP-ACADEMICOS.md) | MCPs acadêmicos (semantic-scholar, etc.) |
| [SYNC-NOTION-REPO.md](SYNC-NOTION-REPO.md) | Notion IDs (canônico), sync, autoridade Composer/Opus |

### Conteúdo e escopo
| Doc | Uso |
|-----|-----|
| [metanalise-scope.md](metanalise-scope.md) | Escopo Meta-análise |
| [blueprint-cirrose.md](blueprint-cirrose.md) | Blueprint Cirrose |
| [biblia-narrativa.md](biblia-narrativa.md) | Narrativa |

### Referência cruzada
| Doc | Uso |
|-----|-----|
| [XREF.md](XREF.md) | Mapa canônico de dependências entre docs |

### Outros
| Doc | Uso |
|-----|-----|
| [ZIP-LIMPO-PROTOCOLO.md](ZIP-LIMPO-PROTOCOLO.md) | Protocolo export ZIP |
| [archive/](archive/README.md) | Docs arquivados (superseded, one-shot) |

---

## HANDOFFs — Hierarquia

1. **docs/HANDOFF.md** — Estado geral, todas as aulas
2. **aulas/cirrose/HANDOFF.md** — Pendências Cirrose
3. **aulas/cirrose/HANDOFF-CLAUDE-AI.md** — Para Claude.ai (Project Knowledge)
4. aulas/grade/HANDOFF.md, aulas/osteoporose/HANDOFF.md — Por aula

---

## MD — Auditoria

**Não manual.** Executar via skill/subagent:

```
audite os docs / verifique os MDs / audit markdown
```

**Skill:** `.cursor/skills/docs-audit/` (SKILL.md + reference.md)  
**Subagent:** `generalPurpose` ou `qa-engineer`  
**Critérios:** dev, designer, prompt eng, engenheiro de sistema, economia de tokens  
**Best practices:** Anthropic/Cursor mar/2026 — terceira pessoa, trigger terms, progressive disclosure
