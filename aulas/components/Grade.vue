<!--
  <Grade> — a caixa que organiza <Cartao> (ou qualquer coisa) em colunas.

  <Grade :cols="3">
    <Cartao titulo="Farinha">Estrutura.</Cartao>
    <Cartao titulo="Água">Movimento.</Cartao>
    <Cartao titulo="Sal">Freio.</Cartao>
  </Grade>

  `:cols` precisa dos dois-pontos — sem eles o Vue passa a string "3".
-->
<script setup lang="ts">
withDefaults(defineProps<{ cols?: number }>(), { cols: 2 })
</script>

<template>
  <div class="ds-grade" :style="{ '--ds-cols': cols }">
    <slot />
  </div>
</template>

<style scoped>
.ds-grade {
  display: grid;
  gap: var(--ds-space-4);
  grid-template-columns: repeat(var(--ds-cols, 2), minmax(0, 1fr));
  align-items: stretch;
  margin: var(--ds-space-5) 0;
}
</style>
