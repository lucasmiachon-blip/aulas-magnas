---
name: slide-frontend-ux
description: Produz slides médicos tier-1 (EASL/AASLD) com HTML/CSS/GSAP no nível mais alto: assertion-evidence, hierarquia tipográfica, tokens OKLCH, animações com impacto, fill ratio correto, interações bidirecional, contraste WCAG. Ativar ao criar, refatorar ou revisar qualquer slide em aulas/*/slides/. Ver docs/SKILLS.md para boas práticas.
---

# Slide Frontend + UI/UX — Nível Tier-1

Referência de qualidade: EASL 2024, AASLD 2025. Não PowerPoint hospitalar.
Stack: HTML5 · CSS (OKLCH tokens) · GSAP 3.12 + SplitText + Flip · Vanilla JS · Deck.js.

---

## 1. Assertion-Evidence (inviolável)

```
<h2>AFIRMAÇÃO CLÍNICA VERIFICÁVEL — máx 8 palavras</h2>
```

- `<h2>` = o que o slide prova. Nunca rótulo ("Escores Prognósticos"), nunca pergunta retórica.
- Corpo = evidência visual dominante: número hero, pathway, chart, comparação. Não texto.
- Regra dos 30 palavras: contar tudo no corpo excluindo `<aside class="notes">`. Se > 30, cortar.
- Zero `<ul>/<ol>` no corpo. Listas só em `<aside class="notes">`.

**Exemplos corretos:**
- "MELD-Na ≥18 dobra mortalidade em 90 dias"
- "FIB-4 >2,67 mandatoriza elastografia"
- "LSM 21 kPa confirma cACLD e não exclui CSPH"

**Exemplos errados:**
- "Escores Prognósticos" ❌ (rótulo)
- "Onde está o Antônio?" ❌ (pergunta — ok como h3 secundário, nunca h2)
- "4 dados. 1 número. 1 decisão." ❌ (slogan)

---

## 2. Tipografia — hierarquia obrigatória

```css
h1/capa:        font-size: var(--text-display);  font-family: var(--font-display);
h2 assertion:   font-size: var(--text-h2);       font-family: var(--font-display);
body/evidência: font-size: var(--text-body);     font-family: var(--font-body);
source/nota:    font-size: var(--text-small);    font-family: var(--font-body);
hero number:    font-size: var(--text-hero);     font-family: var(--font-display);
```

**Proibido:** `font-size: 24px`, `font-size: 1.5rem`, qualquer valor literal.
**Proibido:** HSL. **Proibido:** HEX em regras de cor (exceção: `data-background-color` do Deck).

---

## 3. Tokens de cor — sistema obrigatório

```css
/* Clínico (NUNCA usar para chrome/decoração) */
--safe / --safe-light / --safe-on-dark
--warning / --warning-light / --warning-on-dark
--danger / --danger-light / --danger-on-dark

/* UI chrome (NUNCA usar para dados clínicos) */
--ui-accent / --ui-accent-light

/* Superfícies */
--bg-surface / --bg-card / --bg-elevated / --bg-deep / --bg-navy

/* Texto */
--text-primary / --text-secondary / --text-muted
--text-on-dark / --text-on-dark-muted
```

Opacidade: `oklch(from var(--warning) l c h / 0.15)` — nunca OKLCH literal.
Novo token → definir em `shared/css/base.css :root`, usar via `var()`.

---

## 4. Layout — fill ratio e alturas

**Fill ratio alvo:** 75–90% do canvas (1280×720px).
- Slide vazio (<65%) = falha de design, não de CSS.
- Slide entupido (>90%) = cortar conteúdo, não reduzir fonte.

**Altura consistente entre slides:**
```css
/* Todos os archetypes devem garantir */
.archetype-* {
  display: grid;
  height: 100%;          /* ocupa o canvas inteiro */
  min-height: 720px;     /* fallback explícito */
  align-content: start;
}
```

**Nunca usar `height: auto` no container raiz de um slide.**

---

## 5. Animações GSAP — storyboard antes de código

Antes de escrever qualquer GSAP, definir o storyboard:
```
Beat 0 (auto):  o que aparece sozinho ao entrar no slide
Beat 1 (click): o que o apresentador revela
Beat 2 (click): segundo reveal (se necessário)
Retreat:        desfaz beat N → beat N-1
```

**Padrões canônicos:**

```javascript
// Entrada stagger (hero number após elementos)
gsap.from(elements, { opacity: 0, y: 16, duration: 0.4, stagger: 0.15, ease: 'power2.out' });

