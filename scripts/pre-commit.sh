#!/usr/bin/env bash
# Pre-commit: (1) guard Classe C on main, (2) lint on change.
# Called by .git/hooks/pre-commit. Versionado no repo.
set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

# ── Guard: Classe C content blocked on main ──
# Slides, CSS, JS, references = content. Must go through worktree branches.
# Bypass: ALLOW_MAIN_CONTENT=1 git commit (emergency only)
if [ "$BRANCH" = "main" ] && [ -z "$ALLOW_MAIN_CONTENT" ]; then
  CLASSE_C=$(git diff --cached --name-only | grep -E '^aulas/.*/slides/|^aulas/.*\.(css|js)$|^aulas/.*/references/' || true)
  if [ -n "$CLASSE_C" ]; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║  BLOQUEADO: Classe C (conteúdo) em main                 ║"
    echo "║  Slides, CSS, JS e references devem ir pela worktree.   ║"
    echo "║  Bypass emergencial: ALLOW_MAIN_CONTENT=1 git commit    ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo "Arquivos bloqueados:"
    echo "$CLASSE_C" | sed 's/^/  → /'
    echo ""
    exit 1
  fi
fi

# ── Lints ──
SLIDES_CHANGED=$(git diff --cached --name-only | grep -E 'aulas/.*/slides/.*\.html$' || true)
CASE_OR_MANIFEST=$(git diff --cached --name-only | grep -E '(CASE\.md|_manifest\.js)$' || true)

if [ -n "$SLIDES_CHANGED" ]; then
  echo "→ lint:slides (slides modificados detectados)..."
  npm run lint:slides
fi

if [ -n "$CASE_OR_MANIFEST" ]; then
  echo "→ lint:case-sync (CASE.md ou _manifest.js modificados)..."
  npm run lint:case-sync
fi
