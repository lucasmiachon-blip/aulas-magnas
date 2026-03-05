/**
 * slide-registry.js — Cirrose
 * Centralizes all slide wiring: custom animations, panel states,
 * click-reveal, and interactions.
 *
 * Created: FASE 3 (2026-02-27)
 * Updated: 2026-03-04 — Act 1 state machines (burden, damico, paradigm)
 */

import { panelStates } from './slides/_manifest.js';
import { getCurrentSlide } from '../../shared/js/deck.js';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';

/* ────────────────────────────────────────────
   Shared helper: countUp for inline elements
   ──────────────────────────────────────────── */
function inlineCountUp(gsap, el, target, duration = 1.2, delay = 0) {
  const isDecimal = String(target).includes('.');
  const decimals = isDecimal ? 1 : 0;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration,
    delay,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = decimals > 0
        ? obj.val.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : Math.round(obj.val).toLocaleString('pt-BR');
    },
  });
}

export const customAnimations = {
  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     s-a1-01 — BURDEN (hero → iceberg)
     States: 0=hero, 1=iceberg bars, 2=source
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  's-a1-01': (slide, gsap) => {
    let state = 0;
    const maxState = 2;

    const hero = slide.querySelector('.burden-hero');
    const pulse = slide.querySelector('.burden-pulse');
    const iceberg = slide.querySelector('.burden-iceberg');
    const compFill = slide.querySelector('.burden-bar-fill--comp');
    const decompFill = slide.querySelector('.burden-bar-fill--decomp');
    const compNum = slide.querySelector('[data-countup-target="112"]');
    const decompNum = slide.querySelector('[data-countup-target="10.6"]');
    const trend = slide.querySelector('.burden-trend');
    const sourceTag = slide.querySelector('.source-tag');

    function advance() {
      if (state >= maxState) return false;
      state++;

      if (state === 1) {
        // Hero compresses to top, iceberg appears
        hero.classList.add('burden-hero--compact'); // instant layout, then GSAP slides up
        if (pulse) gsap.to(pulse, { opacity: 0, duration: 0.2, onComplete() { pulse.style.display = 'none'; } });
        gsap.to(hero, {
          y: -60,
          duration: 0.5,
          ease: 'power2.out',
        });

        gsap.to(iceberg, { opacity: 1, duration: 0.4, delay: 0.3 });

        // Bars grow
        gsap.to(compFill, { width: '91%', duration: 1, delay: 0.5, ease: 'power2.out' });
        gsap.to(decompFill, { width: '9%', duration: 1, delay: 0.6, ease: 'power2.out' });

        // CountUp on bar values
        if (compNum) inlineCountUp(gsap, compNum, 112, 1.2, 0.5);
        if (decompNum) inlineCountUp(gsap, decompNum, 10.6, 1.2, 0.6);

        // Trend fadeUp
        gsap.to(trend, { opacity: 1, y: 0, duration: 0.5, delay: 1.2, ease: 'power2.out' });
      }

      if (state === 2) {
        gsap.to(sourceTag, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      }

      return true;
    }

    function retreat() {
      if (state <= 0) return false;

      if (state === 2) {
        gsap.to(sourceTag, { opacity: 0, duration: 0.3 });
      }

      if (state === 1) {
        hero.classList.remove('burden-hero--compact');
        gsap.to(hero, { y: 0, duration: 0.5, ease: 'power2.out' });
        if (pulse) { pulse.style.display = ''; gsap.to(pulse, { opacity: 1, duration: 0.3, delay: 0.3 }); }
        gsap.to(iceberg, { opacity: 0, duration: 0.3 });
        gsap.to(compFill, { width: '0%', duration: 0.3 });
        gsap.to(decompFill, { width: '0%', duration: 0.3 });
        gsap.to(trend, { opacity: 0, duration: 0.3 });
        if (compNum) compNum.textContent = '0';
        if (decompNum) decompNum.textContent = '0';
      }

      state--;
      return true;
    }

    // Initial state
    gsap.set(trend, { y: 12 });

    slide.__hookAdvance = advance;
    slide.__hookRetreat = retreat;
    slide.__hookCurrentBeat = () => state;
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     s-a1-classify — Classificar cedo (4 estados)
     Era 0: gancho Antonio (auto)
     Era 1: dado 83% + CountUp (click)
     Era 2: criterios em stagger (click)
     Era 3: Antonio + PREDESCI pill (click)
     Plan B: todos os estados visiveis via CSS failsafe — retorna cedo
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  's-a1-classify': (slide, gsap) => {
    if (document.body.classList.contains('stage-bad')) return;

    let state = 0;
    const maxState = 3;

    const hero = slide.querySelector('.screening-hero');
    const criteria = slide.querySelector('.screening-criteria');
    const pill = slide.querySelector('.screening-predesci-pill');
    const sourceTag = slide.querySelector('.source-tag');

    // Reset state on every slide entry (inline styles from prev visits override CSS)
    [hero, criteria, pill, sourceTag].forEach(el => {
      if (!el) return;
      el.style.display = 'none';
      el.style.opacity = '';
    });

    function showEl(el, displayVal, animFrom, animTo, onDone) {
      if (!el) return;
      el.style.display = displayVal;
      gsap.fromTo(el, { opacity: 0, ...animFrom }, { opacity: 1, duration: 0.5, ease: 'power2.out', ...animTo, onComplete: onDone });
    }
    function hideEl(el) {
      if (!el) return;
      gsap.to(el, { opacity: 0, duration: 0.3, onComplete: () => { el.style.display = 'none'; } });
    }

    // State 0: gancho narrativo — fadeUp (auto on slidechanged)
    const anchor = slide.querySelector('.screening-anchor');
    if (anchor) {
      gsap.from(anchor, { opacity: 0, y: 16, duration: 0.6, delay: 0.3, ease: 'power2.out' });
    }

    function advance() {
      if (state >= maxState) return false;
      state++;

      if (state === 1) {
        showEl(hero, 'flex', { y: 12 }, { y: 0 });
        const statEl = hero?.querySelector('[data-target]');
        if (statEl) {
          statEl.textContent = '0';
          inlineCountUp(gsap, statEl, parseFloat(statEl.dataset.target), 1.4, 0.3);
        }
      }

      if (state === 2) {
        showEl(criteria, 'flex');
        const items = criteria?.querySelectorAll('.screening-criterion');
        if (items?.length) {
          gsap.from(items, {
            opacity: 0, y: 12, duration: 0.35, stagger: 0.18, delay: 0.15, ease: 'power3.out',
          });
        }
      }

      if (state === 3) {
        showEl(pill, 'inline-block');
        showEl(sourceTag, 'block', {}, { delay: 0.1 });
      }

      return true;
    }

    function retreat() {
      if (state <= 0) return false;

      if (state === 3) { hideEl(pill); hideEl(sourceTag); }
      if (state === 2) hideEl(criteria);
      if (state === 1) {
        hideEl(hero);
        const statEl = hero?.querySelector('[data-target]');
        if (statEl) statEl.textContent = '0';
      }

      state--;
      return true;
    }

    slide.__hookAdvance = advance;
    slide.__hookRetreat = retreat;
    slide.__hookCurrentBeat = () => state;
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     s-a1-damico — Escores Prognósticos (6 eras)
     Era 0: Child 1964 (auto) — boxes stagger
     Era 1: CTP 1973 (click) — boxes + limitations stagger sequencial
     Era 2: MELD 2001 (click) — formula stagger + c-stat CountUp
     Era 3: MELD-Na 2006 (click) — highlight no termo sódio
     Era 4: MELD 3.0 2021 (click) — dual CountUp c-stat
     Era 5: D'Amico (click) — dois datasets, CountUp estágios
     Plan B: todos eras visíveis via CSS failsafe — retorna cedo
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  's-a1-damico': (slide, gsap) => {
    if (document.body.classList.contains('stage-bad')) return;

    let state = 0;
    const maxState = 5;
    let busy = false;

    const eras = slide.querySelectorAll('.scores-era');
    const sourceTag = slide.querySelector('.source-tag');

    // Reset all eras on slide entry (GSAP inline opacity overrides CSS on re-entry)
    eras.forEach((era, i) => gsap.set(era, { opacity: i === 0 ? 1 : 0 }));
    if (sourceTag) gsap.set(sourceTag, { opacity: 0 });

    // Helpers: swap visible era
    function showEra(idx, onComplete) {
      eras.forEach(e => {
        if (parseFloat(getComputedStyle(e).opacity) > 0.01) {
          gsap.to(e, { opacity: 0, duration: 0.3 });
        }
      });
      const target = slide.querySelector(`.scores-era[data-era="${idx}"]`);
      if (!target) { busy = false; return; }
      gsap.to(target, {
        opacity: 1, duration: 0.45, delay: 0.35, ease: 'power2.out',
        onComplete: onComplete || (() => { busy = false; }),
      });
    }

    // Era 0 auto: stagger boxes
    const era0Boxes = slide.querySelectorAll('.scores-era[data-era="0"] .scores-era-box');
    gsap.set(era0Boxes, { opacity: 0, y: 16 });
    gsap.to(era0Boxes, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, delay: 0.3, ease: 'power2.out' });

    // Pre-set limitation elements for era 1 so they start hidden (Plan A/C only)
    const limitations = slide.querySelectorAll('.scores-era[data-era="1"] .limitation');
    gsap.set(limitations, { opacity: 0, x: -16 });

    function runEra1Anims() {
      // CTP boxes stagger
      const ctp = slide.querySelectorAll('.scores-era[data-era="1"] .scores-era-box');
      gsap.set(ctp, { opacity: 0, y: 12 });
      gsap.to(ctp, { opacity: 1, y: 0, duration: 0.35, stagger: 0.1, delay: 0.1, ease: 'power2.out' });
      // CTP classes
      const classes = slide.querySelectorAll('.scores-era[data-era="1"] .ctp-class');
      gsap.set(classes, { opacity: 0 });
      gsap.to(classes, { opacity: 1, duration: 0.3, stagger: 0.12, delay: 0.6, ease: 'power2.out' });
      // Limitations stagger: cada limitação é uma revelação pedagógica separada
      // Justificativa: professor diz "quatro problemas" → lista aparece um a um, sem correr
      gsap.to(limitations, {
        opacity: 1, x: 0, duration: 0.4, stagger: 0.28, delay: 0.9, ease: 'power2.out',
      });
      // Transição narrativa no final
      const transition = slide.querySelector('.scores-transition');
      if (transition) {
        gsap.to(transition, { opacity: 1, duration: 0.4, delay: 0.9 + limitations.length * 0.28 + 0.3 });
      }
    }

    function runEra2Anims() {
      const terms = slide.querySelectorAll('.scores-era[data-era="2"] .formula-term');
      gsap.set(terms, { opacity: 0, y: 10 });
      gsap.to(terms, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15, delay: 0.1, ease: 'power2.out' });
      const cstatEl = slide.querySelector('.scores-era[data-era="2"] .scores-cstat-value');
      if (cstatEl) {
        inlineCountUp(gsap, cstatEl, parseFloat(cstatEl.dataset.target), 1.2, 0.8);
      }
    }

    function runEra3Anims() {
      // Highlight no termo sódio: justificativa = o único termo NOVO no MELD-Na
      const sodiumTerm = slide.querySelector('[data-meldna-sodium]');
      if (sodiumTerm) {
        gsap.fromTo(sodiumTerm,
          { backgroundColor: 'transparent' },
          { backgroundColor: 'var(--ui-accent-light)', color: 'var(--ui-accent)', duration: 0.6, delay: 0.4, ease: 'power2.out' }
        );
      }
    }

    function runEra4Anims() {
      const terms = slide.querySelectorAll('.scores-era[data-era="4"] .formula-term--new');
      gsap.set(terms, { opacity: 0, y: 10 });
      gsap.to(terms, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15, delay: 0.1, ease: 'power2.out' });
      // Dual CountUp: MELD 3.0 vs MELD-Na — comparação visual simultânea
      const cstatEls = slide.querySelectorAll('.scores-era[data-era="4"] .cstat-value');
      cstatEls.forEach((el, i) => {
        const t = parseFloat(el.dataset.target);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: t, duration: 1.2, delay: 0.4 + i * 0.15, ease: 'power2.out',
          onUpdate() {
            el.textContent = obj.val.toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
          },
        });
      });
    }

    function runEra5Anims(preFlipState) {
      const datasets = slide.querySelectorAll('.scores-era[data-era="5"] .damico-dataset');

      function fireCountUps() {
        // CountUp em todos os pathway-value[data-target] da era 5
        const vals = slide.querySelectorAll('.scores-era[data-era="5"] .pathway-value[data-target]');
        vals.forEach((el, i) => {
          inlineCountUp(gsap, el, parseFloat(el.dataset.target), 1, 0.15 + i * 0.08);
        });
        if (sourceTag) gsap.to(sourceTag, { opacity: 1, duration: 0.4, delay: 0.9 });
      }

      if (preFlipState) {
        // Flip.from: datasets animam DE onde estava a fórmula do Era 4 PARA suas posições naturais
        Flip.from(preFlipState, {
          targets: datasets,
          duration: 0.5,
          ease: 'power2.inOut',
          stagger: 0.15,
          onComplete: fireCountUps,
        });
      } else {
        // Fallback: stagger simples (Plan B retorna cedo, este branch é safety net para Plan C sem preFlipState)
        gsap.from(datasets, {
          opacity: 0, y: 20, stagger: 0.15, duration: 0.4, ease: 'power2.out',
          onComplete: fireCountUps,
        });
      }
    }

    function advance() {
      if (busy || state >= maxState) return false;
      state++;
      busy = true;

      const eraAnimMap = [null, runEra1Anims, runEra2Anims, runEra3Anims, runEra4Anims, runEra5Anims];
      const postAnim = eraAnimMap[state];

      // Capture Era 4 formula layout BEFORE showEra fades it out (needed for Flip.from in Era 5)
      // captura pré-fade — crítico para Flip.from: executa sync no mesmo call stack do keydown,
      // antes que slide:changed dispare e inicie qualquer transição CSS.
      let preFlipState = null;
      if (state === 5) {
        const formulaBlock = slide.querySelector('.scores-era[data-era="4"] .scores-formula');
        if (formulaBlock) preFlipState = Flip.getState(formulaBlock);
      }

      showEra(state, () => {
        busy = false;
        if (postAnim) postAnim(preFlipState);
      });

      return true;
    }

    function retreat() {
      if (busy || state <= 0) return false;

      if (state === 5) {
        if (sourceTag) gsap.to(sourceTag, { opacity: 0, duration: 0.2 });
        // Reset pathway values so CountUp re-animates correctly on next advance
        slide.querySelectorAll('.scores-era[data-era="5"] .pathway-value[data-target]')
          .forEach(el => { gsap.killTweensOf(el); el.textContent = '0'; });
      }

      state--;
      busy = true;

      showEra(state, () => { busy = false; });

      return true;
    }

    slide.__hookAdvance = advance;
    slide.__hookRetreat = retreat;
    slide.__hookCurrentBeat = () => state;
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     s-a1-baveno — Paradigma Baveno VII (SplitText dissolve)
     States: 0=auto dissolve, 1=source
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  's-a1-baveno': (slide, gsap) => {
    let state = 0;
    const maxState = 1;

    const oldTerm = slide.querySelector('.paradigm-old');
    const spectrum = slide.querySelector('.paradigm-spectrum');
    const bavRef = slide.querySelector('.paradigm-ref');
    const sourceTag = slide.querySelector('.source-tag');

    let splitInstance = null;

    if (oldTerm && oldTerm.textContent.trim()) {
      splitInstance = new SplitText(oldTerm, { type: 'chars' });

      gsap.set(oldTerm, { opacity: 1 });
      gsap.set(spectrum, { opacity: 0 });
      gsap.set(bavRef, { opacity: 0 });

      // calibrado para --duration-normal 400ms (deck.js transition); era 1.5s com Reveal fade 600ms
      const tl = gsap.timeline({ delay: 1.3 });
      tl.to(splitInstance.chars, {
        opacity: 0, y: -20, rotationX: 90,
        stagger: { each: 0.06, from: 'random' },
        duration: 0.5, ease: 'power2.in',
      });
      tl.set(oldTerm, { display: 'none' });
      tl.to(spectrum, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      tl.to(bavRef, { opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.2');
    } else {
      gsap.set(spectrum, { opacity: 1 });
      gsap.set(bavRef, { opacity: 1 });
    }

    function advance() {
      if (state >= maxState) return false;
      state++;
      if (state === 1) {
        gsap.to(sourceTag, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      }
      return true;
    }

    function retreat() {
      if (state <= 0) return false;
      if (state === 1) {
        gsap.to(sourceTag, { opacity: 0, duration: 0.3 });
      }
      state--;
      return true;
    }

    slide.__hookAdvance = advance;
    slide.__hookRetreat = retreat;
    slide.__hookCurrentBeat = () => state;
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     s-a1-rule5 — Rule-of-5 + Antonio plotado
     States: 0=zones stagger (auto), 1=Antonio highlight, 2=source
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  's-a1-rule5': (slide, gsap) => {
    let state = 0;
    const maxState = 2;

    const zones = slide.querySelectorAll('.rule-zone');
    const antonioPlot = slide.querySelector('.antonio-plot');
    const sourceTag = slide.querySelector('.source-tag');

    // Auto: stagger zones on entry
    gsap.set(zones, { opacity: 0, y: 16 });
    gsap.to(zones, {
      opacity: 1, y: 0,
      duration: 0.4, stagger: 0.12, delay: 0.4,
      ease: 'power3.out',
    });

    function advance() {
      if (state >= maxState) return false;
      state++;

      if (state === 1) {
        const targetZone = slide.querySelector('[data-zone-idx="3"]');
        if (targetZone) targetZone.classList.add('rule-zone--highlighted');
        gsap.to(antonioPlot, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      }

      if (state === 2) {
        gsap.to(sourceTag, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      }

      return true;
    }

    function retreat() {
      if (state <= 0) return false;

      if (state === 2) {
        gsap.to(sourceTag, { opacity: 0, duration: 0.3 });
      }

      if (state === 1) {
        const targetZone = slide.querySelector('[data-zone-idx="3"]');
        if (targetZone) targetZone.classList.remove('rule-zone--highlighted');
        gsap.to(antonioPlot, { opacity: 0, duration: 0.3 });
      }

      state--;
      return true;
    }

    slide.__hookAdvance = advance;
    slide.__hookRetreat = retreat;
    slide.__hookCurrentBeat = () => state;
  },

  's-hook': (slide, gsap) => {
    const beats = slide.querySelectorAll('.hook-beat');
    if (beats.length < 2) return;

    let currentBeat = 0;
    const fib4El = slide.querySelector('[data-target="3.2"]');

    function setBeat(idx) {
      beats.forEach((b, i) => {
        const active = i === idx;
        b.classList.toggle('hook-beat--active', active);
        b.classList.toggle('hook-beat--hidden', !active);
      });
    }

    const initialBeat = parseInt(slide.dataset.initialBeat ?? '0', 10);
    currentBeat = initialBeat;
    setBeat(initialBeat);
    if (initialBeat === 1) {
      const labs = slide.querySelectorAll('.hook-lab');
      const question = slide.querySelector('.hook-question');
      const lead = slide.querySelector('.hook-question-lead');
      const punchline = slide.querySelector('.hook-punchline');
      [...labs, lead, question, punchline].filter(Boolean).forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        if (el.style.transform) el.style.transform = 'translateY(0)';
      });
      if (fib4El) fib4El.textContent = '3,2';
    }

    function resetBeat1Content() {
      const labs = slide.querySelectorAll('.hook-lab');
      const question = slide.querySelector('.hook-question');
      const lead = slide.querySelector('.hook-question-lead');
      const punchline = slide.querySelector('.hook-punchline');
      if (gsap) {
        gsap.set([...labs, lead, question, punchline].filter(Boolean), { opacity: 0, visibility: 'hidden' });
      }
    }

    function runLabsStagger() {
      const labs = slide.querySelectorAll('.hook-lab');
      const question = slide.querySelector('.hook-question');
      const lead = slide.querySelector('.hook-question-lead');
      const punchline = slide.querySelector('.hook-punchline');
      if (gsap) {
        gsap.fromTo(labs,
          { opacity: 0, visibility: 'visible', y: 12 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.12, delay: 0.05, ease: 'power2.out' }
        );
        if (lead) gsap.fromTo(lead, { opacity: 0, visibility: 'visible' }, { opacity: 1, duration: 0.3, delay: 0.5 });
        if (question) gsap.fromTo(question, { opacity: 0, visibility: 'visible', y: 8 }, { opacity: 1, y: 0, duration: 0.4, delay: 0.65, ease: 'power2.out' });
        if (punchline) gsap.fromTo(punchline, { opacity: 0, visibility: 'visible', y: 8 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: 'power2.out' });
      }
      if (fib4El && gsap) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 3.2,
          duration: 1.2,
          delay: 0.2,
          ease: 'power1.out',
          onUpdate() { fib4El.textContent = obj.val.toFixed(1).replace('.', ','); }
        });
      } else if (fib4El) fib4El.textContent = '3,2';
    }

    function advanceBeat() {
      if (currentBeat >= beats.length - 1) return false;
      const prev = beats[currentBeat];
      const next = beats[currentBeat + 1];
      currentBeat++;

      if (gsap) {
        gsap.to(prev, {
          opacity: 0, y: -12, duration: 0.3, ease: 'power2.in',
          onComplete() {
            prev.classList.remove('hook-beat--active');
            prev.classList.add('hook-beat--hidden');
          }
        });
        next.classList.remove('hook-beat--hidden');
        next.classList.add('hook-beat--active');
        gsap.set(next, { opacity: 0 });
        if (currentBeat === 1) {
          resetBeat1Content();
          runLabsStagger();
        }
        gsap.fromTo(next,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.05, ease: 'power2.out' }
        );
      } else {
        prev.classList.remove('hook-beat--active');
        prev.classList.add('hook-beat--hidden');
        next.classList.remove('hook-beat--hidden');
        next.classList.add('hook-beat--active');
        if (currentBeat === 1) runLabsStagger();
      }
      return true;
    }

    function retreatBeat() {
      if (currentBeat <= 0) return false;
      const prev = beats[currentBeat - 1];
      const curr = beats[currentBeat];
      const wasBeat1 = currentBeat === 1;

      if (gsap) {
        gsap.to(curr, {
          opacity: 0, y: 16, duration: 0.3, ease: 'power2.in',
          onComplete() {
            curr.classList.remove('hook-beat--active');
            curr.classList.add('hook-beat--hidden');
            if (wasBeat1) resetBeat1Content();
          }
        });
        prev.classList.remove('hook-beat--hidden');
        prev.classList.add('hook-beat--active');
        gsap.fromTo(prev, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      } else {
        curr.classList.remove('hook-beat--active');
        curr.classList.add('hook-beat--hidden');
        prev.classList.remove('hook-beat--hidden');
        prev.classList.add('hook-beat--active');
      }
      currentBeat--;
      return true;
    }

    slide.__hookAdvance = advanceBeat;
    slide.__hookRetreat = retreatBeat;
    slide.__hookCurrentBeat = () => currentBeat;
  },
};

export { panelStates };

/**
 * Wire all systems: custom anims → case panel → click-reveal → interactions.
 * Deps injected to avoid circular imports and keep registry testable.
 * Reveal removed — uses deck.js events (slide:changed, slide:entered).
 */
export function wireAll(gsap, { anim, CasePanel, ClickReveal }) {
  for (const [id, fn] of Object.entries(customAnimations)) {
    anim.registerCustom(id, fn);
  }

  const panelEl = document.getElementById('case-panel');
  if (panelEl) {
    const panel = new CasePanel(panelEl);
    for (const [id, state] of Object.entries(panelStates)) {
      panel.registerState(id, state);
    }
    panel.connect(document.getElementById('slide-viewport'));
    document.addEventListener('slide:changed', (e) => panel.onSlideChanged(e.detail.currentSlide));
    const currentSlide = getCurrentSlide();
    if (currentSlide) panel.onSlideChanged(currentSlide);
  }

  const revealers = new Map();
  document.querySelectorAll('#slide-viewport > section').forEach((section) => {
    if (section.querySelectorAll('[data-reveal]').length > 0) {
      const revealer = new ClickReveal(section, gsap);
      revealers.set(section.id, revealer);
      // Attach __clickRevealNext to section for deck.js navigate() to call
      section.__clickRevealNext = () => {
        if (revealer.hasMore) { revealer.next(); return true; }
        return false;
      };
    }
  });

  // Reset revealer on slide change (equivalent to Reveal slidechanged)
  document.addEventListener('slide:changed', (e) => {
    const id = e.detail.currentSlide?.id;
    const r = revealers.get(id);
    if (r) r.reset();
  });
}
