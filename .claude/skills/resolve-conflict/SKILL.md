---
name: resolve-conflict
description: Guia passo-a-passo para resolver conflitos de merge/rebase/cherry-pick. Explica em PT-BR o que cada marcador significa, propoe resolucao, e NUNCA aplica sem aprovacao. Para dev iniciante. Ativar quando git status mostrar conflito, ou usuario pedir "resolver conflito", "merge conflict", "tem conflito".
version: 1.0.0
context: fork
agent: general-purpose
allowed-tools: Read, Edit, Bash, Grep, Glob
argument-hint: "[arquivo especifico] ou vazio para todos"
---

# resolve-conflict — Resolucao Guiada de Conflitos Git

Resolver conflitos detectados: `$ARGUMENTS`

## Principio

**NUNCA resolver silenciosamente.** Se nao tem certeza → PARA e pergunta.
Cada resolucao precisa de aprovacao ANTES de aplicar.

---

## Step 1 — Diagnostico

```bash
# Detectar estado do repo
git status
```

### Classificar tipo de operacao

| Estado | Como detectar | Comando de saida |
|--------|--------------|-----------------|
| **Merge** | `.git/MERGE_HEAD` existe | `git merge --continue` ou `git merge --abort` |
| **Rebase** | `.git/rebase-merge/` existe | `git rebase --continue` ou `git rebase --abort` |
| **Cherry-pick** | `.git/CHERRY_PICK_HEAD` existe | `git cherry-pick --continue` ou `git cherry-pick --abort` |

### Classificar arquivos por risco (Quarentena Semantica)

| Classe | Arquivos | Risco |
|--------|----------|-------|
| **A — Governanca** | CLAUDE.md, rules/, docs/, MEMORY.md | Baixo — absorver |
| **B — Infra** | hooks/, skills/, scripts/ | Baixo — absorver |
| **C — Conteudo** | slides/*.html, _manifest.js, *.css da aula | **ALTO — triagem obrigatoria** |

Se houver arquivo Classe C em conflito:
```
⚠ ATENCAO: Arquivos de conteudo (slides) em conflito.
Estes precisam de triagem cuidadosa — podem afetar sua apresentacao.
Vou mostrar cada um separadamente para voce decidir.
```

---

## Step 2 — Explicacao e Resolucao (por arquivo)

Para CADA arquivo com conflito:

### 2a. Mostrar o conflito

```bash
# Ler o arquivo com os marcadores
```

### 2b. Explicar em PT-BR

```
O Git encontrou duas versoes diferentes do mesmo trecho:

<<<<<<< HEAD
  (Isto e a SUA versao — o que voce tinha antes)
=======
  (Isto e a versao do OUTRO branch — o que esta vindo)
>>>>>>> nome-do-branch

Voce precisa decidir: manter a sua, a deles, ou combinar as duas.
```

### 2c. Propor resolucao

Para cada conflito no arquivo, apresentar:

```
CONFLITO em [arquivo]:[linha]

SUA versao:
  [conteudo HEAD]

VERSAO DELES:
  [conteudo incoming]

MINHA SUGESTAO: [manter sua | manter deles | combinar assim: ...]
MOTIVO: [por que esta sugestao]

Aceita? (sim / nao / mostrar mais contexto)
```

### 2d. Regras de sugestao

- Se whitespace-only → sugerir a versao mais limpa
- Se ambos adicionaram conteudo diferente → sugerir combinar (mais comum)
- Se um deletou e outro editou → **PARAR e perguntar** (nao tem resposta obvia)
- Se e slide (Classe C) → **SEMPRE perguntar**, nunca auto-resolver
- Se e shared/ → avisar: "shared/ so deve ser editado em main"

---

## Step 3 — Aplicar e Verificar

Apos TODOS os conflitos de TODOS os arquivos serem aprovados:

```bash
# 3a. Remover marcadores e aplicar resolucoes (via Edit tool)

# 3b. Staged resolved files
git add [arquivos resolvidos]

# 3c. Verificar build
npm run build 2>&1 | head -20

# 3d. Completar a operacao
# Se merge:
git merge --continue
# Se rebase:
git rebase --continue
# Se cherry-pick:
git cherry-pick --continue
```

### Se build falhar apos resolucao

```
Build falhou apos resolver conflitos.
Isso pode significar que a resolucao quebrou algo.

Opcoes:
1. Investigar o erro (recomendado)
2. Abortar tudo e voltar ao estado anterior:
   git merge --abort  (ou rebase --abort)
```

---

## Saida de Emergencia

Se em qualquer momento o usuario quiser desistir:

```bash
# Abortar merge
git merge --abort

# Abortar rebase
git rebase --abort

# Abortar cherry-pick
git cherry-pick --abort
```

Explicar: "Isto desfaz TUDO e volta ao estado de antes. Nenhum arquivo sera modificado."

---

## Glossario (PT-BR)

| Termo | Significado |
|-------|-------------|
| **Conflito** | Dois branches editaram o mesmo trecho — Git nao sabe qual manter |
| **HEAD** | Sua versao atual (onde voce esta agora) |
| **Incoming** | A versao que esta chegando (do outro branch) |
| **Merge** | Juntar dois branches (cria commit extra) |
| **Rebase** | Reposicionar seus commits em cima de outro branch (reescreve historico) |
| **Cherry-pick** | Copiar um commit especifico de outro branch |
| **Stage (git add)** | Marcar arquivo como "resolvido" para o Git |
| **Abort** | Cancelar tudo e voltar ao estado anterior |

---

## Integracao com Workflow do Projeto

- Respeita `guard-merge.sh`: --no-ff em main, shared/ protegido
- Respeita quarentena semantica: Classe C exige triagem
- Atualiza HANDOFF.md apos resolucao se conflito era significativo
- Loga em NOTES.md se conflito revelou problema de coordenacao
