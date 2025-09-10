<!--
 * @Description: 代理系统
 * @Author: gao shuai
 * @Date: 2020-05-18 09:46:49
 * @LastEditTime: 2020-08-24 15:20:31
 * @LastEditors: gao shuai
-->

<template>
  <div class="home">
    <div class="gs_title">扣单记录</div>
    <div class="gs_tabbox clearfix mgt15">
      <form class="deductedlog-form">
        <div class="row">
          <label>充值时间：</label>
          <el-date-picker v-model="query.chargeTimeStart" type="date" placeholder="开始日期" size="small" class="input-short" />
          <label>订单号：</label>
          <el-input v-model="query.orderNo" size="small" class="input-short" />
          <label>商户ID：</label>
          <el-input v-model="query.merchantId" size="small" class="input-short" />
          <label>订单状态：</label>
          <el-select v-model="query.status" size="small" class="input-short">
            <el-option label="充值成功" value="success" />
            <el-option label="充值失败" value="fail" />
            <el-option label="全部" value="" />
          </el-select>
          <el-button type="primary" size="small" class="ml8" @click.prevent="search">开始查询</el-button>
        </div>
        <div class="row">
          <label>截止时间：</label>
          <el-date-picker v-model="query.chargeTimeEnd" type="date" placeholder="截止日期" size="small" class="input-short" />
          <label>充值卡号：</label>
          <el-input v-model="query.cardNo" size="small" class="input-short" />
          <label>游戏账号：</label>
          <el-input v-model="query.gameAccount" size="small" class="input-short" />
          <label>充值方式：</label>
          <el-select v-model="query.chargeType" size="small" class="input-short">
            <el-option label="全部" value="" />
            <el-option label="方式1" value="1" />
            <el-option label="方式2" value="2" />
          </el-select>
          <el-button size="small" class="ml8" @click.prevent="reset">重置查询</el-button>
        </div>
        <div class="summary-row">
          <span>共 <b>{{summary.count}}</b> 笔</span>
          <span class="sep">|</span>
          <span>充值金额合计：<b>{{summary.amount}}</b> 元</span>
          <span class="sep">|</span>
          <span>代理收入：<b>{{summary.agentIncome}}</b> 元</span>
        </div>
      </form>
      <el-table :data="tableData" border style="width:100%;margin-top:12px;" size="small" :header-cell-style="{background:'#f8fafd',color:'#333',fontWeight:'bold'}">
        <el-table-column prop="orderNo" label="订单号" align="center" min-width="120"/>
        <el-table-column prop="merchantId" label="商户ID" align="center" min-width="90"/>
        <el-table-column prop="zone" label="所属分区" align="center" min-width="100"/>
        <el-table-column prop="chargeType" label="充值方式" align="center" min-width="100"/>
        <el-table-column prop="amount" label="金额" align="center" min-width="80"/>
        <el-table-column prop="agentIncome" label="代理收入" align="center" min-width="90"/>
        <el-table-column prop="chargeTime" label="充值时间" align="center" min-width="140"/>
        <el-table-column label="操作" align="center" min-width="80">
          <template slot-scope="scope">
            <el-button type="text" size="mini" style="color:#409EFF;">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div v-if="tableData.length === 0" class="no-record">暂无记录</div> -->
    </div>
  </div>
</template>

