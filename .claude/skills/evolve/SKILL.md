---
name: evolve
description: Comitê de evolução do ecossistema — pesquisa state-of-art, lê lições do projeto, e propõe patches cirúrgicos para skills/docs/tools. Ativar quando usuário pedir "evoluir skills", "melhorar agentes", "atualizar docs", "comitê de evolução", "evolve".
version: 1.0.0
context: fork
agent: general-purpose
allowed-tools: Read, Edit, Bash, Grep, Glob, Agent, WebSearch, WebFetch
argument-hint: "[target: skills|docs|tools|all] [topic?]"
---

# Evolve — Comitê de Evolução do Ecossistema

Assembleia de 4 subagentes paralelos que pesquisam, comparam e votam em patches.
Nenhum agente age sozinho. Consenso ≥ 3/4 → patch entra.

## Arquitetura do Comitê

```
┌───────────────────────────────────────────────────────────┐
│  FASE 1 — INTEL (paralelo, sem comunicação entre agentes) │
│                                                           │
│  Agente A: Archaeologist                                  │
│    → lê tasks/lessons.md, HANDOFF.md, NOTES.md            │
│    → extrai padrões de erro recorrentes                   │
│    → "o que o projeto aprendeu na prática?"               │
│                                                           │
│  Agente B: Researcher                                     │
│    → WebSearch: melhores práticas AI agents 2025-2026     │
│    → fontes: Anthropic blog, Simon Willison, Lilian Weng  │
│    → "o que mudou no state-of-art desde a última sessão?" │
│                                                           │
│  Agente C: Auditor                                        │
│    → lê todos os .claude/skills/*/SKILL.md                │
│    → lê docs/*.md, CLAUDE.md                              │
│    → identifica: gaps, redundâncias, versões desatualizadas│
│    → "o que está desatualizado ou faltando?"              │
│                                                           │
│  Agente D: Tools Inspector                                │
│    → lê tools/*.js, package.json scripts                  │
│    → npm outdated, npm audit                              │
│    → "o que pode ser melhorado nas ferramentas?"          │
└──────────────────────────────┬────────────────────────────┘
                               │ 4 relatórios independentes
                               ▼
┌───────────────────────────────────────────────────────────┐
│  FASE 2 — DELIBERAÇÃO (Opus sintetiza)                    │
│                                                           │
│  → Opus lê os 4 relatórios                               │
│  → Identifica convergências (≥2 agentes mencionaram)      │
│  → Descarta sugestões conflitantes ou arriscadas          │
│  → Ranqueia por impacto × segurança × esforço             │
│  → Produz lista de patches propostos                      │
└──────────────────────────────┬────────────────────────────┘
                               │ lista ranqueada
                               ▼
┌───────────────────────────────────────────────────────────┐
│  FASE 3 — VOTAÇÃO DO COMITÊ                               │
│                                                           │
│  Para cada patch proposto:                                │
│    Archaeologist vota: "consistente com lições?"          │
│    Researcher vota:    "alinhado com state-of-art?"       │
│    Auditor vota:       "sem regressão em docs existentes?"│
│    Tools Inspector vota: "sem impacto negativo nas tools?"│
│                                                           │
│  Aprovação: ≥ 3 votos SIM                                │
│  Veto: qualquer VETO com justificativa → patch rejeitado  │
└──────────────────────────────┬────────────────────────────┘
                               │ patches aprovados
                               ▼
┌───────────────────────────────────────────────────────────┐
│  FASE 4 — APLICAÇÃO (humano aprova antes de commit)       │
│                                                           │
│  → Apresentar ao Lucas: cada patch em diff claro          │
│  → Lucas aprova/rejeita individualmente                   │
│  → Aplicar aprovados → commit                             │
└───────────────────────────────────────────────────────────┘
```

## Fase 1 — Intel (4 subagents paralelos)

### Agente A — Archaeologist
```
Papel: Arqueólogo do projeto — padrões de erro e aprendizado

LER (em ordem):
  1. tasks/lessons.md
  2. aulas/cirrose/HANDOFF.md
  3. aulas/cirrose/NOTES.md (se existir)
  4. git log --oneline -30 (últimas decisões)

EXTRAIR:
  - Erros que repetiram mais de 1x
  - Workarounds que existem (sinal de problema não resolvido)
  - Padrões que "funcionaram bem" — preservar
  - Lacunas: situações sem skill/doc de suporte

FORMATO de output:
  {
    "recurring_errors": [{ "pattern": "...", "count": N, "last_seen": "..." }],
    "workarounds": [{ "file": "...", "description": "..." }],
    "working_well": ["..."],
    "gaps": ["situação X sem skill de suporte"]
  }
```

### Agente B — Researcher
```
Papel: Pesquisador de state-of-art em AI agents e dev tools

PESQUISAR (WebSearch + WebFetch):
  1. "claude code best practices 2026"
  2. "AI agent skills prompt engineering 2025"
  3. "playwright video recording slides automation"
  4. "reveal.js 5.2 new features changelog"
  5. "gsap 3.14 new features"
  6. "@google/genai 1.44 gemini api features"

SINTETIZAR:
  - O que mudou desde as versões que o projeto usa?
  - Novas capacidades não aproveitadas
  - Anti-patterns que o projeto talvez tenha

FORMATO de output:
  {
    "lib_updates": [{ "lib": "...", "version": "...", "new_feature": "...", "relevant_to_project": true }],
    "new_patterns": [{ "pattern": "...", "source": "url", "applicability": "high|medium|low" }],
    "antipatterns_found": ["..."]
  }
```

