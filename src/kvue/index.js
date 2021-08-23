function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // 每次遍历一个对象属性就创建一个Ob实例
  new Observer(obj)
}
const arrDefineList = ['push', 'pop', 'shift', 'splice', 'sort', 'reverse', 'unshift']
const watchers = []

function defineReactive(obj, key, val) {
  // 递归遍历，如果val本身是个对象
  observe(val)
  // 创建dep实例和key 一一对应
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.addDep(Dep.target)
      }
      // console.log('getter', key, val)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        // 解决赋值为一个新对象，对象里面不是响应式问题
        observe(newVal)
        // console.log('setter', key, newVal)
        val = newVal
        dep.notify()
      }
    }
  })
}
function proxy(vm, prop) {
  Object.keys(vm[prop]).forEach(key => {
    vm[key] = vm[prop][key]
    Object.defineProperty(vm, key, {
      get() {
        return vm[prop][key]
      },
      set(newVal) {
        vm[prop][key] = newVal
      }
    })
  })
}
class KVue {
  constructor (options) {
    this.$options = options;
    this.$data = this.$options.data;
  //  1. 响应式处理
    observe(this.$data)
  //  1.1. 数据代理
    proxy(this, '$data')
  //  2. 编译
    new Compile(options.el, this)
  }
}

// 分辨响应式数据对象是对象还是数组
class Observer {
  constructor (value) {
    this.value = value
    this.walk(value)
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
      if (!obj.__observe__) {
        obj.__observe__ = true
      }
    })
  }
}


// 编译器：解析模板中插值表达式或者指令
class Compile {
  // vm是kvue的实例用于初始化和更新页面
  // el是一个选择器，可以获取模板的dom用于解析
  constructor (el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    this.compile(this.$el)
  }
  // 更新方法
  update(node, exp, dir) {
    const fn = this[dir + 'Updater']
  //  初始化
    fn && fn(node, this.$vm[exp])
  //  更新
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }
  textUpdater(node, val) {
    node.textContent = val
  }
  htmlUpdater(node, val) {
    node.innerHTML = val
  }
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 元素类型
      if (this.isElement(node)) {
        // console.log('编译元素', node.nodeName)
        this.compileElement(node)
      } else if(this.isInter(node)) {
        // console.log('编译插值文本', node.textContent)
        this.compileText(node)
      }
    //  做递归
      if (node.childNodes?.length) {
        this.compile(node)
      }
    })
  }
  isElement(node) {
    return node.nodeType === 1
  }
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

//  编译插值文本
  compileText(node) {
    node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }

  // 编译元素节点:判断它的属性是否为k-xx,@xx
  compileElement(node) {
  //  获取节点属性
    let nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
    //  attr对象 {name, value}
      let attrName = attr.name
      let exp = attr.value
      // 如果是指令则获取指令的处理函数并执行
      if (this.isDir(attrName)) {
        let dirName = attrName.substring(2)
        this[dirName]?.(node, exp)
      }
    })
  }
  isDir(attrName) {
    return attrName.indexOf('k-') > -1
  }
//  k-text指令执行
  text(node, exp) {
    this.update(node, RegExp.$1, 'text')
  }

  //  k-html指令执行
  html(node, exp) {
    this.update(node, exp, 'html')
  }
}


// Watcher: 和模板中的依赖比如说{{}}和指令， 是1对1对应，如果某个key发生变化，则执行更新函数
class Watcher {
  constructor (vm, key, updater) {
    this.vm = vm
    this.key = key
    this.updater = updater
  //  和Dep建立关系
    Dep.target = this
    this.vm[this.key] // 触发get，可以做依赖收集
    Dep.target = null
  }
  // 更新方法是让Dep调用
  update() {
    this.updater.call(this.vm, this.vm[this.key])
  }
}

// 管理watcher
class Dep {
  constructor () {
    this.watchers = []
  }
  addDep(watcher) {
    this.watchers.push(watcher)
  }
  notify() {
    this.watchers.forEach(w => w.update())
  }
}
