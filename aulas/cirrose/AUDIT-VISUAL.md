# AUDIT-VISUAL — Cirrose (por Atos)

> Auditoria visual organizada por Atos narrativos.
> Deck: 44 slides (2 pre + 8 Act 1 + 15 Act 2 + 7 Act 3 + 3 CP + 1 close + 8 app)
> Rubrica: **13 dimensoes**, scoring 1-10 (min 9 para PASS).
> Metodo: Playwright screenshot 1280x720 por estado (S0..SN) + constraint check + checklist.
> Referencia: AASLD/EASL Postgraduate Course slides + Duarte Sparkline + Sweller CLT + Knowles.
> Atualizado: 2026-03-14 — rubrica expandida de 8 (H/T/E/C/V/K/S/M) para 13 dimensoes (+ I/D/A/L/P/N).

---

## Rubrica de Scoring (13 dimensoes, 1-10)

> PASS = todas 13 dimensoes >= 9. WARN = qualquer entre 7-8. FAIL = qualquer < 7.
> Conversao da escala anterior: 1→2, 2→4, 3→6, 4→8, 5→10.

### Dimensoes visuais (originais, escala atualizada)

| Dim | Nome | 1-3 (Critico) | 4-6 (Aceitavel) | 7-8 (Bom) | 9-10 (Referencia AASLD) |
|-----|------|---------------|-----------------|-----------|------------------------|
| **H** | Hierarquia Visual | Headline compete com corpo; nada domina | Headline > corpo, mas hero fraco | Hero 1,5-2x, F-pattern reconhecivel | Hero 2-3x, Von Restorff claro, F/Z-pattern |
| **T** | Tipografia | Font generica, tamanhos uniformes | Scale correto, sem refinamento | Instrument Serif + DM Sans, escala OK | Escala clamp fluida, kerning, tabular-nums hero |
| **E** | Espaco & Layout | Cramped ou >40% vazio; desalinhado | Preenchimento 50-65%, alinhamento OK | Fill 65-80%, grid consistente | Fill ratio ideal por archetype, whitespace intencional |
| **C** | Cor & Contraste | Cores decorativas; <4.5:1; HEX hardcoded | Semantica OK, >=4.5:1, maioria var() | OKLCH tokens, safe/warning/danger, >=4.5:1, zero HEX | OKLCH completo, >=7:1 body, icones daltonismo |
| **V** | Visuais & Figuras | So texto; tabela Excel | Alguma evidencia visual | Dados = visual (bar, card, timeline) | Tufte; visual dominante; hero metric integrado |
| **K** | Consistencia | Cada slide = layout diferente | Mesmo tipo ~ mesmo layout | Archetypes reutilizados, spacing similar | Archetypes identicos, spacing pixel-perfect |
| **S** | Sofisticacao | Parece Word; bordas pesadas | Clean mas generico | Source-tag presente, OKLCH, transitions | Micro-interacoes, GSAP polish, stage-bad failsafe |
| **M** | Comunicacao | Headline = rotulo; bullets; >50 palavras | Assertion OK mas corpo confuso ou >30 palavras | Assertion-evidence; corpo <=30 palavras | Assertion-evidence perfeito; visual prova o claim |

### Dimensoes tecnico-pedagogicas (novas — merge qa-engineer)

| Dim | Nome | 1-3 (Critico) | 4-6 (Aceitavel) | 7-8 (Bom) | 9-10 (Referencia) |
|-----|------|---------------|-----------------|-----------|-------------------|
| **I** | Interacoes | JS quebrado; click avanca slide; sem retreat | advance funciona; retreat parcial; sem Plan B | advance+retreat OK; Plan B (.stage-bad) funciona | Todos estados testados; stopPropagation; leave/return reseta; Plan B perfeito |
| **D** | Dados clinicos | Dado inventado; PMID errado; [TBD] em source-tag | Dados corretos mas sem PMID; IC95% ausente | PMID verificado; NNT com IC95%; [TBD] so em notes | Tier-1 fonte; NNT+IC95%+timeframe; [DATA] tag em notes; zero [TBD] projetado |
| **A** | Acessibilidade | <3:1 contraste; sem navegacao teclado | >=4.5:1 body; teclado parcial | >=4.5:1 body, >=3:1 hero; foco visivel | >=7:1 body; icones ✓/⚠/✕ com cor; tab order correto; aria-labels |
| **L** | Carga cognitiva (Sweller) | >3 conceitos/slide; extraneous load alto; info irrelevante | 2-3 conceitos; algum ruido | 1-2 conceitos; germane load dominante | 1 conceito central; extraneous eliminado; chunking visual claro |
| **P** | Aprendiz adulto (Knowles+Miller) | Conteudo desconectado da pratica; >9 chunks | Relevancia clinica implicita; 7-9 chunks | Relevancia explicita; <=7 chunks; schema activation | "E dai?" obvio; <=5 chunks; decisao clinica acionavel; caso ancora |
| **N** | Arco narrativo (Duarte+Alley) | Headline = rotulo generico; sem tensao | Assertion presente mas tensao plana | Assertion clinica; tensao coerente com narrative.md | Sparkline visivel; callbacks ao hook; tensao precisa; narrativeCritical respeitado |

---

## Issues Sistemicos (referencia global)

- **SYS-1: Case panel clipping** — Conteudo clipado/truncado pelo case panel. Fix: panel responsivo. (dim: E, H)
- **SYS-2: Fill ratio <60%** — Espaco vazio >40%. Fix: padding/max-width archetypes. (dim: E)
- **SYS-3: Hero typography undersized** — Numero/dado hero em `--text-h1` em vez de `--text-hero`. (dim: H, T)

