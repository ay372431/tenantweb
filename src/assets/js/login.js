/*
 * @Description: 登录js
 * @Author: gao shuai
 * @Date: 2020-03-26 15:07:38
 * @LastEditTime: 2020-03-26 15:17:25
 * @LastEditors: gao shuai
 */

import Oidc from 'oidc-client-zqy';
import { config } from './version';
const mgr = new Oidc.UserManager(config);
export default mgr;
