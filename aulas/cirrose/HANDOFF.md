# HANDOFF — Cirrose (projeto)

> Só pendências ativas. Detalhes → CHANGELOG.md. Claude.ai → HANDOFF-CLAUDE-AI.md
> Histórico de sessões → CHANGELOG.md (append-only)

---

## 🔴 ALTA — Build + QA (fazer primeiro)

1. `npm run build:cirrose` — CP2/CP3 mudaram de `slide-inner` para `archetype-checkpoint`; FIB-4 no template
2. QA visual — screenshots CP1, CP2, CP3, albumina, HE, SVR via Playwright
3. `npm run lint:slides` — verificar assertion-evidence

---

## 🟡 MÉDIA — PMIDs TBD

14 PMIDs ainda TBD. Ver `docs/insights-html-cirrose-2026.md` → "Pendências TBD restantes".
Prioritários: AGA 2025 Orman (s-a2-03) · Lens CSPH 53% (s-a3-02) · EASL HCC 2025 (s-a3-03)

**CTP interobserver variability** (02b-a1-damico.html):
- Candidatos: PMID 6546609 (Christensen 1984) ou PMID 16305721 (Cholongitas 2005)
- Verificar e atualizar `limitation-source` no slide

---

## 🟡 MÉDIA — Narrativa: novo arco

Hook DM2 → GBD burden → FIB-4 como pivot (aprovado).
- Refs prontas: PMIDs 31981519, 41092928, 41092926 (evidence-db.md)
- Pendente: slide burden global + slide DM2/screening (EASL 2024, ADA 2024)

---

## 🟢 BAIXA — Conteúdo restante

- Bloco 2: S3 fill remanescente
- Bloco 3: S3 fill + hero typography
- Appendix R1: `archetype-appendix` sem case panel
- ERRO-008: case panel redundante em s-hook
- AUDIT fixes I2–I10: ver AUDIT-VISUAL.md

---

## 🟢 BAIXA — Dados do caso (cosmético)

- PLQ 112k (hook) vs 118k (CP1) — duas visitas, plausível, sem nota explícita
- Notion: CIRR-A1-01 html-ready vs blueprint coexistem — limpar quando definir versão final

---

## Offline

`npm run build:cirrose` · `npm run lint:slides` · `npm run preview` — funcionam offline.
