# HANDOFF — Meta-analise

> Estado operacional da aula. Atualizar ao final de cada sessao.

## Estado geral

**Fase:** Bootstrap — scaffolding + scope definido, zero slides de conteudo.

## Branch

`feat/metanalise-mvp` (worktree em `C:\Dev\Projetos\wt-metanalise`)

## Escopo da aula

- 45-60 min, residentes avancados + staff gastro/hepato
- Foco: LEITURA CRITICA de meta-analise (nao producao)
- Modelo pairwise classico (NMA/Bayesian/IPD = teaser)
- 10 blocos tematicos candidatos (ver `docs/metanalise-scope.md`)
- 3 checkpoints interativos planejados
- Assertion-evidence, Reveal.js, GSAP, OKLCH

## Fontes que mandam

| Doc | Papel |
|-----|-------|
| `docs/metanalise-scope.md` | Escopo completo, blocos, checkpoints, referencias |
| `aulas/metanalise/CLAUDE.md` | Regras especificas (9 MAs, forest plot real obrigatorio) |
| `CLAUDE.md` (raiz) | Stack, hard constraints, workflow |

## O que ja existe

| Arquivo | Status |
|---------|--------|
| `CLAUDE.md` | Regras especificas — OK |
| `index.html` | Placeholder (1 section "Em construcao") |
| `index.stage-b.html` | Placeholder Plano B |
| `index.stage-c.html` | Placeholder Plano C |

## O que ainda e placeholder

- **Tudo.** Nenhum slide de conteudo existe.
- Nao ha `slides/` dir, `_manifest.js`, CSS proprio, nem build script.
- Nao ha CHANGELOG, ERROR-LOG, NOTES.
- Nao ha registro no Notion Slides DB.
- `docs/README.md` e `docs/XREF.md` nao listam HANDOFF da metanalise.

## Proximo micro passo

1. Definir arco narrativo minimo: quantos slides por bloco, ordem dos 10 blocos, quais sao core vs optional.
2. Criar `slides/` dir + `_manifest.js` com lista de slides planejados.
3. Primeiro slide real: `00-title.html`.
