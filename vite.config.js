import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'node:fs';
import { readdirSync, statSync } from 'node:fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Auto-discover all HTML files in aulas/
// Convention: aulas/*/index*.html = lecture decks (Plan A + Plan B)
//             aulas/calibracao.html = projector calibration tool (intentionally here, ships with build)
function discoverEntries() {
  const entries = {};
  const aulasDir = resolve(__dirname, 'aulas');

  // Top-level HTML (e.g., calibracao.html)
  readdirSync(aulasDir).forEach(item => {
    const full = resolve(aulasDir, item);
    if (item.endsWith('.html')) {
      entries[item.replace('.html', '')] = full;
    } else if (statSync(full).isDirectory()) {
      // Subdir HTML (e.g., grade/index.html, grade/index.stage-b.html)
      readdirSync(full).filter(f => f.endsWith('.html')).forEach(f => {
        const key = f === 'index.html' 
          ? item 
          : `${item}_${f.replace('.html', '').replace('index.', '')}`;
        entries[key] = resolve(full, f);
      });
    }
  });
  return entries;
}

export default defineConfig({
  root: '.',
  base: './',
  server: {
    port: 3000,
    open: '/aulas/grade/index.html'
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: discoverEntries()
    }
  }
});
