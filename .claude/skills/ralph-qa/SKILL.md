---
name: ralph-qa
description: QA em dois loops encadeados por batch de 3 slides. Loop 1 (Sonnet): lint+constraints até PASS. Loop 2 (Gemini 3.1): visual audit até PASS. Ativar quando usuário pedir "qa loop", "rodar qa até passar", "fix all lint", "qa autônomo", "qa batch".
version: 3.0.0
context: fork
agent: general-purpose
allowed-tools: Read, Edit, Bash, Grep, Glob, Agent
argument-hint: "[lecture?] [batch-size=3] [max-iterations=10]"
---

# Ralph-QA v3 — Dois Loops Encadeados por Batch

Loop de QA para `$ARGUMENTS` (default: `aulas/cirrose/`).
Batch: 3 slides. Max iterações por loop: 10.

## Arquitetura

```
Para cada batch de 3 slides:
────────────────────────────────────────────────────

  ┌─────────────────────────────────────┐
  │  LOOP 1 — Sonnet (Claude Code)      │◄──┐
  │                                     │   │
  │  1. npm run lint:slides (3 slides)  │   │
  │  2. Constraint check (subagent)     │   │
  │     - <h2> asserção?                │   │
  │     - Zero <ul>/<ol>?               │   │
  │     - <aside class="notes">?        │   │
  │     - Sem display inline? (E07)     │   │
  │     - Cores via var()?              │   │
  │     - Dados com fonte/[TBD]?        │   │
  │  3. Fix cirúrgico se issues         │   │
  └────────────────┬────────────────────┘   │
                   │ PASS                    │ issues encontrados
                   ▼                         │
  ┌─────────────────────────────────────┐   │
  │  LOOP 2 — Gemini 3.1 Pro            │───┘
  │                                     │
  │  1. Screenshots dos 3 slides        │
  │  2. Gemini audit visual:            │
  │     - Hierarquia / hero element     │
  │     - Legibilidade (projetor)       │
  │     - Daltonismo (protanopia)       │
  │     - Density (≤30 palavras)        │
  │     - Confidence ≥80 por issue      │
  │  3. Gemini retorna PASS/WARN/FAIL   │
  │  4. Se FAIL/WARN ≥80:               │
  │     → Sonnet corrige                │
  │     → Gemini re-audita              │
  └────────────────┬────────────────────┘
                   │ PASS
                   ▼
          git commit batch N
          próximo batch →
```

## Loop 1 — Sonnet (lint + constraints)

```
WHILE issues > 0 AND iteration < 10:
  lint = npm run lint:slides -- [slide-a] [slide-b] [slide-c]
  constraints = subagent.check([slide-a, slide-b, slide-c])
  IF lint.fails == 0 AND constraints.issues == 0:
    BREAK → Loop 2
  ELSE:
    fix_all(lint.fails + constraints.issues)  # cirúrgico
    iteration++

IF iteration == 10: PARAR + reportar (root cause além do scope)
```

**Constraint check via subagent Explore** (paralelo, 1 por slide):
- `<h2>` é asserção clínica completa (não rótulo)?
- Zero `<ul>`/`<ol>` no corpo do slide?
- `<aside class="notes">` presente com timing?
- `<section>` sem `style="display:..."` (E07)?
- Cores via `var()` sem hardcode?
- Dados numéricos têm fonte ou `[TBD]`?

## Loop 2 — Gemini 3.1 Pro (visual audit)

```
WHILE gemini.verdict != PASS AND iteration < 10:
  screenshots = playwright.capture([slide-a, slide-b, slide-c])
  verdict = gemini.audit(screenshots, prompt_contextual)
  IF verdict == PASS:
    BREAK → commit batch
  ELSE:
    issues = verdict.filter(confidence >= 80)
    sonnet.fix(issues)  # cirúrgico
    iteration++

IF iteration == 10: PARAR + reportar para humano
```

**Prompt para Gemini 3.1 Pro:**
```
Masterclass médica — hepatologistas seniores, Brasil. Cirrose Hepática.
Reveal.js Plan C: fundo claro, 1280×720, GSAP ativo.

Para cada slide (batch de 3), avaliar:

1. HIERARQUIA VISUAL
   - Dado mais importante é visualmente dominante?
   - Hero element ≥2x maior que corpo?
   - Ordem de leitura natural (F-pattern)?

2. LEGIBILIDADE (projetor 1280×720, sala com luz ambiente)
   - Texto legível a 5m sem esforço?
   - Contraste texto/fundo adequado?
   - Font size adequado para congresso?

3. DALTONISMO — simule protanopia
   - Cor é único canal de informação clínica?
   - Ícones ✓/⚠/✕ presentes junto a safe/warning/danger?

4. DENSIDADE
   - Corpo ≤30 palavras de texto?
   - Slide congestionado?

Retornar por slide:
  PASS | WARN | FAIL
  Confiança: 0-100
  Se WARN/FAIL: issue exato + fix em 1 linha

Threshold: reportar apenas confiança ≥80.
```

## Segurança

- Max 10 iterações **por loop por batch** (não global)
- Mudança > 30% de um slide → PARAR + reportar (não cirúrgico)
- **NUNCA** deletar `<aside class="notes">` — append only
- **NUNCA** modificar dados clínicos — marcar `[TBD]` + reportar
- Gemini WARN < 80 → ignorar (noise)
- Mesmo issue persiste 3x no Loop 2 → PARAR + reportar (Gemini pode estar errado)

## Output por batch

```
## Batch N — slides [X..Y]

Loop 1 (Sonnet): [K] iterações — [N] fixes
Loop 2 (Gemini): [K] iterações — [N] fixes visuais

Status: PASS ✓
git: commitado
```

## Output final

```
## QA-DONE — aulas/cirrose/ — [N] batches · 28 slides

Batch 1 (00-02): Loop1 2x · Loop2 1x — OK
Batch 2 (03-05): Loop1 1x · Loop2 2x — OK
...

Sonnet fixes total: [N]
Gemini fixes total: [N]
Gemini noise (<80) descartado: [N]

QA-DONE
```

## Stop Hook (modo 100% autônomo)

```json
// .claude/settings.json
{
  "hooks": {
    "Stop": [{
      "matcher": "",
      "hooks": [{"type": "command", "command": "~/.claude/hooks/ralph-qa-hook.sh"}]
    }]
  }
}
```

```bash
#!/bin/bash
# ~/.claude/hooks/ralph-qa-hook.sh
if ! grep -q "QA-DONE" "$CLAUDE_OUTPUT_FILE" 2>/dev/null; then
  exit 2  # bloqueia saída → re-injeta
fi
exit 0
```
