# Diagnóstico — Cirrose (28/fev)

> Conflitos, melhorias, referências, verbosidade. Acionável.

---

## 1. Conflitos

| Item | Problema | Fix |
|------|----------|-----|
| Vite `open` | Abre grade em vez de cirrose | `open: '/aulas/cirrose/index.html'` |
| `globSync` | Import não usado | Remover |
| Portas | 5173 vs 3000 em docs/launch | Unificar: 3000 dev, 4173 preview |
| index.stage-c.html | Legado ~53KB; index.html é fonte | Deprecar index.stage-c |
| archetypes.css | 3 cópias (cirrose, grade, osteoporose) | Extrair base em shared/ |

---

## 2. Melhorias

| Item | Ação |
|------|------|
| index.stage-b.html | Atualizar via build ou marcar deprecated |
| cirrose.css | ~1119 linhas; considerar módulos |
| Regras duplicadas | .cursor vs .claude — consolidar |

---

## 3. Referências

| Problema | Fix |
|----------|-----|
| PMID ausente em source-tag | 22 slides com dados clínicos sem PMID |
| s-app-04 | Turco 2024 — [TBD] ou resolver PMID |
| 15 PMIDs pendentes | evidence-db L63, SYNC-NOTION-REPO |
| Formato | Padronizar: `Autor et al. Journal Ano (n=X) · PMID XXXXXXXX` |

---

## 4. Verbosidade

| Doc | Linhas | Ação |
|-----|--------|------|
| REPO-DIAGNOSTIC | 839 | Arquivar ou remover |
| DIAGNOSTIC-27fev | 313 | Arquivar |
| ERROR-LOG Raw code | ~45 | Encurtar ou remover |
| CHANGELOG entradas | Longas | Encurtar futuras |
| 6 HANDOFFs | Dispersos | Manter cirrose + docs; consolidar referências |

---

## 5. Prioridades

| P | Item | Status (04/mar) |
|---|------|-----------------|
| P0 | ~~s-app-04 PMID~~ [pendente explícito]; ~~deprecar index.stage-c~~ | ✅ |
| P1 | vite.config (globSync, open); portas; PMID em source-tags | Parcial (vite OK, PMIDs pendentes) |
| P2 | archetypes base; regras; docs | ✅ Regras auditadas 04/mar |
| P3 | ERROR-LOG Raw; 15 PMIDs; template citações | Pendente |

> **Nota 04/mar:** Este diagnóstico está em grande parte resolvido. Itens restantes (PMIDs, archetypes base) migrados para HANDOFF.md.
