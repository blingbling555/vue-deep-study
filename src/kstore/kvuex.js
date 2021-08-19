let Vue;

class Store {
  constructor (options) {
    this._mutations = options.mutations
    this._actions = options.actions
    this._wrappedGetters = options.getters

    // 定义computed选项
    const computed = Object.create(null)
    this.getters = Object.create(null)
    const store = this

    Object.keys(this._wrappedGetters).forEach(key => {
      // 获取用户定义的getters
      const fn = store._wrappedGetters[key]
      //  转换为computed的无参数的形式
      computed[key] = function() {
        return fn(store.state)
      }
    //  为getters定义只读属性
      Object.defineProperty(store.getters, key, {
        get: () => store._vm[key]
      })
    })

    this._vm = new Vue({
      data: {
        // 这个$$不会挂载到vue实例上
        $$state: options.state
      },
      computed
    })

    const { commit, dispatch } = store
    this.commit= function bindCommit() {
      return commit.call(store, ...arguments)
    }
    this.dispatch = function bindDispatch() {
      return dispatch.call(store, ...arguments)
    }
  }


  get state() {
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('不能直接修改state,修改请使用commit')
  }



  commit(type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.error('commit name 不存在')
      return
    }
    // 在这可以做一些拦截处理
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('dispatch name 不存在')
      return
    }
    entry(this, payload)
  }

}

function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}
