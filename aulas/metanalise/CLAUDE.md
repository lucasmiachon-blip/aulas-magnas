# Meta-analise — Regras Especificas

Parent: ver CLAUDE.md na raiz.

## Worktree

- **Branch pattern:** `feat/metanalise-{feature}-mvp`
- **WT location:** `../aulas-magnas-wt-metanalise-{feature}`
- **shared/ restrictions:** READ-ONLY. Deferir mudancas para sessao em main.
- **Pre-merge checklist:**
  - [ ] `git diff --name-only main...HEAD | grep shared/` retorna vazio
  - [ ] Build passa sem erros
  - [ ] `git status` limpo
- **Merge protocol:** No main: `git merge --no-ff feat/metanalise-{feature}-mvp`
- **Cleanup:** `bash .claude/scripts/worktree-cleanup.sh metanalise-{feature}`

## Escopo

- 45-60 min, residentes (basico-intermediario)
- Foco: LEITURA CRITICA de forest plots (nao producao)
- Modelo: pairwise classico (nao NMA/Bayesian/IPD)
- 9 MAs selecionadas (ver metanalise-scope.md)
- Conceitos avancados (prediction intervals, TSA) = teaser apenas
- Sempre mostrar forest plot REAL do paper
