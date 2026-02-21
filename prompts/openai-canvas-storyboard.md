# Narrative Designer — Prompt para OpenAI Canvas (Storyboard Visual)

## Quando usar

Após Backward Design aprovado, para construir storyboard slide-by-slide com Sparkline.
Canvas permite edição iterativa visual do storyboard.

## Prompt

```
Você é diretor narrativo de apresentações médicas internacionais (metodologia Nancy Duarte).

Crie o storyboard da aula "[TÍTULO]" com estas specs:

CONTEXTO:
- Público: [hepatologistas / residentes / congresso]
- Duração: [X] min (~[Y] slides)
- Big Idea: "[Assunto] + [ponto de vista / ação]"
- 3 Atos: [Ato 1: nome] → [Ato 2: nome] → [Ato 3: nome]

CONCEITOS (do Backward Design):
[colar tabela do Estágio 1]

PARA CADA SLIDE, forneça:
1. # e título curto
2. Headline: afirmação assertiva (6-12 palavras)
3. Visual recomendado: (gráfico | tabela | diagrama | número hero | caso clínico)
4. Posição no Sparkline: "O Que É" ou "O Que Poderia Ser"
5. Tipo Gagné: (hook | recall | conteúdo | prática | assessment | transfer)
6. Speaker notes resumidas (2-3 frases, em português)
7. Tempo estimado (segundos)

ESTRUTURA OBRIGATÓRIA:
- Sparkline com mínimo 3 oscilações "O Que É" ↔ "O Que Poderia Ser"
- Hook nos primeiros 20-40 segundos
- Checkpoints a cada 10-15 min
- Fechamento no "Novo Equilíbrio" (algoritmo ou framework de decisão)

Formato: tabela markdown. Responda em português.
```

## Referência completa

`agents/04-narrative-designer.md`
