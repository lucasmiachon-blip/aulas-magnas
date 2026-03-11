#!/usr/bin/env bash
# Worktree Init — creates a WT with validation and logging
# Usage: bash .claude/scripts/worktree-init.sh <slug>
# Creates: ../aulas-magnas-wt-<slug> on branch feat/<slug>-mvp

set -euo pipefail

SLUG="${1:?Usage: worktree-init.sh <slug>}"
WT_DIR="../aulas-magnas-wt-$SLUG"
BRANCH="feat/$SLUG-mvp"

# Validate slug format
if ! echo "$SLUG" | grep -qE '^[a-z0-9]([a-z0-9-]*[a-z0-9])?$'; then
  echo "ERROR: slug must be lowercase alphanumeric with hyphens. Got: $SLUG" >&2
  exit 1
fi

# Check not already existing
if [ -d "$WT_DIR" ]; then
  echo "ERROR: Worktree already exists at $WT_DIR" >&2
  echo "To resume: cd $WT_DIR && git status" >&2
  exit 1
fi

# Ensure main is clean before branching
if [ -n "$(git status --porcelain)" ]; then
  echo "WARNING: Main has uncommitted changes. Stash or commit before creating WT." >&2
  echo "Run: git stash or commit first" >&2
  exit 1
fi

# Create worktree
echo "Creating worktree: $WT_DIR (branch: $BRANCH)"
git worktree add "$WT_DIR" -b "$BRANCH"

# Log creation
DIR="$HOME/.claude/session-logs"
mkdir -p "$DIR"
node -e "
const entry = {
  ts: new Date().toISOString(),
  event: 'worktree-create',
  slug: process.argv[1],
  branch: process.argv[2],
  path: require('path').resolve(process.argv[3]),
  from_branch: 'main'
};
console.log(JSON.stringify(entry));
" "$SLUG" "$BRANCH" "$WT_DIR" >> "$DIR/sessions.jsonl"

echo ""
echo "=== Worktree created ==="
echo "Path:   $WT_DIR"
echo "Branch: $BRANCH"
echo ""
echo "Next steps:"
echo "  cd $WT_DIR"
echo "  claude --model sonnet    # Open worker session"
echo ""
echo "RULES:"
echo "  - shared/ is READ-ONLY in this WT"
echo "  - Merge back: (on main) git merge --no-ff $BRANCH"
echo "  - Absorb updates: (in WT) git merge main"
echo "  - Cleanup: git worktree remove $WT_DIR"
