import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "site");
const destination = path.join(root, ".deploy", "site");
const excludedDirectories = new Set(["dist", "components", "graphify-out", "exports", "estudos", "previews"]);
const excludedFiles = /^(?:40-anos-.*|assinatura-email-40-anos(?:\..*)?|cta-options(?:\..*)?)$/i;

async function copyAllowlisted(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    if (entry.isFile() && excludedFiles.test(entry.name)) continue;
    const sourcePath = path.join(from, entry.name);
    const targetPath = path.join(to, entry.name);
    if (entry.isDirectory()) await copyAllowlisted(sourcePath, targetPath);
    else if (entry.isFile()) await cp(sourcePath, targetPath);
  }
}

await rm(destination, { recursive: true, force: true });
await copyAllowlisted(source, destination);
console.log(`Pacote allowlistado criado em ${path.relative(root, destination)}`);
