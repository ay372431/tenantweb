<!--
 * @Description: 完善个人信息
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-07-01 10:59:07
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff pdb15">
      <div class="gs_listcontainer personInfo mgt10">
        <p class="tip_red">电子签约 <span style="color:red;">（以下信息仅作核对之用，如不符将无法通过人脸认证，修改请联系管理员）</span></p>
        <dl class="clearfix">
          <dt>姓名</dt>
          <dd>{{person}} </dd>
        </dl>
       <dl class="clearfix">
          <dt>身份证号</dt>
          <dd>{{idNumber}}</dd>
        </dl>
      </div>
      <p class="mgt15" style="padding-left: 150px">
        <el-button :disabled="disabled" size="small" type="primary" @click="elecSign"
          >{{text}}</el-button
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: '', // 收款人
      idNumber: '',
      text: '开始签约',
      disabled: false
    };
  },
  methods: {

    // 电子签名
    elecSign() {
      this.$api.personCenter
        .elecSign()
        .then((data) => {
          if (data.status === 200) {
            this.$messageError('发起签约成功，请到新打开页面中继续操作');
            window.open(data.data, '_blank');
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getUserBankDetails() {
      this.$api.personCenter
        .getUserBankDetails()
        .then((data) => {
          console.log(data.data);
          if (data.status === 200) {
            this.person = data.data.realName;
            this.idNumber = data.data.idNumber;
            if (data.data.state === 1 || data.data.state === 2 || data.data.state === 3) {
              this.text = '签署中';
              this.disabled = true;
            }
            if (data.data.state === 4 || data.data.state === 5) {
              this.text = '已签署';
              this.disabled = true;
            }
            if (data.data.state === 0) {
              this.text = '开始签约';
              this.disabled = false;
            }
            if (data.data.state === 6) {
              this.text = '签署失败，请重新签署';
              this.disabled = false;
            }
            if (data.data.state === 7) {
              this.text = '已过期，请重新签署';
              this.disabled = false;
            }
            if (data.data.state === 8 || data.data.state === 9) {
              this.text = '已作废，请重新签署';
              this.disabled = false;
            }
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getUserBankDetails();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.tip_red {
  color: #3c8dbc;
  padding: 10px 0px;
  font-weight: bold;
  font-size: 15px;
}
.gs_listcontainer {
  padding-top: 0;
  padding-bottom: 1px;
  margin-left: 20px;
  .clearfix {
    border: 1px solid #d9edf7;
    width: 95%;
    margin-bottom: 1px;
    padding-left: 0px;
    .mgl20 {
      float: right;
    }
    dt {
      background-color: #d9edf7;
      padding-right: 10px;
      height: 42px;
      line-height: 42px;
    }
    dd {
      padding: 5px 0;
    }
  }
}
.mg2 {
  float: right;
  margin-top: -20px;
}
.opeartbox {
  border: 1px solid #00bcd4;
  width: 97%;
}
.line_tip {
  color: #999;
  font-size: 14px;
  margin-left: 20px;
}
.right {
  float: right;
  margin-right: 4%;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>
