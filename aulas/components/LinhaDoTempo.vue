<!--
  <LinhaDoTempo> — sequência com marcos. Serve para história e também para
  processo ("o que acontece em cada etapa").

  <LinhaDoTempo :itens="[
    { quando: '1450', o_que: 'Gutenberg', desc: 'tipos móveis na Europa' },
    { quando: '1501', o_que: 'Itálico', desc: 'Aldo Manúcio imprime em bolso' },
  ]" />

  `desc` é opcional. `o_que` e `desc` aceitam HTML.
-->
<script setup lang="ts">
defineProps<{
  itens?: { quando?: string, o_que?: string, desc?: string }[]
}>()
</script>

<template>
  <ol class="ds-linha">
    <li v-for="(item, i) in itens" :key="i">
      <span class="quando">{{ item.quando }}</span>
      <span class="texto">
        <span class="o-que" v-html="item.o_que" />
        <span v-if="item.desc" class="desc" v-html="item.desc" />
      </span>
    </li>
  </ol>
</template>

<style scoped>
/* O fio vertical é a borda esquerda da lista; cada bolinha é um ::before
   posicionado em cima dela. Sem pseudo-elemento no <li> não há como manter o
   alinhamento quando um item tem duas linhas de texto. */
.ds-linha {
  margin: var(--ds-space-5) 0;
  padding: 0 0 0 var(--ds-space-5);
  border-left: 2px solid var(--ds-rule);
  list-style: none;
  display: grid;
  gap: var(--ds-space-5);
}

.ds-linha li {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: var(--ds-space-4);
  margin: 0;
  padding: 0;
}

.ds-linha li::before {
  content: "";
  position: absolute;
  top: 0.45em;
  left: calc(-1 * var(--ds-space-5) - 7px);
  width: 12px;
  height: 12px;
  border: 2px solid var(--ds-bg);
  border-radius: 50%;
  background: var(--ds-accent);
}

/* Largura fixa, não `min-width`: com min-width um rótulo comprido ("0–10min de forno")
   empurra só a sua linha para a direita e a coluna dos títulos sai torta. */
.quando {
  flex: 0 0 6.5rem;
  color: var(--ds-accent);
  font-size: var(--ds-text-sm);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.texto {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-1);
}

.o-que {
  font-size: var(--ds-text-lg);
  font-weight: 600;
  line-height: var(--ds-leading-tight);
}

.desc {
  color: var(--ds-muted);
  font-size: var(--ds-text-sm);
}
</style>
