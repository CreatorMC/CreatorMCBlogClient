import service from "../utils/request";

/**
 * 查询对应角色菜单列表树
 * @param {*} id 角色id
 * @returns 
 */
export function getRoleMenuTree(id) {
  return service.get("/system/menu/roleMenuTreeselect/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}