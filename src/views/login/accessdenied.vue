<template>
  <div class="errorBox">
    <span @click="loginOut">返回登录页</span>
  </div>
</template>

<script>
import Mgr from '../../assets/js/SecurityService';
export default {
  methods: {
    loginOut() {
      let user = new Mgr();
      user.signOut();
    }
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.errorBox {
  height: 100%;
  background: url(../../assets/images/error.jpg) no-repeat center -70px;
  padding-top: 1px;
  box-sizing: border-box;
  position: relative;
  span {
    position: absolute;
    width: 188px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 10px;
    border: 2px solid #fff;
    font-size: 21px;
    color: #fff;
    top: 535px;
    left: 50%;
    margin-left: -90px;
    cursor: pointer;
    transition: all 0.8s;
    &:hover {
      border-color: #2295fe;
      color: #2295fe;
    }
  }
}
</style>
