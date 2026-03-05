# QA Screenshots — Cirrose

## Estrutura

| Pasta | Conteúdo |
|-------|----------|
| `stage-a` | Plan A (dark, 1920×1080) |
| `stage-b` | Plan B (light, 1280×720, sem animação) |
| `stage-c` | Plan C (light, 1280×720, com animações) |

## stage-c/ — batch atual: hook v5 (2 beats)

```
aulas/cirrose/qa-screenshots/stage-c/
├── 02-s-hook-beat-00.png   # Antônio + história
└── 02-s-hook-beat-01.png   # Labs + pergunta
```

**Comando:** `npm run qa:screenshots:cirrose`
Requer `npm run dev` (port 3000). Script usa `__hookAdvance()` para capturar cada transição.

> **Nota:** Batches anteriores tinham 5 beats (cold open → framework). Hook v5 simplificou para 2.
