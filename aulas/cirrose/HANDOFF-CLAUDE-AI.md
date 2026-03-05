# HANDOFF — Claude.ai (colar no Project Knowledge)

> Cirrose · enxuto

---

## Sucesso até aqui

- **Preview:** `npm run dev` → port 3000, hot reload OK
- **s-title:** Brasão USP, pilares, navy fixo, print var(--bg-navy)
- **s-hook v5:** 2 beats (Antônio → labs+pergunta), reversível (←/↑), sem sombra, interação OK. Antônio (formal), "Caminhoneiro", sem título. Click/seta avança; seta esquerda/cima volta.
- **Preview subitens:** beat 0 e beat 1 mostram estados distintos (DOM local pós-init).

---

## Prioridades (ordem — HTML por último)

1. ~~**Loops seguros**~~ ✅ QA, Notion sync, narrative loops funcionando
2. ~~Verbosity~~ ✅ Docs auditados 04/mar
3. ~~Biblia narrativa~~ ✅ PMIDs corrigidos, Baveno VII canônico
4. ~~Alinhamento Notion~~ ✅ References DB classificada (194 entries, Tier + Leitura)
5. ~~Conflitos~~ ✅ .cursor vs .claude auditados 04/mar — complementares, não redundantes
6. HTML — ERRO-008, AUDIT fixes, speaker notes EN→PT, D'Amico slide polish

## Pendências

- **ERRO-021 · CRITICAL** — `cirrose.css` linha ~1823: `#s-a1-damico.archetype-flow` → adicionar espaço → `#s-a1-damico .archetype-flow`. D'Amico 2014 dataset era 5 clippado. Fix = 1 char + rebuild.
- ERRO-008 (case panel redundante no hook), AUDIT I2–I10, speaker notes EN→PT
- NNT IC 95%: 4 slides [TBD] — tasks/NNT-IC95-REPORT.md
- 21 referências [TBD] catalogadas em NOTES.md
- **WARN (aesthetics):** s-a1-01 hero stat e iceberg comprimem simultâneos no State 1 (não crítico, cosmético)

## Concluído (sessão 2026-03-04)

- Flip plugin integrado (`index.template.html` + `slide-registry.js`)
- s-a1-damico Era 5: Flip.from + CountUp chain
- QA visual 28 slides (4 dimensões: aesthetics, interactivity, slideology, contrast)
- Panel headline clipping corrigido (ERRO-019) — archetypes.css + `has-panel` rule
- Era 5 pathway layout corrigido (ERRO-018) — `display:flex` no contexto `damico-dataset`
- Era 1 overflow (ERRO-020) — `overflow-y:hidden` + compactação `.scores-limitations`
- Panel field value: font-size 13px + text-align:right

## Próxima sessão

1. Fix ERRO-021 (`cirrose.css` linha ~1823 — 1 char + rebuild)
2. Ver HANDOFF.md para demais pendências. Offline: build, lint, preview funcionam.

---

## Paths

| Doc                | Path                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| Pendências projeto | `aulas/cirrose/HANDOFF.md`                                            |
| Changelog verboso  | `aulas/cirrose/CHANGELOG.md`                                          |
| Erros + raw code   | `aulas/cirrose/ERROR-LOG.md`                                          |
| Audit 28 slides    | `aulas/cirrose/AUDIT-VISUAL.md`                                       |
| Hook               | `slides/01-hook.html`, `slide-registry.js`, `cirrose.css` (s-hook v5) |
| Init               | `index.template.html` (wireAll antes anim.connect)                    |
| Preview            | `preview.html` (beat 0/1 via DOM local pós-connect)                 |

---

## Comandos

`npm run dev` · `npm run build:cirrose` · `npm run qa:screenshots:cirrose`
