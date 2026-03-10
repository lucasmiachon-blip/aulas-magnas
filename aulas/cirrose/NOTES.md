# NOTES — Cirrose

## [04/03] Decisões — D'Amico slide

- Headline (v2): "D'Amico redefiniu o prognóstico da cirrose 3 vezes em 18 anos"
- Terminologia: "Estádio" (estadiamento), não "Estágio" (internship). Verificado: Aurélio, Michaelis, Rezende.
- Estádio 3: "Ascite" (D'Amico 2006 separou ascite de HDA — estádios distintos)
- Badge: "D'Amico 2006 · 118 estudos · mortalidade/ano" acima do pathway-track
- Overlay bg: oklch(45% 0.12 25) OPACO — semi-transparente causava bleed-through
- PMID 16364498 CORRIGIDO → 16298014 (o antigo apontava para artigo de fMRI)
- State machine: busy guard adicionado — impede overlay antes dos cards
- D'Amico 2014 (PMID 24654740): reordenação ascite>HDA (stage 3=bleeding 20%, stage 4=ascites 30%)
- D'Amico 2024 (PMID 37916970): further decomp HR 1.46, NÃO estratifica ascite vs bleeding
- QA 4 estados: s0 (4 estádios), s1 (+estádio 5), s2 (overlay opaco), s3 (source + overlay). Retreat OK.

### Correções pendentes D'Amico
- Estádio 5 label ERRADO: slide diz "Infecção ou AKI" — D'Amico 2014 define como "any second decompensating event"
- Further decompensation NÃO é estádio 6 — D'Amico 2024 usa modelo de transição de 4 estados
- D'Amico 2014 stages reais: 1=compensado sem varizes, 2=com varizes, 3=bleeding, 4=1ª descomp não-bleeding, 5=2º evento (88%/5a)
- Corrigir label estádio 5: "Infecção ou AKI" → "2º evento descompensante"
- Overlay: resolver sobreposição de texto reportada pelo Lucas

---

## [03/03] Reference scan — Conflitos conhecidos

### CONFLITO 1 — BAVENO VII PMIDs (RESOLVIDO)
- **35120736** = artigo original (CORRETO). **35431106** = errata.
- evidence-db.md corrigido para 35120736.

### CONFLITO 2 — CONFIRM PMID (CRÍTICO — CORRIGIDO)
- evidence-db listava PMID **34882432** (artigo de saúde transgênero — ERRADO).
- PMID correto: **33657294** (Wong et al., NEJM 2021, terlipressina HRS).

### CONFLITO 3 — D'Amico 2006 PMID (CORRIGIDO)
- Tier-2 listava **16364498** (fMRI binge eating — ERRADO).
- PMID correto: **16298014** (D'Amico/Garcia-Tsao/Pagliaro, J Hepatol 2006).

### CONFLITO 4 — ANSWER PMID (OK)
- evidence-db usa **29861076** (Caraceni, Lancet 2018) — CORRETO.

### CONFLITO 5 — Caso Antônio etilismo
- Slide visual: 60g/dia (corrigido de 40g/dia em 03/03).
- Notes s-cp1: 60g/dia — consistente agora.

### CONFLITO 6 — CCM fontes divergentes
- evidence-db cita Møller (PMID 11964606). Slide usa Ewid 2025 / Izzy 2020.
- Pendente: validar se Møller ainda é relevante.

---

## [03/03] Referências [TBD] — 21 itens

5 CANDIDATE — **TODOS ERRADOS** (verificados 09/mar via WebSearch):
1. ~~PREDICT (Trebicka) — PMID 32275982~~ → **32673741** (32275982 = ELF test NAFLD)
2. ~~Lens CSPH SVR — PMID 28039099~~ → **RESOLVIDO 08/mar: PMID 32535060**
3. ~~CANONIC (Moreau) — PMID 23562128~~ → **RESOLVIDO 08/mar: PMID 23474284**
4. ~~AASLD ACLF 2024 — PMID 38530940~~ → **37939273** (38530940 = herbicida pyrazole)
5. ~~Turco 2024 NSBB — PMID 38504576~~ → **38108646** (38504576 = belatacept heart TX). Journal: CGH, não Liver Int
6. ~~Izzy 2020 CCC — PMID 31342533~~ → **31342529** (off by 4)
7. ~~D'Amico 2022 NAD vs AD — PMID 34174336~~ → **34157322** (34174336 = fluoxetine neurogenesis)

12 NOT INDEXED (artigos 2025-2026): Mahmud ACG 2025, AGA 2025 Orman, Kuo 2025 AMR, Hofer/Reiberger 2026, EASL HCC 2025, Ewid 2025 CCM, Skouloudi 2023 GLS, Verstraeten 2025, DuBrock ILTS 2025, Alvarado-Tapias 2025, Pose JAMA 2025, Puente 2025 CIRROXABAN.

2 especiais: PPI HR 1,75 PBE (FONTE NÃO IDENTIFICADA — escalar para Lucas), ~~Tonon 2025~~ → **RESOLVIDO: PMID 40228583**.

---

## [04/03] Interações avançadas Act 1

- **s-a1-01 (Burden)**: state machine 3 estados — hero countUp → iceberg bars → source
- **s-a1-damico**: state machine 4 estados — 4 stages → 5º bloco → overlay → source
- **~~s-a1-02~~ → s-a1-baveno + s-a1-rule5**: mega-slide eliminado e distribuído (05/mar)
- Padrão: `__hookAdvance` / `__hookRetreat`, SplitText importado
- Failsafe: .no-js, .stage-bad, @media print — tudo visível

### Feedback do usuário (pendente)
1. D'Amico: enfatizar que o sistema evoluiu ao longo dos estudos dele
2. D'Amico: ascite pior que bleeding — conceito novo D'Amico 2024
3. FIB-4 calculadora (sessão futura)
4. Paradigma slide — conteúdo OK, ordem OK
5. Próxima fase: conteúdo, ordem, ajustes CSS

---

## [07/03] Decisões narrativas Act 1 — Lucas (mobile)

### Arco narrativo Act 1

| Pos | Slide | h2 / tema | Status |
|-----|-------|-----------|--------|
| 1 | s-a1-01 (burden) | mantém | ✅ |
| 2 | s-a1-damico | "A evolução do prognóstico" | ⚠ rótulo → propor assertivo |
| 3 | s-a1-fib4 | FIB-4 e modelos não-invasivos | ⚠ precisa h2 assertivo |
| 4 | ?? | idem (continuação FIB-4) | ❓ qual slide? |
| 5 | s-a1-rule5 | Rule of 5 e elastografia | ⚠ precisa h2 assertivo |
| novo | ?? | Novo paradigma: cACLD/dACLD | ❓ slide existente ou novo? |
| último | s-a1-meld | "MELD e Child ainda são portos seguros" | ⚠ assertividade |

### Diretriz de tom (Lucas)
- NÃO manchete sensacionalista — público especialista
- h2 = afirmação factual, par-a-par, linguagem técnica seca
- Lucas quer ver slides rodando antes de decidir h2

### Pendências para sessão com computador
1. Lucas ver slides no browser → decidir h2
2. Resolver "4 idem" — qual slide?
3. "Novo paradigma" — baveno existente ou criar?
4. Aplicar h2 nos HTMLs + rebuild + lint
5. s-a1-classify — onde fica no arco?

---

## [03/03] IDEIA — Convergência-Divergência (pós-MVP)
- Comparação UpToDate vs BMJ Best Practice vs DynaMed
- Material de estudo, NÃO slide. Promover só se Lucas decidir.

---

## [08/03] AI Disclosure — Pesquisa

ICMJE, COPE, JAMA, NEJM, Lancet: **AI não pode ser autor/coautor.**
Disclosure obrigatório em Acknowledgments (final), nunca na linha de autoria.
Detalhes: ver `references/coautoria.md` (renomeado para AI Disclosure).

*Agent logs 08/mar removidos (machine noise — ver git history se necessário)*

---

## [09/03] Sessão — PMID audit + RAW_ACT3_V1

### Decisões
- **BB/NSBB toggle restaurado** como 5ª interação do Act 2 (A2-07). Lucas decidiu Opção A.
- **PPI HR [TBD]** em s-a1-infeccao notes: fonte não identificada. OR 2,17 tem PMID 26214428, mas HR específico não tem paper. Escalar para Lucas.

### Descobertas críticas
- **5/5 CANDIDATE PMIDs estavam ERRADOS.** Todos produzidos por modelo sem verificação MCP. Lição: NUNCA confiar em PMID de modelo sem verificação via PubMed/WebSearch.
- evidence-db.md atualizado com PMIDs corretos + notas de verificação.

### Produzido
- `RAW_ACT3_V1.md` — 7 slides, 7/9 PMIDs verificados
- HANDOFF, CHANGELOG, NOTES atualizados

[2026-03-09 19:05] [BUILD] OK — cd "C:/Dev/Projetos/aulas-magnas" && npm run build:cirrose 2>&1 | tail -3 && npm run lint:slides 2>&1 | tail -3

[2026-03-09 19:20] [:a7ad0720] — concluído. Status: PARTIAL

[2026-03-09 19:29] [Explore:abec8cd0] — concluído. Status: PARTIAL

[2026-03-09 19:30] [Explore:a4919555] — concluído. Status: PARTIAL

[2026-03-09 19:31] [Explore:afc61735] — concluído. Status: PASS

[2026-03-09 19:48] [BUILD] OK — npm run build:cirrose 2>&1

[2026-03-09 20:19] [BUILD] OK — cat aulas/cirrose/scripts/build-html.ps1

[2026-03-09 20:20] [Explore:a13ac022] — concluído. Status: PASS

[2026-03-09 20:21] [Explore:a24e030b] — concluído. Status: PARTIAL

[2026-03-09 20:21] [Explore:ab94c9c4] — concluído. Status: PASS

[2026-03-09 20:30] [:a98328fe] — concluído. Status: PARTIAL

[2026-03-09 20:32] [BUILD] OK — npm run build:cirrose 2>&1

[2026-03-09 20:50] [BUILD] OK — npm run build:cirrose 2>&1

[2026-03-09 20:57] [BUILD] OK — npm run build:cirrose 2>&1 | tail -10

[2026-03-09 21:05] [BUILD] OK — cd "C:/Dev/Projetos/aulas-magnas" && npm run build:cirrose 2>&1 | tail -5 && npm run lint:slides 2>&1 | tail -5

[2026-03-09 21:22] [:abe9ab0a] — concluído. Status: PARTIAL

[2026-03-09 21:27] [BUILD] OK — cd "C:/Dev/Projetos/aulas-magnas" && npm run build:cirrose 2>&1 | tail -5

[2026-03-09 21:27] [BUILD] OK — cd "C:/Dev/Projetos/aulas-magnas" && npm run build:cirrose 2>&1

[2026-03-09 21:28] [BUILD] OK — cd "C:/Dev/Projetos/aulas-magnas" && npm run build:cirrose 2>&1 && npm run lint:slides 2>&1

[2026-03-09 21:48] [BUILD] OK — cd "C:/Dev/Projetos/aulas-magnas" && npm run build:cirrose 2>&1

[2026-03-09 21:55] [:abce5a3d] — concluído. Status: PARTIAL
