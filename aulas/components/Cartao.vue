<!--
  <Cartao> — um bloco de conteúdo com título. Um conceito por cartão.

  <Cartao rotulo="passo 1" titulo="Misturar" destaque>
  Farinha e água, só. Descansa 30 minutos.
  </Cartao>

  `destaque` (booleano) pinta o cartão com o accent — use em no máximo um por
  grade, senão nenhum se destaca.
-->
<script setup lang="ts">
defineProps<{
  rotulo?: string
  titulo?: string
  destaque?: boolean
}>()
</script>

<template>
  <div class="ds-cartao" :class="{ destaque }">
    <p v-if="rotulo" class="rotulo">{{ rotulo }}</p>
    <p v-if="titulo" class="titulo">{{ titulo }}</p>
    <div class="corpo"><slot /></div>
  </div>
</template>

<style scoped>
.ds-cartao {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-2);
  padding: var(--ds-space-4) var(--ds-space-5);
  border: var(--ds-border) solid var(--ds-rule);
  border-radius: var(--ds-radius);
  background: var(--ds-surface);
  box-shadow: var(--ds-shadow);
}

.ds-cartao.destaque {
  border-color: var(--ds-accent);
  background: var(--ds-accent-wash);
}

.rotulo {
  margin: 0;
  color: var(--ds-accent);
  font-size: var(--ds-text-xs);
  font-weight: 700;
  letter-spacing: var(--ds-tracking-kicker);
  text-transform: uppercase;
}

.titulo {
  margin: 0;
  font-size: var(--ds-text-lg);
  font-weight: 650;
  line-height: var(--ds-leading-tight);
}

.corpo {
  color: var(--ds-muted);
  font-size: var(--ds-text-sm);
  line-height: var(--ds-leading-normal);
}

.corpo :deep(> :first-child) {
  margin-top: 0;
}

.corpo :deep(> :last-child) {
  margin-bottom: 0;
}
</style>
