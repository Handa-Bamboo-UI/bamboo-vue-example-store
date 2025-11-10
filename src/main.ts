import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import { router } from './router'
import store from './store'
import './router/premission'
import 'nprogress/nprogress.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import permission from './directives/permission'

const app = createApp(App).use(ElementPlus).use(router).use(store).use(permission)
for (const name in ElementPlusIconsVue) {
  app.component(name, ElementPlusIconsVue[name as keyof typeof ElementPlusIconsVue])
}
app.mount('#app')