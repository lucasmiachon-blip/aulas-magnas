#!/usr/bin/env node
/**
 * Wrapper para @cyanheads/pubmed-mcp-server no Windows.
 * Corrige o bug tiktoken_bg.wasm (arquivo ausente na raiz do pacote).
 * O WASM é baixado de jsdelivr se necessário.
 *
 * Uso no mcp.json:
 *   "pubmed": { "command": "node", "args": ["scripts/run-pubmed-mcp.js"], "env": {...} }
 */

import { spawn } from "child_process";
import { createWriteStream } from "fs";
import { readFile } from "fs/promises";
import { get } from "https";
import { join } from "path";
const TIKTOKEN_WASM_URL =
  "https://cdn.jsdelivr.net/npm/tiktoken@1.0.22/tiktoken_bg.wasm";
const WASM_MIN_SIZE = 5_000_000; // ~5 MB, o lite tem ~700KB

async function findTiktokenDir() {
  const npmCache = process.env.LOCALAPPDATA
    ? join(process.env.LOCALAPPDATA, "npm-cache", "_npx")
    : join(process.env.HOME || "", ".npm", "_npx");
  const { readdir } = await import("fs/promises");
  try {
    const dirs = await readdir(npmCache);
    for (const d of dirs) {
      const tiktokenPath = join(npmCache, d, "node_modules", "tiktoken");
      try {
        await readFile(join(tiktokenPath, "package.json"));
        return tiktokenPath;
      } catch {
        continue;
      }
    }
  } catch {
    // cache vazio ou inexistente
  }
  return null;
}

async function ensureWasm(tiktokenDir) {
  const wasmPath = join(tiktokenDir, "tiktoken_bg.wasm");
  try {
    const buf = await readFile(wasmPath);
    if (buf.length >= WASM_MIN_SIZE) return;
  } catch {
    // arquivo não existe ou corrompido
  }

  console.error("[pubmed-mcp] Baixando tiktoken_bg.wasm (fix Windows)...");
  await new Promise((resolve, reject) => {
    const req = get(TIKTOKEN_WASM_URL, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const ws = createWriteStream(wasmPath);
      res.pipe(ws);
      ws.on("finish", () => ws.close(resolve));
      ws.on("error", reject);
    });
    req.on("error", reject);
  });
}

function runServer() {
  return new Promise((resolve) => {
    const isWin = process.platform === "win32";
    const env = { ...process.env };
    env.TIKTOKEN_BACKEND = "js"; // fallback se suportado; tiktoken atual ignora
    const child = spawn(
      isWin ? "cmd" : "npx",
      isWin ? ["/c", "npx", "-y", "@cyanheads/pubmed-mcp-server"] : ["-y", "@cyanheads/pubmed-mcp-server"],
      { stdio: "inherit", env }
    );
    child.on("exit", (code) => resolve(code ?? 0));
  });
}

async function main() {
  let tiktokenDir = await findTiktokenDir();
  if (tiktokenDir) {
    await ensureWasm(tiktokenDir);
  }

  let code = await runServer();

  // Se falhou (ex: tiktoken), o npx populou o cache; aplicar fix e tentar de novo
  if (code !== 0) {
    tiktokenDir = await findTiktokenDir();
    if (tiktokenDir) {
      await ensureWasm(tiktokenDir);
      code = await runServer();
    }
  }

  process.exit(code);
}

main().catch((err) => {
  console.error("[pubmed-mcp] Erro:", err.message);
  process.exit(1);
});
