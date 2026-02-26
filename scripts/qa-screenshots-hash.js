#!/usr/bin/env node
/**
 * QA Screenshots — via hash navigation (no window.Reveal needed)
 * Navigates by setting location.hash = #/N for each slide.
 * Uses ?qa=1 to force final animation state.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'qa-screenshots', 'stage-c-floating');

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

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  // Load first slide
  const baseUrl = `http://localhost:${PORT}/aulas/cirrose/index.stage-c.html?qa=1`;
  console.log(`Loading ${baseUrl}`);
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  // Wait for deck to be somewhat ready (sections visible)
  await page.waitForSelector('section[id]', { timeout: 15000 });
  await page.waitForTimeout(3000); // Extra time for init

  console.log(`Taking ${SLIDE_IDS.length} screenshots...`);

  for (let i = 0; i < SLIDE_IDS.length; i++) {
    const id = SLIDE_IDS[i];
    const padded = String(i).padStart(2, '0');
    const filename = `${padded}-${id}.png`;

    // Navigate via hash
    await page.evaluate((slideId) => {
      window.location.hash = `#/${slideId}`;
    }, id);

    await page.waitForTimeout(800); // Wait for transition

    await page.screenshot({
      path: join(OUT_DIR, filename),
      type: 'png',
    });

    console.log(`  [${padded}] ${id} ✓`);
  }

  await browser.close();
  console.log(`\nDone — ${SLIDE_IDS.length} screenshots in ${OUT_DIR}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
