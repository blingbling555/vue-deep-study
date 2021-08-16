import Vue from "vue";
// 创建函数接收要创建组件定义
function create(Component, props) {
  debugger

// 创建⼀个Vue新实例
  const vm = new Vue({
    render(h) {
      // render函数将传⼊组件配置对象转换为虚拟dom
      return h(Component, { props });
    }
  }).$mount(); //执⾏挂载函数，但未指定挂载⽬标，表示只执⾏初始化⼯作
  // 将 ⽣ 成 dom 元 素 追 加 ⾄ body
   document.body.appendChild(vm.$el);

  // 给组件实例添加销毁⽅法
  const comp = vm.$children[0];
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  return comp;
}

// 暴露调⽤接⼝
export default create;
