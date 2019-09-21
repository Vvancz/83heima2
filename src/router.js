import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home/index.vue' // 路由级组件
import Home from './views/home/' // 路由级组件

import Main from './views/home/main.vue'
import Login from './views/login/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // 一级路由
    {
      path: '/',
      // 重定向到home下
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '', component: Main }
      ]
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    // 按需加载
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
