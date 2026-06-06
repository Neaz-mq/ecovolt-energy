export function initPartners() {
  const track = document.querySelector('.partners__track')
  if (!track) return

  // Respect reduced-motion preference
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

  function applyMotion() {
    track.style.animationPlayState = mq.matches ? 'paused' : 'running'
  }

  applyMotion()
  mq.addEventListener('change', applyMotion)
}