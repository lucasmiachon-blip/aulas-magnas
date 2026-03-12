#!/usr/bin/env bash
# P0: Session Tracker — logs session start/end/compact events
# Uses node for JSON.

set -euo pipefail

INPUT=$(cat 2>/dev/null || echo '{}')
EVENT_TYPE="${1:-session-event}"

DIR="$HOME/.claude/session-logs"
mkdir -p "$DIR"

BRANCH=$(git branch --show-current 2>/dev/null || echo 'detached')

node -e "
const input = JSON.parse(process.argv[1] || '{}');
const entry = {
  ts: new Date().toISOString(),
  event: process.argv[2],
  session: input.session_id || 'no-session',
  matcher: input.matcher || 'normal',
  cwd: process.cwd(),
  branch: process.argv[3]
};
console.log(JSON.stringify(entry));
" "$INPUT" "$EVENT_TYPE" "$BRANCH" >> "$DIR/sessions.jsonl" 2>/dev/null

exit 0
