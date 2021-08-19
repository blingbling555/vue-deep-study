export default {
  render(h) {
    // 标记当前router-view深度
    this.$vnode.data.rouerView = true
    let depth = 0
    let parent = this.$parent
    while (parent) {
      const vnodeData = parent.$vnode?.data
      if (vnodeData) {
        if (vnodeData.rouerView) {
        //  说明当前的parent是一个router-view
          depth++
        }
      }
      parent = parent.$parent
    }
    const route = this.$router.matched[depth]
    let component = null
    if (route) {
      component = route.component
    }
    //   动态获取current对应的组件
    return h(component)
  }
}
