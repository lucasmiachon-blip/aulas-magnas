/**
 * Aulas Magnas — Engine v5
 * Declarative animation. Print-safe. Stage-aware.
 */

// ============================================
// PRINT-PDF DETECTION
// ============================================
function isPrintPdf() {
  const p = new URLSearchParams(window.location.search);
  return p.has('print-pdf') || p.get('view') === 'print';
}

// ============================================
// REVEAL INIT
// ============================================
export function initReveal(Reveal, config = {}) {
  return Reveal.initialize({
    hash: true,
    transition: 'fade',
    transitionSpeed: 'default',
    slideNumber: 'c/t',
    controls: true,
    progress: true,
    center: false,
    width: 1920,
    height: 1080,
    margin: 0,
    minScale: 0.1,
    maxScale: 2.0,
    backgroundTransition: 'fade',
    pdfSeparateFragments: false,
    pdfMaxPagesPerSlide: 1,
    showNotes: isPrintPdf() ? 'separate-page' : false,
    ...config,
  });
}

// ============================================
// ANIMATION PRIMITIVES
// ============================================

function animCountUp(gsap, el) {
  const raw = (el.dataset.target || '').replace(',', '.');
  const target = parseFloat(raw);
  if (isNaN(target)) {
    console.warn('[engine] data-animate="countUp" missing/invalid data-target on', el);
    return;
  }
  const isDecimal = raw.includes('.');
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 1.5,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = isDecimal
        ? obj.val.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
        : Math.round(obj.val).toLocaleString('pt-BR');
    }
  });
}

function animCountUpFinal(el) {
  const raw = (el.dataset.target || '').replace(',', '.');
  const num = parseFloat(raw);
  if (isNaN(num)) return;
  el.textContent = raw.includes('.')
    ? num.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    : Math.round(num).toLocaleString('pt-BR');
}

function animStagger(gsap, el) {
  if (!el.children.length) {
    console.warn('[engine] data-animate="stagger" but element has no children:', el);
    return;
  }
  const delay = parseFloat(el.dataset.stagger || '0.15');
  gsap.from(el.children, {
    y: 30, opacity: 0, duration: 0.5, stagger: delay, ease: 'power3.out'
  });
}

