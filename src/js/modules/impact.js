// ─────────────────────────────────────────────────────────────────────────────
// impact.js
// Scroll-triggered entrance animation for the Impact stat cards.
// ─────────────────────────────────────────────────────────────────────────────

export function initImpact() {
  const cards = document.querySelectorAll('.impact__stat-card');
  if (!cards.length) return;

  // Respect prefers-reduced-motion — cards already visible via CSS rule,
  // so we can skip the observer entirely.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => observer.observe(card));
}