/*
 * @Description: 分区模板
 * @Author: gao shuai
 * @Date: 2020-02-25 15:36:33
 * @LastEditTime: 2020-06-27 11:00:28
 * @LastEditors: gao shuai
 */
import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 分区分页模板列表
  async getTemplateList(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsTemplates/GetPartitionsTemplatesListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 充值赠送状态切换
  async giveSwith(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsTemplates/OffOnStateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 删除分区模板
  async deleteModule(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsTemplates/PartitionsTemplatesDeleteAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取模板的详情信息
  async moduleDetail(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsTemplates/GetTemplateDetail',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 编辑模板
  async editModule(params) {
    let header = await mgr();
    return api({
      url: '/api/Template/EditTemplate',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加时获取充值渠道的产品
  async getproduct(params) {
    let header = await mgr();
    return api({
      url: '/api/Template/GetProducts',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加模板
  async addModule(params) {
    let header = await mgr();
    return api({
      url: '/api/Template/AddTemplate',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 游戏引擎下拉
  async gameEnginedrow(params) {
    let header = await mgr();
    return api({
      url: '/api/Template/GetEngineList',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 克隆template
  async cloneModule(params) {
    let header = await mgr();
    return api({
      url: '/api/Template/CloneTemplate',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
