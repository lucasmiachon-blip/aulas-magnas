#!/usr/bin/env node

/**
 * MCP Profile Switcher
 * Usage: node scripts/mcp-switch.js <profile>
 * Profiles: dev | research | qa | full
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const profile = process.argv[2];
const validProfiles = ['dev', 'research', 'qa', 'full'];

if (!profile || !validProfiles.includes(profile)) {
  console.error(`Usage: node scripts/mcp-switch.js <${validProfiles.join('|')}>`);
  process.exit(1);
}

const profilePath = resolve(root, '.mcp-profiles', `${profile}.json`);
const targetPath = resolve(root, '.mcp.json');

if (!existsSync(profilePath)) {
  console.error(`Profile not found: ${profilePath}`);
  process.exit(1);
}

const content = readFileSync(profilePath, 'utf-8');
const parsed = JSON.parse(content);
const serverCount = Object.keys(parsed.mcpServers).length;

writeFileSync(targetPath, content, 'utf-8');

console.log(`MCP profile switched to: ${profile} (${serverCount} servers)`);
console.log(`Restart Claude Code to apply changes.`);
