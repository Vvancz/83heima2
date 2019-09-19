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
      <el-form style="margin-top:20px">
        <el-form-item>
          <!-- 表单域中可以放置各种类型的表单控件：input select等 -->
          <!-- 手机号 -->
          <el-input placeholder="手机号"></el-input>
        </el-form-item>

        <el-form-item>
          <!-- 验证码 -->
          <el-input style="width:65%" placeholder="验证码"></el-input>
          <!-- 发送验证码 -->
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>

        <el-form-item>
          <!-- 同意选项 -->
          <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <!-- 登录按钮 -->
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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
