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

/**
 * 查询浏览量前10条的文章
 * @returns 
 */
export function hotArticleList() {
  return service.get("/article/hotArticleList");
}

/**
 * 查询文章详情
 * @param {*} id 文章id
 * @returns 
 */
export function getArticle(id) {
  return service.get("/article/" + id);
}

/**
 * 更新对应文章的浏览量
 * @param {*} id 文章id
 * @returns 
 */
export function updateViewCount(id) {
  return service.put("/article/updateViewCount/" + id);
}