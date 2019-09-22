import Vue from 'vue'
import App from './App.vue'
import router from './permission'

// 引入全局注册的组件文件
import Component from './components/index'

import axios from 'axios'
// 在main.js中引入 一个index.less此样式文件的意义是 对于全局样式的设置
import './styles/index.less'

// 引入ElementUI模块 引入样式 并使用
// 全局注册
import ElementUI from 'element-ui'
// 引入ElementUI样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(Component)

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios// 将axios共享给所有实例

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
