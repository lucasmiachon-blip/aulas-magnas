# Long-Context Auditor — Prompt Gemini: Comparação de Transcrições

## Quando usar

Para comparar múltiplas transcrições de aulas sobre o mesmo tema (versões diferentes, anos diferentes).
Google AI Studio (ai.google.dev) com Gemini 3.1 Pro.

## Prompt

```
Compare as [N] transcrições abaixo. Todas são aulas sobre [TEMA] dadas por [PALESTRANTE] em datas diferentes.

Produza:

### 1. Tópicos cobertos (matriz)
| Tópico | Transcrição 1 ([data]) | Transcrição 2 ([data]) | ... | Notas |
|---|---|---|---|---|
(✓ = coberto, ✗ = ausente, ~ = mencionado brevemente)

### 2. Tópicos únicos de cada versão
- Transcrição 1: [lista]
- Transcrição 2: [lista]

### 3. Contradições ou mudanças de posição
| Tópico | Versão anterior | Versão recente | Provável motivo |
|---|---|---|---|

### 4. Progressão de complexidade
- A versão mais recente é mais/menos/igualmente complexa?
- Quais conceitos foram adicionados? Removidos? Simplificados?

### 5. Melhores trechos (para reuso em slides)
- [Citar trechos com timestamp que são particularmente claros ou impactantes]

### 6. Resumo executivo (5-7 linhas)

[COLAR TRANSCRIÇÕES COM MARCAÇÃO CLARA: === TRANSCRIÇÃO 1 === etc.]
```

## Referência completa

`agents/11-long-context-auditor.md`
