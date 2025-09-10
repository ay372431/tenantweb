/*
 * @Description: 登录相关页面接口
 * @Author: gao shuai
 * @Date: 2020-06-06 14:50:14
 * @LastEditTime: 2020-06-23 14:19:15
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';
export default {

  // 资费列表
  async rechargeList(params) {
    return api({
      url: '/api/About/GetTenantPostagesAsync',
      method: 'get',
      params: params
    });
  },
  // 联系我们
  async contactinfo(params) {
    return api({
      url: '/api/About/GetTenantBaseInfoAsync',
      method: 'get',
      params: params
    });
  },
  // 注册
  async register(params) {
    return api({
      url: '/api/Register/UserRegister',
      method: 'post',
      data: params
    });
  },
  // 系统footer信息
  async footerInfo(params) {
    return api({
      url: '/api/About/GetTenantBaseInfoAsync',
      method: 'get',
      params: params
    });
  },
  // 获取公告信息
  async getNotice(params) {
    return api({
      url: '/api/About/GetNoticeList',
      method: 'get',
      params: params
    });
  },
  // 系统footer信息
  async getRandomCode(params) {
    return api({
      url: '/api/Register/createcode',
      method: 'get',
      params: params
    });
  }
};
