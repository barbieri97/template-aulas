// Utilidades compartilhadas pelos scripts de scripts/.
// A ideia é que só este arquivo saiba onde as coisas moram — o resto pede aqui.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'

export const root = resolve(import.meta.dirname, '..')
export const aulasDir = join(root, 'aulas')

/**
 * Os .md de aulas/, em ordem alfabética — que é a ordem das aulas, já que o nome
 * começa com `aula-NN`. Retorna caminhos absolutos.
 */
export function deckFiles () {
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
