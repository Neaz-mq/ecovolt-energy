export function initContact() {
  const dropdown      = document.getElementById('contactDropdown');
  const panel         = document.getElementById('contactDropdownPanel');
  const label         = document.getElementById('contactDropdownLabel');
  const nativeSelect  = document.getElementById('contact-interest');
  const form          = document.querySelector('.contact__form');

  if (!dropdown || !panel) return;

  // ── Position the panel via fixed coords so it escapes every stacking context
  function positionPanel() {
    const rect = dropdown.getBoundingClientRect();
    panel.style.position = 'fixed';
    panel.style.top      = (rect.bottom + 6) + 'px';
    panel.style.left     = rect.left + 'px';
    panel.style.width    = rect.width + 'px';
    panel.style.right    = 'auto';
  }

  function openDropdown() {
    positionPanel();
    dropdown.classList.add('open');
    dropdown.setAttribute('aria-expanded', 'true');
    panel.classList.add('open');
  }

  function closeDropdown() {
    dropdown.classList.remove('open');
    dropdown.setAttribute('aria-expanded', 'false');
    panel.classList.remove('open');
  }

  function toggleDropdown() {
    if (dropdown.classList.contains('open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  // ── Toggle on click
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // ── Keyboard support
  dropdown.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    }
    if (e.key === 'Escape') closeDropdown();
  });

  // ── Option selection
  panel.querySelectorAll('.contact__dropdown-option').forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      // deselect all
      panel.querySelectorAll('.contact__dropdown-option').forEach((o) => {
        o.classList.remove('selected');
      });
      // select clicked
      option.classList.add('selected');
      const value = option.dataset.value;
      const text  = option.querySelector('.contact__dropdown-opt-label').textContent;
      // update label
      label.textContent = text;
      dropdown.classList.add('has-value');
      // sync native select for form submission
      if (nativeSelect) nativeSelect.value = value;
      closeDropdown();
    });
  });

  // ── Close on outside click
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !panel.contains(e.target)) {
      closeDropdown();
    }
  });

  // ── Reposition on scroll/resize so it tracks the trigger
  window.addEventListener('scroll', () => {
    if (dropdown.classList.contains('open')) positionPanel();
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (dropdown.classList.contains('open')) positionPanel();
  }, { passive: true });

  // ── Form submit: stop page reload, show success message
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // simple required-field check since the form has novalidate
      const nameInput  = form.querySelector('#contact-name');
      const emailInput = form.querySelector('#contact-email');
      let valid = true;

      [nameInput, emailInput].forEach((input) => {
        if (input && !input.value.trim()) {
          input.style.borderColor = '#e15555';
          valid = false;
        } else if (input) {
          input.style.borderColor = '';
        }
      });

      if (nativeSelect && !nativeSelect.value) {
        dropdown.style.borderColor = '#e15555';
        valid = false;
      } else if (dropdown) {
        dropdown.style.borderColor = '';
      }

      if (!valid) return;

      showSuccessMessage();
      form.reset();
      label.textContent = "I'm interested in ..";
      dropdown.classList.remove('has-value');
      panel.querySelectorAll('.contact__dropdown-option').forEach((o) => {
        o.classList.remove('selected');
      });
    });
  }

  function showSuccessMessage() {
    // avoid stacking duplicate messages on repeat submits
    const existing = form.querySelector('.contact__success-msg');
    if (existing) existing.remove();

    const msg = document.createElement('p');
    msg.className = 'contact__success-msg';
    msg.setAttribute('role', 'status');
    msg.textContent = "Thank you! We'll be in touch shortly.";
    form.appendChild(msg);

    setTimeout(() => {
      msg.classList.add('is-visible');
    }, 10);

    setTimeout(() => {
      msg.classList.remove('is-visible');
      setTimeout(() => msg.remove(), 300);
    }, 4000);
  }
}