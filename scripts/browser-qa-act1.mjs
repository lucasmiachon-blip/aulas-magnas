/**
 * Browser QA — Adaptive navigation through deck
 * Keeps pressing ArrowRight and screenshots each NEW slide seen.
 * Detects slide ID changes automatically — no hardcoded click counts.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'http://localhost:3000/aulas/cirrose/index.html';
const OUT = join(process.cwd(), 'aulas/cirrose/qa-screenshots/browser-qa');

const ACT1_IDS = ['s-title','s-hook','s-a1-01','s-a1-vote','s-a1-damico','s-a1-baveno','s-a1-fib4','s-a1-rule5','s-a1-meld','s-a1-classify','s-cp1'];
const ACT2_IDS = ['s-a2-01','s-a2-02','s-a2-03','s-a2-04','s-a2-05','s-a2-06','s-a2-07','s-a2-08','s-a2-09','s-a2-10','s-a2-11','s-a2-12','s-a2-13','s-a2-14','s-a2-15','s-cp2'];
const STOP_AFTER = process.argv[2] === 'act2' ? 's-cp2' : 's-cp1';
const TARGET_IDS = process.argv[2] === 'act2' ? [...ACT1_IDS, ...ACT2_IDS] : ACT1_IDS;

async function getActiveSlide(page) {
  return await page.evaluate(() => {
    const active = document.querySelector('section.slide-active');
    if (!active) return null;
    const h2 = active.querySelector('h2, .slide-headline');
    const rect = h2 ? h2.getBoundingClientRect() : null;
    const panel = document.querySelector('.case-panel');
    const panelRect = panel ? panel.getBoundingClientRect() : null;
    const sourceTag = active.querySelector('.source-tag');
    const allText = active.innerText || '';

    let headlineLines = 0;
    let headlineOverflow = false;
    if (h2 && rect) {
      const lh = parseFloat(getComputedStyle(h2).lineHeight) || 34;
      headlineLines = Math.round(rect.height / lh);
      headlineOverflow = h2.scrollHeight > h2.clientHeight + 2;
    }

    let panelOverlap = false;
    if (panelRect && panelRect.width > 10) {
      const inner = active.querySelector('.slide-inner');
      if (inner) {
        const ir = inner.getBoundingClientRect();
        if (ir.right > panelRect.left + 5) panelOverlap = true;
      }
    }

    const flowSteps = active.querySelectorAll('.flow-step');
    let visibleSteps = 0;
    let clippedSteps = 0;
    for (const step of flowSteps) {
      const r = step.getBoundingClientRect();
      if (r.bottom <= 720 && r.top >= 0 && r.height > 10) visibleSteps++;
      else if (r.height > 0) clippedSteps++;
    }

    // Check for empty/missing content
    const cards = active.querySelectorAll('.flow-step, .metric-card, .vote-option, .card, [class*="card"]');
    const sectionTag = active.querySelector('.section-tag');

    return {
      id: active.id,
      headlineText: h2 ? h2.textContent.trim() : null,
      headlineLines,
      headlineOverflow,
      headlineRect: rect ? { w: Math.round(rect.width), h: Math.round(rect.height) } : null,
      panelVisible: panelRect ? panelRect.width > 10 : false,
      panelOverlap,
      sourceTagText: sourceTag ? sourceTag.textContent.trim() : null,
      hasTBD: allText.includes('[TBD'),
      hasBadPMID: allText.includes('32275982'),
      flowTotal: flowSteps.length,
      flowVisible: visibleSteps,
      flowClipped: clippedSteps,
      cardCount: cards.length,
      hasSectionTag: !!sectionTag,
      sectionTagText: sectionTag ? sectionTag.textContent.trim() : null,
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

  console.log('Config: 1280x720 Chromium headless');
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('section.slide-active', { timeout: 15000 });
  await page.waitForTimeout(1500);
  console.log('Deck loaded\n');

  const seen = new Map(); // id -> { info, stateCount, screenshots }
  let lastId = null;
  let maxPresses = 200; // safety limit

  while (maxPresses-- > 0) {
    const info = await getActiveSlide(page);
    if (!info) break;

    const id = info.id;

    if (id !== lastId) {
      // New slide — screenshot state 0
      const stateNum = 0;
      const path = join(OUT, `${id}-s${stateNum}.png`);
      await page.screenshot({ path, fullPage: false });

      seen.set(id, { info, stateCount: 1, screenshots: [path], issues: [] });

      // Log
      const short = info.headlineText ? info.headlineText.substring(0, 65) : 'N/A';
      console.log(`[${id}] h2="${short}${(info.headlineText||'').length > 65 ? '...' : ''}" lines=${info.headlineLines} overflow=${info.headlineOverflow}`);
      if (info.panelOverlap) console.log(`  ⚠ PANEL_OVERLAP`);
      if (info.hasTBD) console.log(`  ⚠ [TBD] in projected content`);
      if (info.hasBadPMID) console.log(`  ⚠ BAD PMID 32275982`);
      if (info.flowTotal > 0) console.log(`  flow: ${info.flowVisible}/${info.flowTotal} visible, ${info.flowClipped} clipped`);
      if (info.sourceTagText) console.log(`  src: "${info.sourceTagText.substring(0, 70)}"`);

      lastId = id;

      if (id === STOP_AFTER) {
        console.log(`\nReached ${STOP_AFTER} — stopping.`);
        break;
      }
    } else {
      // Same slide, different state — screenshot
      const entry = seen.get(id);
      const stateNum = entry.stateCount;
      const path = join(OUT, `${id}-s${stateNum}.png`);
      await page.screenshot({ path, fullPage: false });
      entry.stateCount++;
      entry.screenshots.push(path);
      console.log(`  [${id} state ${stateNum}]`);
    }

    // Press ArrowRight
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(900);
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Slides seen: ${seen.size}`);
  console.log(`Total screenshots: ${[...seen.values()].reduce((n, v) => n + v.screenshots.length, 0)}`);

  const targetAct = process.argv[2] === 'act2' ? ACT2_IDS : ACT1_IDS;
  const missing = targetAct.filter(id => !seen.has(id));
  if (missing.length) console.log(`⚠ MISSING slides: ${missing.join(', ')}`);

  const issueSlides = [];
  for (const [id, entry] of seen) {
    const { info } = entry;
    const issues = [];
    if (info.headlineOverflow) issues.push('HEADLINE_OVERFLOW');
    if (info.headlineLines > 2) issues.push(`HEADLINE_${info.headlineLines}_LINES`);
    if (info.hasTBD) issues.push('TBD_VISIBLE');
    if (info.hasBadPMID) issues.push('BAD_PMID');
    if (info.panelOverlap) issues.push('PANEL_OVERLAP');
    if (info.flowTotal > 0 && info.flowClipped > 0) issues.push('FLOW_CLIPPED');
    if (issues.length) {
      issueSlides.push({ id, issues });
      console.log(`  ${id}: ${issues.join(', ')}`);
    }
  }
  if (!issueSlides.length) console.log('  No automated issues detected');

  if (errors.length) {
    console.log(`\n⚠ ${errors.length} console error(s):`);
    errors.slice(0, 5).forEach(e => console.log(`  ${e.substring(0, 150)}`));
  } else {
    console.log('\nZero console errors');
  }

  await browser.close();
})();
