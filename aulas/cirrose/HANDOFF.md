# HANDOFF — Cirrose (projeto)

> Só pendências ativas. Histórico → CHANGELOG.md. Erros → ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Estado atual — 2026-03-08

**Slides:** 28/28 buildados · **Build:** ✅ · **Lint:** ✅

---

## CAMINHO CRÍTICO — Sessão PC

### P0: Produzir RAW_ACT2_V2 completo

O Ato 2 precisa ser reescrito de "lista de tópicos" para "cascata clínica do mesmo paciente".
O repo atual tem 7 slides no Act 2 + CP2. A arquitetura aprovada pelo Lucas tem ~16 slides.

**Briefing consolidado (mobile 08/mar):**

1. Ler nesta ordem: CASE.md → evidence-db.md → narrative.md → _manifest.js → este HANDOFF
2. Produzir RAW_ACT2_V2 com formato estruturado (ver briefing abaixo)
3. Pesquisar TODOS os números mágicos do Ato 2 (trial antigo vs recente vs guideline)
4. Pesquisar rifaximina no Brasil (nome comercial, preço, disponibilidade)
5. Propor 3+ interações que justifiquem HTML/JS em vez de PPTX
6. Entregar texto corrido copiável (sem divisórias markdown que impeçam seleção em bloco)

### Decisões do Lucas (08/mar mobile):

1. **Albumina** = standalone forte, muitos trials, qualidade de evidência é o interessante. Pode ir para apêndice se necessário, MAS tem densidade para main.
2. **Nutrição/sarcopenia** = main deck INCONTESTÁVEL. "O mais esquecido."
3. **Narrativa deve ter números práticos** para uso no dia-a-dia e prova de residência. Exemplos de pouca especificidade (eco com microbolhas) devem ser referenciados no contexto de educação de adultos que gostam de números.
4. **Headlines técnicas**, não jornalísticas. Factual, par-a-par.
5. **Trial antigo vs dado recente** quando isso fortalece a narrativa.
6. **Brasil-real** para rifaximina: marca, preço, alternativas. Rotular como BRAZIL ACCESS SNAPSHOT (não tier 1 clínico).

### Decisões já tomadas (NÃO reabrir sem justificativa forte):

- Ato 2 = cascata do MESMO paciente, não lista de tópicos
- HDA como descompensação do próprio paciente
- Slide de gatilhos de descompensação
- Slide de infecções em cirróticos
- Slide de HDA + tratamento
- Slide de NSBB com EVL menor
- Ascite = primeira grande descompensação
- Toda ascite nova = paracentese ≤12h
- Slide de PBE + profilaxia
- Slide próprio de nutrição/sarcopenia (INCONTESTÁVEL)
- Paciente evolui com EH
- Paciente interna e evolui com HRS-AKI / ACLF
- Slide de ascite refratária
- Slide de TIPS e alternativas no Brasil
- 1 slide cardio + 1 pulmonar SE fortalecerem arco
- Checkpoint final (CP2)
- Pode haver apêndice de sintomas negligenciados

### Formato esperado do RAW_ACT2_V2:

Para cada slide:
- SLIDE_ID, TITLE, HEADLINE
- NARRATIVE_ROLE, PATIENT_EVENT, PRACTICAL_DECISION
- TRIAL_OLD_VS_RECENT
- MAGIC_NUMBERS (value, meaning, source, PMID, tier, note)
- BOX_UPDATE (MELD, Child, tags)
- INTERACTION (se aplicável: goal, trigger, beats, backward, why_not_pptx)
- BRAZIL_ACCESS_SNAPSHOT (se aplicável)
- SPEAKER_INTENT, OPEN_QUESTIONS

Mais: APPENDIX_SLIDES, MAIN_RISKS, OPTIONAL_COMPRESSION_PLAN, WHAT_NEEDS_RESEARCH_TOMORROW

### Seções obrigatórias da resposta executiva:

VERDICT, WHERE I DISAGREE WITH USER, WHERE I DISAGREE WITH CHATGPT COAUTHOR, WHERE USER IS RIGHT, SOURCE OF TRUTH AUDIT, NARRATIVE AUDIT, MAGIC NUMBERS AUDIT, ACT 2 FINAL ORDER, LATERAL BOX RULES, MUST-HAVE INTERACTIONS (min 3), RIFAXIMIN BRAZIL REALITY, WHAT TO CUT/MERGE, P0/P1/P2

---

## P1: Após RAW aprovado

1. Atualizar narrative.md com a nova arquitetura do Ato 2
2. Atualizar CASE.md com os panel states intermediários
3. Atualizar _manifest.js com novos slides
4. Criar HTMLs novos para slides que não existem
5. Verificar 7 PMIDs CANDIDATE via PubMed MCP

## P2: QA

1. Re-rodar qa-engineer com rubrica 13 critérios
2. h2 assertivos decididos (Lucas vê no browser → decide)
3. OKLCH, rename, failsafe fixes

---

## Pendências abertas (herdadas)

- **ERRO-008** — Case panel redundante em s-hook
- ~~**D'Amico estádio 5**~~ — RESOLVIDO: label "Infecção ou AKI" não existe no HTML atual (slide redesenhado com eras)
- 21 referências [TBD] — 7 CANDIDATE, 12 NOT INDEXED (2025-2026)
- CTP interobserver variability — PMID 6546609 ou 16305721
- Pre-commit hook wiring pendente (lint:case-sync + lint:narrative-sync + lint:slides)
- 6 h2 do Act 1 pendentes de decisão do Lucas

---

## Enforcement (implementado)

- lint:case-sync, lint:narrative-sync, lint:slides
- Decision Record protocol para slides narrativeCritical
- 5 slides narrative-critical: s-hook, s-cp1, s-cp2, s-cp3, s-close

---

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.
