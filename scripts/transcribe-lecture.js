#!/usr/bin/env node

/**
 * transcribe-lecture.js — Pipeline de transcrição de palestras médicas
 *
 * Uso:
 *   node scripts/transcribe-lecture.js --file video.mp4
 *   node scripts/transcribe-lecture.js --file video.mp4 --notion
 *   node scripts/transcribe-lecture.js --file video.mp4 --lang en
 *   node scripts/transcribe-lecture.js --file video.mp4 --model large-v3
 *
 * Pipeline: arquivo local → Whisper → Claude (análise) → JSON local + Notion (opcional)
 *
 * Requer:
 *   - whisper CLI no PATH (Python: pip install openai-whisper)
 *   - ANTHROPIC_API_KEY no .env
 *   - NOTION_API_KEY + NOTION_DATABASE_ID no .env (se usar --notion)
 */

import { execSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { config } from 'dotenv';

// ---------------------------------------------------------------------------
// 0. Config
// ---------------------------------------------------------------------------

config(); // carrega .env

const { values: args } = parseArgs({
  options: {
    file:   { type: 'string',  short: 'f' },
    lang:   { type: 'string',  short: 'l', default: process.env.WHISPER_LANGUAGE || 'pt' },
    model:  { type: 'string',  short: 'm', default: process.env.WHISPER_MODEL || 'medium' },
    notion: { type: 'boolean', short: 'n', default: false },
    help:   { type: 'boolean', short: 'h', default: false },
  },
  strict: true,
});

if (args.help || !args.file) {
  console.log(`
  Uso: node scripts/transcribe-lecture.js --file <video>

  Opções:
    --file, -f     Caminho do arquivo de vídeo (obrigatório)
    --lang, -l     Idioma: pt | en | auto (default: pt)
    --model, -m    Modelo Whisper: small | medium | large-v3 (default: medium)
    --notion, -n   Publicar resumo no Notion (requer .env)
    --help, -h     Mostra esta ajuda
  `);
  process.exit(args.help ? 0 : 1);
}

const VIDEO_PATH = resolve(args.file);
const LECTURE_NAME = basename(VIDEO_PATH, extname(VIDEO_PATH));
const OUTPUT_DIR = join(process.cwd(), 'docs', 'transcripts');
const TRANSCRIPT_JSON = join(OUTPUT_DIR, `${LECTURE_NAME}.whisper.json`);
const ANALYSIS_JSON = join(OUTPUT_DIR, `${LECTURE_NAME}.analysis.json`);

mkdirSync(OUTPUT_DIR, { recursive: true });

function log(step, msg) {
  const colors = { '1': '🎤', '2': '📝', '3': '🧠', '4': '📄' };
  console.log(`\n${colors[step] || '→'} [Etapa ${step}] ${msg}`);
}

function fail(msg) {
  console.error(`\n❌ ${msg}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 1. Validações
// ---------------------------------------------------------------------------

log(1, 'Validando ambiente...');

if (!existsSync(VIDEO_PATH)) {
  fail(`Arquivo não encontrado: ${VIDEO_PATH}`);
}

// Detectar Whisper disponível
function detectWhisper() {
  for (const cmd of ['whisper', 'whisper-cpp', 'whisper.cpp']) {
    try {
      execSync(`which ${cmd}`, { stdio: 'ignore' });
      return cmd;
    } catch { /* continua */ }
  }
  return null;
}

const WHISPER_CMD = detectWhisper();
if (!WHISPER_CMD) {
  fail('Whisper não encontrado no PATH. Instale: pip install openai-whisper');
}

if (!process.env.ANTHROPIC_API_KEY) {
  fail('ANTHROPIC_API_KEY não definida. Configure no .env');
}

if (args.notion && (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID)) {
  fail('--notion requer NOTION_API_KEY e NOTION_DATABASE_ID no .env');
}

console.log(`  ✓ Vídeo: ${VIDEO_PATH}`);
console.log(`  ✓ Whisper: ${WHISPER_CMD} (model=${args.model}, lang=${args.lang})`);
console.log(`  ✓ Output: ${OUTPUT_DIR}/`);

// ---------------------------------------------------------------------------
// 2. Transcrição com Whisper
// ---------------------------------------------------------------------------

log(2, `Transcrevendo com ${WHISPER_CMD} (${args.model})... pode demorar.`);

if (existsSync(TRANSCRIPT_JSON)) {
  console.log(`  ⏭ Transcrição já existe: ${TRANSCRIPT_JSON}`);
  console.log('  (delete o arquivo para retranscrever)');
} else {
  const whisperArgs = [
    VIDEO_PATH,
    '--model', args.model,
    '--language', args.lang,
    '--output_format', 'json',
    '--output_dir', OUTPUT_DIR,
  ];

  console.log(`  $ ${WHISPER_CMD} ${whisperArgs.join(' ')}`);

  const result = spawnSync(WHISPER_CMD, whisperArgs, {
    stdio: 'inherit',
    timeout: 60 * 60 * 1000, // 1h max
  });

  if (result.status !== 0) {
    fail(`Whisper falhou com exit code ${result.status}`);
  }

  // Whisper salva como LECTURE_NAME.json — renomear se necessário
  const whisperOutput = join(OUTPUT_DIR, `${LECTURE_NAME}.json`);
  if (existsSync(whisperOutput) && whisperOutput !== TRANSCRIPT_JSON) {
    const { renameSync } = await import('node:fs');
    renameSync(whisperOutput, TRANSCRIPT_JSON);
  }
}

// Ler transcrição
let transcript;
try {
  transcript = JSON.parse(readFileSync(TRANSCRIPT_JSON, 'utf-8'));
} catch (e) {
  fail(`Erro lendo transcrição: ${e.message}`);
}

const segmentCount = transcript.segments?.length || 0;
const fullText = transcript.text || transcript.segments?.map(s => s.text).join(' ') || '';
const durationMin = transcript.segments?.length
  ? Math.ceil(transcript.segments.at(-1).end / 60)
  : 0;

console.log(`  ✓ ${segmentCount} segmentos, ~${durationMin} min, ${fullText.length} chars`);

// ---------------------------------------------------------------------------
// 3. Análise com Claude
// ---------------------------------------------------------------------------

log(3, 'Analisando transcrição com Claude...');

if (existsSync(ANALYSIS_JSON)) {
  console.log(`  ⏭ Análise já existe: ${ANALYSIS_JSON}`);
  console.log('  (delete o arquivo para reanalisar)');
} else {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  const client = new Anthropic();

  // Truncar se muito longo (Claude Sonnet: 200K context, mas não precisamos de tudo)
  const maxChars = 150_000;
  const textForAnalysis = fullText.length > maxChars
    ? fullText.slice(0, maxChars) + '\n\n[... TRANSCRIÇÃO TRUNCADA ...]'
    : fullText;

  const systemPrompt = `Você é um especialista em medicina (hepatologia/gastroenterologia) e educação médica.
Analise esta transcrição de palestra médica e extraia informações estruturadas.
Responda APENAS com JSON válido, sem markdown, sem explicações.`;

  const userPrompt = `Analise esta transcrição de palestra médica e retorne um JSON com esta estrutura EXATA:

{
  "title": "Título da palestra (inferido do conteúdo)",
  "speaker": "Nome do palestrante (se identificável, senão null)",
  "language": "pt ou en",
  "duration_minutes": ${durationMin},
  "summary": "Resumo executivo em 3-5 frases",
  "topics": [
    {
      "title": "Nome do tópico",
      "timestamp_start": "MM:SS",
      "timestamp_end": "MM:SS",
      "summary": "Resumo do tópico em 1-2 frases"
    }
  ],
  "key_moments": [
    {
      "timestamp": "MM:SS",
      "type": "insight | data | conclusion | recommendation | controversy",
      "content": "Descrição do momento-chave"
    }
  ],
  "quotes": [
    {
      "timestamp": "MM:SS",
      "text": "Citação relevante do palestrante",
      "context": "Contexto breve"
    }
  ],
  "references": [
    {
      "text": "Nome do paper/guideline mencionado",
      "details": "Detalhes adicionais (autor, ano, journal) se mencionados"
    }
  ],
  "qa_section": {
    "present": true/false,
    "timestamp_start": "MM:SS ou null",
    "questions": [
      {
        "question": "Pergunta resumida",
        "answer_summary": "Resumo da resposta"
      }
    ]
  },
  "takeaways": [
    "Ponto 1",
    "Ponto 2",
    "Ponto 3"
  ],
  "guideline_discrepancies": [
    {
      "claim": "O que o palestrante afirmou",
      "guideline": "O que a guideline vigente diz",
      "source": "EASL 2024, AASLD 2023, etc."
    }
  ]
}

TRANSCRIÇÃO:
${textForAnalysis}`;

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt,
    });

    const analysisText = response.content[0].text;

    // Extrair JSON (pode vir com backticks)
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      fail('Claude não retornou JSON válido');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    writeFileSync(ANALYSIS_JSON, JSON.stringify(analysis, null, 2), 'utf-8');
    console.log(`  ✓ Análise salva: ${ANALYSIS_JSON}`);
    console.log(`  → ${analysis.topics?.length || 0} tópicos, ${analysis.key_moments?.length || 0} momentos-chave`);
    console.log(`  → ${analysis.references?.length || 0} referências, ${analysis.takeaways?.length || 0} takeaways`);
  } catch (e) {
    fail(`Erro na análise: ${e.message}`);
  }
}

// ---------------------------------------------------------------------------
// 4. Publicar no Notion (opcional)
// ---------------------------------------------------------------------------

if (args.notion) {
  log(4, 'Publicando no Notion...');

  const analysis = JSON.parse(readFileSync(ANALYSIS_JSON, 'utf-8'));
  const { Client } = await import('@notionhq/client');
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = process.env.NOTION_DATABASE_ID;

  // Helpers para Notion blocks
  const heading2 = (text) => ({
    type: 'heading_2',
    heading_2: { rich_text: [{ type: 'text', text: { content: text } }] },
  });

  const paragraph = (text) => ({
    type: 'paragraph',
    paragraph: { rich_text: [{ type: 'text', text: { content: text.slice(0, 2000) } }] },
  });

  const callout = (text, emoji = '💬') => ({
    type: 'callout',
    callout: {
      icon: { type: 'emoji', emoji },
      rich_text: [{ type: 'text', text: { content: text.slice(0, 2000) } }],
    },
  });

  const bullet = (text) => ({
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ type: 'text', text: { content: text.slice(0, 2000) } }] },
  });

  const divider = () => ({ type: 'divider', divider: {} });

  // Montar blocks
  const blocks = [];

  // Resumo
  blocks.push(heading2('📋 Resumo'));
  blocks.push(paragraph(analysis.summary || 'Sem resumo'));
  blocks.push(divider());

  // Tópicos com timestamps
  if (analysis.topics?.length) {
    blocks.push(heading2('📑 Tópicos'));
    for (const t of analysis.topics) {
      blocks.push(bullet(`[${t.timestamp_start}] ${t.title} — ${t.summary}`));
    }
    blocks.push(divider());
  }

  // Momentos-chave
  if (analysis.key_moments?.length) {
    blocks.push(heading2('⭐ Momentos-chave'));
    for (const m of analysis.key_moments) {
      blocks.push(bullet(`[${m.timestamp}] (${m.type}) ${m.content}`));
    }
    blocks.push(divider());
  }

  // Citações
  if (analysis.quotes?.length) {
    blocks.push(heading2('💬 Citações'));
    for (const q of analysis.quotes) {
      blocks.push(callout(`"${q.text}" — ${q.context || ''}`, '💬'));
    }
    blocks.push(divider());
  }

  // Referências
  if (analysis.references?.length) {
    blocks.push(heading2('📚 Referências mencionadas'));
    for (const r of analysis.references) {
      blocks.push(bullet(`${r.text}${r.details ? ` — ${r.details}` : ''}`));
    }
    blocks.push(divider());
  }

  // Discrepâncias com guidelines
  if (analysis.guideline_discrepancies?.length) {
    blocks.push(heading2('⚠️ Discrepâncias com guidelines'));
    for (const d of analysis.guideline_discrepancies) {
      blocks.push(callout(`Afirmação: ${d.claim}\nGuideline: ${d.guideline}\nFonte: ${d.source}`, '⚠️'));
    }
    blocks.push(divider());
  }

  // Takeaways
  if (analysis.takeaways?.length) {
    blocks.push(heading2('🎯 Takeaways'));
    for (const t of analysis.takeaways) {
      blocks.push(bullet(t));
    }
  }

  // Q&A
  if (analysis.qa_section?.present && analysis.qa_section.questions?.length) {
    blocks.push(divider());
    blocks.push(heading2('❓ Perguntas & Respostas'));
    for (const q of analysis.qa_section.questions) {
      blocks.push(callout(`P: ${q.question}\nR: ${q.answer_summary}`, '❓'));
    }
  }

  // Notion API limita 100 blocks por request
  const chunkedBlocks = [];
  for (let i = 0; i < blocks.length; i += 100) {
    chunkedBlocks.push(blocks.slice(i, i + 100));
  }

  try {
    // Criar página
    const page = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [{ text: { content: analysis.title || LECTURE_NAME } }],
        },
        ...(analysis.speaker && {
          Speaker: { rich_text: [{ text: { content: analysis.speaker } }] },
        }),
        ...(analysis.duration_minutes && {
          Duration: { number: analysis.duration_minutes },
        }),
        Status: { select: { name: 'Transcribed' } },
      },
      children: chunkedBlocks[0] || [],
    });

    // Append remaining blocks
    for (let i = 1; i < chunkedBlocks.length; i++) {
      await notion.blocks.children.append({
        block_id: page.id,
        children: chunkedBlocks[i],
      });
    }

    console.log(`  ✓ Página criada no Notion: ${page.url}`);
  } catch (e) {
    console.error(`  ⚠ Erro no Notion: ${e.message}`);
    console.log('  → Análise JSON salva localmente, pode publicar manualmente depois');
  }
} else {
  log(4, `Notion não solicitado. Resultados em:`);
  console.log(`  → ${TRANSCRIPT_JSON}`);
  console.log(`  → ${ANALYSIS_JSON}`);
  console.log(`  Rode com --notion para publicar.`);
}

// ---------------------------------------------------------------------------
// Done
// ---------------------------------------------------------------------------

console.log('\n✅ Pipeline concluído!\n');
