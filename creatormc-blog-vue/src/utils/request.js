import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { globalProperties } from "../main";
import router from "../router";
import { userStore } from '../store/user';
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
  ElMessage.error(error)
  return error;
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 未设置状态码则默认成功状态
  const code = response.data.code || 200;
  // 2xx 范围内的状态码都会触发该函数。
  //完成进度条
  globalProperties.$nprogress.done();
  if(code != 200) {
    //请求有异常，显示错误提示，错误提示是从服务端返回回来的
    if(code == 401) {
      if(localStorage.getItem("token")) {
        //未登录，并且token存在，提示登录状态过期
        ElMessageBox.confirm(
          '您的登录状态已过期。<br>您可以重新登录，或继续留在当前页面。',
          '提示', 
          {
            confirmButtonText: '重新登陆',
            cancelButtonText: '留在此页',
            type: 'warning',
            dangerouslyUseHTMLString: true
          }
        ).then(() => {
          //删除token
          localStorage.removeItem("token");
          //跳转到登录页
          router.push("/login");
          const store = userStore();
          //恢复store状态到初始值
          store.$reset();
          //清空sessionStorage
          sessionStorage.clear();
        }).catch(() => {
          //删除token
          localStorage.removeItem("token");
          const store = userStore();
          //恢复store状态到初始值
          store.$reset();
          //清空sessionStorage
          sessionStorage.clear();
        })
      } else {
        if(response.config.url.indexOf("/article/getUserLike/") != -1) {
          //该请求路径不做提示
          return null;
        }
        //未登录，但token不存在，提示用户此功能需要登录
        ElMessageBox.confirm(
          '此功能需要登录后才能使用<br>您可以立即登录，或继续留在当前页面。',
          '提示', 
          {
            confirmButtonText: '立即登陆',
            cancelButtonText: '留在此页',
            type: 'warning',
            dangerouslyUseHTMLString: true
          }
        ).then(() => {
          //跳转到登录页
          router.push("/login");
        }).catch(() => {
          //留在此页
        })
      }
      return null;
    }
    ElMessage.error(response.data.msg);
    return null;
  }
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  globalProperties.$nprogress.done();
  //判断错误是否是取消请求，取消请求一般是主动调用的，不应暴露给用户，影响用户体验。
  if(error.code != "ERR_CANCELED") {
    ElMessage.error(error);
  }
  return error;
});

export default service