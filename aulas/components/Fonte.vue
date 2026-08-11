<!--
  <Fonte> — o crédito no pé do slide, ancorado embaixo à esquerda.

  <Fonte>IBGE, <em>Censo 2022</em> · gráfico refeito pela autora</Fonte>

  Fica em `position: absolute`, então não empurra o conteúdo: pode aparecer em
  qualquer posição do markdown do slide.
-->
<template>
  <p class="ds-fonte">
    <slot />
  </p>
</template>

<style scoped>
.ds-fonte {
  position: absolute;
  left: 3.2rem;
  right: 3.2rem;
  bottom: 1.4rem;
  margin: 0;
  max-width: none;
  color: var(--ds-muted);
  font-size: var(--ds-text-xs);
  line-height: var(--ds-leading-normal);
}
</style>
