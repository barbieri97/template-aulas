<!--
  <Pessoa> — quem é essa gente que a aula cita.

  <Pessoa nome="Louis Pasteur" papel="1822–1895 · químico" foto="/exemplo-avatar.svg">
  Mostrou que a fermentação é obra de organismos vivos.
  </Pessoa>

  Sem `foto`, entra um monograma com a inicial — assim uma grade de pessoas não
  fica torta quando você só tem retrato de algumas.
-->
<script setup lang="ts">
// `asset()` é obrigatório em caminho que chega por prop — sem ele a imagem some quando o
// site é publicado em subdiretório. O porquê está em aulas/lib/asset.ts.
import { asset } from '../lib/asset'

const props = defineProps<{
  nome?: string
  papel?: string
  foto?: string
}>()

const inicial = (props.nome ?? '?').trim().charAt(0).toUpperCase()
const src = asset(props.foto)
</script>

<template>
  <div class="ds-pessoa">
    <img v-if="src" :src="src" :alt="nome" class="retrato">
    <span v-else class="retrato monograma" aria-hidden="true">{{ inicial }}</span>

    <div class="texto">
      <p class="nome">{{ nome }}</p>
      <p v-if="papel" class="papel">{{ papel }}</p>
      <div class="corpo"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
.ds-pessoa {
  display: flex;
  align-items: flex-start;
  gap: var(--ds-space-4);
  margin: var(--ds-space-4) 0;
}

.retrato {
  flex: none;
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 50%;
  border: 2px solid var(--ds-rule);
  object-fit: cover;
}

.monograma {
  display: grid;
  place-items: center;
  border-color: var(--ds-accent);
  background: var(--ds-accent-wash);
  color: var(--ds-accent);
  font-size: var(--ds-text-xl);
  font-weight: 700;
}

.nome {
  margin: 0;
  font-size: var(--ds-text-lg);
  font-weight: 650;
  line-height: var(--ds-leading-tight);
}

.papel {
  margin: var(--ds-space-1) 0 0;
  color: var(--ds-muted);
  font-size: var(--ds-text-sm);
}

.corpo {
  margin-top: var(--ds-space-2);
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
