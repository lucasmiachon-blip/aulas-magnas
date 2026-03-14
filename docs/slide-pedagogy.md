# Pedagogia de Slides — Referência Operacional

> Teorias codificadas como critérios verificáveis. Usar no qa-engineer critérios 11-13.
> Fonte primária: Sweller 2019, Mayer 2009, Alley 2013, Knowles 1984, Miller 1990.

---

## 1. Cognitive Load Theory (Sweller, 1988/2019)

**Princípio:** Memória de trabalho = 4±1 chunks simultâneos. Slide que excede isso → nada é retido.

### Três tipos de carga

| Tipo | Definição | Ação no slide |
|------|-----------|---------------|
| **Intrínseca** | Complexidade inerente do conteúdo | Aceitar — não simplificar dados clínicos |
| **Extrínseca** | Causada por design ruim | ELIMINAR — listas, texto redundante, HEX inconsistente |
| **Germane** | Facilita formação de schema | MAXIMIZAR — analogias, casos clínicos, progressão visual |

### Checklist CLT por slide

- [ ] ≤ 4 elementos distintos para processar simultaneamente (contar: título, hero, evidência, source)
- [ ] Sem redundância texto/visual (não escrever o que a imagem já mostra)
- [ ] Sinalização explícita do elemento central (cor, tamanho, posição)
- [ ] Contiguidade temporal: animação sincronizada com a fala (sem revelar antes da hora)
- [ ] Segmentação: cada click = 1 nova informação (não duas ao mesmo tempo)

**Nota CLT = 9:** ≤ 4 elementos, zero redundância, sinalização clara, animação temporalmente correta.

---

## 2. Multimedia Learning — Mayer (2001/2009)

**Princípio:** Pessoas aprendem melhor com palavras + imagens do que só palavras. Mas só se o design respeitar como o cérebro processa.

### 12 Princípios de Mayer (os mais relevantes para slides médicos)

| Princípio | Regra operacional | Violação comum |
|-----------|-------------------|----------------|
| **Coerência** | Remover tudo que não contribui para a mensagem central | Decorações, clipart, backgrounds elaborados |
| **Sinalização** | Destacar visualmente o que importa (cor, seta, tamanho) | Tudo com o mesmo peso visual |
| **Redundância** | NÃO mostrar texto que o apresentador vai ler em voz alta | Bullets copiados do speaker notes |
| **Contiguidade espacial** | Legenda próxima à imagem (não no rodapé) | Source tag distante do dado |
| **Segmentação** | Revelar por partes (beats) — não tudo de uma vez | Slide 100% visível no beat 0 |
| **Pré-treinamento** | Estabelecer conceito base antes de complexidade | MELD sem explicar CLF primeiro |
| **Modalidade** | Imagem + narração oral > imagem + texto escrito | Slides cheios de texto para ler |

### Checklist Mayer por slide

- [ ] Princípio da coerência: remover todo elemento decorativo sem função informacional
- [ ] Princípio de sinalização: 1 elemento destacado visivelmente (hero)
- [ ] Zero texto que replica exatamente o que o apresentador vai dizer
- [ ] Legenda/source: ≤ 2cm do dado que referencia
- [ ] Beat 0 revela apenas o essencial; detalhes chegam via clicks (segmentação)

---

## 3. Assertion-Evidence Model (Alley, 2003/2013)

**Princípio:** O título do slide é a afirmação que o slide prova. O corpo é a evidência visual.

### Estrutura canônica

```
[H2] MELD-Na ≥18 duplica mortalidade em 90 dias   ← AFIRMAÇÃO (o que o slide prova)
     ┌────────────────────────────────────────┐
     │  [GRÁFICO de mortalidade vs MELD-Na]   │  ← EVIDÊNCIA VISUAL
     │  Curva de sobrevida · n=421 · PMID     │
     └────────────────────────────────────────┘
```

### O que NÃO é assertion-evidence

| ❌ Errado | Por quê |
|-----------|---------|
| "MELD-Na: o GPS da fila" | Metáfora, não afirmação verificável |
| "Escores Prognósticos" | Rótulo/categoria |
| "Onde está o Antônio?" | Pergunta retórica |
| "4 dados. 1 número. 1 decisão." | Slogan motivacional |

