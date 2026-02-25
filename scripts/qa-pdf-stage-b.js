#!/usr/bin/env node
/**
 * QA PDF — Stage B (Plan B: light fallback, 1280×720, no animations)
 * Gera PDF via Reveal.js ?print-pdf + Playwright PDF export.
 *
 * Usage: PORT=5173 node scripts/qa-pdf-stage-b.js
 *
 * TODO: Adaptar para formato fallback final (handout, 2-up, notes layout, etc.)
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'aulas', 'cirrose', 'qa-screenshots', 'stage-b');

const PORT = process.env.PORT || 5173;
const PAGE_URL = `http://localhost:${PORT}/aulas/cirrose/index.stage-b.html?print-pdf`;

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  console.log(`Stage B (PDF) — ${PAGE_URL}`);
  await page.goto(PAGE_URL, { waitUntil: 'networkidle' });
  // Reveal ?print-pdf needs extra time to lay out all slides
  await page.waitForTimeout(3000);

  const pdfPath = join(OUT_DIR, 'cirrose-stage-b.pdf');
  await page.pdf({
    path: pdfPath,
    width: '1280px',
    height: '720px',
    printBackground: true,
    landscape: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log(`\nPDF saved to ${pdfPath}`);

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
