#!/usr/bin/env node
/**
 * Download and install self-hosted fonts for offline presentations.
 * Fetches WOFF2 files from Google Fonts via google-webfonts-helper API.
 *
 * Usage: npm run fonts:install
 *
 * After running, shared/assets/fonts/ will contain all 4 WOFF2 files
 * referenced by shared/css/base.css.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import https from 'node:https';

const FONTS_DIR = resolve('shared', 'assets', 'fonts');
mkdirSync(FONTS_DIR, { recursive: true });

// Expected files (must match base.css @font-face declarations)
const EXPECTED = [
  'InstrumentSerif-Regular.woff2',
  'InstrumentSerif-Italic.woff2',
  'DMSans-Variable.woff2',
  'JetBrainsMono-Variable.woff2',
];

// Check if already installed
const allExist = EXPECTED.every(f => existsSync(join(FONTS_DIR, f)));
if (allExist) {
  console.log('✓ All fonts already installed in shared/assets/fonts/');
  process.exit(0);
}

// Google Fonts CSS2 API — request WOFF2 directly
// We use the CSS API trick: set User-Agent to a modern browser to get woff2
const FONTS = [
  {
    name: 'Instrument Serif',
    file: 'InstrumentSerif-Regular.woff2',
    url: 'https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap',
    style: 'normal',
    weight: '400',
  },
  {
    name: 'Instrument Serif Italic',
    file: 'InstrumentSerif-Italic.woff2',
    url: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap',
    style: 'italic',
    weight: '400',
  },
  {
    name: 'DM Sans Variable',
    file: 'DMSans-Variable.woff2',
    url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300..700&display=swap',
    style: 'normal',
    weight: '300 700',
  },
  {
    name: 'JetBrains Mono Variable',
    file: 'JetBrainsMono-Variable.woff2',
    url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400..600&display=swap',
    style: 'normal',
    weight: '400 600',
  },
];

function fetch(url, headers = {}) {
  return new Promise((ok, fail) => {
    const opts = new URL(url);
    opts.headers = {
      // Modern User-Agent to get woff2 from Google Fonts
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      ...headers,
    };
    https.get(opts, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location, headers).then(ok).catch(fail);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => ok(Buffer.concat(chunks)));
      res.on('error', fail);
    }).on('error', fail);
  });
}

async function downloadFont(font) {
  const dest = join(FONTS_DIR, font.file);
  if (existsSync(dest)) {
    console.log(`  ⏭ ${font.file} (already exists)`);
    return;
  }

  console.log(`  ↓ ${font.name}...`);

  // Step 1: Get CSS from Google Fonts (contains woff2 URL)
  const css = (await fetch(font.url)).toString('utf-8');

  // Step 2: Extract woff2 URL from CSS
  const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/);
  if (!match) {
    console.error(`    ✗ Could not find woff2 URL for ${font.name}`);
    console.error(`    CSS preview: ${css.slice(0, 200)}`);
    return;
  }

  // Step 3: Download the actual woff2 file
  const woff2 = await fetch(match[1]);
  writeFileSync(dest, woff2);
  console.log(`    ✓ ${font.file} (${(woff2.length / 1024).toFixed(0)} KB)`);
}

console.log('📦 Installing fonts to shared/assets/fonts/\n');

for (const font of FONTS) {
  try {
    await downloadFont(font);
  } catch (e) {
    console.error(`    ✗ Failed: ${e.message}`);
  }
}

// Final check
const missing = EXPECTED.filter(f => !existsSync(join(FONTS_DIR, f)));
if (missing.length) {
  console.log(`\n⚠ Missing fonts: ${missing.join(', ')}`);
  console.log('  Download manually — see shared/assets/fonts/README.md');
} else {
  console.log('\n✓ All fonts installed. Ready for offline presentations.');
}
