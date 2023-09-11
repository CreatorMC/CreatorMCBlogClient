import service from "../utils/request";

/**
 * 用户名登录
 * @param {*} data 
 * @returns 
 */
export function login(data) {
  return service.post("/login", data);
}

/**
 * 退出登录
 * @returns 
 */
export function logout() {
  return service.post("/logout", null, {
    headers: {
      "token": localStorage.getItem("token")
    }
  })
}

/**
 * 获取随机图片
 * @returns 
 */
export function getRandomImg() {
  return service.get("/randomImg");
}