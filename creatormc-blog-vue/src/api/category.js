import service from "../utils/request";

/**
 * 查询已有文章的分类表
 * @returns 
 */
export function getCategoryList() {
  return service.get("/category/getCategoryList");
}