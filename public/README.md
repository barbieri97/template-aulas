# Imagens de exemplo

Placeholders em SVG para montar slides antes de ter a imagem final. Servem ao deck de bancada
[`referencia-tahta.md`](../referencia-tahta.md), que fica na raiz — por isso esta pasta é a
`public/` **da raiz**, e não `aulas/public/`.

| arquivo | proporção | demonstra |
|---|---|---|
| `exemplo-paisagem.svg` | 16:9 | layout `image` |
| `exemplo-quadrado.svg` | 1:1 | layout `image` com `side: left` |
| `exemplo-retrato.svg` | 3:4 | layout `showcase` |
| `exemplo-hero.svg` | 21:10 | layout `bleed` — massa visual à direita, área livre para o texto sobreposto |
| `exemplo-figura.svg` | 3:2 | `<Figure>` — um registro cumulativo com eixos e legenda |
| `exemplo-avatar.svg` | 1:1 | `<Person photo>` |
| `exemplo-avatar-2.svg` | 1:1 | `<Person photo>`, segunda cor |
| `exemplo-fundo.svg` | 16:9 | campo `bg:` com arquivo — textura de baixo contraste |
| `exemplo-logo.svg` | 1:1 | `themeConfig.logo` — marca colorida |
| `exemplo-logo-mono.svg` | 1:1 | `themeConfig.logoInvert` — marca de uma cor só |

**Para usar numa aula**, copie o arquivo para `aulas/public/`: o Slidev resolve `public/` a partir
da pasta do `.md`, e as aulas moram em `aulas/`. O caminho dentro do markdown é sempre absoluto e
sem o nome da pasta — `/exemplo-figura.svg`.

São SVGs de propósito: pesam poucos KB, escalam sem borrar e podem ser editados em qualquer editor
de texto (as cores são as mesmas do variant `notebook` — `#16274a`, `#1f4fd8`, `#fbfbf7`).
