/**
 * FIB-4 Calculator — Split-layout interactive module
 * Formula: (Idade x AST) / (PLQ x sqrt(ALT))
 * Cut-offs: <1.30 low risk, 1.30-2.67 indeterminate, >2.67 high risk
 * Layout: 2x2 input cards (left) + hero score panel (right)
 */

export class Fib4CalcSlide {
  /**
   * @param {HTMLElement} containerEl — the .interactive-area element
   */
  constructor(containerEl) {
    this.container = containerEl;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-split">
        <div class="calc-inputs-panel">
          <div class="calc-input-card">
            <input type="number" data-field="age" placeholder="--" step="1" min="18" max="120">
            <span class="calc-input-label">Idade</span>
          </div>
          <div class="calc-input-card">
            <input type="number" data-field="ast" placeholder="--" step="1" min="1">
            <span class="calc-input-label">AST (U/L)</span>
          </div>
          <div class="calc-input-card">
            <input type="number" data-field="plq" placeholder="--" step="1" min="1">
            <span class="calc-input-label">PLQ (x10\u2079)</span>
          </div>
          <div class="calc-input-card">
            <input type="number" data-field="alt" placeholder="--" step="1" min="1">
            <span class="calc-input-label">ALT (U/L)</span>
          </div>
        </div>
        <div class="calc-result-panel">
          <span class="calc-score-name">FIB-4</span>
          <span class="calc-score-value">---</span>
          <span class="calc-action-line"></span>
        </div>
      </div>
      <div class="calc-zones-ref">
        <span class="calc-zone-chip" style="background:var(--safe-light);color:var(--safe)">\u2713 &lt;1,30</span>
        <span class="calc-zone-chip" style="background:var(--warning-light);color:var(--warning-on-light)">\u26a0 1,30\u20132,67</span>
        <span class="calc-zone-chip" style="background:var(--danger-light);color:var(--danger)">\u2717 &gt;2,67</span>
      </div>`;
  }

  bindEvents() {
    this.container.querySelectorAll('.calc-input-card input').forEach(input => {
      input.addEventListener('input', () => this.calculate());
    });

    const slideInner = this.container.closest('.slide-inner');
    if (slideInner) {
      const loadBtn = slideInner.querySelector('[data-action="load-case"]');
      if (loadBtn) loadBtn.addEventListener('click', () => this.loadCase());

      const resetBtn = slideInner.querySelector('[data-action="reset"]');
      if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
    }
  }

  loadCase() {
    this.setValues({ age: 54, ast: 68, plq: 112, alt: 45 });
  }

  setValues(vals) {
    Object.entries(vals).forEach(([field, val]) => {
      const input = this.container.querySelector(`[data-field="${field}"]`);
      if (input) input.value = val;
    });
    this.calculate();
  }

  reset() {
    this.container.querySelectorAll('.calc-input-card input').forEach(i => { i.value = ''; });
    const scoreEl = this.container.querySelector('.calc-score-value');
    if (scoreEl) scoreEl.textContent = '---';
    const actionEl = this.container.querySelector('.calc-action-line');
    if (actionEl) actionEl.textContent = '';
    const panel = this.container.querySelector('.calc-result-panel');
    if (panel) delete panel.dataset.zone;
  }

  calculate() {
    const get = f => parseFloat(this.container.querySelector(`[data-field="${f}"]`)?.value);
    const age = get('age'), ast = get('ast'), plq = get('plq'), alt = get('alt');

    if ([age, ast, plq, alt].some(v => isNaN(v) || v <= 0)) return;

    const score = (age * ast) / (plq * Math.sqrt(alt));
    this.displayResult(score);
  }

  displayResult(score) {
    const rounded = Math.round(score * 100) / 100;
    const display = this.container.querySelector('.calc-score-value');
    const actionEl = this.container.querySelector('.calc-action-line');
    const panel = this.container.querySelector('.calc-result-panel');

    if (display) display.textContent = rounded.toFixed(2).replace('.', ',');

    let zone, icon, text;
    if (score < 1.30) {
      zone = 'safe';
      icon = '\u2713';
      text = 'Baixo risco \u2014 manter na APS';
    } else if (score <= 2.67) {
      zone = 'warning';
      icon = '\u26a0';
      text = 'Indeterminado \u2014 solicitar elastografia';
    } else {
      zone = 'danger';
      icon = '\u2717';
      text = 'Alto risco \u2014 encaminhar hepatologista';
    }

    if (panel) panel.dataset.zone = zone;
    if (actionEl) actionEl.textContent = `${icon} ${text}`;
  }
}
