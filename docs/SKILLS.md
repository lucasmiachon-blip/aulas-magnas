# Skills — Melhores Práticas

> Baseado em: [Cursor Docs — Agent Skills](https://cursor.com/docs/context/skills), [create-skill SKILL](~/.cursor/skills-cursor/create-skill/SKILL.md), plano v6.

---

## O que são Skills

Skills são pacotes de conhecimento e workflow que ensinam o agente a executar tarefas específicas. São portáveis, versionáveis e carregam recursos sob demanda.

**Locais:** `.cursor/skills/` (projeto) | `~/.cursor/skills/` (global)

---

## Estrutura

```
skill-name/
├── SKILL.md              # Obrigatório — instruções principais
├── reference.md          # Opcional — documentação detalhada
├── examples.md           # Opcional — exemplos de uso
├── scripts/              # Opcional — scripts executáveis
└── references/          # Opcional — docs adicionais
```

---

## SKILL.md — Frontmatter

```yaml
---
name: skill-name
description: O que faz e quando usar. Max 1024 chars.
---

# Nome do Skill

## When to Use
- Cenário 1
- Cenário 2

## Instructions
...
```

| Campo | Obrigatório | Regras |
|------|-------------|--------|
| `name` | Sim | lowercase, hífens, max 64 chars |
| `description` | Sim | Terceira pessoa. Incluir WHAT + WHEN. Termos de trigger. |

---

## Melhores Práticas (Cursor Docs + create-skill)

1. **Descrição:** Terceira pessoa, específica, com termos de trigger
   - ✅ "Processa specs do Notion e gera HTML assertion-evidence. Use quando criar, implementar ou modificar slides médicos."
   - ❌ "Ajuda com slides"

2. **Concisão:** SKILL.md < 500 linhas. Detalhes em reference.md

3. **Progressive disclosure:** Essencial em SKILL.md; referências em arquivos separados

4. **When to Use:** Cenários concretos que disparam o skill

5. **Exemplos concretos:** Não abstratos

6. **Scripts:** Self-contained, mensagens de erro úteis

---

## Anti-patterns

- Paths Windows (`\`) — usar `/`
- Muitas opções sem default
- Informação sensível ao tempo (datas fixas)
- Nomes vagos: `helper`, `utils`, `tools`

---

## Skills do Projeto

| Skill | Local | Papel |
|-------|-------|-------|
| medical-slide | .cursor | Cursor: Notion→HTML, tri-mode, execução |
| visual-qa | .cursor | Cursor: Playwright, a11y, screenshots |
| docs-audit | .cursor + .claude | Cursor: subagent. Claude Code: auditoria MD (sem conflito — superfície diferente) |
| assertion-evidence | .claude | Claude: validação formato (não executa HTML) |
| medical-data | .claude | Claude: verificação dados (complementar) |

## Papéis — Sem conflito

| Superfície | Skills | Papel |
|------------|--------|-------|
| **Cursor** | .cursor/skills/ | Execução: build, MCPs, subagents, Playwright |
| **Claude Code** | .claude/skills/ | Terminal: auditoria, validação, pesquisa (sem Cursor) |
| **Claude.ai** | .claude/skills/ | Web: specs, narrativa (upload manual) |

**Regra:** Cada superfície usa seu diretório. docs-audit espelhado: mesmo conteúdo, path no prompt adaptado. Nenhum skill duplica papel de outro.
