/*
 * @Description: 补发订单
 * @Author: gao shuai
 * @Date: 2020-05-15 18:07:30
 * @LastEditTime: 2020-05-20 18:15:40
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 分组下拉
  async gameTeam() {
    let header = await mgr();
    return api({
      url: '/api/ReissueRecords/GetReissueGroup',
      method: 'get',
      params: '',
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 补发列表
  async reorderList(params) {
    let header = await mgr();
    return api({
      url: '/api/ReissueRecords/GetReissueRecordsListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 游戏分区下拉列表
  async gamelist(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetPartitionNameListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 清理补发记录
  async clearOrder(params) {
    let header = await mgr();
    return api({
      url: '/api/ReissueRecords/ClearReisuueRecordAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* --------------------------2.订单补发-------------------------- */
  // 充值方式下拉
  async payDrow(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetPayModeNameListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 订单补发补单记录
  async orderList1(params) {
    let header = await mgr();
    return api({
      url: '/api/OrderReissueRecords/GetOrderReissueRecordsTaskListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 订单补发中的定时任务
  async orderList2(params) {
    let header = await mgr();
    return api({
      url: '/api/OrderReissueRecords/GetOrderSchedulerJobsListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 删除定时任务
  async delTask(params) {
    let header = await mgr();
    return api({
      url: '/api/OrderReissueRecords/DeleteSchedulerJobAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 手动补单
  async handOrder(params) {
    let header = await mgr();
    return api({
      url: '/api/ReissueRecords/ManualReissueAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 手动补单确认参数
  async handOrderOk(params) {
    let header = await mgr();
    return api({
      url: '/api/ReissueRecords/GetReissueAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 整区补单
  async allOrder(params) {
    let header = await mgr();
    return api({
      url: '/api/ReissueRecords/AllReissueAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
