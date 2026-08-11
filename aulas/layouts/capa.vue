<!--
  capa — o primeiro slide de uma aula.

  ---
  layout: capa
  kicker: Módulo 1 · Oficina
  subtitle: A pergunta que a aula responde.
  meta: 12 de março · sala 204
  ---

  `title` costuma vir do headmatter (no primeiro slide o bloco é headmatter e
  frontmatter ao mesmo tempo) — não repita o campo.
  `kicker`, `subtitle` e `meta` aceitam HTML.
-->
<script setup lang="ts">
// `title` é campo reservado do Slidev: ele o usa para o índice e NÃO o repassa como prop.
// O jeito de lê-lo é pelo objeto `frontmatter`, que chega inteiro em todo layout.
// Ver docs/design-system.md → "Os campos que o Slidev não entrega".
const props = defineProps<{
  kicker?: string
  subtitle?: string
  meta?: string
  frontmatter?: Record<string, any>
}>()

const title = props.frontmatter?.title
</script>

<template>
  <div class="slidev-layout ds-capa">
    <p v-if="kicker" class="ds-kicker" v-html="kicker" />
    <h1 v-if="title" v-html="title" />
    <div class="ds-rule" />
    <p v-if="subtitle" class="ds-lead" v-html="subtitle" />
    <div class="corpo"><slot /></div>
    <p v-if="meta" class="meta ds-small" v-html="meta" />
  </div>
</template>

<style scoped>
.ds-capa {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

/* O título da capa é o maior tipo do deck — é o único lugar que usa o 3xl. */
.ds-capa :deep(h1) {
  margin: 0;
  font-size: var(--ds-text-3xl);
}

.corpo:not(:empty) {
  margin-top: var(--ds-space-5);
}

.meta {
  position: absolute;
  bottom: var(--ds-space-6);
  left: 3.2rem;
  right: 3.2rem;
  margin: 0;
  padding-top: var(--ds-space-3);
  border-top: var(--ds-border) solid var(--ds-rule);
}
</style>
