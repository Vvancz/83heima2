<template>
  <el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>

    <!-- 上传 -->
    <!--  http-request 自定义上传 -->
    <!-- <el-upload
      class="upload-pic"
      action=""
      :show-file-list="false"
      :http-request="uploadImg">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload> -->
    <el-upload class="upload-pic" action="" :http-request="uploadImg" :show-file-list="false">
      <el-button type="primary"> 上传图片 </el-button>
    </el-upload>

    <!-- tabs栏 -->
    <template>
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="全部素材" name="all">
          <div class="list-img">
            <el-card class="item-img" v-for="item in list" :key="item.id">
              <img :src="item.url" alt />
              <div class="icons">
                <i
                  :style="{color: item.is_collected ? 'red':'#black'}"
                  class="el-icon-star-on right"
                ></i>
                <i class="el-icon-delete-solid left"></i>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏素材" name="collect">
          <div class="list-img">
            <el-card class="item-img" v-for="item in list" :key="item.id">
              <img :src="item.url" alt />
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>

    <!-- 分页组件 -->
    <el-row type="flex" justify="center">
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
      activeName: 'all', // 默认选中全部
      list: [], // 定义一个list接受数据
      // 定义一个page对象 专门存放分页信息
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 上传图片 方法
    uploadImg (params) {
      // 声明一个表单
      const data = new FormData()
      // 往表单里加数据
      data.append('image', params.file)
      // 调用上传图片 素材接口
      this.$axios({
        url: '/user/images',
        method: 'post',
        // 这里传的是表单数据
        data
      }).then(() => {
        this.getMaterial()
        this.$message({
          message: '图片上传成功',
          type: 'success'
        })
      })
    },
    // 切换页签方法
    changeTab () {
      this.page.currentPage = 1 // 当页签切换时回到 数据的第一页
      this.getMaterial() // 向页面渲染数据重新加载
    },
    // 页码改变事件
    // newPage 是回调参数 当前页
    changePage (newPage) {
      this.page.currentPage = newPage // 获取当前页并赋值 将最新页码给currentPage
      this.getMaterial() // 重新渲染页面 获取最新数据
    },
    // 获取素材列表
    getMaterial () {
      this.$axios({
        url: '/user/images',
        // this.activeName === 'collect' 相当于去找收藏的数据
        // 如果不等相当于去找全部的数据
        // 第三种方法：
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count// 获取总条数 并赋值总条数
      })
    }
    // handleClick () {
    //   // 第一种方法：
    //   // if (this.activeName === 'all') {
    //   //   this.getMaterial(false)
    //   // }
    //   // 第二种方法：
    //   if (this.activeName !== 'collect') {
    //     this.getMaterial(true)
    //   }
    //   if (this.activeName === 'collect') {
    //     this.getMaterial(true)
    //   }
    // }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.upload-pic{
  position: absolute;
  right: 30px;
  margin-top: -10px;
  z-index: 1;
  // cursor: pointer;
}
.list-img {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item-img {
    // background-size: cover;
    position: relative;
    margin: 30px;
    width: 180px;
    height: 180px;
    border-radius: 6px;
    img {
      width: 100%;
      height: 100%;
    }
    .icons {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 18px;
      background-color: #f4f5f6;
      height: 30px;
      width: 100%;
    }
  }
}
</style>
