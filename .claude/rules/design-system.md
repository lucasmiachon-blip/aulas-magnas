# Design System — OKLCH + Tokens

> Canônico para tokens, semântica, tipografia, paleta de dados.

---

## Cores OKLCH

### Hues
```css
:root {
  --hue-primary:   258;   /* Navy (ajustado para bater com HEX canônico) */
  --hue-safe:      170;   /* Teal */
  --hue-warning:    85;   /* Amber */
  --hue-danger:     25;   /* Red */
  --hue-downgrade:  55;   /* Ocre */
  --hue-accent:    270;   /* Roxo */
}
```

### Superfícies
```css
:root {
  --bg-surface:  oklch(97% 0.005 258);
  --bg-card:     oklch(99% 0.003 258);
  --bg-elevated: oklch(100% 0 0);
  --bg-deep:     oklch(18% 0 0);        /* ≈ #111111 */
  --bg-navy:     oklch(22% 0.042 258);  /* ≈ #0d1a2d (HEX canônico) */
  --bg-navy-mid: oklch(28% 0.035 258);
}
```

**HEX canônicos** (para `data-background-color`):
```
--bg-navy    = #0d1a2d
--bg-surface = #f5f5f7
--bg-deep    = #111111   (oklch 18% 0 0)   (oklch 18% 0 0)
```

IMPORTANTE: HEX é a verdade. OKLCH é aproximação perceptual. Se divergirem, HEX vence.

### Texto
```css
:root {
  --text-primary:       oklch(13% 0.02 258);
  --text-secondary:     oklch(35% 0.01 258);
  --text-muted:         oklch(48% 0.008 258);
  --text-on-dark:       oklch(95% 0.005 258);
  --text-on-dark-muted: oklch(70% 0.01 258);
}
```

### UI Accent (NÃO clínico — para chrome/progress/tags)
```css
:root {
  --ui-accent:         oklch(35% 0.12 258);
  --ui-accent-light:   oklch(92% 0.03 258);
  --ui-accent-on-dark: oklch(75% 0.14 258);
}
```

**REGRA:** Progress bar, section-tag, checkpoint-badge, pulse-dot → `--ui-accent`.
Cores clínicas (safe/warning/danger) = APENAS conteúdo com significado clínico.

### Cores Semânticas Clínicas

ΔL mínimo ≥ 10% entre safe/warning/danger + reforço com ícone obrigatório.
Downgrade é auxiliar (fora da regra ΔL principal) — sempre reforçado com ícone ↓.

```css
:root {
  /* Safe / Teal — L=40 */
  --safe:         oklch(40% 0.12 170);
  --safe-light:   oklch(92% 0.05 170);
  --safe-on-dark: oklch(75% 0.13 170);

  /* Warning / Amber — L=60 (ΔL 20% vs safe, 10% vs danger) */
  --warning:          oklch(60% 0.13 85);
  --warning-light:    oklch(92% 0.06 85);
  --warning-on-dark:  oklch(80% 0.14 85);
  --warning-on-light: oklch(45% 0.10 85);

  /* Danger / Red — L=50 (ΔL 10% vs safe, 10% vs warning) */
  --danger:          oklch(50% 0.18 25);
  --danger-light:    oklch(92% 0.04 25);
  --danger-on-dark:  oklch(72% 0.16 25);

  /* Downgrade / Ocre — L=30 (auxiliar, sempre com ícone ↓) */
  --downgrade:          oklch(30% 0.08 55);
  --downgrade-light:    oklch(92% 0.04 55);
  --downgrade-on-dark:  oklch(68% 0.10 55);
}
```

### Semântica (CANÔNICA)
```
safe / teal      → seguro, manter conduta
warning / amber  → atenção, investigar
danger / red     → dano clínico, intervir
downgrade / ocre → rebaixamento de evidência
ui-accent / navy → chrome, UI, decoração (NUNCA clínico)
```

### Daltonismo
- ΔL ≥ 10% entre todos os pares semânticos
- Reforço obrigatório: ✓ (safe), ⚠ (warning), ✕ (danger)
- Testar: Chrome → Emulate vision deficiencies → Protanopia

### Paleta de Dados (gráficos — NÃO é semântica clínica)

Para forest plots, meta-análise, comparações:

