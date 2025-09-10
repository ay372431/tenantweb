import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import './icons'; // icon
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.scss';
import './assets/css/main.css';
import echarts from 'echarts';
import mixin from './assets/js/mixin';
import api from './api/index';
Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.mixin(mixin);
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.$messageSuccess = function(text) {
  ElementUI.Message.success({
    message: text,
    showClose: true,
    duration: 1000,
    offset: 350
  });
};
Vue.prototype.$messageError = function(text) {
  if (!text) {
    return;
  }
  ElementUI.Message.error({
    message: text,
    showClose: true,
    duration: 1200,
    offset: 350
  });
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
