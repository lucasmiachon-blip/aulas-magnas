# Blueprint — Aula Cirrose (v3 — 3 Atos)

> **Big Idea:** Cirrose em 2026: 5 números para classificar, 3 decisões para intervir, e a possibilidade real de reverter.
> **Tom:** Professor-mentor — scaffolding para não-hepatologista
> **Público:** Gastroenterologistas gerais — sessão interna
> **Duração:** ~90 min (60 min core + 30 min buffer)
> **Refrão:** "5 números + 3 decisões" (advance organizer)
> **Micro-hook:** "Homem, 55a. FIB-4: 3,2. PLQ: 118k. O que você faz segunda-feira?"
> **Semáforo MELD:** ≥15 encaminhar | ≥20 planejar Tx | ≥25 janela curta
> **Slides core:** 17 + 3 CP = 20 (~60 min) | Apêndice: 8 slides
> **Backward Design:** 10 objetivos de performance → 3 take-homes fotografáveis

---

## 🎯 Objetivos de Performance (Backward Design — Bloom)

*"O que esse gastroenterologista geral FAZ DIFERENTE segunda-feira de manhã?"*

### Ato 1 — Classificar

1. **Aplicar** o pipeline FIB-4 → elastografia → CSPH para estratificar paciente na primeira consulta
2. **Classificar** gravidade usando D'Amico + Child-Pugh + MELD-Na conforme contexto (prognóstico vs transplante vs cirurgia)
3. **Identificar** precipitantes evitáveis (PPIs, NSAIDs) e modificar prescrição

### Ato 2 — Intervir

1. **Prescrever** carvedilol para CSPH antes da primeira descompensação (PREDESCI)
2. **Indicar** Early TIPS no sangramento correto (Child C10-13 ou B com sangramento ativo)
3. **Julgar** quando albumina funciona (ANSWER: repor) vs quando não funciona (ATTIRE: normalizar)
4. **Manejar** PBE, HRS-AKI e HE com protocolo atualizado, reconhecendo incertezas

### Ato 3 — Reverter

1. **Avaliar** critérios de recompensação (Baveno VII) após tratar causa
2. **Manter** vigilância CHC q6m mesmo após SVR/abstinência
3. **Decidir** se paciente pode sair da fila de transplante

### Avaliação: como saber se funcionou?

- **Formativa (durante):** 3 checkpoints com caso clínico — resposta correta requer aplicação dos objetivos 1-2, 4-7, e 8-10
- **Transferência (após):** 3 take-homes fotografáveis no slide final — condensam os 10 objetivos em 3 frases acionáveis
- **Proxy qualitativo:** Se durante os checkpoints >50% da plateia acerta, o Ato anterior cumpriu objetivo

---

## 🔒 Regras do Projeto

1. **3 referências por slide clínico:** Landmark + Atualização recente (≤5a) + Guideline vigente
2. **Figuras originais:** Figura do paper (crédito) ou recriação fiel D3/SVG. Nunca fabricar.
3. **Assertion-evidence:** 1 afirmação verificável + evidência visual. Sem bullet points.
4. **Idioma:** Slides PT / Speaker notes PT
5. **Tri-mode:** Plan A (dark animated 1920×1080) + Plan B (light static 1280×720) + Plan C (light animated 1280×720 — default)
6. **Detalhamento:** Blueprint = mapa de alto nível. Detalhe vai no registro individual da Slides DB.
7. **Flexibilidade:** Blocos e slides são fluidos — referências se linkam aos poucos conforme narrativa amadurece.
8. **Público-alvo:** Gastroenterologistas gerais — sessão interna hospital/residência
9. **Duração:** 90 min masterclass, inclui apêndices como bônus
10. **Refrão narrativo:** "5 números + 3 decisões" como advance organizer
11. **Micro-hook no TITLE + HOOK completo após framework**
12. **Semáforo MELD:** ≥15 encaminhar, ≥20 planejar, ≥25 janela curta

---

## 📍 Status (atualizado 27/fev/2026)

> Pendências → `aulas/cirrose/HANDOFF.md` · Claude.ai → `HANDOFF-CLAUDE-AI.md`

