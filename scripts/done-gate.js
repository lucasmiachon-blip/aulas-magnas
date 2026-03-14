/**
 * done-gate.js — Definition of Done verification
 *
 * 3 gates:
 *   Gate 1 (Technical):    build + lint pass
 *   Gate 2 (Browser QA):   screenshots fresher than code changes
 *   Gate 3 (Propagation):  checklist + automated stale-detection
 *
 * Usage: node scripts/done-gate.js [aula] [--strict]
 *   aula defaults to "cirrose"
 *   --strict: warnings become FAIL (for session close / push safety)
 *
 * Exit codes: 0 = all gates pass, 1 = any gate fail
 */
import { execSync } from 'node:child_process';
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const args = process.argv.slice(2);
const strict = args.includes('--strict');
const aula = args.find(a => a !== '--strict') || 'cirrose';
const aulaDir = join(root, 'aulas', aula);

let gate1Pass = true;
let gate2Warnings = [];
let gate3Warnings = [];

const SEP = '='.repeat(60);

console.log(`\n${SEP}`);
console.log(`  DONE GATE — aulas/${aula}${strict ? '  [STRICT]' : ''}`);
console.log(`${SEP}\n`);

// ── Gate 1: Technical ────────────────────────────────────────────
console.log('-- GATE 1: Technical (automated) --\n');

const commands = [
  { name: 'build', cmd: `npm run build:${aula}` },
  { name: 'lint:slides', cmd: 'npm run lint:slides' },
  { name: 'lint:case-sync', cmd: `node scripts/lint-case-sync.js ${aula}` },
  { name: 'lint:narrative-sync', cmd: `node scripts/lint-narrative-sync.js ${aula}` },
];

for (const { name, cmd } of commands) {
  try {
    execSync(cmd, { cwd: root, stdio: 'pipe', encoding: 'utf-8' });
    console.log(`  PASS  ${name}`);
  } catch (e) {
    const firstLine = (e.stderr || e.stdout || '').trim().split('\n')[0];
    console.log(`  FAIL  ${name}`);
    if (firstLine) console.log(`        ${firstLine}`);
    gate1Pass = false;
  }
}

// ── Gate 2: Browser QA ───────────────────────────────────────────
console.log('\n-- GATE 2: Browser QA (freshness check) --\n');

function newestMtime(dir, ext) {
  let newest = 0;
  try {
    for (const f of readdirSync(dir)) {
      if (f.startsWith('_') || f.startsWith('.')) continue;
      const full = join(dir, f);
      try {
        const s = statSync(full);
        if (s.isFile() && full.endsWith(ext) && s.mtimeMs > newest) newest = s.mtimeMs;
        if (s.isDirectory()) {
          const sub = newestMtime(full, ext);
          if (sub > newest) newest = sub;
        }
      } catch {}
    }
  } catch {}
  return newest;
}

const slidesDir = join(aulaDir, 'slides');
const screenshotsDir = join(aulaDir, 'qa-screenshots');
const cssPath = join(aulaDir, `${aula}.css`);
const registryPath = join(aulaDir, 'slide-registry.js');

const newestSlide = newestMtime(slidesDir, '.html');
const newestCss = (() => { try { return statSync(cssPath).mtimeMs; } catch { return 0; } })();
const newestRegistry = (() => { try { return statSync(registryPath).mtimeMs; } catch { return 0; } })();
const newestCode = Math.max(newestSlide, newestCss, newestRegistry);
const newestScreenshot = newestMtime(screenshotsDir, '.png');

if (newestScreenshot === 0) {
  console.log('  WARN  No screenshots found in qa-screenshots/');
  gate2Warnings.push('No screenshots');
} else if (newestCode > newestScreenshot) {
  const hrs = ((newestCode - newestScreenshot) / 3600000).toFixed(1);
  console.log(`  WARN  Code is ${hrs}h newer than latest screenshot`);
  console.log('        Run browser QA before marking done');
  gate2Warnings.push(`Screenshots ${hrs}h stale`);
} else {
  console.log('  PASS  Screenshots are fresh (newer than code)');
}

