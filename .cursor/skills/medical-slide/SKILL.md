---
name: medical-slide
description: Use when creating, implementing, or modifying medical presentation slides. Covers the full workflow from Notion spec to HTML with assertion-evidence structure, tri-mode verification, and clinical data safety.
---

# Medical Slide Builder

## When to use
- User says "crie um slide", "implemente slide", "faça o HTML do slide X"
- User references a Notion spec or Slides DB entry
- User asks to convert a blueprint/storyboard into HTML

## Workflow

### Step 1: Read the spec
If a Notion Slides DB ID or slide name is provided:
1. Use Notion MCP to read the slide record
2. Extract: Headline PT, Visual Recomendado, Objetivo Cognitivo, Refs
3. If no Notion spec: ask the user for headline + visual + objective

### Step 2: Verify medical data
Before writing any HTML:
- [ ] Every number has a verified source (PMID or DOI)
- [ ] HR vs RR correctly identified
- [ ] NNT includes CI 95% and time frame
- [ ] If any data missing: use `[TBD]` and flag to user

### Step 3: Write HTML (assertion-evidence)
Structure every slide as:
```html
<section class="slide" id="SLIDE-ID">
  <!-- Título = AFIRMAÇÃO (frase completa, max 2 linhas) -->
  <h2 class="slide-title">Albumina reduz mortalidade em PBE</h2>
  
  <!-- Corpo = EVIDÊNCIA VISUAL que comprova a afirmação -->
  <div class="slide-body">
    <!-- Hierarquia: SVG/gráfico > imagem > tabela > texto -->
  </div>
  
  <!-- Referências -->
  <footer class="slide-refs">Sort et al, NEJM 1999; PMID: 10451459</footer>
</section>
```

**Title rules:**
- ✅ "Albumina reduz mortalidade em PBE por restaurar volemia efetiva"
- ❌ "Tratamento de PBE" (isso é descrição, não afirmação)

**Visual hierarchy:**
1. SVG/D3 gráfico construído em código
2. Imagem de paper (forest plot, Kaplan-Meier)
3. Tabela formatada com classes existentes
4. Texto puro (último recurso)

### Step 4: Apply design tokens
- Use `var()` for ALL colors — never hardcode hex
- Check font sizes against minimums: A ≥ 0.97vw, B ≥ 0.78vw, C ≥ 0.65vw
- Gold on light background → use `--gold-dark` variant

### Step 5: Add interactivity (if applicable)
- Every animation needs a pedagogical reason
- Generic fadeUp on everything = prohibited
- Progressive disclosure: one concept per click
- Click sequence should mirror the presenter's oral narrative

### Step 6: Self-check before delivering
- [ ] Title is an assertion, not a description?
- [ ] Visual evidence supports the assertion?
- [ ] All numbers have verified sources?
- [ ] Font sizes meet tier minimums?
- [ ] No hardcoded hex values?
- [ ] No `display` inline on `<section>`?
- [ ] Tags balanced?

## Anti-patterns (never do these)
- Slide with title only (no visual evidence)
- Wall of text pretending to be a slide
- Decorative animation without teaching purpose
- Inventing or estimating clinical numbers
- Using `!important` without justification comment
