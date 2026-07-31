import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { after, before, test } from "node:test";
import { chromium } from "playwright";
import { createServer } from "vite";

const PORT = 41730;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const browserCandidates = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

let browser;
let server;

before(async () => {
  const executablePath = browserCandidates.find(existsSync);
  assert.ok(executablePath, "Chrome or Edge must be installed to run the mobile audit");

  server = await createServer({
    root: "site",
    server: { host: "127.0.0.1", port: PORT, strictPort: true },
    logLevel: "silent",
  });
  await server.listen();
  browser = await chromium.launch({ headless: true, executablePath });
});

after(async () => {
  await browser?.close();
  await server?.close();
});

async function openMobilePage(
  viewport = { width: 390, height: 844 },
  options = {},
) {
  const context = await browser.newContext({
    viewport,
    hasTouch: true,
    isMobile: true,
    ...options,
  });
  await context.route(
    (url) => !url.toString().startsWith(BASE_URL),
    (route) => route.abort(),
  );
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/?lang=pt`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1_100);
  return { context, page };
}

test("mobile menu remains fully reachable in short landscape viewports", async () => {
  const { context, page } = await openMobilePage({ width: 667, height: 375 });
  await page.locator(".mobile-menu-toggle").click();

  const menuState = await page.locator("#mobile-menu").evaluate((menu) => {
    const footer = menu.querySelector(".mobile-menu-footer");
    const before = menu.scrollTop;
    menu.scrollTop = menu.scrollHeight;
    const footerRect = footer.getBoundingClientRect();

    return {
      overflowY: getComputedStyle(menu).overflowY,
      canScroll: menu.scrollTop > before,
      footerVisible: footerRect.top < innerHeight && footerRect.bottom > 0,
    };
  });

  assert.match(menuState.overflowY, /auto|scroll/);
  assert.equal(menuState.canScroll, true);
  assert.equal(menuState.footerVisible, true);
  await context.close();
});

test("mobile menu manages focus, hidden interactivity and breakpoint changes", async () => {
  const { context, page } = await openMobilePage();
  const menu = page.locator("#mobile-menu");
  const toggle = page.locator(".mobile-menu-toggle");
  const close = page.locator(".mobile-menu-close");

  assert.equal(await menu.getAttribute("inert"), "");
  await toggle.click();
  assert.equal(await menu.getAttribute("inert"), null);
  assert.equal(
    await page.locator("main > section:not(.hero)").first().getAttribute("inert"),
    "",
  );
  assert.equal(await page.evaluate(() => document.activeElement?.className), "mobile-menu-close");
  await page.keyboard.press("Shift+Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement?.dataset.lang),
    "es",
  );

  await close.click();
  assert.equal(await menu.getAttribute("inert"), "");
  assert.equal(
    await page.evaluate(() => document.activeElement?.className),
    "mobile-menu-toggle",
  );

  await toggle.click();
  await page.setViewportSize({ width: 1100, height: 700 });
  await page.waitForTimeout(50);
  assert.equal(await page.locator("body").getAttribute("class").then((value) => value.includes("mobile-menu-open")), false);
  assert.equal(await menu.getAttribute("aria-hidden"), "true");
  await context.close();
});

test("tablet header keeps primary navigation available", async () => {
  const { context, page } = await openMobilePage({
    width: 768,
    height: 1024,
  });

  assert.equal(await page.locator(".mobile-menu-toggle").isVisible(), true);
  await page.locator(".mobile-menu-toggle").click();
  assert.equal(await page.locator(".mobile-menu-nav").isVisible(), true);
  await context.close();
});

test("mobile landmarks, language controls and forms have accessible names", async () => {
  const { context, page } = await openMobilePage();

  assert.equal(await page.locator("a.skip-link[href='#main-content']").count(), 1);
  assert.equal(await page.locator(".site-header[role='banner']").count(), 1);
  assert.equal(await page.locator(".site-footer[role='contentinfo']").count(), 1);
  assert.equal(await page.locator(".lang-switch[role='group']").count(), 2);
  assert.equal(
    await page.locator(".careers-form").getAttribute("aria-labelledby"),
    "careers-title",
  );
  assert.equal(
    await page.locator(".request-form").getAttribute("aria-labelledby"),
    "contact-title",
  );
  await context.close();
});

test("primary hero action remains visible in phone landscape", async () => {
  const { context, page } = await openMobilePage({ width: 667, height: 375 });
  const geometry = await page.evaluate(() => {
    const header = document.querySelector(".site-header").getBoundingClientRect();
    const heading = document.querySelector(".hero-copy h1").getBoundingClientRect();
    const primary = document
      .querySelector(".hero-actions a:first-child")
      .getBoundingClientRect();
    return {
      headingTop: heading.top,
      headerBottom: header.bottom,
      primaryBottom: primary.bottom,
      viewportBottom: innerHeight,
    };
  });

  assert.ok(geometry.headingTop >= geometry.headerBottom);
  assert.ok(geometry.primaryBottom <= geometry.viewportBottom);
  await context.close();
});

test("floating WhatsApp action does not cover hero destination copy", async () => {
  const { context, page } = await openMobilePage();
  const overlaps = await page.evaluate(() => {
    const heading = document.querySelector(".hero-destinations-intro h2");
    const trigger = document.querySelector(".whatsapp-trigger");
    const range = document.createRange();
    range.selectNodeContents(heading);
    const text = range.getBoundingClientRect();
    const button = trigger.getBoundingClientRect();
    return !(
      text.right <= button.left ||
      text.left >= button.right ||
      text.bottom <= button.top ||
      text.top >= button.bottom
    );
  });

  assert.equal(overlaps, false);
  await context.close();
});

test("tablet viewport never creates document-level horizontal overflow", async () => {
  const { context, page } = await openMobilePage({
    width: 768,
    height: 1024,
  });
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
  }));

  assert.equal(dimensions.document, dimensions.viewport);
  await context.close();
});

test("common phone and tablet widths stay within the visual viewport", async () => {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 667, height: 375 },
    { width: 768, height: 1024 },
  ]) {
    const { context, page } = await openMobilePage(viewport);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    assert.equal(
      dimensions.document,
      dimensions.viewport,
      `${viewport.width}x${viewport.height} overflowed`,
    );
    await context.close();
  }
});

test("mobile controls are touch-safe and form fields do not trigger iOS zoom", async () => {
  const { context, page } = await openMobilePage();
  const violations = await page.evaluate(() => {
    const selectors = [
      ".mobile-menu-toggle",
      ".lang-switch button",
      ".company-intro__action",
      ".fleet-catalog-filter",
      ".fleet-catalog-button",
      ".office-carousel__tabs button",
      ".office-carousel__buttons button",
      ".history-carousel__button",
      ".careers-form input:not([type='hidden']):not([type='checkbox']):not(.careers-honey)",
      ".careers-consent",
      ".careers-form select",
      ".careers-form textarea",
      ".careers-form button",
      ".request-form input",
      ".request-form select",
      ".request-form button",
      ".site-footer__social",
      ".whatsapp-trigger",
    ];

    const undersized = [...document.querySelectorAll(selectors.join(","))]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0 &&
          (rect.width < 44 || rect.height < 44)
        );
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return `${element.tagName}.${element.className}:${Math.round(rect.width)}x${Math.round(rect.height)}`;
      });

    const smallText = [
      ...document.querySelectorAll(
        ".careers-form input, .careers-form select, .careers-form textarea, .request-form input, .request-form select, #whatsapp-widget-message",
      ),
    ]
      .filter((element) => {
        const style = getComputedStyle(element);
        return style.display !== "none" && Number.parseFloat(style.fontSize) < 16;
      })
      .map(
        (element) =>
          `${element.name || element.id}:${getComputedStyle(element).fontSize}`,
      );

    return { undersized, smallText };
  });

  assert.deepEqual(violations, { undersized: [], smallText: [] });
  await context.close();
});

test("mobile team roles remain readable and deep history media stays deferred", async () => {
  const { context, page } = await openMobilePage();
  const contrast = await page.locator(".team-grid article p").first().evaluate((element) => {
    const parse = (value) => value.match(/\d+/g).slice(0, 3).map(Number);
    const luminance = (value) => {
      const channels = parse(value).map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.03928
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };
    const foreground = luminance(getComputedStyle(element).color);
    const background = luminance(getComputedStyle(element.closest(".team")).backgroundColor);
    return (Math.max(foreground, background) + 0.05) /
      (Math.min(foreground, background) + 0.05);
  });

  assert.ok(contrast >= 4.5, `team role contrast was ${contrast.toFixed(2)}:1`);
  const historyImage = page.locator(
    "img[data-lazy-src='/media/history/fusca-1986-816.webp']",
  );
  assert.equal(await historyImage.getAttribute("loading"), "lazy");
  assert.equal(await historyImage.getAttribute("src"), null);
  await context.close();
});

test("initial render does not depend on a cross-origin stylesheet", async () => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  const externalStylesheets = [];
  page.on("request", (request) => {
    if (
      request.resourceType() === "stylesheet" &&
      new URL(request.url()).origin !== BASE_URL
    ) {
      externalStylesheets.push(request.url());
    }
  });
  await page.goto(`${BASE_URL}/?lang=pt`, { waitUntil: "domcontentloaded" });

  assert.deepEqual(externalStylesheets, []);
  await context.close();
});

test("all configured translations resolve without missing-target warnings", async () => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await context.route(
    (url) => !url.toString().startsWith(BASE_URL),
    (route) => route.abort(),
  );
  const missingTargets = [];
  page.on("console", (message) => {
    if (
      message.type() === "warning" &&
      message.text().includes("Missing i18n target")
    ) {
      missingTargets.push(message.text());
    }
  });

  await page.goto(`${BASE_URL}/?lang=pt`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1_100);
  await page.locator(".mobile-menu-toggle").click();
  await page.locator(".mobile-menu .lang-switch [data-lang='en']").click();
  await page.locator(".mobile-menu .lang-switch [data-lang='es']").click();

  assert.deepEqual(missingTargets, []);
  await context.close();
});

test("language stays synchronized across URL, storage, DOM, reload and browser history", async () => {
  const { context, page } = await openMobilePage();
  await page.locator(".mobile-menu-toggle").click();
  await page.locator(".mobile-menu .lang-switch [data-lang='en']").click();

  const english = await page.evaluate(() => ({
    query: new URL(location.href).searchParams.get("lang"),
    stored: localStorage.getItem("betinhos-language"),
    html: document.documentElement.lang,
    active: [...document.querySelectorAll("[data-lang='en']")].every(
      (button) => button.getAttribute("aria-pressed") === "true",
    ),
  }));
  assert.deepEqual(english, {
    query: "en",
    stored: "en",
    html: "en-US",
    active: true,
  });
  assert.equal(
    await page.locator(".hero-locations article").nth(2).locator("strong").textContent(),
    "Paraíba Valley",
  );
  assert.equal(
    await page.locator(".hero-locations article").first().locator("img").getAttribute("alt"),
    "Innovation Arch in São José dos Campos",
  );
  assert.equal(
    await page.locator(".office-carousel").getAttribute("aria-roledescription"),
    "carousel",
  );
  assert.equal(
    await page.locator(".anniversary-mark__number").getAttribute("aria-label"),
    "40 YEARS",
  );

  await page.locator(".mobile-menu .lang-switch [data-lang='es']").click();
  assert.match(
    await page.locator(".careers-form-row label").first().innerText(),
    /Correo electrónico \*/i,
  );
  assert.equal(
    await page.locator(".office-carousel").getAttribute("aria-roledescription"),
    "carrusel",
  );
  await page.goBack();
  await page.waitForTimeout(100);
  assert.equal(
    await page.evaluate(
      () =>
        new URL(location.href).searchParams.get("lang") === "en" &&
        document.documentElement.lang === "en-US",
    ),
    true,
  );

  await page.reload({ waitUntil: "domcontentloaded" });
  assert.equal(await page.locator("html").getAttribute("lang"), "en-US");
  await context.close();
});

test("mobile carousels and fleet controls expose their state after interaction", async () => {
  const { context, page } = await openMobilePage();

  await page.locator(".fleet-catalog-next").click();
  assert.equal(
    await page.locator(".service-card[aria-current='true']").count(),
    1,
  );

  await page.locator("[data-office-next]").click();
  assert.equal(
    await page.locator("[data-office-slide].is-active").getAttribute("id"),
    "office-slide-2",
  );
  await page.locator("[data-office-dot]").nth(1).focus();
  await page.keyboard.press("End");
  assert.equal(
    await page.locator("[data-office-slide].is-active").getAttribute("id"),
    "office-slide-4",
  );
  await page.keyboard.press("Home");
  assert.equal(
    await page.locator("[data-office-slide].is-active").getAttribute("id"),
    "office-slide-1",
  );

  await page.locator("[data-history-next]").click();
  assert.equal(
    await page.locator("[data-history-slide].is-active").getAttribute("id"),
    "history-slide-2",
  );
  await context.close();
});
