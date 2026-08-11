<!--
  figura — imagem de um lado, texto do outro.

  ---
  layout: figura
  imagem: /exemplo-figura.svg
  legenda: Duas séries medidas na mesma escala.
  lado: direita        # onde fica a IMAGEM (padrão: direita)
  ajuste: contain      # contain (padrão, mostra a figura inteira) | cover
  ---

  # O título vai no markdown, como em qualquer slide

  O caminho da imagem é absoluto e sem a pasta: `/arquivo.svg` procura em
  `aulas/public/arquivo.svg`. `legenda` aceita HTML.

  O campo se chama `imagem` e não `src` de propósito: `src` é reservado pelo Slidev
  (importa outro .md) e um slide que o usasse para imagem sumiria do deck, sem erro.
-->
<script setup lang="ts">
// `asset()` é obrigatório em caminho que chega por prop — sem ele a imagem some quando o
// site é publicado em subdiretório. O porquê está em aulas/lib/asset.ts.
import { asset } from '../lib/asset'

const props = withDefaults(defineProps<{
  imagem?: string
  legenda?: string
  lado?: 'direita' | 'esquerda'
  ajuste?: 'contain' | 'cover'
}>(), {
  lado: 'direita',
  ajuste: 'contain',
})

const arquivo = asset(props.imagem)
</script>

<template>
  <div class="slidev-layout ds-figura" :class="`img-${lado}`">
    <div class="texto"><slot /></div>
    <figure class="figura">
      <img v-if="arquivo" :src="arquivo" :style="{ objectFit: ajuste }" alt="">
      <figcaption v-if="legenda" class="ds-small" v-html="legenda" />
    </figure>
  </div>
</template>

<style scoped>
.ds-figura {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--ds-space-7);
  align-items: center;
  height: 100%;
}

/* A ordem visual muda; a ordem no DOM não — o texto continua vindo primeiro
   para quem lê com leitor de tela. */
.ds-figura.img-esquerda .texto {
  order: 2;
}

.figura {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-3);
  margin: 0;
  min-width: 0;
  max-height: 100%;
}

.figura img {
  width: 100%;
  max-height: 62vh;
  border-radius: var(--ds-radius);
}

figcaption {
  padding-left: var(--ds-space-3);
  border-left: 2px solid var(--ds-rule);
}
</style>
