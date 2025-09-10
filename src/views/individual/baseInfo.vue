<!--
 * @Description: 个人中心
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-06-23 18:08:56
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff pdb25">
      <!-- 基本资料 -->
      <div class="info-section">
        <div class="info-title">
          基本资料
          <span class="edit-link" @click="onEditBaseInfo">[编辑]</span>
        </div>
        <el-divider></el-divider>
        <table class="custom-table">
          <tr>
            <td class="th">账号名：</td>
            <td>{{ baseInfo.account }}</td>
            <td class="th">联系人：</td>
            <td>{{ baseInfo.contact }}</td>
          </tr>
          <tr>
            <td class="th">网站名称：</td>
            <td>{{ baseInfo.name }}</td>
            <td class="th">域名：</td>
            <td>{{ baseInfo.domain }}</td>
          </tr>
          <tr>
            <td class="th">联系QQ：</td>
            <td>{{ baseInfo.linkQQ }}</td>
            <td class="th">邮箱：</td>
            <td>{{ baseInfo.email }}</td>
          </tr>
          <tr>
            <td class="th">联系电话：</td>
            <td>{{ baseInfo.linkphone }}</td>
            <td class="th">身份证：</td>
            <td>{{ baseInfo.idCard }}</td>
          </tr>
          <tr>
            <td class="th">签约状态：</td>
            <td>{{ baseInfo.signStatus || '现在签约' }}</td>
            <td class="th"></td>
            <td></td>
          </tr>
        </table>
        <div class="info-tip">
          <span class="tip-red">
            注意：以上所有信息必须为本人真实资料，否则后续系统检测不匹配，将导致签署失败！
          </span>
        </div>
      </div>
      <!-- 结算银行 -->
      <div class="info-section" style="margin-top:24px;">
        <div class="info-title">结算银行</div>
        <el-divider></el-divider>
        <table class="custom-table">
          <tr>
            <td class="th">开户银行：</td>
            <td>{{ accountInfo.bank }}</td>
            <td class="th">银行帐号：</td>
            <td>{{ accountInfo.bankcard }}</td>
          </tr>
          <tr>
            <td class="th">收款人：</td>
            <td>{{ accountInfo.userName }}</td>
            <td class="th">身份证：</td>
            <td>{{ accountInfo.idCard }}</td>
          </tr>
          <tr>
            <td class="th">银行预留电话：</td>
            <td>{{ accountInfo.phone }}</td>
            <td class="th">所在地区：</td>
            <td>{{ accountInfo.location }}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 二级密码的确认 -->
    <el-dialog title="提示" :visible.sync="dialog.show" @close="dialog.secondPassword=''" custom-class="gs_dialog" width="400px">
      <div class="passwordBox">
        <span class="tit">二级密码：</span>
        <div class="inputBox">
          <el-input style="width:220px;" type="password" size="small" v-model="dialog.secondPassword" placeholder="请输入二级密码"></el-input>
        </div>
      </div>
      <p class="tc pdb10">
        <el-button size="small" type="primary" @click="sureSeeaccount">确定</el-button>
        <el-button size="small" type="info" @click="dialog.show=false">取消</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseInfo: {
        name: '', // 网站名称
        account: '', // 账号
        contact: '', // 联系人
        domain: '',
        linkQQ: '',
        email: '',
        linkphone: '',
        idCard: '',
        signStatus: '',
      },
      accountInfo: {
        bank: '',
        userName: '',
        bankcard: '',
        idCard: '',
        phone: '',
        location: '',
        eyeflag: false
      },
      dialog: {
        show: false,
        secondPassword: ''
      }
    };
  },
  methods: {
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then((data) => {
          this.baseInfo.name = data.data.nickname;
          this.baseInfo.account = data.data.userName;
          this.baseInfo.contact = data.data.realName;
          this.baseInfo.domain = data.data.domain;
          this.baseInfo.linkQQ = data.data.qqNumber;
          this.baseInfo.email = data.data.email;
          this.baseInfo.linkphone = data.data.phoneNumber;
          this.baseInfo.idCard = data.data.idCard;
          this.baseInfo.signStatus = data.data.signStatus;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取用户银行信息
    getBankInfo() {
      this.$api.personCenter
        .bankInfo()
        .then((data) => {
          this.accountInfo.bank = data.data.bankName;
          this.accountInfo.userName = data.data.realName;
          this.accountInfo.bankcard = data.data.bankNumber;
          this.accountInfo.idCard = data.data.idCard;
          this.accountInfo.phone = data.data.phone;
          this.accountInfo.location = data.data.bankBranch;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    onEditBaseInfo() {
      // 编辑基本资料逻辑
      this.$message.info('编辑基本资料');
    },
    // 查看帐号信息
    seeaccount() {
      if (this.accountInfo.eyeflag) {
        this.accountInfo.eyeflag = false;
        this.getBankInfo();
      } else {
        this.dialog.show = true;
      }
    },
    // 输入二级密码后确认
    sureSeeaccount() {
      if (this.dialog.secondPassword === '') {
        this.$messageError('请输入二级密码！');
        return;
      }
      this.$api.personCenter
        .bankDetail({
          password: this.dialog.secondPassword
        })
        .then((data) => {
          if (data.status === 200) {
            this.accountInfo.bank = data.data.bankName;
            this.accountInfo.userName = data.data.realName;
            this.accountInfo.bankcard = data.data.bankNumber;
            this.accountInfo.location = data.data.bankBranch;
            this.accountInfo.eyeflag = true;
            this.dialog.show = false;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getUser();
    this.getBankInfo();
  }
};
</script>

<style lang="scss" scoped>
.info-section {
  margin-bottom: 18px;
  padding-top: 18px;
  padding-left: 10px;
  padding-right: 10px;
}
.info-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  .edit-link {
    font-size: 13px;
    color: #3c8dbc;
    margin-left: 8px;
    cursor: pointer;
  }
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
  background: #f8fbff;
  margin-bottom: 0;
  font-size: 14px;
  th, td {
    border: 1px solid #dbe7f3;
    padding: 8px 14px;
    vertical-align: middle;
    background: #fff;
  }
  .th {
    background: #eaf3fc;
    color: #333;
    font-weight: 400;
    width: 120px;
    text-align: right;
    border-right: none;
  }
  td {
    min-width: 120px;
    color: #333;
    border-left: none;
  }
  tr td:last-child {
    border-right: 1px solid #dbe7f3;
  }
}
.info-tip {
  background: #f5f7fa;
  color: #ff0000;
  padding: 8px 16px;
  margin-top: 0;
  font-size: 14px;
  border: 1px solid #fbeee0;
}
.tip-red {
  color: #ff0000;
  font-weight: bold;
}
.passwordBox {
  padding-left: 20px;
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 16px;
  .tit {
    display: block;
    width: 100px;
    height: 32px;
    line-height: 32px;
  }
}
</style>
