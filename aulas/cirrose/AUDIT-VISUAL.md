# AUDIT-VISUAL — Cirrose Plan C (25/fev/2026)

> Auditoria visual implacável de 28 slides (`index.stage-c.html`).
> Agente: Claude Code (Opus 4.6) · Método: preview_screenshot 1280×720 + force-reveal
> Referência: AASLD/EASL Postgraduate Course slides

---

## Resumo Executivo

| Métrica | Valor |
|---------|-------|
| Slides auditados | 28/28 |
| Média global | **2.7 / 5.0** |
| PASS (≥4.0) | 0 slides (0%) |
| WARN (2.5–3.9) | 18 slides (64%) |
| FAIL (<2.5) | 10 slides (36%) |
| Issue sistêmico #1 | Case panel 190px clipando conteúdo em 20+ slides |
| Issue sistêmico #2 | >40% espaço vazio na maioria dos slides |
| Issue sistêmico #3 | Conteúdo concentrado no quadrante superior-esquerdo |

### Veredicto Global: ⛔ FAIL — Necessita redesign sistêmico antes de apresentar

---

## Top 5 Fixes por Impacto

| # | Tipo | Fix | Slides afetados | Esforço |
|---|------|-----|-----------------|---------|
| 1 | **Sistêmico CSS** | Case panel: reduzir para 140px OU esconder em appendix OU converter para overlay | 22/28 | Médio |
| 2 | **Sistêmico CSS** | Fill ratio: content area precisa usar 70-85% do espaço (padding/max-width/grid ajustes) | 25/28 | Médio |
| 3 | **Sistêmico CSS** | Headline max-width: expandir para ocupar largura disponível (hoje ~45% da tela) | 20/28 | Baixo |
| 4 | **Individual** | Slides com 2-panel layout (SHP/HPP, Estatina, SVR, Albumina): garantir ambos painéis visíveis | 6 slides | Médio |
| 5 | **Individual** | Stagger animations: elementos que não aparecem mesmo com force-reveal (3ª barra PREDICT, "3 decisões" HOOK) | 4 slides | Baixo |

---

## Rubrica de Scoring

| Dim | Nome | 1 (Crítico) | 3 (Aceitável) | 5 (Referência AASLD) |
|-----|------|-------------|---------------|----------------------|
| **H** | Hierarquia Visual | Headline compete com corpo; nada domina | Headline > corpo, mas hero fraco | Hero 2-3×, Von Restorff claro, F/Z-pattern |
| **T** | Tipografia | Font genérica, tamanhos uniformes | Scale correto, sem refinamento | Instrument Serif + DM Sans, escala clamp fluida |
| **E** | Espaço & Layout | Cramped ou >40% vazio; desalinhado | Preenchimento 60-80%, alinhamento OK | Fill ratio ideal por tipo, grid consistente |
| **C** | Cor & Contraste | Cores decorativas sem semântica; <4.5:1 | Semântica OK, contraste ≥4.5:1 | OKLCH tokens, safe/warning/danger, ≥7:1 |
| **V** | Visuais & Figuras | Só texto; tabela Excel | Alguma evidência visual | Dados = visual (bar, card, timeline); Tufte |
| **K** | Consistência | Cada slide = layout diferente | Mesmo tipo ≈ mesmo layout | Archetypes reutilizados, spacing idêntico |
| **S** | Sofisticação | Parece Word; bordas pesadas | Clean mas genérico | Source-tag, OKLCH, micro-interações |
| **M** | Comunicação | Headline = rótulo; bullets | Assertion OK mas corpo confuso | Assertion-evidence perfeito; corpo ≤30 palavras |

---

## Scoring Completo — 28 Slides

### Slide 1: s-title — "Cirrose Hepática / Classificar · Intervir · Reverter"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 1 | 3 | 2 | 3 | **2.4** |

