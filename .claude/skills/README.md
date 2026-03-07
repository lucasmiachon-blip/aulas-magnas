# .claude/skills — Papel

**Superfície:** Claude Code (terminal), Claude.ai (web). Não conflita com .cursor — superfícies diferentes.

## Skills disponíveis

| Skill | Papel | Quando ativar |
|-------|-------|--------------|
| `assertion-evidence` | Valida formato Alley model (não implementa) | Ao editar/revisar `aulas/*/slides/*.html` |
| `medical-data` | Verifica dados clínicos — trial, effect size, PMID | Ao adicionar qualquer claim numérico |
| `evidence` | Busca PubMed — RCT, meta-análise, guideline | "preciso de PMID para X" |
| `new-slide` | Cria HTML completo com template correto | "criar slide sobre X" |
| `review` | Auditoria multi-agent com confidence scoring (v0.3) | "revise os slides" |
| `docs-audit` | Auditoria de docs/*.md — redundância, links, verbosidade | "audite os docs" |
| `export` | PDF + screenshots via DeckTape | "exportar cirrose" |
| `context7` | Docs on-demand de GSAP/Reveal/Vite/OKLCH (lazy) | Ao codar com libs do projeto |
| `mem-search` | Busca semântica em HANDOFF/NOTES/lessons (lazy) | "o que decidimos sobre X?" |

**Regra:** Cada skill tem um papel. Nenhum duplica função de outro.

## Padrões arquiteturais utilizados

| Padrão | Origem | Skills que usam |
|--------|--------|----------------|
| Multi-agent paralelo + confidence scoring | code-review-agents (Anthropic) | `review` |
| Lazy loading (frontmatter only no startup) | Context7 (Upstash) | `context7`, `mem-search` |
| 3-step token-efficient search | claude-mem (thedotmack) | `mem-search` |

## Ralph Loop (não implementado como skill)

Padrão de autonomia: Stop hook bloqueia Claude de sair, re-injeta o prompt, repete até `DONE`.
Útil para builds overnight (ex: `npm run build:cirrose` + QA loop).
Não adicionado como skill — alto risco de loop infinito dado nosso anti-drift.
Ver `docs/ECOSYSTEM.md` para documentação se precisar no futuro.

## Carregamento

Skills `context: lazy` → Claude lê só o YAML frontmatter no startup (~50 tokens).
Corpo completo carregado on-demand quando ativado → ~77% economia vs SessionStart hook.
