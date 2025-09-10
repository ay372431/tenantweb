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
  }
};
