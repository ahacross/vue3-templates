import './assets/main.css'
import 'vue-final-modal/style.css'
import './composables/commons/Dialog/assets/vfm.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import { createVfm } from 'vue-final-modal'
import cmnModal from '@/composables/commons/Dialog/CmnModal.vue'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(createVfm())
app.component('CmnModal', cmnModal)

app.use(router)
app.mount('#app')
