---
name: audit-rules
description: Audita .claude/rules/*.md para contradicoes internas, refs stale, gaps vs ERROR-LOG/lessons.md, e bloat. Read-only. Ativar com "auditar rules", "rules stale?", "audit-rules", "verificar regras".
version: 1.0.0
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob
---

# audit-rules — Auditoria de Regras

Audita os 8 rules files em `.claude/rules/*.md` contra o estado real do projeto.

**Complementar ao `/evolve`:** evolve audita o ecossistema inteiro (skills, docs, tools, deps). audit-rules foca estreito e profundo nas rules.

## O que detecta

| Check | Fonte cruzada | Severidade |
|-------|---------------|------------|
| **Contradição interna** | Rule A diz X, Rule B diz ~X | FAIL |
| **Contradição com lessons** | Rule diz X, `tasks/lessons.md` aprendeu ~X | FAIL |
| **Erro corrigido sem regra** | `ERROR-LOG.md` tem erro, nenhuma rule cobre | WARN |
| **Regra sem erro motivador** | Rule existe mas nenhum ERRO-NNN a justifica (pode ser legítima) | INFO |
| **Ref stale** | Rule cita arquivo/path que não existe | FAIL |
| **Ref cruzada quebrada** | Rule cita outra rule que mudou de nome/local | FAIL |
| **Bloat** | Duplicação significativa entre .claude/rules/ e .cursor/rules/ | WARN |
| **Regra obsoleta** | Descreve padrão que não existe mais no código | WARN |
| **Versão desatualizada** | Rule cita versão de lib (GSAP 3.12) que mudou | INFO |

## Workflow

### 1. Coletar inputs (paralelo)

```
Read: .claude/rules/*.md (8 files)
Read: tasks/lessons.md
Read: aulas/cirrose/ERROR-LOG.md (e outras aulas se existirem)
Glob: .cursor/rules/*.mdc (para check de bloat)
```

### 2. Check contradições internas

Para cada par de rules files:
- Extrair afirmações prescritivas ("NUNCA", "SEMPRE", "obrigatório", "proibido")
- Comparar: mesma afirmação com sentido oposto = FAIL
- Especial: `design-system.md` vs `css-errors.md` (cores), `slide-editing.md` vs `reveal-patterns.md` (fragments)

### 3. Check contra lessons.md

Para cada lição em lessons.md:
- Grep pela keyword nas rules
- Se rule existente contradiz a lição → FAIL
- Se lição não tem rule correspondente → WARN (gap)

### 4. Check contra ERROR-LOG

Para cada ERRO-NNN:
- A "regra derivada" do erro existe em algum rules file?
- Se CRITICAL/HIGH sem rule → WARN
- Se rule existe mas texto diverge do erro → INFO

### 5. Check refs stale

Para cada `[texto](path)` e menção a arquivo nas rules:
- Verificar se path existe no filesystem
- Verificar se cross-refs entre rules estão corretas

### 6. Check bloat (.claude vs .cursor)

Usar tabela de pares em `.claude/rules/README.md`:
- Para cada par, comparar nível de detalhe
- Se conteúdo substancialmente duplicado → WARN com recomendação

### 7. Check obsolescência

Para cada regra que referencia seletores CSS, classes HTML, ou patterns de código:
- Grep no codebase para verificar se o pattern ainda existe
- Se pattern não encontrado → WARN (regra pode ser obsoleta)

## Output

```
## audit-rules Report — [data]

### FAIL (corrigir)
- [rule]: [check]: [detalhe]

### WARN (revisar)
- [rule]: [check]: [detalhe]

### INFO
- [rule]: [check]: [detalhe]

### Summary
- Rules auditadas: [N]
- FAIL: [N] | WARN: [N] | INFO: [N]
- Lessons cobertas por rules: [N]/[total]
- Erros (CRITICAL+HIGH) cobertos por rules: [N]/[total]
```

## Quando rodar

- Antes de `/evolve` (detectar stale para o comitê)
- Depois de atualizar ERROR-LOG ou lessons.md
- Após refactor grande de rules
- Semanalmente como higiene

## Regras

- **READ-ONLY.** Nunca editar rules automaticamente.
- Reportar findings, deixar humano decidir fixes.
- Se encontrar contradição FAIL, destacar as duas fontes lado a lado.
- Ignorar `.cursor/rules/` como fonte de contradição (complementar, não conflitante).
