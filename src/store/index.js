import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uuid: '',
    userType: false,
    nickName: '',
    id: '',
    preview: 0,
    floatstyle: 1,
    floatingpictures: 0,
    chargeUrl: '',
	isEnabledPaid:false,
	isEnabledWxValid:false,
	isPlatOpenWxValid:false	
  },
  mutations: {
    saveuuid(state, data) {
      state.uuid = data;
    },
    saveType(state, data) {
      state.userType = data;
    },
    changeId(state, data) {
      state.id = data;
    },
    changeNickName(state, data) {
      state.nickName = data;
    },
    changePreview(state, data) {
      state.preview = data;
    },
    changefloatstyle(state, data) {
      state.floatstyle = data;
    },
    changefloatingpictures(state, data) {
      state.floatingpictures = data;
    },
    changeUrl(state, data) {
      state.chargeUrl = data;
    },
    setEnabledPaid(state, data) {
      state.isEnabledPaid = data;
    },
    setEnabledWxValid(state, data) {
      state.isEnabledWxValid = data;
    },
    setPlatOpenWxValid(state, data) {
      state.isPlatOpenWxValid = data;
    }
  },
  actions: {},
  modules: {}
});
