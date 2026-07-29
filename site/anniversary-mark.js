const ANNIVERSARY_ATTRIBUTES = [
  "years",
  "label",
  "message",
  "href",
  "link-label",
  "since",
  "values",
];

let anniversaryInstance = 0;

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  element.className = className;
  if (text) element.textContent = text;
  return element;
};

class BetinhosAnniversary extends HTMLElement {
  static observedAttributes = ANNIVERSARY_ATTRIBUTES;

  constructor() {
    super();
    anniversaryInstance += 1;
    this.instanceId = `betinhos-anniversary-${anniversaryInstance}`;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name, previousValue, nextValue) {
    if (previousValue !== nextValue && this.isConnected) this.render();
  }

  render() {
    const yearsValue = this.getAttribute("years")?.trim() || "40";
    const years = /^\d{1,4}$/.test(yearsValue) ? yearsValue : "40";
    const label = this.getAttribute("label")?.trim() || "ANOS EM OPERAÇÃO";
    const message = this.getAttribute("message")?.trim();
    const href = this.getAttribute("href")?.trim();
    const linkLabel = this.getAttribute("link-label")?.trim();
    const since = this.getAttribute("since")?.trim();
    const values = this.getAttribute("values")?.trim();

    const body = createElement("span", "anniversary-mark__body");
    const number = createElement("strong", "anniversary-mark__number");
    const content = createElement("span", "anniversary-mark__content");
    const labelElement = createElement("small", "anniversary-mark__label", label);
    const labelledBy = [];

    number.id = `${this.instanceId}-number`;
    number.setAttribute("aria-label", years);
    labelElement.id = `${this.instanceId}-label`;
    labelElement.setAttribute("aria-hidden", "true");

    years.split("").forEach((digit) => {
      const glyph = createElement("span", "anniversary-mark__glyph", digit);
      glyph.setAttribute("aria-hidden", "true");
      number.append(glyph);
    });
    number.append(labelElement);
    number.setAttribute("aria-label", `${years} ${label}`);
    labelledBy.push(number.id);

    if (since || values) {
      const signature = createElement("span", "anniversary-mark__signature");
      const route = createElement("span", "anniversary-mark__route");
      route.append(createElement("i", "anniversary-mark__route-line"));
      route.setAttribute("aria-hidden", "true");
      signature.append(route);

      if (since) {
        signature.append(
          createElement("span", "anniversary-mark__since", since),
        );
      }

      if (values) {
        signature.append(
          createElement("span", "anniversary-mark__values", values),
        );
      }

      content.append(signature);
    }

    if (message) {
      const messageElement = createElement(
        "span",
        "anniversary-mark__message",
        message,
      );
      messageElement.id = `${this.instanceId}-message`;
      labelledBy.push(messageElement.id);
      content.append(messageElement);
    }

    if (href && linkLabel) {
      const link = createElement("a", "anniversary-mark__link", linkLabel);
      const arrow = createElement("span", "anniversary-mark__arrow", "↘");
      link.href = href;
      arrow.setAttribute("aria-hidden", "true");
      link.append(arrow);
      content.append(link);
    }

    body.append(number);
    if (content.childElementCount > 0) body.append(content);
    this.replaceChildren(body);
    this.classList.add("anniversary-mark");
    this.setAttribute("role", "group");
    this.setAttribute("aria-labelledby", labelledBy.join(" "));
    this.dataset.ready = "true";
  }
}

if (!customElements.get("betinhos-anniversary")) {
  customElements.define("betinhos-anniversary", BetinhosAnniversary);
}
