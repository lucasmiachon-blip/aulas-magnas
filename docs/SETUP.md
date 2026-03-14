# Setup — Claude Desktop + Cursor para Aulas Magnas

## 1. Claude Desktop — MCP servers

O Claude Desktop NÃO lê o `.mcp.json` do projeto.
Ele usa um arquivo global do sistema operacional.

### macOS
Abra: `~/Library/Application Support/Claude/claude_desktop_config.json`  
Windows: `%APPDATA%\Claude\` ou equivalente.

```bash
# Se o arquivo não existir, crie:
mkdir -p ~/Library/Application\ Support/Claude
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Windows
Abra: `%APPDATA%\Claude\claude_desktop_config.json`

### Conteúdo (copiar inteiro)

```json
{
  "mcpServers": {
    "biomcp": {
      "command": "uvx",
      "args": ["--from", "biomcp-python", "biomcp", "run"]
    },
    "pubmed": {
      "command": "npx",
      "args": ["-y", "@cyanheads/pubmed-mcp-server"],
      "env": {
        "NCBI_API_KEY": "SUA_CHAVE_AQUI"
      }
    },
    "crossref": {
      "command": "npx",
      "args": ["-y", "@botanicastudios/crossref-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "semantic-scholar": {
      "command": "npx",
      "args": ["-y", "@jucikuo666/semanticscholar-mcp-server"],
      "env": {
        "SEMANTIC_SCHOLAR_API_KEY": "SUA_CHAVE_AQUI"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem",
        "/Users/SEU_USUARIO/projetos/aulas-magnas",
        "/Users/SEU_USUARIO/Downloads"
      ]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "/Users/SEU_USUARIO/projetos/aulas-magnas/.memory/context.jsonl"
      }
    },
    "eslint": {
      "command": "npx",
      "args": ["@eslint/mcp"]
    },
    "lighthouse": {
      "command": "npx",
      "args": ["@danielsogl/lighthouse-mcp"]
    },
    "a11y": {
      "command": "npx",
      "args": ["-y", "a11y-mcp-server"]
    },
    "sharp": {
      "command": "npx",
      "args": ["-y", "sharp-mcp"]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_TOKEN": "ntn_SEU_TOKEN_AQUI"
      }
    }
  }
}
```

**Pré-requisitos:**
- Node.js ≥20 (para npx)
- Python + uv (para BioMCP): `brew install uv` ou `pip install uv`
- Trocar `SEU_USUARIO` pelo seu username do macOS
- Criar pasta `.memory/` no projeto: `mkdir -p aulas-magnas/.memory`

### Obter NCBI API Key (grátis)
1. Ir a https://www.ncbi.nlm.nih.gov/account/
2. Criar conta (ou login com Google)
3. Em Settings → API Key → Create
4. Copiar a key para o JSON acima

### Obter Semantic Scholar API Key (grátis)
1. Ir a https://www.semanticscholar.org/product/api#api-key
2. Solicitar key (aprovação em ~24h)
3. Copiar para o JSON acima (ou remover o server se não quiser)

### Testar
1. Reiniciar Claude Desktop (Cmd+Q → reabrir)
2. Em qualquer conversa, digitar: "Quais MCP tools você tem disponíveis?"
3. Deve listar: pubmed, playwright, semantic-scholar

### Debug
Logs em: `~/Library/Logs/Claude/mcp.log`  
Windows: `%APPDATA%\Claude\` ou equivalente.

---

## 1b. Git Hooks (obrigatório)

Após clonar ou criar worktree, rodar **uma vez**:

```bash
bash scripts/install-hooks.sh
```

Isso instala:
- **pre-commit** → bloqueia Classe C (slides, CSS, JS, references) em `main`. Conteúdo de aula deve ir pela worktree. Bypass emergencial: `ALLOW_MAIN_CONTENT=1 git commit`.
- **pre-push** → roda `done-gate --strict` para a aula detectada na branch.

A lógica vive em `scripts/pre-commit.sh` e `scripts/pre-push.sh` (versionados). Os hooks em `.git/hooks/` apenas delegam.

---

## 2. Cursor — já configurado no projeto

O Cursor lê `.cursor/mcp.json` do projeto automaticamente.
Basta abrir a pasta `aulas-magnas/` no Cursor.

### Verificar
1. Abrir Cursor na pasta do projeto
2. Cmd+Shift+P → "MCP: List Servers"
3. Deve mostrar: pubmed, playwright, semantic-scholar

### API Keys no Cursor
O Cursor usa variáveis de ambiente do sistema.
Adicione ao seu `~/.zshrc` (ou `~/.bashrc`):

```bash
export NCBI_API_KEY="sua_chave"
export SEMANTIC_SCHOLAR_API_KEY="sua_chave"
```

Depois: `source ~/.zshrc`

---

## 3. Cursor — Rules

As regras do projeto estão em `.cursor/rules/*.mdc`.
O Cursor as carrega automaticamente por glob pattern:
- `design-system.mdc` → ativo em `**/*.html,**/*.css`
- `assertion-evidence.mdc` → ativo em `aulas/**/*.html`
- `medical-data.mdc` → ativo em `aulas/**/*.html,docs/**/*.md`

Nada a configurar — funciona ao abrir o projeto.

---

## 4. O que cada ferramenta lê

| Arquivo | Claude Desktop | Claude Code CLI | Cursor |
|---------|---------------|----------------|--------|
| `CLAUDE.md` | ✅ | ✅ | ✅ (via .cursor/rules) |
| `.claude/rules/*.md` | ✅ | ✅ | ❌ |
| `.claude/skills/*/SKILL.md` | ✅ | ✅ | ❌ |
| `.claude/commands/*.md` | ❌ | ✅ (slash commands) | ❌ |
| `.cursor/rules/*.mdc` | ❌ | ❌ | ✅ |
| `.mcp.json` | ❌ | ✅ | ❌ |
| `.cursor/mcp.json` | ❌ | ❌ | ✅ |
| `claude_desktop_config.json` | ✅ | ❌ | ❌ |

---

## 5. Workflow recomendado

### Para criar slides (co-criação)
→ **Claude Desktop** (ou claude.ai neste projeto)
   - Tem memória do projeto via CLAUDE.md
   - MCP: PubMed para buscar evidências
   - Co-criar narrativa, storyboard, conteúdo

### Para implementar código
→ **Cursor** com os .mdc rules
   - Abre o projeto, rules carregam automaticamente
   - MCP: Playwright para screenshots, PubMed para referências
   - CLAUDE.md como contexto global (absorveu AGENTS.md)

### Para tarefas complexas de código
→ **Claude Code CLI** (terminal)
   - Lê CLAUDE.md + rules + skills + commands
   - /new-slide, /export, /review, /evidence
   - MCP via .mcp.json
