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

/**
 * 分页查询用户列表
 * @param {*} pageNum 第几页
 * @param {*} pageSize 每页几条记录
 * @param {*} dto 表单对象
 * @returns 
 */
export function getPageUserList(pageNum, pageSize, dto) {
  return service.get("/system/user/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      userName: dto.userName,
      phonenumber: dto.phonenumber,
      status: dto.status
    }
  });
}