import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import funcPlugins from './plugins/func'
import objPlugins from './plugins/obj'
import 'bootstrap/dist/js/bootstrap.js'
import person from './plugins/person'

const app = createApp(App)
app.use(funcPlugins)
app.use(objPlugins, { name: '짐코딩' })
app.use(router)
app.use(person, { name: '홍길동' })
app.mount('#app')
