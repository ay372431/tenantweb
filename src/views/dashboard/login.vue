<template>
    <div>
        <div class="warp-container" style="height: 550px;margin-top: 109px;padding-top: 70px;">
            <div id="login">
                <div class="container">
                    <div class="login-form selected" id="login_normal"
                        style="width: 400px\9;_width:320px;height:400px;float:right; position: relative;">
                        <div class="layui-tab layui-tab-brief" lay-filter="tabLogin">
                            <ul class="layui-tab-title">
                                <li class="layui-this">
                                    <h3>用户登陆</h3>
                                </li>

                            </ul>
                            <div class="layui-tab-content">
                                <div class="layui-tab-item layui-show" id="pass">
                                    <div class="login-in">
                                        <form autocomplete="off" class="fc form-horizontal" method="post">
                                            <ul style="padding-top:10px;">
                                                <li class="l1" style="_margin-bottom:0px">
                                                    <h1 style="_display: none;"><i class="i1"></i></h1>
                                                    <span
                                                        style="_float: left;_margin-top: 8px;display: none;_display: block;">用户名：</span>
                                                    <input v-model="form.username" id="username" name="username"
                                                        class="dz-d" placeholder="邮箱/用户名/已验证手机" type="text" maxlength="30"
                                                        value="">
                                                </li>
                                                <li class="l2" style="_margin-bottom:0px">
                                                    <h1 style="_display: none;"><i class="i2"></i></h1>
                                                    <span
                                                        style="_float: left;_margin-top: 8px;display: none;_display: block;">密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
                                                    <input v-model="form.password" id="password" name="password"
                                                        maxlength="30" class="dz-p" type="password" placeholder="请输入密码"
                                                        value="">
                                                </li>
                                                <div class="input" style="display: flex;align-items: center;gap:10px">
                                                    <el-input placeholder="请输入验证码" :disabled="false" v-model="form.code"
                                                        style="flex: 1"></el-input>
                                                    <img class="qrcode" id="code"
                                                        style="width: 100px; height: 38px;background: #fff;" alt=""
                                                        :src="randomCode" v-on:click="getQrcode()" />
                                                </div>
                                                <li class="l4" style="width: 290px\9;_width: 320px; margin-bottom: 10px;">
                                                    <span
                                                        style="color:#fff; float: right; display: block; height: 24px;line-height:24px;"><a
                                                            href="account/findpwd.html" title="密码找回" class="lightorange2"
                                                            style="float:right;color:#FFF">忘记密码</a></span>
                                                </li>
                                                <li class="l4" style="width: 290px;width:320px; margin-bottom:20px;">
                                                    <input style="text-align: center;" value="登 录" class="button-blue3"
                                                        type="button" @click="handleLogin">
                                                </li>
                                                <li class="l5">
                                                    <span style="color:#fff;cursor: pointer;"
                                                        @click="() => $router.push({ name: 'DashboardRegister' })">
                                                        <a title="新用户注册" class="lightorange2"><strong
                                                                style="font-size: 16px;color:#ffea4a;font-weight: bold;">免费注册</strong></a>
                                                    </span><span class="forgetcode"></span>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="container" style=" padding:50px 0px 0px 0px;">
            <div class="row">
                <div class="col-lg-3 col-sm-3" style="_width:25%;">
                    <div class="animated fadeInUp in-ico"
                        style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInUp;">
                        <center>
                            <img src="../../assets/themes/images/ico1.png">
                            <h3>贴心服务</h3>
                            <p>7x24小时<br>为您提供全方位的技术支持<br>随叫随到，我们更专业</p>
                        </center>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-3" style="_width:25%">
                    <div class="animated fadeInUp in-ico" data-wow-delay="0.7s"
                        style="visibility: visible; animation-delay: 0.7s; animation-name: fadeInUp;">
                        <center>
                            <img src="../../assets/themes/images/ico3.png" alt="多渠道兑换平台传奇充值平台">
                            <h3>功能强超便捷</h3>
                            <p>稳定运营十年，诚信共赢<br>全新功能待您接入<br>多渠道稳定高效</p>
                        </center>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-3" style="_width:25%">
                    <div class="animated fadeInUp in-ico" data-wow-delay="1.1s"
                        style="visibility: visible; animation-delay: 1.1s; animation-name: fadeInUp;">
                        <center>
                            <img src="../../assets/themes/images/ico2.png" alt="游戏兑换平台">
                            <h3>安全 放心</h3>
                            <p>订单实时查,365天秒分润<br>24小时随时提随时到<br>让您无后顾之忧</p>
                        </center>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-3" style="_width:25%">
                    <div class="animated fadeInUp in-ico" data-wow-delay="1.5s"
                        style="visibility: visible; animation-delay: 1.5s; animation-name: fadeInUp;">
                        <center>
                            <img src="../../assets/themes/images/ico4.png" alt="多渠道兑换平台传世支付平台">
                            <h3>新程序高能</h3>
                            <p>秒速链接流畅高效<br>多台高防服务器支持<br>365天保障平台的实时访问</p>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Mgr from '../../assets/js/SecurityService';