### Agente C — Auditor
```
Papel: Auditor interno — gaps e redundâncias em skills/docs

LER:
  .claude/skills/*/SKILL.md (todos)
  .claude/rules/*.md (todos)
  CLAUDE.md
  docs/*.md (se existir)

VERIFICAR para cada skill:
  - version field atualizado?
  - description ativa corretamente (trigger words claras)?
  - allowed-tools tem o que o skill realmente precisa?
  - algum TODO pendente?
  - referências cruzadas quebradas?

VERIFICAR cross-skill:
  - Duas skills fazem a mesma coisa?
  - Uma skill depende de outra sem declarar?
  - Alguma regra em CLAUDE.md não tem skill de suporte?

FORMATO de output:
  {
    "stale_skills": [{ "skill": "...", "issue": "..." }],
    "missing_tools": [{ "skill": "...", "tool": "..." }],
    "redundancies": [{ "skill_a": "...", "skill_b": "...", "overlap": "..." }],
    "rule_without_skill": ["regra X em CLAUDE.md sem skill"]
  }
```

### Agente D — Tools Inspector
```
Papel: Inspector de ferramentas — qualidade e gaps em tools/scripts

LER:
  tools/*.js (todos)
  package.json (scripts + deps)
  aulas/cirrose/scripts/*.js

EXECUTAR:
  npm outdated
  npm audit --json (parsear severidade)

VERIFICAR:
  - Scripts com duplicação de lógica
  - Tools que poderiam ser mais composable (args, flags)
  - Error handling frágil (process.exit sem mensagem)
  - Vulnerabilidades npm audit

FORMATO de output:
  {
    "outdated_deps": [{ "name": "...", "current": "...", "latest": "..." }],
    "vulnerabilities": [{ "package": "...", "severity": "...", "fix": "..." }],
    "tool_issues": [{ "file": "...", "issue": "...", "suggestion": "..." }],
    "composability_gaps": ["..."]
  }
```

## Fase 2 — Deliberação (Opus)

```
INPUT: 4 relatórios JSON das fases anteriores

PROCESSO:
  1. Convergência: issue mencionado por ≥2 agentes → peso 2x
  2. Conflito: agentes divergem → flag para humano decidir
  3. Risco: qualquer patch em shared/ ou engine.js → flag ALTO RISCO
  4. Score: impacto(1-5) × segurança(1-5) ÷ esforço(1-5)

PRODUZIR lista de patches ranqueados:

[
  {
    "id": "P01",
    "title": "Adicionar `evolve` ao README de skills",
    "file": ".claude/skills/README.md",
    "type": "append",            // append | edit | new-file | delete
    "risk": "low",               // low | medium | high
    "score": 4.2,
    "proposed_by": ["Auditor"],
    "description": "README não lista skill evolve recém-criada",
    "diff_preview": "| `evolve` | Comitê de evolução ... | 'evoluir skills'"
  },
  ...
]
```

## Fase 3 — Votação

```
Para cada patch em lista (score desc):

  Cada agente emite:
    SIM  — aprovado sem ressalvas
    SIM* — aprovado com condição (especificar)
    NÃO  — rejeitado (especificar razão)
    VETO — bloqueia independente dos outros (razão obrigatória)

  Resultado:
    ≥3 SIM (ou SIM*) → APROVADO
    ≥2 NÃO → REJEITADO
    1 VETO → VETADO (vai para humano decidir)

  Condições de SIM* são incorporadas ao patch se aprovado.
```

## Fase 4 — Apresentação ao Lucas

```
## Comitê Evolve — [DATA] — [N] patches propostos

### APROVADOS (≥3 votos SIM) — [N]

P01 ✓ [4 votos] — Adicionar `evolve` ao README de skills
  Arquivo: .claude/skills/README.md
  Tipo: append (1 linha)
  [DIFF PREVIEW]
  → Aplicar? (s/n)

P03 ✓ [3 votos] — scrollActivationWidth → adicionar ao context7
  Arquivo: .claude/skills/context7/SKILL.md
  Tipo: edit (2 linhas)
  [DIFF PREVIEW]
  → Aplicar? (s/n)

### VETADOS (mostrar para decisão humana) — [N]

P07 ⚠ VETO (Archaeologist) — "Refatorar engine.js para ESM puro"
  Razão do veto: "engine.js foi reescrito 2x e causou regressões (lessons.md)"
  → Revisar? (s/n)

### REJEITADOS (arquivado) — [N]

P09 ✗ [2 NÃO] — Migrar para TypeScript
  Razões: "Sem evidência de benefício para projeto atual"

---
Aplicar todos aprovados? (s=sim individual / a=todos / n=nenhum)
```

## Saída após aplicação

```
## Evolve — [N] patches aplicados

P01 ✓ .claude/skills/README.md (+1 linha)
P03 ✓ .claude/skills/context7/SKILL.md (2 linhas editadas)

git: commit → push
tasks/lessons.md: atualizado com padrões do comitê

EVOLVE-DONE
```

## Segurança

- **NUNCA** modificar `shared/` sem VETO check
- **NUNCA** deletar skills existentes — deprecar com `deprecated: true` no frontmatter
- **NUNCA** alterar dados clínicos ou regras médicas
- Patches em `engine.js` → risk: high → voto unânime exigido (4/4)
- Max 10 patches por sessão — mais que isso → dividir em duas sessões
- Todo patch tem `diff_preview` antes de aplicar
- Humano aprova ANTES do commit
