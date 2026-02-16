# Fontes — Self-Hosted WOFF2

Este diretório deve conter os seguintes arquivos WOFF2:

```
InstrumentSerif-Regular.woff2
InstrumentSerif-Italic.woff2
DMSans-Variable.woff2
JetBrainsMono-Variable.woff2
```

## Como obter

### Opção 1: Fontsource (recomendado)
```bash
npm install @fontsource-variable/dm-sans @fontsource-variable/jetbrains-mono
# Instrument Serif: baixar manualmente (não disponível no fontsource)
```

### Opção 2: google-webfonts-helper
1. Acesse https://gwfh.mranftl.com/fonts
2. Busque: DM Sans, JetBrains Mono, Instrument Serif
3. Selecione pesos: 300-700 (DM Sans), 400-600 (JetBrains Mono), 400 (Instrument Serif)
4. Download WOFF2
5. Coloque neste diretório

### Opção 3: Google Fonts direto
1. Acesse fonts.google.com
2. Download cada família
3. Converta TTF → WOFF2 com: https://cloudconvert.com/ttf-to-woff2
4. Coloque neste diretório

## Verificação

Os nomes devem corresponder EXATAMENTE ao que `shared/css/base.css` referencia nos `@font-face`.
Se os nomes forem diferentes, ajuste o CSS ou renomeie os arquivos.

## Sem fontes?

O deck funciona com fallback (Georgia para display, system-ui para body, monospace para mono).
Layout pode mudar ligeiramente. Em produção, SEMPRE incluir as fontes.
