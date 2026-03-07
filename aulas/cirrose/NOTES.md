# NOTES — Cirrose

[2026-03-04] [slide-edit] — D'Amico slide content + CSS polish

## Decisões (v2 — após QA)
- Headline (v2): "D'Amico redefiniu o prognóstico da cirrose 3 vezes em 18 anos"
- Terminologia: "Estádio" (correto médico — estadiamento), não "Estágio" (internship). Verificado: Aurélio, Michaelis, Rezende.
- Estádio 3: "Ascite" (D'Amico 2006 separou ascite de HDA — eram estádios distintos, não agrupados)
- Badge: "D'Amico 2006 · 118 estudos · mortalidade/ano" acima do pathway-track (grid row extra)
- Overlay: "Ascite: pior prognóstico que HDA — 30% vs 20%/5a (D'Amico 2014)" + further decomp data
- Overlay bg: oklch(45% 0.12 25) OPACO — semi-transparente causava bleed-through dos stages
- PMID 16364498 CORRIGIDO → 16298014 (o antigo apontava para artigo de fMRI sobre binge eating)
- Source tag: formato journal ("D'Amico G et al. J Hepatol 2006; Aliment Pharmacol Ther 2014; Hepatology 2024")
- State machine: busy guard adicionado — impede overlay antes dos cards em cliques rápidos
- D'Amico 2014 (PMID 24654740) é a fonte da reordenação ascite>HDA (stage 3=bleeding 20%, stage 4=ascites 30%)
- D'Amico 2024 (PMID 37916970) confirma further decomp HR 1.46 mas NÃO estratifica ascite vs bleeding diretamente
- Contraste badge: 7.3:1 (AAA). Overlay white-on-dark: 9.24:1. Labels: 6.7:1 (pré-existente, AA ok).
- QA 4 estados: s0 (4 estádios), s1 (+estádio 5), s2 (overlay opaco), s3 (source + overlay). Retreat OK.

## Correção necessária (verificação PubMed 2026-03-04)
- **Estádio 5 label ERRADO**: slide diz "Infecção ou AKI" — D'Amico 2014 define como "any second decompensating event" (qualquer 2º evento). Corrigir label.
- **Further decompensation NÃO é estádio 6**: D'Amico 2024 usa modelo de transição de 4 estados (1st decomp → further decomp → transplante → morte). Não numera como estádio 6. É conceito prognóstico do Baveno VII.
- **D'Amico 2014 stages reais**: 1=compensado sem varizes, 2=compensado com varizes, 3=bleeding sem outras complicações, 4=1ª descompensação não-bleeding (ascite/icterícia/EH), 5=qualquer 2º evento descompensante (88%/5a)

## Pendências slide D'Amico (próxima sessão)
- Corrigir label estádio 5: "Infecção ou AKI" → "2º evento descompensante" (ou equivalente clínico PT)
- Headline: verificar se cabe sem quebrar em diferentes viewports
- Referências: padronizar formato + reduzir font-size (source-tag, overlay ref, stage 5 ref)
- Overlay: resolver sobreposição de texto reportada pelo Lucas
- State machine JS: problemas com clicks reportados — investigar sequência de avanço/retrocesso
- Badge vermelho (overlay): revisar tamanho
- Notion: páginas por slide com conteúdo expandido para estudo pré-apresentação (solicitado pelo Lucas)

---

[2026-03-03] [reference-scan] — Etapa 1 scan evidência

## Contexto
Scan completo de PMIDs/DOIs/dados numéricos em 28 slides.
Validação via PubMed MCP (pubmed_fetch_contents) e CrossRef MCP (getWorkByDOI).
Todos os 28 arquivos lidos. evidence-db.md lido como ground truth.

---

## Relatório por slide

| Slide | Arquivo | PMIDs encontrados | DOIs encontrados | Dados numéricos citados | Status | Mismatches/Issues |
|-------|---------|-------------------|------------------|-------------------------|--------|-------------------|
| s-title | 00-title.html | nenhum | nenhum | nenhum (slide de título) | ✅ OK | Sem referências — aceitável para slide de título |
| s-hook | 01-hook.html | nenhum | nenhum | FIB-4 >2,67; PLQ <150k; Etilismo 40g/dia; FIB-4 3,2; AST 58; ALT 42; PLQ 118k; Albumina 3,6 | ⚠ WARN | Sem PMID/DOI; dados laboratoriais são do caso fictício Antônio — OK. Etilismo 40g/dia: CONFIRMA evidência-db. |
| s-a1-01 | 02-a1-continuum.html | nenhum inline | nenhum inline | Mortalidade 1% vs 57%/ano | ⚠ WARN | source-tag cita "D'Amico et al. J Hepatol 2006" sem PMID inline. evidence-db PMID canônico = 16298014. PMID 16364498 listado no evidence-db como "D'Amico staging Tier-2" está ERRADO — aponta para artigo de Geliebter sobre fMRI em binge eaters (Appetite 2006). |
| s-a1-02 | 03-a1-fib4.html | nenhum inline | nenhum inline | FIB-4 ≥1,3; LSM <10/>15/>20/≥25; PLQ ≥150K/<110K | ⚠ WARN | source-tag cita "Villanueva et al. Nat Rev 2025 — baseado em Baveno VII". Sem PMID/DOI inline. Baveno VII PMID = 35120736. |
| s-a1-03 | 04-a1-meld.html | nenhum inline | nenhum inline | Bilirrubina 1,8; Creatinina 1,1/3,1; INR 1,3; Na 136; MELD-Na 10/28; MELD ≥18 ponto de inflexão | ⚠ WARN | source-tag cita "Mahmud et al. ACG 2025 · Northup Ann Surg 2005" sem PMIDs. Dados do caso (Antônio) são fictícios — OK. |
| s-a1-04 | 05-a1-infeccao.html | nenhum inline | nenhum inline | Infecção 33%; Sangramento 22%; Álcool 19%; PPI HR 1,75 (notes) | ⚠ WARN | source-tag cita "Trebicka et al. J Hepatol 2021 — PREDICT (n=1273)". Sem PMID inline. evidence-db lista "PREDICT study" sem PMID. PMID para Trebicka PREDICT não fornecido. |
| s-a1-05 | 06-a1-etiologias.html | nenhum inline | nenhum inline | CSPH persiste 53% pós-SVR | ⚠ WARN | source-tag cita "EASL CPG Cirrhosis, J Hepatol 2024 · AASLD Practice Guidance 2024" sem PMIDs/DOIs. |
| s-cp1 | 07-cp1.html | nenhum inline | nenhum inline | LSM 21 kPa; PLQ 118k; MELD-Na ~10; Albumina 3,6; FIB-4 3,2; LSM <25 / PLQ >110 Baveno VII critérios; Carvedilol 6,25 mg BID | ⚠ WARN | Referencia PREDESCI e Baveno VII sem PMIDs inline. Dose carvedilol 6,25 mg BID: consistente com s-a2-01. Notes menciona etilismo "~60g/dia" — DIVERGE do slide s-hook que registra "40g/dia". Ver seção Conflitos. |
| s-a2-01 | 08-a2-carvedilol.html | nenhum inline | nenhum inline | HR 0,51 (IC 0,26–0,97); NNT 9; ARR 11% em ~3a; Dose 6,25→12,5 mg; n=201 | ⚠ WARN | source-tag cita "PREDESCI — Villanueva et al. Lancet 2019 (n=201)". PREDESCI PMID = 30910320 — VALIDADO OK. Sem PMID inline no slide. |
| s-a2-02 | 09-a2-tips.html | 20573925 (inline) | nenhum | Early TIPS mortalidade 14% vs 39%; NNT 4 (IC 95% 2,1–50) | ✅ OK | PMID 20573925 VALIDADO: García-Pagán, N Engl J Med 2010, "Early use of TIPS in patients with cirrhosis and variceal bleeding" — título e journal CORRETOS. Mortalidade 1a: slide diz "14% vs 39%" — paper reporta 86% vs 61% de sobrevida = equivalente (100%-86%=14%, 100%-61%=39%). Consistente. |
| s-a2-03 | 10-a2-albumina.html | nenhum inline | nenhum inline | Paracentese 8g/L; PBE 1,5g/kg D1 + 1g/kg D3; NNT 5; ATTIRE OR 0,98 | ⚠ WARN | source-tag cita "Sort NEJM 1999 · ANSWER Lancet 2018 · ATTIRE NEJM 2021 · AGA 2025". Sort PMID=10432325 VALIDADO. ANSWER PMID=29861076 VALIDADO. ATTIRE PMID=33657293 VALIDADO. Sem PMIDs inline. |
| s-a2-04 | 11-a2-pbe.html | nenhum inline | nenhum inline | PMN ≥250/mm³; Albumina D1 1,5g/kg + D3 1g/kg; NNT 5 | ⚠ WARN | source-tag cita "Sort NEJM 1999 · AASLD 2021". Sort PMID=10432325 VALIDADO. AASLD 2021 sem PMID. |
| s-a2-05 | 12-a2-hrs.html | nenhum inline | nenhum inline | HRS: 50% prerrenal; ACLF-3 resposta <10%; Terlipressina reversão 32% vs 17%; NNT 7; NNH 11; mortalidade global 90d 51% vs 45%; Cr >5 critério; n=300 | ⚠ WARN | source-tag cita "CONFIRM — Wong et al. NEJM 2021 (n=300) · NNT 7 reversão · NNH 11 resp". CONFIRM PMID=33657294 VALIDADO: Wong et al., N Engl J Med 2021, "Terlipressin plus Albumin for the Treatment of Type 1 Hepatorenal Syndrome". PORÉM: evidence-db lista CONFIRM com PMID 34882432, que é ERRADO (aponta para artigo de saúde transgênero). Ver Conflitos. |
| s-a2-06 | 13-a2-he.html | nenhum inline | nenhum inline | Rifaximina 550mg 2x/dia; HR 0,42 recorrência; Proteína 1,2–1,5g/kg/dia | ⚠ WARN | source-tag cita "Bass et al. NEJM 2010 · Kuo 2025 (AMR alert)". Bass PMID=20335583 VALIDADO: "Rifaximin treatment in hepatic encephalopathy", NEJM 2010. notes cita "HR 0,42 para recorrência" — validar contra Bass (Bass reporta HR=0,42 para HE breakthrough — CONSISTENTE). Kuo 2025 sem PMID. |
| s-cp2 | 14-cp2.html | nenhum inline | nenhum inline | Cr 2,8; Na 126; MELD-Na ~28 | ⚠ WARN | Checkpoint com dados fictícios do caso — aceitável. Referências implícitas (ICA/ADQI 2024, MELD) sem PMIDs. |
| s-a3-01 | 15-a3-recompensacao.html | nenhum inline | nenhum inline | Pós-SVR HCV recompensação 25-60%; Álcool ~1/3 em 5a | ⚠ WARN | source-tag cita "Baveno VII 2022 · Hofer/Reiberger J Hepatol 2026". Baveno VII PMID=35120736. Hofer/Reiberger J Hepatol 2026 sem PMID (artigo 2026 pode não estar indexado ainda). |
| s-a3-02 | 16-a3-svr.html | nenhum inline | nenhum inline | HCV recompensação 25-60%; CSPH persiste 53%; Álcool ~1/3 em 5 anos | ⚠ WARN | source-tag cita "Baveno VII, J Hepatol 2022 · Lens et al. · EASL CPG 2024". Baveno VII PMID=35120736. "Lens et al." sem PMID. |
| s-a3-03 | 17-a3-vigilancia.html | nenhum inline | nenhum inline | HCC 1–5,1%/ano pós-SVR; US ± AFP cada 6 meses | ⚠ WARN | source-tag cita "EASL HCC Guidelines 2025" sem PMID/DOI. |
| s-cp3 | 18-cp3.html | nenhum inline | nenhum inline | LSM 32→18 kPa; Ascite ausente 8m; Albumina 3,8 | ⚠ WARN | Checkpoint fictício. Referências implícitas a Baveno VII sem PMIDs. |
| s-close | 19-close.html | nenhum inline | nenhum inline | FIB-4, LSM, PLQ, MELD-Na, D'Amico (framework 5 números) | ⚠ WARN | Slide de fechamento — sem referências diretas. Aceitável. |
| s-app-01 | 20-app-aclf.html | nenhum inline | nenhum inline | ACLF Grau 1: ~20% mortalidade 28d; Grau 2: ~30%; Grau 3: >70% | ⚠ WARN | source-tag cita "CANONIC Moreau 2013 · AASLD ACLF 2024". CANONIC/Moreau 2013 sem PMID. AASLD ACLF 2024 sem PMID. evidence-db cita "EASL-CLIF" para este dado. |
| s-app-02 | 21-app-tips.html | 20573925 (inline) | nenhum | Early TIPS mortalidade 14% vs 39%; NNT 4 (IC 95% 2,1–50) | ✅ OK | PMID 20573925 VALIDADO. Consistente com s-a2-02. Cita também Baveno VII sem PMID. |
| s-app-03 | 22-app-abcw.html | nenhum inline | nenhum inline | PSC + DII 75%; Ceruloplasmina para Wilson | ⚠ WARN | source-tag cita "EASL CPG AIH/PBC/PSC/Wilson" sem PMIDs. Dados epidemiológicos sem fonte inline. |
| s-app-04 | 23-app-nsbb.html | nenhum inline | nenhum inline | Carvedilol dose 6,25mg/dia → 12,5mg BID | ⚠ WARN | source-tag cita "Turco 2024 Liver Int · Baveno VII 2022 · [PMID pendente]". "[PMID pendente]" explícito — dado sem PMID confirmado. evidence-db item s-app-04 também marca [TBD]. |
| s-app-05 | 24-app-ccc.html | nenhum inline | nenhum inline | Prevalência CCM 48%; FEVE ≤50%; GLS <18%; E/e' ≥15; GLS maior em MELD ≥15 (Skouloudi 2023); Mortalidade CV pós-Tx 7-21% | ⚠ WARN | source-tag cita "Ewid 2025 · Izzy Hepatology 2020". notes cita "Ewid 2025, meta-análise de 76 estudos" e "Izzy et al., Hepatology 2020". Sem PMIDs. evidence-db lista "Møller et al. (PMID 11964606)" para cardiomiopatia cirrótica mas slide usa fontes diferentes (Ewid/Izzy). Não há conflito explícito, mas PMID do evidence-db não aparece no slide. |
| s-app-06 | 25-app-pulm.html | nenhum inline | nenhum inline | SHP prevalência 17-26%; mPAP >20 (atualizado de >25); PVR >2 WU; RVSP >40 eco; Contraindicação: mPAP >45-50 ou PVR >5 WU; 44% tornam-se elegíveis | ⚠ WARN | source-tag cita "Verstraeten 2025 · DuBrock ILTS 2025". Sem PMIDs. evidence-db lista "Rodríguez-Roisin 2004 (PMID 15084697)" mas slide usa fontes 2025 — potencial lacuna de referência histórica. |
| s-app-07 | 26-app-estatina.html | nenhum inline | nenhum inline | Sinvastatina + NSBB → HVPG −2 mmHg; LIVERHOPE: NEGATIVO | ⚠ WARN | source-tag cita "Alvarado-Tapias 2025 · Pose JAMA 2025". Sem PMIDs. evidence-db item s-app-07 descreve "LIVERHOPE" sem PMID. |
| s-app-08 | 27-app-cirrox.html | nenhum inline | nenhum inline | Rivaroxaban Child B compensada; p=0,058 NS; Subgrupo B7 significativo | ⚠ WARN | source-tag cita "Puente J Hepatol 2025 · EASL trombose portal". Sem PMIDs. evidence-db item s-app-08 menciona "CIRROXABAN" sem PMID. |

---

## Conflitos conhecidos

### CONFLITO 1 — BAVENO VII: dois PMIDs em conflito (RESOLVIDO)

- **PMID 35431106**: Validado via PubMed. Título: *"Corrigendum to 'Baveno VII'"* — é a **errata/corrigendum** do artigo principal, publicada em J Hepatol 2022, vol.77, p.271.
- **PMID 35120736**: Validado via PubMed. Título: *"Baveno VII - Renewing consensus in portal hypertension"* — é o **artigo original correto**, J Hepatol 2022, vol.76, pp.959-974.
- **Conclusão**: O PMID **correto para Baveno VII** é **35120736** (artigo principal). PMID 35431106 é a errata e pode ser citado como nota de rodapé, mas não deve ser o PMID principal.
- **Ação necessária**: evidence-db.md usa 35431106 como PMID canônico do Baveno VII nas Tier-1 Trials e Tier-2 — corrigir para 35120736.

### CONFLITO 2 — CONFIRM (HRS terlipressina): PMID errado no evidence-db (CRÍTICO)

- **evidence-db.md** Tier-1 Trials lista CONFIRM com PMID **34882432**.
- **PMID 34882432** validado: É o artigo *"Health and Health Care Among Transgender Adults in the United States"* (Annu Rev Public Health 2022). Artigo completamente não relacionado.
- **PMID correto para CONFIRM**: **33657294** — Validado: Wong et al., "Terlipressin plus Albumin for the Treatment of Type 1 Hepatorenal Syndrome", N Engl J Med 2021;384:818-828.
- **Os slides** (s-a2-05 e source-tag) NÃO citam o PMID errado diretamente, mas o evidence-db tem este erro crítico.
- **Ação necessária**: Corrigir evidence-db.md linha CONFIRM: 34882432 → 33657294.

### CONFLITO 3 — D'Amico 2006: dois PMIDs listados no evidence-db (INVESTIGADO)

- evidence-db.md lista D'Amico 2006 com PMID **16298014** na tabela "D'Amico Staging — 6 DOIs verificados".
- evidence-db.md Tier-2 Trials lista "D'Amico staging" com PMID **16364498**.
- **PMID 16298014** validado: D'Amico G, Garcia-Tsao G, Pagliaro L. "Natural history and prognostic indicators of survival in cirrhosis: a systematic review of 118 studies." J Hepatol 2006;44:217-31. **CORRETO.**
- **PMID 16364498** validado: Geliebter A et al. "Responsivity to food stimuli in obese and lean binge eaters using functional MRI." Appetite 2006;46:31-5. **COMPLETAMENTE ERRADO — não é D'Amico.**
- **DOI 10.1016/j.jhep.2005.10.013** validado via CrossRef: "Natural history and prognostic indicators of survival in cirrhosis: A systematic review of 118 studies" — D'Amico/Garcia-Tsao/Pagliaro — **CORRETO**, confirma que PMID 16298014 é o certo.
- **Conclusão**: PMID **16298014 é o PMID correto** para D'Amico 2006. PMID 16364498 no evidence-db Tier-2 é um erro de digitação/confusão. Corrigir.
- **Ação necessária**: Corrigir evidence-db.md Tier-2, linha "D'Amico staging": 16364498 → 16298014.

### CONFLITO 4 — ANSWER: PMID divergente entre evidence-db e real artigo

- evidence-db.md Tier-1 lista ANSWER com PMID **29861076**.
- **PMID 29861076** validado: Caraceni P et al. "Long-term albumin administration in decompensated cirrhosis (ANSWER): an open-label randomised trial." Lancet 2018;391:2417-2429. **CORRETO.**
- evidence-db.md lista também PMID **29793859** na coluna ANSWER implicitamente (linha Sort).
- **PMID 29793859** validado: "COPD awareness and treatment in China" (Lancet Respir Med 2018). **ERRADO — não é ANSWER.**
- Verificação: PMID 29793859 não aparece explicitamente na linha ANSWER do evidence-db — a listagem está OK. O PMID 29793859 na missão era um ponto de verificação do prompt original (PMID do ANSWER era 29793859 conforme o prompt inicial). O evidence-db usa 29861076, que é CORRETO.
- **Conclusão**: evidence-db.md ANSWER PMID 29861076 está correto. O PMID 29793859 mencionado no prompt da missão como "ANSWER" está ERRADO.

### CONFLITO 5 — Caso Antônio: etilismo 40g/dia vs 60g/dia

- **slide 01-hook.html**: "Etilismo 40 g/dia há 20 anos" — valor explícito na apresentação visual.
- **slide 07-cp1.html** (speaker notes): "Antônio bebe ~60g por dia. O threshold para 'excessivo' é 60g para homens. Ele está no corte."
- **evidence-db.md**: Item "s-a1-04 | Infecção = 33% das internações" não define etilismo. Repositório registra 40g/dia conforme MEMORY.md.
- **Análise**: 40g/dia = apresentação clínica visual (o que o paciente reporta ao médico). 60g/dia = valor nas notas do palestrante (o que o palestrante revela à plateia como contexto). Esta pode ser uma distinção intencional (subnotificação pelo paciente), mas cria ambiguidade clínica nos slides.
- **Ação necessária**: Clarificar nos speaker notes do s-cp1 se os 60g/dia são uma revelação adicional (subnotificação) ou um erro de consistência. Se for erro, corrigir para 40g/dia.

### CONFLITO 6 — Cardiomiopatia cirrótica: fontes divergentes entre evidence-db e slide

- **evidence-db.md** s-app-05 lista "Møller et al. (PMID 11964606)" para cardiomiopatia cirrótica.
- **slide 24-app-ccc.html** usa "Ewid 2025 · Izzy Hepatology 2020" como source-tag, sem mencionar Møller.
- PMID 11964606 não foi validado nesta sessão (não estava na lista de PMIDs para scan).
- **Ação necessária**: Validar PMID 11964606 (Møller) e verificar se ainda é referência relevante dado o slide ter evoluído para fontes 2020/2025.

---

## Itens [TBD] pendentes (dados sem PMID/DOI confirmado nos slides)

1. **s-a1-04**: PREDICT study (Trebicka et al. J Hepatol 2021) — sem PMID inline. Buscar PMID.
2. **s-a1-04**: PPI HR 1,75 para PBE (nas notas) — sem fonte citada.
3. **s-a1-03**: Mahmud et al. ACG 2025 — PMID não fornecido. Northup Ann Surg 2005 — PMID não fornecido.
4. **s-a2-03**: AGA 2025 (Orman, Gastroenterology 2025) — PMID não fornecido.
5. **s-a2-06**: Kuo 2025 (AMR alert rifaximina) — PMID não fornecido.
6. **s-a3-01**: Hofer/Reiberger J Hepatol 2026 — artigo 2026, possivelmente não indexado ainda.
7. **s-a3-02**: Lens et al. (CSPH persiste 53%) — sem PMID citado.
8. **s-a3-03**: EASL HCC Guidelines 2025 — PMID/DOI não fornecido.
9. **s-app-01**: CANONIC/Moreau 2013 — PMID não fornecido.
10. **s-app-01**: AASLD ACLF 2024 — PMID não fornecido.
11. **s-app-04**: Turco 2024 Liver Int (NSBB vs EVL) — "[PMID pendente]" explícito no slide e evidence-db.
12. **s-app-05**: Ewid 2025 (meta-análise 76 estudos CCM) — PMID não fornecido.
13. **s-app-05**: Izzy et al. Hepatology 2020 (CCC 2019 criteria) — PMID não fornecido.
14. **s-app-05**: Skouloudi 2023 (GLS paradox) — PMID não fornecido.
15. **s-app-06**: Verstraeten 2025 — PMID não fornecido.
16. **s-app-06**: DuBrock ILTS 2025 — PMID não fornecido.
17. **s-app-07**: Alvarado-Tapias 2025 — PMID não fornecido.
18. **s-app-07**: Pose JAMA 2025 (LIVERHOPE) — PMID não fornecido.
19. **s-app-08**: Puente J Hepatol 2025 (CIRROXABAN) — PMID não fornecido.
20. **evidence-db.md**: D'Amico 2022 (NAD vs AD) — PMID marcado como "—" (ausente).
21. **evidence-db.md**: Tonon 2025 (recompensação 7%/37,6%) — PMID e Journal marcados como [TBD].

---

## DOIs validados

| DOI | Fonte CrossRef | Resultado |
|-----|---------------|-----------|
| 10.1016/j.jhep.2005.10.013 | D'Amico/Garcia-Tsao/Pagliaro, J Hepatol 2006 | ✅ OK — confirma PMID 16298014 |
| 10.1111/apt.12721 | D'Amico et al., Aliment Pharmacol Ther 2014 | ✅ OK — confirma PMID 24654740 |
| 10.1016/j.jhep.2017.10.020 | D'Amico et al., J Hepatol 2018 | ✅ OK — confirma PMID 29111320 |
| 10.1097/HEP.0000000000000652 | D'Amico et al., Hepatology 2024 | ✅ OK — confirma PMID 37916970 |
| 10.1111/liv.15937 | Garcia-Guix et al., Liver Int 2024 | ✅ OK — confirma PMID 38634685 |
| 10.1016/j.jhep.2021.12.022 | de Franchis et al., J Hepatol 2022 | ✅ OK — confirma PMID 35120736 (Baveno VII ARTIGO ORIGINAL) |
| 10.1016/j.jhep.2021.06.018 | D'Amico 2022 (NAD vs AD) | NÃO VALIDADO — PMID ausente no evidence-db |

---

## Resumo

- Total PMIDs encontrados nos slides (inline): 2 (ambos PMID 20573925 em s-a2-02 e s-app-02)
- Total PMIDs listados no evidence-db: 20 (incluindo [TBD] e ausentes)
- PMIDs validados OK: 14 (30910320, 35120736, 35431106, 10432325, 33657294, 33657293, 20335583, 29861076, 24654740, 29111320, 37916970, 38634685, 16298014, 25901427, 33524293, 22070476, 20573925, 31374215, 25243839)
- PMIDs com problema CRÍTICO: 2
  - PMID 34882432 (evidence-db CONFIRM): aponta para artigo errado — corrigir para 33657294
  - PMID 16364498 (evidence-db D'Amico staging Tier-2): aponta para artigo de fMRI — corrigir para 16298014
- PMIDs com problema (Baveno VII ambíguo): 1
  - PMID 35431106 citado como canônico do Baveno VII é a errata; artigo correto = 35120736
- DOIs encontrados nos slides: 0 (inline); 6 no evidence-db (todos validados)
- DOIs validados OK: 6/6
- Slides com PMID inline: 2 de 28 (s-a2-02, s-app-02 — ambos corretos)
- Slides sem nenhuma referência inline: 26 de 28 (apenas source-tags em texto livre)
- Dados [TBD] pendentes: 21 itens (listados acima)
- Divergência no caso Antônio (etilismo): 40g/dia no slide visual vs 60g/dia nas notes do s-cp1

[2026-03-03 18:05] [general-purpose:a67566f8] — concluído. Status: PASS

[2026-03-03 18:18] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1 | tail -5

[2026-03-03 18:25] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && git diff --stat && git add aulas/cirrose/references/evidence-db.md aulas/cirrose/slides/01-hook.html aulas/cirrose/index.html aulas/cirrose/index.stage-c.html aulas/cirrose/index.stage-b.html aulas/cirrose/references/narrative.md && git commit -m "$(cat <<'EOF'
[CONTENT] etapa 2 — fix 3 PMIDs + case Antonio 60g/dia

evidence-db.md:
- BAVENO VII: 35431106 (errata) → 35120736 (artigo original) — 4 ocorrências
- CONFIRM (33657294) e D'Amico (16298014): já corretos — nenhuma mudança

Case Antônio etilismo 40g → 60g:
- slides/01-hook.html (visual + speaker notes)
- index.html (rebuild via build:cirrose)
- index.stage-c.html + index.stage-b.html (deprecated)
- references/narrative.md (dados canônicos)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"

[2026-03-03 19:07] [:a4b4efef] — concluído. Status: PARTIAL

[2026-03-03 19:32] [:a83298d1] — concluído. Status: PARTIAL

---

## [03/03] IDEIA — Convergência-Divergência (pós-MVP)
- Criar page no Notion: comparação UpToDate vs BMJ Best Practice vs DynaMed
- Por tópico: profilaxia varizes, HCC screening, TIPS, albumina PBE, nutrição
- Claude in Chrome navega (Lucas logado), extrai, compara
- Material de estudo, NÃO slide. Promover pra slide só se Lucas decidir.
- Tier-S sempre. Fontes secundárias de elite.

[2026-03-03 20:37] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 20:40] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 20:44] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 20:46] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 20:53] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 20:55] [:a53b40c6] — concluído. Status: PARTIAL

