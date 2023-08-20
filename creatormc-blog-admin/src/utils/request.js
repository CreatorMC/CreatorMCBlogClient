import axios from "axios";
import { globalProperties } from "../main";
const env = import.meta.env;

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: env.VITE_APP_BASE_URL,
  // 超时
  timeout: 10000,
  //请求头
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  globalProperties.$nprogress.start();
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  globalProperties.$nprogress.done();
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  globalProperties.$nprogress.done();
  return Promise.reject(error);
});

export default service