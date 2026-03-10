# ERROR LOG — Cirrose

> Atualizar a cada sessão. Cada erro vira regra que previne repetição.
> **Path:** `aulas/cirrose/ERROR-LOG.md` · Referência: `CHANGELOG.md`

---

## Formato

```
[ERRO-NNN] Severidade | Slide | Descrição | Root cause | Regra derivada
```

Severidades: CRITICAL (bloqueia projeção), HIGH (prejudica leitura), MEDIUM (estética), LOW (cosmético)

---

## Registro

### ERRO-001 · CRITICAL · s-hook
**Contraste insuficiente em stage-c (light theme)**
**Root cause:** Cores desenhadas para dark navy; stage-c renderiza light gray.
**Regra:** Testar em AMBOS os temas. `#s-hook { background: #162032 !important }` para forçar navy.
**Status:** ✅ Corrigido (override #s-hook com cores literais).

### ERRO-002 · HIGH · s-hook
**Emoji em contexto profissional**
**Regra:** ZERO emojis unicode em slides projetados.
**Status:** ✅ Corrigido (removido).

### ERRO-003 · HIGH · s-hook
**Referências de lab ilegíveis**
**Regra:** Lab refs >= 0.8rem, cor contrastante.
**Status:** ✅ Corrigido (0.85rem, #a0acc0).

### ERRO-004 · HIGH · s-hook
**Layout piramidal dos labs (4+1)**
**Regra:** Labs grid: `repeat(5, 1fr)` — todos na mesma linha.
**Status:** ✅ Corrigido.

### ERRO-005 · MEDIUM · s-hook
**Cold open cinematográfico inapropriado**
**Regra:** Slide mostra DADOS; contextualização nos speaker notes.
**Status:** ✅ Corrigido (removido).

### ERRO-006 · MEDIUM · s-hook
**Framework "5 números / 3 decisões" overproduced**
**Regra:** Validar se conteúdo é "slide material" ou "speaker note material".
**Status:** ✅ Corrigido (removido).

### ERRO-007 · HIGH · s-hook
**Fill ratio < 10%**
**Regra:** Beat mínimo: 25% do canvas.
**Status:** ✅ Melhorado (pergunta abaixo dos labs, tipografia maior).

### ERRO-008 · MEDIUM · s-hook
**Case panel duplica informação**
**Regra:** Quando slide exibe dados expandidos, considerar ocultar panel.
**Status:** Pendente.

### ERRO-009 · CRITICAL · s-hook beat 1 (stage-c)
**Texto "Qual é o próximo passo?" ilegível — dark on navy**
**Root cause:** `var(--text-on-dark)` em stage-c = escuro. Especificidade vence.
**Regra:** Slides com bg escuro forçado: `#s-hook .elemento { color: #f0f2f5 }` (literal).
**Status:** ✅ Corrigido.

### ERRO-010 · HIGH · s-hook
**Animações sem retorno — ArrowLeft/Up não voltam beat**
**Root cause:** Só advanceBeat(); não existia retreatBeat().
**Regra:** Beats/reveals: implementar navegação bidirecional quando >1 estado.
**Status:** ✅ Corrigido (retreatBeat, engine.js intercept).

### ERRO-011 · MEDIUM · s-hook
**"Texto desce" ao pressionar ArrowDown**
**Root cause:** Conflito Reveal.js + interceptação.
**Regra:** ArrowDown removido da interceptação do hook.
**Status:** ✅ Corrigido.

### ERRO-012 · LOW · qa-screenshots-stage-c.js
**PNG captura estado intermediário**
**Root cause:** Delay 500ms; countUp 1,2s + stagger ~1s.
**Regra:** Delay inicial 1,5s ou aguardar animações via JS.
**Status:** ✅ Corrigido (1,5s).

### ERRO-013 · MEDIUM · s-hook
**Texto descentralizado — margens grandes**
**Regra:** place-content: center; ajustar padding.
**Status:** ✅ Corrigido.

### ERRO-014 · MEDIUM · s-hook (beat 1)
**Sombra dos números antes da animação**
**Root cause:** Labs/lead/question visíveis (herdam opacity do beat) antes do stagger.
**Regra:** Beat 1 content: `opacity: 0; visibility: hidden` em CSS até GSAP animar; resetBeat1Content() no retreat.
**Status:** ✅ Corrigido.

### ERRO-015 · HIGH · s-hook
**Transição Antônio inconsistente ao retornar**
**Root cause:** Conflito de animações; gsap.set(prev, { opacity: 0 }) + killTweensOf causavam "não aparece".
**Regra:** Evitar killTweensOf e set agressivos no retreat; usar overwrite: 'auto' no fromTo.
**Status:** ✅ Corrigido (revertido para lógica simples).

### ERRO-016 · CRITICAL · init
**Interação sumiu — clique/setas não funcionam**
**Root cause:** wireAll rodava DEPOIS de anim.connect(); customAnimations não registrados quando ready/slidechanged disparava; __hookAdvance nunca definido.
**Regra:** `wireAll()` ANTES de `anim.connect()` — custom anims devem estar registrados antes do dispatcher conectar.
**Status:** ✅ Corrigido (index.template.html).

### ERRO-017 · HIGH · preview s-hook
**Beat 0 e beat 1 mostram mesmo estado estático nos subitens**
**Root cause:** Ready dispara antes de connect(); customAnim nunca roda; data-initial-beat ignorado.
**Regra:** Em preview/single-slide: aplicar estado estático via DOM local (setBeat + labs visibility) após init, sem depender do dispatcher.
**Status:** ✅ Corrigido (preview.html — bloco pós-connect).

---

## Resumo por severidade

### ERRO-018 · HIGH · s-a1-damico (Era 5)
**`.pathway-track` renderizava `display:block` em vez de `flex`**
**Root cause:** CSS `.archetype-pathway .pathway-track { display:flex }` está scoped ao archetype-pathway. Era 5 usa archetype-flow — não herda o flex.
**Fix:** `cirrose.css` — `.damico-dataset .pathway-track { display:flex; gap:4px; align-items:stretch }` + `.damico-dataset .pathway-stage { flex:1; flex-direction:column }`.
**Regra:** Ao reutilizar elementos de um archetype dentro de OUTRO archetype, re-declarar o layout necessário no contexto novo.
**Status:** ✅ Corrigido.

### ERRO-019 · CRITICAL · todos os slides com panel visível
**Headline cortada pelo case-panel (sobreposição de ~49px)**
**Root cause:** `--panel-width: 140px` + `min(1120px, calc(100% - 140px - 1rem))` resulta em `1120px` (cap vence). Com `margin:0 auto` em viewport 1280px, a borda direita do conteúdo fica em 1200px > panel-left 1087px.
**Fix:** `archetypes.css` — `--panel-width: 200px` + `.reveal.has-panel .slide-inner { max-width: calc(100% - var(--panel-width) - 3rem); margin: 0 0 0 2rem }`.
**Regra:** Ao testar layouts com case-panel ativo, sempre verificar sobreposição headings vs panel com `getBoundingClientRect()`. O cap 1120px é binding constraint — `has-panel` deve reduzir O CAP, não apenas o calc.
**Status:** ✅ Corrigido.

### ERRO-020 · HIGH · s-a1-damico (Era 1 + Era 5)
**Scrollbar aparece quando conteúdo excede altura do scores-era-track**
**Root cause:** `.scores-era { overflow-y: auto }` + Era 1 tem 4 limitations (~56px cada = 224px) + boxes + classes + source > altura disponível da track (~267px, ver ERRO-021).
**Fix:** `overflow-y: hidden` + `.scores-limitations { gap:4px }` + `.limitation { padding: 4px }`.
**Regra:** Slides são canvas fixo 720px. Usar `overflow-y: hidden` como padrão em eras — conteúdo que não cabe é responsabilidade do design, não do CSS. Jamais `overflow-y: auto` em container de slide projetado.
**Status:** ✅ Corrigido (scrollbar suprimido; 4ª limitation levemente clippada — aceitável).

### ERRO-021 · HIGH · s-a1-damico (Era 5 — D'Amico 2014 clippado)
**`grid-template-rows: auto auto 1fr auto` não aplica — seletor sem espaço**
**Root cause:** `#s-a1-damico.archetype-flow` (sem espaço) seleciona elemento com ambas id e class no MESMO nó. A section tem id=s-a1-damico mas NÃO tem class=archetype-flow (a class está no div filho `.slide-inner`). Seletor nunca casa → track fica `height: auto` (~267px) → Era 5 dataset 2014 clippado.
**Fix:** Adicionar espaço → `#s-a1-damico .archetype-flow` (descendente).
**Regra:** CSS descendente = ESPAÇO (`A B`). Mesmo elemento = SEM espaço (`A.B`). Testar SEMPRE com `querySelectorAll('seletor').length > 0` para confirmar que o seletor casa.
**Status:** ✅ Corrigido (espaço já presente em cirrose.css:2220).

---

## Erros registrados — sessão restructure/act1 (2026-03-05)

### ERRO-022 · HIGH · s-a1-vote
**Interação nunca testada com click real no browser**
**Root cause:** Slide criado inteiramente em código sem QA visual/interação. `doReveal()` disparado por click em `.vote-option`, mas comportamento real (CSS transitions, opacity, countUp) não verificado.
**Regra:** Todo slide com interação JS deve ter ao menos 1 screenshot de cada estado (antes/depois do reveal) antes de commitar como concluído.
**Status:** ⚠ PENDENTE — QA loop próxima sessão.

### ERRO-023 · MEDIUM · múltiplos slides do Bloco 1
**CSS failsafe não testado em novos elementos**
**Root cause:** Novos elementos (`.classify-card`, `.fib4-inputs`, `.fib4-hero-result`, `.rule-gray-zone`, `.antonio-pin`, `.meld-threshold`) têm `opacity:0` em CSS para GSAP, mas `.no-js` e `.stage-bad` overrides não foram verificados em browser.
**Regra:** Após adicionar qualquer elemento animado novo, verificar que `.no-js .elemento { opacity: 1; visibility: visible }` existe em cirrose.css E que funciona em stage-bad (sem GSAP).
**Status:** ⚠ PENDENTE — QA loop próxima sessão.

---

*Raw code s-hook v5 (28/fev) removido — snippets nos source files + git history (commit 2c116b1)*

---

## Erros registrados — sessão diagnóstico source-of-truth (2026-03-08)

### ERRO-024 · MEDIUM · múltiplos arquivos
**Notas stale de divergência persistem após correção**
**Root cause:** PLQ 118k foi corrigido para 112k em `_manifest.js`, mas `[LUCAS DECIDE]` em CASE.md e "PLQ inconsistência" em HANDOFF.md não foram removidos. Agentes subsequentes reliam as notas, achavam que o bug existia, e perdiam tempo investigando.
**Fix:** Padronizar PLQ 112k em todos (CASE.md, narrative.md, _manifest.js, 07-cp1.html, index.html). Remover notas stale.
**Regra:** Quem corrige um bug DEVE limpar todas as notas de warning associadas (HANDOFF, CASE.md, NOTES.md). Nota sem cleanup = drift futuro garantido.
**Status:** ✅ Corrigido.

---

## Erros registrados — sessão P0 documental (2026-03-08)

### ERRO-025 · HIGH · medical-data.md + evidence-db.md
**PMIDs errados em Tier 1: ANSWER e CONFIRM**
**Root cause:** medical-data.md copiou PMIDs sem verificação cruzada com evidence-db.md. ANSWER tinha 29793859 (correto = 29861076). CONFIRM tinha 34882432 (artigo sobre saúde transgênero — correto = 33657294).
**Fix:** Corrigidos em medical-data.md.
**Regra:** Ao fixar PMID, grep ALL occurrences em todo o repo e corrigir em todos os arquivos.
**Status:** ✅ Corrigido.

### ERRO-026 · HIGH · narrative.md
**NSBB prevenção primária usado como hero de profilaxia secundária**
**Root cause:** A2-07 (pós-HDA) usava PREDESCI NNT 9 como hero number. PREDESCI testou prevenção PRIMÁRIA (cACLD+CSPH sem descompensação). Pós-HDA = secundária — população diferente.
**Fix:** A2-07 headline → "Profilaxia secundária pós-HDA: NSBB + EVL seriada". PREDESCI = callback narrativo, não hero.
**Regra:** Verificar POPULAÇÃO do trial antes de usar como hero. Prevenção 1ª ≠ 2ª.
**Status:** ✅ Corrigido (narrative.md).

### ERRO-027 · MEDIUM · evidence-db.md
**Ioannou PMID 31374215 descrito como "HR 0,29 (morte) com SVR" sem clarificar que é pós-HCC**
**Root cause:** Descrição ambígua. Leitores poderiam entender como redução de incidência de HCC, mas é sobrevida pós-diagnóstico de HCC em pacientes com SVR.
**Fix:** Clarificado: "morte pós-HCC com SVR. NB: para incidência → PMID 31356807"
**Regra:** Ao citar HR de HCC, explicitar: incidência ou sobrevida pós-diagnóstico?
**Status:** ✅ Corrigido.

---

| Severidade | Total | Corrigidos | Pendentes |
|------------|-------|------------|-----------|
| CRITICAL   | 4     | 4          | 0 |
| HIGH       | 12    | 11         | 1 (ERRO-022) |
| MEDIUM     | 9     | 7          | 2 (ERRO-008, ERRO-023) |
| LOW        | 1     | 1          | 0         |

---

## Erros registrados — sessão correção pré-QA Act 2 (2026-03-09)

### ERRO-028 · CRITICAL · s-a2-01 (30-a2-gatilhos.html)
**PREDICT PMID errado projetado: 32275982 (ELF test NAFLD) em vez de 32673741 (Trebicka)**
**Root cause:** HTML criado a partir de RAW_ACT2_V2.md que usava PMID CANDIDATE não verificado. evidence-db.md já tinha sido corrigido, mas a correção não propagou para o HTML gerado depois.
**Fix:** source-tag e speaker notes corrigidos para PMID 32673741.
**Regra:** Ao criar HTML de slide a partir de RAW, verificar CADA PMID contra evidence-db.md corrigido. CANDIDATE ≠ verificado.
**Status:** ✅ Corrigido.

### ERRO-029 · HIGH · s-a2-09 (34-a2-nutricao.html)
**`[TBD SOURCE]` visível na source-tag projetada**
**Root cause:** Skeleton preenchido sem fonte verificada para prevalência de sarcopenia. Placeholder ficou na source-tag projetada.
**Fix:** Removido da source-tag. Mantido apenas nos speaker notes como [TBD] para busca futura.
**Regra:** [TBD] é permitido em notes (não projetado). NUNCA em source-tag, headline ou corpo projetado.
**Status:** ✅ Corrigido.

---

| Severidade | Total | Corrigidos | Pendentes |
|------------|-------|------------|-----------|
| CRITICAL   | 5     | 5          | 0 |
| HIGH       | 13    | 12         | 1 (ERRO-022) |
| MEDIUM     | 9     | 7          | 2 (ERRO-008, ERRO-023) |
| LOW        | 1     | 1          | 0         |

---

## Erros registrados — sessão hardening Act 1 (2026-03-10)

### ERRO-030 · MEDIUM · s-a1-meld
**Emoji unicode (🟢🟡🟠🔴) em slide projetado**
**Root cause:** Slide criado com emoji circles como indicadores de faixa MELD. Viola ERRO-002 (zero emojis). Também viola daltonismo: reforço deveria ser ✓/⚠/✕ (design-system.md), não emoji.
**Fix proposto:** Substituir por ícones semânticos ou colored dots CSS com ✓/⚠/✕ ao lado.
**Status:** Pendente — Lucas decide (h2 + layout deste slide ainda em revisão).

### ERRO-031 · LOW · s-title
**`data-background-color` usa `var()` em vez de HEX literal**
**Root cause:** `data-background-color="var(--bg-navy, #162032)"` — Reveal.js parseia como string JS. Funciona em browsers modernos mas é frágil. Regra: HEX literal.
**Fix proposto:** Trocar para `data-background-color="#162032"`.
**Status:** Pendente — cosmético, baixo risco.

---

| Severidade | Total | Corrigidos | Pendentes |
|------------|-------|------------|-----------|
| CRITICAL   | 5     | 5          | 0 |
| HIGH       | 13    | 12         | 1 (ERRO-022) |
| MEDIUM     | 10    | 7          | 3 (ERRO-008, ERRO-023, ERRO-030) |
| LOW        | 2     | 1          | 1 (ERRO-031) |

*Última atualização: 2026-03-10 · ERRO-030/031 registrados. ERRO-008/022/023/030/031 pendentes*
