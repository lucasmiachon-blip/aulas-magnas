/**
 * Lint slides v5 — production gates
 * ERRORS block build. WARNINGS degrade quality.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
let errors = 0;
let warnings = 0;

function walk(dir, ext) {
  const files = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (entry === 'node_modules' || entry === 'dist') continue;
      if (statSync(full).isDirectory()) files.push(...walk(full, ext));
      else if (extname(full) === ext) files.push(full);
    }
  } catch { /* dir doesn't exist */ }
  return files;
}

function err(file, n, tag, msg) {
  console.error(`  ❌ [${tag}] ${file}:${n} — ${msg}`);
  errors++;
}

function warn(file, n, tag, msg) {
  console.warn(`  ⚠️  [${tag}] ${file}:${n} — ${msg}`);
  warnings++;
}

// ============================================
// HTML CHECKS
// ============================================
function checkHtml(file, content) {
  const lines = content.split('\n');

  // --- Per-section checks (robust parsing) ---
  // Find all section blocks and check notes/ul/ol
  const sectionStarts = [];
  lines.forEach((line, i) => {
    if (/<section[\s>]/i.test(line)) sectionStarts.push(i);
  });

  let sectionCount = sectionStarts.length;
  let notesCount = 0;

  // Track context per line: are we inside <aside class="notes">? inside .appendix?
  let insideNotes = false;
  let insideAppendix = false;
  let currentSectionHasNotes = false;
  let currentSectionStart = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const n = i + 1;

    // Track section boundaries
    if (/<section[\s>]/i.test(line)) {
      // Check if previous section had notes
      if (currentSectionStart >= 0 && !currentSectionHasNotes) {
        err(file, currentSectionStart + 1, 'NOTES', 'Section without <aside class="notes">. Hard constraint #3.');
      }
      currentSectionStart = i;
      currentSectionHasNotes = false;
      insideAppendix = /class="[^"]*appendix[^"]*"/.test(line) || /class='[^']*appendix[^']*'/.test(line);
    }

    // Track notes
    if (/<aside\s+class="notes">/.test(line)) {
      insideNotes = true;
      currentSectionHasNotes = true;
      notesCount++;
    }
    if (/<\/aside>/.test(line) && insideNotes) {
      insideNotes = false;
    }

    // --- CDN ---
    if (/cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com/.test(line)) {
      err(file, n, 'CDN', 'CDN link. Use npm import.');
    }

    // --- Google Fonts ---
    if (line.includes('fonts.googleapis.com')) {
      err(file, n, 'FONT', 'Google Fonts CDN. Self-host WOFF2.');
    }

    // --- Display on section ---
    if (/<section[^>]*style=[^>]*display/i.test(line)) {
      err(file, n, 'E07', 'display on <section>. Use .slide-inner.');
    }

    // --- ul/ol in projected slides (not in notes, not in appendix) ---
    if (/<(ul|ol)[\s>]/i.test(line) && !insideNotes && !insideAppendix) {
      err(file, n, 'AE', '<ul>/<ol> in projected slide. Use cards, table, or visual.');
    }

    // --- Inline gsap in aulas ---
    if (/gsap\.(to|from|fromTo|timeline)\s*\(/i.test(line) && file.includes('aulas/')) {
      err(file, n, 'GSAP', 'Inline gsap in slide. Use data-animate.');
    }

    // --- data-animate validation ---
    if (/data-animate="countUp"/.test(line) && !/data-target=/.test(line)) {
      err(file, n, 'ANIM', 'data-animate="countUp" without data-target.');
    }
    if (/data-animate="highlight"/.test(line) && !/data-highlight-row=/.test(line)) {
      err(file, n, 'ANIM', 'data-animate="highlight" without data-highlight-row.');
    }
  }

  // Check last section
  if (currentSectionStart >= 0 && !currentSectionHasNotes) {
    err(file, currentSectionStart + 1, 'NOTES', 'Section without <aside class="notes">.');
  }
}

// ============================================
// CSS CHECKS
// ============================================
function checkCss(file, content) {
  const lines = content.split('\n');
  let inRoot = false;
  let inSupportsNot = false;
  let braceDepth = 0;
  let supportsNotStart = -1;

  lines.forEach((line, i) => {
    const n = i + 1;
    const trimmed = line.trim();

    // Track :root block
    if (trimmed.startsWith(':root')) inRoot = true;
    if (inRoot && trimmed === '}') inRoot = false;

    // Track @supports not blocks
    if (/@supports\s+not/.test(line)) { inSupportsNot = true; supportsNotStart = braceDepth; }
    const opens = (line.match(/{/g) || []).length;
    const closes = (line.match(/}/g) || []).length;
    braceDepth += opens - closes;
    if (inSupportsNot && braceDepth <= supportsNotStart) inSupportsNot = false;

    // Skip comments and :root definitions
    if (trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('//')) return;
    if (inRoot) return;
    if (trimmed.startsWith('--')) return;
    if (line.includes('@supports')) return;
    if (line.includes('@font-face')) return;

    // Google Fonts
    if (line.includes('fonts.googleapis.com')) {
      err(file, n, 'FONT', 'Google Fonts. Self-host WOFF2.');
    }

    // Literal colors: oklch, rgb, hsl
    if (/(?<!var\()oklch\(/.test(line) || /(?<!var\()rgb\(/.test(line) || /(?<!var\()hsl\(/.test(line)) {
      err(file, n, 'COLOR', 'Literal color function. Use var(--token).');
    }

    // Hex colors (hard constraint #7)
    if (/#[0-9a-fA-F]{3,8}\b/.test(line) && !trimmed.startsWith('--') && !line.includes('var(')) {
      // Allow inside @supports fallback and data palette definitions in :root
      if (!inSupportsNot) {
        err(file, n, 'HEX', 'Hex literal in CSS. Use var(--token). Hex OK only in @supports fallback.');
      }
    }

    // Vertical table borders (Tufte)
    if (/border-(left|right)\s*:/.test(line) && !/none|0\b/.test(line)) {
      warn(file, n, 'TUFTE', 'Vertical border. Tufte: no vertical borders on tables.');
    }
  });
}

// ============================================
// RUN
// ============================================
console.log('🔍 Linting slides (v5)...\n');

const htmlFiles = walk(join(root, 'aulas'), '.html');
const cssFiles = walk(join(root, 'shared'), '.css');

htmlFiles.forEach(f => checkHtml(f, readFileSync(f, 'utf-8')));
cssFiles.forEach(f => checkCss(f, readFileSync(f, 'utf-8')));

console.log('');
if (errors === 0 && warnings === 0) {
  console.log('✅ Clean.');
} else {
  if (warnings > 0) console.warn(`⚠️  ${warnings} warning(s)`);
  if (errors > 0) {
    console.error(`❌ ${errors} error(s) — build blocked.`);
    process.exit(1);
  }
}
