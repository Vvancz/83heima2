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

    <!-- 主体内容 -->
    <!-- 总条数 -->
    <div class="total">共找到{{page.total}}条符合条件的内容</div>
    <!-- 布局 -->
    <div class="artcles-item" v-for="item in list" :key="item.id">
        <!-- 左侧 -->
        <div class="left">
            <img :src="item.cover.images.length?item.cover.images[0]:defaultImg " alt="">
            <div class="info">
                <span class="title">{{item.title}}</span>
                <el-tag class="status" type="item.status"></el-tag>
                <span class="date">{{item.pubdate}}</span>

            </div>
        </div>
        <!-- 右侧 -->
        <div class="right">
            <span class="first"><i class="el-icon-edit "></i>修改</span>
            <span><i class="el-icon-delete"></i>删除</span>

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
        @current-change="changePage">
      </el-pagination>
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
        status: 5 // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      }
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getArticles()
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
    this.getArticles()
  }
}
</script>

<style lang='less' scoped>
    .total{
        border-bottom: 1px dashed #ccc;
        height: 50px;
        line-height: 50px;
    }
    .artcles-item {
        display: flex;
        justify-content: space-between;
        padding: 20px 10px;
        border-bottom: 1px solid #f2f3f5;
        .left{
            display: flex;
            img {
                width: 180px;
                height: 130px;
                border-radius: 4px;
            }
            .info{
                height: 130px;
                display: flex;
                justify-content: space-around;
                flex-direction: column;
                margin-left: 10px;
                .date {
                color:#999;
                font-size:12px;
                }
                .title{
                    font-size: 14px;
                }
                .status{
                    width: 70px;
                    text-align: center;
                }
            }
        }
        .right{
            font-size: 12px;
            margin-right: 8px;
            cursor: pointer;
            .first{
                padding-right: 10px;
            }
        }
    }
</style>
