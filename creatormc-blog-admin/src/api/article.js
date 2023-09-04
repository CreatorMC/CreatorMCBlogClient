import service from "../utils/request";

/**
 * 添加文章
 * @param {*} data 
 * @returns 
 */
export function addArticle(data) {
  return service.post("/content/article", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  })
}

/**
 * 分页查询文章列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页几条数据
 * @param {*} title 文章标题
 * @param {*} summary 文章摘要
 * @returns 
 */
export function getArticleList(pageNum, pageSize, title, summary) {
  return service.get("/content/article/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum,
      pageSize,
      title,
      summary
    }
  });
}

/**
 * 查询文章详情
 * @param {*} id 文章id
 * @returns 
 */
export function getArticle(id) {
  return service.get("/content/article/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新文章
 * @param {*} data 
 * @returns 
 */
export function updateArticle(data) {
  return service.put("/content/article", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}