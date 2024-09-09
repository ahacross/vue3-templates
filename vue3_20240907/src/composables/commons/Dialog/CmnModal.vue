<template>
  <div class="popup">
    <button class="close" @click="onClickClose">
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

const emits = defineEmits(['close'])

const isTitle = computed(() => !!useSlots().title)

const onClickClose = () => {
  emits('close', false)
}
</script>
