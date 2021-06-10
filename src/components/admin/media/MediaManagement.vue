<template>
    <div>
      <div>
        <el-button @click="upload">上传</el-button>
      </div>
    </div>
</template>

<script>
  import Bus from '../../../js/bus';
  // import Bus from '../../js/bus'
  export default {
    name: 'MediaManagement',

    data() {
      return {}
    },
    mounted() {
      // 文件选择后的回调

      Bus.$on('fileAdded', () => {
        console.log('文件已选择')
      });
      // 文件上传成功的回调
      Bus.$on('fileSuccess', () => {
        console.log('文件上传成功')
      });
    },
    computed: {},
    methods: {
      upload() {
        // 打开文件选择框
        Bus.$emit('openUploader', {
        })
      }
    },
    destroyed() {
      Bus.$off('fileAdded');
      Bus.$off('fileSuccess');
    },
  }
</script>

<style scoped lang="scss">

</style>
