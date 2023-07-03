import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyLoad from 'vue3-lazyload'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
import loadingGIF from '@/assets/image/icon-loading.gif'
app.use(VueLazyLoad, {
    loading: loadingGIF
})

app.mount('#app')
