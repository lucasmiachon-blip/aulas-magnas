# XREF — Referências Cruzadas

> Mapa canônico de dependências entre documentos do projeto.
> Atualizar ao criar, mover ou deletar qualquer .md.
> Gerado: 2026-03-07. Última revisão: 2026-03-11.

---

## Legenda

- **Canônico** = fonte da verdade para aquele assunto
- **→** = "referencia" ou "depende de"
- **←** = "é referenciado por"

---

## Hierarquia de Autoridade

```
CLAUDE.md (root)              ← fonte de verdade operacional (absorveu AGENTS.md)
├── .claude/rules/*.md        ← regras detalhadas (prevalecem sobre .cursor se mais completas)
├── .claude/hooks/*.sh        ← safety gates determinísticos (100% enforcement)
├── .claude/scripts/*.sh      ← worktree lifecycle (init, cleanup)
├── .claude/skills/*/SKILL.md ← skills invocáveis (13 ativas)
├── .cursor/rules/*.mdc       ← regras Cursor (quick-ref com globs)
├── docs/*.md                 ← referência expandida
└── aulas/*/HANDOFF.md        ← estado por aula
```

**Conflito:** conteúdo mais detalhado prevalece, independente do diretório.

---

## Mapa de Referências

### CLAUDE.md (root) — canônico operacional
| Referencia | Tipo |
|-----------|------|
| → docs/RULES.md | Extensão |
| → docs/SKILLS.md | Extensão |
| → docs/SUBAGENTS.md | Extensão |
| → aulas/cirrose/HANDOFF.md | Estado |
| → aulas/cirrose/HANDOFF-CLAUDE-AI.md | Estado |
| → tasks/lessons.md | Self-improvement |

### .claude/rules/

| Arquivo | Referencia | Referenciado por |
|---------|-----------|-----------------|
| anti-drift.md | (autônomo — protocolo de foco) | ← CLAUDE.md (workflow step 1) |
| css-errors.md | → design-system.md, medical-data.md | ← slide-editing.md |
| design-principles.md | → design-system.md | ← CLAUDE.md |
| design-system.md | (autônomo) | ← css-errors.md, design-principles.md, slide-editing.md, reveal-patterns.md |
| medical-data.md | (autônomo) | ← css-errors.md, slide-editing.md |
| motion-qa.md | → slide-editing.md, reveal-patterns.md | ← CLAUDE.md |
| reveal-patterns.md | (autônomo) | ← slide-editing.md, motion-qa.md, CLAUDE.md |
| slide-editing.md | → css-errors.md, design-system.md, reveal-patterns.md, medical-data.md | ← CLAUDE.md |

### docs/

