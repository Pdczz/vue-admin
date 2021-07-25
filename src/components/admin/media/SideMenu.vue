<template>
  <el-menu
    class="categories"
    default-active="0"
    @select="handleSelect"
    active-text-color="red"
    style="background-color: rgba(255,255,255,.8)"  >
    <el-menu-item index="0">
      <i class="el-icon-document"></i>
      <span slot="title">全部文件</span>
    </el-menu-item>
    <el-menu-item index="1">

      <span slot="title">图片</span>
    </el-menu-item>
    <el-menu-item index="2">

      <span slot="title">文档</span>
    </el-menu-item>
    <el-menu-item index="3">

      <span slot="title">视频</span>
    </el-menu-item>
    <el-menu-item index="4">

      <span slot="title">种子</span>
    </el-menu-item>
    <el-menu-item index="5">

      <span slot="title">音乐</span>
    </el-menu-item>
    <el-menu-item index="6">

      <span slot="title">其他</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'SideMenu',
    data () {
      return {
        cid: ''
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        this.cid = key
        this.$emit('indexSelect')
      }
    }
  }
</script>

<style scoped>
  .categories {
    position: absolute;
    margin-left: 50%;
    left: -600px;
    top: 220px;
    width: 150px;
  }
  .el-card{
    text-align: left;
    margin-bottom: 20px;
    background-color: rgba(255,255,255,.8)
  }
</style>

