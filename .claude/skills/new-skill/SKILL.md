---
name: new-skill
description: Scaffolds a new Claude Code skill from project conventions. Use when creating a new skill — "criar skill", "new skill", "scaffold skill [name]". Generates SKILL.md with correct YAML frontmatter and sections.
version: 1.0.0
context: fork
allowed-tools: Read, Write, Glob, Grep
argument-hint: "<skill-name> [description]"
---

# new-skill — Scaffold de Skill

Cria uma nova skill seguindo as convenções do projeto: `$ARGUMENTS`

## Workflow

1. **Parse arguments:** extrair `<skill-name>` e `[description]` de `$ARGUMENTS`
2. **Validate:** verificar que `.claude/skills/<skill-name>/` NÃO existe
3. **Prompt if missing:** se description não foi fornecida, perguntar ao usuário
4. **Generate:** criar `.claude/skills/<skill-name>/SKILL.md` com template abaixo
5. **Report:** listar o que foi criado e próximos passos

## Template

```markdown
---
name: <skill-name>
description: <description — incluir trigger terms para o skill matcher>
version: 1.0.0
context: fork
allowed-tools: Read, Bash, Glob, Grep
argument-hint: "[args]"
---

# <skill-name> — <Título>

<Descrição do que a skill faz>: `$ARGUMENTS`

## Trigger Terms

- termo1, termo2, termo3

## Workflow

1. Step 1
2. Step 2
3. Step 3

## Output

<Formato esperado do output>

## Rules

- Regra 1
- Regra 2
```

## Conventions (do projeto)

- **YAML frontmatter obrigatório:** name, description, version, context, allowed-tools, argument-hint
- **description** deve conter trigger terms para o skill matcher encontrar a skill
- **context: fork** para skills que rodam em subagent. `context: main` se precisar do contexto completo
- **allowed-tools:** mínimo necessário. Nunca dar Write/Edit se a skill é read-only
- **`$ARGUMENTS`** placeholder no corpo — Claude injeta os args do usuário
- **Seções esperadas:** Trigger Terms, Workflow, Output, Rules (mínimo)
- **agent:** campo opcional — se a skill precisa de um agent type específico (ex: `agent: qa-engineer`)

## Post-creation Checklist

Após criar a skill, lembrar o usuário de:
- [ ] Preencher o conteúdo real do SKILL.md
- [ ] Testar invocando `/skill-name` ou trigger terms
- [ ] Adicionar entrada em `docs/SKILLS.md` se for skill permanente
- [ ] Adicionar em `docs/XREF.md` se referenciar/for referenciada por outros docs

## Rules

- **NUNCA sobrescrever skill existente** — avisar e abortar se diretório já existe
- **NUNCA criar skills fora de `.claude/skills/`**
- Nomes em kebab-case: `my-skill`, não `mySkill` ou `my_skill`
- Description em uma linha, max ~200 chars
- Se o usuário não der description, perguntar — NUNCA inventar
