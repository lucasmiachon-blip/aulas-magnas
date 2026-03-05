# AUDIT-VISUAL — Cirrose Plan C (25/fev/2026)

> Auditoria visual implacável de 28 slides.
> Agente: Claude Code (Opus 4.6) · Método: preview_screenshot 1280×720 + force-reveal
> Referência: AASLD/EASL Postgraduate Course slides
>
> **Nota (27/fev/2026):** Slides agora modulares em `slides/*.html`. Scores ainda válidos.
> Editar slide individual e rodar `npm run build:cirrose` para validar.

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

## Issues Sistêmicos (referência para seção de scoring)

- **SYS-1: Case panel clipping** — Conteúdo clipado/truncado pelo case panel (14+ slides). Fix canônico: S1+S2.
- **SYS-2: Fill ratio <60%** — Espaço vazio >40% (28+ slides). Fix canônico: S3.
- **SYS-3: Hero typography undersized** — Número/dado hero em `--text-h1` em vez de `--text-hero` (8+ slides). Fix canônico: S4.

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
1. [V] Zero visuais — fundo cinza liso sem imagem, ícone ou gradiente
2. [H] Título e subtítulo competem; sem Von Restorff
**Fix:** I1 (bg-navy + hero typography)

---

### Slide 2: s-a1-01 — "Cirrose não é diagnóstico — é espectro"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 4 | 4 | 3 | 4 | **3.4** |

**Veredicto:** ⚠️ WARN — SYS-1 (figure margem perdida)
1. [H] Headline ocupa ~40% largura; evidence card compete com figure
**Fix:** S1+S2

---

### Slide 3: s-a1-02 — "FIB-4 intercepta → elastografia confirma → CSPH muda conduta"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 4 | 3 | 3 | 4 | **3.3** |

**Veredicto:** ⚠️ WARN
1. [V] Figura de paper densa — sem anotação/destaque para guiar olho
2. [H] Headline 2 linhas longas; poderia ser mais concisa
**Fix:** Overlay highlight na seção CSPH; crop da figure

---

### Slide 4: s-hook — "Caso Seu Antônio · Qual é o próximo passo?" (v4 · 28/fev)

> **Nota (28/fev):** s-hook v4: 3 beats (Caso → Labs → Pergunta), progress 1✓·2✓·3, retreatBeat(), ArrowDown removido.

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 4 | 3 | 3 | 4 | 3 | 4 | 4 | 4 | **3.6** |

**Veredicto:** ⚠️ WARN (melhorou)
**Melhorias v4:** 3 estágios com sucesso, retreatBeat (ERRO-010), ArrowDown removido (ERRO-011), place-content center (ERRO-013).
1. [E] Case panel redundante (ERRO-008)

---

### Slide 5: s-a1-03 — "MELD-Na é o semáforo da cirrose"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 2 | 4 | 4 | 4 | 4 | 4 | **3.5** |

**Veredicto:** ⚠️ WARN — SYS-1 (MELD calculator: "SÓDIO" cortado, barra de zonas truncada), SYS-2
**Fix:** S1+S2

---

### Slide 6: s-a1-04 — "Infecção é o inimigo #1: 33% das internações"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN — SYS-2, SYS-3
1. [V] Apenas 2 de 3 barras PREDICT visíveis — barra "Álcool" ausente (stagger incompleto)
**Fix:** I3 + S3

---

### Slide 7: s-a1-05 — "10 doenças cabem em 3 perguntas"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN — SYS-1 (coluna truncada)
1. [V] Apenas 3 de 10 etiologias visíveis — tabela severamente incompleta
2. [M] Headline promete "10 doenças" mas corpo mostra apenas 3 — contradição
**Fix:** I4 + S1

---

### Slide 8: s-cp1 — "LSM 21 kPa, plaquetas 118k. CSPH?"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 3 | 4 | 3 | 4 | **3.3** |

**Veredicto:** ⚠️ WARN — SYS-1 (decision options truncadas), SYS-2
1. [E] Case card com Na/MELD-Na sem valores visíveis
**Fix:** S1+S2

