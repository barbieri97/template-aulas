# O design system das aulas

O que este repositório traz de fábrica: um design system **local**, escrito em `aulas/`, sem
tema npm nenhum (`theme: none` no headmatter). Trocar por um tema pronto, ou gerar outro DS do
zero, é assunto de [`temas.md`](temas.md).

Este arquivo é o contrato: o que existe, quando usar cada coisa e as armadilhas do Slidev que
já custaram um slide.

---

## Onde mora cada coisa

O Slidev define a raiz do projeto como **a pasta do arquivo `.md`**. As aulas estão em
`aulas/`, então é lá dentro que ele procura tudo:

```
aulas/
├── styles/index.css     ← o único CSS que o Slidev importa (os outros entram por @import)
│   ├── tokens.css       ← cor, tipo, espaço, forma — a identidade visual inteira
│   ├── base.css         ← como o markdown puro se parece
│   └── utilities.css    ← as classes `ds-*` que um slide pode usar
├── layouts/*.vue        ← a forma do slide (campo `layout:` do frontmatter)
├── components/*.vue     ← peças usadas dentro do slide (auto-importadas, sem `import`)
├── lib/asset.ts         ← resolve caminho de imagem contra a base do site
└── public/              ← imagens; `/foto.png` no markdown = `aulas/public/foto.png`
```

Uma `public/` ou uma `components/` na **raiz do repositório** não seria vista por ninguém.

---

## Tokens

Toda decisão visual está em `aulas/styles/tokens.css`. Layouts e componentes só consomem
`var(--ds-*)`; nenhum escreve um hex na mão. **Mudar a identidade visual das aulas é editar
esse arquivo, e só ele** — inclusive a página inicial do site, que lê os mesmos tokens.

| grupo | tokens |
|---|---|
| cor | `--ds-bg` `--ds-surface` `--ds-ink` `--ds-muted` `--ds-rule` `--ds-accent` `--ds-accent-2` `--ds-ok` `--ds-warn` `--ds-danger` |
| cor translúcida | `--ds-accent-wash` `--ds-accent-2-wash` `--ds-ink-wash` |
| tipo | `--ds-font-sans` `--ds-font-serif` `--ds-font-mono`, escala `--ds-text-xs` … `--ds-text-3xl`, `--ds-leading-*`, `--ds-tracking-kicker` |
| espaço | `--ds-space-1` … `--ds-space-8`, `--ds-pad-slide` |
| forma | `--ds-radius-sm` `--ds-radius` `--ds-radius-lg` `--ds-border` `--ds-border-thick` `--ds-shadow` |

O tema claro vive em `:root`, o escuro em `.dark` — a classe que o Slidev põe no `<html>`
conforme o `colorSchema` do headmatter. Nenhuma cor pode existir **só** no bloco `.dark`.

A escala de tipo é fechada: sete tamanhos. Quando um slide parece precisar de um tamanho fora
dela, quase sempre o problema é conteúdo demais no slide.

### Fontes

Os tokens de fonte pedem Inter / Iowan / JetBrains Mono e caem para as do sistema. Para
carregá-las de verdade, use o campo do Slidev no headmatter:

```yaml
fonts:
  sans: Inter
  serif: Iowan Old Style
  mono: JetBrains Mono
```

Isso faz o site buscar as fontes no Google Fonts em tempo de exibição. As aulas de exemplo
não usam, de propósito: sem esse campo o deck publicado não depende de rede.

---

## Layouts

Vão no campo `layout:` do frontmatter do slide. Os campos de cada um viram props.

| layout | quando usar | campos |
|---|---|---|
| `capa` | o primeiro slide da aula | `kicker` `title` `subtitle` `meta` |
| `secao` | avisar que a aula virou de assunto | `numero` `kicker` `title` `note` |
| `destaque` | uma frase sozinha na tela: a pergunta que abre a discussão, a tese, o número | `kicker` `title` `fonte` |
| `roteiro` | o índice da aula, ou lista de tópico + explicação | `kicker` `title` `itens[]` `atual` |
| `figura` | quando a imagem **é** o argumento e o texto comenta | `imagem` `legenda` `lado` `ajuste` |
| `fecho` | o último slide: o que fica, o que vem | `kicker` `title` `pontos[]` `proximo` |

Os layouts do próprio Slidev continuam valendo: `default`, `center`, `two-cols`,
`two-cols-header`, `image-left`, `image-right`, `iframe`, `full`, `none`. Para imagem
decorativa, `image-right` dá menos trabalho que o `figura`.

Campos marcados como "aceita HTML" nos comentários de cada `.vue` são renderizados com
`v-html` — dá para escrever `<span class="ds-em">assim</span>` dentro de um título.

