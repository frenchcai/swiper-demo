import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import fixMobile from './utils/fixMobile'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(fixMobile)
app.mount('#app')
