export function initHero() {

  // ── Selectors ─────────────────────────────
  const ANIM_KEYS = ['hero-title', 'hero-actions', 'hero-desc', 'hero-stats']

  // ── Entrance animations ───────────────────
  // Uses rAF + setTimeout for reliable first-paint trigger.
  // Falls back after 1500ms in case something blocks the first run.
  function revealHero() {
    let revealed = false

    function doReveal() {
      if (revealed) return
      revealed = true

      ANIM_KEYS.forEach(key => {
        const el = document.querySelector(`[data-anim="${key}"]`)
        if (el) {
          el.classList.add('is-visible')
        } else {
          console.warn(`[Hero] element not found: [data-anim="${key}"]`)
        }
      })
    }

    // Primary: rAF → setTimeout chain (your original logic, kept)
    requestAnimationFrame(() => {
      setTimeout(doReveal, 80)
    })

    // Hard fallback: if primary never fires (e.g. tab hidden, slow device)
    setTimeout(doReveal, 1500)
  }

  // ── Wait for navbar is-ready before revealing ─
  // Prevents a flash where hero animates in before navbar appears.
  const navbar = document.getElementById('navbar')

  if (navbar && !navbar.classList.contains('is-ready')) {
    // Poll until navbar is ready (max 2s)
    let attempts = 0
    const poll = setInterval(() => {
      attempts++
      if (navbar.classList.contains('is-ready') || attempts > 40) {
        clearInterval(poll)
        revealHero()
      }
    }, 50)
  } else {
    // Navbar already ready (or doesn't exist) — reveal immediately
    revealHero()
  }

  // ── Counter animation ─────────────────────
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target  = parseFloat(el.dataset.counter)
    const suffix  = el.dataset.suffix ?? ''
    const isFloat = String(el.dataset.counter).includes('.')
    const steps   = 60
    const delay   = 600
    let count     = 0

    if (isNaN(target)) {
      console.warn('[Hero] invalid data-counter value:', el.dataset.counter)
      return
    }

    setTimeout(() => {
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
    }, delay)
  })
}