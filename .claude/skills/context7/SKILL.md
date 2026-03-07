---
name: context7
description: Injeta documentação atualizada de bibliotecas no contexto. Ativar automaticamente quando o usuário trabalhar com GSAP, Reveal.js, Vite, OKLCH, ou qualquer lib do projeto. Resolve hallucination de APIs desatualizadas. Usar "/context7 [library]" para busca manual.
version: 2.0.0
context: lazy
agent: general-purpose
allowed-tools: Read, WebSearch, WebFetch
argument-hint: "[library name + version?]"
triggers:
  - gsap
  - reveal.js
  - vite
  - oklch
  - postcss
  - data-animate
---

# Context7 — Docs Verificadas (atualizado 2026-03-07)

Referência canônica para GSAP 3.14, Reveal.js 5.1, Vite 6.3.
Verificado via WebSearch + WebFetch por subagent. Substituir se libs atualizarem.

---

## GSAP — versão atual: 3.14.2

Projeto pina 3.12 — **upgrade para 3.14 é seguro**, sem breaking changes na API de tweens.

### Atenção (3.13): registry privado morto
Se `package.json` ou `.npmrc` referenciar `npm.greensock.com` → **remover imediatamente**.
Todos os plugins (SplitText, MorphSVG etc.) agora são gratuitos no npm público.

### Assinaturas core (estáveis desde 3.0, inalteradas em 3.14)
```js
gsap.to(targets, vars)
gsap.from(targets, vars)
gsap.fromTo(targets, fromVars, toVars)
```

**vars mais usados:**
```js
{
  duration: 0.4,          // segundos (default 0.5)
  ease: "power2.out",     // PROIBIDO: bounce, elastic, back (frívolo)
  delay: 0,
  stagger: 0.15,          // ou objeto — ver abaixo
  onComplete: fn,
  overwrite: "auto",
  immediateRender: false,
}
```

**Stagger objeto:**
```js
stagger: {
  each: 0.15,             // ou amount: total_time
  from: "start",          // start|center|edges|end|random|index
  ease: "power2.in",
}
```

⚠ **Quirk (todas as 3.x):** `stagger` no topo é ignorado com `keyframes`. Mover para `defaults`:
```js
gsap.to(els, { defaults: { stagger: 0.15 }, keyframes: [...] })
```

**Novo em 3.13:** animar para CSS variable:
```js
gsap.to(".box", { x: "var(--space-lg)" })  // útil com nossos tokens
```

### Timeline
```js
const tl = gsap.timeline({
  paused: true,
  defaults: { duration: 0.4, ease: "power2.out" },
  onComplete: fn,
})
tl.to(el, vars, positionParam)   // "<" start anterior · ">" end anterior
tl.from(el, vars, positionParam)
tl.set(el, vars, positionParam)
tl.addLabel("name", positionParam)
tl.play() / tl.pause() / tl.reverse() / tl.restart()
tl.seek(timeOrLabel)
tl.revert()   // reverte estado original + mata
```

### gsap.context() — cleanup no slidechanged
```js
let ctx = gsap.context(() => {
  gsap.to(el, { x: 100 })
  return () => { /* cleanup custom */ }
}, containerEl)

// No slidechanged handler:
ctx.revert()   // reverte tudo + cleanup
```

### gsap.matchMedia() — reduced motion
```js
let mm = gsap.matchMedia()
mm.add({
  animate: "(prefers-reduced-motion: no-preference)",
  reduce:  "(prefers-reduced-motion: reduce)"
}, (ctx) => {
  let { animate } = ctx.conditions
  if (animate) gsap.to(el, { y: -20 })
})
```
⚠ Não aninhar `gsap.matchMedia()` dentro de `gsap.context()` — são equivalentes internamente.

### Fix relevante (3.13)
Bug corrigido: `from()` tweens dentro de timeline que não renderizaram não revertiam corretamente.
Afeta `engine.js` cleanup no `slidechanged` → motivo adicional para upgrade 3.12 → 3.14.

---

## Reveal.js — versão atual: 5.1.0

### Reveal.initialize() — opções relevantes
```js
Reveal.initialize({
  // Novo em v5 — ATENÇÃO
  view: "scroll",              // auto-ativa abaixo de 435px viewport
  scrollActivationWidth: null, // null = DESABILITAR (recomendado para congresso)
  jumpToSlide: true,           // v5.1: menu jump; false para desativar

  // Estáveis
  width: 1280, height: 720,    // nosso target
  margin: 0.04,
  controls: false, progress: true,
  hash: true, history: false,
  center: false,               // nosso layout usa align-content:start
  transition: "fade",
  transitionSpeed: "fast",
  backgroundTransition: "fade",

  // PDF
  pdfSeparateFragments: false,
  pdfMaxPagesPerSlide: 1,
  showNotes: "separate-page",

  plugins: [Notes, Highlight],
})
```

