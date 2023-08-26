import service from "../utils/request";

/**
 * 查询角色列表
 * @returns 
 */
export function getRoleList() {
  return service.get("/system/role/listAllRole", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}