# Agent: Slide Refactor

> SOP determinístico para refatorar 1 slide da masterclass Cirrose.
> Qualquer coding agent (Claude Code, Cursor, Copilot) deve seguir este protocolo.

## Pré-condições

1. Ler `CLAUDE.md` (regras invioláveis — ~70 linhas, ler inteiro)
2. Grep archetype target: `sed -n '/## N\. .archetype-{type}/,/^## /p' references/archetypes.md`
3. Grep narrative context: `sed -n '/### ATO {N}/,/^### /p' references/narrative.md`
4. Grep dados clínicos: `grep -A2 "s-{id}" references/evidence-db.md`
5. Grep scoring atual: `sed -n '/### Slide.*s-{id}/,/^---$/p' AUDIT-VISUAL.md`
6. Pós-refactor: validar com `agents/qa-checklist.md` § assertions do slide

## Input esperado

```
Slide: s-{id}
Target archetype: {figure|metrics|checkpoint|comparison|table|flow|pillars|interactive|title|recap}
Specific fixes: {lista de I-codes do AUDIT-VISUAL ou instrução livre}
```

## Protocolo de execução

### Step 1 — Localizar o arquivo

- Abrir `slides/{NN}-{nome}.html` (consultar `slides/_manifest.js` para o filename)
- Mapear: headline (`<h2>`), body content, `data-animate`, `data-reveal`, `<aside class="notes">`

### Step 2 — Preservar (NUNCA tocar)

- [ ] `<aside class="notes">` — conteúdo intacto (pode append staging cues)
- [ ] `id="s-{id}"` — não renomear
- [ ] `data-transition` se existente
- [ ] Dados clínicos (HR, NNT, p-values, doses) — verificar contra `evidence-db.md`
- [ ] `source-tag` existente

### Step 3 — Refatorar HTML

- Aplicar archetype wrapper: `<div class="slide-inner archetype-{type}">`
- Headline `<h2>` deve ser assertion clínica (não rótulo genérico)
- Body: zero bullets, usar componentes do archetype
- Adicionar `data-animate="fadeUp"` nos containers que devem animar (não em cada elemento)
- Se click-reveal: manter `data-reveal="1"`, `data-reveal="2"` etc.
- Se source-tag ausente e há dado citável: `<cite class="source-tag">{referência}</cite>`

### Step 4 — CSS (cascata correta)

Ordem de checagem:
1. `base.css` — tokens existem? (`--text-h2`, `--safe`, `--danger`, etc.)
2. `archetypes.css` — archetype class já define o layout?
3. `cirrose.css` — precisa override específico para este slide?

Regras:
- Usar `min(Npx, 100%)` em todo `max-width`
- Zero `!important`
- Se container flex/grid: `max-width: min(Npx, calc(100% - var(--panel-width, 0px) - var(--slide-pad-h, 48px) * 2))`
- Hero metric: `font-size: var(--text-hero, clamp(2.5rem, 5vw, 4rem))`

### Step 5 — Verificar wiring JS

- Se slide precisa animação custom: adicionar em `slide-registry.js` → `customAnimations`
- Se slide tem `click-reveal`: `data-reveal` é auto-discovered (sem config manual)
- Se slide tem CasePanel state: verificar `slides/_manifest.js` → `panelStates`
- Se nada disso: `data-animate` é suficiente (auto-dispatch pelo engine)

### Step 6 — QA local

Checklist mínimo:
- [ ] Slide renderiza sem `opacity: 0` stuck (fallback `.no-js` funciona?)
- [ ] Headline legível (max 2 linhas, assertion)
- [ ] Fill ratio ≥ 60% (sem >40% espaço vazio)
- [ ] Nenhum conteúdo clipado pelo case panel (se panel ativo neste slide)
- [ ] Source-tag presente se há dado citável
- [ ] `<aside class="notes">` intacto
- [ ] Console: zero erros

## Archetypes disponíveis

| Archetype | Uso | Componentes |
|-----------|-----|-------------|
| `archetype-figure` | Slide com figura/imagem principal | `.slide-figure` + `.evidence-card` (optional) |
| `archetype-metrics` | 2-4 metric cards horizontais | `.metric-row` > `.metric-card` (`.metric-value` + `.metric-label`) |
| `archetype-checkpoint` | Case-based question slide | `.checkpoint-header` + `.decision-options` |
| `archetype-interactive` | Calculadora ou widget | Container livre |
| `archetype-comparison` | 2 painéis lado a lado | `.compare-grid` > `.compare-panel` × 2 |
| `archetype-table` | Tabela Tufte | `.tufte-table` |
| `archetype-flow` | Fluxo horizontal com setas | `.flow-steps` > `.flow-step` |
| `archetype-pillars` | 3 itens verticais paralelos | `.pillar-grid` > `.pillar` × 3 |

## Output esperado

1. HTML modificado em `slides/{NN}-{nome}.html` (section completa)
2. CSS adicionado em `cirrose.css` (se necessário)
3. Wiring JS em `slide-registry.js` (se animação custom necessária)
4. Rodar `npm run build:cirrose` para regenerar `index.html`
5. Score estimado pós-fix (target ≥ 4.0)
