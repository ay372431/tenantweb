/*
 * @Description: 用户日志
 * @Author: gao shuai
 * @Date: 2020-05-14 09:27:03
 * @LastEditTime: 2020-06-19 12:03:14
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 用户日志列表
  async logList(params) {
    let header = await mgr();
    return api({
      url: '/api/MerchantLogs/GetLoginLogAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 清理日志
  async clearLog(params) {
    let header = await mgr();
    return api({
      url: '/api/MerchantLogs/ClearMerchantLogsAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取礼品列表
  async getGiftList(params) {
    let header = await mgr();
    return api({
      url: '/api/MerchantLogs/GetGiftOrderPageList',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取转区点用户记录
  async getWeChatLogList(params) {
    let header = await mgr();
    return api({
      url: '/api/WxUserValid/GetTransferUsers',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取转区点日志
  async getWeChatOperationLogList(params) {
    let header = await mgr();
    return api({
      url: '/api/WxUserValid/GetTransferLogs',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
