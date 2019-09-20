import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
// 实现整体组件的同一注册

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
