<template>
  <el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>

    <!-- 表单 -->
    <el-form style="margin-left:100px" label-width="100px">
      <el-form-item label="标题:" prop="title">
        <el-input style="width:400px"></el-input>
      </el-form-item>

      <el-form-item label="内容:" prop="content">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="封面:" prop="cover">
        <el-radio-group>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="频道:" prop="channel_id">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">发布文章</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道
      })
    }
  },
  created () {
    this.getChannels() // 获取频道
  }
}
</script>

<style>
</style>
