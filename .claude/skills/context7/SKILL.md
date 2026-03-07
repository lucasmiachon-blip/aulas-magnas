---
name: context7
description: Injeta documentação atualizada de bibliotecas no contexto. Ativar automaticamente quando o usuário trabalhar com GSAP, Reveal.js, Vite, OKLCH, ou qualquer lib do projeto. Resolve hallucination de APIs desatualizadas. Usar "/context7 [library]" para busca manual.
version: 1.0.0
context: lazy
agent: general-purpose
allowed-tools: Read, WebSearch, WebFetch
argument-hint: "[library name + version?]"
triggers:
  - gsap
  - reveal.js
  - vite
  - oklch
  - postcss
  - decktape
  - data-animate
---

# Context7 — Docs on Demand

Busca documentação real e versionada para: `$ARGUMENTS`

## Como funciona

Context7 (Upstash) resolve o problema de Claude gerar código contra APIs desatualizadas.
Em vez de depender do training-data (pode ter 1-2 anos de defasagem), busca a doc oficial atual.

## Uso

### Via MCP (se configurado)
```json
// .claude/settings.json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

Ferramentas disponíveis via MCP:
1. `resolve-library-id` — mapeia nome → ID estável do Context7
2. `query-docs` — busca seções de documentação pelo ID

### Fallback (sem MCP — WebSearch)

Se MCP não disponível, buscar diretamente:

```
1. Identificar biblioteca + versão do package.json
2. WebSearch: "[library] [version] official docs [specific-api]"
3. WebFetch: URL da doc oficial
4. Extrair apenas a seção relevante (não toda a doc)
```

## Bibliotecas deste projeto

| Lib | Versão | URL prioritária |
|-----|--------|----------------|
| GSAP | 3.12.x | gsap.com/docs/v3/ |
| Reveal.js | 5.x | revealjs.com/api/ |
| Vite | 6.x | vitejs.dev/guide/ |
| PostCSS | latest | postcss.org/api/ |

## Quando ativar

- Usuário menciona uma dessas libs + vai escrever/editar código
- Erro inesperado que pode ser API mismatch ("method undefined", "option removed")
- Antes de usar feature nova que pode ter mudado entre versões

## Output

Retornar apenas o trecho relevante da doc (não a página inteira):
```
## [Library] v[X.Y] — [API específica]
Fonte: [URL] | Verificado: [data]

[Trecho da doc oficial]

### Diferença do training-data (se relevante):
⚠ API X foi removida em v[Y] — usar Y em vez disso
```

## Token efficiency

Este skill é lazy-loaded: Claude lê só o frontmatter YAML no startup (~50 tokens).
O corpo completo só é carregado quando ativado — redução de ~77% vs SessionStart hook.
