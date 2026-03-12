# HANDOFF — Meta-análise

> Estado operacional. Atualizar ao final de cada sessão.

---

## Estado atual

- **Fase:** Ato 1 completo, avançar para Ato 2
- **Branch:** feat/metanalise-mvp (worktree wt-metanalise)
- **Slides prontos:** 6/14 (00-title, 01-hook, 02-rs-vs-ma, 03-ancora, 04-pico, 05-abstract)
- **Docs fundacionais:** narrative.md, evidence-db.md, blueprint.md, reading-list.md

## O que foi feito

- [x] Leitura e validação do memo direcionado
- [x] Criação de narrative.md (tese, arco 4 atos, âncora, público)
- [x] Criação de evidence-db.md (dados Musini 2025 abstract, referências por função)
- [x] Criação de blueprint.md (15 slides com assertion, função, risco cognitivo)
- [x] Criação de reading-list.md (pre-reading residente + trilha professor)
- [x] Atualização de metanalise-scope.md (supersede versão enciclopédica)
- [x] Atualização de CLAUDE.md local (alinhado com novo escopo)
- [x] metanalise.css (CSS base: tokens, título, hook, assertion, source-tag, GSAP failsafe)
- [x] slides/00-title.html (Do diamante à decisão + 3 pilares)
- [x] slides/01-hook.html (hook: O diamante diz que funciona. Você confia?)
- [x] index.html migrado de Reveal.js para deck.js + engine.js
- [x] Removidos placeholders stage-b/c (obsoletos)
- [x] Hook redesenhado como 2-beat interativo (countUp + verdict)
- [x] Título com stagger nos pilares
- [x] CSS fadeUp com translateY real
- [x] Validação visual em localhost
- [x] Batch 4: slides 02–05 (Ato 1: RS vs MA, âncora, PICO, abstract)
- [x] metanalise.css: 4 layouts (compare, anchor-card, pico-grid, pipeline-flow)
- [x] index.html synced com 6 slides

## Caminho crítico — próximos batches

### Batch 5 (próximo)
- Slides 06–08 (Ato 2: forest plot, benefício, dano)
- Decisão sobre forest plot: placeholder vs real

### Batch 6
- Slides 09–11 (Ato 3: GRADE, heterogeneidade, fixed/random)

### Batch 7
- Slides 12–14 (Ato 4: aplicabilidade, efeito absoluto, take-home)

## Bloqueios conhecidos

| Bloqueio | Impacto | Workaround |
|----------|---------|------------|
| Full-text Musini indisponível até 2026-10-09 | Sem forest plot real, sem NNT | Usar dados do abstract; placeholder |
| JAMA Users' Guides acesso institucional | Pode não estar disponível para residentes | Manter como good-to-read |

## Não fazer ainda

- Não criar _manifest.js (precisa de slides primeiro)
- Não tocar em Cirrose
- Não expandir para NMA, IPD, bayesiana

---

## Última atualização: 2026-03-12
