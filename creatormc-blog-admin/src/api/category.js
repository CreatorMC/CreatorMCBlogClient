import service from "../utils/request";

/**
 * 查询所有分类
 * @returns 
 */
export function getAllCategory() {
  return service.get("/content/category/listAllCategory", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}


/**
 * 分页查询分类列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页多少条
 * @param {*} dto 包含分类名和分类状态
 * @returns 
 */
export function getPageCategoryList(pageNum, pageSize, dto) {
  return service.get("/content/category/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum,
      pageSize,
      name: dto.name,
      status: dto.status
    }
  });
}

/**
 * 添加分类
 * @param {*} data 
 * @returns 
 */
export function addCategory(data) {
  return service.post("/content/category", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}