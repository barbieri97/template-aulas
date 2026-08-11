#!/usr/bin/env node
// Abre uma aula no Slidev com hot reload, sem nome de arquivo fixo em lugar nenhum.
//
//   npm run dev              a primeira aula de aulas/
//   npm run dev -- 03        a primeira aula cujo nome contenha "03"
//   npm run dev -- design    o deck de bancada _design-system.md
//
// Aqui entram também os arquivos `_` (que o site não publica): dá para abrir o catálogo
// do design system do mesmo jeito que se abre uma aula.
import { execFileSync } from 'node:child_process'
import { basename } from 'node:path'
import { allDeckFiles, binOf, deckFiles, root } from './lib.mjs'

const filtro = process.argv[2]
const decks = allDeckFiles()

if (!decks.length) {
  console.error('Nenhuma aula em aulas/*.md. Crie aulas/aula-01-<slug>.md e rode de novo.')
  process.exit(1)
}

// Sem filtro, abre a primeira AULA — não o `_design-system.md`, que ordena antes de tudo
// por causa do underscore mas não é o que se quer ver ao rodar `npm run dev` seco.
const deck = filtro
  ? decks.find((d) => basename(d).toLowerCase().includes(filtro.toLowerCase()))
  : deckFiles()[0] ?? decks[0]

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