### Teste de Alley

**Pergunta:** "Se alguém ler só o H2, sabe o que o slide prova?"
- Sim → ok
- Não → reescrever

---

## 4. Andragogia — Aprendizagem de Adultos (Knowles, 1984)

**Princípio:** Adultos (especialmente experts) aprendem diferente de crianças. Médicos seniores em congresso = público andragógico máximo.

### 6 Princípios de Knowles aplicados

| Princípio | O que significa | No slide |
|-----------|----------------|----------|
| **Autoconceito** | Expert quer ser tratado como par | Tom: "dados mostram" não "você precisa saber" |
| **Experiência** | Ancora novo conhecimento em casos reais | Antônio como fio condutor de todos os slides |
| **Prontidão** | Aprende o que precisa resolver agora | Cada slide responde: "e daí para minha prática?" |
| **Orientação** | Problema-centrado, não disciplina-centrada | Slide parte do problema clínico, não da teoria |
| **Motivação** | Interna — satisfação, autonomia | Dados que surpreendem (ALT normal = armadilha) |
| **Relevância** | Aplicação imediata | Cada conclusão tem conduta explícita |

### Checklist Andragogia por slide

- [ ] Slide ancora em caso clínico real ou problema prático (não teoria abstrata)
- [ ] Tom = discussão entre pares (não aula para estudante)
- [ ] Conclusão tem implicação de conduta explícita ou implícita
- [ ] Dado surpreendente ou contra-intuitivo presente (cria "aha moment")

---

## 5. Miller's Pyramid — Educação Médica (Miller, 1990)

**Princípio:** Competência médica tem 4 níveis. Slides para seniores operam nos níveis 3-4.

```
         [Faz]           ← Competência real (não em slides)
        [Mostra como]    ← Demonstração clínica
       [Sabe como]       ← NOSSO ALVO: raciocínio clínico aplicado
      [Sabe]             ← Base factual (não suficiente para seniores)
```

**Implicação:** Slides não podem ser só "saber" (facts). Devem provocar "saber como" (raciocínio).

- "FIB-4 = 5,91" → nível Sabe (fraco)
- "FIB-4 = 5,91 → obriga elastografia → muda conduta" → nível Sabe Como (forte)

---

## 6. Carga Cognitiva Intrínseca — Threshold Concepts (Meyer & Land, 2003)

**Conceitos limiares** = ideias que, uma vez compreendidas, transformam a forma de ver o campo.
São difíceis, contraintuitivos, mas irreversíveis uma vez aprendidos.

Para cirrose:
- **FIB-4 como triagem** (não diagnóstico isolado) — threshold concept
- **ALT normal ≠ fígado normal** em doença avançada — threshold concept
- **CSPH como target terapêutico** (não só complicação) — threshold concept

**Implicação para slides:** Identificar quando o slide está ensinando um threshold concept e amplificar o momento de impacto (hero animation, bounce, countUp) para marcar a transição cognitiva.

---

## 7. Narrative Arc — Resonate (Duarte, 2010) + Présentation Zen (Reynolds, 2012)

**Princípio:** Toda apresentação é uma jornada: mundo atual → tensão → novo mundo.

Para cada slide do Bloco 1:

| Slide | Mundo atual | Tensão | Novo mundo |
|-------|-------------|--------|-----------|
| s-hook | "Paciente assintomático, labs normais" | ALT=31 mas FIB-4=5,91 | Aparência enganosa |
| s-a1-01 | "Cirrose é rara" | 1,43M mortes/ano | Epidemia silenciosa |
| s-a1-vote | "Residente: ALT normal, sem cirrose" | FIB-4=5,91 revela | A maioria errou |
| s-a1-fib4 | "Preciso de biópsia" | 4 números bastam | FIB-4 como gatekeeper |
| s-a1-rule5 | "Como quantificar sem biópsia?" | Zona cinzenta 10-25kPa | LSM 21 = cACLD |
| s-a1-meld | "Como priorizar fila TX?" | MELD≥18 = inflexão | Referenciar agora |
| s-a1-classify | "Cirrose é cirrose" | Prognóstico varia 10x | Classificar = tratar diferente |

