import Vue, { createApp } from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import App from '@/App.vue'
import router from '@/router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

app.use(router)
Vue.use(BootstrapVue)

app.mount('#app')