import service from "../utils/request";

/**
 * 查询文章列表
 * @param {*} pageNum 第几页
 * @param {*} pageSize 每页几条记录
 * @param {*} categoryId 分类id（可选）
 * @returns 
 */
export function articleList(pageNum, pageSize, categoryId) {
  return service.get("/article/articleList/" + pageNum + "/" + pageSize + (categoryId ? ("/" + categoryId) : ""));
}