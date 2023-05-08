import axios from 'axios'
import nProgress from "nprogress"
import "nprogress/nprogress.css"
axios.defaults.baseURL = '/api'

// 设置超时时间
axios.defaults.timeout = 50000

// 设置允许跨域资源携带

axios.defaults.withCredentials = true

// 设置加载条样式
nProgress.configure({
  showSpinner:false
})

// 设置请求拦截器

axios.interceptors.request.use((config) => {
  nProgress.start();
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error);
})

// 设置响应拦截器

axios.interceptors.response.use((response) => {
  nProgress.done();
  return response.data;

}, error => {
  
  let { response } = error;
  if (response) {
    switch (response.status) {
      case 401://权限问题
        break;
      case 403:
        localStorage.removeItem("token");
        break;
      case 404://找不到页面
        break;
    }
  } else {
    if (!window.navigator.onLine) {
      // 断网处理 
      return;
    }
    return Promise.reject(error);
  }
})

export default axios;