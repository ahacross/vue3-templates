<template>
  <div class="popup">
    <button class="close" @click="close">
      <img :src="ImgClose" alt="닫기" draggable="false" />
    </button>
    <div v-if="isTitle" class="popup-header">
      <span>
        <slot name="title" />
      </span>
    </div>
    <slot />
  </div>
  <div class="popup-actions">
    <slot name="buttons" />
  </div>
</template>
<script setup lang="ts">
import ImgClose from './assets/close.svg'

defineProps<{
  close: (val: boolean | object | number | string | Event) => void
}>()

const isTitle = computed(() => !!useSlots().title)
</script>
