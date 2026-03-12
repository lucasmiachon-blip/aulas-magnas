# Pesquisa: Skills, Hooks e Patterns para Evolucao do Ecossistema

> Pesquisa consolidada em 2026-03-11.
> 7 agentes pesquisaram em paralelo: docs Anthropic, GitHub, blogs de devs renomados.
> Objetivo: identificar skills de orquestracao, seguranca, GTD, self-improvement e aprendizado.

---

## 1. Orquestrador de Sistemas

### 3 Camadas de Multi-Agent no Claude Code

| Camada | Mecanismo | Comunicacao | Quando usar |
|--------|-----------|-------------|-------------|
| **Subagents** (`.claude/agents/`) | Child instances, mesmo processo | Return value only | 90% dos casos |
| **Agent Teams** (experimental) | Processos separados, task board compartilhado | Bidirecional (inbox + broadcast) | Quando agentes precisam conversar entre si |
| **Agent SDK** (Python/TS) | Programatico, fora do CLI | Custom | CI pipelines, apps custom |

### Patterns Canonicos (Anthropic Research)

| Pattern | Descricao | Uso no projeto |
|---------|-----------|----------------|
| **Fan-Out** | Orchestrator decompoe task, spawna N workers paralelos | QA de multiplos slides |
| **Pipeline** | A -> B -> C sequencial | Research -> Analysis -> Slide build |
| **Orchestrator-Workers** | LLM central decide subtasks em runtime | Review complexo |
| **Cross-Review** | Multiplos agentes analisam, depois verificam achados uns dos outros | Code review (Anthropic usa internamente) |
| **Evaluator-Optimizer** | Um gera, outro avalia, loop ate threshold | QA perfection loop |

### Resultado Anthropic: Multi-agent Opus+Sonnet supera single Opus em 90.2%

Custo: ~15x mais tokens que single chat. Justifica-se quando:
- Tarefa e paralelizavel
- Info excede uma context window
- Multiplas ferramentas complexas

### Regra pratica
- Orchestrator = Opus, Workers = Sonnet/Haiku
- Max 6-8 subagents paralelos
- Cada agent = escopo estreito + tools limitados

---

## 2. Seguranca e Rastreabilidade

### 5 Primitivas de Defesa em Profundidade

| Camada | Mecanismo | Deterministico? |
|--------|-----------|-----------------|
| **Hooks** | Shell commands em lifecycle events | Sim (100%) |
| **Permissions** | Allow/Ask/Deny em settings.json | Parcial |
| **Sandboxing** | Isolamento OS-level para Bash | Sim |
| **CLAUDE.md** | Instrucoes no markdown | ~90% compliance |
| **Agent tool restrictions** | Tools limitados por agent | Sim |

> "Every security control that matters should be a hook, not a CLAUDE.md instruction." — Dotzlaw Consulting

### Todos os Hook Events (18+)

| Event | Quando | Pode bloquear? |
|-------|--------|----------------|
| `PreToolUse` | Antes de tool executar | Sim (exit 2) |
| `PostToolUse` | Apos tool completar | Nao (feedback) |
| `PostToolUseFailure` | Apos tool falhar | Nao |
| `UserPromptSubmit` | User submete prompt | Sim |
| `SessionStart` | Sessao inicia/resume | Nao |
| `SessionEnd` | Sessao termina | Nao |
| `SubagentStart` | Subagent spawna | Nao |
| `SubagentStop` | Subagent termina | Sim |
| `Stop` | Claude para de responder | Sim |
| `Notification` | Notificacao do sistema | Nao |
| `PreCompact` | Antes de compactacao | Nao |
| `ConfigChange` | Config muda durante sessao | Sim |
| `WorktreeCreate` | Worktree criado | Sim |
| `WorktreeRemove` | Worktree removido | Nao |
| `TaskCompleted` | Task marcada completa | Sim |
| `TeammateIdle` | Teammate prestes a ficar idle | Sim |
| `InstructionsLoaded` | CLAUDE.md/.claude/rules carregados | Nao |
| `PermissionRequest` | Dialog de permissao aparece | Sim |

### 4 Tipos de Hook

