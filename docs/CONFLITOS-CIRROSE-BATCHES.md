# Conflitos — Cirrose: 3 Batches vs Planos

> Documento gerado a partir da comparação entre os 3 MD em Downloads e os planos (Cursor + docs/PLANO-CIRROSE-BATCHES.md).
>
> **FONTE ÚNICA DE VERDADE:** CIRROSE — ORDEM DEFINITIVA v3 (24/fev/2026). Qualquer conflito: **ESTE VENCE.**

---

## 0. Resolução pela ORDEM DEFINITIVA v3

| Decisão | Valor |
|---------|-------|
| **HOOK** | Posição 4 (após A1-02, antes A1-03). **NÃO mover.** Preserva HTML existente. |
| **Ordem core** | TITLE(1) → A1-01(2) → A1-02(3) → HOOK(4) → A1-03(5) → A1-04(6) → A1-05(7) → CP1(8) → A2-01… → CLOSE(20) |
| **A1-06** | NÃO EXISTE neste ciclo. |

---

## 1. Batch 2 — Contradição interna (SUPERSEDED)

**Arquivo:** `prompt-cursor-batch2-ato1.md`

| Local | Texto | Interpretação |
|-------|-------|---------------|
| **Linha 5** (header) | "Inserir DEPOIS do HOOK e ANTES dos slides do Ato 2" | A1-03, A1-04, A1-05, CP1 vão **após** o HOOK |
| **Linhas 9–23** (SLIDE ORDER) | Tabela: posições 3–8 = A1-03, A1-04, A1-05, A1-06, CP1, **HOOK** | A1-03–CP1 vêm **antes** do HOOK; HOOK na posição 8 |
| **Linha 26** | "O HOOK precisa ser MOVIDO para DEPOIS do CP1 (posição 8)" | HOOK deve ficar **depois** de CP1 |

**Conflito:** O header diz "Inserir DEPOIS do HOOK". A tabela diz "Mover HOOK para posição 8".

**Resolução (ORDEM DEFINITIVA v3):** HOOK permanece na posição 4. Inserir A1-03, A1-04, A1-05, CP1 **após** o HOOK (posições 5–8). O Batch 2 estava errado ao pedir para mover o HOOK.

---

## 2. Plano do Cursor — Labels Batch 1/Batch 2 trocados

**Arquivo:** `C:\Users\lucas\.cursor\plans\cirrose_batch_2_slides_b887e0a3.plan.md`

**Seção 4 — Especificação por slide:**

| Rótulo no plano | Slides listados | Fonte real |
|-----------------|-----------------|------------|
| "Batch 1 (índices 3–6)" | A1-03, A1-04, A1-05, CP1 | `prompt-cursor-batch2-ato1.md` = **Batch 2** |
| "Batch 2 (índices 9, 11...)" | A2-02, A2-04, A2-06, CP2, A3-01, A3-02, A3-03 | `batch1-cursor-cirrose-ato2-ato3.md` = **Batch 1** |

**Conflito:** Os rótulos Batch 1 e Batch 2 estão invertidos em relação às fontes (MD em Downloads).

---

## 3. HOOK — "Mover" vs "não precisa ser movido" (RESOLVIDO)

| Fonte | Afirmação |
|------|-----------|
| **Batch 2** (linha 26) | "O HOOK precisa ser **MOVIDO** para DEPOIS do CP1" |
| **ORDEM DEFINITIVA v3** | "HOOK na posição 4. Preserva HTML existente no GitHub." |

**Resolução:** ORDEM DEFINITIVA v3 vence. **HOOK NÃO deve ser movido.** Permanece na posição 4.

---

## 4. Batch 1 — Índices de registerCustom

**Arquivo:** `batch1-cursor-cirrose-ato2-ato3.md`

O Batch 1 assume **4 sections existentes** (title, A1-01, A1-02, hook) e insere 7 novas **após** o HOOK:

- A2-02 = index 4
- A2-04 = index 5
- A2-06 = index 6 (myth-buster)
- CP2 = index 7 (progressive reveal)
- A3-01 = index 8
- A3-02 = index 9
- A3-03 = index 10 (never-zero)

**Conflito:** O Batch 1 não prevê o Batch 2. Na ordem final (20 slides), os índices mudam:

- A2-06 = index 13
- CP2 = index 14
- A3-03 = index 17

O plano unificado já usa os índices corretos. O Batch 1 precisa ter os índices ajustados na implementação.

---

## 5. A1-06 — Incluir ou não

| Fonte | Afirmação |
|------|-----------|
| **Batch 2** (tabela SLIDE ORDER) | A1-06 na posição 6 |
| **Batch 2** (SECTION 4) | "A1-06 não tem spec no Notion" · "TBD" · "DECISÃO DO PALESTRANTE NECESSÁRIA" |
| **docs/PLANO-CIRROSE-BATCHES.md** | "A1-06: TBD — spec incompleta no Notion. Não implementar neste ciclo." |

**Conflito:** A tabela inclui A1-06; a seção de spec diz que não existe e não implementar. O plano unificado omite A1-06 — alinhado com a decisão de não implementar.

---

## 6. Pré-requisito do Batch 2

**Arquivo:** `prompt-cursor-batch2-ato1.md` (linha 3)

> "Pré-requisito: Batch 1 (`prompt-cursor-cirrose-batch2.md`) JÁ implementado."

**Conflito:** O nome do arquivo referenciado está errado. O Batch 1 é `batch1-cursor-cirrose-ato2-ato3.md`, não `prompt-cursor-cirrose-batch2.md`. Provável typo no MD.

---

## Resumo

| # | Conflito | Severidade | Resolução |
|---|----------|------------|-----------|
| 0 | **ORDEM DEFINITIVA v3** | — | Fonte única de verdade. HOOK posição 4, não mover. |
| 1 | Batch 2: header vs tabela | Superseded | v3: HOOK em 4. Inserir A1-03–CP1 após HOOK. |
| 2 | Plano Cursor: Batch 1↔2 trocados | Média | Corrigir rótulos na especificação |
| 3 | HOOK: mover vs não mover | Resolvido | v3: NÃO mover. |
| 4 | Batch 1: índices registerCustom | Média | Ajustar na implementação (HOOK=3, A1-03=4…) |
| 5 | A1-06 na tabela vs TBD | Baixa | v3: A1-06 NÃO EXISTE neste ciclo. |
| 6 | Nome do pré-requisito Batch 2 | Baixa | Typo no MD — ignorar |

---

*Documento gerado em 24/02/2026. Atualizado com ORDEM DEFINITIVA v3.*
