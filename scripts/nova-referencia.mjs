#!/usr/bin/env node
// Cria a pasta de referências de uma aula: referencias/aula-NN/ com AGENTS.md, docs/,
// externos/ e privados/.
//
//   npm run nova-referencia -- 04
//
// Não sobrescreve nada: se referencias/aula-NN/ já existe, o script para.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import { deckDoNumero, readHeadmatter, referenciasDir, root } from './lib.mjs'

const arg = process.argv[2]
if (!arg || !/^\d+$/.test(arg)) {
  console.error('Uso: npm run nova-referencia -- <número da aula>   (ex.: 04)')
  process.exit(1)
}

const num = arg.padStart(2, '0')
const dir = join(referenciasDir, `aula-${num}`)

if (existsSync(dir)) {
  console.error(`referencias/aula-${num}/ já existe — nada foi alterado.`)
  process.exit(1)
}

const deck = deckDoNumero(num)
const titulo = deck ? readHeadmatter(deck).title ?? `Aula ${num}` : `Aula ${num}`
const deckRel = deck ? relative(root, deck) : `aulas/aula-${num}-<slug>.md (ainda não existe)`

const agents = `# Aula ${num} — orquestração

Este arquivo diz **como** a aula ${num} é montada. Ele não tem conteúdo: todo o conteúdo mora
em [\`docs/\`](docs/). Se algo aqui contradiz \`docs/\`, vale \`docs/\`.

Regras gerais do repositório (slides, design system, armadilhas do Slidev, estrutura de
\`referencias/\`): [\`AGENTS.md\`](../../AGENTS.md) da raiz.

## Alvos

| | |
|---|---|
| Deck | \`${deckRel}\` |
| Conteúdo | \`referencias/aula-${num}/docs/\` — ponto de entrada: [\`docs/index.md\`](docs/index.md) |
| Apoio citável | \`referencias/aula-${num}/externos/\` |
| Apoio só para consulta | \`referencias/aula-${num}/privados/\` (não versionado) |

## Ordem de leitura

Leia \`docs/\` nesta ordem antes de mexer no deck. Mantenha a lista em dia quando um artigo for
criado, renomeado ou dividido em pasta.

1. [\`docs/index.md\`](docs/index.md)

## Roteiro da aula

Cada linha é um bloco da aula: de onde vem o conteúdo e como ele vira slide. A coluna
"Layout" usa os layouts de \`docs/design-system.md\`.

| # | Bloco | Fonte em \`docs/\` | Layout / componentes | Observação |
|---|---|---|---|---|
| 1 | Abertura | \`index.md\` | \`capa\` | |

## Como montar

1. Ler \`docs/\` na ordem acima. Não inventar conteúdo que não esteja lá — se faltar, apontar o
   que falta em vez de preencher.
2. Seguir o roteiro, bloco a bloco, no deck \`${deckRel}\`.
3. Imagens vão em \`aulas/public/\`; créditos e fontes vêm de \`docs/\` ou \`externos/\`.
4. Rodar \`npm run lint\` e conferir com \`npm run dev -- ${num}\`.

## Regras de fonte

- \`externos/\`: pode ser citado e referenciado nos slides e em \`docs/\`, sempre com a fonte.
- \`privados/\`: material com direitos autorais. Serve para consulta e para embasar o texto
  autoral; **nunca** copiar trechos, imagens ou tabelas para \`docs/\`, para o deck ou para
  qualquer arquivo versionado.
`

const indexDoc = `---
title: ${JSON.stringify(titulo)}
---

# ${titulo}

Ponto de entrada da aula ${num}. Escreva aqui a visão geral e vá criando outros artigos \`.md\`
nesta pasta (\`docs/\`) — de preferência com prefixo numérico (\`01-contexto.md\`,
\`02-...\`), que é a ordem em que aparecem no menu. Um assunto grande pode virar uma pasta com
os seus próprios \`.md\`.
`

mkdirSync(join(dir, 'docs'), { recursive: true })
mkdirSync(join(dir, 'externos'))
mkdirSync(join(dir, 'privados'))
writeFileSync(join(dir, 'AGENTS.md'), agents)
writeFileSync(join(dir, 'docs', 'index.md'), indexDoc)
writeFileSync(join(dir, 'externos', '.gitkeep'), '')
writeFileSync(join(dir, 'privados', '.gitkeep'), '')

console.log(`✓ referencias/aula-${num}/ criada${deck ? ` (deck: ${basename(deck)})` : ''}`)
