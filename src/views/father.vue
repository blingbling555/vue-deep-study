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
    <div >显示store的state里面的值 {{ $store.state.counter }}</div>
    <div @click="$store.commit('updateCounter', 12)">commit调用</div>
    <div @click="$store.dispatch('dispatchCounter', 200)">dispatch调用</div>
    <div>显示store的getters里面的值 {{ $store.getters.doubleCounter }}</div>
    <button @click="submitForm">提交</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Child from '@/components/child.vue'
import KInput from '@/KForm/KInput'
import KFormItem from '@/KForm/KFormItem'
import KForm from '@/KForm/KForm'
import create from "@/utils/create";
import Notice from "@/components/Notice";
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
  mounted () {
    console.log(this.$store)
    setTimeout(() => {
      this.$store.commit('updateCounter', this.$store.state.counter + 1)
    }, 3000)
  },
  methods: {
    submitForm() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          const notice = create(Notice, {
            title: "社会你杨哥喊你来搬砖",
            message: valid ? "请求登录!" : "校验失败!",
            duration: 1000
          });
          notice.show();
        } else {
          alert("校验失败！");
        }
     });
   }
 }
}
</script>
