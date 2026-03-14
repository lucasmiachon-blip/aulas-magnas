/**
 * lint-case-sync.js — Validates _manifest.js panelStates against CASE.md
 *
 * Source of truth: references/CASE.md (Reference Hierarchy #1)
 * Derived file:   slides/_manifest.js panelStates (Reference Hierarchy #4)
 *
 * Parses CASE.md checkpoint sections and compares lab values with
 * _manifest.js panelStates. Fails on any mismatch.
 *
 * Usage: node scripts/lint-case-sync.js [aula]
 *   aula defaults to "cirrose"
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const aula = process.argv[2] || 'cirrose';
const aulaDir = join(root, 'aulas', aula);

let errors = 0;

function err(msg) {
  console.error(`  ❌ ${msg}`);
  errors++;
}

function ok(msg) {
  console.log(`  ✅ ${msg}`);
}

// ── Parse CASE.md ──────────────────────────────────────────────
function parseCaseMd(path) {
  const text = readFileSync(path, 'utf-8');
  const states = {};

  // Parse baseline labs (table format: | Exame | Valor | ...)
  const baseline = {};
  const tableRows = text.match(/^\|[^|]+\|[^|]+\|[^|]+\|$/gm) || [];
  for (const row of tableRows) {
    const cols = row.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length < 2 || cols[0] === 'Exame') continue;
    const key = cols[0].toLowerCase();
    const val = cols[1];
    if (key.includes('fib-4') || key.includes('fib4')) baseline.fib4 = val;
    if (key.includes('plq')) baseline.plq = normalizeValue(val);
    if (key.includes('albumina')) baseline.albumin = val;
    if (key.includes('meld')) baseline.meld = val.replace(/\s*\(inicial\)/, '');
    if (key.includes('lsm')) baseline.lsm = val;
  }
  states.baseline = baseline;

  // Parse checkpoint sections (- Key: Value format)
  // Format: ### Checkpoint 1 (s-cp1) — Caution
  const cpSections = text.matchAll(/###\s+Checkpoint\s+(\d+)\s+\(s-cp\d+\)\s*—\s*(\w+)([\s\S]*?)(?=###|\n## |$)/g);

  for (const match of cpSections) {
    const cpNum = match[1];
    const severity = match[2].toLowerCase();
    const stateId = `s-cp${cpNum}`;

    const block = match[3];
    const values = {};

    const lines = block.split('\n');
    for (const line of lines) {
      const m = line.match(/^-\s+(.+?):\s+(.+)/);
      if (!m) continue;
      const rawKey = m[1].trim();
      const key = rawKey.toLowerCase();
      const val = m[2].trim();

      if (key.includes('fib-4') || key.includes('fib4')) values.fib4 = val;
      else if (key === 'plq') values.plq = normalizeValue(val);
      else if (key === 'lsm') values.lsm = normalizeValue(val);
      else if (key.includes('meld')) values.meld = val;
      else if (key.includes('albumin')) values.albumin = normalizeValue(val);
    }

    states[stateId] = { severity, values };
  }

  return states;
}

function normalizeValue(v) {
  let r = v.trim();
  // Strip trailing parenthetical notes: "18 kPa (era 32 → 18)" → "18 kPa"
  r = r.replace(/\s*\(.*\)$/, '');
  // "112.000/mm³" → "112k"
  const thousands = r.match(/^(\d+)\.000/);
  if (thousands) return `${thousands[1]}k`;
  // "3,6 g/dL" → "3,6" (strip units for comparison)
  r = r.replace(/\s*(g\/dL|mg\/dL|mEq\/L|U\/L|\/mm³)$/, '');
  return r.trim();
}

// ── Parse _manifest.js panelStates ─────────────────────────────
function parseManifest(path) {
  const text = readFileSync(path, 'utf-8');

  // Extract panelStates object using regex (avoid eval)
  const panelMatch = text.match(/export const panelStates\s*=\s*\{([\s\S]*)\};?\s*$/);
  if (!panelMatch) return {};

  const states = {};
  const body = panelMatch[1];

  // Find each state key
  const keyRegex = /'(s-[\w-]+)':\s*\{/g;
  let km;
  const keys = [];
  while ((km = keyRegex.exec(body)) !== null) {
    keys.push({ id: km[1], start: km.index + km[0].length });
  }

  for (let i = 0; i < keys.length; i++) {
    const id = keys[i].id;
    // Extract block from start to next key (or end)
    const end = i + 1 < keys.length ? keys[i + 1].start - keys[i + 1].id.length - 10 : body.length;
    const block = body.substring(keys[i].start, end);

    const sevMatch = block.match(/severity:\s*'(\w+)'/);
    const severity = sevMatch ? sevMatch[1] : null;

    const values = {};
    const valuesMatch = block.match(/values:\s*\{([^}]+)\}/);
    if (valuesMatch) {
      const pairs = [...valuesMatch[1].matchAll(/(\w+):\s*'([^']+)'/g)];
      for (const p of pairs) {
        values[p[1]] = p[2];
      }
    }

    states[id] = { severity, values };
  }

  return states;
}

// ── Compare ────────────────────────────────────────────────────
function compare(caseStates, manifestStates) {
  const checkpoints = ['s-cp1', 's-cp2', 's-cp3'];

  for (const cpId of checkpoints) {
    const caseCp = caseStates[cpId];
    const manCp = manifestStates[cpId];

    if (!caseCp) {
      err(`CASE.md: ${cpId} not found`);
      continue;
    }
    if (!manCp) {
      err(`_manifest.js: ${cpId} not found in panelStates`);
      continue;
    }

    // Compare severity
    if (caseCp.severity !== manCp.severity) {
      err(`${cpId} severity: CASE.md="${caseCp.severity}" vs _manifest.js="${manCp.severity}"`);
    } else {
      ok(`${cpId} severity: ${manCp.severity}`);
    }

    // Compare lab values that exist in both
    const caseVals = caseCp.values;
    const manVals = manCp.values;

    // Map from CASE.md keys → manifest keys
    const keyMap = { fib4: 'fib4', plq: 'plq', lsm: 'lsm', meld: 'meld', albumin: 'albumin' };

    let valuesChecked = 0;
    for (const [caseKey, caseVal] of Object.entries(caseVals)) {
      const manKey = keyMap[caseKey];
      if (!manKey) continue;
      const manVal = manVals[manKey];
      if (!manVal || manVal === '—') continue;

      valuesChecked++;
      const normCase = normalizeValue(caseVal);
      const normMan = normalizeValue(manVal);

      if (normCase !== normMan) {
        err(`${cpId}.${caseKey}: CASE.md="${normCase}" vs _manifest.js="${normMan}"`);
      } else {
        ok(`${cpId}.${caseKey}: ${normMan}`);
      }
    }

    if (valuesChecked === 0) {
      console.log(`  ⚠️  ${cpId}: no comparable values found (check CASE.md format)`);
    }
  }
}

// ── Main ───────────────────────────────────────────────────────
console.log(`\n🔗 lint-case-sync: validating ${aula}`);
console.log(`   CASE.md → _manifest.js panelStates\n`);

const casePath = join(aulaDir, 'references', 'CASE.md');
const manifestPath = join(aulaDir, 'slides', '_manifest.js');

if (!existsSync(casePath)) {
  console.log(`  SKIP  No CASE.md for ${aula} — case-sync not applicable`);
  process.exit(0);
}
if (!existsSync(manifestPath)) {
  console.log(`  SKIP  No _manifest.js for ${aula} — case-sync deferred`);
  process.exit(0);
}

try {
  const caseStates = parseCaseMd(casePath);
  const manifestStates = parseManifest(manifestPath);
  compare(caseStates, manifestStates);
} catch (e) {
  err(`Parse error: ${e.message}`);
}

console.log('');
if (errors > 0) {
  console.error(`❌ ${errors} mismatch(es) — fix CASE.md or _manifest.js`);
  console.error(`   Rule: CASE.md is source of truth (#1). _manifest.js derives from it (#4).`);
  process.exit(1);
} else {
  console.log(`✅ All checkpoint values in sync`);
  process.exit(0);
}
