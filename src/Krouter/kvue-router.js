// 1. 实现一个插件：挂载$router,声明两个全局组件
// 2. 实现一个kVueRouter类，管理url变化
import KRouterLink from './krouter-link'
import kRouterView from './krouter-view'
let Vue;

class KVueRouter {
  /*
  *
  * */
  constructor (options) {
    // 保存选项
    this.$options = options
    // 设置响应式
    // Vue.util.defineReactive(this, 'current', '/')
    this.current = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'matched', [])

    // match方法可以递归遍历路由表，获得匹配关系的数组
    this.match()

    //  事件监听hashChange
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))

  // 对路由数组做预处理：转换为map
  //   this.routeMap = this.$options.routes.reduce((result, route) => {
  //     result[route.path] = route
  //     return result
  //   }, {})
  }
  match(routes) {
    routes = routes || this.$options.routes
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      // /about/info   可能匹配的前面部分/about
      if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
        this.matched.push(route)
        if (route.children?.length) {
          this.match(route.children)
        }
        return
      }
    }
  }
  onHashChange() {
    // 这个需要响应式，current变化，使用这个的组件会自动刷新
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.match()

  }
}

KVueRouter.install = function(_Vue) {
//  挂载$router
  Vue = _Vue
  /*
  * 任务1. 怎么获取根实例中的router选项？
  * 答：
  *   install是在Vue.use就会调用install,所以说只有一个方法,
  *   利用全局混入，在beforeCreate钩子里面获取选项
  * */
  Vue.mixin({
    beforeCreate() {
      /*
      * 默认会在所有组件都会执行这个混入，所以下面做一个判断
      * this.$options.router  这个只会在根实例才会存在
      * */
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router

      }

    }
  })
  //  任务2：声明两个全局组件
  Vue.component('RouterLink', KRouterLink)
  Vue.component('RouterView', kRouterView)


}

export default KVueRouter
