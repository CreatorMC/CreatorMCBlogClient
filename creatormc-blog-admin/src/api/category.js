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