---
name: repo-janitor
description: Audita repo para orphan files, broken MD links, dead HTML, e temp files. READ-ONLY por default — limpa so com --fix explicito. Usar quando suspeitar de acumulo de lixo, antes de ZIP export, ou apos varias sessoes de refactor. Exemplos "limpar repo", "tem lixo?", "orphan files", "repo-janitor".
version: 1.0.0
context: fork
agent: repo-janitor
allowed-tools: Read, Bash, Glob, Grep
argument-hint: "[--fix] [--scope docs|slides|all]"
---

# repo-janitor — Auditoria de Higiene do Repo

Audita o repositorio e reporta debris acumulado: `$ARGUMENTS`

## O que detecta

| Categoria | Exemplos | Severidade |
|-----------|----------|------------|
| **Orphan files** | .html nao referenciado em _manifest.js, .css sem import | WARN |
| **Broken MD links** | `[texto](caminho.md)` apontando para arquivo inexistente | FAIL |
| **Dead HTML** | Slides com `<!-- DEPRECATED -->` ou comentados no manifest | WARN |
| **Temp files** | `*.tmp`, `*.bak`, `*~`, `.DS_Store`, `Thumbs.db` | FAIL |
| **Stale screenshots** | `qa-screenshots/` com PNGs orfaos (slide deletado/renomeado) | WARN |
| **Empty dirs** | Diretorios vazios apos refactor | INFO |
| **Duplicate assets** | Imagens identicas com nomes diferentes em `shared/assets/` | WARN |

## Worktree Awareness

Em worktrees, cwd pode diferir do repo root. Usar `git rev-parse --show-toplevel` como base para todos os globs e paths. Nunca assumir que cwd = repo root.

## Workflow

### Mode READ-ONLY (default)
1. Glob por patterns de temp files (`*.tmp`, `*.bak`, `*~`, `.DS_Store`, `Thumbs.db`)
2. Glob por `aulas/*/slides/*.html` → checar se cada um esta no `_manifest.js` correspondente
3. Grep em `docs/**/*.md` e `aulas/**/*.md` por links `[...](...)` → verificar se target existe
4. Listar `qa-screenshots/` → checar se slide-id corresponde a slide existente
5. Reportar no formato abaixo

### Mode --fix (so com argumento explicito)
1. Executar audit READ-ONLY primeiro
2. Mostrar lista de acoes propostas ao usuario
3. ESPERAR aprovacao antes de executar qualquer delecao
4. Executar e commitar com msg: `chore: repo-janitor cleanup — [N] items`

## Output

```
## Repo Janitor Report — [data]

### FAIL (acao recomendada)
- [arquivo]: [motivo]

### WARN (revisar)
- [arquivo]: [motivo]

### INFO
- [item]: [detalhe]

### Summary
- Scanned: [N] files
- FAIL: [N] | WARN: [N] | INFO: [N]
- Sugestao: [acao se houver FAILs]
```

## Escopos

| Scope | O que varre |
|-------|------------|
| `docs` | docs/*.md, .claude/rules/*.md, .claude/skills/*/SKILL.md |
| `slides` | aulas/*/slides/*.html, _manifest.js, qa-screenshots/ |
| `all` | Tudo acima + shared/, root files, .cursor/ |

Default: `all`

## Regras

- **NUNCA deletar sem --fix E aprovacao do usuario**
- **NUNCA tocar em shared/** (read-only em qualquer branch)
- Ignorar `node_modules/`, `.git/`, `dist/`
- Ignorar `docs/archive/` (lixo intencional)
- Se encontrar arquivo suspeito mas incerto → WARN, nao FAIL
