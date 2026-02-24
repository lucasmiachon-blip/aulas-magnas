# QA Visual Cirrose — Slide a Slide (24/fev/2026)

Screenshots em `qa-screenshots/` (01 a 28). Avaliação baseada em inspeção visual.

---

## Resumo

| Categoria | Status |
|-----------|--------|
| Assertion-evidence | ✅ Headlines = afirmações clínicas |
| Evidência visual | ✅ Figuras, tabelas, barras, cards |
| Source-tag | ✅ Presente em slides com dados |
| Zero bullets | ✅ OK |
| Ghost/overlay | ⚠️ Texto de slide anterior visível em transição (Reveal default) |

---

## Avaliação por slide

| # | ID | Headline | Evidência | Issues |
|---|-----|----------|-----------|--------|
| 1 | s-title | Título + subtítulo | — | OK |
| 2 | s-a1-01 | Espectro hepático | Fig Villanueva | OK |
| 3 | s-a1-02 | FIB-4 → elastografia → CSPH | Fig Villanueva | OK |
| 4 | s-hook | 5 números, 3 decisões | Framework + case card | OK |
| 5 | s-a1-03 | MELD-Na semáforo | 4 bands coloridos | OK |
| 6 | s-a1-04 | Infecção 33% | Barras PREDICT | OK |
| 7 | s-a1-05 | 10 doenças | Tabela etiologias | OK |
| 8 | s-cp1 | LSM 21, PLQ 118k | Case card | OK |
| 9 | s-a2-01 | Carvedilol PREDESCI | HR, NNT, dose | OK |
| 10 | s-a2-02 | Early TIPS | Timeline 4 passos | OK |
| 11 | s-a2-03 | Albumina 3 indicações | 4 cards ✓/✗ | OK |
| 12 | s-a2-04 | PBE PMN ≥250 | Flow Dx→Tx→Ppx | OK |
| 13 | s-a2-05 | HRS-AKI 3 perguntas | Decision tree | OK |
| 14 | s-a2-06 | Encefalopatia | 3 pilares | OK |
| 15 | s-cp2 | Cr 2,8 + Na 126 | Case danger | OK |
| 16 | s-a3-01 | Recompensação Baveno VII | 3 critérios | OK |
| 17 | s-a3-02 | SVR ≠ CSPH 53% | 3 painéis etio | OK |
| 18 | s-a3-03 | Vigilância 6m | Surv-box | OK |
| 19 | s-cp3 | LSM 32→18 | Case hope | OK |
| 20 | s-close | 5 números, 3 decisões | 3 take-homes | OK |
| 21 | s-app-01 | ACLF grau 3 | Tabela graus | OK |
| 22 | s-app-02 | Early TIPS 72h | Flow + NNT | OK |
| 23 | s-app-03 | Etiologias ABCW | Tabela | OK |
| 24 | s-app-04 | NSBB ≥ EVL | 3 pontos | OK |
| 25 | s-app-05 | Cardiomiopatia 48% | CCC critérios | OK |
| 26 | s-app-06 | SHP vs HPP | 2 painéis | OK |
| 27 | s-app-07 | Estatina HVPG | 2 boxes | OK |
| 28 | s-app-08 | CIRROXABAN p=0,058 | 3 pontos | OK |

---

## Observações

1. **Ghost text:** Em várias transições, texto do slide anterior permanece visível (comportamento padrão do Reveal). Se incomodar na projeção, considerar `transition: none` ou `backgroundOpacity: 0` nas opções.

2. **Imagens:** villanueva-2025-fig1.png e fig2a.png — verificar se assets existem em `assets/`.

3. **Contraste:** Tokens OKLCH em stage-c — descrições indicam legibilidade adequada.

4. **Paginação:** 1/28 a 28/28 visível no canto — OK para navegação.
