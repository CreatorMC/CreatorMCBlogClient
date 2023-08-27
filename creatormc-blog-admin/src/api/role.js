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