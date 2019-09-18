import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入ElementUI模块 引入样式 并使用
// 全局注册
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 引入ElementUI样式
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
