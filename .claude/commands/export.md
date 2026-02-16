# Export Slides

Export the specified lecture to PDF and per-slide screenshots.

## Usage
`/export [lecture]`

Example: `/export cirrose`

## Steps:

1. Build the project: `npm run build`
2. Start preview server: `npx serve dist -l 4173 &`
3. Wait for server: `sleep 2`
4. Run DeckTape for PDF:
   ```bash
   npx decktape reveal --size 1920x1080 \
     http://localhost:4173/aulas/[lecture]/index.html \
     exports/[lecture]-plan-a.pdf
   ```
5. Run DeckTape for screenshots:
   ```bash
   npx decktape reveal --size 1920x1080 \
     --screenshots --screenshots-format=png \
     --screenshots-directory=exports/screenshots/[lecture] \
     http://localhost:4173/aulas/[lecture]/index.html \
     /dev/null
   ```
6. Export Plan B:
   ```bash
   npx decktape reveal --size 1280x720 \
     http://localhost:4173/aulas/[lecture]/index.stage-b.html \
     exports/[lecture]-plan-b.pdf
   ```
7. Kill preview server
8. Report file sizes and slide count
