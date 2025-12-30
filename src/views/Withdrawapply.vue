<!--
 * @Description: 提现申请
 * @Author: gao shuai
 * @Date: 2020-05-16 09:10:49
 * @LastEditTime: 2020-07-15 18:11:01
 * @LastEditors: gao shuai
-->

<template>
  <div class="home">
    <div class="gs_title" style="color: white;">提现申请</div>
    <div class="textBox">
      <p>提现声明：请不要同一天内屡次小额提现，这种情况属于恶意提现，以免财务结算时产生错误对你造成损失。</p>
      <p>到账时间：特殊情况除外，如超过12小时不到账，请与客服联系。</p>
      <p>注意事项：系统结算时间内，提现功能暂不可使用。</p>
    </div>
    <div class="contentList">
      <span class="recordBtn">
        <el-button size="small" type="success" @click="$router.push({path:'/main/Withdrawalrecords'})">查看提现记录</el-button>
      </span>
      <ul>
        <li class="clearfix">
          <span class="tit">账户余额：</span>
          <div class="inputbox">
            <span class="account" :class="{'unable':!isfrozen}">{{account}} 元</span>
            <span class="frozen" v-if="!isfrozen">已冻结</span>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">手续费：</span>
          <div class="inputbox">
            <span style="color:red;">{{fee}} 元</span>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">银行：</span>
          <div class="inputbox">
            {{bankName}}
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">收款人：</span>
          <div class="inputbox">
            {{player}}
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">银行账号：</span>
          <div class="inputbox">
            {{bankNumber}}
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">申请金额：</span>
          <div class="inputbox">
            <el-input style="width: 120px;" size="small" type="number" :disabled="cansettle===0" v-model="money" @input="applyMoney" placeholder="输入金额"></el-input>
            <!-- <span class="tip" style="color:red;">帐户余额不足</span> -->
            <span class="tip" style="color:#409eff;">{{'(≤ '+ cansettle +' 元)'}}</span>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit"></span>
          <div class="inputbox">
            <el-button size="small" type="primary" @click="withdraw">确定提现</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: 0, // 账户余额
      isfrozen: true, // 是否冻结
      fee: 0, // 手续费
      bankName: '', // 银行
      player: 0, // 收款人
      bankNumber: '', // 银行账号
      cansettle: 0, // 可提现金额
      money: ''
    };
  },
  methods: {
    // 获取信息
    getInfo() {
      this.$api.home
        .withdrawApply()
        .then((data) => {
          if (data.status === 200) {
            this.account = data.data.overMoney;
            this.fee = data.data.fee.toFixed(2);
            this.bankName = data.data.bankName;
            this.player = data.data.realName;
            this.bankNumber = data.data.bankNumber;
            this.cansettle = data.data.canSettlementMoney;
            this.isfrozen = data.data.activated;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 输入限制
    applyMoney(num) {
      if (num > this.cansettle) {
        this.money = this.cansettle;
      }
    },
    // 申请提现
    withdraw() {
      this.$api.home
        .withdrawSumbit({
          Amount: parseFloat(this.money)
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('提现成功！');
            this.$router.replace({ path: '/main/home' });
            // this.money = '';
            // this.getInfo();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.textBox {
  margin: 10px 0;
  padding: 10px 20px;
  background: #d9edf7;
  color: #008194;
  font-size: 14px;
  border-radius: 4px;
  p {
    margin-bottom: 5px;
  }
}
.contentList {
  text-align: center;
  margin-top: 20px;
  position: relative;
  .recordBtn {
    position: absolute;
    top: 0;
    right: 10px;
  }
  ul {
    display: inline-block;
    padding-right: 80px;
    li {
      margin-bottom: 10px;
      .tit {
        float: left;
        width: 120px;
        text-align: right;
        margin-right: 15px;
        height: 32px;
        line-height: 32px;
      }
      .inputbox {
        float: left;
        height: 32px;
        line-height: 32px;
        .account {
          color: green;
          &.unable {
            text-decoration: line-through;
            color: #999;
          }
        }
        .tip {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
        }
      }
    }
  }
}
.frozen {
  background: red;
  margin-left: 20px;
  color: #fff;
  display: inline-block;
  padding-left: 5px;
  position: relative;
  height: 22px;
  line-height: 22px;
  &:after {
    content: '';
    position: absolute;
    border: 1px solid red;
    border-width: 11px 5px;
    top: 0;
    right: -10px;
    border-right-color: transparent;
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
</style>
