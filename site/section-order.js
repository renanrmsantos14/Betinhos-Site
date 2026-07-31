document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const careers = document.querySelector("#trabalhe-conosco");
  const footer = main?.querySelector("footer");

  if (main && careers && footer) {
    main.insertBefore(careers, footer);
  }
});
