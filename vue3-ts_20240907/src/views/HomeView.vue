<script setup lang="ts">
import modalTemplate from '@/composables/commons/Dialog/modalTemplate.vue'

const onAlert = async () => {
  const result = await Dialog.alert({ msg: '야호 alert 이다' })
  console.log('onAlert', result)
}

const onConfirm = async () => {
  const result = await Dialog.confirm({ msg: '야호 confirm 이다' })
  console.log('onConfirm', result)
}

const onModal = async () => {
  const result = await Dialog.modal(modalTemplate, { kakao: 1234 })
  console.log('onModal', result)
}
</script>

<template>
  <main>
    <button @click="onAlert">alert</button>
    <button @click="onConfirm">confirm</button>
    <button @click="onModal">modal</button>
  </main>
</template>
