import Vue from 'vue';
import { get, post } from './ajax';

const AJAX = {
  post(link, params) {
    return post(link, params);
  },
  get(link) {
    return get(link);
  }
};

Vue.prototype.$request = AJAX;

export default AJAX;
