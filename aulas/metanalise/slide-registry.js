/**
 * slide-registry.js — Meta-análise
 * State machines for interactive slides (hook, checkpoints).
 * Pattern: cirrose slide-registry.js
 */

export const slideRegistry = {
  's-hook': (slide, gsap) => {
    const beat0 = slide.querySelector('.hook-beat-0');
    const beat1 = slide.querySelector('.hook-beat-1');
    const verdict = slide.querySelector('.hook-verdict');
    if (!beat0 || !beat1) return;

    let state = 0;
    const MAX = 1;

    gsap.to(beat0, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });

    function advance() {
      if (state >= MAX) return false;
      state++;
      if (state === 1) {
        gsap.set(beat1, { visibility: 'visible' });
        gsap.to(beat1, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
        beat1.querySelectorAll('[data-animate="countUp"]').forEach(el => {
          const raw = (el.dataset.target || '').replace(',', '.');
          const target = parseFloat(raw);
          if (isNaN(target)) return;
          const decimals = parseInt(el.dataset.decimals, 10);
          const frac = !isNaN(decimals) ? decimals : (raw.includes('.') ? 1 : 0);
          const suffix = el.dataset.suffix || '';
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 1.5, ease: 'power2.out',
            onUpdate: () => {
              const num = frac > 0
                ? obj.val.toLocaleString('pt-BR', { minimumFractionDigits: frac, maximumFractionDigits: frac })
                : Math.round(obj.val).toLocaleString('pt-BR');
              el.textContent = num + suffix;
            }
          });
        });
        if (verdict) {
          gsap.to(verdict, { y: 0, opacity: 1, duration: 0.6, delay: 1.8, ease: 'power3.out' });
        }
      }
      return true;
    }

    function retreat() {
      if (state <= 0) return false;
      if (state === 1) {
        gsap.to([beat1, verdict].filter(Boolean), { opacity: 0, duration: 0.3 });
        gsap.set(beat1, { visibility: 'hidden', delay: 0.3 });
      }
      state--;
      return true;
    }

    slide.__hookAdvance = advance;
    slide.__hookRetreat = retreat;
    slide.__hookCurrentBeat = () => state;
  },

  's-checkpoint-1': (slide, gsap) => {
    const scenario = slide.querySelector('.checkpoint-scenario');
    const question = slide.querySelector('.checkpoint-question');
    const reveal = slide.querySelector('.checkpoint-reveal');
    if (!scenario || !question || !reveal) return;

    let state = 0;
    const MAX = 2;

    gsap.to(scenario, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });

    function advance() {
      if (state >= MAX) return false;
      state++;
      if (state === 1) {
        gsap.to(question, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
      if (state === 2) {
        gsap.to(reveal, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      }
      return true;
    }

    function retreat() {
      if (state <= 0) return false;
      const target = state === 2 ? reveal : question;
      gsap.to(target, { opacity: 0, y: 20, duration: 0.3 });
      state--;
      return true;
    }

    slide.__hookAdvance = advance;
    slide.__hookRetreat = retreat;
    slide.__hookCurrentBeat = () => state;
  },

  's-checkpoint-2': (slide, gsap) => {
    const scenario = slide.querySelector('.checkpoint-scenario');
    const question = slide.querySelector('.checkpoint-question');
    const steps = slide.querySelectorAll('.checkpoint-step');
    const verdict = slide.querySelector('.checkpoint-verdict');
    if (!scenario || !question) return;

    let state = 0;
    const MAX = 3;

    gsap.to(scenario, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
    gsap.to(question, { y: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: 'power3.out' });

    function advance() {
      if (state >= MAX) return false;
      state++;
      if (state === 1 && steps[0]) {
        gsap.to(steps[0], { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
      }
      if (state === 2) {
        if (steps[1]) gsap.to(steps[1], { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
        if (steps[2]) gsap.to(steps[2], { y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power3.out' });
      }
      if (state === 3 && verdict) {
        gsap.to(verdict, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
      }
      return true;
    }

    function retreat() {
      if (state <= 0) return false;
      if (state === 3 && verdict) {
        gsap.to(verdict, { opacity: 0, y: 12, duration: 0.3 });
      }
      if (state === 2) {
        gsap.to([steps[1], steps[2]].filter(Boolean), { opacity: 0, y: 12, duration: 0.3 });
      }
      if (state === 1 && steps[0]) {
        gsap.to(steps[0], { opacity: 0, y: 12, duration: 0.3 });
      }
      state--;
      return true;
    }

    slide.__hookAdvance = advance;
    slide.__hookRetreat = retreat;
    slide.__hookCurrentBeat = () => state;
  },
};
