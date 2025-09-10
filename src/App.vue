<template>
  <div id="app" v-if="signedIn">
    <router-view />
  </div>
</template>

<script>
import Mgr from './assets/js/SecurityService';
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      signedIn: true,
      mgr: new Mgr()
    };
  },
  methods: {
    // 刷新
    reload() {
      this.signedIn = false;
      this.$nextTick(() => {
        this.signedIn = true;
      });
    }
  },
  mounted() {},
  created() {}
};
</script>
<style>
.layui-elem-field {
  border-width: 1px;
  border-style: solid;
}

legend {
  display: block;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
}
</style>
<style lang="scss" scoped>
#app {
  height: 100%;
  width: 100%;
}
</style>
