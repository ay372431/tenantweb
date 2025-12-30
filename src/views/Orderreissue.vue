<!--
 * @Description: 订单补发
 * @Author: xu wei
 * @Date: 2020-03-06 13:16:10
 * @LastEditTime: 2020-09-28 16:54:52
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">订单补发</div>
    <div class="opeartbox">
      <div class="alignmentleft">
        <h4 style="padding-left: 20px;margin-top: 10px;">手动补发</h4>
        <el-divider style="width: 90%;"></el-divider>
        <el-form label-width="100px">
          <el-form-item label="游戏分组：">
            <el-select v-model="gameGroup" popper-class="gs_colorSelcet" size="small" placeholder="请选择"  @change="groupChanged">
              <el-option v-for="(item, i) in gameGroupdrow" :class="'templateColor' + item.templateColor"
                :key="'gameGroup' + i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏模板：">
            <el-select v-model="template" popper-class="gs_colorSelcet" size="small" placeholder="请选择"  @change="templateChanged">
              <el-option v-for="(item, i) in templateDropdown" :class="'templateColor' + item.templateColor"
                :key="'template' + i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏分区：">
            <el-select v-model="gamearea" popper-class="gs_colorSelcet" size="small" placeholder="请选择">
              <el-option v-for="(item, i) in gameDivisiondrow" :class="'templateColor' + item.templateColor"
                :key="'gamearea' + i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="充值方式：">
            <el-select v-model="rechargemodepage" size="small" placeholder="请选择">
              <el-option v-for="(item, i) in rechargemodedrow" :key="'rechargemode' + i" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏账号：">
            <el-input style="width: 58%;" size="small" v-model="gameaccount" placeholder="请输入游戏账号"></el-input>
          </el-form-item>
          <el-form-item label="充值金额：">
            <el-input style="width: 58%;" size="small" type="number" v-model="amountofrecharge"
              placeholder="充值金额"></el-input>
          </el-form-item>
          <el-form-item label="额外补发：">
            <el-input style="width: 29%;" size="small" v-model="handextra"></el-input> %
          </el-form-item>
          <p class="mgl20 mgt10 mgb10">
            <el-checkbox v-model="isGiveAmount" name="type">不包含赠送金额</el-checkbox>
            <el-checkbox v-model="isRedPacketAmount" name="type">不包含红包赠送</el-checkbox>


            <!-- <el-checkbox v-model="isIncludeRedPacket">包含红包赠送</el-checkbox>
            <el-checkbox v-model="isIncludeGiveAmount">包含赠送金额</el-checkbox>
            <el-checkbox v-model="isOnlyYB">额外仅补发元宝</el-checkbox> -->
          </p>
          <el-form-item>
            <el-button size="small" type="primary" @click="handleOrder" :loading="handFlag">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="height:500px;border-right:1px dashed #888;float:left;"></div>
      <div class="alignmentright">
        <h4 style="padding-left: 20px;margin-top: 10px;">整区补发</h4>
        <el-divider style="width: 90%;"></el-divider>
        <el-form label-width="100px">
          <el-form-item label="游戏分组：">
            <el-select v-model="gameGroup" popper-class="gs_colorSelcet" size="small" placeholder="请选择" @change="groupChanged">
              <el-option v-for="(item, i) in gameGroupdrow" :class="'templateColor' + item.templateColor"
                :key="'gameGroup' + i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏模板：">
            <el-select v-model="template" popper-class="gs_colorSelcet" size="small" placeholder="请选择" @change="templateChanged">
              <el-option v-for="(item, i) in templateDropdown" :class="'templateColor' + item.templateColor"
                :key="'template' + i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏分区：">
            <el-select v-model="gamearea" popper-class="gs_colorSelcet" size="small" placeholder="请选择">
              <el-option v-for="(item, i) in gameDivisiondrow" :class="'templateColor' + item.templateColor"
                :key="'gamearea' + i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自动补发：">
            <el-date-picker style="width:216px;" v-model="datetime" size="small" type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
            </el-date-picker>
            <el-checkbox class="mgl10" v-model="checked"></el-checkbox>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker style="width:190px;" v-model="time1" size="small" type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
            </el-date-picker> 至
            <el-date-picker style="width:190px;" v-model="time2" default-time="23:59:59" size="small" type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
            </el-date-picker>
            <!-- <el-date-picker style="width:338px;" v-model="time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
          </el-form-item>
          <el-form-item label="额外补发：">
            <el-input style="width: 19%;" size="small" v-model="extra"></el-input> %
          </el-form-item>
          <p class="mgl20 mgt10">
            <el-checkbox v-model="isLoadPartition">整区补发前加载分区</el-checkbox>
          </p>
          <p class="mgl20 mgt10 mgb20">
            <el-checkbox v-model="isIncludeManual">包含手动充值</el-checkbox>
            <el-checkbox v-model="isIncludeRedPacket">包含红包赠送</el-checkbox>
            <el-checkbox v-model="isIncludeGiveAmount">包含赠送金额</el-checkbox>
            <el-checkbox v-model="isOnlyYB">额外仅补发元宝</el-checkbox>
          </p>
          <el-form-item label="选项：">
            <el-checkbox class="mgl10" v-model="checked">清理数据<span style="color: red;">（重新生成金额文件，通区充值慎用，可能会给玩家造成损失）</span></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="allOrder" :loading="areaFlag">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tablebox pdb15">
        <div class="gs_tablebox">
          <el-table ref="moduleTable" size="mini" :data="orderlist1.tableData" border style="width: 100%" stripe>
            <el-table-column prop="date" label="补发时间">
              <template slot-scope="scope">
                <p style="height:18px;">{{ scope.row.reissueDate.split(' ')[0] }}</p>
                <p style="height:18px;color:#999;">{{ scope.row.reissueDate.split(' ')[1] }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="serialNumber" label="业务流水" width="210">
            </el-table-column>
            <el-table-column prop="partitionsName" label="所属分区" width="280">
            </el-table-column>
            <el-table-column prop="playerAccount" label="玩家账号">
            </el-table-column>
            <el-table-column prop="productName" label="付款方式">
            </el-table-column>
            <el-table-column prop="amount" label="补发金额">
              <template slot-scope="scope">
                <span>{{ scope.row.amount.toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="补发方式">
              <template slot-scope="scope">
                <span>{{ scope.row.type ? '手动补发' : '整区补发' }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mgt15 pdl20">
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" background
            :page-sizes="[10, 20, 30, 40]" :current-page="orderlist1.pageIndex" :page-size="orderlist1.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="orderlist1.total">
          </el-pagination>
        </div>
      </div>
      <!-- <div class="tabbox" style="float:none;">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="补发任务" name="0">
            <div class="tablebox pdb15 pdt20">
              <div class="gs_tablebox">
                <el-table ref="moduleTable" size="mini" :data="orderlist1.tableData" border style="width: 100%" stripe>
                  <el-table-column prop="date" label="补发时间">
                    <template slot-scope="scope">
                      <p style="height:18px;">{{scope.row.reissueDate.split(' ')[0]}}</p>
                      <p style="height:18px;color:#999;">{{scope.row.reissueDate.split(' ')[1]}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="serialNumber" label="业务流水" width="190">
                  </el-table-column>
                  <el-table-column prop="partitionsName" label="所属分区">
                  </el-table-column>
                  <el-table-column prop="playerAccount" label="玩家账号">
                  </el-table-column>
                  <el-table-column prop="productName" label="付款方式">
                  </el-table-column>
                  <el-table-column prop="amount" label="补发金额">
                    <template slot-scope="scope">
                      <span>{{scope.row.amount.toFixed(2)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="补发方式">
                    <template slot-scope="scope">
                      <span>{{scope.row.type?'手动补发':'整区补发'}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="mgt15 pdl20">
                <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" background :page-sizes="[10, 20, 30, 40]" :current-page="orderlist1.pageIndex" :page-size="orderlist1.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="orderlist1.total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="定时任务" name="1">
            <div class="tablebox pdb15 pdt20">
              <div class="gs_tablebox">
                <el-table ref="moduleTable" size="mini" :data="orderlist2.tableData" border style="width: 100%" stripe>
                  <el-table-column prop="date" label="创建时间">
                    <template slot-scope="scope">
                      <p style="height:18px;">{{scope.row.createDate.split(' ')[0]}}</p>
                      <p style="height:18px;color:#999;">{{scope.row.createDate.split(' ')[1]}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="任务名称">
                  </el-table-column>
                  <el-table-column prop="description" label="任务描述">
                  </el-table-column>
                  <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                      <span>{{scope.row.state===0?'未完成':'已完成'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" @click="handleClose(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="mgt15 pdl20">
                <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" background :page-sizes="[10, 20, 30, 40]" :current-page="orderlist2.pageIndex" :page-size="orderlist2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="orderlist2.total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '0',
      handFlag: false, // 手动补发圈
      areaFlag: false, // 整区补发圈      
     
      rechargemodepage: '', // 充值方式
      rechargemodedrow: [], // 充值方式下拉
      gameGroupdrow: [], // 游戏分组下拉
      gameGroup: '', // 游戏分组
      templateDropdown:[], //模板下拉
      template:'', //选中模板
      gameDivisiondrow: [], // 游戏分区下拉
      gamearea: '', // 游戏分区   
      gameaccount: '', // 游戏账号
      amountofrecharge: '', // 充值金额
      handextra: '', // 额外补发
      isGiveAmount: false, // 不含赠送金额
      isRedPacketAmount: false, // 包含红包赠送
     
      datetime: '', // 自动补发
      checked: false, // 自动补发时间勾选
      time1: this.getCerentTime(true), // 日期
      time2: this.getCerentTime(false), // 日期
      extra: '', // 额外补发
      isLoadPartition: false,
      isIncludeManual: false,
      isIncludeRedPacket: false,
      isIncludeGiveAmount: false,
      isOnlyYB: false,
      orderlist1: {
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        tableData: []
      },
      orderlist2: {
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        tableData: []
      }
    };
  },
  watch: {
    datetime(n, o) {
      this.time2 = n;
    }
  },
  methods: {
    //分组
    groupChanged(data) {
      console.log(111);
      for (let a = 0; a < this.gameGroupdrow.length; a++) {
        if (data == this.gameGroupdrow[a].id) {
          this.templateDropdown = this.gameGroupdrow[a].reissueTemplates;
          this.template='';
          this.gamearea = ''; // 游戏分区
        }
      }
    },
    //模板
    templateChanged(data) {
      for (let a = 0; a < this.templateDropdown.length; a++) {
        if (data == this.templateDropdown[a].id) {
          this.gameDivisiondrow = this.templateDropdown[a].partitions;
          this.gamearea = ''; // 游戏分区
        }
      }
    },
    // 游戏分组下拉
    gameteamDrow() {
      this.$api.reorder
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
    // tab切换
    handleClick() {
      if (this.activeName === '0') {
        this.getlist();
      } else {
        this.getlist1();
      }
    },
    // 游戏分区下拉
    gameareaDrow() {
      this.$api.reorder
        .gamelist()
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
    // 充值方式下拉
    gamepayDrow() {
      this.$api.reorder
        .payDrow()
        .then((data) => {
          if (data.status === 200) {
            this.rechargemodedrow = data.data;
          } else if (data.status === 204) {
            this.rechargemodedrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 手动补单接口发送
    handOrder() {
      this.$api.reorder
        .handOrder({
          partitionId: this.gamearea,
          productId: this.rechargemodepage,
          playerAccount: this.gameaccount,
          payAmount: parseFloat(this.amountofrecharge),
          Extra: this.handextra === '' ? 0 : parseInt(this.handextra),
          isGiveAmount: this.isGiveAmount,
          isRedPacketAmount: this.isRedPacketAmount
        })
        .then((data) => {
          if (data.status === 200) {
            this.gamearea = '';
            this.rechargemodepage = '';
            this.gameaccount = '';
            this.amountofrecharge = '';
            this.isGiveAmount = false;
            this.isRedPacketAmount = false;
            this.handextra = '';
            this.$messageSuccess('补发成功！');
            this.getlist();
            this.handFlag = false;
          }
        })
        .catch((err) => {
          this.handFlag = false;
          this.$messageError(err.message);
        });
    },
    // 手动补单
    handleOrder() {
      if (!this.handFlag) {
        if (this.gamearea === '') {
          this.$messageError('请选择游戏分区！');
          return;
        } else if (this.rechargemodepage === '') {
          this.$messageError('请选择充值方式！');
          return;
        } else if (this.gameaccount === '') {
          this.$messageError('请输入游戏帐号！');
          return;
        } else if (this.amountofrecharge === '') {
          this.$messageError('请输入充值金额！');
          return;
        } else if (this.handextra.toString().indexOf('.') > -1) {
          this.$messageError('额外补发必须为整数！');
          return;
        }
        this.handFlag = true;
        this.handOrder();
        // 分区检测
      //   this.$api.groupmange
      //     .checkLink({
      //       partitionId: this.gamearea
      //     })
      //     .then((data) => {
      //       if (data.status === 200) {
      //         let keyValue = data.data;
      //         if (keyValue === 'success') {
      //           this.handOrder();
      //           return;
      //         }
      //         let indexNum = 0;
      //         // this.$messageSuccess('检测成功！');
      //         let handletimer = setInterval(() => {
      //           this.$api.groupmange
      //             .timerCheck({
      //               checkKey: keyValue
      //             })
      //             .then((data) => {
      //               clearInterval(handletimer);
      //               handletimer = null;
      //               this.handOrder();
      //             })
      //             .catch(() => {
      //               indexNum++;
      //               if (indexNum > 6) {
      //                 clearInterval(handletimer);
      //                 handletimer = null;
      //                 this.handFlag = false;
      //                 this.$messageError('分区检测失败！');
      //               }
      //             });
      //         }, 3000);
      //       }
      //     })
      //     .catch(() => {
      //       this.handFlag = false;
      //       this.$messageError('分区检测失败！');
      //     });
      }
    },
    // 整区补单接口发送
    areaOrder() {
      this.$api.reorder
        .allOrder({
          partitionId: this.gamearea,
          autoReissueDate: this.datetime,
          startTime: this.time1,
          endTime: this.time2,
          extra: this.extra === '' ? 0 : parseInt(this.extra),
          isLoadPartition: this.isLoadPartition,
          isIncludeManual: this.isIncludeManual,
          isIncludeRedPacket: this.isIncludeRedPacket,
          isIncludeGiveAmount: this.isIncludeGiveAmount,
          isOnlyYB: this.isOnlyYB,
          isAutoReissue: this.checked
        })
        .then((data) => {
          if (data.status === 200) {
            this.gamearea = ''; // 游戏分区
            this.datetime = ''; // 自动补发
            this.time1 = this.getCerentTime(true); // 日期
            this.time2 = this.getCerentTime(false);
            this.extra = ''; // 额外补发
            this.isLoadPartition = false;
            this.isIncludeManual = false;
            this.isIncludeRedPacket = false;
            this.isIncludeGiveAmount = false;
            this.isOnlyYB = false;
            this.areaFlag = false;
            if (this.checked) {
              this.$messageSuccess('定时任务已设置!');
            } else {
              this.$messageSuccess('补发成功!');
            }
            this.checked = false;
            this.getlist();
          }
        })
        .catch((err) => {
          this.areaFlag = false;
          this.$messageError(err.message);
        });
    },
    // 整区补单
    allOrder() {
      if (!this.areaFlag) {
        if (this.gamearea === '') {
          this.$messageError('请选择游戏分区！');
          return;
        } else if (this.extra.toString().indexOf('.') > -1) {
          this.$messageError('额外补发必须为整数！');
          return;
        }
        this.areaFlag = true;
        // 分区检测
        this.$api.groupmange
          .checkLink({
            partitionId: this.gamearea
          })
          .then((data) => {
            if (data.status === 200) {
              let keyValue = data.data;
              if (keyValue === 'success') {
                this.areaOrder();
                return;
              }
              let indexNum = 0;
              let areaTimer = setInterval(() => {
                this.$api.groupmange
                  .timerCheck({
                    checkKey: keyValue
                  })
                  .then((data) => {
                    clearInterval(areaTimer);
                    areaTimer = null;
                    this.areaOrder();
                  })
                  .catch(() => {
                    indexNum++;
                    if (indexNum > 6) {
                      clearInterval(areaTimer);
                      areaTimer = null;
                      this.areaFlag = false;
                      this.$messageError('分区检测失败！');
                    }
                  });
              }, 3000);
            }
          })
          .catch(() => {
            this.areaFlag = false;
            this.$messageError('分区检测失败！');
          });
      }
    },
    // 补发任务list
    getlist() {
      this.$api.reorder
        .orderList1({
          PageNumber: this.orderlist1.pageIndex,
          PageSize: this.orderlist1.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.orderlist1.tableData = [];
            this.orderlist1.total = 0;
          } else if (data.status === 200) {
            this.orderlist1.tableData = data.data;
            this.orderlist1.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 定时任务list
    getlist1() {
      this.$api.reorder
        .orderList2({
          PageNumber: this.orderlist2.pageIndex,
          PageSize: this.orderlist2.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.orderlist2.tableData = [];
            this.orderlist2.total = 0;
          } else if (data.status === 200) {
            this.orderlist2.tableData = data.data;
            this.orderlist2.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 补发任务当每页条数变化时
    handleSizeChange1(data) {
      this.orderlist1.pageSize = data;
      this.orderlist1.pageIndex = 1;
      this.getlist();
    },
    // 补发任务当前的页码变化时
    handleCurrentChange1(data) {
      this.orderlist1.pageIndex = data;
      this.getlist();
    },
    // 删除选中行
    handleClose(id) {
      this.$confirm('删除后数据将无法恢复，是否确定?')
        .then(() => {
          this.delTask(id);
        })
        .catch(() => { });
    },
    // 删除请求
    delTask(id) {
      this.$api.reorder
        .delTask({
          id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('删除成功！');
            if (this.orderlist2.tableData.length === 1) {
              this.orderlist2.pageIndex =
                this.orderlist2.pageIndex === 1
                  ? 1
                  : this.orderlist2.pageIndex - 1;
            }
            this.getlist1();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 定时任务当每页条数变化时
    handleSizeChange2(data) {
      this.orderlist2.pageSize = data;
      this.orderlist2.pageIndex = 1;
      this.getlist1();
    },
    // 定时任务当前的页码变化时
    handleCurrentChange2(data) {
      this.orderlist2.pageIndex = data;
      this.getlist1();
    }
  },
  created() {
    this.gameteamDrow();
    this.gameareaDrow();
    this.gamepayDrow();
    this.getlist();
    if (this.$route.query.id) {
      this.gamearea = this.$route.query.id;
      this.gamearea = this.$route.query.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.opeartbox {
  height: 500px;
  padding: 0 20px 10px;
  background: #fff;
  overflow: hidden;

  .el-form-item {
    margin-bottom: 5px;
  }
}

.tablebox {
  background: #fff;
}

.alignmentleft {
  float: left;
  width: 40%;
  margin-left: 20px;
}

.alignmentright {
  width: 55%;
  float: right;
}</style>