function animDrawPath(gsap, el) {
  const paths = el.tagName === 'path' ? [el]
    : el.querySelectorAll('path, line, polyline');
  if (!paths.length) {
    console.warn('[engine] data-animate="drawPath" but no path/line/polyline found in:', el);
    return;
  }
  paths.forEach(p => {
    if (typeof p.getTotalLength === 'function') {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(p, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' });
    }
  });
}

function animFadeUp(gsap, el) {
  gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' });
}

function animHighlight(gsap, el) {
  const targetRow = parseInt(el.dataset.highlightRow, 10);
  if (isNaN(targetRow)) {
    console.warn('[engine] data-animate="highlight" missing data-highlight-row on:', el);
    return;
  }
  const tbody = el.querySelector('tbody');
  const rows = tbody ? tbody.querySelectorAll('tr') : el.querySelectorAll('tr');
  rows.forEach((row, i) => {
    if (i + 1 === targetRow) {
      gsap.to(row, { scale: 1.02, opacity: 1, duration: 0.6, ease: 'power2.out' });
    } else {
      gsap.to(row, { opacity: 0.35, duration: 0.4, ease: 'power2.out' });
    }
  });
}

const ANIM_MAP = {
  countUp: animCountUp,
  stagger: animStagger,
  drawPath: animDrawPath,
  fadeUp: animFadeUp,
  highlight: animHighlight,
};

// ============================================
// PRINT-PDF: force final state (no animation)
// ============================================
function forceAnimFinalState(slide) {
  slide.querySelectorAll('[data-animate]').forEach(el => {
    const type = el.dataset.animate;
    el.style.opacity = '1';
    el.style.transform = 'none';

    if (type === 'countUp') animCountUpFinal(el);

    if (type === 'stagger') {
      Array.from(el.children).forEach(c => {
        c.style.opacity = '1'; c.style.transform = 'none';
      });
    }

    if (type === 'highlight') {
      const targetRow = parseInt(el.dataset.highlightRow, 10);
      const tbody = el.querySelector('tbody');
      const rows = tbody ? tbody.querySelectorAll('tr') : el.querySelectorAll('tr');
      rows.forEach((row, i) => {
        row.style.opacity = (i + 1 === targetRow) ? '1' : '0.35';
        row.style.transform = (i + 1 === targetRow) ? 'scale(1.02)' : 'none';
      });
    }

    if (type === 'drawPath') {
      el.querySelectorAll('path, line, polyline').forEach(p => {
        p.style.strokeDashoffset = '0';
      });
    }
  });
}

// ============================================
// DECLARATIVE DISPATCHER
// ============================================
function animateSlide(gsap, slide) {
  slide.querySelectorAll('[data-animate]').forEach(el => {
    const type = el.dataset.animate;
    const fn = ANIM_MAP[type];
    if (fn) {
      fn(gsap, el);
    } else {
      console.warn(`[engine] Unknown data-animate type: "${type}" on`, el);
    }
  });
}

export function createAnimationDispatcher(Reveal, gsap) {
  const contexts = new Map();
  let activeTimers = [];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const printing = isPrintPdf();
  const customAnimations = new Map();

  function cleanup(slide) {
    if (!slide) return;
    const ctx = contexts.get(slide);
    if (ctx) { ctx.revert(); contexts.delete(slide); }
    activeTimers.forEach(id => clearInterval(id));
    activeTimers = [];
  }

  function animate(slide, indexh) {
    if (prefersReduced || printing) {
      if (printing && slide) forceAnimFinalState(slide);
      return;
    }
    if (!slide) return;
    const ctx = gsap.context(() => {
      animateSlide(gsap, slide);
      const customFn = customAnimations.get(indexh);
      if (customFn) customFn(slide, gsap);
    }, slide);
    contexts.set(slide, ctx);
  }

  return {
    connect() {
      Reveal.on('slidechanged', (e) => cleanup(e.previousSlide));
      Reveal.on('slidetransitionend', (e) => animate(e.currentSlide, e.indexh));
      Reveal.on('ready', (e) => {
        if (printing) {
          // Force all slides to final state for PDF
          document.querySelectorAll('.slides section').forEach(s => forceAnimFinalState(s));
        } else {
          animate(Reveal.getCurrentSlide(), e.indexh);
        }
      });
    },

    trackTimer(id) { activeTimers.push(id); },

    /** Register custom animation for a specific slide index */
    registerCustom(slideIndex, fn) {
      customAnimations.set(slideIndex, fn);
    }
  };
}

// ============================================
// CHECKPOINT TIMER
// ============================================
/**
 * SVG ring countdown timer.
 * IMPORTANT: Always wrap with dispatcher.trackTimer() to prevent leaks
 * on rapid slide navigation:
 *   dispatcher.trackTimer(startCheckpointTimer(60, ringEl, textEl));
 */
export function startCheckpointTimer(seconds, ringEl, textEl) {
  const circ = 2 * Math.PI * 20;
  ringEl.style.strokeDasharray = String(circ);
  ringEl.style.strokeDashoffset = '0';
  let rem = seconds;
  const interval = setInterval(() => {
    rem--;
    if (textEl) textEl.textContent = String(rem);
    ringEl.style.strokeDashoffset = String(circ * (1 - rem / seconds));
    if (rem <= 0) clearInterval(interval);
  }, 1000);
  return interval;
}

// ============================================
// MODES
// ============================================

function initHighContrastToggle(Reveal) {
  // Use Reveal.addKeyBinding to avoid conflicting with overlay close
  Reveal.addKeyBinding(
    { keyCode: 67, key: 'C', description: 'Toggle alto contraste' },
    () => { document.documentElement.classList.toggle('high-contrast'); }
  );
}

function initResidenciaMode() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('mode') === 'residencia') {
    document.querySelectorAll('.appendix[data-visibility="hidden"]').forEach(s => {
      s.removeAttribute('data-visibility');
    });
    document.documentElement.classList.add('mode-residencia');
  }
}

function initNoJs() {
  document.documentElement.classList.remove('no-js');
}

// ============================================
// INIT
// ============================================
export async function initAula(Reveal, gsap, config = {}) {
  initNoJs();
  initResidenciaMode();
  const deck = await initReveal(Reveal, config);
  initHighContrastToggle(Reveal); // Must be after init
  return deck;
}
