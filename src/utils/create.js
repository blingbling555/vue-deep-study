import Vue from "vue";
// 创建函数接收要创建组件定义
function create(Component, props) {
  // 组件构造函数获取
  const Ctor = Vue.extend(Component)
  // 获取组件实例
  const comp = new Ctor({propsData: props})
  comp.$mount()

  document.body.appendChild(comp.$el);

  comp.remove = () => {
    document.body.removeChild(comp.$el);
    comp.$destroy();
  };
  return comp;
}

// 暴露调⽤接⼝
export default create;
