<template>
  <div class="wrap-box">
    <div class="sonbar"><img src="../../assets/img/san.png" />错误账号</div>
    <div class="wrap-box-c">
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">秒提任务说明</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <div class="tips">
            <h1>为什么会有错误账号？</h1>
            <p>1、玩家输入的支付宝账号并非正常手机号或邮箱</p>
            <p>2、玩家输入的收款人姓名并非实名姓名</p>
            <p>
              3、玩家输入并非支付宝登录账户，一般一个手机号可绑定多个支付宝，秒提是无法确定转入哪个支付宝。
            </p>
            <p>
              4、以上都正确但还是无法秒提,有可能是对方支付宝账户设置为"不允许通过账号搜索到我。"。
            </p>
            <p>
              如果确认玩家已解除了支付宝设置，即可将该错误账号标记为正确，否则还是无法出款，只能手动转账
            </p>
          </div>
        </div>
      </div>
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">错误账号列表</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <div class="search-box mgb15">
            <div class="item w1 label">收款账号</div>
            <div class="item">
              <el-input size="small" v-model="form.BeneficiaryAccountNumber">
              </el-input>
            </div>
            <div class="item w1 label">收款姓名</div>
            <div class="item">
              <el-input size="small" v-model="form.BeneficiaryAccountName">
              </el-input>
            </div>
            <div class="item mgl10">
              <el-button type="warning" size="small" @click="search"
                >搜索</el-button
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
              property="beneficiaryAccountNumber"
              label="收款账号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              property="beneficiaryAccountName"
              label="收款人姓名"
              align="center"
            >
            </el-table-column>
            <el-table-column
              property="wrongReason"
              label="错误原因"
              align="center"
            >
            </el-table-column>
            <el-table-column
              property="createTime"
              label="添加时间"
              align="center"
            >
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >恢复</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mgt15 mgb15 mgl15 mgr15" style="text-align: center">
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
  </div>
</template>

<script>
import mgr from "../../assets/js/securityapi";
import api from "../../assets/js/apiRequestHandler";
export default {
  data() {
    return {
      dialogConfig: false,
      tableData: [],
      form: {
        Id: "",
        ApplicationUserId: this.$store.state.id,
        BeneficiaryAccountNumber: "",
        BeneficiaryAccountName: "",
        PageNumber: 1,
        PageSize: 10,
        total: 0,
      },
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
        if (this.form[i] === "") {
          delete this.form[i];
        }
      }
      api
        .get("/api/TenantPaid/WrongAccountList", {
          headers: {
            Authorization: "Bearer " + header,
          },
          params: this.form,
        })
        .then((res) => {
          if (res.status === 200) {
            this.form.total = JSON.parse(
              res.headers["x-pagination"]
            ).TotalCount;
            this.tableData = res.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    changePage(page) {
      console.log(page);
      this.tableData = [];
      this.form.PageNumber = page;
      this.getLists();
    },
    search() {
      this.tableData = [];
      this.form.PageNumber = 1;
      this.getLists();
    },
    async handleEdit(index, row) {
      let header = await mgr();
      this.$confirm("此操作将恢复该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api
            .post(
              "/api/TenantPaid/OperateWrongAccount",
              {
                wrongAccountList:[row.id],
                isRecover: true,
              },
              {
                headers: {
                  Authorization: "Bearer " + header,
                },
              }
            )
            .then((res) => {
              if (res.status === 200) {
                this.$messageSuccess("操作成功");
                this.getLists();
              }
            });
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
  },
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
