<template>
  <div class="home">
    <Child :msg="msg" />
  </div>
</template>

<script>
// @ is an alias to /src
import Child from '@/components/child.vue'

export default {
  name: 'child',
  components: {
    Child
  },
  data() {
    return {
      msg: 'father传递的'
    }
  },
  mounted () {
    setTimeout(() => {
      this.msg = '更改过后的'
    }, 3000)
  }
}
</script>
