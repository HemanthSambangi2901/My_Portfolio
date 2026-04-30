/**
 * animations.js
 * Scroll-reveal (IntersectionObserver) + skill bar fill animation
 */

/* ===========================
   SCROLL REVEAL
   =========================== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// After loader hides, re-check all in-viewport elements
window.addEventListener('load', () => {
  setTimeout(() => {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 2400); // slightly after loader (2200ms) finishes
});

/* ===========================
   SKILL BARS
   =========================== */
const skillBars = document.querySelectorAll('.skill-bar-fill');

const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const pct = bar.getAttribute('data-pct');

        // Animate width
        bar.style.width = pct + '%';

        // Shimmer sweep after bar fills
        setTimeout(() => bar.classList.add('animated'), 50);

        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach(bar => barObserver.observe(bar));
