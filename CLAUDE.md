# CLAUDE.md — Aulas Magnas

> Fonte de verdade operacional. Cada linha aqui existe porque removê-la causaria erros.
> Detalhes por domínio: @.claude/rules/*.md · Docs: @docs/README.md

## Commands

```bash
npm run dev              # Vite hot reload (port 3000)
npm run build            # Produção
npm run build:cirrose    # Concatena slides → index.html via _manifest.js
npm run preview          # Servir localmente (palco)
npm run lint:slides      # Assertion-evidence linter — rodar após qualquer edição HTML
```

## Stack

Reveal.js 5.x · GSAP 3.12 · Vite 6.x · Vanilla HTML/CSS/JS · OKLCH · Zero CDN · Offline-first.

## Projects

| Pasta | Status |
|-------|--------|
| aulas/cirrose/ | 28/28 slides, QA pendente (foco atual) |
| aulas/grade/ | 58/58 migrados |
| aulas/osteoporose/ | 70/70 migrados |

Público: hepatologistas seniores (Brasil). PT-BR, termos técnicos EN.

## Conventions

- Slides: `NN-slug.html` (ex: `00-title.html`)
- Commits: `[AULA] batch N — desc`
- Plan C = default (light, 1280×720, GSAP ativo)

## Hard Constraints

1. **Assertion-Evidence.** `<h2>` = afirmação clínica verificável. NUNCA rótulo genérico.
2. **ZERO `<ul>`/`<ol>` em slides.** Listas só em notes e apêndice.
3. **Todo `<section>` TEM `<aside class="notes">`** com timing e fontes. NUNCA deletar notes.
4. **var() obrigatório.** NUNCA cor literal em CSS. Exceção: `data-background-color` (HEX).
5. **Cor clínica ≠ UI.** `--safe/--warning/--danger` = clínico. `--ui-accent` = chrome.
6. **Daltonismo:** ícone obrigatório junto a cor semântica (✓/⚠/✕).
7. **`data-animate` declarativo.** NUNCA gsap inline. Tipos: @.claude/rules/reveal-patterns.md
8. **Zero CDN. Offline-first.** `npm run preview` para servir.
9. **NUNCA reescrever `shared/` ou `index.html` inteiro** sem aprovação.
10. **Corpo do slide ≤ 30 palavras.**
11. **Speaker notes em português.**
12. **GSAP failsafe:** `[data-animate]` → `opacity:0` em CSS. `.no-js` força `opacity:1`.
13. **Tabelas Tufte:** sem bordas verticais, números à direita, classe `.tufte`.
14. **OKLCH padrão.** HSL proibido. Fallback HEX para WCAG.
15. **NUNCA inventar dados clínicos.** Sem fonte Tier 1 → `[TBD]`. Ver @.claude/rules/medical-data.md

## Reference Hierarchy (Cirrose)

| # | Arquivo | Autoridade |
|---|---------|-----------|
| 1 | `aulas/cirrose/references/CASE.md` | Dados do paciente — NUNCA duplicar |
| 2 | `aulas/cirrose/references/evidence-db.md` | Trials, PMIDs, NNTs |
| 3 | `aulas/cirrose/references/narrative.md` | Arco narrativo, pacing |
| 4 | `aulas/cirrose/slides/_manifest.js` | Ordem dos slides — NÃO reordenar sem aprovação |

Conflito: # menor vence. Notion é mirror, não source of truth.

## Key Files

```
shared/css/base.css           → Tokens OKLCH, tipografia, stages
shared/js/engine.js           → data-animate dispatcher + modes
shared/js/deck.js             → Navegação vanilla (substituiu Reveal core)
shared/js/case-panel.js       → Panel Seu Antônio
aulas/cirrose/archetypes.css  → 12 archetypes (layout por slide)
aulas/cirrose/slide-registry.js → Custom anims + wiring
aulas/cirrose/slides/         → 1 HTML per slide (truth: _manifest.js)
```

## Workflow

1. **Anti-drift:** Ler HANDOFF → identificar caminho crítico → propor ao usuário. Ver @.claude/rules/anti-drift.md
2. Plan mode para tarefas ≥3 steps. Spec antes de implementar.
3. Subagents para pesquisa — manter contexto principal limpo.
4. Verificar antes de declarar done: `npm run lint:slides`, demonstrar correctness.
5. Handoff: código → visual = Gemini. Visual → clínico = Opus. Parar e transferir.
6. Após correção do usuário → atualizar `tasks/lessons.md`.
7. Sessão termina → atualizar registros operacionais (abaixo).

## Operational Records (NUNCA deletar — append-only)

| Arquivo | Função | Atualizar quando |
|---------|--------|-----------------|
| `aulas/cirrose/HANDOFF.md` | Pendências ativas — próximo agente lê primeiro | Final de toda sessão |
| `aulas/cirrose/CHANGELOG.md` | Histórico de batches — o que foi feito | Após cada batch de commits |
| `aulas/cirrose/ERROR-LOG.md` | Erros → regras que previnem repetição | Quando encontrar erro novo |
| `aulas/cirrose/NOTES.md` | Decisões e achados entre agentes | Durante a sessão |
| `tasks/lessons.md` | Padrões de auto-correção | Após correção do usuário |

Estes NÃO são entulho — são a memória operacional do projeto entre sessões.

## Session Start

```bash
git log --oneline -5 && git status
cat aulas/cirrose/HANDOFF.md
cat tasks/lessons.md 2>/dev/null || echo "No lessons yet"
```

Se algo não bater → PARAR e perguntar.

## Context Management

- /clear entre tasks. /compact em ~70%.
- Até 3 tasks por sessão. Commitar entre tasks.
- Registrar decisões em `aulas/cirrose/NOTES.md`.

## Detailed Rules (loaded on demand by .claude/rules/)

- **Anti-drift protocol: @.claude/rules/anti-drift.md**
- CSS errors & flexbox: @.claude/rules/css-errors.md
- Design tokens & OKLCH: @.claude/rules/design-system.md
- Design principles (Duarte, Tufte, Sweller): @.claude/rules/design-principles.md
- Medical data & verification: @.claude/rules/medical-data.md
- Reveal.js & GSAP patterns: @.claude/rules/reveal-patterns.md
- Slide editing checklist: @.claude/rules/slide-editing.md
- Motion QA: @.claude/rules/motion-qa.md
- Doc graph: @docs/XREF.md
