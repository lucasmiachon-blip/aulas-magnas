/**
 * MELD-Na Calculator — Interactive slide module
 * Renders 4 inputs + score display + semaphore bar
 */

export class MeldCalc {
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
      <div class="meld-inputs">
        <label class="meld-input-group">
          <span class="meld-input-label">Bilirrubina</span>
          <input type="number" class="meld-input" data-field="bil" value="" step="0.1" min="0.1" placeholder="mg/dL">
        </label>
        <label class="meld-input-group">
          <span class="meld-input-label">Creatinina</span>
          <input type="number" class="meld-input" data-field="cr" value="" step="0.1" min="0.1" placeholder="mg/dL">
        </label>
        <label class="meld-input-group">
          <span class="meld-input-label">INR</span>
          <input type="number" class="meld-input" data-field="inr" value="" step="0.1" min="0.1" placeholder="">
        </label>
        <label class="meld-input-group">
          <span class="meld-input-label">Sódio</span>
          <input type="number" class="meld-input" data-field="na" value="" step="1" min="100" max="160" placeholder="mEq/L">
        </label>
      </div>
      <div class="meld-result">
        <div class="meld-score-display">
          <span class="meld-score-label">MELD-Na</span>
          <span class="meld-score-value">\u2014</span>
        </div>
        <div class="meld-bar">
          <div class="meld-bar-fill"></div>
          <div class="meld-bar-zones">
            <span class="meld-zone meld-zone-green" style="width:37.5%">&lt;15 Acompanhar</span>
            <span class="meld-zone meld-zone-yellow" style="width:12.5%">15-19</span>
            <span class="meld-zone meld-zone-red" style="width:12.5%">20-24</span>
            <span class="meld-zone meld-zone-black" style="width:37.5%">\u226525 Urg\u00eancia</span>
          </div>
        </div>
        <div class="meld-action-text"></div>
      </div>
    `;
  }

  bindEvents() {
    this.container.querySelectorAll('.meld-input').forEach(input => {
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
    this.setValues({ bil: 1.8, cr: 1.1, inr: 1.3, na: 136 });
  }

  setValues(vals) {
    Object.entries(vals).forEach(([field, val]) => {
      const input = this.container.querySelector(`[data-field="${field}"]`);
      if (input) input.value = val;
    });
    this.calculate();
  }

  reset() {
    this.container.querySelectorAll('.meld-input').forEach(i => { i.value = ''; });
    const scoreEl = this.container.querySelector('.meld-score-value');
    if (scoreEl) scoreEl.textContent = '\u2014';
    const barFill = this.container.querySelector('.meld-bar-fill');
    if (barFill) barFill.style.width = '0%';
    const actionEl = this.container.querySelector('.meld-action-text');
    if (actionEl) actionEl.textContent = '';
  }

  calculate() {
    const bil = parseFloat(this.container.querySelector('[data-field="bil"]').value);
    const cr = parseFloat(this.container.querySelector('[data-field="cr"]').value);
    const inr = parseFloat(this.container.querySelector('[data-field="inr"]').value);
    const na = parseFloat(this.container.querySelector('[data-field="na"]').value);

    if ([bil, cr, inr, na].some(isNaN)) return;

    const score = this.meldNa(bil, cr, inr, na);
    this.displayResult(score);
  }

  /**
   * MELD-Na formula
   * Cr capped at 4, Bil/Cr/INR floor at 1, Na clamped 125-137
   * Sodium correction only when base MELD > 11
   */
  meldNa(bil, cr, inr, na) {
    const clampedBil = Math.max(1, bil);
    const clampedCr = Math.min(4, Math.max(1, cr));
    const clampedInr = Math.max(1, inr);

    let meld = 10 * (
      0.957 * Math.log(clampedCr) +
      0.378 * Math.log(clampedBil) +
      1.120 * Math.log(clampedInr) +
      0.643
    );

    meld = Math.round(meld);
    meld = Math.max(6, Math.min(40, meld));

    if (meld > 11) {
      const clampedNa = Math.max(125, Math.min(137, na));
      meld = Math.round(
        meld + 1.32 * (137 - clampedNa) - 0.033 * meld * (137 - clampedNa)
      );
    }

    return Math.max(6, Math.min(40, meld));
  }

  displayResult(score) {
    const display = this.container.querySelector('.meld-score-value');
    const bar = this.container.querySelector('.meld-bar-fill');
    const actionText = this.container.querySelector('.meld-action-text');

    if (display) display.textContent = score;
    if (bar) bar.style.width = `${(score / 40) * 100}%`;

    if (score < 15) {
      if (bar) bar.style.background = 'var(--safe, #2a9d8f)';
      if (actionText) {
        actionText.textContent = '\u2713 Acompanhar ambulatorialmente';
        actionText.style.color = 'var(--safe, #2a9d8f)';
      }
    } else if (score < 20) {
      if (bar) bar.style.background = 'var(--warning, #e9a820)';
      if (actionText) {
        actionText.textContent = '\u26a0 Encaminhar para hepatologista';
        actionText.style.color = 'var(--warning-on-light, #c4960a)';
      }
    } else if (score < 25) {
      if (bar) bar.style.background = 'var(--danger, #d64545)';
      if (actionText) {
        actionText.textContent = '\u2717 Planejar transplante';
        actionText.style.color = 'var(--danger, #d64545)';
      }
    } else {
      if (bar) bar.style.background = '#1a1a2e';
      if (actionText) {
        actionText.textContent = '\u2b1b Janela curta \u2014 URG\u00caNCIA';
        actionText.style.color = '#1a1a2e';
      }
    }
  }
}
