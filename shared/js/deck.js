/**
 * deck.js — Vanilla navigation engine (replaces Reveal.js)
 *
 * Events dispatched on document:
 *   slide:changed  { currentSlide, previousSlide, indexh } — immediate on navigate
 *   slide:entered  { currentSlide, indexh } — after CSS transition + fallback 600ms
 *
 * State machines attach __hookAdvance / __hookRetreat to the section element.
 * ClickReveal attaches __clickRevealNext to the section element.
 *
 * Scale: body { zoom: calc(100vw / 1280px) } via CSS — no JS scaling.
 */

let sections = [];
let currentIndex = 0;
let enteredTimer = null;
let lastEnteredSlide = null;

function dispatch(name, detail) {
  document.dispatchEvent(new CustomEvent(name, { detail, bubbles: false }));
}

function goTo(next) {
  if (next < 0 || next >= sections.length || next === currentIndex) return;

  const previousSlide = sections[currentIndex];
  const currentSlide = sections[next];

  dispatch('slide:changed', { currentSlide, previousSlide, indexh: next });

  previousSlide.classList.remove('slide-active');
  currentIndex = next;
  currentSlide.classList.add('slide-active');

  // Fire slide:entered after CSS transition. Guard with lastEnteredSlide to
  // deduplicate transitionend (which fires per-property) + fallback timer.
  lastEnteredSlide = null;
  clearTimeout(enteredTimer);

  function fireEntered() {
    if (lastEnteredSlide === currentSlide) return;
    lastEnteredSlide = currentSlide;
    dispatch('slide:entered', { currentSlide, indexh: next });
  }

  currentSlide.addEventListener('transitionend', function onEnd() {
    currentSlide.removeEventListener('transitionend', onEnd);
    fireEntered();
  });

  // Fallback: --duration-normal is 400ms; 600ms gives comfortable buffer
  enteredTimer = setTimeout(fireEntered, 600);
}

function navigate(delta) {
  const slide = sections[currentIndex];

  if (delta > 0 && typeof slide.__hookAdvance === 'function') {
    if (slide.__hookAdvance()) return;
  }
  if (delta < 0 && typeof slide.__hookRetreat === 'function') {
    if (slide.__hookRetreat()) return;
  }

  if (delta > 0 && typeof slide.__clickRevealNext === 'function') {
    if (slide.__clickRevealNext()) return;
  }

  goTo(currentIndex + delta);
}

function onKeydown(e) {
  switch (e.key) {
    case 'ArrowRight':
    case ' ':
    case 'PageDown':
      navigate(+1);
      e.preventDefault();
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      navigate(-1);
      e.preventDefault();
      break;
    case 'f':
    case 'F':
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
      break;
    case 'c':
    case 'C':
      document.documentElement.classList.toggle('high-contrast');
      break;
  }
}

/**
 * Initialize the deck.
 * @param {string} viewportSelector — CSS selector for #slide-viewport
 */
export function initDeck(viewportSelector = '#slide-viewport') {
  const viewport = document.querySelector(viewportSelector);
  if (!viewport) {
    console.error('[deck] viewport not found:', viewportSelector);
    return;
  }

  sections = Array.from(viewport.querySelectorAll(':scope > section'));
  if (!sections.length) {
    console.error('[deck] no sections found inside', viewportSelector);
    return;
  }

  // Activate first slide
  sections[0].classList.add('slide-active');

  document.addEventListener('keydown', onKeydown);

  viewport.addEventListener('click', () => navigate(+1));

  // Dispatch initial slide:entered so engine animations run on first slide
  setTimeout(() => {
    dispatch('slide:entered', { currentSlide: sections[0], indexh: 0 });
  }, 100);
}

export function getCurrentSlide() {
  return sections[currentIndex];
}

export function getCurrentIndex() {
  return currentIndex;
}

export function getTotalSlides() {
  return sections.length;
}

export { goTo, navigate };
