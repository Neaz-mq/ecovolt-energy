// =========================================================================
// ECOVOLT — MISSION JAVASCRIPT
// =========================================================================

export function initMission() {
  // ── Card & quote entrance animations ─────────────────────────────────
  const cards = document.querySelectorAll('.mission__card')
  const quote = document.querySelector('.mission__quote')
  if (!cards.length && !quote) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  cards.forEach(card => observer.observe(card))
  if (quote) observer.observe(quote)

  // ── Mobile marquee ────────────────────────────────────────────────────
  const track = document.querySelector('.mission__cards')
  if (!track) return

  const mq = window.matchMedia('(max-width: 640px)')
  let resizeTimer = null

  function teardown() {
    track.querySelectorAll('[data-clone]').forEach(el => el.remove())
    track.style.removeProperty('--marquee-offset')
    track.style.animation = ''
    track.style.animationPlayState = ''
  }

  function setupMarquee() {
    teardown()
    if (!mq.matches) return

    // Clone originals once → gives us [A B C D] [A' B' C' D']
    const originals = [...track.querySelectorAll('.mission__card:not([data-clone])')]
    originals.forEach(card => {
      const clone = card.cloneNode(true)
      clone.setAttribute('data-clone', '')
      clone.setAttribute('aria-hidden', 'true')
      track.appendChild(clone)
    })

    // Measure after paint so offsetWidth is accurate
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const gap = parseFloat(getComputedStyle(track).gap) || 12
      // Sum each card's actual width — handles cards with different widths safely
      const setWidth = originals.reduce((acc, c) => acc + c.offsetWidth + gap, 0)
      // Translate by exactly one set → CSS loop reset is visually invisible
      track.style.setProperty('--marquee-offset', `-${setWidth}px`)
    }))
  }

  // ── Touch pause/resume — mirrors the CSS :hover pause for touch devices,
  //    so a finger resting on a card stops the scroll long enough to read it.
  function onTouchStart() {
    if (!mq.matches) return
    track.style.animationPlayState = 'paused'
  }

  function onTouchEnd() {
    if (!mq.matches) return
    track.style.animationPlayState = 'running'
  }

  track.addEventListener('touchstart', onTouchStart, { passive: true })
  track.addEventListener('touchend', onTouchEnd, { passive: true })
  track.addEventListener('touchcancel', onTouchEnd, { passive: true })

  window.addEventListener('resize', () => {
    if (!mq.matches) return
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(setupMarquee, 150)
  }, { passive: true })

  mq.addEventListener('change', setupMarquee)
  setupMarquee()
}