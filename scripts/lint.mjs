#!/usr/bin/env node
// Confere as aulas antes de buildar. Agnóstico de tema: nada aqui sabe o nome de um
// layout específico — a lista de layouts e componentes válidos é montada na hora, a partir
// do Slidev, do tema declarado no headmatter (se houver) e das pastas locais de aulas/.
//
//   npm run lint
//   node scripts/lint.mjs aulas/aula-01-uma-coisa.md   (só um arquivo)
//
// Erro (✗) aborta o build; aviso (!) não. A régua é essa: erro é o que quebra o deck ou
// publica uma aula sem imagem; aviso é o que só desarruma a convenção do repositório.
import { existsSync, readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { basename, join, relative } from 'node:path'
import { parse } from '@slidev/parser'
import { allDeckFiles, knownNames, layoutsDir, publicDir, root, vueNames } from './lib.mjs'

/**
 * Campos que o Slidev consome no frontmatter e NÃO repassa como prop para o layout.
 * Um layout que declare uma prop com um desses nomes nunca a recebe — e alguns fazem
 * estrago silencioso: `src:` manda o Slidev importar outro arquivo no lugar do slide,
 * então um `src: /foto.png` some com o slide inteiro sem nenhuma mensagem de erro.
 *
 * A lista vem de FRONTMATTER_FIELDS em @slidev/client/constants.ts.
 */
const CAMPOS_RESERVADOS = [
  'clicks', 'clicksStart', 'disabled', 'hide', 'hideInToc', 'layout', 'level',
  'preload', 'routeAlias', 'src', 'title', 'transition', 'zoom', 'dragPos',
  'lang', 'clickAnimation',
]

const RE_ARQUIVO_AULA = /^aula-\d{2,}-[a-z0-9]+(-[a-z0-9]+)*\.md$/
const RE_DATA = /^\d{4}-\d{2}-\d{2}$/
const RE_ASSET = /(?<![\w.@])\/[\w\-./]+\.(?:png|jpe?g|gif|svg|webp|avif|mp4|webm|pdf)/gi
const RE_TAG_COMPONENTE = /<([A-Z][A-Za-z0-9]*)/g

/** Tira código, comentários e blocos <style> antes de procurar tag ou caminho de imagem. */
function limpar (texto) {
  return texto
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
}

/**
 * Os layouts locais que declaram uma prop com nome reservado.
 *
 * Lê o `defineProps<{...}>()` de cada aulas/layouts/*.vue por regex — não é um parser de
 * TypeScript, e não precisa ser: só interessa saber se um nome reservado aparece como
 * chave. Um falso positivo custa uma mensagem; um falso negativo custa um slide sumido.
 * Layouts que leem `title` pelo objeto `frontmatter` (o jeito certo) não caem aqui.
 */
function layoutsComPropReservada () {
  const achados = []
  for (const nome of vueNames(layoutsDir)) {
    const src = readFileSync(join(layoutsDir, `${nome}.vue`), 'utf-8')
    const bloco = /defineProps<\{([\s\S]*?)\}>/.exec(src)
    if (!bloco) continue
    for (const campo of CAMPOS_RESERVADOS) {
      if (new RegExp(`^\\s*${campo}\\??\\s*:`, 'm').test(bloco[1])) achados.push({ nome, campo })
    }
  }
  return achados
}

/** Todo texto de um frontmatter, achatado — é onde moram `imagem:`, `bg:`, `foto:` etc. */
function valoresDeTexto (valor) {
  if (typeof valor === 'string') return [valor]
  if (Array.isArray(valor)) return valor.flatMap(valoresDeTexto)
  if (valor && typeof valor === 'object') return Object.values(valor).flatMap(valoresDeTexto)
  return []
}

async function lintDeck (file) {
  const problemas = []
  const nome = basename(file)
  const erro = (msg, linha) => problemas.push({ nivel: 'erro', msg, linha })
  const aviso = (msg, linha) => problemas.push({ nivel: 'aviso', msg, linha })

  const bancada = nome.startsWith('_') // deck de referência: não é publicado, não segue a convenção de nome

  let deck
  try {
    deck = await parse(await readFile(file, 'utf-8'), file)
  } catch (err) {
    // Quase sempre é `---` compartilhado entre dois blocos, ou YAML mal indentado.
    erro(`não consegui ler o arquivo: ${err.message}`)
    return problemas
  }

  const [primeiro] = deck.slides
  const head = primeiro?.frontmatter ?? {}

  // --- headmatter: o que a landing do site precisa ------------------------------------
  if (!bancada) {
    if (!RE_ARQUIVO_AULA.test(nome)) {
      aviso('o nome foge do padrão aula-NN-slug-em-minusculas.md (o nome do arquivo vira a URL)')
    }
    for (const campo of ['title', 'info', 'date']) {
      if (!head[campo]) erro(`falta \`${campo}:\` no headmatter — a página inicial do site lê esse campo`, 1)
    }
    if (head.date && !RE_DATA.test(String(head.date))) {
      erro(`\`date: ${head.date}\` não está em YYYY-MM-DD (use aspas: date: "2026-03-12")`, 1)
    }
  }

  // --- tema: o que dá para validar depende dele existir --------------------------------
  const { layouts, components, temaResolvido } = knownNames(head.theme)
  if (!temaResolvido) {
    erro(`\`theme: ${head.theme}\` não está instalado — rode \`npm install ${head.theme}\``, 1)
  }

  // --- slide a slide -------------------------------------------------------------------
  for (const slide of deck.slides) {
    const linha = slide.start + 1
    const onde = `slide ${slide.index + 1}`
    const fm = slide.frontmatter ?? {}
    const conteudo = limpar(slide.content ?? '')

    if (fm.layout && !layouts.has(fm.layout) && temaResolvido) {
      erro(`${onde}: layout \`${fm.layout}\` não existe — nem no Slidev, nem no tema, nem em aulas/layouts/`, linha)
    }

    // `src:` é o campo com que o Slidev importa OUTRO .md no lugar deste slide. Apontá-lo
    // para uma imagem faz o slide desaparecer do deck, sem erro nenhum.
    if (typeof fm.src === 'string' && !fm.src.endsWith('.md')) {
      erro(`${onde}: \`src: ${fm.src}\` — \`src\` é reservado (importa outro .md) e faz o slide sumir. Use outro nome de campo, tipo \`imagem:\``, linha)
    }

    // Componentes: aviso, não erro. Um <Tag> maiúsculo pode ser HTML de um addon ou de um
    // plugin global que este script não enxerga; melhor cutucar do que barrar.
    for (const [, tag] of conteudo.matchAll(RE_TAG_COMPONENTE)) {
      if (!components.has(tag) && temaResolvido) {
        aviso(`${onde}: <${tag}> não foi encontrado em aulas/components/ (nem no Slidev, nem no tema)`, linha)
      }
    }

    // Imagens e mídia: o Slidev serve `aulas/public/`, então `/foto.png` = `aulas/public/foto.png`.
    // Errar isso não quebra o build — publica um slide com a imagem faltando, que é pior.
    const textos = [conteudo, ...valoresDeTexto(fm)]
    for (const texto of textos) {
      for (const [caminho] of texto.matchAll(RE_ASSET)) {
        if (!existsSync(join(publicDir, caminho.slice(1)))) {
          erro(`${onde}: \`${caminho}\` não existe em aulas/public/`, linha)
        }
      }
    }
  }

  return problemas
}

// ---------------------------------------------------------------- rodar

const alvos = process.argv.slice(2)
const arquivos = alvos.length
  ? alvos.map((a) => join(root, a.replace(/^\.[\\/]/, '')))
  : allDeckFiles()

if (!arquivos.length) {
  console.error('Nenhuma aula em aulas/*.md.')
  process.exit(1)
}

let erros = 0
let avisos = 0

// Checagem do design system, não de um deck: roda uma vez, antes dos arquivos.
for (const { nome, campo } of layoutsComPropReservada()) {
  console.log(`\n  aulas/layouts/${nome}.vue`)
  console.log(`    ✗ aulas/layouts/${nome}.vue  a prop \`${campo}\` nunca chega: é campo reservado do Slidev.`)
  console.log(`      \`title\` se lê pelo objeto \`frontmatter\`; os outros precisam de outro nome.`)
  erros++
}

for (const file of arquivos) {
  const problemas = await lintDeck(file)
  const rel = relative(root, file).replace(/\\/g, '/')

  if (!problemas.length) {
    console.log(`  ✓ ${rel}`)
    continue
  }

  console.log(`\n  ${rel}`)
  for (const { nivel, msg, linha } of problemas) {
    const marca = nivel === 'erro' ? '✗' : '!'
    const local = linha ? `:${linha}` : ''
    console.log(`    ${marca} ${rel}${local}  ${msg}`)
    if (nivel === 'erro') erros++
    else avisos++
  }
  console.log()
}

const resumo = `${arquivos.length} arquivo(s) · ${erros} erro(s) · ${avisos} aviso(s)`
console.log(erros ? `\n✗ ${resumo}\n` : `\n✓ ${resumo}\n`)
process.exit(erros ? 1 : 0)
