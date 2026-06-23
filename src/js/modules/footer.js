export function initFooter() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const form = document.querySelector('.footer__newsletter-form');
  if (!form) return;

  const emailInput = form.querySelector('#footer-email');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    if (emailInput) {
      const value = emailInput.value.trim();
      const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!value || !looksLikeEmail) {
        emailInput.style.borderColor = '#e15555';
        valid = false;
      } else {
        emailInput.style.borderColor = '';
      }
    }

    if (!valid) return;

    showSuccessMessage();
    form.reset();
    if (emailInput) emailInput.style.borderColor = '';
  });

  function showSuccessMessage() {
    // avoid stacking duplicate messages on repeat submits
    const existing = form.querySelector('.footer__newsletter-success');
    if (existing) existing.remove();

    const msg = document.createElement('p');
    msg.className = 'footer__newsletter-success';
    msg.setAttribute('role', 'status');
    msg.textContent = "Thanks for subscribing!";
    form.insertAdjacentElement('afterend', msg);

    setTimeout(() => {
      msg.classList.add('is-visible');
    }, 10);

    setTimeout(() => {
      msg.classList.remove('is-visible');
      setTimeout(() => msg.remove(), 300);
    }, 4000);
  }
}