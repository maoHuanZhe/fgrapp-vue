import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import Vue from 'vue'
// 定义Vue实例 调用全局显示和关闭loading方法
const vm = new Vue()
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 3000
})
// request拦截器
service.interceptors.request.use(config => {
  // 在这里调用 显示loading方法
  vm.$showLoading()
  let token = getToken();
  if (token) {
    //已登录
    config.headers['authorization'] = token;
  } else {
    //未登录
    const isToken = (config.headers || {}).isToken
    if (!isToken) {
      //需要设置 token

    }
  }

  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof(value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
  vm.$hideLoading()
  // 在请求出错调用 关闭loading方法
    console.log(error)
    Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(res => {
    // 在这里调用 关闭loading方法
    vm.$hideLoading()
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.message || errorCode['default']
   if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code === 402) {
      Message({
        message: res.data.data,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code === 403) {
      //参数校验出错
      Message({
        message: res.data.data,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      Notification.error({
        title: msg
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    // 在这里调用 关闭loading方法
    vm.$hideLoading()
    if (error.response && error.response.status === 401) {
      store.dispatch('FedLogOut')
      return;
    }
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      console.dir(error)
      const config = error.config;
      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 0;
      // If config does not exist or the retry option is not set, reject
      if(!config || !config.retry
        // Check if we've maxed out the total number of retries
        || config.__retryCount >= config.retry) {
        Message({
          message: "系统接口请求超时",
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error);
      }

      // Increase the retry count
      config.__retryCount += 1;

      // Create new promise to handle exponential backoff
      const backoff = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, config.retryDelay || 1);
      });
      // Return the promise in which recalls axios to retry the request
      return backoff.then(function() {
        return service(config);
      });
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