// Uncommitted changes (staged + unstaged + untracked)
try {
  const status = execSync('git status --porcelain 2>/dev/null', { cwd: root, encoding: 'utf-8', shell: true }).trim();
  const aulaFiles = status.split('\n')
    .filter(l => l.length > 3)
    .map(l => l.slice(3).trim())
    .filter(f => f.startsWith(`aulas/${aula}/`));
  if (aulaFiles.length > 0) {
    console.log(`  WARN  ${aulaFiles.length} uncommitted file(s):`);
    aulaFiles.forEach(f => console.log(`        ${f}`));
    gate2Warnings.push(`${aulaFiles.length} uncommitted files`);
  }
} catch {}

// ── Gate 3: Propagation & Cleanup ────────────────────────────────
console.log('\n-- GATE 3: Propagation & Cleanup --\n');

// Auto-detect stale patterns in HANDOFF
try {
  const handoff = readFileSync(join(aulaDir, 'HANDOFF.md'), 'utf-8');

  const stalePatterns = [
    { pattern: /em andamento/gi, label: '"em andamento"' },
    { pattern: /\[LUCAS DECIDE\]/g, label: '[LUCAS DECIDE]' },
    { pattern: /\[TBD\]/g, label: '[TBD]' },
  ];

  for (const { pattern, label } of stalePatterns) {
    const matches = handoff.match(pattern);
    if (matches) {
      console.log(`  INFO  HANDOFF.md: ${matches.length}x ${label} — verify still accurate`);
      gate3Warnings.push(`HANDOFF has ${label}`);
    }
  }
} catch {}

// Check ERROR-LOG for pending items
try {
  const errorLog = readFileSync(join(aulaDir, 'ERROR-LOG.md'), 'utf-8');
  const pendentes = (errorLog.match(/⚠\s*PENDENTE|Status:.*PENDENTE/gi) || []).length;
  if (pendentes > 0) {
    console.log(`  WARN  ERROR-LOG.md: ${pendentes} item(s) PENDENTE`);
    gate3Warnings.push(`${pendentes} PENDENTE in ERROR-LOG`);
  }
} catch {}

// Check slides for projected [TBD] (not in notes)
try {
  const slideFiles = readdirSync(slidesDir).filter(f => f.endsWith('.html') && !f.startsWith('_'));
  let projectedTbd = 0;
  for (const f of slideFiles) {
    const content = readFileSync(join(slidesDir, f), 'utf-8');
    let inNotes = false;
    for (const line of content.split('\n')) {
      if (/<aside\s+class="notes">/.test(line)) inNotes = true;
      if (/<\/aside>/.test(line)) inNotes = false;
      if (!inNotes && /\[TBD/.test(line)) {
        console.log(`  WARN  ${f}: [TBD] in projected content (not notes)`);
        projectedTbd++;
      }
    }
  }
  if (projectedTbd > 0) gate3Warnings.push(`${projectedTbd} projected [TBD]`);
} catch {}

// Manual checklist
console.log('\n  Manual checklist:');
console.log('  [ ] HANDOFF.md reflects actual state');
console.log('  [ ] If PMID changed: grep all HTML for old value');
console.log('  [ ] If h2 changed: _manifest.js headline matches');
console.log('  [ ] Speaker notes have [DATA] tags for numbers');

// ── Verdict ──────────────────────────────────────────────────────
const totalWarnings = gate2Warnings.length + gate3Warnings.length;
const allClear = gate1Pass && totalWarnings === 0;
const strictFail = strict && totalWarnings > 0;

console.log(`\n${SEP}`);
if (allClear) {
  console.log('  ALL GATES PASS — ready to mark done');
  if (strict) console.log('  STRICT: safe to push');
} else if (!gate1Pass) {
  console.log('  GATE 1 FAIL — fix technical issues first');
} else if (strictFail) {
  console.log(`  STRICT FAIL — ${totalWarnings} blocker(s):`);
  [...gate2Warnings, ...gate3Warnings].forEach(w => console.log(`    - ${w}`));
  console.log('  Resolve ALL before session close / push');
} else {
  console.log(`  GATE 1 PASS | ${totalWarnings} warning(s):`);
  [...gate2Warnings, ...gate3Warnings].forEach(w => console.log(`    - ${w}`));
  console.log('  Review warnings before marking done');
}
console.log(`${SEP}\n`);

process.exit((gate1Pass && !strictFail) ? 0 : 1);
