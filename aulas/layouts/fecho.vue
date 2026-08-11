<!--
  fecho — o último slide: o que fica, o que vem, onde ler mais.

  ---
  layout: fecho
  title: O que fica
  pontos:
    - A fermentação é uma troca de tempo por sabor
    - Temperatura muda o resultado mais que a receita
  proximo: Aula 04 — por que o pão endurece
  ---

  `title`, cada item de `pontos` e `proximo` aceitam HTML. O slot é o lugar
  das referências (uma lista markdown normal cai bem).
-->
<script setup lang="ts">
// `title` chega pelo objeto `frontmatter`, não como prop — ver o comentário em capa.vue.
const props = defineProps<{
  kicker?: string
  pontos?: string[]
  proximo?: string
  frontmatter?: Record<string, any>
}>()

const title = props.frontmatter?.title
</script>

<template>
  <div class="slidev-layout ds-fecho">
    <div>
      <p v-if="kicker" class="ds-kicker" v-html="kicker" />
      <h1 v-if="title" v-html="title" />

      <ul v-if="pontos?.length" class="pontos">
        <li v-for="(ponto, i) in pontos" :key="i" v-html="ponto" />
      </ul>

      <div class="extra"><slot /></div>
    </div>

    <p v-if="proximo" class="proximo">
      <span class="ds-kicker">a seguir</span>
      <span v-html="proximo" />
    </p>
  </div>
</template>

<style scoped>
.ds-fecho {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.pontos {
  margin: var(--ds-space-5) 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: var(--ds-space-3);
}

.pontos li {
  padding-left: var(--ds-space-5);
  border-left: var(--ds-border-thick) solid var(--ds-accent);
  font-size: var(--ds-text-lg);
  line-height: var(--ds-leading-normal);
}

.extra:not(:empty) {
  margin-top: var(--ds-space-6);
  font-size: var(--ds-text-sm);
  color: var(--ds-muted);
}

.proximo {
  margin: 0;
  padding-top: var(--ds-space-4);
  border-top: var(--ds-border) solid var(--ds-rule);
  font-size: var(--ds-text-lg);
  font-weight: 600;
  max-width: none;
}

.proximo .ds-kicker {
  display: block;
}
</style>
