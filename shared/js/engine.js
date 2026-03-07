/**
 * Aulas Magnas — Engine v6
 * Declarative animation. Print-safe. Stage-aware.
 * Reveal.js removed — uses deck.js custom events (slide:changed, slide:entered).
 */

import { getCurrentSlide } from './deck.js';

// ============================================
// PRINT-PDF DETECTION
// ============================================
function isPrintPdf() {
  const p = new URLSearchParams(window.location.search);
  return p.has('print-pdf') || p.get('view') === 'print';
}

function isQaMode() {
  return new URLSearchParams(window.location.search).get('qa') === '1';
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
  const decimals = parseInt(el.dataset.decimals, 10);
  const fractionDigits = !isNaN(decimals) ? decimals : (isDecimal ? 1 : 0);
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 1.5,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = fractionDigits > 0
        ? obj.val.toLocaleString('pt-BR', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })
        : Math.round(obj.val).toLocaleString('pt-BR');
    }
  });
}

function animCountUpFinal(el) {
  const raw = (el.dataset.target || '').replace(',', '.');
  const num = parseFloat(raw);
  if (isNaN(num)) return;
  const isDecimal = raw.includes('.');
  const decimals = parseInt(el.dataset.decimals, 10);
  const fractionDigits = !isNaN(decimals) ? decimals : (isDecimal ? 1 : 0);
  el.textContent = fractionDigits > 0
    ? num.toLocaleString('pt-BR', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })
    : Math.round(num).toLocaleString('pt-BR');
}

function animStagger(gsap, el) {
  if (!el.children.length) {
    console.warn('[engine] data-animate="stagger" but element has no children:', el);
    return;
  }
  const delay = parseFloat(el.dataset.stagger || '0.15');
  gsap.to(el.children, {
    y: 0, opacity: 1, duration: 0.5, stagger: delay, ease: 'power3.out'
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
  gsap.to(el, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
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

export function createAnimationDispatcher(gsap) {
  const contexts = new Map();
  let activeTimers = [];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const printing = isPrintPdf();
  const qa = isQaMode();
  const customAnimations = new Map();

  function cleanup(slide) {
    if (!slide) return;
    const ctx = contexts.get(slide);
    if (ctx) { ctx.revert(); contexts.delete(slide); }
    activeTimers.forEach(id => clearInterval(id));
    activeTimers = [];
  }

  function animate(slide, indexh) {
    if (prefersReduced || printing || qa) {
      if ((printing || qa) && slide) {
        forceAnimFinalState(slide);
        if (qa) {
          slide.querySelectorAll('[data-reveal]').forEach(el => {
            el.classList.add('revealed');
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.pointerEvents = 'auto';
          });
        }
      }
      return;
    }
    if (!slide) return;
    const ctx = gsap.context(() => {
      animateSlide(gsap, slide);
      const customFn = customAnimations.get(slide.id);
      if (customFn) customFn(slide, gsap);
    }, slide);
    contexts.set(slide, ctx);
  }

  return {
    connect() {
      let animatedSlide = null;

      // slide:changed — cleanup previous slide (equivalent to Reveal slidechanged)
      document.addEventListener('slide:changed', (e) => {
        cleanup(e.detail.previousSlide);
        animatedSlide = null;

        if (qa) {
          // QA mode: transition='none' equivalent — use rAF
          requestAnimationFrame(() => animate(e.detail.currentSlide, e.detail.indexh));
        }
      });

      if (!qa) {
        // slide:entered — primary trigger after CSS transition (equivalent to Reveal slidetransitionend)
        document.addEventListener('slide:entered', (e) => {
          if (animatedSlide !== e.detail.currentSlide) {
            animate(e.detail.currentSlide, e.detail.indexh);
            animatedSlide = e.detail.currentSlide;
          }
        });
      }

      // Initial slide animation (equivalent to Reveal ready event)
      const initialSlide = getCurrentSlide();
      if (printing) {
        // Force all slides to final state for PDF
        document.querySelectorAll('#slide-viewport > section').forEach(s => forceAnimFinalState(s));
      } else if (!qa && initialSlide) {
        animate(initialSlide, 0);
        animatedSlide = initialSlide;
      }

      if (qa) {
        // QA: force final state + reveal all [data-reveal]
        document.querySelectorAll('#slide-viewport > section').forEach(s => forceAnimFinalState(s));
        document.querySelectorAll('[data-reveal]').forEach(el => {
          el.classList.add('revealed');
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.pointerEvents = 'auto';
        });
      }
    },

    trackTimer(id) { activeTimers.push(id); },

    /** Register custom animation for a specific slide ID */
    registerCustom(slideId, fn) {
      customAnimations.set(slideId, fn);
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

function initHighContrastToggle() {
  // Handled by deck.js keydown (C key)
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
export function initAula(gsap, config = {}) {
  initResidenciaMode();
  // Remove no-js after JS confirmed working.
  // If module imports fail, initAula() never executes → no-js stays
  // → CSS fallback shows all content at opacity:1 (graceful degradation).
  initNoJs();
  initHighContrastToggle();
}