| Etapa | Status |
|-------|--------|
| Pesquisa | ✅ + auditoria PMIDs 23/fev + 15 trials verificados PubMed 25/fev |
| Backward Design + Big Idea | ✅ (recalibrado gastro geral 23/fev) |
| Blueprint v4 (3 Atos) | ✅ Atualizado 25/fev — narrativa v4, interações, pérolas, ações corretivas |
| Storyboard slide-by-slide | ✅ Narrativa v4 completa |
| Popular Slides DB | ✅ 28 registros ativos • 3 DEPRECATED |
| Auditoria PMIDs | ✅ 27 PMIDs verificados • 2 DOI-only |
| References DB | ⚠️ 15 refs pendentes de popular |
| HTML (Reveal.js) | ✅ 28/28 modularizados em `slides/*.html` (FASE 0-4, 27/fev). Plan A/B desatualizados |
| Auditoria Visual | ✅ 2.7/5.0 média — FAIL. Case panel + fill ratio = fixes sistêmicos |
| Auditoria Narrativa | ✅ 3.0/5.0 média — WARN. Andragogia fraca, Duarte descrita não sentida |
| Speaker Notes PT | ✅ Todas em PT. 10 pérolas ausentes identificadas |

**Summary:** ✅ Blueprint v4 completo. 28/28 slides modulares (`slides/*.html`).
⚠️ Auditorias concluídas: Visual (2.7/5) + Narrativa (3.0/5) = WARN. Refatoração arquitetural completa (FASE 0-4). Próximo: refatoração visual slide a slide.

**Próximos passos:** (1) Lucas decide posição HOOK, (2) Separar checkpoints em 2 slides, (3) Fix CSS sistêmico (panel + fill), (4) Integrar 10 pérolas nas notes, (5) Sincronizar Plans A/B.

**Ordem definitiva v4 (sincronizado com _manifest.js 27/fev):**
TITLE(1) → HOOK(2) → A1-01(3) → A1-02(4) → A1-03(5) → ... → CLOSE(20) → APP-01(21)...APP-08(28)
2 DEPRECATED: CIRR-A2-04-OLD (pos 99). CIRR-04-01 renomeado → CIRR-A1-01.

---

## 📓 Framework Didático Aplicado

| Framework | Onde aplicado |
|-----------|---------------|
| Backward Design (Wiggins & McTighe) | 10 objetivos de performance definidos ANTES dos slides. Checkpoints testam diretamente os objetivos. |
| Gagné 9 eventos | Hook/caso (1), Objetivos implícitos na Big Idea (2), Conhecimento prévio ativado no caso (3), Conteúdo em 3 atos (4-5), Checkpoints (6-7), Take-homes (9) |
| BOPPPS | Pre-assessment no hook (caso gera lacuna), Participatory nos 3 checkpoints, Post-assessment no checkpoint 3, Summary no fechamento (audiência resume) |
| Duarte Sparkline | Cada ato abre com "o que é" (paradigma velho) e fecha com "o que poderia ser" (paradigma novo). |
| Carga Cognitiva (Sweller) | Checkpoints a cada ~20 min (limiar 15-18). Max 3 mensagens por slide. Assertion-evidence. Pre-reading reduz carga intrínseca. |

### Sparkline detalhada (Duarte)

| Momento | "O que é" (estado atual) | "O que poderia ser" (novo paradigma) |
|---------|--------------------------|--------------------------------------|
| HOOK | Paciente encaminhado tarde, sem estadiamento | E se tivéssemos interceptado com FIB-4? |
| Ato 1 | Cirrose = diagnóstico binário, biópsia | Espectro contínuo, elastografia, pipeline sem biópsia |
| Ato 2 | Tratar complicações quando aparecem | Prevenir com carvedilol ANTES da descompensação |
| Ato 3 | Cirrose = sentença irrevogável | Recompensação é real: tratar causa + vigiar |
| CLOSE | Paciente que quase morreu | Paciente que recompensou graças aos 3 paradigmas |

---

## ✂️ Slide Ácido v3 (cortar 20% = ~12 min se precisar para slot 45 min)

**Prioridade de corte (1=primeiro a sair):**

1. **A1-05 (Etiologia nuances)** → 30s verbal, sem slide próprio
2. **A2-06 (Encefalopatia)** → mover para apêndice
3. **A2-02 (Early TIPS)** → mover para apêndice

**Resultado:** 14 slides + 3 CP → ~48 min (cabe em slot 45-50 min)

---

## 🎬 Narrativa Slide-a-Slide v4 (Auditoria 25/fev/2026)

> **Fonte:** Auditoria narrativa Claude.ai (Prompt Mestre Duarte + Cognição + Andragogia)
> **Mudanças vs v3:** Tom conversacional, interações com silêncio ativo, transições Duarte explícitas, pérolas integradas

### Prólogo (TITLE — 20s)

Micro-hook: "Homem, 55a. FIB-4 3,2. PLQ 118k. O que vocês fazem segunda-feira?" Silêncio 3s. Título aparece.

### Ato 1 — CLASSIFICAR (slides 2-8, ~18 min)

**A1-01 (2 min)** — "Cirrose não é um switch. É espectro." Villanueva fig1. D'Amico 1%→57%. Pérola: MASLD morte #1=cardiovascular. Volta ao caso: "Antônio está nesse espectro. Onde?"

