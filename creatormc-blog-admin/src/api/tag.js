import service from "../utils/request";

/**
 * 查询所有标签
 * @returns 
 */
export function getAllTag() {
  return service.get("/content/tag/listAllTag", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 分页查询标签列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页几条数据
 * @param {*} dto 包括标签名和标签备注
 * @returns 
 */
export function getPageTagList(pageNum, pageSize, dto) {
  return service.get("/content/tag/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum,
      pageSize,
      name: dto.name,
      remark: dto.remark
    }
  });
}

/**
 * 添加标签
 * @param {*} data 
 * @returns 
 */
export function addTag(data) {
  return service.post("/content/tag", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询标签信息
 * @param {*} id 标签id
 * @returns 
 */
export function getTag(id) {
  return service.get("/content/tag/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新标签信息
 * @param {*} data 
 * @returns 
 */
export function updateTag(data) {
  return service.put("/content/tag", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 删除标签
 * @param {*} ids 标签id列表
 * @returns 
 */
export function deleteTag(ids) {
  return service.delete("/content/tag/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}