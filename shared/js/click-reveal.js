/**
 * Click-Reveal — Manual fragment system
 * Elements with data-reveal="N" are hidden by default,
 * revealed sequentially via arrow keys or click.
 */

export class ClickReveal {
  /**
   * @param {HTMLElement} slideEl — the <section> element
   * @param {object} gsapRef — GSAP instance
   */
  constructor(slideEl, gsapRef) {
    this.fragments = [...slideEl.querySelectorAll('[data-reveal]')]
      .sort((a, b) => +a.dataset.reveal - +b.dataset.reveal);
    this.current = 0;
    this.gsap = gsapRef;
  }

  /**
   * Reveal the next element in order.
   * @returns {boolean} true if consumed (more to reveal), false if all revealed
   */
  next() {
    if (this.current >= this.fragments.length) return false;
    const el = this.fragments[this.current];
    this.gsap.fromTo(el,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
    el.classList.add('revealed');
    this.current++;
    return true;
  }

  /**
   * Reveal all elements at once (PageDown skip).
   */
  revealAll() {
    this.fragments.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('revealed');
    });
    this.current = this.fragments.length;
  }

  /**
   * Reset all elements to hidden state.
   */
  reset() {
    this.fragments.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      el.classList.remove('revealed');
    });
    this.current = 0;
  }

  /** @returns {boolean} whether there are unrevealed elements */
  get hasMore() {
    return this.current < this.fragments.length;
  }
}
