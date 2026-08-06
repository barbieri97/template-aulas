# Psicologia Comportamental · FASM

Slides das aulas do semestre. Uma aula por arquivo em [`aulas/`](aulas/), feitas com
[Slidev](https://sli.dev/) + tema [tahta](https://github.com/zcag/tahta), publicadas no GitHub Pages
— cada aula na sua própria URL.

```
https://barbieri97.github.io/template-aulas/                    ← índice
https://barbieri97.github.io/template-aulas/aula-01-fundamentos-do-behaviorismo/
```

> **O nome do repositório é o prefixo de todas as URLs.** Renomeá-lo troca todos os links do site
> (foi o que aconteceu quando este repo virou `template-aulas`). Nenhuma configuração precisa ser
> tocada — o workflow lê o nome do próprio repositório —, mas links antigos param de valer.

## Uso diário

```bash
npm install                                   # uma vez
npm run dev                                   # abre a primeira aula com hot reload
npm run dev -- 03                             # abre a aula cujo nome contém "03"
npm run ref                                   # catálogo de layouts e componentes do tema
npm run lint                                  # valida os decks
npm run build                                 # gera dist/ igual ao que vai pro ar
```

**Para criar uma aula nova:** copie um `.md` de `aulas/`, renomeie para
`aula-NN-titulo-em-slug.md`, edite, commit, push. O workflow builda e publica sozinho — o índice se
atualiza a partir do `title` / `info` / `date` do topo do arquivo. O nome do arquivo vira a URL.

Antes de escrever slides, leia [`docs/tahta.md`](docs/tahta.md) — é o contrato do tema (layouts,
campos, componentes). Resumo das convenções em [`CLAUDE.md`](CLAUDE.md).

> O `npm run lint` mostra um aviso `unknown field "date"` por aula. É esperado: `date` não é um campo
> do tema, ele existe para o índice do site. Avisos não quebram o build; erros sim.

## Primeira publicação

Este repositório já está publicado. Num repo novo (criado do zero ou a partir deste template),
uma vez só:

1. Crie o repositório em github.com — público, sem README/gitignore/licença.
   **O nome importa:** ele vira o prefixo de todas as URLs do site.
2. Conecte e envie:
   ```bash
   git remote add origin https://github.com/<usuario>/<nome-do-repo>.git
   git push -u origin main
   ```
3. Espere a primeira run terminar — é ela que cria o branch `gh-pages`.
4. **Settings → Pages → Build and deployment → Source: `Deploy from a branch`**,
   branch **`gh-pages`**, pasta **`/ (root)`**.
5. Aba **Actions** → a run "Publicar aulas no GitHub Pages" fica verde.

Daí em diante, todo push na `main` republica.

> Se você **renomear** o repositório, atualize o remote local
> (`git remote set-url origin https://github.com/<usuario>/<novo-nome>.git`). Uma run disparada
> no exato momento do rename pode falhar no push do `gh-pages`; basta reexecutá-la.

## Usar este repositório como template para outra disciplina

Nada aqui tem o nome do repositório ou da disciplina chumbado no código: o `--base` sai do nome do
repositório no CI, e a identidade do curso mora em [`site.config.json`](site.config.json). Criando
um repo novo **a partir do template** (sem marcar *Include all branches* — o `gh-pages` do repo
antigo não deve vir junto):

1. Edite `site.config.json` — quatro campos, é o único arquivo de identidade:
   ```json
   {
     "title": "Nome da disciplina",
     "institution": "SIGLA",
     "description": "Uma linha para buscadores e prévia de link",
     "intro": "O parágrafo abaixo do título na página inicial (aceita HTML)"
   }
   ```
2. Apague as aulas de exemplo em `aulas/` e escreva a primeira. **O build falha de propósito com
   `aulas/` vazio** — não deixe o repo sem nenhuma aula esperando o CI ficar verde.
3. Faça o push na `main` e espere a run terminar (é ela que cria o branch `gh-pages`).
4. **Settings → Pages → Source: `Deploy from a branch`**, branch **`gh-pages`**, pasta
   **`/ (root)`**. Configuração de repositório não vem do template — este passo é sempre manual.
5. Se a run falhar com `403` no push, veja **Settings → Actions → General → Workflow permissions**.

O `README.md` e o título deste arquivo continuam sendo texto seu — troque quando quiser.

### Por que branch `gh-pages` e não o deploy via Actions

O GitHub tem dois jeitos de publicar Pages: mandar um artefato pelo Actions
(`upload-pages-artifact` + `deploy-pages`) ou servir um branch. Este repositório usa o **branch**.

O caminho por artefato foi tentado primeiro e nunca publicou: o build passava, o artefato era
válido, mas a implantação ficava em `deployment_queued` até o timeout de 10 minutos, sem erro.
Recriar o site do Pages trocou o silêncio por erros reais, mas aí uma implantação ficou encravada
(a API dizia `deployment_cancelled` enquanto o agendador recusava novas por "in progress
deployment"). Nada disso vinha do Slidev, do workflow ou de ter várias aulas — o artefato nunca
chegou a ser aberto.

A publicação por branch não passa por esse subsistema. O job builda e dá `push --force` do `dist/`
num branch órfão `gh-pages`, que o Pages serve como arquivo estático. O `.nojekyll` (gerado pelo
build) impede o Jekyll de reprocessar a pasta `assets/`.

## Como funciona o build

`scripts/build-site.mjs`:

1. lê o topo (headmatter) de cada `aulas/*.md` para pegar título, ementa e data;
2. roda `tahta-lint` em todos — erro aqui aborta o build;
3. roda **um `slidev build` por aula**, cada uma com o seu `--base` e `--router-mode hash`
   (necessário porque o Pages serve tudo sob `/<repo>/` e só tem um `404.html`, na raiz);
4. gera a landing `dist/index.html` listando as aulas, com título e ementa vindos de
   `site.config.json`.

O `--base` vem da variável `SITE_BASE` (`/` local, `/<repo>/` no CI).

`scripts/lib.mjs` guarda o que os scripts compartilham (onde ficam as aulas, como achar os binários,
como ler o `site.config.json`) — é lá que se mexe para mudar essas convenções.

Detalhe que costuma quebrar deck em subpasta: o Slidev trata a **pasta do arquivo `.md`** como raiz
do projeto (`root`/`publicDir` do Vite). Por isso as **imagens vão em `aulas/public/`** e referências
a elas nos slides usam caminho absoluto (`/foto.png`). O tema, por ser um pacote npm, é resolvido
subindo até o `node_modules/` da raiz — e por isso funciona normalmente com os decks em `aulas/`.
