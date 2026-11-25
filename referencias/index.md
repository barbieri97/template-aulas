---
title: Visão geral
aside: false
---

<script setup>
import { useData, withBase } from 'vitepress'
const { theme } = useData()

// A sidebar já é o índice de tudo (montada em .vitepress/config.mts a partir das pastas
// aula-NN/docs/). Aqui ela só é desenhada aberta, aula por aula.
const achatar = (itens, nivel = 0) => itens.flatMap((i) =>
  i.items ? [{ text: i.text, nivel }, ...achatar(i.items, nivel + 1)] : [{ ...i, nivel }])
</script>

# Visão geral

Material de referência de cada aula — o texto que embasa os slides. Cada aula tem a sua pasta
em `referencias/aula-NN/docs/`.

<div v-for="aula in theme.sidebar" :key="aula.text" class="aula">
  <h2>{{ aula.text }}</h2>
  <ul>
    <li v-for="item in achatar(aula.items)" :key="item.text + item.nivel" :style="{ marginLeft: item.nivel * 1.2 + 'rem' }">
      <a v-if="item.link" :href="withBase(item.link)">{{ item.text }}</a>
      <strong v-else>{{ item.text }}</strong>
    </li>
  </ul>
</div>

<p v-if="!theme.sidebar.length">Nenhuma aula ainda. Crie a primeira com <code>npm run nova-referencia -- 01</code>.</p>
