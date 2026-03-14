---
name: review
description: Audita slides médicos — assertion-evidence, acessibilidade, dados clínicos e design system. Adaptável por aula (lê CLAUDE.md da aula para contexto clínico). Ativar quando o usuário pedir "revise", "audite", "review", "verifique slides" ou "check slides". Reporta PASS/WARN/FAIL por slide.
version: 0.4.0
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob, Agent
argument-hint: "[aula=cirrose] [slide-number?]"
---

# Review Slides — Multi-Agent

Audite `$ARGUMENTS`.

## Step 0 — Deteccao de aula

Se argumento nao fornecido:
1. `git branch --show-current` → extrair slug da aula
2. Se `feat/{aula}-*` → usar `{aula}` (ex: `feat/cirrose-mvp` → `cirrose`)
3. Se `main` → exigir argumento explicito ("Qual aula? cirrose, metanalise, grade, osteoporose")
4. Se nao detectar → perguntar ao usuario

## Step 1 — Contexto da aula (parametrização)

Antes de lançar subagents:
1. Ler `aulas/{aula}/CLAUDE.md` → extrair: público-alvo, tema, fontes Tier 1, constraints específicos
2. Ler `aulas/{aula}/slides/_manifest.js` → extrair: lista de slides, narrativeRole, archetypes
3. Passar contexto para Agent B (Medical Data) e Agent D (Notes) como parâmetro

Isso permite que o review funcione para QUALQUER aula (cirrose, grade, osteoporose, metanalise) sem editar a skill.

## Arquitetura (inspirada em code-review-agents, Anthropic 2026)

### Phase 1 — Subagents paralelos (Explore, read-only)

Lançar 4 subagents simultaneamente, cada um com foco único:

**Agent A — Assertion-Evidence**
- `<h2>` é frase completa com claim verificável (não rótulo)?
- Corpo ≤ 30 palavras de texto?
- Zero `<ul>` ou `<ol>` no corpo do slide?
- Evidência visual presente (gráfico/tabela/diagrama/número-chave)?

**Agent B — Medical Data**
- Números têm fonte (trial/PMID)?
- Effect sizes com IC 95%?
- Guideline citada é versão vigente?
- Dados incertos marcados `<!-- DATA: VERIFY -->`?
- HR ≠ RR (não misturado)?

**Agent C — Design System**
- Cores usam tokens OKLCH (zero hardcoded)?
- Tipografia usa escala `--text-h1`, `--text-body`?
- Espaçamento usa `--space-*`?
- `.slide-inner` wrapper presente?
- Slides escuros usam `.slide-navy`?
- Background via `data-background-color` com HEX literal?
- Sem `display` inline no `<section>` (E07)?

**Agent D — Acessibilidade + Speaker Notes**
- Contraste ≥ 4.5:1 (texto sobre fundo)?
- Cor não é único canal de significado (ícone junto)?
- Font size efetivo ≥ 18px?
- `data-animate` funciona sem animação (graceful degradation)?
- `<aside class="notes">` presente com timing?
- Transição para próximo slide descrita?

### Phase 2 — Validation (por issue, paralelo)

Para cada issue flagado pelos agentes:
- Confirmar que o issue está genuinamente presente (não falso positivo)
- Avaliar severidade: FAIL (bloqueia apresentação) vs WARN (degradação) vs INFO
- Issues que não confirmam → descartar

### Phase 3 — Confidence scoring + output

Cada finding recebe score 0–100:
- **≥ 80** → reportar (threshold padrão)
- **< 80** → descartar como noise

**Critérios de alta confiança (80+):**
- `<ul>`/`<ol>` presente no corpo do slide → 100 (violação hard constraint)
- Título genérico sem claim → 90 (clara violação Alley model)
- Número sem PMID → 85 (violação E21)
- Cor hardcoded → 90 (violação token system)
- `<aside class="notes">` ausente → 95 (violação constraint #3)
- Contraste provavelmente baixo (cor muted sobre fundo muted) → 75 (WARN)

## Output

```
## Review: aulas/[lecture]/ — [N] slides auditados

### FAIL (bloqueia apresentação)
- [slide-file] L[N]: [descrição do issue] — confiança 95%
  Fix: [ação específica]

### WARN (degradação, corrigir antes do congresso)
- [slide-file] L[N]: [descrição] — confiança 82%

### Resumo
Slides: X/N PASS | Y WARN | Z FAIL
Top issues: [top 3 padrões recorrentes]
Prioridade: [o que corrigir primeiro]
```

## Regras do reviewer

- Reportar APENAS issues confirmados com confiança ≥ 80
- Citar linha exata (`L42`) e arquivo
- Fix deve ser acionável em < 2min
- NUNCA reportar preferências estéticas — apenas violações de constraints
