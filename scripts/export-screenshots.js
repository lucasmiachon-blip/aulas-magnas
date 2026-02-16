#!/usr/bin/env node
/**
 * Export per-slide screenshots via DeckTape.
 * Uses vite preview and local decktape binary.
 * Cross-platform: macOS, Linux, Windows.
 *
 * Usage: npm run export:screenshots
 * Or:    node scripts/export-screenshots.js cirrose
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

console.log('Starting vite preview...');
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
  stdio: 'ignore',
  detached: false,
  shell: process.platform === 'win32',
});

const decktapeBin = process.platform === 'win32' ? DECKTAPE + '.cmd' : DECKTAPE;
const nullDev = process.platform === 'win32' ? 'NUL' : '/dev/null';

async function run() {
  try {
    await waitForServer(PORT);
    console.log(`  ✓ Server ready on port ${PORT}`);

    for (const lecture of toExport) {
      const dir = join(EXPORTS, 'screenshots', lecture);
      mkdirSync(dir, { recursive: true });

      const url = `http://localhost:${PORT}/aulas/${lecture}/index.html`;
      console.log(`\n📸 Screenshots: ${lecture}...`);
      try {
        execFileSync(decktapeBin, [
          'reveal', '--size', '1920x1080',
          '--screenshots', '--screenshots-format=png',
          `--screenshots-directory=${dir}`,
          url, nullDev,
        ], { stdio: 'inherit' });
        console.log(`  ✓ ${dir}/`);
      } catch {
        console.error(`  ✗ Failed for ${lecture}`);
      }
    }
  } finally {
    server.kill();
    console.log('\n✓ Screenshots complete. Files in /exports/screenshots/');
  }
}

run().catch((e) => {
  console.error(`❌ ${e.message}`);
  server.kill();
  process.exit(1);
});
