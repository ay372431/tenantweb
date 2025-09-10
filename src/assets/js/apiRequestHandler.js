/*
 * @Description: axios的封装
 * @Author: gao shuai
 * @Date: 2020-02-25 15:24:12
 * @LastEditTime: 2020-08-18 22:44:53
 * @LastEditors: gao shuai
 */
import axios from 'axios';
import Mgr from './SecurityService';
import {
  url
} from './version';
/* 实例化axios */
const AxiosInstance = axios.create();
const IS_DEV = process.env.NODE_ENV !== 'production';
// const DEV_BASEURL = 'http://192.168.32.113:8111'; // 开发模式的url
const DEV_BASEURL = url; // 开发模式的url
// const PRO_BASEURL = 'http://192.168.32.113:8111'; // 生产模式的url
const PRO_BASEURL = url; // 生产模式的url

/* 实例对象默认配置 */
AxiosInstance.defaults.baseURL = IS_DEV ? DEV_BASEURL : PRO_BASEURL; // 区分开发和正式基础路径
// AxiosInstance.defaults.responseType = 'json'; // 返回数据类型json
AxiosInstance.defaults.timeout = 100000; // 超时时间
AxiosInstance.defaults.headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/json'
};
let mgr = new Mgr();
/**
 * 请求拦截器
 */
AxiosInstance.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('agentMerchantId')) {
      config.headers.MerchantId = sessionStorage.getItem('agentMerchantId');
    }
    let url = config.url;
    config.url = url + '?r=' + (Math.random() * 100000 + 1);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err.response.status === 401) {
      mgr.signOut();
    } else if (err.response.status === 423) {
      window.location.href = '../#/accessdenied';
    }
    return Promise.reject(err.response.data);
  }
);

export default AxiosInstance;
