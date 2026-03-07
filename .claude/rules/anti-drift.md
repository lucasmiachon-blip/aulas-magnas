# Anti-Drift Protocol

> Previne sessões gastas em trabalho que não avança o produto.
> Produto = slides prontos para congresso. Todo o resto é suporte.

---

## Definição de Drift

Drift = trabalho que não move slides em direção a "pronto para projetar".

Exemplos de drift:
- Refatorar docs por 2+ sessões sem tocar em slides
- Reorganizar rules/skills sem bug ou blocker motivando
- Pesquisar benchmarks de modelos sem task de slide pendente
- Criar abstrações, protocolos ou frameworks "para o futuro"
- Otimizar ferramentas que já funcionam

Exemplos de NÃO-drift (mesmo sem tocar em slides):
- Corrigir regra que causou erro real em slide (ERROR-LOG motivado)
- Protocolo que previne classe inteira de erros futuros (este arquivo)
- Pesquisar PMID para dado [TBD] em slide existente

---

## Checkpoints Obrigatórios

### Início de sessão — antes de qualquer trabalho

```
1. Ler HANDOFF.md → identificar caminho crítico
2. Caminho crítico = o que bloqueia slides de passarem no QA
3. Propor ao usuário: "Caminho crítico é X. Concordo em fazer Y?"
4. Se o usuário pedir algo fora do caminho crítico → PAUSA (ver abaixo)
```

### PAUSA anti-drift — quando ativada

Ativar quando:
- Usuário pede tarefa que não está no caminho crítico
- Agente percebe que está há >30 min sem produzir artefato de slide
- Segunda tarefa consecutiva de docs/rules/skills sem slide no meio

Formato da pausa:
```
"Pausa anti-drift: [tarefa pedida] não está no caminho crítico.
Caminho crítico atual: [X pendências bloqueiam QA].
Contraponto: [razão concreta para fazer ou não fazer agora].
Quer continuar com [tarefa pedida] ou voltar ao caminho crítico?"
```

O agente DEVE dar contraponto mesmo quando concorda com o usuário.

### Final de sessão — antes de encerrar

```
1. Quantos slides avançaram nesta sessão? (meta: ≥1)
2. Se zero slides avançaram → registrar em NOTES.md como sessão de suporte
3. Atualizar HANDOFF.md com estado real
```

---

## Contraponto Obrigatório

O agente NUNCA deve apenas concordar com uma proposta do usuário.

Para toda decisão não-trivial, o agente deve:
1. Apresentar o lado oposto — mesmo que concorde no fundo
2. Explicitar trade-offs (tempo, risco, custo de oportunidade)
3. Só então dar sua recomendação

Formato mínimo:
```
"Concordo com X, mas o trade-off é Y.
Alternativa seria Z.
Recomendo X porque [razão]."
```

Exceções (não precisa de contraponto):
- Correção factual óbvia (typo, link quebrado, build quebrado)
- Tarefa que o usuário já decidiu e está executando
- Pergunta direta com resposta objetiva

---

## Classificação de Tarefas

| Tipo | Exemplos | Limite por sessão |
|------|----------|-------------------|
| **Produto** | Editar slide, corrigir CSS, rodar QA, fix lint | Ilimitado |
| **Suporte** | Atualizar HANDOFF, registrar erro, pesquisar PMID | Conforme necessário |
| **Infra** | Refatorar docs, criar rules, reorganizar skills | Max 1 por sessão |
| **Exploração** | Benchmarks, novas ferramentas, protocolos futuros | Só se não houver Produto pendente |

Se a sessão inteira foi Infra/Exploração → flag explícito no HANDOFF.

---

## Regra dos 3 Commits

Após 3 commits consecutivos sem arquivo em `aulas/*/slides/` ou `aulas/*/*.css`:
- Agente DEVE pausar e perguntar: "3 commits sem tocar em slides. Continuar ou voltar ao produto?"

---

## Pendências Registradas (split futuro)

- `docs/ECOSYSTEM.md` mistura 3 naturezas: regras estáveis, inventário operacional, benchmarks voláteis
  - Proposta: split em ECOSYSTEM.md (regras) + TOOLING.md (inventário) + benchmarks para seção datada ou archive
  - Fazer após QA Bloco 1 ter ≥1 slide passando
