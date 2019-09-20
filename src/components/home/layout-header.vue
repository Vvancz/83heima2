<template>
  <el-row type="flex" justify="space-between" class="layout-header" align="middle">
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4">
      <img class="head-img" src="../../assets/imgs/avatar.jpg" alt />
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          维拉
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>GitHub地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
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
