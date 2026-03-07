---
name: medical-slide
description: Use when creating, implementing, or modifying medical presentation slides. Covers the full workflow from Notion spec to HTML with assertion-evidence structure, tri-mode verification, and clinical data safety. See docs/SKILLS.md for best practices.
---

# Medical Slide Builder (Cursor)

> **Escopo:** Cursor (com Notion MCP). Lê spec do Slides DB e delega produção para `slide-frontend-ux`.
> **Claude Code:** Usar `.claude/agents/slide-builder.md` (spec manual, sem Notion).

## When to use
- User says "crie um slide", "implemente slide", "faça o HTML do slide X"
- User references a Notion spec or Slides DB entry
- User asks to convert a blueprint/storyboard into HTML

---

## Step 0: Ler a spec no Notion

Se um Notion Slides DB ID ou nome foi fornecido:
1. Use Notion MCP para ler o registro do slide
2. Extrair: Headline PT, Visual Recomendado, Objetivo Cognitivo, Refs
3. Se sem spec Notion: pedir ao usuário headline + visual + objetivo

---

## Step 1: Verificar dados clínicos

Antes de escrever HTML — seguir `.claude/skills/medical-data/SKILL.md`:
- [ ] Todo número tem fonte verificada (PMID ou DOI)
- [ ] HR ≠ RR (não misturar)
- [ ] NNT inclui IC 95% e time frame
- [ ] Dado ausente → `[TBD]`, não inventar

---

## Step 2: Implementar HTML

**Seguir `.cursor/skills/slide-frontend-ux/SKILL.md` integralmente** para:
- Assertion-evidence (§1)
- Tipografia e tokens de cor (§2, §3)
- Layout e fill ratio (§4)
- Animações GSAP + state machine (§5, §7)
- Momento de impacto visual (§6)
- Contraste e acessibilidade (§8)
- Checklist de produção (§9)

---

## Step 3: Atualizar Notion

Após commit bem-sucedido:
- Use Notion MCP para atualizar Pipeline Status → "implemented"
- Adicionar comment com commit hash

---

## Anti-patterns

- Inventar ou estimar dados clínicos
- Slide com título-rótulo (não-afirmação)
- Animação decorativa sem propósito pedagógico
- HEX hardcoded em CSS
