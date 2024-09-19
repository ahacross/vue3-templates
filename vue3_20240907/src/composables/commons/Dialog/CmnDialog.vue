<template>
  <VueFinalModal content-transition="vfm-fade" overlay-transition="vfm-fade">
    <CmnModal :close="close">
      <template #title> {{ title }} </template>
      <slot />
      <template #buttons>
        <button v-if="type === 'confirm'" class="point" @click="close(true)">
          {{ confirmTxt }}
        </button>
        <button @click="close">{{ cancelTxt }}</button>
      </template>
    </CmnModal>
  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import CmnModal from './CmnModal.vue'

defineProps({
  type: String,
  title: String,
  content: String,
  confirmTxt: String,
  cancelTxt: String,
  close: Function
})
</script>
