#!/usr/bin/env bash
# Instala git pre-commit hook local.
# Rodar uma vez após clonar o repo: bash scripts/install-hooks.sh

set -e

HOOK=".git/hooks/pre-commit"

cat > "$HOOK" << 'EOF'
#!/usr/bin/env bash
# Pre-commit: bloqueia commit se lint:slides falhar.
set -e

# Só rodar se houver mudanças em slides HTML
CHANGED=$(git diff --cached --name-only | grep -E 'aulas/.*/slides/.*\.html$' || true)

if [ -z "$CHANGED" ]; then
  exit 0
fi

echo "→ lint:slides (slides modificados detectados)..."
npm run lint:slides
EOF

chmod +x "$HOOK"
echo "✓ pre-commit hook instalado em $HOOK"