// CountUp (número hero)
const obj = { val: 0 };
gsap.to(obj, { val: TARGET, duration: 1.4, ease: 'power1.out',
  onUpdate() { el.textContent = obj.val.toFixed(2).replace('.', ','); }
});

// Barra crescendo (scaleX)
gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 0.8,
  ease: 'power2.out', transformOrigin: 'left center' });

// Zonas crescendo de baixo (scaleY)
gsap.from(zones, { scaleY: 0, duration: 0.6, stagger: 0.15,
  ease: 'power2.out', transformOrigin: 'bottom center' });

// Bounce (pin, seta, destaque)
gsap.from(pin, { y: -40, duration: 0.6, ease: 'back.out(1.4)' });

// SplitText dissolve
const split = new SplitText(el, { type: 'chars' });
gsap.from(split.chars, { opacity: 0, y: 8, stagger: 0.04, duration: 0.4 });
```

**Failsafe obrigatório:**
```css
/* Todo elemento animado tem opacity:0 em CSS */
.elemento-animado { opacity: 0; }

/* .no-js e .stage-bad forçam visibilidade */
.no-js .elemento-animado,
.stage-bad .elemento-animado { opacity: 1; visibility: visible; }
```

---

## 6. Momento de impacto visual

Todo slide tem exatamente **1 elemento que domina** — o "hero moment":
- Número grande (`var(--text-hero)`) — ex: FIB-4 5,91, MELD 18, HR 0,51
- Pathway visual com gradiente safe→danger
- Threshold line animada
- Pin marker com bounce

**Regra:** o residente deve saber o que olhar em 3 segundos. Se não sabe, o design falhou.

---

## 7. Interações — state machine bidirecional

Toda animação de slide é uma state machine:

```javascript
let state = 0;
const maxState = N;

function advance() {
  if (state >= maxState) return false;
  state++;
  // animar entrada do beat `state`
  return true;
}

function retreat() {
  if (state <= 0) return false;
  // desfazer beat `state`
  state--;
  return true;
}

slide.__hookAdvance = advance;
slide.__hookRetreat = retreat;
slide.__hookCurrentBeat = () => state;
```

**Obrigatório:** retreat sempre desfaz exatamente o que advance fez. Reset ao sair do slide.

---

## 8. Contraste e acessibilidade

- Texto body sobre fundo: ≥ 4.5:1 (WCAG AA). Hero numbers: ≥ 3:1.
- Ícone obrigatório junto a cor semântica: ✓ (safe) · ⚠ (warning) · ✕ (danger).
- Elementos interativos: `aria-label`, `cursor: pointer`, foco visível.
- `@media (prefers-reduced-motion: reduce)` declarado em `shared/css/base.css`.

---

## 9. Checklist de produção (por slide)

Antes de commitar:
- [ ] `<h2>` é afirmação clínica verificável
- [ ] ≤ 30 palavras no corpo
- [ ] Zero `<ul>/<ol>` no corpo
- [ ] `<aside class="notes">` com timing + fonte
- [ ] Zero HEX/OKLCH literal em regras de cor
- [ ] Zero `font-size` em px/rem
- [ ] Fill ratio 65-90% (checar screenshot 1280×720)
- [ ] Failsafe `.no-js` e `.stage-bad` para todo elemento animado
- [ ] `advance()` + `retreat()` testados
- [ ] Dado numérico tem PMID/DOI nas notes

---

## 10. Referências de qualidade

Ver detalhes em:
- `aulas/cirrose/archetypes.css` — 12 archetypes de layout
- `shared/css/base.css` — todos os tokens
- `aulas/cirrose/slide-registry.js` — padrões de animação existentes
- `aulas/cirrose/references/evidence-db.md` — dados clínicos verificados
- `aulas/cirrose/references/CASE.md` — dados canônicos Antônio
