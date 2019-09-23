<template>
    <el-card>
        <!-- 面包屑组件 -->
        <!-- slot="header"是给 el-card-->
        <bread-crumb slot="header">
        <!-- slot="title"是给面包屑的 -->
            <template slot="title">评论列表</template>
        </bread-crumb>
        <!-- 表格 -->
        <el-table :data="list">
            <el-table-column prop="title" label="标题" width="600px"></el-table-column>
            <el-table-column :formatter="formatter" align="center" prop="comment_status" label="评论状态">
            </el-table-column>
            <el-table-column align="center" prop="total_comment_count" label="总评论数"></el-table-column>
            <el-table-column align="center" prop="fans_comment_count" label="粉丝评论数"></el-table-column>
            <el-table-column align="center" label="操作">
              <el-button size="small" type="text">修改</el-button>
              <el-button size="small" type="text">打开评论</el-button>
            </el-table-column>

        </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        // params是路径参数也是query参数
        params: { response_type: 'comment' }
      }).then(result => {
        // 把返回的数据赋值给list
        this.list = result.data.results
      })
    },
    formatter (row, column, cellvalue, index) {
      return cellvalue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
