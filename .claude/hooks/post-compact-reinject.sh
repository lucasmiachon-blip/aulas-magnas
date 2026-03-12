#!/usr/bin/env bash
# Post-compact context reinject — ensures critical state survives compaction
# Runs on SessionStart (matcher: compact)
# Risk: none (read-only, non-blocking)

set -euo pipefail

echo "=== POST-COMPACT: Critical context reinject ==="
echo ""

# Current branch and recent commits
echo "--- Git State ---"
git branch --show-current 2>/dev/null || echo "(detached)"
git log --oneline -5 2>/dev/null || echo "(no commits)"
echo ""

# Find and show active HANDOFF (most recently modified)
echo "--- Active HANDOFF (first 40 lines) ---"
HANDOFF=""
LATEST_TS=0
for f in aulas/*/HANDOFF.md; do
  if [ -f "$f" ]; then
    TS=$(stat -c '%Y' "$f" 2>/dev/null || stat -f '%m' "$f" 2>/dev/null || echo 0)
    if [ "$TS" -gt "$LATEST_TS" ] 2>/dev/null; then
      LATEST_TS="$TS"
      HANDOFF="$f"
    fi
  fi
done

if [ -n "$HANDOFF" ]; then
  head -40 "$HANDOFF"
else
  echo "(no HANDOFF.md found)"
fi

echo ""
echo "--- Recent Lessons (last 15 lines) ---"
tail -15 tasks/lessons.md 2>/dev/null || echo "(no lessons.md)"

echo ""
echo "=== END POST-COMPACT ==="

exit 0
