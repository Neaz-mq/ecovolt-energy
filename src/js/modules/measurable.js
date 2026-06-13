/* ============================================================
   MEASURABLE SECTION — Metrics Swiper
   src/js/modules/measurable.js
   ============================================================ */

export function initMeasurable() {
  const track  = document.getElementById('metricsTrack');
  const dotsEl = document.getElementById('metricsDots');

  if (!track || !dotsEl) return;

  const dots    = Array.from(dotsEl.querySelectorAll('.measurable__dot'));
  const cards   = Array.from(track.querySelectorAll('.measurable__slide-card'));
  let current   = 0;
  let startX    = 0;
  let isDragging = false;
  let dragDelta  = 0;

  const AUTOPLAY_DELAY = 4000; // ms between auto slides
  let autoplayTimer = null;

  /* ── Compute translateX offset for a given slide index ── */
  function getOffset(index) {
    if (!cards[index]) return 0;
    const gap = 14; // matches CSS gap: 14px
    return cards
      .slice(0, index)
      .reduce((sum, card) => sum + card.offsetWidth + gap, 0);
  }

  /* ── Navigate to a slide ── */
  function goTo(index, animate = true) {
    // Loop around for autoplay
    if (index > cards.length - 1) index = 0;
    if (index < 0) index = cards.length - 1;

    current = index;

    track.style.transition = animate
      ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      : 'none';
    track.style.transform = `translateX(-${getOffset(current)}px)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('measurable__dot--active', i === current);
    });
  }

  /* ── Autoplay controls ── */
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goTo(current + 1);
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  /* ── Dot clicks ── */
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.index));
      startAutoplay(); // restart timer after manual interaction
    });
  });

  /* ── Touch events ── */
  track.addEventListener('touchstart', e => {
    startX    = e.touches[0].clientX;
    isDragging = true;
    dragDelta  = 0;
    stopAutoplay();
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    dragDelta = e.touches[0].clientX - startX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    if      (dragDelta < -50) goTo(current + 1);
    else if (dragDelta >  50) goTo(current - 1);
    else                      goTo(current);
    startAutoplay();
  });

  /* ── Mouse drag (desktop testing) ── */
  track.addEventListener('mousedown', e => {
    startX    = e.clientX;
    isDragging = true;
    dragDelta  = 0;
    stopAutoplay();
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    dragDelta = e.clientX - startX;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    if      (dragDelta < -50) goTo(current + 1);
    else if (dragDelta >  50) goTo(current - 1);
    else                      goTo(current);
    startAutoplay();
  });

  /* ── Pause on hover/focus, resume on leave ── */
  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);

  /* ── Pause when tab is hidden, resume when visible ── */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  /* ── Recalculate on resize ── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(current, false), 100);
  });

  /* ── Init ── */
  goTo(0, false);
  startAutoplay();
}