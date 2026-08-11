// Utilidades compartilhadas pelos scripts de scripts/.
// A ideia é que só este arquivo saiba onde as coisas moram — o resto pede aqui.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, dirname, join, resolve } from 'node:path'
import YAML from 'yaml'

export const root = resolve(import.meta.dirname, '..')

/**
 * A pasta das aulas — e, para o Slidev, a raiz do projeto: é a pasta do arquivo .md
 * que vira o `root` do Vite. Daí `aulas/public/`, `aulas/components/`, `aulas/layouts/`
 * e `aulas/styles/` (e não os equivalentes na raiz do repositório).
 */
export const aulasDir = join(root, 'aulas')
export const componentsDir = join(aulasDir, 'components')
export const layoutsDir = join(aulasDir, 'layouts')
export const publicDir = join(aulasDir, 'public')
export const stylesDir = join(aulasDir, 'styles')

/**
 * Os .md de aulas/, em ordem alfabética — que é a ordem das aulas, já que o nome
 * começa com `aula-NN`. Retorna caminhos absolutos.
 *
 * Arquivos começando com `_` ficam de fora: são decks de bancada (o `_design-system.md`,
 * por exemplo), que a gente quer abrir no `npm run dev` mas não publicar no site.
 */
export function deckFiles () {
  if (!existsSync(aulasDir)) throw new Error('pasta aulas/ não existe')
  return readdirSync(aulasDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort()
    .map((f) => join(aulasDir, f))
}

/** Todo .md de aulas/, inclusive os `_` — é o que o lint precisa olhar. */
export function allDeckFiles () {
  if (!existsSync(aulasDir)) throw new Error('pasta aulas/ não existe')
  return readdirSync(aulasDir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => join(aulasDir, f))
}

/**
 * Caminho absoluto do executável de um pacote, para chamar com `node <caminho>`.
 *
 * Os binários são chamados pelo Node direto, sem npx e sem shell: no Windows o npx é um .cmd
 * (precisa de shell, e aí argumento com espaço quebra) e o Git Bash converte "/algo/" em caminho
 * do MSYS pelo caminho. `node <script>` não tem nenhum dos dois problemas.
 */
export function binOf (pkg, bin) {
  const require = createRequire(import.meta.url)
  const pkgPath = require.resolve(`${pkg}/package.json`)
  const entry = JSON.parse(readFileSync(pkgPath, 'utf-8')).bin[bin]
  return resolve(dirname(pkgPath), entry)
}

/**
 * A identidade do curso, lida de site.config.json (na raiz). É o único arquivo que muda
 * quando este repositório é usado como template para outra disciplina.
 *
 * Todos os campos são opcionais; sem o arquivo, o site sai com títulos genéricos.
 *   title       — o <h1> e o <title> da landing
 *   institution — o kicker acima do título (o ano é acrescentado automaticamente)
 *   description — a meta description
 *   intro       — o parágrafo abaixo do título; HTML permitido (é você que escreve)
 */
export function siteConfig () {
  const path = join(root, 'site.config.json')
  const defaults = { title: 'Aulas', institution: '', description: '', intro: '' }
  if (!existsSync(path)) return defaults

  let parsed
  try {
    parsed = JSON.parse(readFileSync(path, 'utf-8'))
  } catch (err) {
    throw new Error(`site.config.json não é JSON válido: ${err.message}`)
  }
  return { ...defaults, ...parsed }
}

/**
 * O headmatter: o primeiro bloco `---` do arquivo, que é ao mesmo tempo a configuração
 * do deck e o frontmatter do primeiro slide. É de onde a landing tira título, ementa e data.
 */
export function readHeadmatter (file) {
  const src = readFileSync(file, 'utf-8').replace(/^﻿/, '')
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src)
  if (!match) throw new Error(`${basename(file)}: não encontrei o bloco de headmatter (---) no topo`)
  return YAML.parse(match[1]) ?? {}
}

/**
 * Os nomes de arquivo (sem extensão) de uma pasta de .vue. Pasta inexistente = lista vazia,
 * porque `aulas/layouts/` e `aulas/components/` são opcionais: quem usa um tema npm pode
 * não ter nenhuma das duas.
 */
export function vueNames (dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith('.vue'))
    .map((f) => basename(f, '.vue'))
}

/**
 * Onde moram os layouts e componentes que um deck pode usar sem declarar nada:
 * os do Slidev, os do tema (se houver um) e os locais de aulas/.
 *
 * `theme` é o campo do headmatter. 'none' (ou vazio) significa "sem tema npm" — é o padrão
 * deste repositório, em que o visual vem inteiro de aulas/styles + aulas/layouts.
 * Retorna `{ layouts, components, temaResolvido }`; `temaResolvido: false` avisa quem chamou
 * que o tema existe mas não foi encontrado, e portanto a lista está incompleta.
 */
export function knownNames (theme) {
  const require = createRequire(import.meta.url)
  const clientRoot = dirname(require.resolve('@slidev/client/package.json'))

  const layouts = new Set(vueNames(join(clientRoot, 'layouts')))
  const components = new Set(vueNames(join(clientRoot, 'builtin')))
  let temaResolvido = true

  if (theme && theme !== 'none') {
    // O Slidev aceita apelido ('seriph' → '@slidev/theme-seriph' ou 'slidev-theme-seriph').
    // Repetimos essa expansão aqui só para conseguir achar a pasta do pacote.
    const candidatos = theme.includes('/') || theme.startsWith('@')
      ? [theme]
      : [theme, `@slidev/theme-${theme}`, `slidev-theme-${theme}`]

    const themeRoot = candidatos
      .map((nome) => {
        try {
          return dirname(require.resolve(`${nome}/package.json`, { paths: [root] }))
        } catch {
          const chute = join(root, 'node_modules', nome)
          return existsSync(chute) ? chute : null
        }
      })
      .find(Boolean)

    if (themeRoot) {
      for (const n of vueNames(join(themeRoot, 'layouts'))) layouts.add(n)
      for (const n of vueNames(join(themeRoot, 'components'))) components.add(n)
    } else {
      temaResolvido = false
    }
  }

  for (const n of vueNames(layoutsDir)) layouts.add(n)
  for (const n of vueNames(componentsDir)) components.add(n)

  return { layouts, components, temaResolvido }
}
