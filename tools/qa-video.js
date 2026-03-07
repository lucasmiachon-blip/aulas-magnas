#!/usr/bin/env node
/**
 * QA Video — Grava .webm de cada slide com animações reais
 *
 * Playwright recordVideo captura o browser real:
 *   → GSAP rodando (countUp, stagger, drawPath)
 *   → Transições Reveal.js
 *   → Fragment reveals
 *   → Click-reveal progressivo
 *
 * Output: qa-screenshots/videos/{slide-id}.webm
 *
 * Usage:
 *   npm run qa:video                     # todos os slides
 *   npm run qa:video -- --slide=s-hook   # slide específico
 *   npm run qa:video -- --batch=0,5      # slides 0 a 4
 *
 * Workflow:
 *   1. Rodar: npm run qa:video
 *   2. Abrir qa-screenshots/videos/
 *   3. Upload do .webm para Gemini Ultra
 *   4. Gemini analisa animação real com contexto clínico
 *
 * Requer servidor: npm run dev  (ou npm run preview)
 */
import { chromium } from 'playwright';
import { mkdirSync, existsSync, renameSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_ROOT = join(ROOT, 'qa-screenshots', 'videos');
const TMP_DIR = join(ROOT, 'qa-screenshots', '.video-tmp');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}/aulas/cirrose/index.html`;
const VIEWPORT = { width: 1280, height: 720 };

// Quanto tempo esperar entre cada ação (ms)
const TIMING = {
  afterNav: 800,        // após navegar para o slide
  afterTransition: 600, // após cada fragment/reveal
  endPause: 1000,       // pausa final antes de parar gravação
};

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
}

async function getFragmentCount(page) {
  return page.evaluate(() => {
    const slide = window.Reveal.getCurrentSlide();
    if (!slide) return 0;
    return slide.querySelectorAll('.fragment:not(.visible)').length;
  });
}

async function recordSlide(browser, slideIndex, slideId) {
  // Cada slide precisa de um contexto separado para ter o próprio vídeo
  const tmpSlideDir = join(TMP_DIR, `slide-${slideIndex}`);
  mkdirSync(tmpSlideDir, { recursive: true });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    recordVideo: {
      dir: tmpSlideDir,
      size: VIEWPORT,
    },
  });

  const page = await context.newPage();

  // Navegar e ir direto ao slide (sem hash navigation para não pegar transição da homepage)
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await waitForReveal(page);

  // Ir para o slide alvo (sem animação de transição da homepage)
  await page.evaluate((idx) => {
    window.Reveal.configure({ transition: 'none' });
    window.Reveal.slide(idx);
  }, slideIndex);

  await page.waitForTimeout(200);

  // Restaurar transição normal (para mostrar no vídeo)
  await page.evaluate(() => {
    window.Reveal.configure({ transition: 'fade' });
  });

  await page.waitForTimeout(TIMING.afterNav);

  // Avançar todos os fragments um por um
  let safetyCounter = 0;
  while (safetyCounter < 20) {
    const remaining = await getFragmentCount(page);
    if (remaining === 0) break;
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(TIMING.afterTransition);
    safetyCounter++;
  }

  // Pausa final para mostrar estado completo
  await page.waitForTimeout(TIMING.endPause);

  // Fechar contexto → Playwright salva o vídeo
  const videoPath = await page.video()?.path();
  await context.close();

  // Mover para output final com nome correto
  const finalName = `${slideId}.webm`;
  const finalPath = join(OUT_ROOT, finalName);

  if (videoPath && existsSync(videoPath)) {
    renameSync(videoPath, finalPath);
  }

  return finalPath;
}

async function getSlideMap(browser) {
  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await waitForReveal(page);
  const slideMap = await page.evaluate(() =>
    window.Reveal.getSlides().map((el, i) => ({ index: i, id: el.id || null }))
  );
  await ctx.close();
  return slideMap;
}

async function main() {
  // Preparar dirs
  try { rmSync(TMP_DIR, { recursive: true }); } catch {}
  mkdirSync(OUT_ROOT, { recursive: true });
  mkdirSync(TMP_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  console.log(`QA Video → ${BASE_URL}\n`);
  const slideMap = await getSlideMap(browser);

  let targets = slideMap;
  if (slideFilter) {
    targets = slideMap.filter(s => s.id === slideFilter);
    if (!targets.length) { console.error(`Slide "${slideFilter}" não encontrado.`); process.exit(1); }
  } else if (batchRange) {
    targets = slideMap.slice(batchRange.from, batchRange.to);
  }

  console.log(`Gravando ${targets.length} slide(s)...\n`);

  for (const { index, id } of targets) {
    const label = id || `slide-${String(index).padStart(2, '0')}`;
    process.stdout.write(`  [${String(index).padStart(2, '0')}] ${label} → gravando...`);
    const path = await recordSlide(browser, index, label);
    process.stdout.write(` ✓ ${label}.webm\n`);
  }

  await browser.close();
  try { rmSync(TMP_DIR, { recursive: true }); } catch {}

  console.log(`\n✓ Vídeos → qa-screenshots/videos/`);
  console.log(`\nPróximo passo:`);
  console.log(`  1. Abrir qa-screenshots/videos/`);
  console.log(`  2. Upload do .webm para Gemini Ultra`);
  console.log(`  3. Prompt: "Analise esta apresentação médica para hepatologistas..."`);
}

main().catch(e => { console.error(e); process.exit(1); });