## Componentes

Ficam em `aulas/components/` e são **auto-importados**: basta escrever a tag no markdown.

| componente | quando usar |
|---|---|
| `<Nota>` | o aparte: `tipo` = `info` (padrão), `ok`, `alerta`, `erro` |
| `<Grade>` + `<Cartao>` | comparar coisas do mesmo tipo, 2 ou 3 colunas |
| `<Termo>` | a definição formal — o bloco que a turma copia |
| `<Citacao>` | a palavra de outra pessoa, dentro de um slide com mais coisas |
| `<Pessoa>` | quem é essa gente que a aula cita |
| `<LinhaDoTempo>` | sequência com marcos — história ou processo |
| `<Fonte>` | o crédito no pé do slide |

## Utilitários

`ds-kicker` `ds-lead` `ds-muted` `ds-em` `ds-em-2` `ds-small` `ds-grid` `ds-stack` `ds-rule`.
O UnoCSS do Slidev também está ligado (`text-sm`, `mt-4`, `grid`…) — use-o para ajuste
pontual, e as classes `ds-*` para o que tem significado editorial.

Para ver tudo renderizado em vez de lido: **`npm run ref`** abre `aulas/_design-system.md`,
que tem um slide por layout e por componente, com a situação de uso nas notas. O nome começa
com `_`, então o site não o publica.

---

## As armadilhas do Slidev

As quatro coisas abaixo não são opinião de estilo. São comportamentos do Slidev que fazem um
slide sumir ou uma imagem quebrar **só depois de publicado**. `npm run lint` pega as três
primeiras.

### 1. `src:` no frontmatter apaga o slide

`src` é o campo com que o Slidev importa **outro arquivo `.md`** no lugar do slide. Um
`src: /foto.png` faz o Slidev tentar importar `/foto.png` como markdown: o slide desaparece do
deck, sem mensagem de erro nenhuma. Por isso o layout `figura` chama o campo de `imagem`.

### 2. Os campos que o Slidev não entrega ao layout

Estes nomes são consumidos pelo Slidev e **nunca chegam como prop**:

```
clicks · clicksStart · disabled · hide · hideInToc · layout · level · preload
routeAlias · src · title · transition · zoom · dragPos · lang · clickAnimation
```

`title` é o caso que mais aparece, porque é natural querer escrever o título do slide no
frontmatter. Ele chega pelo objeto `frontmatter`, que todo layout recebe inteiro:

```vue
const props = defineProps<{ frontmatter?: Record<string, any> }>()
const title = props.frontmatter?.title
```

Todos os layouts daqui fazem assim. O lint reclama de qualquer layout que declare uma prop com
nome reservado.

### 3. Caminho de imagem que chega por prop precisa de `asset()`

O Vite reescreve caminhos que consegue ver no build — `![](/foto.png)` no markdown, ou
`<img src="/foto.png">` escrito literalmente no template. Um caminho que chega por prop é só
uma string em tempo de execução: o Vite não a enxerga, e no GitHub Pages (onde o site vive em
`/<repo>/<slug>/`) o navegador pede a imagem na raiz do domínio e leva 404.

Localmente a base é `/` e tudo funciona — **o erro só aparece depois do deploy.** Por isso
`aulas/lib/asset.ts`, e por isso `figura.vue` e `Pessoa.vue` passam o caminho por ele.

### 4. Markdown dentro de componente precisa de linha em branco

Sem linha em branco, o conteúdo entre as tags é tratado como HTML puro e o `**negrito**`
aparece literal na tela:

```md
<Nota titulo="Assim não">
Isto sai com os **asteriscos** à mostra.
</Nota>

<Nota titulo="Assim sim">

Isto sai com o **negrito** certo.

</Nota>
```

Vale em qualquer nível de aninhamento — `<Cartao>` dentro de `<Grade>` também precisa.

---

## As regras de sempre

- **Todo frontmatter é cercado por `---` em cima e embaixo.** Entre dois slides sem corpo
  aparecem duas linhas `---` seguidas — está certo. Compartilhar um `---` entre dois blocos
  quebra o parse do arquivo inteiro.
- **O bloco de abertura é headmatter e frontmatter do primeiro slide ao mesmo tempo.** O
  `title:` dele é o título do deck **e** o título que a `capa` mostra: não repita o campo.
- **CSS solto num slide é sinal de que falta um layout ou um componente.** A exceção honesta
  é o desenho que só existe naquele slide (o catálogo de cores em `_design-system.md` é um
  exemplo). Se você escreveria o mesmo `<style>` duas vezes, vire componente.
- Um layout ou componente novo **ganha um slide em `aulas/_design-system.md`**. É o que
  mantém o catálogo confiável.
