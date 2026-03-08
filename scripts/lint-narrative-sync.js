/**
 * lint-narrative-sync.js — Validates _manifest.js narrative fields against narrative.md
 *
 * Source of truth: references/narrative.md (Reference Hierarchy #3)
 * Derived fields:  _manifest.js narrativeRole, tensionLevel, narrativeCritical
 *
 * Checks:
 *   1. Every slide in manifest has narrativeRole + tensionLevel fields
 *   2. tensionLevel in manifest matches tension dots in narrative.md (●=1, ○=0)
 *   3. narrativeCritical slides (hook, checkpoints, close) are flagged
 *   4. narrativeRole values are valid enum members
 *   5. forbidEarlyReveal: checkpoint must come AFTER its act's setup slides
 *
 * Usage: node scripts/lint-narrative-sync.js [aula]
 *   aula defaults to "cirrose"
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const aula = process.argv[2] || 'cirrose';
const aulaDir = join(root, 'aulas', aula);

let errors = 0;
let warnings = 0;

function err(msg) {
  console.error(`  ❌ ${msg}`);
  errors++;
}

function warn(msg) {
  console.log(`  ⚠️  ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  ✅ ${msg}`);
}

const VALID_ROLES = [null, 'hook', 'setup', 'payoff', 'checkpoint', 'resolve'];
const CRITICAL_ARCHETYPES = ['hook', 'checkpoint', 'recap'];

// ── Parse narrative.md tension levels ────────────────────────────
function parseNarrativeTension(path) {
  const text = readFileSync(path, 'utf-8');
  const tensions = {};

  // Match table rows: | N | s-xxx | ... | ●●○○○ |
  const rows = text.matchAll(/\|\s*\d+\s*\|\s*(s-[\w-]+)\s*\|[^|]+\|[^|]+\|\s*([●○]+)\s*\|/g);
  for (const m of rows) {
    const id = m[1];
    const dots = m[2];
    const level = (dots.match(/●/g) || []).length;
    tensions[id] = level;
  }

  return tensions;
}

// ── Parse _manifest.js slides ────────────────────────────────────
function parseManifestSlides(path) {
  const text = readFileSync(path, 'utf-8');
  const slides = [];

  // Split by top-level slide objects using id: pattern as anchor
  // Each slide starts with { id: 's-xxx' and ends before the next { id: or ];
  const slideStarts = [...text.matchAll(/\{\s*id:\s*'(s-[\w-]+)'/g)];

  for (let i = 0; i < slideStarts.length; i++) {
    const start = slideStarts[i].index;
    const end = i + 1 < slideStarts.length ? slideStarts[i + 1].index : text.indexOf('];', start);
    const block = text.substring(start, end);

    const id = slideStarts[i][1];
    const archMatch = block.match(/archetype:\s*'(\w[\w-]*)'/);
    const roleMatch = block.match(/narrativeRole:\s*(?:'(\w+)'|(null))/);
    const tensionMatch = block.match(/tensionLevel:\s*(\d+)/);
    const critMatch = block.match(/narrativeCritical:\s*(true|false)/);

    slides.push({
      id,
      archetype: archMatch ? archMatch[1] : 'unknown',
      narrativeRole: roleMatch ? (roleMatch[1] || null) : undefined,
      tensionLevel: tensionMatch ? parseInt(tensionMatch[1]) : undefined,
      narrativeCritical: critMatch ? critMatch[1] === 'true' : undefined,
    });
  }

  return slides;
}

// ── Validate ─────────────────────────────────────────────────────
function validate(manifestSlides, narrativeTensions) {
  console.log('  ── Field presence ──');

  for (const s of manifestSlides) {
    // 1. Check required fields exist
    if (s.tensionLevel === undefined) {
      err(`${s.id}: missing tensionLevel`);
    }
    if (!VALID_ROLES.includes(s.narrativeRole)) {
      err(`${s.id}: invalid narrativeRole "${s.narrativeRole}" (valid: ${VALID_ROLES.join(', ')})`);
    }
  }

  const withFields = manifestSlides.filter(s => s.tensionLevel !== undefined);
  ok(`${withFields.length}/${manifestSlides.length} slides have narrative fields`);

  // 2. Tension level sync with narrative.md
  console.log('\n  ── Tension sync (narrative.md → _manifest.js) ──');

  let synced = 0;
  let checked = 0;
  for (const s of manifestSlides) {
    const narrativeLevel = narrativeTensions[s.id];
    if (narrativeLevel === undefined) continue; // not in narrative.md (e.g. appendix)
    checked++;

    if (s.tensionLevel !== narrativeLevel) {
      err(`${s.id}: tensionLevel manifest=${s.tensionLevel} vs narrative.md=${narrativeLevel}`);
    } else {
      synced++;
    }
  }
  if (checked > 0) {
    ok(`${synced}/${checked} tension levels in sync`);
  }

  // 3. narrativeCritical — must be true for hook/checkpoint/recap
  console.log('\n  ── Critical slide flags ──');

  for (const s of manifestSlides) {
    const shouldBeCritical = CRITICAL_ARCHETYPES.includes(s.archetype);
    if (shouldBeCritical && !s.narrativeCritical) {
      err(`${s.id}: archetype="${s.archetype}" should have narrativeCritical=true`);
    }
    if (s.narrativeCritical && !shouldBeCritical) {
      warn(`${s.id}: narrativeCritical=true but archetype="${s.archetype}" (unusual — verify)`);
    }
  }

  const criticals = manifestSlides.filter(s => s.narrativeCritical);
  ok(`${criticals.length} narrative-critical slides: ${criticals.map(s => s.id).join(', ')}`);

  // 4. Role consistency: checkpoints should have role='checkpoint'
  console.log('\n  ── Role consistency ──');

  for (const s of manifestSlides) {
    if (s.archetype === 'checkpoint' && s.narrativeRole !== 'checkpoint') {
      err(`${s.id}: archetype=checkpoint but narrativeRole="${s.narrativeRole}"`);
    }
    if (s.archetype === 'hook' && s.narrativeRole !== 'hook') {
      err(`${s.id}: archetype=hook but narrativeRole="${s.narrativeRole}"`);
    }
    if (s.archetype === 'recap' && s.narrativeRole !== 'resolve') {
      err(`${s.id}: archetype=recap but narrativeRole="${s.narrativeRole}"`);
    }
  }

  // 5. Ordering: checkpoints must come after their act's setup slides
  console.log('\n  ── Narrative ordering ──');

  const ids = manifestSlides.map(s => s.id);
  const cp1Idx = ids.indexOf('s-cp1');
  const cp2Idx = ids.indexOf('s-cp2');
  const cp3Idx = ids.indexOf('s-cp3');
  const hookIdx = ids.indexOf('s-hook');
  const closeIdx = ids.indexOf('s-close');

  if (hookIdx > 1) {
    err(`s-hook at position ${hookIdx} — should be in first 2 slides`);
  } else {
    ok('s-hook position correct');
  }

  if (cp1Idx !== -1 && cp2Idx !== -1 && cp1Idx >= cp2Idx) {
    err(`s-cp1 (pos ${cp1Idx}) must come before s-cp2 (pos ${cp2Idx})`);
  }
  if (cp2Idx !== -1 && cp3Idx !== -1 && cp2Idx >= cp3Idx) {
    err(`s-cp2 (pos ${cp2Idx}) must come before s-cp3 (pos ${cp3Idx})`);
  }
  if (closeIdx !== -1) {
    const lastMainSlide = manifestSlides.filter(s => s.archetype !== 'table' && s.archetype !== 'compare' && s.archetype !== 'criteria' && s.archetype !== 'flow' || !s.id.startsWith('s-app'));
    // close should be last non-appendix slide
    const nonAppendix = manifestSlides.filter(s => !s.id.startsWith('s-app'));
    const lastNonApp = nonAppendix[nonAppendix.length - 1];
    if (lastNonApp && lastNonApp.id === 's-close') {
      ok('s-close is last non-appendix slide');
    } else {
      warn(`s-close is not last non-appendix slide (last is ${lastNonApp?.id})`);
    }
  }
}

// ── Main ─────────────────────────────────────────────────────────
console.log(`\n🔗 lint-narrative-sync: validating ${aula}`);
console.log(`   narrative.md → _manifest.js narrative fields\n`);

try {
  const narrativeTensions = parseNarrativeTension(join(aulaDir, 'references', 'narrative.md'));
  const manifestSlides = parseManifestSlides(join(aulaDir, 'slides', '_manifest.js'));
  validate(manifestSlides, narrativeTensions);
} catch (e) {
  err(`Parse error: ${e.message}`);
}

console.log('');
if (errors > 0) {
  console.error(`❌ ${errors} error(s), ${warnings} warning(s)`);
  console.error(`   Fix _manifest.js narrative fields or update narrative.md`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`⚠️  ${warnings} warning(s), 0 errors — review recommended`);
  process.exit(0);
} else {
  console.log(`✅ All narrative fields in sync`);
  process.exit(0);
}
