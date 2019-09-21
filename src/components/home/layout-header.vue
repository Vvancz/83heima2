<template>
  <el-row type="flex" justify="space-between" class="layout-header" align="middle">
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4">
      <img class="head-img" :src="userInfo.photo?userInfo.photo:defaultImg" alt />
      <el-dropdown trigger="click" @command="commomClick">
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">GitHub地址</el-dropdown-item>
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/imgs/avatar.jpg')
    }
  },
  methods: {
    getuserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { Authorization: `Bearer ${token}` }
      }).then(reuslt => {
        console.log(reuslt)
        this.userInfo = reuslt.data.data
      })
    },
    commomClick (key) {
      if (key === 'account') {
        // 跳转到个人账户信息
        this.$router.push('/home/account')
      } else if (key === 'git') {
        // 跳转到git
        window.location.href = 'https://github.com/'
      } else {
        // 退出
        // 删除令牌信息
        window.localStorage.clear()// 清除本项目的所有前端信息
        // 跳转到登录页
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getuserInfo()
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  height: 50px;
  //   line-height: 50px;
  .el-icon-s-unfold {
    font-size: 22px;
    //   vertical-align: middle;
  }
  .title {
    margin-left: 4px;
    vertical-align: top;
  }
  .head-img {
    border-radius: 50%;
    margin-right: 4px;
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }
}
</style>
