/*
 * @Description: 订单管理
 * @Author: gao shuai
 * @Date: 2020-05-15 18:07:30
 * @LastEditTime: 2020-05-16 17:40:27
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 分组下拉
  async gameTeam(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetGroupNameNameListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 分区下拉
  async gamearea(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetPartitionNameListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 支付方式下拉
  async paylist(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetPayModeNameListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 订单管理列表
  async orderlist(params) {
    let header = await mgr();
    return api({
      url: '/api/Orders/GetTenantOrdersListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 昨天充值
  async yesterdayCharge(params) {
    let header = await mgr();
    return api({
      url: '/api/Orders/GetOrdersYesterdayListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 今天充值
  async todayCharge(params) {
    let header = await mgr();
    return api({
      url: '/api/Orders/GetOrdersTodayListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 订单详情
  async orderDetail(params) {
    let header = await mgr();
    return api({
      url: '/api/Orders/GetOrderDetailAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 更新游戏账号
  async updatePlayerAccount(params) {
    let header = await mgr();
    return api({
      url: '/api/Orders/UpdateOrder',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 查询订单账号更新情况
  async checkOrderAccount(params) {
    let header = await mgr();
    return api({
      url: '/api/Orders/GetUpdateOrderInfoAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
