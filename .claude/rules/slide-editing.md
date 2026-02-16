# Slide Editing Rules

## Checklist Pré-Edição (OBRIGATÓRIO)

Antes de editar QUALQUER slide:

- [ ] `<h2>` é asserção clínica (NÃO rótulo genérico)
- [ ] Sem `<ul>` ou `<ol>` no slide (só em notes/apêndice)
- [ ] `<aside class="notes">` presente com timing e fontes
- [ ] `<section>` NÃO tem `style` com `display` (E07)
- [ ] Tags balanceadas
- [ ] Dados numéricos verificados (ver `medical-data.md`)
- [ ] Layout em `.slide-inner`, não no `<section>`
- [ ] Background via `data-background-color` com HEX literal
- [ ] Se bg escuro: `.slide-inner` tem `.slide-navy`
- [ ] Sem CDN links
- [ ] Animações via `data-animate`, NUNCA gsap inline

---

## Batch Workflow

1. Declarar quais slides e o que muda
2. Esperar aprovação
3. Executar (máx 5 slides por batch — E06)
4. Preview no browser
5. Commit: `[AULA] batch N — descrição`
6. Próximo batch

**"Só ajusta X" = escopo é APENAS X (E20)**

---

## AI Markers (PROIBIDO)

- Linhas decorativas sob títulos
- Emojis em slides médicos
- Gradientes decorativos sem função informacional
- Sombras excessivas em elementos simples

---

## Referências cruzadas

- Flexbox anti-patterns → `css-errors.md` Cluster A
- Cores e semântica → `design-system.md`
- Speaker notes formato → `reveal-patterns.md`
- Fragments e Reveal.js → `reveal-patterns.md`
- Apêndice: `data-visibility="hidden"` (NÃO uncounted) → `reveal-patterns.md`
- Dados médicos → `medical-data.md`
