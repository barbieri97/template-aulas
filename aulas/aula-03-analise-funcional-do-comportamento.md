---
theme: slidev-theme-tahta
title: "Aula 03 · Análise funcional do comportamento"
info: Da queixa à contingência — como descobrir para que serve um comportamento
date: "2026-08-25"
author: FASM · Psicologia Comportamental
themeConfig:
  variant: notebook
  lang: pt-BR
layout: lead
index: "03"
kicker: Psicologia Comportamental · FASM
subtitle: Dois comportamentos idênticos podem ter funções opostas. É a função que se trata.
---

---
layout: agenda
kicker: Aula 03
title: O caminho de hoje
items:
  - { topic: Topografia × função, desc: "por que a forma engana" }
  - { topic: O registro ABC, desc: "o instrumento básico" }
  - { topic: As quatro funções, desc: "para que um comportamento serve" }
  - { topic: Um caso, desc: "da queixa à hipótese e à intervenção" }
---

---
layout: statement
kicker: A pergunta da aula
title: A pergunta não é «o que ele faz?». É «<em>o que ele consegue</em> fazendo isso?»
---

---
layout: define
kicker: O conceito central
term: Análise funcional
definition: Identificar as <span class="accent2">relações</span> entre um comportamento e as variáveis ambientais que o mantêm.
points:
  - "Descreve, não interpreta"
  - "Busca a função, não a causa interna"
  - "Termina em hipótese testável, não em rótulo"
---

---
layout: columns
kicker: A distinção que organiza tudo
title: Topografia não é função
columns:
  - title: "Topografia — a forma"
    items:
      - "O que se vê e se filma"
      - "Duas crianças gritam igual"
      - "Não diz nada sobre a manutenção"
      - "É por onde a queixa chega"
  - title: "Função — o efeito"
    items:
      - "O que o comportamento produz"
      - "Uma grita por atenção, outra para fugir da tarefa"
      - "Define a intervenção"
      - "É onde a análise precisa chegar"
---

<!-- Deixe explícito: se a intervenção é escolhida pela topografia, ela acerta por sorte. Mesma birra, funções opostas, tratamentos opostos. -->

---
layout: code-explain
kicker: O instrumento
title: Registro ABC — três colunas, nenhuma opinião
notes:
  - "<strong>Antecedente</strong> — o que acontecia imediatamente antes. Contexto, pessoas, demanda em curso."
  - "<strong>Comportamento</strong> — descrito como uma câmera veria. Nada de «ficou nervoso»."
  - "<strong>Consequência</strong> — o que o ambiente fez em seguida, incluindo o que <em>deixou</em> de acontecer."
  - "<strong>Repetição</strong> — um episódio é anedota; o padrão só aparece em vários registros."
---

```txt
DATA/HORA   A (antecedente)              B (comportamento)           C (consequência)
──────────────────────────────────────────────────────────────────────────────────────
Seg 09:15   Professora pede a lição      Joga o caderno no chão      Vai para a coordenação
Seg 10:40   Atividade em dupla           Fica quieto, participa      —
Ter 09:10   Professora pede a lição      Grita e chuta a cadeira     Sai da sala, lição adiada
Qua 09:20   Professora pede a lição      Rasga a folha               Sai da sala, lição adiada
```

<!-- Faça a turma ler as linhas em voz alta e apontar o padrão sozinha. A coluna A repete, a coluna C repete. A hipótese se escreve sozinha. -->

---
layout: statement
kicker: O que o registro mostra
title: A demanda aparece, o comportamento aparece, a demanda some. Três vezes.
---

---
layout: panels
kicker: As quatro funções
title: Para que um comportamento costuma servir
panels:
  - { icon: "lucide:hand", title: "Atenção", items: ["Produz olhar, fala, contato", "Reforço social positivo", "Mantém-se mesmo com bronca"] }
  - { icon: "lucide:package", title: "Tangível", items: ["Produz acesso a item ou atividade", "Reforço positivo", "Típico do ceder pontual"] }
  - { icon: "lucide:door-open", title: "Fuga / esquiva", items: ["Remove ou adia demanda", "Reforço negativo", "O caso do nosso registro"] }
  - { icon: "lucide:refresh-cw", title: "Automática", items: ["A consequência é o próprio ato", "Independe de outra pessoa", "Estereotipias, autolesão"] }
---

