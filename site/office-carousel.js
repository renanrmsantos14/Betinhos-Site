(() => {
  const carousel = document.querySelector("[data-office-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-office-slide]"));
  const tabs = Array.from(carousel.querySelectorAll("[data-office-dot]"));
  const counter = carousel.querySelector("[data-office-counter]");
  const previous = carousel.querySelector("[data-office-prev]");
  const next = carousel.querySelector("[data-office-next]");
  if (!slides.length || !previous || !next) return;

  let activeIndex = 0;
  let pointerStartX = null;

  const selectSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      if ("inert" in slide) slide.inert = !isActive;
    });
    tabs.forEach((tab, tabIndex) => {
      const isActive = tabIndex === activeIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    if (counter) counter.textContent = String(activeIndex + 1).padStart(2, "0");
  };

  previous.addEventListener("click", () => selectSlide(activeIndex - 1));
  next.addEventListener("click", () => selectSlide(activeIndex + 1));
  tabs.forEach((tab, index) => tab.addEventListener("click", () => selectSlide(index)));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
      if (event.target.matches("[data-office-dot]")) tabs[activeIndex]?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      selectSlide(event.key === "Home" ? 0 : slides.length - 1);
      if (event.target.matches("[data-office-dot]")) tabs[activeIndex]?.focus();
    }
  });

  carousel.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    pointerStartX = event.clientX;
    carousel.setPointerCapture?.(event.pointerId);
  });
  carousel.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(distance) >= 48) selectSlide(activeIndex + (distance < 0 ? 1 : -1));
  });
  carousel.addEventListener("pointercancel", () => { pointerStartX = null; });
  selectSlide(0);
})();
