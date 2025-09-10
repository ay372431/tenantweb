<!--
 * @Description: 代理系统
 * @Author: gao shuai
 * @Date: 2020-05-18 09:46:49
 * @LastEditTime: 2020-08-19 20:29:20
 * @LastEditors: gao shuai
-->

<template>
  <div class="home">
    <div class="gs_title">用户分组</div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox">
        <div class="tablebox pdb15 pdt10 bg_fff">
          <div class="clearfix pdb10">
            <p class="fr mgr10">
              <el-button size='small' type="success" @click="addGroup">添加比率分组</el-button>
            </p>
          </div>
          <div class="gs_tablebox">
            <el-table ref="moduleTable" size="mini" :data="userGroup.tableData" border style="width: 100%" stripe>
              <el-table-column type="index" label="序号" width="65">
              </el-table-column>
              <el-table-column prop="name" label="默认">
                <template slot-scope="scope">
                  <span class="gs_rido" :class="{'checked':scope.row.isDefault&&scope.row.isAgency,'disable':!scope.row.isAgency}" @click="userdeflaut(scope.row.id,scope.row.isDefault)"></span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="分组名称">
              </el-table-column>
              <el-table-column prop="merchantCount" label="用户个数">
                <template slot-scope="scope">
                  <span>{{scope.row.isAgency?scope.row.merchantCount:'--'}}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间">
                <template slot-scope="scope">
                  <p style="height:18px;">{{scope.row.createDate?scope.row.createDate.split(' ')[0]:''}}</p>
                  <p style="height:18px;color:#999;">{{scope.row.createDate?scope.row.createDate.split(' ')[1]:''}}</p>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button size="mini" type="primary" v-if="!scope.row.isAgency" @click="geteditInfo(scope.row.id,!scope.row.isAgency)">查看</el-button>
                    <el-button size="mini" type="primary" v-else @click="geteditInfo(scope.row.id,!scope.row.isAgency)">编辑</el-button>
                    <el-button size="mini" type="danger" :disabled="scope.row.merchantCount>0&&userGroup.tableData.length===1||!scope.row.isAgency" @click="handleClose1(scope.row.id)">删除</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户分组编辑 -->
    <el-dialog :title="userGroup.dialog.editflag?'添加分组':'编辑分组'" :visible.sync="userGroup.dialog.show" @close="dialogInit" custom-class="gs_dialog" width="800px">
      <div>
        <ul class="roadlist clearfix">
          <li style="width:501px">
            <span class="tit">分组名称</span>
            <div class="content" style="width: 200px;">
              <el-input size="small" :disabled="userGroup.dialog.defalutRate" v-model="userGroup.dialog.groupName" placeholder="请输入分组名称"></el-input>
            </div>
          </li>
          <li>
            <span class="tit">一键设置</span>
            <div class="content">
              <el-input size="small" :disabled="userGroup.dialog.defalutRate" v-model="userGroup.dialog.oneSet" type="number" @input="oneSetinp" placeholder="一键设置"></el-input>
            </div>
          </li>
          <li v-for="(item,i) in userGroup.dialog.list" :key="'user'+i">
            <span class="tit">{{item.productName}}:</span>
            <div class="content">
              <el-input size="small" :disabled="userGroup.dialog.defalutRate" v-model="item.rate" :ref="'userinp'+i" placeholder="未设置"></el-input>
            </div>
            <span class="tit">≤ {{item.limitRate}}</span>
          </li>
        </ul>
        <div class="tc pdt10 pdb10">
          <span v-if="!userGroup.dialog.defalutRate">
            <el-button v-if="userGroup.dialog.editflag" class="referring" size="small" type="primary" @click="addGroupSure">提交</el-button>
            <el-button v-else class="referring" size="small" type="primary" @click="editsubmit">提交</el-button>
            <el-button size="small" type="info" @click="userGroup.dialog.show=false">取消</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      userGroup: {
        tableData: [],
        dialog: {
          editflag: true,
          show: false,
          defalutRate: false,
          id: '',
          groupName: '',
          oneSet: '',
          list: []
        }
      }
    };
  },
  methods: {
    /* --------------------------------2.用户分组------------------------------- */
    // 用户分组列表
    getlist() {
      this.$api.agent
        .userList()
        .then((data) => {
          if (data.status === 204) {
            this.userGroup.tableData = [];
          } else if (data.status === 200) {
            this.userGroup.tableData = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 切换默认
    userdeflaut(id, bol) {
      if (!bol) {
        this.$api.agent
          .userDefalut({
            id: id
          })
          .then((data) => {
            if (data.status === 200) {
              this.getlist();
            }
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      }
    },
    // 添加分组
    addGroup() {
      this.$api.agent
        .productList()
        .then((data) => {
          if (data.status === 200) {
            this.userGroup.dialog.list = data.data;
            this.userGroup.dialog.show = true;
          } else if (data.status === 204) {
            this.userGroup.dialog.list = [];
            this.userGroup.dialog.show = true;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 添加分组时的一键设置
    oneSetinp() {
      this.userGroup.dialog.list.forEach((item) => {
        item.rate = this.userGroup.dialog.oneSet;
      });
    },
    // 添加时的数据校验
    dataCheck() {
      for (let i = 0; i < this.userGroup.dialog.list.length; i++) {
        if (
          parseFloat(this.userGroup.dialog.list[i].rate) >
          this.userGroup.dialog.list[i].limitRate
        ) {
          let refName = 'userinp' + i;
          this.$nextTick(() => {
            this.$refs[refName][0].focus();
            this.$messageError(
              '数字必须小于' + this.userGroup.dialog.list[i].limitRate
            );
          });
          return true;
        } else if (
          parseFloat(this.userGroup.dialog.list[i].rate) < 0 ||
          this.userGroup.dialog.list[i].rate === ''
        ) {
          let refName = 'userinp' + i;
          this.$nextTick(() => {
            this.$refs[refName][0].focus();
            this.$messageError('数字不能小于0');
          });
          return true;
        }
      }
      return false;
    },
    // 添加分组确认
    addGroupSure() {
      let flag = this.dataCheck();
      if (flag) {
        return;
      }
      this.$api.agent
        .addrank({
          name: this.userGroup.dialog.groupName,
          merchantRankProductItems: this.userGroup.dialog.list
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('添加成功！');
            this.userGroup.dialog.show = false;
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 编辑分组获取数据
    geteditInfo(id, bol) {
      this.$api.agent
        .editInfo({
          Id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.userGroup.dialog.editflag = false;
            this.userGroup.dialog.id = data.data.id;
            this.userGroup.dialog.groupName = data.data.name;
            this.userGroup.dialog.list = data.data.merchantRankProductItems;
            this.userGroup.dialog.defalutRate = bol;
            this.userGroup.dialog.show = true;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 编辑时的更新提交
    editsubmit() {
      let flag = this.dataCheck();
      if (flag) {
        return;
      }
      this.$api.agent
        .eidtrank({
          id: this.userGroup.dialog.id,
          name: this.userGroup.dialog.groupName,
          merchantRankProductItems: this.userGroup.dialog.list
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('编辑成功！');
            this.userGroup.dialog.show = false;
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 弹框的初始化
    dialogInit() {
      this.userGroup.dialog.editflag = true;
      this.userGroup.dialog.defalutRate = false;
      this.userGroup.dialog.id = '';
      this.userGroup.dialog.groupName = '';
      this.userGroup.dialog.oneSet = '';
      this.userGroup.dialog.list = [];
    },
    // 删除选中行
    handleClose1(id) {
      this.$confirm('删除后数据将无法恢复，是否确定？')
        .then(() => {
          this.delRank(id);
        })
        .catch(() => {});
    },
    // 删除用户分组
    delRank(id) {
      this.$api.agent
        .delRank({
          id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('删除成功！');
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style lang="scss" scoped>
.gs_tabbox {
  .tabbox {
    float: none;
  }
}
.opeartbox {
  padding: 15px 20px 5px;
  background: #fff;
  &.titwidth {
    ul {
      li {
        .tit {
          display: inline-block;
          width: 80px;
        }
      }
    }
  }
  ul {
    li {
      float: left;
      margin-right: 15px;
      margin-bottom: 10px;
      .tit {
        font-size: 14px;
        color: #2d2d2d;
        margin-right: 5px;
      }
      .txtbox {
        display: inline-block;
      }
    }
  }
}
.orderForm {
  // margin-top: 10px;
  background: #fff;
  padding-top: 5px;
  padding-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #d9edf7;
  color: #999;
}
.font {
  color: #06859a;
  font-size: 15px;
  // font-weight: bold;
}
.weight {
  width: 18%;
  padding-bottom: 5px;
  color: #06859a;
  font-size: 15px;
  // font-weight: bold;
}
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
.progressBox {
  height: 16px;
  background: #bbb;
  position: relative;
  .textbox {
    position: absolute;
    top: 0;
    left: 50%;
    height: 16px;
    line-height: 16px;
    color: #fff;
  }
  .progressBar {
    height: 100%;
    width: 0;
    background: #67c23a;
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
    animation: progress-bar-stripes 2s linear infinite;
    transition: all ease-out 0.3s;
  }
}
.roadlist {
  border: 1px solid #ccc;
  width: 753px;
  li {
    float: left;
    width: 250px;
    height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    margin-bottom: -1px;
    &:nth-child(3n + 2) {
      border-right: none;
    }
    .tit {
      display: inline-block;
      vertical-align: middle;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .content {
      display: inline-block;
      vertical-align: middle;
      width: 100px;
      height: 32px;
      padding: 4px 9px;
      text-align: center;
    }
  }
}
.stateColor {
  background: red;
  // margin-left: 20px;
  color: #fff;
  display: inline-block;
  padding-left: 5px;
  position: relative;
  height: 22px;
  line-height: 22px;
  &.color1 {
    background: green;
    &:after {
      border-color: green;
    }
    &:before {
      border-right-color: green;
    }
  }
  &:after {
    content: '';
    position: absolute;
    border: 1px solid red;
    border-width: 11px 5px;
    top: 0;
    right: -10px;
    border-right-color: transparent !important;
  }
  &:before {
    content: '';
    position: absolute;
    border: 1px solid transparent;
    border-width: 11px 5px;
    top: 0;
    left: -10px;
    border-right-color: red;
  }
}
.checkdetail {
  cursor: pointer;
  &:hover {
    color: #0099ff;
    text-decoration: underline;
  }
}
.dialogOrder {
  padding-bottom: 20px;
  table {
    width: 100%;
    tr {
      td {
        border: 1px solid #ccc;
        text-align: center;
        height: 40px;
        color: #008194;
        &.tit {
          background: #edfdff;
          color: #6f6f6f;
          font-weight: bold;
          width: 100px;
        }
      }
    }
  }
}
</style>