## Protocolo de auditoria (13 dimensoes)

### Loop 1 — Opus (sem Gemini)

1. `npm run lint:slides` — confirmar PASS
2. Para cada slide: constraint check automatizado
   - `<h2>` = assercao clinica? (dim M, N)
   - Zero `<ul>/<ol>` no corpo? (dim M, L)
   - `<aside class="notes">` com timing? (dim N)
   - `<section>` sem `style` com `display`? (dim S, E07)
   - Cores via `var()` — zero HEX hardcoded? (dim C)
   - Dados com PMID verificado ou `[TBD]`? (dim D)
3. Playwright screenshot 1280x720 de cada estado (S0...SN)
4. Scorecard: 13 dimensoes x nota 1-10
5. Issues com nota < 9 → fix cirurgico
6. Re-audit ate PASS (todas >= 9)

### Loop 2 — Gemini MCP (apos Loop 1 PASS)

Screenshots/video → Gemini avalia hierarquia, flow, legibilidade, daltonismo, densidade.
Gemini so sugere (JSON spec) — Opus executa fix.

### Scorecard template (copiar por slide)

```
| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   |      |           |
| T   |      |           |
| E   |      |           |
| C   |      |           |
| V   |      |           |
| K   |      |           |
| S   |      |           |
| M   |      |           |
| I   |      |           |
| D   |      |           |
| A   |      |           |
| L   |      |           |
| P   |      |           |
| N   |      |           |
```

---

## Act 1 — QA Loop 1 Baseline (14/mar/2026)

**Status: BASELINE (nenhum slide PASS)**
Agente: Claude Code (Opus) · Sessao: 14/mar/2026
Metodo: Playwright Chromium headless 1280x720 · `scripts/act1-reaudit.mjs` (25 screenshots, 11 slides)
Lints: lint:slides PASS · lint:case-sync PASS · lint:narrative-sync PASS
Evidencia: HTML source code + Playwright metrics (fill ratio, word count, h2 lines, panel overlap, source-tag)
Screenshots: `aulas/cirrose/qa-screenshots/act1-reaudit/` (25 PNGs)

### s-title (00-title.html)

**Headline:** Cirrose Hepatica (h1, nao h2 — archetype title)

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 7    | h1 hero presente. Fill 12% = canvas vazio. Sem F-pattern (title slide) |
| T   | 8    | Classes .title-hero e .title-pillars. Escala aparentemente correta |
| E   | 4    | Fill 12%. Titulo intencionalmente esparso mas muito abaixo do limiar 50% |
| C   | 8    | #162032 em data-background-color (excecao documentada). var() no CSS. Contraste ~15:1 |
| V   | 5    | Texto + brasao apenas. Sem visualizacao de dados (esperado para title) |
| K   | 8    | Archetype title consistente com design system |
| S   | 7    | Limpo. Sem source-tag (esperado). OKLCH tokens |
| M   | 5    | h1 = rotulo de topico "Cirrose Hepatica", nao assercao clinica. Archetype title |
| I   | 9    | Sem interacoes necessarias. Sem JS |
| D   | 9    | Sem dados clinicos necessarios. Sem [TBD] |
| A   | 8    | aria-hidden em dots decorativos. Alt text no brasao. Alto contraste |
| L   | 9    | Conceito unico. 17 palavras. Zero extraneous |
| P   | 6    | Sem decisao clinica. Apenas contexto |
| N   | 7    | Ancora identidade visual. tensionLevel=0. Nao narrativeCritical |

Obs: (1) Fill 12% e critico pela rubrica mas intencional para title. (2) Panel overlap detectado (cosmetic, title nao tem panel content). (3) h1 em vez de h2 e correto para archetype-title. (4) 4 console 404s detectados (assets missing, nao-bloqueante).

### s-hook (01-hook.html)

**Headline:** Caso Antonio - Qual sua conduta? (sem h2 — archetype hook customizado)

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 6    | Labs grid e ancora visual pos-GSAP. Fill 0% beat 0. Sem h2 hero. GSAP-dependente |
| T   | 7    | .hook-lab-value sizing consistente. Sem hero typography visivel inicialmente |
| E   | 4    | Fill 0% beat 0. Melhora pos-GSAP mas render inicial e vazio |
| C   | 8    | #162032 (documentado). Vars escopadas. Lab flag cores. Alto contraste |
| V   | 7    | Labs grid E evidencia visual. 6 lab values como cards de dados |
| K   | 6    | Archetype customizado. Nao reutilizado em nenhum outro slide |
| S   | 8    | GSAP stagger. Vars customizadas escopadas a #s-hook. OKLCH |
| M   | 6    | Sem h2 assercao. "Qual sua conduta?" e pergunta diretora. 48 palavras com bio+labs |
| I   | 8    | 1 clickReveal. Advance+retreat OK. ERRO-033 corrigido |
| D   | 8    | Dados do paciente conferem com CASE.md. Sem claims de evidencia aqui |
| A   | 7    | Alto contraste. Sem aria-labels explicitos nos labs. Tab order implicito |
| L   | 7    | 2 conceitos (paciente + pergunta). 6 labs = leitura clinica natural |
| P   | 8    | Caso clinico relevante. Prompt de decisao. Ancora no caso |
| N   | 8    | Inciting incident. tensionLevel=3. narrativeCritical=true |

Obs: (1) Fill 0% no beat 0 e risco P1 — se GSAP falhar, slide fica vazio. (2) .stage-bad failsafe nao testado para este slide. (3) h3 em vez de h2 e design choice do hook, nao violacao. (4) Beat 1 pode clipar a 720p (R6 historico).

### s-a1-01 (02-a1-continuum.html)

