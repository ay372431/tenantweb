<!--
 * @Description: 用户日志
 * @Author: xu wei
 * @Date: 2020-03-05 15:12:08
 * @LastEditTime: 2020-06-19 15:23:03
 * @LastEditors: gao shuai
 -->
 <template>
  <div class="home">
    <div class="gs_title">用户登录日志</div>
    <!-- <div style=" margin-top: 10px;background: #fff;padding-top: 10px;padding-left: 50px;padding-bottom: 10px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);background-color: #D9EDF7;">
      <span>注意事项：1. 为保证更好的用户体验，请不定期的清理您的访问日志。</span><br>
      <span style="padding-left: 79px;"> 2. 日志清除功能会保留您最近三天内的操作日志。</span>
      <el-button type="danger" size="small" round style="float: right;margin-top: -15px;margin-right: 10px;" @click="clearLog">清除日志</el-button>
    </div> -->
    <div class="tablebox pdb15 pdt20">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column label="日期">
            <template slot-scope="scope">
              <p>{{scope.row.dateTime.split(' ')[0]}}</p>
              <p style="color:#999;">{{scope.row.dateTime.split(' ')[1]}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="account" label="用户名">
          </el-table-column>
          <el-table-column prop="ip" label="访问IP">
          </el-table-column>
          <el-table-column label="描述">
            <template slot-scope="scope">
              <p style="color:green;">{{scope.row.description}}</p>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mgt15 pdl20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-sizes="[10, 20, 30, 40]" :current-page="pageIndex" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
      this.$api.userLog
        .logList({
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
    // 清除日志
    clearLog() {
      this.$api.userLog
        .clearLog()
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('清理成功！');
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
</style>
