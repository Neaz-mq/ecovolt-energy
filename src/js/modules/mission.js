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
}