```css
:root {
  /* Tol High-contrast (2–3 séries) — daltonismo-safe */
  --cmp-1: #004488;  /* blue */
  --cmp-2: #DDAA33;  /* gold */
  --cmp-3: #BB5566;  /* rose */

  /* Tol Bright (4–7 séries) — daltonismo-safe */
  --data-1: #4477AA;
  --data-2: #EE6677;
  --data-3: #228833;
  --data-4: #CCBB44;
  --data-5: #66CCEE;
  --data-6: #AA3377;
  --data-7: #BBBBBB;
}
```

Referência: Paul Tol color schemes (https://personal.sron.nl/~pault/)

### Separadores
```css
:root {
  --border:      oklch(88% 0.005 258);
  --divider:     oklch(92% 0.003 258);
  --border-navy: oklch(30% 0.02 258);
}
```

### Gamut Fallback
```css
@supports not (color: oklch(50% 0.1 258)) {
  :root {
    --safe: #2a8a7a; --warning: #c4922a; --danger: #cc4a3a;
  }
}
```

---

## Tipografia

### Famílias (WOFF2 em shared/assets/fonts/)
```css
:root {
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}
```

**font-display: swap** obrigatório. Ver `shared/assets/fonts/README.md`.

### Escala
```css
:root {
  --text-hero:    clamp(56px, 4.5vw, 86px);
  --text-h1:      clamp(38px, 3.2vw, 62px);
  --text-h2:      clamp(28px, 2.2vw, 42px);
  --text-h3:      clamp(20px, 1.5vw, 30px);
  --text-body:    clamp(18px, 1.12vw, 26px);
  --text-small:   clamp(14px, 0.9vw, 20px);
  --text-caption: clamp(11px, 0.7vw, 15px);
}
```

### Hierarquia

| Nível | Font | Peso | Nota |
|-------|------|------|------|
| Título | --font-display | 400 | Serif grande = autoridade. Plan B: DM Sans 700 |
| Corpo | --font-body | 400 | NUNCA 300 em projetor |
| Detalhe | --font-body | 400 | Tamanho menor, cor --text-muted |
| Dados | --font-body | 400 | tabular-nums lining-nums |

---

## Layout (16:9)

```css
.slide-inner {
  width: 100%; height: 100%;
  padding: 60px 80px;
  display: flex; flex-direction: column; justify-content: center;
  box-sizing: border-box;
}
```

### Spacing / Radius
```css
:root {
  --space-xs: 8px; --space-sm: 16px; --space-md: 24px;
  --space-lg: 40px; --space-xl: 64px; --space-2xl: 96px;
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 20px;
}
```

---

## Contraste WCAG

| Combinação | Meta | Status |
|-----------|------|--------|
| --text-primary em --bg-surface | ≥7:1 | ✓ |
| --text-on-dark em --bg-navy | ≥7:1 | ✓ |
| --text-muted em --bg-surface | ≥4.5:1 | ✓ (L=48 em L=97 ≈ 5.5:1) |
| --ui-accent-on-dark em --bg-navy | ≥4.5:1 | ✓ |

NOTA: ΔL é aproximação para chroma baixo. Cores saturadas: verificar com ferramenta.

---

## Modos

### Plano A (padrão — dark, 1920×1080)
Sala escura, projetor decente. Navy + texto claro + animações.

### Plano B (.stage-bad — light, 1280×720)
Sala clara, projetor fraco. Fundo branco + texto preto + sem animação + fontes mais pesadas.
Ativado via `index.stage-b.html` (entrada separada no Vite).

### Residência (?mode=residencia)
Remove `data-visibility="hidden"` dos apêndices antes do init.

### Alto Contraste (tecla registrada no Reveal)
Toggle `.high-contrast` via `Reveal.addKeyBinding`.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) { ... }
```

---

## Slide de Calibração

Arquivo standalone: `aulas/calibracao.html` (fora de qualquer deck).
Contém dark + light, mostra:
- "Aa 123" em 3 tamanhos (hero, h1, body)
- Faixa de cinzas (5 patches do preto ao branco)
- Patches: navy, surface, ui-accent
- Patches: safe + ✓, warning + ⚠, danger + ✕
- Instrução: "Se texto fraco ou navy lavado → Plano B"
