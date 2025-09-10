<template>
  <div></div>
</template>

<script>
import Mgr from '../assets/js/SecurityService';
export default {
  created() {
    if (this.$route.query.agentMerchantId) {
      window.sessionStorage.setItem(
        'agentMerchantId',
        this.$route.query.agentMerchantId
      );
      // let mgr = new Mgr();
      // mgr.signIn();
       this.$router.push({ path: '/main/home' });
    }
  }
};
</script>

<style scoped>
</style>
