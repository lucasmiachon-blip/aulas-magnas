# Insights — Cirrose 2026 Apresentação (HTML Gemini)

> Fonte: `C:\Users\lucas\Downloads\Cirrose 2026 Apresentação (1).html`
> Analisado: 05/mar/2026. Screenshots em `C:\Users\lucas\Downloads\cirrose-html-qa\`
> **Nada deste arquivo entra direto nos slides.** Todos os trials precisam verificação PMID.

---

## Veredicto Visual (QA Playwright)

21 screenshots capturados (18 slides + 3 interações).

| Slides | Resultado | Problema |
|--------|-----------|----------|
| 1 | Parcial | Layout quebrado: texto sobrepõe sidebar, calc FIB-4 funciona |
| 2 | Parcial | Timeline cortada no fundo, animação de entrada incompleta |
| 3-6 | Invisíveis | `opacity:0` no CSS, GSAP não resolve (pseudo-element bug) |
| 7-18 | Completamente vazios | Só "Slide N / 18" + botões nav visíveis |

**Causa raiz:** CSS define `opacity:0` em h1, h2, h3, cards, table rows. GSAP tenta animar `h1::after` (impossível — pseudo-elements não são DOM nodes). A função `getSlideType()` misclassifica slides, e vários profiles nunca executam.

**Sidebar (caso clínico):** Única parte que funciona consistentemente. Layout 380px fixo à direita com 4 fases T0→T4 e mini-calculadoras.

---

## Trials 2025 a Verificar (NÃO usar sem PMID confirmado)

| # | Trial | Citação no HTML | Verificação | Relevância para nossa aula |
|---|-------|----------------|-------------|---------------------------|
| 1 | **PRECIOSA** | Grifols/EASL 2025, n=410 | TBD — sem PMID | Albumina desfecho 1o NEG, 2os PBE/SHR POS |
| 2 | **ATTIRE sub** | AASLD 2025 | TBD — sem PMID | Albumina+terlipressina AUMENTA mortalidade NNH~5 |
| 3 | **LIVERHOPE** | Pose E, JAMA 2025;333:876-886 | Buscar PMID | Sinvastatina+rifaximina NEG na descompensada |
| 4 | **SYMMETRY** | NEJM 2025 | TBD — sem vol/pag | Efruxifermina F4 MASH: 39% vs 15% reversão |
| 5 | **HARMONY** | Lancet 2025 | TBD — sem vol/pag | Efruxifermina F2-F3: 75% vs 20% melhora |
| 6 | **MAESTRO OLE** | Medscape 2025 | TBD — não peer-reviewed | Resmetirom F4c: LSM 25→18.3 kPa |
| 7 | **D'Amico recompensação** | J Hepatol 2025;82:407-418 | Verificar DOI | Critérios expandidos: 37,6% vs 7% |
| 8 | **Kyoto Consensus** | Sarin SK, Hepatol Int 2025;19:134-203 | Verificar PMID | Unificação ACLF global |
| 9 | **Meta-análise carvedilol** | Ahmed Z, Drugs Context 2025;14:2024-11-3 | Verificar | 7 RCTs, -2,22 mmHg HVPG |
| 10 | **PREDESCI atualização** | Villanueva C, J Hepatol 2025 | Verificar | HR 0,51 (0,34-0,77) NNT~9 |
| 11 | **ACG Malnutrition** | Singal AK, Am J Gastroenterol 2025 | Verificar | Proteína 1,2-1,5 g/kg/d recomendação FORTE |
| 12 | **SBP prophylaxis** | Markley JD, CID 2025;80(4):710-712 | Verificar PMID | Controvérsia: só 1 RCT (n=80, 1990) |
| 13 | **Sarcopenia+TIPS** | Brito Nunes E, JHEP Reports 2025;7:101234 | Verificar | 57% melhora sarcopenia pós-TIPS |
| 14 | **ACG Perioperatório** | Tapper EB, Gastroenterology 2025 | Verificar | VOCAL-Penn, risco cirúrgico |

**ATENÇÃO:** Muitas citações podem ser fabricadas (hallucination de LLM). Itens 4-6 têm referências vagas ("NEJM 2025", "Medscape 2025") — risco alto.

---

## Insights de Conteúdo (ideias temáticas)

### Novos para considerar

1. **"Paradigmas que caem"** — Framing forte: card vermelho = caiu, verde = fica, amarelo = debate. Adaptável aos nossos tokens `--danger/--safe/--warning`.

2. **Albumina: dose vs alvo** — ANSWER (dose fixa) POS vs ATTIRE (alvo ≥30) NEG vs PRECIOSA (intermediário NEG/POS). Tabela comparativa de 3 trials é visualmente poderosa se verificada.

3. **"Janela terapêutica" das estatinas** — Compensada SIM, descompensada NÃO (LIVERHOPE). Conceito análogo ao NSBB window hypothesis. Potencial para slide visual.

4. **Reversão de cirrose (MASH)** — Efruxifermina NNT~4 (F4) e NNT~2 (F2-F3). Se confirmado, reforça o Ato 3 "Reverter" da nossa narrativa.

5. **Recompensação expandida (37,6%)** — D'Amico 2025 expande Baveno VII com critérios que permitem baixas doses diuréticos/lactulose. Fecha o arco narrativo do Seu Antônio.

6. **Shared decision making (T4)** — Slide de decisão complexa: MELD 22 + sarcopenia + fragilidade + recaída. O paciente diz "não quero Tx". Integra humanismo + dados.

### Já cobertos na nossa aula

- Timeline Child→CTP→MELD→MELD-Na (slide 2 deles = nosso s-a1-damico)
- FIB-4 como screening (nosso s-a1-screening)
- PREDESCI, ANSWER, ATTIRE, Sort, Bass (nosso evidence-db.md)
- Baveno VII recompensação (nosso s-a3)

---

## Insights de Interação (efeitos reutilizáveis)

### Alta prioridade (implementar)

| Efeito | Onde no HTML | Como adaptar |
|--------|-------------|--------------|
| **Paradigm cards 3-cores** | Slides 6-10 | `.paradigm-red/green/yellow` → usar `var(--danger/--safe/--warning)` com ícone obrigatório |
| **Checklist interativo Baveno** | Slide 14 | Checkboxes → resultado verde. Adaptar para `[data-reveal]` progressive disclosure |
| **Sidebar case evolução** | Global | 4 fases T0→T4 com `.active` por slide. Semelhante ao nosso case-panel.js |
| **Tabela NNH inline** | Slide 7, row colspan | Highlight de sinal de segurança dentro da tabela. Classe `.tufte` com destaque |

### Média prioridade (avaliar)

| Efeito | Onde no HTML | Nota |
|--------|-------------|------|
| **scale(0.95→1.05) transição** | showSlide() | Profundidade 3D na troca de slides. Elegante mas pode conflitar com Reveal.js |
| **Mini-calculadora no sidebar** | Sidebar | FIB-4/MELD sempre disponíveis em formato compacto. Complementa meld-calc.js |
| **Timeline com year scale** | Slide 2 | GSAP stagger + scale nos anos. Nosso archetype-timeline já tem padrão similar |

### Baixa prioridade (inspiração apenas)

- Shimmer gradient no `.number-box` (decorativo)
- `backdrop-filter: blur(10px)` nos cards (performance concern em projetores)
- `columns: 2` para referências (slide 18 — bom para apêndice)

---

## O que NÃO copiar

- `<ul>/<ol>` em corpo de slide — viola assertrion-evidence
- Títulos genéricos (`h1` como "ATO 1: Evolução Histórica") — precisa ser afirmação clínica
- CDN para GSAP — offline-first obrigatório
- Cores literal hex/rgba misturadas com OKLCH tokens
- `#main-content` sem seletor (bug CSS linha 93-95)
- Caso clínico genérico (executivo 48a, IMC 32) vs nosso Seu Antônio (caminhoneiro 54a, etilista)

---

*Gerado 05/mar/2026. Append-only.*
