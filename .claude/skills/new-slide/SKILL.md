---
name: new-slide
description: Cria novo slide assertion-evidence para uma aula. Use quando o usuário pedir "criar slide", "novo slide", "new slide", "adicionar slide sobre [topic]". Gera HTML completo com template correto.
argument-hint: "[lecture] [assertion]"
allowed-tools: Read, Write, Bash(npm run lint:slides)
---

# Create New Slide

Cria slide para `$ARGUMENTS`. Exemplo: `/new-slide cirrose "Carvedilol reduz primeira descompensação em 51%"`

## Antes de criar

1. Verificar `_manifest.js` da aula para posição correta
2. Confirmar que assertion tem dado clínico verificável (com fonte)
3. Escolher archetype adequado (ver `aulas/cirrose/archetypes.css`)

## Template HTML

```html
<section id="s-[id]">
  <div class="slide-inner archetype-[tipo]">
    <p class="section-tag">[BLOCO: A1 / A2 / A3 / APP]</p>
    <h2>[AFIRMAÇÃO CLÍNICA COMPLETA — frase verificável]</h2>
    <div class="evidence" data-animate="fadeUp">
      <!-- evidência visual: gráfico, tabela, número-chave, diagrama -->
    </div>
    <cite class="source-tag">Autor et al. Journal Ano;Vol:Pags. PMID: XXXXX</cite>
  </div>
  <aside class="notes">
    [TEMPO: ~90s]
    Falar: ...
    Ênfase: ...
    [DATA] Fonte: | Verificado: AAAA-MM-DD
    Transição: próximo slide aborda ...
  </aside>
</section>
```

## Regras invioláveis

- `<h2>` = frase completa com claim (não rótulo)
- Zero `<ul>` ou `<ol>` no corpo
- Corpo ≤ 30 palavras
- Citação com PMID obrigatória
- Cores via tokens OKLCH (nunca hardcoded)
- Animações via `data-animate` (nunca gsap inline)
- `<aside class="notes">` com timing obrigatório

## Após criar

Rodar `npm run lint:slides` e corrigir erros antes de reportar concluído.
