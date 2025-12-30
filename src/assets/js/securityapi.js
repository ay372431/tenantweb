// src/assets/js/securityapi.js
/* eslint-disable */
import SecurityService from './SecurityService';

const service = new SecurityService();

/**
 * 供 src/api/*.js 使用：
 * 返回当前 access_token（字符串），没有就返回 null
 */
export default async function mgr() {
  const token = await service.getAcessToken();
  // 这里可以按需要做统一未登录处理
  // if (!token) {
  //   window.location.hash = '#/login/loginHome';
  // }
  return token;
}