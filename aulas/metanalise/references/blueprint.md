# Blueprint — Meta-análise

> Espinha de slides. Cada entrada = 1 slide-núcleo.
> Assertion-evidence: h2 = afirmação verificável, nunca rótulo genérico.
> Derivado de: narrative.md v1 (3 fases + 2 interações).
> Reestruturado: 2026-03-13.

---

## Convenções

- **Fase:** em qual das 3 fases da narrativa ele vive
- **Função:** papel didático do slide no arco
- **Assertion:** a frase que vai no h2 (rascunho, será refinada)
- **Risco cognitivo:** qual erro de interpretação esse slide previne
- **Evidência:** de onde vem o dado central
- **Status:** slide existente / novo / reescrever / generalizar

---

## FASE 1 — Criar importância

### Slide 00 — Título

- **Fase:** 1
- **Função:** enquadramento + expectativa
- **Assertion:** "Meta-análise sem terror: como ler um forest plot e decidir se isso muda sua prática"
- **Risco cognitivo:** —
- **Evidência:** —
- **Status:** EXISTENTE (00-title.html) — manter

### Slide 01 — Por que meta-análise importa

- **Fase:** 1
- **Função:** hook — criar importância, gerar curiosidade
- **Assertion:** "80 revisões sistemáticas foram publicadas hoje. Quantas você consegue avaliar?"
- **Risco cognitivo:** aula parecer estatística pura → desmotivação imediata
- **Evidência:** Hoffmann PMID 34091022 (80/dia), Siemens PMID 33741503 (88% crit. baixa), Fanaroff PMID 30874755 (8.5% LoE A), Lakhlifi PMID 37081292 (ilusão de competência)
- **Status:** ✅ FEITO (01-hook.html) — 2-beat state machine, 3 countUp animations

### Slide 02 — Contrato com a audiência

- **Fase:** 1
- **Função:** definir o que a aula entrega — criar expectativa
- **Assertion:** "Ao final, 3 perguntas que você faz a toda MA antes de mudar sua conduta"
- **Risco cognitivo:** residente não saber o que esperar → atenção dispersa
- **Evidência:** —
- **Status:** ✅ FEITO (02-contrato.html) — 3 cards (PICO, Forest+GRADE, Aplicabilidade) + scope footer. Absorveu conteúdo de 01-objectives.html

---

## INTERAÇÃO 1 — Checkpoint de engajamento

### Slide 03 — Você mudaria sua conduta?

- **Fase:** Interação 1
- **Função:** provocar a audiência — expor viés de confiança no diamante
- **Assertion:** "Uma MA mostra RR 0.91 (IC 0.85–0.97) para mortalidade. Você muda sua conduta?"
- **Risco cognitivo:** residente achar que já sabe ler MA → não engajar na metodologia
- **Evidência:** dados ilustrativos baseados em Musini et al. Cochrane 2025 — sinalizado como didático
- **Status:** ✅ FEITO (03-checkpoint-1.html) — reveal progressivo: cenário → pergunta → twist
- **Nota:** a maioria dirá sim. A aula vai mostrar por que a resposta não é tão simples.

---

## FASE 2 — Metodologia

### Slide 04 — Revisão sistemática =/= meta-análise

- **Fase:** 2
- **Função:** desfazer a confusão mais comum
- **Assertion:** "RS é o método de busca e seleção; MA é o cálculo estatístico — e são separáveis"
- **Risco cognitivo:** tratar RS e MA como sinônimos → perda da estrutura lógica
- **Evidência:** Cochrane Handbook v6.5, cap. 1
- **Status:** ✅ FEITO (03-rs-vs-ma.html) — renumerado, assertion atualizada

### Slide 05 — O PICO como porta de entrada

- **Fase:** 2
- **Função:** ensinar que toda MA começa por uma pergunta estruturada
- **Assertion:** "PICO define a validade externa: se a população ou o comparador não batem, o resultado não se aplica"
- **Risco cognitivo:** pular direto para resultados sem entender elegibilidade
- **Evidência:** Cochrane Handbook v6.5, cap. 3
- **Status:** ✅ FEITO (04-pico.html) — generalizado, sem dados Musini

### Slide 06 — O que o abstract já entrega

