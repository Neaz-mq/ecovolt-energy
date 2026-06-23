export function initImpact() {
  const cards = document.querySelectorAll(".impact__stat-card");
  if (!cards.length) return;

  // ── Scroll-triggered entrance ─────────────────────────────────────────
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    cards.forEach((card) => observer.observe(card));
  }

  // ── Mobile slider ─────────────────────────────────────────────────────
  initImpactSlider();
}

function initImpactSlider() {
  const stats = document.querySelector(".impact__stats");
  if (!stats) return;

  const cards = Array.from(stats.querySelectorAll(".impact__stat-card"));
  if (cards.length < 2) return;

  let dotsWrap = null;
  let dots = [];
  let current = 0;
  let paused = false;
  let ticker = null;
  let rafId = null;
  let active = false;

  function isSliderModeOn() {
    return window.getComputedStyle(stats).overflowX === "auto";
  }

  function sizeCards() {
    const w = stats.clientWidth;
    cards.forEach((card) => {
      card.style.width = w + "px";
      card.style.minWidth = w + "px";
    });
  }

  function clearCardSizing() {
    cards.forEach((card) => {
      card.style.width = "";
      card.style.minWidth = "";
    });
  }

  function buildDots() {
    if (dotsWrap) return;

    dotsWrap = document.createElement("div");
    dotsWrap.className = "impact__stats-dots";
    dotsWrap.setAttribute("aria-hidden", "true");

    dots = cards.map((_, i) => {
      const dot = document.createElement("span");
      dot.className = "impact__stats-dot" + (i === 0 ? " is-active" : "");
      dotsWrap.appendChild(dot);
      return dot;
    });

    stats.insertAdjacentElement("afterend", dotsWrap);
  }

  function removeDots() {
    if (dotsWrap) {
      dotsWrap.remove();
      dotsWrap = null;
      dots = [];
    }
  }

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
    stats.scrollTo({ left: current * stats.clientWidth, behavior: "smooth" });
  }

  function startTicker() {
    clearInterval(ticker);
    ticker = setInterval(() => {
      if (!paused) goTo(current + 1);
    }, 2800);
  }

  function stopTicker() {
    clearInterval(ticker);
    ticker = null;
  }

  function onScroll() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const snapped = Math.round(stats.scrollLeft / stats.clientWidth);
      const clamped = Math.max(0, Math.min(snapped, cards.length - 1));
      if (clamped !== current) {
        current = clamped;
        dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
      }
    });
  }

  function onTouchStart() {
    paused = true;
    stopTicker();
  }

  function onTouchEnd() {
    setTimeout(() => {
      paused = false;
      startTicker();
    }, 1200);
  }

  function onVisibilityChange() {
    if (document.hidden) {
      paused = true;
    } else {
      paused = false;
      if (active) startTicker();
    }
  }

  function enableSlider() {
    if (active) return;
    active = true;

    requestAnimationFrame(() => {
      setTimeout(() => {
        if (!active) return;
        sizeCards();
        buildDots();
        current = 0;
        startTicker();

        stats.addEventListener("scroll", onScroll, { passive: true });
        stats.addEventListener("touchstart", onTouchStart, { passive: true });
        stats.addEventListener("touchend", onTouchEnd, { passive: true });
        document.addEventListener("visibilitychange", onVisibilityChange);
      }, 50);
    });
  }

  function disableSlider() {
    if (!active) return;
    active = false;

    stopTicker();
    removeDots();
    clearCardSizing();

    stats.removeEventListener("scroll", onScroll);
    stats.removeEventListener("touchstart", onTouchStart);
    stats.removeEventListener("touchend", onTouchEnd);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  }

  function evaluate() {
    if (isSliderModeOn()) {
      enableSlider();
      if (active) sizeCards(); 
    } else {
      disableSlider();
    }
  }

  // ── Initial check ──────────────────────────────────────────────────
  evaluate();
  
  window.addEventListener("resize", evaluate, { passive: true });
 
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      if (active) sizeCards();
    });
    ro.observe(stats);
  }
}
