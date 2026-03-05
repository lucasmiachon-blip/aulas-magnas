# CURSOR.md — Aulas Magnas

> Regras para Cursor e Claude Code ao trabalhar neste repositório.
> **Última atualização:** 24/fev/2026

---

## 🔄 REGRA #1: HANDOFF.md (INVIOLÁVEL)

**Ao final de TODA sessão que modifique arquivos, você DEVE atualizar `aulas/{aula}/HANDOFF.md`.**

Sem exceções. Sem "faço depois". Sem "não mudou nada relevante".
Se tocou em HTML, CSS, JS, ou assets → atualiza HANDOFF.md → inclui no commit.

### Por quê?
Claude.ai usa `HANDOFF-CLAUDE-AI.md` (paths + pendências). Projeto usa `HANDOFF.md` (só pendências). Se não atualizar, ele vai produzir specs baseadas em estado errado e o ciclo diverge.

### Formato obrigatório:

```markdown
# HANDOFF — {Aula} (atualizado {YYYY-MM-DD})

## Último batch executado
- **Batch:** {nome descritivo}
- **Commit:** {hash curto}
- **Data:** {YYYY-MM-DD}
- **Agente:** Cursor / Claude Code

## Estado do HTML ({arquivo})
- **Total sections:** {N}
- **Ordem:** {lista ordenada de section IDs}
- **registerCustom map:**
  - index 0 → {animação} ({slide ID})
  - index 1 → {animação} ({slide ID})
  - ...

## Assets referenciados
- {lista de arquivos em assets/}

## O que foi feito
- {item 1}

## O que NÃO foi feito (pendências)
- {item 1}

## Próximo batch esperado
- {descrição do que Claude.ai vai enviar}
```

---

## 📐 Design System

### Tri-Mode
| Arquivo | Mode | Theme | Resolução | Animação |
|---------|------|-------|-----------|----------|
| index.html | Plan C (default) | Light | 1280×720 | GSAP |

**index.html** = build de `slides/*` + template. Plan C default. PORT 3000.

### Tokens (base.css)
```
--bg-surface: oklch(95% 0.005 258)
--bg-elevated: oklch(98% 0.003 258)
--text-primary: oklch(25% 0.005 258)
--text-secondary: oklch(45% 0.01 258)
--cmp-1: oklch(45% 0.15 258)        /* blue */
--cmp-2: oklch(60% 0.15 45)         /* orange */
--safe: oklch(55% 0.15 145)
--warning: oklch(65% 0.15 85)
--danger: oklch(55% 0.2 25)
--font-display: 'Instrument Serif', serif
--font-body: 'DM Sans', sans-serif
--font-mono: 'JetBrains Mono', monospace
```

### Engine.js — Animações
```
countUp(el, target, { decimals, duration, suffix })
stagger → data-stagger attribute
drawPath → SVG path
fadeUp → opacity+y
highlight → data-highlight-row (tables)
```

---

## 🚫 Hard Constraints

1. **Headline = assertion clínica.** NUNCA "Slide sobre X".
2. **ZERO bullet points** em slides.
3. **Speaker notes em português.**
4. **NUNCA inventar dados.** `[TBD]` se faltar.
5. **Corpo ≤ 30 palavras.**
6. **Plan C = default** (light, 1280×720, GSAP).
7. **Não mexer em shared/css/base.css ou shared/js/engine.js** sem autorização explícita.
8. **Não criar novos arquivos fora da pasta da aula** sem autorização.

---

## 📋 Cirrose — Ordem Definitiva v3 (24/fev/2026)

**NÃO reordenar sections sem instrução explícita do Claude.ai.**

| Pos | Section ID | Slide ID |
|-----|-----------|----------|
| 1 | s-title | CIRR-TITLE |
| 2 | s-a1-01 | CIRR-A1-01 |
| 3 | s-a1-02 | CIRR-A1-02 |
| 4 | s-hook | CIRR-HOOK |
| 5 | s-a1-03 | CIRR-A1-03 |
| 6 | s-a1-04 | CIRR-A1-04 |
| 7 | s-a1-05 | CIRR-A1-05 |
| 8 | s-cp1 | CIRR-CP1 |
| 9 | s-a2-01 | CIRR-A2-01 |
| 10 | s-a2-02 | CIRR-A2-02 |
| 11 | s-a2-03 | CIRR-A2-03 |
| 12 | s-a2-04 | CIRR-A2-04 |
| 13 | s-a2-05 | CIRR-A2-05 |
| 14 | s-a2-06 | CIRR-A2-06 |
| 15 | s-cp2 | CIRR-CP2 |
| 16 | s-a3-01 | CIRR-A3-01 |
| 17 | s-a3-02 | CIRR-A3-02 |
| 18 | s-a3-03 | CIRR-A3-03 |
| 19 | s-cp3 | CIRR-CP3 |
| 20 | s-close | CIRR-CLOSE |
| 21-28 | s-app-01..08 | CIRR-APP-01..08 |

**Implementadas (25/fev):** pos 1-28 (todas — 20 core + 8 APP). QA visual 24/fev: 28/28 OK.

---

## 📂 Estrutura por aula

```
aulas/{slug}/
  index.html            # Build: slides/* + template (Plan C default)
  slides/               # 1 HTML por slide
  {slug}.css            # CSS específico
  CLAUDE.md             # Contexto para Claude Code
  HANDOFF.md            # ← ATUALIZAR SEMPRE
  assets/
```

---

## Step 0 (início de toda sessão)

```bash
git log --oneline -5
git status
grep -c '<section' aulas/cirrose/index.html
cat aulas/cirrose/HANDOFF.md
```

Se algo não bater com o prompt recebido → **PARAR e perguntar.**
