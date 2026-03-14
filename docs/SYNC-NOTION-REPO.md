# Sync Notion ↔ Repo

> Protocolo para manter Slides DB, Blueprint e HTML alinhados. MCP Notion + Cursor.
> **IDs Notion:** única referência no repo — outros MDs apontam aqui.

**Autoridade em conflito:** O que Composer ou Claude Opus determinar como mais atual prevalece. Repo e Notion devem refletir essa decisão.

## IDs

**Fonte canônica:** `.env.example` na raiz do repo. IDs externalizados para higiene.

| Recurso | Variável em `.env.example` |
|---------|---------------------------|
| Slides DB | `NOTION_SLIDES_DB_ID` |
| Slides DB (data source para API) | `NOTION_SLIDES_DATA_SOURCE_ID` |
| Blueprint Cirrose | `NOTION_BLUEPRINT_CIRROSE_ID` |
| Blueprint Meta-análise | `NOTION_BLUEPRINT_META_ID` |
| References DB (outer) | `NOTION_REFS_DB_ID` |
| References DB (data source) | `NOTION_REFS_DATA_SOURCE_ID` |
| Bíblia Narrativa | `NOTION_BIBLIA_NARRATIVA_ID` |
| Dashboard Cirrose | `NOTION_DASHBOARD_CIRROSE_ID` |

## Direções

### Notion → Repo

1. **Query Slides DB** (por Slug, Posição, Pipeline Status)
2. **Ler specs** (Headline PT, Evidence, Citation, Speaker Notes, Animação)
3. **Atualizar** `aulas/cirrose/slides/*.html` (build → index.html) ou gerar handoff

**Quando:** Após mudar specs no Notion, pedir "sincroniza Notion → repo para slide X"

### Repo → Notion

1. **Após implementar slide no HTML:** atualizar Slides DB
   - `Pipeline Status` → `html-ready`
   - `Visual QA` → `approved` (se passou)
2. **Atualizar Blueprint** (blocos de texto/parágrafo — tabelas têm limitação)

**Quando:** Após batch de slides, pedir "sincroniza repo → Notion para os slides que implementei"

## Limitações da API Notion

- **table_row:** células não são editáveis via PATCH block. Tabelas na Blueprint exigem edição manual.
- **Database ID:** `retrieve-a-database` pode retornar 404; usar `query-data-source` com o ID da Slides DB.

## Multi-Aula Sync — BLOQUEADO

O sync atual assume todos os slides na Slides DB pertencem a Cirrose.
Antes de sincronizar qualquer outra aula, os seguintes pre-requisitos devem existir no Notion:

1. **Propriedade `Aula`** (Select) na Slides DB — valores: Cirrose, GRADE, Osteoporose, Meta-analise.
2. **Filtros por aula** em todas as queries do notion-sync agent.
3. **Views separadas** por aula no Notion (opcional, mas recomendado).

Ate que (1) e (2) existam, `notion-sync` e `reference-manager` devem operar **somente em Cirrose**.
Tentar sync de outra aula sem esses gates pode corromper dados de Cirrose na Slides DB.

## Comando sugerido

```
/sync [aula] [direção]
```
Ex: `/sync cirrose notion-to-repo` ou `/sync cirrose repo-to-notion`

(Implementar como command em `.claude/commands/` se quiser.)
