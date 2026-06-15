export function initContact() {
  const dropdown = document.getElementById('contactDropdown');
  const dropdownPanel = document.getElementById('contactDropdownPanel');
  const dropdownLabel = document.getElementById('contactDropdownLabel');
  const nativeSelect = document.querySelector('.contact__select-hidden');

  if (!dropdown || !dropdownPanel) return;

  const openDropdown = () => {
    dropdown.classList.add('open');
    dropdownPanel.classList.add('open');
    dropdown.setAttribute('aria-expanded', 'true');
  };
  const closeDropdown = () => {
    dropdown.classList.remove('open');
    dropdownPanel.classList.remove('open');
    dropdown.setAttribute('aria-expanded', 'false');
  };

  dropdown.addEventListener('click', () =>
    dropdownPanel.classList.contains('open') ? closeDropdown() : openDropdown()
  );

  dropdownPanel.querySelectorAll('.contact__dropdown-option').forEach(opt => {
    opt.addEventListener('click', () => {
      dropdownPanel.querySelectorAll('.contact__dropdown-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const value = opt.dataset.value;
      const text = opt.querySelector('.contact__dropdown-opt-label').textContent;
      dropdownLabel.innerHTML = `<span class="contact__dropdown-tag">${text}</span>`;
      dropdown.classList.add('has-value');
      if (nativeSelect) nativeSelect.value = value;
      closeDropdown();
    });
  });

  document.addEventListener('click', e => {
    if (!dropdown.closest('.contact__field--select').contains(e.target)) closeDropdown();
  });

  dropdown.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDropdown(); }
    if (e.key === 'Escape') closeDropdown();
  });
}