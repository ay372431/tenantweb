/*
 * @Description: 数据统计
 * @Author: gao shuai
 * @Date: 2020-05-21 14:17:23
 * @LastEditTime: 2020-05-22 11:12:07
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 游戏分区
  async gameDraw(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetPartitionNameListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* -------------------------1.充值统计-------------------------- */
  // 充值统计
  async chargeStatic(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetDataAnalysisRechargeCountAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 代理充值统计
  async chargeMerchant(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetAgentDataAnalysisRechargeCountAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* -------------------------2.时段统计-------------------------- */
  // 时段统计
  async timeStatic(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetDataAnalysisTimeIntervalListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 代理时段统计
  async timeMerchant(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetAgentDataAnalysisTimeIntervalListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* -------------------------3.分区统计-------------------------- */
  // 分区统计
  async areaStatic(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetDataAnalysisPartitionsListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 代理分区统计
  async areaMerchant(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetAgentDataAnalysisPartitionsListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* -------------------------4.分组统计-------------------------- */
  // 分组统计
  async teamStatic(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetDataAnalysisGroupListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 代理分组统计
  async teamMerchant(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetAgentDataAnalysisGroupListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* -------------------------5.充值排行-------------------------- */
  // 充值排行
  async chargeRank(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetDataAnalysisRechargeRanListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 代理充值排行
  async MerchantRank(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetAgentDataAnalysisRechargeRanListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* -------------------------6.ISP统计-------------------------- */
  // ISP统计
  async ispStatic(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetDataAnalysisIPSListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
