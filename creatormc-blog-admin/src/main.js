import { createApp } from 'vue'

import ElementPlus from 'element-plus'                          //引入 ElementPlus
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  //引入 ElementPlus 的 Icon
import router from "./router";                                  //引入 VueRouter
import NProgress from 'nprogress'                               //引入 NProgress
import 'nprogress/nprogress.css'

import App from './App.vue'

NProgress.configure()

const app = createApp(App)

//全局注册组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(router)

//定义全局属性
app.config.globalProperties.$nprogress = NProgress  //页面顶部加载进度条

app.mount('#app')
