#!/usr/bin/env bash
# P0: Audit Trail — logs EVERY tool call to daily JSONL
# WT-aware: detects if running inside a git worktree and logs it
# Uses node for JSON parsing (no jq on this Windows setup)
# Output: ~/.claude/session-logs/YYYY-MM-DD.jsonl

set -euo pipefail

INPUT=$(cat 2>/dev/null || echo '{}')

DIR="$HOME/.claude/session-logs"
mkdir -p "$DIR"
LOGFILE="$DIR/$(date +%Y-%m-%d).jsonl"

# Detect worktree context
BRANCH=$(git branch --show-current 2>/dev/null || echo "detached")
GIT_DIR=$(git rev-parse --git-dir 2>/dev/null || echo ".git")
WORKTREE=""
if echo "$GIT_DIR" | grep -q "worktrees"; then
  # Inside a worktree: extract WT name from path
  WORKTREE=$(basename "$(echo "$GIT_DIR" | sed 's|/.git/worktrees/.*||')" 2>/dev/null || echo "")
fi

node -e "
const input = JSON.parse(process.argv[1] || '{}');
const ti = input.tool_input || {};
let detail = ti.file_path || ti.pattern || ti.skill || '?';
if (ti.command) detail = ti.command.split('\\n')[0].slice(0, 120);
if (ti.prompt) detail = ti.prompt.slice(0, 80);
if (ti.query) detail = ti.query.slice(0, 80);
const entry = {
  ts: new Date().toISOString(),
  tool: input.tool_name || 'unknown',
  session: input.session_id || 'no-session',
  detail,
  cwd: process.cwd(),
  branch: process.argv[2],
  worktree: process.argv[3] || null
};
if (input.duration_ms) entry.duration_ms = input.duration_ms;
console.log(JSON.stringify(entry));
" "$INPUT" "$BRANCH" "$WORKTREE" >> "$LOGFILE" 2>/dev/null

exit 0
