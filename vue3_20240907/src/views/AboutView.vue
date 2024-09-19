<template>
  <div>
    <h1>This is an about page</h1>

    <button @click="onAlert">alert</button>
    <button @click="onConfirm">confirm</button>
    <button @click="onModal">modal</button>
  </div>
</template>
<script setup>
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
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
