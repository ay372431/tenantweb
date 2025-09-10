<template>
  <div class="passwordList">
    <ul>
      <li class="clearfix">
        <span class="tit">收 款 人：</span>
        <div class="content">
          <el-input style="width: 300px" type="text" size="small" v-model="BankAccountName"
            placeholder="请输入收款人姓名"></el-input>
        </div>
      </li>
      <!-- <li class="clearfix">
        <span class="tit">身份证号：</span>
        <div class="content">
          <el-input
            style="width: 300px"
            type="text"
            size="small"
            v-model="IdCard"
            placeholder="请输入身份证号"
          ></el-input>
        </div>
      </li> -->
      <li class="clearfix">
        <span class="tit">银行账号：</span>
        <div class="content">
          <el-input style="width: 300px" type="text" size="small" v-model="BankAccountNo"
            placeholder="请输入银行账号"></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span class="tit">支付金额：</span>
        <div class="content">
          <el-input style="width: 300px" type="text" size="small" v-model="PaidAmount" placeholder="请输入支付金额"
            @input="handleInput" autocomplete="off"></el-input>
        </div>
      </li>
      <!-- <li class="clearfix">
        <span class="tit">手 机 号：</span>
        <div class="content">
          <el-input
            style="width: 300px"
            type="text"
            size="small"
            v-model="PhoneNumber"
            placeholder="请输入手机号"
          ></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span class="tit">银行名称(可选)：</span>
        <div class="content">
          <el-input
            style="width: 300px"
            type="text"
            size="small"
            v-model="BankName"
            placeholder="请输入银行名称"
          ></el-input>
        </div>
      </li> -->
      <!-- <li class="clearfix">
        <span class="tit">开户城市(可选)：</span>
        <div class="content">
          <el-input
            style="width: 300px"
            type="text"
            size="small"
            v-model="BankCity"
            placeholder="请输入开户行城市"
          ></el-input>
        </div>
      </li> -->
      <li class="clearfix">
        <span class="tit">二级密码：</span>
        <div class="content">
          <el-input style="width: 300px" type="password" size="small" v-model="SecondPwd" autocomplete="off"
            placeholder="请输入二级密码"></el-input>
        </div>
      </li>
      <li class="clearfix">
        <span class="tit"></span>
        <div class="content">
          <el-button size="small" type="primary" @click="FenYongPaid">确认</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      BankAccountName: '',
      PaidAmount: '',
      BankName: '',
      BankAccountNo: '',
      BankCity: '',
      SecondPwd: '',
      PhoneNumber: '',
      IdCard: ''
    };
  },
  methods: {
    handleInput(value) {
      // 使用正则表达式检查输入的内容是否是数学类型
      // 这里只是一个简单的例子，你可能需要根据你的需求调整正则表达式
      const regex = /^[0-9+\-*/. ]*$/;
      if (!regex.test(value)) {
        // 如果输入不符合要求，可以清除输入或者给予用户提示
        this.PaidAmount = '';

      }
    },
    FenYongPaid() {
      if (this.BankAccountName === '') {
        this.$messageError('请输入收款人姓名');
        return;
      } else if (this.BankAccountNo === '') {
        this.$messageError('请输入银行卡号');
        return;
      } else if (this.SecondPwd === '') {
        this.$messageError('请输入二级密码');
        return;
      } else if (!parseFloat(this.PaidAmount)) {
        this.$messageError('请输入金额');
        return;
      }
      this.$api.personCenter
        .FenYongPaid({
          BankAccountName: this.BankAccountName,
          PaidAmount: this.PaidAmount,
          BankName: this.BankName,
          BankAccountNo: this.BankAccountNo,
          BankCity: this.BankCity,
          SecondPwd: this.SecondPwd,
          PhoneNumber: this.PhoneNumber,
          IdCard: this.IdCard
        })
        .then(data => {
          if (data.status === 200) {
            this.BankAccountName = '';
            this.PaidAmount = '';
            this.BankName = '';
            this.BankAccountNo = '';
            this.BankCity = '';
            this.SecondPwd = '';
            this.PhoneNumber = '';
            this.IdCard = '';
            this.$messageSuccess(data.data);
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  },
  created() { }
};
</script>

<style lang="scss" scoped>
.passwordList {
  background: #fff;
  padding: 70px 20px 30px;

  ul {
    li {
      margin-bottom: 20px;

      .tit {
        float: left;
        color: #555;
        width: 200px;
        text-align: right;
        margin-right: 15px;
        height: 32px;
        line-height: 32px;
      }

      .content {
        float: left;
      }
    }
  }
}
</style>
