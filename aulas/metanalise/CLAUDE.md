# Meta-análise — Regras Específicas

Parent: ver CLAUDE.md na raiz.

## Worktree

- **Path:** `C:\Dev\Projetos\wt-metanalise`
- **Branch:** `feat/metanalise-mvp`
- **Upstream:** `origin/feat/metanalise-mvp`
- **Escopo:** apenas `aulas/metanalise/`
- **Proibido:** `shared/`, `docs/` raiz, `CLAUDE.md` raiz, outras aulas
- **Exceção documental:** `docs/metanalise-scope.md`, `docs/slide-pedagogy.md` (autorizados pelo usuário)

## Escopo

- 45–60 min, residentes clínica médica (básico-intermediário)
- Foco: LEITURA CRÍTICA de MA (não produção de RS)
- Modelo: pairwise clássico de RCTs
- Âncora: [TBD — Musini 2025 é candidato, não decisão final]
- Conceitos avançados (NMA, IPD, bayesiana) = fora do escopo
- Forest plots = imagens cropadas de artigos reais (NUNCA SVG construído do zero)

## Hierarquia de referência

narrative.md → evidence-db.md → blueprint.md → slides/
reading-list.md (paralelo, informa pre-reading)

## Estrutura narrativa (v1)

3 fases + 2 interações (ver narrative.md):
1. **Fase 1 — Criar importância** (slides 00-02): engajar antes de ensinar
2. **Interação 1** (slide 03): checkpoint de engajamento
3. **Fase 2 — Metodologia** (slides 04-11): conceitos genéricos, sem artigo
4. **Interação 2** (slide 12): checkpoint de consolidação
5. **Fase 3 — Aplicação** (slides 13-17): artigo real [TBD]

**Regra:** nenhum slide antes da Fase 3 referencia artigo específico.

## Hard constraints (herda root + adiciona)

1. Assertion-evidence em todos os slides
2. Fases 1-2: dados genéricos ou Cochrane Handbook. Artigo específico só na Fase 3
3. Sem dados inventados. Sem fonte tier 1 → [TBD]. Dados de checkpoints = ilustrativos (sinalizar)
4. GRADE como linguagem clínica, não burocracia
5. Forest plot: cropado de artigo real quando disponível; placeholder até lá
6. Corpo do slide <= 30 palavras
7. Speaker notes em português
8. Uma MA não é melhor que os RCTs que a alimentam — isso permeia a aula

## Status

**Fases 1+2 completas. 12 slides ativos no index.html, QA review pass feito. Faltam checkpoint-2 e Fase 3 (bloqueada por artigo âncora).**
