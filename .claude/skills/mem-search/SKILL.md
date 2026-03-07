---
name: mem-search
description: Busca semântica na memória do projeto — HANDOFF.md, NOTES.md, lessons.md, CHANGELOG. Usar quando precisar de contexto de sessões anteriores, decisões passadas, bugs já resolvidos, ou padrões aprendidos. Exemplos: "o que decidimos sobre animações?", "qual foi o bug do case-panel?", "lições de ontem".
version: 1.0.0
context: lazy
agent: Explore
allowed-tools: Read, Grep, Glob
argument-hint: "[query em linguagem natural]"
---

# mem-search — Memória Semântica do Projeto

Busca contexto relevante de sessões anteriores para: `$ARGUMENTS`

## Problema que resolve

Claude esquece tudo entre sessões. Nossa solução atual é manual (HANDOFF.md, NOTES.md, lessons.md).
Este skill automatiza a busca nesses arquivos com 3 passos para eficiência de tokens.

## Arquivos de memória (source of truth)

| Arquivo | Contém | Prioridade |
|---------|--------|-----------|
| `aulas/cirrose/HANDOFF.md` | Pendências + estado atual | Alta |
| `aulas/cirrose/NOTES.md` | Decisões técnicas + achados | Alta |
| `tasks/lessons.md` | Padrões aprendidos + anti-padrões | Alta |
| `aulas/cirrose/CHANGELOG.md` | Histórico verboso de mudanças | Média |
| `tasks/todo.md` | Task atual em andamento | Alta |
| `aulas/grade/HANDOFF.md` | Estado migração GRADE | Contexto |
| `aulas/osteoporose/HANDOFF.md` | Estado migração Osteoporose | Contexto |

## Workflow 3-step (token-efficient)

### Step 1 — Index (leve)
Grep por termos-chave da query nos títulos/headers de todos os arquivos de memória.
Retorna lista de: arquivo + linha + contexto de 2 linhas.
**Custo: ~300-500 tokens**

### Step 2 — Seleção
Revisar o index e identificar quais trechos são genuinamente relevantes para a query.
**Custo: zero (humano ou raciocínio)**

### Step 3 — Get full context
Read apenas das seções identificadas no Step 2 (offset + limit, não arquivo inteiro).
**Custo: ~200-800 tokens (só o necessário)**

Comparação: naive full-read de todos arquivos ≈ 4.000+ tokens.
Esta abordagem ≈ 500-1.300 tokens → economia de ~75%.

## Execução

Para a query `$ARGUMENTS`:

1. Extrair 3-5 termos-chave da query
2. Grep em todos os arquivos de memória por esses termos
3. Filtrar resultados por relevância
4. Read das seções relevantes com contexto de 10 linhas antes/depois
5. Sintetizar resposta

## Output

```
## Memória encontrada para: "[query]"

### [Arquivo] — [data da entrada]
> [Trecho relevante]

### Conexões
- Relacionado com: [outros achados se houver]
- Última atualização: [data]

### Não encontrado
[O que não foi achado na memória — sinalizar para o usuário atualizar]
```

## Quando ativar

- Início de sessão: "o que estava pendente?"
- Antes de implementar algo: "já tentamos isso antes?"
- Após bug: "esse erro apareceu antes?"
- Pergunta de contexto: "qual foi a decisão sobre X?"

## Complemento: atualizar memória

Ao final da sessão, sempre atualizar:
```bash
# HANDOFF.md: o que ficou pendente
# NOTES.md: decisões tomadas hoje
# lessons.md: padrões novos aprendidos
```