**Checklist Narrativo por slide:**
- [ ] Slide tem tensão implícita ou explícita (algo inesperado, contra-intuitivo, urgente)
- [ ] A resolução da tensão é a mensagem principal do slide
- [ ] O slide sabe seu lugar na jornada maior (não é self-contained isolado)

---

## 8. Quatro Pilares Práticos — Com Exemplos e Take-Homes

> Síntese operacional das 7 teorias acima em 4 regras acionáveis.
> Cada pilar tem: por que importa (evidência), exemplo ruim vs bom, e take-home.

### Pilar 1: O título é a mensagem, não o tópico (Assertion-Evidence)

**Por que importa:**
- Wolfe 2024 — assertion-evidence funciona inclusive para experts (não só novatos)
- Garner & Alley 2013 — slides AE produzem menos misconceptions que slides tradicionais

**Exemplo:**

| Ruim | Bom |
|------|-----|
| "Resultados" | "Tratar HAS em >=60a reduz mortalidade total em 9%" |
| "Heterogeneidade" | "I² alto não invalida a MA — a pergunta é se a variação é explicável" |

**Como cria importância:** se alguém ler só o h2, sabe o que o slide prova. O título faz o trabalho cognitivo pesado.

**Take-home:** Escreva o título como a única coisa que a audiência vai lembrar.

### Pilar 2: Mostrar, não listar (Dual Coding + Multimedia)

**Por que importa:**
- Hales 2017 — fração de imagem no slide prediz avaliação positiva em CME
- Noetel et al. 2022 — meta-análise (g=0.51): visual > texto puro em educação

**Exemplo:**

| Ruim | Bom |
|------|-----|
| Lista texto: "RR mortalidade 0.91, RR CV 0.72, RR AVC 0.66" | Metric cards com cor semântica por desfecho |
| Tabela de números sem destaque | Forest plot com highlight na linha-chave (Von Restorff) |

**Como cria importância:** imagem + palavra por canais diferentes = dual coding (Paivio). O visual não é decoração — é o segundo canal de processamento.

**Take-home:** Todo slide precisa de 1 visual informacional. Reduzir texto não basta — ADICIONAR visual muda a avaliação.

### Pilar 3: Perguntar antes de responder (Retrieval Practice + Andragogia)

**Por que importa:**
- Agarwal et al. 2021 — retrieval practice beneficia aprendizagem em 43 de 63 experimentos
- Adultos aprendem resolvendo problemas, não recebendo informação passivamente (Knowles 1984)

**Exemplo:**

| Ruim | Bom |
|------|-----|
| Mostrar resultado, perguntar "entenderam?" | Checkpoint: "Você mudaria sua conduta?" PAUSA. Revelar resultado |
| Resposta primeiro, pergunta depois | Luta cognitiva primeiro, resolução depois |

**Como cria importância:** a luta cognitiva fixa conhecimento. Resposta só vale depois que o aluno tentou.

**Take-home:** A cada ~10 min, PARE e faça a audiência trabalhar.

### Pilar 4: Um conceito por slide, revelado na hora certa (CLT + Segmentação)

**Por que importa:**
- Meta-análise tem alta interatividade de elementos (Sweller) — conceitos dependem uns dos outros
- Médicos em congresso estão fatigados — capacidade de processamento reduzida

**Exemplo:**

| Ruim | Bom |
|------|-----|
| Forest plot inteiro de uma vez (20+ quadrados, diamante, IC, pesos) | Reveal progressivo: pergunta, quadrados, diamante |
| Slide com PICO + resultados + GRADE no mesmo frame | PICO num slide, resultados no próximo, GRADE no seguinte |

**Take-home:** Se você precisa explicar um slide em mais de 60s, ele tem informação demais.

---

## 9. Benchmark Pedagógico 2024-2026

> Validação empírica dos princípios acima. 23 referências em 3 tiers.
> Mapeamento para nosso design system (tokens, patterns, critérios QA).

### Tier 1 — Meta-análises e revisões sistemáticas de pedagogia

