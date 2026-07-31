const translations = {
  pt: {
    pageTitle: "Comparação de cores — 40 anos | Betinhos",
    homeLabel: "Betinhos — página inicial",
    langLabel: "Idioma",
    modelsLabel: "Modelos de cor",
    eyebrow: "Comparação de cor",
    title: "A mesma assinatura.<br>Duas leituras.",
    darkTitle: "Número dourado<br>ANOS branco",
    lightTitle: "Número azul<br>ANOS dourado",
    darkMarkLabel: "40 anos, número dourado e texto branco",
    lightMarkLabel: "40 anos, número azul e texto dourado",
  },
  en: {
    pageTitle: "Color comparison — 40 years | Betinhos",
    homeLabel: "Betinhos — home page",
    langLabel: "Language",
    modelsLabel: "Color models",
    eyebrow: "Color comparison",
    title: "One signature.<br>Two readings.",
    darkTitle: "Gold number<br>White YEARS",
    lightTitle: "Blue number<br>Gold YEARS",
    darkMarkLabel: "40 years, gold number and white text",
    lightMarkLabel: "40 years, blue number and gold text",
  },
  es: {
    pageTitle: "Comparación de colores — 40 años | Betinhos",
    homeLabel: "Betinhos — página de inicio",
    langLabel: "Idioma",
    modelsLabel: "Modelos de color",
    eyebrow: "Comparación de color",
    title: "Una firma.<br>Dos lecturas.",
    darkTitle: "Número dorado<br>AÑOS blanco",
    lightTitle: "Número azul<br>AÑOS dorado",
    darkMarkLabel: "40 años, número dorado y texto blanco",
    lightMarkLabel: "40 años, número azul y texto dorado",
  },
};

const anniversaryWords = { pt: "ANOS", en: "YEARS", es: "AÑOS" };
const languageButtons = [...document.querySelectorAll("[data-lang]")];

function setLanguage(language, historyMode = "replace") {
  const dictionary = translations[language] || translations.pt;
  document.documentElement.lang = language === "pt" ? "pt-BR" : language;
  document.title = dictionary.pageTitle;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.innerHTML = dictionary[element.dataset.i18n];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", dictionary[element.dataset.i18nAria]);
  });

  document.querySelectorAll(".anniversary-cut").forEach((element) => {
    element.textContent = anniversaryWords[language];
  });

  languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === language));
  });

  localStorage.setItem("betinhos-anniversary-color-language", language);
  history[`${historyMode}State`](null, "", `?lang=${language}`);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang, "push"));
});

const requestedLanguage = new URLSearchParams(location.search).get("lang");
const savedLanguage = localStorage.getItem("betinhos-anniversary-color-language");
setLanguage(translations[requestedLanguage] ? requestedLanguage : translations[savedLanguage] ? savedLanguage : "pt");

addEventListener("popstate", () => {
  const language = new URLSearchParams(location.search).get("lang");
  setLanguage(translations[language] ? language : "pt");
});
