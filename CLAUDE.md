# Aulas — Psicologia Comportamental (FASM)

Um repositório de decks [Slidev](https://sli.dev/) com o tema
[`slidev-theme-tahta`](https://github.com/zcag/tahta). **Uma aula por arquivo `.md`**, publicadas no
GitHub Pages, cada uma na sua própria URL.

## Antes de escrever ou editar qualquer deck

**Leia [`docs/tahta.md`](docs/tahta.md).** É o contrato do tema: a lista de layouts, os campos de
cada um, os componentes e as regras de autoria. Sem ele você escreve markdown que o tema ignora.

Para ver os layouts renderizados em vez de lidos, `npm run ref` abre
[`referencia-tahta.md`](referencia-tahta.md) — um deck de bancada na raiz com um slide por layout
e por componente, e a situação recomendada de cada um nas notas. Fica **fora** de `aulas/`, então
o build nunca o publica.

As duas regras que mais quebram deck:

- **Nada de CSS, `<style>`, grid ou HTML de layout.** Escolha o `layout:` que casa com a forma do
  conteúdo e preencha o frontmatter dele. O tema desenha o resto.
- **Todo frontmatter é cercado por `---` em cima e embaixo.** Entre dois slides sem corpo você vê
  duas linhas `---` seguidas — isso está certo. Compartilhar um `---` entre dois blocos quebra o
  parse do arquivo inteiro.

## Convenções

| | |
|---|---|
| Decks | `aulas/aula-NN-slug-descritivo.md` |
| URL | o nome do arquivo (sem `.md`) vira o caminho: `/<repo>/aula-NN-slug-descritivo/` |
| Variant | `notebook` — o tahta o descreve como *best for: teaching, workshops* |
| Idioma | `themeConfig.lang: pt-BR`; conteúdo em português |
| Imagens | `aulas/public/` — **não** na raiz do repo (veja "Por que `aulas/public/`" abaixo) |
| Headmatter | além de `theme`/`title`/`themeConfig`, cada aula traz `info:` (ementa de uma linha) e `date:` (`YYYY-MM-DD`) — os dois alimentam a landing page |
| Identidade do curso | `site.config.json` na raiz (`title`, `institution`, `description`, `intro`) — o único lugar com o nome da disciplina; nada de texto de identidade chumbado nos scripts |

O bloco de abertura de um deck é headmatter **e** frontmatter do primeiro slide ao mesmo tempo.
Não repita `title:` nele.

## Comandos

```bash
npm run dev                                  # abre a primeira aula de aulas/ com hot reload
npm run dev -- 03                            # abre a aula cujo nome contém "03"
npm run ref                                  # abre o catálogo de layouts/componentes (raiz)
npm run lint                                 # tahta-lint em todos os decks
npm run build                                # builda tudo em dist/ (roda o lint antes)
npm run sync-docs                            # atualiza docs/tahta.md após atualizar o tema
```

Para adicionar uma aula nova: crie o `.md` em `aulas/`, commit, push. O workflow builda e publica —
nenhuma config precisa ser tocada.

## Por que `aulas/public/`

O Slidev define `userRoot = dirname(<arquivo do deck>)` e roda o Vite com `root: userRoot` e
`publicDir: <userRoot>/public`. Ou seja: `public/`, `components/`, `layouts/`, `setup/` e `styles/`
**seus** são procurados dentro da pasta do deck, não na raiz do repo.

O tema é a exceção — ele é resolvido por resolução de pacote Node a partir do arquivo `.md`, que
sobe os diretórios pai até achar o `node_modules/` da raiz. Por isso deck em subpasta funciona com o
tahta, mas não funcionaria com layouts locais colocados na raiz.

## Build e deploy

`scripts/build-site.mjs` roda um `slidev build` **por aula** (cada uma precisa do seu próprio
`--base`, que é único por invocação do CLI), com `--router-mode hash` — o modo que o Slidev
documenta para deploy em subdiretório como o GitHub Pages. Depois gera a landing `dist/index.html`
lendo o headmatter de cada deck.

A publicação é pelo **artefato do Actions**: o job `build` empacota o `dist/` com
`upload-pages-artifact` e o job `deploy` o entrega ao Pages com `deploy-pages` (OIDC — daí
`pages: write` + `id-token: write` e o `environment: github-pages`). Exige **Settings → Pages →
Source: `GitHub Actions`**; com a fonte em `Deploy from a branch` o `configure-pages` falha.
Detalhes no README.

`scripts/lib.mjs` concentra o que os scripts compartilham: onde ficam as aulas (`deckFiles()`), como
achar binários de `node_modules` sem npx (`binOf()`) e como ler o `site.config.json` (`siteConfig()`).
Nenhum script tem nome de arquivo de aula fixo — `npm run dev` descobre a primeira aula sozinho.

O `--base` vem da env `SITE_BASE` (`/` local; no CI, o output `base_path` do `configure-pages`, que
é o caminho da URL real do site). **O nome do repositório no GitHub faz parte das URLs** — renomear
o repo muda todos os links e exige rodar o workflow de novo.
