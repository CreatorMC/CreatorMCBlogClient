import service from "../utils/request";

/**
 * 用户注册
 * @param {*} data 
 * @returns 
 */
export function register(data) {
  return service.post("/user/register", data);
}