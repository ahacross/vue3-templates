<template>
  <!-- keep-alive include: 캐시할 컴포넌트 이름, exclude: 캐시하지 않을 컴포넌트 이름, max 캐시 컴포넌트 최대 수를 지정 -->
  <keep-alive>
    <component :is="layoutComponent">
      <router-view />
    </component>
  </keep-alive>

  <ModalsContainer />
</template>

<script setup>
import layouts from '@/layouts/layouts.js'
import { ModalsContainer } from 'vue-final-modal'

const route = useRoute()
const layoutComponent = computed(() => layouts[route.meta?.layout || 'default'])
</script>
