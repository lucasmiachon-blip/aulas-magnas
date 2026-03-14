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

## Candidatos a Artigo Âncora — Fase 3

> Compilado 2026-03-14. Fontes: 3 dossiês Gemini + PubMed MCP + Consensus MCP.
> PMIDs marcados ✅ = verificados via PubMed. Sem ✅ = Consensus-sourced, verificar antes de usar.
> Lucas escolhe amanhã (2026-03-15). NÃO implementar slides até decisão.

### Critérios ideais para a aula

1. Pairwise MA de RCTs (não NMA, não IPD se possível)
2. Desfechos binários (mortalidade, eventos) com RR ou OR + IC 95%
3. GRADE explícito por desfecho (ou fácil de reconstruir)
4. Tier 1 journal (Cochrane, Lancet, BMJ, JAMA, NEJM, Hepatology, J Hepatol)
5. Abstract aberto (residentes precisam ler como pre-reading)
6. Tema clínico relevante para residência de clínica médica
7. Benefício E dano reportados (ensino de GRADE por desfecho)

### Tier S — Ideais para a aula

| # | Artigo | Journal | RCTs | N | Desfecho principal | Efeito | GRADE | PMID | Notas |
|---|--------|---------|------|---|-------------------|--------|-------|------|-------|
| S1 | Musini 2025 — Anti-HTN ≥60 anos | Cochrane | 16 | 26.795 | Mortalidade total | RR 0,91 (0,85–0,97) | ✅ Alta/Mod/Baixa por desfecho | evidence-db v0 | Full-text indisponível até out/2026. PA 182/95 = aplicabilidade questionável |
| S2 | Zacharias 2023 — Rifaximin para EH | Cochrane | 41 | 4.545 | Mortalidade (rif+NAD vs NAD) | RR 0,69 (0,55–0,86); NNT=22 | ✅ Moderada | [VERIFICAR] | GRADE por desfecho, NNT, I², RoB. Pacote completo. Hepatologia |
| S3 | Valgimigli 2025 — Clopidogrel vs aspirina | Lancet | 7 | 28.982 | MACCE (5,5 anos) | HR 0,86 (0,77–0,96) | Não explícito | 40902613 ✅ | IPD-MA (mais sofisticada que pairwise). Sem aumento de sangramento. Tema universal |

### Tier A — Fortes com ressalvas

| # | Artigo | Journal | RCTs | N | Desfecho principal | Efeito | GRADE | PMID | Notas |
|---|--------|---------|------|---|-------------------|--------|-------|------|-------|
| A1 | Aamann 2026 — BCAAs para EH | Cochrane | 18 | 934 | EH | RR 0,79 (0,64–0,96) | ✅ Baixa/Muito Baixa | 41542879 | Hepatologia. Cochrane + GRADE. N pequeno |
| A2 | Prosty 2025 — ATB profilático em HDA/cirrose | JAMA Intern Med | 14 | 1.322 | Mortalidade (curto vs longo ATB) | RD 0,9% (CrI −2,6 a 4,9) | RoB 2 usado | 40788637 | **Bayesiano** — desafia guideline. Hepatologia. Provocativo |
| A3 | Suffert 2025 — Propranolol vs EVL (1ª profilaxia) | Hepatol Int | 14 | 1.345 | Sangramento varicoso | RR 1,40 (1,02–1,91) EVL>Prop | Não | 40968192 | Grupo brasileiro. Head-to-head. Sem GRADE |
| A4 | AlSowaiegh 2026 — Albumina em cirrose descompensada | Hepatol Commun | 68 (56 c/ mortalidade) | — | Mortalidade | OR 0,769 (0,652–0,908) | Não | 41543475 | Ensina "qualidade vs quantidade" (benefício some em trials grandes). Hepatologia |
| A5 | Soumare 2025 — Corticoides em choque séptico | [verificar journal] | — | — | Mortalidade | [verificar] | — | 41325621 ✅ | Tema clássico clínica médica. Dados completos pendentes |
| A6 | Saleh 2026 — TIPS preemptiva (só RCTs) | J Clin Exp Hepatol | 6 | 424 | Ressangramento <6 sem | RR 0,15 (0,07–0,34) | Não | 41767699 | Múltiplos desfechos binários. Hepatologia. N pequeno |
| A7 | Jeyaraj 2026 — Aminoglicosídeos/vancomicina/metronidazol para EH | Cochrane | 24 | 1.405 | Mortalidade (aminoglicosídeo vs outros) | RR 1,64 (1,03–2,62) | ✅ Baixa/Muito Baixa | 41631546 ✅ | Cochrane + GRADE. Mostra DANO (aumento mortalidade). Perfeito para ensinar benefício-dano + GRADE |

