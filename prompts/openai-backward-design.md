# Backward Design Architect — Prompt para OpenAI o3

## Quando usar

Ao iniciar uma aula do zero ou reestruturar aula existente.
Copiar/colar no ChatGPT (modelo o3) ou API.

## Prompt

```
Sou hepatologista brasileiro preparando aula de [TEMA] para [PÚBLICO: residentes de gastroenterologia / hepatologistas / congresso misto].

Duração: [X] minutos.
Formato: slides assertion-evidence (título = afirmação clínica verificável, corpo = evidência visual).
Idioma: português (termos técnicos em inglês quando padrão internacional).

Objetivo terminal: ao final, o [público] deve conseguir [AÇÃO OBSERVÁVEL E MENSURÁVEL].

Usando Backward Design (Wiggins & McTighe), produza:

### Estágio 1 — Resultados Desejados
- 5-7 conceitos essenciais (enduring understandings) em ordem de dependência
- Para cada conceito: pergunta essencial que o motiva
- Objetivos mensuráveis com verbos de Bloom (aplicar, analisar, avaliar — não "entender")

### Estágio 2 — Evidências de Avaliação
- Para cada conceito: o que o aluno FAZ para demonstrar compreensão
- Formato viável em aula (pergunta ao público, caso clínico rápido, decisão entre opções)

### Estágio 3 — Plano de Aprendizagem
- Sequência WHERE TO (Where, Hook, Equip, Rethink, Evaluate, Tailor, Organize)
- 2-3 checkpoints interativos com timing
- O que NÃO incluir (cortes recomendados para caber no tempo)
- Dependências entre conceitos (B requer A, etc.)

Formato: tabelas markdown estruturadas.
Responda em português.
```

## Pós-processamento

1. Revisar output com Lucas
2. Alimentar Narrative Designer (role 04) com conceitos + sequência aprovados
3. Registrar no Notion staging area (30adfe68)

## Referência completa

`agents/05-backward-design-architect.md`
