#!/usr/bin/env node
/**
 * QA Screenshots — Stage A (Plan A: dark/navy, 1920×1080, full animations)
 * Captura os 28 slides da cirrose via Playwright.
 *
 * Usage: PORT=5173 node scripts/qa-screenshots-stage-a.js
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'aulas', 'cirrose', 'qa-screenshots', 'stage-a');

const SLIDE_IDS = [
  's-title', 's-a1-01', 's-a1-02', 's-hook', 's-a1-03', 's-a1-04', 's-a1-05',
  's-cp1',
  's-a2-01', 's-a2-02', 's-a2-03', 's-a2-04', 's-a2-05', 's-a2-06',
  's-cp2',
  's-a3-01', 's-a3-02', 's-a3-03',
  's-cp3',
  's-close',
  's-app-01', 's-app-02', 's-app-03', 's-app-04', 's-app-05', 's-app-06', 's-app-07', 's-app-08',
];

const PORT = process.env.PORT || 5173;
const PAGE_URL = `http://localhost:${PORT}/aulas/cirrose/index.html`;

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  console.log(`Stage A — ${PAGE_URL}`);
  await page.goto(PAGE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const files = [];
  for (let i = 0; i < SLIDE_IDS.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    const id = SLIDE_IDS[i];
    const filename = `${num}-${id}.png`;
    const filepath = join(OUT_DIR, filename);
    await page.screenshot({ path: filepath });
    files.push(filename);
    if (i < SLIDE_IDS.length - 1) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(400);
    }
  }

  await browser.close();
  console.log(`\n${files.length} screenshots saved to ${OUT_DIR}`);
  files.forEach((f) => console.log('  -', f));
}

main().catch((e) => { console.error(e); process.exit(1); });
