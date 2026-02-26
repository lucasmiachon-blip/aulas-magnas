# Variáveis de Ambiente para MCPs (aulas-magnas)

**Template:** copie `.env.example` para `.env` e preencha os valores.

O Cursor lê `${VAR}` do mcp.json a partir das variáveis de ambiente. No Windows, a forma mais confiável é definir nas **variáveis de ambiente do usuário** (sysdm.cpl → Variáveis de Ambiente).

---

## Obrigatórias (para MCPs que precisam)

| Variável | MCP | Onde obter |
|----------|-----|------------|
| `NOTION_TOKEN` | Notion | [notion.so/my-integrations](https://www.notion.so/my-integrations) |
| `NCBI_API_KEY` | PubMed (ambos) | [ncbi.nlm.nih.gov/account](https://www.ncbi.nlm.nih.gov/account/) |
| `PUBMED_EMAIL` | PubMed Simple | Seu e-mail (obrigatório para NCBI) |
| `ZOTERO_API_KEY` | Zotero (Web API) | [zotero.org/settings/keys](https://www.zotero.org/settings/keys) |
| `ZOTERO_LIBRARY_ID` | Zotero (Web API) | [zotero.org/settings](https://www.zotero.org/settings) → User ID |

---

## PubMed: dois servidores

| Servidor | Stack | Windows | Recursos |
|----------|-------|---------|----------|
| `pubmed` | Node (@cyanheads) | ✅ (fix via wrapper) | Busca, citações BibTeX/RIS, artigos relacionados |
| `pubmed-simple` | Python (uvx) | ✅ | Busca, abstracts, full text open access |

O `pubmed` usa `scripts/run-pubmed-mcp.js` para corrigir o bug tiktoken no Windows.

---

## Zotero: Local vs Web API

- **Local:** Zotero aberto, `ZOTERO_LOCAL: "true"` no mcp.json; API key pode ficar vazia
- **Web:** Definir `ZOTERO_API_KEY` e `ZOTERO_LIBRARY_ID`

---

## Troubleshooting: PubMed (Node)

| Fix | Quando usar |
|-----|-------------|
| **Node 18 ou 20 LTS** | Node 24+ pode ter incompatibilidade; use `fnm use 20` |
| **Limpar cache npx** | `npx clear-npx-cache` (fechar Cursor antes) |

---

**Sincronizado de Aulas_core em 2026-02-26**
