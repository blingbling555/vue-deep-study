<template>
  <div class="home">
    <Child />
    <Child />
  </div>
</template>

<script>
// @ is an alias to /src
import Child from '@/components/child.vue'

export default {
  name: 'child',
  components: {
    Child
  }
}
</script>
