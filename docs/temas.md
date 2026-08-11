# Trocar o visual: tema npm ou design system próprio

Este repositório é **agnóstico de tema**. Nada nos scripts, no build ou no workflow sabe qual
é o visual das aulas: o lint monta a lista de layouts válidos na hora, olhando para o Slidev,
para o tema declarado no headmatter (se houver) e para `aulas/layouts/`.

São dois caminhos. Dá para misturar — instalar um tema e criar dois layouts locais em cima
dele é normal.

| | **A · tema npm** | **B · design system próprio** |
|---|---|---|
| visual | pronto, de terceiros | seu, do zero |
| `theme:` | `slidev-theme-x` | `none` |
| você escreve | só markdown | tokens, layouts e componentes |
| trocar depois | reescrever o frontmatter das aulas | editar um arquivo de tokens |
| é o que vem de fábrica | | ✔ (ver [`design-system.md`](design-system.md)) |

---

## Caminho A — instalar um tema pronto

```bash
npm install slidev-theme-<nome>     # ex.: slidev-theme-seriph, @slidev/theme-default
```

E no headmatter de cada aula:

```yaml
---
theme: slidev-theme-<nome>
title: Aula 01 · ...
info: ...
date: "2026-03-12"
---
```

Depois:

1. **Leia o `README.md` do tema** (e o `AGENTS.md`, se houver) para saber que layouts e campos
   ele oferece. Cada tema tem o seu vocabulário, e markdown que não casa com ele é
   simplesmente ignorado.
2. Reescreva o frontmatter das aulas para os layouts do tema. Os layouts locais em
   `aulas/layouts/` **continuam existindo e vencem** os do tema quando os nomes coincidem —
   apague os que não quiser mais.
3. Deixe `aulas/styles/tokens.css` no lugar, mesmo que só com as variáveis que a página
   inicial usa (`--ds-bg`, `--ds-surface`, `--ds-ink`, `--ds-muted`, `--ds-rule`,
   `--ds-accent`, `--ds-radius*`, `--ds-shadow`, `--ds-font-sans`). É assim que a landing
   combina com os decks. Sem o arquivo o site continua de pé, com um cinza neutro.
4. `npm run lint` e `npm run build`.

**Por que um tema npm funciona com os decks em `aulas/`:** o tema é resolvido por resolução de
pacote do Node a partir do arquivo `.md`, e isso sobe os diretórios pais até achar o
`node_modules/` da raiz. Layouts e componentes **seus**, ao contrário, são procurados na pasta
do `.md` — daí a regra da próxima seção.

Se o tema declarado não estiver instalado, o lint erra na cara: `theme: x não está instalado`.

---

## Caminho B — gerar um design system

É o que este repositório já faz. Para criar outro no lugar (ou pedir ao Claude que gere um),
o roteiro é:

1. **`theme: none`** no headmatter de todas as aulas.
2. **Tokens primeiro**, em `aulas/styles/tokens.css`: cor, escala de tipo, espaço, forma. Tema
   claro em `:root`, escuro em `.dark`. Nenhuma cor pode existir só no bloco escuro.
3. **`aulas/styles/base.css`**: como o markdown puro se parece — títulos, listas, tabela,
   citação, código. Só seletor de elemento dentro de `.slidev-layout`, tudo em cima de
   `var(--ds-*)`.
4. **`aulas/styles/index.css`** com os `@import` na ordem. **O Slidev importa exatamente um
   arquivo de estilo do projeto** — o primeiro entre `styles/index.{ts,js,css}`, `styles.*` e
   `style.*`. Arquivo que não estiver na lista de imports não é carregado.
5. **Layouts** em `aulas/layouts/*.vue`, um por *forma* de slide (abertura, divisor, frase
   solta, imagem + texto, fechamento) — não um por decoração.
6. **Componentes** em `aulas/components/*.vue`, auto-importados.
7. Um slide de cada coisa em `aulas/_design-system.md`, e `npm run ref` para conferir.

As armadilhas do Slidev que quebram um DS gerado (campo `src:`, campos reservados que não
chegam como prop, caminho de imagem em prop, markdown dentro de componente) estão em
[`design-system.md`](design-system.md#as-armadilhas-do-slidev). Quem for gerar um DS novo
precisa lê-las antes — as quatro só dão sintoma depois de publicado.

---

## O que quebra o deploy (nos dois caminhos)

O site é publicado no GitHub Pages sob `https://<usuario>.github.io/<repo>/<slug>/`. Cada
aula é buildada separadamente, com o seu próprio `--base`. Três consequências:

### 1. Pasta do deck é a raiz do projeto

O Slidev roda o Vite com `root` = a pasta do `.md`. As aulas estão em `aulas/`, então
`public/`, `components/`, `layouts/`, `styles/` e `setup/` **seus** só valem dentro de
`aulas/`. Os mesmos nomes na raiz do repositório são ignorados em silêncio — sem erro, sem
aviso: o componente simplesmente não existe.

### 2. Caminho absoluto em prop precisa de `asset()`

`![](/foto.png)` funciona porque o Vite reescreve o caminho no build. `<Pessoa foto="/foto.png">`
não funciona: é uma string em tempo de execução, e no Pages ela aponta para a raiz do domínio.
Passe por `aulas/lib/asset.ts`. **Localmente os dois funcionam** (a base é `/`), então esse
erro só aparece depois do deploy — é o mais caro da lista.

### 3. O nome do repositório faz parte das URLs

O `--base` vem do output `base_path` do `configure-pages`, então não há nada de hardcoded.
Mas renomear o repositório troca todos os links do site e exige rodar o workflow de novo.

E, fora do visual, o que também derruba o build:

- **Frontmatter sem os dois `---`.** Compartilhar uma linha `---` entre dois blocos quebra o
  parse do arquivo inteiro.
- **`aulas/` sem nenhuma aula.** O build falha de propósito; não deixe o repositório assim
  esperando o CI ficar verde.
- **Imagem que não existe em `aulas/public/`.** O lint trata como erro: publicar um slide com
  a imagem faltando é pior que falhar o build.

---

## Testar antes de publicar

```bash
npm run dev -- 02      # uma aula por vez, com hot reload — é assim que se escreve
npm run ref            # o catálogo do design system
npm run lint           # o que quebraria o build
npm run build          # gera dist/ igual ao que vai pro ar
```

O `npm run dev` serve **um deck**, na raiz (`/`) e com todas as rotas do Slidev — é o modo de
trabalho normal. O conjunto de aulas mais a página inicial só existe depois do `npm run build`
(ou no ar, depois que o Actions rodar): é o build que dá a cada aula o seu `--base` e monta o
índice.
