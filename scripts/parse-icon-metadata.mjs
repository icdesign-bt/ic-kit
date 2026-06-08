#!/usr/bin/env node
/**
 * Парсит XML из get_metadata (canvas icon 24) → обогащает tokens/icon-catalog.json
 * nodeId вариантов: Regular / Bold / Fill внутри каждого component set.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const metadataPath = join(root, 'tokens/figma-icon-metadata.xml');
const catalogPath = join(root, 'tokens/icon-catalog.json');

const WEIGHT_MAP = {
  'Format=Outline, Weight=Regular': 'regular',
  'Format=Outline, Weight=Bold': 'bold',
  'Format=Outline, Weight=Fill': 'fill',
};

function decodeName(raw) {
  return raw
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function parseMetadata(xml) {
  const sets = new Map();
  const frameRe =
    /<frame id="([^"]+)" name="(&lt;Icon&gt;[^"]+)"[^>]*>([\s\S]*?)<\/frame>/g;
  const symbolRe = /<symbol id="([^"]+)" name="([^"]+)"/g;

  let match;
  while ((match = frameRe.exec(xml)) !== null) {
    const [, setId, rawName, body] = match;
    const decoded = decodeName(rawName);
    if (!decoded.startsWith('<Icon>/')) continue;
    const path = decoded.replace('<Icon>/', '');
    const parts = path.split('/');
    const weights = {};
    let sym;
    const symRe = new RegExp(symbolRe.source, 'g');
    while ((sym = symRe.exec(body)) !== null) {
      const [, symId, symName] = sym;
      const weight = WEIGHT_MAP[symName];
      if (weight) weights[weight] = symId.replace('-', ':');
    }
    if (Object.keys(weights).length === 0) continue;
    sets.set(path, {
      name: parts.at(-1),
      category: parts.length > 1 ? parts[0] : 'Uncategorized',
      path,
      figmaNodeId: setId.replace('-', ':'),
      weights,
    });
  }
  return sets;
}

const xml = readFileSync(metadataPath, 'utf8');
const parsed = parseMetadata(xml);
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));

const merged = [];
const missing = [];
for (const icon of catalog.icons) {
  const entry = parsed.get(icon.path);
  if (!entry) {
    missing.push(icon.path);
    merged.push(icon);
    continue;
  }
  merged.push({
    ...icon,
    figmaNodeId: entry.figmaNodeId,
    weights: entry.weights,
  });
}

catalog.icons = merged;
catalog.meta = {
  ...catalog.meta,
  weightsParsedAt: new Date().toISOString().slice(0, 10),
  withWeightNodeIds: merged.filter((i) => i.weights).length,
};
writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');

console.log(`parsed ${parsed.size} icon sets from metadata`);
console.log(`catalog updated: ${catalog.meta.withWeightNodeIds}/${merged.length} with weight nodeIds`);
if (missing.length) {
  console.warn(`missing in metadata: ${missing.length}`, missing.slice(0, 3).join(', '));
}
