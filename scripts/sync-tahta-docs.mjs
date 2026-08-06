#!/usr/bin/env node
// Regenera docs/tahta.md a partir do AGENTS.md que vem dentro do pacote do tema.
// Rode depois de atualizar o slidev-theme-tahta.
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'

const require = createRequire(import.meta.url)
const pkgPath = require.resolve('slidev-theme-tahta/package.json')
const themeRoot = dirname(pkgPath)
const { version } = JSON.parse(readFileSync(pkgPath, 'utf-8'))

const header = `<!--
  REFERÊNCIA DO TEMA — cópia versionada de \`node_modules/slidev-theme-tahta/AGENTS.md\`.
  Tema:     slidev-theme-tahta
  Versão:   ${version}
  Upstream: https://raw.githubusercontent.com/zcag/tahta/refs/heads/main/packages/theme/AGENTS.md
  Repo:     https://github.com/zcag/tahta

  Está aqui porque \`node_modules/\` não vai pro git — sem esta cópia, quem (ou o que) for
  escrever uma aula não teria o contrato do tema à mão.
  Para atualizar depois de um \`npm update slidev-theme-tahta\`, rode:
      node scripts/sync-tahta-docs.mjs
-->

`

const out = resolve(import.meta.dirname, '..', 'docs', 'tahta.md')
writeFileSync(out, header + readFileSync(join(themeRoot, 'AGENTS.md'), 'utf-8'), 'utf-8')
console.log(`docs/tahta.md atualizado a partir do slidev-theme-tahta@${version}`)
