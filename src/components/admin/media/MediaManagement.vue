<template>
  <div>
    <el-row class="tac">
      <el-col :span="3">
        <side-menu @indexSelect="listByCategory" ref="sideMenu"></side-menu>
      </el-col>
      <el-col :span="21">
        <div>
          <media-upload></media-upload>
          <button>按钮</button>
        </div>

        <div v-if="selected.length==0">
          <span class="mediaSpan">全部{{fileType}}</span>
        </div>
        <div v-else>
          <span class="mediaSpan">已选中{{selected.length}}个文件</span>
        </div>
        <span class="mediaSpan" style="float: right;margin-right: 20px">已加载{{total}}个</span>
        <el-table
          ref="multipleTable"
          :data="medias"
          stripe
          style="width: 100%;padding-left: 20px"
          :max-height="tableHeight"
          @cell-mouse-enter="hoverRow"
          @cell-mouse-leave="leaveRow"
          @row-click="handleRowClick"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            prop="fileOriginalName"
            label="文件名"
            fit>
          </el-table-column>
          <el-table-column
            min-width="20px"
          >
            <template slot-scope="scope">
              <div style="color:#5cb6ff;" v-show="scope.row.showRightOp">
                <div v-if="scope.row.cid===3">
                  <span @click="partnerOp(0,scope.row.fileId)" style="cursor: pointer;">观看</span>
                </div>
                <div v-else>
                  <span @click="partnerOp(1,scope.row.fileId)" style="cursor: pointer;">下载</span>
                </div>

                <!--<span @click="partnerOp(0,scope.row.fileId)" style="margin-left:40px;cursor: pointer;">删除</span>-->

              </div>
            </template>
          </el-table-column>
          <el-table-column prop="fileSize" label="大小" fit>
            <template slot-scope="scope">
              <div v-if="scope.row.fileSize > 1048576">
                {{(scope.row.fileSize / 1048576).toFixed(1)}}MB
              </div>
              <div v-else>
                {{(scope.row.fileSize / 1024).toFixed(1)}}Kb
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="uploadTime"
            label="修改日期"
            width="240">
          </el-table-column>


        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import MediaUpload from './MediaUpload'
  import SideMenu from './SideMenu'

  export default {
    components: {MediaUpload, SideMenu},
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        medias: [],
        total:0,
        fileType:'文件',
        selected:[]
      }
    },
    mounted () {
      this.loadMedias()
    },
    methods: {
      handleRowClick(row, column, event){
        let number = this.selected.indexOf(row.fileId)
        if (number==-1){
          this.selected.push(row.fileId)
        }else {
          this.selected.splice(number,1);//删除特定元素
        }
        this.$refs.multipleTable.toggleRowSelection(row);
      },
      loadMedias () {
        var _this = this
        this.$axios.get('/media/upload/mediaList').then(resp => {

          if (resp.data.success && resp.data.code === 10000) {

            _this.medias = resp.data.queryResult.list;
            _this.total = resp.data.queryResult.total;
            this.medias.map((item, index) => {
              item.showRightOp = false  //需要先在tableData数组中每个元素添加showRightOp为false
              item.index=index;
            })
            // console.log(this.medias)
          }
        })
      },
      clickBtn () {

      },
      partnerOp () {

      },
      hoverRow (row) {

        row.showRightOp = true
        this.$set(this.medias, row.index, row)
      },
      leaveRow (row) {

        row.showRightOp = false
        this.$set(this.medias, row.index, row)
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      listByCategory () {
        let _this = this
        _this.selected=[];
        let cid = this.$refs.sideMenu.cid
        this.fileType = this.$refs.sideMenu.fileType
        let url = '/media/upload/category/mediaList/' + cid
        this.$axios.get(url).then(resp => {
          if (resp.data.success && resp.data.code === 10000) {

            _this.medias = resp.data.queryResult.list;
            _this.total = resp.data.queryResult.total;
            this.medias.map((item, index) => {
              item.showRightOp = false  //需要先在tableData数组中每个元素添加showRightOp为false
              item.index=index;
            })
            // console.log(this.medias)
          }
        })
      },
    },
    computed: {
      tableHeight () {
        return window.innerHeight
      }
    },
  }
</script>
<style scoped>
  .mediaSpan{
    float:left;
    padding-left: 20px;
    padding-top: 5px;
    font-size: 15px
  }
</style>
