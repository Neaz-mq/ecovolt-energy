export function initNavbar() {
  const navbar     = document.querySelector('.navbar')
  const hamburger  = document.querySelector('.navbar__hamburger')
  const mobileMenu = document.querySelector('.navbar__mobile')
  const closeBtn   = document.querySelector('.navbar__close')

  if (!navbar) return

  // Scroll behavior
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50)
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  // Mobile toggle
  const toggleMenu = (open) => {
    hamburger?.classList.toggle('is-open', open)
    mobileMenu?.classList.toggle('is-open', open)
    document.body.style.overflow = open ? 'hidden' : ''
  }

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('is-open')
    toggleMenu(!isOpen)
  })

  closeBtn?.addEventListener('click', () => toggleMenu(false))

  // Close on mobile link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false))
  })
}
