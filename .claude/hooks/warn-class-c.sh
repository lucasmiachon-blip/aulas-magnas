#!/usr/bin/env bash
# warn-class-c.sh — PreToolUse hook for Bash
# Warns when "git merge main" in a WT would bring Class C (semantic) files.
# Does NOT block — just warns the agent to triage before proceeding.

# Only fire on "git merge" commands
TOOL_INPUT="${TOOL_INPUT:-}"
if ! echo "$TOOL_INPUT" | grep -qE 'git\s+merge\s+main'; then
  exit 0
fi

# Only fire in worktree branches (not on main itself)
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "unknown" ]; then
  exit 0
fi

# Detect aula from branch name
AULA=""
case "$BRANCH" in
  *cirrose*)    AULA="cirrose" ;;
  *grade*)      AULA="grade" ;;
  *osteo*)      AULA="osteoporose" ;;
  *metanalise*) AULA="metanalise" ;;
esac

# Class C patterns: slides, narrative, evidence-db, manifest, CSS
PATTERNS="aulas/.*/slides/|narrative\.md|evidence-db|_manifest\.js"

# Check if main has Class C changes relative to current branch
CLASS_C_FILES=$(git diff --name-only HEAD...main 2>/dev/null | grep -E "$PATTERNS" || true)

if [ -n "$CLASS_C_FILES" ]; then
  echo ""
  echo "⚠️  WARN — Class C (semantic) files detected in main:"
  echo "$CLASS_C_FILES" | while read -r f; do echo "  - $f"; done
  echo ""
  echo "These are content files (slides, narrative, evidence-db, manifest)."
  echo "Per quarantine protocol: triage each file before absorbing."
  echo "Read the diff for each Class C file before proceeding with merge."
  echo ""
fi

# Never block — just warn
exit 0
