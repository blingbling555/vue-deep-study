<template>
  <div>
  <!--    1. label标签-->
    <label v-if="label">{{ label }}</label>
  <!--    2. 插槽  -->
    <slot></slot>
  <!--    3. 显示错误信息-->
    <span v-if="error" style="color: red;">{{ error }}</span>
  </div>
</template>

<script>
/*
* label: '显示名称‘
* prop: 不是必填，主要用来做检验
* */
import emitter from '@/mixins/emitter'
import Schema from "async-validator";
export default {
  name: "KFormItem",
  componentName: 'KFormItem',
  mixins: [emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: String
  },
  data() {
    return {
      error: ''
    }
  },
  mounted () {
    this.$on('validate', () => { this.validate() })

    if (this.prop) {
      //  派发事件通知Kform,新增一个KFormItem实例
      this.dispatch('KForm', 'kkb.form.addField',[this])
    }

  },
  destroyed () {
    if (this.prop) {
      // 派发事件通知Kform,移除一个KFormItem实例
      this.dispatch('kkb.form.removeField', 'KForm', [this])
    }
  },
  methods: {
    validate () {
      // 获取对应FormItem校验规则
      const rules = this.form.rules[this.prop];
      // 获取校验值
      const value = this.form.model[this.prop];
      // 校验描述对象
      const descriptor = { [this.prop]: rules };
      // 创建校验器
      const schema = new Schema(descriptor);
      // 返回Promise，没有触发catch就说明验证通过
      return new Promise((resolve, reject) => {
        schema.validate({ [this.prop]: value }, errors => {
          if (errors) {
            // 将错误信息显示
            this.error = errors[0].message;
            reject()
          } else {
            // 校验通过
            this.error = "";
            resolve()
          }
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
