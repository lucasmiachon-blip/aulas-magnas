# GTD + Obsidian — Roadmap de Integracao

> Documento de referencia. NAO e skill — e plano para quando Obsidian entrar no workflow.
> Criado: 2026-03-12. Revisitar quando projeto crescer.

---

## Estado Atual (v1 — File-based)

```
gtd/
├── inbox.md
├── next-actions.md
├── projects.md
├── waiting-for.md
├── someday-maybe.md
└── done.md
```

Markdown puro. Funciona com qualquer editor. Claude Code le/escreve diretamente.

---

## Fase 2 — Obsidian Vault (quando adotar)

### Estrutura proposta

```
vault/
├── gtd/                    ← mesmos arquivos, agora dentro do vault
│   ├── inbox.md
│   ├── next-actions.md
│   ├── projects.md
│   ├── waiting-for.md
│   ├── someday-maybe.md
│   └── done.md
├── aulas/
│   ├── cirrose/
│   │   ├── slides-index.md    ← links para cada slide (Obsidian graph)
│   │   └── references.md      ← links para papers (Obsidian + Zotero)
│   ├── grade/
│   └── osteoporose/
├── references/
│   ├── papers/                ← 1 note por paper (PMID como filename)
│   └── guidelines/            ← 1 note por guideline
├── templates/
│   ├── gtd-item.md
│   ├── paper-note.md
│   └── slide-note.md
└── daily/                     ← daily notes (diario de progresso)
```

### O que muda no skill GTD

| v1 (atual) | v2 (Obsidian) |
|------------|---------------|
| Arquivos em `gtd/` na raiz do repo | Arquivos em `vault/gtd/` |
| Links como texto | `[[wikilinks]]` do Obsidian |
| Contextos como tags inline | `#tag` do Obsidian (pesquisavel) |
| Sem graph view | Graph mostra dependencias entre projetos/slides/papers |
| Sem daily notes | Daily note = diario de sessao (substitui parte do NOTES.md) |

### Plugins Obsidian recomendados

| Plugin | Funcao | Por que |
|--------|--------|---------|
| **Tasks** | Checkbox queries | `- [ ]` com datas, recorrencia, filtros |
| **Dataview** | SQL-like queries em Markdown | "mostre todas tarefas @computador nao feitas" |
| **Templater** | Templates com logica | Auto-preencher data, projeto, contexto |
| **Zotero Integration** | Importar papers | PMID → nota com metadata + anotacoes |
| **Git** (obsidian-git) | Sync com repo | Vault versionado junto com o codigo |
| **Kanban** | Board visual | Inbox → Next → Done visual |

### MCP Obsidian

O skill `gtd-cc` (nikhilmaddirala) ja implementa integracao Obsidian via MCP:
- URL: https://github.com/nikhilmaddirala/gtd-cc
- Usa `obsidian-gtd` skill para vault management + GTD workflows
- Avaliar quando Obsidian estiver no workflow

---

## Fase 3 — Multi-projeto (quando tiver >1 aula ativa)

### Problema

Hoje: 1 aula ativa (cirrose), 2 migradas (grade, osteoporose), 1 planejando (metanalise).
Amanha: 4+ aulas ativas, cada uma com seu pipeline de slides.

### Solucao

```markdown
## Projects

### Cirrose (ativo)
- [ ] Preencher Act 3 skeletons
- [ ] QA visual Gemini
- [ ] P3: migrar IDs case-panel

### Meta-analise (planejamento)
- [ ] Definir escopo com Lucas
- [ ] Levantar papers Tier 1

### Grade (manutencao)
- [ ] Atualizar se guideline 2026 sair
```

Com Obsidian: cada projeto e uma nota com backlinks para slides, papers, e tarefas.
Graph view mostra o ecossistema inteiro.

---

## Criterios para Migrar (quando puxar o gatilho)

- [ ] >2 aulas ativas simultaneamente
- [ ] Referencia a >50 papers (Zotero + Obsidian faz sentido)
- [ ] Necessidade de graph view para visualizar dependencias
- [ ] Lucas confortavel com Obsidian basico (vault, links, tags)
- [ ] Tempo dedicado para setup (~2-4h inicial)

**Nao migrar antes de pelo menos 2 criterios serem verdade.**

---

## Compatibilidade Backward

v1 → v2 e mover arquivos + adicionar wikilinks. Zero perda.
Se Obsidian nao funcionar, voltar para v1 e so remover wikilinks.
Risco de migracao: muito baixo.
