# HANDOFF — Osteoporose (atualizado 2026-02-27)

## Estado atual

| Item | Valor |
|------|-------|
| Slides | 70/70 (46 main + 25 appendix) |
| Arquivo de trabalho | `index.html` (gerado) — editar `slides/*.html` |
| Build | `npm run build:osteoporose` |
| Dev | `npm run dev:osteoporose` |

## Ordem (conforme _list.txt Aulas_core)

- **Main:** S01–S06, S12–S14, S14b, S17, S19, S22–S26, S28–S31, S32–S33, S35–S44, S45–S50, S99
- **Appendix:** S09–S11, S51–S72

## Arquivos

- `slides/01.html`–`70.html` — slides convertidos
- `slides/_manifest.js` — source of truth
- `osteoporose.css` — overrides
- `archetypes.css` — copiado de grade
- `scripts/build-html.ps1` — concatena

## Status

🧊 **FROZEN** — Migração completa (70/70). Fallback em Aulas_core.
Stack: Reveal.js (legacy). Sem desenvolvimento ativo neste repo.

## Migração

Script: `scripts/migrate-osteoporose-slides.js`
Fonte: `Aulas_core/OSTEOPOROSE/src/slides/` (S01_slide-01.html, etc.)
