/**
 * MELD-Na Calculator — Split-layout interactive module
 * 4 inputs (Bil, Cr, INR, Na) + hero score panel + zone chips
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
      <div class="calc-split">
        <div class="calc-inputs-panel">
          <div class="calc-input-card">
            <input type="number" data-field="bil" placeholder="--" step="0.1" min="0.1">
            <span class="calc-input-label">Bilirrubina</span>
          </div>
          <div class="calc-input-card">
            <input type="number" data-field="cr" placeholder="--" step="0.1" min="0.1">
            <span class="calc-input-label">Creatinina</span>
          </div>
          <div class="calc-input-card">
            <input type="number" data-field="inr" placeholder="--" step="0.1" min="0.1">
            <span class="calc-input-label">INR</span>
          </div>
          <div class="calc-input-card">
            <input type="number" data-field="na" placeholder="--" step="1" min="100" max="160">
            <span class="calc-input-label">S\u00f3dio (Na\u207a)</span>
          </div>
        </div>
        <div class="calc-result-panel">
          <span class="calc-score-name">MELD-Na</span>
          <span class="calc-score-value">---</span>
          <span class="calc-action-line"></span>
        </div>
      </div>
      <div class="calc-zones-ref">
        <span class="calc-zone-chip" style="background:var(--safe-light);color:var(--safe)">\u2713 &lt;15</span>
        <span class="calc-zone-chip" style="background:var(--warning-light);color:var(--warning-on-light)">\u26a0 15\u201319</span>
        <span class="calc-zone-chip" style="background:var(--danger-light);color:var(--danger)">\u2717 20\u201324</span>
        <span class="calc-zone-chip" style="background:var(--bg-deep);color:var(--text-on-dark)">\u26a0\u26a0 \u226525</span>
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
    this.container.querySelectorAll('.calc-input-card input').forEach(i => { i.value = ''; });
    const scoreEl = this.container.querySelector('.calc-score-value');
    if (scoreEl) scoreEl.textContent = '---';
    const actionEl = this.container.querySelector('.calc-action-line');
    if (actionEl) actionEl.textContent = '';
    const panel = this.container.querySelector('.calc-result-panel');
    if (panel) delete panel.dataset.zone;
  }

  calculate() {
    const bilEl = this.container.querySelector('[data-field="bil"]');
    const crEl = this.container.querySelector('[data-field="cr"]');
    const inrEl = this.container.querySelector('[data-field="inr"]');
    const naEl = this.container.querySelector('[data-field="na"]');
    if (!bilEl || !crEl || !inrEl || !naEl) return;

    const bil = parseFloat(bilEl.value);
    const cr = parseFloat(crEl.value);
    const inr = parseFloat(inrEl.value);
    const na = parseFloat(naEl.value);

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
    const display = this.container.querySelector('.calc-score-value');
    const actionEl = this.container.querySelector('.calc-action-line');
    const panel = this.container.querySelector('.calc-result-panel');

    if (display) display.textContent = score;

    let zone, icon, text;
    if (score < 15) {
      zone = 'safe';
      icon = '\u2713';
      text = 'Acompanhar ambulatorialmente';
    } else if (score < 20) {
      zone = 'warning';
      icon = '\u26a0';
      text = 'Encaminhar para hepatologista';
    } else if (score < 25) {
      zone = 'danger';
      icon = '\u2717';
      text = 'Planejar transplante';
    } else {
      zone = 'urgent';
      icon = '\u26a0\u26a0';
      text = 'Janela curta \u2014 URG\u00caNCIA';
    }

    if (panel) panel.dataset.zone = zone;
    if (actionEl) actionEl.textContent = `${icon} ${text}`;
  }
}
