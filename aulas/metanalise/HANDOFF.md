# HANDOFF — Meta-análise

> Estado operacional. Atualizar ao final de cada sessão.

---

## Estado atual

- **Fase:** Fases 1+2 completas + Interação 2 + slides 16-17. Faltam slides 13-15 (Fase 3 — artigo âncora TBD).
- **Branch:** feat/metanalise-mvp (worktree wt-metanalise)
- **Slides no index.html:** 15 (00-title → 01-hook → 02-contrato → 03-checkpoint-1 → 04-rs-vs-ma → 05-pico → 06-abstract → 07-forest-plot → 08-benefit-harm → 09-grade → 10-heterogeneity → 11-fixed-random → 12-checkpoint-2 → [13-15 TBD] → 16-absoluto → 17-takehome)
- **Slides planejados:** 18 (00-17) — ver blueprint.md v1.4
- **Docs fundacionais:** narrative.md (v2), evidence-db.md (v3 — 12+ refs), blueprint.md (v1.4), reading-list.md
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
- [x] **Sessão 2026-03-15 — Notion sync + slides independentes + docs:**
  - narrative.md v2: tese central expandida, 3 perguntas reformuladas, credibility gap, checkpoint-2 recalibrado
  - blueprint.md v1.4: slide 12 recalibrado "falso positivo", slide 17 reformulado, Gemini absorvidas
  - Notion Slides DB: 15 slides MA sincronizados (12 existentes + 3 novos)
  - Notion References DB: 7 refs adicionadas, 3 atualizadas (Aula=Multi)
  - **12-checkpoint-2.html — NOVO:** "falso positivo" do diamante. RR 0,75 + GRADE baixa + NNT 80 → não muda. Arco com CP1
  - **16-absoluto.html — NOVO:** RR→NNT conversion. Baseline 20% → NNT 25 vs 2% → NNT 250
  - **17-takehome.html — NOVO:** 3 perguntas reformuladas (credibilidade, GRADE por desfecho, efeito absoluto)
  - metanalise.css: +120 linhas (checkpoint-steps, conversion-scenarios, takehome-cards)
  - index.html: 15 slides ativos + placeholders para 13-15

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

### Sessão N+1 (próxima)
1. **Lucas decide artigo âncora** dentre os candidatos em blueprint.md v1.4 § Candidatos
2. Verificar PMIDs Consensus-sourced do artigo escolhido
3. Construir slides 13-15 (Fase 3) com artigo real
4. Decidir HEX navy: `#162032` (atual) vs `#0d1a2d` (canônico design-system)

### Sessão N+2
- Fase 3 completa + QA final (incluindo Gate 4 Gemini)

## Bloqueios conhecidos

| Bloqueio | Impacto | Workaround |
|----------|---------|------------|
| Artigo âncora não definido | Slides 13-15 bloqueados (Fase 3) | ✅ Candidatos compilados (blueprint v1.4). Lucas decide |
| Full-text Musini indisponível até 2026-10-09 | Sem forest plot real, sem NNT | Se Musini escolhido: usar abstract. Alternativas disponíveis |
| HEX navy `#162032` vs canônico `#0d1a2d` | Inconsistência cross-aula | Decidir e aplicar batch replace |
| PMIDs Consensus-sourced não verificados | 4 PMIDs (Zacharias, Aamann, AlSowaiegh, Saleh) pendentes PubMed check | Verificar antes de usar em slides |
| Propostas narrativas Gemini pendentes | ✅ ABSORVIDAS em narrative.md v2 + blueprint.md v1.4 | Resolvido 2026-03-15 |

## Pendências para main (Classe B — não editar na WT)

- **lint-slides.js false positive:** `scripts/lint-slides.js:110` — `data-animate="countUp"` sem `data-target` não pula `<script>` blocks. 2 false positives no index.html built.
- **CSS órfão no metanalise.css:** classes `scope-*`, `anchor-*`, `metric-*` sem uso após deleção de orphans. Mantidas para potencial reuso na Fase 3.

## Não fazer ainda

- Não criar _manifest.js (precisa de slides finais)
- Não tocar em Cirrose
- Não expandir para NMA, IPD, bayesiana
- Não construir slides 13-15 antes de definir artigo

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

---

## Sessão 2026-03-15 — Notion sync + slides independentes + docs

### O que foi feito
- [x] Notion Slides DB: 15 slides MA sincronizados (12 criados + 3 novos)
- [x] Notion References DB: 7 refs adicionadas, 3 atualizadas (Aula=Multi)
- [x] narrative.md v2: tese central, 3 perguntas reformuladas, credibility gap, checkpoint-2 recalibrado
- [x] blueprint.md v1.4: slide 12 + 17 recalibrados, Gemini absorvidas
- [x] 12-checkpoint-2.html: "falso positivo" — RR 0,75 + GRADE baixa + NNT 80 → não muda
- [x] 16-absoluto.html: RR→NNT conversion (NNT 25 vs 250)
- [x] 17-takehome.html: 3 perguntas reformuladas
- [x] metanalise.css: checkpoint-steps, conversion-scenarios, takehome-cards
- [x] index.html: 15 slides ativos + placeholders 13-15
- [x] HANDOFF atualizado

### O que NÃO foi feito (deliberado)
- Slides 13-15 (Fase 3) — artigo âncora TBD
- 4 PMIDs Consensus-sourced não verificados (Zacharias, Aamann, AlSowaiegh, Saleh)

---

## Repo Janitor — 2026-03-14

**Rodada:** main + wt-cirrose + wt-metanalise em paralelo. Resultado wt-metanalise:

- **FAIL [✅ corrigido]:** `docs/XREF.md` linha 80 — link `pipeline/README.md` inexistente. Corrigido para `archive/pipeline/README.md`.
- **WARN:** 12 slides em `slides/` órfãos (sem `_manifest.js`) — intencional. Criar `SLIDES-STATUS.md` ao iniciar Fase 3.
- **WARN:** `03-rs-vs-ma.html` conflita no prefixo com `03-checkpoint-1.html` — renomear para `04-rs-vs-ma.html` antes de criar `_manifest.js`.
- **WARN:** 11 classes CSS órfãs em `metanalise.css` (`.scope-*`, `.anchor-*`, `.metric-*`) — retidas para Fase 3. Auditar ao começar.

---

## Última atualização: 2026-03-14 (repo-janitor + pré-nova-janela)