**Headline:** Rastreio na atencao primaria detecta hepatopatia antes da descompensacao

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 7    | Hero "83%" proeminente. Fill 52%, h2 2 linhas competem. Pathway adiciona estrutura |
| T   | 7    | Numero hero grande. h2 2 linhas = headline denso. Escala OK |
| E   | 6    | Fill 52% abaixo de 65% (limiar "Bom"). Grid funcional |
| C   | 8    | var() tokens. Icones daltonismo (warning/check). Source-tag. Sem HEX no body |
| V   | 8    | Hero stat "83%" + pathway 3-step. Dados = visual |
| K   | 8    | archetype-hero-stat reutilizado. Patient-context bar pattern |
| S   | 8    | Source-tag opacity:0 para GSAP. OKLCH. Transitions |
| M   | 7    | h2 E assercao. Mas 2 linhas. Word count total 106 (inclui source-tag opacity:0). Body visivel ~60 palavras |
| I   | 8    | 1 clickReveal (source). Advance OK |
| D   | 9    | 3 PMIDs verificados (38934697, 39674225, 35120736). [DATA] tags em notes. Zero [TBD] projetado |
| A   | 8    | Icones warning/check com cor. Alto contraste. aria-hidden em setas |
| L   | 7    | 2 conceitos (screening + pathway). 106 palavras total (com hidden). Denso |
| P   | 8    | Relevancia do screening explicita. Pathway acionavel. Caso ancora |
| N   | 8    | Setup role. tensionLevel=2. Headline confere com narrative.md |

Obs: (1) h2 2 linhas e o headline mais longo do Act 1. (2) Fill 52% e o segundo mais baixo (pos title/hook). (3) Word count inclui source-tag opacity:0; body visivel e menor mas ainda >30 palavras. (4) 3 PMIDs Tier-1 = forte em D.

### s-a1-classify (02c-a1-classify.html)

**Headline:** Classificar antes da 1a descompensacao reduz eventos

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 8    | PREDESCI hero HR 0,51 dominante. 3 cards abaixo com hierarquia visual. h2 1 linha |
| T   | 8    | Hero value countUp. Card text proporcional. h2 1 linha limpo |
| E   | 8    | Fill 85% excelente. Grid equilibrado hero + cards |
| C   | 8    | classify-card--safe/warning/danger = cores semanticas. Icones daltonismo. var() |
| V   | 8    | Hero stat + 3 cards color-coded. D'Amico mortalidade por estagio visivel |
| K   | 8    | archetype-hero-stat reutilizado. Padrao de cards consistente |
| S   | 8    | Source-tag. CountUp. OKLCH. Stagger |
| M   | 8    | h2 E assercao. Hero prova o claim. 1 linha. Body ~40 palavras visiveis |
| I   | 8    | 1 clickReveal (source). CountUp animation |
| D   | 9    | 3 PMIDs (30910320, 16298014, 37916970). HR com IC95%. [DATA] tags |
| A   | 8    | Icones com cores semanticas. Alto contraste. Cards acessiveis |
| L   | 7    | 2 conceitos (PREDESCI beneficio + 3-estagio mortalidade). 3 cards adicionam densidade |
| P   | 9    | "Classificar importa" = decisao clinica. Cards mostram desfecho por estagio. Caso ancora (FIB-4 5,91) |
| N   | 8    | Setup role. tensionLevel=2. Headline confere com narrative.md |

Obs: (1) Melhor slide do Act 1 em equilibrio geral. (2) PREDESCI HR 0,51 com IC95% = ouro no dim D. (3) 3 cards sao chunking eficaz (Sweller). (4) Patient-context inclui FIB-4 highlight — ancora caso.

### s-a1-vote (02d-a1-vote.html)

**Headline:** Esse paciente tem cirrose?

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 7    | h2 claro. Vote options abaixo. FIB-4 hero no reveal. Fill 48% |
| T   | 7    | Vote option text proporcional. Hero 5,91 no reveal |
| E   | 6    | Fill 48% abaixo de 65%. Botoes + labs summary |
| C   | 8    | vote-lab--success verde. var() tokens. Sem HEX no body |
| V   | 6    | Mainly text-based (labs + botoes). FIB-4 hero no reveal adiciona punch |
| K   | 7    | Archetype poll customizado. Usa hero-stat inner. Unico |
| S   | 7    | CountUp no reveal. Sem source-tag (raciocinio clinico). OKLCH |
| M   | 7    | h2 e pergunta diretora, nao assercao. Escolha pedagogica. 73 palavras |
| I   | 9    | Vote buttons funcionam. ERRO-033 corrigido. stopPropagation. Retreat reseta |
| D   | 8    | FIB-4 calc verificado em notes. Dados do paciente de CASE.md |
| A   | 7    | Botoes nativos (teclado OK). Lab row labels OK. Cor para ALT normal |
| L   | 8    | 1 conceito (ele tem cirrose?). Decisao binaria limpa. FIB-4 = punchline |
| P   | 9    | Engaja audiencia diretamente. Decisao clinica. "Levante a mao" = adult learning |
| N   | 8    | Poll eleva tensao. Constroi sobre hook. tensionLevel=2 |

Obs: (1) Fill 48% e aceitavel para slide interativo (espaco para botoes). (2) I=9 e o mais alto do Act 1 — interacao bem testada (ERRO-033 fechado). (3) Vote reveal e moment de punchline eficaz. (4) Sem source-tag e correto — e raciocinio, nao evidencia.

### s-a1-damico (02b-a1-damico.html)

