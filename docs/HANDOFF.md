# HANDOFF — Projeto Aulas Magnas
### Última atualização: 15 fev 2026

---

## 1. O QUE É

Slides médicos elite para congressos internacionais.
Target: hepatologistas e gastroenterologistas seniores.
Formato: Reveal.js + GSAP, metodologia assertion-evidence, offline-first.

---

## 2. STACK

| Componente | Versão | Papel |
|---|---|---|
| Reveal.js | 5.1.x | Motor de slides |
| GSAP | 3.12.x | Animações declarativas |
| Vite | 6.x | Dev server + build |
| OKLCH color system | — | Design tokens semânticos |
| Fonts: Instrument Serif, DM Sans, JetBrains Mono | Self-hosted WOFF2 | Offline-first |

---

## 3. ESTRUTURA REAL DO REPOSITÓRIO (v7.3)

```
aulas-magnas/
├── CLAUDE.md                 # Regras para Claude Code/Desktop
├── AGENTS.md                 # Regras cross-tool (Cursor, etc.)
├── package.json              # v7.0.0, ESM, Node >=20
├── vite.config.js            # Auto-discover de HTMLs em aulas/
├── .mcp.json                 # MCP servers para Claude Code
├── .env.example              # Template de API keys
├── .gitignore
│
├── .claude/
│   ├── rules/design-system.md
│   ├── skills/assertion-evidence/SKILL.md
│   ├── skills/medical-data/SKILL.md
│   ├── commands/{evidence,export,new-slide,review}.md
│   └── settings.json
│
├── .cursor/
│   ├── rules/{design-system,assertion-evidence,medical-data}.mdc
│   └── mcp.json              # MCP servers para Cursor
│
├── shared/
│   ├── css/base.css          # Design system OKLCH (~394 linhas)
│   ├── js/engine.js          # Dispatcher declarativo (~250 linhas)
│   └── assets/fonts/         # WOFF2 (não versionados — ver README.md)
│
├── aulas/
│   ├── calibracao.html       # Slide de calibração standalone
│   ├── grade/                # Plan A + Plan B
│   ├── cirrose/              # Plan A + Plan B
│   └── metanalise/           # Plan A + Plan B
│
├── scripts/
│   ├── install-fonts.js      # Baixa WOFF2 do Google Fonts
│   ├── lint-slides.js        # Linter assertion-evidence (guard rail)
│   ├── export-pdf.js         # PDF via DeckTape (cross-platform)
│   ├── export-screenshots.js # Screenshots por slide (cross-platform)
│   ├── qa-accessibility.js   # WCAG testing
│   └── transcribe-lecture.js # Pipeline: Whisper → Claude → Notion
│
└── docs/
    ├── HANDOFF.md             # ← Este arquivo
    ├── SETUP.md               # Setup Claude Desktop + Cursor + MCP
    ├── cirrose-scope.md       # Escopo da aula de cirrose
    ├── metanalise-scope.md    # Escopo da aula de meta-análise
    └── evidence/
        └── cirrose-references.json  # CSL-JSON com 6 referências verificadas
```

### Fontes WOFF2

**Não estão no repositório** (arquivos binários). Instalar com:
```bash
npm run fonts:install
```
Baixa do Google Fonts → `shared/assets/fonts/`. Requer internet uma vez. Depois funciona offline. Sem as fontes, o deck usa fallback (Georgia, system-ui, monospace) — layout muda.

---

## 4. TRÊS AULAS PLANEJADAS

| Aula | Duração | Status |
|---|---|---|
| **GRADE / EBM** | 45-60 min | Framework pronto, conteúdo parcial |
| **Cirrose** | 60 min | Pesquisa completa (10 blocos), slides a criar |
| **Meta-análise** | 45-60 min | Escopo definido, pesquisa a iniciar |

---

## 5. COMANDOS

```bash
npm run fonts:install    # Baixa WOFF2 do Google Fonts → shared/assets/fonts/
npm run dev              # Vite hot reload
npm run dev:grade        # Só a aula de GRADE
npm run build            # Produção
npm run preview          # Servir build localmente
npm run lint:slides      # Assertion-evidence linter
npm run export:pdf       # PDF via DeckTape
npm run export:screenshots # Screenshots por slide
npm run transcribe       # Pipeline de transcrição
```

---

## 6. WORKFLOW DE PALCO

```bash
npm run build
npm run preview          # http://localhost:4173
```

1. Abrir `http://localhost:4173/aulas/calibracao.html`
2. Se navy lavado ou texto fraco → Plano B (`index.stage-b.html`)
3. Se ok → Plano A (`index.html`)
4. Chrome ≥111 (OKLCH). Fallback HEX em `@supports not`.

---

## 7. MCP SERVERS CONFIGURADOS

| Server | Categoria | API Key |
|--------|-----------|---------|
| BioMCP | Pesquisa médica | Não |
| PubMed (@cyanheads) | Pesquisa PubMed | Opcional |
| CrossRef | Verificação de DOIs | Não |
| Semantic Scholar | Citation networks | Opcional |
| Playwright | Browser testing/QA | Não |
| Filesystem | Acesso a arquivos | Não |
| Memory | Contexto persistente | Não |
| ESLint | Linting | Não |
| Lighthouse | Performance | Não |
| a11y (axe-core) | Acessibilidade | Não |
| Sharp | Otimização de imagens | Não |
| Notion | Storyboards/tracking | Sim (token grátis) |

Configs em: `.mcp.json` (Claude Code), `.cursor/mcp.json` (Cursor), `claude_desktop_config.json` (Claude Desktop — ver `docs/SETUP.md`).

---

## 8. DECISÕES PENDENTES

| Decisão | Contexto |
|---|---|
| Quantos slides para cirrose? | 10 blocos × ~4-6 slides = 40-60 slides |
| Idioma da aula cirrose? | Congresso internacional → inglês? |
| Meta-análise: escopo? | Ensinar a ler? Fazer? Ambos? |
| GRADE: finalizar ou postergar? | Framework pronto, conteúdo parcial |

---

*Gerado em 15/02/2026. Reflete o estado real do repositório.*
