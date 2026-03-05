/**
 * Case Panel — Persistent sidebar showing patient evolution + calculators
 * Appears from HOOK slide onward, transitions between severity states.
 * Calc mode: FIB-4 or MELD-Na rendered inline when state.calc is set.
 */

export class CasePanel {
  /**
   * @param {HTMLElement} containerEl — the .case-panel element
   */
  constructor(containerEl) {
    this.el = containerEl;
    this.states = new Map();       // Map<slideId, state>
    this.slideOrder = new Map();   // Map<slideId, domIndex>
    this.firstStatePos = Infinity;
    this.currentStateId = null;
    this.currentCalc = null;       // 'fib4' | 'meld' | null
    this.fieldsEl = this.el.querySelector('.panel-fields');
    this.eventsEl = this.el.querySelector('.panel-events');
    this.calcEl = this.el.querySelector('.panel-calc-area');
    this.visible = false;
  }

  /**
   * Build slide-order map from the DOM. Call once after init.
   * @param {HTMLElement} slidesContainer — the .slides element
   */
  connect(slidesContainer) {
    const sections = slidesContainer.querySelectorAll(':scope > section[id]');
    sections.forEach((sec, i) => this.slideOrder.set(sec.id, i));
    // Compute first registered-state position (hide panel before it)
    this.firstStatePos = Infinity;
    for (const id of this.states.keys()) {
      const pos = this.slideOrder.get(id) ?? Infinity;
      if (pos < this.firstStatePos) this.firstStatePos = pos;
    }
  }

  /**
   * Register a patient state at a specific slide ID.
   * @param {string} slideId — e.g. 's-hook', 's-cp1'
   * @param {object} state — { severity, values, events, showTimeline?, calc? }
   */
  registerState(slideId, state) {
    this.states.set(slideId, state);
  }

  /**
   * Called by Reveal slidechanged event.
   * @param {HTMLElement} slideEl — current slide element
   */
  onSlideChanged(slideEl) {
    const slideId = slideEl?.id;
    const pos = this.slideOrder.get(slideId) ?? -1;
    if (pos < this.firstStatePos) {
      this.hide();
      return;
    }

    this.show();
    const applicable = this.findLatestState(pos);
    if (applicable !== null && applicable !== this.currentStateId) {
      this.transitionTo(applicable);
    }

    // Calc: resolve from the current slide's state (not latest — calc is per-slide)
    const currentState = this.states.get(slideId);
    const calcType = currentState?.calc || null;
    this.updateCalc(calcType);
  }

  /**
   * Find the latest registered state at or before currentPos.
   */
  findLatestState(currentPos) {
    let latestId = null, latestPos = -1;
    for (const id of this.states.keys()) {
      const pos = this.slideOrder.get(id) ?? -1;
      if (pos <= currentPos && pos > latestPos) {
        latestId = id; latestPos = pos;
      }
    }
    return latestId;
  }

  /**
   * Transition to a new state, animating changes.
   */
  transitionTo(stateId) {
    const state = this.states.get(stateId);
    if (!state) return;

    const prevState = this.currentStateId !== null
      ? this.states.get(this.currentStateId)
      : null;

    this.currentStateId = stateId;

    // Update severity
    this.el.setAttribute('data-severity', state.severity || 'neutral');

    // Handle timeline view (CLOSE slide)
    if (state.showTimeline) {
      this.renderTimeline();
      return;
    }

    // Update fields (filter by visibleFields if present)
    if (state.values) {
      this.renderFields(state.values, prevState?.values, state.visibleFields);
    }

    // Update events
    if (state.events) {
      this.renderEvents(state.events);
    }
  }

  // ── Calc Panel ──────────────────────────────────

  updateCalc(type) {
    if (type === this.currentCalc) return;

    if (!type) {
      this.hideCalc();
      return;
    }

    this.currentCalc = type;
    this.el.classList.add('has-calc');
    this.el.closest('#deck')?.classList.add('has-calc-panel');

    if (!this.calcEl) return;
    this.calcEl.classList.add('active');

    if (type === 'fib4') this.renderFib4();
    else if (type === 'meld') this.renderMeld();
  }

  hideCalc() {
    if (!this.currentCalc) return;
    this.currentCalc = null;
    this.el.classList.remove('has-calc');
    this.el.closest('#deck')?.classList.remove('has-calc-panel');
    if (this.calcEl) {
      this.calcEl.classList.remove('active');
      this.calcEl.innerHTML = '';
    }
  }

