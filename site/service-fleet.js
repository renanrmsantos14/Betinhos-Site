const FLEET_VEHICLE_ORDER = ["commander", "corolla", "sprinter", "master", "virtus"];

const initializeServiceFleet = () => {
  const track = document.querySelector("#servicos-frota");
  const previous = document.querySelector(".fleet-catalog-prev");
  const next = document.querySelector(".fleet-catalog-next");
  if (!track || !previous || !next) return;

  const cardsByVehicle = new Map(
    Array.from(track.querySelectorAll(".service-card")).map((card) => [
      card.dataset.vehicle,
      card,
    ]),
  );
  const cards = FLEET_VEHICLE_ORDER
    .map((vehicle) => cardsByVehicle.get(vehicle))
    .filter(Boolean);
  cards.forEach((card) => track.append(card));

  const filters = Array.from(document.querySelectorAll("[data-fleet-filter]"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let frame = 0;

  const visibleCards = () => cards.filter((card) => !card.hidden);

  const update = () => {
    const activeCards = visibleCards();
    if (!activeCards.length) return;

    const trackBounds = track.getBoundingClientRect();
    const trackCenter = trackBounds.left + trackBounds.width / 2;
    activeIndex = activeCards.reduce((closest, card, index) => {
      const currentBounds = card.getBoundingClientRect();
      const closestBounds = activeCards[closest].getBoundingClientRect();
      const currentDistance = Math.abs(currentBounds.left + currentBounds.width / 2 - trackCenter);
      const closestDistance = Math.abs(
        closestBounds.left + closestBounds.width / 2 - trackCenter,
      );
      return currentDistance < closestDistance ? index : closest;
    }, 0);

    cards.forEach((card) => card.removeAttribute("aria-current"));
    activeCards.forEach((card, index) => {
      if (index === activeIndex) card.setAttribute("aria-current", "true");
    });

    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === activeCards.length - 1;
  };

  const moveTo = (index, behavior = reducedMotion.matches ? "auto" : "smooth") => {
    const activeCards = visibleCards();
    const targetIndex = Math.max(0, Math.min(activeCards.length - 1, index));
    const target = activeCards[targetIndex];
    if (!target) return;

    track.scrollTo({
      left:
        target.offsetLeft -
        track.offsetLeft -
        (track.clientWidth - target.clientWidth) / 2,
      behavior,
    });
  };

  previous.addEventListener("click", () => moveTo(activeIndex - 1));
  next.addEventListener("click", () => moveTo(activeIndex + 1));

  const selectFilter = (filter, behavior) => {
    const group = filter.dataset.fleetFilter;
    cards.forEach((card) => {
      const groups = card.dataset.fleetGroups?.split(" ") || [];
      card.hidden = group !== "all" && !groups.includes(group);
    });

    filters.forEach((item) => {
      const isActive = item === filter;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    activeIndex = 0;
    moveTo(0, behavior);
    requestAnimationFrame(update);
  };

  filters.forEach((filter, index) => {
    filter.addEventListener("click", () => selectFilter(filter));
    filter.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const target = filters[(index + direction + filters.length) % filters.length];
      target.focus();
      selectFilter(target);
    });
  });

  track.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    },
    { passive: true },
  );

  window.addEventListener("resize", update, { passive: true });
  selectFilter(filters[0], "auto");
  window.addEventListener(
    "pageshow",
    () => window.setTimeout(() => moveTo(0, "auto"), 120),
    { once: true },
  );
};

initializeServiceFleet();
