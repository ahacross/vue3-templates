<template>
  <VueFinalModal content-transition="vfm-fade" overlay-transition="vfm-fade">
    <CmnModal @close="onClose(false)">
      <template #title> {{ title }} </template>
      <slot />
      <template #buttons>
        <button v-if="type === 'confirm'" class="point" @click="onClose(true)">
          {{ confirmTxt }}
        </button>
        <button @click="onClose(false)">{{ cancelTxt }}</button>
      </template>
    </CmnModal>
  </VueFinalModal>
</template>

<script setup lang="ts">
import {VueFinalModal} from 'vue-final-modal'
import CmnModal from './CmnModal.vue'
import {useModalClose} from './Dialog'

const emits = defineEmits(['cancel'])
const { onClose } = useModalClose(emits)
defineProps({
  type: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  confirmTxt: {
    type: String
  },
  cancelTxt: {
    type: String
  }
})
</script>