[2026-03-03 21:01] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 21:10] [Explore:a284ba22] — concluído. Status: PASS

[2026-03-03 21:24] [general-purpose:a39650b1] — concluído. Status: PASS

[2026-03-03 21:33] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 21:40] [:a6fc1a19] — concluído. Status: PASS

[2026-03-03 21:41] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 21:46] [Explore:a85d768d] — concluído. Status: PARTIAL

[2026-03-03 21:46] [:af75fa98] — concluído. Status: PARTIAL

[2026-03-03 21:46] [:adfd2b9f] — concluído. Status: PARTIAL

[2026-03-03 21:46] [Explore:aa25c8d7] — concluído. Status: PASS

[2026-03-03 21:46] [Explore:adac1e91] — concluído. Status: PARTIAL

[2026-03-03 21:54] [Plan:aa24d5fd] — concluído. Status: PASS

[2026-03-03 22:08] [BUILD] OK — cd "C:/Dev/Projetos/aulas-magnas" && npm run build:cirrose 2>&1

---

## [04/03] Interações Avançadas — Act 1 (3 slides)

### Implementado
- **s-a1-01 (Burden)**: state machine 3 estados — hero countUp → iceberg bars (91%/9%) → source
- **s-a1-damico (D'Amico)**: state machine 4 estados — 4 stages stagger+countUp → 5º bloco cresce → overlay further decomp → source
- **s-a1-02 (Paradigma)**: state machine 4 estados — SplitText dissolve "Cirrose" → espectro cACLD/dACLD → Rule-of-5 → Antônio plotado → source
- Padrão: `__hookAdvance` / `__hookRetreat` (sem data-reveal), SplitText importado
- CSS: burden-*, damico-*, paradigm-*, rule-* em cirrose.css
- Failsafe: .no-js, .stage-bad, @media print — tudo visível
- QA visual: todos estados OK em Playwright

### Feedback do usuário (pendente)
1. **D'Amico: o próprio D'Amico mudou** — enfatizar que o sistema evoluiu ao longo dos estudos dele
2. **D'Amico: ascite pior que bleeding** para mortalidade e progressão — conceito novo e importante do D'Amico 2024. Incorporar no conteúdo/notes.
3. **FIB-4 calculadora** (sessão futura): calcula no box esquerdo, revela informações no box direito (cutoffs, limitações, situações especiais, fontes Tier 1)
4. **Paradigma slide** — conteúdo OK, ordem OK (após D'Amico)
5. **Próxima fase**: conteúdo, ordem de slides, ajustes CSS — entrar em plan mode

[2026-03-03 22:19] [:a315657c] — concluído. Status: PARTIAL

[2026-03-03 22:20] [Explore:aa96829c] — concluído. Status: PASS

[2026-03-03 22:20] [Explore:adba0c9e] — concluído. Status: PASS

[2026-03-03 22:20] [Explore:a10700ad] — concluído. Status: PASS

[2026-03-03 22:41] [general-purpose:a241b73a] — concluído. Status: PARTIAL

[2026-03-03 22:46] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 22:47] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 22:56] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1 && npm run lint:slides 2>&1

