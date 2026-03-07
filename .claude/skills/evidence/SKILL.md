---
name: evidence
description: Busca evidências clínicas no PubMed para slides. Use quando o usuário pedir "buscar evidência", "pesquisar trial", "search evidence", "achar estudo sobre", "preciso de PMID para". Retorna citação AMA + números prontos para slide.
context: fork
agent: general-purpose
argument-hint: "[query clínica]"
---

# Search Evidence

Busca evidência clínica para: `$ARGUMENTS`

## Passos

1. Buscar PubMed MCP (se disponível) com filtros:
   - `randomized controlled trial[pt]`
   - `meta-analysis[pt]`
   - `practice guideline[pt]`
   - `systematic review[pt]`
2. Filtrar: tier-1 primeiro (RCT multicêntrico > meta-análise > guideline)
3. Ordenar por data (mais recente primeiro)
4. Para cada resultado relevante, extrair:
   - Citação AMA completa + PMID/DOI
   - Design + n
   - Primary endpoint + effect size com IC 95% + p-value
   - Impacto na prática clínica

## Output

```
## [Tópico] — Evidência (buscado [data])

### Tier-1 Encontrado:

1. **[Trial Name]** (Ano)
   Autor et al. Journal Ano;Vol:Pags. PMID: XXXXX
   Design: [RCT/Meta-análise/Guideline] | n = XXX
   Endpoint: [descrição]
   Resultado: [effect size] (95% CI: X–Y), p = Z
   Impacto: [mudança de conduta]

### Assertion pronta para slide:
"[Frase completa adequada para <h2>]"

### Dados a verificar:
- [números incertos sinalizados com [VERIFY]]
```

## Regras

- NUNCA inventar dados — se não encontrar, reportar `[TBD]`
- HR ≠ RR ≠ OR — especificar sempre
- Trial isolado ≠ meta-análise — não misturar
