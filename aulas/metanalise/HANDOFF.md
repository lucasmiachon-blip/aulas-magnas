# HANDOFF — Meta-análise

> Estado operacional. Atualizar ao final de cada sessão.

---

## Estado atual

- **Fase:** Fases 1+2 completas + QA review pass. Faltam checkpoint-2 (interação 2) e Fase 3.
- **Branch:** feat/metanalise-mvp (worktree wt-metanalise)
- **Slides no index.html:** 12 (00-title → 01-hook → 02-contrato → 03-checkpoint-1 → 04-rs-vs-ma → 05-pico → 06-abstract → 07-forest-plot → 08-benefit-harm → 09-grade → 10-heterogeneity → 11-fixed-random)
- **Slides planejados:** 18 (00-17) — ver blueprint.md v1.1
- **Docs fundacionais:** narrative.md (v1), evidence-db.md (v2 — 12 refs tier 1), blueprint.md (v1.1), reading-list.md
- **Vite dev:** port 3032
- **Orphan slides:** 0 (01-objectives, 02-rs-vs-ma, 03-ancora deletados em 2026-03-13)

## O que foi feito

- [x] Narrativa reestruturada (v1): 3 fases + 2 interações
- [x] Docs fundacionais: narrative.md, evidence-db.md, blueprint.md, reading-list.md
- [x] metanalise.css: tokens, layouts (compare, pico-grid, pipeline-flow, anatomy-grid, concept-card, grade-stack, scope-layout, contrato-grid, checkpoint-layout)
- [x] 00-title.html — "Meta-análise: Leitura crítica para decisão clínica" + 3 pilares
- [x] **01-hook.html — REESCRITO (2026-03-13):** 2-beat state machine, 3 countUp (80/dia, 88%, 8.5%), 4 PMIDs tier 1
- [x] **02-contrato.html — NOVO (2026-03-13):** 3 cards framework + scope footer. Absorveu 01-objectives.html
- [x] **03-checkpoint-1.html — NOVO (2026-03-13):** cenário MA ilustrativo → "Você muda?" → twist (PICO, comparador, dano)
- [x] 03-rs-vs-ma.html → posição 04 — RS vs MA (compare layout)
- [x] 04-pico.html → posição 05 — PICO grid generalizado
- [x] 05-abstract.html → posição 06 — pipeline PRISMA
- [x] 06-forest-plot.html → posição 07 — anatomia 5 elementos
- [x] 07-benefit-harm.html → posição 08 — benefício vs dano
- [x] 08-grade.html → posição 09 — 4 níveis de certeza
- [x] 09-heterogeneity.html → posição 10 — I² concept card
- [x] 10-fixed-random.html → posição 11 — FE vs RE compare
- [x] **h2 rewrite (2026-03-13):** 9 headlines trocados de framing retórico → assertions técnicas verificáveis
- [x] **CSS fix (2026-03-13):** removido stage-c, slides renderizando corretamente
- [x] index.html migrado para deck.js + engine.js (sem Reveal.js)
- [x] **evidence-db.md v2 (2026-03-13):** 12 refs tier 1 em 4 eixos (volume, qualidade, guidelines, competência)
- [x] **index.html reescrito (2026-03-13):** 12 slides na ordem final do blueprint v1.1
- [x] **QA review pass (2026-03-13):** 15 arquivos auditados, 4 FAILs + 6 WARNs identificados e corrigidos:
  - Orphan files deletados (01-objectives, 02-rs-vs-ma, 03-ancora) — elimina duplicate ID `s-rs-vs-ma`
  - font-weight 300 → 400 (projetor-safe)
  - Dead class `title-hero` removida de 00-title
  - Ícones daltonismo adicionados ao GRADE (✓ ○ ⚠ ✕) + CSS `.grade-icon`
  - Word count trimado em 8 slides (corpo ≤30 palavras)

## Decisões tomadas

| Decisão | Razão | Data |
|---------|-------|------|
| Artigo âncora = [TBD] — 18 candidatos compilados | Primeiro importância, depois método, depois artigo. Lucas escolhe 2026-03-15 | 2026-03-14 |
| Slide 11 (fixed vs random) MANTÉM como slide dedicado | Lucas override: slide importante para leitura madura. Contra 3 dossiês Gemini que sugeriam substituir | 2026-03-14 |
| 3 fases + 2 interações | Retrieval practice entre blocos | 2026-03-13 |
| h2 = assertion técnica | Cirrose usa claims verificáveis; metanalise deve seguir mesmo padrão | 2026-03-13 |
| Fase 3 bloqueada até artigo definido | Slides 13-17 dependem da escolha | 2026-03-13 |
| Forest plots = imagens cropadas | NUNCA SVG construído do zero | 2026-03-13 |
| 01-objectives absorvido por 02-contrato | Evita redundância; contrato é mais forte pedagogicamente | 2026-03-13 |
| Hook generalizado (sem Musini) | Importância de MA > artigo específico. 4 PMIDs tier 1 sustentam o argumento | 2026-03-13 |

