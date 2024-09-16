import './assets/main.css'
import 'vue-final-modal/style.css'
import './composables/commons/Dialog/assets/vfm.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import {createVfm} from 'vue-final-modal'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVfm())

app.mount('#app')
