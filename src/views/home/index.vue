<template>
  <!-- 先定义一个大容器 -->
  <el-container>
    <!-- 先放置一个左侧容器 -->
    <el-aside>
      <!-- 使用左侧导航组件 -->
      <layout-aside></layout-aside>
    </el-aside>
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
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>
</style>
