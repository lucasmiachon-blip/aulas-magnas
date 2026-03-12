#!/usr/bin/env bash
# Safety Gate: Validate merge commands
# Ensures --no-ff on merges to main, blocks merging with shared/ changes
# Runs on PreToolUse (matcher: Bash)

set -euo pipefail

INPUT=$(cat 2>/dev/null || echo '{}')

CMD=$(node -e "
const i = JSON.parse(process.argv[1] || '{}');
console.log((i.tool_input || {}).command || '');
" "$INPUT" 2>/dev/null || echo "")

# Skip non-merge git commands (commit messages may contain "merge" text)
if echo "$CMD" | grep -qE 'git\s+(commit|log|diff|status|stash|add|push|pull|fetch|checkout|branch|tag|show|rebase|cherry-pick)'; then
  exit 0
fi
# Only care about actual git merge commands
if ! echo "$CMD" | grep -qE 'git\s+merge'; then
  exit 0
fi

# Detect target directory: if command has "cd <path> &&", resolve branch there
TARGET_DIR=$(echo "$CMD" | grep -oE '^cd\s+[^ ]+' | awk '{print $2}' || true)
if [ -n "$TARGET_DIR" ] && [ -d "$TARGET_DIR" ]; then
  BRANCH=$(git -C "$TARGET_DIR" branch --show-current 2>/dev/null || echo "unknown")
else
  BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
fi

# If merging TO main, enforce --no-ff
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
  if ! echo "$CMD" | grep -q '\-\-no-ff'; then
    echo "BLOCKED: Merging to main requires --no-ff to preserve history. Use: git merge --no-ff <branch>" >&2
    exit 2
  fi
fi

# If merging FROM a feature branch, check for shared/ changes
if echo "$CMD" | grep -qE 'git\s+merge\s+'; then
  # Extract the branch being merged
  MERGE_BRANCH=$(echo "$CMD" | grep -oE 'git\s+merge\s+[^ ]+' | awk '{print $3}')
  if [ -n "$MERGE_BRANCH" ]; then
    # Check if merged branch has shared/ changes vs current branch
    SHARED_CHANGES=$(git diff --name-only "$BRANCH"..."$MERGE_BRANCH" 2>/dev/null | grep '^shared/' || true)
    if [ -n "$SHARED_CHANGES" ]; then
      echo "BLOCKED: Branch '$MERGE_BRANCH' has changes in shared/:" >&2
      echo "$SHARED_CHANGES" >&2
      echo "shared/ edits must happen on main only. Cherry-pick or rebase those changes out." >&2
      exit 2
    fi
  fi
fi

exit 0
