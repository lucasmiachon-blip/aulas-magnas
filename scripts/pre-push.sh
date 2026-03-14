#!/usr/bin/env bash
# Pre-push gate: runs done-gate.js --strict for the active aula.
# Detects aula from branch name. Called by .git/hooks/pre-push.
#
# Exit 0 = push allowed. Exit 1 = push blocked.
set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

# Detect aula from branch name
AULA=""
case "$BRANCH" in
  *cirrose*)    AULA="cirrose" ;;
  *grade*)      AULA="grade" ;;
  *osteo*)      AULA="osteoporose" ;;
  *metanalise*) AULA="metanalise" ;;
esac

if [ -z "$AULA" ]; then
  echo "pre-push: branch '$BRANCH' — no aula detected, skipping done-gate."
  exit 0
fi

echo "pre-push: branch '$BRANCH' → aula '$AULA'"

# --strict only on main (merge gate). Feature branches use normal mode (warnings don't block).
if [ "$BRANCH" = "main" ]; then
  echo "pre-push: running done-gate --strict (main branch)..."
  node scripts/done-gate.js "$AULA" --strict
else
  echo "pre-push: running done-gate (feature branch — warnings allowed)..."
  node scripts/done-gate.js "$AULA"
fi

echo "pre-push: ✓ done-gate --strict passed for $AULA"
