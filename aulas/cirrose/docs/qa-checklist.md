# Agent: QA Checklist

> Assertions de qualidade por slide. Executar APÓS cada refactor.
> Cada assertion é binária: PASS ou FAIL. Target: 100% PASS.

## Global Assertions (aplicar em TODOS os slides)

| # | Assertion | Método |
|---|-----------|--------|
| G1 | `<h2>` é assertion clínica (verbo + dado), não rótulo genérico | Visual |
| G2 | Zero bullet points (`<ul><li>` permitido apenas em speaker notes) | DOM grep |
| G3 | Fill ratio ≥ 60% (conteúdo ocupa ≥60% da viewport) | Screenshot |
| G4 | Nenhum texto truncado ou clipado por case panel | Screenshot |
| G5 | `<aside class="notes">` presente e não-vazio | DOM grep |
| G6 | Zero erros no console do browser | DevTools |
| G7 | `data-animate` ou `registerCustom` — conteúdo não fica `opacity: 0` | Nav + hash jump |
| G8 | Contraste texto ≥ 4.5:1 (WCAG AA) | Lighthouse |
| G9 | Source-tag presente se slide contém dado citável (HR, NNT, p, %) | Visual + evidence-db.md |
| G10 | Nenhum `!important` novo adicionado | CSS diff |

## Per-Slide Assertions

### s-title
- [ ] Hero typography (headline ≥ `--text-hero`)
- [ ] Subtítulo menor que headline (ratio ≥ 1.5×)
- [ ] Identidade visual (não parece template genérico)

### s-a1-01 (figure)
- [ ] Figura Villanueva visível e não-clipada
- [ ] Click-reveal: 2 steps funcionais (ArrowRight)
- [ ] Evidence card legível

### s-a1-02 (figure)
- [ ] Figura densa com highlight/anotação na área relevante
- [ ] Headline ≤ 2 linhas

### s-hook (custom)
- [ ] "5 números" e "3 decisões" ambos visíveis (stagger completo)
- [ ] "Albumina 3,6" com espaço correto (não "Albumina3,6")
- [ ] Framework items (Classificar/Intervir/Reverter) diferenciados visualmente
- [ ] Case card visível e funcional
- [ ] CasePanel state = neutral

### s-a1-03 (interactive)
- [ ] MELD calculator: 4 inputs renderizados
- [ ] Barra de zonas coloridas visível (não clipada pelo panel)
- [ ] Botão calcular e reset funcionais
- [ ] "Seu Antônio" dados carregados

### s-a1-04 (bars)
- [ ] 3 barras PREDICT visíveis (Infecção, Hemorragia, Álcool)
- [ ] Números em fonte hero sobre as barras

### s-a1-05 (table)
- [ ] 10 etiologias visíveis (não truncadas)
- [ ] Coluna "Exame" legível por completo

### s-cp1 (checkpoint)
- [ ] CasePanel state = caution
- [ ] Click-reveal: 3 decision options funcionais
- [ ] Nenhuma option truncada pelo panel
- [ ] Background caution (amarelo sutil)

### s-a2-01 (metrics)
- [ ] 3 metric cards visíveis (HR, NNT, Dose)
- [ ] Click-reveal: 3 steps funcionais
- [ ] Card 3 (dose) não clipado

### s-a2-02 (timeline)
- [ ] 4 steps de timeline visíveis
- [ ] Step "TIPS ≤72h" com destaque visual (Von Restorff)

### s-a2-03 (cards)
- [ ] 4 albumin cards visíveis (SBP, HRS, dose, **ATTIRE**)
- [ ] ATTIRE card com --danger styling
- [ ] Grid 2×2 (não row horizontal)

### s-a2-04 (flow)
- [ ] 3 steps de flow visíveis (Dx, Tx, profilaxia 2ária)
- [ ] Nenhum step truncado

### s-a2-05 (decision-tree)
- [ ] 3 numbered items visíveis
- [ ] Ícones ou cores semânticas (safe/warning/danger)

### s-a2-06 (pillars)
- [ ] 3 pilares visíveis (lactulose, rifaximina, nutrição)
- [ ] Pilar 3 (nutrição) NÃO clipado pelo panel

### s-cp2 (checkpoint)
- [ ] CasePanel state = danger
- [ ] Background danger (vermelho sutil)
- [ ] Na e MELD-Na com valores visíveis no case card

### s-a3-01 (criteria)
- [ ] 3 critérios Baveno VII visíveis
- [ ] Algum destaque visual diferenciador

### s-a3-02 (panels)
- [ ] 3 painéis etiologia visíveis (HCV, Álcool, MASLD)
- [ ] Painel 3 NÃO clipado

### s-a3-03 (surveillance)
- [ ] Surveillance box centralizado e expandido
- [ ] "6 meses" com destaque hero

### s-cp3 (checkpoint)
- [ ] CasePanel state = hope
- [ ] Background hope (verde sutil)
- [ ] "32 → 18" com destaque visual

### s-close (recap)
- [ ] 3 take-homes visíveis
- [ ] CasePanel state = resolved (timeline)
- [ ] Headline hero-sized

### Appendix (s-app-01 a s-app-08)
- [ ] Case panel oculto OU conteúdo respeita largura disponível
- [ ] Dados clínicos conferem com evidence-db.md
- [ ] Tabelas/comparações legíveis por completo

## Scoring pós-QA

Usar rubrica do AUDIT-VISUAL.md (8 dimensões × 1-5):
- **H** = Headline (assertion, não rótulo)
- **T** = Typography (hierarchy, readability)
- **E** = Evidence/content (completude, nada clipado)
- **C** = Color semantics (safe/warning/danger corretos)
- **V** = Visual design (fill ratio, Von Restorff)
- **K** = Keyboard/interaction (click-reveal, calc)
- **S** = Speaker notes (presentes, staging cues)
- **M** = Motion (GSAP triggers, fallback CSS)

Verificação de dados: `grep "s-{id}" references/evidence-db.md` — conferir HR, NNT, PMID.

- **Target mínimo:** média ≥ 4.0 por slide
- **Target global:** média ≥ 4.0 (28 slides)
- Se < 4.0: reabrir agents/slide-refactor.md e iterar
