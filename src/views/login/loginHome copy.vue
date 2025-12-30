<template>
    <div class="container">
        <login-header style="position: fixed"></login-header>
        <div class="header-box">
            <div class="login-bg">
                <div class="wrap">
                    <img src="../../assets/img/22.png" class="wrap-img" />
                    <div class="login-box" style="position: relative;">
                        <div class="tabs">
                            <div :class="{
                                'tab-item': true,
                                active: current == 1 ? true : false,
                            }" @click="tab(1)">
                                账号登录
                            </div>
                            <img v-if="isPwdLoginShow" src="../../assets/images/login-code.png" @click="tab(2)"
                                style="height: 50px; margin-top:15px;position: absolute;right: 50px;" />
                            <img v-if="isWxQrLoginShow" src="../../assets/images/login-pwd.png"
                                @click="isPwdLoginShow = true; isWxQrLoginShow = false;getQrcode()"
                                style="height: 50px; margin-top:15px;position: absolute;right: 50px;" />
                        </div>
                        <div class="tab-content" tabindex="1" v-if="isPwdLoginShow">
                            <div class="form">
                                <div class="input">
                                    <el-input placeholder="请输入登录帐号" v-model="form.username"
                                        :disabled="false"></el-input>
                                </div>
                                <div class="input">
                                    <el-input placeholder="请输入密码" v-model="form.password" :disabled="false"
                                        show-password></el-input>
                                </div>
                                <div class="input">
                                    <el-input placeholder="请输入验证码" :disabled="false" v-model="form.code"
                                        style="flex: 1"></el-input>
                                    <img class="qrcode" id="code" style="width: 100px; height: 38px" alt=""
                                        :src="randomCode" v-on:click="getQrcode()" />
                                </div>
                                <div class="input top">
                                    <div class="btn" @click="singin">登录</div>
                                </div>
                                <div class="social-signup-container" style="padding-bottom: 15px;">
                                    还没有账号？
                                    <span style="color: red;" @click="$router.push('/login/loginregister')">
                                        免费注册
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="tab-content" tabindex="2" v-if="isWxQrLoginShow">
                            <div class="scan-box">
                                <!-- 顶部显示二维码状态与刷新图标 -->
                                <div class="qr-top" v-if="qrExpired || !qrCodeUrl">
                                    <span class="expired-text" v-if="qrExpired">二维码已过期，请刷新</span>
                                    <span class="expired-text" v-else>正在加载二维码...</span>
                                    <span class="qr-refresh" @click="getwxqrImg" title="刷新二维码">🔄</span>
                                </div>
                                <!-- <wxlogin :appid="appid" :scope="scope" :redirect_uri="redirect_uri"></wxlogin> -->
                                <img :src="qrCodeUrl" style="height: 320px;margin-bottom: 16px;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="service-box">
            <div class="service">
                <div class="navtitle">
                    <div class="title">我们的优势</div>
                    <div class="small">OUR ADVANTAGE</div>
                </div>
                <div class="service-list">
                    <div class="item">
                        <div class="icon icon1"></div>
                        <div class="title">渠道安全</div>
                        <div class="desc">
                            与各大银行及实力第三方支付公司有着密切合作，确保您的支付渠道和资金安全
                        </div>
                    </div>
                    <div class="item">
                        <div class="icon icon2"></div>
                        <div class="title">方便快捷</div>
                        <div class="desc">
                            接入流程简单，支付流程快捷，结算流程准时，系统运行高效
                        </div>
                    </div>
                    <div class="item">
                        <div class="icon icon3"></div>
                        <div class="title">技术团队</div>
                        <div class="desc">
                            专业高效的技术团队，为您时刻提供专业的技术保障，一对一指导对接，打消您对接过程中的所有疑虑
                        </div>
                    </div>
                    <div class="item">
                        <div class="icon icon4"></div>
                        <div class="title">贴心服务</div>
                        <div class="desc">
                            专业高效的技术团队，为您时刻提供专业的技术保障，一对一指导对接，打消您对接过程中的所有疑虑
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg"></div>
        </div>
        <div class="ability-box">
            <div class="service">
                <div class="navtitle">
                    <div class="title">服务能力</div>
                    <div class="small">TECHNICAL TEAM</div>
                </div>
                <div class="service-list">
                    <div class="item bg1">
                        <div class="info">
                            <div class="title">自动打款</div>
                            <div class="desc">支持GEE/GOM对接多模式打款方案自动定时打款</div>
                            <div class="plus">
                                <img src="../../assets/img/plus.png" />
                            </div>
                            <div class="btn">了解更多>>></div>
                        </div>
                    </div>
                    <div class="item bg2">
                        <div class="info">
                            <div class="title">微信绑定</div>
                            <div class="desc">
                                支持微信扫码登录支持微信消息通知充值动态及时知晓
                            </div>
                            <div class="plus">
                                <img src="../../assets/img/plus.png" />
                            </div>
                            <div class="btn">了解更多>>></div>
                        </div>
                    </div>
                    <div class="item bg3">
                        <div class="info">
                            <div class="title">游戏安全</div>
                            <div class="desc">
                                支持微信密保登录游戏防止被盗，安全可靠支持自定义微信公众号
                            </div>
                            <div class="plus">
                                <img src="../../assets/img/plus.png" />
                            </div>
                            <div class="btn">了解更多>>></div>
                        </div>
                    </div>
                    <div class="item bg4">
                        <div class="info">
                            <div class="title">数据分析</div>
                            <div class="desc">
                                详细访客网站流量来源新增分成计算统计IPS来访流量
                            </div>
                            <div class="plus">
                                <img src="../../assets/img/plus.png" />
                            </div>
                            <div class="btn">了解更多>>></div>
                        </div>
                    </div>
                    <div class="item bg5">
                        <div class="info">
                            <div class="title">订单管理</div>
                            <div class="desc">支持自动/手动补发数据实时统计支持微信通知</div>
                            <div class="plus">
                                <img src="../../assets/img/plus.png" />
                            </div>
                            <div class="btn">了解更多>>></div>
                        </div>
                    </div>
                    <div class="item bg6">
                        <div class="info">
                            <div class="title">分区管理</div>
                            <div class="desc">一键安装分区批量克隆分区支持API对接</div>
                            <div class="plus">
                                <img src="../../assets/img/plus.png" />
                            </div>
                            <div class="btn">了解更多>>></div>
                        </div>
                    </div>
                    <div class="item bg7">
                        <div class="info">
                            <div class="title">支付结算</div>
                            <div class="desc">多模式结算费用主流支付渠道支持代付</div>
                            <div class="plus">
                                <img src="../../assets/img/plus.png" />
                            </div>
                            <div class="btn">了解更多>>></div>
                        </div>
                    </div>
                    <div class="item bg8">
                        <div class="info">
                            <div class="title">账户管理</div>
                            <div class="desc">
                                自定义子账户/员工账户按比例补发角色权限管理
                            </div>
                            <div class="plus">
                                <img src="../../assets/img/plus.png" />
                            </div>
                            <div class="btn">了解更多>>></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="squerbg"></div>
        </div>
        <login-footer></login-footer>
    </div>
