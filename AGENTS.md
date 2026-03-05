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
aulas/[nome]/index.html   → Plano C default (light, 1280×720, GSAP ativo)
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
| aulas/grade/ | Sistema GRADE | 58/58 slides migrados (Aulas_core) |
| aulas/cirrose/ | Cirrose: manejo global (70 min) | 28/28 slides HTML, QA visual OK, speaker notes PT pendente |
| aulas/metanalise/ | Meta-análise (60 min) | Escopo definido, pesquisa a iniciar |

## Convenções

- Slides: `NN-slug.html` (ex: `00-title.html`, `08-a2-carvedilol.html`)
- Commits: `[AULA] batch N — desc`
- Plano A: dark, wide gamut. Plano B: light, sRGB fallback.
- Chrome ≥111 (OKLCH). Fallback HEX em `@supports not`.
- Tabelas Tufte: sem bordas verticais, números à direita.
