#!/usr/bin/env bash
# guard-secrets.sh — WARN (não bloqueia) se staged files contêm padrões de secrets
# Wired: PreToolUse → Bash (git commit/add)
# Comportamento: exibe alerta, deixa usuário decidir

set -euo pipefail

# Só roda em comandos git commit/add
TOOL_INPUT="${TOOL_INPUT:-}"
if ! echo "$TOOL_INPUT" | node -e "
  const input = require('fs').readFileSync('/dev/stdin','utf8');
  try {
    const parsed = JSON.parse(input);
    const cmd = parsed.command || '';
    if (/git\s+(commit|add)/.test(cmd)) process.exit(0);
    process.exit(1);
  } catch { process.exit(1); }
" 2>/dev/null; then
  exit 0
fi

# Padrões de secrets a escanear
PATTERNS=(
  'sk-[a-zA-Z0-9]{20,}'          # OpenAI keys
  'Bearer [a-zA-Z0-9_\-\.]{20,}' # Auth headers
  '-----BEGIN'                     # Private keys
  'AKIA[0-9A-Z]{16}'              # AWS access keys
  'ghp_[a-zA-Z0-9]{36}'           # GitHub PATs
  'gho_[a-zA-Z0-9]{36}'           # GitHub OAuth tokens
  'ntn_[a-zA-Z0-9]{40,}'          # Notion internal tokens
  'secret_[a-zA-Z0-9]{40,}'       # Notion integration secrets
)

# Arquivos staged (ou todos tracked se não houver staged)
STAGED=$(git diff --cached --name-only 2>/dev/null || true)
if [ -z "$STAGED" ]; then
  exit 0
fi

FOUND=0
WARNINGS=""

for file in $STAGED; do
  # Skip binários e .env (que já está no .gitignore)
  if [[ "$file" == *.png || "$file" == *.jpg || "$file" == *.woff2 || "$file" == *.pdf ]]; then
    continue
  fi

  # Verificar se arquivo existe
  if [ ! -f "$file" ]; then
    continue
  fi

  for pattern in "${PATTERNS[@]}"; do
    if grep -qE "$pattern" "$file" 2>/dev/null; then
      # Excluir padrões em .env.example (são placeholders, não secrets reais)
      if [[ "$file" == ".env.example" ]]; then
        continue
      fi
      # Excluir referências a ${VAR} (template vars, não secrets)
      MATCH=$(grep -nE "$pattern" "$file" 2>/dev/null | grep -v '\$\{' | head -3)
      if [ -n "$MATCH" ]; then
        WARNINGS="$WARNINGS\n⚠ $file:\n$MATCH\n"
        FOUND=1
      fi
    fi
  done
done

if [ "$FOUND" -eq 1 ]; then
  echo "⚠ guard-secrets: Possíveis secrets detectados em staged files:"
  echo -e "$WARNINGS"
  echo "Verifique antes de commitar. Se são falsos positivos, prossiga."
  # WARN only — não bloqueia (exit 0)
  exit 0
fi

exit 0
