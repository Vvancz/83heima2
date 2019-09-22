<template>
  <div class="login">
    <!--
      card这个组件有header和body两个插槽 不用自己定义 elementUI已经定义好了
    -->
    <!-- 使用elementUI组件 -->
    <el-card class="login-card">
      <!-- 匿名插槽 -->
      <div class="title">
        <img src="../../assets/imgs/logo_index.png" alt />
      </div>
      <!-- 表单=>el-form包裹 -->
      <!-- 数据校验el-form 绑定model  绑定rules规则 -->
      <!-- ref="myForm"获取整个el-form的组件实例 -->
      <el-form style="margin-top:20px" :model="loginForm" :rules="loginRules" ref="myForm">
        <!--el-form-item prop属性 绑定 下面表单组件的字段名 -->
        <el-form-item prop="mobile">
          <!-- 表单域中可以放置各种类型的表单控件：input select等 -->
          <!-- 手机号 -->
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <!-- 验证码 -->
          <el-input style="width:65%" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <!-- 发送验证码 -->
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="agree">
          <!-- 同意选项 -->
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <!-- 登录按钮 -->
          <!-- 注册点击事件 -->
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var validator = function (rule, value, callback) {
      // 第一种写法：
      // if (value) {
      //   // 就是正确
      //   // 正确是因为勾选了协议
      //   callback()
      // } else {
      //   // 如果value为false
      //   // 不正确是因为没勾选协议
      //   callback(new Error('必须同意用户协议和隐私条款'))
      // }

      // 第二种写法：三元表达式
      value ? callback() : callback(new Error('必须同意用户协议和隐私条款'))
    }
    return {
      // 表单数据是一个对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      // 登录规则集合对象
      // 决定校验规则 key(要校验的字段名):value(数组)
      //  mobile是对象数组  一个对象就是一个校验规则
      // required如果为true就表示该字段必填 如果不填就会提示消息
      // 前面对象是校验必填 后面是校验规则
      loginRules: {
        mobile: [
          { required: true, message: '请您输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [
          { required: true, message: '请您输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入合法的验证码' }
        ],
        // 通过自定义形式校验 validator自定义校验函数
        agree: [
          {
            validator
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 获取对象实例this.$refs.myForm
      // validate 校验整个表单的方法
      this.$refs.myForm.validate((isOk) => {
        // 只有一切的校验通过之后才会进入这里面
        if (isOk) {
          // console.log('校验成功')
          // 在校验通过之后去请求
          // 成功进then 失败进catch
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            // 请求成功后进入then
            // console.log(result)
            // 将后台返回的token令牌存储到前端缓存中
            window.localStorage.setItem('user-token', result.data.token)
            // 用编程式导航跳到主页
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/imgs/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
