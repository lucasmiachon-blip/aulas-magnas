# Skills — Melhores Práticas

> Baseado em: docs oficiais Anthropic Claude Code (mar 2026) + Cursor Docs. Última atualização: 2026-03-07.

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
version: 0.1.0
context: fork               # opcional — isola em subagent
agent: general-purpose      # opcional — só com context:fork
allowed-tools: Read, Grep   # opcional — sem aprovação por uso
argument-hint: "[arg]"      # opcional — hint no autocomplete
user-invocable: false       # opcional — esconde do menu /; Claude ainda auto-ativa
disable-model-invocation: true  # opcional — só invocação manual
---
```

| Campo | Obrigatório | Regras |
|------|-------------|--------|
| `name` | Sim | lowercase, hífens, max 64 chars |
| `description` | Sim | Terceira pessoa. Incluir WHAT + WHEN. Termos de trigger. Max 1024 chars. |
| `version` | Não | Semver (ex: `0.2.0`) para rastrear updates |
| `context` | Não | `fork` = isola em subagent com contexto separado |
| `agent` | Não | Tipo de subagent: `Explore`, `Plan`, `general-purpose` (só com `context:fork`) |
| `allowed-tools` | Não | Ferramentas sem aprovação: `Read, Grep, Glob`, `Bash(npm run *)` |
| `argument-hint` | Não | Hint no autocomplete: `[slide-file]`, `[query]` |
| `user-invocable` | Não | `false` = esconde do `/`; Claude ainda auto-ativa |
| `disable-model-invocation` | Não | `true` = só invocação manual (para workflows com side-effects) |

> **Bug conhecido (Issue #17283):** `context:fork` e `agent:` são ignorados quando skill é invocado via Skill tool (API/SDK). Funciona apenas no CLI direto.

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

### Claude Code (`.claude/skills/`)

| Skill | version | context | allowed-tools | Papel |
|-------|---------|---------|---------------|-------|
| `assertion-evidence` | 0.2.0 | — | Read, Grep, Glob | Valida formato assertion-evidence em slides HTML |
| `medical-data` | 0.2.0 | — | Read, Grep | Verifica dados clínicos: trial, IC95%, PMID obrigatórios |
| `docs-audit` | 0.2.0 | fork / general-purpose | Read, Grep, Glob | Audita docs/*.md: links, redundância, token economy |
| `review` | 0.2.0 | fork / Explore | Read, Grep, Glob | Audita slides: PASS/WARN/FAIL por dimensão |
| `evidence` | 0.2.0 | fork / general-purpose | Read, WebSearch | Busca evidências PubMed → citação AMA + dados slide |
| `new-slide` | — | — | — | Cria slide HTML completo com archetype correto |
| `export` | — | — | — | Exporta slides para PDF/compartilhamento |

### Cursor (`.cursor/skills/`)

| Skill | Papel |
|-------|-------|
| `medical-slide` | Notion→HTML, tri-mode, execução completa |
| `visual-qa` | Playwright, a11y, screenshots |
| `docs-audit` | Canônico — Claude Code delega para `.cursor/skills/docs-audit/` |

## Papéis — Sem conflito

| Superfície | Skills | Papel |
|------------|--------|-------|
| **Cursor** | .cursor/skills/ | Execução: build, MCPs, subagents, Playwright |
| **Claude Code** | .claude/skills/ | Terminal: auditoria, validação, pesquisa (sem Cursor) |
| **Claude.ai** | .claude/skills/ | Web: specs, narrativa (upload manual) |

**Regra:** Cada superfície usa seu diretório. docs-audit espelhado: mesmo conteúdo, path adaptado. Nenhum skill duplica papel de outro.
