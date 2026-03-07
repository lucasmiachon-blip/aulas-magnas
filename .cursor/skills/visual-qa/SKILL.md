---
name: visual-qa
description: Use when testing, reviewing, or doing QA on slides. Runs visual checks with Playwright screenshots, accessibility verification with a11y, contrast checks, and reports issues found. See docs/SKILLS.md for best practices.
---

# Visual QA for Slides

> **Fonte canônica:** `.claude/agents/qa-engineer.md` — este arquivo é redirect + trigger guide.
> O agente `qa-engineer` cobre todos os critérios abaixo + 13 critérios com nota 0-10.

## When to use

- User says "QA", "revise", "teste o slide", "verifique", "screenshot", "auditoria"
- Após implementar um batch de slides
- Antes de marcar qualquer slide como "ready" ou atualizar Notion status

## Como executar

**Para Cursor:** delegar para o subagent `qa-engineer` via Task tool:

```
Siga .claude/agents/qa-engineer.md. Auditar slide [ID].
URL local: http://localhost:3000/aulas/cirrose/
Viewport: 1280x720. Reportar com scorecard 13 critérios.
```

**Para revisão rápida manual:**

| Check | Critério |
|-------|----------|
| Screenshot 1280×720 | Fill ratio 65-90%, sem overflow |
| a11y contraste | ≥ 4.5:1 body, ≥ 3:1 hero numbers |
| Interactions | `advance()` + `retreat()` testados |
| JS console | Zero erros |
| Plan B (sem JS) | Todo conteúdo visível com `.stage-bad` |

## Critérios do qa-engineer (referência rápida)

| # | Critério | Nota mín |
|---|---------|---------|
| 1 | Assertion-Evidence | 9/10 |
| 2 | Tipografia | 9/10 |
| 3 | Contraste WCAG | 9/10 |
| 4 | Fill ratio | 9/10 |
| 5 | Densidade informacional | 9/10 |
| 6 | Impacto visual | 9/10 |
| 7 | Interações | 9/10 |
| 8 | CSS tokens | 9/10 |
| 9 | Dados clínicos | 9/10 |
| 10 | a11y Lighthouse | 9/10 |
| 11 | Carga cognitiva (Sweller CLT) | 9/10 |
| 12 | Aprendizagem adulto (Knowles+Miller) | 9/10 |
| 13 | Arco narrativo (Duarte+Assertion-Evidence) | 9/10 |

## O que NÃO fazer

- Não alterar código durante QA — só reportar
- Não marcar como PASS se qualquer critério < 9
- Não pular Plan B (condições de projeção variam)
