#!/usr/bin/env node
/**
 * Скачивает SVG по URL (Figma MCP asset или Figma Images API) в src/icons/svg/
 * Вход: tokens/icon-export-queue.json
 * [{ "path": "Arrows & Directions/ArrowArcLeft", "weight": "regular", "url": "https://..." }]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const queuePath = join(root, 'tokens/icon-export-queue.json');
const SVG_DIR = join(root, 'src/icons/svg');

function slug(value) {
  return value
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function normalizeSvg(svg) {
  return svg
    .replace(/fill="var\(--fill-0,\s*[^"]+\)"/gi, 'fill="currentColor"')
    .replace(/fill="var\(--fill-0\)"/gi, 'fill="currentColor"')
    .replace(/stroke="var\(--stroke-0,\s*[^"]+\)"/gi, 'stroke="currentColor"')
    .replace(/<svg([^>]*)width="[^"]*"/i, '<svg$1')
    .replace(/<svg([^>]*)height="[^"]*"/i, '<svg$1')
    .replace(
      /<svg([^>]*)>/i,
      '<svg$1 width="24" height="24" focusable="false" aria-hidden="true">',
    );
}

const queue = JSON.parse(readFileSync(queuePath, 'utf8'));
let saved = 0;

for (const item of queue) {
  if (!item.url) continue;
  const [category, ...rest] = item.path.split('/');
  const name = rest.join('/');
  const outPath = join(SVG_DIR, slug(category), slug(name), `${item.weight}.svg`);
  const res = await fetch(item.url);
  if (!res.ok) {
    console.warn(`fail ${item.path} ${item.weight}: ${res.status}`);
    continue;
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, normalizeSvg(await res.text()), 'utf8');
  saved++;
}

console.log(`saved ${saved}/${queue.length} svg`);
await import('./build-icons-manifest.mjs');
