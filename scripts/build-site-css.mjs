import { readFile, writeFile } from "node:fs/promises";
import { transform } from "esbuild";

const sources = [
  "site/assets/index-D7fnJsCl.css",
  "site/service-fleet.css",
  "site/company-intro.css",
  "site/anniversary-mark.css",
  "site/fixed-header.css",
  "site/office-section.css",
  "site/contact-section.css",
  "site/section-labels.css",
  "site/history-section.css",
  "site/mobile-overrides.css",
  "site/section-density.css",
];

const css = (await Promise.all(sources.map((source) => readFile(source, "utf8")))).join("\n");
const result = await transform(css, { loader: "css", minify: true, legalComments: "none" });
await writeFile("site/assets/site.min.css", result.code, "utf8");

console.log(`CSS: ${sources.length} arquivos -> site/assets/site.min.css`);
