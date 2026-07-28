(() => {
  const list = document.querySelector(".service-list");
  const template = document.querySelector("#service-vehicle-template");
  if (!list || !template) return;

  const articles = Array.from(list.querySelectorAll("article"));
  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
  const vehicles = [
    {
      name: "corolla",
      body: "/fleet/corolla-2026/corolla-2026-base-vidros-transparentes.png",
      wheel: "/fleet/corolla-2026/corolla-2026-roda.png",
      wheelTop: "54.1%",
      wheelSize: "13.4%",
      frontLeft: "15.6%",
      rearLeft: "70.85%",
      shadowTop: "65%",
    },
    {
      name: "commander",
      body: "/fleet/commander-2026/body.png",
      wheel: "/fleet/commander-2026/wheel.png",
      wheelTop: "62.5%",
      wheelSize: "13.4%",
      frontLeft: "15.85%",
      rearLeft: "69.8%",
      shadowTop: "76%",
    },
    {
      name: "master",
      body: "/fleet/master-2026/body.png",
      wheel: "/fleet/master-2026/wheel.png",
      wheelTop: "63.8%",
      wheelSize: "11.8%",
      frontLeft: "11.2%",
      rearLeft: "71.05%",
      shadowTop: "76%",
    },
    {
      name: "sprinter",
      body: "/fleet/sprinter-2026/body.png",
      wheel: "/fleet/sprinter-2026/wheel.png",
      wheelTop: "66%",
      wheelSize: "11.3%",
      frontLeft: "9.9%",
      rearLeft: "69.7%",
      shadowTop: "77%",
    },
  ];
  const articleVehicles = [
    vehicles[0],
    vehicles[1],
    vehicles[2],
    vehicles[3],
    vehicles[0],
    vehicles[1],
  ];

  articles.forEach((article, index) => {
    article.append(template.content.cloneNode(true));
    const vehicle = articleVehicles[index];
    const car = article.querySelector(".service-car");
    car.dataset.vehicle = vehicle.name;
    car.style.setProperty("--wheel-top", vehicle.wheelTop);
    car.style.setProperty("--wheel-size", vehicle.wheelSize);
    car.style.setProperty("--wheel-front-left", vehicle.frontLeft);
    car.style.setProperty("--wheel-rear-left", vehicle.rearLeft);
    car.style.setProperty("--shadow-top", vehicle.shadowTop);
    article.querySelector(".service-car-body").src = vehicle.body;
    article.querySelectorAll(".service-car-wheel").forEach((wheel) => {
      wheel.src = vehicle.wheel;
    });
  });

  if (!coarsePointer.matches) return;

  if (!("IntersectionObserver" in window)) {
    articles.forEach((article) => article.classList.add("is-active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-active");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -4%",
      threshold: 0.08,
    },
  );

  articles.forEach((article) => observer.observe(article));
})();
