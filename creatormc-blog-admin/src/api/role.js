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

/**
 * 分页查询角色列表
 * @param {*} pageNum 当前页
 * @param {*} pageSize 一页几条数据
 * @param {*} dto 角色名和角色状态
 * @returns 
 */
export function getPageRoleList(pageNum, pageSize, dto) {
  return service.get("/system/role/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      roleName: dto.roleName,
      status: dto.status
    }
  });
}

/**
 * 查询单个角色
 * @param {*} id 角色id
 * @returns 
 */
export function getRole(id) {
  return service.get("/system/role/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新角色
 * @param {*} data 
 * @returns 
 */
export function updateRole(data) {
  return service.put("/system/role", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新角色状态
 * @param {*} data 
 * @returns 
 */
export function changeRoleStatus(data) {
  return service.put("/system/role/changeStatus", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 添加角色
 * @param {*} data 
 * @returns 
 */
export function addRole(data) {
  return service.post("/system/role", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}