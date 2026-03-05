# CLAUDE.md — Cirrose Masterclass

> Contexto Cirrose. Hierarquia: AGENTS.md → CLAUDE.md (root) → **este arquivo** (cirrose-specific).

## Projeto

- **Título:** Cirrose Hepática — Classificar · Intervir · Reverter
- **Stack:** Reveal.js 5.x · GSAP 3.12 · Vanilla HTML/CSS/JS · OKLCH design tokens
- **Resolução:** 1280 × 720 (Plan C) · 1920 × 1080 (Plan A)
- **Offline-first:** Zero CDN. Todos assets locais.

## Arquivos de trabalho

| Arquivo | Papel |
|---------|-------|
| `slides/*.html` | **DEFAULT — editar estes** (28 arquivos, 1 por slide) |
| `slides/_manifest.js` | Source of truth: ordem, archetypes, panelStates |
| `slide-registry.js` | Wiring centralizado (custom anims, panel, click-reveal, meld) |
| `index.template.html` | Template com `%%SLIDES%%` placeholder |
| `index.html` | **Gerado** — `npm run build:cirrose` ou `.\scripts\build-html.ps1` |
| `cirrose.css` | Estilos específicos desta aula |
| `archetypes.css` | Layout archetypes |

### Shared (não alterar sem autorização)

| Arquivo | Papel |
|---------|-------|
| `../../shared/css/base.css` | Design system tokens |
| `../../shared/js/engine.js` | GSAP dispatcher + Reveal init |
| `../../shared/js/case-panel.js` | Case panel lateral |
| `../../shared/js/click-reveal.js` | Progressive disclosure por ArrowRight |
| `../../shared/js/interactions/meld-calc.js` | Calculadora MELD-Na interativa |

### Fluxo de edição

1. Editar `slides/NN-nome.html`
2. `npm run build:cirrose` (gera `index.html` a partir de `_manifest.js` + template)
3. `npm run dev` → abrir `/aulas/cirrose/index.html`

## Documentação (ordem de leitura)

1. **CLAUDE.md** ← você está aqui (regras)
2. **HANDOFF.md** — Pendências projeto · **HANDOFF-CLAUDE-AI.md** — Claude.ai (paths)
3. **CHANGELOG.md** — Histórico de batches (read-only, append-only)
4. **ERROR-LOG.md** — Erros por sessão → regras (atualizar a cada sessão)
5. **AUDIT-VISUAL.md** — Auditoria visual 28 slides × 8 dimensões

## Regras invioláveis

### Dados clínicos
- NUNCA inventar, arredondar ou modificar dados clínicos (HR, NNT, p-values, doses, PMIDs)
- Se dado ausente → `[TBD]`

### CSS
- NUNCA usar `!important` salvo os 4 pré-existentes documentados
- NUNCA aplicar `display: grid` ou `display: flex` no `.reveal` ou `.slides` root
- Usar `min()` em todo `max-width` de container para respeitar case panel
- Design tokens: `base.css` → `archetypes.css` → `cirrose.css` (cascata)

### Reveal.js
- NUNCA lutar contra o scaling math interno do Reveal
- Usar position absolute + overlays para side panels
- Reordenação de slides: alterar `_manifest.js` e rodar `npm run build:cirrose`

### GSAP
- Toda animação GSAP DEVE ter CSS fallback (classe `.no-js` → `opacity: 1 !important`)
- `data-animate` é o hook padrão. Custom: adicionar em `slide-registry.js` → `customAnimations`

### Speaker Notes
- NUNCA deletar `<aside class="notes">`. Apenas append de staging cues permitido.

### Git
- Branch ativa: `refactor/floating-panel` (pendente merge → `main`)
- Commits: prefixo semântico (`fix:`, `feat:`, `refactor:`, `docs:`)

## Context window hygiene

Não carregue MDs inteiros. Use grep seletivo:

```bash
# Dados clínicos de 1 slide:
grep -A2 "s-a2-03" references/evidence-db.md

# Skeleton de 1 archetype:
sed -n '/## 2\. `archetype-metrics`/,/^## /p' references/archetypes.md

# Tensão narrativa de 1 ato:
sed -n '/### ATO 2/,/^### /p' references/narrative.md

# Scoring de 1 slide:
sed -n '/### Slide 11: s-a2-03/,/^---$/p' AUDIT-VISUAL.md
```

## Refatoração arquitetural (2026-02-27)

| Fase | Status | Entregável |
|------|--------|------------|
| FASE 0 | ✅ | `_manifest.js` (source of truth) |
| FASE 1 | ✅ | 28 slides em `slides/`, template, build script |
| FASE 2 | ✅ | cirrose.css consolidado |
| FASE 3 | ✅ | `slide-registry.js` (wiring centralizado) |
| FASE 4 | ✅ | MDs atualizados, ciclo de melhoria |
| FASE 5 | ⏳ | Refatoração visual slide a slide |

## Stages planejados

| Stage | Foco | Status |
|-------|------|--------|
| A | Estabilidade + fill ratio + hero typography | ✅ Concluído (P0-P2) |
| B | Redesign sistêmico: archetypes + hero metrics + modularização HTML | ✅ Modularização concluída (FASE 0-4) |
| C | Polish: animações, decision-tree.js, timeline.js, speaker notes PT | 🔲 Próximo |
