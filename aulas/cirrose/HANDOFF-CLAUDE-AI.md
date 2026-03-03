# HANDOFF — Claude.ai (colar no Project Knowledge)

> Cirrose · enxuto

---

## Sucesso até aqui

- **Preview:** `npm run dev` → port 3000, hot reload OK
- **s-title:** Brasão USP, pilares, navy fixo, print var(--bg-navy)
- **s-hook v5:** 2 beats (Antônio → labs+pergunta), reversível (←/↑), sem sombra, interação OK. Antônio (formal), "Caminhoneiro", sem título. Click/seta avança; seta esquerda/cima volta.
- **Preview subitens:** beat 0 e beat 1 mostram estados distintos (DOM local pós-init).

---

## Pendências

1. ERRO-008 — Case panel redundante em s-hook
2. AUDIT — Fixes I2–I10 (AUDIT-VISUAL.md)
3. Speaker notes EN → PT
4. Merge refactor/floating-panel → main

## Próxima sessão

Rodar projeto inteiro em batches: inconsistências, redundâncias, boas práticas. Ver HANDOFF.md.

---

## Paths

| Doc                | Path                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| Pendências projeto | `aulas/cirrose/HANDOFF.md`                                            |
| Changelog verboso  | `aulas/cirrose/CHANGELOG.md`                                          |
| Erros + raw code   | `aulas/cirrose/ERROR-LOG.md`                                          |
| Audit 28 slides    | `aulas/cirrose/AUDIT-VISUAL.md`                                       |
| Hook               | `slides/01-hook.html`, `slide-registry.js`, `cirrose.css` (s-hook v5) |
| Init               | `index.template.html` (wireAll antes anim.connect)                    |
| Preview            | `preview.html` (beat 0/1 via DOM local pós-connect)                 |

---

## Comandos

`npm run dev` · `npm run build:cirrose` · `npm run qa:screenshots:cirrose`
