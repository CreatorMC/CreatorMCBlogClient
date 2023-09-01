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

/**
 * 查询单个菜单
 * @param {*} id 菜单id
 * @returns 
 */
export function getMenu(id) {
  return service.get("/system/menu/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新菜单
 * @param {*} data 
 * @returns 
 */
export function updateMenu(data) {
  return service.put("/system/menu", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询菜单列表之后，把列表变成树
 * @param {*} data 查询菜单列表得到的数据
 * @returns 
 */
export function disposeMenuList(data) {
  //存储访问过的id，为构建树结构使用
  const idSet = new Set();
  /**
   * 递归处理数据，形成树结构
   */
  function buildTreeData(list, parentId) {
    let result = [];
    for (const menu of list) {
      if (!idSet.has(menu.id) && (menu.parentId == parentId || parentId == -1)) {
        menu.children = buildTreeData(list, menu.id);
        result.push(menu);
        idSet.add(menu.id);
      }
    }
    return result;
  }
  return buildTreeData(data, -1);
}