<script>
import { loginUrl } from '../../assets/js/version';
export default {
  inject: ['reload'],
  data() {
    return {
      activeName: '0',
      subMerchant: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rateDraw: [],
        tableData: [],
        dialog: {
          show: false,
          nickName: '',
          name: '',
          password: '',
          mail: '',
          qq: '',
          phone: '',
          rate: ''
        }
      },
      form: {
        siteName: '',
        agentDomain: '',
        registerUrl: '',
        chargeDomain: '',
        phone: '',
        serviceQQ: '',
        techQQ: '',
        copyright: '',
        statCode: ''
      },
      query: {
        chargeTimeStart: '',
        chargeTimeEnd: '',
        orderNo: '',
        merchantId: '',
        status: 'success',
        cardNo: '',
        gameAccount: '',
        chargeType: ''
      },
      summary: {
        count: 0,
        amount: '0.00',
        agentIncome: '0.00'
      },
      tableData: []
    };
  },
  methods: {
    // 下属商户列表
    getlist() {
      this.$api.agent
        .submerchantList({
          PageNumber: this.subMerchant.pageIndex,
          PageSize: this.subMerchant.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.subMerchant.tableData = [];
            this.subMerchant.total = 0;
          } else if (data.status === 200) {
            this.subMerchant.tableData = data.data;
            this.subMerchant.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 比率组下拉
    rankDraw() {
      this.$api.agent
        .rankDraw()
        .then((data) => {
          if (data.status === 200) {
            this.subMerchant.rateDraw = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 添加商户
    addMerchant() {
      if (this.subMerchant.dialog.nickName === '') {
        this.$messageError('请输入昵称！');
        return;
      } else if (this.subMerchant.dialog.name === '') {
        this.$messageError('请输入用户名！');
        return;
      } else if (this.subMerchant.dialog.password === '') {
        this.$messageError('请输入密码！');
        return;
      } else if (this.subMerchant.dialog.mail === '') {
        this.$messageError('请输入邮箱！');
        return;
      } else if (this.subMerchant.dialog.qq === '') {
        this.$messageError('请输入联系qq！');
        return;
      } else if (this.subMerchant.dialog.phone === '') {
        this.$messageError('请输入联系电话！');
        return;
      } else if (this.subMerchant.dialog.rate === '') {
        this.$messageError('请选择比率组！');
        return;
      }
      this.$api.agent
        .addMerchant({
          nickname: this.subMerchant.dialog.nickName,
          loginName: this.subMerchant.dialog.name,
          password: this.subMerchant.dialog.password,
          email: this.subMerchant.dialog.mail,
          qqNumber: this.subMerchant.dialog.qq,
          phoneNumber: this.subMerchant.dialog.phone,
          rankId: this.subMerchant.dialog.rate
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('新增商户成功！');
            this.subMerchant.dialog.show = false;
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 添加商户弹框初始化
    subMerchantInit() {
      this.subMerchant.dialog.nickName = '';
      this.subMerchant.dialog.name = '';
      this.subMerchant.dialog.password = '';
      this.subMerchant.dialog.mail = '';
      this.subMerchant.dialog.qq = '';
      this.subMerchant.dialog.phone = '';
      this.subMerchant.dialog.rate = '';
    },
    // 用户名不能中文
    noChinese() {
      this.subMerchant.dialog.name = this.subMerchant.dialog.name.replace(
        /[\u4E00-\u9FA5]/g,
        ''
      );
    },
    // 保存设置
    saveSetting() {
      this.$message.success('保存成功');
    },
    search() {
      // 查询逻辑
    },
    reset() {
      this.query = {
        chargeTimeStart: '',
        chargeTimeEnd: '',
        orderNo: '',
        merchantId: '',
        status: 'success',
        cardNo: '',
        gameAccount: '',
        chargeType: ''
      };
    }
  },
  created() {
    this.getlist();
    this.rankDraw();
  }
};
</script>

<style lang="scss" scoped>
.gs_tabbox {
  background: #fff;
  padding: 20px 0 20px 0;
  border-radius: 6px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}
.deductedlog-form {
  margin-bottom: 8px;
  padding: 8px 12px 0 12px;
  background: #f8fafd;
  border-radius: 4px;
  border: 1px solid #e6eaf2;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  flex-wrap: wrap;
  font-size: 14px;
  label {
    color: #666;
    margin-right: 6px;
    min-width: 60px;
    text-align: right;
  }
}
.input-short {
  width: 120px !important;
  margin-right: 12px !important;
}
.ml8 {
  margin-left: 8px !important;
}
.summary-row {
  margin: 10px 0 0 0;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  b {
    color: #f60;
    font-weight: 500;
    margin: 0 2px;
  }
  .sep {
    color: #bbb;
    margin: 0 12px;
    font-size: 13px;
  }
}
.no-record {
  color: #999;
  font-size: 15px;
  margin: 18px 0 0 18px;
  text-align: left;
}
</style>
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
.orderForm {
  // margin-top: 10px;
  background: #fff;
  padding-top: 5px;
  padding-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #d9edf7;
  color: #999;
}
.font {
  color: #06859a;
  font-size: 15px;
  // font-weight: bold;
}
.weight {
  width: 18%;
  padding-bottom: 5px;
  color: #06859a;
  font-size: 15px;
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
.roadlist {
  border: 1px solid #ccc;
  width: 753px;
  li {
    float: left;
    width: 250px;
    height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    margin-bottom: -1px;
    &:nth-child(3n + 2) {
      border-right: none;
    }
    .tit {
      display: inline-block;
      vertical-align: middle;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .content {
      display: inline-block;
      vertical-align: middle;
      width: 100px;
      height: 32px;
      padding: 4px 9px;
      text-align: center;
    }
  }
}
.stateColor {
  background: red;
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
  &:after {
    content: '';
    position: absolute;
    border: 1px solid red;
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
    border-right-color: red;
  }
}
.checkdetail {
  cursor: pointer;
  &:hover {
    color: #0099ff;
    text-decoration: underline;
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
.gs_tabbox {
  background: #fff;
  padding: 20px 0 20px 0;
}
.deductedlog-form {
  margin-bottom: 8px;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  flex-wrap: wrap;
}
.summary-row {
  margin: 8px 0 0 0;
  color: #333;
  font-size: 14px;
  b {
    color: #f60;
    font-weight: 500;
    margin: 0 2px;
  }
}
.no-record {
  color: #1a3a6b;
  font-size: 15px;
  margin: 12px 0 0 12px;
}
</style>
    }
  }
  &:after {
    content: '';
    position: absolute;
    border: 1px solid red;
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
    border-right-color: red;
  }
}
.checkdetail {
  cursor: pointer;
  &:hover {
    color: #0099ff;
    text-decoration: underline;
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
