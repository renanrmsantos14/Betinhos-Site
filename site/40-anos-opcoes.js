const translations = {
  pt: {
    pageTitle: "Estudos 40 anos | Betinhos",
    description: "Quatro estudos visuais para a marca de 40 anos da Betinhos.",
    homeLabel: "Betinhos — página inicial",
    langLabel: "Idioma",
    optionsLabel: "Opções de design",
    markLabel: "40 anos",
    eyebrow: "Estudos de identidade comemorativa",
    title: "Quatro cortes.<br>Uma mesma história.",
    intro: "Quatro direções para o marco de 40 anos. Todas preservam o corte de “ANOS” atravessando o número.",
    oneName: "Corte de rota",
    oneText: "O traço vira percurso. Mais próximo da linguagem de mobilidade da marca.",
    twoName: "Janela editorial",
    twoText: "Uma faixa limpa interrompe o volume do número e aumenta a leitura em tamanhos menores.",
    threeName: "Eixo vertical",
    threeText: "“ANOS” corta o zero na vertical. A assinatura fica compacta, firme e institucional.",
    fourName: "Travessia",
    fourText: "A palavra cruza os dois algarismos em diagonal. Opção mais expressiva e comemorativa.",
    footer: "Selecione uma direção para desenvolver.",
    back: "Voltar ao site",
  },
  en: {
    pageTitle: "40-year studies | Betinhos",
    description: "Four visual studies for Betinhos’ 40-year anniversary mark.",
    homeLabel: "Betinhos — home page",
    langLabel: "Language",
    optionsLabel: "Design options",
    markLabel: "40 years",
    eyebrow: "Anniversary identity studies",
    title: "Four cuts.<br>One shared history.",
    intro: "Four directions for the 40-year milestone. Each keeps “YEARS” cutting through the number.",
    oneName: "Route cut",
    oneText: "The line becomes a route, bringing the mark closer to the brand’s mobility language.",
    twoName: "Editorial window",
    twoText: "A clean band interrupts the number and improves legibility at smaller sizes.",
    threeName: "Vertical axis",
    threeText: "“YEARS” cuts vertically through the zero. Compact, firm and institutional.",
    fourName: "Crossing",
    fourText: "The word crosses both digits diagonally. The most expressive anniversary direction.",
    footer: "Select one direction to develop.",
    back: "Back to website",
  },
  es: {
    pageTitle: "Estudios de 40 años | Betinhos",
    description: "Cuatro estudios visuales para la marca de 40 años de Betinhos.",
    homeLabel: "Betinhos — página de inicio",
    langLabel: "Idioma",
    optionsLabel: "Opciones de diseño",
    markLabel: "40 años",
    eyebrow: "Estudios de identidad conmemorativa",
    title: "Cuatro cortes.<br>Una misma historia.",
    intro: "Cuatro direcciones para el hito de 40 años. Todas mantienen “AÑOS” cortando el número.",
    oneName: "Corte de ruta",
    oneText: "La línea se convierte en recorrido y acerca la marca al lenguaje de movilidad.",
    twoName: "Ventana editorial",
    twoText: "Una franja limpia interrumpe el número y mejora la lectura en tamaños menores.",
    threeName: "Eje vertical",
    threeText: "“AÑOS” corta el cero en vertical. Una firma compacta, firme e institucional.",
    fourName: "Travesía",
    fourText: "La palabra cruza ambos dígitos en diagonal. La opción más expresiva y conmemorativa.",
    footer: "Seleccione una dirección para desarrollar.",
    back: "Volver al sitio",
  },
};

const labels = { pt: "ANOS", en: "YEARS", es: "AÑOS" };
const buttons = [...document.querySelectorAll("[data-lang]")];

function setLanguage(language, historyMode = "replace") {
  const dictionary = translations[language] || translations.pt;
  document.documentElement.lang = language === "pt" ? "pt-BR" : language;
  document.title = dictionary.pageTitle;
  document.querySelector('meta[name="description"]').content = dictionary.description;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.innerHTML = dictionary[element.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAria]);
  });
  document.querySelectorAll(".cut").forEach((element) => {
    element.textContent = labels[language];
  });
  buttons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === language));
  });
  localStorage.setItem("betinhos-anniversary-language", language);
  history[`${historyMode}State`](null, "", `?lang=${language}`);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang, "push"));
});

const requestedLanguage = new URLSearchParams(location.search).get("lang");
const savedLanguage = localStorage.getItem("betinhos-anniversary-language");
setLanguage(translations[requestedLanguage] ? requestedLanguage : translations[savedLanguage] ? savedLanguage : "pt");

addEventListener("popstate", () => {
  const language = new URLSearchParams(location.search).get("lang");
  setLanguage(translations[language] ? language : "pt");
});
