#!/usr/bin/env node
/**
 * Export icon SVGs via Figma Desktop MCP (http://127.0.0.1:3845/mcp).
 * Requires KURS v2. Components open as the active tab in Figma desktop.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const FILE_KEY = 'XFvebxoecl7DX4Oxm9GVJO';
const MCP_URL = 'http://127.0.0.1:3845/mcp';
const catalogPath = join(root, 'tokens/icon-catalog.json');
const queuePath = join(root, 'tokens/icon-export-queue.json');
const SVG_DIR = join(root, 'src/icons/svg');

function slug(value) {
  return value
    .replace(/&/g, 'and')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

const PARALLEL = 12;

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

async function saveSvg(job, url) {
  const [category, ...rest] = job.path.split('/');
  const name = rest.join('/');
  const outPath = join(SVG_DIR, slug(category), slug(name), `${job.weight}.svg`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, normalizeSvg(await res.text()), 'utf8');
  return outPath;
}

function parseArgs(argv) {
  const opts = { limit: null, offset: 0, force: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--limit') opts.limit = Number(argv[++i]);
    else if (argv[i] === '--offset') opts.offset = Number(argv[++i]);
    else if (argv[i] === '--force') opts.force = true;
  }
  return opts;
}

async function mcpRequest(sessionId, body) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
  };
  if (sessionId) headers['mcp-session-id'] = sessionId;

  const res = await fetch(MCP_URL, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`MCP HTTP ${res.status}`);
  const text = await res.text();
  let last = null;
  for (const line of text.split('\n')) {
    if (!line.startsWith('data:')) continue;
    const json = JSON.parse(line.slice(5).trim());
    if (json.error) throw new Error(json.error.message || JSON.stringify(json.error));
    last = json;
  }
  return { json: last, sessionId: res.headers.get('mcp-session-id') || sessionId };
}

async function createSession() {
  const { json, sessionId } = await mcpRequest(null, {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'ic-kit', version: '1' },
    },
  });
  if (!sessionId) throw new Error('no mcp-session-id');
  await mcpRequest(sessionId, { jsonrpc: '2.0', method: 'notifications/initialized' });
  return sessionId;
}

function extractAssetUrl(text) {
  const m =
    text.match(/https?:\/\/localhost:\d+\/assets\/[a-f0-9]+\.svg/i) ||
    text.match(/https?:\/\/127\.0\.0\.1:\d+\/assets\/[a-f0-9]+\.svg/i);
  return m?.[0] ?? null;
}

async function getDesignContextAssetUrl(sessionId, nodeId) {
  const { json } = await mcpRequest(sessionId, {
    jsonrpc: '2.0',
    id: nodeId,
    method: 'tools/call',
    params: {
      name: 'get_design_context',
      arguments: {
        nodeId,
        fileKey: FILE_KEY,
        clientLanguages: 'typescript',
        clientFrameworks: 'react',
        excludeScreenshot: true,
        disableCodeConnect: true,
      },
    },
  });
  const text = json.result?.content?.find((c) => c.type === 'text')?.text ?? '';
  if (json.result?.isError) throw new Error(text.slice(0, 200));
  const url = extractAssetUrl(text);
  if (!url) throw new Error(`no asset url in response (${text.slice(0, 120)}…)`);
  return url;
}

async function mapPool(items, concurrency, fn) {
  const results = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (true) {
      const i = idx++;
      if (i >= items.length) break;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
  let icons = catalog.icons.filter((i) => i.weights);
  if (opts.offset) icons = icons.slice(opts.offset);
  if (opts.limit) icons = icons.slice(0, opts.limit);

  const jobs = [];
  let skipped = 0;
  for (const icon of icons) {
    for (const weight of ['regular', 'bold', 'fill']) {
      const nodeId = icon.weights?.[weight];
      if (!nodeId) continue;
      const outPath = join(SVG_DIR, slug(icon.category), slug(icon.name), `${weight}.svg`);
      if (!opts.force && existsSync(outPath)) {
        skipped++;
        continue;
      }
      jobs.push({ path: icon.path, weight, nodeId });
    }
  }
  console.log(`skip ${skipped} existing, fetch ${jobs.length} via MCP`);

  const sessionId = await createSession();
  const queue = [];
  let ok = 0;
  let fail = 0;

  for (let i = 0; i < jobs.length; i += PARALLEL) {
    const batch = jobs.slice(i, i + PARALLEL);
    const batchResults = await mapPool(batch, PARALLEL, async (job) => {
      let lastErr;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const url = await getDesignContextAssetUrl(sessionId, job.nodeId);
          await saveSvg(job, url);
          ok++;
          return { ...job, url };
        } catch (err) {
          lastErr = err;
          await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
        }
      }
      fail++;
      console.warn(`fail ${job.path} ${job.weight}: ${lastErr.message}`);
      return { ...job, url: null, error: lastErr.message };
    });
    for (const r of batchResults) if (r.url) queue.push(r);
    writeFileSync(queuePath, JSON.stringify(queue, null, 2), 'utf8');
    process.stdout.write(`\r${Math.min(i + PARALLEL, jobs.length)}/${jobs.length} jobs (ok ${ok}, fail ${fail})`);
  }

  console.log(`\nsaved ${ok} svg, ${fail} failures, queue ${queue.length}`);
  writeFileSync(queuePath, JSON.stringify(queue, null, 2), 'utf8');
  await import('./build-icons-manifest.mjs');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