| # | Referência | Achado-chave | Mapeia para |
|---|-----------|-------------|-------------|
| 1 | Noetel et al. 2022, Rev Educ Res | Visual em educação: g=0.51 vs texto | Pilar 2, Mayer Multimedia |
| 2 | Agarwal et al. 2021, J Educ Psychol | Retrieval practice: benefício em 43/63 exp | Pilar 3, checkpoints |
| 3 | Mayer 2009, Multimedia Learning 2nd ed | 12 princípios com meta-análises internas | Pilares 2+4 |
| 4 | Sweller et al. 2019, Educ Psychol Rev | CLT atualizada — element interactivity | Pilar 4, <=4 elementos/slide |
| 5 | Clark & Mayer 2016, e-Learning 4th ed | Princípios Mayer operacionalizados | Todo o design system |

### Tier 2 — Estudos empíricos-chave

| # | Referência | Achado-chave | Mapeia para |
|---|-----------|-------------|-------------|
| 6 | Garner & Alley 2013, Tech Comm Q | AE < misconceptions que slides tradicionais | Pilar 1, slide-editing.md |
| 7 | Wolfe 2024 [VERIFICAR] | AE funciona para experts, não só novatos | Pilar 1, expertise-reversal |
| 8 | Hales 2017 [VERIFICAR] | Image fraction prediz avaliação CME | Pilar 2, fill ratio |
| 9 | Roediger & Butler 2011, Trends Cogn Sci | Testing effect: retrieval > re-study | Pilar 3, checkpoints |
| 10 | Cowan 2001, Behav Brain Sci | Capacidade WM = 4+-1 chunks | Pilar 4, Chunking |
| 11 | Kosslyn 2007, Clear and to the Point | 8 princípios cognitivos para slides | design-principles.md |
| 12 | Sedgwick 2015, BMJ | Como ler forest plots | Slide forest plot |
| 13 | Kalyuga et al. 2003, Educ Psychol | Expertise reversal effect | design-principles.md §2 |

### Tier 3 — Fundacionais e teóricos

| # | Referência | Contribuição | Mapeia para |
|---|-----------|-------------|-------------|
| 14 | Sweller 1988, Cogn Sci | CLT original — 3 tipos de carga | §1 deste documento |
| 15 | Paivio 1986, Mental Representations | Dual coding theory | Pilar 2 |
| 16 | Knowles 1984, The Adult Learner | 6 princípios da andragogia | §4, Pilar 3 |
| 17 | Miller 1990, Acad Med | Pirâmide de competência | §5 |
| 18 | Alley et al. 2006, Tech Comm | Assertion-evidence original | §3, Pilar 1 |
| 19 | Duarte 2010, Resonate | Sparkline narrativa | §7 |
| 20 | Tufte 2001, Visual Display | Data-ink ratio, lie factor | design-principles.md §22-27 |
| 21 | Meyer & Land 2003, Improving Student Learning | Threshold concepts | §6 |
| 22 | Von Restorff 1933 | Isolation effect | design-principles.md §6 |
| 23 | Ebbinghaus 1885, Memory | Primacy-recency | design-principles.md §15 |

### Mapeamento Design System

| Pilar | Token/Pattern no nosso sistema | Critério QA |
|-------|-------------------------------|-------------|
| 1 — Assertion-Evidence | `<h2>` = assertion, slide-editing.md checklist | assertion-evidence >= 9 |
| 2 — Visual dominante | fill ratio 65-90%, `data-animate`, metric cards | visual impact >= 9, density >= 9 |
| 3 — Retrieval Practice | checkpoint slides, interactions entre fases | interactions >= 9 |
| 4 — Segmentação | fragments, `data-animate="stagger"`, <=4 elementos | cognitive load >= 9 |

---

## Resumo — Critérios Pedagógicos para qa-engineer

| Critério | Teoria base | Nota 9 = |
|----------|------------|----------|
| **11. Carga Cognitiva** | Sweller CLT + Pilar 4 | <=4 elementos, zero redundância, sinalização clara, segmentação |
| **12. Aprendizagem Adulto** | Knowles + Miller + Pilar 3 | Ancora em caso, tom de par, implica conduta, checkpoint ativo |
| **13. Arco Narrativo** | Duarte + Alley + Pilar 1 | Tensão presente, resolução = mensagem, assertion no h2, encaixa na jornada |
