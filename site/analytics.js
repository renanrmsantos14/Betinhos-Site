(() => {
  "use strict";

  window.dataLayer = window.dataLayer || [];
  if (!window.__betinhosConsentDefault) {
    window.__betinhosConsentDefault = true;
    window.dataLayer.push(["consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    }]);
  }

  const language = () => document.documentElement.lang?.slice(0, 2) || "pt";
  const pagePath = () => window.location.pathname;
  const track = (event, params = {}) => {
    const safe = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== ""));
    window.dataLayer.push({ event, page_path: pagePath(), language: language(), ...safe });
  };

  const placementFor = (element) => element.dataset.placement || element.closest("header, main, footer, aside")?.className || "site";
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[href]");
    if (!link) return;
    const href = link.href || "";
    if (/wa\.me\//i.test(href)) track("generate_lead", { channel: "whatsapp", placement: placementFor(link), service_category: link.dataset.service || "executive_transport" });
    else if (href.startsWith("tel:")) track("generate_lead", { channel: "phone", placement: placementFor(link), service_category: link.dataset.service || "executive_transport" });
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (form.matches("#request-form")) {
      track("generate_lead", { channel: "quote_form", placement: form.dataset.placement || "contact_section", service_category: form.querySelector("[name='servico']")?.value || "executive_transport" });
    } else if (form.matches(".careers-form")) {
      track("career_application_submit");
    }
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-lang]");
    if (!button) return;
    const from = language();
    const to = button.dataset.lang;
    if (to && to !== from) track("language_change", { from_language: from, to_language: to });
  });

  window.BetinhosAnalytics = { track };
})();
