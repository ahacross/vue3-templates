<template>
  <div>
    <router-link to="/">홈</router-link>
    <router-link to="/about">about</router-link>

    <h1>This is an admin page</h1>

    <button @click="onAlert">alert</button>
    <button @click="onConfirm">confirm</button>
    <button @click="onModal">modal</button>

    <input type="text" v-model="kakao" />
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

const kakao = ref('')
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
