<template>
  <div class="home">
    <Child :msg="msg" />
    <KForm :model="formData" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="userName">
        <KInput v-model="formData.userName" placeholder="请输入用户名" type="text" />
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="formData.password" placeholder="请输入密码" type="password"/>
      </KFormItem>
    </KForm>
    <button @click="submitForm">提交</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Child from '@/components/child.vue'
import KInput from '@/KInput'
import KFormItem from '@/KFormItem'
import KForm from '@/KForm'
export default {
  name: 'child',
  components: {
    Child,
    KInput,
    KFormItem,
    KForm
  },
  data() {
    return {
      msg: '',
      formData: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{required: true, message: '用户名不能为空'}],
        password: [{required: true, message: '密码不能为空'}]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          alert("请求登录!");
        } else {
          alert("校验失败！");
        }
     });
   }
 }
}
</script>