**Veredicto:** ⛔ FAIL
**Issues:**
1. [E] >55% espaço vazio — slide de título precisa de hero visual ou bg impactante, não cinza liso
2. [V] Zero visuais — apenas texto em fundo cinza claro; sem imagem, ícone, gradiente ou qualquer elemento visual
3. [H] Sem hierarquia clara — título e subtítulo competem em peso visual; falta Von Restorff
4. [S] Parece slide genérico de template — sem identidade visual do evento/palestrante

**Fix:** Adicionar bg-navy com gradiente sutil OU imagem de fundo (fígado estilizado). Título em --font-display hero size. Subtítulo menor, --text-on-dark-muted.

---

### Slide 2: s-a1-01 — "Cirrose não é diagnóstico — é espectro"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 4 | 4 | 3 | 4 | **3.4** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [H] Headline ocupa ~40% da largura; evidence card compete por atenção com a figure
2. [E] Figura Villanueva bem posicionada mas margem direita perdida para case panel

**Fix:** Expandir figure para usar largura total disponível. Evidence card pode ir abaixo da figure em vez de lateral.

---

### Slide 3: s-a1-02 — "FIB-4 intercepta → elastografia confirma → CSPH muda conduta"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 4 | 3 | 3 | 4 | **3.3** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] Figura de paper densa — ocupação boa mas precisa de anotação/destaque para guiar olho
2. [H] Headline em 2 linhas longas; poderia ser mais concisa

**Fix:** Adicionar overlay highlight na parte relevante da figura. Considerar crop da figure para focar na seção CSPH.

---

### Slide 4: s-hook — "5 números classificaram. 3 decisões salvaram."

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 3 | 3 | 2 | 3 | **2.6** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] "3 decisões" quase invisível — texto ghostly, stagger animation não completou
2. [V] Case card mostra "Albumina3,6" (faltando espaço) — bug de dados
3. [E] Metade direita inferior completamente vazia
4. [H] Framework items ("Classificar", "Intervir", "Reverter") sem destaque visual — todos mesmo peso

**Fix:** Corrigir stagger para "3 decisões". Fix "Albumina 3,6" spacing. Framework items precisam de ícones ou cores semânticas para diferenciar os 3 atos.

---

### Slide 5: s-a1-03 — "MELD-Na é o semáforo da cirrose"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 2 | 4 | 4 | 4 | 4 | 4 | **3.5** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] **CRÍTICO** — Case panel clipando MELD calculator: "SÓDIO" cortado, barra de zonas cortada à direita
2. [E] Interactive area não preenche largura disponível

**Fix:** MELD calc max-width precisa respeitar a presença do case panel (calc(100% - 210px) ou similar). Ou esconder panel neste slide.

---

### Slide 6: s-a1-04 — "Infecção é o inimigo #1: 33% das internações"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN (limite)
**Issues:**
1. [V] Apenas 2 de 3 barras PREDICT visíveis — barra "Álcool" ausente (stagger incompleto?)
2. [E] >40% espaço vazio abaixo das barras
3. [H] Barras pequenas demais para o espaço disponível — sem hero impact

**Fix:** Garantir 3 barras renderizadas. Expandir barras para usar mais altura. Números em --font-mono hero size como overlay nas barras.

---

### Slide 7: s-a1-05 — "10 doenças cabem em 3 perguntas"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN (limite)
**Issues:**
1. [V] Apenas 3 de 10 etiologias visíveis — tabela severamente incompleta
2. [E] Texto "Resmetirom não cobre..." truncado pela borda direita/panel
3. [M] Headline promete "10 doenças" mas corpo mostra apenas 3 — contradição

**Fix:** Tabela precisa de layout compacto que mostre todas 10 etiologias. Considerar 2 colunas ou grid 2×5. Reduzir font-size se necessário.

---

### Slide 8: s-cp1 — "LSM 21 kPa, plaquetas 118k. CSPH?"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 3 | 4 | 3 | 4 | **3.3** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] Decision options text truncado pelo case panel — "Encefalopatia?" answer cortada
2. [E] Case-expanded card com 2-column grid funciona, mas dados Na/MELD sem valores visíveis

