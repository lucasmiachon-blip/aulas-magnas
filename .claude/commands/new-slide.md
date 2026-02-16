# Create New Slide

Create a new assertion-evidence slide for the specified lecture.

## Usage
`/new-slide [lecture] [assertion]`

Example: `/new-slide cirrose "Carvedilol reduces first decompensation by 51%"`

## Template to generate:

```html
<section>
  <div class="slide-inner">
    <p class="section-tag">SECTION</p>
    <h2>[ASSERTION SENTENCE]</h2>
    <div class="evidence" data-animate="fadeUp">
      <!-- Visual evidence here -->
    </div>
    <footer class="citation">Author et al. Journal Year. PMID: XXXXX</footer>
  </div>
  <aside class="notes">
    [TEMPO: ~90s]
    Falar: ...
    Ênfase: ...
    Transição para próximo: ...
  </aside>
</section>
```

## Rules:
1. Title MUST be a complete sentence (assertion)
2. Body MUST have visual evidence (no bullets)
3. Max 30 words in body text
4. Citation with PMID required
5. Speaker notes with timing estimate
6. Use OKLCH tokens from base.css only
7. Add appropriate data-animate attribute if helpful
