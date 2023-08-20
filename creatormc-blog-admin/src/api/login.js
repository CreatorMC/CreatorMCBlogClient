/**
 * 登录界面的请求
 */
import service from "../utils/request";

/**
 * 获取随机图片
 * @returns 
 */
export function getRandomImg() {
  return service({
    url: "/user/randomImg"
  });
}