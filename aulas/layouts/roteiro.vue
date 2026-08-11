<!--
  roteiro — o índice da aula, ou qualquer lista curta de tópico + explicação.

  ---
  layout: roteiro
  title: O caminho de hoje
  itens:
    - { tema: A massa, desc: farinha, água e tempo }
    - { tema: O fermento, desc: quem faz o gás }
    - { tema: O forno, desc: onde tudo trava }
  ---

  Cada item aceita `tema` e `desc` (os dois com HTML). Um item pode ser só uma
  string, e aí vira o `tema` sem descrição. `atual: 2` marca onde a aula está.
-->
<script setup lang="ts">
// `title` chega pelo objeto `frontmatter`, não como prop — ver o comentário em capa.vue.
const props = defineProps<{
  kicker?: string
  itens?: (string | { tema?: string, desc?: string })[]
  atual?: number
  frontmatter?: Record<string, any>
}>()

const title = props.frontmatter?.title

// Aceita `- item` e `- { tema, desc }` na mesma lista: normaliza antes de renderizar.
const itensNormalizados = (props.itens ?? []).map(item =>
  typeof item === 'string' ? { tema: item, desc: '' } : item,
)
</script>

<template>
  <div class="slidev-layout ds-roteiro">
    <p v-if="kicker" class="ds-kicker" v-html="kicker" />
    <h1 v-if="title" v-html="title" />

    <ol class="lista">
      <li
        v-for="(item, i) in itensNormalizados"
        :key="i"
        :class="{ atual: atual === i + 1 }"
      >
        <span class="num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="texto">
          <span class="tema" v-html="item.tema" />
          <span v-if="item.desc" class="desc" v-html="item.desc" />
        </span>
      </li>
    </ol>

    <slot />
  </div>
</template>

<style scoped>
.lista {
  display: grid;
  gap: var(--ds-space-2);
  margin: var(--ds-space-5) 0 0;
  padding: 0;
  list-style: none;
}

.lista li {
  display: flex;
  align-items: baseline;
  gap: var(--ds-space-4);
  margin: 0;
  padding: var(--ds-space-3) var(--ds-space-4);
  border-left: var(--ds-border-thick) solid transparent;
  border-radius: var(--ds-radius-sm);
}

/* O item da vez ganha a barra e o fundo; os outros ficam de fora, não apagados
   — o roteiro é para se localizar, não para esconder o resto. */
.lista li.atual {
  border-left-color: var(--ds-accent);
  background: var(--ds-accent-wash);
}

.num {
  color: var(--ds-accent);
  font-size: var(--ds-text-sm);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.texto {
  display: flex;
  align-items: baseline;
  gap: var(--ds-space-3);
  flex-wrap: wrap;
}

.tema {
  font-size: var(--ds-text-lg);
  font-weight: 600;
}

.desc {
  color: var(--ds-muted);
  font-size: var(--ds-text-base);
}
</style>
