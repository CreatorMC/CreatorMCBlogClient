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