import service from "../utils/request";

/**
 * 分页查询分类列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页多少条
 * @param {*} dto 包含分类名和分类状态
 * @returns 
 */
export function getPageSensitiveList(pageNum, pageSize, dto) {
  return service.get("/content/sensitive/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum,
      pageSize,
      content: dto.content,
      type: dto.type
    }
  });
}

/**
 * 添加敏感词
 * @param {*} data 
 * @returns 
 */
export function addSensitive(data) {
  return service.post("/content/sensitive", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询单个敏感词
 * @param {*} id 分类id
 * @returns 
 */
export function getSensitive(id) {
  return service.get("/content/sensitive/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新敏感词
 * @param {*} data 
 * @returns 
 */
export function updateSensitive(data) {
  return service.put("/content/sensitive", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 删除敏感词
 * @param {*} ids 分类id列表
 * @returns 
 */
export function deleteSensitive(ids) {
  return service.delete("/content/sensitive/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}