---

### Slide 9: s-a2-01 — "Carvedilol previne descompensação: NNT 9"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 2 | 3 | 3 | 4 | 3 | 4 | **3.1** |

**Veredicto:** ⚠️ WARN — SYS-1 (3º card Dose clipado), SYS-3
**Fix:** S1 + S4

---

### Slide 10: s-a2-02 — "Early TIPS em 72h: sobrevida 86% vs 61%"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 4 | 3 | 3 | 4 | **3.3** |

**Veredicto:** ⚠️ WARN — SYS-2 (~35% vazio)
1. [H] Timeline steps mesmo tamanho — falta Von Restorff no "TIPS ≤72h"
**Fix:** S3 + destacar "TIPS ≤72h" com 1.5× e --safe

---

### Slide 11: s-a2-03 — "Albumina: 3 indicações certas, 1 armadilha"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 3 | 3 | 3 | 4 | **2.9** |

**Veredicto:** ⚠️ WARN — SYS-1 (4º card ATTIRE ausente/clipado)
1. [M] Headline fala em "1 armadilha" mas ATTIRE card não aparece — contradição
**Fix:** I5 + S1

---

### Slide 12: s-a2-04 — "PBE: PMN ≥250 = tratar. Cada hora de atraso custa vidas"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 2 | 3 | 3 | 3 | 3 | 4 | **3.0** |

**Veredicto:** ⚠️ WARN — SYS-1 (3º step truncado), SYS-2
**Fix:** S1 + S3

---

### Slide 13: s-a2-05 — "HRS-AKI: 3 perguntas antes da terlipressina"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 3 | 3 | 3 | 4 | **3.1** |

**Veredicto:** ⚠️ WARN — SYS-2 (~40% vazio)
1. [V] Items texto puro em cards brancos — sem iconografia ou cor semântica (✓/⚠/✕)
**Fix:** S3 + ícones semânticos (safe/warning/danger)

---

### Slide 14: s-a2-06 — "Encefalopatia: lactulose + rifaximina + nutrição"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN — SYS-1 (3º pilar Nutrição completamente invisível), SYS-2
1. [M] Headline fala "lactulose + rifaximina + nutrição" mas nutrição não aparece
**Fix:** I6 + S1

---

### Slide 15: s-cp2 — "Cr 2,8 + Na 126 + ascite tensa. HRS-AKI?"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 4 | 3 | 4 | 3 | 4 | **3.4** |

**Veredicto:** ⚠️ WARN — SYS-2
1. [C] Danger red tinting funciona bem — semântica clara ✓
2. [E] Case card: campos Na e MELD-Na sem valores visíveis
**Fix:** S3 + preencher campos case card

---

### Slide 16: s-a3-01 — "Recompensação é real — e Baveno VII a definiu"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 3 | 3 | 3 | 4 | **3.1** |

**Veredicto:** ⚠️ WARN — SYS-2
1. [V] Critérios são texto puro — sem checkmarks visuais ou timeline to recompensation
**Fix:** S3 + checkmarks verdes animados

---

### Slide 17: s-a3-02 — "SVR cura o vírus mas não a hipertensão portal"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 3 | 3 | 3 | 4 | **2.9** |

**Veredicto:** ⚠️ WARN — SYS-1 (3º painel MASLD clipado), SYS-2
1. [M] Headline fala CSPH geral mas apenas 2 de 3 etiologias visíveis
**Fix:** I7 + S1

---

### Slide 18: s-a3-03 — "Vigilância a cada 6 meses — nunca dar alta"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 4 | 3 | 3 | 4 | 4 | **3.4** |

**Veredicto:** ⚠️ WARN — SYS-2 (~35% vazio)
1. [V] Surveillance box bem posicionado — um dos melhores slides ✓
2. [H] "a cada 6 meses" hero-sized funciona, mas "US ± AFP" compete em peso visual
**Fix:** S3 + countUp "6 meses" em --text-hero

