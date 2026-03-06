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
    const badge = slide.querySelector('.burden-badge');
    const asymmetry = slide.querySelector('.burden-asymmetry');
    const sourceTag = slide.querySelector('.source-tag');

    function advance() {
      if (state >= maxState) return false;
      state++;

      if (state === 1) {
        hero.classList.add('burden-hero--compact');
        if (pulse) gsap.to(pulse, { opacity: 0, duration: 0.2, onComplete() { pulse.style.display = 'none'; } });
        gsap.to(hero, { y: -60, duration: 0.5, ease: 'power2.out' });
        gsap.to(iceberg, { opacity: 1, duration: 0.4, delay: 0.3 });

        gsap.to(compFill, { width: '100%', duration: 0.8, delay: 0.5, ease: 'power2.out' });
        if (compNum) inlineCountUp(gsap, compNum, 112, 1.0, 0.5);

        gsap.to(decompFill, { scaleX: 1, duration: 1.0, delay: 1.0, ease: 'power2.out' });
        if (decompNum) inlineCountUp(gsap, decompNum, 10.6, 1.0, 1.0);

        if (badge) gsap.to(badge, { opacity: 1, y: 0, duration: 0.5, delay: 1.8, ease: 'power2.out' });
        if (asymmetry) gsap.to(asymmetry, { opacity: 1, y: 0, duration: 0.6, delay: 2.2, ease: 'power2.out' });
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
        gsap.to(decompFill, { scaleX: 0, duration: 0.3 });
        if (badge) gsap.to(badge, { opacity: 0, duration: 0.3 });
        if (asymmetry) gsap.to(asymmetry, { opacity: 0, duration: 0.3 });
        if (compNum) compNum.textContent = '0';
        if (decompNum) decompNum.textContent = '0';
      }

      state--;
      return true;
    }

    gsap.set([badge, asymmetry].filter(Boolean), { y: 12 });

    slide.__hookAdvance = advance;
    slide.__hookRetreat = retreat;
    slide.__hookCurrentBeat = () => state;
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     s-a1-vote — Audience poll with FIB-4 reveal
     State 0: question visible. State 1: reveal FIB-4 + verdict
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  's-a1-vote': (slide, gsap) => {
    let revealed = false;
    const options = slide.querySelectorAll('.vote-option');
    const reveal = slide.querySelector('.vote-reveal');
    const instruction = slide.querySelector('.vote-instruction');
    const heroNum = slide.querySelector('.vote-hero-number');
    const verdict = slide.querySelector('.vote-verdict');
    const explanation = slide.querySelector('.vote-explanation');

    function doReveal() {
      if (revealed) return false;
      revealed = true;

      options.forEach(btn => {
        const vote = btn.dataset.vote;
        if (vote === 'B') {
          btn.classList.add('vote-option--correct');
        } else {
          btn.classList.add('vote-option--dimmed');
        }
      });

      if (instruction) gsap.to(instruction, { opacity: 0, duration: 0.3 });

      gsap.to(reveal, { opacity: 1, visibility: 'visible', duration: 0.4, delay: 0.3 });

      if (heroNum) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 5.91,
          duration: 1.4,
          delay: 0.5,
          ease: 'power1.out',
          onUpdate() { heroNum.textContent = obj.val.toFixed(2).replace('.', ','); }
        });
      }

      if (verdict) gsap.fromTo(verdict, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.2 });
      if (explanation) gsap.fromTo(explanation, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.5 });

      return true;
    }

    function undoReveal() {
      if (!revealed) return false;
      revealed = false;

      options.forEach(btn => {
        btn.classList.remove('vote-option--correct', 'vote-option--dimmed');
      });

      if (instruction) gsap.to(instruction, { opacity: 1, duration: 0.3 });
      gsap.to(reveal, { opacity: 0, duration: 0.3, onComplete() { reveal.style.visibility = 'hidden'; } });
      if (heroNum) heroNum.textContent = '0';

      return true;
    }

    options.forEach(btn => btn.addEventListener('click', doReveal));

    slide.__hookAdvance = doReveal;
    slide.__hookRetreat = undoReveal;
    slide.__hookCurrentBeat = () => revealed ? 1 : 0;
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
    const maxState = 2;
    let busy = false;

    const eras = slide.querySelectorAll('.scores-era');
    const sourceTag = slide.querySelector('.source-tag');

    eras.forEach((era, i) => gsap.set(era, { opacity: i === 0 ? 1 : 0 }));
    if (sourceTag) gsap.set(sourceTag, { opacity: 0 });

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

    // Era 0 auto: CTP classes stagger
    const ctpClasses = slide.querySelectorAll('.scores-era[data-era="0"] .ctp-class');
    gsap.set(ctpClasses, { opacity: 0, y: 12 });
    gsap.to(ctpClasses, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15, delay: 0.4, ease: 'power2.out' });

    function runEra1Anims() {
      const terms = slide.querySelectorAll('.scores-era[data-era="1"] .formula-term');
      gsap.set(terms, { opacity: 0, y: 10 });
      gsap.to(terms, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15, delay: 0.1, ease: 'power2.out' });

      const sodiumTerm = slide.querySelector('[data-meldna-sodium]');
      if (sodiumTerm) {
        gsap.fromTo(sodiumTerm,
          { backgroundColor: 'transparent' },
          { backgroundColor: 'var(--ui-accent-light)', color: 'var(--ui-accent)', duration: 0.6, delay: 0.8, ease: 'power2.out' }
        );
      }

      const cstatEl = slide.querySelector('.scores-era[data-era="1"] .scores-cstat-value');
      if (cstatEl) {
        inlineCountUp(gsap, cstatEl, parseFloat(cstatEl.dataset.target), 1.2, 0.8);
      }
    }

    function runEra2Anims() {
      const stages = slide.querySelectorAll('.scores-era[data-era="2"] .pathway-stage');
      gsap.set(stages, { scaleX: 0, transformOrigin: 'left' });
      gsap.to(stages, { scaleX: 1, duration: 0.6, stagger: 0.15, delay: 0.2, ease: 'power2.out' });

      const vals = slide.querySelectorAll('.scores-era[data-era="2"] .pathway-value[data-target]');
      vals.forEach((el, i) => {
        inlineCountUp(gsap, el, parseFloat(el.dataset.target), 1, 0.4 + i * 0.15);
      });

      const further = slide.querySelector('.damico-further-decomp');
      if (further) gsap.fromTo(further, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.2, ease: 'power2.out' });

      if (sourceTag) gsap.to(sourceTag, { opacity: 1, duration: 0.4, delay: 1.5 });
    }

    function advance() {
      if (busy || state >= maxState) return false;
      state++;
      busy = true;
      const postAnim = state === 1 ? runEra1Anims : state === 2 ? runEra2Anims : null;
      showEra(state, () => {
        busy = false;
        if (postAnim) postAnim();
      });
      return true;
    }

    function retreat() {
      if (busy || state <= 0) return false;
      if (state === 2) {
        if (sourceTag) gsap.to(sourceTag, { opacity: 0, duration: 0.2 });
        slide.querySelectorAll('.scores-era[data-era="2"] .pathway-value[data-target]')
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
    const maxState = 2;

    const oldTerm = slide.querySelector('.paradigm-old');
    const spectrum = slide.querySelector('.paradigm-spectrum');
    const bavRef = slide.querySelector('.paradigm-ref');
    const question = slide.querySelector('.paradigm-question');
    const pathway = slide.querySelector('.elasto-pathway');
    const pathSteps = slide.querySelectorAll('.elasto-step');
    const sourceTag = slide.querySelector('.source-tag');

    if (question) gsap.set(question, { opacity: 0, y: 8 });
    if (pathway) gsap.set(pathway, { opacity: 0 });
    gsap.set(pathSteps, { opacity: 0, y: 12 });

    let splitInstance = null;

    if (oldTerm && oldTerm.textContent.trim()) {
      splitInstance = new SplitText(oldTerm, { type: 'chars' });

      gsap.set(oldTerm, { opacity: 1 });
      gsap.set(spectrum, { opacity: 0 });
      gsap.set(bavRef, { opacity: 0 });

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
        if (question) gsap.to(question, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        if (pathway) gsap.to(pathway, { opacity: 1, duration: 0.3, delay: 0.2 });
        gsap.to(pathSteps, { opacity: 1, y: 0, duration: 0.4, stagger: 0.2, delay: 0.3, ease: 'power2.out' });
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
        if (question) gsap.to(question, { opacity: 0, y: 8, duration: 0.3 });
        if (pathway) gsap.to(pathway, { opacity: 0, duration: 0.3 });
        gsap.to(pathSteps, { opacity: 0, y: 12, duration: 0.3 });
      }
      state--;
      return true;
    }

    slide.__hookAdvance = advance;
    slide.__hookRetreat = retreat;
    slide.__hookCurrentBeat = () => state;
  },

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     s-a1-fib4 — Hero number Antonio + ALT trap
     States: 0=formula+cutoffs (auto), 1=Antonio inputs+hero, 2=source
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  's-a1-fib4': (slide, gsap) => {
    let state = 0;
    const maxState = 2;

    const formulaBlock = slide.querySelector('.fib4-formula-block');
    const cutoffs = slide.querySelectorAll('.fib4-cutoff');
    const antonio = slide.querySelector('.fib4-antonio');
    const inputCards = slide.querySelectorAll('.fib4-input-card');
    const heroNum = slide.querySelector('[data-countup-target="5.91"]');
    const mandate = slide.querySelector('.fib4-mandate');
    const dangerZone = slide.querySelector('.fib4-cutoff--danger');
    const sourceTag = slide.querySelector('.source-tag');

    gsap.set(cutoffs, { opacity: 0, y: 8 });
    gsap.to(cutoffs, { opacity: 1, y: 0, duration: 0.35, stagger: 0.15, delay: 0.3, ease: 'power2.out' });

    function advance() {
      if (state >= maxState) return false;
      state++;

      if (state === 1) {
        gsap.to(antonio, { opacity: 1, duration: 0.4, delay: 0.1 });

        gsap.set(inputCards, { opacity: 0, y: 10 });
        gsap.to(inputCards, { opacity: 1, y: 0, duration: 0.35, stagger: 0.12, delay: 0.2, ease: 'power2.out' });

        if (heroNum) {
          const obj = { val: 0 };
          const totalDelay = 0.2 + inputCards.length * 0.12 + 0.3;
          gsap.to(obj, {
            val: 5.91,
            duration: 1.4,
            delay: totalDelay,
            ease: 'power1.out',
            onUpdate() { heroNum.textContent = obj.val.toFixed(2).replace('.', ','); }
          });
        }

        if (dangerZone) {
          gsap.fromTo(dangerZone,
            { boxShadow: '0 0 0px oklch(50% 0.18 25 / 0)' },
            { boxShadow: '0 0 16px oklch(50% 0.18 25 / 0.3)', duration: 0.4,
              delay: 1.5, yoyo: true, repeat: 1, ease: 'power2.inOut' }
          );
        }

        if (mandate) gsap.fromTo(mandate, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, delay: 2.0 });
      }

      if (state === 2) {
        gsap.to(sourceTag, { opacity: 1, duration: 0.4 });
      }

      return true;
    }

    function retreat() {
      if (state <= 0) return false;
      if (state === 2) gsap.to(sourceTag, { opacity: 0, duration: 0.3 });
      if (state === 1) {
        gsap.to(antonio, { opacity: 0, duration: 0.3 });
        if (heroNum) { gsap.killTweensOf(heroNum); heroNum.textContent = '0'; }
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

    const ruleOf5 = slide.querySelector('.rule-of-5');
    const zones = slide.querySelectorAll('.rule-zone');
    const grayZone = slide.querySelector('.rule-gray-zone');
    const antonioPlot = slide.querySelector('.antonio-plot');
    const antonioPin = slide.querySelector('.antonio-pin');
    const caveats = slide.querySelector('.rule-caveats');
    const banner = slide.querySelector('.rule-conclusion-banner');
    const sourceTag = slide.querySelector('.source-tag');

    gsap.set(zones, { scaleY: 0, opacity: 1 });
    if (ruleOf5) gsap.set(ruleOf5, { opacity: 1 });

    gsap.to(zones, {
      scaleY: 1,
      duration: 0.5, stagger: 0.15, delay: 0.4,
      ease: 'power2.out',
    });

    if (grayZone) {
      gsap.to(grayZone, { opacity: 1, duration: 0.5, delay: 0.4 + zones.length * 0.15 + 0.3 });
    }

    function advance() {
      if (state >= maxState) return false;
      state++;

      if (state === 1) {
        const targetZone = slide.querySelector('[data-zone-idx="3"]');
        if (targetZone) targetZone.classList.add('rule-zone--highlighted');

        gsap.to(antonioPlot, { opacity: 1, duration: 0.4 });

        if (antonioPin) {
          gsap.fromTo(antonioPin,
            { y: -40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'back.out(1.4)' }
          );
        }

        if (caveats) gsap.to(caveats, { opacity: 1, duration: 0.4, delay: 0.8 });
        if (banner) gsap.to(banner, { opacity: 1, duration: 0.4, delay: 1.2 });
      }

      if (state === 2) {
        gsap.to(sourceTag, { opacity: 1, duration: 0.4 });
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
        if (caveats) gsap.to(caveats, { opacity: 0, duration: 0.3 });
        if (banner) gsap.to(banner, { opacity: 0, duration: 0.3 });
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
    const fib4El = slide.querySelector('[data-target="5.91"]');
    const fib4Card = fib4El?.closest('.hook-lab');

    function setBeat(idx) {
      beats.forEach((b, i) => {
        b.classList.toggle('hook-beat--active', i === idx);
        b.classList.toggle('hook-beat--hidden', i !== idx);
      });
    }

    const initialBeat = parseInt(slide.dataset.initialBeat ?? '0', 10);
    currentBeat = initialBeat;
    setBeat(initialBeat);
    if (initialBeat === 1) {
      const labs = slide.querySelectorAll('.hook-lab');
      const punchline = slide.querySelector('.hook-punchline');
      [...labs, punchline].filter(Boolean).forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      });
      if (fib4El) fib4El.textContent = '5,91';
    }

    function resetBeat1Content() {
      const labs = slide.querySelectorAll('.hook-lab');
      const punchline = slide.querySelector('.hook-punchline');
      if (gsap) {
        gsap.set([...labs, punchline].filter(Boolean), { opacity: 0, visibility: 'hidden' });
      }
    }

    function runLabsStagger() {
      const labs = [...slide.querySelectorAll('.hook-lab')];
      const punchline = slide.querySelector('.hook-punchline');
      if (!gsap) return;

      const regularLabs = labs.slice(0, -1);
      const lastCard = labs[labs.length - 1];

      gsap.fromTo(regularLabs,
        { opacity: 0, visibility: 'visible', y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.12, delay: 0.05, ease: 'power2.out' }
      );

      const lastDelay = 0.05 + regularLabs.length * 0.12 + 0.3;
      gsap.fromTo(lastCard,
        { opacity: 0, visibility: 'visible', y: 12 },
        { opacity: 1, y: 0, duration: 0.45, delay: lastDelay, ease: 'back.out(1.4)' }
      );

      if (fib4Card) {
        gsap.fromTo(fib4Card,
          { boxShadow: '0 0 0px oklch(60% 0.10 75 / 0)' },
          { boxShadow: '0 0 20px oklch(60% 0.10 75 / 0.3)', duration: 0.4, delay: lastDelay + 0.3,
            yoyo: true, repeat: 1, ease: 'power2.inOut' }
        );
      }

      if (fib4El) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 5.91,
          duration: 1.4,
          delay: lastDelay,
          ease: 'power1.out',
          onUpdate() { fib4El.textContent = obj.val.toFixed(2).replace('.', ','); }
        });
      }

      if (punchline) {
        gsap.fromTo(punchline,
          { opacity: 0, visibility: 'visible', y: 10 },
          { opacity: 1, y: 0, duration: 0.6, delay: lastDelay + 0.5, ease: 'power2.out' }
        );
      }
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
