---
name: assertion-evidence
description: Cria e valida slides médicos no formato Assertion-Evidence — título como afirmação clínica verificável (max 2 linhas) + evidência visual dominante no corpo. Ativar ao criar, editar ou revisar qualquer HTML em aulas/*/index.html.
---

## Formato obrigatório

Cada slide DEVE ter:

1. **Título = afirmação completa** (NÃO rótulo de tópico)
   - ✅ "Carvedilol reduces first decompensation by 51% in compensated cirrhosis"
   - ❌ "Carvedilol in Cirrhosis"
   - ❌ "Results"
2. **Evidência visual no corpo** — gráfico, diagrama, tabela ou número-chave
   - SEM bullet points, SEM parágrafos (max 30 palavras no corpo)
3. **Citação no footer** — formato AMA com PMID
   - `<footer class="citation">Author et al. Journal Year;Vol:Pages. PMID: XXXXX</footer>`

## Estrutura HTML

```html
<section>
  <div class="slide-inner">
    <p class="section-tag">BLOCO</p>
    <h2>Afirmação clínica completa aqui</h2>
    <div class="evidence">
      <!-- gráfico/tabela/diagrama/número -->
    </div>
    <footer class="citation">Fonte</footer>
  </div>
  <aside class="notes">Speaker notes: o que FALAR (não ler)</aside>
</section>
```

## Tokens de cor

- Significado clínico: `--safe`, `--warning`, `--danger`, `--downgrade`
- Chrome de UI: `--ui-accent` (NUNCA para significado clínico)
- Séries de dados: `--cmp-1/2/3` (2-3 séries) ou `--data-1..7` (4+)
- NUNCA cor hardcoded — sempre CSS custom properties

## Animação

- Usar `data-animate`: countUp, stagger, drawPath, fadeUp, highlight
- Animação GUIA atenção, não decora
- Todo elemento animado deve funcionar sem animação (graceful degradation)

## Números

- Classe `data-number` para números clínicos
- CountUp: `data-animate="countUp" data-target="42.5"`
- Locale: pt-BR (toLocaleString)

## Checklist de validação

- [ ] Título é frase completa com claim verificável?
- [ ] Corpo ≤30 palavras de texto?
- [ ] Zero bullet points?
- [ ] Evidência visual presente?
- [ ] Citação com PMID?
- [ ] Cores usam tokens?
- [ ] Speaker notes presentes?
