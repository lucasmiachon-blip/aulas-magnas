# CASE.md — Caso Clínico: Seu Antônio
> Source of truth único para dados do paciente. NUNCA duplicar em outros arquivos.
> Atualizado: 2026-03-09 | Branch: main

## Identificação

- Nome: Antônio ("Seu Antônio")
- Idade: 55 anos
- Profissão: Caminhoneiro
- IMC: 31
- Comorbidades: DM2, síndrome metabólica
- Etiologia: Etilismo 60g/dia (5 latas/dia) há 20 anos

## Entrada no serviço

- Via: Assintomático, rastreado na UBS
- FIB-4 elevado na triagem primária

## Laboratórios Canônicos — Baseline

| Exame | Valor | Interpretação |
|-------|-------|---------------|
| AST | 67 U/L | AST/ALT ratio 2,16 → padrão alcoólico avançado |
| ALT | 31 U/L | "Normal" — ARMADILHA: hepatócito burnt-out normaliza ALT |
| PLQ | 112.000/mm³ | Marcador de hipertensão portal |
| GGT | 210 U/L | Marcador de uso crônico de álcool |
| Albumina | 3,6 g/dL | Função hepática limítrofe |
| Bilirrubina | 1,3 mg/dL | Ainda normal — muda na descompensação |
| INR | 1,2 | Discretamente alargado |
| FIB-4 | 5,91 | Cálculo: (55 × 67) / (112 × √31) = 5,91 — alto risco |
| MELD-Na | ~10 (inicial) | "Lembrem desse número. Vai mudar." |
| LSM (Checkpoint 1) | 21 kPa | cACLD confirmada, estadiar CSPH |

## Evolução do Caso (Panel States)

### Checkpoint 1 (s-cp1) — Caution
- LSM: 21 kPa
- PLQ: 112k
- MELD-Na: ~10
- Estado: cACLD → CSPH confirmada

### Checkpoint 2 (s-cp2) — Danger (nadir narrativo)
- Creatinina: 2,8 mg/dL
- Sódio: 126 mEq/L
- Albumina: 2,4 g/dL
- LSM: 32 kPa
- FIB-4: 3,2
- PLQ: 89k
- MELD-Na: 28
- Complicações: Ascite tensa + PBE + HRS-AKI

### Checkpoint 3 (s-cp3) — Hope
- FIB-4: 2,1
- LSM: 18 kPa (era 32 → 18)
- PLQ: 132k
- Albumina: 3,8 g/dL
- MELD-Na: 12
- Abstinente: 10 meses
- Sem ascite: 8 meses
- SVR: sim (confirmado)

### s-close — Resolved
- Timeline completa dos 4 estados
- Eco narrativo: "5 números classificaram. 3 decisões salvaram."

## Armadilhas Clínicas Documentadas

1. **ALT 31 "normal"** — Hepatócito burnt-out em doença avançada normaliza ALT. Residente ignora.
2. **Caminhoneiro + encefalopatia** — Não pode dirigir (Chekhov's Gun s-a2-06).
3. **ATTIRE** — "Albumina sempre funciona" é derrubado; configurado como twist narrativo.

## Chekhov's Guns Ativos

> **Nota:** IDs de slides referem a estrutura ATUAL (_manifest.js). Serão atualizados quando Act 2 for implementado com novos HTMLs. Ver narrative.md para mapeamento novo (A2-01 a A2-15 + CP2).

| Elemento | Setup | Payoff |
|----------|-------|--------|
| Profissão caminhoneiro | s-hook | EH (Act 2 A2-08): encefalopatia = não dirige |
| ALT "normal" | s-hook | Act 1: diagnóstico = burnt-out |
| LSM 32 | s-cp2 | s-cp3: 32→18 = recompensação |
| ATTIRE | PBE (A2-05) + LVP (A2-03) | ACLF (A2-11): albumina rotineira NÃO funciona — contraste contextualizado |
| Carvedilol abandonado | A2-01 (gatilhos) | HDA (A2-06): se não tivesse parado, não sangrava |

## Referência Cruzada

- Dados de literatura/trials → `evidence-db.md`
- Arco narrativo e pacing → `narrative.md`
- Estrutura de slides → `slides/_manifest.js`
