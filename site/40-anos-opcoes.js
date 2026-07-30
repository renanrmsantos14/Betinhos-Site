const translations = {
  pt: {
    pageTitle: "Proposta 40 anos | Betinhos",
    description: "Proposta autoral para a marca de 40 anos da Betinhos.",
    homeLabel: "Betinhos, página inicial",
    langLabel: "Idioma",
    stageLabel: "Proposta principal",
    applicationsLabel: "Aplicações da marca",
    markLabel: "40 anos",
    eyebrow: "Identidade comemorativa",
    title: "Uma marca.<br>Quarenta anos.",
    intro: "Uma assinatura compacta: o número permanece inteiro e “ANOS” atravessa o conjunto como uma janela.",
    conceptTitle: "Inteiro no primeiro olhar.",
    conceptText: "O corte cria personalidade sem desmontar o símbolo. O zero mantém sua forma, o quatro preserva a leitura e a assinatura funciona grande ou pequena.",
    applicationsEyebrow: "Sistema, não efeito",
    applicationsTitle: "A mesma assinatura.<br>Quatro contextos.",
    primaryUse: "Assinatura principal",
    inverseUse: "Versão clara",
    horizontalUse: "Com a marca Betinhos",
    microUse: "Escala reduzida",
    microNote: "Leitura preservada em 96 px",
    footer: "Proposta autoral para os 40 anos da Betinhos.",
    back: "Voltar ao site",
  },
  en: {
    pageTitle: "40-year proposal | Betinhos",
    description: "Original proposal for Betinhos’ 40-year anniversary mark.",
    homeLabel: "Betinhos, home page",
    langLabel: "Language",
    stageLabel: "Main proposal",
    applicationsLabel: "Brand applications",
    markLabel: "40 years",
    eyebrow: "Anniversary identity",
    title: "One mark.<br>Forty years.",
    intro: "A compact signature: the number stays whole while “YEARS” crosses it like a precise window.",
    conceptTitle: "Whole at first sight.",
    conceptText: "The cut adds character without taking the symbol apart. The zero keeps its form, the four stays legible and the signature works large or small.",
    applicationsEyebrow: "A system, not an effect",
    applicationsTitle: "One signature.<br>Four contexts.",
    primaryUse: "Primary signature",
    inverseUse: "Light version",
    horizontalUse: "With the Betinhos brand",
    microUse: "Reduced scale",
    microNote: "Legibility preserved at 96 px",
    footer: "Original proposal for Betinhos’ 40 years.",
    back: "Back to website",
  },
  es: {
    pageTitle: "Propuesta 40 años | Betinhos",
    description: "Propuesta original para la marca de 40 años de Betinhos.",
    homeLabel: "Betinhos, página de inicio",
    langLabel: "Idioma",
    stageLabel: "Propuesta principal",
    applicationsLabel: "Aplicaciones de la marca",
    markLabel: "40 años",
    eyebrow: "Identidad conmemorativa",
    title: "Una marca.<br>Cuarenta años.",
    intro: "Una firma compacta: el número permanece entero y “AÑOS” atraviesa el conjunto como una ventana precisa.",
    conceptTitle: "Entero a primera vista.",
    conceptText: "El corte aporta personalidad sin desmontar el símbolo. El cero mantiene su forma, el cuatro conserva la lectura y la firma funciona grande o pequeña.",
    applicationsEyebrow: "Un sistema, no un efecto",
    applicationsTitle: "Una firma.<br>Cuatro contextos.",
    primaryUse: "Firma principal",
    inverseUse: "Versión clara",
    horizontalUse: "Con la marca Betinhos",
    microUse: "Escala reducida",
    microNote: "Lectura preservada en 96 px",
    footer: "Propuesta original para los 40 años de Betinhos.",
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
  document.querySelectorAll(".anniversary-cut").forEach((element) => {
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
