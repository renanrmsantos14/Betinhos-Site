(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktopVideo = matchMedia('(min-width: 900px)');
  const connection = navigator.connection;
  const video = document.querySelector('.hero-video');
  const loader = document.querySelector('.site-loader');
  const loadingStartedAt = performance.now();
  let loaderHidden = false;

  const hideLoader = () => {
    if (loaderHidden) return;
    loaderHidden = true;
    const remainingDelay = Math.max(0, 520 - (performance.now() - loadingStartedAt));
    setTimeout(() => {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-ready');
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
    }, remainingDelay);
  };

  addEventListener('load', hideLoader, { once: true });
  setTimeout(hideLoader, 2400);

  const canLoadVideo = () => (
    video &&
    desktopVideo.matches &&
    !reducedMotion.matches &&
    !connection?.saveData &&
    !['slow-2g', '2g'].includes(connection?.effectiveType)
  );

  const startVideo = () => {
    if (!canLoadVideo()) return;
    video.play().catch(() => {});
  };

  if (video) {
    if (!canLoadVideo()) {
      video.removeAttribute('preload');
      video.querySelector('source')?.removeAttribute('src');
      video.load();
    }

    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startVideo();
      else video.pause();
    }, { threshold: 0.12 });

    heroObserver.observe(video);
    video.addEventListener('canplay', hideLoader, { once: true });
    video.addEventListener('playing', () => {
      video.classList.add('is-playing');
      hideLoader();
    }, { once: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().bottom > 0) startVideo();
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  document.querySelectorAll(
    '.section-head, .legacy-content, .fleet-showcase article, .service-list article, .protection-copy, .protection-visual, .protocol-grid article, .office-photo, .office-copy, .footprint > div, .team-grid article, .trust > div, .contact > *'
  ).forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 3) * 70}ms`);
    revealObserver.observe(element);
  });

  const header = document.querySelector('.site-header');
  const syncHeader = () => header?.classList.toggle('is-scrolled', scrollY > 24);
  syncHeader();
  addEventListener('scroll', syncHeader, { passive: true });
})();
