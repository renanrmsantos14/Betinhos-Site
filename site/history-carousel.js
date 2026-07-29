(() => {
  const carousel = document.querySelector("[data-history-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-history-slide]"));
  const dots = Array.from(carousel.querySelectorAll("[data-history-dot]"));
  const counter = carousel.querySelector(".history-carousel__counter");
  const previous = carousel.querySelector("[data-history-prev]");
  const next = carousel.querySelector("[data-history-next]");

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

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
      dot.tabIndex = isActive ? 0 : -1;
    });

    if (counter) {
      counter.textContent =
        `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    }
  };

  previous.addEventListener("click", () => selectSlide(activeIndex - 1));
  next.addEventListener("click", () => selectSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => selectSlide(index)));

  carousel.addEventListener("keydown", (event) => {
    const moveTabFocus = event.target.matches("[data-history-dot]");

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(activeIndex - 1);
      if (moveTabFocus) dots[activeIndex]?.focus();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(activeIndex + 1);
      if (moveTabFocus) dots[activeIndex]?.focus();
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectSlide(0);
      if (moveTabFocus) dots[activeIndex]?.focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      selectSlide(slides.length - 1);
      if (moveTabFocus) dots[activeIndex]?.focus();
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

    if (Math.abs(distance) < 48) return;
    selectSlide(activeIndex + (distance < 0 ? 1 : -1));
  });

  carousel.addEventListener("pointercancel", () => {
    pointerStartX = null;
  });

  selectSlide(0);
})();
