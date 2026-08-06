#!/usr/bin/env node
// Builda cada aula de aulas/*.md como um deck Slidev independente em dist/<slug>/
// e gera a landing dist/index.html que lista todas.
//
//   node scripts/build-site.mjs
//   SITE_BASE=/meu-repo/ node scripts/build-site.mjs
//
// Um `slidev build` por aula, de propósito: o `--base` do CLI vale para a invocação inteira,
// e cada aula precisa do seu (é o que faz os assets resolverem sob /<repo>/<slug>/).
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import YAML from 'yaml'
import { binOf, deckFiles, root, siteConfig } from './lib.mjs'

const distDir = join(root, 'dist')

// '/' local; '/<nome-do-repo>/' no GitHub Actions. Normalizado para começar e terminar com '/'.
const siteBase = `/${(process.env.SITE_BASE ?? '/').replace(/^\/+|\/+$/g, '')}/`.replace('//', '/')

// Título, instituição e ementa do site vêm de site.config.json — é o arquivo que se edita
// quando este repositório vira template de outra disciplina.
const site = siteConfig()

const run = (bin, args) => execFileSync(process.execPath, [bin, ...args], { cwd: root, stdio: 'inherit' })

const slidevBin = binOf('@slidev/cli', 'slidev')
const lintBin = binOf('slidev-theme-tahta', 'tahta-lint')

/** Headmatter = o primeiro bloco `---` do arquivo. É de onde a landing tira título, ementa e data. */
function readHeadmatter (file) {
  const src = readFileSync(file, 'utf-8').replace(/^﻿/, '')
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src)
  if (!match) throw new Error(`${basename(file)}: não encontrei o bloco de headmatter (---) no topo`)
  return YAML.parse(match[1]) ?? {}
}

const escapeHtml = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

