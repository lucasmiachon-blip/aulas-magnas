---
name: review
description: Audita slides médicos — assertion-evidence, acessibilidade, dados clínicos e design system. Ativar quando o usuário pedir "revise", "audite", "review", "verifique slides" ou "check slides". Reporta PASS/WARN/FAIL por slide.
context: fork
agent: Explore
argument-hint: "[lecture] [slide-number?]"
---

# Review Slide

Audite `$ARGUMENTS` usando os checklists abaixo. Se nenhum argumento: audite `aulas/cirrose/`.

## Checklist por slide

### Assertion-Evidence
- [ ] `<h2>` é frase completa com claim verificável (não rótulo)
- [ ] Corpo ≤ 30 palavras de texto
- [ ] Zero `<ul>` ou `<ol>` no slide (só em `<aside class="notes">`)
- [ ] Evidência visual presente (gráfico/tabela/diagrama/número)
- [ ] Citação com PMID no footer

### Acessibilidade
- [ ] Contraste ≥ 4.5:1 (texto sobre fundo)
- [ ] Cor não é único canal de significado (ícone junto)
- [ ] Alt text em imagens/SVGs
- [ ] Font size efetivo ≥ 18px
- [ ] `data-animate` funciona sem animação (graceful degradation)

### Dados Clínicos
- [ ] Números têm fonte (trial/PMID)
- [ ] Effect sizes com IC 95%
- [ ] Guideline citada é versão vigente
- [ ] Dados incertos marcados `<!-- DATA: VERIFY -->`

### Design System
- [ ] Cores usam tokens OKLCH (zero hardcoded)
- [ ] Tipografia usa escala `--text-h1`, `--text-body`
- [ ] Espaçamento usa `--space-*`
- [ ] `.slide-inner` wrapper presente
- [ ] Slides escuros usam `.slide-navy`
- [ ] Background via `data-background-color` com HEX literal

### Speaker Notes
- [ ] `<aside class="notes">` presente com timing
- [ ] Pontos de ênfase marcados
- [ ] Transição para próximo slide descrita

## Output

Para cada slide: `PASS` / `WARN — [fix]` / `FAIL — [fix]`

Resumo final: total de slides, taxa de PASS, top 3 issues.
