<template>
  <div class="container">
    <div class="content">
      <h4 class="title">安全中心</h4>
      <div class="boxcontainer">
        <img src="../../assets/images/login/unable.png" alt="">
        <p class="red_tip">抱歉，该账号疑似非法操作，不能登录当前系统</p>
        <p class="text">
          <span class="txt">请联系工作人员进行审核</span>
          <a v-for="(item,i) in serverQQ" :key="'qq'+i" class="service-qq" data-tooltip-title="点击联系客服" :href="'http://wpa.qq.com/msgrd?v=1&uin='+item.qq+'&site=qq&menu=yes'" target='_blank'>
            <img src="../../assets/images/login/contact_qq.png" alt="">
          </a>
        </p>
      </div>
    </div>
    <login-footer></login-footer>
  </div>
</template>

<script>
import loginFooter from '../../components/loginFooter';
export default {
  components: {
    loginFooter
  },
  data() {
    return {
      serverQQ: []
    };
  },
  methods: {
    // 获取客服的联系QQ
    getinfo() {
      this.$api.login
        .contactinfo()
        .then((data) => {
          if (data.status === 200) {
            this.serverQQ = JSON.parse(data.data.serviceQq).filter((item) => {
              return item.type === 0;
            });
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getinfo();
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 1px;
  background: url(../../assets/images/login/rejester.jpg) no-repeat center top;
  .content {
    width: 1000px;
    margin: 0 auto;
    margin-top: 15px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 6px;
    padding: 1px 30px;
    min-height: 680px;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: 22px;
      color: #373737;
      font-weight: normal;
      padding-top: 10px;
    }
    .boxcontainer {
      text-align: center;
      margin-top: 150px;
    }
    .red_tip {
      margin-top: 35px;
      font-size: 18px;
      color: red;
    }
    .text {
      font-size: 18px;
      color: #5f5f5f;
      margin-top: 10px;
      .txt {
        display: inline-block;
        vertical-align: middle;
        margin-right: 15px;
      }
      .service-qq {
        display: inline-block;
        vertical-align: middle;
        img {
          display: block;
        }
      }
    }
  }
  .dialogContainer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99999;
    .dialogbox {
      .close {
        position: absolute;
        width: 22px;
        height: 22px;
        background: url(../../assets/images/login/cross_img.png) no-repeat
          center center;
        top: 12px;
        right: 12px;
        cursor: pointer;
      }
      position: absolute;
      width: 288px;
      height: 327px;
      background: #fff;
      top: 50%;
      left: 50%;
      margin-top: -163px;
      margin-left: -144px;
      border-radius: 20px;
      overflow: hidden;
      .tit {
        height: 66px;
        line-height: 66px;
        font-size: 24px;
        color: #fff;
        background: #1792e3;
        text-align: center;
        font-weight: normal;
      }
      .box {
        padding-top: 140px;
        background: url(../../assets/images/login/cross.png) no-repeat center
          35px;
        text-align: center;
        .text {
          color: #5f5f5f;
          font-size: 18px;
          margin-top: 5px;
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>
