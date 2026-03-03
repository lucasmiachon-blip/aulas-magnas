# Rules — Melhores Práticas

> Baseado em: [Cursor Docs — Rules](https://cursor.com/docs/context/rules), [create-rule SKILL](~/.cursor/skills-cursor/create-rule/SKILL.md), plano v6.

---

## O que são Rules

Rules fornecem instruções persistentes ao Agent. São arquivos `.mdc` em `.cursor/rules/` com frontmatter YAML.

---

## Tipos de Ativação

| Tipo | Propriedade | Quando aplica |
|------|-------------|---------------|
| Always Apply | `alwaysApply: true` | Toda sessão |
| Apply Intelligently | `alwaysApply: false`, sem globs | Agent decide por relevância |
| Apply to Specific Files | `globs: "**/*.ts"` | Arquivo aberto corresponde ao padrão |
| Apply Manually | — | Quando @-mencionado no chat |

---

## Estrutura .mdc

```yaml
---
description: "O que a rule faz (aparece no picker)"
globs: "**/*.html"   # Opcional; vazio = Apply Intelligently
alwaysApply: false   # true = sempre aplica
---

# Título da Rule

Conteúdo em markdown...
```

---

## Melhores Práticas (Cursor Docs)

1. **Focadas e acionáveis:** Como docs internos claros
2. **Referenciar arquivos:** Não copiar código — apontar para exemplos canônicos
3. **Exemplos concretos:** Correto vs incorreto
4. **Split rules grandes:** > 500 linhas → dividir em módulos
5. **Evitar:** Vagas, duplicar codebase, documentar edge cases raros

---

## Regras do Projeto

| Rule | Globs | Sempre | Uso |
|------|-------|--------|-----|
| core-constraints | — | Sim | Documentação, CSS, Git, refator |
| medical-data | — | Sim | Dados clínicos, NNT, HR, RR |
| slide-editing | **/slides/**/*.html | Não | Edição HTML Cirrose |
| plan-mode | — | Não | Tarefas multi-step |
| design-principles | **/*.html,**/*.css | Não | Miller, Gestalt, Mayer, Tufte |
| cirrose-design | **/*.css,**/*.html | Não | Tokens, cores, fontes |
| notion-mcp | — | Não | Notion MCP, specs |
| css-errors | **/*.css | Não | Erros comuns CSS |

---

## Context Window (core-constraints)

| Momento | Ação |
|---------|------|
| Em cada output | Informar "Contexto ~X%." (quando a plataforma expuser) |
| ≥70% | Manter aviso em todo output |
| ≥85% | Recomendar subagent ou novo chat |
| ≥95% | Parar e recomendar novo chat |

Regra em `.cursor/rules/core-constraints.mdc`. Referência cruzada: `docs/SUBAGENTS.md`.

## Manutenção

- Incluir novas experiências do projeto
- Remover padrões obsoletos
- Testar com prompts diversos
- Versionar no git
