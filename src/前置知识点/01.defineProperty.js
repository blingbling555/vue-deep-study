
/*
val作用：
1. val形成了闭包，访问get时，返回这个值
2. val = newVal， 更新val，可以得到这次赋值了上次赋值 是否相同，相同则不更新
* */
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key, newVal, val)
        val = newVal
      }
    }
  })
}


const obj = {}
defineReactive(obj, 'foo', 'wl')
console.log(obj.foo)
obj.foo = 'zd'
obj.foo = 'ha'

