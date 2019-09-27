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
        <!--v-model="formData.status"的值来源于el-radio的 labei属性  -->
        <el-radio-group v-model="formData.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 频道列表 -->
      <el-form-item label="频道列表 :">
        <el-select placeholder="请选择" @change="changeCondition" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <!-- 时间选择 -->
      <el-form-item label="时间选择 :">
        <div class="block">
          <!-- value-format="yyyy-MM-dd" 指定绑定值得格式 -->
          <el-date-picker
            @change="changeCondition"
            v-model="formData.date"
            type="daterange"
            range-separator="-"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-form-item>
    </el-form>

    <!-- 主体内容 -->
    <!-- 总条数 -->
    <div class="total">共找到{{page.total}}条符合条件的内容</div>
    <!-- 布局 -->
    <!-- 因为id是大数字类型 所以要toString() -->
    <div class="artcles-item" v-for="item in list" :key="item.id.toString()">
      <!-- 左侧 -->
      <div class="left">
        <img :src="item.cover.images.length?item.cover.images[0]:defaultImg " alt />
        <div class="info">
          <span class="title">{{item.title}}</span>
          <el-tag class="status" :type="item.status|statusType">{{item.status|statusText}}</el-tag>
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <span class="first" @click="goEdit(item.id)">
          <i class="el-icon-edit"></i>修改
        </span>
        <span @click="delArticle(item.id)">
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>

    <!-- 分页组件 -->
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 接收内容列表数据
      defaultImg: require('../../assets/imgs/homea.jpg'), // 将图片地址转为base64
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      formData: {
        //   如果不写的话没有默认值 所以先写一个数字
        status: 5, // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
        channel_id: null, // 频道id
        date: []
      },
      channels: [] // 定义一个频道数组用来接收数据
    }
  },
  methods: {
    // 去编辑页面
    goEdit (id) {
      // d动态路由传参 由于id是大数字类型 所以需要toString 转成字符串
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    // 删除文章内容
    delArticle (id) {
      // 要先询问是否删除
      this.$confirm('请问您是否要删除改文章?').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.queryArticles()
        })
      })
    },
    queryArticles () {
      // formdata中的值是最新值
      // 组装请求参数
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null,
        end_pubdate:
          this.formData.date.length > 1 ? this.formData.date[1] : null,
        channel_id: this.formData.channel_id, // 频道id
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    // 状态改变事件
    changeCondition () {
      // 条件改变时页数要回第一页
      this.page.currentPage = 1
      this.queryArticles()
    },
    //   获取文章频道 列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取channels
      })
    },
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage // 赋值最新页码
      this.queryArticles()
    },
    // 获取内容列表并渲染
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 获取文章列表并赋值
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getArticles() // 获取内容
    this.getChannels() // 获取频道
  },
  filters: {
    //   定义一个过滤器
    // 过滤器的第一个参数 永远是前面传过来的值

    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    // 处理状态的显示样式
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.total {
  border-bottom: 1px dashed #ccc;
  height: 50px;
  line-height: 50px;
}
.artcles-item {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px solid #f2f3f5;
  .left {
    display: flex;
    img {
      width: 180px;
      height: 130px;
      border-radius: 4px;
    }
    .info {
      height: 130px;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      margin-left: 10px;
      .date {
        color: #999;
        font-size: 12px;
      }
      .title {
        font-size: 14px;
      }
      .status {
        width: 70px;
        text-align: center;
      }
    }
  }
  .right {
    font-size: 12px;
    margin-right: 8px;
    cursor: pointer;
    .first {
      padding-right: 10px;
    }
  }
}
</style>
