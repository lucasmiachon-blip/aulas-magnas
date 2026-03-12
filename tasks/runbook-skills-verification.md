# Runbook: Verificação pós-merge + Janitor + audit-rules

> Gerado: 2026-03-12. Contexto: sessão evolve + janitor + docs-audit em main, absorvida em 3 WTs.

---

## Estado das WTs (snapshot pré-verificação)

| WT | Branch | Ahead/Behind main | Status |
|----|--------|-------------------|--------|
| wt-cirrose | feat/cirrose-mvp | 12 ahead, 1 behind | clean |
| wt-metanalise | feat/metanalise-mvp | 12 ahead, 1 behind | clean |
| wt-osteo | feat/osteo-mvp | 0 ahead, 1 behind | clean |

Commit faltante: `d44e8ea` (Classe A — HANDOFF doc). Seguro absorver.

---

## Step 1: Janitor em main (ESTE terminal) — [x] DONE

### Fixes aplicados:
- **HIGH** Fixed broken link `docs/archive/AUDIT-BATCHES.md` (`../tasks/todo.md` → `../../tasks/todo.md`)
- **MED** Renamed `aulas/cirrose/docs/insights-html-cirrose-2026.md` → `interactive-patterns-reference.md` (resolve duplicate filename)
- **WARN** Removed 13 dead CSS selectors from `cirrose.css` (~140 lines): 9× `damico-*`, 3× `pathway-*`, 1× `hook-lab--warning`
- **LOW** Removed empty `exports/` directory
- **LOW** Archived `CHATGPT_HANDOFF_ACT2.md` → `docs/archive/`
- **LOW** Archived `.cursor/plans/aulas-magnas-system-v6.plan.md` → `docs/archive/`
- Build verified: `npm run build:cirrose` → 44 slides OK

O agente roda aqui. Nada para o usuário fazer.

---

## Step 2: Verificar wt-cirrose — [ ]

Quando o agente disser "Step 1 done", abrir terminal novo e rodar:

```bash
cd /c/Dev/Projetos/wt-cirrose
claude
```

Dentro do Claude, pedir:
```
Estou na wt-cirrose (feat/cirrose-mvp). Preciso:
1. git merge main (absorver 1 commit HANDOFF faltante)
2. npm run build:cirrose
3. npm run lint:slides
4. /repo-janitor
Reportar PASS/FAIL de cada.
```

---

## Step 3: Verificar wt-metanalise — [ ]

Fechar terminal anterior, abrir novo:

```bash
cd /c/Dev/Projetos/wt-metanalise
claude
```

Dentro do Claude:
```
Estou na wt-metanalise (feat/metanalise-mvp). Preciso:
1. git merge main (absorver 1 commit HANDOFF faltante)
2. npm run build (ou build específico se existir)
3. npm run lint:slides
4. /repo-janitor
Reportar PASS/FAIL de cada.
```

---

## Step 4: Verificar wt-osteo — [ ]

Fechar terminal, abrir novo:

```bash
cd /c/Dev/Projetos/wt-osteo
claude
```

Dentro do Claude:
```
Estou na wt-osteo (feat/osteo-mvp). Preciso:
1. git merge main (deve ser fast-forward, sem conflito)
2. npm run build:osteoporose
3. npm run lint:slides
4. /repo-janitor
Reportar PASS/FAIL de cada.
```

---

## Step 5: Criar `/audit-rules` (em main) — [ ]

Fechar terminal, abrir novo:

```bash
cd /c/Dev/Projetos/aulas-magnas
claude
```

Dentro do Claude:
```
Criar a skill /audit-rules que foi perdida na sessão do evolve.
Spec: audita .claude/rules/*.md para contradições, refs stale, gaps vs ERROR-LOG/lessons, bloat.
Read-only (Tools: Read, Grep, Glob).
Trigger: "auditar rules", "rules stale?", "audit-rules".
Após criar, rodar nos 8 rules files e aplicar fixes.
Commitar resultado.
```

---

## Step 6: Janitor final em main — [ ]

Mesmo terminal do Step 5 ou novo:

```
Rodar /repo-janitor em main para fechar o ciclo.
Atualizar HANDOFF + MEMORY com resultado de todos os steps.
```

---

## Resumo da sequência

| Step | Onde | Comando | O que pedir |
|------|------|---------|-------------|
| 1 | main (AQUI) | — | Janitor em main |
| 2 | wt-cirrose | `cd /c/Dev/Projetos/wt-cirrose && claude` | merge + build + lint + janitor |
| 3 | wt-metanalise | `cd /c/Dev/Projetos/wt-metanalise && claude` | merge + build + lint + janitor |
| 4 | wt-osteo | `cd /c/Dev/Projetos/wt-osteo && claude` | merge + build + lint + janitor |
| 5 | main | `cd /c/Dev/Projetos/aulas-magnas && claude` | criar audit-rules + rodar |
| 6 | main | (mesmo ou novo) | janitor final + atualizar docs |
