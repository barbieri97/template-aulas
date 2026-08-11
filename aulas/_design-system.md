---
theme: none
title: Design system — catálogo
info: Um slide por layout e por componente, com a situação de uso nas notas
date: "2026-08-11"
colorSchema: light
layout: capa
kicker: Deck de bancada
subtitle: Um slide para cada <span class="ds-em">layout</span> e cada <span class="ds-em">componente</span>. Abra com <code>npm run ref</code>.
meta: O nome começa com <code>_</code>, então o site não publica este deck. Ele existe para você ver antes de escrever.
---

<!--
Este é o catálogo do design system: a versão renderizada do que docs/design-system.md
descreve por escrito. Toda vez que você criar um layout ou componente novo em aulas/,
acrescente um slide aqui — é o que mantém o catálogo confiável.
-->

---
layout: roteiro
kicker: O que tem aqui
title: O catálogo
itens:
  - { tema: Tokens, desc: cor, tipo e espaço — o vocabulário }
  - { tema: Layouts, desc: "6 locais + os que o Slidev já traz" }
  - { tema: Componentes, desc: "8 peças para usar dentro do slide" }
  - { tema: Markdown puro, desc: como texto sem enfeite se parece }
---

---
layout: secao
numero: "01"
title: Tokens
note: Nenhum layout e nenhum componente escreve uma cor na mão. Todos leem daqui.
---

---
layout: default
---

# As cores

<div class="amostras">
  <div><span class="chip" style="background: var(--ds-accent)"></span><code>--ds-accent</code><em>a cor da disciplina</em></div>
  <div><span class="chip" style="background: var(--ds-accent-2)"></span><code>--ds-accent-2</code><em>o acento secundário</em></div>
  <div><span class="chip" style="background: var(--ds-ink)"></span><code>--ds-ink</code><em>texto principal</em></div>
  <div><span class="chip" style="background: var(--ds-muted)"></span><code>--ds-muted</code><em>texto secundário</em></div>
  <div><span class="chip" style="background: var(--ds-surface); border-color: var(--ds-rule)"></span><code>--ds-surface</code><em>cartões e blocos</em></div>
  <div><span class="chip" style="background: var(--ds-ok)"></span><code>--ds-ok</code><em>estado bom</em></div>
  <div><span class="chip" style="background: var(--ds-warn)"></span><code>--ds-warn</code><em>atenção</em></div>
  <div><span class="chip" style="background: var(--ds-danger)"></span><code>--ds-danger</code><em>erro</em></div>
</div>

<Fonte>Trocar a identidade visual das aulas = editar <code>aulas/styles/tokens.css</code>, e só ele.</Fonte>

<style>
.amostras {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--ds-space-3) var(--ds-space-6);
  margin-top: var(--ds-space-5);
}
.amostras > div { display: flex; align-items: center; gap: var(--ds-space-3); }
.amostras .chip {
  width: 2.2rem; height: 2.2rem; flex: none;
  border: 1px solid transparent; border-radius: var(--ds-radius-sm);
}
.amostras em { color: var(--ds-muted); font-size: var(--ds-text-sm); font-style: normal; }
</style>

<!--
Este slide usa um <style> local — a exceção que confirma a regra. Ele desenha uma amostra
de cor, que só existe neste catálogo. Numa aula, CSS solto é sinal de que falta um layout
ou um componente.
-->

---
layout: default
---

# A escala de tipo

<div class="escala">
  <p style="font-size: var(--ds-text-3xl)">3xl — só a capa e o destaque</p>
  <p style="font-size: var(--ds-text-2xl)">2xl — o h1 de um slide comum</p>
  <p style="font-size: var(--ds-text-xl)">xl — h2, termo, citação</p>
  <p style="font-size: var(--ds-text-lg)">lg — abertura de parágrafo, item de lista importante</p>
  <p style="font-size: var(--ds-text-base)">base — o corpo do texto</p>
  <p style="font-size: var(--ds-text-sm)">sm — legenda, tabela, crédito</p>
  <p style="font-size: var(--ds-text-xs)">xs — rótulo em caixa alta</p>
</div>

<style>
.escala p { margin: var(--ds-space-2) 0; max-width: none; line-height: 1.25; }
</style>

<!--
Sete tamanhos, e só. Quando um slide "precisa" de um tamanho que não está na escala,
o problema quase sempre é conteúdo demais no slide — não a escala.
-->

---
layout: secao
numero: "02"
title: Layouts
note: Escolha pela forma do conteúdo, não pela decoração.
---

---
layout: roteiro
kicker: "layout: roteiro"
title: Este slide é o layout <code>roteiro</code>
itens:
  - { tema: Um tópico, desc: e a explicação dele }
  - { tema: Outro tópico, desc: "com <code>atual</code> marcando onde estamos" }
  - { tema: Um terceiro, desc: "a lista aceita item simples também" }
atual: 2
---

<!-- Situação: índice da aula, ou qualquer lista curta de tópico + explicação. Repetir o mesmo roteiro entre seções, mudando `atual`, ajuda a turma a se localizar. -->

---
layout: destaque
kicker: "layout: destaque"
title: Uma frase <span class="ds-em">sozinha</span> na tela.
fonte: o campo <code>fonte</code> vai aqui embaixo
---

