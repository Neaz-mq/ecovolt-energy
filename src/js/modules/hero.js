// =========================================================================
// ECOVOLT — HERO JAVASCRIPT
// initHero  : entrance animations + counter
// initStatsSlider : mobile auto-sliding stat cards with dot indicators
// =========================================================================

export function initHero() {
  const ANIM_KEYS = ['hero-title', 'hero-actions', 'hero-desc', 'hero-stats']

  // ── Entrance animations ───────────────────────────────────────────────
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
    setTimeout(doReveal, 1500)
  }

  // ── Wait for navbar before revealing ─────────────────────────────────
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

  // ── Counter animation ─────────────────────────────────────────────────
  const counterEls = document.querySelectorAll('[data-counter]')

  if (counterEls.length) {
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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })

    counterEls.forEach(el => observer.observe(el))
  }

  // ── Mobile stats auto-slider ──────────────────────────────────────────
  initStatsSlider()
}


// ── Stats Slider ──────────────────────────────────────────────────────────
// Auto-advances every 2.8s on mobile (≤640px).
// Pauses on touch, resumes 1.2s after finger lifts.
// Dot indicators are injected into the DOM dynamically.
// ─────────────────────────────────────────────────────────────────────────
function initStatsSlider() {
  const stats = document.querySelector('.hero__stats')
  if (!stats) return

  if (window.innerWidth > 640) return

  const cards = Array.from(stats.querySelectorAll('.hero__stat-card'))
  if (cards.length < 2) return

  // ── Set every card's width to exactly the scroll container's visible width
  // This is the only reliable way — CSS percentages are relative to the
  // content-box which changes with padding/margins, but clientWidth is
  // always the true pixel-perfect visible area.
  function sizeCards() {
    const w = stats.clientWidth
    cards.forEach(card => {
      card.style.width    = w + 'px'
      card.style.minWidth = w + 'px'
    })
  }

  sizeCards()

  // Re-size on orientation change / resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 640) sizeCards()
  }, { passive: true })

  // ── Build dot indicators ──────────────────────────────────────────────
  const dotsWrap = document.createElement('div')
  dotsWrap.className = 'hero__stats-dots'
  dotsWrap.setAttribute('aria-hidden', 'true')

  const dots = cards.map((_, i) => {
    const dot = document.createElement('span')
    dot.className = 'hero__stats-dot' + (i === 0 ? ' is-active' : '')
    dotsWrap.appendChild(dot)
    return dot
  })

  stats.insertAdjacentElement('afterend', dotsWrap)

  // ── State ─────────────────────────────────────────────────────────────
  let current = 0
  let paused  = false
  let ticker  = null
  let rafId   = null

  // ── Scroll to a card by index ─────────────────────────────────────────
  // Each card is now exactly stats.clientWidth wide with no gap,
  // so scrollLeft = index * clientWidth is always pixel-perfect.
  function goTo(index) {
    current = (index + cards.length) % cards.length

    dots.forEach((d, i) =>
      d.classList.toggle('is-active', i === current)
    )

    stats.scrollTo({
      left: current * stats.clientWidth,
      behavior: 'smooth',
    })
  }

  // ── Auto-advance ticker ───────────────────────────────────────────────
  function startTicker() {
    clearInterval(ticker)
    ticker = setInterval(() => {
      if (!paused) goTo(current + 1)
    }, 2800)
  }

  startTicker()

  // ── Sync dot on manual swipe ──────────────────────────────────────────
  function onScroll() {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      const snapped = Math.round(stats.scrollLeft / stats.clientWidth)
      const clamped = Math.max(0, Math.min(snapped, cards.length - 1))

      if (clamped !== current) {
        current = clamped
        dots.forEach((d, i) =>
          d.classList.toggle('is-active', i === current)
        )
      }
    })
  }

  stats.addEventListener('scroll', onScroll, { passive: true })

  // ── Pause on touch; resume after snap settles ─────────────────────────
  stats.addEventListener('touchstart', () => {
    paused = true
    clearInterval(ticker)
  }, { passive: true })

  stats.addEventListener('touchend', () => {
    setTimeout(() => {
      paused = false
      startTicker()
    }, 1200)
  }, { passive: true })

  // ── Pause when tab is hidden ──────────────────────────────────────────
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      paused = true
    } else {
      paused = false
      startTicker()
    }
  })
}