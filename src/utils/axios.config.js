// 统一注入token
// 负责对axios进行处理

import axios from 'axios'
// 将地址的常态值配置给baseURL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.interceptors.request.use(function (config) {
  // 获取token
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers['Authorization'] = `Bearer ${token}` // 全局统一注入token 到headers属性 因为所有接口要求的token格式是一样的

  return config
}, function (error) {
  // 对请求失败做处理

  return Promise.reject(error)
})

// export default axios 方法一
// 导出一个对象  方法二
export default {
  install (Vue) {
    Vue.prototype.$axios = axios// 将axios共享给所有实例
  }
}
