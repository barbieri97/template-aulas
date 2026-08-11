---
theme: none
title: Aula 03 · Fermentação — pão, cerveja e queijo
info: Três alimentos, um mesmo processo — e o que muda entre eles
date: "2026-08-25"
author: Template de Aulas
colorSchema: light
layout: capa
kicker: Aula 03
subtitle: Metade do que você come hoje passou por um organismo <span class="ds-em">antes</span> de chegar ao seu prato.
meta: 45 min · degustação no fim, se der
---

<!--
Aula de exemplo. Aqui o design system aparece com pessoas, linha do tempo de processo e
comparação em grade — o formato "três casos do mesmo princípio".
-->

---
layout: roteiro
kicker: Aula 03
title: O caminho de hoje
itens:
  - { tema: O princípio, desc: comer sem oxigênio }
  - { tema: Três casos, desc: pão, cerveja e queijo }
  - { tema: O que muda, desc: temperatura, tempo e quem trabalha }
  - { tema: Por que preserva, desc: a parte que salvou o inverno }
---

---
layout: destaque
kicker: Ponto de partida
title: Ninguém <span class="ds-em">inventou</span> a fermentação. Inventaram o controle dela.
---

<!--
Comece pela distinção. Fermentar acontece sozinho — uva esquecida vira vinho. O que a
humanidade construiu foi o controle: escolher o organismo, a temperatura e a hora de parar.
-->

---
layout: default
---

# O princípio, em uma frase

<Termo palavra="Fermentação" origem="do latim fervere, ferver">

Obtenção de energia a partir de açúcar sem usar oxigênio. Rende pouca energia — e sobra
sempre alguma coisa que a gente aproveita.

</Termo>

O organismo quer só a energia. **O que nos interessa é o resto:** o gás que levanta a
massa, o álcool que conserva a bebida, o ácido que coalha o leite.

<Nota titulo="A inversão">

Do ponto de vista do micro-organismo, o pão, a cerveja e o queijo são resíduo metabólico.
Toda a gastronomia da fermentação é o aproveitamento de um subproduto.

</Nota>

---
layout: secao
numero: "01"
title: Três casos
note: O mesmo princípio, três resultados — porque o que muda é quem trabalha e por quanto tempo.
---

---
layout: default
---

# Quem faz o quê

<Grade :cols="3">
<Cartao rotulo="pão" titulo="CO₂ é o produto">

A levedura come o açúcar da farinha e solta gás. O glúten segura as bolhas. O álcool
evapora no forno.

</Cartao>
<Cartao rotulo="cerveja" titulo="Álcool é o produto" destaque>

Mesma levedura, sem forno e sem oxigênio. O gás escapa (ou fica preso, e vira gás da
bebida); o álcool permanece.

</Cartao>
<Cartao rotulo="queijo" titulo="Ácido é o produto">

Bactérias transformam a lactose em ácido lático. O leite azeda, a caseína coagula, e
a massa se separa do soro.

</Cartao>
</Grade>

<Nota tipo="ok" titulo="Repare">

Pão e cerveja usam o mesmo organismo — *Saccharomyces cerevisiae* — e chegam a produtos
diferentes só por causa das condições. Não é o micróbio que decide; é o processo.

</Nota>

---
layout: default
---

# O que acontece dentro da massa

<LinhaDoTempo :itens="[
  { quando: '0–20min', o_que: 'Hidratação', desc: 'a farinha bebe a água; as proteínas começam a se encontrar' },
  { quando: '20min–2h', o_que: 'Fermentação', desc: 'a levedura come açúcar e solta CO₂ — a massa dobra de volume' },
  { quando: '2h–3h', o_que: 'Acidificação', desc: 'bactérias lácticas soltam ácido: é daqui que vem o sabor' },
  { quando: '0–10min de forno', o_que: 'Oven spring', desc: 'o gás esquenta, expande e a massa dá o último salto' },
  { quando: 'acima de 60 °C', o_que: 'Trava', desc: 'a levedura morre, o amido gelatiniza, a estrutura fixa' },
]" />

