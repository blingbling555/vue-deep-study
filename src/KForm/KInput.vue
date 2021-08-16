<template>
  <div>
    <input :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'
export default {
  name: 'KInput',
  mixins: [emitter],
  inheritAttrs: false, // 解决通过$attrs的属性，会在上面div便签上显示问题
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(e) {
      // this.$parent.$emit('validate');
      this.$emit('input', e.target.value)
      this.dispatch('KFormItem', 'validate')
    }
  }

}
</script>

<style scoped>

</style>