**A1-02 (3 min)** — Pipeline FIB-4→elastografia→CSPH. Baveno VII rule-of-5. Caveat obesos. "Antônio: IMC 31, MASLD — caveat aplica."

**HOOK (2:30)** — Framework 5+3 à esquerda. Caso Antônio à direita. "Sem queixas. O que vocês fazem?" SILÊNCIO 3s. Pérola: "Antônio é motorista. Guardem."

**A1-03 (2:30)** — Demo MELD calc ao vivo. Antônio: MELD 10 (verde). Muda Cr→3,1: MELD 28 (vermelho). "Uma variável."

**A1-04 (2 min)** — Barras PREDICT. Infecção 33%. "Checklist D0 em todo internado."

**A1-05 (2 min)** — 10 etiologias, 3 grandes mostradas. "Overlap álcool+MASLD = regra no Brasil."

**CP1 (3 min)** — INTERAÇÃO: LSM 21, PLQ 118k. [PAUSA 30-60s] Show of hands: "Quem inicia carvedilol?" [CLICK] 3 decisões reveladas.

### Transição 1→2 (30s, bg-navy)

"Antônio saiu com carvedilol. Prometeu parar de beber. Seis meses depois..."

### Ato 2 — INTERVIR (slides 9-15, ~21 min)

**A2-01 (2 min)** — PREDESCI: HR 0,51, NNT 9, dose. "Ascite refratária NÃO é CI — mudança."

**A2-02 (3 min)** — Timeline sangramento: octreotide→EDA→ATB→Early TIPS. NNT 4. "O ATB salva, não o octreotide."

**A2-03 (3 min)** — 4 albumin cards: 3 SIMs + 1 NÃO. ATTIRE como anti-exemplo.

### Mini-pausa (30s)

"Antônio toma carvedilol há 6m. Até aqui, tudo bem. Mas parou de voltar. E é motorista."

**A2-04 (2:30)** — PBE flow: PMN≥250=tratar. "10% internados com ascite = PBE silenciosa."

**A2-05 (3 min)** — 3 perguntas antes da terlipressina. CONFIRM: NNT 7 rim, NNH 11 resp. "Melhora RIM, não SOBREVIDA."

**A2-06 (2:30)** — 3 pilares HE. "NÃO restringir proteína." Callback: "Covert HE ~30%. Antônio dirige caminhão."

**CP2 (3 min)** — INTERAÇÃO: Antônio volta de ambulância. Cr 2,8, Na 126, MELD 28. [PAUSA 30s] "3 perguntas. Pensem." [CLICK] Terlipressina + listar.

### Transição 2→3 (30s)

"Vocês estabilizaram. Um ano depois. Antônio parou de beber. O fígado começou a perdoar."

### Ato 3 — REVERTER (slides 16-20, ~12 min)

**A3-01 (2:30)** — Recompensação: 3 critérios Baveno VII. "Via de mão única? Baveno VII mudou." Pérola: regra 6 meses = mito anos 80.

**A3-02 (2:30)** — 3 panels: HCV (25-60%), álcool (~1/3), MASLD (gap). "SVR cura vírus, não hipertensão portal."

**A3-03 (2 min)** — Uma caixa: vigilância q6m. "CHC 1-5,1%/ano pós-SVR. Nunca zero."

**CP3 (3 min)** — INTERAÇÃO: LSM 32→18, abstinente 10m. "Recompensou? Pode sair da vigilância?" Pergunta-bomba: "Pode voltar a dirigir?" Covert HE testing.

**CLOSE (3 min)** — Refrão 5+3. 3 take-homes. CTA: "FIB-4 segunda-feira."

**Timing total: ~48 min core + 12 min buffer = 60 min. Com apêndice: ~80 min.**

---

## 🎯 Mapa de Interações Planejadas

| Min | Tipo | Ação palestrante | Ação plateia | Duração silêncio |
|-----|------|------------------|--------------|------------------|
| 0:00 | Micro-hook | Pergunta retórica FIB-4 3,2 | Pensam | 3s |
| 5:00 | Caso | "O que vocês fazem?" | Formulam resposta | 3s |
| 10:00 | Demo | Manipula MELD calc | Observam semáforo | — |
| 18:00 | CP1 | Show of hands antes de revelar | Levantam mão | 30-60s |
| 24:00 | Pausa narrativa | "Antônio parou de voltar..." | Sentem tensão | — |
| 39:00 | CP2 | "3 perguntas. Pensem." | Aplicam framework | 30s |
| 42:00 | Callback | "Motorista. O que muda?" | Conectam HE+direção | 10s |
| 57:00 | CP3 | "Pode dirigir?" | Debate | 60-90s |
| 63:00 | CTA | "FIB-4 segunda-feira" | Comprometem-se | — |

