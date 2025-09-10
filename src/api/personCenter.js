/*
 * @Description: 获取账户信息
 * @Author: gao shuai
 * @Date: 2020-05-14 09:27:03
 * @LastEditTime: 2020-08-19 15:01:35
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 获取银行信息
  async bankInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetBankListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取银行下拉
  async bankDrow(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetMerchantCenterBanksAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 更换通讯密钥
  async changeKey(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/SecretKeyUpdateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 编辑在线客服
  async editlLineQQ(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/ServiceStatePQUpdateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 保存银行帐户信息
  async savebankInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/AddBanksAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 检查是否绑定微信公众号
  async isBandweixi(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/IsBound',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 检查是否绑定微信公众号轮询
  async isBandsingle(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/IsSignalBound',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取用户二维码
  async userCode(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetQrImage',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 解绑微信公众号
  async unbindwei(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/UnbindWx',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取二级密码和帐户是否完善的状态
  async getPersonState(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/CheckAllTenantInformationAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 修改二级密码和帐户信息
  async setInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/ChangeBankSecondaryPassword',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取银行详细信息
  async bankDetail(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/CheckBankDetailByPassword',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* -----------------------1.帐号安全---------------------- */
  // 获取商户安全IP设置
  async getsafeIp(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/GetSafetyIP',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 设置商户安全IP设置
  async setsafeIp(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/SetSafetyIP',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* -----------------------1.结算记录---------------------- */
  // 获取结算列表
  async settleRecrod(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/GetSuccessSettlements',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取已绑定的微信号
  async isbindWeixin(params) {
    let header = await mgr();
    return api({
      url: '/api/Weixin/GetAlreadyBoundWxs',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 微信权限管理
  async changeWeixin(params) {
    let header = await mgr();
    return api({
      url: '/api/Weixin/ChangePermissionState',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 微信权限管理的二级密码
  async checkSecondary(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/CheckSecondary',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 二级密码的修改
  async changePassword(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/SetSecondaryPasswordAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 分佣
  async FenYongPaid(params) {
    let header = await mgr();
    return api({
      url: '/api/Cashier/FenYongPaid',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async getUserBankDetails(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/getUserBankDetails',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async CreateAccountAsync(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/CreateAccountAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async elecSign(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/SendElectronicSign',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
