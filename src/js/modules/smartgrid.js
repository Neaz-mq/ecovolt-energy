// ─────────────────────────────────────────────────────────────────────────────
// smartgrid.js
// Scroll-triggered card reveal with staggered delay
// ─────────────────────────────────────────────────────────────────────────────

export function initSmartGrid() {
  const section = document.querySelector('.smartgrid');
  if (!section) return;

  const cards = section.querySelectorAll('.smartgrid__card');
  if (!cards.length) return;

  // Respect reduced-motion preference – just show cards immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach((card) => card.classList.add('is-visible'));
    return;
  }

  // IntersectionObserver: reveal each card with a staggered delay
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('is-visible'), i * 120);
        });

        // Only trigger once
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(section);
}