// 统一注入token
// 负责对axios进行处理

import axios from 'axios'
import { Message } from 'element-ui'
import router from '../permission'
import jsonBig from 'json-bigint'
axios.defaults.transformResponse = [function (data) {
  return jsonBig.parse(data)
}]

// 将地址的常态值配置给baseURL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 请求拦截 请求到达后台之前拦截 并统一注入token

axios.interceptors.request.use(function (config) {
  // 获取token
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers['Authorization'] = `Bearer ${token}` // 全局统一注入token 到headers属性 因为所有接口要求的token格式是一样的

  return config
}, function (error) {
  // 对请求失败做处理

  return Promise.reject(error)
})

// 响应拦截 响应数据回来到达then方法之前拦截

axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  //   return Promise.reject(error)
  let status = error.response.status // 获取失败状态码
  let message = '未知错误'

  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token 未携带或已经过期'
      break

    case 507:
      message = '服务器数据库异常'
      break

    case 401:
      message = 'token过期或未传'
      window.localStorage.clear() // 清除缓存
      router.push('/login')
      break

    case 404:
      message = '手机号不正确'
      break

    default:
      break
  }
  Message({ message })
  //   希望在异常处理函数中将所有的错误都处理完毕  不再进入catch 终止错误
  return new Promise(function () {}) // 终止当前的错误
})

// export default axios 方法一
// 导出一个对象  方法二
export default {
  install (Vue) {
    Vue.prototype.$axios = axios// 将axios共享给所有实例
  }
}
