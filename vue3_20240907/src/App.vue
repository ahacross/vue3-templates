<template>
  <!-- keep-alive include: 캐시할 컴포넌트 이름, exclude: 캐시하지 않을 컴포넌트 이름, max 캐시 컴포넌트 최대 수를 지정 -->
  <keep-alive>
    <component :is="isLayout" />
  </keep-alive>
  <ModalsContainer />
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'
import DefaultLayout from '@/layouts/default/DefaultLayout.vue'
import EmptyLayout from '@/layouts/empty/EmptyLayout.vue'
import { onBeforeRouteLeave } from 'vue-router'

const layoutMap = new Map()
layoutMap.set('default', DefaultLayout)
layoutMap.set('empty', EmptyLayout)

window.$router = useRouter()
const $route = useRoute()
const isLayout = computed(() => layoutMap.get($route.meta?.layout || 'default'))
</script>

<style scoped></style>
