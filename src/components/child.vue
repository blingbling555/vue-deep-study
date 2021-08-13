<template>
  <div>
    <button @click="sayHi">say hi</button>
    <div>{{ $attrs.msg}}</div>
  </div>
</template>

<script>
export default {
  mounted () {
    // 监听事件
    this.$parent.$on('foo', msg => {
      console.log(msg)
    })
  },
  methods: {
    sayHi () {
      // 派发着和监听者是同一个
      this.$parent.$emit('foo', '执行了')
    }
  }
}
</script>
