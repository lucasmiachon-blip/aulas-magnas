# CLAUDE.md — Aulas Magnas (repo)

> Contexto para Claude Code (terminal). Atualizado 24/fev/2026.
> Para Claude.ai (web): CLAUDE-ai-v2.md no Project Knowledge.

---

## Projeto

Slides médicos — Reveal.js + GSAP, assertion-evidence, offline-first.
Público: gastroenterologistas gerais (Brasil). Conteúdo PT, termos técnicos EN.

## Repo

- **Branch:** main
- **Plan C = default** (light, 1280×720, GSAP) → `index.stage-c.html`
- **Design System:** `shared/css/base.css` (OKLCH) + `shared/js/engine.js`

## 🔄 HANDOFF LOOP (INVIOLÁVEL)

**Ao final de toda sessão, atualizar `aulas/{aula}/HANDOFF.md` com:**
1. Batch executado, commit hash, data
2. Sections implementadas (lista ordenada)
3. registerCustom map (index → animação)
4. Pendências
5. `git add HANDOFF.md` no commit

**Claude.ai lê este arquivo para saber o que você fez.** Sem ele, specs futuras ficam erradas.

## Cirrose — Ordem Definitiva v3

| Pos | Section ID | Slide |
|-----|-----------|-------|
| 1 | s-title | TITLE |
| 2 | s-a1-01 | A1-01 |
| 3 | s-a1-02 | A1-02 |
| 4 | s-hook | HOOK |
| 5 | s-a1-03 | A1-03 |
| 6 | s-a1-04 | A1-04 |
| 7 | s-a1-05 | A1-05 |
| 8 | s-cp1 | CP1 |
| 9-14 | s-a2-01..06 | A2-01→A2-06 |
| 15 | s-cp2 | CP2 |
| 16-18 | s-a3-01..03 | A3-01→A3-03 |
| 19 | s-cp3 | CP3 |
| 20 | s-close | CLOSE |
| 21-28 | s-app-01..08 | APP-01→08 |

**Implementadas:** pos 1-28 (todas — 20 core + 8 APP). QA visual 24/fev OK. **NÃO reordenar sem instrução do Claude.ai.**

## Hard Constraints

1. Headline = assertion clínica. NUNCA rótulo.
2. ZERO bullet points em slides.
3. Speaker notes em português.
4. NUNCA inventar dados.
5. Corpo ≤ 30 palavras.
6. Não mexer em base.css / engine.js sem autorização.

## Engine.js

`countUp`, `stagger`, `drawPath`, `fadeUp`, `highlight`

## Tokens (base.css)

```
--bg-surface: oklch(95% 0.005 258)
--cmp-1: oklch(45% 0.15 258)
--safe/--warning/--danger
--font-display: Instrument Serif
--font-body: DM Sans
--font-mono: JetBrains Mono
```