## Caminho crítico — próximas sessões

### Sessão N+1 (2026-03-15 — Lucas escolhe artigo âncora)
1. **Lucas decide artigo âncora** dentre os candidatos em blueprint.md v1.3 § Candidatos
2. Verificar PMIDs Consensus-sourced do artigo escolhido (Zacharias, Aamann, etc.)
3. Avaliar propostas narrativas dos 3 dossiês Gemini (credibility gap, tese central, 3 perguntas)
4. Criar checkpoint-2 (slide 12 — recalibrar para "falso positivo" conforme Dossiê 3)

### Sessão N+2
- Iniciar Fase 3 (slides 13-17) com artigo âncora definido
- Decidir HEX navy: `#162032` (atual) vs `#0d1a2d` (canônico design-system)

### Sessão N+3
- Fase 3 completa + QA final (incluindo Gate 4 Gemini)
- Take-home slide (17)

## Bloqueios conhecidos

| Bloqueio | Impacto | Workaround |
|----------|---------|------------|
| Artigo âncora não definido | Fase 3 inteira bloqueada (slides 13-17) | ✅ Candidatos compilados (blueprint v1.3). Lucas decide 2026-03-15 |
| Full-text Musini indisponível até 2026-10-09 | Sem forest plot real, sem NNT | Se Musini escolhido: usar abstract. Alternativas disponíveis |
| HEX navy `#162032` vs canônico `#0d1a2d` | Inconsistência cross-aula | Decidir e aplicar batch replace |
| PMIDs Consensus-sourced não verificados | 4 PMIDs (Zacharias, Aamann, AlSowaiegh, Saleh) pendentes PubMed check | Verificar antes de usar em slides |
| Propostas narrativas Gemini pendentes | Credibility gap, tese, 3 perguntas, checkpoint-2 | Aguardando output final Gemini + decisão Lucas |

## Pendências para main (Classe B — não editar na WT)

- **lint-slides.js false positive:** `scripts/lint-slides.js:110` — `data-animate="countUp"` sem `data-target` não pula `<script>` blocks. 2 false positives no index.html built.
- **CSS órfão no metanalise.css:** classes `scope-*`, `anchor-*`, `metric-*` sem uso após deleção de orphans. Mantidas para potencial reuso na Fase 3.

## Não fazer ainda

- Não criar _manifest.js (precisa de slides finais)
- Não tocar em Cirrose
- Não expandir para NMA, IPD, bayesiana
- Não construir slides da Fase 3 antes de definir artigo

---

## Sessão 2026-03-14 — Análise Gemini + busca de candidatos

### O que foi feito
- [x] Analisados 3 dossiês Gemini contra narrative.md e blueprint.md
- [x] Identificadas convergências (credibility gap, tese, 3 perguntas, checkpoint-2)
- [x] Verificados 10 PMIDs citados por Gemini via PubMed MCP (todos ✅)
- [x] Buscados candidatos via PubMed + Consensus: cardiologia, infectologia, hepatologia
- [x] Valgimigli Lancet 2025 (clopidogrel vs aspirina) verificado — PMID 40902613 ✅
- [x] Encontrados 12+ candidatos em cirrose: rifaximin (Cochrane), albumina, TIPS, ATB profilático, beta-bloqueadores, BCAAs
- [x] Blueprint atualizado v1.3 com 18 candidatos em 3 tiers (S/A/B)
- [x] Evidence-db atualizado v3 com refs metodológicas + dados top 3
- [x] Reading-list atualizado v0.2 com Murad JAMA 2014 + Guyatt BMJ 2008

### O que NÃO foi feito (deliberado)
- Narrative.md NÃO alterado (aguardando output final Gemini + decisão Lucas)
- Slides NÃO editados (Fase 3 bloqueada até artigo definido)
- 4 PMIDs Consensus-sourced NÃO verificados via PubMed (Zacharias, Aamann, AlSowaiegh, Saleh)
- Checkpoint-2 NÃO criado (recalibragem depende de decisões narrativas)

---

## Última atualização: 2026-03-14 (sessão análise Gemini + busca candidatos)
