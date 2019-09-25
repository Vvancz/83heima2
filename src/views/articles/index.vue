<template>
  <el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>

    <!-- 搜索框 实际上是表单组成的 -->
    <el-form style="margin-left:50px">
        <!-- 文章状态 -->
      <el-form-item label="文章状态 :">
        <el-radio-group v-model="radio">
          <el-radio :label="3">全部</el-radio>
          <el-radio :label="6">草稿</el-radio>
          <el-radio :label="9">待审核</el-radio>
          <el-radio :label="9">审核通过</el-radio>
          <el-radio :label="9">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>

        <!-- 频道列表 -->
      <el-form-item label="频道列表 :">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

        <!-- 时间选择 -->
      <el-form-item label="时间选择 :">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {}
</script>

<style>
</style>
