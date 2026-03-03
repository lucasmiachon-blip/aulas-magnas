# agents/ — Pipeline Humano

> **Não são subagents Cursor/Claude.** São specs de handoff para orquestração humana.

## Papel

Estes arquivos definem identidade, faz/não faz, inputs/outputs de cada "agente" no pipeline Aulas Magnas. Lucas coordena; cada agente é uma persona (Planner, Medical Researcher, Slide Builder, etc.) usada em Claude.ai ou sessões específicas.

## Diferença

| agents/ | .cursor/agents/, .claude/agents/ |
|---------|-----------------------------------|
| Pipeline humano, handoffs | Subagents Cursor/Claude Code |
| Specs para decisão de Lucas | Execução automática pelo agente |
| 01-planner, 02-medical-researcher, etc. | reference-checker, verifier, qa-engineer |

## Uso

Consultar quando delegar trabalho ou escrever handoff estruturado.
