# AI Disclosure — Cirrose Masterclass

> Transparência sobre uso de IA na produção deste material.
> Base: ICMJE 2024-2025 (diretrizes gerais para aulas/residência).
> Para congressos: aplicar diretrizes específicas da sociedade (AASLD, EASL, etc.).

---

## Princípio

IA **não é autor nem coautor** (ICMJE 2024). IA é ferramenta.
O autor (Lucas Miachon) assume responsabilidade integral por todo conteúdo clínico.

---

## Ferramentas utilizadas

| Ferramenta | Modelo | Papel |
|------------|--------|-------|
| Claude Code | Claude Opus 4.6 | Código, CSS, lint, engine, governança de dados |
| ChatGPT | GPT 5.4 Pro | Draft narrativo, arco dramático, storyboard |
| Gemini | Gemini 3.1 | Auditoria visual, screenshots, video review |
| Cursor | Claude (via IDE) | Edição interativa de slides, CSS refinement |

---

## Classificação de uso (framework SAGE)

| Categoria | Definição | Neste projeto |
|-----------|-----------|---------------|
| AI-assisted | Refinamento de texto humano (grammar, readability) | Sim — edição de speaker notes |
| AI-generated | IA criou conteúdo novo (código, layout, análise) | Sim — HTML/CSS, design system, lint |
| AI as author | IA na linha de autoria | **Não — proibido por ICMJE** |

Disclosure obrigatório para conteúdo AI-generated.

---

## Contribuição por artefato

| Artefato | Autor | IA utilizada |
|----------|-------|-------------|
| `references/CASE.md` | Lucas | — |
| `references/narrative.md` | Lucas | ChatGPT (draft) |
| `references/evidence-db.md` | Lucas | Claude (verificação PMIDs) |
| `slides/_manifest.js` | Lucas + Claude | Claude (estrutura), Lucas (aprovação) |
| `slides/*.html` | Lucas | Cursor + Claude + Gemini (código, visual QA) |
| `shared/js/engine.js` | Claude | Lucas (spec + aprovação) |
| `shared/css/base.css` | Claude + Cursor | Lucas (spec + aprovação) |
| `.claude/rules/*.md` | Claude | Lucas (aprovação) |

---

## Disclosure para slides

### Slide final (acknowledgments)
> **AI Disclosure:** Ferramentas de IA (Claude, ChatGPT, Gemini) auxiliaram design visual,
> código e revisão de literatura. Todo conteúdo clínico verificado e aprovado pelo autor.
> Responsabilidade integral: Lucas Miachon.

### Para congressos (quando aplicável)
Adaptar conforme diretrizes da sociedade organizadora. ICMJE é o mínimo.

---

## Referências

- ICMJE Recommendations (jan/2024, jan/2025): IA não pode ser autor; disclosure em Methods/Acknowledgments
- COPE Position Statement (2024): autores responsáveis por output de IA
- SAGE AI Author Guidelines: framework assisted vs generated vs author
