<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'KForm',
  componentName: 'KForm',
  provide() {
    return {
      form: this // 将表单实例传递给后代
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.fileds = []
    this.$on('kkb.form.addField', (item) => {
      this.fileds.push(item)
    })
    this.$on('kkb.form.removeField', (item) => {
      this.fields?.splice?.(this.fields.indexOf(item), 1);
    })
  },
  methods: {
    validate(cb) {
      // 调⽤所有含有prop属性的⼦组件的validate⽅法并得到Promise数组
      const tasks = this.fileds.map(item => item.validate())
      // 所有任务必须全部成功才算校验通过，任⼀失败则校验失败
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
</script>

<style scoped>

</style>
