#!/usr/bin/env node
/**
 * QA Static — Screenshots de todos os estados por slide
 *
 * Captura S0 (inicial) + S1..SN (um por fragment/reveal)
 * Output: qa-screenshots/static/{slide-id}/s0.png, s1.png, ...
 *
 * Usage:
 *   npm run qa:static                     # todos os slides
 *   npm run qa:static -- --slide=s-hook   # slide específico
 *   npm run qa:static -- --batch=0,3      # slides 0 a 2
 *
 * Requer servidor rodando: npm run dev  (ou npm run preview)
 */
import { chromium } from 'playwright';
import { mkdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_ROOT = join(ROOT, 'qa-screenshots', 'static');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}/aulas/cirrose/index.html`;
const VIEWPORT = { width: 1280, height: 720 };

// Parse args
const args = process.argv.slice(2);
const slideFilter = args.find(a => a.startsWith('--slide='))?.split('=')[1];
const batchArg = args.find(a => a.startsWith('--batch='))?.split('=')[1];
let batchRange = null;
if (batchArg) {
  const [from, to] = batchArg.split(',').map(Number);
  batchRange = { from, to };
}

async function waitForReveal(page) {
  await page.waitForFunction(
    () => typeof window.Reveal !== 'undefined' && window.Reveal.isReady?.(),
    { timeout: 15000 }
  );
  await page.waitForTimeout(500); // deixar animações iniciais estabilizarem
}

async function getFragmentCount(page) {
  return page.evaluate(() => {
    const slide = window.Reveal.getCurrentSlide();
    if (!slide) return 0;
    const fragments = slide.querySelectorAll('.fragment:not(.visible)');
    return fragments.length;
  });
}

async function triggerFragment(page) {
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(600); // esperar animação completar
}

async function captureSlide(page, slideIndex, slideId) {
  const outDir = join(OUT_ROOT, slideId || `slide-${String(slideIndex).padStart(2, '0')}`);
  mkdirSync(outDir, { recursive: true });

  // Navegar para o slide
  await page.evaluate((idx) => window.Reveal.slide(idx), slideIndex);
  await page.waitForTimeout(800); // transição

  const screenshots = [];

  // S0 — estado inicial
  const s0Path = join(outDir, 's0.png');
  await page.screenshot({ path: s0Path, fullPage: false });
  screenshots.push('s0.png');

  // S1..SN — um por fragment
  let step = 1;
  while (true) {
    const remaining = await getFragmentCount(page);
    if (remaining === 0) break;
    await triggerFragment(page);
    const sPath = join(outDir, `s${step}.png`);
    await page.screenshot({ path: sPath, fullPage: false });
    screenshots.push(`s${step}.png`);
    step++;
    if (step > 20) break; // safety cap
  }

  return { slideId: slideId || `slide-${slideIndex}`, states: screenshots };
}

async function getSlideIndex(page) {
  return page.evaluate(() => {
    const slides = window.Reveal.getSlides();
    return slides.map((el, i) => ({ index: i, id: el.id || null }));
  });
}

async function main() {
  // Limpar output
  try { rmSync(OUT_ROOT, { recursive: true }); } catch {}
  mkdirSync(OUT_ROOT, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  console.log(`QA Static → ${BASE_URL}\n`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await waitForReveal(page);

  // Obter mapa de slides
  const slideMap = await getSlideIndex(page);

  // Filtrar por args
  let targets = slideMap;
  if (slideFilter) {
    targets = slideMap.filter(s => s.id === slideFilter);
    if (!targets.length) {
      console.error(`Slide "${slideFilter}" não encontrado.`);
      process.exit(1);
    }
  } else if (batchRange) {
    targets = slideMap.slice(batchRange.from, batchRange.to);
  }

  console.log(`Capturando ${targets.length} slide(s)...\n`);

  const report = [];
  for (const { index, id } of targets) {
    process.stdout.write(`  [${String(index).padStart(2, '0')}] ${id || '(sem id)'} → `);
    const result = await captureSlide(page, index, id || `slide-${String(index).padStart(2, '0')}`);
    process.stdout.write(`${result.states.length} estado(s): ${result.states.join(', ')}\n`);
    report.push(result);
  }

  await browser.close();

  console.log(`\n✓ ${report.reduce((a, r) => a + r.states.length, 0)} screenshots → qa-screenshots/static/`);
  console.log(`\nPara enviar ao Gemini: cada pasta = 1 slide, imagens em ordem S0→SN`);
}

main().catch(e => { console.error(e); process.exit(1); });
