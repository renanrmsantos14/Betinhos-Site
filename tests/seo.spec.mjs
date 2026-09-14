import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = (file) => readFile(path.join(root, file), 'utf8');

test('home has static PT metadata and clean canonical', async () => {
  const html = await read('site/index.html');
  assert.match(html, /<title>Transporte executivo em São José dos Campos \| Betinhos<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/betinhos\.com\.br\/"/);
  assert.doesNotMatch(html, /hreflang="(?:en|es|x-default)"/);
  assert.match(html, /application\/ld\+json/);
});

test('sitemap contains only clean indexable URLs', async () => {
  const xml = await read('site/sitemap.xml');
  assert.doesNotMatch(xml, /\?lang=/);
  for (const url of ['/servicos/transporte-executivo-corporativo/', '/servicos/transfer-aeroportos/', '/servicos/van-executiva-grupos-eventos/', '/destinos/sao-jose-dos-campos/', '/privacidade/']) assert.match(xml, new RegExp(url.replaceAll('/', '\\/')));
});

test('legacy redirects and deployment allowlist are declared', async () => {
  const htaccess = await read('site/.htaccess');
  for (const slug of ['osservicos', 'contato', 'tradicao', 'missaovisaoevalores']) assert.match(htaccess, new RegExp(`RewriteRule \\^${slug}`));
  const build = await read('scripts/build-deploy.mjs');
  assert.match(build, /dist/); assert.match(build, /cta-options/); assert.match(build, /rm\(destination/);
});

test('commercial pages and privacy have canonical metadata and translations', async () => {
  const pages = [
    'site/servicos/transporte-executivo-corporativo/index.html',
    'site/servicos/transfer-aeroportos/index.html',
    'site/servicos/van-executiva-grupos-eventos/index.html',
    'site/destinos/sao-jose-dos-campos/index.html',
    'site/privacidade/index.html',
  ];
  for (const file of pages) {
    const html = await read(file);
    assert.match(html, /rel="canonical"/); assert.match(html, /data-page=/); assert.match(html, /data-lang="en"/); assert.match(html, /data-lang="es"/);
  }
  const js = await read('site/seo-pages.js');
  assert.match(js, /pt:/); assert.match(js, /en:/); assert.match(js, /es:/);
});

test('analytics event contract excludes itinerary and PII fields', async () => {
  const js = await read('site/analytics.js');
  assert.match(js, /generate_lead/); assert.match(js, /career_application_submit/); assert.match(js, /language_change/);
  assert.doesNotMatch(js, /email|telefone|phone_number|origem|destino|itiner[aá]rio/i);
});