1. **Command** (`type: "command"`): Shell. Input via stdin, output via exit codes.
2. **HTTP** (`type: "http"`): POST para URL.
3. **Prompt** (`type: "prompt"`): Single-turn LLM. Retorna `{ok: true/false, reason}`.
4. **Agent** (`type: "agent"`): Multi-turn subagent com tools (Read, Grep, Glob). Ate 50 turns.

### Hooks Recomendados para o Projeto

#### A. Audit Trail Logger (PostToolUse)
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'INPUT=$(cat); TOOL=$(echo \"$INPUT\" | jq -r .tool_name); DETAIL=$(echo \"$INPUT\" | jq -r \".tool_input | keys[0] as $k | .[$k]\" 2>/dev/null || echo \"?\"); DIR=\"$HOME/.claude/session-logs\"; mkdir -p \"$DIR\"; jq -n --arg ts \"$(date -Iseconds)\" --arg t \"$TOOL\" --arg d \"$DETAIL\" --arg cwd \"$(pwd)\" \"{ts:\\$ts,tool:\\$t,detail:\\$d,cwd:\\$cwd}\" >> \"$DIR/$(date +%Y-%m-%d).jsonl\"'"
          }
        ]
      }
    ]
  }
}
```

#### B. Protecao shared/ (PreToolUse) — substitui regra advisory do CLAUDE.md
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=$(jq -r .tool_input.file_path); if echo \"$FILE\" | grep -q \"/shared/\"; then echo \"BLOCKED: shared/ is read-only. Edit on main branch only.\" >&2; exit 2; fi'"
          }
        ]
      }
    ]
  }
}
```

#### C. Block destructive git (PreToolUse)
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'CMD=$(jq -r .tool_input.command); if echo \"$CMD\" | grep -qE \"git\\s+push.*(--force|main|master)|git\\s+reset\\s+--hard|rm\\s+-rf\\s+/\"; then echo \"BLOCKED: destructive command detected.\" >&2; exit 2; fi'"
          }
        ]
      }
    ]
  }
}
```

#### D. Stop hook — lint antes de declarar done
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "agent",
            "prompt": "Check if any slides were edited in this session. If yes, run npm run lint:slides and verify results pass. If lint fails, respond with {\"ok\": false, \"reason\": \"lint failures found\"}.",
            "timeout": 120
          }
        ]
      }
    ]
  }
}
```

#### E. Re-inject context pos-compactacao (SessionStart)
```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"=== POST-COMPACT REMINDER ===\"; cat HANDOFF.md 2>/dev/null | head -30; echo \"---\"; git log --oneline -3; echo \"---\"; cat tasks/lessons.md 2>/dev/null | tail -20'"
          }
        ]
      }
    ]
  }
}
```

### Ferramentas de Auditoria
- **cc-audit-log**: `npx cc-audit-log --today` — parseia session transcripts em audit trails
- **disler/claude-code-hooks-multi-agent-observability**: Dashboard web com eventos de todos agentes

---

## 3. Rodar Multiplos Agents

### Custom Subagents (.claude/agents/)

```yaml
---
name: slide-reviewer
description: Reviews slides for assertion-evidence compliance and design system adherence
tools: Read, Glob, Grep, Bash
model: sonnet
memory: project
---

You are a slide QA specialist for medical presentations...
```

**Frontmatter completo:**

| Campo | Obrigatorio | Valores |
|-------|-------------|---------|
| `name` | Sim | lowercase, hyphens |
| `description` | Sim | Quando delegar |
| `tools` | Nao | Allowlist (herda parent se omitido) |
| `disallowedTools` | Nao | Denylist |
| `model` | Nao | sonnet/opus/haiku/inherit |
| `permissionMode` | Nao | default/acceptEdits/dontAsk/bypassPermissions/plan |
| `maxTurns` | Nao | Max turns agenticos |
| `skills` | Nao | Skills pre-carregados |
| `mcpServers` | Nao | MCPs para este subagent |
| `hooks` | Nao | Hooks scoped ao subagent |
| `memory` | Nao | user/project/local (persistente!) |
| `background` | Nao | Sempre rodar em background |
| `isolation` | Nao | worktree para isolamento git |

