(() => {
  const stage = document.querySelector(".fleet-stage");
  if (!stage) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let revealed = false;

  const reveal = async () => {
    if (revealed) return;
    revealed = true;

    const images = Array.from(stage.querySelectorAll("img"));
    await Promise.all(
      images.map((image) => {
        if (image.complete) return Promise.resolve();
        if (typeof image.decode === "function") {
          return image.decode().catch(() => undefined);
        }
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }),
    );

    requestAnimationFrame(() => stage.classList.add("is-visible"));
  };

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    reveal();
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      reveal();
    },
    {
      rootMargin: "0px 0px -8%",
      threshold: 0.18,
    },
  );

  observer.observe(stage);
})();
