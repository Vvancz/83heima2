<template>
  <el-card v-loading="loading">
    <!-- 面包屑组件 -->
    <!-- slot="header"是给 el-card-->
    <bread-crumb slot="header">
      <!-- slot="title"是给面包屑的 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- 表格 -->
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="600px"></el-table-column>
      <el-table-column :formatter="formatter" align="center" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column align="center" prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column align="center" prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column align="center" label="操作">
        <!-- 作用域插槽用来接收 el-table-column的 数据 row/column/$index/store -->
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button
            size="small"
            type="text"
            @click="openOrclose(obj.row)"
            :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'}"
          >{{obj.row.comment_status ? '关闭评论' :'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  methods: {
    // 打开或者关闭 row当前这一行数据
    openOrclose (row) {
      // 询问是否要打开或关闭
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}这条评论吗?`, '提示').then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() }, // 路径参数
          data: { allow_comment: !row.comment_status } // body参数 调用状态和当前状态是反着的  所以要取反
        }).then(() => {
          // 成功一定会进入then
          this.getComment()
        })
      })
    },
    getComment () {
      this.loading = true // 显示遮罩
      this.$axios({
        url: '/articles',
        // params是路径参数也是query参数
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        // 把返回的数据赋值给list
        this.list = result.data.results
        // 把总条数  给分页组件的总条数
        this.page.total = result.data.total_count
        // 关闭遮罩
        this.loading = false
      })
    },
    formatter (row, column, cellvalue, index) {
      return cellvalue ? '正常' : '关闭'
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
