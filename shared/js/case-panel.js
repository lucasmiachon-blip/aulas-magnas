/**
 * Case Panel — Persistent sidebar showing patient evolution
 * Appears from HOOK slide onward, transitions between severity states.
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
    this.fieldsEl = this.el.querySelector('.panel-fields');
    this.eventsEl = this.el.querySelector('.panel-events');
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
   * @param {object} state — { severity, values, events, showTimeline? }
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

    // Update fields
    if (state.values) {
      this.renderFields(state.values, prevState?.values);
    }

    // Update events
    if (state.events) {
      this.renderEvents(state.events);
    }
  }

  renderFields(values, prevValues) {
    if (!this.fieldsEl) return;
    this.fieldsEl.innerHTML = '';

    const fieldLabels = {
      fib4: 'FIB-4',
      lsm: 'LSM',
      plq: 'PLQ',
      meld: 'MELD-Na',
      albumin: 'Albumina',
      stage: 'Estádio'
    };

    for (const [key, val] of Object.entries(values)) {
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
   * No inline HEX — refactored 27/fev/2026.
   */
  renderTimeline() {
    if (!this.fieldsEl || !this.eventsEl) return;

    const steps = [
      { severity: 'neutral', label: 'Apresentação: FIB-4 3,2' },
      { severity: 'caution', label: 'Elastografia: CSPH' },
      { severity: 'danger', label: 'Descompensação: MELD 28' },
      { severity: 'hope', label: 'Recompensação: abstinente' },
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
    this.el.closest('.reveal')?.classList.remove('has-panel');
  }

  show() {
    if (this.visible) return;
    this.visible = true;
    this.el.classList.remove('hidden');
    this.el.closest('.reveal')?.classList.add('has-panel');
  }
}
