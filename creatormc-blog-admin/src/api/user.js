import service from "../utils/request";

/**
 * 获取当前用户信息
 * @returns 
 */
export function getAdminUserInfo() {
  return service.get("/getInfo", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}