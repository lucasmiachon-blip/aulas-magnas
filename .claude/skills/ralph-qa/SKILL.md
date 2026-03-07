---
name: ralph-qa
description: QA em dois loops separados por batch de 3 slides. Loop 1 (Opus 4.6): lint+constraints até PASS. Loop 2 (Gemini 3.1 Pro): visual audit até PASS. Ativar quando usuário pedir "qa loop", "rodar qa até passar", "fix all lint", "qa autônomo", "qa batch".
version: 4.0.0
context: fork
agent: general-purpose
allowed-tools: Read, Edit, Bash, Grep, Glob, Agent
argument-hint: "[lecture?] [batch-size=3] [max-iterations=10]"
---

# Ralph-QA v4 — Opus Loop + Gemini Loop (separados)

Loop de QA para `$ARGUMENTS` (default: `aulas/cirrose/`).
Batch: 3 slides. Max iterações por loop: 10.

## Arquitetura

```
Para cada batch de 3 slides:
─────────────────────────────────────────────────────────

  ┌──────────────────────────────────────────────────┐
  │  LOOP 1 — Opus 4.6                               │
  │  Roda sozinho até PASS, independente do Gemini   │
  │                                                  │
  │  → npm run lint:slides (3 slides)                │
  │  → Subagent Explore: constraint check por slide  │
  │       <h2> asserção? Zero <ul>/<ol>?             │
  │       <aside notes>? E07? var()? fonte/[TBD]?    │
  │  → Fix cirúrgico se issues                       │
  │  → Repeat até 0 issues                           │
  │                                                  │
  │  Completion: "OPUS-PASS"                         │
  └──────────────────┬───────────────────────────────┘
                     │ OPUS-PASS
                     ▼
  ┌──────────────────────────────────────────────────┐
  │  LOOP 2 — Gemini 3.1 Pro                         │
  │  Roda sozinho até PASS, independente do Opus     │
  │                                                  │
  │  → Screenshots dos 3 slides (Playwright)         │
  │  → Gemini audit visual (prompt abaixo)           │
  │  → Filtra issues com confidence ≥ 80             │
  │  → Opus corrige os issues filtrados              │
  │  → Gemini re-audita                              │
  │  → Repeat até Gemini retornar PASS               │
  │                                                  │
  │  Completion: "GEMINI-PASS"                       │
  └──────────────────┬───────────────────────────────┘
                     │ GEMINI-PASS
                     ▼
             git commit batch N
             próximo batch →
```

## Loop 1 — Opus 4.6

**Agente:** `claude-opus-4-6` (subagent com `model: opus` no frontmatter)
**Responsabilidade:** código, constraints, semântica

```
WHILE issues > 0 AND iteration < 10:
  run: npm run lint:slides -- [slide-a] [slide-b] [slide-c]
  check constraints via subagent Explore (paralelo por slide):
    - <h2> asserção clínica completa?
    - Zero <ul>/<ol> no corpo?
    - <aside class="notes"> com timing?
    - <section> sem display inline? (E07)
    - Cores via var() — zero hardcode?
    - Números com fonte verificada ou [TBD]?
  IF lint.fails == 0 AND constraints.issues == 0:
    output "OPUS-PASS" → exit loop
  ELSE:
    fix_all() — cirúrgico, não reescrever
    iteration++

IF iteration == 10:
  output "OPUS-BLOCKED: [issue persistente]" → PARAR
```

## Loop 2 — Gemini 3.1 Pro

**Agente:** Gemini 3.1 Pro via Agent tool (subagent_type=qa-engineer ou general-purpose)
**Responsabilidade:** visual, layout, percepção, acessibilidade
**Protocolo:** Gemini retorna **especificação estruturada** → Opus lê o arquivo e executa o fix

```
WHILE gemini.verdict != PASS AND iteration < 10:
  screenshots = playwright.capture([slide-a, slide-b, slide-c])
  specs = gemini.audit(screenshots, prompt_contextual)
  issues = specs.filter(confidence >= 80)
  IF issues.length == 0:
    output "GEMINI-PASS" → exit loop
  ELSE:
    FOR each issue IN issues:
      opus.read(issue.slide)           # lê o arquivo
      opus.grep(issue.line_hint)       # localiza o ponto exato
      opus.edit(issue.fix)             # aplica cirurgicamente
    iteration++

IF iteration == 10:
  output "GEMINI-BLOCKED: [issue persistente]" → PARAR
```

