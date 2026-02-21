# Long-Context Auditor — Prompt Gemini: Extração de Paper Longo

## Quando usar

Para processar papers >50 páginas: Cochrane Handbook, EASL CPGs completas, guidelines extensas.
Google AI Studio (ai.google.dev) com Gemini 3.1 Pro.

## Prompt

```
Analise o paper/guideline completo abaixo sobre [TEMA].
Contexto: estou criando slides de aula para [PÚBLICO] sobre [TEMA ESPECÍFICO DA AULA].

Extraia e organize:

### 1. Recomendações
| # | Recomendação (texto original resumido) | Força (forte/fraca) | Certeza (alta/moderada/baixa/muito baixa) | Seção do paper |
|---|---|---|---|---|

### 2. Tabelas e Figuras relevantes
| # | Tabela/Figura | Conteúdo (descrição) | Relevância para slides (alta/média/baixa) | Reproduzível? |
|---|---|---|---|---|

### 3. Dados numéricos-chave
| Dado | Valor | IC 95% | n | Fonte (tabela/texto) | Seção |
|---|---|---|---|---|---|

### 4. Mudanças vs versão anterior
| Tópico | Antes | Agora | Impacto clínico |
|---|---|---|---|

### 5. Controvérsias ou evidência incerta
- [Listar tópicos onde o paper reconhece incerteza]

NÃO invente dados. Se algo não está no paper, diga "não mencionado".
Se o paper for truncado, declare exatamente onde parou.

[COLAR PAPER COMPLETO]
```

## Referência completa

`agents/11-long-context-auditor.md`
