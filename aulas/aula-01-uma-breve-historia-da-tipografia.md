---
theme: none
title: Aula 01 · Uma breve história da tipografia
info: Como a letra impressa deixou de imitar a mão e virou tecnologia
date: "2026-08-11"
author: Template de Aulas
colorSchema: light
layout: capa
kicker: Aula 01
subtitle: Cinco séculos de decisões sobre uma coisa só — a <span class="ds-em">forma da letra</span>.
meta: 45 min · leitura prévia opcional
---

<!--
Aula de exemplo. O assunto é aleatório de propósito: o que importa aqui é ver o design
system funcionando num deck de verdade, com abertura, seções, figura e fecho.
-->

---
layout: roteiro
kicker: Aula 01
title: O caminho de hoje
itens:
  - { tema: O problema, desc: como copiar um livro antes de 1450 }
  - { tema: A virada, desc: tipos móveis, e por que na Europa }
  - { tema: A forma, desc: da letra que imita a mão à que assume a máquina }
  - { tema: Hoje, desc: por que isso ainda decide o que você lê }
---

---
layout: destaque
kicker: Ponto de partida
title: Um livro custava o mesmo que uma <span class="ds-em">casa pequena</span>.
fonte: Estimativas para a Europa do século XIV, em Eisenstein (1979)
---

<!--
Deixe o número trabalhar antes de explicar. Pergunte à turma: por quê? A resposta que
interessa não é "o papel era caro" — é que cada cópia consumia meses de trabalho humano
qualificado. O custo era de tempo, não de material.
-->

---
layout: default
---

# Antes de 1450: copiar é escrever de novo

Um monge copista produzia cerca de **duas páginas por dia**. Um livro médio levava
um ano. Cada cópia era um objeto único — e cada uma trazia erros novos.

<Grade :cols="3">
<Cartao rotulo="custo" titulo="Tempo humano">

Meses de trabalho de alguém que sabia ler e escrever — uma minoria.

</Cartao>
<Cartao rotulo="risco" titulo="Erro que acumula">

Copiar a cópia multiplica o engano. O texto se degrada a cada geração.

</Cartao>
<Cartao rotulo="efeito" titulo="Saber concentrado">

Quem tem o livro tem o assunto. A biblioteca é o poder.

</Cartao>
</Grade>

<!--
O terceiro cartão é o que amarra a aula. A imprensa não é interessante por ser mais
rápida; é interessante porque muda quem pode discordar de um texto.
-->

---
layout: secao
numero: "01"
title: A virada
note: Tipos móveis não foram inventados na Europa. O que foi inventado lá foi outra coisa.
---

---
layout: default
---

# A invenção que já existia

<LinhaDoTempo :itens="[
  { quando: '1040', o_que: 'Bi Sheng, China', desc: 'tipos móveis em cerâmica' },
  { quando: '1234', o_que: 'Coreia', desc: 'tipos em metal fundido, antes da Europa' },
  { quando: '1450', o_que: 'Gutenberg, Mainz', desc: 'liga metálica, molde ajustável, prensa e tinta oleosa — o sistema' },
  { quando: '1500', o_que: 'Europa', desc: 'cerca de 1.000 oficinas e 20 milhões de exemplares' },
]" />

<Nota tipo="alerta" titulo="A pergunta que a data esconde">

Se a China imprimia com tipos móveis desde 1040, por que a mudança social acontece na
Europa 400 anos depois? Uma escrita com milhares de caracteres não ganha quase nada com
tipos móveis. Um alfabeto de 26 letras ganha tudo.

</Nota>

<!--
Este é o momento de matar a ideia de "gênio inventor". Gutenberg combinou coisas que já
existiam — a prensa de vinho, a metalurgia, a tinta a óleo dos pintores flamengos. A
invenção foi o sistema, não a peça.
-->

---
layout: figura
imagem: /exemplo-retrato.svg
legenda: Uma página composta em tipos móveis imita, a princípio, o manuscrito que substitui.
lado: esquerda
ajuste: cover
---

# A primeira impressão quer parecer manuscrito

A Bíblia de 42 linhas usa uma letra **gótica textura** — a mesma dos copistas. Gutenberg
cortou mais de 290 variações de tipo só para reproduzir as ligaduras e abreviações que uma
mão faria.

Toda tecnologia nova começa fingindo ser a antiga.

<!--
Paralelo que funciona bem com turma: o primeiro carro tinha forma de charrete; o primeiro
site tinha forma de folheto; o primeiro e-book tem forma de página virando. A forma nova
só aparece quando a técnica para de pedir desculpas.
-->

---
layout: secao
numero: "02"
title: A forma se solta
note: Quando a letra para de imitar a mão, a leitura muda de ritmo.
---

---
layout: default
---

# Três decisões que ainda estão na sua tela

<Grade :cols="3">
<Cartao rotulo="1501" titulo="Itálico">

Aldo Manúcio comprime a letra para caber mais texto em livro de bolso. Nasce o livro
portátil — e, com ele, a leitura fora da biblioteca.

</Cartao>
<Cartao rotulo="1734" titulo="Romano moderno" destaque>

Caslon e depois Bodoni afinam os traços finos e engrossam os grossos. A letra assume
que é impressa, não desenhada.

</Cartao>
<Cartao rotulo="1957" titulo="Neogrotesca">

Helvetica tira a personalidade de propósito: a letra deve sumir para o texto aparecer.

</Cartao>
</Grade>

<Citacao autor="Beatrice Warde" fonte="The Crystal Goblet, 1930">

A tipografia perfeita é uma taça de cristal: você não a admira, você vê o vinho.

</Citacao>

<!--
Vale contrapor Warde: a tese da "taça invisível" é uma posição, não um fato. Um cartaz de
show ou uma capa de disco querem exatamente o contrário. Pergunte à turma onde cada
posição faz sentido.
-->

---
layout: default
---

# Serifada ou não?

| | serifada | sem serifa |
|---|---|---|
| **origem** | cinzel romano, pena | letreiro industrial do séc. XIX |
| **onde vai bem** | texto longo impresso | tela pequena, título, sinalização |
| **o que sugere** | tradição, autoridade | neutralidade, atualidade |
| **exemplo** | Times, Garamond | Helvetica, Inter |

<Nota titulo="O mito da legibilidade">

Não existe evidência sólida de que serifa se leia melhor que sem serifa. O que decide
legibilidade é tamanho, entrelinha, contraste e familiaridade — não a serifa.

</Nota>

<Fonte>Ver Poulton (1965) e a revisão de Lund (1999) sobre estudos comparativos.</Fonte>

---
layout: destaque
kicker: A pergunta que fica
title: Quem escolheu a letra que você está lendo <span class="ds-em">agora</span>?
---

<!--
Fechamento em pergunta aberta. Se der tempo, peça para abrirem as configurações do celular
e verem qual é a fonte do sistema — e quem a escolheu por eles.
-->

---
layout: fecho
title: O que fica
pontos:
  - Imprimir não é copiar mais rápido — é mudar quem pode discordar de um texto
  - Toda tecnologia nova começa imitando a que ela substitui
  - A escolha da letra é uma decisão editorial, não uma decoração
proximo: Aula 02 — como uma bicicleta se equilibra
---

Para ir além: Eisenstein, *The Printing Press as an Agent of Change* (1979);
Bringhurst, *Elementos do Estilo Tipográfico* (1992).
