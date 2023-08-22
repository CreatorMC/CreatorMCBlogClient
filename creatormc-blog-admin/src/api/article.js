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