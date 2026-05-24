// ============================================
// ECOVOLT — HERO
// ============================================

export function initHero() {

  const ANIM_KEYS = ['hero-title', 'hero-actions', 'hero-desc', 'hero-stats']

  // ── Entrance animations ───────────────────
  function revealHero() {
    let revealed = false

    function doReveal() {
      if (revealed) return
      revealed = true
      ANIM_KEYS.forEach(key => {
        const el = document.querySelector(`[data-anim="${key}"]`)
        if (el) el.classList.add('is-visible')
      })
    }

    requestAnimationFrame(() => setTimeout(doReveal, 80))
    setTimeout(doReveal, 1500) // hard fallback
  }

  // ── Wait for navbar before revealing ──────
  const navbar = document.getElementById('navbar')

  if (navbar && !navbar.classList.contains('is-ready')) {
    let attempts = 0
    const poll = setInterval(() => {
      attempts++
      if (navbar.classList.contains('is-ready') || attempts > 40) {
        clearInterval(poll)
        revealHero()
      }
    }, 50)
  } else {
    revealHero()
  }

  // ── Counter animation (IntersectionObserver) ──
  // Fires only when stat cards scroll into view, not immediately on load
  const counterEls = document.querySelectorAll('[data-counter]')

  if (!counterEls.length) return

  const runCounter = (el) => {
    const target  = parseFloat(el.dataset.counter)
    const suffix  = el.dataset.suffix ?? ''
    const isFloat = String(el.dataset.counter).includes('.')
    const steps   = 60

    if (isNaN(target)) return

    let count = 0
    const timer = setInterval(() => {
      count++
      const current = (target / steps) * count

      if (count >= steps) {
        el.textContent = (isFloat ? target.toFixed(1) : target) + suffix
        clearInterval(timer)
        return
      }

      el.textContent = isFloat
        ? current.toFixed(1) + suffix
        : Math.floor(current) + suffix
    }, 1800 / steps)
  }

  // Use IntersectionObserver so counters only fire when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target)
        observer.unobserve(entry.target) // run once only
      }
    })
  }, { threshold: 0.3 })

  counterEls.forEach(el => observer.observe(el))
}