### Memoria Persistente de Subagent (NOVO)

```yaml
memory: project  # salva em .claude/agent-memory/<name>/
```

O subagent acumula conhecimento entre sessoes. Primeiras 200 linhas de MEMORY.md carregadas automaticamente.

### Worktree Isolation

```bash
claude --worktree feature-auth    # Sessao isolada
claude --worktree bugfix-123      # Outra em paralelo
```

Ou no frontmatter do agent: `isolation: worktree`

### Agent Teams (Experimental)

Habilitar: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

- Team lead + N teammates (separados)
- Task list compartilhado com dependencias
- Messaging via inbox
- 3-5 teammates ideal, 5-6 tasks cada

---

## 4. GTD — Getting Things Done

> Nao existem skills GTD pre-built no ecossistema Anthropic. Infraestrutura e robusta, falta montar.

### Skills Propostos

#### /standup
```yaml
---
name: standup
description: Daily standup summary from git history and project state
disable-model-invocation: true
allowed-tools: Bash, Read, Grep, Glob
---
1. git log --oneline --since="yesterday"
2. git status
3. gh pr list --author=@me --state=open
4. Read HANDOFF.md
Output: Yesterday / Today / Blockers
```

#### /plan-session
```yaml
---
name: plan-session
description: Plan current session by reading HANDOFF and proposing max 3 tasks
disable-model-invocation: true
context: fork
agent: Explore
---
1. Read CLAUDE.md, HANDOFF.md, tasks/lessons.md
2. git log --oneline -10 && git status
3. Identify critical path
Output: Session Plan with max 3 tasks + deferred items
```

#### /review-session
```yaml
---
name: review-session
description: End-of-session review and HANDOFF update
disable-model-invocation: true
allowed-tools: Read, Edit, Write, Bash, Grep, Glob
---
1. git diff --stat HEAD~5
2. Count artifacts produced
3. Update HANDOFF.md
4. Append lessons to tasks/lessons.md
```

#### /weekly-review
```yaml
---
name: weekly-review
description: GTD weekly review across all projects
disable-model-invocation: true
context: fork
agent: Explore
---
1. Collect all HANDOFF.md files
2. git log --oneline --since="1 week ago"
3. Flag stale items (>2 weeks)
4. Propose next week priorities
5. Run /insights mentally
```

#### /inbox
```yaml
---
name: inbox
description: Process GTD inbox — categorize, prioritize, route
disable-model-invocation: true
allowed-tools: Read, Edit, Write, Grep, Glob
---
For each item: actionable? <2min? multi-step? delegatable? deadline?
Categories: Do Now / Next Actions / Projects / Waiting For / Someday
```

### /loop para Monitoring
```
/loop 5m check if the deploy finished
/loop 30m check if HANDOFF.md matches codebase state
/loop 2h audit rules for contradictions
```

---

## 5. Self-Improvement do Projeto

### Error-to-Rule Pipeline (ja temos parcialmente)
```
Erro em slide -> ERROR-LOG.md -> tasks/lessons.md -> .claude/rules/*.md -> CLAUDE.md
```
Cada nivel mais curado e permanente. Lessons que se provam sao promovidas.

### Skills de Auto-Melhoria

#### /retro (extract-lessons)
```yaml
---
name: retro
description: Extract lessons from current session into tasks/lessons.md
disable-model-invocation: true
---
1. Review session: mistakes, anti-patterns, new rules needed, rules that failed
2. Append to tasks/lessons.md com formato:
   ## Session [date] — [topic]
   ### [lesson]
   - Context | Fix | Rule
3. Se lesson mapeia para regra existente, sugerir edit
```

#### /audit-rules
```yaml
---
name: audit-rules
description: Audit .claude/rules/ for staleness, contradictions, gaps
context: fork
agent: Explore
---
1. Contradictions between rules
2. Rules referencing files/patterns que nao existem mais
3. Cross-reference ERROR-LOG.md e tasks/lessons.md — gaps?
4. Rules que Claude ja segue por default (bloat)
5. XREF.md atualizado?
Output: lista priorizada de mudancas propostas
```