**Fix:** Checkpoint layout precisa de max-width que respeite panel. Decision options precisam de overflow-wrap.

---

### Slide 9: s-a2-01 — "Carvedilol previne descompensação: NNT 9"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 2 | 3 | 3 | 4 | 3 | 4 | **3.1** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] **CRÍTICO** — Apenas 2 de 3 metric cards visíveis; 3º card (Dose) clipado pelo case panel
2. [V] Metric cards são funcionais mas pequenos demais para o espaço — não "pop"

**Fix:** Metric row precisa de max-width responsivo ao panel. Cards devem ser maiores com --text-hero no valor principal.

---

### Slide 10: s-a2-02 — "Early TIPS em 72h: sobrevida 86% vs 61%"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 4 | 3 | 3 | 4 | **3.3** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] Timeline 4 passos — um dos melhores layouts, mas ainda ~35% vazio abaixo
2. [H] Timeline steps todos do mesmo tamanho — falta Von Restorff no "TIPS ≤72h"

**Fix:** Destacar step "TIPS ≤72h" com tamanho 1.5× e cor --safe. Expandir timeline para usar mais espaço vertical.

---

### Slide 11: s-a2-03 — "Albumina: 3 indicações certas, 1 armadilha"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 3 | 3 | 3 | 4 | **2.9** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] **CRÍTICO** — 4º card (ATTIRE "armadilha") ausente/clipado pelo case panel — perda de conteúdo clínico crítico
2. [V] 3 cards visíveis OK (SBP, HRS, dose), mas headline promete "1 armadilha" que não aparece
3. [M] Contradição: headline fala de 4 itens, corpo mostra 3

**Fix:** 4 cards em grid 2×2 ao invés de row horizontal. Garantir ATTIRE card visível com --danger styling.

---

### Slide 12: s-a2-04 — "PBE: PMN ≥250 = tratar. Cada hora de atraso custa vidas"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 2 | 3 | 3 | 3 | 3 | 4 | **3.0** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] 3º step do flow ("2ária: norfloxac...") truncado pelo case panel
2. [E] Flow ocupa ~50% da largura disponível; muito vazio à direita e abaixo

**Fix:** Flow steps precisam de max-width responsivo. Expandir para usar mais espaço.

---

### Slide 13: s-a2-05 — "HRS-AKI: 3 perguntas antes da terlipressina"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 3 | 3 | 3 | 4 | **3.1** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] 3 numbered items — layout funcional mas ~40% vazio abaixo
2. [V] Items são texto puro em cards brancos — sem iconografia ou cor semântica
3. [H] "Elastografia realizada" no case panel parece deslocado (overlapping com content area?)

**Fix:** Items poderiam ter ícones (✓ gatilho, ? NTA, ✕ futilidade) e cores semânticas (safe/warning/danger). Expandir cards verticalmente.

---

### Slide 14: s-a2-06 — "Encefalopatia: lactulose + rifaximina + nutrição"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN (limite)
**Issues:**
1. [V] **CRÍTICO** — 3º pilar (Nutrição) completamente invisível — clipado pelo case panel
2. [E] Apenas 2 cards visíveis de 3 prometidos na headline
3. [M] Headline fala "lactulose + rifaximina + nutrição" mas nutrição não aparece
4. [E] >45% espaço vazio

**Fix:** 3 pilares em grid 1×3 com max-width responsivo. Ou empilhar 3 verticalmente.

---

### Slide 15: s-cp2 — "Cr 2,8 + Na 126 + ascite tensa. HRS-AKI?"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 4 | 3 | 4 | 3 | 4 | **3.4** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [C] Danger red tinting funciona bem — semântica clara
2. [E] Case card com Na e MELD-Na sem valores visíveis (campos vazios?)
3. [E] Lower 40% vazio

**Fix:** Preencher campos vazios no case card. Expandir layout para usar mais espaço vertical.

---

