# CSS Errors — Registry & Prevention

> 32 erros em 5 clusters. Este arquivo é canônico para erros e prevenção.
> Semântica de cores → ver `design-system.md`
> Prioridade: MUST = fatal/bloqueante | SHOULD = alta | MAY = nice-to-have

---

## Cluster A: Flexbox & Layout

| Erro | Prioridade | Regra |
|------|-----------|-------|
| E06 | MUST | Max 5 slides por batch sem validação |
| E10 | SHOULD | `space-between` com N≠M items = PROIBIDO |
| E18 | MAY | `margin-top:auto` OK, monitorar gap >25% |
| E20 | MUST (3x) | "Só ajusta X" → escopo é APENAS X |
| E22 | SHOULD | `flex:1` → SEMPRE distribution nos filhos |
| E26 | MUST (3x) | NUNCA flex:1 igualitário em containers desiguais |
| E27 | SHOULD | Diagnosticar assimetria ANTES de escolher layout |
| E28 | SHOULD | ≤3 children para space-between |

### Regra Master Flexbox
```
Se filhos têm conteúdo desigual:
  → NUNCA flex:1 igualitário
  → Usar: dividers | space-evenly | flex ratios | stacked layout
```

---

## Cluster B: Display & Navegação

| Erro | Prioridade | Regra |
|------|-----------|-------|
| E07 | MUST | NUNCA `display` inline no `<section>` |
| E12 | MAY | Overrides globais precisam de escape hatches |
| E23 | MUST (3x) | CHECKLIST OBRIGATÓRIO pré-edição |
| E24 | SHOULD | Cache-busting `?v=date` em dev; Vite hash em build |

### Por quê E07 é fatal (CANÔNICO)
Reveal.js controla visibilidade dos `<section>`. Um `display` inline sobrescreve o framework e quebra navegação. Todo layout vai dentro de `.slide-inner` wrapper.

**Fix se encontrar:** Mover o display para `.slide-inner` DENTRO do `<section>`.

---

## Cluster C: Dados Médicos

| Erro | Prioridade | Regra |
|------|-----------|-------|
| E21 | MUST | Fonte Tier 1 OBRIGATÓRIA para todo dado numérico |
| E25 | MUST | HR ≠ RR. Trial isolado ≠ meta-análise |

---

## Cluster D: Cores & Contraste

| Erro | Prioridade | Regra |
|------|-----------|-------|
| E08 | MAY | h1/h2=título, h3=card header (regras diferentes) |
| E13 | SHOULD | Cross-slide consistency OBRIGATÓRIO |
| E14 | SHOULD | Linha de acento decorativa = AI marker → remover |
| E15 | MUST | Warning/gold em bg claro = usar --warning-on-light |
| E17 | SHOULD | Converter para bg-navy → verificar TODOS componentes |
| E31 | MUST | Cor = semântica clínica. Ver `design-system.md` |

---

## Cluster E: Processo & Workflow

| Erro | Prioridade | Regra |
|------|-----------|-------|
| E01 | MAY | Perguntar "Como deve ficar no final?" |
| E02 | SHOULD | Preview antes de "pronto" |
| E03 | MAY | Cada elemento = propósito claro |
| E05 | SHOULD | Naming: `S{NNN}_{titulo-kebab}.html` |
| E09 | MUST | NUNCA remover overflow:hidden do @media print |
| E11 | SHOULD | Primeiro render = rascunho |
| E16 | MAY | "Slide N" = posição no deck, não nome de arquivo |
| E19 | SHOULD | Verificar uncommitted antes de checkout |
| E30 | MUST | NUNCA `[^;]*` em CSS inline → usar `[^";]*` |

---

## Reincidências (3x = checklist obrigatório)

| Erro | Reincidências | Ação |
|------|---------------|------|
| E07/E23 | 3x | Checklist pré-edição obrigatório |
| E20 | 3x | "Escopo é APENAS X" — confirmar antes |
| E26 | 3x | Flex:1 proibido em containers desiguais |

---

## Quick Prevention

Antes de editar CSS:
1. Ler este arquivo
2. Identificar cluster relevante
3. Flexbox? → E06/E10/E18/E22/E26/E27/E28
4. Display? → E07/E23
5. Cor? → E13/E14/E15/E17/E31 + `design-system.md`
6. Dados? → E21/E25 + `medical-data.md`
7. Regex? → E30
