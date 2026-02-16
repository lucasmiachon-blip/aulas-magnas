# Medical Data Rules

## Princípio Absoluto

**NUNCA inventar, estimar ou usar de memória** qualquer dado numérico médico.
Sem fonte verificada → `[TBD]` como placeholder.
**País-alvo padrão:** Brasil. Quando apresentação for internacional, declarar no briefing.

---

## Checklist Verificação Médica (E21)

Antes de colocar QUALQUER dado numérico em slide:

- [ ] Valor vem de paper específico (não de memória)?
- [ ] Paper verificado via PubMed/PMC ou WebSearch?
- [ ] Time frame explícito (ex: "em 5 anos")?
- [ ] Categorias iguais ao paper original?
- [ ] NNT com IC 95% e time frame?
- [ ] Se guideline: leu a guideline, não extrapolou?

---

## Versionamento de Dados Clínicos

Slides com dados numéricos DEVEM ter nos speaker notes:
```
[DATA] Fonte: EASL 2024, Tabela 3 | Verificado: 2026-02-12 | Revisar se guideline atualizar.
```

Quando uma guideline atualiza (ex: EASL 2024 → 2025):
- Marcar slides afetados como `[REVISAR: nova versão]`
- Verificar se dados mudaram antes de apresentar

---

## Formato NNT Obrigatório

```
NNT [valor] (IC 95%: [lower]–[upper]) em [tempo] | [população]
```

Hierarquia visual: **NNT > ARR > HR**
- NNT = decisão clínica (maior destaque, --safe, hero size)
- ARR = magnitude real (destaque médio)
- HR = estatística acadêmica (menor destaque)

---

## Trial Isolado vs Meta-Análise (E25)

- **HR** vem de trial isolado (ex: CLEAR trial)
- **RR** vem de meta-análise (ex: 7 RCTs no AACE)
- HR ≠ RR — NUNCA misturar
- Mortalidade: verificar DIREÇÃO do efeito
- Ao criar SoF de guideline: ler a GUIDELINE, não inferir de um trial

---

## Conteúdo Médico

### Permitido
- Reduzir texto mantendo significado
- Reorganizar dados para melhor hierarquia visual
- Adicionar contexto de fontes verificadas
- Remover drogas não disponíveis no país-alvo

### Proibido
- Inventar dados, estatísticas ou referências
- Modificar números sem fonte verificada
- Usar valores de memória
- Extrapolar resultados entre estudos
- Misturar HR/RR/OR sem explicitar

---

## Fontes Tier 1

| Fonte | Tipo | Referência | ID |
|-------|------|-----------|-----|
| SBC 2025 | Diretriz brasileira | Arq Bras Cardiol 2025;122(9) | DOI: TBD |
| ESC 2021 | Diretriz europeia | Eur Heart J 2021 | DOI: 10.1093/eurheartj/ehab484 |
| AACE 2020 | Diretriz endocrinologia | Endocr Pract 2020 | DOI: TBD |
| CLEAR trial | RCT individual | N Engl J Med 2023 | PMID: 36876740 |
| CTT meta-analysis | Meta-análise | Lancet 2010, 2012 | PMID: 21067804 |
| EASL 2024 | Diretriz cirrose | J Hepatol 2024 | DOI: TBD |
| BAVENO VII | Consenso HP | J Hepatol 2022 | DOI: 10.1016/j.jhep.2021.12.012 |
| AASLD 2023 | Diretriz hepatologia | Hepatology 2023 | DOI: TBD |

**TODO:** Preencher DOIs faltantes antes de usar dados em slides.

---

## WebSearch como Fallback

1. Usar WebSearch para verificar dados críticos
2. Documentar fonte e data da verificação
3. Marcar como `[VERIFICAR]` se confiança < 95%
