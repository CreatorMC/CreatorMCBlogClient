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
 * 添加菜单
 * @param {*} data 
 * @returns 
 */
export function addMenu(data) {
  return service.post("/system/menu", data, {
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

/**
 * 在新增或更新菜单前，对对象进行过滤，以排除不需要的字段
 * @param {*} arg 
 * @returns 
 */
export function MCFFilter(arg) {
  let data = {};
  if(arg.menuType == 'M') {
    //目录
    data = {
      //菜单id
      id: arg.id ? arg.id : null,
      //菜单名称
      menuName: arg.menuName,
      //父菜单ID
      parentId: arg.parentId,
      //显示顺序
      orderNum: arg.orderNum,
      //路由地址
      path: arg.path,
      //组件路径
      component: "",
      //是否为外链（0是 1否）
      isFrame: "1",
      //菜单类型（M目录 C菜单 F按钮）
      menuType: arg.menuType,
      //显示状态（0显示 1隐藏）
      visible: arg.visible,
      //菜单状态（0正常 1停用）
      status: arg.status,
      //权限标识
      perms: "",
      //菜单图标
      icon: arg.icon,
      //备注
      remark: arg.remark
    };
  } else if (arg.menuType == 'C') {
    //菜单
    data = {
      //菜单id
      id: arg.id ? arg.id : null,
      //菜单名称
      menuName: arg.menuName,
      //父菜单ID
      parentId: arg.parentId,
      //显示顺序
      orderNum: arg.orderNum,
      //路由地址
      path: arg.path,
      //组件路径
      component: arg.component,
      //是否为外链（0是 1否）
      isFrame: "1",
      //菜单类型（M目录 C菜单 F按钮）
      menuType: arg.menuType,
      //显示状态（0显示 1隐藏）
      visible: arg.visible,
      //菜单状态（0正常 1停用）
      status: arg.status,
      //权限标识
      perms: arg.perms,
      //菜单图标
      icon: arg.icon,
      //备注
      remark: arg.remark
    };
  } else {
    //按钮
    data = {
      //菜单id
      id: arg.id ? arg.id : null,
      //菜单名称
      menuName: arg.menuName,
      //父菜单ID
      parentId: arg.parentId,
      //显示顺序
      orderNum: arg.orderNum,
      //路由地址
      path: "",
      //组件路径
      component: "",
      //是否为外链（0是 1否）
      isFrame: "1",
      //菜单类型（M目录 C菜单 F按钮）
      menuType: arg.menuType,
      //显示状态（0显示 1隐藏）
      visible: "0",
      //菜单状态（0正常 1停用）
      status: "0",
      //权限标识
      perms: arg.perms,
      //菜单图标
      icon: "#",
      //备注
      remark: arg.remark
    };
  }
  return data;
}