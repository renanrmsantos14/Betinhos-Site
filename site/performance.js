(() => {
  const hydrate = () => import('/assets/index-CoPFL3Sw.js').catch(() => {});

  const loadHeroVideo = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const video = document.querySelector('.hero-video');
    const source = video?.querySelector('source[data-src]');
    if (!source) return;

    source.src = source.dataset.src;
    video.load();
    video.play().catch(() => {});
  };

  addEventListener('load', () => {
    hydrate();
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadHeroVideo, { timeout: 3500 });
    } else {
      setTimeout(loadHeroVideo, 1200);
    }
  }, { once: true });
})();
