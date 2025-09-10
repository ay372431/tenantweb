<!--
 * @Description: 订单管理
 * @Author: xu wei
 * @Date: 2020-03-07 14:46:04
 * @LastEditTime: 2020-09-10 11:02:12
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title">订单管理</div>
    <div class="opeartbox">
      <ul class="clearfix">
        <li>
          <span class='tit'>起始时间：</span>
          <!-- <el-date-picker style="width:338px;" v-model="time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
          <el-date-picker style="width:190px;" v-model="time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker> <span style="font-size:14px;">至 </span>
          <el-date-picker style="width:190px;" v-model="time2" size="small" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker>
        </li>
        <li>
          <span class='tit'>订单编号：</span>
          <span class="txtbox">
            <el-input style="width:140px;" size="small" v-model="ordernumber" placeholder="请输入订单编号"></el-input>
          </span>
        </li>
        <li style="margin-right: 0;">
          <span class='tit'>游戏账号：</span>
          <span class="txtbox">
            <el-input style="width:130px;" size="small" v-model="gameaccount" placeholder="请输入游戏账号"></el-input>
          </span>
        </li>
        <li>
          <span class='tit'>订单金额：</span>
          <span class="txtbox">
            <el-input style="width:83px;" size="small" v-model="Ordervalue" placeholder="0"></el-input> --
            <el-input style="width:83px;" size="small" v-model="Underorders" placeholder="999"></el-input>
          </span>
        </li>
        <li>
          <span class='tit'>游戏分组：</span>
          <span class="txtbox">
            <el-select style="width:122px;" v-model="gameGrouppage" size="small" clearable placeholder="请选择">
              <el-option v-for="(item,i) in gameGroupdrow" :key="'gameGroup'+i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
        <!-- <li>
          <span class='tit'>游戏分组：</span>
          <span class="txtbox">
            <el-input size="small" v-model="gameGroup" placeholder="根据游戏分区名模糊查询"></el-input>
          </span>
        </li> -->
        <li>
          <span class='tit'>游戏分区：</span>
          <span class="txtbox">
            <el-select style="width:140px;" v-model="gameDivisionpage" clearable size="small" placeholder="请选择">
              <el-option v-for="(item,i) in gameDivisiondrow" :key="'gameDivision'+i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
        <li style="margin-right: 0;">
          <span class='tit'>支付方式：</span>
          <span class="txtbox">
            <el-select style="width:130px;" v-model="modeofpaymentpage" clearable size="small" placeholder="请选择">
              <el-option v-for="(item,i) in modeofpaymentdrow" :key="'modeofpayment'+i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
      </ul>
      <div class="btnBox">
        <div>
          <el-button size="small" type="success" @click="yesterdayTime">上一天</el-button>
          <el-button size="small" type="primary" @click="todayTime">今天</el-button>
        </div>
        <div class="mgt10">
          <el-button size="small" type="success" @click="tomorrowTime">下一天</el-button>
          <el-button size="small" type="primary" @click="()=>{getlist();yesterdayCharge();todayCharge();}">查询</el-button>
        </div>
      </div>
    </div>
    <div class="orderForm">
      <table style="text-align: center;">
        <tr>
          <td></td>
          <td class="font">支付金额</td>
          <td class="font">总收入</td>
          <td class="font">成功笔数</td>
        </tr>
        <tr>
          <td class="weight">昨日此时充值：</td>
          <td>{{yesterday.payaccount.toFixed(2)}}</td>
          <td>{{yesterday.profit.toFixed(2)}}</td>
          <td>{{yesterday.count}}</td>
        </tr>
        <tr>
          <td style="color: #06859A;">充值金额统计：</td>
          <td style="color:#468847;">{{today.payaccount.toFixed(2)}}</td>
          <td style="color:#00b066;">{{today.profit.toFixed(2)}}</td>
          <td style="color:#468847">{{today.count}}</td>
        </tr>
      </table>
    </div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="-1"></el-tab-pane>
          <el-tab-pane label="成功" name="1"></el-tab-pane>
          <el-tab-pane label="待发送" name="2"></el-tab-pane>
          <el-tab-pane label="待付款" name="0"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- <div class="progressBox">
      <span class="textbox">{{(today.successRate*100).toFixed(2)}} %</span>
      <div class="progressBar" :style="{'width':(today.successRate*100).toFixed(2)+'%'}"></div>
    </div> -->
    <div class="tablebox pdb15">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="orderDate" label="下单时间">
            <template slot-scope="scope">
              
              <span style="height:18px;">{{scope.row.orderDate?scope.row.orderDate.split(' ')[0]:''}}</span>
              <span style="height:18px;color:#999; margin-left: 5px;"> {{scope.row.orderDate?scope.row.orderDate.split(' ')[1]:''}}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单号" width="205">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="点击查看订单详情" placement="bottom">
                <span class="checkdetail" @click="orderDetail(scope.row.id)">{{scope.row.orderNumber}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="playerAccount" label="充值账号">
          </el-table-column>
         
          <el-table-column prop="amount" label="订单金额">
            <template slot-scope="scope">
              <span style="color:#00b066;">{{scope.row.amount?scope.row.amount.toFixed(2):'0.00'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收入">
            <template slot-scope="scope">
              <span style="color:#00b066;">{{scope.row.profit?scope.row.profit.toFixed(2):'0.00'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="充值方式">
          </el-table-column>
          <el-table-column prop="partitionsName" label="所属分区" width="350">
          </el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.state===2" class="item" effect="dark" :content="waitFlag?'请稍后点击下发':'点击下发'" placement="bottom">
                <span class="stateColor" style="cursor:pointer;" :class="'color'+scope.row.state" @click="waitSent(scope.row.orderNumber,scope.row.partitionId,scope.$index)"><i :class="{'el-icon-loading':waitFlag&&waitFlagIndex===scope.$index}"></i>待发送</span>
              </el-tooltip>
              <span v-else class="stateColor" :class="'color'+scope.row.state">{{scope.row.state|fstate}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mgt15 pdl20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-sizes="[10, 20, 30, 40]" :current-page="pageIndex" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 订单详情弹框 -->
    <el-dialog title="订单详情" :visible.sync="dialog.show" @close="dialogInit" custom-class="gs_dialog" width="800px">
      <div class="dialogOrder">
        <table>
          <tr>
            <td class="tit">订单号</td>
            <td>{{dialog.orderNum}}</td>
            <td class="tit">支付方式</td>
            <td>{{dialog.paytype}}</td>
          </tr>
          <tr>
            <td class="tit">玩家账号</td>
            <td>{{dialog.playAccount}}</td>
            <td class="tit">游戏分区</td>
            <td>{{dialog.gamearea}}</td>
          </tr>
          <tr>
            <td class="tit">订单金额</td>
            <td style="color:#FF5722;">{{dialog.orderMoney.toFixed(2)}}</td>
            <td class="tit">下单时间</td>
            <td>{{dialog.orderTime}}</td>
          </tr>
          <tr>
            <td class="tit">付款金额</td>
            <td style="color:#00b066;">{{dialog.payMoney.toFixed(2)}}</td>
            <td class="tit">付款时间</td>
            <td>{{dialog.payTime}}</td>
          </tr>
          <tr>
            <td class="tit">赠送金额</td>
            <td>{{dialog.giveMoney.toFixed(2)}}</td>
            <td class="tit">玩家QQ</td>
            <td>{{dialog.playerQQ}}</td>
          </tr>
          <tr>
            <td class="tit">红包赠送</td>
            <td>{{dialog.givebag.toFixed(2)}}</td>
            <td class="tit">玩家电话</td>
            <td>{{dialog.playerPhone}}</td>
          </tr>
          <tr>
            <td class="tit">玩家 IP</td>
            <td>{{dialog.playerIp}}</td>
            <td class="tit">订单状态</td>
            <td>
              <span v-if="dialog.show" class="stateColor" :class="'color'+dialog.orderState">{{dialog.orderState|fstate}}</span>
            </td>
          </tr>
          <tr>
            <td class="tit">下发道具</td>
            <td colspan="3">{{dialog.props}}</td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '-1', // tab切换
      time1: this.getCerentTime(true), // 起始时间
      time2: this.getCerentTime(false), // 起始时间
      waitFlag: false, // 待发送Flag
      waitFlagIndex: '', // 待发送Index
      ordernumber: '', // 订单编号
      gameaccount: '', // 游戏帐号
      gameGrouppage: '', // 游戏分组
      gameGroupdrow: [], // 游戏分组下拉
      gameGroup: '', // 游戏分组
      gameDivisionpage: '', // 游戏分区
      gameDivisiondrow: [], // 游戏分区下拉
      modeofpaymentpage: '', // 支付方式
      modeofpaymentdrow: [], // 支付方式下拉
      Ordervalue: '', // 订单金额上
      Underorders: '', // 订单金额下
      yesterday: {
        payaccount: 0,
        profit: 0,
        count: 0
      },
      today: {
        payaccount: 0,
        profit: 0,
        count: 0,
        successRate: 0
      },
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      tableData: [],
      dialog: {
        show: false,
        orderNum: '', // 订单号
        paytype: '', // 支付方式
        playAccount: '', // 玩家账号
        gamearea: '', // 游戏分区
        orderMoney: 0, // 订单金额
        orderTime: '', // 下单时间
        payMoney: 0, // 付款金额
        payTime: '', // 付款时间
        giveMoney: 0, // 赠送金额
        playerQQ: '', // 玩家QQ
        givebag: 0, // 红包赠送
        playerPhone: '', // 玩家电话
        playerIp: '', // 玩家IP
        orderState: 0, // 订单状态
        props: '' // 下发道具
      }
    };
  },
  filters: {
    fstate: function(data) {
      let sta = '';
      switch (data) {
        case 0:
          sta = '待付款';
          break;
        case 1:
          sta = '成功';
          break;
        case 2:
          sta = '待发送';
          break;
      }
      return sta;
    }
  },
  methods: {
    // tab的切换
    handleClick() {
      this.pageIndex = 1;
      this.pageSize = 20;
      this.total = 0;
      this.tableData = [];
      this.getlist();
    },
    // 订单列表
    getlist() {
      this.$api.order
        .orderlist({
          State: this.activeName,
          StartOrderDate: this.time1 ? this.time1 : '',
          EndOrderDate: this.time2 ? this.time2 : '',
          OrderNumber: this.ordernumber,
          PlayerAccount: this.gameaccount,
          GroupId: this.gameGrouppage === '' ? 0 : this.gameGrouppage,
          PartitionId: this.gameDivisionpage === '' ? 0 : this.gameDivisionpage,
          // PartitionName: this.gameGroup,
          ProductId: this.modeofpaymentpage === '' ? 0 : this.modeofpaymentpage,
          StartAmount: this.Ordervalue,
          EndAmount: this.Underorders,
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
    // 今天日期
    todayTime() {
      this.time1 = this.getCerentTime(true);
      this.time2 = this.getCerentTime(false);
      this.pageIndex = 1;
      this.getlist();
      this.yesterdayCharge();
      this.todayCharge();
    },
    // 上一天日期
    yesterdayTime() {
      this.time2 = this.getYesterday(this.time1 ? this.time1 : null)[1];
      this.time1 = this.getYesterday(this.time1 ? this.time1 : null)[0];
      this.pageIndex = 1;
      this.getlist();
      this.yesterdayCharge();
      this.todayCharge();
    },
    // 下一天日期
    tomorrowTime() {
      // this.time = this.getTomorrow(
      //   this.time ? this.time[0].split(' ')[0] : null
      // );
      this.time2 = this.getTomorrow(this.time1 ? this.time1 : null)[1];
      this.time1 = this.getTomorrow(this.time1 ? this.time1 : null)[0];
      this.pageIndex = 1;
      this.getlist();
      this.yesterdayCharge();
      this.todayCharge();
    },
    // 昨天充值
    yesterdayCharge() {
      this.$api.order
        .yesterdayCharge({
          State: this.activeName,
          StartOrderDate: this.time1 ? this.time1 : '',
          EndOrderDate: this.time2 ? this.time2 : '',
          OrderNumber: this.ordernumber,
          PlayerAccount: this.gameaccount,
          GroupId: this.gameGrouppage === '' ? 0 : this.gameGrouppage,
          PartitionId: this.gameDivisionpage === '' ? 0 : this.gameDivisionpage,
          PartitionName: this.gameGroup,
          ProductId: this.modeofpaymentpage === '' ? 0 : this.modeofpaymentpage,
          StartAmount: this.Ordervalue,
          EndAmount: this.Underorders,
          PageNumber: this.pageIndex,
          PageSize: this.pageSize
        })
        .then((data) => {
          if (data.status === 200) {
            this.yesterday.payaccount = data.data.payAmount;
            this.yesterday.profit = data.data.profit;
            this.yesterday.count = data.data.successState;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 今天充值
    todayCharge() {
      this.$api.order
        .todayCharge({
          State: this.activeName,
          StartOrderDate: this.time1 ? this.time1 : '',
          EndOrderDate: this.time2 ? this.time2 : '',
          OrderNumber: this.ordernumber,
          PlayerAccount: this.gameaccount,
          GroupId: this.gameGrouppage === '' ? 0 : this.gameGrouppage,
          PartitionId: this.gameDivisionpage === '' ? 0 : this.gameDivisionpage,
          PartitionName: this.gameGroup,
          ProductId: this.modeofpaymentpage === '' ? 0 : this.modeofpaymentpage,
          StartAmount: this.Ordervalue,
          EndAmount: this.Underorders,
          PageNumber: this.pageIndex,
          PageSize: this.pageSize
        })
        .then((data) => {
          if (data.status === 200) {
            this.today.payaccount = data.data.payAmount;
            this.today.profit = data.data.profit;
            this.today.count = data.data.successState;
            this.today.successRate = data.data.successRate;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 游戏分组下拉
    gameteamDrow() {
      this.$api.order
        .gameTeam()
        .then((data) => {
          if (data.status === 200) {
            this.gameGroupdrow = data.data;
          } else if (data.status === 204) {
            this.gameGroupdrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 查询按钮
    checkList() {
      this.pageIndex = 1;
      this.getlist();
      this.yesterdayCharge();
      this.todayCharge();
    },
    // 游戏分区下拉
    gameareaDrow() {
      this.$api.order
        .gamearea()
        .then((data) => {
          if (data.status === 200) {
            this.gameDivisiondrow = data.data;
          } else if (data.status === 204) {
            this.gameDivisiondrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 支付方式下拉
    payDrow() {
      this.$api.order
        .paylist()
        .then((data) => {
          if (data.status === 200) {
            this.modeofpaymentdrow = data.data;
          } else if (data.status === 204) {
            this.modeofpaymentdrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 订单详情
    orderDetail(id) {
      this.$api.order
        .orderDetail({
          id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.dialog.orderNum = data.data.orderNumber; // 订单号
            this.dialog.paytype = data.data.productName; // 支付方式
            this.dialog.playAccount = data.data.playerAccount; // 玩家账号
            this.dialog.gamearea = data.data.partitionName; // 游戏分区
            this.dialog.orderMoney = data.data.amount; // 订单金额
            this.dialog.orderTime = data.data.orderDate; // 下单时间
            this.dialog.payMoney = data.data.payAmount; // 付款金额
            this.dialog.payTime = data.data.payDate; // 付款时间
            this.dialog.giveMoney = data.data.giveAmount; // 赠送金额
            this.dialog.playerQQ = data.data.playerQq; // 玩家QQ
            this.dialog.givebag = data.data.redPacketAmount; // 红包赠送
            this.dialog.playerPhone = data.data.playerPhone; // 玩家电话
            this.dialog.playerIp = data.data.playerIP; // 玩家IP
            this.dialog.orderState = data.data.state; // 订单状态
            this.dialog.props = data.data.remarks; // 下发道具
            this.dialog.show = true;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 弹框的初始化
    dialogInit() {
      this.dialog.orderNum = ''; // 订单号
      this.dialog.paytype = ''; // 支付方式
      this.dialog.playAccount = ''; // 玩家账号
      this.dialog.gamearea = ''; // 游戏分区
      this.dialog.orderMoney = 0; // 订单金额
      this.dialog.orderTime = ''; // 下单时间
      this.dialog.payMoney = 0; // 付款金额
      this.dialog.payTime = ''; // 付款时间
      this.dialog.giveMoney = 0; // 赠送金额
      this.dialog.playerQQ = ''; // 玩家QQ
      this.dialog.givebag = 0; // 红包赠送
      this.dialog.playerPhone = ''; // 玩家电话
      this.dialog.playerIp = ''; // 玩家IP
      this.dialog.orderState = ''; // 订单状态
      this.dialog.props = ''; // 下发道具
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
    // 等待下发接口
    waitSentOrder(orderNum) {
      this.$api.home
        .waitSent({
          orderNumber: orderNum
        })
        .then((data) => {
          if (data.status === 200) {
            setTimeout(() => {
              this.$messageSuccess('下发成功');
              this.getlist();
              this.waitFlag = false;
              this.waitFlagIndex = '';
            }, 1500);
          }
        })
        .catch(() => {
          this.waitFlag = false;
          this.waitFlagIndex = '';
          this.$messageError('下发超时，请检测网关！');
        });
    },
    // 等待下发
    waitSent(orderNum, id, index) {
      if (!this.waitFlag) {
        this.waitFlag = true;
        this.waitFlagIndex = index;
        // 分区检测
        this.$api.groupmange
          .checkLink({
            partitionId: id
          })
          .then((data) => {
            if (data.status === 200) {
              let keyValue = data.data;
              let indexNum = 0;
              let handletimer = setInterval(() => {
                this.$api.groupmange
                  .timerCheck({
                    checkKey: keyValue
                  })
                  .then((data) => {
                    clearInterval(handletimer);
                    handletimer = null;
                    this.waitSentOrder(orderNum);
                  })
                  .catch(() => {
                    indexNum++;
                    if (indexNum > 6) {
                      clearInterval(handletimer);
                      handletimer = null;
                      this.waitFlag = false;
                      this.waitFlagIndex = '';
                      this.$messageError('分区检测失败！');
                    }
                  });
              }, 3000);
            }
          })
          .catch(() => {
            this.waitFlag = false;
            this.waitFlagIndex = '';
            this.$messageError('分区检测失败！');
          });
      }
    }
  },
  created() {
    this.gameteamDrow();
    this.gameareaDrow();
    this.payDrow();
    this.getlist();
    this.yesterdayCharge();
    this.todayCharge();
  }
};
</script>

<style lang="scss" scoped>
.opeartbox {
  padding: 15px 150px 5px 20px;
  background: #fff;
  position: relative;
  .btnBox {
    position: absolute;
    right: 10px;
    top: 16px;
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
.tablebox {
  background: #fff;
}
.orderForm {
  margin-top: 10px;
  background: #fff;
  padding-top: 5px;
  padding-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #d9edf7;
  color: #999;
  table {
    td {
      padding: 2px 10px 2px 20px;
    }
  }
}
.font {
  color: #06859a;
  // font-weight: bold;
}
.weight {
  width: 20%;
  padding-bottom: 5px;
  color: #06859a;
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
.checkdetail {
  cursor: pointer;
  &:hover {
    color: #0099ff;
    text-decoration: underline;
  }
}
.stateColor {
  background: #409eff;
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
  &.color2 {
    background: #f56c6c;
    &:after {
      border-color: #f56c6c;
    }
    &:before {
      border-right-color: #f56c6c;
    }
  }
  &:after {
    content: '';
    position: absolute;
    border: 1px solid #409eff;
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
    border-right-color: #409eff;
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