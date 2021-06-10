<template>
  <el-card class="admin-header">
   <!-- <img src="../../assets/admin.jpg" width="100" height="100" style="float: left;margin-left: 10px;margin-bottom: 10px">-->
    <a href="/index">
      <img src="../../assets/admin.jpg" alt="" width="70px" style="float: left;margin-top: -10px;margin-left: 50px">
    </a>
   <!-- <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px">白  卷</span>
    <i  class="el-icon-switch-button" v-on:click="logout" style="font-size: 40px;float: right"></i>-->
  </el-card>
</template>

<script>
  import {createRouter} from '../../router'
  export default {
    name: 'Header',
    methods: {
      /*logout () {
        var _this = this
        this.$axios.get('/logout').then(resp => {
          if (resp && resp.status === 200) {
            _this.$store.commit('logout')
            _this.$router.replace('/index')
            // 清空路由，防止路由重复加载
            const newRouter = createRouter()
            _this.$router.matcher = newRouter.matcher
          }
        }).catch(failResponse => {})
      }*/
    }
  }
</script>

<style scoped>
  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
  }

</style>
