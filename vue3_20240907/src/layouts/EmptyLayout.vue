<template>
  <main>
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.name" />
      </keep-alive>
    </router-view>
  </main>
</template>
