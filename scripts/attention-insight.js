#!/usr/bin/env node
/**
 * Attention Insight — Wrapper CLI para QA visual de slides
 *
 * Uso:
 *   node scripts/attention-insight.js <screenshot.png> [--json]
 *
 * Requer: ATTENTION_INSIGHT_API_KEY no .env
 *
 * Se a API key não estiver disponível, gera score simulado via sharp
 * (análise de contraste + saturação + variância) como fallback.
 *
 * Saída JSON:
 * {
 *   clarity_score: 0–100,
 *   focus_score: 0–100,
 *   cognitive_load: "low|medium|high",
 *   top_regions: [{ x, y, attention_pct }],
 *   source: "api|fallback"
 * }
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const API_KEY = process.env.ATTENTION_INSIGHT_API_KEY;
const [,, imagePath, flag] = process.argv;
const jsonOnly = flag === '--json';

if (!imagePath) {
  console.error('Usage: node attention-insight.js <screenshot.png> [--json]');
  process.exit(1);
}

const absPath = path.resolve(imagePath);
if (!fs.existsSync(absPath)) {
  console.error(`File not found: ${absPath}`);
  process.exit(1);
}

async function analyzeViaAPI(imgPath) {
  const FormData = (await import('form-data')).default;
  const fetch = (await import('node-fetch')).default;

  const form = new FormData();
  form.append('image', fs.createReadStream(imgPath));

  const res = await fetch('https://app.attentioninsight.com/api/v1/analysis', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      ...form.getHeaders(),
    },
    body: form,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  return {
    clarity_score: data.clarity_score ?? null,
    focus_score: data.focus_score ?? null,
    cognitive_load: data.cognitive_load ?? null,
    top_regions: data.attention_map?.top_regions ?? [],
    source: 'api',
  };
}

async function analyzeFallback(imgPath) {
  // Fallback: usa sharp para métricas proxy de atenção visual
  // Requer: npm install sharp (já instalado via sharp-mcp)
  const sharp = (await import('sharp')).default;

  const { data, info } = await sharp(imgPath)
    .resize(200, 112, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = info.width * info.height;
  let sumR = 0, sumG = 0, sumB = 0;
  let maxContrast = 0;

  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    sumR += r; sumG += g; sumB += b;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const contrast = Math.abs(lum - 128);
    if (contrast > maxContrast) maxContrast = contrast;
  }

  const avgR = sumR / pixels;
  const avgG = sumG / pixels;
  const avgB = sumB / pixels;

  // Saturação média como proxy de saliência visual
  const avgLum = 0.299 * avgR + 0.587 * avgG + 0.114 * avgB;
  const saturation = Math.sqrt(
    Math.pow(avgR - avgLum, 2) +
    Math.pow(avgG - avgLum, 2) +
    Math.pow(avgB - avgLum, 2)
  );

  // Scores heurísticos (0–100)
  const clarity_score = Math.min(100, Math.round((maxContrast / 128) * 100));
  const focus_score = Math.min(100, Math.round((saturation / 80) * 100));
  const cognitive_load = focus_score > 70 ? 'high' : focus_score > 40 ? 'medium' : 'low';

  return {
    clarity_score,
    focus_score,
    cognitive_load,
    top_regions: [],
    source: 'fallback',
    note: 'Análise proxy via sharp (sem API key). Para dados reais: definir ATTENTION_INSIGHT_API_KEY.',
  };
}

(async () => {
  try {
    const result = API_KEY
      ? await analyzeViaAPI(absPath)
      : await analyzeFallback(absPath);

    if (jsonOnly) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      const load_emoji = { low: '🟢', medium: '🟡', high: '🔴' }[result.cognitive_load] ?? '⚪';
      console.log(`\nAttention Insight — ${path.basename(absPath)}`);
      console.log(`  Clarity Score  : ${result.clarity_score ?? 'n/a'}/100`);
      console.log(`  Focus Score    : ${result.focus_score ?? 'n/a'}/100`);
      console.log(`  Cognitive Load : ${load_emoji} ${result.cognitive_load ?? 'n/a'}`);
      console.log(`  Source         : ${result.source}`);
      if (result.note) console.log(`  Note           : ${result.note}`);
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
