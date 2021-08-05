<template>
  <div>
    <el-row class="tac" id="menu">
      <el-col :span="3">
        <side-menu @indexSelect="listByCategory" ref="sideMenu"></side-menu>
      </el-col>
      <el-col :span="21">
        <div>
          <media-upload>
            <el-button v-if="selected.length > 0" size="medium">
              <i class="el-icon-folder-add" style="font-size: 15px"></i>&nbsp&nbsp下载
            </el-button>
          </media-upload>

        </div>

        <div v-if="selected.length==0">
          <p class="mediaSpan">全部{{fileType}}</p>
        </div>
        <div v-else>
          <p class="mediaSpan">已选中{{selected.length}}个文件</p>
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
          @row-contextmenu="rightClick"
          @select="handleSelect"
          @select-all="handelSelectAll"
          @selection-change="handSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          >
          </el-table-column>

          <el-table-column label="文件名" fit min-width="50%" >
            <template slot-scope="scope">
              <div v-if="scope.row.cid===1">
                <img src="../../../assets/image-icon.png" alt="" style="float: left">
              </div>
              <div v-else-if="scope.row.cid===2">
                <img src="../../../assets/text-icon.png" alt="" style="float: left">
              </div>
              <div v-else-if="scope.row.cid===3">
                <img src="../../../assets/video-icon.png" alt="" style="float: left">
              </div>
              <div v-else-if="scope.row.cid===5">
                <img src="../../../assets/mp3.png" alt="" style="float: left">
              </div>
              <div v-else>
                <img src="../../../assets/other.png" alt="" style="float: left">
              </div>
              <p style="line-height: 32px; margin: 0px 0px 0px 35px;">
                {{scope.row.fileOriginalName}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            min-width="9%"
          >
            <template slot-scope="scope">
<!--              <div style="color:#5cb6ff;" v-show="scope.row.showRightOp">-->
              <div style="color:#5cb6ff;" v-show="scope.row.index===current">
                <div v-if="scope.row.cid===3">
                  <span @click.stop="partnerOp(0,scope.row.fileId)" style="cursor: pointer;">观看</span>
                </div>
                <div v-else>

                  <span @click.stop="partnerOp(1,scope.row.fileId)" style="cursor: pointer;">下载</span>
                </div>

                <!--<span @click="partnerOp(0,scope.row.fileId)" style="margin-left:40px;cursor: pointer;">删除</span>-->

              </div>
            </template>
          </el-table-column>
          <el-table-column prop="fileSize" label="大小" fit min-width="10%">
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
            min-width="25%">
          </el-table-column>


        </el-table>
      </el-col>
    </el-row>
    <div id="contextmenu"
         v-show="menuVisible"
         class="menu">
      <div class="contextmenu__item"
           @click="ShowView(CurrentRow)">查看
      </div>
      <div class="contextmenu__item"
           @click="EditData(CurrentRow)">修改
      </div>
    </div>
    <el-dialog
      title="数据详情"
      :visible.sync="dialogVisible"
      width="30%"
      style="text-align: left"
      top="5vh"
     >
      <p>fileId：{{media.fileId}}</p>
      <p>fileOriginalName：{{media.fileOriginalName}}</p>
      <p>fileType：{{media.fileType}}</p>
      <p>fileName：{{media.fileName}}</p>

      <p>filePath：{{media.filePath}}</p>

      <p>uploadTime：{{media.uploadTime}}</p>
      <span slot="footer" class="dialog-footer">
       <el-button @click="downloadMyFile(media.filePath,media.fileName)">文件下载</el-button>
       <el-button type="primary" @click="previewMyFile">在线预览</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import MediaUpload from './MediaUpload'
  import SideMenu from './SideMenu'
  import $ from 'jquery'

  export default {
    components: {MediaUpload, SideMenu},
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        medias: [],
        total: 0,
        fileType: '文件',
        selected: [],
        menuVisible: false,
        dialogVisible: false,
        media:{},
        current: -1
      }
    },
    mounted () {
      this.loadMedias()
    },
    methods: {
      //文件下载
      downloadMyFile(path,name){
        this.$axios.get('/media/upload/mediaList').then(resp => {

        })
      },
      //文件预览
      previewMyFile(){

      },
      ShowView(row){
        this.dialogVisible=true;
        this.media=row;
        console.log(row.fileId)
      },
      // table的右键点击当前行事件
      rightClick (row, column, event) {
        this.testModeCode = row.testModeCode
        this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
        this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
        event.preventDefault() //关闭浏览器右键默认事件
        this.CurrentRow = row
        let menu = document.querySelector('.menu')
        this.styleMenu(menu)
      },
      foo () {
        // 取消鼠标监听事件 菜单栏
        this.menuVisible = false
        document.removeEventListener('click', this.foo) // 关掉监听，
      },
      //当前行菜单
      styleMenu (menu) {
        if (event.clientX > 1800) {
          menu.style.left = event.clientX - 100 + 'px'
        } else {
          menu.style.left = event.clientX + 1 + 'px'
        }
        document.addEventListener('click', this.foo) // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
        if (event.clientY > 700) {
          menu.style.top = event.clientY - 30 + 'px'
        } else {
          menu.style.top = event.clientY - 10 + 'px'
        }
      },
      //点击table行触发
      handleRowClick (row, column, event) {
        console.log(row)
        let number = this.selected.indexOf(row.fileId)
        if (number == -1) {
          this.selected.push(row.fileId)
        } else {
          this.selected.splice(number, 1)//删除特定元素
        }
        this.$refs.multipleTable.toggleRowSelection(row)
      },
      //加载全部数据
      loadMedias () {
        var _this = this
        this.$axios.get('/media/upload/mediaList').then(resp => {

          if (resp.data.success && resp.data.code === 10000) {

            _this.medias = resp.data.queryResult.list
            _this.total = resp.data.queryResult.total
            this.medias.map((item, index) => {
              item.showRightOp = false  //需要先在tableData数组中每个元素添加showRightOp为false
              item.index = index
            })
            // console.log(this.medias)
          }
        })
      },
      partnerOp (num, fileId) {
        alert(fileId)

      },
      hoverRow (row) {
        this.current=row.index;
        // console.log(row)
        // row.showRightOp = true
        // this.$set(this.medias, row.index, row)
      },
      leaveRow (row) {
        row.showRightOp = false
        this.$set(this.medias, row.index, row)
      },
      //选中选择框
      handleSelect (key, keyPath,row) {
        //选中框
        /*console.log("选中框");
        let fileId = keyPath.fileId;
        console.log(fileId)
        let number = this.selected.indexOf(fileId)
        console.log(number)
        if (number == -1) {
          this.selected.push(fileId)
        } else {
          this.selected.splice(number, 1)//删除特定元素
        }*/
      },
      //选择全部
      handelSelectAll(selections){
        // console.log(selections)   //[],参数

      },
      //选择发生改变
      handSelectionChange(selections){
        console.log("change");
        console.log("长度为"+selections.length);
        this.selected=[];
        if (selections.length==0){
          //清空selected
          this.selected=[];
        }else {
          for (const selection of selections) {
            let fileId = selection.fileId;
            let number = this.selected.indexOf(fileId)
            if (number == -1) {
              this.selected.push(fileId)
            } else {
              this.selected.splice(number, 1)//删除特定元素
            }
          }

        }

      },
      //点击分类
      listByCategory () {
        let _this = this
        _this.selected = []
        let cid = this.$refs.sideMenu.cid
        this.fileType = this.$refs.sideMenu.fileType
        let url = '/media/upload/category/mediaList/' + cid
        this.$axios.get(url).then(resp => {
          if (resp.data.success && resp.data.code === 10000) {
            _this.medias = resp.data.queryResult.list
            _this.total = resp.data.queryResult.total
            this.medias.map((item, index) => {
              item.showRightOp = false  //需要先在tableData数组中每个元素添加showRightOp为false
              item.index = index
            })
            // console.log(this.medias)
          }
        })
      },
    },
    computed: {
      //表格高度
      tableHeight () {
        return window.innerHeight
      }
    },
  }
</script>
<style scoped>
  .image-icon{
     background-image: url("../../../assets/image-icon.png");
   }
  .video-icon{
    background-image: url("../../../assets/video-icon.png");
  }
  .text-icon{
    background-image: url("../../../assets/text-icon.png");
  }
  .mediaSpan {
    float: left;
    padding-left: 20px;
    padding-top: 5px;
    font-size: 15px
  }

  .contextmenu__item {
    display: block;
    line-height: 34px;
    text-align: center;
  }

  .contextmenu__item:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .menu {
    position: absolute;
    background-color: #fff;
    width: 100px;
    /*height: 106px;*/
    font-size: 12px;
    color: #444040;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    white-space: nowrap;
    z-index: 1000;
  }

  .contextmenu__item:hover {
    cursor: pointer;
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
</style>
