#!/usr/bin/env node
/**
 * QA Screenshots - Captura os 28 slides da cirrose via Playwright.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'aulas', 'cirrose', 'qa-screenshots');

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

const PORT = process.env.PORT || 3000;
const PAGE_URL = `http://localhost:${PORT}/aulas/cirrose/index.stage-c.html`;

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  await page.goto(PAGE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const files = [];
  for (let i = 0; i < 28; i++) {
    const num = String(i + 1).padStart(2, '0');
    const id = SLIDE_IDS[i];
    const filename = num + '-' + id + '.png';
    const filepath = join(OUT_DIR, filename);
    await page.screenshot({ path: filepath });
    files.push(filename);
    if (i < 27) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(300);
    }
  }
  await browser.close();
  console.log('Screenshots saved to', OUT_DIR);
  files.forEach((f) => console.log('  -', f));
  return files;
}

main().catch((e) => { console.error(e); process.exit(1); });
