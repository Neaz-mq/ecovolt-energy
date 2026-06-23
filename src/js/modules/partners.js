export function initPartners() {
  const track = document.querySelector('.partners__track')
  if (!track) return

  // ── Respect reduced-motion preference ─────────────────────────────────
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

  function applyMotion() {
    track.style.animationPlayState = mq.matches ? 'paused' : 'running'
  }

  applyMotion()
  mq.addEventListener('change', applyMotion)

  // ── Touch pause/resume — mirrors the CSS :hover pause for touch devices,
  //    so a finger resting on the strip stops the scroll long enough to
  //    read a partner name. Skipped entirely if reduced-motion is on,
  //    since the track isn't animating in that case anyway.
  function onTouchStart() {
    if (mq.matches) return
    track.style.animationPlayState = 'paused'
  }

  function onTouchEnd() {
    if (mq.matches) return
    track.style.animationPlayState = 'running'
  }

  track.addEventListener('touchstart', onTouchStart, { passive: true })
  track.addEventListener('touchend', onTouchEnd, { passive: true })
  track.addEventListener('touchcancel', onTouchEnd, { passive: true })
}