### Por que especificação estruturada (não old_string/new_string)

Gemini é excelente em percepção visual mas pode errar strings HTML exatas
(whitespace, ordem de atributos, indentação). `old_string` errado → Edit falha silenciosamente.

Solução: Gemini especifica **o quê** e **onde**, Opus executa o **como**:

```json
// Output esperado do Gemini por issue
{
  "slide": "08-a2-01.html",
  "line_hint": 23,
  "confidence": 91,
  "issue": "hero-number usa color: #cc4a3a hardcoded",
  "fix": "substituir color: #cc4a3a por color: var(--danger)"
}
```

Opus recebe isso, faz `Grep` no arquivo com `line_hint` como anchor, localiza a string exata
e executa `Edit`. Zero ambiguidade, zero string mismatch.

**Prompt para Gemini 3.1 Pro:**
```
Masterclass médica — hepatologistas seniores, Brasil. Cirrose Hepática.
Reveal.js Plan C: fundo claro, 1280×720, GSAP ativo.
Design system: Instrument Serif (títulos) · DM Sans (corpo) · OKLCH tokens.
Semântica: safe=teal+✓, warning=amber+⚠, danger=red+✕.

Para cada slide do batch (3 slides), avaliar:

1. HIERARQUIA VISUAL
   - Dado mais importante visualmente dominante?
   - Hero element ≥2x maior que corpo?
   - Ordem de leitura segue F-pattern natural?

2. LEGIBILIDADE (projetor, sala com luz ambiente, 5m de distância)
   - Texto visível sem esforço?
   - Contraste texto/fundo adequado?

3. DALTONISMO — simular protanopia
   - Informação clínica depende só de cor?
   - Ícones ✓/⚠/✕ presentes com as cores semânticas?

4. DENSIDADE
   - Corpo ≤30 palavras?
   - Slide congestionado?

Para cada issue encontrado, retornar JSON:
{
  "slide": "[nome do arquivo]",
  "line_hint": [número aproximado da linha no HTML],
  "confidence": [0-100],
  "issue": "[descrição exata do problema visual]",
  "fix": "[instrução de 1 linha: o que substituir por quê]"
}

Reportar APENAS issues com confidence ≥ 80.
Se nenhum issue ≥ 80: retornar {"verdict": "PASS"}.
NÃO retornar HTML corrigido — apenas a especificação do fix.
```

## Separação dos loops — por que importa

| | Loop 1 (Opus) | Loop 2 (Gemini) |
|---|---|---|
| Domínio | Código, semântica, constraints | Visual, percepção, acessibilidade |
| Input | HTML source | Screenshots renderizados |
| Critério | 0 FAILs no lint + constraints | Gemini retorna PASS (confidence ≥80) |
| Fix feito por | Opus | Opus (guiado por Gemini) |
| Independência | Não depende do Gemini | Não roda antes do Opus PASS |

## Segurança

- Max 10 iterações **por loop** (não compartilhado)
- Fix > 30% do slide → PARAR + reportar (não cirúrgico)
- **NUNCA** deletar `<aside class="notes">` — append only
- **NUNCA** modificar dados clínicos — marcar `[TBD]` + reportar
- Gemini issue < 80 confiança → ignorar
- Mesmo issue persiste 3x no Loop 2 → PARAR (Gemini pode estar incorreto)

## Output por batch

```
## Batch N — slides [X..Y]

Loop 1 (Opus):   [K] iterações · [N] fixes · OPUS-PASS ✓
Loop 2 (Gemini): [K] iterações · [N] fixes · GEMINI-PASS ✓

git: commitado
```

## Output final

```
## QA-DONE — aulas/cirrose/ — [N] batches · 28 slides

Batch 1 (00-02): Opus 2x · Gemini 1x ✓
Batch 2 (03-05): Opus 1x · Gemini 2x ✓
...

Opus fixes total:   [N]
Gemini fixes total: [N]
Gemini noise (<80): [N] descartados

QA-DONE
```

## Stop Hook (modo autônomo)

```bash
#!/bin/bash
# ~/.claude/hooks/ralph-qa-hook.sh
if ! grep -q "QA-DONE" "$CLAUDE_OUTPUT_FILE" 2>/dev/null; then
  exit 2  # bloqueia saída → re-injeta prompt
fi
exit 0
```
