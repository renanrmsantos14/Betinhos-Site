(() => {
  const track = document.querySelector("#servicos-frota");
  const previous = document.querySelector(".fleet-catalog-prev");
  const next = document.querySelector(".fleet-catalog-next");
  if (!track || !previous || !next) return;

  const cards = Array.from(track.querySelectorAll(".service-card"));
  let activeIndex = 0;
  let frame = 0;

  const update = () => {
    const trackBounds = track.getBoundingClientRect();
    const trackCenter = trackBounds.left + trackBounds.width / 2;
    activeIndex = cards.reduce((closest, card, index) => {
      const currentBounds = card.getBoundingClientRect();
      const closestBounds = cards[closest].getBoundingClientRect();
      const currentDistance = Math.abs(currentBounds.left + currentBounds.width / 2 - trackCenter);
      const closestDistance = Math.abs(
        closestBounds.left + closestBounds.width / 2 - trackCenter,
      );
      return currentDistance < closestDistance ? index : closest;
    }, 0);

    cards.forEach((card, index) => {
      if (index === activeIndex) card.setAttribute("aria-current", "true");
      else card.removeAttribute("aria-current");
    });

    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === cards.length - 1;
  };

  const moveTo = (index) => {
    const targetIndex = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollTo({
      left:
        cards[targetIndex].offsetLeft -
        track.offsetLeft -
        (track.clientWidth - cards[targetIndex].clientWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  previous.addEventListener("click", () => moveTo(activeIndex - 1));
  next.addEventListener("click", () => moveTo(activeIndex + 1));

  track.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    },
    { passive: true },
  );

  window.addEventListener("resize", update, { passive: true });
  update();
})();
