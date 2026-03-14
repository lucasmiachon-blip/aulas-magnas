# .claude/skills — Papel

**Superfície:** Claude Code (terminal), Claude.ai (web). Não conflita com .cursor — superfícies diferentes.

## Skills disponíveis

| Skill | Papel | Quando ativar |
|-------|-------|--------------|
| `assertion-evidence` | Valida formato Alley model (não implementa) | Ao editar/revisar `aulas/*/slides/*.html` |
| `medical-data` | Verifica dados clínicos — trial, effect size, PMID | Ao adicionar qualquer claim numérico |
| `evidence` | Busca PubMed — RCT, meta-análise, guideline | "preciso de PMID para X" |
| `new-slide` | Cria HTML completo com template correto | "criar slide sobre X" |
| `review` | Auditoria multi-agent com confidence scoring (v0.4, parametrizado por aula) | "revise os slides" |
| `final-pass` | Avaliação final deck completo via Gemini (cross-slide, narrativa, ritmo) | "final pass", "acabamento", "deck pronto?" |
| `docs-audit` | Auditoria de docs/*.md — redundância, links, verbosidade | "audite os docs" |
| `export` | PDF + screenshots via DeckTape | "exportar cirrose" |
| `context7` | Docs on-demand de GSAP/Reveal/Vite/OKLCH (lazy) | Ao codar com libs do projeto |
| `mem-search` | Busca semântica em HANDOFF/NOTES/lessons (lazy) | "o que decidimos sobre X?" |
| `ralph-qa` | Loop autônomo lint→fix→build→fix até 0 FAILs | "qa loop", "rodar qa até passar" |
| `evolve` | Comitê de 4 agentes — pesquisa state-of-art, propõe patches para skills/docs/tools | "evoluir skills", "comitê", "evolve" |
| `repo-janitor` | Audita orphan files, broken MD links, dead HTML, temp files. READ-ONLY default | "limpar repo", "tem lixo?", "orphan files" |
| `resolve-conflict` | Guia passo-a-passo para resolver conflitos git. PT-BR, aprovacao obrigatoria | "resolver conflito", "merge conflict" |
| `gtd` | Getting Things Done simplificado — inbox, next actions, weekly review (lazy) | "gtd", "inbox", "o que tenho pendente?" |
| `retro` | Extrai lições da sessão atual em tasks/lessons.md | "retro", "extract lessons", final de sessão |
| `audit-rules` | Audita .claude/rules/*.md — contradições, refs stale, gaps vs ERROR-LOG | "auditar rules", "rules stale?", "audit-rules" |

**Regra:** Cada skill tem um papel. Nenhum duplica função de outro.

## Padrões arquiteturais utilizados

| Padrão | Origem | Skills que usam |
|--------|--------|----------------|
| Multi-agent paralelo + confidence scoring | code-review-agents (Anthropic) | `review` |
| Lazy loading (frontmatter only no startup) | Context7 (Upstash) | `context7`, `mem-search` |
| 3-step token-efficient search | claude-mem (thedotmack) | `mem-search` |
| Comitê de votação (≥3/4 para aprovar patch) | Adversarial review pattern | `evolve` |
| Plan-first + ask-if-unsure | manthanabc/paws + Olshansky | `resolve-conflict` |
| GTD 3-item focus limit | Raven GTD (mcpmarket) | `gtd` |

## Ralph Loop

Padrão de autonomia: Stop hook bloqueia Claude de sair, re-injeta o prompt, repete até `DONE`.
**Implementado em `ralph-qa`** para QA (domínio finito, critério objetivo).
Não usar para dev geral — escopo aberto → risco de loop infinito.

## Carregamento

Skills `context: lazy` → Claude lê só o YAML frontmatter no startup (~50 tokens).
Corpo completo carregado on-demand quando ativado → ~77% economia vs SessionStart hook.
