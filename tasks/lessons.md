# Lessons — Padrões Aprendidos

> Atualizado após correções e auditorias. Revisar no início de sessão.

---

## Sessão Flip + QA (2026-03-04)

### CSS selector: `#id.class` ≠ `#id .class`
- `#s-a1-damico.archetype-flow` = mesmo elemento com id E class → nunca casa (section tem id, div filho tem class)
- `#s-a1-damico .archetype-flow` = descendente → correto
- **Verificar sempre:** `document.querySelectorAll('seletor').length > 0` antes de assumir que uma rule aplica

### Archetype scope: reutilizar elementos de um archetype em outro
- `.archetype-pathway .pathway-track { display:flex }` → só funciona dentro de `archetype-pathway`
- Se reutilizar `.pathway-track` em `archetype-flow`, re-declarar `display:flex` no novo contexto
- Padrão: ao criar elementos de um archetype dentro de outro, sempre verificar se as regras de layout herdam corretamente

### Panel overlap: `min()` cap vence o panel-width
- `min(1120px, calc(100% - 140px - 1rem))` = 1120px (cap binding em viewport 1280px)
- Com `margin:0 auto`, conteúdo se estende sobre o panel
- Fix correto: `max-width: calc(100% - var(--panel-width) - 3rem)` + `margin: 0 0 0 2rem` quando panel visível

### overflow-y em slides: sempre hidden
- `overflow-y: auto` em eras = scrollbar no palco → inaceitável
- Slides são canvas fixo. Conteúdo que não cabe = problema de design, não de CSS
- Padrão: `.scores-era { overflow-y: hidden }`

### GSAP Flip + crossfade: capturar estado ANTES da transição
- `Flip.getState(formulaBlock)` DEVE ser chamado antes de `showEra(5)` (que faz opacity→0 no elemento)
- Passar `preFlipState` como parâmetro para a função de animação pós-transição
- Se `preFlipState = null` (era 4 não foi visitada antes), usar fallback `gsap.from`

## Auditoria Batches (2026-03)

### Rules: .cursor vs .claude

- **Fonte canônica:** .cursor/rules/ — Cursor usa .mdc com frontmatter
- **.claude rules:** Deprecados para overlap; conteúdo único migrado para .cursor
- **design-system:** Mais verboso que cirrose-design; design-system = referência completa, cirrose-design = quick ref

### Paths CSS

- **NUNCA** documentar shared/css/archetypes.css ou shared/css/cirrose.css — não existem
- Realidade: base.css em shared/; archetypes.css e cirrose.css em aulas/cirrose/ (e grade, osteoporose)

### Notion ↔ Repo

- IDs canônicos: docs/SYNC-NOTION-REPO.md
- Conflito de versão: Composer/Claude Opus determina o mais atual → prevalece

### MD Audit

- Não manual. Skill docs-audit + subagent generalPurpose/qa-engineer
- Critérios: dev, designer, prompt eng, engenheiro de sistema, economia de tokens

### Skills .cursor vs .claude

- Sem conflito: cada superfície usa seu diretório (Cursor vs Claude Code vs Claude.ai)
- docs-audit espelhado: mesmo conteúdo, path no prompt adaptado
- assertion-evidence, medical-data: Claude only, complementam medical-slide (não duplicam)

### Skills

- medical-slide (Cursor) cobre assertion-evidence + verificação de dados
- assertion-evidence e medical-data (Claude) são subconjuntos — avaliar depreciação

### Context Window

- ≥70%: informar ao usuário
- ≥85%: recomendar subagent ou novo chat
- ≥95%: parar e recomendar novo chat
- **Sinais sem métrica:** respostas genéricas, esquecimento, repetição, confusão, pedidos já respondidos, lentidão → novo chat
- Regra em core-constraints.mdc; referência em docs/RULES.md, docs/SUBAGENTS.md

---

## Anti-patterns

- Documentar paths sem verificar existência no filesystem
- Duplicar regras entre .cursor e .claude sem decisão de fonte canônica
- Verbosidade em CLAUDE.md duplicando docs/

---

## Auditoria Profunda (2026-03-04)

### Rules .cursor vs .claude — NÃO são redundantes

- **CORRIGIDO:** README.md dizia ".cursor canônico" — na verdade são **complementares**
- `.claude` é mais completo em: medical-data (Tier 1 table), design-principles (27 vs 11), css-errors (5 clusters), motion-qa (5 tiers)
- `.cursor` é mais completo em: slide-editing (tri-mode), reveal-patterns (GSAP timeline)
- 3 rules .cursor sem equivalente .claude: core-constraints, plan-mode, notion-mcp
- Regra: em conflito, conteúdo mais detalhado prevalece

### Agents — Problemas Corrigidos

- **verifier:** model fast→sonnet (Haiku fraco demais para git diff + julgamento)
- **reference-checker → reference-manager:** Definido formato de handoff via `tasks/reference-check-report.md`
- **slide-builder vs medical-slide:** NÃO são duplicatas — ambientes diferentes (Claude Code vs Cursor). Cross-references adicionadas
- **docs-audit .claude:** Clarificado como redirect para .cursor/skills/docs-audit/
- **assertion-evidence:** Descrição corrigida "Cria" → "Valida"

### design-principles.mdc — 15 princípios adicionados

- .cursor tinha 11, agora tem 26 (alinhado com .claude/27)
- Adicionados: Andragogia (3), Mayer extras (2), Kahneman, Duarte expandido (5), Tufte (4), Layout Patterns + Fill Ratio
- Faltava: F-pattern, Z-pattern, Fill Ratio, Expertise-Reversal, Testing Effect — todos críticos para design de slides médicos

---

*Append-only. Não remover lições antigas.*

---

## Propósito do Ecossistema (2026-03-07)

### Valores explícitos — nunca perder de vista

Lucas quer ser o melhor **educador, pesquisador, médico e aprendiz** que conseguir.
Os agentes são **parceiros** que amplificam essas capacidades — não concorrentes, não ferramentas.

Objetivos encadeados:
1. Melhorar **AI/dev/ML fluency** → para usar melhor os agentes
2. Usar melhor os agentes → para ser melhor educador, pesquisador, médico
3. Aprendizado acumulado → pode contribuir de volta para criação de skills/agents/models

### O que isso muda na prática

- Retrabalho não é "custo" — é **tempo perdido de aprendizado**
- Handoff errado não é "ineficiência" — é **potencial desperdiçado**
- Cada slide bem feito = Lucas aprende algo sobre a doença + sobre como trabalhar com IA
- Documentação não é burocracia — é **memória do aprendizado compartilhada**

### Lição capturada

Framing inicial dos docs era "custo" e "eficiência". Correto é: **fluência e amplificação**.
Tokens não importam. Retrabalho importa porque rouba tempo de aprendizado.

### Skills frontmatter — campos mar 2026

- Novos campos disponíveis: `version`, `allowed-tools`, `argument-hint`, `user-invocable`, `disable-model-invocation`, `context`, `agent`
- `allowed-tools` evita aprovação manual por uso — sempre especificar em skills de auditoria (Read, Grep, Glob)
- **Bug crítico Issue #17283:** `context:fork` e `agent:` são ignorados quando skill invocado via Skill tool (API/SDK). Só funciona no CLI direto.
- `user-invocable: false` útil para skills de conhecimento de fundo (Claude auto-ativa, não aparece no menu `/`)
- `disable-model-invocation: true` para skills com side-effects sérios (deploy, push, send)
