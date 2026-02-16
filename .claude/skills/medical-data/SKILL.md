---
name: medical-data
description: Verifica e formata dados clínicos em slides — exige trial/estudo, effect size com IC95%, n, e PMID/DOI para cada número. Ativar ao adicionar qualquer claim clínico, estatística ou resultado de trial a um slide.
---

## Todo número clínico no slide DEVE ter

1. **Nome do trial/estudo** (ex: PREDESCI, CANONIC, ANSWER)
2. **Effect size com IC** (ex: HR 0.51, 95% CI 0.26-0.97)
3. **Tamanho amostral** (n=XXX)
4. **PMID ou DOI** para verificação

## Hierarquia de evidência (preferir mais alto)

1. Revisão sistemática / Meta-análise IPD
2. RCT multicêntrico
3. RCT single-center
4. Coorte prospectiva
5. Coorte retrospectiva
6. Opinião de expert / consenso

## Dado incerto

- Marcar com `<!-- DATA: VERIFY -->` no HTML
- Adicionar `[DADO A CONFIRMAR]` nas speaker notes
- Flag no commit message

## Validade de guidelines

- Antes de citar, verificar se não foi superseded
- EASL CPGs: checar ano + addenda
- AASLD Practice Guidance: checar updates
- Baveno: VII (2022) é vigente; checar se Baveno VIII saiu

## Formatação de números

| Tipo | Formato | Exemplo |
|------|---------|---------|
| Mortalidade/incidência | % com 1 decimal | 3.4% |
| Hazard ratio | 2 decimais | 0.51 |
| IC | mesma precisão do ponto | 0.26-0.97 |
| p-value | exato se >0.001, senão <0.001 | p=0.034 |
| NNT | inteiro | 6 |
| Sample size | separador locale | 1.343 (pt-BR) |
