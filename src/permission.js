import router from './router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // 判断 是否是以/home开头 是就 拦截 进入判断 不是 就放行
  if (to.path.startsWith('/home')) {
    // 是/home开头 进入判断
    // 是否携带token 携带则放行 没携带则返回登录页
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
