# Coautoria — Alianca Multi-Agente

> Transparencia sobre quem contribuiu para cada artefato.
> Atualizar ao adicionar novo agente ou mudar escopo de contribuicao.

---

## Agentes Participantes

| Agente | Modelo | Papel Principal | Superficie |
|--------|--------|-----------------|------------|
| **Lucas Miachon** | Humano | Decisao clinica, narrativa, aprovacao final | Todas |
| **Opus** | Claude Opus 4.6 | Governanca, codigo, lint, manifest, CSS, engine | Claude Code |
| **ChatGPT** | GPT 5.4 Pro | Draft narrativo, arco dramatico, storyboard | ChatGPT |
| **Gemini** | Gemini 3.1 | Audit visual, screenshots, video review | Gemini |
| **Cursor** | Claude (via Cursor) | Edicao interativa de slides, CSS refinement | Cursor IDE |

---

## Contribuicao por Artefato

| Artefato | Autores | Nota |
|----------|---------|------|
| `references/narrative.md` | Lucas + ChatGPT | Arco narrativo, Sparkline, Chekhov's Guns |
| `references/CASE.md` | Lucas | Dados clinicos canonicos |
| `references/evidence-db.md` | Lucas + Opus | PMIDs, NNTs, dados verificados |
| `references/decision-protocol.md` | Opus | Protocolo de governanca |
| `slides/_manifest.js` | Opus + Lucas | Ordem, archetypes, narrative fields |
| `slides/*.html` | Cursor + Opus + Gemini | Codigo HTML/CSS, visual QA |
| `shared/js/engine.js` | Opus | GSAP dispatcher, case-panel |
| `shared/css/base.css` | Opus + Cursor | Design tokens, tipografia |
| `.claude/rules/*.md` | Opus | Regras operacionais |
| `scripts/lint-*.js` | Opus | Linters automaticos |

---

## Protocolo de Atribuicao

1. **Quem draftou** = autor primario
2. **Quem revisou/editou** = coautor
3. **Quem aprovou** = Lucas (sempre)
4. **Agente que so executou instrucao direta** = ferramenta, nao coautor

---

## Apresentacao

Na apresentacao final, slide de creditos ou ultimo slide menciona:
> "Produzido com assistencia de agentes AI: Claude Opus 4.6, GPT 5.4 Pro, Gemini 3.1"

Conforme boas praticas de transparencia em producao academica assistida por AI.