  renderFib4() {
    if (!this.calcEl) return;
    this.calcEl.innerHTML = `
      <span class="pcalc-title">FIB-4</span>
      <div class="pcalc-inputs">
        <div class="pcalc-field">
          <label class="pcalc-label">Idade</label>
          <input class="pcalc-input" type="number" data-pf="age" placeholder="--" min="18" max="120" step="1">
        </div>
        <div class="pcalc-field">
          <label class="pcalc-label">AST (U/L)</label>
          <input class="pcalc-input" type="number" data-pf="ast" placeholder="--" min="1" step="1">
        </div>
        <div class="pcalc-field">
          <label class="pcalc-label">PLQ (x10\u2079)</label>
          <input class="pcalc-input" type="number" data-pf="plq" placeholder="--" min="1" step="1">
        </div>
        <div class="pcalc-field">
          <label class="pcalc-label">ALT (U/L)</label>
          <input class="pcalc-input" type="number" data-pf="alt" placeholder="--" min="1" step="1">
        </div>
      </div>
      <div class="pcalc-result">
        <span class="pcalc-score">---</span>
        <span class="pcalc-action"></span>
      </div>
      <button class="pcalc-case-btn" data-pcalc-case="fib4">Seu Ant\u00f4nio</button>
    `;
    this.calcEl.querySelectorAll('.pcalc-input').forEach(i =>
      i.addEventListener('input', () => this.calcFib4())
    );
    this.calcEl.querySelector('[data-pcalc-case="fib4"]')
      ?.addEventListener('click', () => this.loadFib4Case());
  }

  loadFib4Case() {
    if (!this.calcEl) return;
    const vals = { age: 54, ast: 68, plq: 112, alt: 45 };
    Object.entries(vals).forEach(([f, v]) => {
      const input = this.calcEl.querySelector(`[data-pf="${f}"]`);
      if (input) input.value = v;
    });
    this.calcFib4();
  }

  calcFib4() {
    if (!this.calcEl) return;
    const get = f => parseFloat(this.calcEl.querySelector(`[data-pf="${f}"]`)?.value);
    const age = get('age'), ast = get('ast'), plq = get('plq'), alt = get('alt');
    if ([age, ast, plq, alt].some(v => isNaN(v) || v <= 0)) return;

    const score = (age * ast) / (plq * Math.sqrt(alt));
    const rounded = Math.round(score * 100) / 100;

    const scoreEl = this.calcEl.querySelector('.pcalc-score');
    const actionEl = this.calcEl.querySelector('.pcalc-action');
    const resultEl = this.calcEl.querySelector('.pcalc-result');
    if (scoreEl) scoreEl.textContent = rounded.toFixed(2).replace('.', ',');

    let zone, text;
    if (score < 1.30) { zone = 'safe'; text = '\u2713 Baixo risco'; }
    else if (score <= 2.67) { zone = 'warning'; text = '\u26a0 Indeterminado'; }
    else { zone = 'danger'; text = '\u2717 Alto risco'; }

    if (resultEl) resultEl.dataset.zone = zone;
    if (actionEl) actionEl.textContent = text;
  }

  renderMeld() {
    if (!this.calcEl) return;
    this.calcEl.innerHTML = `
      <span class="pcalc-title">MELD-Na</span>
      <div class="pcalc-inputs">
        <div class="pcalc-field">
          <label class="pcalc-label">Bilirrubina</label>
          <input class="pcalc-input" type="number" data-pf="bil" placeholder="--" min="0.1" step="0.1">
        </div>
        <div class="pcalc-field">
          <label class="pcalc-label">Creatinina</label>
          <input class="pcalc-input" type="number" data-pf="cr" placeholder="--" min="0.1" step="0.1">
        </div>
        <div class="pcalc-field">
          <label class="pcalc-label">INR</label>
          <input class="pcalc-input" type="number" data-pf="inr" placeholder="--" min="0.1" step="0.1">
        </div>
        <div class="pcalc-field">
          <label class="pcalc-label">S\u00f3dio (Na\u207a)</label>
          <input class="pcalc-input" type="number" data-pf="na" placeholder="--" min="100" max="160" step="1">
        </div>
      </div>
      <div class="pcalc-result">
        <span class="pcalc-score">---</span>
        <span class="pcalc-action"></span>
      </div>
      <button class="pcalc-case-btn" data-pcalc-case="meld">Seu Ant\u00f4nio</button>
    `;
    this.calcEl.querySelectorAll('.pcalc-input').forEach(i =>
      i.addEventListener('input', () => this.calcMeld())
    );
    this.calcEl.querySelector('[data-pcalc-case="meld"]')
      ?.addEventListener('click', () => this.loadMeldCase());
  }

  loadMeldCase() {
    if (!this.calcEl) return;
    const vals = { bil: 1.8, cr: 1.1, inr: 1.3, na: 136 };
    Object.entries(vals).forEach(([f, v]) => {
      const input = this.calcEl.querySelector(`[data-pf="${f}"]`);
      if (input) input.value = v;
    });
    this.calcMeld();
  }