<Fonte>Tempos para massa de trigo a 24 °C. Fermento natural leva de 4 a 12 horas nas mesmas etapas.</Fonte>

<!--
O ponto que rende discussão: sabor e crescimento são feitos por organismos diferentes, em
velocidades diferentes. Fermentar rápido dá pão que cresce e não tem gosto — a levedura
industrial trabalha muito mais rápido que as bactérias.
-->

---
layout: secao
numero: "02"
title: O que muda o resultado
note: Três botões, e nenhum deles é a receita.
---

---
layout: default
---

# Temperatura, tempo e população

| botão | mexer para mais | mexer para menos |
|---|---|---|
| **Temperatura** | fermenta rápido, sabor raso, risco de azedar | fermenta devagar, sabor complexo |
| **Tempo** | mais ácido e mais aroma; passa do ponto e desanda | menos sabor, textura mais fechada |
| **Quem está lá** | fermento natural = mistura de espécies, resultado vivo | fermento industrial = uma espécie, resultado igual sempre |

<Nota tipo="alerta" titulo="Fermento químico não é fermento">

Bicarbonato e fermento em pó fazem gás por reação química, sem organismo nenhum. Levantam
o bolo, mas não produzem sabor — não há fermentação ali.

</Nota>

---
layout: figura
imagem: /exemplo-figura.svg
legenda: Volume da massa (série A) e acidez (série B) ao longo de seis horas.
lado: direita
---

# Duas curvas que não terminam juntas

O volume satura: em algum momento a rede de glúten não segura mais gás e a massa começa a
ceder. A acidez continua subindo.

**O ponto certo de assar fica entre as duas** — depois que a massa cresceu, antes que o
ácido enfraqueça o glúten.

---
layout: default
---

# Quem descobriu o que estava acontecendo

<div class="ds-grid">
<div>

<Pessoa nome="Louis Pasteur" papel="1822–1895 · químico" foto="/exemplo-avatar.svg">

Mostrou em 1857 que a fermentação é obra de organismos vivos — e não uma decomposição
espontânea, como se acreditava.

</Pessoa>

</div>
<div>

<Pessoa nome="Eduard Buchner" papel="1860–1917 · químico" foto="/exemplo-avatar-2.svg">

Em 1897, fermentou açúcar com extrato de levedura **morta**: eram as enzimas, não a
célula inteira. Nobel em 1907.

</Pessoa>

</div>
</div>

<Citacao autor="Louis Pasteur" fonte="Études sur la bière, 1876">

A fermentação é a vida sem ar.

</Citacao>

<!--
A sequência Pasteur → Buchner é uma boa miniatura de como a ciência anda: Pasteur prova
que precisa de vida; quarenta anos depois Buchner mostra que a vida não precisa estar
viva. Nenhum dos dois estava errado.
-->

---
layout: destaque
kicker: A parte que salvou o inverno
title: Fermentar é deixar o micróbio <span class="ds-em">certo</span> ocupar o lugar antes do errado.
---

<!--
O ácido, o álcool e o sal criam um ambiente onde os organismos que estragam o alimento não
vivem. Antes da geladeira, essa era a tecnologia de conservação. Chucrute, iogurte, salame
e queijo são todos a mesma ideia.
-->

---
layout: fecho
title: O que fica
pontos:
  - O produto que nos interessa é o resíduo do metabolismo de outro organismo
  - Mesmo organismo + condições diferentes = alimentos diferentes
  - Fermentar conserva porque ocupa o espaço antes da putrefação
proximo: Fim das aulas de exemplo — agora é a sua vez
---

Para ir além: Katz, *A Arte da Fermentação* (2012); McGee, *Comida e Cozinha* (1984),
capítulos 9 e 12.
