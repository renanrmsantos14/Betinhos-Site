(() => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  const close = document.querySelector('.mobile-menu-close');
  if (!toggle || !menu || !close) return;

  const backgroundTargets = [
    ...document.querySelectorAll('main > section:not(.hero), main > footer'),
    document.querySelector('.hero-video'),
    document.querySelector('.hero-copy'),
    document.querySelector('.hero-scroll-cue'),
    document.querySelector('.hero-bottom'),
    document.querySelector('.whatsapp-widget'),
  ].filter(Boolean);
  const desktopBreakpoint = window.matchMedia('(min-width: 1051px)');

  const setOpen = (open, { restoreFocus = true } = {}) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.inert = open;
    backgroundTargets.forEach((element) => {
      element.inert = open;
    });
    document.body.classList.toggle('mobile-menu-open', open);
    if (open) close.focus();
    else if (restoreFocus && toggle.offsetParent !== null) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  close.addEventListener('click', () => setOpen(false));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (!menu.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = [...menu.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter((element) => element.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  desktopBreakpoint.addEventListener('change', (event) => {
    if (event.matches && menu.classList.contains('is-open')) {
      setOpen(false, { restoreFocus: false });
    }
  });
})();
