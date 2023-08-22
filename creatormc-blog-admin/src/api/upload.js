import service from "../utils/request";

/**
 * 上传文章封面
 * @param {*} data 
 * @returns 
 */
export function uploadArticleCover(data) {
  return service.post("/upload", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'token': localStorage.getItem("token")
    }
  });
}

/**
 * 删除文章封面
 * @param {*} data 图片链接
 * @returns 
 */
export function deleteArticleCover(data) {
  return service.delete("/deleteArticleCover", {
    headers: {
      'token': localStorage.getItem("token")
    },
    data: data
  })
}