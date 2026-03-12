#!/usr/bin/env bash
# Hook 1 — PreToolUse: Block Write to slides/*.html if evidence-db.md not read this session
# Exit 2 = block. Exit 0 = allow.

INPUT=$(cat)

# Extract file_path from tool_input
FILE_PATH=$(echo "$INPUT" | node -e "
const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
console.log((d.tool_input||{}).file_path||'');
" 2>/dev/null)

# Only apply to aulas/cirrose/slides/*.html
if [[ "$FILE_PATH" != *"aulas/cirrose/slides/"* ]] || [[ "$FILE_PATH" != *.html ]]; then
    exit 0
fi

# Get transcript path
TRANSCRIPT=$(echo "$INPUT" | node -e "
const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
console.log(d.transcript_path||'');
" 2>/dev/null)

# If no transcript available, allow (can't verify)
if [ -z "$TRANSCRIPT" ] || [ ! -f "$TRANSCRIPT" ]; then
    exit 0
fi

# Search transcript for a Read tool call on evidence-db.md
FOUND=$(node -e "
const fs=require('fs');
let found=false;
try {
  const lines=fs.readFileSync(process.argv[1],'utf8').split('\n');
  for(const line of lines){
    if(!line.trim()) continue;
    try {
      const entry=JSON.parse(line);
      const msg=entry.message||entry;
      const content=msg.content;
      if(!Array.isArray(content)) continue;
      for(const item of content){
        if(typeof item!=='object'||item===null) continue;
        if(item.type==='tool_use'&&item.name==='Read'){
          const fp=(item.input||{}).file_path||'';
          if(fp.includes('evidence-db.md')){found=true;break;}
        }
      }
      if(found) break;
    } catch(e){}
  }
} catch(e){}
console.log(found?'1':'0');
" "$TRANSCRIPT" 2>/dev/null)

if [ "$FOUND" = "1" ]; then
    exit 0
fi

# Block
echo "Ler evidence-db.md antes de editar slides. Caminho: aulas/cirrose/references/evidence-db.md" >&2
exit 2
