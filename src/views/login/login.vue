<template>
  <div class="loginHome">
    <!-- <div class="headerContainer">
      <div class="container clearfix">
        <div class="logbox"><img src="../../assets/images/login/logo-2.png"   alt=""></div>
        <ul class="clearfix">
          <router-link tag="li" to="/login/loginHome" :class="{'on':$route.path.indexOf('loginHome')>0}">官方首页</router-link>

          <router-link tag="li" to="/login/loginRecharge" :class="{'on':$route.path.indexOf('loginRecharge')>0}">新闻中心</router-link>
          <router-link tag="li" to="/login/loginTool" :class="{'on':$route.path.indexOf('loginTool')>0}">开区助手</router-link>
          <router-link tag="li" to="/login/logincontact" :class="{'on':$route.path.indexOf('logincontact')>0}">联系我们</router-link>
        </ul>
      </div>
    </div> -->
    <div class="contentBox">
      <router-view />
    </div>
    <!-- <div class="footerbox">
      <login-footer></login-footer>
    </div> -->
  </div>
</template>

<script>
// import loginFooter from '../../components/loginFooter';
export default {
  // components: {
  //   loginFooter
  // }
  created() {}
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.loginHome {
  position: relative;
  height: 100%;
  // padding-top: 72px;
  background: #fff;
  box-sizing: border-box;
  .headerContainer {
    position: absolute;
    top: 0;
    width: 100%;
    .container {
      width: 1220px;
      margin: 0 auto;
      .logbox {
        float: left;
        margin-top: 17px;
      }
      ul {
        float: right;
        margin-top: 20px;
        li {
          float: left;
          font-size: 21px;
          color: #505050;
          cursor: pointer;
          margin-left: 55px;
          padding-bottom: 5px;
          border-bottom: 3px solid transparent;
          &.on,
          &:hover {
            border-color: #0b579a;
          }
        }
      }
    }
  }
  .contentBox {
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }
  }
  // .footerbox {
  //   position: absolute;
  //   width: 100%;
  //   bottom: 0;
  // }
}
</style>
