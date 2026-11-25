# Template de aulas em Slidev

Um repositório de decks [Slidev](https://sli.dev/) **agnóstico de tema**. **Uma aula por
arquivo `.md`** em `aulas/`, publicadas no GitHub Pages, cada uma na sua própria URL.

De fábrica não há tema npm (`theme: none`): o visual vem de um design system local, escrito em
`aulas/styles`, `aulas/layouts` e `aulas/components`. Trocar por um tema pronto, ou gerar
outro DS, é decisão de quem usa o template — os scripts não sabem qual é o visual.

Ao lado das aulas, **`referencias/`** guarda o material de referência de cada aula — o texto
autoral que embasa os slides e que pode virar produto à parte. Ver [Referências](#referências).

Este arquivo vale para qualquer agente (é o único arquivo de instruções do repositório).

## Antes de escrever ou editar qualquer deck

Leia **[`docs/design-system.md`](docs/design-system.md)** — os layouts, os componentes, os
tokens e, principalmente, [as armadilhas do
Slidev](docs/design-system.md#as-armadilhas-do-slidev) que fazem um slide sumir sem erro.

Para ver renderizado em vez de lido: `npm run ref` abre `aulas/_design-system.md`, um slide
por layout e por componente. O `_` no nome mantém esse deck fora do site.

Se a aula for usar outro visual, o roteiro dos dois caminhos (tema npm ou DS gerado) está em
**[`docs/temas.md`](docs/temas.md)**.

### As quatro coisas que mais quebram deck

- **`src:` no frontmatter apaga o slide.** É o campo com que o Slidev importa outro `.md`. Um
  `src: /foto.png` faz o slide desaparecer sem mensagem nenhuma — por isso o layout `figura`
  chama o campo de `imagem`. O mesmo vale para os outros campos reservados (`title`, `layout`,
  `zoom`, `level`…): eles nunca chegam como prop. `title` se lê pelo objeto `frontmatter`.
- **Caminho de imagem que chega por prop precisa passar por `asset()`** (`aulas/lib/asset.ts`).
  Sem isso a imagem some quando o site é publicado em subdiretório — e continua funcionando
  localmente, então o erro só aparece depois do deploy.
- **Todo frontmatter é cercado por `---` em cima e embaixo.** Entre dois slides sem corpo você
  vê duas linhas `---` seguidas: está certo. Compartilhar um `---` entre dois blocos quebra o
  parse do arquivo inteiro.
- **Markdown dentro de componente só funciona com linha em branco** depois da tag de abertura
  e antes da de fechamento. Sem elas, `**negrito**` aparece com os asteriscos na tela.

`npm run lint` pega as três primeiras. Rode antes de commitar.

### Nada de CSS solto no slide

Escolha o `layout:` que casa com a forma do conteúdo e preencha o frontmatter dele; para o que
vai dentro do slide, use os componentes. `<style>` num slide é sinal de que falta um layout ou
um componente — a exceção honesta é o desenho que só existe naquele slide.

## Convenções

| | |
|---|---|
| Decks | `aulas/aula-NN-slug-descritivo.md` |
| URL | o nome do arquivo (sem `.md`) vira o caminho: `/<repo>/aula-NN-slug-descritivo/` |
| Deck de bancada | prefixo `_` (`aulas/_design-system.md`) — o site não publica |
| Tema | `theme: none` + design system local; ou um pacote npm, ver `docs/temas.md` |
| Idioma | conteúdo em português |
| Imagens | `aulas/public/` — **não** na raiz do repo (veja "Por que `aulas/public/`" abaixo) |
| Headmatter | além de `theme`/`title`, cada aula traz `info:` (ementa de uma linha), que alimenta a landing page. **Sem `date:`**: as aulas se repetem ao longo do tempo, nada aqui é amarrado a data (o lint avisa se aparecer) |
| Download | `download: true` no headmatter, em toda aula — deixa o deck disponível para baixar em PDF direto da apresentação publicada |
| Identidade do curso | `site.config.json` na raiz (`title`, `institution`, `description`, `intro`) — o único lugar com o nome da disciplina |
| Referências | `referencias/aula-NN/` (só o número) — ver [Referências](#referências) |
| Flags de publicação | `publicarReferencias` (VitePress) e `publicarExternos` (zips de `externos/`) em `site.config.json`, ambas `false` de fábrica |

O bloco de abertura de um deck é headmatter **e** frontmatter do primeiro slide ao mesmo
tempo. O `title:` dele é o título do deck e o que a `capa` mostra — não repita o campo.

`download: true` é padrão em toda aula nova; `npm run lint` avisa (não bloqueia o build)
quando falta. É o campo do Slidev que gera um PDF durante o build e mostra o botão de baixar
no deck publicado — quem faz isso é o `playwright-chromium` (devDependency do
`package.json`), que baixa um Chromium próprio no `npm install`/`npm ci`.

## Comandos

```bash
npm run dev                                  # abre a primeira aula de aulas/ com hot reload
npm run dev -- 03                            # abre a aula cujo nome contém "03"
npm run ref                                  # abre o catálogo de layouts/componentes
npm run lint                                 # valida todos os decks
npm run build                                # builda tudo em dist/ (roda o lint antes)
npm run referencias                          # VitePress das referências em localhost
npm run referencias:build                    # build local do VitePress (referencias/.vitepress/dist)
npm run nova-referencia -- 04                # cria referencias/aula-04/ com a estrutura padrão
```

`npm run dev` serve **uma aula por vez**, na raiz (`/`). O conjunto das aulas mais a página
inicial só existe depois do `npm run build` — é o build que dá a cada deck o seu `--base`.

Para adicionar uma aula nova: crie o `.md` em `aulas/`, commit, push. O workflow builda e
publica — nenhuma config precisa ser tocada.

## Referências

```
referencias/
├── .vitepress/            config do VitePress (menu montado sozinho a partir das pastas)
├── index.md               visão geral: todas as aulas e todos os artigos
└── aula-NN/               uma pasta por aula, só o número (casa com aulas/aula-NN-*.md)
    ├── AGENTS.md          orquestração da aula — sem conteúdo
    ├── docs/              o conteúdo, escrito pelo autor
    ├── externos/          artigos e arquivos de apoio (versionados)
    └── privados/          material com direitos autorais (NÃO versionado)
```

- **`aula-NN/AGENTS.md`** diz *como* a aula é montada: qual deck é o alvo, em que ordem ler
  `docs/`, o roteiro (bloco → arquivo de `docs/` → layout) e as regras de fonte. **Não tem
  conteúdo** — todo conteúdo mora em `docs/`. Ao trabalhar numa aula, leia primeiro esse
  arquivo e depois `docs/` na ordem que ele indica.
- **`docs/`** é texto do autor, em vários `.md`. Assunto grande vira subpasta. Prefixo numérico
  (`01-contexto.md`) define a ordem no menu; `index.md` é a entrada da aula. O título no menu é
  o `title:` do frontmatter ou, sem ele, o primeiro `# `. Não escreva conteúdo em `docs/` em nome
  do autor sem ele pedir.
- **`externos/`**: material de terceiros que pode ser citado, sempre com a fonte. É versionado —
  e, portanto, público.
- **`privados/`**: material com direitos autorais. Só o `.gitkeep` é versionado
  (`.gitignore`). Serve para consulta; **nunca** copie trecho, imagem ou tabela de lá para
  `docs/`, para um deck ou para qualquer arquivo versionado.

Nova aula: `npm run nova-referencia -- NN` cria a pasta com `AGENTS.md`, `docs/index.md`,
`externos/` e `privados/`, já apontando para o deck `aulas/aula-NN-*.md` se ele existir.

### VitePress

Um site só para todas as aulas, com raiz em `referencias/`. Entram só `index.md` e os
`aula-NN/docs/**`; `AGENTS.md`, `externos/` e `privados/` ficam de fora (`srcExclude` em
`referencias/.vitepress/config.mts`). A URL omite o `docs/`: `aula-01/docs/01-x.md` →
`/aula-01/01-x`. O menu de cada aula usa o `title:` do deck correspondente em `aulas/`.

**Publicação é opcional.** `"publicarReferencias": true` em `site.config.json` faz o
`npm run build` gerar também `dist/referencias/` (estático, publicado no Pages em
`/<repo>/referencias/`) e põe um link na landing. Com `false` (padrão) o site não muda. A env
`PUBLICAR_REFERENCIAS=1|0` sobrescreve o arquivo, para testar local. Lembre que, ligado, todo o
`docs/` fica público.

### Material de apoio para download

**Também opcional, e independente do VitePress.** `"publicarExternos": true` em
`site.config.json` faz o `npm run build` compactar cada `referencias/aula-NN/externos/` que tenha
algum arquivo em `dist/downloads/<slug-da-aula>-material-de-apoio.zip`, e o card da aula na
landing ganha o link "Material de apoio" (com número de arquivos e tamanho). Arquivos ocultos
(`.gitkeep`) ficam de fora; `privados/` nunca entra. Pasta `externos/` sem deck correspondente em
`aulas/` gera só um aviso. A env `PUBLICAR_EXTERNOS=1|0` sobrescreve o arquivo.

Ligado, o material de terceiros fica para download público — confira se a licença de cada
arquivo permite redistribuição. Limites do GitHub Pages: 100 MB por arquivo no repositório e
1 GB para o site publicado.

## Por que `aulas/public/`

O Slidev define `userRoot = dirname(<arquivo do deck>)` e roda o Vite com `root: userRoot` e
`publicDir: <userRoot>/public`. Ou seja: `public/`, `components/`, `layouts/`, `setup/` e
`styles/` **seus** são procurados dentro da pasta do deck, não na raiz do repo. Os mesmos
nomes na raiz são ignorados em silêncio.

O tema npm é a exceção — ele é resolvido por resolução de pacote Node a partir do arquivo
`.md`, que sobe os diretórios pai até achar o `node_modules/` da raiz. Por isso deck em
subpasta funciona com tema npm, mas não funcionaria com layouts locais colocados na raiz.

## Build e deploy

`scripts/build-site.mjs` roda um `slidev build` **por aula** (cada uma precisa do seu próprio
`--base`, que é único por invocação do CLI), com `--router-mode hash` — o modo que o Slidev
documenta para deploy em subdiretório como o GitHub Pages. Depois gera a landing
`dist/index.html` lendo o headmatter de cada deck; o CSS dela é pintado com os tokens de
`aulas/styles/tokens.css`, então a página inicial acompanha o visual das aulas.

A publicação é pelo **artefato do Actions**: o job `build` empacota o `dist/` com
`upload-pages-artifact` e o job `deploy` o entrega ao Pages com `deploy-pages` (OIDC — daí
`pages: write` + `id-token: write` e o `environment: github-pages`). Exige **Settings → Pages
→ Source: `GitHub Actions`**; com a fonte em `Deploy from a branch` o `configure-pages` falha.
Detalhes no README.

O workflow roda `npx playwright install-deps chromium` logo depois do `npm ci`. O `npm ci`
já baixa o binário do Chromium (é o `playwright-chromium` fazendo isso no seu próprio script
`install`), mas só esse passo instala as libs de sistema que faltam no runner do Actions para
rodar esse Chromium headless — sem ele o `slidev build` quebra na hora de gerar o PDF do
`download: true`.

`scripts/lint.mjs` é o lint do repositório, e é agnóstico de tema: a lista de layouts e
componentes válidos é montada na hora, a partir do Slidev, do tema declarado (se houver) e das
pastas locais de `aulas/`.

`scripts/lib.mjs` concentra o que os scripts compartilham: onde ficam as aulas (`deckFiles()`
ignora os `_`; `allDeckFiles()` inclui), como achar binários de `node_modules` sem npx
(`binOf()`), como ler o `site.config.json` (`siteConfig()`) e o que existe de layout e
componente (`knownNames()`). Nenhum script tem nome de arquivo de aula fixo.

O `--base` vem da env `SITE_BASE` (`/` local; no CI, o output `base_path` do
`configure-pages`, que é o caminho da URL real do site). **O nome do repositório no GitHub faz
parte das URLs** — renomear o repo muda todos os links e exige rodar o workflow de novo.
