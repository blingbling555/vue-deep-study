export default {
  render(h) {
    let component = this.$router.routeMap[this.$router.current]?.component;
    //   动态获取current对应的组件
    return h(component)
  }
}
