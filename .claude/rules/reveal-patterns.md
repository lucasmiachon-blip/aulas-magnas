# Reveal.js + GSAP Patterns

> Canônico para: speaker notes, fragments, checkpoints, PDF export, data-animate.
> Código vive em `shared/js/engine.js`.

---

## Import (npm/ESM — Zero CDN)

```js
import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';
import 'reveal.js/dist/reveal.css';
```

---

## Estrutura de Slide

```html
<section data-background-color="#0d1a2d">
  <div class="slide-inner slide-navy">
    <h2>Carvedilol reduz HVPG em 20% vs placebo</h2>
    <div class="evidence" data-animate="stagger">
      <!-- evidência visual aqui -->
    </div>
  </div>
  <aside class="notes">
    [0:00-0:30] Hook.
    PAUSA 3s.
    [DATA] Fonte: EASL 2024 | Verificado: 2026-02-13
  </aside>
</section>
```

### Regras
- `<h2>` = asserção (NUNCA rótulo genérico)
- `<aside class="notes">` obrigatório em TODO `<section>`
- NUNCA inline style com `display`/`visibility`/`opacity` no `<section>` (E07)
- Background: HEX literal em `data-background-color` (Reveal parseia JS-side)
- `.slide-navy` no `.slide-inner` quando bg escuro

---

## Animação Declarativa (data-animate)

**NUNCA gsap.to() inline em slide.** Usar atributos declarativos:

```html
<!-- Engine detecta e orquestra via slidetransitionend -->
<span class="hero-number" data-animate="countUp" data-target="25">0</span>
<div class="cards" data-animate="stagger">...</div>
<svg><path data-animate="drawPath" d="M0,0 L100,50"/></svg>
<div data-animate="fadeUp">...</div>
```

### Tipos disponíveis
| `data-animate` | Efeito | Atributos extras |
|----------------|--------|-----------------|
| `countUp` | Número animado | `data-target="25"` |
| `stagger` | Filhos entram sequenciais | `data-stagger="0.15"` (opcional) |
| `drawPath` | SVG stroke progressivo | — |
| `fadeUp` | Fade + translate Y | — |

### Von Restorff Pattern (destaque seletivo)
```html
<!-- Tabela GRADE: toda desaturada, GSAP destaca a linha-alvo -->
<table class="tufte" data-animate="highlight" data-highlight-row="3">
  ...
</table>
```

Engine: no slidetransitionend, aplica opacidade 0.4 em todas as linhas exceto a alvo, que recebe scale 1.02 + cor semântica.

---

## Apêndice (modo residência)

```html
<section class="appendix" data-visibility="hidden">
  <!-- hidden = removido do DOM em congress -->
  <!-- ?mode=residencia remove o atributo ANTES do init -->
</section>
```

**IMPORTANT:** `hidden` (não `uncounted`).
- `hidden` → remove do DOM, não navegável
- `uncounted` → ainda navegável, só não conta (e só funciona no fim do deck)

---

## Fragments

Apenas quando guia atenção na ordem da fala.

```html
<p class="fragment fade-up">Primeiro</p>
<p class="fragment fade-up">Segundo</p>
```

Degradação graciosa: `.no-js .fragment { opacity: 1 }`.

---

## Eventos e Cleanup

| Evento | Quando | Usar para |
|--------|--------|-----------|
| `slidechanged` | Início da transição | Cleanup: `ctx.revert()`, clear timers |
| `slidetransitionend` | Fim da transição | Iniciar animações |
| `ready` | Deck carregou | Animar slide inicial |

### viewDistance Warning
Reveal.js recicla DOM de slides distantes (`viewDistance` config). GSAP não pode calcular bounding box de elemento com `display:none`. Por isso: animações só no `slidetransitionend` (slide já visível).

---

## Speaker Notes — Formato Canônico

```html
<aside class="notes">
  [0:00-0:30] Hook — número de impacto.
  PAUSA 3s — deixar absorver.
  PERGUNTAR: "Quantos já viram isso?"
  ÊNFASE: "Este dado muda a conduta."
  [DATA] Fonte: EASL 2024, Tab.3 | Verificado: 2026-02-13
</aside>
```

---

## PDF Export

Config em engine.js:
```js
pdfSeparateFragments: false,
pdfMaxPagesPerSlide: 1,
showNotes: 'separate-page',
```

Workflow: `npm run build && npm run preview` → abrir `?print-pdf` → Chrome Ctrl+P → Landscape, sem margens, background ON.

**IMPORTANT:** Em modo print-pdf, engine desabilita animações e força estado final.
