# Template de aulas em Slidev

Um repositório para escrever aulas em [Slidev](https://sli.dev/) e publicá-las no GitHub
Pages, **uma aula por arquivo** em [`aulas/`](aulas/), cada uma na sua própria URL.

```
https://<usuario>.github.io/<repo>/                                    ← índice
https://<usuario>.github.io/<repo>/aula-01-uma-breve-historia-da-tipografia/
```

É **agnóstico de tema**. De fábrica vem um design system próprio — tokens, seis layouts e oito
componentes, tudo em `aulas/` — e nenhum tema npm (`theme: none`). Quando for escrever a sua
disciplina, escolha:

- **instalar um tema pronto** (`npm i slidev-theme-<nome>`) e escrever para ele; ou
- **manter/gerar um design system** e ter layouts com o nome e a forma do seu conteúdo.

O roteiro dos dois caminhos, com o que quebra o deploy em cada um, está em
[`docs/temas.md`](docs/temas.md).

As três aulas em `aulas/` são exemplos de assuntos aleatórios — tipografia, bicicleta e
fermentação. Elas existem para o site ficar de pé e servir de vitrine; apague quando for
escrever as suas.

## Uso diário

```bash
npm install                                   # uma vez
npm run dev                                   # abre a primeira aula com hot reload
npm run dev -- 03                             # abre a aula cujo nome contém "03"
npm run ref                                   # catálogo de layouts e componentes
npm run lint                                  # valida os decks
npm run build                                 # gera dist/ igual ao que vai pro ar
```

`npm run dev` serve **uma aula por vez**, na raiz. O conjunto das aulas mais a página inicial
só existe depois do `npm run build` — é o build que dá a cada deck o seu `--base` e monta o
índice, do mesmo jeito que o Actions faz na publicação.

**Para criar uma aula nova:** copie um `.md` de `aulas/`, renomeie para
`aula-NN-titulo-em-slug.md`, edite, commit, push. O workflow builda e publica sozinho — o
índice se atualiza a partir do `title` / `info` / `date` do topo do arquivo. O nome do arquivo
vira a URL.

Antes de escrever slides, leia [`docs/design-system.md`](docs/design-system.md) — layouts,
componentes, tokens e as armadilhas do Slidev que fazem um slide sumir sem erro nenhum.
Resumo das convenções em [`CLAUDE.md`](CLAUDE.md).

## O que tem dentro

```
aulas/
├── aula-01-*.md … aula-03-*.md   as três aulas de exemplo
├── _design-system.md             o catálogo (o `_` mantém fora do site)
├── styles/                       tokens.css · base.css · utilities.css
├── layouts/                      capa · secao · destaque · roteiro · figura · fecho
├── components/                   Nota · Grade · Cartao · Termo · Citacao · Pessoa · LinhaDoTempo · Fonte
├── lib/asset.ts                  resolve caminho de imagem contra a base do site
└── public/                       imagens (`/foto.svg` no markdown)
docs/                             design-system.md · temas.md
scripts/                          dev.mjs · lint.mjs · build-site.mjs · lib.mjs
site.config.json                  a identidade do curso
```

**A pasta do deck é a raiz do projeto para o Slidev.** As aulas estão em `aulas/`, então
`public/`, `layouts/`, `components/` e `styles/` só valem lá dentro; os mesmos nomes na raiz do
repositório são ignorados em silêncio. Detalhes em [`CLAUDE.md`](CLAUDE.md).

## Primeira publicação

Num repositório novo (criado do zero ou a partir deste template), uma vez só:

1. Crie o repositório em github.com — público, sem README/gitignore/licença.
   **O nome importa:** ele vira o prefixo de todas as URLs do site.
2. **Settings → Pages → Build and deployment → Source: `GitHub Actions`.**
   Este passo vem **antes** do primeiro push: com a fonte em `Deploy from a branch`, o passo
   `configure-pages` do workflow falha logo no início.
3. Conecte e envie:
   ```bash
   git remote add origin https://github.com/<usuario>/<nome-do-repo>.git
   git push -u origin main
   ```
4. Aba **Actions** → a run "Publicar aulas no GitHub Pages" fica verde. A URL publicada
   aparece no job `deploy` (e em Settings → Pages).

Daí em diante, todo push na `main` republica.

> Se você **renomear** o repositório, atualize o remote local
> (`git remote set-url origin https://github.com/<usuario>/<novo-nome>.git`) e rode o workflow
> de novo — o `--base` dos decks é gravado no build, então o site precisa ser reconstruído com
> o nome novo.

## Usar como template para uma disciplina

Nada aqui tem o nome do repositório ou da disciplina chumbado no código: o `--base` sai do nome
do repositório no CI, e a identidade do curso mora em [`site.config.json`](site.config.json).

1. Edite `site.config.json` — quatro campos, é o único arquivo de identidade:
   ```json
   {
     "title": "Nome da disciplina",
     "institution": "SIGLA",
     "description": "Uma linha para buscadores e prévia de link",
     "intro": "O parágrafo abaixo do título na página inicial (aceita HTML)"
   }
   ```
2. Escolha o visual: tema npm ou design system próprio, seguindo
   [`docs/temas.md`](docs/temas.md). Para ficar com o design system que já vem, o único
   arquivo a mexer é `aulas/styles/tokens.css`.
3. Apague as aulas de exemplo em `aulas/` e escreva a primeira. **O build falha de propósito
   com `aulas/` vazio** — não deixe o repo sem nenhuma aula esperando o CI ficar verde.
4. **Settings → Pages → Source: `GitHub Actions`.** Configuração de repositório não vem do
   template — este passo é sempre manual, e precisa vir antes do primeiro push.
5. Faça o push na `main` e espere a run terminar.

O `README.md` e o título deste arquivo continuam sendo texto seu — troque quando quiser.

### Como a publicação chega no Pages

O GitHub tem dois jeitos de publicar Pages: mandar um artefato pelo Actions
(`configure-pages` + `upload-pages-artifact` + `deploy-pages`) ou servir um branch. Este
repositório usa o **artefato**.

O workflow tem dois jobs. O `build` roda `scripts/build-site.mjs` e empacota o `dist/` como
artefato do Pages; o `deploy` recebe esse artefato e publica, autenticando por OIDC — daí as
permissões `pages: write` e `id-token: write`, e o `environment: github-pages` no job de
deploy.

O `--base` de cada deck sai do output `base_path` do `configure-pages`, que é o caminho da URL
real do site (`/<nome-do-repo>` num repo comum, `/` num repo `<usuario>.github.io`). Por isso o
nome do repositório não aparece em lugar nenhum do código.

> Se o job `deploy` ficar pendurado sem erro, cheque em Settings → Pages se a fonte é mesmo
> `GitHub Actions` e se não há implantação anterior travada.

## Como funciona o build

`scripts/build-site.mjs`:

1. lê o topo (headmatter) de cada `aulas/*.md` para pegar título, ementa e data;
2. roda `scripts/lint.mjs` em todos — erro aqui aborta o build;
3. roda **um `slidev build` por aula**, cada uma com o seu `--base` e `--router-mode hash`
   (necessário porque o Pages serve tudo sob `/<repo>/` e só tem um `404.html`, na raiz);
4. gera a landing `dist/index.html` listando as aulas, com os textos de `site.config.json` e o
   CSS pintado com os tokens de `aulas/styles/tokens.css` — assim a página inicial acompanha o
   visual dos decks.

O `--base` vem da variável `SITE_BASE` (`/` local, `/<repo>/` no CI).

`scripts/lint.mjs` é agnóstico de tema: monta a lista de layouts e componentes válidos na hora
(Slidev + tema declarado + `aulas/layouts` + `aulas/components`) e confere headmatter,
imagens ausentes em `aulas/public/` e os campos reservados do Slidev que fazem um slide sumir
em silêncio.

`scripts/lib.mjs` guarda o que os scripts compartilham — é lá que se mexe para mudar essas
convenções.
