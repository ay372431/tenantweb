/*
 * @Description: 登录页面的api
 * @Author: gao shuai
 * @Date: 2020-02-25 15:36:33
 * @LastEditTime: 2020-07-13 18:21:28
 * @LastEditors: gao shuai
 */
import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 获取用户分组
  async groupsdrow(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallPartition/GetGroups',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取用户模板接口
  async modelDrow(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallPartition/GetTemplates',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 安装分区
  async partInstall(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallPartition/Install',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 批量安装分区
  async batchInstall(model, names, scriptPaths) {
    let header = await mgr();
    return api({
      url: '/api/InstallPartition/BatchInstall',
      method: 'post',
      data: {
        model,
        names,
        scriptPaths
      },
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 编辑分区
  async partEdit(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallPartition/Edit',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取服务器机器码
  async getMachineCode(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallPartition/GetMachineCode',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 删除机器码
  async delMachineCode(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsManager/BatchDeleteMachineCodeAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
