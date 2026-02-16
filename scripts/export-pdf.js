#!/usr/bin/env node
/**
 * Export all lectures to PDF via DeckTape.
 * Uses vite preview (not npx serve) and local decktape binary.
 * Cross-platform: macOS, Linux, Windows.
 *
 * Usage: npm run export:pdf
 * Or:    node scripts/export-pdf.js cirrose
 */
import { execSync, spawn, execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import http from 'node:http';

const lectures = ['grade', 'cirrose', 'metanalise'];
const target = process.argv[2];
const toExport = target ? [target] : lectures;

const PORT = 4173;
const DIST = resolve('dist');
const EXPORTS = resolve('exports');
const DECKTAPE = resolve('node_modules', '.bin', 'decktape');

mkdirSync(EXPORTS, { recursive: true });

// Validate
if (!existsSync(DECKTAPE) && !existsSync(DECKTAPE + '.cmd')) {
  console.error('❌ decktape not found. Run: npm install');
  process.exit(1);
}

if (!existsSync(DIST)) {
  console.log('Building first...');
  execSync('npm run build', { stdio: 'inherit' });
}

function waitForServer(port, timeout = 15000) {
  return new Promise((ok, fail) => {
    const start = Date.now();
    const check = () => {
      const req = http.get(`http://localhost:${port}`, (res) => {
        res.resume();
        ok();
      });
      req.on('error', () => {
        if (Date.now() - start > timeout) fail(new Error(`Server timeout ${timeout}ms`));
        else setTimeout(check, 300);
      });
      req.end();
    };
    check();
  });
}

// Use vite preview instead of npx serve
console.log('Starting vite preview...');
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
  stdio: 'ignore',
  detached: false,
  shell: process.platform === 'win32',
});

const decktapeBin = process.platform === 'win32' ? DECKTAPE + '.cmd' : DECKTAPE;

async function run() {
  try {
    await waitForServer(PORT);
    console.log(`  ✓ Server ready on port ${PORT}`);

    for (const lecture of toExport) {
      for (const [plan, size, suffix] of [
        ['index.html', '1920x1080', 'plan-a'],
        ['index.stage-b.html', '1280x720', 'plan-b'],
      ]) {
        const url = `http://localhost:${PORT}/aulas/${lecture}/${plan}`;
        const out = resolve(EXPORTS, `${lecture}-${suffix}.pdf`);
        console.log(`\n📄 ${lecture} ${suffix}...`);
        try {
          execFileSync(decktapeBin, ['reveal', '--size', size, url, out], {
            stdio: 'inherit',
          });
          console.log(`  ✓ ${out}`);
        } catch {
          console.error(`  ✗ Failed`);
        }
      }
    }
  } finally {
    server.kill();
    console.log('\n✓ Export complete. Files in /exports/');
  }
}

run().catch((e) => {
  console.error(`❌ ${e.message}`);
  server.kill();
  process.exit(1);
});