  calcMeld() {
    if (!this.calcEl) return;
    const get = f => parseFloat(this.calcEl.querySelector(`[data-pf="${f}"]`)?.value);
    const bil = get('bil'), cr = get('cr'), inr = get('inr'), na = get('na');
    if ([bil, cr, inr, na].some(isNaN)) return;

    const score = CasePanel.meldNa(bil, cr, inr, na);

    const scoreEl = this.calcEl.querySelector('.pcalc-score');
    const actionEl = this.calcEl.querySelector('.pcalc-action');
    const resultEl = this.calcEl.querySelector('.pcalc-result');
    if (scoreEl) scoreEl.textContent = score;

    let zone, text;
    if (score < 15) { zone = 'safe'; text = '\u2713 Acompanhar'; }
    else if (score < 20) { zone = 'warning'; text = '\u26a0 Encaminhar hepatologista'; }
    else if (score < 25) { zone = 'danger'; text = '\u2717 Planejar transplante'; }
    else { zone = 'urgent'; text = '\u26a0\u26a0 URG\u00caNCIA'; }

    if (resultEl) resultEl.dataset.zone = zone;
    if (actionEl) actionEl.textContent = text;
  }

  /** MELD-Na formula — Cr cap 4, Bil/Cr/INR floor 1, Na clamped 125-137 */
  static meldNa(bil, cr, inr, na) {
    const cBil = Math.max(1, bil);
    const cCr = Math.min(4, Math.max(1, cr));
    const cInr = Math.max(1, inr);

    let meld = 10 * (
      0.957 * Math.log(cCr) +
      0.378 * Math.log(cBil) +
      1.120 * Math.log(cInr) +
      0.643
    );
    meld = Math.max(6, Math.min(40, Math.round(meld)));

    if (meld > 11) {
      const cNa = Math.max(125, Math.min(137, na));
      meld = Math.round(meld + 1.32 * (137 - cNa) - 0.033 * meld * (137 - cNa));
    }
    return Math.max(6, Math.min(40, meld));
  }

  // ── Field/Event rendering ──────────────────────

  /**
   * @param {object} values — key-value pairs for fields
   * @param {object|null} prevValues — previous values (for flash animation)
   * @param {string[]|undefined} visibleFields — if present, only render these keys
   */
  renderFields(values, prevValues, visibleFields) {
    if (!this.fieldsEl) return;
    this.fieldsEl.innerHTML = '';

    const fieldLabels = {
      fib4: 'FIB-4',
      lsm: 'LSM',
      plq: 'PLQ',
      meld: 'MELD-Na',
      albumin: 'Albumina',
      stage: 'Est\u00e1dio'
    };

    for (const [key, val] of Object.entries(values)) {
      if (visibleFields && !visibleFields.includes(key)) continue;
      const label = fieldLabels[key] || key;
      const changed = prevValues && prevValues[key] !== val;
      const fieldEl = document.createElement('div');
      fieldEl.className = 'panel-field';
      fieldEl.innerHTML = `
        <span class="panel-field-label">${label}</span>
        <span class="panel-field-value${changed ? ' changed' : ''}">${val}</span>
      `;
      this.fieldsEl.appendChild(fieldEl);
    }
  }

  renderEvents(events) {
    if (!this.eventsEl) return;
    this.eventsEl.innerHTML = '';

    if (!events.length) return;

    events.forEach(evt => {
      const el = document.createElement('div');
      el.className = 'panel-event';
      el.textContent = evt;
      this.eventsEl.appendChild(el);
    });

    const lastEvent = this.eventsEl.querySelector('.panel-event:last-child');
    if (lastEvent) lastEvent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Renders timeline steps on CLOSE slide.
   * Colors via .timeline-dot[data-severity] in archetypes.css (var(--severity-*-dot)).
   */
  renderTimeline() {
    if (!this.fieldsEl || !this.eventsEl) return;

    const steps = [
      { severity: 'neutral', label: 'Apresenta\u00e7\u00e3o: FIB-4 3,2' },
      { severity: 'caution', label: 'Elastografia: CSPH' },
      { severity: 'danger', label: 'Descompensa\u00e7\u00e3o: MELD 28' },
      { severity: 'hope', label: 'Recompensa\u00e7\u00e3o: abstinente' },
    ];

    this.fieldsEl.innerHTML = '';
    this.eventsEl.innerHTML = '';

    const timeline = document.createElement('div');
    timeline.className = 'panel-timeline';

    steps.forEach(step => {
      const stepEl = document.createElement('div');
      stepEl.className = 'timeline-step';
      const dot = document.createElement('span');
      dot.className = 'timeline-dot';
      dot.dataset.severity = step.severity;
      const label = document.createElement('span');
      label.className = 'timeline-label';
      label.textContent = step.label;
      stepEl.appendChild(dot);
      stepEl.appendChild(label);
      timeline.appendChild(stepEl);
    });

    this.fieldsEl.appendChild(timeline);
  }

  hide() {
    if (!this.visible) return;
    this.visible = false;
    this.el.classList.add('hidden');
    this.el.closest('#deck')?.classList.remove('has-panel');
    this.hideCalc();
  }

  show() {
    if (this.visible) return;
    this.visible = true;
    this.el.classList.remove('hidden');
    this.el.closest('#deck')?.classList.add('has-panel');
  }
}
