# Design Principles — Cognição + Duarte + Tufte + Andragogia

> FAZER + anti-padrão. Referência para revisão humana e guia do agente.
> Princípios não verificáveis automaticamente — exigem julgamento visual.

---

## Lei Fundamental

### 1. Assertion-Evidence (Alley)
**Fazer:** `<h2>` = asserção clínica completa ("Carvedilol reduz HVPG e previne descompensação"). Corpo = APENAS evidência visual.
**Anti-padrão:** Título genérico ("Resultados"), corpo com bullets.
**PROIBIDO:** `<ul>` e `<ol>` em slides projetados. Listas só em notes e apêndice.

---

## Andragogia e Aprendizagem de Adultos

### 2. Expertise-Reversal (Sweller/Kalyuga)
**Fazer:** Congress = zero revisão básica. Ir direto a NNT, certeza GRADE, mudança de conduta.
**Anti-padrão:** Explicar fisiopatologia para hepatologistas seniores. Teoria → apêndice residência.

### 3. Testing Effect / Retrieval Practice
**Fazer:** Checkpoints com caso clínico ANTES de revelar resposta. A luta mental fixa conhecimento.
**Anti-padrão:** Resposta primeiro, pergunta depois.

### 4. Contiguidade Temporal (Mayer)
**Fazer:** Evidência visual aparece no instante da fala. Fragments revelam na ordem da fala.
**Anti-padrão:** Slide completo visível enquanto palestrante fala do item 1.

---

## Psicologia Cognitiva

### 5. Chunking (Cowan 4±1)
**Fazer:** Max 4 items por grupo visual. 3 = ideal.
**Anti-padrão:** 6+ bullets sem agrupamento.

### 6. Von Restorff (Isolamento)
**Fazer:** 1 hero element por slide, 2-3x maior que corpo. Tabela GRADE cinza → GSAP destaca só a linha de alta certeza.
**Anti-padrão:** Tudo do mesmo tamanho.

### 7. Gestalt Proximidade
**Fazer:** Gap interno < metade do gap entre grupos.
**Anti-padrão:** Itens relacionados com mesmo espaço que não-relacionados.

### 8. Gestalt Similaridade
**Fazer:** Mesmo tipo de informação = mesma cor/forma/tamanho.
**Anti-padrão:** Cards de comparação com estilos diferentes.

### 9. Gestalt Continuidade
**Fazer:** Alinhamento consistente — baseline grid.
**Anti-padrão:** Elementos "quase" alinhados.

### 10. Dual Coding (Paivio)
**Fazer:** Todo dado numérico tem representação visual.
**Anti-padrão:** Tabela de números sem destaque.

### 11. Cognitive Load (Sweller)
**Fazer:** Eliminar extraneous load — decoração, redundância.
**Anti-padrão:** Gradientes decorativos, ícones sem função.

### 12. Signaling (Mayer)
**Fazer:** Destaque visual (tamanho, peso, posição) para dado mais importante. Cor segue semântica clínica (ver design-system.md), NÃO importância genérica.
**Anti-padrão:** Cor vibrante sem significado clínico.

### 13. Spatial Contiguity (Mayer)
**Fazer:** Label junto ao dado. Em gráficos: labels via CSS absoluto junto às linhas, não em legenda distante.
**Anti-padrão:** Número no topo, explicação no rodapé.

### 14. Redundancy Principle (Mayer)
**Fazer:** Slide mostra visual, palestrante fala explicação. Não duplicar.
**Anti-padrão:** Parágrafo no slide que palestrante lê.

### 15. Primacy-Recency (Ebbinghaus)
**Fazer:** Conteúdo mais importante no início e final. Checkpoint no meio.
**Anti-padrão:** Info crítica enterrada no minuto 25 de 45.

### 16. Anchoring (Kahneman)
**Fazer:** Número de contraste ANTES do número-alvo. Primeiro ancora.
**Anti-padrão:** Resultado sem referência comparativa.

---

## Escola Duarte

### 17. Sparkline Narrativa
**Fazer:** Alternar "estado atual" (problema) e "estado possível" (solução). Mínimo 4 beats.
**Anti-padrão:** Deck linear sem tensão.

### 18. Contraste como Ritmo
**Fazer:** Alternar bg escuro / claro como marcador de mudança narrativa.
**Anti-padrão:** Todos slides com mesmo background.

### 19. Ponto Focal Único
**Fazer:** UM elemento dominante por slide.
**Anti-padrão:** 3 elementos competindo.

### 20. New Bliss / CTA
**Fazer:** Último slide = ação concreta que o público faz amanhã.
**Anti-padrão:** "Obrigado" genérico.

### 21. Regra de 3
**Fazer:** Max 3 grupos por layout. 3 takeaways.
**Anti-padrão:** 5+ categorias lado a lado.

---

## Escola Tufte

### 22. Data-Ink Ratio
**Fazer:** Cada pixel carrega informação. Zero gridlines/sombras decorativas.
**Anti-padrão:** Box-shadow sem função.

### 23. Tabelas Tufte (regra operacional)
**Fazer:** Sem bordas verticais. Horizontal só thead e totais. Números à direita, texto à esquerda. Destaque por cor semântica na linha, não por borda.
**Anti-padrão:** Tabela com grade completa estilo Excel.

### 24. Sparklines (Tufte)
**Fazer:** Gráficos word-sized embutidos no contexto.
**Anti-padrão:** Gráfico full-slide para tendência simples.

### 25. Small Multiples
**Fazer:** Mesmo layout repetido com dados diferentes.
**Anti-padrão:** Gráficos com layouts diferentes para dados comparáveis.

### 26. Lie Factor = 1
**Fazer:** Efeito visual proporcional ao efeito nos dados.
**Anti-padrão:** Barra que dobra para dado que cresceu 10%.

### 27. Layering & Separation
**Fazer:** Separar tipos de info com cor, posição, opacidade — sem bordas.
**Anti-padrão:** Caixas em volta de tudo.

---

## Layout Patterns

### F-Pattern
**Quando:** Texto + dados laterais. Headline horizontal → itens empilhados → painel secundário.

### Z-Pattern
**Quando:** Impacto (abertura, hero, CTA). Tag top-left → contexto → headline center → CTA bottom.

### Hierarquia de Atenção
1. Tamanho — maior = mais importante
2. Cor/Contraste — mais saturado (se semântico) = mais importante
3. Posição — top-left primeiro (ocidental)
4. Peso tipográfico — bold > regular

### Fill Ratio

| Tipo | Alvo |
|------|------|
| Data-heavy | 75-90% |
| Conceitual | 65-80% |
| Checkpoint | 50-65% |
| Hero/quote | 30-55% |
