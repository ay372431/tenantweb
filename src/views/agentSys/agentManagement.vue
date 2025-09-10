<!--
 * @Description: 代理的分区管理
 * @Author: gao shuai
 * @Date: 2020-08-17 11:45:23
 * @LastEditTime: 2020-08-29 11:52:13
 * @LastEditors: gao shuai
-->

 <template>
  <div class="home">
    <div class="gs_title">分区管理</div>
    <div class="tablebox pdb15 mgt20">
      <div class="opeartbox">
        <ul class="clearfix">
          <li>
            <span class='tit'>商户ID：</span>
            <span class="txtbox" style="width:180px;">
              <el-input size="small" v-model="merchantId" clearable placeholder="请输入商户ID" @input="merchantId = intNumber(merchantId)"></el-input>
            </span>
            <el-button size="small" class="mgl15" type="primary" @click="checklist">查询</el-button>
          </li>
        </ul>
      </div>
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="merchantId" label="商户ID" width="80">
          </el-table-column>
          <el-table-column prop="id" label="分区编号">
          </el-table-column>
          <el-table-column prop="name" label="分区名称" width="280">
          </el-table-column>
          <el-table-column prop="serverIp" label="服务器">
          </el-table-column>
          <el-table-column prop="scriptPath" label="路径">
          </el-table-column>
          <el-table-column prop="createDate" label="创建时间" width="170">
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" @click="rechargeTeam(scope.row.uuid)">充值</el-button>
                <el-button size="mini" type="success" @click="checklink(scope.row.id,scope.$index)" :loading="!checkflag&&checkIndex===scope.$index">检测</el-button>
              </el-button-group>
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
      merchantId: '', // 商户ID
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      tableData: [],
      checkflag: true, // 检测的flag
      checkIndex: '' // 检测的Index
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.$api.agent
        .agentmanageList({
          MerchantId: this.merchantId === '' ? 0 : this.merchantId,
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
    // 查询
    checklist() {
      this.pageIndex = 1; // 页码
      this.getlist();
    },
    // 充值
    rechargeTeam(uuid) {
      var tempwindow = window.open();
      this.$api.groupmange
        .rechargeteam({
          typeId: 0
        })
        .then((data) => {
          if (data.status === 200) {
            // window.open(data.data + '/recharge/' + uuid);
            tempwindow.location = data.data + '/recharge/' + uuid;
            // window.open('http://192.168.1.79:8080/recharge/' + uuid);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 分区检测
    checklink(id, index) {
      if (this.checkflag) {
        this.checkflag = false;
        this.checkIndex = index;
        this.$api.groupmange
          .checkLink({
            partitionId: id
          })
          .then((data) => {
            if (data.status === 200) {
              this.$messageSuccess('检测成功！');
              this.checkflag = true;
              this.checkIndex = '';
            }
          })
          .catch(() => {
            this.checkflag = true;
            this.checkIndex = '';
            this.$messageError('检测失败！');
          });
      }
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
.tablebox {
  background: #fff;
}
.opeartbox {
  padding: 15px 20px 5px;
  background: #fff;
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
</style>