/** "2026-08-11" -> "11 de agosto de 2026". Datas inválidas/ausentes viram ''. */
function formatDate (value) {
  if (!value) return ''
  const date = value instanceof Date ? value : new Date(`${value}T12:00:00`)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

// ---------------------------------------------------------------- descobrir as aulas

const decks = deckFiles().map((path) => {
  const head = readHeadmatter(path)
  const slug = basename(path, '.md')
  return {
    path,
    slug,
    title: head.title ?? slug,
    info: head.info ?? '',
    date: head.date ?? '',
  }
})

if (!decks.length) {
  throw new Error('nenhuma aula encontrada em aulas/*.md — crie a primeira (aulas/aula-01-<slug>.md) antes de buildar')
}

console.log(`\n${decks.length} aula(s) · base ${siteBase}\n`)

// ---------------------------------------------------------------- validar antes de buildar

// tahta-lint aceita vários arquivos e sai com código != 0 em erro — falha aqui aborta o build.
// (O aviso `unknown field "date"` é esperado: o campo alimenta esta landing, o tema o ignora.)
run(lintBin, decks.map((d) => d.path))

// ---------------------------------------------------------------- buildar cada deck

// Limpar na mão: o outDir fica fora do root do Vite (que é aulas/), então o Vite não o esvazia.
rmSync(distDir, { recursive: true, force: true })
mkdirSync(distDir, { recursive: true })

for (const deck of decks) {
  console.log(`\n── ${deck.slug} ──`)
  run(slidevBin, [
    'build', deck.path,
    '--base', `${siteBase}${deck.slug}/`,
    '--out', join(distDir, deck.slug),
    // hash é o modo que o Slidev documenta para deploy em subdiretório: o GitHub Pages só serve
    // o 404.html da raiz do site, então history quebraria o refresh dentro de /<slug>/.
    '--router-mode', 'hash',
  ])
}

// ---------------------------------------------------------------- landing page

const cards = decks.map((deck, i) => `
      <li class="card">
        <a href="./${deck.slug}/">
          <span class="num">${String(i + 1).padStart(2, '0')}</span>
          <span class="body">
            <span class="title">${escapeHtml(deck.title)}</span>
            ${deck.info ? `<span class="info">${escapeHtml(deck.info)}</span>` : ''}
            ${deck.date ? `<span class="date">${escapeHtml(formatDate(deck.date))}</span>` : ''}
          </span>
          <span class="go" aria-hidden="true">→</span>
        </a>
      </li>`).join('')

// Landing estática e self-contained, no espírito do variant notebook (papel pautado, navy).
// Os textos de identidade vêm de site.config.json; só o `intro` aceita HTML (você o escreve).
const pageTitle = [site.title, site.institution].filter(Boolean).join(' · ')
const kicker = [site.institution, new Date().getFullYear()].filter(Boolean).join(' · ')

const indexHtml = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(pageTitle)}</title>
<meta name="description" content="${escapeHtml(site.description)}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='13' font-size='13'>📓</text></svg>">
<style>
  :root {
    --paper: #fbfbf7; --ink: #16274a; --muted: #5b6884;
    --rule: #dfe3ec; --accent: #1f4fd8; --card: #ffffff;
  }
  @media (prefers-color-scheme: dark) {
    :root { --paper: #10131c; --ink: #e8ecf6; --muted: #97a2ba; --rule: #262d3d; --accent: #7fa4ff; --card: #171b26; }
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: clamp(2rem, 6vw, 5rem) 1.25rem 4rem;
    background: var(--paper);
    background-image: repeating-linear-gradient(to bottom, transparent 0 2.1rem, var(--rule) 2.1rem 2.1rem);
    background-attachment: fixed;
    color: var(--ink);
    font: 16px/1.55 "Segoe UI", system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  main { max-width: 46rem; margin: 0 auto; }
  header { margin-bottom: 2.5rem; }
  .kicker {
    font-size: .72rem; letter-spacing: .18em; text-transform: uppercase;
    color: var(--accent); font-weight: 700; margin: 0 0 .6rem;
  }
  h1 { font-size: clamp(1.9rem, 6vw, 3rem); line-height: 1.1; margin: 0 0 .6rem; letter-spacing: -.02em; }
  .sub { color: var(--muted); margin: 0; max-width: 32rem; }
  hr { border: 0; border-top: 2px dashed var(--rule); margin: 2rem 0; }
  ul { list-style: none; margin: 0; padding: 0; display: grid; gap: .9rem; }
  .card a {
    display: flex; align-items: center; gap: 1.1rem;
    padding: 1.15rem 1.3rem; text-decoration: none; color: inherit;
    background: var(--card); border: 1px solid var(--rule); border-radius: 12px;
    transition: transform .15s ease, border-color .15s ease, box-shadow .15s ease;
  }
  .card a:hover, .card a:focus-visible {
    transform: translateY(-2px); border-color: var(--accent);
    box-shadow: 0 8px 24px -12px rgba(31, 79, 216, .45); outline: none;
  }
  .num { font-size: 1.6rem; font-weight: 800; color: var(--accent); font-variant-numeric: tabular-nums; opacity: .85; }
  .body { display: grid; gap: .18rem; flex: 1; min-width: 0; }
  .title { font-weight: 700; font-size: 1.06rem; }
  .info { color: var(--muted); font-size: .92rem; }
  .date { color: var(--muted); font-size: .78rem; letter-spacing: .04em; text-transform: uppercase; }
  .go { color: var(--muted); font-size: 1.25rem; }
  .card a:hover .go { color: var(--accent); }
  footer { margin-top: 3rem; color: var(--muted); font-size: .82rem; }
  footer a { color: inherit; }
</style>
</head>
<body>
<main>
  <header>
    <p class="kicker">${escapeHtml(kicker)}</p>
    <h1>${escapeHtml(site.title)}</h1>
    ${site.intro ? `<p class="sub">${site.intro}</p>` : ''}
  </header>
  <hr>
  <ul>${cards}
  </ul>
  <footer>
    Feito com <a href="https://sli.dev/">Slidev</a> e o tema <a href="https://github.com/zcag/tahta">tahta</a>.
  </footer>
</main>
</body>
</html>
`

writeFileSync(join(distDir, 'index.html'), indexHtml, 'utf-8')
writeFileSync(join(distDir, '.nojekyll'), '', 'utf-8')

console.log(`\n✓ dist/ pronto — index + ${decks.length} deck(s)`)
for (const deck of decks) console.log(`   ${siteBase}${deck.slug}/`)
console.log()
