#!/usr/bin/env bash
# Worktree Cleanup — validates state and removes WT
# Usage: bash .claude/scripts/worktree-cleanup.sh <slug>
# Must be run from MAIN repo, not from inside the WT

set -euo pipefail

SLUG="${1:?Usage: worktree-cleanup.sh <slug>}"
WT_DIR="../aulas-magnas-wt-$SLUG"
BRANCH="feat/$SLUG-mvp"

# Verify we're on main
CURRENT=$(git branch --show-current 2>/dev/null || echo "unknown")
if [ "$CURRENT" != "main" ] && [ "$CURRENT" != "master" ]; then
  echo "ERROR: Run this from main branch, not from '$CURRENT'" >&2
  exit 1
fi

# Check WT exists
if [ ! -d "$WT_DIR" ]; then
  echo "ERROR: Worktree not found at $WT_DIR" >&2
  echo "Active worktrees:" >&2
  git worktree list >&2
  exit 1
fi

# Check WT is clean
WT_STATUS=$(cd "$WT_DIR" && git status --porcelain)
if [ -n "$WT_STATUS" ]; then
  echo "WARNING: Worktree has uncommitted changes:" >&2
  echo "$WT_STATUS" >&2
  echo "" >&2
  read -p "Stash and continue? (y/N) " CONFIRM
  if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
    (cd "$WT_DIR" && git stash)
  else
    echo "Aborted. Clean the WT manually first." >&2
    exit 1
  fi
fi

# Check if branch was merged
MERGED=$(git branch --merged main | grep "$BRANCH" || true)
if [ -z "$MERGED" ]; then
  echo "WARNING: Branch '$BRANCH' has NOT been merged to main yet!" >&2
  echo "If you proceed, unmerged work will be on the branch but WT will be removed." >&2
  read -p "Remove anyway? (y/N) " CONFIRM
  if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Aborted. Merge first: git merge --no-ff $BRANCH" >&2
    exit 1
  fi
fi

# Remove worktree
echo "Removing worktree: $WT_DIR"
git worktree remove "$WT_DIR"

# Log removal
DIR="$HOME/.claude/session-logs"
mkdir -p "$DIR"
node -e "
const entry = {
  ts: new Date().toISOString(),
  event: 'worktree-remove',
  slug: process.argv[1],
  branch: process.argv[2],
  merged: process.argv[3] !== ''
};
console.log(JSON.stringify(entry));
" "$SLUG" "$BRANCH" "$MERGED" >> "$DIR/sessions.jsonl"

echo ""
echo "=== Worktree removed ==="
echo "Branch '$BRANCH' still exists. To delete: git branch -d $BRANCH"
