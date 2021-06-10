<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
    <!-- 将上传组件全局注册 -->
<!--    <global-uploader></global-uploader>-->

  </div>
</template>

<script>
  import globalUploader from './components/admin/media/MediaUpload'
export default {
  name: 'App',
  components: {
    globalUploader
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{margin:0px}
</style>
