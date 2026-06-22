// ── sgi.js ────────────────────────────────────────────────────────────────
// Mobile marquee for SGI cards — mirrors initMission() pattern exactly
// ──────────────────────────────────────────────────────────────────────────

export function initSgi() {
  const grid = document.querySelector('.sgi__grid')
  if (!grid) return

  const mq = window.matchMedia('(max-width: 520px)')
  let resizeTimer = null

  function teardown() {
    grid.querySelectorAll('[data-sgi-clone]').forEach(el => el.remove())
    grid.style.removeProperty('--sgi-marquee-offset')
    grid.style.animationPlayState = ''
  }

  function setupMarquee() {
    teardown()
    if (!mq.matches) return

    // Clone the 3 col wrappers → [col1 col2 col3] [col1' col2' col3']
    const originals = [...grid.querySelectorAll('.sgi__col:not([data-sgi-clone])')]
    originals.forEach(col => {
      const clone = col.cloneNode(true)
      clone.setAttribute('data-sgi-clone', '')
      clone.setAttribute('aria-hidden', 'true')
      grid.appendChild(clone)
    })

    // Measure after paint so offsetWidth is accurate
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const gap = parseFloat(getComputedStyle(grid).gap) || 12
      const setWidth = originals.reduce((acc, col) => acc + col.offsetWidth + gap, 0)
      grid.style.setProperty('--sgi-marquee-offset', `-${setWidth}px`)
    }))
  }

  // ── Touch pause/resume — mirrors the CSS :hover pause for touch devices,
  //    so a finger resting on a card stops the scroll long enough to read it.
  function onTouchStart() {
    if (!mq.matches) return
    grid.style.animationPlayState = 'paused'
  }

  function onTouchEnd() {
    if (!mq.matches) return
    grid.style.animationPlayState = 'running'
  }

  grid.addEventListener('touchstart', onTouchStart, { passive: true })
  grid.addEventListener('touchend', onTouchEnd, { passive: true })
  grid.addEventListener('touchcancel', onTouchEnd, { passive: true })

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(setupMarquee, 150)
  }, { passive: true })

  // setupMarquee() already calls teardown() internally and returns early
  // when !mq.matches, so no separate teardown() call is needed here.
  mq.addEventListener('change', setupMarquee)

  setupMarquee()
}