⚠ **Novo em v5:** `scrollActivationWidth: 435` ativa scroll-view em viewports < 435px.
Para congresso: adicionar `scrollActivationWidth: null` em `engine.js`.

### Eventos (assinaturas inalteradas v4→v5)
```js
Reveal.on("ready", ({ currentSlide, indexh, indexv }) => { })

// Início da transição → cleanup GSAP aqui
Reveal.on("slidechanged", ({ previousSlide, currentSlide, indexh, indexv }) => {
  ctx.revert()   // cleanup gsap.context do slide anterior
})

// Fim da transição → iniciar animações aqui (slide visível, bounding boxes disponíveis)
Reveal.on("slidetransitionend", ({ currentSlide, indexh, indexv }) => {
  // gsap.to(), tl.play() etc.
})

Reveal.on("fragmentshown", ({ fragment }) => { })
Reveal.on("fragmenthidden", ({ fragment }) => { })
```

### Keyboard bindings
```js
Reveal.addKeyBinding(
  { keyCode: 84, key: "T", description: "Start timer" },
  () => { /* handler */ }
)
Reveal.removeKeyBinding(keyCode)
```

### data-visibility
```html
<!-- USAR para apêndice (remove do DOM, não navegável) -->
<section data-visibility="hidden">...</section>

<!-- NÃO usar para apêndice — só funciona no final do deck -->
<section data-visibility="uncounted">...</section>
```
Regra do projeto: **sempre `hidden`**, nunca `uncounted` para apêndice.

### Breaking changes v4→v5
| Mudança | Ação |
|---------|------|
| `?print-pdf` → `?view=print` | Antigo ainda funciona (backwards-compat) |
| scroll-view auto <435px | `scrollActivationWidth: null` em engine.js |
| `initialize()` não pode ser chamado 2x | Proteção — sem ação |
| iOS usa `100dvh` agora | Monitorar em iPad de congresso |

---

## Vite — versão atual: 6.3.x

### Breaking changes v5→v6 relevantes para este projeto

| Mudança | Impacto | Ação |
|---------|---------|------|
| Sass API moderna como default | Médio se usar SCSS | `css.preprocessorOptions.scss.api: "legacy"` (removido no v7) |
| `postcss-load-config` v4→v6 | **Baixo** — só afeta config TS/YAML | `postcss.config.js` como JS puro → zero ação |
| `commonjsOptions.strictRequires` default `true` | Baixo | Build mais determinístico |
| Glob `{01..03}` não suportado | Baixo | Atualizar padrões glob se usar |

### Config Vite 6 — o que mudou para nós
```js
// vite.config.js
export default defineConfig({
  css: {
    // postcss.config.js como JS puro → sem mudança necessária
    // postcss-oklab-function continua funcionando
    preprocessorOptions: {
      scss: { api: "modern-compiler" }  // se usar SCSS
    }
  },
  build: {
    lib: {
      cssFileName: "style",  // explícito para manter nome estável
    }
  },
  server: { port: 3000 },
  preview: { port: 4173 },
})
```

### postcss-oklab-function — status
✓ **Sem breaking changes.** `postcss.config.js` como JS puro não é afetado pela migração
`postcss-load-config` v4→v6. Plugin continua gerando fallbacks sRGB automaticamente.

---

## Action items para este projeto

| Item | Prioridade | O que fazer |
|------|-----------|-------------|
| `.npmrc` com `npm.greensock.com` | **URGENTE** | Remover se existir |
| GSAP 3.12 → 3.14 | Alta | `npm i gsap@latest` — zero breaking changes |
| `scrollActivationWidth: null` | Média | Adicionar em `engine.js` → `Reveal.initialize()` |
| `from()` revert fix (3.13) | Alta | Resolvido com upgrade GSAP |

---

## Fallback (se docs ficarem desatualizadas)

```
1. Verificar versão atual: cat package.json | grep -E "gsap|reveal|vite"
2. WebSearch: "[lib] [versão] changelog breaking changes"
3. WebFetch: URL oficial de release notes
4. Atualizar esta seção com data
```
