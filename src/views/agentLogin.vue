<template>
  <div></div>
</template>

<script>
import api from '../assets/js/apiRequestHandler';
import { authUrl } from '../assets/js/version';
// import axios from 'axios';

const TOKEN_KEY = 'access_token';
const USER_INFO_KEY = 'user_info';

export default {
  async created() {
    const id = this.$route.query.agentMerchantId || this.getIdFromHash();
    if (id) {
      window.sessionStorage.setItem('agentMerchantId', id);
      try {
        const res = await api({
          url: authUrl + '/Account/agentLogin',
          method: 'post',
          data: { agentMerchantId: id }
        });
        const userInfo = {
          userId: res.data.userId,
          username: res.data.username,
          roles: res.data.roles,
          state: res.data.state
        };
        // 直接存token
        sessionStorage.setItem(TOKEN_KEY, res.data.access_token);
        sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
        // this.$store.commit('setId', userInfo.userId); // 你的 Vuex 里有 setId 方法
        // 设置全局axios头
        if (res.data) {
          // 兼容直接用axios
          // const axios = require('axios');
          // axios.defaults.headers.common.Authorization = 'Bearer ' + res.data;
        }
        this.$router.replace({ path: '/main/home' });
      } catch (err) {
        this.$message.error(err.message || '代理商登录失败');
      }
    } else {
      this.$message.error('缺少agentMerchantId参数');
    }
  },
  methods: {
    getIdFromHash() {
      const hash = window.location.hash || '';
      const m = hash.match(/[?&]agentMerchantId=([^&]+)/);
      return m ? decodeURIComponent(m[1]) : null;
    }
  }
};
</script>

<style scoped></style>
