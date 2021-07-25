<template>
  <div>
    <SideMenu></SideMenu>



  </div>
</template>
<script>
  import MediaUpload from './MediaUpload'
  import SideMenu from './SideMenu'
  export default {
    components:{MediaUpload,SideMenu},
    data() {
      return {
        tabPosition: 'left'
      };
    },
    methods:{
      clickBtn(){

      }
    }
  };
</script>
