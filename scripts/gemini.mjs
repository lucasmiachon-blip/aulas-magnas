#!/usr/bin/env node
/**
 * Gemini CLI wrapper — calls Gemini 2.5 Pro via Google AI SDK.
 *
 * Usage:
 *   node scripts/gemini.mjs "your prompt here"
 *   echo "prompt" | node scripts/gemini.mjs --stdin
 *   node scripts/gemini.mjs --file path/to/prompt.txt
 *   node scripts/gemini.mjs --system "you are a medical expert" "your prompt"
 *
 * Env: GEMINI_API_KEY must be set.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync } from "fs";

const MODEL = "gemini-2.5-pro";

function usage() {
  console.error(`Usage:
  node scripts/gemini.mjs "prompt"
  node scripts/gemini.mjs --system "system instruction" "prompt"
  node scripts/gemini.mjs --file prompt.txt
  echo "prompt" | node scripts/gemini.mjs --stdin
  node scripts/gemini.mjs --json "prompt"          (force JSON output)
  node scripts/gemini.mjs --temp 0.3 "prompt"      (set temperature)`);
  process.exit(1);
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf-8").trim();
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("ERROR: GEMINI_API_KEY not set in environment.");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  if (args.length === 0) usage();

  let prompt = "";
  let systemInstruction = undefined;
  let temperature = undefined;
  let jsonMode = false;

  // Parse args
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--stdin":
        prompt = await readStdin();
        break;
      case "--file":
        prompt = readFileSync(args[++i], "utf-8").trim();
        break;
      case "--system":
        systemInstruction = args[++i];
        break;
      case "--json":
        jsonMode = true;
        break;
      case "--temp":
        temperature = parseFloat(args[++i]);
        break;
      case "--help":
      case "-h":
        usage();
        break;
      default:
        prompt = args[i];
    }
  }

  if (!prompt) {
    console.error("ERROR: No prompt provided.");
    usage();
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const modelConfig = { model: MODEL };
  if (systemInstruction) modelConfig.systemInstruction = systemInstruction;

  const model = genAI.getGenerativeModel(modelConfig);

  const generationConfig = {};
  if (temperature !== undefined) generationConfig.temperature = temperature;
  if (jsonMode) generationConfig.responseMimeType = "application/json";

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig,
  });

  const text = result.response.text();
  process.stdout.write(text);
  if (!text.endsWith("\n")) process.stdout.write("\n");
}

main().catch((err) => {
  console.error("Gemini API error:", err.message || err);
  process.exit(1);
});