[2026-03-03 23:03] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 23:06] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 23:09] [BUILD] OK — cd /c/Dev/Projetos/aulas-magnas && npm run build:cirrose 2>&1

[2026-03-03 23:12] [:af09e59b] — concluído. Status: PARTIAL

[2026-03-03 23:13] [general-purpose:a16bebb7] — concluído. Status: PARTIAL

[2026-03-04 14:41] [Explore:a23cee09] — concluído. Status: PASS

[2026-03-04 14:41] [:a6206e1c] — concluído. Status: PARTIAL

[2026-03-04 14:41] [Explore:ac74f9ba] — concluído. Status: PARTIAL

[2026-03-04 14:42] [Explore:a7e5bc5a] — concluído. Status: PASS

[2026-03-04 15:31] [:aad6ce33] — concluído. Status: PASS

[2026-03-06 23:41] [claude-code-guide:a1ef68fb] — concluído. Status: PARTIAL

[2026-03-07 00:09] [claude-code-guide:a3c35bc9] — concluído. Status: PASS

[2026-03-07 00:37] [BUILD] OK — cat > tasks/todo.md << 'ENDOFFILE'
# Todo

> Pendências de infraestrutura e metadados. Conteúdo Cirrose → `aulas/cirrose/HANDOFF.md`

