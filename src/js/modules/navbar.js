// ============================================
// ECOVOLT — NAVBAR
// ============================================

export function initNavbar() {
  const navbar     = document.querySelector('.navbar')
  const hamburger  = document.querySelector('.navbar__hamburger')
  const mobileMenu = document.querySelector('.navbar__mobile')

  if (!navbar) return

  // ── Show navbar after first paint (FOUC prevention) ──
  requestAnimationFrame(() => {
    navbar.classList.add('is-ready')
  })

  // ── Scroll: add .scrolled after 50px ──────
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50)
  }, { passive: true })

  // ── Menu toggle ───────────────────────────
  const toggleMenu = (open) => {
    hamburger?.classList.toggle('is-open', open)
    mobileMenu?.classList.toggle('is-open', open)
    hamburger?.setAttribute('aria-expanded', String(open))
    hamburger?.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu')
    document.body.style.overflow = open ? 'hidden' : ''
  }

  // Hamburger click
  hamburger?.addEventListener('click', () => {
    toggleMenu(!hamburger.classList.contains('is-open'))
  })

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('is-open')) {
      toggleMenu(false)
      hamburger?.focus()
    }
  })

  // Click backdrop (outside menu panel) to close
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) toggleMenu(false)
  })

  // Nav links close menu on click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false))
  })
}