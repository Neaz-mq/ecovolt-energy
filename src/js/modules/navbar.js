// ============================================
// ECOVOLT — NAVBAR
// ============================================

export function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".navbar__hamburger");
  const mobileMenu = document.querySelector(".navbar__mobile");
  const mobileClose = document.querySelector(".navbar__mobile-close"); // ← NEW

  if (!navbar) return;

  // ── Show navbar after first paint (FOUC prevention) ──
  requestAnimationFrame(() => {
    navbar.classList.add("is-ready");
  });

  // ── Scroll: add .scrolled after 50px ──────
  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    },
    { passive: true },
  );

  // ── Menu toggle ───────────────────────────
  const toggleMenu = (open) => {
    hamburger?.classList.toggle("is-open", open);
    mobileMenu?.classList.toggle("is-open", open);
    navbar.classList.toggle("menu-open", open); // ← ADD: hides real navbar when menu opens
    hamburger?.setAttribute("aria-expanded", String(open));
    hamburger?.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu",
    );
    document.body.style.overflow = open ? "hidden" : "";
  };

  // Hamburger open
  hamburger?.addEventListener("click", () => {
    toggleMenu(!hamburger.classList.contains("is-open"));
  });

  // ── NEW: mobile header close button ──────
  mobileClose?.addEventListener("click", () => {
    toggleMenu(false);
    hamburger?.focus(); // return focus to hamburger for accessibility
  });

  // Escape key closes menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu?.classList.contains("is-open")) {
      toggleMenu(false);
      hamburger?.focus();
    }
  });

  // Click on backdrop (outside nav/footer) closes menu
  mobileMenu?.addEventListener("click", (e) => {
    if (e.target === mobileMenu) toggleMenu(false);
  });

  // Any nav link click closes menu
  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // ── Active link highlight on scroll ──────
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar__links a");

  // Sections that should clear all active states (hero/home area)
  const noActiveIds = new Set(["home", "mission"]);

  const resolveLink = (id) => {
    const direct = [...navLinks].find(
      (l) => l.getAttribute("href") === `#${id}`,
    );
    if (direct) return direct;
    const fallback = aliases[id];
    return fallback
      ? [...navLinks].find((l) => l.getAttribute("href") === fallback)
      : null;
  };

  // ── Track intersection ratios, activate the MOST visible section ──
  const visibilityMap = new Map();

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibilityMap.set(
          entry.target.getAttribute("id"),
          entry.intersectionRatio,
        );
      });

      // Find the section with the highest visibility ratio
      let maxRatio = 0;
      let activeId = null;

      visibilityMap.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeId = id;
        }
      });

      // Nothing visible — do nothing
      if (!activeId || maxRatio === 0) return;

      // Hero/home is most visible — clear all active states
      if (noActiveIds.has(activeId)) {
        navLinks.forEach((l) => l.classList.remove("is-active"));
        return;
      }

      const active = resolveLink(activeId);
      if (!active) return;

      navLinks.forEach((l) => l.classList.remove("is-active"));
      active.classList.add("is-active");
    },
    {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: "-72px 0px 0px 0px",
    },
  );

  sections.forEach((s) => sectionObserver.observe(s));
}
