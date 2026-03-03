# Prompt — Busca Semanal de Atualizações

> Rodar via subagent `generalPurpose` ou `explore`. Atualizar `docs/ECOSYSTEM.md` se houver mudanças.

---

## Prompt

```
Buscar atualizações dos últimos 7 dias para:

- MCP servers: pubmed, notion, playwright, a11y, crossref, memory, zotero, scite
- Cursor (changelog, releases)
- Reveal.js, Vite, GSAP (npm)
- PubMed/CrossRef APIs (docs NCBI)

Para cada item:
1. Versão atual vs latest
2. Breaking changes se houver
3. Recomendação: atualizar agora ou manter

Listar resultados em formato de tabela. Atualizar docs/ECOSYSTEM.md se houver mudanças relevantes.
```

---

## Frequência sugerida

| O quê                 | Frequência |
| --------------------- | ---------- |
| MCPs                  | Semanal    |
| Cursor                | Semanal    |
| Skills Cursor         | Mensal     |
| Reveal.js, GSAP, Vite | Mensal     |
| PubMed/CrossRef APIs  | Trimestral |
