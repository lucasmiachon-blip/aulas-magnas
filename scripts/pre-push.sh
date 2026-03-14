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
echo "pre-push: running done-gate --strict..."

node scripts/done-gate.js "$AULA" --strict

echo "pre-push: ✓ done-gate --strict passed for $AULA"
