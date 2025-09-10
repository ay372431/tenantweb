<template>
  <div class="wrap-box">
    <div class="sonbar"><img src="../../assets/img/san.png" />黑名单管理</div>
    <div class="wrap-box-c">
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">黑名单管理</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <div class="tips">
            <h1>什么是黑名单？</h1>
            <p>
              1、支付宝黑名单：黑名单中的支付宝账号，无法自动秒提，只能手动秒提。
            </p>
            <p>
              2、角色名黑名单：黑名单中的角色名，无法自动秒提，只能手动秒提。
            </p>
            <p>
              3、永久黑名单：黑名单中的支付宝账号，无法自动秒提，也无法手动秒提，只能私下转账。
            </p>
            <p>黑名单数据为所有版本共用数据，请谨慎添加！</p>
          </div>
        </div>
      </div>
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">黑名单列表</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <div class="search-box mgb15">
            <div class="item w1 label">收款账号</div>
            <div class="item input">
              <el-input size="small" v-model="form.Name"> </el-input>
            </div>
            <div class="item w1 label">选择类型</div>
            <div class="item input">
              <el-select
                placeholder="请选择"
                size="small"
                v-model="form.PaidBlacklistType"
              >
                <el-option :value="0" label="全部类型"> </el-option>
                <el-option :value="1" label="支付宝黑名单"> </el-option>
                <el-option :value="2" label="角色黑名单"> </el-option>
                <el-option :value="3" label="永久黑名单"> </el-option>
              </el-select>
            </div>
            <div class="item mgl10">
              <el-button type="warning" size="small" @click="search"
                >搜索</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="dialogConfig = true"
                >添加</el-button
              >
            </div>
          </div>
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            border
            :header-cell-style="{ background: '#F2F2F2', color: '#606266' }"
          >
            <el-table-column
              property="paidBlacklistType"
              label="类型"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.paidBlacklistType == 0">全部类型</span>
                <span v-if="scope.row.paidBlacklistType == 1"
                  >支付宝黑名单</span
                >
                <span v-if="scope.row.paidBlacklistType == 2">角色黑名单</span>
                <span v-if="scope.row.paidBlacklistType == 3">永久黑名单</span>
              </template>
            </el-table-column>
            <el-table-column property="name" label="黑名单" align="center">
            </el-table-column>
            <el-table-column property="remarks" label="备注" align="center">
            </el-table-column>
            <el-table-column property="name" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleDel(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mgt15 mgb15 mgl15 mgr15" style="text-align: center;">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="form.total"
            :current-page="form.PageNumber"
            :page-size="form.PageSize"
            @current-change="changePage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      title="添加黑名单"
      :visible.sync="dialogConfig"
      custom-class="gs_dialog"
      width="30%"
    >
      <div class="fieldset  mgb20">
        <el-divider content-position="left"
          ><span class="legend">黑名单列表</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <el-form ref="form" :model="add" label-width="100px">
            <el-form-item label="收款账号">
              <el-input v-model="add.name"></el-input>
            </el-form-item>
            <el-form-item label="黑名单类型">
              <el-select
                placeholder="请选择"
                size="small"
                v-model="add.paidBlacklistType"
              >
                <el-option :value="1" label="支付宝黑名单"> </el-option>
                <el-option :value="2" label="角色黑名单"> </el-option>
                <el-option :value="3" label="永久黑名单"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="add.remarks"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">立即提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mgr from '../../assets/js/securityapi';
import api from '../../assets/js/apiRequestHandler';
export default {
  data() {
    return {
      dialogConfig: false,
      tableData: [],
      form: {
        Id: '',
        ApplicationUserId: this.$store.state.id,
        Name: '',
        PaidBlacklistType: 0,
        PageNumber: 1,
        PageSize: 10,
        total: 0
      },
      add: {
        id: 0,
        applicationUserId: this.$store.state.id,
        name: '',
        paidBlacklistType: 1,
        remarks: ''
      }
    };
  },
  created() {
    this.getLists();
  },
  methods: {
    async getLists() {
      let header = await mgr();
      this.form.ApplicationUserId = this.$store.state.id;
      for (let i in this.form) {
        if (this.form[i] === '') {
          delete this.form[i];
        }
      }
      api
        .get('/api/TenantPaid/GetBlacklists', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: this.form
        })
        .then(res => {
          if (res.status === 200) {
            this.form.total = JSON.parse(
              res.headers['x-pagination']
            ).TotalCount;
            this.tableData = res.data;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    search() {
      // this.form.ApplicationUserId = this.$store.state.id
      this.form.PageNumber = 1;
      this.getLists();
    },
    changePage(page) {
      console.log(page);
      this.form.PageNumber = page;
      this.getLists();
    },
    async save() {
      let header = await mgr();
      this.add.applicationUserId = this.$store.state.id;
      api
        .post('/api/TenantPaid/AddPaidBlacklist', this.add, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success(res.data);
            this.dialogConfig = false;
            this.getLists();
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    async handleDel(index, row) {
      let header = await mgr();
      this.$confirm('此操作将删除该黑名单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api
          .get('/api/TenantPaid/DeletePaidBlacklist', {
            headers: {
              Authorization: 'Bearer ' + header
            },
            params: {
              blacklistId: row.id
            }
          })
          .then(res => {
            if (res.status === 200) {
              this.$message.success('删除成功');
              this.tableData.splice(index, 1);
            }
          })
          .catch(err => {
            this.$messageError(err.message);
          });
      });
    }
  }
};
</script>

<style scoped>
.tips h1 {
  font-size: 20px;
  color: #3cc48d;
  margin-bottom: 5px;
}

.tips p {
  color: #3cc48d;
  line-height: 30px;
  font-size: 14px;
}
</style>
