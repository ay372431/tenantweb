<!--
 * @Description: 留言箱
 * @Author: gao shuai
 * @Date: 2020-05-12 15:24:46
 * @LastEditTime: 2020-07-20 11:33:04
 * @LastEditors: gao shuai
 -->

<template>
  <div class="home">
    <div class="gs_title" style="color: white;">留言箱</div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="已读" name="1"></el-tab-pane>
          <el-tab-pane label="未读" name="2"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="fr mgt10">
        <el-button size="small" type="danger" :disabled="selcetList.length===0" @click="handleClose(selcetList)">删除</el-button>
      </div>
    </div>
    <div class="tablebox pdb15 pdt20 bg_fff">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" @selection-change="selchange" :data="tableData" border style="width: 100%" stripe>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="date" label="留言时间">
            <template slot-scope="scope">
              <p style="height:20px;">{{scope.row.leaveDate.split(' ')[0]}}</p>
              <p style="color:#ccc;height:20px;">{{scope.row.leaveDate.split(' ')[1]}}</p>
            </template>
          </el-table-column>
          <el-table-column label="留言内容">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="点击查看留言内容" placement="bottom">
                <span style="color:#0099ff;cursor:pointer;" @click="seeDetail(scope.row,scope.$index)">查看内容</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="account" label="玩家账号">
          </el-table-column>
          <el-table-column prop="qq" label="玩家QQ">
          </el-table-column>
          <el-table-column prop="phone" label="联系电话">
          </el-table-column>
          <el-table-column prop="partitionName" label="分区名称">
          </el-table-column>
          <el-table-column prop="scriptPath" label="状态">
            <template slot-scope="scope">
              <span :style="{'color':scope.row.state?'green':'red'}">{{scope.row.state?'已读':'未读'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleClose([{id:scope.row.id}])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mgt15 pdl20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-sizes="[10, 20, 30, 40]" :current-page="pageIndex" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 编辑客服信息弹框 -->
    <el-dialog title="留言详情" :visible.sync="dialog.show" @close="dialogInit" custom-class="gs_dialog" width="440px">
      <div class="messageBox">
        <p><span>玩家：</span><i style="color:#008194;">{{dialog.account}}</i></p>
        <p class="mgt5"><span>日期：</span><i style="color:#aaa;">{{dialog.time}}</i></p>
        <div class="content">
          {{dialog.content}}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '0',
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      tableData: [],
      selcetList: [], // 多选list
      dialog: {
        show: false,
        account: '',
        time: '',
        content: ''
      }
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.$api.home
        .messageList({
          State: this.activeName,
          PageNumber: this.pageIndex,
          PageSize: this.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tableData = [];
            this.total = 0;
          } else if (data.status === 200) {
            this.tableData = data.data;
            this.total = JSON.parse(data.headers['x-pagination']).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // tab的切换
    handleClick() {
      this.pageIndex = 1;
      this.pageSize = 20;
      this.total = 0;
      this.tableData = [];
      this.getlist();
    },
    // 删除选中行
    handleClose(data) {
      this.$confirm('删除后数据将无法恢复，是否确定？')
        .then(() => {
          this.delMail(data);
        })
        .catch(() => {});
    },
    // 删除留言请求
    delMail(list) {
      this.$api.home
        .delMail(list)
        .then((data) => {
          this.getlist();
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 多选list
    selchange(data) {
      this.selcetList = data.map((item) => {
        return {
          id: item.id
        };
      });
    },
    // 查看留言的详情
    seeDetail(data, index) {
      this.dialog.account = data.account;
      this.dialog.time = data.leaveDate;
      this.dialog.content = data.content;
      this.dialog.show = true;
      if (!data.state) {
        this.changeMailState(data, index);
      }
    },
    // 查看内容弹框的初始化
    dialogInit() {
      this.dialog.account = '';
      this.dialog.time = '';
      this.dialog.content = '';
    },
    // 更改玩家留言阅读
    changeMailState(data, index) {
      this.$api.home
        .mailState({
          id: data.id
        })
        .then((data) => {
          if (this.activeName === '2') {
            this.tableData[index].state = true;
          } else {
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 当每页条数变化时
    handleSizeChange(data) {
      this.pageSize = data;
      this.pageIndex = 1;
      this.getlist();
    },
    // 当前的页码变化时
    handleCurrentChange(data) {
      this.pageIndex = data;
      this.getlist();
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.messageBox {
  padding-bottom: 20px;
  max-height: 500px;
  overflow-y: auto;
  .content {
    margin-top: 8px;
    padding-top: 5px;
    border-top: 1px solid #aaa;
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>
