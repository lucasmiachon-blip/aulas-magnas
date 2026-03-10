import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'http://localhost:3000/aulas/cirrose/index.html';
const OUT = join(process.cwd(), 'aulas/cirrose/qa-screenshots/vote-elevation');

async function navigateToSlide(page, targetId, maxPresses = 80) {
  for (let i = 0; i < maxPresses; i++) {
    const currentId = await page.evaluate(() => {
      const active = document.querySelector('section.slide-active');
      return active ? active.id : null;
    });
    if (currentId === targetId) return true;
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(600);
  }
  return false;
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

  console.log('=== VOTE FINAL QA ===');
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForSelector('section.slide-active', { timeout: 15000 });
  await page.waitForTimeout(2000);

  const ok = await navigateToSlide(page, 's-a1-vote');
  if (!ok) { console.log('FAIL: could not reach s-a1-vote'); process.exit(1); }
  await page.waitForTimeout(1500);

  // T1: Pre-click
  await page.screenshot({ path: join(OUT, '01-pre-click-final.png') });
  console.log('T1: pre-click captured');

  // T2: Click option A
  const clicked = await page.evaluate(() => {
    const btn = document.querySelector('#s-a1-vote .vote-option[data-vote="A"]');
    if (!btn) return false;
    btn.click();
    return true;
  });
  console.log('T2: click A = ' + clicked);
  await page.waitForTimeout(2500);

  // T3: Post-click + clipping check
  await page.screenshot({ path: join(OUT, '02-post-click-final.png') });
  const postState = await page.evaluate(() => {
    const reveal = document.querySelector('#s-a1-vote .vote-reveal');
    const cs = reveal ? getComputedStyle(reveal) : null;
    const explanation = document.querySelector('#s-a1-vote .vote-explanation');
    const expRect = explanation ? explanation.getBoundingClientRect() : null;
    const heroNum = document.querySelector('#s-a1-vote .vote-hero-number');
    const verdict = document.querySelector('#s-a1-vote .vote-verdict');
    const optionA = document.querySelector('#s-a1-vote .vote-option[data-vote="A"]');
    const optionB = document.querySelector('#s-a1-vote .vote-option[data-vote="B"]');
    return {
      revealVisible: cs ? parseFloat(cs.opacity) > 0.5 : false,
      heroValue: heroNum ? heroNum.textContent.trim() : null,
      verdictText: verdict ? verdict.textContent.trim() : null,
      explanationBottom: expRect ? Math.round(expRect.bottom) : null,
      explanationClipped: expRect ? expRect.bottom > 720 : true,
      optionADimmed: optionA ? optionA.classList.contains('vote-option--dimmed') : false,
      optionBCorrect: optionB ? optionB.classList.contains('vote-option--correct') : false,
    };
  });
  console.log('T3: reveal=' + postState.revealVisible + ', hero="' + postState.heroValue + '", verdict="' + postState.verdictText + '"');
  console.log('    explanation bottom=' + postState.explanationBottom + 'px, clipped=' + postState.explanationClipped);
  console.log('    A dimmed=' + postState.optionADimmed + ', B correct=' + postState.optionBCorrect);

  // T4: Retreat
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: join(OUT, '03-retreat-final.png') });
  const retreatState = await page.evaluate(() => {
    const reveal = document.querySelector('#s-a1-vote .vote-reveal');
    const cs = reveal ? getComputedStyle(reveal) : null;
    const options = document.querySelectorAll('#s-a1-vote .vote-option');
    let dimmedCount = 0;
    options.forEach(o => { if (o.classList.contains('vote-option--dimmed')) dimmedCount++; });
    return {
      revealHidden: cs ? parseFloat(cs.opacity) < 0.1 : true,
      dimmedButtons: dimmedCount,
    };
  });
  console.log('T4: retreat - reveal hidden=' + retreatState.revealHidden + ', dimmed=' + retreatState.dimmedButtons);

  // T5: Re-click B
  const clickedB = await page.evaluate(() => {
    const btn = document.querySelector('#s-a1-vote .vote-option[data-vote="B"]');
    if (!btn) return false;
    btn.click();
    return true;
  });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: join(OUT, '04-reclick-B-final.png') });
  const reclickState = await page.evaluate(() => {
    const reveal = document.querySelector('#s-a1-vote .vote-reveal');
    const cs = reveal ? getComputedStyle(reveal) : null;
    const optionB = document.querySelector('#s-a1-vote .vote-option[data-vote="B"]');
    return {
      revealVisible: cs ? parseFloat(cs.opacity) > 0.5 : false,
      optionBCorrect: optionB ? optionB.classList.contains('vote-option--correct') : false,
    };
  });
  console.log('T5: re-click B - reveal=' + reclickState.revealVisible + ', B correct=' + reclickState.optionBCorrect);

  // T6: Leave and return
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1000);
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: join(OUT, '05-return-final.png') });
  const returnState = await page.evaluate(() => {
    const reveal = document.querySelector('#s-a1-vote .vote-reveal');
    const cs = reveal ? getComputedStyle(reveal) : null;
    const options = document.querySelectorAll('#s-a1-vote .vote-option');
    let dimmedCount = 0, correctCount = 0;
    options.forEach(o => {
      if (o.classList.contains('vote-option--dimmed')) dimmedCount++;
      if (o.classList.contains('vote-option--correct')) correctCount++;
    });
    return {
      revealHidden: cs ? parseFloat(cs.opacity) < 0.1 : true,
      dimmedButtons: dimmedCount,
      correctButtons: correctCount,
    };
  });
  console.log('T6: return - reveal hidden=' + returnState.revealHidden + ', dimmed=' + returnState.dimmedButtons + ', correct=' + returnState.correctButtons);

  if (errors.length) {
    console.log('\nConsole errors: ' + errors.length);
    errors.slice(0, 5).forEach(e => console.log('  ' + e.substring(0, 150)));
  } else {
    console.log('\nZero console errors');
  }

  const results = [
    { test: 'T1 pre-click render', pass: true },
    { test: 'T2 button click works', pass: clicked },
    { test: 'T3 reveal visible + no clip', pass: postState.revealVisible && !postState.explanationClipped && postState.optionBCorrect },
    { test: 'T4 retreat resets', pass: retreatState.revealHidden && retreatState.dimmedButtons === 0 },
    { test: 'T5 re-click works', pass: reclickState.revealVisible && reclickState.optionBCorrect },
    { test: 'T6 leave+return resets', pass: returnState.revealHidden && returnState.dimmedButtons === 0 && returnState.correctButtons === 0 },
    { test: 'T7 zero console errors', pass: errors.length === 0 },
  ];

  console.log('\n=== RESULTS ===');
  results.forEach(r => console.log((r.pass ? 'PASS' : 'FAIL') + ' ' + r.test));
  const fails = results.filter(r => !r.pass).length;
  console.log('\n' + (results.length - fails) + '/' + results.length + ' PASS');

  await browser.close();
  process.exit(fails > 0 ? 1 : 0);
})();
