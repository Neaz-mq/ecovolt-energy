export function initHero() {

  // ── Entrance animations
  const els = [
    document.querySelector('[data-anim="hero-title"]'),
    document.querySelector('[data-anim="hero-actions"]'),
    document.querySelector('[data-anim="hero-desc"]'),
    document.querySelector('[data-anim="hero-stats"]'),
  ]

  requestAnimationFrame(() => {
    setTimeout(() => {
      els.forEach(el => el?.classList.add('is-visible'))
    }, 80)
  })

  // ── Counter animation
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target  = parseFloat(el.dataset.counter)
    const suffix  = el.dataset.suffix ?? ''
    const isFloat = String(el.dataset.counter).includes('.')
    const steps   = 60
    const delay   = 600
    let count = 0

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