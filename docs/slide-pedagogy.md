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

## Resumo — Critérios Pedagógicos para qa-engineer

| Critério | Teoria base | Nota 9 = |
|----------|------------|----------|
| **11. Carga Cognitiva** | Sweller CLT | ≤4 elementos, zero redundância, sinalização clara |
| **12. Aprendizagem Adulto** | Knowles + Miller | Ancora em caso, tom de par, implica conduta |
| **13. Arco Narrativo** | Duarte + Alley | Tensão presente, resolução = mensagem, encaixa na jornada |
