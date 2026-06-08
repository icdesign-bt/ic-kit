#!/usr/bin/env node
/**
 * Диагностика ошибочного маппинга zip-архива (_Icon_.zip).
 *
 * Проблема: import-icons-archive.mjs сопоставлял файлы Format=…-N.svg с иконкой
 * по порядковому номеру N в сетке canvas (x,y из metadata), тогда как Figma
 * нумерует экспорт в другом порядке. Итог — SVG лежат под правильными именами
 * папок, но с чужим содержимым.
 *
 * Правильный источник: nodeId из tokens/icon-catalog.json → icons:sync / icons:reexport
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const metadataPath = join(root, 'tokens/figma-icon-metadata.xml');
const catalogPath = join(root, 'tokens/icon-catalog.json');

function decodeName(raw) {
  return raw
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function spatialOrderByCategory(xml) {
  const re = /<frame id="[^"]+" name="(&lt;Icon&gt;[^"]+)" x="(\d+)" y="(\d+)"[^>]*>/g;
  const byCategory = new Map();
  let m;
  while ((m = re.exec(xml)) !== null) {
    const path = decodeName(m[1]).replace('<Icon>/', '');
    const [category] = path.split('/');
    if (!byCategory.has(category)) byCategory.set(category, []);
    byCategory.get(category).push({ path, x: Number(m[2]), y: Number(m[3]) });
  }
  const order = new Map();
  for (const [category, items] of byCategory) {
    items.sort((a, b) => a.y - b.y || a.x - b.x);
    items.forEach((item, i) => order.set(`${category}#${i + 1}`, item.path));
  }
  return order;
}

const xml = readFileSync(metadataPath, 'utf8');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const spatial = spatialOrderByCategory(xml);

const catalogByCategory = new Map();
for (const icon of catalog.icons) {
  if (!catalogByCategory.has(icon.category)) catalogByCategory.set(icon.category, []);
  catalogByCategory.get(icon.category).push(icon.path);
}

let spatialVsCatalog = 0;
for (const [category, paths] of catalogByCategory) {
  const count = paths.length;
  for (let i = 1; i <= count; i += 1) {
    const fromSpatial = spatial.get(`${category}#${i}`);
    if (fromSpatial && fromSpatial !== paths[i - 1]) spatialVsCatalog += 1;
  }
}

console.log('Icon archive mapping audit');
console.log('─'.repeat(48));
console.log(`Canvas: ${catalog.meta.url}`);
console.log(`Icons in catalog: ${catalog.icons.length}`);
console.log(`With Figma weight nodeIds: ${catalog.icons.filter((i) => i.weights).length}`);
console.log('');
console.log('Archive import assumed: zip suffix -N == Nth icon in spatial grid (y,x)');
console.log(`Spatial grid order vs catalog order mismatches: ${spatialVsCatalog} / ${catalog.icons.length}`);
console.log('');
console.log('Conclusion: do NOT use icons:import for production assets.');
console.log('Fix: npm run icons:reexport   (Figma Desktop MCP, nodeId per weight)');
console.log('  or: FIGMA_ACCESS_TOKEN=… npm run icons:sync -- --force');
