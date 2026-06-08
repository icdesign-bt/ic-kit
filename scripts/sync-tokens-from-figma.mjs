#!/usr/bin/env node
/**
 * Обёртка синхронизации токенов из Figma MCP.
 *
 * 1. get_variable_defs для палитр (nodeId в docs/internal/FIGMA_WORKFLOW.md)
 * 2. Сохранить variables в tokens/figma-export/<brand>-<theme>.json
 * 3. get_variable_defs для Typography (6181:16002) → typography.json
 * 4. npm run tokens:build
 *
 * Быстрая запись из stdin (сырой JSON от MCP):
 *   node scripts/sync-tokens-from-figma.mjs ic-dark < /tmp/mcp.json
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { spawnSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const exportDir = join(root, 'tokens/figma-export');

const PALETTE_META = {
  'ic-light': { brand: 'ic', theme: 'light', nodeId: '7831:31247' },
  'ic-dark': { brand: 'ic', theme: 'dark', nodeId: '7831:31935' },
  'codd-light': { brand: 'codd', theme: 'light', nodeId: '7831:31591' },
  'codd-dark': { brand: 'codd', theme: 'dark', nodeId: '7831:32279' },
  typography: { brand: null, theme: null, nodeId: '6181:16002' },
};

function readStdin() {
  return readFileSync(0, 'utf8').trim();
}

const [paletteName] = process.argv.slice(2);

if (paletteName === '--help') {
  console.log(`Usage:
  npm run tokens:build
  node scripts/sync-tokens-from-figma.mjs <palette> < mcp.json

Palettes: ${Object.keys(PALETTE_META).join(', ')}`);
  process.exit(0);
}

if (paletteName) {
  const meta = PALETTE_META[paletteName];
  if (!meta) {
    console.error(`Unknown palette: ${paletteName}. Use: ${Object.keys(PALETTE_META).join(', ')}`);
    process.exit(1);
  }
  const raw = readStdin();
  if (!raw) {
    console.error('Pipe MCP JSON to stdin');
    process.exit(1);
  }
  const variables = JSON.parse(raw);
  mkdirSync(exportDir, { recursive: true });
  const out = {
    _meta: {
      source: 'Figma MCP get_variable_defs',
      fileKey: 'XFvebxoecl7DX4Oxm9GVJO',
      nodeId: meta.nodeId,
      brand: meta.brand,
      theme: meta.theme,
      exportedAt: new Date().toISOString().slice(0, 10),
    },
    variables,
  };
  const file = paletteName === 'typography' ? 'typography.json' : `${paletteName}.json`;
  writeFileSync(join(exportDir, file), `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  console.log(`wrote tokens/figma-export/${file} (${Object.keys(variables).length} vars)`);
}

const build = spawnSync('node', [join(__dirname, 'build-tokens.mjs')], {
  stdio: 'inherit',
  cwd: root,
});
process.exit(build.status ?? 1);
