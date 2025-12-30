<!--
 * @Description: 用户日志
 * @Author: xu wei
 * @Date: 2020-03-05 15:12:08
 * @LastEditTime: 2020-06-19 15:23:03
 * @LastEditors: gao shuai
 -->
<template>
    <div class="home">
        <div class="gs_title" style="color: white;">礼品赠送</div>
        <!-- <div style=" margin-top: 10px;background: #fff;padding-top: 10px;padding-left: 50px;padding-bottom: 10px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);background-color: #D9EDF7;">
      <span>注意事项：1. 为保证更好的用户体验，请不定期的清理您的访问日志。</span><br>
      <span style="padding-left: 79px;"> 2. 日志清除功能会保留您最近三天内的操作日志。</span>
      <el-button type="danger" size="small" round style="float: right;margin-top: -15px;margin-right: 10px;" @click="clearLog">清除日志</el-button>
    </div> -->
        <el-button type="primary" @click="goOrder">领取礼品</el-button>
        <div class="tablebox pdb15 pdt20">
            <div class="gs_tablebox">
                <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
                    <el-table-column prop="orderName" label="礼品名称"></el-table-column>
                    <el-table-column label="礼品备注">
                        <template slot-scope="scope">
                            <p>{{ scope.row.reMark == "" ? "无备注" : scope.row.reMark }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="company" label="快递公司">
                    </el-table-column>
                    <el-table-column prop="orderNo" label="快递单号">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="发货时间">
                    </el-table-column>
                </el-table>
            </div>
            <div class="mgt15 pdl20">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
                    :page-sizes="[10, 20, 30, 40]" :current-page="pageIndex" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      tableData: []
    };
  },
  methods: {
    // 用户日志列表
    getlist() {
      console.log(this.$store.state.id);
      this.$api.userLog
        .getGiftList({
          id: 0,
          state: 1,
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
    },
    goOrder() {
      this.$api.home
        .addEmsOrder()
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('领取成功!');
          } else {
            this.$messageError(data.message);
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
.gs_title {
    background: var(--theme-color);
}
</style>
