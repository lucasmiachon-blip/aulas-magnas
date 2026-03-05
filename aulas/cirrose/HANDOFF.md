# HANDOFF — Cirrose (projeto)

> Só pendências. Detalhes → CHANGELOG.md, ERROR-LOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md

---

## Prioridades — PRÓXIMA SESSÃO

> Todas as tarefas de docs estão DONE. Foco agora é Bloco 1 HTML + limpeza de screenshots.

### 🔴 URGENTE — Limpar screenshots do repo (git fica pesado)
- Deletar ~75 `qa-*.png` espalhados no root do projeto
- Deletar 17 screenshots em `.playwright-mcp/`
- Deletar 9 screenshots em `qa-screenshots/` (root)
- Manter apenas `aulas/cirrose/qa-screenshots/stage-c/` (3 screenshots de referência)
- Adicionar ao `.gitignore`: `qa-*.png`, `.playwright-mcp/`

### 🔴 ALTA — Bloco 1 HTML Fixes (8 slides: s-a1-01 a s-cp1)

**QA screenshots tirados nesta sessão (localhost:3000):**
- s-a1-01 (continuum): fill ratio ~45%, hero "1,32" bom mas barras embaixo deixam vazio no meio
- s-a1-05 (etiologias): só 3/10 linhas na tabela — fix I4 urgente
- s-a2-03 (albumina): todos 4 cards visíveis ✅ (fix 04/mar funcionou)
- s-a1-damico (D'Amico): CSS fix aplicado hoje (descendant selector) — QA pós-fix pendente

**Fixes prioritários Bloco 1:**
- **I3** — `05-a1-infeccao.html`: barra "Álcool" ausente (stagger incompleto). Verificar engine.js stagger + force-reveal
- **I4** — `06-a1-etiologias.html`: tabela mostra só 3 linhas de 10. Provavelmente `cirrose.css` tem `overflow: hidden` ou `max-height` limitando
- **S3** — Todos os slides Bloco 1: fill ratio ~40-50%. Padding dos archetypes `1.5rem 2rem` → verificar se está aplicando (archetypes.css linha 39)
- **S4** — `02-a1-continuum.html`: hero "1,32" está em `--text-h1`, deveria ser `--text-hero`

**QA pós-fix:** Rodar `npm run build:cirrose` e tirar screenshots via Playwright dos 8 slides do Bloco 1

### 🟡 MÉDIA — Insights de interação de `C:\Dev\Teste\index.html`

Arquivo analisado nesta sessão. Insights prontos para aplicar:

1. **handlePoll pattern** — para CP1/CP2/CP3: opções de conduta com feedback imediato (verde=certo, opaco=errado, mensagem aparece). JS simples, zero dependência
2. **EMR sidebar phase sync** — `syncSidebar(phase)` já existe no nosso `case-panel.js` mas sem `scrollIntoView`. Adicionar scroll suave ao activar fase
3. **In-sidebar FIB-4** — Calculadora FIB-4 no painel lateral (já temos MELD calculator no slide; FIB-4 faz mais sentido no painel junto com os labs)
4. **Baveno VII checklist** — `checkBaveno()`: 3 checkboxes no painel para CP3 (recompensação). Animação `gsap.fromTo` com `back.out(2)` ao completar

Todos os trials citados nesse HTML precisam PMID antes de usar. Ver `docs/insights-html-cirrose-2026.md`.

### 🟢 BAIXA — Slides Bloco 2 e 3 (após Bloco 1 ok)
- Bloco 2 (s-a2-01 a s-cp2): I5, I6, I7 fixes + S3 fill
- Bloco 3 (s-a3-01 a s-close): S3 fill + hero typography
- Appendix: R1 (archetype-appendix sem case panel)

---

## Sessão 05/mar (noite) — QA + Análise Teste HTML

---

### Concluído
- **QA visual** — screenshots de s-title, s-a1-01, s-a1-damico, s-a1-03 (MELD), s-a1-05 (etiologias), s-a2-03 (albumina) via Playwright (localhost:3000)
- **Análise `C:\Dev\Teste\index.html`** — 10 slides, 3 calculadoras interativas (FIB-4, MELD, Baveno VII checklist), poll/voting pattern — 4 insights documentados acima
- **Identificado: 90+ screenshots espalhados no repo** (root + .playwright-mcp/) — limpeza necessária antes do próximo commit

---

## Sessão 05/mar (tarde) — Docs Cleanup + D'Amico CSS Fix

### Concluído
- **AUDIT-VISUAL.md** 574→479 linhas: bloco SYS-1/2/3 adicionado; 28 seções por-slide condensadas com SYS-N + backlog IDs
- **biblia-narrativa.md**: Índice TOC (9 seções) inserido após header; tabela NNT/NNH substituída por link para evidence-db.md
- **HANDOFF.md** prioridades #2, #3, #5: marcadas como DONE
- **cirrose.css** bug fix: `#s-a1-damico.archetype-flow` → `#s-a1-damico .archetype-flow` (descendant selector — grid-template-rows nunca aplicava ao D'Amico slide); rebuild OK (30 slides)

---

## Sessão 05/mar — Codebase Health Cleanup

### Concluído
- **Cr conflict fix**: `biblia-narrativa.md` e `references/narrative.md` — Cr 3,1 → 2,8 para CP2 (alinhado com _manifest.js / 14-cp2.html / Notion)
- **Evidence dedup**: TABELA DE EVIDENCIAS e TBDs RESOLVIDOS em `biblia-narrativa.md` substituídos por links para `evidence-db.md` (fonte canônica)
- **7 arquivos deletados** (~128 KB): `index.stage-b.html`, `index.stage-c.html`, `split-slides.js`, `transcribe-lecture.js`, `qa-pdf-stage-b.js`, `migrate-grade-slides.js`, `migrate-osteoporose-slides.js`
- **Dependentes atualizados**: `export-pdf.js` (removido Plan B), `package.json` (removido `transcribe`), `CLAUDE.md` / `AGENTS.md` / `aulas/cirrose/CLAUDE.md` (referências limpas)

---

## Sessão 04/mar (tarde) — Notion Sync + Auditoria dados do caso

### Concluído
- **Notion Sync — Gestalt QA Reset**: 29 slides CIRR-* patcheados para `Visual QA: needs-revision`; slides `qa-passed` voltaram para `Pipeline Status: html-ready`
- **2 novos slides criados no Notion**: `CIRR-A1-DAMICO` (`319dfe68…`) e `CIRR-A1-SCREEN` (`319dfe68…`) — ambos `html-ready` + `needs-revision`
- **Conflito Cr corrigido**: `_manifest.js` `s-cp2` events — `Cr 3,1 → Cr 2,8` (alinhado com 14-cp2.html e Notion)

### Pendências de dados do caso (baixa urgência)
- **PLQ 112k (hook) vs 118k (CP1)** — duas visitas diferentes, diferença plausível mas sem nota de contexto explícita no slide
- **Stage no CP1**: `07-cp1.html` mostra `cACLD → CSPH` (seta), `_manifest.js` mostra `cACLD/CSPH` (barra) — cosmético, mesma informação
- **Versões paralelas no Notion** — CIRR-A1-01 (html-ready) e CIRR-A1-01 (v4) (blueprint) coexistem com headlines diferentes; CIRR-A1-02-OLD (deprecated) e CIRR-A1-02-NEW (blueprint) idem — limpeza quando definir versão final

---

## Sessão 04/mar — Flip + QA + Fixes (PARCIALMENTE CONCLUÍDA)

### Concluído
- **Flip plugin**: `index.template.html` + `slide-registry.js` importam e registram Flip; `advance()` captura `Flip.getState(formulaBlock)` antes de `showEra(5)`; `runEra5Anims(preFlipState)` usa `Flip.from → fireCountUps` (fallback `gsap.from` quando sem preFlipState)
- **Panel overlap**: `archetypes.css` — `--panel-width: 200px` + `.reveal.has-panel .slide-inner { max-width: calc(100% - var(--panel-width) - 3rem); margin: 0 0 0 2rem }` — headlines deixam de ser cortadas pelo case-panel em TODOS os slides
- **Era 5 flex**: `.damico-dataset .pathway-track { display:flex }` + `.damico-dataset .pathway-stage { flex:1 }` — layout horizontal restaurado
- **Era 1 overflow**: `overflow-y: hidden` + limitations mais compactas (padding 4px) — sem scrollbar
- **Panel valores longos**: `.panel-field-value { font-size:13px }` + `stage: 'cACLD/CSPH'` em _manifest.js

### BUG CRÍTICO PENDENTE — `#s-a1-damico.archetype-flow` (seletor errado)
```css
/* cirrose.css, linha ~1823 — ERRADO (sem espaço): nunca casa */
#s-a1-damico.archetype-flow { grid-template-rows: auto auto 1fr auto; }
/* CORRETO (com espaço — descendente): */
#s-a1-damico .archetype-flow { grid-template-rows: auto auto 1fr auto; }
```
**Efeito**: scores-era-track fica com `height: auto` (~267px) em vez de `1fr` (~520px) → Era 5 dataset D'Amico 2014 (pathway stages) é clippado por `overflow-y: hidden`.
**Fix**: 1 char — adicionar espaço no seletor em cirrose.css. Após o fix, rebuild.

### QA Resumo (pós-fixes parciais)
| Slide | Status | Notas |
|---|---|---|
| 00-title | ✅ PASS | Clean |
| 01-hook | ✅ PASS | Labs canônicos OK |
| 02-burden s-a1-01 | ⚠ WARN | Hero+iceberg sobrepostos no estado 1 (aesthetic, não bloqueante) |
| 02b-damico Era 0-2 | ✅ PASS pós-fix | Headline visível, sem overflow |
| 02b-damico Era 5 | ⚠ WARN | Dataset 2014 stages clippados (fix: seletor CSS acima) |
| 02c-screening | ✅ PASS | OK |
| 07-cp1 | ✅ PASS | Panel values OK pós-fix |

---

## Slides novos/reescritos (sessão 04/mar — Screening + Escores)

**FEITO — 02b-a1-damico.html (Escores Prognósticos):**
- Reescrito completamente: Child 1964 → CTP 1973 → MELD 2001 → MELD-Na 2006 → MELD 3.0 2021 → D'Amico
- 6 eras em state machine com era-swap (fade in/out)
- CTP: 4 limitações em stagger sequencial. [TBD] para interobserver PMID
- MELD 2001: formula stagger + CountUp c-stat 0.87
- MELD-Na: highlight no termo sódio via GSAP
- MELD 3.0: dual CountUp (0.869 vs 0.862) + alert EASL + âncora PREDESCI
- D'Amico: 2 datasets com labels OBRIGATÓRIOS (2006 ANUAL ≠ 2014 5ANOS)
- Plan B: todas eras visíveis em coluna via CSS (.stage-bad .scores-era)

**FEITO — 02c-a1-screening.html (novo slide):**
- 5 estados: gancho Antônio → 83% (PMID 38934697) → critérios → ferramentas → PREDESCI
- PMID 38934697 verificado (Prince DS, Hepatol Commun 2024)
- Âncora narrativa fecha loop com 01-hook.html
- Plan B: todos estados visíveis com display:block/flex !important

**PENDENTE — CTP interobserver variability:**
- Candidatos: PMID 6546609 (Christensen 1984) ou PMID 16305721 (Cholongitas 2005)
- Atualizar limitation-source em 02b após verificar

## D'Amico slide (s-a1-damico) — REESCRITO (ver acima)
- Terminologia "Estádio" (correto) em todo slide
- PMID fix: 16364498→16298014
- Busy guard no state machine (race condition)
- QA 4 estados via Playwright

**Pendente (próxima sessão):**
1. **Estádio 5 label ERRADO** — diz "Infecção ou AKI", D'Amico 2014 define como "any second decompensating event". Corrigir.
2. **Headline** — verificar se cabe sem quebrar
3. **Referências** — padronizar formato, reduzir font-size
4. **Overlay** — sobreposição de texto reportada
5. **State machine JS** — problemas com clicks (sequência avanço/retrocesso)
6. **Badge vermelho** — revisar tamanho do overlay
7. **Further decomp** — NÃO é estádio 6. É conceito prognóstico (Baveno VII). Ajustar framing.

Ver detalhes em `NOTES.md` (seção 2026-03-04).

---

## Pendências (detalhe)

- ERRO-008 — Case panel redundante em s-hook
- AUDIT — Fixes I2–I10 (AUDIT-VISUAL.md)
- Speaker notes EN → PT
- NNT IC 95%: 4 slides [TBD] (08, 10, 11, 12) — ver tasks/NNT-IC95-REPORT.md
- **21 referências [TBD]** catalogadas em NOTES.md (linha 100-122) — buscar PMIDs
- **Narrativa: novo arco aprovado** — hook DM2 → GBD burden → FIB-4 como pivot
  - Refs GBD prontas: PMIDs 31981519, 41092928, 41092926 (evidence-db.md)
  - Pendente: slide de burden global + slide DM2/screening guidelines (EASL 2024, ADA 2024)
- **Tier classification** adicionado ao topo de evidence-db.md — Tier 1/2/3 com regra
- ✅ **References DB Notion** — propriedades `Leitura` + `Tier` adicionadas; 194 entries classificadas
- ✅ **must-read-trials.md** — 16 trials canon por Bloco (B02–B08, Epi, Etio); commit e69fad8

---

## Offline

`npm run build:cirrose`, `npm run lint:slides`, `npm run preview` — funcionam offline.

---

*03/mar*

---

## Batches de otimização arquitetural — 03/03/2026 (orquestrador Claude.ai)

### Executados

| Batch | Commit | Mudança |
|-------|--------|---------|
| 1 | 7cbe353 | qa-engineer model opus→fast. verifier reescrito. reference-checker escopo honesto. |
| 3 | 527f588 | slide-builder escalação → Lucas (não agents fantasma). |
| 4 | b5c3f8b | Removidas refs fantasma a docs/pipeline/. reference-checker item 4 corrigido. |
| 5 | 9b27c51 | SUBAGENTS docs atualizados. Limpeza untracked. |
| 6 | 71cb825 | Pipeline otimizado: verifier→spot-check, ref-manager+scite+zotero, qa-engineer position. |

### Estado dos agents

| Agent | Model | MCPs | Escopo |
|-------|-------|------|--------|
| slide-builder | opus | playwright | Cria HTML por spec. Escala pra Lucas. |
| qa-engineer | fast | playwright | Lint,a11y,screenshots. Relatório formal. |
| reference-manager | opus | pubmed,crossref,notion,scite,zotero | Valida refs, formata AMA, cadastra Notion. |
| verifier | fast | nenhum | Checa se qa-engineer rodou, build passa, spot-check. |
| reference-checker (Cursor) | fast | nenhum (scan-only) | Extrai PMIDs/DOIs de HTML. |

### Pipeline linear

reference-checker → reference-manager → slide-builder → qa-engineer → verifier

### Conflitos pendentes (resolver quando iniciar conteúdo)
- ~~BAVENO VII: PMID 35431106 vs 35120736~~ **RESOLVIDO** — canon = 35120736 (artigo original)
- ~~Case Antônio: repo=40g/dia, Notion=60g/dia~~ **RESOLVIDO** — canon = 60g/dia em todos os arquivos