</template>

<script>
import axios from 'axios';
import loginFooter from '../../components/loginFooter';
import loginHeader from '../../components/loginHeader.vue';
import Mgr from '../../assets/js/SecurityService';
import api from '../../assets/js/apiRequestHandler';
import { authUrl, url } from '../../assets/js/version.js';
import wxlogin from 'vue-wxlogin';
export default {
  components: {
    loginFooter,
    loginHeader,
    // eslint-disable-next-line vue/no-unused-components
    wxlogin
  },
  data() {
    return {
      current: 1,
      qrExpired: false,
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
      appid: 'wx937e63f717108262',
      scope: 'snsapi_login',
      redirect_uri: 'http://localhost:5000/External/WeixinOpen',
      qrCodeUrl: '',
      returnUrl: '',
      code: ''
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
    async getQrcode() {
      let res = await api({
        url: '/api/Register/CreateNumCode',
        method: 'get',
        params: {}
      });
      this.randomCode = res.data.imageData;
      this.form.checkKey = res.data.validateKey;
      // console.log(res);
    },
    // 轮询是否绑定微信公众号
    checkBindWeixi() {
    //   let ReturnUrl = this.returnUrl;
      axios.defaults.withCredentials = true;
      axios
        .get(url + 'api/Weixin/CheckScan?code=' + this.code)
        .then((resp) => {
          const data = resp.data;
          if (data) {
            if (data.status === 'need_bind') {
              this.$messageError('该微信未绑定账号，请先绑定账号！');
              clearInterval(this.timer);
              this.isPwdLoginShow = true;
              this.isWxQrLoginShow = false;
            }
            if (data.status === 'scanned') {
              console.log('已扫码，等待绑定');
              this.qrExpired = false;
            }
            if (data.status === 'cancelled') {
              console.log('用户取消登录');
              this.qrExpired = false;
            }
            if (data.status === 'expired') {
              this.$messageError('二维码已过期，请刷新二维码！');
              this.qrExpired = true;
              // 停止轮询，等待用户刷新二维码
              if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
              }
            }
            if (data.status === 'confirmed') {
              clearInterval(this.timer);
              this.timer = null;
              this.qrExpired = false;

              // redirectPayload 可能为：
              // 1) 字符串 URL（如 "/connect/..."）
              // 2) JSON 对象
              // 3) JSON 字符串（服务器返回 string，但内部是 token 对象）
              let redirectPayload = data.redirectUrl;
              // 如果是字符串，尝试解析为 JSON（若是 JSON 字符串）
              if (typeof redirectPayload === 'string') {
                try {
                  const parsed = JSON.parse(redirectPayload);
                  // 解析成功且包含 access_token，则替换为对象处理
                  if (parsed && parsed.access_token) {
                    redirectPayload = parsed;
                  }
                } catch (e) {
                  // 不是 JSON 字符串，保持原值（认为是 URL）
                }
              }

              // 如果仍然是字符串，按 URL 跳转（保持原有行为）
              if (typeof redirectPayload === 'string') {
                window.location = authUrl + redirectPayload;
                return;
              }

              // 如果是对象并包含 access_token，保存 Token 并跳转
              if (redirectPayload && redirectPayload.access_token) {
                try {
                  const token = redirectPayload.access_token;
                  const refresh = redirectPayload.refresh_token || '';
                  const tokenType = redirectPayload.token_type || 'Bearer';
                  const expiresIn = redirectPayload.expires_in || 0;
                  const nowSec = Math.floor(Date.now() / 1000);
                  const expiresAt = expiresIn ? nowSec + Number(expiresIn) : (redirectPayload.expires_at || nowSec + 3600);

                  // 设置 axios 默认 header
                  axios.defaults.headers.common.Authorization = tokenType + ' ' + token;
                  // 常规保存
                  localStorage.setItem('access_token', token);
                  localStorage.setItem('refresh_token', refresh);
                  localStorage.setItem('token_type', tokenType);

                  // 同时构造 oidc.user:<authority>:<client_id> 结构，确保现有 OIDC 客户端能识别
                  // 注意：client_id 请改为你项目实际 client id（示例中是 tenantvuejs）
                  const oidcKey = `oidc.user:${authUrl}:tenantvuejs`;
                  const oidcUser = {
                    access_token: token,
                    id_token: redirectPayload.id_token || '',
                    refresh_token: refresh,
                    token_type: tokenType,
                    scope: redirectPayload.scope || '',
                    expires_at: expiresAt,
                    profile: redirectPayload.profile || {}, // 如果后端返回 profile（claims），放入；否则为空对象
                    // 下面字段按需填充，保证与现有 oidc.user 结构兼容
                    state: null,
                    expired: false,
                    token_received_time: nowSec
                  };
                  localStorage.setItem(oidcKey, JSON.stringify(oidcUser));

                  // 跳转：优先 returnUrl
                  window.location = '/main';
                  return;
                } catch (e) {
                  console.error('处理 token 时出错', e);
                }
              }

              // 兜底
              window.location = '/main';
            }
          }
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
    getwxqrImg() {
      let ReturnUrl = this.returnUrl;
      console.log('ReturnUrl:' + ReturnUrl);
      // 刷新时清理旧定时器与 expired 标识
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.qrExpired = false;
      this.$api.login.getLoginQrCode({
        returnUrl: ReturnUrl
      }).then((res) => {
        // console.log(res);
        this.qrCodeUrl = res.data.qrCodeUrl;
        this.code = res.data.code;
        this.timer = setInterval(() => {
          this.checkBindWeixi();
        }, 1000);
      }).catch((err) => {
        this.loading = false;
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          this.errorMsg = err.response.data;
        }
      });
      // axios
      //     .get(url + "api/Weixin/LoginQr?returnUrl =" + encodeURIComponent(ReturnUrl))
      //     .then((res) => {
      //         console.log(res.data);
      //         this.redirectUrl = res.data.redirectUrl;
      //         this.qrCodeUrl = res.data.qrCodeUrl;
      //         this.code = res.data.code;
      //         // return false;
      //         // this.wxqrimgurl = res.data.imageData;
      //         // this.wxvalidKey = res.data.validateKey;
      //         this.timer = setInterval(() => {
      //             this.checkBindWeixi();
      //         }, 1000);
      //     })
      //     .catch((err) => {
      //         this.loading = false;
      //         if (err.response) {
      //             console.log(err.response.data);
      //             console.log(err.response.status);
      //             console.log(err.response.headers);
      //             this.errorMsg = err.response.data;
      //         }
      //     });
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
          console.log(data.data);
          if (data.data === '~/') {
            // this.$router.push({ path: '/404' });
            this.$messageError('登录出错，请检查！');
          } else {
            // window.location = authUrl + data.data;
            // console.log("returnUrl:" + authUrl + ReturnUrl);
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
    tab(index) {
      this.current = index;
      if (index === 1) {
        this.isPwdLoginShow = true;
        this.isWxQrLoginShow = false;
      } else {
        this.isPwdLoginShow = false;
        this.isWxQrLoginShow = true;
        this.getwxqrImg();
      }
    }
  },
  beforeCreate() {
    let mgr = new Mgr();
    mgr.getSignedIn().then(
      (signIn) => {
        // console.log("signedIn", signIn);
        // this.signedIn = signIn;
        if (signIn !== '') {
          if (signIn.profile.UserState === 'CustomRole') {
            this.$router.push('/employeemain/employeehome');
          } else {
            this.$router.push('/main');
          }
          // this.$router.push("/main");
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
.gs_title {
    background: var(--theme-color);
}

.social-signup-container {
    width: 220px;
    margin: 0px auto;

    .sign-btn {
        display: inline-block;
        cursor: pointer;
    }

    .icon {
        color: #fff;
        font-size: 24px;
        margin-top: 8px;
    }

    .wx-svg-container,
    .reg-svg-container,
    .qq-svg-container {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        padding-top: 1px;
        border-radius: 4px;
        margin-bottom: 20px;
        margin-right: 5px;
        border-radius: 50%;
    }

    .wx-svg-container {
        background-color: #24da70;
    }

    .qq-svg-container {
        background-color: #6ba2d6;
        margin-left: 40px;
    }

    .reg-svg-container {
        background-color: #afc2d3;
        margin-left: 40px;
        color: #fff;
    }
}

.container {
    background: url(../../assets/img/bg.png) no-repeat top center;
    background-size: 100% 922px;
}

.wrap {
    width: 1300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 500px;
}

.wrap-img {
    width: 780px;
}

.header-box {
    height: 922px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
}

.login-bg {
    background-color: rgba(255, 255, 255, 0.3);
    height: 500px;
    padding: 0;
    width: 100%;
}

.login-box {
    width: 440px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.login-box .tabs {
    display: flex;
    justify-content: center;
    // margin: 30px 0 10px 0;
    line-height: 50px;
}

.login-box .tabs .tab-item {
    padding-bottom: 8px;
    margin: 0 30px;
    cursor: pointer;
}

.login-box .tabs .tab-item.active {
    color: #0195ff;
    border-bottom: #0195ff 2px solid;
}

.login-box .tab-content {
    margin: 0 45px;
    outline: none;
}

.login-box .tab-content .form {
    margin-top: auto;
}

.login-box .tab-content .form .input {
    display: flex;
    box-sizing: border-box;
    margin: 25px 0;
}

.login-box .tab-content .form .input a {
    color: #fff;
    text-decoration: none;
}

.login-box .tab-content .form .qrcode {
    width: 120px;
    border-radius: 8px;
    margin-left: 10px;
}

.login-box .tab-content .form .btn {
    width: 100%;
    height: 55px;
    border-radius: 40px;
    color: #fff;
    background-color: #0195ff;
    color: #fff;
    text-align: center;
    line-height: 55px;
    cursor: pointer;
    font-size: 18px;
}

.login-box .tab-content .form .btn.active {
    border: #11ae1f 1px solid;
    color: #11ae1f;
    border-radius: 40px;
    background-color: transparent;
}

.scan-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* QR 顶部状态与刷新样式 */
.qr-top {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}
.expired-text {
    color: #e53935;
    font-weight: bold;
    margin-right: 8px;
}
.qr-refresh {
    cursor: pointer;
    font-size: 18px;
    user-select: none;
}

.service-box {
    background-image: url(../../assets/img/service2.png);
    background-repeat: no-repeat;
    background-size: 100%;
    height: 940px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.service-box .bg {
    position: absolute;
    right: 0;
    bottom: 0;
    background-image: url(../../assets/img/service1.png);
    height: 500px;
    width: 100%;
}

.service-box .service {
    width: 1300px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

.service-box .service .navtitle {
    margin-bottom: 100px;
}

.service-box .service .navtitle .title {
    font-size: 36px;
    margin-bottom: 10px;
}

.service-box .service .navtitle .small {
    font-size: 14px;
}

.service-box .service .service-list {
    display: flex;
    justify-content: space-between;
}

.service-box .service .service-list .item {
    width: 305px;
    height: 417px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.service-box .service .service-list .item .icon {
    height: 90px;
    width: 90px;
    margin: 0 auto;
}

.service-box .service .service-list .item .title {
    font-weight: bold;
    font-size: 18px;
    margin: 50px 0 30px 0;
    text-align: center;
}

.service-box .service .service-list .item .desc {
    font-size: 14px;
    color: #666;
    line-height: 22px;
    margin: 0 20px;
}

.service-box .service .service-list .item .icon.icon1 {
    background-image: url(../../assets/img/service-icon-1.png);
}

.service-box .service .service-list .item .icon.icon1:hover {
    background-image: url(../../assets/img/service-icon-11.png);
}

.service-box .service .service-list .item .icon.icon2 {
    background-image: url(../../assets/img/service-icon-2.png);
}

.service-box .service .service-list .item .icon.icon2:hover {
    background-image: url(../../assets/img/service-icon-22.png);
}

.service-box .service .service-list .item .icon.icon3 {
    background-image: url(../../assets/img/service-icon-3.png);
}

.service-box .service .service-list .item .icon.icon3:hover {
    background-image: url(../../assets/img/service-icon-33.png);
}

.service-box .service .service-list .item .icon.icon4 {
    background-image: url(../../assets/img/service-icon-4.png);
}

.service-box .service .service-list .item .icon.icon4:hover {
    background-image: url(../../assets/img/service-icon-44.png);
}

.ability-box {
    background-image: url(../../assets/img/abilitybg.png);
    background-repeat: no-repeat;
    background-size: 1440px 458px;
    background-position: left center;
    min-height: 940px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 160px 0;
    position: relative;
}

.ability-box .service {
    width: 1300px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

.ability-box .squerbg {
    width: 608px;
    height: 475px;
    background-color: #0195ff;
    position: absolute;
    top: 550px;
    right: 0;
}

.ability-box .service .navtitle {
    margin-bottom: 100px;
}

.ability-box .service .navtitle .title {
    font-size: 36px;
    margin-bottom: 10px;
}

.ability-box .service .navtitle .small {
    font-size: 14px;
}

.ability-box .service .service-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.ability-box .service .service-list .item {
    width: 305px;
    height: 420px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 30px;
    background-repeat: no-repeat;
    background-size: cover;
}

.ability-box .service .service-list .item.bg1 {
    background-image: url(../../assets/img/ability1.png);
}

.ability-box .service .service-list .item.bg2 {
    background-image: url(../../assets/img/ability2.png);
}

.ability-box .service .service-list .item.bg3 {
    background-image: url(../../assets/img/ability3.png);
}

.ability-box .service .service-list .item.bg4 {
    background-image: url(../../assets/img/ability4.png);
}

.ability-box .service .service-list .item.bg5 {
    background-image: url(../../assets/img/ability5.png);
}

.ability-box .service .service-list .item.bg6 {
    background-image: url(../../assets/img/ability6.png);
}

.ability-box .service .service-list .item.bg7 {
    background-image: url(../../assets/img/ability7.png);
}

.ability-box .service .service-list .item.bg8 {
    background-image: url(../../assets/img/ability8.png);
}

.ability-box .service .service-list .item.center {
    align-items: center;
    justify-content: center;
}

.ability-box .service .service-list .item .info {
    position: relative;
    z-index: 2;
    color: #fff;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    width: 305px;
    height: 420px;
}

.ability-box .service .service-list .item .info:hover {
    background-color: rgba(1, 149, 255, 0.7);
    width: 305px;
    height: 420px;
    box-sizing: border-box;
}

.ability-box .service .service-list .item .info .btn {
    border: #fff 1px solid;
    border-radius: 30px;
    width: 135px;
    cursor: pointer;
    margin: auto auto 0 auto;
    text-align: center;
    padding: 10px 0;
    display: none;
}

.ability-box .service .service-list .item .info:hover .btn {
    display: block;
}

.ability-box .service .service-list .item .info:hover .plus {
    display: none;
}

.ability-box .service .service-list .item .info .btn:hover {
    color: #ffff00;
}

.ability-box .service .service-list .item .info .title {
    font-size: 30px;
    margin-bottom: 20px;
}

.ability-box .service .service-list .item .info.bg {
    text-align: center;
}

.ability-box .service .service-list .item .info .desc {
    font-size: 16px;
    line-height: 22px;
}

.ability-box .service .service-list .item .plus {
    position: relative;
    z-index: 2;
    margin: 0 30px;
    margin-top: auto;
    text-align: right;
}
</style>
