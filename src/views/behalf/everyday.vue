<template>
  <div class="wrap-box">
    <div class="gs_title" style="color: white;">每日统计</div>
    <div class="wrap-box-c">
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">每日统计</span></el-divider
        >
        <div class="search-box mgl15 mgb15">
          <div class="item w1 label">开始时间：</div>
          <div class="item input">
            <el-date-picker
              type="date"
              placeholder="开始时间"
              size="small"
              v-model="form.StartTime"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
          <div class="item w1 label">结束时间：</div>
          <div class="item input">
            <el-date-picker
              type="date"
              placeholder="结束时间"
              size="small"
              v-model="form.EndTime"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>

          <div class="item w1 label">版本：</div>
          <div class="item input">
            <el-select
              placeholder="请选择"
              size="small"
              v-model="form.VersionId"
            >
              <el-option :value="0" label="全部版本"> </el-option>
              <el-option :value="1" label="默认版本"> </el-option>
            </el-select>
          </div>
          <div class="item mgl10">
            <el-button type="danger" size="small" @click="search"
              >查询</el-button
            >
            <el-button size="small" @click="reset">重置</el-button>
          </div>
        </div>
        <div class="mgt15 mgb15 mgl15 mgr15">
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            border
            :header-cell-style="{ background: '#F2F2F2', color: '#606266' }"
            class="mgt15"
          >
            <el-table-column property="date" label="分区名称" align="center">
            </el-table-column>
            <el-table-column
              property="topSpeedWithdrawalCount"
              label="秒提笔数"
              align="center"
            >
            </el-table-column>
            <el-table-column
              property="topSpeedWithdrawalTotalAmount"
              label="秒提金额"
              align="center"
            >
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
        VersionId: '',
        ApplicationUserId: '',
        BeneficiaryAccountNumber: '',
        PlayerRoleName: '',
        StartTime: '',
        EndTime: '',
        PageNumber: 1,
        PageSize: 10,
        total: 0
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
        .get('/api/TenantPaid/DailyStatistics', {
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
      this.tableData = [];
      this.form.PageNumber = 1;
      this.getLists();
    },
    changePage(page) {
      this.tableData = [];
      this.form.PageNumber = page;
      this.getLists();
    },
    reset() {
      this.form = {
        Id: '',
        VersionId: '',
        ApplicationUserId: '',
        BeneficiaryAccountNumber: '',
        PlayerRoleName: '',
        StartTime: '',
        EndTime: '',
        PageNumber: 1,
        PageSize: 10,
        total: 0
      };
      this.tableData = [];
      this.getLists();
    }
  }
};
</script>

<style scoped>
.gs_title {
  background: var(--theme-color);
}
.fieldset-con {
  margin: 0 0 20px 20px;
  display: flex;
  justify-content: space-around;
}
</style>
