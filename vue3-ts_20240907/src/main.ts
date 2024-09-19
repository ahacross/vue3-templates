import './assets/main.css'
import 'vue-final-modal/style.css'
import './composables/commons/Dialog/assets/vfm.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import {createVfm} from 'vue-final-modal'

import App from './App.vue'
import router from './router'
import cmnModal from '@/composables/commons/Dialog/CmnModal.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVfm())
app.component('CmnModal', cmnModal)

app.mount('#app')
