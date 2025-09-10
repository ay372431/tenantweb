<template>
  <div class="container">
    <div class="content">
      <div class="loginContainer clearfix">
        <div class="box">
          <h3 class="tit"></h3>
          <div class="imgbox">
            <img src="../../assets/images/login/profile.png" alt="">
          </div>
          <p class="text">Hi,尊贵的用户</p>
          <p class="btnbox">
            <span @click="singin">登录</span>
          </p>
            <span style="display:block; margin-top:15px; color:#404040;font-size:10px" >没有用户？请： <router-link  class="btnReg" tag="li" to="/login/loginregister" style="color:#2e82ff; list-style-type:none; display:inline"  >注册</router-link></span>
        </div>
      </div>
      <ul class="faithbox">
        <li>
          <div class="imgbox"><img style="height:67px;" src="../../assets/images/login/safe.png" alt=""></div>
          <h4>安全 稳定</h4>
          <p>
            SSL 128位传输加密标准 <br>
            订单支付接口的md5摘要认证<br>
            PCI-DSS安全认证
          </p>
        </li>
        <li>
          <div class="imgbox"><img style="height:67px;" src="../../assets/images/login/money.png" alt=""></div>
          <h4>可靠承载重托</h4>
          <p>
            杜绝一切刷宝机制, <br>
            让您的程序运行更加稳定无忧！<br>
            极速提现，让您安心放心！
          </p>
        </li>
        <li>
          <div class="imgbox"><img style="height:67px;" src="../../assets/images/login/server.png" alt=""></div>
          <h4>贴心服务</h4>
          <p>
            7×24小时贴心客服,365天秒结算<br>
            客服解决一切安装问题<br>
            让您的资金无后顾之忧
          </p>
        </li>
      </ul>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
import loginFooter from '../../components/loginFooter';
import Mgr from '../../assets/js/SecurityService';
export default {
  components: {
    loginFooter
  },
  methods: {
    singin() {
      let mgr = new Mgr();
      mgr.signIn();
      // mgr.popupLayer();
    }
  },
  beforeCreate() {
    let mgr = new Mgr();
    mgr.getSignedIn().then(
      (signIn) => {
        console.log('signedIn', signIn);
        // this.signedIn = signIn;
        if (signIn) {
          this.$router.push('/main');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.container {
  background: url(../../assets/images/login/bj.jpg) no-repeat center -2px;
  .content {
    width: 1220px;
    margin: 0 auto;
    height: 100%;
    .loginContainer {
      padding-top: 80px;
      text-align: center;
      .box {
        float: right;
        width: 298px;
        height: 336px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        .tit {
          padding-top: 20px;
          font-size: 27px;
          color: #fff;
        }
        .imgbox {
          margin-top: 16px;
          img {
            width: 125px;
            height: 125px;
          }
        }
        .text {
          margin-top: 14px;
          font-size: 21px;
          color: #fff;
        }
        .btnbox {
          margin-top: 25px;
          span {
            display: inline-block;
            height: 35px;
            line-height: 35px;
            width: 132px;
            border: 2px solid #fff;
            border-radius: 10px;
            color: #fff;
            font-size: 23px;
            cursor: pointer;
            transition: all 0.8s;
            &:hover {
              border-color: #2295fe;
              color: #2295fe;
            }
          }
        }
        .btnReg {
         &:hover {
              border-color: #2295fe;
              color: #2295fe;
            }
        }
      }
    }
    .faithbox {
      margin-top: 125px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      padding: 0 30px;
      li {
        width: 318px;
        height: 185px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        color: #fff;
        .imgbox {
          padding-top: 10px;
        }
        h4 {
          font-size: 21px;
          font-weight: normal;
          margin-top: -5px;
        }
        p {
          font-size: 12px;
          line-height: 20px;
          margin-top: 7px;
        }
      }
    }
  }
}
</style>
