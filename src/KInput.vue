<template>
  <div>
    <input :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  name: 'KInput',
  inheritAttrs: false, // 解决通过$attrs的属性，会在上面div便签上显示问题
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(e) {
      this.$parent.$emit('validate');
      this.$emit('input', e.target.value)
    }
  }

}
</script>

<style scoped>

</style>
