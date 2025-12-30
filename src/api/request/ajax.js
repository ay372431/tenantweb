/* eslint-disable no-undef */
import axios from 'axios';

// axios 配置
axios.defaults.timeout = 50000; // 设置请求超时
// axios.defaults.baseURL = '/api'; // 默认请求地址
axios.defaults.baseURL = process.env.VUE_APP_API_URL; // 默认请求地址
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"; // 请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/json'; // 请求头的设置
// 设置跨域携带用户凭证
// axios.defaults.withCredentials = true

// 请求
axios.interceptors.request.use(
  config => {
    // eslint-disable-next-line no-undef
    Toast.loading({
      message: '加载中...',
      loadingType: 'spinner',
      forbidClick: true,
      duration: 0
    });
    // config.headers.common["openId"] = this.vuex_token;
    const lifeData = localStorage.getItem('lifeData')
      ? JSON.parse(localStorage.getItem('lifeData'))
      : {};
    if (lifeData) {
      // config.headers.common["openId"] = lifeData.vuex_token;
    }
    return config;
  },
  error => {
    Toast.clear();
    return Promise.reject(error);
  }
);

// 返回
axios.interceptors.response.use(
  res => {
    Toast.clear();
    const responseCode = res.status;
    // 拦截器配置
    if (responseCode === 200) {
      console.log(res);
      if (res.data.data.code === 200) {
        return Promise.resolve({
          ok: true,
          data: res.data
        });
      } else {
        // Toast.fail({
        //   message: res.data.data.message,
        //   duration: 1000,
        // });
        return Promise.resolve({
          ok: false,
          data: res.data,
          msg: res.data.data.message
        });
      }
    } else {
      Toast.fail({
        message: '网络链接失败',
        duration: 3000
      });
      return Promise.reject(res);
    }
  },
  error => {
    Toast.clear();
    if (error.response?.data?.code === 401) {
      //  localStorage.removeItem("token");
      // localStorage.removeItem("userId");
      // window.location.reload();
    }
    // 请求失败
    Toast.fail({
      message: '网络链接失败',
      duration: 3000
    });
    return Promise.reject(error);
  }
);

export const get = url => axios.get(url);

export const post = (url, params) => axios.post(url, params);
