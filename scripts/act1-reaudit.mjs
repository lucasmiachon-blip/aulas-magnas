/**
 * Act 1 Re-Audit QA — Detailed browser navigation with fill ratio + state analysis
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'http://localhost:3000/aulas/cirrose/index.html';
const OUT = join(process.cwd(), 'aulas/cirrose/qa-screenshots/act1-reaudit');

const ACT1_IDS = ['s-title','s-hook','s-a1-01','s-a1-vote','s-a1-damico','s-a1-baveno','s-a1-fib4','s-a1-rule5','s-a1-meld','s-a1-classify','s-cp1'];

async function getSlideInfo(page) {
  return await page.evaluate(() => {
    const active = document.querySelector('section.slide-active');
    if (!active) return null;
    const h2 = active.querySelector('h2, .slide-headline');
    const rect = h2 ? h2.getBoundingClientRect() : null;
    const panel = document.querySelector('.case-panel');
    const panelRect = panel ? panel.getBoundingClientRect() : null;
    const sourceTag = active.querySelector('.source-tag');
    const allText = active.innerText || '';
    const sectionTag = active.querySelector('.section-tag');

    const inner = active.querySelector('.slide-inner');
    const innerRect = inner ? inner.getBoundingClientRect() : null;

    let panelOverlap = false;
    if (panelRect && panelRect.width > 10 && innerRect) {
      if (innerRect.right > panelRect.left + 5) panelOverlap = true;
    }

    let h2Lines = 0;
    if (h2 && rect) {
      const lh = parseFloat(getComputedStyle(h2).lineHeight) || 34;
      h2Lines = Math.round(rect.height / lh);
    }

    // Fill ratio estimate
    let fillRatio = 0;
    if (inner) {
      const canvasArea = 1280 * 720;
      const children = inner.querySelectorAll('h2, p, div, span, table, svg, img, canvas, input, button');
      let usedArea = 0;
      children.forEach(el => {
        const b = el.getBoundingClientRect();
        if (b.height > 5 && b.width > 5 && el.closest('aside') === null) {
          usedArea += b.width * b.height;
        }
      });
      fillRatio = Math.round(usedArea / canvasArea * 100);
    }

    // Word count (projected content only, excluding notes)
    const clone = active.cloneNode(true);
    const notes = clone.querySelector('aside.notes');
    if (notes) notes.remove();
    const projectedText = clone.innerText || '';
    const wordCount = projectedText.split(/\s+/).filter(Boolean).length;

    return {
      id: active.id,
      h2Text: h2 ? h2.textContent.trim() : null,
      h2Lines,
      h2Width: rect ? Math.round(rect.width) : 0,
      panelVisible: panelRect ? panelRect.width > 10 : false,
      panelOverlap,
      sourceTag: sourceTag ? sourceTag.textContent.trim() : null,
      sectionTag: sectionTag ? sectionTag.textContent.trim() : null,
      hasTBD: allText.includes('[TBD'),
      fillRatio,
      wordCount,
    };
  });
}

(async () => {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await (await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  })).newPage();

  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', e => errors.push('PAGE: ' + e.message));

  console.log('=== ACT 1 RE-AUDIT QA ===');
  console.log('Viewport: 1280x720, Chromium headless\n');
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('section.slide-active', { timeout: 15000 });
  await page.waitForTimeout(2000);
  console.log('Deck loaded\n');

  const seen = new Map();
  let lastId = null;
  let maxPresses = 150;

  while (maxPresses-- > 0) {
    const info = await getSlideInfo(page);
    if (!info) break;
    const id = info.id;

    if (id !== lastId) {
      const stateNum = 0;
      const path = join(OUT, `${id}-s${stateNum}.png`);
      await page.screenshot({ path, fullPage: false });
      seen.set(id, { states: [{ info, path, stateNum: 0 }] });

      console.log(`[${id}] h2="${(info.h2Text || 'N/A').substring(0, 80)}"`);
      console.log(`  h2Lines=${info.h2Lines} panel=${info.panelVisible} overlap=${info.panelOverlap} fill~=${info.fillRatio}% words=${info.wordCount}`);
      if (info.sourceTag) console.log(`  src: ${info.sourceTag.substring(0, 90)}`);
      if (info.sectionTag) console.log(`  tag: ${info.sectionTag}`);
      if (info.hasTBD) console.log(`  ⚠ [TBD] detected`);
      if (info.panelOverlap) console.log(`  ⚠ PANEL_OVERLAP`);

      lastId = id;
      if (id === 's-cp1') {
        console.log('\nReached s-cp1 — stopping.');
        break;
      }
    } else {
      const entry = seen.get(id);
      const stateNum = entry.states.length;
      const path = join(OUT, `${id}-s${stateNum}.png`);
      await page.screenshot({ path, fullPage: false });
      const info2 = await getSlideInfo(page);
      entry.states.push({ info: info2, path, stateNum });
      console.log(`  [${id} state ${stateNum}] fill~=${info2 ? info2.fillRatio : '?'}% words=${info2 ? info2.wordCount : '?'}`);
    }

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1000);
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Slides: ${seen.size}`);
  let totalSS = 0;
  for (const [, e] of seen) totalSS += e.states.length;
  console.log(`Screenshots: ${totalSS}`);

  const missing = ACT1_IDS.filter(id => !seen.has(id));
  if (missing.length) console.log(`⚠ MISSING: ${missing.join(', ')}`);
  else console.log('All 11 Act 1 slides seen');

  if (errors.length) {
    console.log(`\n⚠ Console errors: ${errors.length}`);
    errors.slice(0,5).forEach(e => console.log(`  ${e.substring(0,150)}`));
  } else {
    console.log('Zero console errors');
  }

  // Per-slide summary
  console.log('\n=== PER-SLIDE DETAIL ===');
  for (const [id, entry] of seen) {
    const s0 = entry.states[0].info;
    const sLast = entry.states[entry.states.length - 1].info;
    console.log(`\n${id}:`);
    console.log(`  States: ${entry.states.length}`);
    console.log(`  h2: "${(s0.h2Text || 'N/A').substring(0, 100)}"`);
    console.log(`  h2Lines: ${s0.h2Lines} | fillRatio s0: ${s0.fillRatio}% | fillRatio final: ${sLast.fillRatio}%`);
    console.log(`  words s0: ${s0.wordCount} | words final: ${sLast.wordCount}`);
    console.log(`  panel: ${s0.panelVisible} | overlap: ${s0.panelOverlap}`);
    console.log(`  sourceTag: ${s0.sourceTag ? 'yes' : 'no'} | sectionTag: ${s0.sectionTag || 'none'}`);
  }

  await browser.close();
})();
