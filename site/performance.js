(() => {
  const MINIMUM_LOADER_MS = 1000;
  const VIDEO_READY_TIMEOUT_MS = 8000;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktopVideo = matchMedia('(min-width: 900px)');
  const connection = navigator.connection;
  const video = document.querySelector('.hero-video');
  const loader = document.querySelector('.site-loader');
  const loadingStartedAt = performance.now();
  let loaderHidden = false;

  const waitForEvent = (target, eventName) => new Promise((resolve) => {
    target.addEventListener(eventName, resolve, { once: true });
  });

  const waitForPage = document.readyState === 'complete'
    ? Promise.resolve()
    : waitForEvent(window, 'load');
  const waitForFonts = document.fonts?.ready?.catch(() => {}) || Promise.resolve();

  const hideLoader = () => {
    if (loaderHidden) return;
    loaderHidden = true;
    const remainingDelay = Math.max(0, MINIMUM_LOADER_MS - (performance.now() - loadingStartedAt));
    setTimeout(() => {
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-ready');
      if (!loader) return;
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
      setTimeout(() => loader.remove(), 400);
    }, remainingDelay);
  };

  const canLoadVideo = () => (
    video
    && desktopVideo.matches
    && !reducedMotion.matches
    && !connection?.saveData
    && !['slow-2g', '2g'].includes(connection?.effectiveType)
  );

  const prepareVideo = () => {
    if (!canLoadVideo()) return Promise.resolve();

    video.querySelectorAll('source[data-src]').forEach((source) => {
      source.src = source.dataset.src;
    });
    video.preload = 'auto';
    video.load();

    return Promise.race([
      Promise.race([waitForEvent(video, 'canplay'), waitForEvent(video, 'error')]),
      new Promise((resolve) => setTimeout(resolve, VIDEO_READY_TIMEOUT_MS)),
    ]);
  };

  const videoReady = prepareVideo();
  Promise.all([waitForPage, waitForFonts, videoReady]).then(hideLoader);

  const startVideo = () => {
    if (!canLoadVideo()) return;
    video.play().catch(() => {});
  };

  if (video) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startVideo();
      else video.pause();
    }, { threshold: 0.12 });

    heroObserver.observe(video);
    video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) video.pause();
      else if (video.getBoundingClientRect().bottom > 0) startVideo();
    });
  }

  const loadDeferredImage = (image) => {
    if (image.dataset.lazySrcset) image.srcset = image.dataset.lazySrcset;
    if (image.dataset.lazySrc) image.src = image.dataset.lazySrc;
    image.removeAttribute('data-lazy-src');
    image.removeAttribute('data-lazy-srcset');
  };

  const deferredImages = document.querySelectorAll('img[data-lazy-src]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadDeferredImage(entry.target);
        imageObserver.unobserve(entry.target);
      });
    }, { rootMargin: '480px 0px', threshold: 0.01 });
    deferredImages.forEach((image) => imageObserver.observe(image));
  } else {
    deferredImages.forEach(loadDeferredImage);
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  document.querySelectorAll(
    '.section-head, .legacy-content, .company-intro__visual, .company-intro__story, .company-intro__services li, .fleet-showcase article, .service-list article, .protection-copy, .protection-visual, .office-photo, .office-copy, .team-grid article, .google-reviews > *, .faq-intro, .faq-list details, .contact > *, footer > *'
  ).forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 3) * 70}ms`);
    revealObserver.observe(element);
  });

  document.querySelectorAll(
    '.company-intro__visual, .fleet-showcase article, .protection-visual, .office-photo, .team-grid article > div'
  ).forEach((element) => element.classList.add('reveal-media'));

  const header = document.querySelector('.site-header');
  let headerFrame = 0;
  const syncHeader = () => {
    headerFrame = 0;
    header?.classList.toggle('is-scrolled', scrollY > 24);
  };
  syncHeader();
  addEventListener('scroll', () => {
    if (!headerFrame) headerFrame = requestAnimationFrame(syncHeader);
  }, { passive: true });

  const readinessPanel = document.querySelector('.readiness-panel');
  if (readinessPanel) {
    const stages = [...readinessPanel.querySelectorAll('[data-readiness-stage]')];
    const timers = [];
    let hasPlayed = false;

    const showAllStages = () => stages.forEach((stage) => stage.classList.add('is-ready'));
    const playReadiness = () => {
      if (hasPlayed) return;
      hasPlayed = true;
      readinessPanel.classList.add('is-readiness-visible');

      if (reducedMotion.matches) {
        showAllStages();
        return;
      }
      stages.forEach((stage, index) => {
        timers.push(setTimeout(() => stage.classList.add('is-ready'), 160 + index * 120));
      });
    };

    const readinessObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      playReadiness();
      readinessObserver.disconnect();
    }, { rootMargin: '0px 0px -18% 0px', threshold: 0.16 });

    readinessObserver.observe(readinessPanel);
    reducedMotion.addEventListener('change', () => {
      if (!reducedMotion.matches) return;
      timers.forEach(clearTimeout);
      playReadiness();
      showAllStages();
    });
  }
})();
