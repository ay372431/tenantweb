<template>
  <div class="wrap-box">
    <div class="sonbar"><img src="../../assets/img/san.png" />秒提任务</div>
    <div class="wrap-box-c">
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">秒提任务说明</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <div class="tips">
            <h1>已执行的任务,将不会出现在此页</h1>
            <p>1、若打款成功，请前往《已完成订单》页面查询</p>
            <p>2、若打款失败，请前往《待审核订单》页面查看失败原因</p>
          </div>
        </div>
      </div>
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">秒提任务列表</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            border
            :header-cell-style="{ background: '#F2F2F2', color: '#606266' }"
          >
            <el-table-column property="name" label="订单号" align="center">
            </el-table-column>
            <el-table-column property="name" label="收款账号" align="center">
            </el-table-column>
            <el-table-column property="name" label="收款人姓名" align="center">
            </el-table-column>
            <el-table-column property="name" label="秒提金额" align="center">
            </el-table-column>
            <el-table-column property="name" label="状态" align="center">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
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
      form: {}
    };
  },
  created() {
    this.getLists();
  },
  methods: {
    async getLists() {
      let header = await mgr();
      api
        .get('/api/TenantPaid/RoleStatistics', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: this.form
        })
        .then(res => {
          console.log(res.data);
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