import api from '../../assets/js/apiRequestHandler';
import { authUrl, url } from '../../assets/js/version.js';
const mgr = new Mgr();
// import wxlogin from 'vue-wxlogin';
export default {
  data() {
    return {
      current: 1,
      form: {
        username: '',
        password: '',
        code: '',
        checkKey: '',
        returnUrl: ''
      },
      qqSignin: '',
      wxQrSignin: '',
      isPwdLoginShow: true,
      isWxQrLoginShow: false,
      wxqrimgurl: '',
      wxvalidKey: '',
      randomCode:
                'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
      appid: 'wx61e40b3869c98170',
      scope: 'snsapi_login',
      redirect_uri: 'http://111.67.201.26:5000/External/WeixinOpen'
    };
  },
  mounted() {
    this.getQrcode();
    let mgr = new Mgr();
    mgr
      .getReturnUrl()
      .then((url) => {
        // console.log(url);
        let ReturnUrl = '';
        // 这里比较复杂，redirect_uri内url必须转义，其它参数则不需要，需要scope=
        let index = url.indexOf('?');
        let host = url.substring(0, index + 1);
        host = host.substring(host.indexOf('/connect'));
        let params = url.substring(index + 1).split('&');
        ReturnUrl =
                    host +
                    params
                      .map((x) => {
                        if (x.indexOf('redirect_uri') === 0) {
                          // return 'redirect_uri=' + encodeURIComponent(x.substring(13));
                          return 'redirect_uri=' + x.substring(13);
                        }
                        return x;
                      })
                      .join('&');
        // console.log("ReturnUrl:" + ReturnUrl);
        this.returnUrl = ReturnUrl;
        var extenalSource = url.replace(/^http(s)?:\/\/[^/]+/, '');
        // var extenalIndex = extenalSource.indexOf('http');
        var extenalUrl = encodeURIComponent(extenalSource);
        // console.log(extenalUrl);
        this.qqSignin =
                    authUrl + '/External/Challenge?provider=QQ&returnUrl=' + extenalUrl;
        this.wxQrSignin =
                    authUrl +
                    '/External/Challenge?provider=WeixinOpen&returnUrl=' +
                    extenalUrl;
      })
      .catch((err) => {
        console.log('报错了：' + err);
      });
  },
  methods: {
    windowScroll() {
      this.height = document.getElementsByClassName('contentBox')[0].scrollTop;
    },
    // 获取注册页面的底部信息
    footerInfo() {
      this.$api.login
        .footerInfo()
        .then(data => {
          if (data.status === 200) {
            this.webName = data.data.webName;
            this.servicePhone = data.data.servicePhone;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    async getQrcode() {
      let res = await api({
        url: '/api/Register/CreateCode',
        method: 'get',
        params: {}
      });
      this.randomCode = res.data.imageData;
      this.form.checkKey = res.data.validateKey;
      // console.log(res);
    },
    getwxqrImg() {
      let ReturnUrl = this.returnUrl;
      axios
        .post(url + 'api/Register/GetLoginImage', {
          ReturnUrl: ReturnUrl
        })
        .then((res) => {
          this.wxqrimgurl = res.data.imageData;
          this.wxvalidKey = res.data.validateKey;
          this.timer = setInterval(() => {
            this.checkBindWeixi();
          }, 1000);
        })
        .catch((err) => {
          this.loading = false;
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            this.errorMsg = err.response.data;
          }
        });
    },
    handleSubmitLogin() {
      if (!this.form.username) {
        this.$messageError('请输入用户名');
        return;
      }
      if (!this.form.password) {
        this.$messageError('请输入密码');
        return;
      }
      this.singin();
    },
    singin() {
      let ReturnUrl = this.returnUrl;
      axios.defaults.withCredentials = true;
      axios
        .post(authUrl + '/Account/loginApi', {
          ReturnUrl: ReturnUrl,
          Username: this.form.username,
          Password: this.form.password,
          RememberLogin: true,
          Code: this.form.code,
          CheckKey: this.form.checkKey
        })
        .then((data) => {
          if (data.data === '~/') {
            // this.$router.push({ path: '/404' });
            this.$messageError('登录出错，请检查！');
          } else {
            // window.location = authUrl + data.data;
            window.location = authUrl + ReturnUrl;
          }
        })
        .catch((error) => {
          // 捕获错误并获取错误内容
          if (error.response) {
            // 请求已经发出，但服务器返回状态码不在 2xx 范围内
            // console.log(error.response.data);
            this.$messageError(error.response.data.message);
            this.getQrcode();
          } else if (error.request) {
            // 请求已经发出，但没有收到响应
            console.log(error.request);
          } else {
            // 在设置请求时触发错误
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    },
    async handleLogin() {
      this.errorMsg = '';
      this.loading = true;
      try {
        await mgr.login({
          username: this.form.username,
          password: this.form.password,
          code: this.form.code,
          checkKey: this.form.checkKey,
          rememberLogin: true
        });

        const role = await mgr.getRole();
        if (role === 'CustomRole') {
          this.$router.replace({ path: '/employeemain/employeehome' });
        } else {
          this.$router.replace({ path: '/main/home' });
        }
      } catch (e) {
        this.errorMsg = e.message || '登录失败';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
<style scoped>
.warp-container {
    background: url('../../assets/themes/images/banner.jpg') no-repeat center bottom -78px;
}
</style>