**Total silêncio ativo: ~6 min (10% da aula — alvo andragogia)**

---

## 🔴 Ações Pós-Auditoria (25/fev/2026)

| # | Ação | Prioridade | Quem |
|---|------|-----------|------|
| 1 | Decidir posição HOOK (mover para pos 2 ou manter pos 4) | Crítico | Lucas |
| 2 | Separar checkpoints em pergunta-só + resposta (2 slides cada) | Crítico | Claude.ai spec → Code |
| 3 | Inserir transição narrativa bg-navy antes CP2 | Alto | Code |
| 4 | Inserir mini-pausa narrativa no meio Ato 2 | Alto | Code |
| 5 | Integrar 10 pérolas ausentes nas speaker notes | Alto | Claude.ai |
| 6 | Adicionar visuais aos 11 slides text-in-box | Alto | Cursor |
| 7 | Encurtar headlines A1-02, A1-04, A2-02, A2-06 | Médio | Claude.ai |
| 8 | Corrigir A1-05: tabela com 10 etiologias (não 3) | Médio | Code |
| 9 | Reescrever speaker notes tom conversacional | Médio | Claude.ai |
| 10 | Fix CSS sistêmico (case panel, fill ratio, hero elements) | Crítico | Cursor/Code |

**NUNCA cortar:**
- A1-02 (pipeline FIB-4→CSPH) — ferramenta central
- A2-01 (Carvedilol/PREDESCI) — coração do Ato 2
- A2-03 (Albumina 3 indicações) — 2ª decisão do refrão
- A3-01 (Recompensação) — clímax narrativo
- Checkpoints — são a interação, tirar mata o BOPPPS

---

## 🪡 Caso Clínico (fio condutor — Gagné eventos 1+6+7)

**Paciente:** Homem, 55 anos, motorista de caminhão. Etiologia: álcool + MASLD (overlap — perfil típico Brasil). IMC 31, DM2, etilismo ~60g/dia há 20 anos. Encaminhado pelo clínico geral após FIB-4 = 3.2.

### HOOK (início da aula)

Dados iniciais: FIB-4 3.2, AST 58, ALT 42, plaquetas 118.000, albumina 3.6. Sem queixas. "O que você faz?"
*Objetivo: gerar lacuna de curiosidade.*

### CHECKPOINT 1 (após Ato 1 — Classificar)

Elastografia: LSM 21 kPa. Plaquetas 118.000. Baço 14 cm. EDA: sem varizes.
Pergunta: "Como você classifica? Tem CSPH? Inicia betabloqueador?"

### CHECKPOINT 2 (após Ato 2 — Intervir)

2 anos depois. Parou abstinência. Volta com: ascite moderada, creatinina 2.8, Na 126, bilirrubina 4.2.
Pergunta: "HRS-AKI? O que você faz agora?"

### CHECKPOINT 3 (após Ato 3 — Reverter)

1 ano após o episódio. Retomou abstinência completa há 10 meses. LSM caiu de 32 para 18 kPa. Sem ascite há 8 meses. Albumina 3.8.
Pergunta: "Ele recompensou? Pode sair da vigilância? Da fila de transplante?"

### FECHAMENTO

Retorno ao caso: "Este paciente podia ter sido interceptado com FIB-4 no clínico geral. Podia ter iniciado carvedilol antes da ascite. E hoje, com abstinência, está recompensando. Os 3 paradigmas salvaram a vida dele."

---

## 📚 Materiais Pré-Classe

### Top 3 Curadoria — Congresso (máx. 30 min)

| # | Recurso | Tempo | Justificativa |
|---|---------|-------|---------------|
| 1 | Villanueva C, Tripathi D, Bosch J. Nat Rev Gastroenterol Hepatol 2025;22(4):265-280. PMID 39870944 | ~15 min | PREDESCI author. Pipeline NITs→CSPH→carvedilol. Tier-1, jan 2025. |
| 2 | Tapper EB, Parikh ND. JAMA 2023;329(18):1589-1602. PMC10843851 | ~12 min | Best didactic review. Tabelas 2-3 = cheat sheet. OA via PMC. |
| 3 | JAMA Clinical Reviews Podcast com E. Tapper (YouTube, 15 min) | 15 min | Conversational takeaways. |

---

## 🔄 Pesquisa Retrógrada Pendente (tier-1, 6/6 meses)

| Período | Status |
|---------|--------|
| Jan 2025 – Fev 2026 | ✅ Via Perplexity (22/fev): 19 estudos novos |
| Set 2024 – Dez 2024 | ☐ Pendente |
| Mar 2024 – Ago 2024 | ☐ Pendente |

---

Exportado do Notion em 25/fev/2026.
