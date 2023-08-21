/**
 * 登录界面的请求
 */
import service from "../utils/request";

/**
 * 用户名登录
 * @param {*} data
 * @returns 
 */
export function login(data) {
  return service.post("/user/login", data);
}

/**
 * 获取随机图片
 * @returns 
 */
export function getRandomImg() {
  return service.get("/user/randomImg");
}