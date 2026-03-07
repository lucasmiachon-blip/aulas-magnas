---
name: export
description: Exporta slides para PDF e screenshots usando DeckTape. Use quando o usuário pedir "exportar", "gerar PDF", "export slides", "screenshots do deck". Requer servidor rodando.
disable-model-invocation: true
argument-hint: "[lecture]"
allowed-tools: Bash(npm *), Bash(npx *), Bash(kill *), Bash(sleep *)
---

# Export Slides

Exporta `$ARGUMENTS` para PDF + screenshots. Exemplo: `/export cirrose`

## Passos

1. Build: `npm run build`
2. Preview server: `npx serve dist -l 4173 &` → `sleep 2`
3. PDF Plan A (1920×1080):
   ```bash
   npx decktape reveal --size 1920x1080 \
     http://localhost:4173/aulas/$ARGUMENTS/index.html \
     exports/$ARGUMENTS-plan-a.pdf
   ```
4. Screenshots:
   ```bash
   npx decktape reveal --size 1920x1080 \
     --screenshots --screenshots-format=png \
     --screenshots-directory=exports/screenshots/$ARGUMENTS \
     http://localhost:4173/aulas/$ARGUMENTS/index.html \
     /dev/null
   ```
5. PDF Plan C (1280×720):
   ```bash
   npx decktape reveal --size 1280x720 \
     http://localhost:4173/aulas/$ARGUMENTS/index.html \
     exports/$ARGUMENTS-plan-c.pdf
   ```
6. Matar servidor: `kill $(lsof -t -i:4173)`
7. Reportar: tamanhos dos arquivos + contagem de slides
