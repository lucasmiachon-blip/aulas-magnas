---
name: gtd
description: Getting Things Done simplificado — inbox capture, next actions, weekly review. File-based (Markdown). Ativar com "gtd", "inbox", "next actions", "weekly review", "o que tenho pendente?", "capturar tarefa". Preparado para futura integracao com Obsidian.
version: 1.0.0
context: lazy
allowed-tools: Read, Write, Edit, Glob, Grep
argument-hint: "[capture|review|next|focus|done|inbox] [texto da tarefa]"
---

# GTD — Getting Things Done (Simplificado)

Comando: `$ARGUMENTS`

## Filosofia

David Allen: "Sua mente e para ter ideias, nao para guarda-las."
Tudo que ocupa espaco mental → capturar → processar → organizar → fazer.

---

## Estrutura de Arquivos

```
gtd/
├── inbox.md          ← Captura rapida (caixa de entrada)
├── next-actions.md   ← Proximas acoes concretas (max 3 em FOCO)
├── projects.md       ← Projetos ativos (>1 acao para completar)
├── waiting-for.md    ← Esperando resposta/acao de terceiros
├── someday-maybe.md  ← Ideias para o futuro
└── done.md           ← Arquivo de conclusoes (append-only)
```

Criar na raiz do projeto. Cada arquivo e Markdown puro — compativel com Obsidian no futuro.

---

## Comandos

### `capture` ou `inbox` — Capturar

Adicionar item ao inbox.md. Nao classificar agora — so capturar.

```markdown
## Inbox

- [ ] [texto] — capturado [YYYY-MM-DD]
- [ ] [texto] — capturado [YYYY-MM-DD]
```

### `process` — Processar inbox

Para CADA item no inbox, perguntar (em ordem):

```
1. E acionavel? (da para fazer algo concreto?)
   NAO → someday-maybe.md ou deletar
   SIM ↓

2. Leva menos de 2 minutos?
   SIM → fazer agora, registrar em done.md
   NAO ↓

3. Sou eu que faco?
   NAO → waiting-for.md (com quem e deadline)
   SIM ↓

4. Faz parte de projeto existente?
   SIM → adicionar como acao em projects.md
   NAO → next-actions.md
```

### `next` — Ver proximas acoes

Mostrar next-actions.md com destaque para os 3 itens em FOCO.

```markdown
## Next Actions

### FOCO (max 3)
- [ ] **[acao 1]** — projeto: [X] | contexto: @computador
- [ ] **[acao 2]** — projeto: [X] | contexto: @computador
- [ ] **[acao 3]** — projeto: [X] | contexto: @celular

### Backlog
- [ ] [acao 4] — projeto: [Y]
- [ ] [acao 5] — projeto: [Z]
```

**Regra do 3:** Maximo 3 itens em FOCO simultaneo. Terminar ou mover para backlog antes de puxar novo.

### `focus` — Definir foco

Mover itens entre FOCO e Backlog. Perguntar:
- "Qual e a coisa mais importante que voce pode fazer agora?"
- "Isso desbloqueia algum projeto?"

### `done [item]` — Marcar como feito

1. Remover de next-actions.md (ou projects.md)
2. Adicionar a done.md com data
3. Se projeto completou → mover para done.md tambem
4. Puxar proximo item do backlog para FOCO (se <3)

```markdown
## Done

### 2026-03-12
- [x] Criar skill resolve-conflict — projeto: Ecosystem
- [x] Ativar guard-merge.sh — projeto: Ecosystem
```

### `review` — Revisao semanal

Checklist (rodar 1x/semana, ~15min):

```
1. Inbox zerado? (processar tudo)
2. Next-actions: os 3 FOCO ainda sao os mais importantes?
3. Projects: algum projeto parado >7 dias? → mover ou cancelar
4. Waiting-for: cobrar quem deve resposta?
5. Someday-maybe: alguma ideia virou prioridade?
6. Done: celebrar o que foi feito esta semana
```

Gerar resumo:
```markdown
## Weekly Review — [YYYY-MM-DD]

### Concluido esta semana
- [lista de done.md da semana]

### Em foco para proxima semana
- [3 itens FOCO]

### Bloqueios
- [o que esta parado e por que]
```

---

## Contextos (tags opcionais)

| Tag | Quando usar |
|-----|-------------|
| `@computador` | Precisa de terminal/IDE |
| `@celular` | Pode fazer do celular/tablet |
| `@pesquisa` | Precisa buscar evidencia/paper |
| `@decisao` | Precisa de decisao antes de agir |
| `@esperando` | Delegado, aguardando retorno |

---

## Integracao com Projeto Atual

### HANDOFF.md → GTD

HANDOFF.md e o "inbox" do projeto de slides. Na weekly review:
1. Ler HANDOFF.md de cada aula ativa
2. Itens P0/P1 → next-actions.md com FOCO
3. Itens P2 → backlog
4. Itens futuros → someday-maybe.md

### Tasks nativo do Claude → GTD

Tasks (TaskCreate/TaskList) = tracking de sessao (volatil).
GTD = tracking entre sessoes (persistente).
Nao competem — complementam.

### Anti-drift

Se FOCO tem 3 itens e usuario pede algo fora:
```
"Voce tem 3 itens em FOCO: [X, Y, Z].
Este pedido nao esta entre eles.
Quer substituir algum, ou adicionar ao backlog?"
```

---

## Formato de Item

```markdown
- [ ] **[verbo no infinitivo] [objeto]** — projeto: [nome] | contexto: @[tag] | capturado: [data]
```

Exemplos:
```markdown
- [ ] **Preencher conteudo do slide s-a3-01** — projeto: Cirrose Act3 | contexto: @computador | capturado: 2026-03-12
- [ ] **Buscar PMID para PREDESCI NNT** — projeto: Cirrose Act2 | contexto: @pesquisa | capturado: 2026-03-12
- [ ] **Decidir h2 do slide hook** — projeto: Cirrose Act1 | contexto: @decisao | capturado: 2026-03-12
```

---

## Migrar Inbox para o projeto (bootstrap)

Na primeira execucao, popular a partir de fontes existentes:

1. `aulas/cirrose/HANDOFF.md` → itens P0/P1/P2
2. `tasks/lessons.md` → itens com status "apply"
3. `aulas/cirrose/NOTES.md` → decisoes pendentes
4. MEMORY.md → "deferred" items

Nao duplicar — referenciar: `ver HANDOFF.md #P0-3`
