#!/usr/bin/env node
/**
 * Attention Insight MCP Server
 *
 * Expõe a ferramenta `analyze_attention` para o qa-engineer agent.
 * Roda como processo stdio — add ao .cursor/mcp.json e .mcp.json:
 *
 *   "attention-insight": {
 *     "command": "node",
 *     "args": ["scripts/mcp-attention-insight.js"],
 *     "env": { "ATTENTION_INSIGHT_API_KEY": "${ATTENTION_INSIGHT_API_KEY}" }
 *   }
 *
 * Se ATTENTION_INSIGHT_API_KEY estiver definida → chama API real (Pro plan).
 * Se não → fallback via sharp (clarity/focus proxy, source: "fallback").
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ATTENTION_INSIGHT_API_KEY;

// ── Análise via API real (requer Pro plan €119/mo) ──────────────────────────
async function analyzeViaAPI(imgPath) {
  const { default: FormData } = await import('form-data');
  const { default: fetch } = await import('node-fetch');

  const form = new FormData();
  form.append('image', fs.createReadStream(imgPath));

  const res = await fetch('https://app.attentioninsight.com/api/v1/analysis', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, ...form.getHeaders() },
    body: form,
  });

  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const data = await res.json();

  return {
    clarity_score: data.clarity_score ?? null,
    focus_score: data.focus_score ?? null,
    cognitive_load: classifyCognitive(data.clarity_score),
    top_regions: data.attention_map?.top_regions ?? [],
    heatmap_url: data.heatmap_url ?? null,
    ai_recommendations: data.ai_recommendations ?? null,
    source: 'attention-insight-api',
  };
}

// ── Fallback via sharp (proxy heurístico — sem API key) ─────────────────────
async function analyzeViaSharp(imgPath) {
  const { default: sharp } = await import('sharp');

  const { data, info } = await sharp(imgPath)
    .resize(200, 112, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = info.width * info.height;
  let sumR = 0, sumG = 0, sumB = 0;
  let maxContrast = 0;
  let variance = 0;
  const lums = [];

  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    sumR += r; sumG += g; sumB += b;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    lums.push(lum);
  }

  const avgLum = lums.reduce((a, b) => a + b, 0) / lums.length;
  variance = lums.reduce((acc, l) => acc + Math.pow(l - avgLum, 2), 0) / lums.length;
  const stdDev = Math.sqrt(variance);

  const avgR = sumR / pixels;
  const avgG = sumG / pixels;
  const avgB = sumB / pixels;
  const avgLumRGB = 0.299 * avgR + 0.587 * avgG + 0.114 * avgB;
  const saturation = Math.sqrt(
    Math.pow(avgR - avgLumRGB, 2) +
    Math.pow(avgG - avgLumRGB, 2) +
    Math.pow(avgB - avgLumRGB, 2)
  );

  // Heurística: clarity alto = alto contraste + baixa saturação
  const clarity_score = Math.min(100, Math.round((stdDev / 80) * 100));
  // Focus = concentração de atenção (saturation como proxy)
  const focus_score = Math.min(100, Math.round((saturation / 60) * 100));

  return {
    clarity_score,
    focus_score,
    cognitive_load: classifyCognitive(clarity_score),
    top_regions: [],
    heatmap_url: null,
    ai_recommendations: null,
    source: 'sharp-fallback',
    note: 'Proxy heurístico (sem ATTENTION_INSIGHT_API_KEY). Precisão ~60%. Para dados reais: assinar Pro em app.attentioninsight.com',
  };
}

function classifyCognitive(score) {
  if (score === null || score === undefined) return 'unknown';
  if (score >= 70) return 'low';
  if (score >= 40) return 'medium';
  return 'high';
}

// ── MCP Server ──────────────────────────────────────────────────────────────
const server = new McpServer({
  name: 'attention-insight',
  version: '1.0.0',
});

server.tool(
  'analyze_attention',
  {
    image_path: z.string().describe('Caminho absoluto ou relativo ao PNG/JPG do slide screenshot'),
  },
  async ({ image_path }) => {
    const absPath = path.resolve(image_path);
    if (!fs.existsSync(absPath)) {
      return { content: [{ type: 'text', text: `Arquivo não encontrado: ${absPath}` }], isError: true };
    }

    try {
      const result = API_KEY ? await analyzeViaAPI(absPath) : await analyzeViaSharp(absPath);
      const load_label = { low: '🟢 baixa', medium: '🟡 média', high: '🔴 alta', unknown: '⚪ n/a' };

      const summary = [
        `**Attention Analysis** — ${path.basename(absPath)}`,
        `- Clarity Score: **${result.clarity_score ?? 'n/a'}/100**`,
        `- Focus Score: **${result.focus_score ?? 'n/a'}/100**`,
        `- Cognitive Load: **${load_label[result.cognitive_load] ?? result.cognitive_load}**`,
        `- Source: \`${result.source}\``,
        result.note ? `- ⚠️ ${result.note}` : null,
        result.ai_recommendations ? `\n**AI Recommendations:**\n${result.ai_recommendations}` : null,
      ].filter(Boolean).join('\n');

      return {
        content: [
          { type: 'text', text: summary },
          { type: 'text', text: '\n```json\n' + JSON.stringify(result, null, 2) + '\n```' },
        ],
      };
    } catch (err) {
      return { content: [{ type: 'text', text: `Erro: ${err.message}` }], isError: true };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
