<!--
  destaque — uma frase sozinha na tela. Pergunta que abre discussão, tese da
  aula, número que impressiona.

  ---
  layout: destaque
  kicker: A pergunta
  title: Por que o pão <span class="ds-em">cresce</span>?
  fonte: Chartier, <em>O gosto do pão</em>, 2012
  ---

  `title` e `fonte` aceitam HTML. Um slide, uma frase — se precisar de mais
  de duas linhas, o layout errado é este.
-->
<script setup lang="ts">
// `title` chega pelo objeto `frontmatter`, não como prop — ver o comentário em capa.vue.
const props = defineProps<{
  kicker?: string
  fonte?: string
  frontmatter?: Record<string, any>
}>()

const title = props.frontmatter?.title
</script>

<template>
  <div class="slidev-layout ds-destaque">
    <p v-if="kicker" class="ds-kicker" v-html="kicker" />
    <h1 v-if="title" v-html="title" />
    <div class="corpo"><slot /></div>
    <p v-if="fonte" class="ds-small fonte" v-html="fonte" />
  </div>
</template>

<style scoped>
.ds-destaque {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.ds-destaque :deep(h1) {
  max-width: 22ch;
  margin: 0;
  font-size: var(--ds-text-3xl);
  font-weight: 700;
  line-height: 1.08;
}

.corpo:not(:empty) {
  margin-top: var(--ds-space-5);
  max-width: 48ch;
}

.fonte {
  margin: var(--ds-space-6) 0 0;
}
</style>
