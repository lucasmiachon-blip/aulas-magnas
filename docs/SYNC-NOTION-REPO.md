# Sync Notion ↔ Repo

> Protocolo para manter Slides DB, Blueprint e HTML alinhados. Usar MCP Notion + Cursor.

## IDs

| Recurso | ID |
|---------|-----|
| Slides DB | `c6713964-0b31-454f-83f5-4b287911a01b` |
| Blueprint Cirrose | `30adfe68-59a8-815a-abf5-c817cd705b29` |
| References DB | `2b24bb6c-91be-42c0-ae28-908a794e5cf5` |

## Direções

### Notion → Repo

1. **Query Slides DB** (por Slug, Posição, Pipeline Status)
2. **Ler specs** (Headline PT, Evidence, Citation, Speaker Notes, Animação)
3. **Atualizar** `aulas/cirrose/index.stage-c.html` ou gerar handoff

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

## Comando sugerido

```
/sync [aula] [direção]
```
Ex: `/sync cirrose notion-to-repo` ou `/sync cirrose repo-to-notion`

(Implementar como command em `.claude/commands/` se quiser.)
