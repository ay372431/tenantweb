<!--
 * @Description: 微信绑定
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-07-28 16:35:02
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff">
      <div class="gs_listcontainer">
        <p class="tip_red">微信绑定</p>
        <!-- 新样式：二维码+说明+按钮 -->
        <div class="wx-bind-box">
          <div class="wx-qrcode-area">
            <img :src="publicQrCode" class="wx-qrcode-img" alt="公众号二维码" />
          </div>
          <div class="wx-bind-info">
            <div class="wx-bind-title">微信资料<span class="wx-bind-status">{{ isBindWei ? '(已绑定)' : '(未绑定)' }}</span></div>
            <div class="wx-bind-step">
              <div>1. 微信扫一扫，关注平台公众号</div>
              <div>2. 关注后点击下方按钮，扫码绑定平台账号</div>
            </div>
            <el-button
              :disabled="bindBtnDisabled"
              class="wx-bind-btn"
              type="primary"
              @click="handleGetBindQr"
            >{{ bindBtnText }}</el-button>
            <div v-if="showBindQr" class="bind-qrcode-area">
              <img :src="bindQrCode" class="wx-qrcode-img" alt="绑定二维码" />
              <div class="bind-qrcode-tip">请用微信扫描左侧二维码进行账号绑定</div>
            </div>
          </div>
        </div>
        <!-- 仅在有绑定微信时显示表格，否则显示提示 -->
        <!-- <template v-if="isbindWeilist.length > 0">
          <table class="bindwei">
            <tr>
              <td class="tit">已绑定微信</td>
              <td style="padding-left: 18px; padding-right:80px;position: relative;">
                <el-tag v-for="(item,i) in isbindWeilist" :key="'isbind'+i" closable type="success" @close="unbindWeixin(item.openId)">
                  {{item.nickname}}
                </el-tag>
                <span v-if="!secondValue" class="authority" @click="dialog1.show=true">权限管理</span>
              </td>
            </tr>
          </table>
        </template>
        <template v-else>
          <div class="bindwei" style="padding: 12px 18px; color: #888;">
            暂无绑定微信
            <span v-if="!secondValue" class="authority" @click="dialog1.show=true">权限管理</span>
          </div>
        </template> -->
        <p style="font-size: 14px;margin-top:18px;">注：更多精彩内容请关注平台 微信公众号，我们将在第一时间为您推送平台最新消息！</p>
      </div>
    </div>
    <!-- <div class="bg_fff mgt20" v-if="isbindWeilist.length>0&&secondValue">
      <div class="weixinbox">
        <p class="tip_red">微信权限管理</p>
        <table>
          <tr v-for="(item,i) in isbindWeilist" :key="'Authority'+i">
            <td class="tit_td">{{item.nickname}}</td>
            <td>
              <ul class="clearfix1">
                <li class="clearfix1">
                  <span class="tit">发送充值信息</span>
                  <div class="contbox">
                    <el-switch v-model="item.isSendRecharge" active-color="#13ce66" inactive-color="#ff4949" @change="changeWeixin(item.id,'isSendRecharge',item.isSendRecharge,i)"></el-switch>
                  </div>
                </li>
                <li class="clearfix1">
                  <span class="tit">申请提现</span>
                  <div class="contbox">
                    <el-switch v-model="item.isWithdrawal" active-color="#13ce66" inactive-color="#ff4949" @change="changeWeixin(item.id,'isWithdrawal',item.isWithdrawal,i)"></el-switch>
                  </div>
                </li>
                <li class="clearfix1">
                  <span class="tit">查看提现记录</span>
                  <div class="contbox">
                    <el-switch v-model="item.isWithdrawalLog" active-color="#13ce66" inactive-color="#ff4949" @change="changeWeixin(item.id,'isWithdrawalLog',item.isWithdrawalLog,i)"></el-switch>
                  </div>
                </li>
                <li class="clearfix1">
                  <span class="tit">编辑安装分区</span>
                  <div class="contbox">
                    <el-switch v-model="item.isInstallPartition" active-color="#13ce66" inactive-color="#ff4949" @change="changeWeixin(item.id,'isInstallPartition',item.isInstallPartition,i)"></el-switch>
                  </div>
                </li>
                <li class="clearfix1">
                  <span class="tit">手动补发</span>
                  <div class="contbox">
                    <el-switch v-model="item.isManualReissue" active-color="#13ce66" inactive-color="#ff4949" @change="changeWeixin(item.id,'isManualReissue',item.isManualReissue,i)"></el-switch>
                  </div>
                </li>
                <li class="clearfix1">
                  <span class="tit">整区补发</span>
                  <div class="contbox">
                    <el-switch v-model="item.isAllReissue" active-color="#13ce66" inactive-color="#ff4949" @change="changeWeixin(item.id,'isAllReissue',item.isAllReissue,i)"></el-switch>
                  </div>
                </li>
                <li class="clearfix1">
                  <span class="tit">编辑分组管理</span>
                  <div class="contbox">
                    <el-switch v-model="item.isEditGroup" active-color="#13ce66" inactive-color="#ff4949" @change="changeWeixin(item.id,'isEditGroup',item.isEditGroup,i)"></el-switch>
                  </div>
                </li>
                <li class="clearfix1">
                  <span class="tit">编辑分区管理</span>
                  <div class="contbox">
                    <el-switch v-model="item.isEditPartition" active-color="#13ce66" inactive-color="#ff4949" @change="changeWeixin(item.id,'isEditPartition',item.isEditPartition,i)"></el-switch>
                  </div>
                </li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
    </div> -->
    <!-- 绑定信息二维码 -->
    <el-dialog
      title=""
      :visible.sync="dialogCode.show"
      @close="dialogCodeInit"
      custom-class="gs_dialog"
      width="300px"
    >
      <div class="tc pdt20 pdb25">
        <img style="width:200px;height:200px;" :src="bindQrCode" alt="" />
        <p class="mgt5">请用微信扫描左侧二维码进行账号绑定</p>
      </div>
    </el-dialog>
    <!-- 二级密码的确认 -->
    <el-dialog title="提示" :visible.sync="dialog1.show" @close="dialog1.secondPassword=''" custom-class="gs_dialog" width="400px">
      <div class="passwordBox">
        <span class="tit">二级密码：</span>
        <div class="inputBox">
          <el-input style="width:220px;" type="password" size="small" v-model="dialog1.secondPassword" @keyup.enter.native="authorityClick" placeholder="请输入二级密码"></el-input>
        </div>
      </div>
      <p class="tc pdb10">
        <el-button size="small" type="primary" @click="authorityClick">确定</el-button>
        <el-button size="small" type="info" @click="dialog1.show=false">取消</el-button>
      </p>
    </el-dialog>
    <!-- 解绑微信二级密码的确认 -->
    <el-dialog title="提示" :visible.sync="dialog.show" @close="dialoginit" custom-class="gs_dialog" width="400px">
      <div class="passwordBox">
        <span class="tit">二级密码：</span>
        <div class="inputBox">
          <el-input v-if="isbindFlag" style="width:220px;" type="password" size="small" v-model="dialog.secondPassword" @keyup.enter.native="unbindWei" placeholder="请输入二级密码"></el-input>
          <el-input v-else style="width:220px;" type="password" size="small" v-model="dialog.secondPassword" @keyup.enter.native="bindWei" placeholder="请输入二级密码"></el-input>
        </div>
      </div>
      <p class="tc pdb10">
        <el-button v-if="isbindFlag" size="small" type="primary" @click="unbindWei">确定</el-button>
        <el-button v-else size="small" type="primary" @click="bindWei">确定</el-button>
        <el-button size="small" type="info" @click="dialog.show=false">取消</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
      secondValue: false, // 微信管理二级密码
      serverBind: {
        weixin: ''
      },
      isbindFlag: false, // 二级密码时的绑定和解绑的flag, true为解绑，false为绑定状态
      openId: '',
      isbindWeilist: [], // 已经绑定的微信
      isBindWei: false, // 是否绑定微信
      publicQrCode: require('@/assets/images/qrcode.png'), // 公众号二维码图片路径
      bindQrCode: '', // 绑定二维码
      bindBtnDisabled: false,
      bindBtnText: '关注后，点我绑定',
      showBindQr: false,
      dialog: {
        show: false,
        secondPassword: ''
      },
      dialog1: {
        show: false,
        secondPassword: ''
      },
      dialogCode: {
        show: false
      },
      timer: null
    };
  },
  methods: {
    // 查询是否绑定微信公众号
    isBindWeixi() {
      this.$api.personCenter
        .isBandweixi()
        .then((data) => {
          this.isBindWei = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 轮询是否绑定微信公众号
    checkBindWeixi() {
      this.$api.personCenter
        .isBandsingle()
        .then((data) => {
          if (data.data) {
            clearInterval(this.timer);
            this.timer = null;
            this.dialogCode.show = false;
            this.$messageSuccess('绑定成功！');
            this.isBindWeixi();
            this.getWeixinlist();
          }
        })
        .catch(() => {
          // this.$messageError(err.message);
        });
    },
    // 绑定微信
    bindWei() {
      if (this.dialog.secondPassword === '') {
        this.$messageError('请输入二级密码！');
        return;
      }
      this.$api.personCenter
        .userCode({ password: this.dialog.secondPassword })
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            this.imgurl = data.data.data;
            this.valCode = data.data.valCode;
            console.log(this.valCode);
            this.dialog.show = false;
            this.dialogCode.show = true;
            this.timer = setInterval(() => {
              this.checkBindWeixi();
            }, 1000);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 解绑微信
    unbindWei() {
      if (this.dialog.secondPassword === '') {
        this.$messageError('请输入二级密码！');
        return;
      }
      this.$api.personCenter
        .unbindwei({
          password: this.dialog.secondPassword,
          openId: this.openId
        })
        .then((data) => {
          this.$messageSuccess('解绑成功！');
          this.dialog.show = false;
          this.openId = '';
          this.isbindFlag = false;
          this.isBindWeixi();
          this.getWeixinlist();
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 解绑微信
    unbindWeixin(id) {
      this.isbindFlag = true;
      this.openId = id;
      this.dialog.show = true;
    },
    // 绑定微信二维码的弹框初始化
    dialogCodeInit() {
      this.bindBtnDisabled = false;
      this.bindBtnText = '关注后，点我绑定';
      this.showBindQr = false;
      this.bindQrCode = '';
      clearInterval(this.timer);
      this.timer = null;
    },
    // 获取已绑定的微信列表
    getWeixinlist() {
      this.$api.personCenter
        .isbindWeixin()
        .then((data) => {
          if (data.status === 200) {
            this.isbindWeilist = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 初始化二级密码数据
    dialoginit() {
      this.dialog.secondPassword = '';
      this.isbindFlag = false;
      this.openId = '';
    },
    // 微信权限管理
    changeWeixin(id, str, state, index) {
      this.$api.personCenter
        .changeWeixin({
          id: id,
          permissionName: str,
          state: state
        })
        .then((data) => {
          if (data.status === 200) {
          }
        })
        .catch((err) => {
          this.isbindWeilist[index][str] = !this.isbindWeilist[index][str];
          this.$messageError(err.message);
        });
    },
    // 权限管理二级密码确认
    authorityClick() {
      if (this.dialog1.secondPassword === '') {
        this.$messageError('请输入二级密码！');
        return;
      }
      this.$api.personCenter
        .checkSecondary({
          password: this.dialog1.secondPassword
        })
        .then((data) => {
          if (data.data) {
            this.secondValue = true;
            this.dialog1.show = false;
          } else {
            this.$messageError('二级密码错误');
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    handleGetBindQr() {
      this.bindBtnDisabled = true;
      this.bindBtnText = '获取中...';
      this.$api.personCenter
        .userCode({})
        .then((data) => {
          if (data.status === 200) {
            this.bindQrCode = data.data.data;
            this.showBindQr = true;
            this.dialogCode.show = true;
            this.bindBtnText = '绑定中...';
            this.$message({
              message: '获取绑定二维码成功，请用微信扫描左侧二维码进行账号绑定',
              type: 'success'
            });
            this.timer = setInterval(() => {
              this.checkBindWeixi();
            }, 1000);
          }
        })
        .catch((err) => {
          this.bindBtnDisabled = false;
          this.bindBtnText = '关注后，点我绑定';
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.isBindWeixi();
    this.getWeixinlist();
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style lang="scss" scoped>
.tip_red {
  color: #3c8dbc;
  padding: 10px 0px;
  font-weight: bold;
  font-size: 15px;
}
.gs_listcontainer {
  padding-top: 0;
  padding-bottom: 15px;
  margin-left: 20px;
  .clearfix {
    border: 1px solid #d9edf7;
    width: 95%;
    margin-bottom: 1px;
    padding-left: 0px;
    box-sizing: border-box;
    .mgl20 {
      float: right;
    }
    dt {
      background-color: #d9edf7;
      padding-right: 10px;
    }
    dd {
      padding-top: 5px;
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
.editserverBox {
  padding-left: 20px;
  .list {
    margin-bottom: 10px;
    .tit {
      float: left;
      width: 90px;
      height: 32px;
      line-height: 32px;
    }
    .content {
      float: left;
      width: 250px;
    }
  }
  .serveList {
    li {
      position: relative;
      float: left;
      width: 100px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 15px;
      margin-bottom: 10px;
      overflow: hidden;
      .tit {
        background: #3c8dbc;
        color: #fff;
        height: 22px;
        line-height: 22px;
      }
      .numberbox {
        height: 25px;
        line-height: 25px;
        color: green;
        font-size: 13px;
      }
      &:hover {
        .mask {
          top: 0;
        }
      }
      .mask {
        position: absolute;
        transition: top 0.3s;
        top: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        cursor: pointer;
        line-height: 50px;
      }
    }
  }
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
.bindwei {
  width: 95%;
  border: 1px solid #d9edf7;
  .tit {
    width: 100px;
    background: #d9edf7;
    padding-right: 10px;
    font-size: 14px;
    text-align: right;
    color: #333;
  }
  .el-tag {
    margin: 5px 10px 5px 0;
  }
}
.weixinbox {
  margin-left: 20px;
  .clearfix1:after {
    content: '';
    display: table;
    clear: both;
    border-spacing: 0;
  }
  table {
    width: 95%;
    margin-top: -10px;
    border-collapse: separate;
    border-spacing: 0 10px;
    tr {
      td {
        border: 1px solid #d9edf7;
        ul {
          margin: 0 100px 0 70px;
          li {
            float: left;
            margin-right: 60px;
            .tit {
              float: left;
              height: 40px;
              line-height: 40px;
              font-size: 13px;
              width: 90px;
              text-align: right;
              color: #313131;
            }
            .contbox {
              float: left;
              margin-top: 7px;
              margin-left: 20px;
            }
          }
        }
      }
      .tit_td {
        width: 98px;
        background: #d9edf7;
        padding-right: 10px;
        text-align: right;
        font-size: 14px;
        color: #333;
      }
    }
  }
}
.authority {
  position: absolute;
  font-size: 14px;
  right: 10px;
  top: 12px;
  color: #63aafa;
  cursor: pointer;
}
.wx-bind-box {
  display: flex;
  align-items: flex-start;
  border: 1px solid #e4e4e4;
  padding: 20px;
  margin-bottom: 20px;
  background: #fafbfc;
}
.wx-qrcode-area {
  width: 220px;
  text-align: center;
}
.wx-qrcode-img {
  width: 180px;
  height: 180px;
  border: 1px solid #eee;
}
.wx-bind-info {
  flex: 1;
  margin-left: 40px;
}
.wx-bind-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.wx-bind-status {
  font-size: 14px;
  color: #888;
  margin-left: 10px;
}
.wx-bind-step {
  font-size: 15px;
  margin-bottom: 18px;
  color: #333;
  line-height: 1.8;
}
.wx-bind-btn {
  margin-bottom: 18px;
  width: 180px;
}
.bind-qrcode-area {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.bind-qrcode-tip {
  margin-left: 15px;
  color: #67C23A;
  font-size: 14px;
}
</style>
