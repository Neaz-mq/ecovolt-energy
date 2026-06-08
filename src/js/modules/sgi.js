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

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(setupMarquee, 150)
  }, { passive: true })

  mq.addEventListener('change', () => {
    setupMarquee()
    if (!mq.matches) teardown()
  })

  setupMarquee()
}