<!-- Situação: a pergunta que abre a discussão, a tese da aula, o número que impressiona. Uma frase por slide — se precisa de duas linhas de explicação, o layout é outro. -->

---
layout: figura
imagem: /exemplo-figura.svg
legenda: O campo <code>legenda</code> aceita HTML.
lado: direita
---

# O layout `figura`

Imagem de um lado, texto do outro. `lado: esquerda` troca os dois de lugar, e
`ajuste: cover` faz a imagem preencher em vez de caber inteira.

O caminho é absoluto e sem a pasta: `/exemplo-figura.svg` procura em
`aulas/public/exemplo-figura.svg`.

<!-- Situação: quando a imagem É o argumento e o texto comenta. Para imagem decorativa, o layout `image-right` do Slidev serve e dá menos trabalho. -->

---
layout: secao
numero: "03"
title: Componentes
note: O que se usa dentro de um slide, misturado ao markdown.
---

---
layout: default
---

# `<Nota>` — os quatro tipos

<Nota titulo="Info">

O tipo padrão, com **markdown funcionando** — repare nas linhas em branco.

</Nota>

<Nota tipo="ok" titulo="Funciona">

Para confirmar o caminho certo: "é assim que se faz".

</Nota>

<Nota tipo="alerta" titulo="Cuidado">

Para a pegadinha que a turma sempre cai.

</Nota>

<Nota tipo="erro" titulo="Não faça">

Para o erro que precisa ser nomeado como erro.

</Nota>

<!-- Situação: o aparte. Se o conteúdo é o ponto principal do slide, ele não vai numa <Nota> — vai no corpo. -->

---
layout: default
---

# `<Grade>` + `<Cartao>`

<Grade :cols="3">
<Cartao rotulo="passo 1" titulo="Comparar">

Três coisas do **mesmo tipo**, lado a lado.

</Cartao>
<Cartao rotulo="passo 2" titulo="Escolher" destaque>

O `destaque` pinta um cartão com o accent — um por grade.

</Cartao>
<Cartao rotulo="passo 3" titulo="Explicar">

Cartão sem `rotulo` também funciona.

</Cartao>
</Grade>

<Fonte><code>:cols</code> precisa dos dois-pontos — sem eles o Vue passa a string <code>"3"</code>.</Fonte>

<!-- Situação: comparar coisas do mesmo tipo. Duas ou três colunas; com quatro, o texto de cada cartão já não cabe. -->

---
layout: default
---

# `<Termo>` e `<Citacao>`

<Termo palavra="Design system" origem="o conjunto de decisões já tomadas">

As peças e as regras que fazem trinta slides parecerem um curso, e não trinta arquivos.

</Termo>

<Citacao autor="Alguém que você cita" fonte="Livro, 1999">

A citação de dentro do slide. Para uma frase ocupando a tela inteira, use o layout `destaque`.

</Citacao>

<!-- Situação: <Termo> é o bloco que a turma copia — a definição formal. <Citacao> é a palavra de outra pessoa, com crédito. -->

---
layout: default
---

# `<Pessoa>` e `<LinhaDoTempo>`

<div class="ds-grid">
<div>

<Pessoa nome="Com retrato" papel="o campo `foto`" foto="/exemplo-avatar.svg">

O slot é a descrição curta.

</Pessoa>

<Pessoa nome="Sem retrato" papel="entra um monograma">

Assim uma grade de pessoas não fica torta.

</Pessoa>

</div>
<div>

<LinhaDoTempo :itens="[
{ quando: '1450', o_que: 'Um marco', desc: 'a explicação dele' },
  { quando: '1501', o_que: 'Outro marco' },
  { quando: 'hoje', o_que: 'O campo é texto', desc: 'não precisa ser ano' },
]" />

</div>
</div>

<!-- Situação: <LinhaDoTempo> serve para história e também para processo — "o que acontece em cada etapa". O campo `quando` é texto livre: "etapa 1" funciona igual. -->

---
layout: secao
numero: "04"
title: Markdown puro
note: Sem componente nenhum. É assim que o texto de todo dia se parece.
---

---
layout: default
---

# Um slide comum

Parágrafo com **negrito no accent**, *itálico*, `código inline` e um
[link](https://sli.dev/). O corpo do texto tem largura máxima de 62 caracteres — é
o que se lê sem cansar.

- Item de lista, com o traço no accent
- Outro item
  - Sublista fica menor e discreta

> A citação em markdown vira o bloco em serifa, com a barra à esquerda.

| campo | o que faz |
|---|---|
| `title` | vira o nome da aula no índice do site |
| `info` | a ementa de uma linha |
| `date` | a data, em `YYYY-MM-DD` |

---
layout: fecho
title: Onde continuar
pontos:
  - "O contrato escrito: <code>docs/design-system.md</code>"
  - "Trocar tudo por um tema npm, ou gerar outro DS: <code>docs/temas.md</code>"
proximo: Copie uma aula de exemplo e comece a escrever
---

Layouts e componentes novos entram em `aulas/layouts/` e `aulas/components/` — e ganham
um slide aqui.
