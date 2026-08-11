<!--
  <Termo> — a definição formal de uma palavra. O bloco que a turma copia.

  <Termo palavra="Glúten" origem="do latim gluten, cola">
  Rede de proteínas que segura o gás produzido pela fermentação.
  </Termo>
-->
<script setup lang="ts">
defineProps<{
  palavra?: string
  origem?: string
}>()
</script>

<template>
  <dl class="ds-termo">
    <dt>
      {{ palavra }}
      <span v-if="origem" class="origem">{{ origem }}</span>
    </dt>
    <dd><slot /></dd>
  </dl>
</template>

<style scoped>
.ds-termo {
  margin: var(--ds-space-5) 0;
  padding: var(--ds-space-4) var(--ds-space-5);
  border: var(--ds-border) solid var(--ds-rule);
  border-top: var(--ds-border-thick) solid var(--ds-accent);
  border-radius: 0 0 var(--ds-radius) var(--ds-radius);
  background: var(--ds-surface);
}

dt {
  display: flex;
  align-items: baseline;
  gap: var(--ds-space-3);
  flex-wrap: wrap;
  font-size: var(--ds-text-xl);
  font-weight: 650;
  line-height: var(--ds-leading-tight);
}

.origem {
  color: var(--ds-muted);
  font-family: var(--ds-font-serif);
  font-size: var(--ds-text-base);
  font-style: italic;
  font-weight: 400;
}

dd {
  margin: var(--ds-space-3) 0 0;
  line-height: var(--ds-leading-loose);
}

dd :deep(> :first-child) {
  margin-top: 0;
}

dd :deep(> :last-child) {
  margin-bottom: 0;
}
</style>