### Slide 16: s-a3-01 — "Recompensação é real — e Baveno VII a definiu"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 3 | 3 | 3 | 4 | **3.1** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] 3 critérios numbered — layout OK mas ~40% vazio abaixo
2. [V] Critérios são texto puro — falta iconografia ou visual
3. [H] Todos 3 items mesmo tamanho — falta destaque no critério mais surpreendente

**Fix:** Adicionar checkmarks verdes e visual de "timeline to recompensation". Items poderiam ser cards com ícones.

---

### Slide 17: s-a3-02 — "SVR cura o vírus mas não a hipertensão portal"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 3 | 3 | 3 | 4 | **2.9** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] **CRÍTICO** — 3º painel (MASLD) clipado pelo case panel — apenas HCV e Álcool visíveis
2. [M] Headline fala de CSPH geral mas corpo mostra apenas 2 de 3 etiologias
3. [E] ~40% vazio abaixo dos 2 painéis

**Fix:** 3 painéis em grid responsivo. Ou stack vertical se largura insuficiente.

---

### Slide 18: s-a3-03 — "Vigilância a cada 6 meses — nunca dar alta"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 4 | 3 | 3 | 4 | 4 | **3.4** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [V] Surveillance box centralizado funciona — um dos melhores slides; borda azul semântica
2. [E] Box poderia ser maior; ~35% vazio
3. [H] "a cada 6 meses" hero-sized funciona, mas "US ± AFP" compete

**Fix:** Expandir box. "6 meses" em --text-hero com animação countUp. Reduzir peso de "US ± AFP".

---

### Slide 19: s-cp3 — "SVR + abstinência, LSM 32→18. Recompensou?"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 4 | 3 | 4 | 3 | 4 | **3.4** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [C] Hope green tinting funciona bem — semântica clara, case panel "Recompensando" coerente
2. [E] Case card funcional; ~35% vazio abaixo
3. [V] Dados tabulares sem destaque visual — LSM "32→18" poderia ser hero

**Fix:** "32 → 18" em --text-hero com animação de transição. Adicionar seta visual grande.

---

### Slide 20: s-close — "5 números classificaram. 3 decisões salvaram."

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 3 | 4 | 3 | 4 | **3.3** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [V] 3 take-homes em numbered cards — funcional mas genérico
2. [H] Case panel timeline (resolved) é um bom touch narrativo
3. [E] Cards usam ~55% da largura; espaço desperdiçado
4. [S] Poderia ser mais impactante como slide de fechamento — CTA fraco

**Fix:** Take-homes em cards maiores com ícones. Headline em --text-hero. Considerar bg-navy para contraste de fechamento.

---

### Slide 21: s-app-01 — "ACLF grau 3: mortalidade 28d >70%"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 4 | 3 | 3 | 3 | 4 | **3.3** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [C] Grau 3 com borda danger red — semântica boa
2. [E] 3 graus empilhados — funcional; ~30% vazio
3. [V] Percentuais (~20%, ~30%, >70%) poderiam ser barras horizontais

**Fix:** Adicionar barras de mortalidade coloridas (safe→warning→danger). ">70%" em hero size.

---

### Slide 22: s-app-02 — "Early TIPS em 72h — NNT 4"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN (limite)
**Issues:**
1. [E] **CRÍTICO** — "Early TIPS" box cortado pelo case panel — "Early TIP..." visível
2. [V] Flow com seta → entre 2 boxes — segundo box ilegível
3. [E] >50% vazio; flow minúsculo no meio da tela

**Fix:** Flow precisa de max-width responsivo. Boxes maiores. NNT 4 como hero number.

---

### Slide 23: s-app-03 — "Etiologias raras: ABCW"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN (limite)
**Issues:**
1. [E] **CRÍTICO** — Coluna "Exame" severamente truncada: "ANA, a...", "Colang...", "Cerulo..." — informação clínica perdida
2. [V] Tabela Tufte funcional mas sem col "Exame" legível perde propósito
3. [E] Tabela estreita; ~35% vazio à esquerda

