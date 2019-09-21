<template>
  <!-- 先定义一个大容器 -->
  <el-container>
    <!-- 先放置一个左侧容器 -->
    <el-aside style="width:200px;background-color: #323745;overflow: hidden;">
      <!-- 使用左侧导航组件 -->
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <!-- 再放置一个右侧容器 -->
      <!-- 头部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <!-- 中部 -->
      <el-main style="padding:0">
        <!-- 中部里面放二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 因为注册了全局的 所以这里可以删掉
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'

export default {
  // 因为注册了全局的 所以这里可以删掉
  // components: {
  //   'layout-aside': layoutAside,
  //   'layout-header': layoutHeader
  // }
}
</script>

<style>

</style>
