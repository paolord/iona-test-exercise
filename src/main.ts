// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(router)

// app.mount('#app')

import Vue, { createApp } from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from '@/App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

app.use(router)
Vue.use(BootstrapVue)

app.mount('#app')