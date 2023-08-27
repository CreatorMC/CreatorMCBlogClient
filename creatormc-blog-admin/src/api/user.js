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

/**
 * 查询单个用户
 * @param {*} id 用户id
 * @returns 
 */
export function getUser(id) {
  return service.get("/system/user/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新用户
 * @param {*} data 
 * @returns 
 */
export function updateUser(data) {
  return service.put("/system/user", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新用户状态
 * @param {*} data 
 * @returns 
 */
export function changeUserStatus(data) {
  return service.put("/system/user/changeStatus", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 添加用户
 * @param {*} data 
 * @returns 
 */
export function addUser(data) {
  return service.post("/system/user", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 删除用户
 * @param {*} ids 用户id列表
 * @returns 
 */
export function deleteUser(ids) {
  return service.delete("/system/user/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}