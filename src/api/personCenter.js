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
  // 获取银行信息
  async getbankInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetMerchantBankInfoAsync',
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
  // 更换通讯密钥
  async changeSignKey(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/SignKeyUpdateAsync',
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
      url: '/api/WxUserValid/GetAlreadyBoundWxs',
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
      url: '/api/UserCenter/CreateAccountsForAllGatewaysAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 修改银行信息
  async updateBankInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/ModifyAccountsForAllGatewaysAsync',
      method: 'post',
      data: params,
      headers:
        { Authorization: 'Bearer ' + header }
    });
  },
  // 提交银行信息
  async ModifyAccountsAsync(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/ModifyAccountsAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async elecSign(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/SendFaDaDaElectronicSign',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async sendEmailCode(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/SendEmailCode',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async sendPhoneCode(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/SendSmsCode',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async bindEmail(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/UpdateEmailAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async bindPhone(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/UpdatePhoneAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 修改nickName
  async changeNickName(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/UpdateNickNameAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 修改QQ号
  async changeQQ(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/UpdateQqNumberAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 把 userId 放到路径段
  async CheckWxQr(userId) {
    let header = await mgr();
    return api({
      url: `/api/WxUserValid/CheckWxQr/${userId}`,
      method: 'get',
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取系统设置中的银行信息
  async getSystemBankInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/GetSystemBankInfo',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 上传文件
  async uploadprofit(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/UploadFile',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 带路径的上传文件
  async uploadprofits(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/UploadFilesAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 提交收货地址
  async submitShAddress(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/SubmitReceivingAddress',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