#### /evolve (self-healing)
```yaml
---
name: evolve
description: Weekly project health check and self-improvement proposals
disable-model-invocation: true
context: fork
agent: general-purpose
---
1. Read tasks/lessons.md e MEMORY.md — patterns da semana
2. git log --oneline --since='7 days ago' — o que shipped
3. Read HANDOFF.md de cada projeto — blockers
4. Read ERROR-LOG.md — erros recorrentes que precisam de regras
5. Check rules em .claude/rules/ — outdated ou contraditorias?
6. Grep [TBD], [VERIFICAR] em slides — count unresolved
7. Score: corrections-per-session trending down?

Output em NOTES.md:
- Shipped | Stuck | Patterns | Proposed rule changes | Stale items
```

### QA Guardian com Memoria Persistente
```yaml
---
name: qa-guardian
description: Validates slide quality after edits. Use proactively.
tools: Read, Grep, Glob, Bash
model: sonnet
memory: project
---
Valida: h2 assertion, no ul/ol, notes present, no inline display,
data-animate has opacity:0, no literal colors, body <=30 words.
Update agent memory with patterns discovered per slide.
```

### Graduated Knowledge (piramide de permanencia)
```
Conversacao -> auto-memory (volatil)
            -> tasks/lessons.md (append-only, reviewed)
            -> .claude/rules/*.md (permanente, estruturado)
            -> CLAUDE.md (top-level, sempre carregado)
```

### Rule Deprecation
```markdown
<!-- Last validated: 2026-03-11 | Deprecate if unused by: 2026-06-11 -->
```
O audit skill flagga rules sem referencia em 3 meses.

---

## 6. Aprendizado para Melhorar o Sistema

### /insights (built-in)
Analisa ultimas 30 dias de sessoes. Gera HTML com:
- O que funciona
- O que atrapalha
- Quick wins
- Workflows ambiciosos

**Cadencia recomendada:** mensal.

### Medir se o Setup esta Melhorando

| Metrica | Tendencia saudavel |
|---------|-------------------|
| Corrections per session | Caindo |
| Tokens per completed task | Caindo |
| Iterations to acceptance | Menos |
| Context utilization at session end | <75% |
| Rules added vs deleted | Mais delecoes que adicoes (sinal de maturidade) |
| Session-to-PR conversion | Subindo |

### Ferramentas de Referencia

| Ferramenta | O que faz |
|------------|-----------|
| **claude-reflect** | Detecta corrections via hooks, user faz /reflect para aplicar |
| **KERNEL** | Config auto-evolutivo: "static configs rot" |
| **ChristopherA Bootstrap** | 1,400-token CLAUDE.md que bootstrappa auto-melhoria |
| **Arize Prompt Learning** | Otimiza CLAUDE.md via evals (+5% geral, +11% repo-specific) |
| **cc-audit-log** | Parseia transcripts em audit trails |

### Anti-Patterns a Evitar

| Anti-Pattern | Fix |
|-------------|-----|
| CLAUDE.md monolitico (500+ linhas) | <60-100 linhas root, progressive disclosure |
| Regras de style no CLAUDE.md | Hooks (Stop hook roda formatter) |
| Todos MCPs carregados no startup | Carregar on-demand |
| Nunca rodar /insights | Mensal |
| tasks/lessons.md vira dump | Triage: apply/capture/dismiss para cada entry |
| Over-engineering rules no dia 1 | Comeca minimo, adiciona so quando dor e real |
| >75% context utilization | /compact proativamente; subagents para pesquisa |

### Blogs para Acompanhar

| Autor | Foco |
|-------|------|
| **Paddo** (paddo.dev) | Insider Claude Code team. Core loop, plan mode. |
| **Shrivu Shankar** (sshh.io) | CLAUDE.md como "constituicao", subagents como context mgmt |
| **Addy Osmani** | Self-improving agents, orchestrator mindset |
| **Simon Willison** | Pragmatico, transcripts, Playwright MCP |
| **ClaudeFa.st** | 6-pillar context engineering, feedback loops |
| **Trail of Bits** | Security-first config, skills de auditoria |
| **HumanLayer** | Writing good CLAUDE.md (<60 lines) |

