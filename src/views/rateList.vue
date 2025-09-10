<!--
 * @Description: 结算比率
 * @Author: gao shuai
 * @Date: 2020-05-12 14:57:26
 * @LastEditTime: 2020-05-22 15:47:26
 * @LastEditors: gao shuai
 -->

 <template>
  <div class="home">
    <!-- <div class="gs_title">结算比率</div> -->
    <div class="tablebox pdb15 pdt20">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column type="index" label="序号" width="65"></el-table-column>
          <el-table-column prop="productName" label="产品名称">
          </el-table-column>
          <el-table-column prop="rate" label="结算费率(%)">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" @change="stateChange(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.$api.home
        .rankList()
        .then((data) => {
          if (data.status === 200) {
            this.tableData = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 改变状态切换
    stateChange(data) {
      this.$api.home
        .rankState({
          productId: data.productId,
          state: data.state
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('状态修改成功！');
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
        color: #fff;
        margin-right: 5px;
      }
      .txtbox {
        display: inline-block;
      }
    }
  }
}
.tc pdt10 pdb10 {
  text-align: center;
}
</style>
