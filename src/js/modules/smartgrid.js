export function initSmartGrid() {
  const section = document.querySelector('.smartgrid');
  if (!section) return;

  const cards = section.querySelectorAll('.smartgrid__card');
  if (!cards.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach((card) => card.classList.add('is-visible'));
    return;
  }
  
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