<template>
  <div></div>
</template>

<script>
import Mgr from '../../assets/js/SecurityService';
export default {
  mounted() {
    let mgr = new Mgr();
    mgr.signIn();
  }
};
</script>

<style scoped></style>
