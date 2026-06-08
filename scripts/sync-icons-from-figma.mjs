#!/usr/bin/env node
/**
 * Экспорт SVG иконок из Figma REST API (Images endpoint).
 *
 * Требует: FIGMA_ACCESS_TOKEN (Personal Access Token)
 * https://www.figma.com/developers/api#access-tokens
 *
 * npm run icons:sync
 * npm run icons:sync -- --weight regular   # только один вес
 * npm run icons:sync -- --limit 20         # пилот
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const FILE_KEY = 'XFvebxoecl7DX4Oxm9GVJO';
const SVG_DIR = join(root, 'src/icons/svg');
const catalogPath = join(root, 'tokens/icon-catalog.json');

function loadDotEnv() {
  try {
    const envPath = join(root, '.env');
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq);
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* no .env */
  }
}

const WEIGHTS = ['regular', 'bold', 'fill'];
const BATCH_SIZE = 40;
const DELAY_MS = 350;

function slug(value) {
  return value
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetry(url, init, attempts = 5) {
  let lastErr;
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, init);
      return res;
    } catch (err) {
      lastErr = err;
      await sleep(1000 * (i + 1));
    }
  }
  throw lastErr;
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

function parseArgs(argv) {
  const opts = { weight: null, limit: null, force: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--weight') opts.weight = argv[++i];
    else if (argv[i] === '--limit') opts.limit = Number(argv[++i]);
    else if (argv[i] === '--force') opts.force = true;
  }
  return opts;
}

async function figmaImageUrls(token, nodeIds) {
  const ids = nodeIds.join(',');
  const url = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg&svg_outline_text=false&svg_include_id=false`;
  const res = await fetchWithRetry(url, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Figma images API ${res.status}: ${body}`);
  }
  const json = await res.json();
  if (json.err) throw new Error(json.err);
  return json.images ?? {};
}

async function downloadSvg(url) {
  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  return res.text();
}

async function main() {
  loadDotEnv();
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    console.error('Set FIGMA_ACCESS_TOKEN (Figma → Settings → Security → Personal access tokens)');
    process.exit(1);
  }

  const opts = parseArgs(process.argv.slice(2));
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
  let icons = catalog.icons.filter((i) => i.weights);
  if (opts.limit) icons = icons.slice(0, opts.limit);

  const jobs = [];
  for (const icon of icons) {
    const categorySlug = slug(icon.category);
    const nameSlug = slug(icon.name);
    const weights = opts.weight ? [opts.weight] : WEIGHTS;
    for (const weight of weights) {
      const nodeId = icon.weights?.[weight];
      if (!nodeId) continue;
      const outPath = join(SVG_DIR, categorySlug, nameSlug, `${weight}.svg`);
      jobs.push({ icon, weight, nodeId, outPath });
    }
  }

  mkdirSync(SVG_DIR, { recursive: true });
  let done = 0;
  let skipped = 0;

  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    const batch = jobs.slice(i, i + BATCH_SIZE);
    const pending = batch.filter((j) => opts.force || !existsSync(j.outPath));
    skipped += batch.length - pending.length;
    if (pending.length === 0) continue;

    const urls = await figmaImageUrls(
      token,
      pending.map((j) => j.nodeId),
    );
    for (const job of pending) {
      const assetUrl = urls[job.nodeId];
      if (!assetUrl) {
        console.warn(`no url for ${job.icon.path} (${job.weight})`);
        continue;
      }
      const raw = await downloadSvg(assetUrl);
      mkdirSync(dirname(job.outPath), { recursive: true });
      writeFileSync(job.outPath, normalizeSvg(raw), 'utf8');
      done++;
    }
    process.stdout.write(`\r${done + skipped}/${jobs.length} icons processed`);
    await sleep(DELAY_MS);
  }

  console.log(`\nexported ${done} svg, skipped ${skipped} existing`);
  await import('./build-icons-manifest.mjs');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
