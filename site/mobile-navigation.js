(() => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const close = document.querySelector('.mobile-menu-close');
  if (!toggle || !menu || !close) return;

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('mobile-menu-open', open);
    if (open) close.focus();
    else toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  close.addEventListener('click', () => setOpen(false));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
  });
})();
