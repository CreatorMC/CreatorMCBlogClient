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

/**
 * 查询菜单树
 * @returns 
 */
export function getMenuTree() {
  return service.get("/system/menu/treeselect", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询菜单列表
 * @param {*} data 包含菜单状态和菜单名称
 * @returns 
 */
export function getMenuList(data) {
  return service.get("/system/menu/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: data
  });
}