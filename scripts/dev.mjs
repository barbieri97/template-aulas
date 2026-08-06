#!/usr/bin/env node
// Abre uma aula no Slidev com hot reload, sem nome de arquivo fixo em lugar nenhum.
//
//   npm run dev              a primeira aula de aulas/
//   npm run dev -- 03        a primeira aula cujo nome contenha "03"
//   npm run dev -- funcional a primeira aula cujo nome contenha "funcional"
import { execFileSync } from 'node:child_process'
import { basename } from 'node:path'
import { binOf, deckFiles, root } from './lib.mjs'

const filtro = process.argv[2]
const decks = deckFiles()

if (!decks.length) {
  console.error('Nenhuma aula em aulas/*.md. Crie aulas/aula-01-<slug>.md e rode de novo.')
  process.exit(1)
}

const deck = filtro
  ? decks.find((d) => basename(d).toLowerCase().includes(filtro.toLowerCase()))
  : decks[0]

if (!deck) {
  console.error(`Nenhuma aula com "${filtro}" no nome. Disponíveis:`)
  for (const d of decks) console.error(`  ${basename(d)}`)
  process.exit(1)
}

console.log(`\n▸ ${basename(deck)}\n`)

// stdio herdado: o Ctrl-C chega no Slidev, não neste wrapper.
execFileSync(process.execPath, [binOf('@slidev/cli', 'slidev'), deck, '--open'], {
  cwd: root,
  stdio: 'inherit',
})
