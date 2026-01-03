<!--
 * @Description: 数据分析
 * @Author: xu wei
 * @Date: 2020-03-13 16:56:02
 * @LastEditTime: 2020-09-10 10:37:33
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">数据统计</div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="每日收益统计" name="1">
            <div class="opeartbox">
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <!-- <el-date-picker style="width:270px;" v-model="tab1.time" size="small" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:160px;" v-model="tab1.time1" size="small" type="date"
                    value-format="yyyy-MM-dd" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:160px;" v-model="tab1.time2" size="small" type="date"
                    value-format="yyyy-MM-dd" placeholder="选择日期">
                  </el-date-picker>
                  <el-button class="mgl20" size="small" type="primary" @click="checkdata1">统计</el-button>
                </li>
              </ul>
              <div class="statisticsDetail">
                <span class="mgr20">共 <i>{{ tab1.total }}</i> 笔</span>
                <span class="mgr20">交易总额 : <i>{{ tab1.totalMoney.toFixed(2) }}</i> 元</span>
                <span class="mgr20">交易数量 : <i>{{ tab1.amount }}</i></span>
                <span>代理收入 : <i class="red">{{ tab1.agentMoney.toFixed(2) }}</i> 元</span>
              </div>
              <div class="gs_tablebox">
                <el-table ref="moduleTable" size="mini" :data="tab1.tableData" border style="width: 100%" stripe>
                  <el-table-column type="index" label="序号" width="65">
                  </el-table-column>
                  <el-table-column prop="date" label="日期">
                  </el-table-column>
                  <el-table-column label="交易金额">
                    <template slot-scope="scope">
                      <span>{{ scope.row.amount.toFixed(2) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="total" label="交易数量">
                  </el-table-column>
                  <el-table-column label="代理收入">
                    <template slot-scope="scope">
                      <span>{{ scope.row.agentAmount.toFixed(2) }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="mgt15 pdl20">
                <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" background
                  :page-sizes="[10, 20, 30, 40]" :current-page="tab1.pageIndex" :page-size="tab1.pageSize"
                  layout="total, sizes, prev, pager, next, jumper" :total="tab1.total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="分区统计" name="2">
            <div class="opeartbox">
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <!-- <el-date-picker style="width:270px;" v-model="tab2.time" size="small" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:160px;" v-model="tab2.time1" size="small" type="date"
                    value-format="yyyy-MM-dd" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:160px;" v-model="tab2.time2" size="small" type="date"
                    value-format="yyyy-MM-dd" placeholder="选择日期">
                  </el-date-picker>
                </li>
                <li>
                  <span class='tit'>商户ID：</span>
                  <span class="txtbox">
                    <el-input style="width:125px;" size="small" v-model="tab2.merchantId"
                      placeholder="请输入商户ID"></el-input>
                  </span>
                </li>
                <el-button size="small" type="primary" @click="checkdata2">统计</el-button>
              </ul>
              <div class="tablebox pdb15">
                <div class="gs_tablebox">
                  <el-table ref="moduleTable" size="mini" :data="tab2.tableData" border style="width: 100%" stripe>
                    <el-table-column type="index" label="序号" width="65">
                    </el-table-column>
                    <el-table-column prop="partitionName" label="分区名称">
                    </el-table-column>
                    <el-table-column label="充值金额">
                      <template slot-scope="scope">
                        <span>{{ scope.row.payAmount.toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="rate" label="比率">
                      <template slot-scope="scope">
                        <span>{{ (scope.row.rate * 100).toFixed(2) + '%' }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="mgt15 pdl20">
                  <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" background
                    :page-sizes="[10, 20, 30, 40]" :current-page="tab2.pageIndex" :page-size="tab2.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="tab2.total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="充值渠道统计" name="3">
            <div class="opeartbox">
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <!-- <el-date-picker style="width:338px;" v-model="tab3.time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:190px;" v-model="tab3.time1" size="small" type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:190px;" v-model="tab3.time2" size="small" default-time="23:59:59"
                    type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker>
                  <el-button class="mgl20" size="small" type="primary" @click="getechart3">查询</el-button>
                </li>
              </ul>
              <div class="below" v-if="tab3.show">
                <div id="myChart3" style="width:100%;height:500px;"></div>
              </div>
              <div class="nodatatip" v-else>暂无数据</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="时段统计" name="4">
            <div class="opeartbox">
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <el-date-picker style="width:180px;" size="small" v-model="tab4.time" :clearable="false" type="date"
                    value-format="yyyy-MM-dd" placeholder="选择日期时间"></el-date-picker>
                </li>
                <li>
                  <span class='tit'>商户ID：</span>
                  <span class="txtbox">
                    <el-input style="width:125px;" size="small" v-model="tab4.merchantId"
                      placeholder="请输入商户ID"></el-input>
                  </span>
                </li>
                <el-button size="small" type="primary" @click="getechart4">查询</el-button>
              </ul>
            </div>
            <div class="below" v-if="tab4.show">
              <div id="myChart4" style="width:100%;height:500px;"></div>
            </div>
            <div class="nodatatip" v-else>暂无数据</div>
          </el-tab-pane>
          <el-tab-pane label="充值排行" name="5">
            <div class="opeartbox">
              <ul class="clearfix">
                <li>
                  <span class='tit'>日期：</span>
                  <!-- <el-date-picker style="width:260px;" v-model="tab5.time" size="small" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:160px;" v-model="tab5.time1" size="small" type="date"
                    value-format="yyyy-MM-dd" placeholder="选择日期">
                  </el-date-picker> <span style="font-size:14px;">至 </span>
                  <el-date-picker style="width:160px;" v-model="tab5.time2" size="small" type="date"
                    value-format="yyyy-MM-dd" placeholder="选择日期">
                  </el-date-picker>
                  <el-button class="mgl20" size="small" type="primary" @click="checkdata5">查询</el-button>
                  <el-button size="small" @click="setYesterday5">昨天</el-button>
                  <el-button size="small" @click="prevDay5">上一天</el-button>
                  <el-button size="small" @click="nextDay5">下一天</el-button>

                </li>
              </ul>
              <p class="pdb10">仅显示前50个商户信息</p>
              <div class="tablebox pdb15">
                <div class="gs_tablebox">
                  <el-table ref="moduleTable" size="mini" :data="tab5.tableData" border style="width: 100%" stripe>
                    <el-table-column type="index" label="序号" width="65">
                    </el-table-column>
                    <el-table-column prop="merchantId" label="商户ID">
                    </el-table-column>
                    <el-table-column prop="merchantAccount" label="商户帐号">
                    </el-table-column>
                    <el-table-column label="充值金额">
                      <template slot-scope="scope">
                        <span>{{ scope.row.amount.toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="payCount" label="收入金额">
                      <template slot-scope="scope">
                        <span>{{ scope.row.merchantProfit.toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="mgt15 pdl20">
                  <el-pagination @size-change="handleSizeChange5" @current-change="handleCurrentChange5" background
                    :page-sizes="[10, 20, 30, 40]" :current-page="tab5.pageIndex" :page-size="tab5.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="tab5.total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const today = new Date().toISOString().slice(0, 10);
    return {
      activeName: '1', // tab切换
      tab1: {
        time1: '', // 日期
        time2: '', // 日期
        totalMoney: 0, // 总交易额
        amount: 0, // 交易数量
        agentMoney: 0, // 代理收入
        tableData: [], // 列表数据
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0 // 总数据的条数
      },
      tab2: {
        time1: '', // 日期
        time2: '', // 日期
        merchantId: '', // 商户id
        tableData: [], // 列表数据
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0 // 总数据的条数
      },
      tab3: {
        time1: '', // 日期
        time2: '', // 日期
        show: false
      },
      tab4: {
        time: this.getCerentDate(true), // 日期
        merchantId: '', // 商户id
        show: false
      },
      tab5: {
        time1: today, // 日期
        time2: today, // 日期
        tableData: [],
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0 // 总数据的条数
      }
    };
  },
  methods: {
    setYesterday5() {
      const yesterday = this.getDayOffset(-1);
      this.tab5.time1 = yesterday;
      this.tab5.time2 = yesterday;
      this.checkdata5();
    },
    prevDay5() {
      if (this.tab5.time1 && this.tab5.time2) {
        const prev1 = this.getDayOffsetFrom(this.tab5.time1, -1);
        const prev2 = this.getDayOffsetFrom(this.tab5.time2, -1);
        this.tab5.time1 = prev1;
        this.tab5.time2 = prev2;
        this.checkdata5();
      }
    },
    nextDay5() {
      const today = this.getDayOffset(0);
      if (this.tab5.time1 && this.tab5.time2) {
        let next1 = this.getDayOffsetFrom(this.tab5.time1, 1);
        let next2 = this.getDayOffsetFrom(this.tab5.time2, 1);
        // 不允许超过今天
        if (next1 > today) next1 = today;
        if (next2 > today) next2 = today;
        this.tab5.time1 = next1;
        this.tab5.time2 = next2;
        this.checkdata5();
      }
    },
    getDayOffset(offset) {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      return d.toISOString().slice(0, 10);
    },
    getDayOffsetFrom(dateStr, offset) {
      const d = new Date(dateStr);
      d.setDate(d.getDate() + offset);
      return d.toISOString().slice(0, 10);
    },
    // tab切换
    handleClick() {
      if (this.activeName === '1') {
        this.tab1.time1 = '';
        this.tab1.time2 = '';
        this.tab1.tableData = [];
        this.tab1.pageIndex = 1; // 页码
        this.tab1.pageSize = 20; // 每页的条数
        this.tab1.total = 0; // 总数据的条数
        this.getlist();
        this.staticsDetail();
      } else if (this.activeName === '2') {
        this.tab2.time1 = '';
        this.tab2.time2 = '';
        this.tab2.merchantId = '';
        this.tab2.tableData = [];
        this.tab2.pageIndex = 1; // 页码
        this.tab2.pageSize = 20; // 每页的条数
        this.tab2.total = 0; // 总数据的条数
        this.getlist2();
      } else if (this.activeName === '3') {
        this.tab3.time1 = ''; // 日期
        this.tab3.time2 = ''; // 日期
        this.tab3.merchantId = '';
        this.$nextTick(() => {
          this.getechart3();
        });
      } else if (this.activeName === '4') {
        this.tab4.time = this.getCerentDate(true); // 日期
        this.$nextTick(() => {
          this.getechart4();
        });
      } else if (this.activeName === '5') {
        this.tab5.time1 = ''; // 日期
        this.tab5.time2 = ''; // 日期
        this.tab5.tableData = [];
        this.tab5.pageIndex = 1; // 页码
        this.tab5.pageSize = 20; // 每页的条数
        this.tab5.total = 0; // 总数据的条数
        this.getlist5();
      }
    },
    /* ---------------------1.每日收益统计------------------------ */
    getlist() {
      this.$api.agent
        .dayStatis({
          StartOrderDate: this.tab1.time1 ? this.tab1.time1 : '',
          EndOrderDate: this.tab1.time2 ? this.tab1.time2 : '',
          PageNumber: this.tab1.pageIndex,
          PageSize: this.tab1.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab1.tableData = [];
            this.tab1.total = 0;
          } else if (data.status === 200) {
            this.tab1.tableData = data.data;
            this.tab1.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 统计信息
    staticsDetail() {
      this.$api.agent
        .staticsDetail({
          StartOrderDate: this.tab1.time1 ? this.tab1.time1 : '',
          EndOrderDate: this.tab1.time2 ? this.tab1.time2 : '',
          PageNumber: this.tab1.pageIndex,
          PageSize: this.tab1.pageSize
        })
        .then((data) => {
          if (data.status === 200) {
            this.tab1.totalMoney = data.data.totalAmount; // 总交易额
            this.tab1.amount = data.data.total; // 交易数量
            this.tab1.agentMoney = data.data.totalAgentAmount; // 代理收入
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    checkdata1() {
      this.tab1.pageIndex = 1;
      this.staticsDetail();
      this.getlist();
    },
    // 1当每页条数变化时
    handleSizeChange1(data) {
      this.tab1.pageSize = data;
      this.tab1.pageIndex = 1;
      this.staticsDetail();
      this.getlist();
    },
    // 1当前的页码变化时
    handleCurrentChange1(data) {
      this.tab1.pageIndex = data;
      this.staticsDetail();
      this.getlist();
    },
    /* ---------------------2.分区统计------------------------ */
    getlist2() {
      this.$api.statics
        .areaMerchant({
          StartTime: this.tab2.time1 ? this.tab2.time1 : '',
          EndTime: this.tab2.time2 ? this.tab2.time2 : '',
          MerchantId: this.tab2.merchantId === '' ? 0 : this.tab2.merchantId,
          PageNumber: this.tab2.pageIndex,
          PageSize: this.tab2.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab2.tableData = [];
            this.tab2.total = 0;
          } else if (data.status === 200) {
            this.tab2.tableData = data.data;
            this.tab2.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    checkdata2() {
      this.tab2.pageIndex = 1;
      this.getlist2();
    },
    // 2当每页条数变化时
    handleSizeChange2(data) {
      this.tab2.pageSize = data;
      this.tab2.pageIndex = 1;
      this.getlist2();
    },
    // 2当前的页码变化时
    handleCurrentChange2(data) {
      this.tab2.pageIndex = data;
      this.getlist2();
    },
    /* ---------------------3.充值渠道统计------------------------ */
    getechart3() {
      this.$api.statics
        .chargeMerchant({
          StartTime: this.tab3.time1 ? this.tab3.time1 : '',
          EndTime: this.tab3.time2 ? this.tab3.time2 : ''
        })
        .then((data) => {
          if (data.status === 200) {
            let res = data.data;
            if (res.length === 0) {
              this.tab3.show = false;
              return;
            } else {
              this.tab3.show = true;
            }
            let option1 = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
              },
              toolbox: {
                right: 50,
                feature: {
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ['line', 'bar'] },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              grid: {
                top: 80
              },
              color: ['#2EC7C9', '#CBBDE7', '#8BC8F3'],
              xAxis: [
                {
                  type: 'category',
                  data: res.map((item) => {
                    return item.productName;
                  })
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  name: '金额',
                  axisLabel: {
                    formatter: '{value} 元'
                  },
                  nameTextStyle: {
                    color: '#409EFF'
                  }
                }
              ],
              series: [
                {
                  name: '支付金额',
                  type: 'bar',
                  data: res.map((item) => {
                    return item.payAmount;
                  })
                }
              ]
            };
            this.$nextTick(() => {
              let myChart1 = this.$echarts.init(
                document.getElementById('myChart3')
              );
              myChart1.setOption(option1);
            });
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    /* ---------------------4.时段统计------------------------ */
    getechart4() {
      this.$api.statics
        .timeMerchant({
          Date: this.tab4.time ? this.tab4.time : '',
          MerchantId: this.tab4.merchantId === '' ? 0 : this.tab4.merchantId
        })
        .then((data) => {
          if (data.status === 200) {
            let res = data.data;
            if (res.length === 0) {
              this.tab4.show = false;
              return;
            } else {
              this.tab4.show = true;
            }
            let option1 = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' }
              },
              toolbox: {
                right: 50,
                feature: {
                  dataView: { show: true, readOnly: false },
                  magicType: { show: true, type: ['line', 'bar'] },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              grid: {
                top: 80
              },
              color: ['#2EC7C9', '#CBBDE7', '#8BC8F3'],
              xAxis: [
                {
                  type: 'category',
                  data: res.map((item) => {
                    return item.hour;
                  })
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  name: '金额',
                  axisLabel: {
                    formatter: '{value} 元'
                  },
                  nameTextStyle: {
                    color: '#409EFF'
                  }
                }
              ],
              series: [
                {
                  name: '支付金额',
                  type: 'bar',
                  data: res.map((item) => {
                    return item.payAmount;
                  })
                }
              ]
            };
            this.$nextTick(() => {
              let myChart1 = this.$echarts.init(
                document.getElementById('myChart4')
              );
              myChart1.setOption(option1);
            });
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    /* ---------------------5.充值排行------------------------ */
    getlist5() {
      this.$api.agent
        .chargeRank({
          StartOrderDate: this.tab5.time1 ? this.tab5.time1 : '',
          EndOrderDate: this.tab5.time2 ? this.tab5.time2 : '',
          PageNumber: this.tab5.pageIndex,
          PageSize: this.tab5.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tab5.tableData = [];
            this.tab5.total = 0;
          } else if (data.status === 200) {
            this.tab5.tableData = data.data;
            this.tab5.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    checkdata5() {
      this.tab5.pageIndex = 1;
      this.getlist5();
    },
    // 5当每页条数变化时
    handleSizeChange5(data) {
      this.tab5.pageSize = data;
      this.tab5.pageIndex = 1;
      this.getlist5();
    },
    // 5当前的页码变化时
    handleCurrentChange5(data) {
      this.tab5.pageIndex = data;
      this.getlist5();
    }
  },
  created() {
    this.getlist();
    this.staticsDetail();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.tabbox {
  width: 100%;
}

.nodatatip {
  width: 100%;
  height: 500px;
  text-align: center;
  line-height: 500px;
}

.below {
  width: 100%;
  margin-top: 20px;
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

  .statisticsDetail {
    padding-bottom: 10px;
    color: #555;

    i {
      color: #000;
      font-weight: bold;

      &.red {
        color: red;
      }
    }
  }
}

#tenantDaily {
  width: 600px;
  height: 400px;
  background-color: #fff;
  border: 1px #2d2d2d;
}
</style>