---

## 🔴 ALTA

*(vazio)*

---

## 🟡 MÉDIA — Próxima sessão

- [ ] **MCP Gemini:** integrar Gemini como MCP (pesquisa alternativa + video review de animações). Ver `docs/ECOSYSTEM.md` — Gemini Ultra sem MCP ainda.

---

## 🟢 BAIXA — Backlog infra

- [ ] Batch 1: `.cursor/rules/*.mdc` vs `.claude/rules/*.md` — redundâncias remanescentes
- [ ] Batch 2: `.cursor/skills/*` vs `.claude/skills/*` — verificar alinhamento pós-update mar 2026
- [ ] Batch 3: `docs/*.md` — sobreposição, links quebrados (rodar `/docs-audit`)

---

## ✅ Concluído nesta sessão (2026-03-07)

- [x] Skills `.claude` atualizadas para padrões mar 2026 (version, allowed-tools, argument-hint, context:fork)
- [x] `docs/SKILLS.md` atualizado: tabela completa + frontmatter + bug Issue #17283
- [x] `docs/ECOSYSTEM.md`: link `MCP-FIXES.md` (não existia) → `MCP-ENV-VARS.md`
- [x] `slide-builder.md`: workflow atualizado para arquitetura modular (slides/*.html + build:cirrose)
- [x] `tasks/lessons.md`: append campos mar 2026 + bug context:fork
ENDOFFILE

[2026-03-07 00:37] [BUILD] OK — git add docs/ECOSYSTEM.md .claude/agents/slide-builder.md tasks/todo.md && git commit -m "$(cat <<'EOF'
fix(docs): corrigir discrepâncias cross-docs + task Gemini MCP

- docs/ECOSYSTEM.md: MCP-FIXES.md (404) → MCP-ENV-VARS.md
- .claude/agents/slide-builder.md: workflow monolito → modular
  (slides/NN.html + build:cirrose, nunca editar index.html direto)
- tasks/todo.md: Gemini MCP como próxima sessão + concluídos da sessão

https://claude.ai/code/session_01LxhgY4brRhKhLZG4QMa5w2
EOF
)" && git push -u origin claude/check-updates-last-branch-i6nWS

[2026-03-07 01:00] [general-purpose:a201685b] — concluído. Status: PASS

[2026-03-07 01:06] [general-purpose:abb79258] — concluído. Status: PARTIAL
