# AGENTS.md — Aulas Magnas

Slides médicos elite para congressos internacionais.
Público: hepatologistas e gastroenterologistas seniores.

## Stack

Reveal.js 5.x · GSAP 3.12 · Vite 6.x · HTML/CSS/JS puro · OKLCH
Zero CDN. npm/ESM. Fontes WOFF2 self-hosted. Offline-first.

## Regras invioláveis

1. **Assertion-Evidence.** `<h2>` = afirmação clínica verificável. Corpo = evidência visual. NUNCA rótulo genérico.
2. **PROIBIDO `<ul>`/`<ol>` em slides.** Listas só em `<aside class="notes">` e apêndice.
3. **Todo `<section>` TEM `<aside class="notes">`** com timing, pausas e fontes.
4. **NUNCA inventar dados.** Sem fonte Tier 1 → marcar `[TBD]`.
5. **var() obrigatório.** NUNCA cor literal em CSS. Exceção: `data-background-color` (HEX para Reveal).
6. **Cor clínica ≠ UI.** `--safe/--warning/--danger` = clínico. `--ui-accent` = chrome/decoração.
7. **Daltonismo:** ícone obrigatório junto a cor semântica (✓/⚠/✕).
8. **data-animate declarativo.** Tipos: countUp|stagger|drawPath|fadeUp|highlight. NUNCA gsap inline.
9. **Zero CDN. Offline = servidor local** (npm run preview). NÃO file://.
10. **NUNCA reescrever shared/ ou index.html inteiro** sem aprovação.

## Estrutura

```
shared/css/base.css       → design system (OKLCH tokens, tipografia, modos)
shared/js/engine.js       → init Reveal + data-animate + modes
shared/assets/fonts/      → WOFF2 self-hosted
aulas/[nome]/index.html   → Plano A (dark, 1920×1080)
aulas/[nome]/index.stage-b.html → Plano B (light, 1280×720, sem animação)
docs/                     → narrativa, storyboard, referências (CSL-JSON)
scripts/                  → lint, export, QA
```

## Comandos

```bash
npm run dev          # Vite hot reload
npm run build        # Produção
npm run preview      # Servir localmente (palco)
npm run lint:slides  # Assertion-evidence linter
```

## Projetos

| Pasta | Tema | Status |
|-------|------|--------|
| aulas/grade/ | Sistema GRADE | Framework pronto, conteúdo parcial |
| aulas/cirrose/ | Cirrose: manejo global (60 min) | Pesquisa completa, slides a criar |
| aulas/metanalise/ | Meta-análise (60 min) | Escopo definido, pesquisa a iniciar |

## Convenções

- Slides: `S{NNN}_{kebab}.html`
- Commits: `[AULA] batch N — desc`
- Plano A: dark, wide gamut. Plano B: light, sRGB fallback.
- Chrome ≥111 (OKLCH). Fallback HEX em `@supports not`.
- Tabelas Tufte: sem bordas verticais, números à direita.
