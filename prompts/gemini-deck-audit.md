# Long-Context Auditor — Prompt Gemini: Auditoria de Deck Completo

## Quando usar

Para mapear deck HTML existente slide-por-slide.
Usar no Google AI Studio (ai.google.dev) com Gemini 3.1 Pro — NÃO o app consumer.

## Prompt

```
Analise TODO o HTML abaixo de uma apresentação Reveal.js sobre [TEMA] para [PÚBLICO].

Para cada <section> (slide), extraia e organize numa tabela:

| # | Headline (<h2>) | Conteúdo corpo (resumo 1 frase) | Notes? | Citação? | Visual (tipo) | Palavras corpo | Timing |
|---|---|---|---|---|---|---|---|

Após a tabela, reporte:
1. Total de slides (contar <section> no nível correto — ignorar nested sections de fragmentos)
2. Slides SEM speaker notes (<aside class="notes">)
3. Slides SEM citação
4. Slides com >30 palavras no corpo
5. Headlines que são rótulos (não afirmações) — listar
6. Possíveis redundâncias entre slides
7. Gaps narrativos (saltos lógicos entre slides consecutivos)
8. Estimativa de tempo total vs meta de [X] minutos

NÃO reescreva nada. Apenas mapeie e reporte.

[COLAR HTML COMPLETO DO DECK]
```

## Pós-processamento

1. Revisar tabela com Lucas → decisão fica/sai/reescreve
2. Alimentar Planner com lista de issues
3. Slides marcados para reescrita → Narrative Designer + Slide Builder

## Referência completa

`agents/11-long-context-auditor.md`
