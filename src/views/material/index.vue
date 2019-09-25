<template>
  <el-card>
    <!-- 面包屑组件 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>

    <!-- tabs栏 -->
    <template>
      <el-tabs v-model="activeName" @tab-click="getMaterial">
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部
      list: []
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        // this.activeName === 'collect' 相当于去找收藏的数据
        // 如果不等相当于去找全部的数据
        // 第三种方法：
        params: { collect: this.activeName === 'collect' }
      }).then(result => {
        this.list = result.data.results
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
