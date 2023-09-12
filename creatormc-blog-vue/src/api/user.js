import service from "../utils/request";

/**
 * 获取当前用户信息
 * @returns 
 */
export function userInfo() {
  return service.get("/user/userInfo", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 用户注册
 * @param {*} data 
 * @returns 
 */
export function register(data) {
  return service.post("/user/register", data);
}