### Tier B — Interessantes por caso especial

| # | Artigo | Ensina o quê | PMID | Nota |
|---|--------|-------------|------|------|
| B1 | AF ablation 2025 | Time-flattening bias (agregação temporal mascara efeitos opostos) | 40587868 ✅ | Cardiologia invasiva — menos relevante para clínica geral |
| B2 | DOACs vs aspirina 2025 | Risk Difference (RD) com linha de nulidade em 0 (não 1) | 39928949 ✅ | Medida de efeito incomum — pode confundir no nível básico |
| B3 | Reddy 2025 — Idosos com SCA | Fragilidade + idade como modificador de efeito | 40549394 ✅ | Relevante para clínica médica |
| B4 | Early DOAC em AVC 2024 | Timing de intervenção como variável | 39608862 ✅ | Tema urgente |
| B5 | β-lactam em sepse 2025 | Prolonged infusion — contínuo vs intermitente | 38864162 ✅ | Sepse = core da residência |
| B6 | Nicoara-Farca 2024 — TIPS preemptiva IPD-MA | IPD meta-analysis (não pairwise clássica) | 37782566 | Hepatology. Landmark. Mix RCTs + observacional |

### Recomendação do agente (para deliberação do Lucas)

**Top 3 para decisão:**

1. **S2 (Zacharias/Cochrane rifaximin)** — Pacote didático mais completo: Cochrane, GRADE por desfecho, NNT, I², RoB, 41 RCTs. Hepatologia (área do Lucas). Múltiplas comparações pairwise. Abstract aberto. Tem tudo que a aula precisa ensinar.

2. **S1 (Musini/Cochrane anti-HTN)** — Candidato original. GRADE explícito. Maior N. Mas full-text bloqueado e aplicabilidade questionável (PA 182/95).

3. **S3 (Valgimigli/Lancet clopidogrel vs aspirina)** — Lancet, N enorme, tema universal. Mas é IPD (não pairwise clássica) e HR (não RR). Sem GRADE explícito.

**Trade-off principal:** S2 tem melhor fit didático; S1 tem o melhor GRADE; S3 tem o maior impacto clínico.

---

## Propostas de mudança narrativa (pendentes — Gemini dossiês)

> 3 dossiês Gemini analisados em 2026-03-14. Convergências identificadas.
> Mudanças NÃO implementadas — aguardando output final do Gemini + decisão do Lucas.

### Convergências dos 3 dossiês (aceitar)

1. **Credibility gap** entre slides 06 (abstract) e 07 (forest plot) — falta "posso confiar nesta síntese?" (PRISMA ≠ qualidade, RoB)
2. **Tese central** precisa incluir credibilidade da síntese + efeito absoluto
3. **3 perguntas do take-home** precisam reformulação (embeddar credibilidade + risco absoluto)
4. **Checkpoint 2** recalibrar para "falso positivo" (diamante diz benefício, GRADE diz não confiar)

### Decisão do Lucas (2026-03-14)

- **Slide 11 (fixed vs random) MANTÉM** — Lucas decidiu que é slide importante, override das 3 recomendações de substituir

### Referências metodológicas novas (verificadas)

| Referência | PMID | Função | Status |
|-----------|------|--------|--------|
| Murad et al. JAMA 2014 — Rating quality of evidence | 25005654 ✅ | GRADE tutorial canônico | Adicionar ao reading-list |
| Guyatt et al. BMJ 2008 — GRADE intro series | 21195583 ✅ | Série GRADE original | Referência do professor |
| Sterne et al. BMJ 2019 — RoB 2 | 31462531 ✅ | Credibility gap | Já em evidence-db |
| Page et al. BMJ 2021 — PRISMA 2020 | 33782057 ✅ | Transparência ≠ qualidade | Já em evidence-db |

---

## Status: BLUEPRINT v1.3 — Fases 1+2 completas (12 slides). Candidatos Fase 3 compilados (3S+7A+6B). Decisão de artigo âncora: 2026-03-15.
