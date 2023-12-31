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

/**
 * 查询对应文章是否被当前用户点赞过
 * @param {*} id 文章id
 * @returns 
 */
export function getUserLike(id) {
  return service.get(`/article/getUserLike/${id}`, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询对应文章的点赞量
 * @param {*} id 文章id
 * @returns 
 */
export function getLikeCount(id) {
  return service.get(`/article/getLikeCount/${id}`);
}

/**
 * 更新对应文章的点赞量
 * @param {*} id 文章id
 * @returns 
 */
export function updateLikeCount(id) {
  return service.put(`/article/updateLikeCount/${id}`, null, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 搜索文章
 * @param {*} pageNum 第几页
 * @param {*} pageSize 每页几条记录
 * @param {*} text 要搜索的文本
 * @returns 
 */
export function getSearchArticle(pageNum, pageSize, text) {
  return service.get(`/article/getSearchArticle/${pageNum}/${pageSize}/${text}`);
}