/*
 * @Description: 提现记录
 * @Author: gao shuai
 * @Date: 2020-05-14 09:27:03
 * @LastEditTime: 2020-05-23 17:20:06
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 提现记录列表
  async withdrawList(params) {
    let header = await mgr();
    return api({
      url: '/api/Settlements/GetSettlementLogListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 提现详情
  async withdrawDetail(params) {
    let header = await mgr();
    return api({
      url: '/api/Settlements/GetSettlementsDetailAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 电子户转账记录
  async withdrawList1(params) {
    let header = await mgr();
    return api({
      url: '/api/Settlements/GetSettlementLogList1Async',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
