# Imagens de exemplo

Placeholders em SVG para montar slides antes de ter a imagem final.

**Esta pasta é a `public/` do Slidev.** O Slidev trata a pasta do arquivo `.md` como raiz do
projeto, e as aulas moram em `aulas/` — então é aqui que entram as imagens, e não numa
`public/` na raiz do repositório. O caminho dentro do markdown é absoluto e sem o nome da
pasta: `/exemplo-figura.svg`.

| arquivo | proporção | serve para |
|---|---|---|
| `exemplo-paisagem.svg` | 16:9 | imagem larga, layout `image` do Slidev |
| `exemplo-quadrado.svg` | 1:1 | imagem quadrada |
| `exemplo-retrato.svg` | 3:4 | imagem alta, layout `figura` com `ajuste: cover` |
| `exemplo-hero.svg` | 21:10 | fundo panorâmico — massa visual à direita, área livre à esquerda |
| `exemplo-figura.svg` | 3:2 | layout `figura` — um gráfico com eixos e legenda |
| `exemplo-avatar.svg` | 1:1 | `<Pessoa foto>` |
| `exemplo-avatar-2.svg` | 1:1 | `<Pessoa foto>`, segunda cor |
| `exemplo-fundo.svg` | 16:9 | campo `background:` do Slidev — textura de baixo contraste |
| `exemplo-logo.svg` | 1:1 | marca colorida |
| `exemplo-logo-mono.svg` | 1:1 | marca de uma cor só |

## Duas maneiras de usar, e só uma funciona sempre

```md
![alguma coisa](/exemplo-figura.svg)   ← o Vite reescreve este caminho no build
```

```md
---
layout: figura
imagem: /exemplo-figura.svg            ← chega como prop, em tempo de execução
---
```

O segundo caso **só funciona porque o layout passa o caminho por `asset()`**
(`aulas/lib/asset.ts`). Sem isso a imagem some quando o site é publicado num subdiretório —
e localmente continua aparecendo, o que faz o erro só surgir depois do deploy. Qualquer
componente novo que aceite caminho de imagem por prop precisa fazer o mesmo.

São SVGs de propósito: pesam poucos KB, escalam sem borrar e podem ser editados em qualquer
editor de texto — as cores são as do design system (`--ds-accent` `#0d7d7a`, `--ds-ink`
`#17202a`, `--ds-bg` `#f8f7f4`).
