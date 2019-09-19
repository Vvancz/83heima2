<template>
  <!-- 先定义一个大容器 -->
  <el-container>
    <!-- 先放置一个左侧容器 -->
    <el-aside></el-aside>
    <el-container>
      <!-- 再放置一个右侧容器 -->
      <!-- 头部 -->
      <el-header></el-header>
      <!-- 中部 -->
      <el-main>
        <!-- 中部里面放二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style>
</style>