**Fix:** Tabela precisa de max-width responsivo ao panel. Ou esconder panel em appendix. Reduzir font-size se necessário para caber.

---

### Slide 24: s-app-04 — "NSBB ≥ EVL — carvedilol superior em HVPG"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.6** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] 3 text items empilhados — muito espaço vazio (>45%)
2. [V] Sem visual — 3 frases em cards brancos genéricos
3. [H] Nenhum item destaca mais que outro

**Fix:** Transformar em comparação visual NSBB vs EVL (2 colunas). Ou metric cards com HR/NNT.

---

### Slide 25: s-app-05 — "Cardiomiopatia cirrótica: 48% prevalência"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.6** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [E] 3 items empilhados (Sistólica, Diastólica, Tratamento) — ~45% vazio
2. [V] Critérios CCC são texto puro — sem visual
3. [H] "48%" poderia ser hero number

**Fix:** "48%" como countUp hero. Critérios em cards com ícones (coração, eco, Rx).

---

### Slide 26: s-app-06 — "SHP vs HPP: fisiopatologia oposta"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 1 | 3 | 2 | 3 | 2 | 3 | **2.4** |

**Veredicto:** ⛔ FAIL
**Issues:**
1. [E] **CRÍTICO** — HPP panel completamente clipado: "Vasoconst..." "PDE5i +" — metade do conteúdo perdida
2. [M] Headline promete "oposta" (comparação) mas só SHP é legível
3. [V] 2-panel comparison é o layout correto mas inutilizado pelo clipping

**Fix:** 2 panels DEVEM caber na tela. Max-width responsivo ao panel. Ou stack vertical.

---

### Slide 27: s-app-07 — "Estatina adjuvante: HVPG −2 mmHg"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN (limite)
**Issues:**
1. [E] **CRÍTICO** — LIVERHOPE box clipado: "LIVERHO..." "Sinvastatina +..." — trial name ilegível
2. [V] 2 boxes lado a lado — layout correto mas segundo box cortado
3. [E] >45% vazio

**Fix:** Boxes precisam de max-width responsivo. "−2 mmHg" como hero metric.

---

### Slide 28: s-app-08 — "CIRROXABAN 2025: p=0,058 NS"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 2 | 3 | 3 | 4 | **3.0** |

**Veredicto:** ⚠️ WARN
**Issues:**
1. [V] 3 text items — sem visual; poderia ter forest plot simplificado ou HR com CI
2. [E] ~40% vazio
3. [M] "p=0,058 NS" na headline é bom — comunica incerteza

**Fix:** Adicionar visual: HR com IC (forest plot mini) ou p-value gauge. "0,058" em hero size.

---

## Análise por Dimensão (média global)

| Dimensão | Média | Pior slides | Diagnóstico |
|----------|-------|-------------|-------------|
| **H** Hierarquia | 2.6 | s-title(2), s-hook(2), s-a1-04(2), s-a2-06(2), s-app-06(2) | Headlines OK mas hero elements ausentes; Von Restorff raramente aplicado |
| **T** Tipografia | 3.0 | — | Consistente em 3; fonts corretas mas sem refinamento (clamp subaproveitado) |
| **E** Espaço | 2.3 | s-app-06(1), s-title(2), s-hook(2), s-a1-03(2), múltiplos | **PIOR DIMENSÃO** — case panel + padding excessivo = 40-55% espaço vazio |
| **C** Cor | 3.1 | — | Semântica checkpoint (danger/hope) funciona; resto neutro demais |
| **V** Visuais | 2.6 | s-title(1), s-a1-04(2), s-a1-05(2), s-a2-06(2), s-app-04(2) | Maioria dos slides = texto em cards brancos; pouca evidência visual |
| **K** Consistência | 3.2 | — | Archetypes ajudam; numbered items reusados corretamente |
| **S** Sofisticação | 2.7 | s-title(2), s-hook(2), s-a1-04(2), s-a2-06(2), múltiplos | Source-tags presentes; mas look geral "Word-like" |
| **M** Comunicação | 3.5 | — | **MELHOR DIMENSÃO** — headlines são assertions clínicas fortes |

