/**
 * Case Panel — Persistent sidebar showing patient evolution
 * Appears from HOOK slide onward, transitions between severity states.
 */

export class CasePanel {
  /**
   * @param {HTMLElement} containerEl — the .case-panel element
   * @param {object} gsapRef — GSAP instance
   */
  constructor(containerEl, gsapRef) {
    this.el = containerEl;
    this.gsap = gsapRef;
    this.states = new Map();
    this.currentStateIndex = null;
    this.fieldsEl = this.el.querySelector('.panel-fields');
    this.eventsEl = this.el.querySelector('.panel-events');
    this.visible = false;
  }

  /**
   * Register a patient state at a specific slide index.
   * @param {number} slideIndex
   * @param {object} state — { severity, values, events, showTimeline? }
   */
  registerState(slideIndex, state) {
    this.states.set(slideIndex, state);
  }

  /**
   * Called by Reveal slidechanged event.
   * @param {number} slideIndex — current horizontal slide index
   */
  onSlideChanged(slideIndex) {
    if (slideIndex < 2) {
      this.hide();
      return;
    }

    this.show();
    const applicableIndex = this.findLatestStateIndex(slideIndex);
    if (applicableIndex !== null && applicableIndex !== this.currentStateIndex) {
      this.transitionTo(applicableIndex);
    }
  }

  /**
   * Find the latest registered state at or before slideIndex.
   */
  findLatestStateIndex(slideIndex) {
    let latest = null;
    for (const idx of this.states.keys()) {
      if (idx <= slideIndex && (latest === null || idx > latest)) {
        latest = idx;
      }
    }
    return latest;
  }

  /**
   * Transition to a new state, animating changes.
   */
  transitionTo(stateIndex) {
    const state = this.states.get(stateIndex);
    if (!state) return;

    const prevState = this.currentStateIndex !== null
      ? this.states.get(this.currentStateIndex)
      : null;

    this.currentStateIndex = stateIndex;

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
      stage: 'Estágio'
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
  }

  renderTimeline() {
    if (!this.fieldsEl || !this.eventsEl) return;

    const steps = [
      { color: '#888899', label: 'Apresentação: FIB-4 3,2' },
      { color: '#c4960a', label: 'Elastografia: CSPH' },
      { color: '#c03030', label: 'Descompensação: MELD 28' },
      { color: '#2a8a6a', label: 'Recompensação: abstinente' },
    ];

    this.fieldsEl.innerHTML = '';
    this.eventsEl.innerHTML = '';

    const timeline = document.createElement('div');
    timeline.className = 'panel-timeline';

    steps.forEach(step => {
      const stepEl = document.createElement('div');
      stepEl.className = 'timeline-step';
      stepEl.innerHTML = `
        <span class="timeline-dot" style="background:${step.color}"></span>
        <span class="timeline-label">${step.label}</span>
      `;
      timeline.appendChild(stepEl);
    });

    this.fieldsEl.appendChild(timeline);
  }

  hide() {
    if (!this.visible) return;
    this.visible = false;
    this.el.classList.add('hidden');
  }

  show() {
    if (this.visible) return;
    this.visible = true;
    this.el.classList.remove('hidden');
  }
}
