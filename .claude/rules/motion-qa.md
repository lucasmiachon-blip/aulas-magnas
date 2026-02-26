# Motion QA — Heurísticas + Workflow de Validação

> Checklist para agentes AI validarem animações GSAP/Reveal.js.
> Para julgamento contextual (ritmo, adequação, feeling) → humano + Gemini com vídeo.

---

## Limitações do Agente (ser honesto)

| O que o agente faz bem | O que NÃO faz |
|------------------------|---------------|
| Verificar se animação rodou (state assertion) | Julgar se easing "parece" certo |
| Checar durations/delays contra specs | Avaliar ritmo vs fala do palestrante |
| Detectar animação decorativa sem função | Perceber se animação distrai no contexto clínico |
| Gerar GIF/vídeo para review humano | "Assistir" vídeo com percepção temporal |
| Validar ordem de reveal vs narrativa (speaker notes) | Sentir tensão dramática do stagger |

---

## Checklist de Heurísticas (automável)

### 1. Duration
- [ ] Fade/translate: 300–600ms (ideal 400ms)
- [ ] countUp: 800–1200ms
- [ ] stagger total: ≤ 1.5s para grupo completo
- [ ] drawPath SVG: 600–1000ms
- [ ] Nenhuma animação > 2s (exceto sequências complexas)

### 2. Easing
- [ ] Entrada: `power2.out` ou `power3.out` (desaceleração natural)
- [ ] PROIBIDO: `bounce`, `elastic`, `back` (frívolo para contexto médico)
- [ ] PROIBIDO: `linear` em elementos UI (parece robótico)
- [ ] `power1.inOut` aceitável para transições sutis

### 3. Stagger
- [ ] Delay entre items: 100–200ms (ideal 150ms)
- [ ] Ordem: matches leitura natural (esquerda→direita ou topo→baixo)
- [ ] Último item visível antes que audiência perca interesse (≤1.5s total)

### 4. Propósito Cognitivo
- [ ] Toda animação tem função: guiar atenção, revelar progressão, ou destacar dado
- [ ] Nenhuma animação puramente decorativa (AI marker — ver slide-editing.md)
- [ ] countUp usado APENAS em números de impacto (NNT, HR, %, mortalidade)
- [ ] fadeUp usado para revelar evidência na ordem da fala
- [ ] stagger usado para mostrar comparação sequencial

### 5. Click-Reveal
- [ ] Número de reveals ≤ 4 por slide (Cowan 4±1)
- [ ] Cada reveal mostra chunk cognitivo completo (não meio dado)
- [ ] Ordem de reveal = ordem das speaker notes
- [ ] Estado final com todos reveals = slide legível sem animação

### 6. Estado Final
- [ ] Todos os elementos visíveis (opacity: 1)
- [ ] Nenhum transform residual (translate deve ser 0)
- [ ] Texto legível (não cortado por overflow)
- [ ] Print-pdf mostra estado final correto

### 7. Adequação ao Conteúdo (semi-automável)

| Tipo de slide | Animação esperada | Anti-padrão |
|---------------|-------------------|-------------|
| Mortalidade/NNT | countUp lento (1s+), pausa | stagger rápido, efeitos alegres |
| Checkpoint | Reveal sequencial por decisão | Tudo de uma vez |
| Dados GRADE | highlight seletivo (Von Restorff) | Fade genérico |
| Hero/impacto | countUp single number, grande | Múltiplos countUp competindo |
| Comparação | stagger lado-a-lado | fadeUp vertical |
| Timeline | drawPath progressivo | Aparece instantâneo |

---

## Workflow de Validação

### Tier 1: State Assertion (agente — automático)
```js
// Para cada slide, após trigger:
assert(el.style.opacity === '1', 'fadeUp não completou');
assert(el.textContent === target, 'countUp valor errado');
assert(el.classList.contains('revealed'), 'click-reveal falhou');
assert(gsap.getById(id)?.progress() === 1, 'timeline incompleta');
```

### Tier 2: Heurística Spec (agente — semi-automático)
```js
// Extrair specs do GSAP e validar contra checklist
const tl = gsap.getById(id);
assert(tl.duration() >= 0.3 && tl.duration() <= 2, 'duration fora do range');
// Verificar easing não é bounce/elastic
```

### Tier 3: Sequential Screenshots (agente → humano)
```
t=0    → screenshot "before"
trigger animation
t=200  → screenshot "mid"
t=500  → screenshot "mid2"
t=1000 → screenshot "after"
```
Salvar em `qa-screenshots/motion/{slide-id}/` para review humano.

### Tier 4: GIF/Vídeo (agente gera → humano julga)
```
gif_creator start → navegar slides → interagir → stop → export
```
Enviar para:
- **Humano**: julgar ritmo, adequação, feeling
- **Gemini** (opcional): enviar .mp4 com prompt contextual

### Tier 5: Gemini Video Review (humano executa)
Prompt sugerido para Gemini:
```
Analise este vídeo de uma apresentação médica para congresso de gastroenterologia.
Para cada slide com animação, avalie:
1. O timing ajuda ou distrai a compreensão?
2. A velocidade do countUp dá tempo de absorver o número?
3. O stagger revela informação na ordem lógica?
4. Alguma animação parece frívola para o contexto médico?
Contexto: público = gastroenterologistas seniores, tema = cirrose hepática.
```

---

## Integração com QA Script

O script `qa-screenshots-stage-c.js` já navega os 28 slides.
Para adicionar motion QA:

1. **Antes** de forçar estado final: capturar estado inicial
2. **Trigger** animação normal (sem QA mode)
3. **Capturar** screenshots sequenciais
4. **Comparar** estado inicial vs final (state assertion)
5. **Salvar** screenshots + report

Flag: `?motion-qa=1` (diferente de `?qa=1` que força estado final)

---

## Referências
- Duarte: "Resonate" — ritmo narrativo via alternância tensão/resolução
- Mayer: Contiguidade temporal — evidência aparece no instante da fala
- Tufte: Data-ink ratio — animação = "ink temporal", deve carregar informação
- GSAP docs: easing visualizer (https://gsap.com/docs/v3/Eases)
