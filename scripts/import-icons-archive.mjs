#!/usr/bin/env node
/**
 * DEPRECATED — не использовать для продакшн-ассетов.
 *
 * Исторический импорт из zip Figma (_Icon_/Category/Format=Outline, Weight=Regular-N.svg).
 * Сопоставление по индексу N и порядку сетки canvas оказалось неверным: номер в архиве
 * не совпадает с позицией (x,y) на [icon 24](node 6558:15814). SVG попадают в правильные
 * папки, но с чужим содержимым.
 *
 * Используйте вместо этого:
 *   npm run icons:reexport          — Figma Desktop + MCP, nodeId из icon-catalog.json
 *   npm run icons:sync -- --force   — Figma REST API + FIGMA_ACCESS_TOKEN
 *
 * Usage: node scripts/import-icons-archive.mjs /path/to/_Icon_.zip
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const catalogPath = join(root, 'tokens/icon-catalog.json');
const metadataPath = join(root, 'tokens/figma-icon-metadata.xml');
const svgRoot = join(root, 'src/icons/svg');

const WEIGHT_MAP = {
  Regular: 'regular',
  Bold: 'bold',
  Fill: 'fill',
};

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

function parseGridOrder(xml) {
  const re =
    /<frame id="[^"]+" name="(&lt;Icon&gt;[^"]+)" x="(\d+)" y="(\d+)"[^>]*>/g;
  const byCategory = new Map();
  let m;
  while ((m = re.exec(xml)) !== null) {
    const path = m[1]
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace('<Icon>/', '');
    const [category, ...rest] = path.split('/');
    const name = rest.join('/');
    if (!byCategory.has(category)) byCategory.set(category, []);
    byCategory.get(category).push({
      path: `${category}/${name}`,
      x: Number(m[2]),
      y: Number(m[3]),
    });
  }
  const order = new Map();
  const categoryCounts = new Map();
  for (const [category, items] of byCategory) {
    items.sort((a, b) => a.y - b.y || a.x - b.x);
    categoryCounts.set(category, items.length);
    items.forEach((item, i) => {
      order.set(`${category}#${i + 1}`, item.path);
    });
  }
  return { order, categoryCounts };
}

function walkFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walkFiles(full));
    else if (entry.endsWith('.svg')) out.push(full);
  }
  return out;
}

const zipPath = process.argv[2];
if (!zipPath) {
  console.error('Usage: node scripts/import-icons-archive.mjs <path-to-_Icon_.zip>');
  process.exit(1);
}

const extractDir = join(tmpdir(), `ic-kit-icons-${Date.now()}`);
mkdirSync(extractDir, { recursive: true });
execSync(`unzip -q "${zipPath}" -d "${extractDir}"`, { stdio: 'inherit' });

const iconRoot = [join(extractDir, '_Icon_'), join(extractDir, 'Icon'), extractDir].find((p) => {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
});

if (!iconRoot) {
  console.error('Could not find _Icon_ folder in archive');
  process.exit(1);
}

const { order: gridOrder, categoryCounts } = parseGridOrder(readFileSync(metadataPath, 'utf8'));
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const catalogPaths = new Set(catalog.icons.map((i) => i.path));

let imported = 0;
let skipped = 0;
const missing = [];
const unknown = [];

rmSync(svgRoot, { recursive: true, force: true });
mkdirSync(svgRoot, { recursive: true });

const fileRe = /^Format=Outline, Weight=(Regular|Bold|Fill)(?:-(\d+))?\.svg$/;

for (const filePath of walkFiles(iconRoot)) {
  const category = dirname(filePath).split('/').pop();
  const fileName = filePath.split('/').pop();
  const match = fileName.match(fileRe);
  if (!match) {
    unknown.push(filePath);
    continue;
  }
  const weight = WEIGHT_MAP[match[1]];
  const index = match[2] ? Number(match[2]) : categoryCounts.get(category);
  if (!index) {
    unknown.push(filePath);
    continue;
  }
  const iconPath = gridOrder.get(`${category}#${index}`);
  if (!iconPath) {
    missing.push(`${category} #${index} (${fileName})`);
    continue;
  }
  if (!catalogPaths.has(iconPath)) {
    missing.push(`not in catalog: ${iconPath}`);
    continue;
  }
  const [cat, ...rest] = iconPath.split('/');
  const name = rest.join('/');
  const outPath = join(svgRoot, slug(cat), slug(name), `${weight}.svg`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, normalizeSvg(readFileSync(filePath, 'utf8')), 'utf8');
  imported++;
}

rmSync(extractDir, { recursive: true, force: true });

console.log(`imported ${imported} svg files`);
if (skipped) console.log(`skipped ${skipped}`);
if (missing.length) console.warn(`unmapped ${missing.length}:`, missing.slice(0, 5).join('; '));
if (unknown.length) console.warn(`unknown files ${unknown.length}`);

await import('./build-icons-manifest.mjs');
