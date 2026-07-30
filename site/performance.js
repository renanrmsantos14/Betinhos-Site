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
    const remainingDelay = Math.max(0, 1000 - (performance.now() - loadingStartedAt));
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
      video.querySelectorAll('source').forEach((item) => item.removeAttribute('src'));
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
    '.section-head, .legacy-content, .company-intro__visual, .company-intro__story, .company-intro__services li, .fleet-showcase article, .service-list article, .protection-copy, .protection-visual, .office-photo, .office-copy, .team-grid article, .trust > div, .google-reviews > *, .faq-intro, .faq-list details, .contact > *, footer > *'
  ).forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 3) * 70}ms`);
    revealObserver.observe(element);
  });

  document.querySelectorAll(
    '.company-intro__visual, .fleet-showcase article, .protection-visual, .office-photo, .team-grid article > div'
  ).forEach((element) => element.classList.add('reveal-media'));

  const header = document.querySelector('.site-header');
  const syncHeader = () => header?.classList.toggle('is-scrolled', scrollY > 24);
  syncHeader();
  addEventListener('scroll', syncHeader, { passive: true });

  const journey = document.querySelector('.security-journey');
  if (journey) {
    const steps = [...journey.querySelectorAll('[data-journey-step]')];
    const timers = [];
    let hasPlayed = false;

    const showAllSteps = () => steps.forEach((step) => step.classList.add('is-active'));

    const playJourney = () => {
      if (hasPlayed) return;
      hasPlayed = true;
      journey.classList.add('is-journey-visible');

      if (reducedMotion.matches) {
        showAllSteps();
        return;
      }

      steps.forEach((step, index) => {
        timers.push(setTimeout(() => step.classList.add('is-active'), 180 + index * 70));
      });
    };

    const journeyObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      playJourney();
      journeyObserver.disconnect();
    }, { rootMargin: '0px 0px -18% 0px', threshold: 0.16 });

    journeyObserver.observe(journey);
    reducedMotion.addEventListener('change', () => {
      if (!reducedMotion.matches) return;
      timers.forEach(clearTimeout);
      playJourney();
      showAllSteps();
    });
  }
})();
