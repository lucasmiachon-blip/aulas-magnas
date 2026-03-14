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
- **Assertion:** "Revisão sistemática é o processo; meta-análise é o passo estatístico — e nem toda RS tem MA"
- **Risco cognitivo:** tratar RS e MA como sinônimos → perda da estrutura lógica
- **Evidência:** Cochrane Handbook, definições cap. 1
- **Status:** EXISTENTE (02-rs-vs-ma.html) — renumerar para posição 04

### Slide 05 — O PICO como porta de entrada

- **Fase:** 2
- **Função:** ensinar que toda MA começa por uma pergunta estruturada
- **Assertion:** "Antes do diamante, a pergunta: quem, o que, contra o que, medindo o quê"
- **Risco cognitivo:** pular direto para resultados sem entender elegibilidade
- **Evidência:** Cochrane Handbook — PICO framework (genérico)
- **Status:** GENERALIZAR (04-pico.html — remover dados Musini, ensinar o conceito)

### Slide 06 — O que o abstract já entrega

- **Fase:** 2
- **Função:** mostrar que o abstract de boa RS é denso e ensinável
- **Assertion:** "Um bom abstract de RS já informa busca, elegibilidade, método, n de estudos e n de pacientes"
- **Risco cognitivo:** ler abstract superficialmente → perder metadados estruturais
- **Evidência:** PRISMA 2020 for Abstracts (checklist 12 itens, genérico)
- **Status:** GENERALIZAR (05-abstract.html — remover dados Musini, ensinar o que procurar)

### Slide 07 — Como ler o forest plot

- **Fase:** 2
- **Função:** alfabetização no forest plot — medida, direção, nulidade, IC95%, peso
- **Assertion:** "O diamante mostra o efeito combinado, mas o IC95% mostra o quanto devemos confiar no tamanho desse efeito"
- **Risco cognitivo:** confundir significância estatística com importância clínica
- **Evidência:** Sedgwick BMJ 2015 — forest plot anatomy (genérico)
- **Status:** NOVO — forest plot genérico/didático (imagem cropada de artigo real)

### Slide 08 — Benefício e dano no mesmo artigo

- **Fase:** 2
- **Função:** mostrar que MA séria reporta dano, não só benefício
- **Assertion:** "Toda MA que só mostra benefício está contando metade da história — dano é o outro lado do diamante"
- **Risco cognitivo:** ignorar dano porque o benefício é significativo
- **Evidência:** conceito genérico — exemplos em Fase 3
- **Status:** NOVO

### Slide 09 — Certeza da evidência (GRADE)

- **Fase:** 2
- **Função:** introduzir GRADE como linguagem clínica
- **Assertion:** "Alta, moderada, baixa — não é nota para o artigo; é quanto você confia que o efeito real está perto do estimado"
- **Risco cognitivo:** tratar GRADE como burocracia metodológica → não usar na prática
- **Evidência:** Cochrane Handbook cap. 14; GRADE Working Group
- **Status:** NOVO

### Slide 10 — Heterogeneidade

- **Fase:** 2
- **Função:** desfazer o mito de que I² alto = MA inválida
- **Assertion:** "Heterogeneidade existe em quase toda MA real; a pergunta madura é: ela é explicável e muda a decisão?"
- **Risco cognitivo:** I² alto → descartar a MA automaticamente
- **Evidência:** Cochrane Handbook cap. 10 (I², Q, tau²)
- **Status:** NOVO

### Slide 11 — Efeito fixo vs. aleatório

- **Fase:** 2
- **Função:** dar ao residente o mínimo para leitura madura
- **Assertion:** "A escolha do modelo reflete uma visão sobre a variação entre estudos — e pode mudar o IC"
- **Risco cognitivo:** ignorar que o modelo afeta a interpretação
- **Evidência:** Cochrane Handbook cap. 10
- **Status:** NOVO

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
- **Status:** EXISTENTE (03-ancora.html) — reposicionar aqui. Conteúdo depende do artigo

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
| 00-title.html | Slide 00 | Slide 00 (Fase 1) | Manter | ✅ |
| 01-hook.html | Slide 01 | Slide 01 (Fase 1) | Reescrever — generalizar | ✅ Reescrito |
| 01-objectives.html | Slide 01 (v0) | — | Absorvido por 02-contrato | ✅ Orphan |
| 02-contrato.html | — | Slide 02 (Fase 1) | NOVO | ✅ Criado |
| 03-checkpoint-1.html | — | Slide 03 (Interação 1) | NOVO | ✅ Criado |
| 03-rs-vs-ma.html | Slide 02 (v0) | Slide 04 (Fase 2) | Renumerar | ✅ |
| 04-pico.html | Slide 04 | Slide 05 (Fase 2) | Generalizar — remover Musini | ✅ |
| 05-abstract.html | Slide 05 | Slide 06 (Fase 2) | Generalizar — remover Musini | ✅ |
| 06-forest-plot.html | — | Slide 07 (Fase 2) | Existente | ✅ |
| 07-benefit-harm.html | — | Slide 08 (Fase 2) | Existente | ✅ |
| 08-grade.html | — | Slide 09 (Fase 2) | Existente | ✅ |
| 09-heterogeneity.html | — | Slide 10 (Fase 2) | Existente | ✅ |
| 10-fixed-random.html | — | Slide 11 (Fase 2) | Existente | ✅ |

---

## Status: BLUEPRINT v1.1 — Fases 1+2 completas (12 slides no deck). Fase 3 bloqueada até artigo definido.
