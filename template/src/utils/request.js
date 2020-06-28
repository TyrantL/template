import axios, { create } from 'axios';
import { Toast } from 'vant';
import Qs from 'qs';

import { isInApp, getParamFromUrl, isIOS } from './tools';

// baseUrl
let baseUrl = 'https://api.zmjx.com/';
const { domain } = window.document;
const env = getParamFromUrl('env');
if (domain.match('devh5') || domain.match('192') || domain.match('localhost')) {
  baseUrl = 'https://devapi.zmjx.com/';
} else if (domain.match('daily') || env === 'daily') {
  baseUrl = 'https://dailyapi.zmjx.com/';
} else if (domain.match('gray') || env === 'gray') {
  baseUrl = 'https://grayapi.zmjx.com/';
}

// token
let token = '';
if (isInApp) {
  token =
    dsBridge.call('getStorage', { key: 'token' }, () => {}) || window.localStorage.getItem('token');
} else {
  token = window.localStorage.getItem('token');
}

// IOS
localStorage.setItem('isIOS', isIOS);

axios.default.retry = 3; // 重试次数
axios.default.retryDelay = 5000; // 重试延时，5秒重试一次
axios.default.shouldRetry = () => true; // 重试条件，默认只要是错误都需要重试
axios.default.withCredentials = true; // 表示跨域请求时是否需要使用凭证(cookie/session)

function setHeaders(_axios) {
  _axios.defaults.headers.post['Content-Type'] = 'application/json;utf-8';
}

function requestIntercptor(_axios) {
  // 添加请求拦截器
  _axios.interceptors.request.use(
    config => {
      // 在发送请求之前做些什么
      config.headers.app_version =
        window.dsBridge.call('getStorage', {
          key: 'app_version',
        }) || '3.0.0';
      config.headers.token = token;
      config.headers.zmjx_client = isIOS ? 1 : 2;
      config.url = `${config.url}`;
      return config;
    },
    error =>
      // 对请求错误做些什么
      Promise.reject(error)
  );
}

function responceIntercptor(_axios) {
  // 添加响应拦截器
  _axios.interceptors.response.use(
    response => {
      // 对响应数据做点什么
      if (response.data.status === false) {
        Toast(response.data.message || '服务器出错啦，请稍后再试');
      }
      return response.data;
    },
    err => {
      Toast('服务器出错啦，请稍后再试');

      const { config } = err;

      // 判断是否配置了重试
      if (!config || !config.retry) return Promise.reject(err);
      if (!config.shouldRetry || typeof config.shouldRetry !== 'function')
        return Promise.reject(err);

      // 判断是否满足重试条件
      if (!config.shouldRetry(err)) return Promise.reject(err);

      // 设置重试次数
      config.__retryCount = config.__retryCount || 0;
      if (config.__retryCount >= config.retry) return Promise.reject(err);

      // 重试次数自增
      config.__retryCount += 1;

      // 延时处理
      const backoff = new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, config.retryDelay || 1);
      });
      config.data = Qs.parse(config.data);
      // 重新发起axios请求
      return backoff.then(() => _axios(config));
    }
  );
}

// eslint-disable-next-line import/prefer-default-export
export const request = () => {
  const re = create({
    baseURL: baseUrl,
    // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 10000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true, // 默认的false, true:让ajax携带cookie
  });
  setHeaders(re);
  requestIntercptor(re);
  responceIntercptor(re);
  return re;
};
