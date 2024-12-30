import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import funcPlugins from './plugins/func'
import objPlugins from './plugins/obj'
import 'bootstrap/dist/js/bootstrap.js'
import person from './plugins/person'
import globalComponents from './plugins/global-components'
// import focus from './directives/focus'
import globalDirectives from './plugins/global-directives'
import dayjs from './plugins/dayjs'

const app = createApp(App)
// app.directive('focus', focus)
app.use(funcPlugins)
app.use(globalComponents)
app.use(globalDirectives)
app.use(objPlugins, { name: '짐코딩' })
app.use(router)
app.use(person, { name: '홍길동' })
app.use(dayjs)
app.mount('#app')
