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
      wheelTop: "52.18%",
      wheelSize: "13.4%",
      frontLeft: "15.07%",
      rearLeft: "70.81%",
      shadowTop: "65%",
    },
    {
      name: "commander",
      body: "/fleet/commander-2026/body.png",
      wheel: "/fleet/commander-2026/wheel.png",
      wheelTop: "64.2%",
      wheelSize: "11.5%",
      frontLeft: "16%",
      rearLeft: "70.2%",
      shadowTop: "76%",
    },
    {
      name: "master",
      body: "/fleet/master-2026/body.png",
      wheel: "/fleet/master-2026/wheel.png",
      wheelTop: "64.9%",
      wheelSize: "10.2%",
      frontLeft: "11.5%",
      rearLeft: "71.7%",
      shadowTop: "76%",
    },
    {
      name: "sprinter",
      body: "/fleet/sprinter-2026/body.png",
      wheel: "/fleet/sprinter-2026/wheel.png",
      wheelTop: "67.9%",
      wheelSize: "9.6%",
      frontLeft: "10.3%",
      rearLeft: "70.3%",
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

    article.addEventListener("click", () => {
      if (!coarsePointer.matches) return;
      const willActivate = !article.classList.contains("is-active");
      articles.forEach((item) => item.classList.remove("is-active"));
      article.classList.toggle("is-active", willActivate);
    });
  });
})();
