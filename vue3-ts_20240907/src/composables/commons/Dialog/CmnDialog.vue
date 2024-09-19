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

<script setup lang="ts">
import {VueFinalModal} from 'vue-final-modal'

defineProps<{
  type: string
  title: string
  content: string
  confirmTxt: string
  cancelTxt: string
  close: (val: boolean | object | number | string | Event) => void
}>()
</script>