**Headline:** Do CTP ao D'Amico: prognostico passou de subjetivo a preditivo

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 6    | h2 2 linhas. 3 eras competem. Fill 196% = overflow. Sem hero unico dominante |
| T   | 7    | Era badges, CTP classes, c-stat value. Escala OK mas denso |
| E   | 4    | Fill 196% = overflow critico. Conteudo excede viewport |
| C   | 8    | ctp-class--a/b/c + pathway-stage = semantico. 5 PMIDs. var() |
| V   | 8    | CTP pills + MELD c-stat + D'Amico pathway (4 estagios). Rico visualmente |
| K   | 7    | archetype-flow. Era track e padrao unico |
| S   | 8    | Source-tag. CountUp c-stat. GSAP era transitions. ERRO-032 corrigido |
| M   | 7    | h2 E assercao. Mas 2 linhas. 143 palavras = muito denso |
| I   | 8    | 2 clickReveals (era 1 + era 2). State machine |
| D   | 9    | 5 PMIDs verificados (4541913, 11172350, 16697729, 16298014, 37916970). Zero [TBD] |
| A   | 7    | Icones semanticos. Conteudo denso pode prejudicar legibilidade a distancia |
| L   | 5    | 3 conceitos (CTP + MELD + D'Amico) em 1 slide. 143 palavras. Carga cognitiva muito alta |
| P   | 7    | Progressao historica relevante. Mas 3 eras = pesado. Conexao com decisao indireta |
| N   | 8    | Setup role. tensionLevel=2. Headline confere com narrative.md |

Obs: (1) **Fill 196% e o problema mais grave do Act 1** — conteudo ultrapassa canvas. (2) 3 conceitos em 1 slide viola principio de Sweller. (3) 5 PMIDs = nota maxima em D. (4) Candidato a split em 2 slides no batch de fixes. (5) h2 2 linhas agrava o overflow.

### s-a1-baveno (03-a1-baveno.html)

**Headline:** Doenca hepatica avancada e espectro, nao diagnostico binario

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 8    | Paradigm shift (old->new) e hero. Espectro cACLD/dACLD. Pathway 3-step |
| T   | 8    | Paradigm terms proporcionais. AUROC badge. Step numbers claros |
| E   | 7    | Fill 104%->87%. Ligeiro overflow inicial, managed. Grid OK |
| C   | 8    | Cores por step (triagem/confirma/estadia). var() tokens |
| V   | 8    | Espectro bar. SplitText dissolve. Pathway 3-step. Dados = visual |
| K   | 8    | archetype-hero-stat. Pathway step pattern reutilizado |
| S   | 8    | Source-tag. SplitText dissolve. OKLCH. GSAP transitions |
| M   | 8    | h2 E assercao. 1 linha. 65 palavras. Claro |
| I   | 8    | 2 clickReveals (pathway + source). Advance/retreat |
| D   | 9    | 2 PMIDs (35120736, 38489521). AUROC 0,90 sourced. [DATA] tags |
| A   | 8    | Step numbers (1/2/3) auxiliam navegacao. aria-hidden em setas |
| L   | 8    | 2 conceitos (paradigma + pathway) bem chunked. 65 palavras |
| P   | 8    | Paradigm shift relevante. Pathway acionavel. "Se nao biopsia — como?" |
| N   | 8    | Setup role. tensionLevel=1. Headline confere com narrative.md |

Obs: (1) Overflow leve no estado inicial (104%) resolve para 87% apos click. (2) SplitText dissolve e animacao de referencia. (3) Unico slide com tensionLevel=1 no Act 1 — pausa narrativa intencional. (4) "Rule of 5" mencionado no step 3 — callback forward.

### s-a1-fib4 (03b-a1-fib4calc.html)

**Headline:** 4 dados. 1 numero. 1 decisao.

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 8    | Formula block + 3 cutoff zones + hero 5,91. Hierarquia clara |
| T   | 8    | Formula text claro. Cutoff values tabulares. Hero 5,91 grande |
| E   | 8    | Fill 81%. Cutoff zones organizadas. Antonio inputs abaixo (click) |
| C   | 8    | cutoff--safe/warning/danger. data-color="danger" no hero. Icones. var() |
| V   | 8    | Formula + 3-zone visual + hero number. Dados = visual |
| K   | 8    | archetype-hero-stat. Cutoff pattern coerente |
| S   | 8    | Source-tag. CountUp. Input cards stagger. OKLCH |
| M   | 7    | h2 e mnemonico ("4 dados. 1 numero. 1 decisao."), nao assercao clinica per rubrica |
| I   | 8    | 2 clickReveals (Antonio + source). CountUp. Advance/retreat |
| D   | 9    | PMID 16729309 + Baveno VII. FIB-4 calc verificado: (55x67)/(112x sqrt31)=5,91 |
| A   | 8    | Icones com cores. fib4-input-card--trap destaca ALT. aria claro |
| L   | 8    | 1 conceito (FIB-4). Formula + cutoffs sao suporte. 59 palavras |
| P   | 9    | "1 decisao" = acionavel. Dados do caso alimentam formula. Clinicamente util |
| N   | 8    | Setup role. tensionLevel=2. Headline confere com narrative.md |

Obs: (1) h2 mnemonico e eficaz mas tecnicamente nao e assercao clinica per rubrica. (2) ALT normal trap highlight e excelente pedagogicamente (input-card--trap). (3) CountUp 0->5.91 e moment forte. (4) Fill 81% excelente.

### s-a1-rule5 (03d-a1-rule5.html)

**Headline:** A cada 5 kPa, muda o estagio e a conduta

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 8    | 5 zones dominam canvas. Antonio pin como focal point. Hierarquia clara |
| T   | 8    | Zone ranges, labels, directives bem dimensionados. Pin label visivel |
| E   | 8    | Fill 72->83%. 5 zones stacked. Antonio plot overlay limpo |
| C   | 8    | 5-tier semantico (safe/gray/caution/danger/critical). Icones para daltonismo. var() |
| V   | 9    | 5 zones = visual dominante. Antonio pin = data overlay personalizado. Melhor visual do Act 1 |
| K   | 8    | archetype-flow. Zone pattern unico mas espacamento interno consistente |
| S   | 8    | Source-tag. ScaleY zones. Pin bounce. Gray zone overlay. GSAP |
| M   | 8    | h2 E assercao. 1 linha. 95 palavras (inclui zone labels). Visual prova o claim |
| I   | 8    | 2 clickReveals (Antonio + source). Zone scaleY. Pin drop |
| D   | 9    | 2 PMIDs (35120736, 38489521). Zone thresholds de Baveno VII. [DATA] tags |
| A   | 8    | 5 icones distintos para daltonismo. Zone labels descritivos. Antonio data visivel |
| L   | 8    | 1 conceito (estadiamento LSM). 5 zones sao chunks estruturados. Antonio ancora |
| P   | 9    | Slide mais acionavel: "kPa -> estagio -> conduta". Arvore de decisao direta |
| N   | 8    | Setup role. tensionLevel=2. Headline confere com narrative.md |

Obs: (1) **Melhor slide do Act 1** — V=9 e o unico 9 de todo o arco. (2) Antonio pin com bounce e momento forte de personalizacao. (3) Comment no HTML: "SLIDE MAIS IMPORTANTE DO BLOCO 1". (4) Gray zone overlay (10-25 kPa) adiciona nuance clinica sem poluir. (5) Fill 72-83% e ideal.

### s-a1-meld (04-a1-meld.html)

**Headline:** MELD-Na: o GPS da fila

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 8    | 4 bandas semaforo dominam. Threshold line secundaria. h2 1 linha |
| T   | 8    | MELD ranges, mortalidade %, acoes bem dimensionados. CSS dots |
| E   | 8    | Fill 74->85%. Bandas stacked clean |
| C   | 8    | meld-band--green/yellow/orange/red = 4-tier semantico. CSS dot cores. var() |
| V   | 8    | Semaforo 4-bandas = visual dominante. Mortalidade % como dados |
| K   | 8    | archetype-hero-stat. Semaforo internamente consistente |
| S   | 8    | Source-tag. Band stagger. Threshold width transition. OKLCH |
| M   | 7    | h2 "MELD-Na: o GPS da fila" = metafora, nao assercao clinica estrita. Eficaz mas borderline |
| I   | 8    | 2 clickReveals (threshold + source). Band stagger. Width transition |
| D   | 8    | 3 fontes (Kamath, Kim, UNOS). Mortalidade 90d sourced. Source-tag usa autor+ano sem PMID inline |
| A   | 8    | 4 bandas com CSS dots (nao emoji). Acoes com icones. aria consistente |
| L   | 8    | 1 conceito (MELD scoring). 4 bandas estruturadas. 61 palavras |
| P   | 8    | Semaforo = arvore de decisao. "Quando encaminhar" = acionavel |
| N   | 8    | Setup role. tensionLevel=2. Headline confere com narrative.md |

Obs: (1) ERRO-030 corrigido (emoji -> CSS dots). (2) h2 metaforico e memoravel mas nao atende rubrica M estrita. (3) Mortalidade 90d por faixa e dado forte (Kim 2008 + UNOS). (4) Threshold line animation e polish sutil.

### s-cp1 (07-cp1.html)

**Headline:** LSM 21 kPa, plaquetas 112k. Como voce estadia?

| Dim | Nota | Evidencia |
|-----|------|-----------|
| H   | 7    | Case data + 3 poll buttons + feedback. h2 1 linha. Layout equilibrado, sem hero visual dominante |
| T   | 7    | Data values, button text. font-size:0.82rem inline style na pergunta |
| E   | 8    | Fill 85%. Layout checkpoint 2-colunas (case + decision) |
| C   | 8    | data-severity="caution" tematiza. var(--text-muted) para pergunta. Botoes styled |
| V   | 7    | Case data como card. Poll buttons. Sem hero stat ou chart |
| K   | 8    | archetype-checkpoint consistente com design system |
| S   | 7    | Sem source-tag (checkpoint). Sem GSAP (JS inline poll). Sem transitions alem de click |
| M   | 8    | h2 usa dados clinicos no headline ("LSM 21 kPa, plaquetas 112k. Como voce estadia?"). Eficaz |
| I   | 8    | Poll buttons funcionam (click -> correct/wrong + feedback). Module JS inline |
| D   | 9    | PREDESCI PMID no feedback. Valores conferem com CASE.md. Baveno VII citado. Zero [TBD] |
| A   | 7    | Botoes nativos (teclado OK). Sem aria-label nos botoes. Inline style font-size |
| L   | 8    | 1 conceito (o que fazer agora?). 3 choices chunked. Feedback conciso |
| P   | 9    | Decisao clinica direta. "Qual conduta agora?" = core adult learning. Feedback explica porque |
| N   | 9    | Checkpoint role. tensionLevel=3. narrativeCritical=true. Fecha loop Act 1 |

Obs: (1) Unico slide com N=9 — checkpoint fecha o arco narrativo. (2) Inline style font-size:0.82rem viola preferencia por classes CSS. (3) Poll feedback cita PREDESCI e Baveno VII — forte em D. (4) 3 opcoes de conduta sao chunking ideal para decisao. (5) data-severity="caution" ativa painel amarelo.

### Resumo de padres recorrentes

**Dimensoes fortes (>=8 na maioria):**
- **D (Dados clinicos):** 9 em 9/11 slides. PMIDs Tier-1 verificados. [DATA] tags em notes. Zero [TBD] projetado.
- **C (Cor & Contraste):** 8 em 11/11. var() tokens. Cores semanticas. Icones daltonismo.
- **K (Consistencia):** 8 em 9/11. Archetypes reutilizados. Excecoes: s-hook (custom) e s-a1-vote (poll).
- **I (Interacoes):** 8-9 em 11/11. Todas interacoes testadas. ERRO-033 corrigido.
- **N (Arco narrativo):** 8 em 10/11, 9 em s-cp1. Headlines conferem com narrative.md.

**Dimensoes fracas (<7 em 2+ slides):**
- **E (Espaco & Layout):** 4 em 3 slides (s-title=4, s-hook=4, s-a1-damico=4). Fill ratio critico: 12%, 0%, 196%.
- **M (Comunicacao):** 5-6 em 3 slides (s-title=5, s-hook=6, s-a1-vote=7). h2 ausente ou nao-assertivo.
- **L (Carga cognitiva):** 5 em s-a1-damico (3 conceitos, 143 palavras). 7 em 4 slides.

**Gargalo principal:** E (fill ratio) — 3 slides FAIL. Sem fix em HTML/CSS, esses scores nao mudam.
**Segundo gargalo:** M (comunicacao) — 3 slides com headline nao-assertivo (title, hook, vote sao archetypes especiais; fib4/meld sao mnemonicos).
**Terceiro gargalo:** L (carga cognitiva) — s-a1-damico precisa de split ou simplificacao.

**Nenhum slide atinge PASS (todas 14 dim >= 9).** Melhor slide: s-a1-rule5 (V=9, unico 9 do arco). Pior slide: s-a1-damico (E=4, L=5, H=6).

---

## Pre-Act + Act 1 + CP1 — RODADA 3 CONSOLIDADA (10/mar/2026)

**Status: PASS COM RISCOS**
Agente: Claude Code (Opus 4.6) · Sessao: 10/mar/2026 (rodada 3 — hardening + re-QA consolidado)
Metodo: Playwright Chromium headless 1280x720 · navegacao real ArrowRight · 27 screenshots · `scripts/act1-reaudit.mjs`
Screenshots: `aulas/cirrose/qa-screenshots/act1-reaudit/` (27 PNGs, gitignored)

### Resultado consolidado por slide (11)

| # | ID | Status | Problema principal | Sev |
|---|-----|--------|-------------------|-----|
| 1 | s-title | OK | ~~var() fixado rodada 4~~ → HEX literal | — |
| 2 | s-hook | PASS COM RISCO | Fill 0% beat 0 (GSAP-dependente); beat 1 pode clipar INR+punchline a 720p | P1 |
| 3 | s-a1-01 | OK | countUp fallbacks corrigidos; iceberg ok | — |
| 4 | s-a1-vote | OK | Reveal funciona; FIB-4 fallback corrigido para 5,91 | — |
| 5 | s-a1-damico | PASS COM RISCO | h2 2 linhas; era 2 pathway bars quase invisiveis; fill 205% | P1 |
| 6 | s-a1-baveno | OK | card 3 toca borda inferior state 1 (aceitavel) | P1 |
| 7 | s-a1-fib4 | OK | Layout limpo; h2 pendente Lucas | P1 |
| 8 | s-a1-rule5 | OK | Melhor slide do ato; 5 zones + Antonio plot excelente | — |
| 9 | s-a1-meld | OK | ~~Emoji fixado rodada 4~~ → CSS dots; h2 pendente Lucas | P1 |
| 10 | s-a1-classify | OK | 3 cards + PREDESCI; h2 pendente Lucas | P1 |
| 11 | s-cp1 | OK | Checkpoint completo; interacao poll funciona | — |

### Fixes acumulados (rodadas 2 + 3)

**Rodada 2 (09/mar):**
1. cirrose.css — stage-c hook contraste, baveno gap, meld threshold opacity, rule5 compactness
2. damico h2 + rule5 h2 reescritos
3. rule5 conteudo movido para notes

**Rodada 3 (10/mar — hardening):**
4. _manifest.js — 2 headlines sync (drift pos-ca76b56)
5. narrative.md — 2 headlines sync (idem)
6. 5 HTML slides — 11 countUp fallbacks corrigidos (0 → valores reais)

### Problemas remanescentes

| # | Problema | Slide(s) | Sev | Quem resolve |
|---|---------|----------|-----|-------------|
| ~~R1~~ | ~~Emoji unicode (ERRO-030)~~ | ~~s-a1-meld~~ | ~~P1~~ | ✅ Rodada 4 |
| R2 | h2 2 linhas | s-a1-damico | P1 | Lucas (decisao clinica) — fórmula MELD removida, alivia density |
| ~~R3~~ | ~~Era 2 pathway bars quase invisiveis~~ | ~~s-a1-damico~~ | ~~P1~~ | ✅ cfb7d26 (chromatic encoding) |
| R4 | Fill 0% beat 0 | s-hook | P1 | Design decision |
| ~~R5~~ | ~~3 h2 pendentes Lucas~~ | ~~fib4, meld, classify~~ | ~~P1~~ | ✅ d20deec: classify + meld reescritos; fib4 mantido (mnemônico) |
| R6 | beat 1 pode clipar a 720p | s-hook | P1 | CSS audit |
| ~~R7~~ | ~~var() em data-background-color~~ | ~~s-title~~ | ~~P2~~ | ✅ Rodada 4 |
| ~~R8~~ | ~~MELD >=18 PMID pendente~~ | ~~s-a1-meld notes~~ | ~~P2~~ | ✅ d20deec: threshold genérico, [LUCAS DECIDE] purgado |

### Rodada 4 — CSS/Viewport Hard Gate (10/mar/2026)

**3 fixes aplicados:**
1. **ERRO-030 fix:** s-a1-meld emoji 🟢🟡🟠🔴 → `.meld-band-dot` (14px CSS circles, cor por band)
2. **ERRO-031 fix:** s-title `data-background-color` var() → HEX literal `#162032`
3. **D'Amico orphaned padding:** `#s-a1-damico .pathway-track { padding-top: 28px }` removido (label inexistente)

**Re-QA:** 27 screenshots, 0 console errors, build + 3 lints PASS.
**R1 e R7 fechados.** 5 problemas remanescentes (4 P1 dependem de Lucas, 1 P2 pesquisa).

### Rodada 5 — D'Amico chromatic + vote elevation (10/mar/2026)

**2 fixes adicionais pos-hardening:**
1. **ERRO-032 fix (cfb7d26):** D'Amico pathway stages sem cor semantica → regras explicitas em cirrose.css. Source-tag failsafe .no-js/.stage-bad. White-space wrapping. QA: 7 PASS, 1 pre-existing (8px overflow).
2. **ERRO-033 fix (fe5a1d8):** s-a1-vote 3 interaction bugs (stopPropagation, retreat DOM, leave+return reset) + visual upgrade (serif headline, elevated cards, spacing 720px). QA: 7/7 PASS via vote-final-qa.mjs.

**R3 fechado.** ERRO-022 (vote nunca testado) agora resolvido.

### Checklist estrutural (todos 11 slides)

- [x] `<h2>` e assercao clinica (nao rotulo generico)
- [x] Sem `<ul>` ou `<ol>` no slide
- [x] `<aside class="notes">` presente com timing
- [x] `<section>` sem `style` com `display` (E07)
- [x] Dados numericos verificados contra evidence-db.md
- [x] Background via `data-background-color` com HEX literal ~~(s-title usa var())~~ ✅ ERRO-031 corrigido
- [x] Sem CDN links
- [x] Build + lint:slides + lint:case-sync + lint:narrative-sync PASS
- [x] Navegacao ArrowRight funciona em todos 11 slides
- [x] Case panel progride corretamente
- [x] Zero erros de console
- [x] Zero emojis em slides projetados ~~(s-a1-meld tem 🟢🟡🟠🔴)~~ ✅ ERRO-030 corrigido

---

## Act 2 + CP2 — QA BROWSER COMPLETO (09/mar/2026)

**Status: PASS (condicional)**
Agente: Claude Code (Opus 4.6) · Sessao: 09/mar/2026
Metodo: Playwright Chromium headless 1280x720 · navegacao real ArrowRight · 46 screenshots

### Slides cobertos (16)

| # | ID | Arquivo | Origem | Status QA |
|---|-----|---------|--------|-----------|
| 12 | s-a2-01 | 30-a2-gatilhos.html | NOVO | PASS (h2 3 linhas — P1) |
| 13 | s-a2-02 | 31-a2-ascite-dx.html | NOVO | PASS |
| 14 | s-a2-03 | 32-a2-ascite-manejo.html | NOVO | PASS |
| 15 | s-a2-04 | 05-a1-infeccao.html | RELOCADO | PASS (bar chart — bom) |
| 16 | s-a2-05 | 11-a2-pbe.html | EXISTENTE | PASS |
| 17 | s-a2-06 | 33-a2-hda.html | NOVO | PASS (h2 denso mas 2 linhas) |
| 18 | s-a2-07 | 08-a2-carvedilol.html | EXISTENTE | PASS (4 states, excelente) |
| 19 | s-a2-08 | 13-a2-he.html | EXISTENTE | PASS |
| 20 | s-a2-09 | 34-a2-nutricao.html | NOVO | PASS (source-tag limpo) |
| 21 | s-a2-10 | 35-a2-tx.html | NOVO | PASS |
| 22 | s-a2-11 | 12-a2-hrs.html | EXISTENTE | PASS (3 perguntas, forte) |
| 23 | s-a2-12 | 36-a2-refrataria.html | NOVO | PASS (h2 denso mas 2 linhas) |
| 24 | s-a2-13 | 24-app-ccc.html | RELOCADO | PASS |
| 25 | s-a2-14 | 25-app-pulm.html | RELOCADO | PASS (comparacao SHP/HPP) |
| 26 | s-a2-15 | 09-a2-tips.html | EXISTENTE | PASS |
| 27 | s-cp2 | 14-cp2.html | EXISTENTE | PASS (checkpoint forte) |

### Fixes aplicados nesta sessao

1. **slides 31, 32**: Bare `<` em speaker notes escapados para `&lt;` (fix Vite parse5 error)
2. **P0s ja corrigidos**: PMID s-a2-01 (ERRO-028), [TBD SOURCE] s-a2-09 (ERRO-029)

### Checklist estrutural (todos 16 slides)

- [x] `<h2>` com assercao clinica
- [x] Sem `<ul>` ou `<ol>` no slide
- [x] `<aside class="notes">` presente
- [x] `<section>` sem `style` com `display` (E07)
- [x] Background e cores corretos
- [x] Sem CDN links
- [x] Build + lint:slides + lint:case-sync + lint:narrative-sync PASS
- [x] Navegacao ArrowRight funciona em todos 27 slides (Act 1 + Act 2)
- [x] Case panel progride corretamente (verde → amarelo → vermelho)
- [x] Zero erros de console

### P1 pendencias (nao-bloqueantes)

- **h2 longo**: s-a2-01 (3 linhas) — Lucas decide se encurta
- **Monotonia visual**: 6/7 novos slides usam flow-cascade. s-a2-04 (bar chart) unico que varia. Gemini avaliara.
- **[TBD] em notes**: s-a2-04 e s-a2-09 tem [TBD SOURCE] em speaker notes (nao visivel na projecao)

### Destaques positivos

- Case panel mostra progressao de doenca (dot verde → borda amarela → borda vermelha)
- s-a2-07 (carvedilol): 4 states progressivos (headline → HR → NNT → dose) — excelente
- s-a2-04 (infeccao): Unico slide novo com archetype diferente (bar chart)
- s-a2-11 (HRS): 3 perguntas numeradas — forte decisao clinica
- s-cp2: Checkpoint realista com caso + 3 opcoes

---

## Act 3 + CP3 + Close — QA PENDENTE

**Status: NAO INICIADO** (QA apos preenchimento dos skeletons)
9 slides (7 Act 3 + CP3 + Close). 4/7 slides do Act 3 sao skeletons (headline + notes preenchidos, evidence body vazio com `<!-- [SKELETON] -->`).

### Slides a auditar

| # | ID | Arquivo | Origem | Status conteudo |
|---|-----|---------|--------|----------------|
| 28 | s-a3-01 | 37-a3-bridge.html | NOVO | Skeleton (headline + notes ok, evidence TBD) |
| 29 | s-a3-02 | 15-a3-recompensacao.html | EXISTENTE | Score anterior: 3.1 |
| 30 | s-a3-03 | 38-a3-expandido.html | NOVO | Skeleton (headline + notes ok, evidence TBD) |
| 31 | s-a3-04 | 39-a3-etiologia.html | NOVO | Skeleton (headline + notes ok, evidence TBD) |
| 32 | s-a3-05 | 16-a3-svr.html | EXISTENTE | Score anterior: 2.9 |
| 33 | s-a3-06 | 17-a3-vigilancia.html | EXISTENTE | Score anterior: 3.4 |
| 34 | s-a3-07 | 40-a3-fechamento.html | NOVO | Skeleton (headline + notes ok, evidence TBD) |
| 35 | s-cp3 | 18-cp3.html | EXISTENTE | Score anterior: 3.4 |
| 36 | s-close | 19-close.html | EXISTENTE | Score anterior: 3.3 |

---

## Appendix — QA PENDENTE

**Status: NAO INICIADO** (baixa prioridade — appendix nao projetado em congresso)
8 slides.

### Slides a auditar

| # | ID | Arquivo | Score anterior |
|---|-----|---------|---------------|
| 37 | s-app-01 | 20-app-aclf.html | 3.3 |
| 38 | s-app-02 | 21-app-tips.html | 2.5 |
| 39 | s-app-03 | 22-app-abcw.html | 2.5 |
| 40 | s-app-04 | 23-app-nsbb.html | 2.6 |
| 41 | s-app-alb | 10-a2-albumina.html | 2.9 |
| 42 | s-app-07 | 26-app-estatina.html | 2.5 |
| 43 | s-app-08 | 27-app-cirrox.html | 3.0 |
| 44 | s-app-etio | 06-a1-etiologias.html | 2.5 |

---

## Fix Backlog Sistemico (referencia global)

### Tier 1: Sistemico CSS (1 fix -> N slides)

| # | Fix | Slides afetados | Esforco | Impacto |
|---|-----|-----------------|---------|---------|
| S1 | Case panel responsivo: reduzir ou overlay | ~22 | Medio | Critico |
| S2 | Content max-width: ajustar para panel ativo | ~20 | Baixo | Critico |
| S3 | Fill ratio: reduzir padding, expandir headline | ~25 | Baixo | Alto |
| S4 | Hero elements: classe `.hero-metric` com `--text-hero` | ~15 | Medio | Alto |
| S5 | Horizontal overflow: max-width responsivo ao panel | ~10 | Medio | Alto |

### Tier 2: Redesign (novo layout/componente)

| # | Fix | Slides | Esforco |
|---|-----|--------|---------|
| R1 | Appendix archetype compacto sem case panel | 8 | Alto |
| R2 | Hero number component: countUp + metric + CI + source-tag | Multiplos | Alto |
| R3 | Comparison layout 2-panel responsivo | 4 | Medio |

---

## Historico de sessoes QA

| Data | Escopo | Resultado |
|------|--------|-----------|
| 25/fev/2026 | 28 slides (deck antigo) — scoring visual completo | Media 2.7/5.0, 0 PASS |
| 09/mar/2026 | Pre-Act + Act 1 + CP1 (11 slides) — checklist estatico + fixes | 3 fixes aplicados, PASS |
| 09/mar/2026 | Act 1 + Act 2 + CP2 (27 slides) — browser QA Playwright 1280x720 | 46 screenshots, 0 P0, PASS |
| 09/mar/2026 | Act 1 RODADA 2 — correcao 5 slides + re-QA browser | 8 fixes, 27 screenshots, 0 P0, **PASS** |
| 10/mar/2026 | Act 1 RODADA 3 — hardening countUp + headline sync + re-QA consolidado | 13 fixes totais, 27 screenshots, 0 P0, **PASS COM RISCOS** |
| 10/mar/2026 | Act 1 RODADA 5 — D'Amico chromatic + vote elevation | R3+ERRO-022 fechados, 2 novos ERROs (032,033) registrados e corrigidos |

---

## Referencias

- `shared/css/base.css` — Design system tokens OKLCH
- `.claude/rules/design-system.md` — Tokens canonicos
- `.claude/rules/design-principles.md` — Rubrica Duarte/Tufte/Mayer
- `.claude/rules/css-errors.md` — Anti-patterns CSS
- AASLD Postgraduate Course 2024 — Referencia visual externa
