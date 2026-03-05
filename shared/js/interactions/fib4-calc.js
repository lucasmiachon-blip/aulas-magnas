/**
 * FIB-4 Calculator — Compact panel sidebar module
 * Formula: (Idade × AST) / (PLQ × √ALT)
 * Cut-offs: <1.30 low risk, 1.30–2.67 indeterminate, >2.67 high risk
 */

export class Fib4Calc {
  /**
   * @param {HTMLElement} containerEl — the .panel-calc element
   */
  constructor(containerEl) {
    this.container = containerEl;
    this.expanded = false;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <button class="fib4-toggle" aria-expanded="false">
        FIB-4 <span class="fib4-arrow">▸</span>
      </button>
      <div class="fib4-body" hidden>
        <div class="fib4-inputs">
          <label class="fib4-row">
            <span>Idade</span>
            <input type="number" class="fib4-input" data-f="age" placeholder="anos" min="1" max="120">
          </label>
          <label class="fib4-row">
            <span>AST</span>
            <input type="number" class="fib4-input" data-f="ast" placeholder="U/L" min="1">
          </label>
          <label class="fib4-row">
            <span>PLQ</span>
            <input type="number" class="fib4-input" data-f="plq" placeholder="×10⁹/L" min="1">
          </label>
          <label class="fib4-row">
            <span>ALT</span>
            <input type="number" class="fib4-input" data-f="alt" placeholder="U/L" min="1">
          </label>
        </div>
        <div class="fib4-result">
          <span class="fib4-label">FIB-4</span>
          <span class="fib4-score">—</span>
        </div>
        <div class="fib4-interp"></div>
      </div>
    `;
  }

  bindEvents() {
    const toggle = this.container.querySelector('.fib4-toggle');
    const body = this.container.querySelector('.fib4-body');
    const arrow = this.container.querySelector('.fib4-arrow');

    toggle.addEventListener('click', () => {
      this.expanded = !this.expanded;
      body.hidden = !this.expanded;
      toggle.setAttribute('aria-expanded', String(this.expanded));
      arrow.textContent = this.expanded ? '▾' : '▸';
    });

    this.container.querySelectorAll('.fib4-input').forEach(input => {
      input.addEventListener('input', () => this.calculate());
    });
  }

  calculate() {
    const get = f => parseFloat(this.container.querySelector(`[data-f="${f}"]`)?.value);
    const age = get('age'), ast = get('ast'), plq = get('plq'), alt = get('alt');

    if ([age, ast, plq, alt].some(v => isNaN(v) || v <= 0)) return;

    const score = (age * ast) / (plq * Math.sqrt(alt));
    const rounded = Math.round(score * 100) / 100;

    const scoreEl = this.container.querySelector('.fib4-score');
    const interpEl = this.container.querySelector('.fib4-interp');
    if (scoreEl) scoreEl.textContent = rounded.toFixed(2).replace('.', ',');

    if (interpEl) {
      if (score < 1.30) {
        interpEl.textContent = '✓ Baixo risco';
        interpEl.style.color = 'var(--safe)';
      } else if (score <= 2.67) {
        interpEl.textContent = '⚠ Indeterminado';
        interpEl.style.color = 'var(--warning-on-light)';
      } else {
        interpEl.textContent = '✕ Alto risco';
        interpEl.style.color = 'var(--danger)';
      }
    }
  }
}
