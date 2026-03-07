# Docs — Índice

> Onboarding, referência e estado do projeto.

---

## Por propósito

### Onboarding
| Doc | Uso |
|-----|-----|
| [SETUP.md](SETUP.md) | Configuração inicial do projeto |
| [CLAUDE.md](../CLAUDE.md) (root) | **Fonte de verdade operacional** — stack, regras, workflow |

### Boas práticas (referência)
| Doc | Uso |
|-----|-----|
| [RULES.md](RULES.md) | Rules .mdc — quando usar, estrutura |
| [SKILLS.md](SKILLS.md) | Skills — estrutura, anti-patterns |
| [SUBAGENTS.md](SUBAGENTS.md) | Subagents — tipos, quando usar |

### Estado e handoff
| Doc | Uso |
|-----|-----|
| [aulas/cirrose/HANDOFF.md](../aulas/cirrose/HANDOFF.md) | Pendências Cirrose |
| [aulas/cirrose/HANDOFF-CLAUDE-AI.md](../aulas/cirrose/HANDOFF-CLAUDE-AI.md) | Claude.ai (paths, pendências) |
| aulas/grade/HANDOFF.md | Estado GRADE |
| aulas/osteoporose/HANDOFF.md | Estado Osteoporose |

### MCPs e integrações
| Doc | Uso |
|-----|-----|
| [ECOSYSTEM.md](ECOSYSTEM.md) | Ferramentas, MCPs, benchmarks, como atualizar |
| [KPIs.md](KPIs.md) | KPIs de produção multiagente |
| [MCP-ENV-VARS.md](MCP-ENV-VARS.md) | Variáveis de ambiente |
| [MCP-ACADEMICOS.md](MCP-ACADEMICOS.md) | MCPs acadêmicos (semantic-scholar, etc.) |
| [SYNC-NOTION-REPO.md](SYNC-NOTION-REPO.md) | Notion IDs (canônico), sync, autoridade repo > Notion |

### Conteúdo e escopo
| Doc | Uso |
|-----|-----|
| [metanalise-scope.md](metanalise-scope.md) | Escopo Meta-análise |
| [blueprint-cirrose.md](blueprint-cirrose.md) | Blueprint Cirrose |
| [biblia-narrativa.md](biblia-narrativa.md) | Narrativa |
| [slide-pedagogy.md](slide-pedagogy.md) | Teorias pedagógicas codificadas (Sweller, Mayer, Alley) |
| [insights-html-cirrose-2026.md](insights-html-cirrose-2026.md) | Análise do HTML Gemini (referência, não entra em slides) |

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

1. **aulas/cirrose/HANDOFF.md** — Pendências Cirrose (projeto ativo)
2. **aulas/cirrose/HANDOFF-CLAUDE-AI.md** — Para Claude.ai (Project Knowledge)
3. aulas/grade/HANDOFF.md, aulas/osteoporose/HANDOFF.md — Por aula

**Não existe docs/HANDOFF.md** — estado geral está distribuído por aula.

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
