#!/usr/bin/env bash
# Hook 4 — SubagentStop: Append 1-line summary to NOTES.md for every subagent that completes.
# Format: [DATA] [AGENT:id] — concluído. Status: [PASS/FAIL/PARTIAL]

INPUT=$(cat)

AGENT_TYPE=$(echo "$INPUT" | node -e "
const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
console.log(d.agent_type||'unknown');
" 2>/dev/null)

AGENT_ID=$(echo "$INPUT" | node -e "
const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
console.log((d.agent_id||'?').slice(0,8));
" 2>/dev/null)

LAST_MSG=$(echo "$INPUT" | node -e "
const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
console.log((d.last_assistant_message||'').slice(0,300));
" 2>/dev/null)

CWD=$(echo "$INPUT" | node -e "
const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
console.log(d.cwd||'.');
" 2>/dev/null)

DATE=$(date '+%Y-%m-%d %H:%M')
NOTES="$CWD/aulas/cirrose/NOTES.md"

# Infer status from last message content
LOWER_MSG=$(echo "$LAST_MSG" | tr '[:upper:]' '[:lower:]')
STATUS="PARTIAL"
if echo "$LOWER_MSG" | grep -qE "fail|erro|error|cannot|unable|not found|exception"; then
    STATUS="FAIL"
elif echo "$LOWER_MSG" | grep -qE "complet|done|finish|ok\b|pass|succes|conclu"; then
    STATUS="PASS"
fi

# Create NOTES.md if it doesn't exist
if [ ! -f "$NOTES" ]; then
    printf "# NOTES — Cirrose\n\n" > "$NOTES"
fi

printf "\n[%s] [%s:%s] — concluído. Status: %s\n" "$DATE" "$AGENT_TYPE" "$AGENT_ID" "$STATUS" >> "$NOTES"

exit 0