- **Fase:** 2
- **Função:** mostrar que o abstract de boa RS é denso e ensinável
- **Assertion:** "Abstract PRISMA entrega busca, elegibilidade, N de estudos e resultado — triagem em 2 min antes do PDF"
- **Risco cognitivo:** ler abstract superficialmente → perder metadados estruturais
- **Evidência:** PRISMA 2020 for Abstracts (Page et al. BMJ 2021;372:n160)
- **Status:** ✅ FEITO (05-abstract.html) — generalizado, pipeline flow layout

### Slide 07 — Como ler o forest plot

- **Fase:** 2
- **Função:** alfabetização no forest plot — medida, direção, nulidade, IC95%, peso
- **Assertion:** "Forest plot codifica efeito, precisão e peso de cada estudo em 5 elementos — quadrado, linha, diamante, eixo e direção"
- **Risco cognitivo:** confundir significância estatística com importância clínica
- **Evidência:** Dettori et al. Global Spine J 2021, PMID 33939533 · Baruah et al. Indian J Anaesth 2025, PMC11878362 · Cochrane Handbook v6.5, cap. 10
- **Status:** ✅ FEITO (06-forest-plot.html) — anatomy grid, 5 elementos com símbolos

### Slide 08 — Benefício e dano no mesmo artigo

- **Fase:** 2
- **Função:** mostrar que MA séria reporta dano, não só benefício
- **Assertion:** "Benefício e dano podem ter certeza GRADE diferente na mesma MA — avaliar ambos separadamente"
- **Risco cognitivo:** ignorar dano porque o benefício é significativo
- **Evidência:** Cochrane Handbook v6.5, cap. 15
- **Status:** ✅ FEITO (07-benefit-harm.html) — compare layout com ícones ✓/✕

### Slide 09 — Certeza da evidência (GRADE)

- **Fase:** 2
- **Função:** introduzir GRADE como linguagem clínica
- **Assertion:** "Certeza GRADE expressa confiança no efeito estimado — avalia por desfecho, não por artigo"
- **Risco cognitivo:** tratar GRADE como burocracia metodológica → não usar na prática
- **Evidência:** GRADE Working Group · Cochrane Handbook v6.5, cap. 14
- **Status:** ✅ FEITO (08-grade.html) — 4 níveis com ícones daltonismo (✓ ○ ⚠ ✕)

### Slide 10 — Heterogeneidade

- **Fase:** 2
- **Função:** desfazer o mito de que I² alto = MA inválida
- **Assertion:** "I² alto não invalida a MA — importa se a heterogeneidade é explicável e clinicamente relevante"
- **Risco cognitivo:** I² alto → descartar a MA automaticamente
- **Evidência:** Higgins & Thompson BMJ 2003, PMID 12958120 · Borenstein 2017, PMID 28058794 · Cochrane Handbook v6.5, cap. 10
- **Status:** ✅ FEITO (09-heterogeneity.html) — concept card com I² hero + question box

### Slide 11 — Efeito fixo vs. aleatório

- **Fase:** 2
- **Função:** dar ao residente o mínimo para leitura madura
- **Assertion:** "Random-effects alarga o IC quando há heterogeneidade — resultado significativo em fixed-effect pode desaparecer"
- **Risco cognitivo:** ignorar que o modelo afeta a interpretação
- **Evidência:** Cochrane Handbook v6.5, cap. 10
- **Status:** ✅ FEITO (10-fixed-random.html) — compare layout FE vs RE

---

## INTERAÇÃO 2 — Checkpoint de consolidação

### Slide 12 — Mini-caso: interprete este forest plot

- **Fase:** Interação 2
- **Função:** consolidar conceitos antes de aplicar em artigo real
- **Assertion:** "RR 0.75 (IC 0.50–1.12), I²=68%, certeza GRADE moderada — o que você conclui?"
- **Risco cognitivo:** aprender conceitos sem integrar → incapaz de aplicar
- **Evidência:** dados ilustrativos/didáticos (NÃO de artigo real — sinalizar)
- **Status:** NOVO (interativo — pausa + reveal progressivo)
- **Nota:** IC cruza nulidade + I² alto + moderada = "provavelmente não muda conduta, mas depende do contexto". Revelar a interpretação passo a passo.

---

## FASE 3 — Aplicação (artigo TBD)

> Artigo âncora ainda NÃO definido. Musini 2025 é candidato, não decisão.
> Slides abaixo usam [ARTIGO] como placeholder.

### Slide 13 — O artigo âncora

