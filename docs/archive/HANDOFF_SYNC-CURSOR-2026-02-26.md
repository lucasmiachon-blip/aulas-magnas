# Sync Cursor Setup — 2026-02-26

**Origem:** Aulas_core  
**Destino:** aulas-magnas (Cirrose)

## O que foi sincronizado

### MCP
- **pubmed:** alterado de `npx` direto para `node scripts/run-pubmed-mcp.js` (fix tiktoken Windows)
- **pubmed-simple:** adicionado (Python/uvx)
- **zotero:** adicionado (uvx, modo local)

### Scripts
- `scripts/run-pubmed-mcp.js` — wrapper fix tiktoken_bg.wasm

### Rules
- `design-principles.mdc` — adicionado (princípios cognitivos, Escola Duarte)

### Skills e Agents
- Já existiam e estavam adaptados para Cirrose (tri-mode, etc.)

### Docs
- `docs/MCP-ENV-VARS.md` — criado
- `.env.example` — adicionadas PUBMED_EMAIL, ZOTERO_API_KEY, ZOTERO_LIBRARY_ID

---

## Variáveis de ambiente

Definir em sysdm.cpl (Windows):
- `PUBMED_EMAIL` — obrigatório para pubmed-simple
- `ZOTERO_LIBRARY_ID` — 0 ou User ID para modo local
- `NCBI_API_KEY` — já existia

---

## Próximos passos

1. Reiniciar Cursor ao abrir aulas-magnas
2. Verificar MCPs em Settings → MCP
