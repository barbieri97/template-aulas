<!--
  <Nota> — a caixa de aviso. O que não é o fio da aula, mas não pode passar batido.

  <Nota tipo="alerta" titulo="Cuidado">
  Fermento químico e fermento biológico não são a mesma coisa.
  </Nota>

  tipo: info (padrão) · ok · alerta · erro
-->
<script setup lang="ts">
withDefaults(defineProps<{
  tipo?: 'info' | 'ok' | 'alerta' | 'erro'
  titulo?: string
}>(), { tipo: 'info' })
</script>

<template>
  <aside class="ds-nota" :class="tipo">
    <p v-if="titulo" class="titulo">{{ titulo }}</p>
    <div class="corpo"><slot /></div>
  </aside>
</template>

<style scoped>
/* `--cor` é o único ponto de variação entre os quatro tipos: a borda, o título
   e o fundo saem todos dela. */
.ds-nota {
  --cor: var(--ds-accent);
  margin: var(--ds-space-4) 0;
  padding: var(--ds-space-4) var(--ds-space-5);
  border-left: var(--ds-border-thick) solid var(--cor);
  border-radius: 0 var(--ds-radius) var(--ds-radius) 0;
  background: var(--ds-ink-wash);
}

.ds-nota.ok {
  --cor: var(--ds-ok);
}

.ds-nota.alerta {
  --cor: var(--ds-warn);
}

.ds-nota.erro {
  --cor: var(--ds-danger);
}

.titulo {
  margin: 0 0 var(--ds-space-2);
  color: var(--cor);
  font-size: var(--ds-text-xs);
  font-weight: 700;
  letter-spacing: var(--ds-tracking-kicker);
  text-transform: uppercase;
}

.corpo :deep(> :first-child) {
  margin-top: 0;
}

.corpo :deep(> :last-child) {
  margin-bottom: 0;
}
</style>