- **Fase:** 3
- **Função:** ancorar aplicação em artigo real
- **Assertion:** "[TBD — assertion depende do artigo escolhido]"
- **Risco cognitivo:** discutir MA no vácuo → desconexão clínica
- **Evidência:** [ARTIGO TBD]
- **Status:** A CRIAR — 03-ancora.html deletado (era Musini-specific). Recriar quando artigo âncora definido

### Slide 14 — PICO + resultados do artigo

- **Fase:** 3
- **Função:** aplicar PICO e leitura de resultados ao artigo real
- **Assertion:** "[TBD — depende do artigo]"
- **Risco cognitivo:** saber o conceito mas não saber aplicar
- **Evidência:** [ARTIGO TBD]
- **Status:** NOVO — unir PICO + resultados do artigo escolhido

### Slide 15 — Aplicabilidade

- **Fase:** 3
- **Função:** o salto de "funciona?" para "funciona para meu paciente?"
- **Assertion:** "[TBD — ex: A PA média dos estudos era 182/95 e a maioria usou tiazídico — sua população é diferente?]"
- **Risco cognitivo:** aplicar resultado de MA sem questionar validade externa
- **Evidência:** [ARTIGO TBD]
- **Status:** NOVO

### Slide 16 — Efeito relativo vs. absoluto

- **Fase:** 3
- **Função:** converter RR em NNT / efeito absoluto legível
- **Assertion:** "RR de 0.91 em mortalidade pode significar coisas muito diferentes dependendo do risco basal do seu paciente"
- **Risco cognitivo:** tomar decisão clínica com efeito relativo sem baseline risk
- **Evidência:** Cochrane Handbook cap. 15 + [ARTIGO TBD]
- **Status:** NOVO

### Slide 17 — Take-home

- **Fase:** 3
- **Função:** fechamento — as 3 perguntas que o residente leva
- **Assertion:** "Três perguntas que você faz a toda MA: qual a pergunta? qual o efeito e quão certo? vale para meu paciente?"
- **Risco cognitivo:** sair da aula sem framework operacional reutilizável
- **Evidência:** síntese narrativa
- **Status:** NOVO

---

## Mapa de migração (slides existentes → nova posição)

| Arquivo atual | Posição v0 | Nova posição v1 | Ação | Status |
|---------------|-----------|-----------------|------|--------|
| 00-title.html | Slide 00 | Slide 00 (Fase 1) | Manter | ✅ QA pass |
| 01-hook.html | Slide 01 | Slide 01 (Fase 1) | Reescrever — generalizar | ✅ Reescrito + QA |
| ~~01-objectives.html~~ | Slide 01 (v0) | — | Absorvido por 02-contrato | ✅ Deletado |
| 02-contrato.html | — | Slide 02 (Fase 1) | NOVO | ✅ Criado + QA |
| 03-checkpoint-1.html | — | Slide 03 (Interação 1) | NOVO | ✅ Criado + QA |
| ~~02-rs-vs-ma.html~~ | Slide 02 (v0) | — | Orphan (substituído por 03-rs-vs-ma) | ✅ Deletado |
| 03-rs-vs-ma.html | Slide 02 (v0) | Slide 04 (Fase 2) | Renumerar + assertion | ✅ QA pass |
| 04-pico.html | Slide 04 | Slide 05 (Fase 2) | Generalizar — remover Musini | ✅ QA pass |
| 05-abstract.html | Slide 05 | Slide 06 (Fase 2) | Generalizar — remover Musini | ✅ QA pass |
| 06-forest-plot.html | — | Slide 07 (Fase 2) | NOVO | ✅ QA pass |
| 07-benefit-harm.html | — | Slide 08 (Fase 2) | NOVO | ✅ QA pass |
| 08-grade.html | — | Slide 09 (Fase 2) | NOVO | ✅ QA pass + ícones daltonismo |
| 09-heterogeneity.html | — | Slide 10 (Fase 2) | NOVO | ✅ QA pass |
| 10-fixed-random.html | — | Slide 11 (Fase 2) | NOVO | ✅ QA pass |
| ~~03-ancora.html~~ | Slide 03 (v0) | — | Musini-specific, Fase 3 bloqueada | ✅ Deletado |

---

## Status: BLUEPRINT v1.2 — Fases 1+2 completas + QA review pass (12 slides). 3 orphans deletados. Fase 3 bloqueada até artigo definido.
