// ─────────────────────────────────────────────────────────────────────────────
// impact.js
// Scroll-triggered entrance + mobile slider (mirrors hero stats slider).
// ─────────────────────────────────────────────────────────────────────────────

export function initImpact() {
  const cards = document.querySelectorAll('.impact__stat-card');
  if (!cards.length) return;

  // ── Scroll-triggered entrance ─────────────────────────────────────────
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
  }

  // ── Mobile slider ─────────────────────────────────────────────────────
  initImpactSlider();
}


function initImpactSlider() {
  const stats = document.querySelector('.impact__stats');
  if (!stats) return;
  if (window.innerWidth > 640) return;

  const cards = Array.from(stats.querySelectorAll('.impact__stat-card'));
  if (cards.length < 2) return;

  // Size each card to full wrapper width
  function sizeCards() {
    const w = stats.clientWidth;
    cards.forEach(card => {
      card.style.width    = w + 'px';
      card.style.minWidth = w + 'px';
    });
  }

  sizeCards();
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 640) sizeCards();
  }, { passive: true });

  // ── Build dot indicators ──────────────────────────────────────────────
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'impact__stats-dots';
  dotsWrap.setAttribute('aria-hidden', 'true');

  const dots = cards.map((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'impact__stats-dot' + (i === 0 ? ' is-active' : '');
    dotsWrap.appendChild(dot);
    return dot;
  });

  stats.insertAdjacentElement('afterend', dotsWrap);

  // ── Ticker logic ──────────────────────────────────────────────────────
  let current = 0;
  let paused  = false;
  let ticker  = null;
  let rafId   = null;

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    stats.scrollTo({ left: current * stats.clientWidth, behavior: 'smooth' });
  }

  function startTicker() {
    clearInterval(ticker);
    ticker = setInterval(() => { if (!paused) goTo(current + 1); }, 2800);
  }

  startTicker();

  // Sync dots on manual scroll
  function onScroll() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const snapped = Math.round(stats.scrollLeft / stats.clientWidth);
      const clamped = Math.max(0, Math.min(snapped, cards.length - 1));
      if (clamped !== current) {
        current = clamped;
        dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
      }
    });
  }

  stats.addEventListener('scroll', onScroll, { passive: true });

  // Pause on touch
  stats.addEventListener('touchstart', () => {
    paused = true;
    clearInterval(ticker);
  }, { passive: true });

  stats.addEventListener('touchend', () => {
    setTimeout(() => { paused = false; startTicker(); }, 1200);
  }, { passive: true });

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      paused = true;
    } else {
      paused = false;
      startTicker();
    }
  });
}