| Arquivo | Referencia | Referenciado por |
|---------|-----------|-----------------|
| README.md | → todos docs/*.md | (índice) |
| XREF.md | (este arquivo) | ← README.md |
| ECOSYSTEM.md | → SKILLS.md, RULES.md, KPIs.md | ← CLAUDE.md |
| KPIs.md | (autônomo) | ← ECOSYSTEM.md, README.md |
| RULES.md | → SUBAGENTS.md, .cursor/rules/*.mdc | ← CLAUDE.md, ECOSYSTEM.md |
| SKILLS.md | → .cursor/skills/, .claude/skills/ | ← CLAUDE.md, ECOSYSTEM.md |
| SUBAGENTS.md | → .cursor/rules/core-constraints.mdc | ← CLAUDE.md, RULES.md |
| SYNC-NOTION-REPO.md | → .env.example (IDs Notion) | ← CLAUDE.md |
| blueprint-cirrose.md | (autônomo) | ← aulas/cirrose/HANDOFF.md |
| biblia-narrativa.md | (autônomo) | ← aulas/cirrose/HANDOFF.md |
| slide-pedagogy.md | (autônomo — teorias pedagógicas) | ← README.md |
| insights-html-cirrose-2026.md | (autônomo — análise Gemini HTML) | ← README.md |
| MCP-ACADEMICOS.md | (autônomo) | ← ECOSYSTEM.md |
| MCP-ENV-VARS.md | (autônomo) | ← ECOSYSTEM.md |
| SETUP.md | (autônomo — setup inicial) | ← README.md |
| ZIP-LIMPO-PROTOCOLO.md | (autônomo) | ← README.md |
| metanalise-scope.md | (autônomo) | ← README.md |
| pipeline/README.md | (pipeline humano) | ← SUBAGENTS.md |

### .claude/hooks/ (safety gates — determinísticos)

| Arquivo | Wired em settings.json | Função |
|---------|----------------------|--------|
| audit-trail.sh | PostToolUse, PostToolUseFailure (*) | P0 traceability — JSONL log de toda tool call |
| build-monitor.sh | PostToolUse, PostToolUseFailure (Bash) | Detecta falhas de build |
| check-evidence-db.sh | PreToolUse (Write) | Valida dados clínicos antes de escrever |
| guard-evidence-db.sh | PreToolUse (Write) | Protege evidence-db de edições não autorizadas |
| guard-shared.sh | PreToolUse (Write, Edit) | Bloqueia edição de shared/ em branches não-main |
| guard-destructive.sh | (dormant — coberto por deny permissions) | Backup: bloqueia comandos destrutivos |
| guard-merge.sh | PreToolUse (Bash) | Valida merge: --no-ff em main, bloqueia shared/ changes |
| guard-secrets.sh | PreToolUse (Bash) | WARN-only: escaneia staged files por padrões de secrets |
| warn-class-c.sh | PreToolUse (Bash) | WARN-only: lista arquivos Classe C ao fazer git merge main em WT |
| post-compact-reinject.sh | SessionStart (compact) | Reinjecta HANDOFF + git log após /compact |
| session-tracker.sh | SessionStart, SessionEnd | Lifecycle de sessão (3-terminal tracking) |
| subagent-stop-log.sh | SubagentStop | Loga conclusão de subagents |

### .claude/scripts/

| Arquivo | Função |
|---------|--------|
| worktree-init.sh | Cria WT com validação, logging, regras |
| worktree-cleanup.sh | Valida estado, confirma merge, remove WT |

### aulas/cirrose/

| Arquivo | Referencia | Referenciado por |
|---------|-----------|-----------------|
| HANDOFF.md | → blueprint-cirrose.md, biblia-narrativa.md | ← CLAUDE.md (operational record) |
| HANDOFF-CLAUDE-AI.md | → HANDOFF.md | ← CLAUDE.md |
| CHANGELOG.md | (append-only — histórico de batches) | ← CLAUDE.md (operational record) |
| ERROR-LOG.md | (append-only — erros → regras) | ← CLAUDE.md (operational record) |
| NOTES.md | (log de decisões entre agentes) | ← CLAUDE.md (operational record) |

### Arquivados (docs/archive/)

| Arquivo | Motivo |
|---------|--------|
| AGENTS.md | Absorvido por CLAUDE.md (mar/2026) |
| REPO-DIAGNOSTIC.md | Superseded |
| DIAGNOSTIC-27fev.md | Superseded |
| HANDOFF-geral-2026-03-04.md | Estado distribuído por aula |
| HANDOFF_SYNC-CURSOR-2026-02-26.md | One-shot |
| cirrose-scope.md | Superseded por blueprint-cirrose.md |
| AUDIT-BATCHES.md | One-shot |
| research-skills-ecosystem-2026-03-11.md | Pesquisa ecosystem upgrade (referência, não operacional) |

---

## Pares .claude ↔ .cursor

| .claude/rules/ | .cursor/rules/ | Mais completo |
|----------------|---------------|--------------|
| css-errors.md | css-errors.mdc | .claude |
| design-principles.md | design-principles.mdc | .claude (27 vs 11 princípios) |
| design-system.md | cirrose-design.mdc + design-system.mdc | Split OK |
| medical-data.md | medical-data.mdc | .claude |
| motion-qa.md | motion-qa.mdc | .claude |
| reveal-patterns.md | reveal-patterns.mdc | Ambos |
| slide-editing.md | slide-editing.mdc | Ambos |

**Sem par em .claude:** core-constraints.mdc, plan-mode.mdc, notion-mcp.mdc (só .cursor).

---

## Canônicos por Assunto

| Assunto | Arquivo canônico | Fallback |
|---------|-----------------|----------|
| Anti-drift / foco de sessão | .claude/rules/anti-drift.md | — |
| Operacional (stack, regras, workflow) | CLAUDE.md | — |
| Tokens OKLCH | .claude/rules/design-system.md | base.css :root |
| Erros CSS | .claude/rules/css-errors.md | — |
| Dados médicos | .claude/rules/medical-data.md | — |
| Animações GSAP | .claude/rules/motion-qa.md | shared/js/engine.js |
| Reveal.js patterns | .claude/rules/reveal-patterns.md | — |
| Assertion-Evidence | .claude/rules/slide-editing.md | design-principles.md §1 |
| Notion IDs | .env.example (variáveis `NOTION_*_ID`) | docs/SYNC-NOTION-REPO.md |
| MCP profiles | .mcp-profiles/*.json | .mcp.json (perfil ativo) |
| Estado Cirrose | aulas/cirrose/HANDOFF.md | — |
| Context window | docs/SUBAGENTS.md | .cursor/rules/core-constraints.mdc |
| Manifesto slides | aulas/cirrose/slides/_manifest.js | CLAUDE.md tabela |
| Pipeline humano | docs/archive/pipeline/README.md | — |
| Pedagogia | docs/slide-pedagogy.md | .claude/rules/design-principles.md |
| KPIs multiagente | docs/KPIs.md | — |
| Benchmarks modelos | docs/ECOSYSTEM.md | — |
| Safety gates (hooks) | .claude/settings.json + .claude/hooks/ | — |
| WT protocol | aulas/*/CLAUDE.md § Worktree | .claude/scripts/ |
| Audit trail | .claude/hooks/audit-trail.sh | ~/.claude/session-logs/ |

---

## Como Manter

1. **Novo doc:** adicionar aqui + em docs/README.md
2. **Mover/deletar:** atualizar referências aqui + grep por nome antigo
3. **Novo par .claude↔.cursor:** registrar na tabela de pares
4. **Auditoria periódica:** rodar skill `docs-audit` ou `audit-docs`
