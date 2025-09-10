/*
 * @Description: 接口的版本号及相关公用设置
 * @Author: gao shuai
 * @Date: 2020-02-25 15:38:30
 * @LastEditTime: 2020-09-29 08:52:39
 * @LastEditors: gao shuai
 */

export const version = 1; // 接口的版本

export const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:5003/' : 'http://171.80.9.234:5003/'; // 接口的ip__zx固定
export const netUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5002' : 'http://171.80.9.234:5002'; // 网关接口地址
export const loginUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5004' : 'http://171.80.9.234:5004'; // 5004
export const authUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : 'http://171.80.9.234:5000'; // 5000

// export const url = 'http://171.80.9.234:5003'; // 接口的ip__zx固定
// export const netUrl = 'http://171.80.9.234:5002'; // 网关接口地址
// export const loginUrl = 'http://171.80.9.234:5004'; // 5004
// export const authUrl = 'http://171.80.9.234:5000'; // 5000
