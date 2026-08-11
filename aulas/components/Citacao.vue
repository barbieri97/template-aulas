<!--
  <Citacao> — a palavra de outra pessoa, com crédito.

  <Citacao autor="Elizabeth Eisenstein" fonte="A revolução da imprensa, 1979">
  A prensa não criou a leitura. Ela criou o leitor que compara.
  </Citacao>

  Para uma frase de efeito ocupando o slide inteiro, o layout `destaque` serve
  melhor — este componente é para citação dentro de um slide com outras coisas.
-->
<script setup lang="ts">
defineProps<{
  autor?: string
  fonte?: string
}>()
</script>

<template>
  <figure class="ds-citacao">
    <blockquote><slot /></blockquote>
    <figcaption v-if="autor || fonte">
      <span v-if="autor" class="autor">{{ autor }}</span>
      <span v-if="fonte" class="fonte">{{ fonte }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.ds-citacao {
  margin: var(--ds-space-5) 0;
}

blockquote {
  margin: 0;
  padding: 0 0 0 var(--ds-space-5);
  border-left: var(--ds-border-thick) solid var(--ds-accent);
  font-family: var(--ds-font-serif);
  font-size: var(--ds-text-lg);
  font-style: italic;
  line-height: var(--ds-leading-normal);
}

blockquote :deep(p) {
  margin: 0;
  max-width: none;
}

figcaption {
  display: flex;
  align-items: baseline;
  gap: var(--ds-space-3);
  flex-wrap: wrap;
  margin-top: var(--ds-space-3);
  padding-left: calc(var(--ds-space-5) + var(--ds-border-thick));
  font-size: var(--ds-text-sm);
}

.autor {
  font-weight: 650;
}

.fonte {
  color: var(--ds-muted);
}
</style>
