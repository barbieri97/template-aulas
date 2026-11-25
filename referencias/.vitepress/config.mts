// VitePress de referencias/: um site só, com o material de todas as aulas.
//
//   npm run referencias          localhost, com hot reload
//   npm run referencias:build    build local em referencias/.vitepress/dist
//
// Publicação no GitHub Pages: `publicarReferencias` em site.config.json (ver AGENTS.md).
// Quem builda para o Pages é scripts/build-site.mjs, que passa --base e --outDir.
//
// O que entra no site: só os .md de referencias/aula-NN/docs/ (e a visão geral, index.md).
// AGENTS.md, externos/ e privados/ ficam de fora — ver `srcExclude`.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import { defineConfig, type DefaultTheme } from 'vitepress'
import { deckDoNumero, readHeadmatter, referenciaDirs, referenciasDir, siteConfig } from '../../scripts/lib.mjs'

const site = siteConfig()

/** Título de um artigo: `title` do frontmatter, senão o primeiro `# `, senão o nome do arquivo. */
function tituloDe (file: string): string {
  const src = readFileSync(file, 'utf-8')
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src)
  const t = fm && /^title:\s*(.+)$/m.exec(fm[1])
  if (t) return t[1].trim().replace(/^(['"])(.*)\1$/, '$2')
  const h1 = /^#\s+(.+)$/m.exec(src)
  if (h1) return h1[1].trim()
  return basename(file, '.md')
}

/** "Ana Bê" a partir de "ana-be": rótulo de uma subpasta de docs/. */
const rotuloDePasta = (nome: string) =>
  nome.replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').replace(/^./, (c) => c.toUpperCase())

// O caminho do arquivo (relativo a referencias/) → a URL. `aula-NN/docs/x.md` vira
// `aula-NN/x.md`: o `docs/` é organização do repositório, não precisa aparecer no endereço.
const rewrites: Record<string, string> = {}

/** Itens da sidebar para uma pasta de docs/ (recursivo). index.md primeiro, depois alfabético. */
function itensDe (dir: string, aula: string): DefaultTheme.SidebarItem[] {
  const entradas = readdirSync(dir, { withFileTypes: true })
    .filter((e) => !e.name.startsWith('.') && !e.name.startsWith('_'))
    .sort((a, b) => (a.name === 'index.md' ? -1 : b.name === 'index.md' ? 1 : a.name.localeCompare(b.name, 'pt-BR', { numeric: true })))

  const itens: DefaultTheme.SidebarItem[] = []
  for (const e of entradas) {
    const abs = join(dir, e.name)
    if (e.isDirectory()) {
      const filhos = itensDe(abs, aula)
      if (filhos.length) itens.push({ text: rotuloDePasta(e.name), collapsed: true, items: filhos })
    } else if (e.name.endsWith('.md')) {
      const src = relative(referenciasDir, abs).split('\\').join('/')
      const destino = src.replace(`${aula}/docs/`, `${aula}/`)
      rewrites[src] = destino
      const link = '/' + destino.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
      // O index.md de docs/ é a entrada da aula: o título já está no grupo, então no menu
      // ele aparece como "Apresentação".
      const ehEntrada = src === `${aula}/docs/index.md`
      itens.push({ text: ehEntrada ? 'Apresentação' : tituloDe(abs), link })
    }
  }
  return itens
}

const sidebar: DefaultTheme.SidebarItem[] = referenciaDirs().flatMap(({ num, dir }) => {
  const docs = join(dir, 'docs')
  if (!existsSync(docs)) return []
  const deck = deckDoNumero(num)
  const titulo = (deck && readHeadmatter(deck).title) || `Aula ${num}`
  return [{ text: titulo, collapsed: false, items: itensDe(docs, `aula-${num}`) }]
})

export default defineConfig({
  lang: 'pt-BR',
  title: 'Referências',
  description: `Material de referência das aulas — ${site.title}`,
  cleanUrls: true,
  lastUpdated: false,

  srcExclude: ['**/AGENTS.md', '**/externos/**', '**/privados/**', '**/README.md'],
  rewrites,

  themeConfig: {
    siteTitle: `${site.title} · Referências`,
    nav: [{ text: 'Visão geral', link: '/' }],
    sidebar,
    outline: { level: [2, 3], label: 'Nesta página' },
    docFooter: { prev: 'Anterior', next: 'Próximo' },
    darkModeSwitchLabel: 'Tema',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Voltar ao topo',
    notFound: { title: 'Página não encontrada', quote: '', linkText: 'Ir para a visão geral' },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Buscar', buttonAriaLabel: 'Buscar' },
          modal: {
            noResultsText: 'Nada encontrado para',
            resetButtonTitle: 'Limpar busca',
            footer: { selectText: 'abrir', navigateText: 'navegar', closeText: 'fechar' },
          },
        },
      },
    },
  },
})
