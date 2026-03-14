# Definition of Done — Cirrose

> Um item só está **done** quando os 3 gates passam.
> Iteracao: `npm run done:cirrose` (warnings tolerados)
> Encerramento: `npm run done:cirrose:strict` (warnings = FAIL)

---

## Gate 1 — Tecnico (automatizado)

- `npm run build:cirrose` passa
- `npm run lint:slides` passa (inclui CSS brace/comment balance)
- `npm run lint:case-sync` passa
- `npm run lint:narrative-sync` passa

**O que detecta:** HTML invalido, `<ul>/<ol>` projetado, E07 (display no section), CDN, cores literais, CSS com comment aberto ou brace orfao, drift CASE↔manifest, drift narrative↔manifest.

## Gate 2 — Browser QA (semi-automatizado)

- Screenshots em `qa-screenshots/` mais recentes que ultimo edit em slides/CSS/registry
- Se code e mais novo que screenshots: **WARN — browser QA pendente**
- Uncommitted files: listados como warning

**O que detecta:** Regressao visual invisivel ao lint. Trabalho nao commitado em risco.

**Como resolver:** Rodar Playwright ou smoke test manual no browser. Commitar antes de encerrar sessao.

## Gate 3 — Propagacao e Cleanup (checklist)

Automatizado (scan):
- HANDOFF.md com "em andamento" ou "[LUCAS DECIDE]" ou "[TBD]" → verificar se ainda valido
- ERROR-LOG.md com items PENDENTE → verificar se correto
- Slides com `[TBD]` em conteudo projetado (fora de notes) → WARN

Manual (obrigatorio):
- [ ] HANDOFF.md reflete estado real (sem warnings stale)
- [ ] Se PMID/dado mudou → grep all HTML para valor antigo
- [ ] Se h2 mudou → _manifest.js headline atualizada
- [ ] Speaker notes tem [DATA] tags para claims numericas

---

## Modo normal vs strict

| Situacao | Gate 2/3 warnings | Exit code | Comando |
|----------|-------------------|-----------|---------|
| **Normal** (iteracao) | WARN — informativo | 0 (pass) | `npm run done:cirrose` |
| **Strict** (encerramento) | FAIL — bloqueante | 1 (fail) | `npm run done:cirrose:strict` |

### O que bloqueia no strict

Tudo que no modo normal e warning, no strict vira FAIL:

1. **Screenshots ausentes ou stale** — sem evidencia de browser QA
2. **Arquivos uncommitted** em `aulas/cirrose/` (staged, unstaged ou untracked)
3. **HANDOFF.md com "em andamento" / [LUCAS DECIDE] / [TBD]** — state operacional stale
4. **ERROR-LOG.md com PENDENTE** — erros nao resolvidos
5. **[TBD] em conteudo projetado** — placeholder visivel ao publico
6. **Gate 1 falha** (build/lint) — ja bloqueia em ambos os modos

### Quando usar cada modo

| Momento | Comando |
|---------|---------|
| Durante a sessao (iterando) | `npm run done:cirrose` |
| Antes de encerrar sessao | `npm run done:cirrose:strict` |
| Antes de push | `npm run done:cirrose:strict` |
| Antes de handoff para outro agente | `npm run done:cirrose:strict` |

## Regra

Build verde + lint verde ≠ done.
Done = Gate 1 PASS + Gate 2 PASS + Gate 3 checklist verificada.
**Push seguro = strict PASS.**