### Registries de Skills

| Registry | Conteudo |
|----------|---------|
| [anthropics/skills](https://github.com/anthropics/skills) | Oficial Anthropic |
| [trailofbits/skills](https://github.com/trailofbits/skills) | Security skills |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 500+ skills |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | Curado comunidade |
| [awesome-skills.com](https://awesome-skills.com/) | 123+ searchable |

---

## 7. Recomendacoes Priorizadas para o Projeto

### Prioridade 1 — Impacto imediato, baixo esforco

1. **Hook: shared/ read-only** — converte regra advisory em enforcement deterministico
2. **Hook: PostToolUse audit trail** — rastreabilidade de tudo que o agente faz
3. **Hook: SessionStart pos-compact** — nunca perder contexto critico
4. **Skill: /retro** — formaliza extract-lessons ao final de sessao
5. **Rodar /insights** — descobrir friction patterns atuais

### Prioridade 2 — Alto impacto, esforco medio

6. **Skill: /plan-session + /review-session** — GTD bookends
7. **Hook: Stop com lint check** — previne slides shipping sem validacao
8. **Agent: qa-guardian com memory: project** — acumula conhecimento entre sessoes
9. **Skill: /audit-rules** — detecta staleness/contradicoes periodicamente
10. **Triage de tasks/lessons.md** — adicionar status apply/capture/dismiss

### Prioridade 3 — Estrategico, esforco alto

11. **Skill: /evolve (weekly)** — health check + self-improvement proposals
12. **Skill: /weekly-review** — GTD review completo
13. **Hook: Block destructive git** — safety net
14. **Agent Teams para QA paralelo** — multiple reviewers cross-checking
15. **Medir corrections-per-session** — saber se o setup esta melhorando

### Prioridade 4 — Exploratorio

16. **claude-reflect** — auto-detecta corrections, sugere regras
17. **Arize Prompt Learning** — otimiza CLAUDE.md via evals
18. **ADR pattern** — decisions como arquivos individuais
19. **Agent SDK** — para CI pipelines ou apps custom
20. **cc-audit-log** — parsear transcripts em audit trails

---

## Fontes Principais

- [Building Effective Agents — Anthropic Research](https://www.anthropic.com/research/building-effective-agents)
- [Multi-agent Research System — Anthropic Engineering](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Claude Code Skills — Official Docs](https://code.claude.com/docs/en/skills)
- [Claude Code Hooks — Official Docs](https://code.claude.com/docs/en/hooks)
- [Custom Subagents — Official Docs](https://code.claude.com/docs/en/sub-agents)
- [Agent Teams — Official Docs](https://code.claude.com/docs/en/agent-teams)
- [Best Practices — Official Docs](https://code.claude.com/docs/en/best-practices)
- [Trail of Bits Config](https://github.com/trailofbits/claude-code-config)
- [Writing a good CLAUDE.md — HumanLayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [How Anthropic teams use Claude Code](https://claude.com/blog/how-anthropic-teams-use-claude-code)
- [Self-Improving Agents — Addy Osmani](https://addyosmani.com/blog/self-improving-agents/)
- [Stop Speedrunning Claude Code — Paddo](https://paddo.dev/blog/stop-speedrunning-claude-code/)
- [claude-reflect — BayramAnnakov](https://github.com/BayramAnnakov/claude-reflect)
- [KERNEL — Aria Han](https://medium.com/@ariaxhan/kernel-the-ultimate-self-evolving-claude-code-and-cursor-configuration-system-a3ddeb7f4d32)
- [CLAUDE.md Prompt Learning — Arize](https://arize.com/blog/claude-md-best-practices-learned-from-optimizing-claude-code-with-prompt-learning/)
- [Swarm Orchestration Skill — Kieran Klaassen](https://gist.github.com/kieranklaassen/4f2aba89594a4aea4ad64d753984b2ea)
- [Defense-in-Depth — Dotzlaw Consulting](https://www.dotzlaw.com/insights/claude-security/)
- [cc-audit-log](https://github.com/yurukusa/cc-audit-log)
- [Multi-Agent Observability — disler](https://github.com/disler/claude-code-hooks-multi-agent-observability)
