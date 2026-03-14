# CLAUDE.md — Cirrose Masterclass

> Contexto Cirrose. Hierarquia: CLAUDE.md (root) → **este arquivo** (cirrose-specific).

## Projeto

- **Título:** Cirrose Hepática — Classificar · Intervir · Reverter
- **Stack:** Reveal.js 5.x · GSAP 3.12 · Vanilla HTML/CSS/JS · OKLCH design tokens
- **Resolução:** 1280 × 720 (Plan C) · 1920 × 1080 (Plan A)
- **Offline-first:** Zero CDN. Todos assets locais.

## Arquivos de trabalho

| Arquivo | Papel |
|---------|-------|
| `slides/*.html` | **DEFAULT — editar estes** (44 arquivos, 1 por slide) |
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
5. **AUDIT-VISUAL.md** — Auditoria visual 33 slides × 8 dimensões

## Reference Hierarchy

| # | Arquivo | Autoridade |
|---|---------|-----------|
| 1 | `references/CASE.md` | Dados do paciente — NUNCA duplicar |
| 2 | `references/evidence-db.md` | Trials, PMIDs, NNTs |
| 3 | `references/narrative.md` | Arco narrativo, pacing |
| 4 | `slides/_manifest.js` | Ordem dos slides — NAO reordenar sem aprovacao |

Conflito: # menor vence. Notion e mirror, nao source of truth.

## Operational Records (append-only)

| Arquivo | Funcao | Atualizar quando |
|---------|--------|-----------------|
| `HANDOFF.md` | Pendencias ativas | Final de toda sessao |
| `CHANGELOG.md` | Historico de batches | Apos cada batch |
| `ERROR-LOG.md` | Erros → regras | Quando encontrar erro novo |
| `NOTES.md` | Decisoes entre agentes | Durante a sessao |

## WT State (atualizar a cada sessao)

- **Branch:** feat/cirrose-mvp
- **Ultimo merge main:** b771579 (2026-03-14)
- **Classe C pendente:** 0 arquivos em main
- **Infra sync:** OK — main absorvida (Classe A/B), 0 commits behind

## Worktree

- **Branch pattern:** `feat/cirrose-{feature}-mvp`
- **WT location:** `../wt-cirrose` (path real: `C:/Dev/Projetos/wt-cirrose`)
- **shared/ restrictions:** READ-ONLY. Se mudanca necessaria, registrar em NOTES.md e deferir para sessao em main.
- **Pre-merge checklist:**
  - [ ] `git diff --name-only main...HEAD | grep shared/` retorna vazio
  - [ ] `npm run build:cirrose` passa sem erros
  - [ ] `npm run lint:slides` passa
  - [ ] Speaker notes tem `[DATA]` tags para dados numericos
  - [ ] `git status` limpo (nada uncommitted)
- **Merge protocol:** No main: `git merge --no-ff feat/cirrose-{feature}-mvp`
- **Cleanup:** `bash .claude/scripts/worktree-cleanup.sh cirrose-{feature}`

## Manifest Sync Guardrail

`_manifest.js` é a camada que agentes e lints leem. HTML é a camada que humanos veem no browser. Drift entre os dois = split-brain de source of truth.

### Triggers de verificação

Qualquer uma destas mudanças exige checagem de `_manifest.js`:
- Edição de `<h2>` em qualquer slide HTML
- Mudança de `<section id="...">` (identidade do slide)
- Rename de arquivo de slide
- Reordenação lógica de slides

### Regras

1. **Drift da rodada** (slide tocado nesta rodada diverge do manifest) → **FAIL**. QA não pode ser declarado PASS.
2. **Drift herdado** (slide NÃO tocado nesta rodada, drift pré-existente) → **WARN** + follow-up obrigatório registrado em HANDOFF.md. Não fingir PASS limpo.
3. Antes de commit de aula, comparar `_manifest.js` headlines/IDs com os `<h2>`/`<section id>` dos slides tocados na rodada.
4. Drift da rodada detectado → corrigir ANTES de prosseguir. Não anotar para "depois".

### Referência

ERRO-024 (notas stale) e hardening 10/mar (headline drift) são precedentes reais.

## Regras inviolaveis

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
- Branch ativa: `feat/cirrose-mvp` (worktree isolada)
- Commits: prefixo semântico (`fix:`, `feat:`, `refactor:`, `docs:`)

## Worktree

- **Path:** `C:\Dev\Projetos\wt-cirrose`
- **Branch:** `feat/cirrose-mvp`
- **Upstream:** `origin/feat/cirrose-mvp`
- **Escopo:** APENAS `aulas/cirrose/` e seus sub-diretórios
- **Proibido:** `shared/`, `docs/` raiz, `CLAUDE.md` raiz, qualquer outra `aulas/*/`
- **Exceção documental:** somente por autorização explícita do usuário, restrita a `CLAUDE.md` raiz, `docs/SYNC-NOTION-REPO.md`, `.claude/agents/*.md`

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
| FASE 1 | ✅ | 33 slides em `slides/`, template, build script |
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