---
layout: steps
kicker: O procedimento
title: Como fazer uma análise funcional
ghost: "AF"
steps:
  - { title: "Operacionalizar a queixa", desc: "de «é agressivo» para «joga objetos quando recebe demanda»", icon: "lucide:pencil" }
  - { title: "Registrar em ABC", desc: "vários episódios, por vários dias, por quem estava lá", icon: "lucide:clipboard-list" }
  - { title: "Procurar o padrão", desc: "que antecedente se repete? que consequência se repete?", icon: "lucide:search" }
  - { title: "Formular a hipótese", desc: "«o comportamento é mantido por…»", icon: "lucide:lightbulb" }
  - { title: "Testar mudando a contingência", desc: "a hipótese vale se o comportamento muda quando a consequência muda", icon: "lucide:flask-conical" }
---

---
layout: two-cols
kicker: O caso
title: Da hipótese ao plano
---

**Hipótese** — jogar objetos é mantido por **reforço negativo**: remove a demanda acadêmica.

<Callout tone="warn" icon="lucide:triangle-alert">
Tirar da sala <strong>funciona</strong>. É exatamente por isso que o comportamento se mantém: a punição pretendida é o reforçador real.
</Callout>

::right::

O plano ataca a função, não a forma:

<v-clicks>

- **Ensinar a resposta alternativa** — pedir pausa, e essa resposta produz a pausa
- **Não permitir a fuga** pelo comportamento problema — a demanda permanece
- **Ajustar a demanda** — dificuldade compatível com o repertório
- **Reforçar o engajamento** — atenção enquanto trabalha, não só quando explode

</v-clicks>

<!-- O v-click aqui é intencional: os quatro pontos formam a lógica do plano, e vale construir um de cada vez pedindo que a turma antecipe o próximo. -->

---
layout: define
kicker: O nome disso
term: Treino de comunicação funcional
definition: Ensinar uma resposta <span class="accent2">socialmente adequada</span> que produza a <span class="accent2">mesma consequência</span> do comportamento problema — de forma mais rápida e mais confiável.
points:
  - "Se pedir pausa não funcionar melhor que gritar, ele volta a gritar"
  - "A alternativa precisa ser mais eficiente, não apenas mais educada"
---

---
layout: stats
kicker: O que muda na prática
title: Duas semanas de registro, mesma turma
columns: 3
stats:
  - { value: 11, label: episódios na linha de base, tone: bad, icon: "lucide:trending-up" }
  - { value: 3, label: episódios após o plano, tone: good, icon: "lucide:trending-down" }
  - { value: 24, label: pedidos de pausa emitidos, tone: info, icon: "lucide:message-square" }
---

<!-- Números ilustrativos, feitos para a aula — deixe isso claro. O ponto é a forma do dado: contagem por período, não impressão clínica. -->

---
layout: two-cols
kicker: Cuidados
title: Onde a análise funcional costuma falhar
---

<Callout tone="bad" icon="lucide:x">
<strong>Registrar interpretação.</strong> «Ficou frustrado» não é comportamento. «Fechou o punho e gritou» é.
</Callout>

<Callout tone="bad" icon="lucide:x">
<strong>Um episódio só.</strong> Sem repetição não há padrão — só uma história.
</Callout>

::right::

<Callout tone="bad" icon="lucide:x">
<strong>Esquecer o antecedente distante.</strong> Dormiu mal, não almoçou, brigou em casa — mudam o valor das consequências.
</Callout>

<Callout tone="good" icon="lucide:check">
<strong>Tratar a hipótese como hipótese.</strong> Ela vale enquanto o dado sustentar; mudou o dado, revise.
</Callout>

<Tags :items="['Descrever', 'Repetir', 'Contextualizar', 'Testar', 'Revisar']" />

---
layout: quote
quote: Quando dizemos que um homem se comporta de certo modo por causa das consequências que seu comportamento teve no passado, estamos apenas dizendo onde procurar as causas.
author: B. F. Skinner
---

---
layout: statement
kicker: A síntese do módulo
title: Descreva o que acontece antes e depois. A explicação está aí — não dentro da pessoa.
---

---
layout: end
title: Obrigado
subtitle: "Próximo módulo — comportamento verbal e controle por regras"
contact: Leitura · Skinner (1953), cap. 5 · Cooper, Heron & Heward, cap. 24–27
---
