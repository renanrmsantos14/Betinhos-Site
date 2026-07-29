(() => {
  const carousel = document.querySelector("[data-history-carousel]");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll("[data-history-slide]"));
  const dots = Array.from(carousel.querySelectorAll("[data-history-dot]"));
  const counter = carousel.querySelector(".history-carousel__counter");
  const previous = carousel.querySelector("[data-history-prev]");
  const next = carousel.querySelector("[data-history-next]");
  let activeIndex = 0;

  const selectSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });
    counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  };

  previous.addEventListener("click", () => selectSlide(activeIndex - 1));
  next.addEventListener("click", () => selectSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => selectSlide(index)));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") selectSlide(activeIndex - 1);
    if (event.key === "ArrowRight") selectSlide(activeIndex + 1);
    if (event.key === "Home") selectSlide(0);
    if (event.key === "End") selectSlide(slides.length - 1);
  });
})();
