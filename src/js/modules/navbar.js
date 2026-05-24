export function initNavbar() {
  const navbar    = document.querySelector('.navbar')
  const hamburger = document.querySelector('.navbar__hamburger')
  const mobileMenu = document.querySelector('.navbar__mobile')
  const closeBtn  = document.querySelector('.navbar__mobile-close-btn') // ← updated

  if (!navbar) return

  requestAnimationFrame(() => {
    navbar.classList.add('is-ready')
  })

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50)
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  const toggleMenu = (open) => {
    hamburger?.classList.toggle('is-open', open)
    mobileMenu?.classList.toggle('is-open', open)
    document.body.style.overflow = open ? 'hidden' : ''
    hamburger?.setAttribute('aria-expanded', String(open)) // ← fixed: was bare boolean
  }

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('is-open')
    toggleMenu(!isOpen)
  })

  closeBtn?.addEventListener('click', () => toggleMenu(false))

  // ESC key closes the menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('is-open')) {
      toggleMenu(false)
      hamburger?.focus() // return focus for accessibility
    }
  })

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false))
  })
}