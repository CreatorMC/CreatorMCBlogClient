import axios from 'axios'
import { ElMessage } from 'element-plus'
const env = import.meta.env

// 创建axios实例
const downloadService = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: env.VITE_APP_BASE_URL,
  // 超时
  timeout: 10000,
  //请求头
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  responseType: 'blob'
})

// 响应拦截器
downloadService.interceptors.response.use(res => {
  if (!res.data) {
    return
  }
  var blob = new Blob([res.data])
  const contentDisposition = res.headers['content-disposition']
  var fileName = 'test'
  if (contentDisposition) {
    fileName = window.decodeURI(res.headers['content-disposition'].split('=')[1], 'UTF-8')
  }
  var url = window.URL.createObjectURL(blob)
  var aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.href = url
  aLink.setAttribute('download', fileName)
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink) // 下载完成移除元素
  window.URL.revokeObjectURL(url) // 释放掉blob对象
},
  error => {
    console.log('err' + error)
    let { message } = error
    if (message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default downloadService