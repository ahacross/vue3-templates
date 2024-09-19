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
<script setup>
import ImgClose from './assets/close.svg'

defineProps({
  close: Function
})

const isTitle = computed(() => !!useSlots().title)
</script>