---

### Slide 19: s-cp3 — "SVR + abstinência, LSM 32→18. Recompensou?"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 4 | 3 | 4 | 3 | 4 | **3.4** |

**Veredicto:** ⚠️ WARN — SYS-2, SYS-3
1. [C] Hope green tinting funciona — case panel "Recompensando" coerente ✓
2. [V] "32→18" poderia ser hero animado
**Fix:** S3 + S4 (hero "32→18")

---

### Slide 20: s-close — "5 números classificaram. 3 decisões salvaram."

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 3 | 4 | 3 | 4 | **3.3** |

**Veredicto:** ⚠️ WARN — SYS-2
1. [S] Take-homes genéricos em cards brancos — CTA fraco para slide de fechamento
2. [H] Case panel timeline (resolved) é bom touch narrativo ✓
**Fix:** S3 + hero headline + bg-navy opcional

---

### Slide 21: s-app-01 — "ACLF grau 3: mortalidade 28d >70%"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 4 | 3 | 3 | 3 | 4 | **3.3** |

**Veredicto:** ⚠️ WARN — SYS-2 (~30% vazio)
1. [C] Grau 3 com borda danger red — semântica boa ✓
2. [V] Percentuais (~20%, ~30%, >70%) poderiam ser barras horizontais coloridas
**Fix:** S3 + barras safe→warning→danger; ">70%" em hero

---

### Slide 22: s-app-02 — "Early TIPS em 72h — NNT 4"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN — SYS-1 ("Early TIP..." cortado), SYS-2 (>50%), SYS-3
**Fix:** S1 + S3 + S4

---

### Slide 23: s-app-03 — "Etiologias raras: ABCW"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN — SYS-1 (col "Exame" severamente truncada: "ANA, a...", "Cerulo...")
1. [M] Tabela perde propósito sem coluna de exames legível
**Fix:** I8 + S1

---

### Slide 24: s-app-04 — "NSBB ≥ EVL — carvedilol superior em HVPG"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.6** |

**Veredicto:** ⚠️ WARN — SYS-2 (>45%)
1. [V] 3 frases em cards brancos genéricos — sem comparação visual NSBB vs EVL
**Fix:** S3 + layout 2-colunas comparativo com HR/NNT

---

### Slide 25: s-app-05 — "Cardiomiopatia cirrótica: 48% prevalência"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.6** |

**Veredicto:** ⚠️ WARN — SYS-2 (~45%), SYS-3
1. [V] Critérios CCC texto puro — sem ícones (coração, eco)
**Fix:** S3 + S4 + ícones

---

### Slide 26: s-app-06 — "SHP vs HPP: fisiopatologia oposta"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 1 | 3 | 2 | 3 | 2 | 3 | **2.4** |

**Veredicto:** ⛔ FAIL — SYS-1 (HPP panel completamente clipado)
1. [M] Headline promete "oposta" (comparação) mas só SHP é legível
**Fix:** I9 + S1

---

### Slide 27: s-app-07 — "Estatina adjuvante: HVPG −2 mmHg"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 2 | 3 | 2 | 3 | 2 | 3 | 2 | 3 | **2.5** |

**Veredicto:** ⚠️ WARN — SYS-1 (LIVERHOPE box clipado: "LIVERHO..."), SYS-2 (>45%)
**Fix:** I10 + S1

---

### Slide 28: s-app-08 — "CIRROXABAN 2025: p=0,058 NS"

| H | T | E | C | V | K | S | M | Média |
|---|---|---|---|---|---|---|---|-------|
| 3 | 3 | 3 | 3 | 2 | 3 | 3 | 4 | **3.0** |

**Veredicto:** ⚠️ WARN — SYS-2 (~40%)
1. [V] 3 text items sem visual — forest plot mini ou HR com CI faltando
2. [M] "p=0,058 NS" na headline comunica incerteza bem ✓
**Fix:** S3 + hero "0,058" + visual HR/CI

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