---

## Fix Backlog Priorizado

### Tier 1: Sistêmico CSS (1 fix → N slides)

| # | Fix | Slides afetados | Esforço | Impacto |
|---|-----|-----------------|---------|---------|
| S1 | **Case panel responsivo:** `.reveal.panel-active { grid-template-columns: 1fr 140px }` + esconder panel em `.appendix` slides | 22/28 | Médio | 🔴 Crítico |
| S2 | **Content max-width:** Remover `max-width: 1120px` dos archetypes OU ajustar para `calc(100% - 40px)` quando panel ativo | 20/28 | Baixo | 🔴 Crítico |
| S3 | **Fill ratio:** Reduzir padding dos archetypes de `2rem` para `1.5rem 2rem`. Headline `max-width` de ~45% para ~65% | 25/28 | Baixo | 🟡 Alto |
| S4 | **Hero elements:** Criar classe `.hero-metric` com `font-size: var(--text-hero)` para o número principal de cada slide | 15/28 | Médio | 🟡 Alto |
| S5 | **Horizontal overflow:** Todos containers flex/grid dentro de slides precisam de `max-width: calc(100% - var(--panel-width, 0px))` | 10/28 | Médio | 🟡 Alto |

### Tier 2: Individual CSS (fix por slide ou grupo)

| # | Fix | Slides | Esforço |
|---|-----|--------|---------|
| I1 | s-title: bg-navy + hero typography | 1 slide | Médio |
| I2 | s-hook: fix stagger "3 decisões" + "Albumina 3,6" spacing | 1 slide | Baixo |
| I3 | s-a1-04: garantir 3 barras PREDICT visíveis + expandir | 1 slide | Baixo |
| I4 | s-a1-05: tabela 10 etiologias em grid 2×5 compacto | 1 slide | Médio |
| I5 | s-a2-03: 4 albumin cards em grid 2×2 (não row) | 1 slide | Baixo |
| I6 | s-a2-06: 3 pilares layout responsivo ao panel | 1 slide | Baixo |
| I7 | s-a3-02: 3 etio panels layout responsivo | 1 slide | Baixo |
| I8 | s-app-03: tabela ABCW max-width responsivo | 1 slide | Baixo |
| I9 | s-app-06: SHP/HPP 2-panel responsivo | 1 slide | Baixo |
| I10 | s-app-07: Alvarado/LIVERHOPE 2-panel responsivo | 1 slide | Baixo |

### Tier 3: Redesign (novo layout/componente necessário)

| # | Fix | Slides | Esforço |
|---|-----|--------|---------|
| R1 | Appendix slides: criar archetype-appendix com layout mais compacto e sem case panel | 8 slides | Alto |
| R2 | Hero number component: countUp + metric + CI + source-tag | Múltiplos | Alto |
| R3 | Comparison layout: 2-panel side-by-side garantido com responsive fallback | 4 slides | Médio |

---

## Ordem de Execução Recomendada

1. **S1 + S2** (panel + max-width) → resolve clipping em 22 slides
2. **S3** (fill ratio) → melhora espaço em 25 slides
3. **S5** (overflow) → elimina truncamentos restantes
4. **I1** (title) → primeiro slide visível = primeira impressão
5. **I2-I10** (fixes individuais) → slides core
6. **S4 + R2** (hero metrics) → adiciona impact visual
7. **R1** (appendix archetype) → polimento final

---

## Referências

- `shared/css/base.css` — Design system tokens OKLCH
- `.claude/rules/design-system.md` — Tokens canônicos
- `.claude/rules/design-principles.md` — Rubrica Duarte/Tufte/Mayer
- `.claude/rules/css-errors.md` — Anti-patterns CSS
- AASLD Postgraduate Course 2024 — Referência visual externa
- EASL Postgraduate Course 2024 — Referência visual externa
