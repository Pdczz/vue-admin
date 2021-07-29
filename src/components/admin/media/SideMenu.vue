<template>
  <el-menu
    class="categories"
    default-active="0"
    @select="handleSelect"
    active-text-color="#09AAFF"
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
        cid: '',
        menus:[
          {id:0,name:"全部文件"},
          {id:1,name:"图片"},
          {id:2,name:"文档"},
          {id:3,name:"视频"},
          {id:4,name:"种子"},
          {id:5,name:"音乐"},
          {id:6,name:"其他"},
          ],
        fileType:''
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key)
        let fileType = this.menus.find(x => x.id==key).name
        this.fileType=fileType
        // console.log(keyPath);
        this.cid = key
        this.$emit('indexSelect')
      }
    }
  }
</script>

<style scoped>
  /*.categories {
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
  }*/
</style>

