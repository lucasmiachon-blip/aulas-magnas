# Insights HTML Cirrose 2026

> Padrões interativos implementados no projeto. Referência para próximas sessões.
> Criado: 2026-03-05 | Sessão: Tudo do HANDOFF

---

## 1. handlePoll — Padrão de Votação em Checkpoints

### Descrição
Poll simples para checkpoints clínicos. Exibe opções simultâneas; ao clicar:
- Opção correta → `.poll-correct` (verde via `var(--safe)`)
- Opção errada → `.poll-wrong` (borda danger)
- Demais opções → `.poll-dim` (opacidade 0.3, `pointer-events: none`)
- `.poll-feedback` aparece com explicação clínica completa

### Implementado em
- `slides/07-cp1.html` — CP1: carvedilol vs EDA vs transplante
- `slides/14-cp2.html` — CP2: HRS-AKI vs albumina isolada vs hemodiálise
- `slides/18-cp3.html` — CP3: vigilância vs alta definitiva vs deslistar

### HTML Pattern

```html
<div class="decision-area poll-area">
  <p class="poll-prompt">Qual conduta você indica agora?</p>
  <button class="poll-btn" data-correct="true">✓ Opção correta</button>
  <button class="poll-btn" data-correct="false">◯ Opção errada A</button>
  <button class="poll-btn" data-correct="false">◯ Opção errada B</button>
  <div class="poll-feedback" hidden>
    <strong>Explicação:</strong> Justificativa clínica com referência.
  </div>
</div>
```

### JS Pattern (inline, sem dependência)

```js
(function () {
  const section = document.getElementById('s-cp1');
  const btns = section.querySelectorAll('.poll-btn');
  const feedback = section.querySelector('.poll-feedback');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => {
        if (b === btn) {
          b.classList.add(b.dataset.correct === 'true' ? 'poll-correct' : 'poll-wrong');
        } else {
          b.classList.add('poll-dim');
        }
        b.disabled = true;
      });
      feedback.hidden = false;
    });
  });
})();
```

### CSS Classes (cirrose.css — seção POLL INTERACTIVITY)
- `.poll-area` — container flex-col
- `.poll-btn` — botão full-width com hover
- `.poll-btn.poll-correct` — bg safe-light, border safe, text safe, bold
- `.poll-btn.poll-wrong` — border danger, text danger
- `.poll-btn.poll-dim` — opacity 0.3, pointer-events none
- `.poll-feedback` — card com border-left accent, texto secondary

### Regras
- Scope sempre via `document.getElementById('s-XXXX')` — nunca `document.querySelectorAll()` global
- `data-correct="true"` em UMA opção apenas por poll
- JS em `<script type="module">` no final da section, antes do `<aside class="notes">`
- Estilos em `cirrose.css`, nunca inline

---

## 2. Baveno VII Checklist — CP3

### Descrição
3 checkboxes no painel esquerdo do CP3 para validar critérios de recompensação.
Ao completar todos: `classList.add('all-checked')` + animação GSAP `back.out(2)`.

### Implementado em
- `slides/18-cp3.html` — seção `.baveno-checklist#baveno-check`

### HTML Pattern

```html
<div class="baveno-checklist" id="baveno-check">
  <p class="baveno-label">Critérios Baveno VII (recompensação)</p>
  <label><input type="checkbox" data-baveno="1"> Sem descompensação ≥ 12 meses</label>
  <label><input type="checkbox" data-baveno="2"> Melhora laboratorial (albumina, bilirrubina, INR)</label>
  <label><input type="checkbox" data-baveno="3"> Causa tratada (SVR + abstinência)</label>
</div>
```

### CSS Classes (cirrose.css — seção BAVENO VII CHECKLIST)
- `.baveno-checklist` — flex-col, gap 8px
- `.baveno-checklist label` — row com checkbox, padding, border, transition
- `.baveno-checklist.all-checked label` — bg safe tint, border safe

### Lógica GSAP
```js
const allChecked = Array.from(checks).every(c => c.checked);
if (allChecked) {
  checklist.classList.add('all-checked');
  if (typeof gsap !== 'undefined') {
    gsap.fromTo(checklist, { scale: 1 }, {
      scale: 1.04, duration: 0.4, ease: 'back.out(2)',
      yoyo: true, repeat: 1
    });
  }
}
```

---

## 3. FIB-4 Calculator — Painel Lateral

### Descrição
Calculadora compacta FIB-4 montada no painel lateral (`#panel-fib4`).
Expansível via toggle. Fórmula: `(Idade × AST) / (PLQ × √ALT)`.

### Cut-offs
- `< 1,30` → Baixo risco (verde)
- `1,30–2,67` → Indeterminado (warning)
- `> 2,67` → Alto risco (danger)

### Arquivos
- `shared/js/interactions/fib4-calc.js` — classe `Fib4Calc`
- `aulas/cirrose/index.template.html` — import + `wireAll` com `Fib4Calc`
- `aulas/cirrose/slide-registry.js` — `new Fib4Calc(document.getElementById('panel-fib4'))`
- `aulas/cirrose/archetypes.css` — `.panel-calc`, `.fib4-*` styles

### Nota de UX
O painel tem 140px de largura. A calculadora é colapsável por padrão (toggle).
Os inputs são stacked (um por linha) com `width: 56px` para caber no painel.

---

## 4. scrollIntoView no Case Panel

### Descrição
Ao atualizar eventos do painel (`renderEvents()`), o último evento é scrollado para view.
Garante visibilidade do evento mais recente sem scroll manual.

### Implementado em
- `shared/js/case-panel.js` — final de `renderEvents()`

### Código
```js
const lastEvent = this.eventsEl.querySelector('.panel-event:last-child');
if (lastEvent) lastEvent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
```

---

## PMIDs Resolvidos nesta sessão (2026-03-05)

| # | Referência | PMID |
|---|-----------|------|
| 1 | Trebicka PREDICT n=1273, J Hepatol 2021 | 33227350 |
| 3 | Mahmud ACG 2025 | [TBD — não indexado ainda] |
| 4 | Northup Ann Surg 2005 | 16041215 |
| 10 | CANONIC — Moreau NEJM 2013 | 23474284 |
| 11 | AASLD ACLF Practice Guidance 2024 (Karvellas, Bajaj) | 37939273 |

### NNTs com IC 95% calculados

| Slide | Trial | NNT | IC 95% | Time frame | Método |
|-------|-------|-----|--------|------------|--------|
| 08 | PREDESCI (PMID 30910320) | 9 | 5–∞ | ~37m | Wald, ARR 10.7% ± 11.2% |
| 10/11 | Sort NEJM 1999 (PMID 10432325) | 5 | 3–17 | Internação | Wald, ARR 19.1% (5.8%–32.3%) |
| 12 | CONFIRM (PMID 33657294) | 7 | 4–20 | 14 dias | Wald, ARR 14.9% (5.1%–24.6%) |

---

## Pendências TBD restantes (baixa prioridade)

Itens 2 (PPI HR 1.75 para PBE — fonte primária), 5 (AGA 2025 Orman PMID), 6 (Kuo 2025 AMR), 7 (Hofer/Reiberger J Hepatol 2026), 8 (Lens CSPH 53%), 9 (EASL HCC 2025), 12–21 — ver `NOTES.md` linhas 100–122.
