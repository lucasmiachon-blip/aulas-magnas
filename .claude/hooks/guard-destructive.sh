#!/usr/bin/env bash
# Safety Gate: Block destructive git commands
# Uses node for JSON parsing.

set -euo pipefail

INPUT=$(cat 2>/dev/null || echo '{}')

CMD=$(node -e "
const i = JSON.parse(process.argv[1] || '{}');
console.log((i.tool_input || {}).command || '');
" "$INPUT" 2>/dev/null || echo "")

if echo "$CMD" | grep -qE 'git\s+push\s+.*--force'; then
  echo "BLOCKED: git push --force detected. Use normal push or ask user." >&2
  exit 2
fi

if echo "$CMD" | grep -qE 'git\s+reset\s+--hard'; then
  echo "BLOCKED: git reset --hard destroys uncommitted work. Use git stash." >&2
  exit 2
fi

if echo "$CMD" | grep -qE 'git\s+clean\s+-[a-zA-Z]*f'; then
  echo "BLOCKED: git clean -f permanently deletes untracked files." >&2
  exit 2
fi

if echo "$CMD" | grep -qE 'rm\s+-rf\s+(/|~|\.\.)'; then
  echo "BLOCKED: dangerous rm -rf pattern." >&2
  exit 2
fi

exit 0
