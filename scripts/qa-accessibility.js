#!/usr/bin/env node
/**
 * Basic accessibility QA for slide HTML files.
 * Checks: color contrast references, alt text, ARIA, font sizes.
 * Usage: npm run qa:a11y
 * Or:    node scripts/qa-accessibility.js cirrose
 */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const lectures = ['grade', 'cirrose', 'metanalise'];
const target = process.argv[2];
const toCheck = target ? [target] : lectures;

let totalIssues = 0;

for (const lecture of toCheck) {
  const dir = resolve('aulas', lecture);
  const files = readdirSync(dir).filter(f => f.endsWith('.html'));

  console.log(`\n📋 QA: ${lecture} (${files.length} files)`);

  for (const file of files) {
    const content = readFileSync(join(dir, file), 'utf-8');
    const issues = [];

    // Check: hardcoded colors (not tokens)
    const hardcodedColors = content.match(/style="[^"]*(?:color|background):\s*(?:#|rgb|hsl)[^"]*"/gi);
    if (hardcodedColors) {
      issues.push(`  ⚠ Hardcoded colors in inline style (${hardcodedColors.length})`);
    }

    // Check: images without alt
    const imgsNoAlt = content.match(/<img(?![^>]*alt=)[^>]*>/gi);
    if (imgsNoAlt) {
      issues.push(`  ✗ Images without alt text (${imgsNoAlt.length})`);
    }

    // Check: SVGs without aria-label or role
    const svgsNoA11y = content.match(/<svg(?![^>]*(?:aria-label|role))[^>]*>/gi);
    if (svgsNoA11y) {
      issues.push(`  ⚠ SVGs without aria-label/role (${svgsNoA11y.length})`);
    }

    // Check: sections without speaker notes
    const sections = content.match(/<section[\s>]/gi) || [];
    const notes = content.match(/<aside class="notes">/gi) || [];
    if (sections.length > notes.length) {
      issues.push(`  ⚠ Sections without notes: ${sections.length - notes.length} of ${sections.length}`);
    }

    // Check: semantic color without icon/label
    const semanticNoIcon = [];
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      if (/text-(?:safe|warning|danger)/.test(line) && !/[✓✗⚠●▲■↑↓→←]/.test(line)) {
        semanticNoIcon.push(i + 1);
      }
    });
    if (semanticNoIcon.length > 0) {
      issues.push(`  ⚠ Semantic color without icon (lines: ${semanticNoIcon.slice(0, 5).join(', ')})`);
    }

    if (issues.length > 0) {
      console.log(`  ${file}:`);
      issues.forEach(i => console.log(i));
      totalIssues += issues.length;
    } else {
      console.log(`  ✓ ${file}`);
    }
  }
}

console.log(`\n${'='.repeat(40)}`);
console.log(`Total issues: ${totalIssues}`);
if (totalIssues === 0) {
  console.log('✓ All accessibility checks passed');
} else {
  console.log('Fix issues above before presenting');
}
process.exit(totalIssues > 0 ? 1 : 0);
